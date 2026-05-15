'use client'
import { useEffect, useRef, useState } from 'react'
import { ref, push, set, update, remove, get } from 'firebase/database'
import { db } from '@/lib/firebase'
import RoleHeader from '@/components/RoleHeader'
import { useEventState } from '@/hooks/useEventState'
import { useTimer, formatTimer, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'
import type { Session } from '@/lib/types'

const FIELD_CLASS = "w-full bg-[#0d0d0b] border border-[#2a2a26] px-3 py-2 text-sm text-white placeholder-zinc-700 font-mono focus:outline-none focus:border-amber-600"
const LABEL_CLASS = "text-[10px] uppercase tracking-widest font-mono text-zinc-600 mb-1 block"

const EMPTY_FORM = {
  title: '', type: 'speech', startTime: '', duration: '',
  speaker: '', moderator: '', mcScript: '', avCues: '', moderatorNotes: '', stageNotes: '',
  day: '1', date: '',
}

export default function AdminPage() {
  const { sessions, currentSession, ordered, currentSessionId, timer, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)

  const lastChimeId = useRef<string | null>(null)
  const warnedRef = useRef(false)
  const overrunRef = useRef(false)

  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [flashMsg, setFlashMsg] = useState('')

  useEffect(() => {
    if (currentSessionId !== lastChimeId.current) {
      lastChimeId.current = currentSessionId
      warnedRef.current = false
      overrunRef.current = false
    }
    if (!currentSession?.duration) return
    const limit = currentSession.duration * 60
    const sess = currentSession
    if (seconds >= limit && !overrunRef.current) {
      overrunRef.current = true
      playChime('overrun')
      if (currentSessionId && sess.status !== 'overrun') {
        update(ref(db, `sessions/${currentSessionId}`), { status: 'overrun' })
      }
    } else if (seconds >= limit - 120 && seconds < limit && !warnedRef.current) {
      warnedRef.current = true
      playChime('warning')
      if (currentSessionId && sess.status !== 'warning' && sess.status !== 'overrun') {
        update(ref(db, `sessions/${currentSessionId}`), { status: 'warning' })
      }
    }
  }, [seconds, currentSession, currentSessionId, playChime])

  function sessionToForm(s: Session & { id?: string }) {
    return {
      title: s.title || '',
      type: s.type || 'speech',
      startTime: s.startTime || '',
      duration: s.duration?.toString() || '',
      speaker: s.speaker || '',
      moderator: s.moderator || '',
      mcScript: s.mcScript || '',
      avCues: s.avCues || '',
      moderatorNotes: s.moderatorNotes || '',
      stageNotes: s.stageNotes || '',
      day: s.day?.toString() || '1',
      date: s.date || '',
    }
  }

  function startEdit(s: Session & { id?: string }) {
    setEditingId(s.id!)
    setForm(sessionToForm(s))
    window.scrollTo({ top: document.getElementById('session-form')?.offsetTop ?? 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  async function addSession() {
    if (!form.title.trim()) { alert('Session title is required.'); return }
    const order = Object.keys(sessions).length + 1
    const newRef = push(ref(db, 'sessions'))
    await set(newRef, {
      order,
      title: form.title.trim(),
      type: form.type,
      startTime: form.startTime,
      duration: parseInt(form.duration) || 0,
      speaker: form.speaker.trim(),
      moderator: form.moderator.trim(),
      mcScript: form.mcScript.trim(),
      avCues: form.avCues.trim(),
      moderatorNotes: form.moderatorNotes.trim(),
      stageNotes: form.stageNotes.trim(),
      day: parseInt(form.day) || 1,
      date: form.date.trim(),
      status: 'upcoming',
    })
    setForm(EMPTY_FORM)
  }

  async function updateSession() {
    if (!editingId) return
    if (!form.title.trim()) { alert('Session title is required.'); return }
    await update(ref(db, `sessions/${editingId}`), {
      title: form.title.trim(),
      type: form.type,
      startTime: form.startTime,
      duration: parseInt(form.duration) || 0,
      speaker: form.speaker.trim(),
      moderator: form.moderator.trim(),
      mcScript: form.mcScript.trim(),
      avCues: form.avCues.trim(),
      moderatorNotes: form.moderatorNotes.trim(),
      stageNotes: form.stageNotes.trim(),
      day: parseInt(form.day) || 1,
      date: form.date.trim(),
    })
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  async function markComplete() {
    if (!currentSessionId) {
      if (ordered.length === 0) { alert('No sessions in programme yet.'); return }
      await setCurrentSession(ordered[0].id!)
      return
    }
    await update(ref(db, `sessions/${currentSessionId}`), { status: 'completed' })
    const idx = ordered.findIndex(s => s.id === currentSessionId)
    if (idx < ordered.length - 1) {
      await setCurrentSession(ordered[idx + 1].id!)
      await set(ref(db, 'timer'), { running: true, startedAt: Date.now() + serverTimeOffset, baseSeconds: 0 })
    } else {
      await set(ref(db, 'currentSessionId'), null)
      await set(ref(db, 'timer'), { running: false, baseSeconds: 0, startedAt: null })
    }
  }

  async function setCurrentSession(id: string) {
    if (currentSessionId && currentSessionId !== id) {
      await update(ref(db, `sessions/${currentSessionId}`), { status: 'upcoming' })
    }
    await set(ref(db, 'currentSessionId'), id)
    await update(ref(db, `sessions/${id}`), { status: 'active' })
    await set(ref(db, 'timer'), { running: false, baseSeconds: 0, startedAt: null })
  }

  async function startTimer() {
    const snap = await get(ref(db, 'timer'))
    const t = snap.val() || {}
    await set(ref(db, 'timer'), { running: true, startedAt: Date.now() + serverTimeOffset, baseSeconds: t.baseSeconds || 0 })
  }

  async function pauseTimer() {
    const snap = await get(ref(db, 'timer'))
    const t = snap.val() || {}
    const elapsed = t.startedAt ? Math.floor((Date.now() + serverTimeOffset - t.startedAt) / 1000) : 0
    await set(ref(db, 'timer'), { running: false, startedAt: null, baseSeconds: (t.baseSeconds || 0) + elapsed })
  }

  async function resetTimer() {
    await set(ref(db, 'timer'), { running: false, baseSeconds: 0, startedAt: null })
  }

  async function adjustDuration(deltaMins: number) {
    if (!currentSessionId || !currentSession) return
    const newDuration = Math.max(1, (currentSession.duration || 0) + deltaMins)
    await update(ref(db, `sessions/${currentSessionId}`), { duration: newDuration })
  }

  async function deleteSession(id: string) {
    if (!confirm('Delete this session?')) return
    await remove(ref(db, `sessions/${id}`))
    if (currentSessionId === id) await set(ref(db, 'currentSessionId'), null)
    if (editingId === id) cancelEdit()
  }

  async function sendMessage() {
    if (!flashMsg.trim()) return
    await set(ref(db, 'message'), { text: flashMsg.trim(), active: true })
    setFlashMsg('')
  }

  async function clearMessage() {
    await set(ref(db, 'message'), { active: false, text: '' })
  }

  async function seedBriefing() {
    if (!confirm('Seed briefing data to Firebase? This replaces existing briefing data.')) return
    const { SESSIONS } = await import('@/lib/briefing-data')
    const data: Record<string, unknown> = {}
    SESSIONS.forEach(s => { data[String(s.id)] = s })
    await set(ref(db, 'briefing'), data)
    alert('Briefing data seeded.')
  }

  async function seedChecklist() {
    if (!confirm('Seed checklist data to Firebase? This replaces existing checklist data.')) return
    const { ASSETS, isSection } = await import('@/lib/checklist-data')
    const data: Record<string, unknown> = {}
    ASSETS.forEach((row, i) => {
      data[String(i)] = isSection(row)
        ? { _type: 'section', section: row.section }
        : { _type: 'asset', ...row }
    })
    await set(ref(db, 'checklist'), data)
    alert('Checklist data seeded.')
  }

  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const timerLabel = color === 'red' ? 'OVERRUN' : color === 'yellow' ? '2 min warning' : 'Session timer'

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white pb-14">
      <RoleHeader role="Programme Manager" clock={clock} connected={connected} />

      <div className="max-w-4xl mx-auto px-5 py-6 space-y-6">

        {/* Current session control */}
        <div className="bg-[#111110] border border-[#222220]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#222220]">
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Current Session</span>
            {currentSession ? (
              <span className="text-[10px] tracking-widest uppercase font-mono font-bold bg-amber-500 text-black px-2 py-0.5 animate-pulse">LIVE</span>
            ) : (
              <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">None active</span>
            )}
          </div>
          <div className="px-5 py-4">
            <div className="text-zinc-500 text-sm mb-4 font-mono">
              {currentSession ? (
                <>
                  <span className="text-white font-semibold">{currentSession.title}</span>
                  {currentSession.speaker && <> — <span className="text-zinc-400">{currentSession.speaker}</span></>}
                  {currentSession.duration ? <span className="text-zinc-600"> ({currentSession.duration}m)</span> : null}
                </>
              ) : 'No session running. Click "Mark Complete → Next Session" to start.'}
            </div>

            <div className="bg-[#0d0d0b] border border-[#222220] px-4 py-4 mb-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className={`text-4xl sm:text-5xl font-mono font-black tabular-nums leading-none ${timerColorClass}`}>
                    {formatTimer(seconds)}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mt-2">{timerLabel}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={startTimer} className="bg-green-700 hover:bg-green-600 px-4 py-2 text-sm font-mono font-semibold transition-colors">Start</button>
                    <button onClick={pauseTimer} className="bg-yellow-700 hover:bg-yellow-600 px-4 py-2 text-sm font-mono font-semibold transition-colors">Pause</button>
                    <button onClick={resetTimer} className="bg-[#222220] hover:bg-[#2e2e2a] px-4 py-2 text-sm font-mono font-semibold transition-colors">Reset</button>
                  </div>
                  {currentSession?.duration && (
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-zinc-600 self-center">Adjust allotted time:</span>
                      <button onClick={() => adjustDuration(-5)} className="bg-[#222220] hover:bg-red-900 px-3 py-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors">−5m</button>
                      <button onClick={() => adjustDuration(5)} className="bg-[#222220] hover:bg-zinc-700 px-3 py-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors">+5m</button>
                      <button onClick={() => adjustDuration(10)} className="bg-[#222220] hover:bg-zinc-700 px-3 py-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors">+10m</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button onClick={markComplete} className="w-full bg-amber-600 hover:bg-amber-500 py-3 font-mono font-bold text-sm tracking-wide transition-colors">
              MARK COMPLETE → NEXT SESSION
            </button>
          </div>
        </div>

        {/* Flash message */}
        <div className="bg-[#111110] border border-[#222220]">
          <div className="px-5 py-3 border-b border-[#222220]">
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Flash Message — Push to All Screens</span>
          </div>
          <div className="px-5 py-4 flex gap-3">
            <input
              type="text"
              value={flashMsg}
              onChange={e => setFlashMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="e.g. 5 minute delay — please hold..."
              className={`flex-1 ${FIELD_CLASS}`}
            />
            <button onClick={sendMessage} className="bg-amber-600 hover:bg-amber-500 px-4 py-2 font-mono font-bold text-sm transition-colors">Send</button>
            <button onClick={clearMessage} className="bg-[#222220] hover:bg-[#2e2e2a] px-4 py-2 font-mono text-sm text-zinc-400 transition-colors">Clear</button>
          </div>
          {message.active && message.text && (
            <div className="px-5 pb-4">
              <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2 flex items-center justify-between">
                <span className="text-amber-300 text-xs font-mono">{message.text}</span>
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest animate-pulse">Live on all screens</span>
              </div>
            </div>
          )}
        </div>

        {/* Add / Edit Session form */}
        <div id="session-form" className="bg-[#111110] border border-[#222220]">
          <div className="px-5 py-3 border-b border-[#222220] flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">
              {editingId ? 'Edit Session' : 'Add Session'}
            </span>
            {editingId && (
              <button onClick={cancelEdit} className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest">
                Cancel Edit
              </button>
            )}
          </div>
          <div className="px-5 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={LABEL_CLASS}>Session Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Opening Remarks" className={FIELD_CLASS} />
              </div>
              <div>
                <label className={LABEL_CLASS}>Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={FIELD_CLASS}>
                  <option value="speech">Speech</option>
                  <option value="panel">Panel Discussion</option>
                  <option value="keynote">Keynote</option>
                  <option value="performance">Performance</option>
                  <option value="break">Break</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={LABEL_CLASS}>Day</label>
                <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))} className={FIELD_CLASS}>
                  <option value="1">Day 1 — 8 June</option>
                  <option value="2">Day 2 — 9 June</option>
                  <option value="3">Day 3 — 10 June</option>
                </select>
              </div>
              <div>
                <label className={LABEL_CLASS}>Scheduled Start Time</label>
                <input type="time" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} className={FIELD_CLASS} />
              </div>
              <div>
                <label className={LABEL_CLASS}>Duration (minutes)</label>
                <input type="number" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="15" min="1" className={FIELD_CLASS} />
              </div>
              <div>
                <label className={LABEL_CLASS}>Speaker / Panelists</label>
                <input type="text" value={form.speaker} onChange={e => setForm(f => ({ ...f, speaker: e.target.value }))} placeholder="Full name + title" className={FIELD_CLASS} />
              </div>
              <div>
                <label className={LABEL_CLASS}>Moderator</label>
                <input type="text" value={form.moderator} onChange={e => setForm(f => ({ ...f, moderator: e.target.value }))} placeholder="Name (if applicable)" className={FIELD_CLASS} />
              </div>
              <div className="md:col-span-2">
                <label className={LABEL_CLASS}>MC Script / Intro</label>
                <textarea rows={2} value={form.mcScript} onChange={e => setForm(f => ({ ...f, mcScript: e.target.value }))} placeholder="What the MC says to introduce this session..." className={`${FIELD_CLASS} resize-none`} />
              </div>
              <div className="md:col-span-2">
                <label className={LABEL_CLASS}>AV / Tech Cues</label>
                <textarea rows={2} value={form.avCues} onChange={e => setForm(f => ({ ...f, avCues: e.target.value }))} placeholder="e.g. Play intro video, load slide deck 3, spotlight on podium..." className={`${FIELD_CLASS} resize-none`} />
              </div>
              <div className="md:col-span-2">
                <label className={LABEL_CLASS}>Moderator Notes / Discussion Topics</label>
                <textarea rows={2} value={form.moderatorNotes} onChange={e => setForm(f => ({ ...f, moderatorNotes: e.target.value }))} placeholder="Key topics, questions, speaker background notes..." className={`${FIELD_CLASS} resize-none`} />
              </div>
              <div className="md:col-span-2">
                <label className={LABEL_CLASS}>Stage Manager Notes</label>
                <textarea rows={2} value={form.stageNotes} onChange={e => setForm(f => ({ ...f, stageNotes: e.target.value }))} placeholder="e.g. Speaker enters from stage left, mic on podium, 2 chairs on stage..." className={`${FIELD_CLASS} resize-none`} />
              </div>
            </div>
            {editingId ? (
              <div className="mt-4 flex gap-3">
                <button onClick={updateSession} className="flex-1 bg-amber-600 hover:bg-amber-500 py-3 font-mono font-bold text-sm tracking-wide transition-colors">
                  UPDATE SESSION
                </button>
                <button onClick={cancelEdit} className="bg-[#222220] hover:bg-[#2e2e2a] px-6 py-3 font-mono text-sm text-zinc-400 transition-colors">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={addSession} className="mt-4 w-full bg-amber-600 hover:bg-amber-500 py-3 font-mono font-bold text-sm tracking-wide transition-colors">
                ADD TO PROGRAMME
              </button>
            )}
          </div>
        </div>

        {/* Programme rundown */}
        <div className="bg-[#111110] border border-[#222220]">
          <div className="px-5 py-3 border-b border-[#222220]">
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Programme Rundown</span>
          </div>
          <div className="divide-y divide-[#1a1a18]">
            {ordered.length === 0 ? (
              <p className="text-zinc-600 text-sm p-5 font-mono">No sessions added yet.</p>
            ) : (() => {
              let lastDay: number | null = null
              return ordered.map((s: Session & { id?: string }, i) => {
                const showDay = s.day !== lastDay
                if (showDay) lastDay = s.day
                const isActive = s.status === 'active'
                const isDone = s.status === 'completed'
                const isEditing = s.id === editingId
                const leftBorder = isEditing ? 'border-l-4 border-blue-500'
                  : isActive ? 'border-l-4 border-amber-500'
                  : 'border-l-4 border-transparent'
                const bgClass = isEditing ? 'bg-[#080f1c]'
                  : isActive ? 'bg-[#181500]'
                  : isDone ? 'opacity-40' : ''
                const titleColor = isDone ? 'text-zinc-500' : isActive ? 'text-white' : 'text-zinc-200'

                return (
                  <div key={s.id}>
                    {showDay && (
                      <div className="px-5 py-2 bg-[#0d0d0b] border-b border-[#222220] sticky top-0 z-10">
                        <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-amber-500">Day {s.day}</span>
                        {s.date && <span className="text-[10px] font-mono text-zinc-600 ml-2">{s.date}</span>}
                      </div>
                    )}
                    <div className={`px-5 py-4 ${leftBorder} ${bgClass}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-zinc-700 text-xs">#{i + 1}</span>
                            {s.startTime && <span className="font-mono text-zinc-500 text-xs">{s.startTime}</span>}
                            <span className={`font-semibold text-sm ${titleColor}`}>{s.title}</span>
                            <span className="text-[10px] font-mono text-zinc-600 uppercase">{s.type}</span>
                            {s.duration ? <span className="font-mono text-zinc-600 text-xs">{s.duration}m</span> : null}
                            {isActive && <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-2 py-0.5 animate-pulse">LIVE</span>}
                            {isDone && <span className="text-[10px] tracking-widest font-mono uppercase text-zinc-600">Done</span>}
                            {isEditing && <span className="text-[10px] tracking-widest font-mono uppercase text-blue-400">Editing</span>}
                          </div>
                          {s.speaker && <div className="text-zinc-500 text-xs mt-1 font-mono">{s.speaker}</div>}
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button onClick={() => setCurrentSession(s.id!)} className="text-xs font-mono bg-[#222220] hover:bg-amber-600 px-3 py-1 transition-colors">Set Live</button>
                          <button onClick={() => startEdit(s)} className="text-xs font-mono bg-[#222220] hover:bg-blue-700 text-zinc-400 hover:text-white px-3 py-1 transition-colors">Edit</button>
                          <button onClick={() => deleteSession(s.id!)} className="text-xs font-mono bg-[#222220] hover:bg-red-800 text-zinc-400 hover:text-white px-3 py-1 transition-colors">Del</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>

        {/* Database tools */}
        <div className="bg-[#111110] border border-[#222220]">
          <div className="px-5 py-3 border-b border-[#222220]">
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500">Database — Seed Static Data</span>
          </div>
          <div className="px-5 py-4 flex flex-wrap gap-3">
            <button onClick={seedBriefing} className="bg-[#222220] hover:bg-[#2e2e2a] px-4 py-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors">
              Seed Briefing Data
            </button>
            <button onClick={seedChecklist} className="bg-[#222220] hover:bg-[#2e2e2a] px-4 py-2 font-mono text-sm text-zinc-400 hover:text-white transition-colors">
              Seed Checklist Data
            </button>
            <p className="w-full text-[10px] font-mono text-zinc-700 mt-1">
              One-time operation. Pushes static briefing and checklist data to Firebase so it can be updated without redeploying.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
