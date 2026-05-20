'use client'
import { useState, useMemo } from 'react'
import { AssetItem, isSection, STATUS_LABEL, STATUS_BADGE, TYPE_BADGE } from '@/lib/checklist-data'
import { useChecklistData } from '@/hooks/useChecklistData'

const TABS = [
  { val: 'all',           label: 'All' },
  { val: 'Day 1',         label: 'Day 1' },
  { val: 'Day 2',         label: 'Day 2' },
  // { val: 'Day 3',      label: 'Day 3' },  // commented out — may need later
  { val: 'Templates',     label: 'Templates' },
  { val: 'Session Slide', label: 'Session Slide' },
  { val: 'Lower Third',   label: 'Lower Third' },
  { val: 'Holding Slide', label: 'Holding Slide' },
  { val: 'Break Slide',   label: 'Break Slide' },
]

function tabMatchesAsset(a: AssetItem, tab: string): boolean {
  if (tab === 'all') return true
  if (tab === 'Day 1' || tab === 'Day 2' || tab === 'Day 3' || tab === 'Templates') return a.day === tab
  return a.type === tab
}

function downloadCSV(items: AssetItem[]) {
  const headers = ['#', 'Asset Name', 'Production Note', 'Type', 'Day', 'Session', 'Time', 'Screen Location', 'Dimensions', 'Quantity', 'Repeat / Reuse (AV)', 'Status', 'Screen Content']
  const rows = [headers, ...items.map((i, idx) => [
    idx + 1, i.name, i.note, i.type, i.day, i.session, i.time,
    i.locations.join(' · '), i.dims.replace(/\n/g, ' | '),
    typeof i.qty === 'number' ? i.qty : i.qty,
    i.repeat, STATUS_LABEL[i.status], i.copy
  ])]
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'LSIF2026_Screen_Content_Checklist.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function ChecklistPage() {
  const { assets, loading } = useChecklistData()
  const [briefOpen, setBriefOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  const allAssets = useMemo(() => assets.filter((r): r is AssetItem => !isSection(r)), [assets])

  const stats = useMemo(() => {
    let total = 0, lt = 0, sessions = 0, holding = 0, breaks = 0
    allAssets.forEach((a: AssetItem) => {
      const q = typeof a.qty === 'number' ? a.qty : 1
      total += q
      if (a.type === 'Lower Third')   lt      += q
      if (a.type === 'Session Slide') sessions += q
      if (a.type === 'Holding Slide') holding  += q
      if (a.type === 'Break Slide')   breaks   += q
    })
    return { total, lt, sessions, holding, breaks }
  }, [allAssets])

  const filteredIds = useMemo(() => {
    return new Set(allAssets.filter(a => tabMatchesAsset(a, activeTab)).map(a => a.id))
  }, [allAssets, activeTab])

  function visibleInSection(sectionIdx: number): boolean {
    for (let i = sectionIdx + 1; i < assets.length; i++) {
      const row = assets[i]
      if (isSection(row)) break
      if (filteredIds.has((row as AssetItem).id)) return true
    }
    return false
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F5F1]">
      <span className="font-mono text-[0.65rem] tracking-widest uppercase text-[#64748B] animate-pulse">Loading checklist…</span>
    </div>
  )

  const visibleAssets = allAssets.filter(a => filteredIds.has(a.id))

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#1E293B] font-[Poppins] pb-14">
      {/* Rainbow stripe */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 via-red-600 via-purple-600 via-pink-400 via-blue-500 via-teal-600 to-green-600" />

      {/* Header */}
      <header className="bg-[#071f10] px-4 sm:px-8 py-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="font-bold text-white text-[1rem] leading-tight">Screen Content Checklist — Lagos State Investment Forum 2026</div>
          <div className="font-mono text-[0.55rem] text-white/30 tracking-widest uppercase mt-1">For Design Team · Eko Hotel &amp; Suites · 8–10 June 2026</div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 font-semibold text-[0.78rem] px-4 py-2 cursor-pointer border-[1.5px] border-white/25 bg-transparent text-white/70 hover:border-white/60 hover:text-white transition-all"
          >
            ↓ Print / PDF
          </button>
          <button
            onClick={() => downloadCSV(visibleAssets)}
            className="inline-flex items-center gap-1.5 font-semibold text-[0.78rem] px-4 py-2 cursor-pointer border-none bg-[#4ade80] text-[#071f10] hover:bg-green-400 transition-all"
          >
            ↓ Download CSV
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-3 sm:px-6 py-5">

        {/* Design brief */}
        <div>
          <button
            onClick={() => setBriefOpen(v => !v)}
            className="w-full flex items-center justify-between bg-[#071f10] px-4 sm:px-6 py-3 cursor-pointer border-none mb-0.5 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-white text-[0.85rem]">For the Designer — Brand Assets &amp; Technical Specs</span>
              <span className="font-mono text-[0.5rem] text-white/40 tracking-widest uppercase hidden sm:block">{briefOpen ? 'Click to collapse' : 'Click to expand'}</span>
            </div>
            <span className={`text-[#4ade80] text-base transition-transform duration-200 ${briefOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {briefOpen && (
            <div className="bg-[#071f10] flex flex-wrap gap-6 px-4 sm:px-6 py-5 mb-4 border-b-4 border-[#4ade80]">
              <div className="flex-1 min-w-[160px]">
                <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#4ade80] mb-3 pb-1.5 border-b border-white/10">Brand Colours</div>
                <div className="flex gap-2 flex-wrap mb-3">
                  {[['#071f10','Navy'],['#4ade80','Gold'],['#D7263D','Red'],['#0A8E7F','Teal'],['#F6F5F1','Cream']].map(([hex]) => (
                    <div key={hex} className="flex flex-col items-center gap-1">
                      <div className="w-7 h-7 rounded-sm border border-white/10" style={{ background: hex }} />
                      <span className="font-mono text-[0.45rem] text-white/50 text-center">{hex}</span>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[0.48rem] text-white/40 uppercase tracking-wide mb-0.5">Event Font</div>
                <div className="text-[0.74rem] text-white/80">Poppins (brand typeface)<br /><span className="text-[0.65rem] text-white/40">Logo files in images/ folder</span></div>
              </div>

              <div className="flex-1 min-w-[160px]">
                <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#4ade80] mb-3 pb-1.5 border-b border-white/10">Screen Sizes</div>
                <div className="font-mono text-[0.63rem] text-white/80 leading-[2.1]">
                  Main Stage backdrop: <span className="text-[#4ade80]">3840 × 2160</span> (4K)<br />
                  Breakout / Lobby screens: <span className="text-[#4ade80]">1920 × 1080</span><br />
                  Portrait totems: <span className="text-[#4ade80]">1080 × 1920</span><br />
                  Lower thirds: <span className="text-[#4ade80]">1920 × 1080</span><br />
                  Print (MoU backdrop): <span className="text-[#4ade80]">3000 × 2000 @ 300dpi</span>
                </div>
              </div>

              <div className="flex-1 min-w-[160px]">
                <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#4ade80] mb-3 pb-1.5 border-b border-white/10">File Delivery</div>
                <div className="text-[0.74rem] text-white/80 leading-[2]">
                  Static slides → PNG + source file<br />
                  Animated loops → MP4, H.264<br />
                  Print → PDF @ 300 dpi<br />
                  Deliver to shared Google Drive folder
                </div>
                <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#4ade80] mt-3 mb-2 pb-1.5 border-b border-white/10">File Naming</div>
                <div className="font-mono text-[0.63rem] text-white/80 leading-[2]">
                  [ID]_[ShortName]_FINAL.png<br />
                  e.g. <span className="text-[#4ade80]">D1-09_LT_Sanwo-Olu_FINAL.png</span>
                </div>
              </div>

              <div className="flex-1 min-w-[160px]">
                <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#4ade80] mb-3 pb-1.5 border-b border-white/10">Start Here — Priority Order</div>
                <div className="text-[0.75rem] text-white/80 leading-[2.1]">
                  ① Master Templates (T01–T06) — design these first<br />
                  ② Lower thirds with confirmed names<br />
                  ③ Session opening slides<br />
                  ④ Break, holding &amp; wayfinding slides<br />
                  ⑤ Items marked ⚠️ — build layout, leave copy blank
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { num: stats.total,    label: 'Total Assets' },
            { num: stats.lt,       label: 'Lower Thirds' },
            { num: stats.sessions, label: 'Session Slides' },
            { num: stats.holding,  label: 'Holding Slides' },
            { num: stats.breaks,   label: 'Break Slides' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#E2DFD6] px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
              <div className="text-lg sm:text-xl font-bold text-[#071f10]">{s.num}</div>
              <div className="font-mono text-[0.55rem] sm:text-[0.58rem] tracking-widest uppercase text-[#64748B] leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 items-center mb-4">
          {TABS.map(t => (
            <button
              key={t.val}
              onClick={() => setActiveTab(t.val)}
              className={`font-mono text-[0.6rem] tracking-widest uppercase px-3 py-1.5 cursor-pointer border-[1.5px] transition-all ${activeTab === t.val ? 'bg-[#071f10] text-white border-[#071f10]' : 'bg-white text-[#64748B] border-[#E2DFD6] hover:border-[#071f10] hover:text-[#071f10]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white border border-[#E2DFD6]">
          <table className="w-full border-collapse text-[0.8rem]" style={{ minWidth: '1100px' }}>
            <thead>
              <tr>
                {['#', 'Asset Name & Production Note', 'Type', 'Day', 'Session · Time', 'Screen Location', 'Dimensions', 'Qty', 'Repeat / Reuse (AV)', 'Status', 'Screen Content'].map(h => (
                  <th key={h} className="bg-[#071f10] text-white font-semibold text-[0.65rem] tracking-widest uppercase px-3 sm:px-4 py-3 text-left whitespace-nowrap sticky top-0 z-10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                let rowNum = 0
                return assets.map((row, idx) => {
                  if (isSection(row)) {
                    if (!visibleInSection(idx)) return null
                    return (
                      <tr key={`section-${idx}`}>
                        <td colSpan={11} className="bg-[#071f10] text-white font-bold text-[0.7rem] tracking-widest uppercase px-4 py-2.5 font-mono">
                          <span className="text-[#4ade80] mr-2">▸</span>{row.section}
                        </td>
                      </tr>
                    )
                  }

                  if (!filteredIds.has(row.id)) return null
                  rowNum++

                  const qtyDisplay = typeof row.qty === 'number'
                    ? (row.qty > 1 ? <span className="inline-flex items-center justify-center bg-[#071f10] text-white font-mono text-[0.58rem] font-bold px-1.5 py-0.5 ml-1.5">×{row.qty}</span> : '1')
                    : <span className="inline-flex items-center justify-center bg-[#D7263D] text-white font-mono text-[0.58rem] font-bold px-1.5 py-0.5 ml-1.5">×{row.qty}</span>

                  return (
                    <tr key={row.id} className="border-b border-[#E2DFD6] hover:bg-[#f8f7f5] transition-colors">
                      <td className="px-3 sm:px-4 py-3 font-mono text-[0.62rem] text-[#64748B] whitespace-nowrap align-top">{rowNum}</td>
                      <td className="px-3 sm:px-4 py-3 align-top min-w-[200px]">
                        <div className="font-semibold text-[#071f10] mb-1 leading-snug">{row.name}</div>
                        {row.note && <div className="text-[0.72rem] text-[#64748B] leading-snug">{row.note}</div>}
                      </td>
                      <td className="px-3 sm:px-4 py-3 align-top whitespace-nowrap">
                        <span className={`inline-block font-mono text-[0.52rem] tracking-widest uppercase px-1.5 py-0.5 font-medium ${TYPE_BADGE[row.type] ?? 'bg-[#071f10] text-white'}`}>{row.type}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 align-top whitespace-nowrap text-[0.75rem]">{row.day}</td>
                      <td className="px-3 sm:px-4 py-3 align-top text-[0.75rem] min-w-[140px]">
                        {row.session}<br />
                        <span className="font-mono text-[0.6rem] text-[#64748B]">{row.time}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-0.5">
                          {row.locations.map(l => (
                            <span key={l} className="inline-block font-mono text-[0.5rem] tracking-wide uppercase px-1.5 py-0.5 bg-[#F6F5F1] border border-[#E2DFD6] whitespace-nowrap">{l}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 align-top font-mono text-[0.65rem] text-[#1E293B] whitespace-pre-line min-w-[120px]">{row.dims}</td>
                      <td className="px-3 sm:px-4 py-3 align-top text-center">{qtyDisplay}</td>
                      <td className="px-3 sm:px-4 py-3 align-top font-mono text-[0.62rem] text-[#0A8E7F] min-w-[100px]">{row.repeat}</td>
                      <td className="px-3 sm:px-4 py-3 align-top whitespace-nowrap">
                        <span className={`inline-block font-mono text-[0.52rem] tracking-wide uppercase px-1.5 py-0.5 ${STATUS_BADGE[row.status]}`}>
                          {STATUS_LABEL[row.status]}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 align-top min-w-[180px]">
                        {row.copy ? (
                          <div className="bg-[#f0fdf4] border-l-4 border-[#4ade80] px-2 py-1.5 font-mono text-[0.62rem] leading-relaxed text-[#1E1B4B] whitespace-pre-line">{row.copy}</div>
                        ) : (
                          <span className="text-[#E2DFD6] text-[0.7rem]">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              })()}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
