'use client'
import { useEffect, useRef, useState } from 'react'
import type { TimerMode, TimerState } from '@/lib/types'

export function useTimer(timerState: TimerState, serverTimeOffset = 0) {
  const [seconds, setSeconds] = useState(0)
  const offsetRef = useRef(serverTimeOffset)
  offsetRef.current = serverTimeOffset

  useEffect(() => {
    if (timerState.running && timerState.startedAt) {
      const serverNow = Date.now() + offsetRef.current
      const base = Math.floor((serverNow - timerState.startedAt) / 1000) + (timerState.baseSeconds || 0)
      setSeconds(base)
      const interval = setInterval(() => setSeconds(s => s + 1), 1000)
      return () => clearInterval(interval)
    } else {
      setSeconds(timerState.baseSeconds || 0)
    }
  }, [timerState])

  return seconds
}

export function formatTimer(seconds: number): string {
  const m = Math.floor(Math.abs(seconds) / 60).toString().padStart(2, '0')
  const s = (Math.abs(seconds) % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

/** Shows remaining time counting down; shows +MM:SS when in overrun. */
export function formatRemaining(elapsed: number, durationMins: number): string {
  const limit = durationMins * 60
  if (elapsed >= limit) {
    const over = elapsed - limit
    return `+${formatTimer(over)}`
  }
  return formatTimer(limit - elapsed)
}

/** Picks the right display string based on timerMode. Falls back to elapsed when no duration. */
export function formatDisplay(elapsed: number, mode: TimerMode, durationMins?: number): string {
  if (mode === 'remaining' && durationMins) return formatRemaining(elapsed, durationMins)
  return formatTimer(elapsed)
}

export type TimerColor = 'green' | 'yellow' | 'red'

export function getTimerColor(seconds: number, durationMinutes?: number): TimerColor {
  if (!durationMinutes) return 'green'
  const limit = durationMinutes * 60
  if (seconds >= limit) return 'red'
  if (seconds >= limit - 120) return 'yellow'
  return 'green'
}
