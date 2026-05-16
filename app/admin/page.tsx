'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ref, push, set, update, remove, get } from 'firebase/database'
import { db } from '@/lib/firebase'
import RoleHeader from '@/components/RoleHeader'
import { useEventState } from '@/hooks/useEventState'
import { useRole } from '@/hooks/useRole'
import { useTimer, formatDisplay, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'
import { ep } from '@/lib/event-config'
import type { Session, SessionStatus } from '@/lib/types'

const NAV = [
  // { href: '/dashboard', label: 'Programme', short: '◈' },
  { href: '/admin',     label: 'Admin',     short: '✦' },
  { href: '/stage',     label: 'Stage',     short: '▤' },
  { href: '/mc',        label: 'MC',        short: '⬡' },
  { href: '/av',        label: 'AV',        short: '▶' },
  { href: '/moderator', label: 'Mod',       short: '◉' },
  // { href: '/briefing',  label: 'Briefing',  short: '▦' },
  // { href: '/checklist', label: 'Checklist', short: '☑' },
] as const

const FIELD = "w-full bg-[#0d0d0b] border border-[#2a2a26] px-3 py-2 text-sm text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-amber-600"
const LABEL = "text-[10px] uppercase tracking-widest font-mono text-zinc-600 mb-1 block"

const EMPTY: typeof FORM_SHAPE = {
  title: '', type: 'speech', startTime: '', duration: '',
  speaker: '', moderator: '', mcScript: '', avCues: '', moderatorNotes: '', stageNotes: '',
  day: '1', date: '',
}
const FORM_SHAPE = { title: '', type: '', startTime: '', duration: '', speaker: '', moderator: '', mcScript: '', avCues: '', moderatorNotes: '', stageNotes: '', day: '', date: '' }

export default function AdminPage() {
  useRole('admin')
  const {
    sessions, currentSession, ordered, currentSessionId,
    timer, timerMode, delayMins, message, connected, serverTimeOffset,
  } = useEventState()

  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const pathname = usePathname()
  const playChime = useChime()
  const effectiveDuration = currentSession?.duration ? Math.max(1, currentSession.duration - delayMins) : undefined
  const color = getTimerColor(seconds, effectiveDuration)

  const lastChimeId = useRef<string | null>(null)
  const warnedRef = useRef(false)
  const overrunRef = useRef(false)

  const [tab, setTab] = useState<'control' | 'setup'>('control')
  const [form, setForm] = useState({ ...EMPTY })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [flashMsg, setFlashMsg] = useState('')

  useEffect(() => {
    if (currentSessionId !== lastChimeId.current) {
      lastChimeId.current = currentSessionId
      warnedRef.current = false
      overrunRef.current = false
    }
    if (!currentSession?.duration) return
    const effectiveSecs = Math.max(60, (currentSession.duration - delayMins) * 60)
    if (seconds >= effectiveSecs && !overrunRef.current) {
      overrunRef.current = true; playChime('overrun')
      if (currentSessionId && currentSession.status !== 'overrun')
        update(ref(db, ep(`sessions/${currentSessionId}`)), { status: 'overrun' })
    } else if (seconds >= effectiveSecs - 120 && seconds < effectiveSecs && !warnedRef.current) {
      warnedRef.current = true; playChime('warning')
      if (currentSessionId && currentSession.status !== 'warning' && currentSession.status !== 'overrun')
        update(ref(db, ep(`sessions/${currentSessionId}`)), { status: 'warning' })
    }
  }, [seconds, currentSession, currentSessionId, playChime, delayMins])

  // ── Timer ops ────────────────────────────────────────────────────────────────

  async function startTimer() {
    const snap = await get(ref(db, ep('timer')))
    const t = snap.val() || {}
    await set(ref(db, ep('timer')), { running: true, startedAt: Date.now() + serverTimeOffset, baseSeconds: t.baseSeconds || 0 })
  }

  async function pauseTimer() {
    const snap = await get(ref(db, ep('timer')))
    const t = snap.val() || {}
    const elapsed = t.startedAt ? Math.floor((Date.now() + serverTimeOffset - t.startedAt) / 1000) : 0
    await set(ref(db, ep('timer')), { running: false, startedAt: null, baseSeconds: (t.baseSeconds || 0) + elapsed })
  }

  async function resetTimer() {
    await set(ref(db, ep('timer')), { running: false, baseSeconds: 0, startedAt: null })
  }

  async function toggleTimerMode() {
    await set(ref(db, ep('timerMode')), timerMode === 'elapsed' ? 'remaining' : 'elapsed')
  }

  // ── Schedule delay ────────────────────────────────────────────────────────────

  async function adjustDelay(delta: number) {
    const next = Math.max(-120, Math.min(120, delayMins + delta))
    await set(ref(db, ep('delayMins')), next)
  }

  async function clearDelay() {
    await set(ref(db, ep('delayMins')), 0)
  }

  // ── Session ops ──────────────────────────────────────────────────────────────

  async function setCurrentSession(id: string) {
    if (currentSessionId && currentSessionId !== id)
      await update(ref(db, ep(`sessions/${currentSessionId}`)), { status: 'upcoming' })
    await set(ref(db, ep('currentSessionId')), id)
    await update(ref(db, ep(`sessions/${id}`)), { status: 'active' })
    await set(ref(db, ep('timer')), { running: false, baseSeconds: 0, startedAt: null })
  }

  async function toggleLive(id: string) {
    if (currentSessionId === id) {
      await update(ref(db, ep(`sessions/${id}`)), { status: 'upcoming' })
      await set(ref(db, ep('currentSessionId')), null)
      await set(ref(db, ep('timer')), { running: false, baseSeconds: 0, startedAt: null })
    } else {
      await setCurrentSession(id)
    }
  }

  async function markComplete() {
    if (!currentSessionId) {
      if (ordered.length === 0) { alert('No sessions yet.'); return }
      await setCurrentSession(ordered[0].id!); return
    }
    await update(ref(db, ep(`sessions/${currentSessionId}`)), { status: 'completed' })
    const idx = ordered.findIndex(s => s.id === currentSessionId)
    if (idx < ordered.length - 1) {
      await setCurrentSession(ordered[idx + 1].id!)
      await set(ref(db, ep('timer')), { running: true, startedAt: Date.now() + serverTimeOffset, baseSeconds: 0 })
    } else {
      await set(ref(db, ep('currentSessionId')), null)
      await set(ref(db, ep('timer')), { running: false, baseSeconds: 0, startedAt: null })
    }
  }

  async function addSession() {
    if (!form.title.trim()) { alert('Title required.'); return }
    const maxOrder = Object.values(sessions).reduce((m, s) => Math.max(m, s.order || 0), 0)
    const newRef = push(ref(db, ep('sessions')))
    await set(newRef, {
      order: maxOrder + 1,
      title: form.title.trim(), type: form.type,
      startTime: form.startTime, duration: parseInt(form.duration) || 0,
      speaker: form.speaker.trim(), moderator: form.moderator.trim(),
      mcScript: form.mcScript.trim(), avCues: form.avCues.trim(),
      moderatorNotes: form.moderatorNotes.trim(), stageNotes: form.stageNotes.trim(),
      day: parseInt(form.day) || 1, date: form.date.trim(),
      status: 'upcoming' as SessionStatus,
    })
    setForm({ ...EMPTY })
  }

  async function updateSession() {
    if (!editingId || !form.title.trim()) { alert('Title required.'); return }
    await update(ref(db, ep(`sessions/${editingId}`)), {
      title: form.title.trim(), type: form.type,
      startTime: form.startTime, duration: parseInt(form.duration) || 0,
      speaker: form.speaker.trim(), moderator: form.moderator.trim(),
      mcScript: form.mcScript.trim(), avCues: form.avCues.trim(),
      moderatorNotes: form.moderatorNotes.trim(), stageNotes: form.stageNotes.trim(),
      day: parseInt(form.day) || 1, date: form.date.trim(),
    })
    setEditingId(null); setForm({ ...EMPTY })
  }

  async function deleteSession(id: string) {
    if (!confirm('Delete this session?')) return
    await remove(ref(db, ep(`sessions/${id}`)))
    if (currentSessionId === id) await set(ref(db, ep('currentSessionId')), null)
    if (editingId === id) { setEditingId(null); setForm({ ...EMPTY }) }
  }

  function startEdit(s: Session & { id?: string }) {
    setEditingId(s.id!)
    setForm({
      title: s.title || '', type: s.type || 'speech', startTime: s.startTime || '',
      duration: s.duration?.toString() || '', speaker: s.speaker || '',
      moderator: s.moderator || '', mcScript: s.mcScript || '',
      avCues: s.avCues || '', moderatorNotes: s.moderatorNotes || '',
      stageNotes: s.stageNotes || '', day: s.day?.toString() || '1', date: s.date || '',
    })
    setTab('setup')
    setTimeout(() => document.getElementById('session-form')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  // ── Flash ────────────────────────────────────────────────────────────────────

  async function sendMessage() {
    if (!flashMsg.trim()) return
    await set(ref(db, ep('message')), { text: flashMsg.trim(), active: true })
    setFlashMsg('')
  }

  async function clearMessage() {
    await set(ref(db, ep('message')), { active: false, text: '' })
  }

  // ── Seeding ──────────────────────────────────────────────────────────────────

  async function seedSessionsFromBriefing() {
    if (!confirm('Replace ALL sessions with briefing data? This cannot be undone.')) return
    const { SESSIONS: BRIEF } = await import('@/lib/briefing-data')
    const data: Record<string, unknown> = {}
    for (const s of BRIEF) {
      const stageNotes = s.avCues.filter(c => c.type === 'stage').map(c => `${c.label}: ${c.text}`).join('\n')
      const avCues = s.avCues.filter(c => c.type === 'av').map(c => `${c.label}: ${c.text}`).join('\n')
      data[`s${s.id}`] = {
        order: s.order, day: s.day, title: s.title, type: s.type,
        startTime: s.startTime, duration: s.duration,
        speaker: s.speakers.join(', '), moderator: s.moderator || '',
        mcScript: s.mcScript || '', avCues, stageNotes,
        moderatorNotes: s.moderatorNotes || '',
        status: 'upcoming' as SessionStatus,
      }
    }
    await set(ref(db, ep('sessions')), data)
    alert(`${BRIEF.length} sessions imported.`)
  }

  async function seedBriefing() {
    if (!confirm('Seed briefing data to Firebase?')) return
    const { SESSIONS } = await import('@/lib/briefing-data')
    const data: Record<string, unknown> = {}
    SESSIONS.forEach(s => { data[String(s.id)] = s })
    await set(ref(db, ep('briefing')), data)
    alert('Briefing data seeded.')
  }

  async function seedChecklist() {
    if (!confirm('Seed checklist data to Firebase?')) return
    const { ASSETS, isSection } = await import('@/lib/checklist-data')
    const data: Record<string, unknown> = {}
    ASSETS.forEach((row, i) => {
      data[String(i)] = isSection(row) ? { _type: 'section', section: row.section } : { _type: 'asset', ...row }
    })
    await set(ref(db, ep('checklist')), data)
    alert('Checklist data seeded.')
  }

  // ── Derived display ──────────────────────────────────────────────────────────

  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const display = formatDisplay(seconds, timerMode, effectiveDuration)
  const delayLabel = delayMins === 0 ? 'On schedule'
    : delayMins > 0 ? `+${delayMins}m behind`
    : `${delayMins}m ahead`
  const delayColor = delayMins === 0 ? 'text-green-400' : delayMins > 10 ? 'text-red-400' : delayMins > 0 ? 'text-yellow-400' : 'text-blue-400'

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white">
      <RoleHeader role="Programme Manager" connected={connected} right={
        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label, short }) => (
            <Link key={href} href={href}
              className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                pathname === href ? 'text-amber-400 bg-amber-500/10' : 'text-zinc-600 hover:text-zinc-300'
              }`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </Link>
          ))}
        </nav>
      } />


      {/* ── MAIN LAYOUT ── */}
      <div className="px-5 py-5">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-start max-w-[1400px] mx-auto">

          {/* ── LEFT: controls (always visible) ── */}
          <div className="w-full lg:w-[440px] lg:shrink-0 space-y-4 lg:sticky lg:top-[41px] lg:max-h-[calc(100vh-41px)] lg:overflow-y-auto">

              {/* Current session + timer */}
              <div className="bg-[#111110] border border-[#1c1c1a]">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#1c1c1a]">
                  <div className="min-w-0">
                    {currentSession ? (
                      <>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-1.5 py-0.5 animate-pulse">LIVE</span>
                          <span className="text-[10px] font-mono text-zinc-600 uppercase">{currentSession.type}</span>
                        </div>
                        <div className="font-semibold text-white">{currentSession.title}</div>
                        {currentSession.speaker && (
                          <div className="text-zinc-500 text-xs mt-0.5">
                            {currentSession.speaker.split(',').map((n, i) => <div key={i}>{n.trim()}</div>)}
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-zinc-600 text-sm font-mono">No session running</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
                    <div className="font-mono text-zinc-500 text-sm tracking-widest">{clock}</div>
                    <button
                      onClick={toggleTimerMode}
                      title={timerMode === 'elapsed' ? 'Switch to countdown' : 'Switch to elapsed'}
                      className="text-[10px] font-mono text-zinc-600 hover:text-amber-400 border border-[#2a2a26] hover:border-amber-600/40 px-2 py-1 transition-colors"
                    >
                      {timerMode === 'elapsed' ? '⏱ elapsed' : '⏳ countdown'}
                    </button>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <div className={`text-8xl font-mono font-black tabular-nums leading-none mb-1 ${timerColorClass}`}>
                    {display}
                  </div>
                  <div className={`text-[10px] font-mono uppercase tracking-widest mb-4 ${timerColorClass}`}>
                    {color === 'red' ? 'OVERRUN' : color === 'yellow' ? '2 min warning' : timer.running ? 'Running' : 'Stopped'}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={startTimer} className="bg-green-800 hover:bg-green-700 px-4 py-2 text-sm font-mono font-semibold transition-colors">Start</button>
                    <button onClick={pauseTimer} className="bg-yellow-800 hover:bg-yellow-700 px-4 py-2 text-sm font-mono font-semibold transition-colors">Pause</button>
                    <button onClick={resetTimer} className="bg-[#1e1e1c] hover:bg-[#2a2a26] px-4 py-2 text-sm font-mono transition-colors">Reset</button>
                  </div>
                </div>

                <button
                  onClick={markComplete}
                  className="w-full bg-amber-600 hover:bg-amber-500 py-3 font-mono font-bold text-sm tracking-wide transition-colors border-t border-amber-700/40"
                >
                  MARK COMPLETE → NEXT SESSION
                </button>
              </div>

              {/* Schedule delay */}
              <div className="bg-[#111110] border border-[#1c1c1a]">
                <div className="px-5 py-3 border-b border-[#1c1c1a] flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Schedule Delay</span>
                  <span className={`text-sm font-mono font-bold tabular-nums ${delayColor}`}>{delayLabel}</span>
                </div>
                <div className="px-5 py-3 flex items-center gap-2 flex-wrap">
                  <button onClick={() => adjustDelay(-10)} className="bg-[#1e1e1c] hover:bg-blue-900/40 text-zinc-400 hover:text-blue-300 px-3 py-1.5 text-xs font-mono transition-colors">−10m</button>
                  <button onClick={() => adjustDelay(-5)}  className="bg-[#1e1e1c] hover:bg-blue-900/40 text-zinc-400 hover:text-blue-300 px-3 py-1.5 text-xs font-mono transition-colors">−5m</button>
                  <button onClick={() => adjustDelay(-1)}  className="bg-[#1e1e1c] hover:bg-blue-900/40 text-zinc-400 hover:text-blue-300 px-3 py-1.5 text-xs font-mono transition-colors">−1m</button>
                  <button onClick={clearDelay}             className="bg-[#1e1e1c] hover:bg-[#2a2a26] text-zinc-600 hover:text-zinc-300 px-3 py-1.5 text-xs font-mono transition-colors flex-1 text-center">On Time</button>
                  <button onClick={() => adjustDelay(1)}   className="bg-[#1e1e1c] hover:bg-red-900/40 text-zinc-400 hover:text-red-300 px-3 py-1.5 text-xs font-mono transition-colors">+1m</button>
                  <button onClick={() => adjustDelay(5)}   className="bg-[#1e1e1c] hover:bg-red-900/40 text-zinc-400 hover:text-red-300 px-3 py-1.5 text-xs font-mono transition-colors">+5m</button>
                  <button onClick={() => adjustDelay(10)}  className="bg-[#1e1e1c] hover:bg-red-900/40 text-zinc-400 hover:text-red-300 px-3 py-1.5 text-xs font-mono transition-colors">+10m</button>
                </div>
              </div>

              {/* Flash message */}
              <div className="bg-[#111110] border border-[#1c1c1a]">
                <div className="px-5 py-3 border-b border-[#1c1c1a]">
                  <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Flash Message</span>
                </div>
                <div className="px-5 py-3 space-y-2">
                  <input
                    type="text" value={flashMsg}
                    onChange={e => setFlashMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Push a message to all screens…"
                    className={`w-full ${FIELD}`}
                  />
                  <div className="flex gap-2">
                    <button onClick={sendMessage}  className="flex-1 bg-amber-600 hover:bg-amber-500 py-2 font-mono font-bold text-sm transition-colors">Send</button>
                    <button onClick={clearMessage} className="bg-[#1e1e1c] hover:bg-[#2a2a26] px-4 py-2 font-mono text-sm text-zinc-400 transition-colors">Clear</button>
                  </div>
                </div>
                {message.active && message.text && (
                  <div className="px-5 pb-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 flex items-center justify-between">
                      <span className="text-amber-300 text-xs font-mono">{message.text}</span>
                      <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest animate-pulse">Live</span>
                    </div>
                  </div>
                )}
              </div>

          </div>{/* end left col */}

          {/* ── RIGHT: tab content ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-[#111110] border border-[#1c1c1a]">

              {/* Shared header */}
              <div className="px-5 py-3 border-b border-[#1c1c1a] flex items-center justify-between">
                <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">
                  {tab === 'control' ? 'Programme' : 'Setup'}
                </span>
                <div className="flex items-center gap-3">
                  {tab === 'setup' && editingId && (
                    <button onClick={() => { setEditingId(null); setForm({ ...EMPTY }) }} className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors">
                      Cancel
                    </button>
                  )}
                  <div className="flex">
                    {(['control', 'setup'] as const).map(t => (
                      <button key={t} onClick={() => setTab(t)}
                        className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors border-b-2 ${
                          tab === t ? 'border-amber-500 text-amber-400' : 'border-transparent text-zinc-600 hover:text-zinc-400'
                        }`}
                      >
                        {t === 'control' ? '⬡ Control' : '✦ Setup'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Control: programme list ── */}
              {tab === 'control' && (
                <div className="divide-y divide-[#161614]">
                  {ordered.length === 0 ? (
                    <p className="text-zinc-700 text-sm p-5 font-mono">No sessions. Switch to Setup to add.</p>
                  ) : (() => {
                    let lastDay: number | null = null
                    return ordered.map((s: Session & { id?: string }, i) => {
                      const showDay = s.day !== lastDay
                      if (showDay) lastDay = s.day
                      const isActive = s.id === currentSessionId
                      const isDone = s.status === 'completed'
                      return (
                        <div key={s.id}>
                          {showDay && (
                            <div className="px-5 py-2 bg-[#0d0d0b] border-b border-[#1c1c1a]">
                              <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-amber-500">Day {s.day}</span>
                              {s.date && <span className="text-[10px] font-mono text-zinc-700 ml-2">{s.date}</span>}
                            </div>
                          )}
                          <div className={`px-5 py-3 flex items-center gap-3 transition-all ${
                            isActive ? 'bg-[#181500] border-l-4 border-amber-500' : isDone ? 'opacity-35 border-l-4 border-transparent' : 'border-l-4 border-transparent'
                          }`}>
                            <span className="font-mono text-zinc-700 text-xs w-5 shrink-0">{i + 1}</span>
                            {s.startTime && <span className="font-mono text-zinc-600 text-xs tabular-nums w-12 shrink-0">{s.startTime}</span>}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-sm font-semibold ${isActive ? 'text-white' : isDone ? 'text-zinc-600' : 'text-zinc-200'}`}>{s.title}</span>
                                {s.duration && <span className="text-zinc-700 text-xs font-mono">{s.duration}m</span>}
                              </div>
                              {s.speaker && (
                                <div className={`text-xs mt-0.5 ${isDone ? 'text-zinc-700' : 'text-zinc-600'}`}>
                                  {s.speaker.split(',').map((n, i) => <div key={i}>{n.trim()}</div>)}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              <button
                                onClick={() => toggleLive(s.id!)}
                                className={`text-xs font-mono px-2 py-1 transition-colors ${
                                  isActive
                                    ? 'bg-amber-500 text-black font-bold tracking-widest uppercase animate-pulse hover:bg-amber-400'
                                    : 'bg-[#1e1e1c] hover:bg-amber-700 text-zinc-500 hover:text-white'
                                }`}
                              >
                                {isActive ? 'LIVE' : 'Set Live'}
                              </button>
                              <button onClick={() => { startEdit(s); setTab('setup') }} className="text-xs font-mono bg-[#1e1e1c] hover:bg-[#2a2a26] text-zinc-600 hover:text-zinc-300 px-2 py-1 transition-colors">Edit</button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              )}

              {/* ── Setup: form + list + seed ── */}
              {tab === 'setup' && (
                <>
                  {/* Session form */}
                  <div id="session-form" className="px-5 py-4 border-b border-[#1c1c1a]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL}>Title *</label>
                        <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Opening Remarks" className={FIELD} />
                      </div>
                      <div>
                        <label className={LABEL}>Type</label>
                        <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={FIELD}>
                          {['speech','panel','keynote','performance','break','other'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={LABEL}>Day</label>
                        <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))} className={FIELD}>
                          <option value="1">Day 1 — 8 June</option>
                          <option value="2">Day 2 — 9 June</option>
                          <option value="3">Day 3 — 10 June</option>
                        </select>
                      </div>
                      <div>
                        <label className={LABEL}>Start Time</label>
                        <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} className={FIELD} />
                      </div>
                      <div>
                        <label className={LABEL}>Duration (minutes)</label>
                        <input type="number" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="15" min="1" className={FIELD} />
                      </div>
                      <div>
                        <label className={LABEL}>Speaker / Panelists</label>
                        <input type="text" value={form.speaker} onChange={e => setForm(f => ({ ...f, speaker: e.target.value }))} placeholder="Full name + title" className={FIELD} />
                      </div>
                      <div>
                        <label className={LABEL}>Moderator</label>
                        <input type="text" value={form.moderator} onChange={e => setForm(f => ({ ...f, moderator: e.target.value }))} placeholder="Name (if applicable)" className={FIELD} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={LABEL}>MC Script</label>
                        <textarea rows={2} value={form.mcScript} onChange={e => setForm(f => ({ ...f, mcScript: e.target.value }))} placeholder="What the MC says to introduce this session…" className={`${FIELD} resize-none`} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={LABEL}>AV / Tech Cues</label>
                        <textarea rows={2} value={form.avCues} onChange={e => setForm(f => ({ ...f, avCues: e.target.value }))} placeholder="e.g. Play intro video, load slide deck 3…" className={`${FIELD} resize-none`} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={LABEL}>Stage Manager Notes</label>
                        <textarea rows={2} value={form.stageNotes} onChange={e => setForm(f => ({ ...f, stageNotes: e.target.value }))} placeholder="e.g. Speaker enters stage left, 2 chairs…" className={`${FIELD} resize-none`} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={LABEL}>Moderator Notes</label>
                        <textarea rows={2} value={form.moderatorNotes} onChange={e => setForm(f => ({ ...f, moderatorNotes: e.target.value }))} placeholder="Discussion topics, speaker background, questions…" className={`${FIELD} resize-none`} />
                      </div>
                    </div>
                    {editingId ? (
                      <div className="mt-4 flex gap-3">
                        <button onClick={updateSession} className="flex-1 bg-amber-600 hover:bg-amber-500 py-2.5 font-mono font-bold text-sm tracking-wide transition-colors">Update Session</button>
                        <button onClick={() => { setEditingId(null); setForm({ ...EMPTY }) }} className="bg-[#1e1e1c] hover:bg-[#2a2a26] px-5 py-2.5 font-mono text-sm text-zinc-400 transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={addSession} className="mt-4 w-full bg-amber-600 hover:bg-amber-500 py-2.5 font-mono font-bold text-sm tracking-wide transition-colors">
                        Add to Programme
                      </button>
                    )}
                  </div>

                  {/* All sessions — CRUD list */}
                  <div className="border-b border-[#1c1c1a]">
                    <div className="px-5 py-3 border-b border-[#1c1c1a]">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">All Sessions ({ordered.length})</span>
                    </div>
                    <div className="divide-y divide-[#161614]">
                      {ordered.length === 0 ? (
                        <p className="text-zinc-700 text-sm p-5 font-mono">No sessions yet.</p>
                      ) : (() => {
                        let lastDay: number | null = null
                        return ordered.map((s: Session & { id?: string }, i) => {
                          const showDay = s.day !== lastDay
                          if (showDay) lastDay = s.day
                          const isActive = s.id === currentSessionId
                          const isEditing = s.id === editingId
                          return (
                            <div key={s.id}>
                              {showDay && (
                                <div className="px-5 py-1.5 bg-[#0d0d0b] border-b border-[#1c1c1a] sticky top-[41px] z-[5]">
                                  <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-amber-500">Day {s.day}</span>
                                </div>
                              )}
                              <div className={`px-5 py-3 flex items-center gap-3 transition-all ${
                                isEditing ? 'bg-[#080f1c] border-l-4 border-blue-500' :
                                isActive  ? 'bg-[#181500] border-l-4 border-amber-500' :
                                            'border-l-4 border-transparent'
                              }`}>
                                <span className="font-mono text-zinc-700 text-xs w-5 shrink-0">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {s.startTime && <span className="font-mono text-zinc-600 text-xs tabular-nums">{s.startTime}</span>}
                                    <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-zinc-300'}`}>{s.title}</span>
                                    {s.duration && <span className="text-zinc-700 text-xs font-mono">{s.duration}m</span>}
                                    {isActive && <span className="text-[9px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-1.5 py-px animate-pulse">LIVE</span>}
                                    {isEditing && <span className="text-[9px] font-mono text-blue-400 uppercase">editing</span>}
                                  </div>
                                  {s.speaker && (
                                    <div className="text-zinc-600 text-xs mt-0.5">
                                      {s.speaker.split(',').map((n, i) => <div key={i}>{n.trim()}</div>)}
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                  <button onClick={() => startEdit(s)} className="text-xs font-mono bg-[#1e1e1c] hover:bg-blue-800/60 text-zinc-500 hover:text-white px-2 py-1 transition-colors">Edit</button>
                                  <button onClick={() => deleteSession(s.id!)} className="text-xs font-mono bg-[#1e1e1c] hover:bg-red-900/60 text-zinc-600 hover:text-white px-2 py-1 transition-colors">Del</button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      })()}
                    </div>
                  </div>

                  {/* Import & Seed */}
                  <div className="px-5 py-4 space-y-3">
                    <div>
                      <button onClick={seedSessionsFromBriefing} className="w-full bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/30 hover:border-amber-500/50 px-4 py-2.5 font-mono text-sm text-amber-300 text-left transition-colors">
                        Import Sessions from Briefing Data →
                      </button>
                      <p className="text-[10px] font-mono text-zinc-700 mt-1 px-1">Converts the briefing sessions into live programme entries. Replaces existing sessions.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={seedBriefing}  className="bg-[#1e1e1c] hover:bg-[#2a2a26] px-4 py-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors">Seed Briefing Data</button>
                      <button onClick={seedChecklist} className="bg-[#1e1e1c] hover:bg-[#2a2a26] px-4 py-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors">Seed Checklist Data</button>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>{/* end right col */}

        </div>
      </div>
    </div>
  )
}
