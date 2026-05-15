'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useEventState } from '@/hooks/useEventState'
import { useTimer, formatTimer, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'
import { useBriefingData } from '@/hooks/useBriefingData'
import FlashBanner from '@/components/FlashBanner'
import type { Session } from '@/lib/types'
import type { BriefingSession, Flag, AvcCue } from '@/lib/briefing-data'

function clockToMins(clock: string): number {
  const [h, m] = clock.split(':').map(Number)
  return h * 60 + m
}

function drift(session: Session | null, clock: string): number | null {
  if (!session?.startTime || !clock) return null
  return clockToMins(clock) - clockToMins(session.startTime)
}

function startsIn(startTime: string | undefined, clock: string): string | null {
  if (!startTime || !clock) return null
  const diff = clockToMins(startTime) - clockToMins(clock)
  if (diff <= 0) return null
  return diff < 60 ? `${diff}m` : `${Math.floor(diff / 60)}h ${diff % 60}m`
}

// ── Drawer ────────────────────────────────────────────────────────────────────

function FlagRow({ flag }: { flag: Flag }) {
  const colors = {
    warn: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    info: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    ok:   'text-green-400 bg-green-500/10 border-green-500/30',
  }
  const icons = { warn: '⚠', info: 'ℹ', ok: '✓' }
  return (
    <div className={`flex gap-2 items-start border px-3 py-2 rounded text-xs font-mono leading-relaxed ${colors[flag.kind]}`}>
      <span className="shrink-0 mt-px">{icons[flag.kind]}</span>
      <span>{flag.text}</span>
    </div>
  )
}

function CueRow({ cue }: { cue: AvcCue }) {
  const accent = cue.type === 'av' ? 'text-blue-400' : cue.type === 'warn' ? 'text-amber-400' : 'text-zinc-400'
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-3 py-2.5 border-b border-[#1a1a18] last:border-0">
      <span className={`text-[10px] font-mono uppercase tracking-widest pt-px shrink-0 ${accent}`}>{cue.label}</span>
      <span className="text-sm text-zinc-300 leading-relaxed">{cue.text}</span>
    </div>
  )
}

function ScreenRow({ slot }: { slot: BriefingSession['screenContent'][number] }) {
  return (
    <div className="py-2.5 border-b border-[#1a1a18] last:border-0">
      <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{slot.slot}</div>
      {slot.type === 'title' && (
        <div>
          <div className="text-sm font-semibold text-zinc-200">{slot.title}</div>
          {slot.sub && <div className="text-xs text-zinc-500 mt-0.5">{slot.sub}</div>}
        </div>
      )}
      {slot.type === 'lt' && (
        <div>
          <div className="text-sm font-semibold text-zinc-200">{slot.name}</div>
          <div className="text-xs text-zinc-500 mt-0.5">{slot.role}{slot.org ? ` · ${slot.org}` : ''}</div>
        </div>
      )}
      {slot.type === 'logo' && <div className="text-xs text-zinc-400">{slot.text}</div>}
      {slot.type === 'note' && <div className="text-xs text-zinc-500 italic">{slot.text}</div>}
    </div>
  )
}

function SessionDrawer({
  session, brief, onClose,
}: {
  session: (Session & { id?: string }) | null
  brief: BriefingSession | null
  onClose: () => void
}) {
  const visible = !!session

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-30 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-[#0f0f0d] z-40 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        {session && (
          <>
            {/* Drawer header */}
            <div className="px-6 py-5 border-b border-[#1c1c1a] shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
                    {session.type}{session.startTime ? ` · ${session.startTime}` : ''}{session.duration ? ` · ${session.duration}m` : ''}
                  </p>
                  <h2 className="text-xl font-bold text-white leading-snug">{session.title}</h2>
                  {session.speaker && <p className="text-zinc-400 text-sm mt-1">{session.speaker}</p>}
                  {session.moderator && <p className="text-zinc-600 text-xs mt-0.5">Moderated by {session.moderator}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0 mt-1 text-lg leading-none"
                >✕</button>
              </div>

              {/* Flags */}
              {brief?.flags && brief.flags.length > 0 && (
                <div className="mt-3 space-y-2">
                  {brief.flags.map((f, i) => <FlagRow key={i} flag={f} />)}
                </div>
              )}
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto">

              {/* Overview */}
              {brief?.overview && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">Overview</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {brief.overview.venue && (
                      <div>
                        <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-wide mb-0.5">Venue</div>
                        <div className="text-sm text-zinc-300">{brief.overview.venue}</div>
                      </div>
                    )}
                    {brief.overview.format && (
                      <div>
                        <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-wide mb-0.5">Format</div>
                        <div className="text-sm text-zinc-300">{brief.overview.format}</div>
                      </div>
                    )}
                    {brief.overview.config && (
                      <div className="col-span-2">
                        <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-wide mb-0.5">Stage Config</div>
                        <div className="text-sm text-zinc-300 leading-relaxed">{brief.overview.config}</div>
                      </div>
                    )}
                    {brief.overview.objective && (
                      <div className="col-span-2">
                        <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-wide mb-0.5">Objective</div>
                        <div className="text-sm text-zinc-500 leading-relaxed italic">{brief.overview.objective}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AV Cues */}
              {brief?.avCues && brief.avCues.length > 0 && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">AV & Stage Cues</h3>
                  <div className="divide-y divide-[#1a1a18]">
                    {brief.avCues.map((c, i) => <CueRow key={i} cue={c} />)}
                  </div>
                </div>
              )}

              {/* Screen Content */}
              {brief?.screenContent && brief.screenContent.length > 0 && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Screen Content</h3>
                  {brief.screenContent.map((s, i) => <ScreenRow key={i} slot={s} />)}
                </div>
              )}

              {/* MC Script */}
              {(brief?.mcScript || session.mcScript) && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">MC Script</h3>
                  {brief?.mcDirection && (
                    <div className="flex gap-2 mb-3">
                      <div className="w-0.5 bg-amber-500/50 shrink-0 rounded" />
                      <p className="text-xs text-amber-400/80 italic leading-relaxed">{brief.mcDirection}</p>
                    </div>
                  )}
                  <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                    {brief?.mcScript || session.mcScript}
                  </p>
                </div>
              )}

              {/* Moderator */}
              {(brief?.moderatorNotes || session.moderatorNotes || (brief?.moderatorQuestions && brief.moderatorQuestions.length > 0)) && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Moderator Notes</h3>
                  {(brief?.moderatorNotes || session.moderatorNotes) && (
                    <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-3">
                      {brief?.moderatorNotes || session.moderatorNotes}
                    </p>
                  )}
                  {brief?.moderatorQuestions && brief.moderatorQuestions.length > 0 && (
                    <div className="space-y-2">
                      {brief.moderatorQuestions.map((q, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-[#1e1e1c] flex items-center justify-center text-[10px] font-mono text-zinc-500 mt-px">{i + 1}</span>
                          <p className="text-sm text-zinc-300 leading-relaxed">{q}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Stage notes fallback */}
              {!brief && session.stageNotes && (
                <div className="px-6 py-5 border-b border-[#1c1c1a]">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Stage Notes</h3>
                  <p className="text-sm text-amber-200/80 leading-relaxed">{session.stageNotes}</p>
                </div>
              )}
              {!brief && session.avCues && (
                <div className="px-6 py-5">
                  <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">AV Cues</h3>
                  <p className="text-sm text-blue-300/80 leading-relaxed">{session.avCues}</p>
                </div>
              )}

              <div className="h-20" />
            </div>
          </>
        )}
      </div>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const {
    currentSession, nextSession, currentSessionId, ordered,
    timer, message, connected, serverTimeOffset,
  } = useEventState()
  const { sessions: briefingSessions } = useBriefingData()

  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)

  const [selectedDay, setSelectedDay] = useState(1)
  const [drawerSession, setDrawerSession] = useState<(Session & { id?: string }) | null>(null)

  const lastChimeId = useRef<string | null>(null)
  const warnedRef = useRef(false)
  const overrunRef = useRef(false)

  useEffect(() => {
    if (currentSessionId !== lastChimeId.current) {
      lastChimeId.current = currentSessionId
      warnedRef.current = false
      overrunRef.current = false
    }
    if (!currentSession?.duration) return
    const limit = currentSession.duration * 60
    if (seconds >= limit && !overrunRef.current) { overrunRef.current = true; playChime('overrun') }
    else if (seconds >= limit - 120 && seconds < limit && !warnedRef.current) { warnedRef.current = true; playChime('warning') }
  }, [seconds, currentSession, currentSessionId, playChime])

  useEffect(() => {
    if (currentSession?.day) setSelectedDay(currentSession.day)
  }, [currentSession?.day])

  const scheduleDrift = drift(currentSession, clock)
  const nextIn = nextSession ? startsIn(nextSession.startTime, clock) : null
  const timerColor = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const timerLabel = color === 'red' ? 'OVERRUN' : color === 'yellow' ? '2 min left' : timer.running ? 'running' : 'paused'

  const days = [...new Set(ordered.map(s => s.day))].sort()
  const multiDay = days.length > 1
  const daySessions = ordered.filter(s => s.day === selectedDay)

  function getBrief(s: Session & { id?: string }): BriefingSession | null {
    return briefingSessions.find(b => b.day === s.day && b.order === s.order) ?? null
  }

  const drawerBrief = drawerSession ? getBrief(drawerSession) : null

  return (
    <div className="min-h-screen bg-[#0c0c0a] text-white pb-14 flex flex-col">

      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-20 bg-[#0c0c0a]/95 backdrop-blur border-b border-white/[0.06]">

        {/* Micro nav */}
        <div className="flex items-center justify-between px-5 py-2">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">←</Link>
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-700">Programme</span>
            {connected === false && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" title="Offline" />
            )}
          </div>
          <span className="font-mono text-zinc-600 text-xs tabular-nums">{clock}</span>
        </div>

        {/* Live pulse — the heart of the bar */}
        <div className="px-5 pb-5">
          {currentSession ? (
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                {/* Status line */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase bg-amber-500 text-black px-2 py-0.5 font-bold animate-pulse">
                    LIVE
                  </span>
                  {scheduleDrift !== null && (
                    <span className={`text-sm font-mono font-semibold tabular-nums ${
                      scheduleDrift > 10 ? 'text-red-400' :
                      scheduleDrift > 3  ? 'text-amber-400' :
                      scheduleDrift < -3 ? 'text-blue-400' :
                                           'text-green-400'
                    }`}>
                      {scheduleDrift >= 0 ? '+' : '−'}{Math.abs(scheduleDrift)}m
                    </span>
                  )}
                </div>
                {/* Session name — the hero */}
                <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">
                  {currentSession.title}
                </h1>
                {currentSession.speaker && (
                  <p className="text-zinc-500 text-sm mt-0.5">{currentSession.speaker}</p>
                )}
                {/* Next session */}
                {nextSession && (
                  <p className="text-zinc-700 text-xs font-mono mt-2">
                    next —{' '}
                    <span className="text-zinc-500">{nextSession.title}</span>
                    {nextIn && <span className="text-zinc-700"> in {nextIn}</span>}
                  </p>
                )}
              </div>

              {/* Timer — always visible, right-aligned */}
              <div className="text-right shrink-0">
                <div className={`text-5xl font-mono font-black tabular-nums leading-none ${timerColor}`}>
                  {formatTimer(seconds)}
                </div>
                <div className={`text-[10px] font-mono mt-1.5 ${timerColor} opacity-70`}>
                  {timerLabel}{currentSession.duration ? ` · ${currentSession.duration}m` : ''}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-600 text-sm font-mono">No session running</p>
                {nextSession && (
                  <p className="text-zinc-500 text-xs font-mono mt-1">
                    up next — <span className="text-zinc-300">{nextSession.title}</span>
                    {nextIn && <span className="text-zinc-600"> in {nextIn}</span>}
                  </p>
                )}
              </div>
              <div className={`text-4xl font-mono font-black tabular-nums ${timerColor}`}>
                {formatTimer(seconds)}
              </div>
            </div>
          )}
        </div>

        {/* Day tabs */}
        {multiDay && (
          <div className="flex border-t border-white/[0.05]">
            {days.map(d => {
              const isLive = currentSession?.day === d
              const count = ordered.filter(s => s.day === d).length
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`flex-1 py-2.5 text-xs font-mono transition-colors border-b-2 ${
                    selectedDay === d
                      ? 'border-amber-500 text-white'
                      : 'border-transparent text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  Day {d}
                  {isLive && <span className="ml-1.5 inline-block w-1 h-1 rounded-full bg-amber-500 animate-pulse align-middle" />}
                  <span className="ml-1.5 text-zinc-700">{count}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Timeline ── */}
      <div className="flex-1 px-5">
        {ordered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-zinc-700 text-sm mb-2">No sessions yet.</p>
            <Link href="/admin" className="text-amber-500 hover:text-amber-400 text-xs font-mono transition-colors">
              → Add sessions in Admin
            </Link>
          </div>
        ) : daySessions.length === 0 ? (
          <p className="text-zinc-800 text-sm py-12 text-center font-mono">No sessions this day.</p>
        ) : daySessions.map((s: Session & { id?: string }, idx) => {
          const isActive  = s.id === currentSessionId
          const isDone    = s.status === 'completed'
          const isOverrun = s.status === 'overrun'
          const isWarning = s.status === 'warning'
          const isNext    = s.id === nextSession?.id && !isActive
          const isFirst   = idx === 0

          return (
            <button
              key={s.id}
              onClick={() => setDrawerSession(s)}
              className={`w-full text-left border-b border-white/[0.04] transition-all ${
                isFirst ? 'mt-4' : ''
              } ${
                isActive
                  ? 'py-5 border-l-[3px] border-l-amber-500 pl-4 -ml-5 pr-0 bg-amber-500/[0.04]'
                  : isDone
                  ? 'py-3.5 opacity-35'
                  : 'py-3.5 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {/* Time row */}
                  <div className="flex items-center gap-2.5 mb-1">
                    {s.startTime && (
                      <span className="font-mono text-zinc-600 text-xs tabular-nums">{s.startTime}</span>
                    )}
                    {s.duration && (
                      <span className="font-mono text-zinc-800 text-xs">{s.duration}m</span>
                    )}
                    {isActive && (
                      <span className="text-[9px] font-mono tracking-widest uppercase bg-amber-500 text-black px-1.5 py-px font-bold animate-pulse">LIVE</span>
                    )}
                    {isOverrun && (
                      <span className="text-[9px] font-mono tracking-widest uppercase text-red-500 animate-pulse">overrun</span>
                    )}
                    {isWarning && (
                      <span className="text-[9px] font-mono tracking-widest uppercase text-yellow-500">2 min</span>
                    )}
                    {isNext && (
                      <span className="text-[9px] font-mono text-zinc-600 border border-zinc-800 px-1.5 py-px">next</span>
                    )}
                  </div>
                  {/* Title */}
                  <p className={`font-semibold leading-snug ${
                    isActive ? 'text-white text-base' : isDone ? 'text-zinc-600 text-sm' : 'text-zinc-200 text-sm'
                  }`}>
                    {s.title}
                  </p>
                  {/* Speaker */}
                  {s.speaker && (
                    <p className={`text-xs mt-0.5 truncate ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {s.speaker}
                    </p>
                  )}
                </div>

                {/* Right side: done check or arrow */}
                <div className="shrink-0 self-center">
                  {isDone
                    ? <span className="text-zinc-700 text-xs font-mono">✓</span>
                    : <span className="text-zinc-800 text-sm">›</span>
                  }
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <SessionDrawer
        session={drawerSession}
        brief={drawerBrief}
        onClose={() => setDrawerSession(null)}
      />
      <FlashBanner text={message.text} active={message.active} />
    </div>
  )
}
