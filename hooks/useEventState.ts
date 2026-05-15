'use client'
import { useEffect, useRef, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import type { Session, TimerState, MessageState } from '@/lib/types'

export function useEventState() {
  const [sessions, setSessions] = useState<Record<string, Session>>({})
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [timer, setTimer] = useState<TimerState>({ running: false, startedAt: null, baseSeconds: 0 })
  const [message, setMessage] = useState<MessageState>({ active: false, text: '' })
  const [connected, setConnected] = useState<boolean | null>(null)
  const [serverTimeOffset, setServerTimeOffset] = useState(0)
  const offsetRef = useRef(0)

  useEffect(() => {
    const u1 = onValue(
      ref(db, 'sessions'),
      s => setSessions(s.val() || {}),
      () => setSessions({})
    )
    const u2 = onValue(
      ref(db, 'currentSessionId'),
      s => setCurrentSessionId(s.val()),
      () => setCurrentSessionId(null)
    )
    const u3 = onValue(
      ref(db, 'timer'),
      s => setTimer(s.val() || { running: false, startedAt: null, baseSeconds: 0 }),
      () => setTimer({ running: false, startedAt: null, baseSeconds: 0 })
    )
    const u4 = onValue(
      ref(db, 'message'),
      s => setMessage(s.val() || { active: false, text: '' }),
      () => setMessage({ active: false, text: '' })
    )
    const u5 = onValue(ref(db, '.info/connected'), s => setConnected(!!s.val()))
    const u6 = onValue(ref(db, '.info/serverTimeOffset'), s => {
      const offset = s.val() ?? 0
      offsetRef.current = offset
      setServerTimeOffset(offset)
    })
    return () => { u1(); u2(); u3(); u4(); u5(); u6() }
  }, [])

  const ordered = Object.entries(sessions)
    .map(([id, s]) => ({ ...s, id }))
    .sort((a, b) => a.order - b.order)

  const currentSession = currentSessionId ? sessions[currentSessionId] : null
  const currentIdx = ordered.findIndex(s => s.id === currentSessionId)
  const nextSession = currentIdx >= 0 ? ordered[currentIdx + 1] ?? null : null

  return {
    sessions, currentSessionId, currentSession, nextSession, ordered,
    timer, message, connected, serverTimeOffset, offsetRef,
  }
}
