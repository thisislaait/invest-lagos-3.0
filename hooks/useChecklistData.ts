'use client'
import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import { ChecklistRow, AssetItem } from '@/lib/checklist-data'

function toArray<T>(val: unknown): T[] {
  if (!val) return []
  if (Array.isArray(val)) return (val as T[]).filter(v => v != null)
  return Object.entries(val as Record<string, T>)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, v]) => v)
    .filter(v => v != null)
}

function deserializeRow(raw: Record<string, unknown>): ChecklistRow {
  if (raw._type === 'section') return { section: raw.section as string }
  const { _type: _, ...rest } = raw
  return { ...rest, locations: toArray<string>(rest.locations) } as AssetItem
}

export function useChecklistData(): { assets: ChecklistRow[]; loading: boolean } {
  const [assets, setAssets] = useState<ChecklistRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onValue(
      ref(db, 'checklist'),
      snap => {
        const val = snap.val()
        if (val) {
          const list = toArray<Record<string, unknown>>(val).map(deserializeRow)
          setAssets(list)
        }
        setLoading(false)
      },
      () => setLoading(false)
    )
    return unsub
  }, [])

  return { assets, loading }
}
