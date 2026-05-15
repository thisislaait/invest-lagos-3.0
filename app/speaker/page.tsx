'use client'
import { useEffect, useRef } from 'react'
import RoleHeader from '@/components/RoleHeader'
import FlashBanner from '@/components/FlashBanner'
import { useEventState } from '@/hooks/useEventState'
import { useTimer, formatTimer, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'

export default function SpeakerPage() {
  const { currentSession, nextSession, currentSessionId, timer, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)

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

  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'

  const timingLabel = () => {
    if (!currentSession?.duration) return 'On time'
    const limit = currentSession.duration * 60
    const remaining = limit - seconds
    if (seconds >= limit) return 'WRAP UP NOW'
    if (seconds >= limit - 120) return `${Math.floor(remaining / 60)}m ${remaining % 60}s left`
    return `${Math.floor(remaining / 60)}m ${remaining % 60}s left`
  }

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white flex flex-col overflow-hidden pb-14">
      <RoleHeader role="Speaker Monitor" clock={clock} connected={connected} />

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className={`font-mono font-black leading-none tabular-nums ${timerColorClass}`} style={{ fontSize: 'clamp(5rem, 22vw, 22rem)' }}>
          {formatTimer(seconds)}
        </div>
        <div className={`font-mono font-semibold mt-6 tracking-wide ${timerColorClass}`} style={{ fontSize: 'clamp(1.25rem, 4vw, 3.5rem)' }}>
          {timingLabel()}
        </div>
      </div>

      <div className="border-t border-[#1c1c1a] px-8 py-5">
        <div className="flex items-center gap-3 mb-1">
          {currentSession && (
            <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-2 py-0.5 animate-pulse">LIVE</span>
          )}
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">{currentSession?.type || ''}</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-200 mb-3">
          {currentSession?.title || 'Waiting for programme to start...'}
        </h2>
        <div className="flex items-center gap-3 opacity-40">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-500 shrink-0">Next</span>
          <span className="text-sm font-mono text-zinc-400 truncate">
            {nextSession ? nextSession.title : currentSessionId ? 'No more sessions' : '—'}
          </span>
        </div>
      </div>

      <FlashBanner text={message.text} active={message.active} />
    </div>
  )
}
