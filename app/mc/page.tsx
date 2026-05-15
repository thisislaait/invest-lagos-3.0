'use client'
import { useEffect, useRef, useState } from 'react'
import RoleHeader from '@/components/RoleHeader'
import FlashBanner from '@/components/FlashBanner'
import { useEventState } from '@/hooks/useEventState'
import { useRole } from '@/hooks/useRole'
import { useTimer, formatDisplay, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'

function renderScript(raw: string) {
  return raw.split('\n').map((line, i) => {
    if (line.startsWith('>> ')) {
      return (
        <div key={i} className="flex gap-3 my-3">
          <div className="w-1 shrink-0 bg-amber-500 rounded-full" />
          <div className="bg-amber-500/10 border border-amber-500/25 px-4 py-2.5 text-amber-300 text-base font-mono leading-relaxed flex-1">
            {line.slice(3)}
          </div>
        </div>
      )
    }
    if (line.trim() === '') return <div key={i} className="h-4" />
    return (
      <p key={i} className="text-2xl leading-relaxed text-zinc-100">
        {line}
      </p>
    )
  })
}

export default function McPage() {
  useRole('mc')
  const { currentSession, nextSession, currentSessionId, timer, timerMode, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)
  const display = formatDisplay(seconds, timerMode, currentSession?.duration)

  const [autoScroll, setAutoScroll] = useState(true)
  const lastChimeId = useRef<string | null>(null)
  const warnedRef = useRef(false)
  const overrunRef = useRef(false)
  const scriptRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (currentSessionId !== lastChimeId.current) {
      lastChimeId.current = currentSessionId
      warnedRef.current = false
      overrunRef.current = false
      if (autoScroll) scriptRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (!currentSession?.duration) return
    const limit = currentSession.duration * 60
    if (seconds >= limit && !overrunRef.current) { overrunRef.current = true; playChime('overrun') }
    else if (seconds >= limit - 120 && seconds < limit && !warnedRef.current) { warnedRef.current = true; playChime('warning') }
  }, [seconds, currentSession, currentSessionId, playChime, autoScroll])

  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const timerStatus = color === 'red' ? 'OVERRUN' : color === 'yellow' ? '2 min left' : 'On time'

  return (
    <div className="h-screen bg-[#0d0d0b] text-white flex flex-col overflow-hidden pb-14">

      {/* Header */}
      <div className="shrink-0">
        <RoleHeader role="MC" clock={clock} connected={connected} />
      </div>

      {/* Timer bar */}
      <div className="px-5 pt-6 pb-5 border-b border-[#1c1c1a] shrink-0">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className={`text-8xl font-mono font-black leading-none tabular-nums ${timerColorClass}`}>
              {display}
            </div>
            <div className={`text-lg font-mono font-semibold mt-2 tracking-wide ${timerColorClass}`}>
              {timerStatus}
            </div>
          </div>
          <div className="text-right pb-1">
            <div className="flex items-center gap-2 flex-wrap justify-end mb-1">
              {currentSession && (
                <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-2 py-0.5 animate-pulse">LIVE</span>
              )}
              <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">{currentSession?.type || ''}</span>
              {currentSession?.duration && (
                <span className="text-[10px] font-mono text-zinc-600">{currentSession.duration}m allotted</span>
              )}
            </div>
            <div className="text-2xl font-bold text-zinc-100 leading-tight max-w-xs text-right">
              {currentSession?.title || 'Standby'}
            </div>
            {currentSession?.speaker && (
              <div className="text-zinc-400 text-base mt-0.5">{currentSession.speaker}</div>
            )}
          </div>
        </div>
      </div>

      {/* Script area — scrollable */}
      <div ref={scriptRef} className="flex-1 overflow-y-auto px-5 py-6">

        {/* Auto-scroll toggle */}
        <div className="flex items-center justify-end mb-5">
          <button
            onClick={() => setAutoScroll(v => !v)}
            className={`flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 border transition-colors ${
              autoScroll
                ? 'border-amber-600/50 text-amber-500 bg-amber-600/10 hover:bg-amber-600/20'
                : 'border-[#222220] text-zinc-600 hover:text-zinc-400'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${autoScroll ? 'bg-amber-500' : 'bg-zinc-700'}`} />
            Auto-scroll {autoScroll ? 'on' : 'off'}
          </button>
        </div>

        {currentSession?.mcScript ? (
          <div className="space-y-1 max-w-2xl">
            <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-5">MC Script</div>
            {renderScript(currentSession.mcScript)}
          </div>
        ) : (
          <div className="text-zinc-700 font-mono text-sm">
            {currentSession ? 'No script for this session.' : 'Waiting for programme to start…'}
          </div>
        )}
      </div>

      {/* Next up bar */}
      <div className="border-t border-[#1c1c1a] px-5 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 shrink-0">Next</span>
          {nextSession ? (
            <>
              {nextSession.startTime && (
                <span className="font-mono text-zinc-500 text-xs shrink-0">{nextSession.startTime}</span>
              )}
              <span className="text-sm font-mono text-zinc-300 truncate">{nextSession.title}</span>
              {nextSession.speaker && (
                <span className="text-zinc-600 text-xs truncate">{nextSession.speaker}</span>
              )}
              {nextSession.duration && (
                <span className="font-mono text-zinc-700 text-xs shrink-0">{nextSession.duration}m</span>
              )}
            </>
          ) : (
            <span className="text-zinc-700 text-sm font-mono">
              {currentSessionId ? 'Last session' : '—'}
            </span>
          )}
        </div>
      </div>

      <FlashBanner text={message.text} active={message.active} />
    </div>
  )
}
