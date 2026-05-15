export type SessionType = 'keynote' | 'speech' | 'panel' | 'break' | 'performance' | 'other'
export type SessionStatus = 'upcoming' | 'active' | 'completed' | 'warning' | 'overrun'
export type TimerMode = 'elapsed' | 'remaining'

export interface Session {
  id?: string
  order: number
  day: number
  date?: string
  title: string
  type: SessionType
  startTime?: string
  duration?: number
  speaker?: string
  moderator?: string
  mcScript?: string
  avCues?: string
  moderatorNotes?: string
  stageNotes?: string
  status: SessionStatus
}

export interface TimerState {
  running: boolean
  startedAt: number | null
  baseSeconds: number
}

export interface MessageState {
  active: boolean
  text: string
}
