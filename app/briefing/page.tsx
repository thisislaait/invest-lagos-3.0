'use client'
import { useState } from 'react'
import { BriefingSession, ScreenSlot, AvcCue } from '@/lib/briefing-data'
import { useBriefingData } from '@/hooks/useBriefingData'

type Tab = 'overview' | 'cues' | 'screen' | 'script' | 'moderator'

const TYPE_COLOR: Record<string, string> = {
  keynote: 'bg-[#F4B41A] text-[#0B1F45]',
  speech: 'bg-[#0B1F45] text-white',
  panel: 'bg-[#0A8E7F] text-white',
  break: 'bg-[#E2DFD6] text-[#64748B]',
  performance: 'bg-[#D7263D] text-white',
  other: 'bg-[#94A3B8] text-white',
}

const RAINBOW = 'bg-gradient-to-r from-amber-400 via-orange-500 via-red-600 via-purple-600 via-pink-400 via-blue-500 via-teal-600 to-green-600'

function RainbowStripe() {
  return <div className={`h-1 shrink-0 ${RAINBOW}`} />
}

function Badge({ type }: { type: string }) {
  return (
    <span className={`inline-block font-mono text-[0.5rem] tracking-widest uppercase px-1.5 py-0.5 ${TYPE_COLOR[type] ?? TYPE_COLOR.other}`}>
      {type}
    </span>
  )
}

function FlagBadge({ kind, text }: { kind: string; text: string }) {
  const cls = kind === 'warn'
    ? 'bg-yellow-100 text-yellow-800'
    : kind === 'ok'
    ? 'bg-green-100 text-green-800'
    : 'bg-teal-50 text-teal-700'
  const icon = kind === 'warn' ? '⚠' : kind === 'ok' ? '✓' : 'ℹ'
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[0.58rem] px-2 py-0.5 mr-1 ${cls}`}>
      {icon} {text}
    </span>
  )
}

function ScreenMockup({ sc }: { sc: ScreenSlot }) {
  if (sc.type === 'note') {
    return (
      <div className="mb-4">
        <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1">Design / Production Note · {sc.slot}</div>
        <div className="bg-[#FDF3D9] border-l-4 border-[#F4B41A] px-3 py-2 text-sm text-[#1E293B] whitespace-pre-line leading-relaxed">{sc.text}</div>
      </div>
    )
  }

  const label = sc.type === 'lt' ? `Lower Third Mockup · ${sc.slot}` : sc.type === 'logo' ? `Visual Slide · ${sc.slot}` : `Screen Mockup · ${sc.slot}`

  return (
    <div className="mb-5">
      <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1.5">{label}</div>
      <div className="relative aspect-video bg-[#070c1a] border border-white/[0.07] overflow-hidden">
        {/* corner badges */}
        <div className="absolute top-[3%] left-[3%] font-mono text-[0.42rem] tracking-widest uppercase text-white/20 z-10">LSIF 2026</div>
        <div className="absolute top-[3%] right-[3%] font-mono text-[0.38rem] tracking-widest uppercase text-white/15 z-10">{sc.slot}</div>

        {sc.type === 'title' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-[10%] py-[8%] text-center">
            <div className="font-mono text-[0.5rem] tracking-[0.18em] uppercase text-white/30 mb-2">Lagos State Investment Forum 2026</div>
            <div className="text-white font-bold text-[clamp(0.75rem,2.2vw,1.5rem)] leading-tight tracking-tight">{sc.title}</div>
            {sc.sub && (
              <>
                <div className="w-8 h-px bg-[#F4B41A] my-2" />
                <div className="text-white/50 text-[clamp(0.45rem,1.2vw,0.8rem)] leading-snug whitespace-pre-line">{sc.sub}</div>
              </>
            )}
          </div>
        )}

        {sc.type === 'lt' && (
          <>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[rgba(4,8,20,0.92)] via-[rgba(4,8,20,0.6)] to-transparent z-10" />
            <div className="absolute bottom-[8%] left-[4%] right-[4%] z-20 flex items-stretch gap-2">
              <div className="w-[3px] bg-[#F4B41A] rounded-sm shrink-0" />
              <div>
                <div className="text-white font-bold text-[clamp(0.6rem,1.9vw,1.1rem)] leading-tight">{sc.name}</div>
                <div className="text-[#F4B41A] text-[clamp(0.48rem,1.3vw,0.78rem)] mt-0.5">{sc.role}</div>
                {sc.org && <div className="text-white/40 text-[clamp(0.42rem,1.1vw,0.65rem)] mt-0.5">{sc.org}</div>}
              </div>
            </div>
          </>
        )}

        {sc.type === 'logo' && (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10">
            <div className="text-white/30 text-[clamp(0.5rem,1.3vw,0.8rem)] text-center px-[8%] leading-relaxed whitespace-pre-line">[Visual Asset]\n{sc.text}</div>
          </div>
        )}

        {/* rainbow stripe */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2.5%] ${RAINBOW} z-30`} />
      </div>
    </div>
  )
}

function CueCard({ cue }: { cue: AvcCue }) {
  const border = cue.type === 'av' ? 'border-l-blue-500' : cue.type === 'stage' ? 'border-l-red-500' : 'border-l-amber-400'
  const bg = cue.type === 'warn' ? 'bg-[#FDF3D9]' : 'bg-[#F6F5F1]'
  return (
    <div className={`border-l-4 ${border} ${bg} px-3 py-2.5 mb-2`}>
      <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1">{cue.label}</div>
      <div className="text-sm text-[#1E293B] leading-relaxed whitespace-pre-line">{cue.text}</div>
    </div>
  )
}

function TabBody({ session, tab }: { session: BriefingSession; tab: Tab }) {
  if (tab === 'cues') {
    if (!session.avCues.length) return <p className="text-sm text-[#64748B] italic">No cues for this session.</p>
    return <>{session.avCues.map((c, i) => <CueCard key={i} cue={c} />)}</>
  }

  if (tab === 'screen') {
    if (!session.screenContent.length) return <p className="text-sm text-[#64748B] italic">No screen content for this session.</p>
    return <>{session.screenContent.map((sc, i) => <ScreenMockup key={i} sc={sc} />)}</>
  }

  if (tab === 'script') {
    if (!session.mcScript) return <p className="text-sm text-[#64748B] italic">No MC script for this session.</p>
    return (
      <div>
        <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-2">MC Introduction Script</div>
        <div className="bg-[#0B1F45] text-white px-4 py-3 text-sm leading-loose mb-4">
          {session.mcDirection && <div className="font-mono text-[0.56rem] tracking-widest uppercase text-[#F4B41A] mb-2">Stage Direction — {session.mcDirection}</div>}
          {session.mcScript}
        </div>
        <div className="bg-[#F6F5F1] border border-[#E2DFD6] px-3 py-2.5">
          <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1">Delivery</div>
          <p className="text-sm text-[#1E293B]">MC / Announcer · Main stage or from podium as directed above.</p>
        </div>
      </div>
    )
  }

  if (tab === 'moderator') {
    if (!session.moderatorNotes && !session.moderatorQuestions.length) {
      return <p className="text-sm text-[#64748B] italic">{session.moderator ? 'Moderator briefing notes not yet prepared for this session.' : 'No moderator assigned to this session.'}</p>
    }
    return (
      <div>
        {session.moderator && (
          <div className="mb-4">
            <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1">Moderator / Chair</div>
            <p className="text-sm font-semibold text-[#1E293B]">{session.moderator}</p>
          </div>
        )}
        {session.moderatorNotes && (
          <div className="mb-4">
            <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1">Session Objective & Briefing</div>
            <p className="text-sm text-[#1E293B] leading-relaxed">{session.moderatorNotes}</p>
          </div>
        )}
        {session.moderatorQuestions.length > 0 && (
          <div className="mb-4">
            <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-2">Suggested Discussion Questions</div>
            {session.moderatorQuestions.map((q, i) => (
              <div key={i} className="border-l-2 border-[#0A8E7F] bg-[#E0F5F3] px-3 py-2 mb-1.5 text-sm text-[#1E293B] leading-snug">
                <strong>{i + 1}.</strong> {q}
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-2">Timing</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#F6F5F1] border border-[#E2DFD6] p-3">
              <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1">Total Session</div>
              <div className="text-sm font-semibold">{session.duration} minutes</div>
            </div>
            <div className="bg-[#F6F5F1] border border-[#E2DFD6] p-3">
              <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1">Warning Cue</div>
              <div className="text-sm font-semibold">2 min before end — Stage Manager signal</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // overview
  const ov = session.overview
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          ['Venue / Room', ov.venue],
          ['Format', ov.format],
          ['Stage Config', ov.config],
          ['Duration', `${session.duration} minutes`],
        ].map(([label, val]) => (
          <div key={label} className="bg-[#F6F5F1] border border-[#E2DFD6] p-3">
            <div className="font-mono text-[0.52rem] tracking-widest uppercase text-[#64748B] mb-1">{label}</div>
            <div className="text-sm font-semibold text-[#1E293B] leading-snug">{val || '—'}</div>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1.5">Session Objective</div>
        <p className="text-sm text-[#1E293B] leading-relaxed">{ov.objective || '—'}</p>
      </div>
      {session.speakers.filter(Boolean).length > 0 && (
        <div className="mb-4">
          <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1.5">Speakers / Participants</div>
          {session.speakers.filter(Boolean).map((sp, i) => (
            <p key={i} className="text-sm text-[#1E293B] mb-1">· {sp}</p>
          ))}
        </div>
      )}
      {session.moderator && (
        <div className="mb-4">
          <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-1.5">Moderator / Chair</div>
          <p className="text-sm font-semibold text-[#1E293B]">{session.moderator}</p>
        </div>
      )}
      <div>
        <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-2">Roles required</div>
        <div className="flex flex-wrap gap-2">
          {session.mcScript && (
            <span className="flex items-center gap-1.5 border border-[#E2DFD6] px-2 py-1 font-mono text-[0.58rem] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B41A] shrink-0" /> MC Script ready
            </span>
          )}
          {session.avCues.length > 0 && (
            <span className="flex items-center gap-1.5 border border-[#E2DFD6] px-2 py-1 font-mono text-[0.58rem] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" /> AV Cues assigned
            </span>
          )}
          {session.avCues.some(c => c.type === 'stage') && (
            <span className="flex items-center gap-1.5 border border-[#E2DFD6] px-2 py-1 font-mono text-[0.58rem] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" /> Stage Notes set
            </span>
          )}
          {session.moderatorNotes && (
            <span className="flex items-center gap-1.5 border border-[#E2DFD6] px-2 py-1 font-mono text-[0.58rem] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A8E7F] shrink-0" /> Moderator Brief ready
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BriefingPage() {
  const { sessions, loading } = useBriefingData()
  const [selectedDay, setSelectedDay] = useState<1 | 2 | 3>(1)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [tab, setTab] = useState<Tab>('overview')
  const [mobileShowDetail, setMobileShowDetail] = useState(false)

  const daySessions = sessions.filter((s: BriefingSession) => s.day === selectedDay)
  const session = sessions.find((s: BriefingSession) => s.id === selectedId) ?? null

  function selectSession(id: number) {
    setSelectedId(id)
    setTab('overview')
    setMobileShowDetail(true)
  }

  function selectDay(d: 1 | 2 | 3) {
    setSelectedDay(d)
    setSelectedId(null)
    setMobileShowDetail(false)
  }

  const DAYS: { d: 1 | 2 | 3; label: string; date: string }[] = [
    { d: 1, label: 'Day 01', date: '8 June' },
    { d: 2, label: 'Day 02', date: '9 June' },
    { d: 3, label: 'Day 03', date: '10 June' },
  ]

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'cues', label: 'Cue Sheet' },
    { id: 'screen', label: 'Screen Content' },
    { id: 'script', label: 'MC Script' },
    { id: 'moderator', label: 'Moderator Brief' },
  ]

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <span className="font-mono text-[0.65rem] tracking-widest uppercase text-[#64748B] animate-pulse">Loading programme…</span>
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-white text-[#1E293B] overflow-hidden pb-14">
      <RainbowStripe />

      {/* Header */}
      <header className="bg-[#0B1F45] px-4 sm:px-5 py-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <img src="/images/LI-white-logo.png" alt="Lagos State Investment Forum" className="h-8 w-auto shrink-0" />
          <div className="min-w-0">
            <div className="font-bold text-[0.9rem] text-white tracking-tight leading-tight truncate">Lagos State Investment Forum 2026</div>
            <div className="font-mono text-[0.5rem] text-white/30 tracking-widest uppercase mt-0.5">Eko Hotel &amp; Suites · Victoria Island · 8–10 June 2026</div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-[0.6rem] text-[#F4B41A] tracking-widest uppercase">Conference Content Team</div>
          <div className="font-mono text-[0.55rem] text-white/30 tracking-wide mt-0.5">Ugo · Emeke</div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${mobileShowDetail ? 'hidden md:flex' : 'flex'} flex-col md:w-[300px] md:shrink-0 border-r border-[#E2DFD6] overflow-hidden w-full`}>
          {/* Day tabs */}
          <div className="flex border-b border-[#E2DFD6] shrink-0">
            {DAYS.map(({ d, label, date }) => (
              <button
                key={d}
                onClick={() => selectDay(d)}
                className={`flex-1 py-2.5 px-1 font-mono text-[0.58rem] font-medium tracking-widest uppercase text-center cursor-pointer border-none transition-all leading-tight border-b-2 ${selectedDay === d ? 'bg-white text-[#0B1F45] border-b-[#F4B41A]' : 'bg-[#F6F5F1] text-[#64748B] border-b-transparent hover:bg-white'}`}
              >
                {label}<br /><span className="font-normal opacity-60 text-[0.5rem]">{date}</span>
              </button>
            ))}
          </div>

          {/* Session list */}
          <div className="flex-1 overflow-y-auto py-1">
            {daySessions.map(s => (
              <button
                key={s.id}
                onClick={() => selectSession(s.id)}
                className={`w-full flex items-start gap-2.5 px-3.5 py-2.5 cursor-pointer border-none border-l-[3px] transition-all text-left ${s.id === selectedId ? 'bg-[#FDF3D9] border-l-[#F4B41A]' : 'bg-transparent border-l-transparent hover:bg-[#F6F5F1]'}`}
              >
                <div className="font-mono text-[0.58rem] text-[#64748B] min-w-[2.1rem] pt-0.5 shrink-0">{s.startTime}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.76rem] font-semibold text-[#0B1F45] leading-snug mb-1 text-left">{s.title}</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge type={s.type} />
                    {s.flags.some(f => f.kind === 'warn') && (
                      <span className="font-mono text-[0.5rem] text-yellow-700">⚠</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className={`${mobileShowDetail ? 'flex' : 'hidden md:flex'} flex-1 flex-col overflow-hidden w-full`}>
          {session ? (
            <>
              {/* Mobile back */}
              <button
                className="md:hidden flex items-center gap-1.5 px-4 py-2 bg-[#F6F5F1] border-b border-[#E2DFD6] font-mono text-[0.65rem] tracking-widest uppercase text-[#64748B] hover:text-[#0B1F45] transition-colors text-left"
                onClick={() => setMobileShowDetail(false)}
              >
                ← Back to programme
              </button>

              {/* Detail header */}
              <div className="px-4 sm:px-6 py-4 border-b border-[#E2DFD6] shrink-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <Badge type={session.type} />
                  <span className="font-mono text-[0.62rem] text-[#64748B]">{session.startTime}</span>
                  <span className="font-mono text-[0.62rem] text-[#64748B]">{session.duration} min</span>
                  {session.flags.map((f, i) => <FlagBadge key={i} kind={f.kind} text={f.text} />)}
                </div>
                <h2 className="text-[1.35rem] font-bold tracking-tight leading-tight text-[#0B1F45]">{session.title}</h2>
                {(session.speakers.filter(Boolean).length > 0 || session.moderator) && (
                  <p className="text-[0.78rem] text-[#64748B] mt-1.5 leading-snug">
                    {session.speakers.filter(Boolean).join(' · ')}
                    {session.moderator ? ` | Chair: ${session.moderator}` : ''}
                  </p>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#E2DFD6] bg-[#F6F5F1] shrink-0 overflow-x-auto">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-3 sm:px-4 py-2 font-mono text-[0.56rem] tracking-widest uppercase cursor-pointer border-none bg-transparent whitespace-nowrap transition-all border-b-2 ${tab === t.id ? 'text-[#0B1F45] border-b-[#0B1F45] bg-white' : 'text-[#64748B] border-b-transparent hover:text-[#0B1F45]'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab body */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
                <TabBody session={session} tab={tab} />
              </div>
            </>
          ) : (
            /* Welcome state */
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-7">
              <h2 className="text-2xl font-bold tracking-tight text-[#0B1F45] mb-1">Programme Management Briefing</h2>
              <p className="text-sm text-[#64748B] mb-8 leading-relaxed">Conference Content Team: Ugo &amp; Emeke · Select a session from the sidebar to view its full breakdown — cue sheet, screen content, MC script, and moderator brief.</p>

              <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-3">Our Responsibilities</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {[
                  ['01', 'Confirm Programme Flow', 'Ensure the entire event agenda is properly structured, aligned, and approved from start to finish.'],
                  ['02', 'Session Script Development', 'Preparing official scripts for MCs, moderators, announcers, and stage managers to guide event proceedings.'],
                  ['03', 'Stage Rundown Preparation', 'Creating a detailed operational document showing the sequence of all stage activities, timings, responsibilities, and technical actions.'],
                  ['04', 'Moderator Briefing', 'Preparing moderators with discussion topics, speaker profiles, session objectives, and timing expectations.'],
                  ['05', 'Cue Sheet Preparation', 'Developing detailed technical and production cues for audio, visuals, lighting, videos, entrances, and stage transitions.'],
                  ['06', 'Session Timing Management', 'Monitoring and controlling session durations to keep the event running on schedule.'],
                ].map(([num, title, desc]) => (
                  <div key={num} className="bg-[#F6F5F1] border-t-4 border-t-[#F4B41A] p-3.5">
                    <div className="font-mono text-[1rem] text-[#F4B41A] mb-1">{num}</div>
                    <div className="text-[0.78rem] font-bold text-[#0B1F45] mb-1">{title}</div>
                    <div className="text-[0.73rem] text-[#64748B] leading-snug">{desc}</div>
                  </div>
                ))}
                <div className="bg-[#F6F5F1] border-t-4 border-t-red-600 p-3.5 sm:col-span-2">
                  <div className="font-mono text-[1rem] text-red-600 mb-1">07</div>
                  <div className="text-[0.78rem] font-bold text-[#0B1F45] mb-1">Speaker Sequence Coordination</div>
                  <div className="text-[0.73rem] text-[#64748B] leading-snug">Organising the order of speakers, panelists, and presentations for smooth stage transitions and programme delivery.</div>
                </div>
              </div>

              <div className="font-mono text-[0.57rem] tracking-widest uppercase text-[#64748B] mb-3">Roles feeding into programme success</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { dot: 'bg-[#F4B41A]', label: 'MC — live script on stage' },
                  { dot: 'bg-red-600', label: 'Stage Manager — physical flow & transitions' },
                  { dot: 'bg-blue-500', label: 'AV / Tech — media & lighting cues' },
                  { dot: 'bg-[#0A8E7F]', label: 'Moderator — panel discussion guide' },
                  { dot: 'bg-purple-700', label: 'Speaker — confidence monitor & timing' },
                ].map(r => (
                  <span key={r.label} className="flex items-center gap-1.5 border border-[#E2DFD6] px-2.5 py-1.5 font-mono text-[0.58rem] tracking-widest uppercase text-[#1E293B]">
                    <span className={`w-1.5 h-1.5 rounded-full ${r.dot} shrink-0`} />{r.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
