export type AssetStatus = 'tbc' | 'template' | 'repeat' | 'confirm'

export type AssetItem = {
  id: string
  name: string
  note: string
  type: string
  day: string
  session: string
  time: string
  locations: string[]
  dims: string
  qty: number | string
  repeat: string
  status: AssetStatus
  tbcFlag: boolean
  copy: string
}

export type SectionItem = { section: string }

export type ChecklistRow = AssetItem | SectionItem

export function isSection(row: ChecklistRow): row is SectionItem {
  return 'section' in row
}

export const STATUS_LABEL: Record<AssetStatus, string> = {
  tbc: 'Needs Content',
  template: 'Master — Design First',
  repeat: 'Repeat / Reuse',
  confirm: '⚠ Awaiting Confirmation',
}

export const TYPE_BADGE: Record<string, string> = {
  'Template': 'bg-[#1E293B] text-white',
  'Session Slide': 'bg-[#0B1F45] text-white',
  'Lower Third': 'bg-[#F4B41A] text-[#0B1F45]',
  'Holding Slide': 'bg-[#94A3B8] text-white',
  'Break Slide': 'bg-[#E2DFD6] text-[#64748B]',
  'Backdrop': 'bg-[#0A8E7F] text-white',
  'Print': 'bg-[#D7263D] text-white',
  'Wayfinding': 'bg-[#7C3AED] text-white',
}

export const STATUS_BADGE: Record<AssetStatus, string> = {
  tbc: 'bg-yellow-100 text-yellow-800',
  template: 'bg-green-100 text-green-800',
  repeat: 'bg-teal-50 text-teal-800',
  confirm: 'bg-red-100 text-red-800',
}

export const ASSETS: ChecklistRow[] = [
  { section: 'MASTER TEMPLATES — Design these first. All other assets derive from them.' },

  { id:'T01', name:'Lower Third — Master Template',
    note:'One master design. Text is swapped per speaker across all 3 days. Every named speaker at this event gets a lower third.',
    type:'Template', day:'Templates', session:'All Sessions', time:'—',
    locations:['Main Stage','Breakout A','Breakout B','Gala Venue'],
    dims:'1920 × 1080 px', qty:1, repeat:'Base for all lower thirds', status:'template', tbcFlag:false,
    copy:'3 fields per speaker:\nName\nTitle / Role\nOrganisation' },

  { id:'T02', name:'Session Slide — Master Template',
    note:'One master layout. Swap: session label, title, room per session. Deliver at 4K and 1080p.',
    type:'Template', day:'Templates', session:'All Plenary Sessions', time:'—',
    locations:['Main Stage','Breakout A','Breakout B'],
    dims:'3840 × 2160 px (primary)\n1920 × 1080 px (breakout export)', qty:1, repeat:'Base for all session slides', status:'template', tbcFlag:false,
    copy:'3 fields:\nSession label (e.g. PLENARY 1)\nSession title\nSupporting info (Day · Time · Room)' },

  { id:'T03', name:'Break / Networking Slide — Master Template',
    note:'Design once. Only the reconvene time and room name change at each break.',
    type:'Template', day:'Templates', session:'All Breaks', time:'—',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'Reused ×4 across event', status:'template', tbcFlag:false,
    copy:'NETWORKING BREAK\nPlease reconvene at [TIME]\n[Room / session info]' },

  { id:'T04', name:'Holding / Waiting Slide — Animated Loop',
    note:'Loops between sessions. No session-specific content. 10–15 second soft loop. Export as MP4 H.264.',
    type:'Template', day:'Templates', session:'Between all sessions', time:'—',
    locations:['All Screens'], dims:'1920 × 1080 px\n(export as MP4, H.264)', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'LAGOS STATE INVESTMENT FORUM 2026\nEko Hotel & Suites · Victoria Island · Lagos\n8 – 10 June 2026' },

  { id:'T05', name:'Day Opening Slide — Master Template',
    note:'Two versions: Day 1 and Day 2. Same layout — swap day number and date only.',
    type:'Template', day:'Templates', session:'Start of Day 1 + Day 2', time:'—',
    locations:['All Screens'], dims:'3840 × 2160 px', qty:2, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'VERSION A — Day 1:\nDAY ONE · 8 June 2026\nLAGOS STATE INVESTMENT FORUM 2026\n\nVERSION B — Day 2:\nDAY TWO · 9 June 2026\nLAGOS STATE INVESTMENT FORUM 2026' },

  { id:'T06', name:'Panel Strip — All Panellists Name Bar',
    note:'Horizontal strip at bottom of frame showing ALL panellist names simultaneously. Different from individual lower thirds. Used for Governors Panel and Plenary 4.',
    type:'Template', day:'Templates', session:'Large panel sessions', time:'—',
    locations:['Main Stage'], dims:'1920 × 1080 px\n(strip element: 1920 × 120 px)', qty:1, repeat:'Base for Governors Panel + Plenary 4', status:'template', tbcFlag:false,
    copy:'One line across the bottom of screen:\n[Name · State/Org] separator [Name · State/Org] separator ... (all panellists)' },

  { section: 'DAY 1 — 8 JUNE 2026' },

  { id:'D1-01', name:'Opening Ceremony — Holding Slide',
    note:'Displayed from doors-open (08:30) until Cultural Performance begins. All screens.',
    type:'Holding Slide', day:'Day 1', session:'Pre-Opening', time:'08:30 – 09:30',
    locations:['Main Stage','Lobby Screens','All Screens'],
    dims:'3840 × 2160 px (stage)\n1920 × 1080 px (lobby)', qty:1, repeat:'Variant of T04', status:'tbc', tbcFlag:false,
    copy:'OPENING CEREMONY\nLAGOS STATE INVESTMENT FORUM 2026\n8 June 2026 · Eko Hotel & Suites, Victoria Island, Lagos' },

  { id:'D1-02', name:'Cultural Performance — Session Slide',
    note:'Keep slide minimal — should not compete visually with a live performance. Performer name TBC.',
    type:'Session Slide', day:'Day 1', session:'Cultural Performance', time:'09:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02 variant', status:'confirm', tbcFlag:true,
    copy:'CULTURAL PERFORMANCE\nOpening Ceremony · Lagos State Investment Forum 2026\n\n⚠️ Performer name TBC — leave blank until confirmed' },

  { id:'D1-03', name:'Welcome Address — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 1', session:'Welcome Address', time:'09:40',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'WELCOME ADDRESS\nHonourable Commissioner for Commerce, Cooperatives, Trade and Investment' },

  { id:'D1-04', name:'LT: Mrs. Folashade Kaosarat Bada Ambrose',
    note:'Reused at Plenary 1 as session Chair — one file, two appearances.',
    type:'Lower Third', day:'Day 1', session:'Welcome Address · Plenary 1 (Chair)', time:'09:40 · 13:30',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:1, repeat:'T01 · REUSED at Plenary 1', status:'repeat', tbcFlag:false,
    copy:'Mrs. Folashade Kaosarat Bada Ambrose\nHonourable Commissioner, Commerce, Cooperatives, Trade and Investment\nLagos State Government' },

  { id:'D1-05', name:'Opening Remarks — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 1', session:'Opening Remarks', time:'09:45',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'OPENING REMARKS\nCommonwealth Enterprise and Investment Council' },

  { id:'D1-06', name:'LT: Lord Marland',
    note:'Reused at Plenary 1 as panellist — one file, two appearances.',
    type:'Lower Third', day:'Day 1', session:'Opening Remarks · Plenary 1', time:'09:45 · 13:30',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:1, repeat:'T01 · REUSED at Plenary 1', status:'repeat', tbcFlag:false,
    copy:'Lord Marland\nChair\nCommonwealth Enterprise and Investment Council (CWEIC)' },

  { id:'D1-07', name:'Opening Address — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 1', session:'Opening Address — Governor Sanwo-Olu', time:'09:50',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'OPENING ADDRESS\nExecutive Governor, Lagos State' },

  { id:'D1-08', name:'Governor — Official Portrait Backdrop',
    note:"Full-screen official portrait. No text overlay needed. Displayed on Governor's entry and during address. Photo to be supplied by Lagos State / MCCTI.",
    type:'Backdrop', day:'Day 1', session:'Opening Address — Governor Sanwo-Olu', time:'09:50',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'Graphic only — no text overlay\nFull-screen official portrait: Mr. Babajide Olusola Sanwo-Olu\nPhoto supplied by Lagos State Government / MCCTI' },

  { id:'D1-09', name:'LT: Mr. Babajide Olusola Sanwo-Olu',
    note:'Reused across 3 sessions: Opening Address, Plenary 1, and Day 2 Closing — one file.',
    type:'Lower Third', day:'Day 1', session:'Opening Address · Plenary 1 · D2 Closing', time:'09:50 · 13:30 · 14:00 (D2)',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:1, repeat:'T01 · REUSED ×3 across event', status:'repeat', tbcFlag:false,
    copy:'Mr. Babajide Olusola Sanwo-Olu\nExecutive Governor\nLagos State, Federal Republic of Nigeria' },

  { id:'D1-10', name:'Special Address — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 1', session:'Special Address — Commonwealth SG', time:'10:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'SPECIAL ADDRESS\nSecretary-General, The Commonwealth' },

  { id:'D1-11', name:'LT: The Hon Shirley Botchwey',
    note:'',
    type:'Lower Third', day:'Day 1', session:'Special Address', time:'10:00',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'The Hon Shirley Botchwey\nSecretary-General\nThe Commonwealth' },

  { id:'D1-12', name:'Visiting Heads of Government — Session Slide',
    note:'Generic slide stays on screen between each head of government address.',
    type:'Session Slide', day:'Day 1', session:'Addresses — Visiting HoGs', time:'10:08',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'ADDRESSES\nVisiting Heads of Government\nLagos State Investment Forum 2026' },

  { id:'D1-13', name:'Country Flag Slides — Visiting HoGs',
    note:'One full-screen flag per visiting head of government. Displayed on entry before they reach the podium. Number of versions TBC — depends on confirmed attendees.',
    type:'Backdrop', day:'Day 1', session:'Addresses — Visiting HoGs', time:'10:08',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:'N (TBC)', repeat:'—', status:'confirm', tbcFlag:true,
    copy:'Graphic only — no text overlay\nFull-screen national flag of [Country TBC]\nOne slide per visiting head of government\n⚠️ Number of versions TBC from client' },

  { id:'D1-14', name:'LT: Visiting Heads of Government — Template',
    note:'One master T01 design, text swapped per head of government. Number of versions depends on confirmed attendees.',
    type:'Lower Third', day:'Day 1', session:'Addresses — Visiting HoGs', time:'10:08',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:'N (TBC)', repeat:'T01 × N — one per confirmed HoG', status:'confirm', tbcFlag:true,
    copy:'[Head of Government Full Name — TBC]\n[Title: President / Prime Minister / etc.]\n[Country]\n\n⚠️ Design one master template. Populate per confirmed attendee.' },

  { id:'D1-15', name:'Messages of Goodwill — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 1', session:'Messages of Goodwill', time:'10:20',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'MESSAGES OF GOODWILL\nForum Co-Chairs · Lagos State Investment Forum 2026' },

  { id:'D1-16', name:'LT: BUA Group Chairman',
    note:'⚠️ Name not confirmed. Do not finalise this lower third until we send the confirmed name.',
    type:'Lower Third', day:'Day 1', session:'Messages of Goodwill', time:'10:20',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'[NAME TBC — BUA Group Chairman]\nChairman\nBUA Group\n\n⚠️ Template only. Name not confirmed.' },

  { id:'D1-17', name:'LT: Alhaji Aliko Dangote',
    note:'',
    type:'Lower Third', day:'Day 1', session:'Messages of Goodwill', time:'10:20',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Alhaji Aliko Dangote\nChairman\nDangote Group' },

  { id:'D1-18', name:'Keynote Address — Session Slide',
    note:'Official title only — no personal name on screen without DSS / State House Protocol clearance.',
    type:'Session Slide', day:'Day 1', session:'Keynote Address — President of Nigeria', time:'10:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'KEYNOTE ADDRESS\nPresident of the Federal Republic of Nigeria\n\n⚠️ Do not use personal name — official title only' },

  { id:'D1-19', name:'Presidential Seal — Full Screen Backdrop',
    note:'Displayed during National Anthem and presidential entry. Vector seal — obtain from official channels only. No text.',
    type:'Backdrop', day:'Day 1', session:'Keynote Address — President of Nigeria', time:'10:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'Graphic only — no text overlay\nPresidential Seal of the Federal Republic of Nigeria\nHigh-res vector — sourced from official channels' },

  { id:'D1-20', name:'LT: President of the Federal Republic of Nigeria',
    note:'Official title only — no personal name without DSS / State House Protocol clearance.',
    type:'Lower Third', day:'Day 1', session:'Keynote Address — President of Nigeria', time:'10:30',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'President of the Federal Republic of Nigeria\nKeynote Address\nLagos State Investment Forum 2026\n\n⚠️ No personal name. Official title only.' },

  { id:'D1-21', name:'Pavilions & Exhibition — Opening Slide',
    note:'Lobby and pavilion screens during guided tour. Deliver in both landscape and portrait formats.',
    type:'Backdrop', day:'Day 1', session:'Official Opening of Pavilions & Exhibition', time:'11:30',
    locations:['Lobby Screens','Pavilion Screens'],
    dims:'1920 × 1080 px (landscape)\n1080 × 1920 px (portrait totems)', qty:2, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'OFFICIAL OPENING OF PAVILIONS & EXHIBITION\nLagos State Investment Forum 2026\n8 June 2026 · Eko Hotel & Suites' },

  { id:'D1-22', name:'Exhibition Welcome Slide',
    note:'Internal pavilion screens only. Loops during open exhibition period.',
    type:'Backdrop', day:'Day 1', session:'Exhibition', time:'11:30 – 12:30',
    locations:['Pavilion Screens'], dims:'1920 × 1080 px', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'WELCOME TO THE EXHIBITION\nDelegates are warmly invited to explore the pavilion\nRefreshments are served' },

  { id:'D1-23', name:"Governors' Investment Showcase Panel — Session Slide",
    note:'8 sitting governors chaired by Minister Oduwole.',
    type:'Session Slide', day:'Day 1', session:"Governors' Investment Showcase Panel", time:'12:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:"GOVERNORS' INVESTMENT SHOWCASE PANEL\nDay 1 · 12:30 · Main Plenary Hall" },

  { id:'D1-24', name:"Panel Strip — All 8 Governors",
    note:'Name bar across bottom showing all 8 governor names + states at once. Based on T06. Most names TBC.',
    type:'Lower Third', day:'Day 1', session:"Governors' Investment Showcase Panel", time:'12:30',
    locations:['Main Stage'], dims:'1920 × 1080 px\n(strip element: 1920 × 120 px)', qty:1, repeat:'T06', status:'confirm', tbcFlag:true,
    copy:'One strip across bottom of screen:\nH.E. [Name] · Lagos  |  H.E. [Name] · [State]  |  ... (×8 governors)\n\n⚠️ Only Gov. Sanwo-Olu (Lagos) confirmed. Remaining 7 TBC.' },

  { id:'D1-25', name:"Individual Governor Lower Thirds ×8",
    note:'One LT per governor. Only Sanwo-Olu confirmed. 7 are templates pending client confirmation.',
    type:'Lower Third', day:'Day 1', session:"Governors' Investment Showcase Panel", time:'12:30',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:8, repeat:'T01 × 8', status:'confirm', tbcFlag:true,
    copy:'CONFIRMED (1 of 8):\nH.E. Babajide Olusola Sanwo-Olu\nExecutive Governor\nLagos State\n\nTEMPLATE FOR REMAINING 7:\nH.E. [Governor Full Name — TBC]\nExecutive Governor\n[State] State' },

  { id:'D1-26', name:'LT: Dr. Jumoke Oduwole (Chair)',
    note:'Reused at Plenary 1 as panellist — one file, two appearances.',
    type:'Lower Third', day:'Day 1', session:"Governors' Panel (Chair) · Plenary 1", time:'12:30 · 13:30',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01 · REUSED at Plenary 1', status:'repeat', tbcFlag:false,
    copy:'Dr. Jumoke Oduwole\nHonourable Minister of Trade and Investment\nFederal Republic of Nigeria' },

  { id:'D1-27', name:"Plenary 1 — Session Slide",
    note:'',
    type:'Session Slide', day:'Day 1', session:"Plenary 1 — Lagos: Africa's Global Gateway", time:'13:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:"PLENARY 1\nLAGOS: AFRICA'S GLOBAL GATEWAY\nDay 1 · 13:30 · Main Plenary Hall" },

  { id:'D1-28', name:"Plenary 1 — New Panellist Lower Thirds ×3",
    note:'Lord Marland (REUSE D1-06) and Dr. Oduwole (REUSE D1-26) already exist. Only 3 new files needed — all names TBC.',
    type:'Lower Third', day:'Day 1', session:"Plenary 1 — Lagos: Africa's Global Gateway", time:'13:30',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:3, repeat:'T01 · 2 reused (D1-06 + D1-26)', status:'confirm', tbcFlag:true,
    copy:'REUSE: D1-06 (Lord Marland) + D1-26 (Dr. Oduwole) — no new files for those.\n\nNEW — 3 templates (names TBC):\n[DG, NACCIMA — TBC] / Director-General / NACCIMA\n[Chairman, Heirs Holdings — TBC] / Chairman / Heirs Holdings Group\n[CEO, Tolaram Group — TBC] / CEO / Tolaram Group' },

  { id:'D1-29', name:'Networking Lunch — Break Slide',
    note:'Delegates split between Breakout A and B after lunch — room directions important.',
    type:'Break Slide', day:'Day 1', session:'Networking Lunch', time:'14:30',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T03', status:'tbc', tbcFlag:false,
    copy:'NETWORKING LUNCH\nPlease reconvene at 15:30\nAfternoon sessions: Breakout Room A & B' },

  { id:'D1-30', name:'Afternoon Directional / Wayfinding Slide',
    note:'Loops on lobby and corridor screens during lunch. Clear room arrows essential. Deliver landscape + portrait.',
    type:'Wayfinding', day:'Day 1', session:'Networking Lunch', time:'14:30',
    locations:['Lobby Screens','Corridor Screens'],
    dims:'1920 × 1080 px (landscape)\n1080 × 1920 px (portrait totems)', qty:2, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'AFTERNOON SESSIONS BEGIN AT 15:30\nPlenary 2  →  Breakout Room A\nPlenary 3  →  Breakout Room B' },

  { id:'D1-31', name:'Plenary 2 — Session Slide (Breakout A)',
    note:'Room identifier in the slide is critical — attendees are navigating between two parallel rooms.',
    type:'Session Slide', day:'Day 1', session:'Plenary 2 — Technology & Innovation', time:'15:30',
    locations:['Breakout A Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'PLENARY 2 · BREAKOUT ROOM A\nTHE FUTURE OF TECHNOLOGY & INNOVATION\nDay 1 · 15:30 · Breakout Room A' },

  { id:'D1-32', name:'Elon Musk — Special Keynote Slide (×2 versions)',
    note:'⚠️ Format not confirmed. Design both — one for live video call, one for pre-recorded video message. Only one used on the day.',
    type:'Session Slide', day:'Day 1', session:'Plenary 2 — Breakout A', time:'15:30',
    locations:['Breakout A Screens'], dims:'1920 × 1080 px', qty:2, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'VERSION A (Live):\nSPECIAL KEYNOTE CONTRIBUTION\nElon Musk · Entrepreneur & Technologist\n[Live Address]\n\nVERSION B (Pre-recorded):\nSPECIAL KEYNOTE CONTRIBUTION\nElon Musk · Entrepreneur & Technologist\n[Video Message]' },

  { id:'D1-33', name:'LT: Elon Musk (×2 versions)',
    note:'Matches D1-32. Live label vs Video Message label.',
    type:'Lower Third', day:'Day 1', session:'Plenary 2 — Breakout A', time:'15:30',
    locations:['Breakout A Screens'], dims:'1920 × 1080 px', qty:2, repeat:'T01 — 2 versions', status:'confirm', tbcFlag:true,
    copy:'VERSION A (Live):\nElon Musk\nEntrepreneur & Technologist\n[Live Address]\n\nVERSION B (Pre-recorded):\nElon Musk\nEntrepreneur & Technologist\n[Video Message]' },

  { id:'D1-34', name:'Plenary 2 — Panellist Lower Thirds ×7',
    note:'All names TBC — build T01 templates, leave name fields empty until we send confirmed names.',
    type:'Lower Third', day:'Day 1', session:'Plenary 2 — Breakout A', time:'15:30',
    locations:['Breakout A Screens'], dims:'1920 × 1080 px', qty:7, repeat:'T01 × 7', status:'confirm', tbcFlag:true,
    copy:'7 lower thirds — all names TBC:\n[Chair, Flutterwave] / Chair / Flutterwave\n[Commissioner, MIST] / Commissioner, MIST / Lagos State\n[CEO, Interswitch] / CEO / Interswitch Group\n[CEO, Moniepoint] / CEO / Moniepoint\n[Founder, Andela] / Founder / Andela\n[Google Nigeria Lead] / [Title] / Google Nigeria\n[CEO, RusselSmith] / CEO / RusselSmith Group' },

  { id:'D1-35', name:'Plenary 3 — Session Slide (Breakout B)',
    note:'Room B identifier essential — parallel session to Plenary 2 in Room A.',
    type:'Session Slide', day:'Day 1', session:'Plenary 3 — Unlocking Investment', time:'15:30',
    locations:['Breakout B Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'PLENARY 3 · BREAKOUT ROOM B\nUNLOCKING INVESTMENT\nDay 1 · 15:30 · Breakout Room B' },

  { id:'D1-36', name:'LT: CityUK / City of London Representative',
    note:'⚠️ Speaker name TBC.',
    type:'Lower Third', day:'Day 1', session:'Plenary 3 — Breakout B', time:'15:30',
    locations:['Breakout B Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'[Name TBC — CityUK / City of London]\n[Title TBC]\nCity of London / CityUK\n\n⚠️ Template only.' },

  { id:'D1-37', name:'LT: Mr. Aig Imokhoude (Chair — Plenary 3)',
    note:'',
    type:'Lower Third', day:'Day 1', session:'Plenary 3 — Breakout B', time:'15:30',
    locations:['Breakout B Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Mr. Aig Imokhoude\nCo-Chair\nLagos International Finance Centre (LIFC)' },

  { id:'D1-38', name:'Plenary 3 — Panellist Lower Thirds ×8',
    note:'All names TBC — build templates.',
    type:'Lower Third', day:'Day 1', session:'Plenary 3 — Breakout B', time:'15:30',
    locations:['Breakout B Screens'], dims:'1920 × 1080 px', qty:8, repeat:'T01 × 8', status:'confirm', tbcFlag:true,
    copy:'8 lower thirds — all names TBC:\n[MD, IFC West Africa] / MD West Africa / IFC\n[CEO, FBNQuest] / CEO / FBNQuest\n[DG, DMO Nigeria] / Director-General / Debt Management Office\n[BII Representative] / [Title] / British International Investment\n[CEO, Africa Finance Corp] / President & CEO / Africa Finance Corporation\n[Standard Chartered Rep] / [Title] / Standard Chartered\n[MD, First Bank] / MD / First Bank of Nigeria\n[Stirling Bank Rep] / [Title] / Stirling Bank' },

  { id:'D1-39', name:'Gala Dinner — Welcome Backdrop',
    note:'Warmer, more celebratory visual tone than daytime plenary slides.',
    type:'Backdrop', day:'Day 1', session:'Gala Dinner', time:'19:00',
    locations:['Gala Venue Screens'], dims:'1920 × 1080 px', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'GALA DINNER\nLagos State Investment Forum 2026\n8 June 2026 · Eko Hotel & Suites, Victoria Island' },

  { id:'D1-40', name:'Gala Dinner — Seating Plan Display',
    note:'Table seating plan for venue entrance screens. Content supplied by client 24h before event. Design the layout template now; populate on the day.',
    type:'Wayfinding', day:'Day 1', session:'Gala Dinner', time:'19:00',
    locations:['Gala Entrance Screens'], dims:'1920 × 1080 px', qty:1, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'Table seating plan — content from client 24h before event\n\n⚠️ Design the layout template now. Populate on the day.' },

  { id:'D1-41', name:'Berklee College of Music — Performance Slide',
    note:'Displayed when Berklee takes the gala stage.',
    type:'Session Slide', day:'Day 1', session:'Gala Dinner — Live Performance', time:'19:00',
    locations:['Gala Stage Screen'], dims:'1920 × 1080 px', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'LIVE PERFORMANCE\nBerklee College of Music\nBoston, Massachusetts · USA' },

  { id:'D1-42', name:'LT: Berklee College of Music',
    note:'',
    type:'Lower Third', day:'Day 1', session:'Gala Dinner — Live Performance', time:'19:00',
    locations:['Gala Stage Screen'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Berklee College of Music\nLive Performance\nBoston, Massachusetts · USA' },

  { section: 'DAY 2 — 9 JUNE 2026' },

  { id:'D2-01', name:'Day 2 — Welcome Back Slide',
    note:'Displayed from doors-open on Day 2. All screens.',
    type:'Holding Slide', day:'Day 2', session:'Pre-Opening — Day 2', time:'09:00 – 09:30',
    locations:['All Screens'],
    dims:'3840 × 2160 px (stage)\n1920 × 1080 px (lobby)', qty:1, repeat:'T05 (Day 2 version)', status:'tbc', tbcFlag:false,
    copy:'DAY TWO\nLAGOS STATE INVESTMENT FORUM 2026\n9 June 2026 · Eko Hotel & Suites · Welcome back' },

  { id:'D2-02', name:'Opening Recap — Session Slide',
    note:'⚠️ Forum Chair names TBC — design slide with placeholder space.',
    type:'Session Slide', day:'Day 2', session:'Opening Recap — Forum Chairs', time:'09:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'confirm', tbcFlag:true,
    copy:'OPENING RECAP\nForum Chairs · Day 2\n\n⚠️ Forum Chair names TBC' },

  { id:'D2-03', name:'LT: Forum Chairs ×2',
    note:'⚠️ Both names TBC. Two separate files required.',
    type:'Lower Third', day:'Day 2', session:'Opening Recap — Forum Chairs', time:'09:30',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:2, repeat:'T01 × 2', status:'confirm', tbcFlag:true,
    copy:'[Forum Chair Name — TBC]\nForum Chair\nLagos State Investment Forum 2026\n\n⚠️ Two versions needed. Both names TBC.' },

  { id:'D2-04', name:'Day 1 Highlights Deck',
    note:'Optional: 5–6 recap slides assembled by content team on the night of Day 1. Confirm with client if required.',
    type:'Session Slide', day:'Day 2', session:'Opening Recap', time:'09:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:6, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'5–6 recap slides — content assembled night of Day 1\nFormat: key quote + speaker name  OR  moment + caption\n\n⚠️ Confirm with client whether required. If yes — on-the-night production needed.' },

  { id:'D2-05', name:'Deal Room / Networking — Gap Slide',
    note:'⚠️ 30-minute gap in programme (10:00–10:30) — intent not yet confirmed. May change.',
    type:'Break Slide', day:'Day 2', session:'Programme Gap (10:00–10:30)', time:'10:00',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T03 variant', status:'confirm', tbcFlag:true,
    copy:'NETWORKING & DEAL ROOM\nDelegates are invited to visit the Deal Room and Exhibition\nPlenary 4 begins at 10:30\n\n⚠️ Slot intent TBC — may be replaced by another session' },

  { id:'D2-06', name:'Plenary 4 — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 2', session:'Plenary 4 — Building the Cities of the Future', time:'10:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'PLENARY 4\nBUILDING THE CITIES OF THE FUTURE\nDay 2 · 10:30 · Main Plenary Hall' },

  { id:'D2-07', name:'AfDB President — Keynote Slide (×2 versions)',
    note:'⚠️ In-person or video attendance not confirmed. Design both versions.',
    type:'Session Slide', day:'Day 2', session:'Plenary 4 — Building the Cities of the Future', time:'10:30',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:2, repeat:'T02', status:'confirm', tbcFlag:true,
    copy:'VERSION A (In-Person):\nKEYNOTE ADDRESS\nPresident, African Development Bank Group\n[Name TBC]\n\nVERSION B (Video):\nKEYNOTE ADDRESS\nPresident, African Development Bank Group\n[Video Address]' },

  { id:'D2-08', name:'LT: AfDB President',
    note:'⚠️ Name TBC. May need two versions depending on attendance format.',
    type:'Lower Third', day:'Day 2', session:'Plenary 4', time:'10:30',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'[AfDB President Full Name — TBC]\nPresident\nAfrican Development Bank Group\n\n⚠️ If video address — note that on the lower third' },

  { id:'D2-09', name:'LT: Dr. Kadri Obafemi Hamzat (Chair — Plenary 4)',
    note:'',
    type:'Lower Third', day:'Day 2', session:'Plenary 4', time:'10:30',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Dr. Kadri Obafemi Hamzat\nDeputy Governor\nLagos State, Federal Republic of Nigeria' },

  { id:'D2-10', name:'Plenary 4 — Panellist Lower Thirds ×10',
    note:'All names TBC — build T01 templates.',
    type:'Lower Third', day:'Day 2', session:'Plenary 4', time:'10:30',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:10, repeat:'T01 × 10', status:'confirm', tbcFlag:true,
    copy:'10 lower thirds — all names TBC:\n[CEO, Julius Berger] / CEO / Julius Berger Nigeria\n[Commissioner, Energy] / Commissioner / Lagos State\n[DG, ICRC] / Director-General / ICRC\n[CEO, Lekki Free Zone] / CEO / Lekki Free Zone\n[MD, NSIA] / MD / Nigeria Sovereign Investment Authority\n[Group Director, Arup] / Group Director / Arup Group\n[NEOM Rep] / [Title] / NEOM\n[Adani Group Rep] / [Title] / Adani Group\n[British Steel Rep] / [Title] / British Steel\n[CEO, Benoy] / CEO / Benoy' },

  { id:'D2-11', name:'Networking Break — Break Slide',
    note:'Reuse T03 master. Swap reconvene time only — do not redesign.',
    type:'Break Slide', day:'Day 2', session:'Networking Break', time:'11:30',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'T03 — REUSE, update time only', status:'repeat', tbcFlag:false,
    copy:'NETWORKING BREAK\nPlenary 5 begins at 12:00\nDeal Room is open' },

  { id:'D2-12', name:'Plenary 5 — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 2', session:'Plenary 5 — Global Partnerships for Growth', time:'12:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'PLENARY 5\nGLOBAL PARTNERSHIPS FOR GROWTH\nDay 2 · 12:00 · Main Plenary Hall' },

  { id:'D2-13', name:'Fireside Chat — Intro Slide',
    note:'Displayed before Wamkele Mene segment.',
    type:'Session Slide', day:'Day 2', session:'Plenary 5', time:'12:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02 variant', status:'confirm', tbcFlag:true,
    copy:"FIRESIDE CHAT\nAFRICA'S TRADE ARCHITECTURE\nAfCFTA · Global Partnerships for Growth\n\n⚠️ Confirm Wamkele Mene attendance format (in-person or video)" },

  { id:'D2-14', name:'LT: Wamkele Mene',
    note:'⚠️ Confirm: in-person or video — may need a note on the lower third.',
    type:'Lower Third', day:'Day 2', session:'Plenary 5', time:'12:00',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'Wamkele Mene\nSecretary-General\nAfrican Continental Free Trade Area (AfCFTA)\n\n⚠️ If video address — note that on the lower third' },

  { id:'D2-15', name:'LT: Samantha Cohen CVO OBE (Chair — Plenary 5)',
    note:'',
    type:'Lower Third', day:'Day 2', session:'Plenary 5', time:'12:00',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Samantha Cohen CVO OBE\nChair · CEO\nCommonwealth Enterprise and Investment Council (CWEIC)' },

  { id:'D2-16', name:'Plenary 5 — Diplomatic Panellist Lower Thirds ×6',
    note:'Diplomatic order of precedence applies. All names TBC.',
    type:'Lower Third', day:'Day 2', session:'Plenary 5', time:'12:00',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:6, repeat:'T01 × 6', status:'confirm', tbcFlag:true,
    copy:'6 lower thirds — all names TBC (diplomatic protocol applies to order):\n[UK High Commissioner] / High Commissioner / British High Commission, Nigeria\n[Ambassador, Japan] / Ambassador / Embassy of Japan\n[Ambassador, Germany] / Ambassador / Embassy of Germany\n[Ambassador, India] / Ambassador / Embassy of India\n[Visiting Minister] / [Title] / [Country / Ministry]\n[President, Afrexim Bank] / President & Chairman / African Export-Import Bank' },

  { id:'D2-17', name:'Plenary 6 — Session Slide',
    note:'',
    type:'Session Slide', day:'Day 2', session:'Plenary 6 — Talent, Creativity and Culture', time:'13:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'PLENARY 6\nTALENT, CREATIVITY AND CULTURE\nDay 2 · 13:00 · Main Plenary Hall' },

  { id:'D2-18', name:'Plenary 6 Keynote Slide — 3 versions (TBC)',
    note:'Three candidate keynote speakers — one will be confirmed. Design all three. Only one used on the day.',
    type:'Session Slide', day:'Day 2', session:'Plenary 6', time:'13:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:3, repeat:'T02 × 3 versions', status:'confirm', tbcFlag:true,
    copy:'VERSION A:\nKEYNOTE ADDRESS\nProf. Wole Soyinka · Nobel Laureate in Literature\n\nVERSION B:\nKEYNOTE ADDRESS\nBolanle Austin-Peters · Creative Director & Entrepreneur\n\nVERSION C:\nKEYNOTE ADDRESS\nKunle Afolayan · Filmmaker & Cultural Entrepreneur\n\n⚠️ Design all three. Only one used live.' },

  { id:'D2-19', name:'Plenary 6 Keynote LT — 3 versions (TBC)',
    note:'Matches D2-18. Three files — one per candidate.',
    type:'Lower Third', day:'Day 2', session:'Plenary 6', time:'13:00',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:3, repeat:'T01 × 3 versions', status:'confirm', tbcFlag:true,
    copy:'VERSION A:\nProf. Wole Soyinka\nNobel Laureate in Literature\nNigeria\n\nVERSION B:\nBolanle Austin-Peters\nCreative Director & Entrepreneur\nTerra Kulture, Nigeria\n\nVERSION C:\nKunle Afolayan\nFilmmaker & Cultural Entrepreneur\nNigeria' },

  { id:'D2-20', name:'LT: Eva Omaghomi (Chair — Plenary 6)',
    note:'',
    type:'Lower Third', day:'Day 2', session:'Plenary 6', time:'13:00',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'tbc', tbcFlag:false,
    copy:'Eva Omaghomi\nChair\nLagos State Investment Forum 2026' },

  { id:'D2-21', name:'Plenary 6 — Panellist Lower Thirds ×5',
    note:'Note: Bolanle Austin-Peters (CEO Terra Kulture) may be keynoting instead of panelling — confirm with us.',
    type:'Lower Third', day:'Day 2', session:'Plenary 6', time:'13:00',
    locations:['Main Stage','Confidence Monitor'], dims:'1920 × 1080 px', qty:5, repeat:'T01 × 5', status:'confirm', tbcFlag:true,
    copy:'5 lower thirds — all names TBC:\n[CEO, Mavin Records] / CEO / Mavin Records\n[Director, Netflix Sub-Saharan Africa] / Director, Content / Netflix\n[Founder, Norrsken Africa] / Founder / Norrsken Africa\n[CEO, Terra Kulture — if not keynoting] / CEO / Terra Kulture\n[DG, NCAC] / Director-General / National Council for Arts and Culture' },

  { id:'D2-22', name:'Nollywood & Lagos Fashion Week — Showcase Slide',
    note:'⚠️ Format TBC — video reel or live presentation. If video: file must be delivered 48h before event for AV quality check.',
    type:'Session Slide', day:'Day 2', session:'Plenary 6', time:'13:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'NOLLYWOOD & LAGOS FASHION WEEK\nCreative Economy Showcase · Plenary 6\nLagos State Investment Forum 2026\n\n⚠️ Format TBC — video reel or live. If video: deliver file 48h before event.' },

  { id:'D2-23', name:'Closing Session — Opening Slide',
    note:'',
    type:'Session Slide', day:'Day 2', session:'Closing Session — The Way Forward', time:'14:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'T02', status:'tbc', tbcFlag:false,
    copy:'CLOSING SESSION\nTHE WAY FORWARD\nLagos State Investment Forum 2026 · Day 2' },

  { id:'D2-24', name:'Forum Communiqué — Slide',
    note:'Displayed while communiqué is read aloud.',
    type:'Session Slide', day:'Day 2', session:'Closing Session', time:'14:00',
    locations:['Main Stage'], dims:'3840 × 2160 px', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'FORUM COMMUNIQUÉ\nLagos State Investment Forum 2026\n8–9 June 2026 · Eko Hotel & Suites, Lagos, Nigeria' },

  { id:'D2-25', name:'MoU Signing — Screen Slide',
    note:'Displayed on all screens during signing ceremony.',
    type:'Session Slide', day:'Day 2', session:'Closing Session — MoU Signing', time:'14:00',
    locations:['Main Stage','All Screens'], dims:'3840 × 2160 px', qty:1, repeat:'—', status:'tbc', tbcFlag:false,
    copy:'MEMORANDA OF UNDERSTANDING\nSigning Ceremony · Lagos State Investment Forum 2026\n9 June 2026 · Eko Hotel & Suites, Victoria Island, Lagos' },

  { id:'D2-26', name:'MoU Signing — Physical Backdrop Banner (Print)',
    note:'Step-and-repeat print backdrop behind signing table for press photography. ⚠️ Number of MoU signatories TBC — determines table width and banner size. Deliver print-ready PDF.',
    type:'Print', day:'Day 2', session:'Closing Session — MoU Signing', time:'14:00',
    locations:['Signing Table — Stage'],
    dims:'3000 × 2000 px @ 300 dpi\n(approx. 3m × 2m print)', qty:1, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'Step-and-repeat backdrop:\nLogo tiles: Invest Lagos · Lagos State Coat of Arms · CWEIC (if co-branded)\nBottom: Lagos State Investment Forum 2026 · Eko Hotel & Suites · 9 June 2026\n\n⚠️ Number of MoU signatories TBC — determines banner width. Confirm before printing.' },

  { id:'D2-27', name:'LT: Vote of Thanks Speaker',
    note:'⚠️ Name and title TBC.',
    type:'Lower Third', day:'Day 2', session:'Closing Session', time:'14:00',
    locations:['Main Stage'], dims:'1920 × 1080 px', qty:1, repeat:'T01', status:'confirm', tbcFlag:true,
    copy:'[Name TBC — Vote of Thanks Speaker]\n[Title TBC]\n[Organisation TBC]\n\n⚠️ Template only.' },

  { id:'D2-28', name:'Final Thank You Slide',
    note:'Warm closing treatment. Displayed during closing lunch and as the last slide of the event.',
    type:'Backdrop', day:'Day 2', session:'Closing Session + Closing Lunch', time:'14:00 – 15:30',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'REUSED as D2-29 variant', status:'tbc', tbcFlag:false,
    copy:'THANK YOU FOR JOINING US\nLagos State Investment Forum 2026\nEko Hotel & Suites · Victoria Island · Lagos, Nigeria' },

  { id:'D2-29', name:'Safe Travels Slide',
    note:'Displayed during and after closing lunch. Subtle variant of D2-28 — swap headline only.',
    type:'Backdrop', day:'Day 2', session:'Networking Lunch (Closing)', time:'14:30',
    locations:['All Screens'], dims:'1920 × 1080 px', qty:1, repeat:'Variant of D2-28', status:'tbc', tbcFlag:false,
    copy:'SAFE TRAVELS\nLagos State Investment Forum 2026\nWe look forward to welcoming you back' },

  { section: 'DAY 3 — 10 JUNE 2026' },

  { id:'D3-01', name:'Day 3 — Site Visit Departure Slide',
    note:'Hotel lobby screens from 07:00. Must be readable from a distance. Deliver landscape + portrait.',
    type:'Wayfinding', day:'Day 3', session:'Site Visits — Dangote Refinery + Lekki Free Zone', time:'07:00 – 08:00',
    locations:['Hotel Lobby Screens'],
    dims:'1920 × 1080 px (landscape)\n1080 × 1920 px (portrait totems)', qty:2, repeat:'—', status:'confirm', tbcFlag:true,
    copy:'DAY 3 — SITE VISITS\nBuses depart at 08:00 from the hotel main entrance\nPlease be ready by 07:45\n\n⚠️ Security clearance for Dangote Refinery — confirm entry instructions with programme manager' },
]
