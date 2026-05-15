'use client'
import RoleHeader from '@/components/RoleHeader'
import FlashBanner from '@/components/FlashBanner'
import { useEventState } from '@/hooks/useEventState'
import { useRole } from '@/hooks/useRole'
import { useTimer, formatDisplay, getTimerColor } from '@/hooks/useTimer'
import { useClock } from '@/hooks/useClock'

export default function AvPage() {
  useRole('av')
  const { currentSession, nextSession, currentSessionId, timer, timerMode, message, connected, serverTimeOffset } = useEventState()
  const seconds = useTimer(timer, serverTimeOffset)
  const clock = useClock()
  const color = getTimerColor(seconds, currentSession?.duration)
  const timerColorClass = color === 'red' ? 'text-red-400' : color === 'yellow' ? 'text-yellow-400' : 'text-green-400'
  const display = formatDisplay(seconds, timerMode, currentSession?.duration)

  const headerRight = (
    <div className="text-right shrink-0">
      <div className="font-mono text-zinc-600 text-[10px] tracking-widest mb-1">{clock}</div>
      <div className={`text-3xl sm:text-4xl font-mono font-black tabular-nums leading-none ${timerColorClass}`}>
        {display}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0d0d0b] text-white flex flex-col pb-14">
      <RoleHeader role="AV / Tech" right={headerRight} connected={connected} />

      <div className="flex-1 px-5 py-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] tracking-widest uppercase font-bold font-mono bg-amber-500 text-black px-2 py-0.5 animate-pulse">NOW</span>
          <span className="text-[10px] font-mono text-zinc-600">{currentSession?.startTime || ''}</span>
        </div>

        <h2 className="text-3xl font-bold leading-tight mb-1">
          {currentSession?.title || 'Waiting...'}
        </h2>
        <p className="text-zinc-500 text-sm mb-6">{currentSession?.speaker || ''}</p>

        {currentSession?.avCues ? (
          <div>
            <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-3">AV Cues</div>
            <div className="border-l-4 border-blue-500/40 pl-4 text-blue-100/90 text-sm leading-relaxed whitespace-pre-line">
              {currentSession.avCues}
            </div>
          </div>
        ) : (
          <div className="text-zinc-700 text-sm italic font-mono">No AV cues for this session.</div>
        )}
      </div>

      <div className="border-t border-[#1c1c1a] px-5 py-5">
        <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-3">Prepare Next</div>
        <h3 className="text-lg font-semibold text-zinc-300 mb-1">
          {nextSession ? nextSession.title : currentSessionId ? 'No more sessions' : '—'}
        </h3>
        <p className="text-zinc-500 text-sm mb-3">{nextSession?.speaker || ''}</p>
        {nextSession?.avCues && (
          <div>
            <div className="text-[10px] tracking-widest uppercase font-mono text-zinc-600 mb-2">Upcoming Cues</div>
            <div className="text-zinc-400 text-sm border-l-2 border-[#2a2a26] pl-3 leading-relaxed whitespace-pre-line">
              {nextSession.avCues}
            </div>
          </div>
        )}
      </div>

      <FlashBanner text={message.text} active={message.active} />
    </div>
  )
}
