'use client'
import { useState } from 'react'

const RAINBOW_COLORS = ['#F4C430','#F7821B','#D7263D','#C2185B','#E91E63','#1565C0','#0A8E7F','#2E7D32']

function RainbowStripe() {
  return (
    <div className="flex h-1 w-full shrink-0" aria-hidden="true">
      {RAINBOW_COLORS.map(c => <span key={c} className="flex-1" style={{ background: c }} />)}
    </div>
  )
}

const EMBLEM_SMALL = (
  <svg width="36" height="36" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M100,100 L100,0 A100,100 0 0,1 170.7,29.3 Z" fill="#F4C430"/>
    <path d="M100,100 L170.7,29.3 A100,100 0 0,1 200,100 Z" fill="#F7821B"/>
    <path d="M100,100 L200,100 A100,100 0 0,1 170.7,170.7 Z" fill="#D7263D"/>
    <path d="M100,100 L170.7,170.7 A100,100 0 0,1 100,200 Z" fill="#C2185B"/>
    <path d="M100,100 L100,200 A100,100 0 0,1 29.3,170.7 Z" fill="#E91E63"/>
    <path d="M100,100 L29.3,170.7 A100,100 0 0,1 0,100 Z" fill="#1565C0"/>
    <path d="M100,100 L0,100 A100,100 0 0,1 29.3,29.3 Z" fill="#0A8E7F"/>
    <path d="M100,100 L29.3,29.3 A100,100 0 0,1 100,0 Z" fill="#2E7D32"/>
    <circle cx="100" cy="100" r="56" fill="#0B1F45"/>
    <circle cx="100" cy="100" r="50" fill="none" stroke="#F4B41A" strokeWidth="3"/>
    <text x="100" y="96" textAnchor="middle" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">IL</text>
    <text x="100" y="112" textAnchor="middle" fill="#F4B41A" fontFamily="sans-serif" fontWeight="700" fontSize="9" letterSpacing="2">LAGOS</text>
  </svg>
)

const EMBLEM_LARGE = (
  <svg width="360" height="360" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M100,100 L100,0 A100,100 0 0,1 170.7,29.3 Z" fill="#F4C430"/>
    <path d="M100,100 L170.7,29.3 A100,100 0 0,1 200,100 Z" fill="#F7821B"/>
    <path d="M100,100 L200,100 A100,100 0 0,1 170.7,170.7 Z" fill="#D7263D"/>
    <path d="M100,100 L170.7,170.7 A100,100 0 0,1 100,200 Z" fill="#C2185B"/>
    <path d="M100,100 L100,200 A100,100 0 0,1 29.3,170.7 Z" fill="#E91E63"/>
    <path d="M100,100 L29.3,170.7 A100,100 0 0,1 0,100 Z" fill="#1565C0"/>
    <path d="M100,100 L0,100 A100,100 0 0,1 29.3,29.3 Z" fill="#0A8E7F"/>
    <path d="M100,100 L29.3,29.3 A100,100 0 0,1 100,0 Z" fill="#2E7D32"/>
    {['100,0','170.7,29.3','200,100','170.7,170.7','100,200','29.3,170.7','0,100','29.3,29.3'].map((pt,i) => (
      <line key={i} x1="100" y1="100" x2={pt.split(',')[0]} y2={pt.split(',')[1]} stroke="white" strokeWidth="0.8" opacity="0.5"/>
    ))}
    <circle cx="100" cy="100" r="56" fill="#0B1F45"/>
    <circle cx="100" cy="100" r="50" fill="none" stroke="#F4B41A" strokeWidth="2.5"/>
    <circle cx="100" cy="100" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    <text x="100" y="60" textAnchor="middle" fill="rgba(244,180,26,0.6)" fontSize="5">★ ★ ★ ★ ★</text>
    <text x="100" y="94" textAnchor="middle" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">INVEST</text>
    <text x="100" y="112" textAnchor="middle" fill="#F4B41A" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="2">LAGOS</text>
    <text x="100" y="130" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="sans-serif" fontSize="6.5" letterSpacing="1.5">2026</text>
    <text x="100" y="148" textAnchor="middle" fill="rgba(244,180,26,0.6)" fontSize="5">★ ★ ★ ★ ★</text>
  </svg>
)

type DayKey = 'day1' | 'day2' | 'day3'

const SESSION_TYPE_STYLE: Record<string, string> = {
  keynote: 'bg-[#F4B41A] text-[#0B1F45]',
  speech: 'bg-[#0B1F45] text-white',
  plenary: 'bg-[#0A8E7F] text-white',
  break: 'bg-[#E2DFD6] text-[#64748B]',
  perf: 'bg-[#D7263D] text-white',
  gala: 'bg-purple-700 text-white',
  parallel: 'bg-[#1565C0] text-white',
  site: 'bg-[#2E7D32] text-white',
}

interface SessionEntry {
  time: string
  type: keyof typeof SESSION_TYPE_STYLE
  typeLabel: string
  title: string
  speaker?: string
  highlight?: boolean
}

const DAY1_SESSIONS: SessionEntry[] = [
  { time:'09:30', type:'perf', typeLabel:'Cultural Performance', title:'Opening of Ceremony', speaker:'A special cultural performance celebrating Lagos — the heartbeat of African enterprise.', highlight:true },
  { time:'09:40', type:'speech', typeLabel:'Welcome Address', title:'Welcome to the Lagos State Investment Forum', speaker:'Mrs Folashade Kaosarat Bada Ambrose — Honourable Commissioner, Ministry of Commerce, Cooperatives, Trade & Investment, Lagos State' },
  { time:'09:45', type:'speech', typeLabel:'Opening Remarks', title:'Commonwealth Perspective on Lagos as an Investment Destination', speaker:'Lord Marland — Chair, Commonwealth Enterprise and Investment Council (CWEIC)' },
  { time:'09:50', type:'speech', typeLabel:'Opening Address', title:'A Lagos Ready for the World', speaker:'Mr. Babajide Sanwo-Olu — Executive Governor, Lagos State' },
  { time:'10:00', type:'speech', typeLabel:'Special Address', title:"The Commonwealth's Commitment to Africa's Economic Future", speaker:'The Hon. Shirley Botchwey — Secretary-General, The Commonwealth' },
  { time:'10:08', type:'speech', typeLabel:'Addresses', title:'Messages from Visiting Heads of Government', speaker:'Visiting Heads of Government — TBC' },
  { time:'10:20', type:'speech', typeLabel:'Goodwill Messages', title:'Messages from the Forum Co-Chairs', speaker:'Chairman, BUA Group & Alhaji Aliko Dangote — Forum Co-Chairs' },
  { time:'10:30', type:'keynote', typeLabel:'Presidential Keynote', title:"Nigeria's Vision for Investment-Led Growth", speaker:'President of the Federal Republic of Nigeria', highlight:true },
  { time:'11:30', type:'break', typeLabel:'Official Opening', title:'Official Opening of Pavilions & Exhibition · Networking & Refreshments', speaker:'Hosted by the President of Nigeria and Governor Sanwo-Olu' },
  { time:'12:30', type:'plenary', typeLabel:'Showcase Panel', title:"Governors' Investment Showcase — State Pitches to the World", speaker:"Governors of Abia, Enugu, Imo, Kano, Lagos, Ogun, Kwara & Akwa Ibom States · Chair: Dr. Jumoke Oduwole — Minister of Trade and Investment" },
  { time:'13:30', type:'plenary', typeLabel:'Plenary 1', title:"Lagos: Africa's Global Gateway", speaker:"Lord Marland · Dr. Jumoke Oduwole · DG NACCIMA · Chairman Heirs Holdings · CEO Tolaram · Chair: Mrs. Folashade Bada Ambrose — Commissioner, MCCTI" },
  { time:'14:30', type:'break', typeLabel:'Networking Lunch', title:'Lunch & Sectoral Working Lunches (Invitation Only)' },
  { time:'15:30', type:'parallel', typeLabel:'Parallel Plenaries', title:'Afternoon Breakout Sessions — Simultaneous', speaker:'Plenary 2: The Future of Technology & Innovation (Breakout A) | Plenary 3: Unlocking Investment: Capital Markets & DFI Frameworks (Breakout B)' },
  { time:'19:00', type:'gala', typeLabel:'Gala Dinner', title:'Lagos Investment Forum Gala Dinner', speaker:'Live performance by Berklee College of Music · Black tie / traditional attire', highlight:true },
]

const DAY2_SESSIONS: SessionEntry[] = [
  { time:'09:30', type:'speech', typeLabel:'Opening Recap', title:'Day 1 Outcomes & The Way Forward — Forum Chairs Review', speaker:'Forum Co-Chairs — TBC' },
  { time:'10:30', type:'plenary', typeLabel:'Plenary 4', title:'Building the Cities of the Future: Infrastructure, Energy & Urban Development', speaker:'CEO Julius Berger · Commissioner Energy Lagos · CEO Lekki Free Zone · MD NSIA · Global MD Arup Group · NEOM · Adani Group · Opening Keynote: President, African Development Bank Group · Chair: Dr. Kadri Hamzat — Deputy Governor, Lagos State' },
  { time:'11:30', type:'break', typeLabel:'Networking Break', title:'Networking Break · Deal Room Open' },
  { time:'12:00', type:'plenary', typeLabel:'Plenary 5', title:'Global Partnerships for Growth: Trade, Diplomacy & Investment Frameworks', speaker:'UK High Commissioner · Ambassadors: Japan, Germany, India · President, Afrexim Bank · Opening Fireside: Wamkele Mene — Secretary-General, AfCFTA · Chair: Samantha Cohen CVO OBE — CEO, CWEIC' },
  { time:'13:00', type:'plenary', typeLabel:'Plenary 6', title:"Talent, Creativity & Culture: Nigeria's Creative Economy as Investment Frontier", speaker:'CEO Mavin Records · CEO Netflix Africa · Founder Norrsken Africa · CEO Terra Kulture · Chair: Eva Omaghomi' },
  { time:'14:00', type:'keynote', typeLabel:'Closing Ceremony', title:'The Way Forward — Communiqué, MoU Signings & Closing Remarks', speaker:'Mr. Babajide Sanwo-Olu — Executive Governor, Lagos State · MoU Signing Ceremony · Vote of Thanks', highlight:true },
  { time:'14:30', type:'break', typeLabel:'Closing Lunch', title:'Networking Lunch & Farewell' },
]

const DAY3_SESSIONS: SessionEntry[] = [
  { time:'08:00', type:'site', typeLabel:'Site Visit', title:'Dangote Petroleum Refinery', speaker:"A guided visit to Africa's largest oil refinery — a $20 billion landmark investment on the Lagos coastline. ~4 hours. Depart Eko Hotel 08:00." },
  { time:'13:00', type:'site', typeLabel:'Site Visit', title:'Lekki Free Zone', speaker:"A tour of the Lekki Free Zone — one of Africa's most advanced special economic zones and a model for foreign direct investment. ~4 hours." },
]

const SPEAKERS = [
  { initials:'BS', name:'Mr. Babajide Sanwo-Olu', role:'Executive Governor, Lagos State', org:'Lagos State Government', grad:'from-[#0B1F45] to-[#1565C0]' },
  { initials:'SB', name:'The Hon. Shirley Botchwey', role:'Secretary-General', org:'The Commonwealth', grad:'from-[#0A8E7F] to-[#2E7D32]' },
  { initials:'LM', name:'Lord Marland', role:'Chair, CWEIC', org:'Commonwealth Enterprise & Investment Council', grad:'from-[#1a1a2e] to-[#0B1F45]' },
  { initials:'JO', name:'Dr. Jumoke Oduwole', role:'Minister of Trade and Investment', org:'Federal Republic of Nigeria', grad:'from-[#D7263D] to-[#C2185B]' },
  { initials:'AD', name:'Alhaji Aliko Dangote', role:'Chairman', org:'Dangote Group · Forum Co-Chair', grad:'from-[#F4B41A] to-[#F7821B]' },
  { initials:'SC', name:'Samantha Cohen CVO OBE', role:'Chief Executive Officer', org:'Commonwealth Enterprise & Investment Council', grad:'from-[#0A8E7F] to-[#1565C0]' },
  { initials:'KH', name:'Dr. Kadri Obafemi Hamzat', role:'Deputy Governor, Lagos State', org:'Lagos State Government', grad:'from-[#C2185B] to-[#E91E63]' },
  { initials:'WM', name:'Wamkele Mene', role:'Secretary-General', org:'African Continental Free Trade Area (AfCFTA)', grad:'from-[#2E7D32] to-[#0A8E7F]' },
]

function SessionRow({ s }: { s: SessionEntry }) {
  return (
    <div className={`flex gap-3 sm:gap-4 py-4 border-b border-[#E2DFD6] ${s.highlight ? 'bg-[#FDF3D9] -mx-4 sm:-mx-6 px-4 sm:px-6' : ''}`}>
      <div className="font-[var(--font-mono-landing)] text-[0.8rem] text-[#64748B] w-10 sm:w-14 shrink-0 pt-0.5">{s.time}</div>
      <div className="flex-1 min-w-0">
        <span className={`inline-block font-[var(--font-mono-landing)] text-[0.52rem] tracking-widest uppercase px-1.5 py-0.5 mb-2 ${SESSION_TYPE_STYLE[s.type]}`}>{s.typeLabel}</span>
        <div className="font-semibold text-[0.95rem] text-[#0B1F45] leading-snug mb-1">{s.title}</div>
        {s.speaker && <div className="text-[0.82rem] text-[#64748B] leading-snug" dangerouslySetInnerHTML={{ __html: s.speaker.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />}
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1')

  const days: { key: DayKey; num: string; label: string }[] = [
    { key: 'day1', num: '01 ·', label: '8 June — Opening Day' },
    { key: 'day2', num: '02 ·', label: '9 June — Forum Day' },
    { key: 'day3', num: '03 ·', label: '10 June — Site Visits' },
  ]

  return (
    <div className="bg-white text-[#0B1F45] font-[var(--font-body)] antialiased">
      <RainbowStripe />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#E2DFD6] h-[68px] flex items-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 w-full flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            {EMBLEM_SMALL}
            <div className="leading-tight">
              <strong className="block font-[var(--font-display)] font-[800] text-[1rem] tracking-tight text-[#0B1F45]">Invest Lagos</strong>
              <span className="block font-[var(--font-mono-landing)] text-[0.5rem] tracking-widest uppercase text-[#64748B] mt-0.5">Lagos State Investment Forum</span>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-0.5 list-none">
            {[['#about','About'],['#programme','Programme'],['#speakers','Speakers'],['#venue','Venue'],['#sponsors','Sponsors']].map(([href,label],i) => (
              <li key={href}>
                <a href={href} className="font-[var(--font-mono-landing)] text-[0.72rem] tracking-widest uppercase text-[#64748B] hover:text-[#0B1F45] transition-colors px-3 py-2 block">
                  <span className="text-[#F4B41A] mr-1">0{i+1}</span>{label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#register" className="bg-[#0B1F45] text-white font-semibold text-[0.8rem] px-4 sm:px-5 py-2.5 hover:opacity-90 transition-opacity shrink-0">Register</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
            <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-6 text-[#0A8E7F]">
              <span className="block w-6 h-px bg-current" />Lagos State Government &amp; CWEIC
            </div>
            <h1 className="font-[var(--font-display)] font-[800] text-[clamp(2.75rem,7vw,5.25rem)] leading-[1.0] tracking-[-0.03em] text-[#0B1F45] mb-6">
              Lagos State<br />
              <span className="text-[#F4B41A]">Investment</span><br />
              Forum 2026
            </h1>
            <div className="font-[var(--font-mono-landing)] text-[0.82rem] tracking-wide uppercase text-[#64748B] mb-8 flex flex-wrap gap-4 items-center">
              <span>8–10 June 2026</span>
              <span className="w-1 h-1 rounded-full bg-[#E2DFD6]" />
              <span>Eko Hotel &amp; Suites</span>
              <span className="w-1 h-1 rounded-full bg-[#E2DFD6]" />
              <span>Victoria Island, Lagos</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#register" className="bg-[#0B1F45] text-white font-semibold text-[0.875rem] px-8 py-3.5 hover:opacity-90 transition-opacity">Register to Attend</a>
              <a href="#programme" className="border-[1.5px] border-[#0B1F45] text-[#0B1F45] font-semibold text-[0.875rem] px-8 py-3.5 hover:bg-[#0B1F45] hover:text-white transition-all">View Programme</a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            {EMBLEM_LARGE}
          </div>
        </div>
      </section>

      <RainbowStripe />

      {/* About */}
      <section id="about" className="bg-[#F6F5F1] py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-5 text-[#0A8E7F]">
              <span className="block w-6 h-px bg-current" /><span>01</span> About the Forum
            </div>
            <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-5">Where global capital meets<br className="hidden sm:block" /> African opportunity.</h2>
            <p className="text-[0.95rem] text-[#1E293B] leading-relaxed mb-4">The Lagos State Investment Forum is a premier, government-convened investment summit bringing together heads of state, global business leaders, development finance institutions, and policymakers to position Lagos — Africa&apos;s largest city and leading economic hub — as the continent&apos;s definitive destination for serious capital.</p>
            <p className="text-[0.95rem] text-[#1E293B] leading-relaxed">Hosted in partnership with the Commonwealth Enterprise and Investment Council (CWEIC), the Forum will unlock investment across infrastructure, technology, energy, creative industries, and financial markets — with concrete deal commitments and MoU signings as its measure of success.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[260px]">
            {[['25','Curated Sessions'],['3','Forum Days'],['30+','Speakers'],['8','Investment Sectors']].map(([n,l]) => (
              <div key={l} className="bg-[#0B1F45] p-5 text-center">
                <div className="font-[var(--font-display)] font-[800] text-[2.25rem] text-[#F4B41A] leading-none mb-1">{n}</div>
                <div className="font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase text-white/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme pullquote */}
      <section className="bg-[#0B1F45] py-16 sm:py-20 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {['100,0','170.7,29.3','200,100','170.7,170.7','100,200','29.3,170.7','0,100','29.3,29.3'].map((pt,i) => (
              <path key={i} d={`M100,100 L${i < 8 ? pt : '100,0'} A100,100 0 0,1 ${['170.7,29.3','200,100','170.7,170.7','100,200','29.3,170.7','0,100','29.3,29.3','100,0'][i]} Z`} fill="white"/>
            ))}
          </svg>
        </div>
        <div className="relative max-w-[720px] mx-auto">
          <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center justify-center gap-3 mb-5 text-[#F4B41A]">
            <span className="block w-6 h-px bg-current" />Forum Theme
          </div>
          <p className="font-[var(--font-display)] font-[800] text-[clamp(1.5rem,4vw,2.5rem)] text-white leading-tight tracking-[-0.02em] mb-4">
            <em className="text-[#F4B41A] not-italic">Lagos Rising:</em> Accelerating Africa&apos;s Global Gateway for Investment, Innovation and Inclusive Growth.
          </p>
          <p className="font-[var(--font-mono-landing)] text-[0.7rem] tracking-widest uppercase text-white/40">Lagos State Investment Forum 2026 · Official Theme</p>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-4 text-[#F4B41A]">
                <span className="block w-6 h-px bg-current" /><span>02</span> Programme
              </div>
              <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">Three days.<br />One defining forum.</h2>
            </div>
            <a href="#" className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-widest uppercase text-[#64748B] hover:text-[#0B1F45] transition-colors border-b border-[#E2DFD6] pb-0.5 shrink-0">↓ Download Programme PDF</a>
          </div>

          {/* Day tabs */}
          <div className="flex overflow-x-auto border-b border-[#E2DFD6] mb-0 -mx-4 sm:mx-0 px-4 sm:px-0">
            {days.map(d => (
              <button
                key={d.key}
                onClick={() => setActiveDay(d.key)}
                className={`flex items-center gap-1.5 font-[var(--font-mono-landing)] text-[0.7rem] tracking-wide uppercase px-4 sm:px-5 py-3 whitespace-nowrap border-none bg-transparent cursor-pointer border-b-[2.5px] transition-all ${activeDay === d.key ? 'text-[#0B1F45] border-b-[#F4B41A]' : 'text-[#64748B] border-b-transparent hover:text-[#0B1F45]'}`}
              >
                <span className="text-[#F4B41A] font-bold">{d.num}</span> {d.label}
              </button>
            ))}
          </div>

          <div className="py-2 -mx-4 sm:mx-0 px-4 sm:px-0">
            {activeDay === 'day1' && (
              <>
                <div className="py-3 mb-1 flex items-center gap-2 flex-wrap border-b border-[#E2DFD6]">
                  <span className="text-[0.9rem] text-[#64748B]">Opening Ceremony, Plenary Sessions &amp; Gala Dinner</span>
                  <span className="font-[var(--font-mono-landing)] text-[0.55rem] tracking-widest uppercase px-2 py-0.5 bg-[#FDF3D9] text-[#0B1F45]">Eko Hotel — Main Plenary Hall</span>
                </div>
                {DAY1_SESSIONS.map((s, i) => <SessionRow key={i} s={s} />)}
              </>
            )}
            {activeDay === 'day2' && (
              <>
                <div className="py-3 mb-1 flex items-center gap-2 flex-wrap border-b border-[#E2DFD6]">
                  <span className="text-[0.9rem] text-[#64748B]">Deep Dive Plenaries, Global Partnerships &amp; Closing Ceremony</span>
                  <span className="font-[var(--font-mono-landing)] text-[0.55rem] tracking-widest uppercase px-2 py-0.5 bg-[#E0F5F3] text-[#0A8E7F]">Eko Hotel — Main Plenary Hall</span>
                </div>
                {DAY2_SESSIONS.map((s, i) => <SessionRow key={i} s={s} />)}
              </>
            )}
            {activeDay === 'day3' && (
              <>
                <div className="py-3 mb-1 flex items-center gap-2 flex-wrap border-b border-[#E2DFD6]">
                  <span className="text-[0.9rem] text-[#64748B]">Exclusive Site Visits for Forum Delegates</span>
                  <span className="font-[var(--font-mono-landing)] text-[0.55rem] tracking-widest uppercase px-2 py-0.5 bg-[#EEF2FF] text-[#3730A3]">By Invitation · Pre-registration Required</span>
                </div>
                <p className="py-4 text-[0.9rem] text-[#64748B] leading-relaxed border-b border-[#E2DFD6]">Day 3 offers international delegates and investors a first-hand view of Nigeria&apos;s industrial transformation — visiting two of the most significant investment sites on the African continent. Transport from Eko Hotel is provided.</p>
                {DAY3_SESSIONS.map((s, i) => <SessionRow key={i} s={s} />)}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="bg-[#F6F5F1] py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-5 text-[#D7263D]">
            <span className="block w-6 h-px bg-current" /><span>03</span> Featured Speakers
          </div>
          <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-10">Heads of state. Global CEOs.<br className="hidden sm:block" /> Architects of African growth.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPEAKERS.map(s => (
              <div key={s.name} className="bg-white p-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${s.grad} mb-3`}>
                  <span className="font-[var(--font-display)] font-[800] text-white text-lg">{s.initials}</span>
                </div>
                <div className="font-semibold text-[0.85rem] text-[#0B1F45] leading-snug mb-0.5">{s.name}</div>
                <div className="text-[0.75rem] text-[#64748B] leading-snug mb-0.5">{s.role}</div>
                <div className="text-[0.72rem] text-[#94A3B8] leading-snug">{s.org}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-[var(--font-mono-landing)] text-[0.7rem] tracking-widest uppercase text-[#64748B]">+ 22 additional speakers to be announced</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-4 text-[#0A8E7F]">
            <span className="block w-6 h-px bg-current" />Forum Features
          </div>
          <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-8">Beyond the stage.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#0B1F45] p-6 sm:p-8">
              <span className="inline-block font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase px-2 py-1 mb-5 bg-amber-400/15 text-[#F4B41A]">Days 1 &amp; 2 · Running Concurrently</span>
              <h3 className="font-[var(--font-display)] font-[800] text-[1.5rem] text-white mb-3">The Deal Room</h3>
              <p className="text-white/60 text-[0.9rem] leading-relaxed mb-5">A dedicated, curated space for pre-arranged bilateral meetings between international investors, Lagos State Government representatives, and Nigerian businesses. The Deal Room is where commitments are made.</p>
              <dl className="space-y-2">
                {[['Format','Pre-scheduled 30-min bilateral meetings'],['Access','Pre-registered delegates only'],['Location','Eko Hotel — Deal Room Suite']].map(([dt,dd]) => (
                  <div key={dt} className="flex gap-3 text-[0.83rem]">
                    <dt className="text-white/40 shrink-0 w-20">{dt}</dt>
                    <dd className="text-white/80">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="bg-[#F6F5F1] border border-[#E2DFD6] p-6 sm:p-8">
              <span className="inline-block font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase px-2 py-1 mb-5 bg-[#FDF3D9] text-[#0B1F45]">Open Competition · SME Track</span>
              <h3 className="font-[var(--font-display)] font-[800] text-[1.5rem] text-[#0B1F45] mb-3">Lagos MSME Investment Challenge</h3>
              <p className="text-[#64748B] text-[0.9rem] leading-relaxed mb-5">An open pitch competition for Lagos-based micro, small and medium enterprises. Selected finalists pitch to a jury of global investors for investment consideration, mentorship, and market access support.</p>
              <dl className="space-y-2">
                {[['Prize','Investment consideration + mentorship'],['Jury','International venture and impact investors'],['Apply','Applications open — register to be notified']].map(([dt,dd]) => (
                  <div key={dt} className="flex gap-3 text-[0.83rem]">
                    <dt className="text-[#94A3B8] shrink-0 w-20">{dt}</dt>
                    <dd className="text-[#1E293B]">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section id="venue" className="bg-[#F6F5F1] py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#E2DFD6] aspect-video flex items-center justify-center rounded-none">
            <div className="text-center text-[#94A3B8]">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
                <rect width="48" height="48" rx="2" fill="#E2DFD6"/>
                <rect x="8" y="8" width="32" height="24" rx="1" fill="#C8C4BA" stroke="#B0ACA0" strokeWidth="1"/>
                <circle cx="24" cy="36" r="4" fill="#9CA3AF"/>
                <line x1="24" y1="32" x2="24" y2="20" stroke="#9CA3AF" strokeWidth="1.5"/>
              </svg>
              <span className="font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase text-[#94A3B8]">Map · Victoria Island, Lagos</span>
            </div>
          </div>
          <div>
            <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-4 text-[#0B1F45]">
              <span className="block w-6 h-px bg-current" /><span>04</span> Venue
            </div>
            <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.5rem,3.5vw,2.25rem)] text-[#0B1F45] mb-2">Eko Hotel &amp; Suites</h2>
            <p className="text-[0.9rem] text-[#64748B] leading-relaxed mb-6">One of West Africa&apos;s premier five-star conference hotels, situated on Victoria Island — Lagos&apos;s central business and diplomatic district.</p>
            <dl className="space-y-2.5">
              {[
                ['Address','1415 Adetokunbo Ademola Street, Victoria Island, Lagos 106104'],
                ['Dates','8–10 June 2026'],
                ['Main Hall','Main Plenary Hall — Opening, Keynotes, Plenaries'],
                ['Exhibition','Exhibition Pavilion — Networking, Sponsor Booths'],
                ['Breakouts','Breakout A (Plenary 2) · Breakout B (Plenary 3)'],
                ['Gala','Eko Hotel Ballroom — Evening of 8 June'],
                ['From Airport','~40–55 min from Murtala Muhammed International Airport'],
              ].map(([dt,dd]) => (
                <div key={dt} className="flex gap-3 text-[0.85rem]">
                  <dt className="font-semibold text-[#0B1F45] shrink-0 w-28">{dt}</dt>
                  <dd className="text-[#64748B]">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center gap-3 mb-4 text-[#64748B]">
            <span className="block w-6 h-px bg-current" /><span>05</span> Partners &amp; Sponsors
          </div>
          <h2 className="font-[var(--font-display)] font-[800] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-10">Backed by institutions<br className="hidden sm:block" /> that move markets.</h2>

          {[
            { label: 'Government & Co-Conveners', slots: ['Lagos State Government','Commonwealth Enterprise & Investment Council','Federal Ministry of Trade & Investment'], gov: true },
            { label: 'Platinum Partners', slots: ['Platinum Partner','Platinum Partner','Platinum Partner','Platinum Partner'], gov: false },
            { label: 'Gold Partners', slots: ['Gold Partner','Gold Partner','Gold Partner','Gold Partner','Gold Partner','Gold Partner'], gov: false },
            { label: 'Supporting Partners', slots: Array(8).fill('Supporting Partner'), gov: false },
          ].map(tier => (
            <div key={tier.label} className="mb-8">
              <div className="font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase text-[#64748B] mb-3">{tier.label}</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {tier.slots.map((s, i) => (
                  <div key={i} className={`h-16 flex items-center justify-center border border-[#E2DFD6] ${tier.gov ? 'bg-[#EEF2FF]' : 'bg-[#F6F5F1]'}`}>
                    <span className={`font-[var(--font-mono-landing)] text-[0.65rem] tracking-widest uppercase ${tier.gov ? 'text-[#4338CA]' : 'text-[#94A3B8]'}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[0.85rem] text-[#64748B]">Interested in partnership opportunities? <a href="#register" className="text-[#0A8E7F] underline">Contact the secretariat →</a></p>
        </div>
      </section>

      <RainbowStripe />

      {/* Register */}
      <section id="register" className="bg-[#0B1F45] py-20 sm:py-28 px-4 sm:px-8 text-center">
        <div className="max-w-[640px] mx-auto">
          <div className="font-[var(--font-mono-landing)] text-[0.68rem] tracking-[0.18em] uppercase flex items-center justify-center gap-3 mb-4 text-[#F4B41A]">
            <span className="block w-6 h-px bg-current" />Delegate Registration
          </div>
          <h2 className="font-[var(--font-display)] font-[800] text-[clamp(2rem,5vw,3.25rem)] text-white tracking-[-0.03em] leading-[1.1] mt-2 mb-5">Secure your place<br className="hidden sm:block" /> at the table.</h2>
          <p className="text-white/60 text-[0.95rem] leading-relaxed mb-8">The Lagos State Investment Forum is an invitation-only summit for serious investors, policymakers, and business leaders. Registration is limited. Apply early to confirm your delegation.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="bg-[#F4B41A] text-[#0B1F45] font-semibold text-[0.875rem] px-8 py-3.5 hover:bg-amber-400 transition-all">Apply to Register</a>
            <a href="#" className="border-[1.5px] border-white/40 text-white font-semibold text-[0.875rem] px-8 py-3.5 hover:border-white hover:bg-white/10 transition-all">Contact Secretariat</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071530] px-4 sm:px-8 pt-12 pb-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-8 pb-8 border-b border-white/10">
            <div>
              <strong className="font-[var(--font-display)] font-[800] text-[1rem] text-white block mb-1">Lagos State Investment Forum 2026</strong>
              <span className="font-[var(--font-mono-landing)] text-[0.6rem] tracking-widest uppercase text-white/30 block mb-4">Invest Lagos · investlagos.gov.ng</span>
              <p className="text-[0.82rem] text-white/45 leading-relaxed">Convened by the Lagos State Government in partnership with the Commonwealth Enterprise and Investment Council (CWEIC).</p>
            </div>
            <div>
              <h4 className="font-[var(--font-mono-landing)] text-[0.65rem] tracking-widest uppercase text-white/35 mb-4">Quick Links</h4>
              <ul className="space-y-2.5 list-none">
                {[['#about','About the Forum'],['#programme','Programme'],['#speakers','Speakers'],['#venue','Venue & Travel'],['#sponsors','Partners'],['#register','Register']].map(([href,label]) => (
                  <li key={href}><a href={href} className="text-[0.85rem] text-white/60 hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-[var(--font-mono-landing)] text-[0.65rem] tracking-widest uppercase text-white/35 mb-4">Secretariat</h4>
              <address className="not-italic text-[0.82rem] text-white/50 leading-loose">
                Ministry of Commerce, Cooperatives,<br />
                Trade and Investment<br />
                Lagos State Government<br />
                Secretariat, Alausa, Ikeja<br />
                Lagos State, Nigeria<br /><br />
                forum@investlagos.gov.ng
              </address>
            </div>
          </div>
          <div className="flex justify-between items-center pt-5 flex-wrap gap-3">
            <p className="font-[var(--font-mono-landing)] text-[0.65rem] tracking-wide uppercase text-white/25">© 2026 Lagos State Government. All rights reserved.</p>
            <p className="font-[var(--font-mono-landing)] text-[0.65rem] tracking-wide uppercase text-white/25">Lagos State Investment Forum · Eko Hotel, Victoria Island · 8–10 June 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
