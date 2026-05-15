const KEY = 'cuestage_event'
export const DEFAULT_EVENT_ID = 'lsif-2026'

export function getEventId(): string {
  if (typeof window === 'undefined') return DEFAULT_EVENT_ID
  return localStorage.getItem(KEY) || DEFAULT_EVENT_ID
}

export function setEventId(raw: string): void {
  const clean = raw.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  localStorage.setItem(KEY, clean || DEFAULT_EVENT_ID)
  window.location.reload()
}

/** Shorthand: events/{eventId}/{path} */
export function ep(path: string): string {
  return `events/${getEventId()}/${path}`
}
