'use client'
import { useEffect, useRef } from 'react'
import RoleHeader from '@/components/RoleHeader'
import FlashBanner from '@/components/FlashBanner'
import { useEventState } from '@/hooks/useEventState'
import { useRole } from '@/hooks/useRole'
import { useTimer, formatDisplay, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'
import { useChime } from '@/hooks/useChime'

function parseSpeaker(raw: string): { name: string; subtitle: string } {
  const sep = raw.includes(' — ') ? ' — ' : raw.includes(' - ') ? ' - ' : null
  if (sep) {
    const idx = raw.indexOf(sep)
    return { name: raw.slice(0, idx).trim(), subtitle: raw.slice(idx + sep.length).trim() }
  }
  return { name: raw, subtitle: '' }
}

function renderNotes(raw: string) {
  return raw.split('\n').map((line, i) => {
    if (line.startsWith('Q: ') || line.startsWith('Q:')) {
      const text = line.replace(/^Q:\s*/, '')
      return (
        <div key={i} className="flex gap-3 my-3">
          <div className="shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 text-[10px] font-bold font-mono">Q</span>
          </div>
          <div className="flex-1 border border-[#2a2a26] bg-[#111110] px-4 py-3 text-zinc-200 text-base leading-relaxed">
            {text}
          </div>
        </div>
      )
    }
    if (line.startsWith('>> ')) {
      return (
        <div key={i} className="flex gap-3 my-3">
          <div className="w-1 shrink-0 bg-amber-500 rounded-full" />
          <div className="bg-amber-500/10 border border-amber-500/25 px-4 py-2.5 text-amber-300 text-sm font-mono leading-relaxed flex-1">
            {line.slice(3)}
          </div>
        </div>
      )
    }
    if (line.trim() === '') return <div key={i} className="h-3" />
    return (
      <p key={i} className="text-zinc-400 text-sm leading-relaxed">
        {line}
      </p>
    )
  })
}

export default function ModeratorPage() {
  useRole('moderator')
  const { currentSession, nextSession, currentSessionId, timer, timerMode, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const playChime = useChime()
  const color = getTimerColor(seconds, currentSession?.duration)
  const display = formatDisplay(seconds, timerMode, currentSession?.duration)

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

  const limit = currentSession?.duration ? currentSession.duration * 60 : null
  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const blockBg = color === 'red' ? 'bg-[#180808] border-b border-red-900/60' : color === 'yellow' ? 'bg-[#181400] border-b border-yellow-900/60' : 'border-b border-[#1c1c1a]'

  const timingLabel = () => {
    if (!limit) return 'On time'
    if (seconds >= limit) return 'WRAP UP NOW'
    if (seconds >= limit - 120) return '2 min left — start wrapping up'
    return `${Math.floor((limit - seconds) / 60)} min remaining`
  }

  const speakerParsed = currentSession?.speaker ? parseSpeaker(currentSession.speaker) : null

  return (
    <div className="h-screen bg-[#0d0d0b] text-white flex flex-col overflow-hidden pb-14">
      <div className="shrink-0">
        <RoleHeader role="Moderator" clock={clock} connected={connected} />
      </div>

      {/* Timer */}
      <div className={`px-5 pt-6 pb-5 shrink-0 ${blockBg}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className={`text-7xl font-mono font-black leading-none tabular-nums ${timerColorClass}`}>
              {display}
            </div>
            <div className={`text-lg font-mono font-semibold mt-2 ${timerColorClass}`}>
              {timingLabel()}
            </div>
          </div>
          <div className="text-right pb-1">
            <div className="flex items-center gap-2 flex-wrap justify-end mb-1">
              {currentSession && (
                <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-2 py-0.5 animate-pulse">LIVE</span>
              )}
              <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-600">{currentSession?.type || ''}</span>
              {currentSession?.startTime && (
                <span className="text-[10px] font-mono text-zinc-600">{currentSession.startTime}</span>
              )}
            </div>
            <div className="text-xl font-bold text-zinc-100 leading-tight max-w-xs text-right">
              {currentSession?.title || 'Standby'}
            </div>
            {currentSession?.moderator && (
              <div className="text-amber-400/60 text-xs mt-0.5">mod: {currentSession.moderator}</div>
            )}
          </div>
        </div>
      </div>

      {/* Main content — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-5">

        {/* Speaker bio card */}
        {speakerParsed && (
          <div className="bg-[#111110] border border-[#222220] border-l-4 border-l-zinc-500 px-5 py-4 mb-5">
            <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-3">Speaker</div>
            <div className="text-2xl font-bold text-zinc-100 leading-tight">{speakerParsed.name}</div>
            {speakerParsed.subtitle && (
              <div className="text-zinc-400 text-sm mt-1 leading-snug">{speakerParsed.subtitle}</div>
            )}
          </div>
        )}

        {/* Discussion notes */}
        {currentSession?.moderatorNotes ? (
          <div>
            <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-3">Discussion Notes</div>
            <div className="space-y-0.5">
              {renderNotes(currentSession.moderatorNotes)}
            </div>
            <div className="mt-4 text-[10px] font-mono text-zinc-700">
              Tip: prefix lines with <span className="text-zinc-500">Q:</span> for questions · <span className="text-zinc-500">&gt;&gt;</span> for PM directions
            </div>
          </div>
        ) : (
          <div className="text-zinc-700 font-mono text-sm">
            {currentSession ? 'No notes for this session.' : 'Waiting for programme to start…'}
          </div>
        )}
      </div>

      {/* Next up */}
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
