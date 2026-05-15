'use client'
import { Fragment, useEffect, useRef } from 'react'
import FlashBanner from '@/components/FlashBanner'
import { useEventState } from '@/hooks/useEventState'
import { useTimer, formatTimer, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'
import type { Session } from '@/lib/types'

export default function StagePage() {
  const { currentSession, ordered, currentSessionId, timer, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)

  const lastChimeId = useRef<string | null>(null)
  const warnedRef = useRef(false)
  const overrunRef = useRef(false)
  const liveRowRef = useRef<HTMLTableRowElement | null>(null)

  useEffect(() => {
    if (currentSessionId !== lastChimeId.current) {
      lastChimeId.current = currentSessionId
      warnedRef.current = false
      overrunRef.current = false
      liveRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (!currentSession?.duration) return
    const limit = currentSession.duration * 60
    if (seconds >= limit && !overrunRef.current) { overrunRef.current = true; playChime('overrun') }
    else if (seconds >= limit - 120 && seconds < limit && !warnedRef.current) { warnedRef.current = true; playChime('warning') }
  }, [seconds, currentSession, currentSessionId, playChime])

  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'

  const timingStatus = () => {
    if (!currentSession?.duration) return ''
    const limit = currentSession.duration * 60
    const remaining = limit - seconds
    if (seconds >= limit) return `+${Math.floor((seconds - limit) / 60)}m overrun`
    return `${Math.floor(remaining / 60)}m ${remaining % 60}s left`
  }

  let lastDay: number | null = null

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white flex flex-col">

      {/* ── Header ── */}
      <div className="flex items-start justify-between px-4 py-3 border-b border-[#1c1c1a] gap-3 shrink-0">
        <div className="flex items-start gap-3 min-w-0">
          <a href="/" className="text-zinc-600 hover:text-zinc-400 font-mono text-sm transition-colors mt-1 shrink-0">←</a>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">Stage Manager — Run of Show</div>
              {connected === false && (
                <span className="text-[10px] tracking-widest uppercase font-mono text-red-500 animate-pulse">● offline</span>
              )}
            </div>
            <div className="text-base font-bold text-zinc-200 leading-tight truncate">
              {currentSession?.title || 'No active session'}
            </div>
            {currentSession?.speaker && <div className="text-zinc-500 text-xs mt-0.5 truncate">{currentSession.speaker}</div>}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-zinc-600 text-[10px] tracking-widest mb-1">{clock}</div>
          <div className={`text-3xl sm:text-5xl font-mono font-black tabular-nums leading-none ${timerColorClass}`}>
            {formatTimer(seconds)}
          </div>
          <div className={`text-xs font-mono mt-1 ${timerColorClass}`}>{timingStatus()}</div>
        </div>
      </div>

      {/* ── Cue table ── */}
      <div className="flex-1 overflow-auto pb-14">
        {ordered.length === 0 ? (
          <p className="text-zinc-600 text-sm p-5 font-mono">Programme not loaded yet.</p>
        ) : (
          <table className="w-full min-w-[860px] border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#0d0d0b] sticky top-0 z-10 border-b border-[#222220]">
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600 w-8">#</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600 w-16">Time</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600 w-12">Dur</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600">Session</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600 w-36">Speaker / Owner</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-amber-700 w-52">Stage Notes</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-blue-800 w-52">AV Cues</th>
                <th className="px-3 py-2 text-left text-[10px] tracking-widest uppercase text-zinc-600 w-20">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161614]">
              {ordered.map((s: Session & { id?: string }, i) => {
                const showDay = s.day !== lastDay
                if (showDay) lastDay = s.day

                const isActive  = s.id === currentSessionId
                const isDone    = s.status === 'completed'
                const isOverrun = s.status === 'overrun'
                const isWarning = s.status === 'warning'

                const rowBg = isActive  ? 'bg-[#181500]'
                            : isOverrun ? 'bg-[#180a0a]'
                            : isWarning ? 'bg-[#181400]'
                            : isDone    ? 'opacity-30'
                            : ''

                const leftBorder = isActive  ? 'border-l-4 border-amber-500'
                                 : isOverrun ? 'border-l-4 border-red-500'
                                 : isWarning ? 'border-l-4 border-yellow-500'
                                 : 'border-l-4 border-transparent'

                const statusBadge = isActive
                  ? <span className="tracking-widest uppercase font-bold bg-amber-500 text-black px-1.5 py-0.5 animate-pulse">LIVE</span>
                  : isOverrun
                  ? <span className="tracking-widest uppercase font-bold text-red-400 animate-pulse">OVERRUN</span>
                  : isWarning
                  ? <span className="tracking-widest uppercase font-bold text-yellow-400">2 MIN</span>
                  : isDone
                  ? <span className="text-zinc-600">✓ done</span>
                  : <span className="text-zinc-700">—</span>

                return (
                  <Fragment key={s.id}>
                    {showDay && (
                      <tr className="bg-[#0d0d0b] sticky top-[33px] z-[9]">
                        <td colSpan={8} className="px-3 py-1.5 border-b border-[#222220]">
                          <span className="text-[10px] tracking-widest uppercase font-bold text-amber-500">Day {s.day}</span>
                          {s.date && <span className="text-[10px] text-zinc-700 ml-2">{s.date}</span>}
                        </td>
                      </tr>
                    )}
                    <tr
                      ref={isActive ? liveRowRef : undefined}
                      className={`transition-all ${rowBg} ${leftBorder}`}
                    >
                      <td className="px-3 py-3 text-zinc-700 tabular-nums">{i + 1}</td>
                      <td className="px-3 py-3 tabular-nums text-zinc-500">{s.startTime || '—'}</td>
                      <td className="px-3 py-3 tabular-nums text-zinc-600">{s.duration ? `${s.duration}m` : '—'}</td>
                      <td className="px-3 py-3">
                        <div className={`font-semibold leading-snug ${isDone ? 'text-zinc-500' : isActive ? 'text-white' : 'text-zinc-200'}`}>
                          {s.title}
                        </div>
                        <div className="text-zinc-700 uppercase text-[10px] mt-0.5">{s.type}</div>
                      </td>
                      <td className="px-3 py-3">
                        {s.speaker && <div className="text-zinc-300 leading-snug">{s.speaker}</div>}
                        {s.moderator && <div className="text-zinc-600 mt-0.5">mod: {s.moderator}</div>}
                        {!s.speaker && !s.moderator && <span className="text-zinc-700">—</span>}
                      </td>
                      <td className="px-3 py-3 text-amber-200/70 leading-relaxed whitespace-pre-wrap">
                        {s.stageNotes || <span className="text-zinc-800">—</span>}
                      </td>
                      <td className="px-3 py-3 text-blue-300/70 leading-relaxed whitespace-pre-wrap">
                        {s.avCues || <span className="text-zinc-800">—</span>}
                      </td>
                      <td className="px-3 py-3">{statusBadge}</td>
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <FlashBanner text={message.text} active={message.active} />
    </div>
  )
}
