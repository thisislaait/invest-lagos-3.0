'use client'
import { useCallback, useEffect, useRef } from 'react'

export function useChime() {
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const init = () => {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      }
    }
    window.addEventListener('click', init, { once: true })
    return () => window.removeEventListener('click', init)
  }, [])

  const playTone = useCallback((freq: number, delay: number, dur: number) => {
    const ctx = ctxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.4, ctx.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur)
    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + dur + 0.1)
  }, [])

  const playChime = useCallback((type: 'warning' | 'overrun') => {
    if (type === 'warning') { playTone(660, 0, 0.4); playTone(660, 0.5, 0.4) }
    else { playTone(880, 0, 0.3); playTone(880, 0.35, 0.3); playTone(880, 0.7, 0.6) }
  }, [playTone])

  return playChime
}
