'use client'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useEventState } from '@/hooks/useEventState'

const EVENT_NAME = 'Lagos State Investment Forum 2026'
const EVENT_DAYS = [
  { day: 1, label: 'Day 1', date: '8 Jun' },
  { day: 2, label: 'Day 2', date: '9 Jun' },
  { day: 3, label: 'Day 3', date: '10 Jun' },
]

const roles = [
  { label: 'Admin', href: '/admin' },
  { label: 'MC', href: '/mc' },
  { label: 'Stage', href: '/stage' },
  { label: 'AV / Tech', href: '/av' },
  { label: 'Moderator', href: '/moderator' },
  { label: 'Speaker', href: '/speaker' },
]

export default function Home() {
  const [origin, setOrigin] = useState('')
  const { currentSession, ordered } = useEventState()
  const [selectedDay, setSelectedDay] = useState(1)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (currentSession?.day) setSelectedDay(currentSession.day)
  }, [currentSession?.day])

  const sessionsByDay = (day: number) => ordered.filter(s => s.day === day)
  const daySessions = sessionsByDay(selectedDay)

  return (
    <div className="min-h-screen bg-[#0d0d0b] flex items-center justify-center pt-6 px-6 pb-20">
      <div className="w-full max-w-md">

        {/* Event header */}
        <div className="mb-8">
          <div className="text-[10px] tracking-widest uppercase text-zinc-600 font-mono mb-1">Event Control System</div>
          <h1 className="text-white text-xl font-mono font-bold tracking-tight leading-snug">{EVENT_NAME}</h1>
        </div>

        {/* Day selector tabs */}
        <div className="mb-6">
          <div className="flex gap-px">
            {EVENT_DAYS.map(d => {
              const count = sessionsByDay(d.day).length
              const isActive = currentSession?.day === d.day
              const isSelected = selectedDay === d.day
              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`flex-1 px-3 py-3 text-left transition-colors border-b-2 ${
                    isSelected
                      ? 'border-amber-500 bg-[#111110]'
                      : 'border-[#222220] bg-[#0d0d0b] hover:bg-[#111110]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`}>
                      {d.label}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600">{d.date}</div>
                  {count > 0 && (
                    <div className="text-[10px] font-mono text-zinc-700 mt-0.5">{count} sessions</div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Day summary row */}
          {daySessions.length > 0 && (
            <div className="bg-[#0e0e0c] border border-[#1c1c1a] border-t-0 px-4 py-2.5">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {daySessions.slice(0, 4).map(s => (
                  <span key={s.id} className="text-[10px] font-mono text-zinc-600 truncate max-w-[10rem]">
                    {s.startTime && <span className="text-zinc-700 mr-1">{s.startTime}</span>}
                    {s.title}
                  </span>
                ))}
                {daySessions.length > 4 && (
                  <span className="text-[10px] font-mono text-zinc-700">+{daySessions.length - 4} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Featured links */}
        <div className="flex gap-3 mb-6">
          <Link href="/briefing" className="flex-1 flex items-center gap-4 bg-amber-600/10 hover:bg-amber-600/20 border-l-2 border-amber-600 px-5 py-4 transition-colors">
            <div className="flex-1">
              <div className="font-mono font-bold text-amber-400 text-sm tracking-wide">TEAM BRIEFING</div>
              <div className="text-amber-700 text-xs mt-0.5">Venue map · stage setups · full programme simulation</div>
            </div>
            <div className="font-mono text-amber-600">→</div>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 bg-zinc-900/60 hover:bg-zinc-800/60 border-l-2 border-zinc-600 px-4 py-4 transition-colors">
            <div>
              <div className="font-mono font-bold text-zinc-300 text-sm tracking-wide">DASHBOARD</div>
              <div className="text-zinc-600 text-xs mt-0.5">Live overview</div>
            </div>
            <div className="font-mono text-zinc-600">→</div>
          </Link>
        </div>

        {/* Role links */}
        <div className="space-y-px">
          <Link href="/admin" className="group flex items-center gap-4 bg-[#111110] hover:bg-[#191810] border-l-2 border-amber-500 px-5 py-4 transition-colors">
            <div className="flex-1">
              <div className="font-mono font-bold text-amber-400 text-sm tracking-wide">PROGRAMME MANAGER</div>
              <div className="text-zinc-500 text-xs mt-0.5">Full control — add sessions, run timers, advance programme</div>
            </div>
            <div className="font-mono text-amber-600 group-hover:text-amber-400 transition-colors">→</div>
          </Link>
          {[
            { href: '/mc', label: 'MC', desc: 'Current session script, speaker intro, next up' },
            { href: '/stage', label: 'STAGE MANAGER', desc: 'Full rundown, timing status, AV cues' },
            { href: '/av', label: 'AV / TECH', desc: 'Media cues, slides, technical actions' },
            { href: '/moderator', label: 'MODERATOR', desc: 'Speaker profiles, discussion topics, timing' },
            { href: '/speaker', label: 'SPEAKER MONITOR', desc: 'Confidence monitor — big timer, readable from stage' },
          ].map(r => (
            <Link key={r.href} href={r.href} className="group flex items-center gap-4 bg-[#111110] hover:bg-[#161614] border-l-2 border-[#222220] hover:border-zinc-600 px-5 py-4 transition-colors">
              <div className="flex-1">
                <div className="font-mono font-bold text-white text-sm tracking-wide">{r.label}</div>
                <div className="text-zinc-500 text-xs mt-0.5">{r.desc}</div>
              </div>
              <div className="font-mono text-zinc-700 group-hover:text-zinc-400 transition-colors">→</div>
            </Link>
          ))}
        </div>

        {/* QR codes */}
        {origin && (
          <div className="mt-10">
            <div className="text-[10px] tracking-widest uppercase text-zinc-600 font-mono mb-4">Share Links</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {roles.map(r => (
                <div key={r.href} className="flex flex-col items-center gap-2">
                  <div className="bg-[#111110] p-2">
                    <QRCodeSVG value={`${origin}${r.href}`} size={90} fgColor="#ffffff" bgColor="#111110" level="M" />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{r.label}</div>
                </div>
              ))}
            </div>
            <p className="text-zinc-700 text-[10px] font-mono mt-4">
              QR codes work across devices when served over a shared network connection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
