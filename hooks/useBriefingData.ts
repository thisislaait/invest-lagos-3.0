'use client'
import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { BriefingSession } from '@/lib/briefing-data'

function toArray<T>(val: unknown): T[] {
  if (!val) return []
  if (Array.isArray(val)) return (val as T[]).filter(v => v != null)
  return Object.entries(val as Record<string, T>)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, v]) => v)
    .filter(v => v != null)
}

function deserialize(raw: Record<string, unknown>): BriefingSession {
  return {
    ...raw,
    speakers: toArray<string>(raw.speakers),
    flags: toArray(raw.flags),
    avCues: toArray(raw.avCues),
    screenContent: toArray(raw.screenContent),
    moderatorQuestions: toArray<string>(raw.moderatorQuestions),
  } as BriefingSession
}

export function useBriefingData(): { sessions: BriefingSession[]; loading: boolean } {
  const [sessions, setSessions] = useState<BriefingSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onValue(
      ref(db, 'briefing'),
      snap => {
        const val = snap.val()
        if (val) {
          const list = toArray<Record<string, unknown>>(val)
            .map(deserialize)
            .sort((a, b) => a.day - b.day || a.order - b.order)
          setSessions(list)
        }
        setLoading(false)
      },
      () => setLoading(false)
    )
    return unsub
  }, [])

  return { sessions, loading }
}
