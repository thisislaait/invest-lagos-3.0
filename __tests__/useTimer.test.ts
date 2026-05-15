import { describe, it, expect } from 'vitest'
import { formatTimer, getTimerColor } from '@/hooks/useTimer'

describe('formatTimer', () => {
  it('formats zero as 00:00', () => {
    expect(formatTimer(0)).toBe('00:00')
  })

  it('formats seconds under a minute', () => {
    expect(formatTimer(9)).toBe('00:09')
    expect(formatTimer(59)).toBe('00:59')
  })

  it('formats exactly one minute', () => {
    expect(formatTimer(60)).toBe('01:00')
  })

  it('formats minutes and seconds', () => {
    expect(formatTimer(65)).toBe('01:05')
    expect(formatTimer(125)).toBe('02:05')
  })

  it('formats large values correctly', () => {
    expect(formatTimer(3600)).toBe('60:00')
    expect(formatTimer(3661)).toBe('61:01')
  })
})

describe('getTimerColor', () => {
  it('returns green when no duration set', () => {
    expect(getTimerColor(0)).toBe('green')
    expect(getTimerColor(999)).toBe('green')
  })

  it('returns green well before the limit', () => {
    expect(getTimerColor(0, 10)).toBe('green')
    expect(getTimerColor(479, 10)).toBe('green')
  })

  it('returns yellow in the last 2 minutes', () => {
    // 10 min session: limit = 600s, yellow starts at 480s
    expect(getTimerColor(480, 10)).toBe('yellow')
    expect(getTimerColor(599, 10)).toBe('yellow')
  })

  it('returns red at and beyond the limit', () => {
    expect(getTimerColor(600, 10)).toBe('red')
    expect(getTimerColor(700, 10)).toBe('red')
  })

  it('is always yellow/red for sessions shorter than 2 minutes', () => {
    // limit - 120 goes negative, so seconds >= limit-120 is always true
    expect(getTimerColor(0, 1)).toBe('yellow')
    expect(getTimerColor(59, 1)).toBe('yellow')
    expect(getTimerColor(60, 1)).toBe('red')
  })
})
