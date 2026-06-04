export type SessionType = 'performance' | 'speech' | 'keynote' | 'panel' | 'break' | 'other'

export type Flag = { kind: 'warn' | 'info' | 'ok'; text: string }

export type AvcCue = { type: 'av' | 'stage' | 'warn'; label: string; text: string }

export type ScreenSlot =
  | { slot: string; type: 'title'; title: string; sub?: string }
  | { slot: string; type: 'lt'; name: string; role: string; org?: string }
  | { slot: string; type: 'logo'; text: string }
  | { slot: string; type: 'note'; text: string }

export type BriefingSession = {
  id: number
  day: 1 | 2 | 3
  order: number
  startTime: string
  duration: number
  title: string
  type: SessionType
  speakers: string[]
  moderator: string
  flags: Flag[]
  overview: { venue: string; format: string; config: string; objective: string }
  avCues: AvcCue[]
  screenContent: ScreenSlot[]
  mcScript: string
  mcDirection: string
  moderatorNotes: string
  moderatorQuestions: string[]
}

// Source: Invest_Lagos_3_0_Programme 020626 MG new.docx.pdf (2 June 2026 version)
// Last updated: 4 June 2026

export const SESSIONS: BriefingSession[] = [

  // ═══════════════════════════════════════════════════
  // DAY ONE — MONDAY 8 JUNE 2026
  // Sessions 1–8 are sub-elements of the Opening Ceremony block (09:30–11:30)
  // DEAL ROOMS running in parallel all day — Pre-Arranged, Invitation Only
  // ═══════════════════════════════════════════════════

  {id:1,day:1,order:1,startTime:'09:30',duration:10,title:'Cultural Performance',type:'performance',
   speakers:['TBC — Cultural Performer'],moderator:'',
   flags:[{kind:'warn',text:'Performer TBC'},{kind:'ok',text:'MC confirmed for Opening Ceremony: Ms. Mojibade Sosanya'}],
   overview:{venue:'Main Plenary Hall — Stage',format:'Live Performance',config:'Open stage, spotlight, performer mic',objective:'Set the cultural tone for the Opening Ceremony and welcome guests as they are seated.'},
   avCues:[
     {type:'av',label:'Lighting',text:'Warm amber wash. Single follow-spot on performer. House lights at 30%.'},
     {type:'av',label:'Audio',text:'Cultural performance intro music fades as performer enters. Live mic on performer. Confirm monitor level at rehearsal.'},
     {type:'stage',label:'Stage',text:'Performer enters from stage left. MC positioned off-stage right. Clear stage immediately after performance.'},
     {type:'warn',label:'Open Item',text:'Performer identity and act TBC. Confirm with client and request sound check requirements and stage plot.'}
   ],
   screenContent:[
     {slot:'Holding Slide',type:'title',title:'LAGOS STATE INVESTMENT FORUM 2026',sub:'Opening Ceremony · 8 June 2026 · Eko Hotel & Suites'},
     {slot:'Performance Slide',type:'title',title:'Cultural Performance',sub:'Opening Ceremony'},
     {slot:'Note',type:'note',text:'No lower third required. Stage lighting tells the story. Confirm performer name once finalised for possible on-screen credit.'}
   ],
   mcScript:'Ladies and gentlemen, please be seated. We begin our Opening Ceremony with a special cultural performance celebrating Lagos — the heartbeat of African enterprise.',
   mcDirection:'Delivered from off-stage or podium before performance begins. Remain off-stage throughout.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:2,day:1,order:2,startTime:'09:40',duration:5,title:'Welcome Address',type:'speech',
   speakers:['Hon. Commissioner Folashade Kaosarat Bada Ambrose Medebem HC — Ministry of Commerce, Cooperatives, Trade & Investment, Lagos State'],moderator:'',
   flags:[],
   overview:{venue:'Main Plenary Hall — Podium',format:'Address from Podium',config:'Single podium, podium mic, Lagos State branding on screen',objective:"Official welcome from Lagos State Government; set context for the Forum's significance."},
   avCues:[
     {type:'av',label:'Slides',text:"Commissioner's name + title + Lagos State Coat of Arms. Full-screen lower third on cue."},
     {type:'av',label:'Audio',text:'Podium mic live on cue as Commissioner approaches. House mics off.'},
     {type:'av',label:'Lighting',text:'Full stage wash. Podium spotlight.'},
     {type:'stage',label:'Stage',text:'Commissioner enters from stage right. Walk to podium. Confirm protocol aide is in position.'},
     {type:'stage',label:'Note',text:'Confirm mic level before she approaches — adjust at rehearsal.'}
   ],
   screenContent:[
     {slot:'Holding Slide',type:'title',title:'WELCOME ADDRESS',sub:'Lagos State Investment Forum 2026'},
     {slot:'Lower Third',type:'lt',name:'Hon. Commissioner Folashade Kaosarat Bada Ambrose Medebem HC',role:'Commissioner for Commerce, Cooperatives, Trade & Investment',org:'Lagos State Government'},
     {slot:'Background Slide',type:'logo',text:'Lagos State Coat of Arms — full-bleed on screen behind podium'}
   ],
   mcScript:'Please welcome to the stage the Honourable Commissioner for Commerce, Cooperatives, Trade and Investment of Lagos State — Mrs Folashade Kaosarat Bada Ambrose Medebem.',
   mcDirection:'Commissioner should be positioned at stage entrance before MC intro begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:3,day:1,order:3,startTime:'09:45',duration:5,title:'Opening Remarks',type:'speech',
   speakers:['Rt. Hon. Lord Marland — Chair, Commonwealth Enterprise and Investment Council (CWEIC)'],moderator:'',
   flags:[{kind:'info',text:'Pronunciation: MAR-land'}],
   overview:{venue:'Main Plenary Hall — Podium',format:'Address from Podium',config:'Single podium. CWEIC logo on screen.',objective:'Open the Forum on behalf of the Commonwealth; signal international investor confidence in Lagos.'},
   avCues:[
     {type:'av',label:'Slides',text:'Lord Marland name + title + CWEIC logo. Transition from previous lower third.'},
     {type:'av',label:'Audio',text:'Podium mic live. Brief pause for applause from previous speaker.'},
     {type:'stage',label:'Stage',text:'Lord Marland moves from VIP seating to podium. Confirm exit path is clear.'},
     {type:'warn',label:'Pronunciation',text:"Confirm pronunciation with Lord Marland's team in advance: MAR-land."}
   ],
   screenContent:[
     {slot:'Speaker Slide',type:'title',title:'Opening Remarks',sub:'Commonwealth Enterprise and Investment Council'},
     {slot:'Lower Third',type:'lt',name:'Lord Marland',role:'Chair',org:'Commonwealth Enterprise and Investment Council (CWEIC)'},
     {slot:'Background',type:'logo',text:'CWEIC logo · Lagos State logo — split screen or alternating'}
   ],
   mcScript:'Next, it is my honour to invite Lord Marland, Chair of the Commonwealth Enterprise and Investment Council, to deliver his Opening Remarks.',
   mcDirection:'Pronunciation note: MAR-land. Pause for applause. Lord Marland should be in position before MC intro begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:4,day:1,order:4,startTime:'09:50',duration:10,title:'Opening Address — Governor of Lagos State',type:'speech',
   speakers:['Mr. Babajide Olusola Sanwo-Olu — Executive Governor, Lagos State'],moderator:'',
   flags:[{kind:'warn',text:'Confirm Guard of Honour protocol'}],
   overview:{venue:'Main Plenary Hall — Podium',format:'Address from Podium',config:'Full stage lighting. Official portrait slide. Podium mic. All other mics muted.',objective:"Governor's official opening — key message on Lagos investment proposition."},
   avCues:[
     {type:'av',label:'Slides',text:"Governor's official portrait + \"Executive Governor, Lagos State\" title card. Lagos State Coat of Arms. Full-screen. No lower third during speech."},
     {type:'av',label:'Lighting',text:'Full stage wash at maximum. House lights lower slightly.'},
     {type:'av',label:'Audio',text:'Podium mic live on entry. All other open mics muted. Room mics at 20%.'},
     {type:'stage',label:'Protocol',text:'Governor enters with protocol. Aide-de-camp position confirmed. Stage fully clear of all other persons.'},
     {type:'warn',label:'Open Item',text:'Confirm: is State Guard of Honour procedure applicable? Protocol officer to advise.'}
   ],
   screenContent:[
     {slot:'Entry Slide',type:'title',title:'OPENING ADDRESS',sub:'Executive Governor, Lagos State'},
     {slot:'Portrait Slide',type:'logo',text:'Official portrait of Mr. Babajide Olusola Sanwo-Olu — Full-screen · Lagos State branding'},
     {slot:'Lower Third',type:'lt',name:'Mr. Babajide Olusola Sanwo-Olu',role:'Executive Governor',org:'Lagos State, Federal Republic of Nigeria'},
     {slot:'Closing Slide',type:'logo',text:'Lagos State Coat of Arms — displayed during applause as Governor returns to seat'}
   ],
   mcScript:'Distinguished guests, it is now my profound honour to invite the Executive Governor of Lagos State — Mr. Babajide Olusola Sanwo-Olu — to deliver his Opening Address.',
   mcDirection:'Pause for full applause. Governor should be in position at stage entrance before intro begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:5,day:1,order:5,startTime:'10:00',duration:8,title:'Special Address — Commonwealth Secretary-General',type:'speech',
   speakers:['The Hon. Shirley Botchwey — Secretary-General, The Commonwealth'],moderator:'',
   flags:[{kind:'info',text:'Pronunciation: BOT-chway'}],
   overview:{venue:'Main Plenary Hall — Podium',format:'Address from Podium',config:'Podium mic. Commonwealth logo on screen.',objective:"Commonwealth Secretary-General's message on Lagos's role in global economic diplomacy."},
   avCues:[
     {type:'av',label:'Slides',text:'Shirley Botchwey portrait + name + title + The Commonwealth logo. Lower third on entry.'},
     {type:'av',label:'Audio',text:'Podium mic live. Clean handover from previous speaker.'},
     {type:'stage',label:'Stage',text:'Confirm VIP seating position — direct walk to podium.'},
     {type:'warn',label:'Pronunciation',text:'BOT-chway. Confirm with her team. Full name: The Honourable Shirley Botchwey.'}
   ],
   screenContent:[
     {slot:'Speaker Slide',type:'title',title:'Special Address',sub:'Secretary-General, The Commonwealth'},
     {slot:'Lower Third',type:'lt',name:'The Hon. Shirley Botchwey',role:'Secretary-General',org:'The Commonwealth'},
     {slot:'Background',type:'logo',text:'The Commonwealth logo — full screen or split with Lagos State branding'}
   ],
   mcScript:'We now invite the Secretary-General of the Commonwealth, The Honourable Shirley Botchwey, to deliver a Special Address.',
   mcDirection:'Pronunciation: BOT-chway. She should be positioned to walk directly to podium.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:6,day:1,order:6,startTime:'10:08',duration:12,title:'Addresses — Visiting Heads of Government',type:'speech',
   speakers:['Visiting Heads of Government — Names and order TBC'],moderator:'',
   flags:[{kind:'warn',text:'Names & protocol order TBC — critical open item'}],
   overview:{venue:'Main Plenary Hall — Podium',format:'Sequential addresses from podium',config:'One speaker at a time. Podium mic. Country flag + name card per speaker.',objective:'Visiting heads of government express diplomatic support and bilateral investment interest.'},
   avCues:[
     {type:'av',label:'Slides',text:'Per speaker: portrait (if available) + name + title + country flag. Update slides once confirmed.'},
     {type:'av',label:'Audio',text:'Podium mic only. Clean cut between speakers. Allow applause between each.'},
     {type:'stage',label:'Holding',text:'All visiting heads in VIP holding area. Protocol aide walks each to podium in turn.'},
     {type:'warn',label:'Critical',text:'ORDER OF PROTOCOL must be confirmed by client. If more than 3 heads: strict 3-min per speaker. MC must manage time firmly.'},
     {type:'warn',label:'Slides',text:'Placeholder slides must be updated with confirmed names, titles, and country flags before event day.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'ADDRESSES',sub:'Visiting Heads of Government'},
     {slot:'Per-Speaker Lower Third — Template',type:'lt',name:'[HEAD OF STATE NAME]',role:'[TITLE / POSITION]',org:'[COUNTRY]'},
     {slot:'Country Flag Note',type:'note',text:'Full-screen country flag on entry for each head of government. Transition to lower third + flag split once speaker reaches podium.'},
     {slot:'Design Brief',type:'note',text:'Lower third template: dark navy bar, left-aligned. White name in Poppins Bold. Gold title line. Country flag small, right-aligned. One template per delegation — confirm flag colour accuracy with design team.'}
   ],
   mcScript:'TBC — MC script to be written once speaker names and order are confirmed. Template: "We are now honoured to welcome [Title] [Name], [Position], [Country], to the podium."',
   mcDirection:'Strict timing: if 3+ speakers, MC must enforce 3 minutes each. Visible signal agreed with Stage Manager for time warnings.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:7,day:1,order:7,startTime:'10:20',duration:10,title:'Messages of Goodwill',type:'speech',
   speakers:['Mrs Kanayo Awani — Executive Vice President, Afreximbank','His Excellency Wamkele Mene — Secretary-General, African Continental Free Trade Area (AfCFTA)'],moderator:'',
   flags:[
     {kind:'warn',text:'Speaking order TBC — confirm with protocol team before event day'},
     {kind:'info',text:'Change from previous programme: BUA Group and Dangote Group removed. Replaced by Afreximbank + AfCFTA.'},
     {kind:'info',text:'Wamkele Mene also appears in Day 2 Plenary 5 fireside chat — same lower third applies both days'}
   ],
   overview:{venue:'Main Plenary Hall — Podium',format:'Two sequential short addresses',config:'Podium. Two mics. One speaker at a time.',objective:'Messages of Goodwill from continental financial and trade institutions. Regional endorsement of the Forum.'},
   avCues:[
     {type:'av',label:'Slides',text:'Speaker 1: Afreximbank logo + Mrs Kanayo Awani. Speaker 2: AfCFTA logo + HE Wamkele Mene.'},
     {type:'av',label:'Audio',text:'Podium mic per speaker. Clean transition between the two.'},
     {type:'stage',label:'Format',text:'Both at podium sequentially. Confirm briefing on 3–4 minute time limit each.'},
     {type:'warn',label:'Programme Change',text:'BUA Group (Abdul Samad Rabiu) and Dangote Group (Alhaji Aliko Dangote) have been removed from Messages of Goodwill in the updated programme. Confirm with client this is final — they are no longer listed as Forum Co-Chairs in this version.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'MESSAGES OF GOODWILL',sub:'Opening Ceremony · Lagos State Investment Forum 2026'},
     {slot:'Speaker 1 Lower Third',type:'lt',name:'Mrs Kanayo Awani',role:'Executive Vice President',org:'Afreximbank'},
     {slot:'Speaker 2 Lower Third',type:'lt',name:'His Excellency Wamkele Mene',role:'Secretary-General',org:'African Continental Free Trade Area (AfCFTA)'},
     {slot:'Note',type:'note',text:'Afreximbank logo and AfCFTA logo as holding slide before session. Wamkele Mene also delivers fireside chat in Day 2 Plenary 5 — reuse the same lower third template.'}
   ],
   mcScript:'We will now hear Messages of Goodwill. First, from the Executive Vice President of Afreximbank — Mrs Kanayo Awani. Followed by His Excellency Wamkele Mene, Secretary-General of the African Continental Free Trade Area.',
   mcDirection:'Confirm speaking order before script is finalised. Brief both speakers on 3–4 minute time limit each.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:8,day:1,order:8,startTime:'10:30',duration:60,title:'Keynote Address — President of Nigeria',type:'keynote',
   speakers:['Asiwaju Bola Ahmed Tinubu, GCFR — President of the Federal Republic of Nigeria'],moderator:'',
   flags:[{kind:'warn',text:'Presidential protocol — coordinate with DSS'}],
   overview:{venue:'Main Plenary Hall — Podium',format:'Presidential Keynote',config:'Full stage clear. Presidential seal on screen. National Anthem on entry. All mics live.',objective:"Presidential keynote — anchor the Forum's national significance and signal federal commitment to the Lagos investment agenda."},
   avCues:[
     {type:'av',label:'National Anthem',text:'Cue National Anthem recording on Presidential entry. Fade after one verse — confirm protocol with DSS.'},
     {type:'av',label:'Slides',text:'Presidential seal — full screen on entry. Transition to name + title lower third once President reaches podium. NO other graphics during address.'},
     {type:'av',label:'Lighting',text:'Full stage wash at maximum brightness. Follow-spot on podium. House lights to minimum.'},
     {type:'av',label:'Audio',text:'Podium mic live. All other mics muted. Recording — confirm authorisation with DSS.'},
     {type:'stage',label:'Security',text:'COORDINATE WITH DSS. Full stage clear minimum 5 minutes before Presidential entry. Security sweep confirmed. Exit protocol confirmed.'},
     {type:'warn',label:'Protocol',text:'All attendees standing on Presidential entry. MC gives instruction to rise. Confirm exit protocol — does the President remain for the pavilion walk-through or depart?'}
   ],
   screenContent:[
     {slot:'Pre-Entry Slide',type:'title',title:'KEYNOTE ADDRESS',sub:'President of the Federal Republic of Nigeria'},
     {slot:'Entry — Full Screen',type:'logo',text:'Presidential Seal of the Federal Republic of Nigeria — full screen. No text overlay during National Anthem.'},
     {slot:'Lower Third',type:'lt',name:'President of the Federal Republic of Nigeria',role:'Keynote Address',org:'Federal Republic of Nigeria'},
     {slot:'Design Brief',type:'note',text:'Presidential lower third: Green-white-green flag accent. Formal title only on screen — do NOT use personal name without DSS/State House clearance. Confirm with protocol team before design is finalised.'}
   ],
   mcScript:'Distinguished guests, honoured delegates — we now have the exceptional privilege of welcoming the President of the Federal Republic of Nigeria to deliver the Keynote Address. Will everyone please rise.',
   mcDirection:'Full stop after "please rise." Wait for the room to stand and for full applause. Do not continue speaking until President reaches the podium.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:9,day:1,order:9,startTime:'12:30',duration:60,title:"Governors' Pavilion Walk-through",type:'other',
   speakers:['President of Nigeria · Governor Sanwo-Olu · Selected VIP Guests'],moderator:'',
   flags:[{kind:'warn',text:'Tour route, guide and VIP list TBC'},{kind:'info',text:'Previously titled "Official Opening of Pavilions & Exhibition" — renamed in updated programme'}],
   overview:{venue:'Exhibition Pavilion & Lobby',format:'Guided VIP tour — President and Governor lead, delegates observe',config:'No stage. Roaming mic for guide. Photography team in position. Refreshments served.',objective:'The President and Governor of Lagos State, accompanied by selected VIP Guests, tour the pavilion. Delegates are invited to observe — this is a VIP-led moment, not open floor time.'},
   avCues:[
     {type:'av',label:'Music',text:'Ambient background music through PA system in lobby and pavilion. Upbeat, non-intrusive.'},
     {type:'av',label:'Screens',text:'Loop event branding. "GOVERNORS\' WALK-THROUGH PAVILION — Lagos State Investment Forum 2026".'},
     {type:'av',label:'Roaming Mic',text:'One roaming mic for tour guide. Fresh battery. Brief the guide on mic handling.'},
     {type:'stage',label:'Logistics',text:'Tour route walked by Stage Manager before session. Security sweep of pavilion. Photo team in 3 positions: pavilion entrance, key exhibits, VIP walkthrough moments.'},
     {type:'warn',label:'Open Items',text:'Who is the tour guide? VIP list for the guided group? Is there a ribbon-cutting? Are delegates allowed to walk alongside or observation-only?'}
   ],
   screenContent:[
     {slot:'Lobby Screens',type:'title',title:"GOVERNORS' WALK-THROUGH PAVILION",sub:'Lagos State Investment Forum 2026 · 8 June 2026'},
     {slot:'Pavilion Screens',type:'title',title:'WELCOME TO THE EXHIBITION',sub:'Delegates are warmly invited to observe the Governor\'s tour · Refreshments are served'},
     {slot:'Note',type:'note',text:'No speaker lower thirds required. Focus on wayfinding and branding across all lobby and pavilion screens.'}
   ],
   mcScript:'Distinguished guests, the President and Governor of Lagos State will now lead a guided tour of our Pavilion and Exhibition. Delegates are warmly invited to observe. Refreshments are being served in the lobby. We reconvene in the Plenary Hall at 13:30.',
   mcDirection:'Deliver before VIP party departs for pavilion. Speak clearly — some guests may already be moving.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:10,day:1,order:10,startTime:'11:30',duration:60,title:"Panel 1 — Governors' Investment Showcase",type:'panel',
   speakers:['Participating State Governors — TBC (confirmed list pending from client)'],
   moderator:'',
   flags:[
     {kind:'warn',text:'Governors\' confirmed list TBC — needed for MC script and lower thirds'},
     {kind:'info',text:'No moderator listed in 2 June 2026 programme. Session is self-facilitated. Dr. Jumoke Oduwole moved to Plenary 1 (Opening Remarks).'},
     {kind:'warn',text:'Speaking order and seating by protocol rank — confirm with client before event day'}
   ],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Keynote address + Governors\' investment pitches moderated by Zain Asher',config:'Panel table. Name placards. Water on table. Governors in holding room 15 min before.',objective:'State Governors present targeted investment opportunities to investors, DFIs and private sector decision-makers. Format designed to maximise deal-ready engagement.'},
   avCues:[
     {type:'av',label:'Slides',text:"Session title: \"PANEL 1 — GOVERNORS' INVESTMENT SHOWCASE\". Keynote: Dr. Jumoke Oduwole lower third. Individual Governor lower thirds as each pitches."},
     {type:'av',label:'Individual Lower Thirds',text:'Switch to individual lower third for each governor as they speak. Pre-load all confirmed governors in protocol order.'},
     {type:'av',label:'Audio',text:'Panel table mics — one per governor + moderator. Keynote speaker at podium mic.'},
     {type:'stage',label:'Setup',text:'Governors in holding room 15 minutes before session. Name placards in protocol order. Session self-facilitated — confirm format with client (chair or open pitch format).'},
     {type:'warn',label:'Critical',text:'Confirmed governor list required from client ASAP — MC script, lower thirds, name placards and seating order all depend on it.'}
   ],
   screenContent:[
     {slot:'Session Opening Slide',type:'title',title:"PANEL 1 — GOVERNORS' INVESTMENT SHOWCASE",sub:'Day 1 · 11:30 · Main Plenary Hall'},
     {slot:'Session Subtitle',type:'note',text:'The Nigerian Economy and Opportunities for Sub-national Economic Acceleration'},
     {slot:'Governor Lower Third — Template',type:'lt',name:'H.E. [Governor Name]',role:'Executive Governor',org:'[State] State, Federal Republic of Nigeria'},
     {slot:'Note',type:'note',text:'Pre-load individual governor lower thirds once confirmed list received from client. Seating order from protocol team determines lower third sequence.'}
   ],
   mcScript:'Ladies and gentlemen, we now move to Panel One — the Governors\' Investment Showcase: The Nigerian Economy and Opportunities for Sub-national Economic Acceleration. This high-visibility session brings together State Governors to present targeted investment opportunities to our distinguished audience.',
   mcDirection:'Allow all governors to be seated before MC intro. Confirm session facilitation format with client before event day.',
   moderatorNotes:'',
   moderatorQuestions:['[Governor]: What is the single most investable sector in your state right now, and what are you offering investors?','[Follow-up]: What specific barrier has your state removed in the last 12 months that was previously blocking investment?']},

  {id:11,day:1,order:11,startTime:'13:30',duration:60,title:"Plenary 1 — Lagos: Africa's Global Gateway",type:'panel',
   speakers:['Her Excellency Dr. Jumoke Oduwole — Hon. Minister for Trade & Investment (Opening Remarks)','Mrs. Folashade Ambrose-Medebem, HC — Commissioner, MCCTI','Engr. Jani Ibrahim — President, NACCIMA','Princess Zahrah Mohammed Audu — Director General, PEBEC','Mr. Yann Gilbert — President, European Business Chamber, Nigeria'],
   moderator:'Mrs. Rolake Akinkugbe-Filani',
   flags:[
     {kind:'ok',text:'Opening Remarks confirmed: Her Excellency Dr. Jumoke Oduwole, Hon. Minister for Trade & Investment'},
     {kind:'ok',text:'Moderator confirmed: Mrs. Rolake Akinkugbe-Filani'},
     {kind:'info',text:'Panel: Ambrose-Medebem/MCCTI, Jani Ibrahim/NACCIMA, Princess Zahrah/PEBEC, Yann Gilbert/European Business Chamber Nigeria'}
   ],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Opening Remarks + panel discussion',config:'Panel table for 5. Opening Remarks at podium, then Dr. Oduwole joins panel. Moderator: Rolake Akinkugbe-Filani.',objective:"Position Lagos as Africa's primary investment gateway for trade and investment. Minister Oduwole opens with the federal trade and investment policy framing; panellists examine structural conditions and enabling environment for large-scale capital."},
   avCues:[
     {type:'av',label:'Opening Slide',text:"\"PLENARY 1: LAGOS — AFRICA'S GLOBAL GATEWAY\". Session branding."},
     {type:'av',label:'Opening Remarks',text:"Dr. Jumoke Oduwole at podium — lower third: 'Hon. Minister for Trade & Investment, Federal Republic of Nigeria'. Transition to panel table once she joins."},
     {type:'av',label:'Audio',text:"Podium mic for Opening Remarks. Switch to panel mic when Dr. Oduwole joins the table. 5 panel mics + moderator mic."},
     {type:'stage',label:'Setup',text:'Full panel seated before session begins. Dr. Oduwole delivers Opening Remarks from podium, then joins panel table. Rolake Akinkugbe-Filani seated as moderator.'},
     {type:'av',label:'Lower Thirds',text:'Pre-load all 5 panellist lower thirds. Rotate as each panellist speaks. Moderator lower third on entry.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 1',sub:"Lagos: Africa's Global Gateway"},
     {slot:'Opening Remarks',type:'lt',name:'Her Excellency Dr. Jumoke Oduwole',role:'Opening Remarks · Hon. Minister for Trade & Investment',org:'Federal Republic of Nigeria'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mrs. Rolake Akinkugbe-Filani',role:'Moderator',org:'EnergyInc Advisors'},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate through each panellist as they speak:\n· Mrs. Folashade Ambrose-Medebem, HC — Commissioner, MCCTI, Lagos State\n· Engr. Jani Ibrahim — President, NACCIMA\n· Princess Zahrah Mohammed Audu — Director General, PEBEC\n· Mr. Yann Gilbert — President, European Business Chamber, Nigeria'}
   ],
   mcScript:"We now move to Plenary One — Lagos: Africa's Global Gateway. We begin with Opening Remarks from the Honourable Minister for Trade and Investment — Her Excellency Dr. Jumoke Oduwole. This session is moderated by Mrs. Rolake Akinkugbe-Filani.",
   mcDirection:'Confirm full panel is seated before MC begins. Dr. Oduwole delivers Opening Remarks from podium, then joins the panel table. Rolake Akinkugbe-Filani takes over as moderator.',
   moderatorNotes:"Session objective: position Lagos as Africa's primary investment gateway for trade and investment. 60 minutes: ~10 min Opening Remarks (Dr. Oduwole) → 35 min panel discussion → 15 min Q&A.",
   moderatorQuestions:["Minister Oduwole — what is the single federal policy change that would most immediately accelerate private investment into Lagos?","What does Lagos offer Commonwealth and international investors that no other African city can match right now?","How is PEBEC's enabling business environment work translating into measurable outcomes for investors on the ground?","What is the biggest structural barrier to investment that remains — and who is responsible for removing it?"]},

  {id:12,day:1,order:12,startTime:'14:30',duration:60,title:'Networking Lunch',type:'break',
   speakers:[''],moderator:'',
   flags:[{kind:'warn',text:'Sectoral Working Lunch room assignments TBC'}],
   overview:{venue:'Lunch Venue — TBC · Invitation-only Sectoral Working Lunches in parallel',format:'Open networking lunch + parallel invitation-only working lunches',config:'No stage activity. Ambient music. Screens on loop.',objective:'Delegates network freely. Invitation-Only Sectoral Working Lunches run in parallel for targeted sector discussions.'},
   avCues:[
     {type:'av',label:'Music',text:'Ambient playlist through PA. Jazz or light contemporary — confirm vibe with client.'},
     {type:'av',label:'Screens',text:'All screens: "NETWORKING LUNCH — Reconvene at 15:30 · Plenary 2 begins in Main Hall."'},
     {type:'stage',label:'Reset',text:'Stage team resets main hall during lunch for afternoon plenaries. Note: Plenary 2 and 3 are now SEQUENTIAL in the main hall — no breakout rooms needed.'},
     {type:'warn',label:'Breakout Rooms',text:'Sectoral Working Lunches — confirm rooms, hosts, and attendee lists with client.'}
   ],
   screenContent:[
     {slot:'Lunch Slide',type:'title',title:'NETWORKING LUNCH',sub:'Please reconvene at 15:30 · Plenary 2 — The Future of Technology & Innovation in Main Hall'},
     {slot:'Note',type:'note',text:'Plenaries 2 and 3 are now sequential in the main plenary hall. No breakout rooms for afternoon sessions. Update directional signage accordingly.'}
   ],
   mcScript:'Ladies and gentlemen, we now break for Networking Lunch. Invitation-Only Sectoral Working Lunches are running in parallel — check your delegate pack for room assignments. We reconvene at 15:30 for Plenary Two in the Main Hall.',
   mcDirection:'Confirm lunch room name before event day. Emphasise main hall reconvene — no breakout split in the afternoon.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:13,day:1,order:13,startTime:'15:30',duration:60,title:'Plenary 2 — The Future of Technology & Innovation',type:'panel',
   speakers:['Mr. Tosin Eniolorunda — Chief Executive Officer, Moniepoint MFB (Opening Remarks)','Mr. Olugbenga Agboola — Chief Executive Officer, Flutterwave','Mr. Tunbosun Alake — Honourable Commissioner, Ministry of Innovation, Science & Technology, Lagos State','Lord Geidt — Director, Burstock','Mr. Kayode Adeleke — Chief Executive Officer, Arridex','Mrs. Olatomiwa Williams — Chief Growth & AI Officer (Middle East & Africa), Microsoft'],
   moderator:'Mr. Zaki Cooper',
   flags:[
     {kind:'ok',text:'Moderator: Mr. Zaki Cooper (updated from Rolake Akinkugbe-Filani in 2 June 2026 programme)'},
     {kind:'info',text:'Kayode Adeleke now listed as CEO of Arridex (not RusselSmith). Update name placard and lower third.'},
     {kind:'info',text:'Lord Geidt now listed as Director, Burstock (not Baron Geidt). Mitchell Elegbe moved to Plenary 3. Olatomiwa Williams/Microsoft added.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Keynote address + panel discussion',config:'Panel table: 6 panellists + keynote at podium, then joins panel. Main hall — single track.',objective:'Explore how AI, digital infrastructure and fintech are shaping the next generation of African enterprise. Identify talent, regulatory and capital conditions needed to scale Lagos\'s technology sector.'},
   avCues:[
     {type:'av',label:'Opening Slide',text:'"PLENARY 2: THE FUTURE OF TECHNOLOGY & INNOVATION"'},
     {type:'av',label:'Keynote',text:'Tosin Eniolorunda keynote: podium lower third. Transition to panel table after keynote.'},
     {type:'av',label:'Audio',text:'6 panel mics + moderator mic. Keynote at podium mic then panel mic.'},
     {type:'stage',label:'Stage',text:'Main plenary hall. Panel table for 7 (6 panellists + moderator). No breakout room needed.'},
     {type:'av',label:'Lower Thirds',text:'Kayode Adeleke: CEO, Arridex. Lord Geidt: Director, Burstock. Olatomiwa Williams: Chief Growth & AI Officer (MEA), Microsoft. Pre-load all before session.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 2',sub:'The Future of Technology & Innovation'},
     {slot:'Opening Remarks Lower Third',type:'lt',name:'Mr. Tosin Eniolorunda',role:'Opening Remarks · Chief Executive Officer',org:'Moniepoint MFB'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mr. Zaki Cooper',role:'Moderator',org:''},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Mr. Olugbenga Agboola — CEO, Flutterwave\n· Mr. Tunbosun Alake — Commissioner, Ministry of Innovation, Science & Technology, Lagos State\n· Lord Geidt — Director, Burstock\n· Mr. Kayode Adeleke — CEO, Arridex\n· Mrs. Olatomiwa Williams — Chief Growth & AI Officer (MEA), Microsoft'}
   ],
   mcScript:'We now move to Plenary Two — The Future of Technology and Innovation. This session is moderated by Mr. Zaki Cooper. We begin with Opening Remarks from the Chief Executive Officer of Moniepoint — Mr. Tosin Eniolorunda.',
   mcDirection:'Pronunciation: En-io-lo-run-da. Session is main hall, single track.',
   moderatorNotes:'Session objective: explore AI, digital infrastructure and fintech as drivers of inclusive growth in Lagos. Anchor in what investors need to hear — not what tech founders want to say.',
   moderatorQuestions:["What is the single infrastructure investment that would most accelerate Lagos's tech sector in the next 5 years?","Fintech has scaled — what's the next wave, and who is positioned to lead it from Lagos?","How does Nigeria's regulatory environment compare to Kenya and South Africa for international tech investors today?","What role does AI specifically play in the next phase of growth for Lagos-based businesses?"]},

  {id:14,day:1,order:14,startTime:'16:30',duration:60,title:'Plenary 3 — Unlocking Investment',type:'panel',
   speakers:['Mr. Abubakar Suleiman — Chief Executive Officer, Sterling Bank (Opening Remarks)','Ms. Adeola Ukhola — Country Manager, British International Investment','Mr. Banji Fehintola — Executive Board Member and Executive Director, Financial Services, Africa Finance Corporation','Mr. Olusegun Alebiosu — Chief Executive Officer, First Bank of Nigeria','Mr. Mitchell Elegbe — Founder and Group Chief Executive Officer, Interswitch'],
   moderator:'Temi Marcella — Managing Director, Alcent Capital',
   flags:[
     {kind:'info',text:'Opening Remarks: Mr. Abubakar Suleiman, CEO Sterling Bank (moved from panellist to Opening Remarks).'},
     {kind:'info',text:'Mitchell Elegbe moves here from Plenary 2. Aig Imoukhuede no longer keynotes Plenary 3 — he appears only at Closing Plenary.'},
     {kind:'ok',text:'Moderator confirmed: Temi Marcella, Managing Director, Alcent Capital.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Keynote address + panel discussion',config:'Panel table: 4 panellists + keynote at podium, then joins panel. Single track, main hall.',objective:'Examine the mechanics of capital deployment: blended finance, DFI co-investment, and the conditions under which commercial capital follows public commitment. Address barriers to financial close on large infrastructure transactions in Lagos.'},
   avCues:[
     {type:'av',label:'Opening Slide',text:'"PLENARY 3: UNLOCKING INVESTMENT"'},
     {type:'av',label:'Opening Remarks',text:'Abubakar Suleiman Opening Remarks at podium. Lower third: CEO, Sterling Bank. Transition to panel table once he joins.'},
     {type:'av',label:'Audio',text:'5 panel mics + moderator mic + podium mic for Opening Remarks.'},
     {type:'stage',label:'Stage',text:'Main plenary hall continues from Plenary 2. Panel table for 5 panellists + moderator.'},
     {type:'warn',label:'Flow',text:'Plenary 3 flows directly into Closing Plenary at 17:30. Alert Temi Marcella to wrap by 17:25. Hold delegates in the room.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 3',sub:'Unlocking Investment'},
     {slot:'Opening Remarks Lower Third',type:'lt',name:'Mr. Abubakar Suleiman',role:'Opening Remarks · Chief Executive Officer',org:'Sterling Bank'},
     {slot:'Moderator Lower Third',type:'lt',name:'Temi Marcella',role:'Moderator · Managing Director',org:'Alcent Capital'},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Ms. Adeola Ukhola — Country Manager, British International Investment\n· Mr. Banji Fehintola — Executive Board Member & ED Financial Services, Africa Finance Corporation\n· Mr. Olusegun Alebiosu — CEO, First Bank of Nigeria\n· Mr. Mitchell Elegbe — Founder and Group CEO, Interswitch'}
   ],
   mcScript:'We now move to Plenary Three — Unlocking Investment. This session is moderated by Temi Marcella, Managing Director of Alcent Capital. We begin with Opening Remarks from the Chief Executive Officer of Sterling Bank — Mr. Abubakar Suleiman.',
   mcDirection:'Plenary 3 flows directly into the Closing Plenary. Do not dismiss delegates — alert moderator at 17:25 and hold the room.',
   moderatorNotes:'Session objective: unlock the mechanics of capital deployment for Lagos infrastructure projects. Focus on blended finance, DFI co-investment, and barriers to financial close. 60 minutes: ~10 min keynote → 35 min panel → 15 min Q&A.',
   moderatorQuestions:['What is the single biggest barrier to financial close on large Lagos infrastructure projects right now?','How should Lagos structure a blended finance vehicle to attract DFI co-investment?','What conditions need to change before commercial banks in Nigeria can consistently lead infrastructure deals?','Which sector has the clearest pathway to bankable projects in Lagos today?']},

  {id:24,day:1,order:15,startTime:'17:30',duration:20,title:'Day One Closing Plenary',type:'speech',
   speakers:['Lagos International Financial Centre — Video Presentation (Special Feature)','Mr. Aig Imoukhuede — Co-Chair, Invest Lagos 3.0','Governor Babajide Sanwo-Olu — Lagos State (Closing Remarks)'],moderator:'',
   flags:[
     {kind:'info',text:'New in 2 June 2026 programme: Special Feature — Lagos International Financial Centre video presentation. Queue video ahead of Aig Imoukhuede.'},
     {kind:'ok',text:'Aig Imoukhuede confirmed as Co-Chair Invest Lagos 3.0 for this session (no longer keynoting Plenary 3 — he comes fresh to stage).'},
     {kind:'warn',text:'Governor Sanwo-Olu must be briefed on 17:30 cue — alert him while Plenary 3 is running.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Two short closing addresses — Co-Chair then Governor',config:'Podium. Both speakers delivered from podium or centre stage. No panel table.',objective:'Day One formal close. Co-Chair reflects on the day\'s outcomes. Governor delivers closing remarks and sets expectation for Day Two.'},
   avCues:[
     {type:'av',label:'Opening Slide',text:'"DAY ONE — CLOSING PLENARY". Event branding.'},
     {type:'av',label:'LIFC Video',text:'⚠️ Special Feature: Lagos International Financial Centre — video presentation. Pre-load and test video before 17:30. Confirm file format with AV team. Full-screen playback on main screen.'},
     {type:'av',label:'Aig Imoukhuede',text:'Enters after LIFC video. Lower third: Co-Chair, Invest Lagos 3.0.'},
     {type:'av',label:'Governor',text:'Governor Sanwo-Olu enters for Closing Remarks. Official portrait or branding slide on entry.'},
     {type:'av',label:'Timing',text:'Session runs 17:30–17:50. Strict 20 minutes — Gala Dinner prep begins at 18:00.'},
     {type:'stage',label:'Flow',text:'Aig Imoukhuede: 5–7 min reflections. Governor Sanwo-Olu: 7–10 min closing remarks. MC closes session and announces Gala Dinner time.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'DAY ONE — CLOSING PLENARY',sub:'Lagos State Investment Forum 2026'},
     {slot:'LIFC Video',type:'title',title:'LAGOS INTERNATIONAL FINANCIAL CENTRE',sub:'Special Feature · Video Presentation'},
     {slot:'Co-Chair Lower Third',type:'lt',name:'Mr. Aig Imoukhuede',role:'Co-Chair',org:'Invest Lagos 3.0'},
     {slot:'Governor Lower Third',type:'lt',name:'Mr. Babajide Olusola Sanwo-Olu',role:'Closing Reflections · Executive Governor',org:'Lagos State'},
     {slot:'Day 1 Close Slide',type:'title',title:'THANK YOU — DAY ONE',sub:'Gala Dinner begins at 19:00 · Please return to your hotel rooms to refresh'}
   ],
   mcScript:'Ladies and gentlemen, we move to our Closing Plenary. We begin with a Special Feature — a presentation on the Lagos International Financial Centre. [Video plays]. We are now pleased to invite our Co-Chair, Mr. Aig Imoukhuede. [pause for applause]. And now — Closing Remarks from the Executive Governor of Lagos State, Mr. Babajide Sanwo-Olu.',
   mcDirection:'Keep this tight — 20 minutes total. After Governor\'s remarks, announce Gala Dinner clearly: time, venue, dress code.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:15,day:1,order:16,startTime:'19:00',duration:150,title:'Private Gala Dinner',type:'performance',
   speakers:['By Invitation Only'],moderator:'',
   flags:[
     {kind:'ok',text:'MC confirmed: Ms. Mojibade Sosanya (same MC as Opening Ceremony)'},
     {kind:'warn',text:'Private Gala Dinner — By Invitation Only. Gala running order and entertainment TBC.'},
     {kind:'warn',text:'Seating plan, entertainment, and speaker list TBC — request full Gala programme from client.'}
   ],
   overview:{venue:'Gala Dinner Venue — TBC (Eko Hotel ballroom or garden)',format:'Private seated gala dinner — By Invitation Only',config:'Full gala AV setup. Round tables. Separate from plenary configuration.',objective:'Private celebration for invited delegates. Celebrate Day 1 outcomes, create premium networking opportunities. MC: Ms. Mojibade Sosanya.'},
   avCues:[
     {type:'av',label:'Setup',text:'Full gala AV — dedicated sound system. NOT the plenary rig. Confirm with venue AV team.'},
     {type:'av',label:'Screens',text:'Gala screens: welcome slide + table seating plan + event branding. Warm, celebratory palette — NOT presentation mode.'},
     {type:'av',label:'Lighting',text:'Warm dinner lighting. Coordinate with lighting designer on gala look.'},
     {type:'stage',label:'MC',text:'Ms. Mojibade Sosanya is MC for the Gala Dinner. Brief her on full Gala running order at rehearsal.'},
     {type:'warn',label:'Open Items',text:'1. Full Gala Dinner running order — who speaks? In what order?\n2. Entertainment/performance TBC — confirm requirements\n3. Seating plan confirmed and printed?\n4. Which space within Eko Hotel?'}
   ],
   screenContent:[
     {slot:'Welcome Slide',type:'title',title:'PRIVATE GALA DINNER',sub:'By Invitation Only · Lagos State Investment Forum 2026 · 8 June 2026 · Eko Hotel & Suites'},
     {slot:'MC Lower Third',type:'lt',name:'Ms. Mojibade Sosanya',role:'Master of Ceremonies',org:'Invest Lagos 3.0'},
     {slot:'Design Note',type:'note',text:'Gala screens should use the full event colour palette — warmer, more celebratory than the daytime conference look.'}
   ],
   mcScript:'TBC — Gala Dinner running order to be confirmed with the client. Full MC script to be prepared once programme is received.',
   mcDirection:'MC: Ms. Mojibade Sosanya. Request full Gala running order minimum 5 days before event. Brief Mojibade on the full Gala programme at Sunday rehearsal.',
   moderatorNotes:'',moderatorQuestions:[]},

  // ═══════════════════════════════════════════════════
  // DAY TWO — TUESDAY 9 JUNE 2026
  // DEAL ROOMS running in parallel all day — Pre-Arranged, Invitation Only
  // Day starts at 09:00 (not 09:30)
  // ═══════════════════════════════════════════════════

  {id:16,day:2,order:17,startTime:'09:00',duration:30,title:'Day Two Opening',type:'speech',
   speakers:['Mrs. Folasade Ambrose Medebem — Honourable Commissioner, Ministry of Commerce, Industry, Trade and Cooperatives','Mr. Sam Egube — Deputy Chief of Staff, Lagos State','Zain Asher — CNN'],moderator:'',
   flags:[
     {kind:'info',text:'Change: Day 2 now starts at 09:00 (was 09:30). This session resolves the previous 30-minute programme gap.'},
     {kind:'info',text:'Format: Opening Reflection Session — both speakers. Confirmed names from updated programme.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Opening Reflection Session — two speakers',config:'Podium or 2-seat conversation setup. Confirm with client.',objective:'Re-open Day 2. Reflect on Day 1 outcomes. Set the agenda and energy for Day 2. Energise delegates.'},
   avCues:[
     {type:'av',label:'Slides',text:'"DAY TWO — 9 JUNE 2026". Event branding. Commissioner Ambrose lower third. Zain Asher lower third.'},
     {type:'av',label:'Audio',text:'2 mics — podium or conversation setup depending on format confirmed.'},
     {type:'stage',label:'Stage',text:'Both speakers in building by 08:30. Green room access confirmed. Format (sequential speeches vs. conversation) confirmed before rehearsal.'},
     {type:'warn',label:'Format',text:'Confirm: is this two sequential addresses (podium) or a conversation format (2 chairs)? Client to advise.'}
   ],
   screenContent:[
     {slot:'Day 2 Opening Slide',type:'title',title:'DAY TWO — LAGOS STATE INVESTMENT FORUM',sub:'9 June 2026 · Eko Hotel & Suites · Welcome back'},
     {slot:'Commissioner Lower Third',type:'lt',name:'Mrs. Folasade Ambrose Medebem',role:'Honourable Commissioner, Ministry of Commerce, Industry, Trade and Cooperatives',org:'Lagos State Government'},
     {slot:'Sam Egube Lower Third',type:'lt',name:'Mr. Sam Egube',role:'Deputy Chief of Staff',org:'Lagos State'},
     {slot:'Zain Asher Lower Third',type:'lt',name:'Zain Asher',role:'Day Two Opening',org:'CNN'}
   ],
   mcScript:"Good morning and welcome to Day Two of Invest Lagos 3.0. Yesterday we set the agenda — today we drive it forward. I'm delighted to welcome the Honourable Commissioner Mrs Folasade Ambrose Medebem, Mr Sam Egube, Deputy Chief of Staff of Lagos State, and Zain Asher of CNN, to open our second day.",
   mcDirection:'Energetic delivery — Day 2 needs a strong re-open. Both speakers should be standing by before MC begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:18,day:2,order:18,startTime:'09:30',duration:60,title:'Plenary 4 — Building the Cities of the Future',type:'panel',
   speakers:['Dr. Kadri Obafemi Hamzat — Deputy Governor, Lagos State (Opening Remarks)','Dr. Segun Ogunsanya — Chairman, Nigeria Sovereign Investment Authority (NSIA)','Prof. Akin Abayomi — Honourable Commissioner for Health, Lagos State','Mr. Haresh Aswani — Managing Director for Africa, Tolaram Group','Mr. Tom Cartledge — Chief Executive Officer, Benoy'],
   moderator:'Mrs. Rolake Akinkugbe-Filani',
   flags:[
     {kind:'ok',text:'Moderator confirmed: Mrs. Rolake Akinkugbe-Filani. Moderates Plenary 1, 4 and 7.'},
     {kind:'info',text:'AfDB President, Mrs. Adesuwa Ladoja and Mr. Shahzad Athar removed from panel in 2 June 2026 programme.'},
     {kind:'info',text:'New panellist added: Mr Haresh Aswani, Managing Director for Africa, Tolaram Group.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Keynote address(es) + panel discussion',config:'Panel table for 7. Keynote at podium, then joins panel. Deputy Governor chairs from panel.',objective:'Explore how infrastructure, energy systems and industrial ecosystems are shaping the next generation of globally competitive African cities. Anchor on Lekki–Epe Airport, metro rail, Fourth Mainland Bridge.'},
   avCues:[
     {type:'av',label:'Opening Slide',text:'"PLENARY 4: BUILDING THE CITIES OF THE FUTURE"'},
     {type:'av',label:'Audio',text:'4 panel mics + moderator mic + podium mic for Opening Remarks.'},
     {type:'stage',label:'Setup',text:'Panel table for 4. Name placards. Deputy Governor delivers Opening Remarks at podium then joins panel.'},
     {type:'av',label:'Lower Thirds',text:'Pre-load all panellist lower thirds. Haresh Aswani: Managing Director for Africa, Tolaram Group.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 4',sub:'Building the Cities of the Future'},
     {slot:'Opening Remarks Lower Third',type:'lt',name:'Dr. Kadri Obafemi Hamzat',role:'Opening Remarks · Deputy Governor',org:'Lagos State'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mrs. Rolake Akinkugbe-Filani',role:'Moderator',org:'EnergyInc Advisors'},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Dr. Segun Ogunsanya — Chairman, NSIA\n· Prof. Akin Abayomi — Commissioner for Health, Lagos State\n· Mr. Haresh Aswani — Managing Director for Africa, Tolaram Group\n· Mr. Tom Cartledge — CEO, Benoy'}
   ],
   mcScript:'We now move to Plenary Four — Building the Cities of the Future. This session is moderated by Mrs. Rolake Akinkugbe-Filani. We open with Opening Remarks from the Deputy Governor of Lagos State — Dr. Kadri Obafemi Hamzat.',
   mcDirection:'Keep intro crisp. Deputy Governor delivers Opening Remarks at podium then joins panel table.',
   moderatorNotes:'Session objective: explore infrastructure, energy and industrial ecosystems shaping globally competitive African cities. Key for investors: financing mechanisms, returns profile, execution capacity.',
   moderatorQuestions:['Which single infrastructure project in Lagos offers the clearest commercial return for private investors in the next decade?','What is the role of international firms in building Lagos\'s infrastructure capacity — beyond the contract?','Energy: what is the honest timeline for reliable power in Lagos, and what does it cost to solve it?','How does Lagos compare to other intentional city-building projects globally in terms of investability?']},

  {id:19,day:2,order:19,startTime:'10:30',duration:30,title:'Networking Break',type:'break',
   speakers:[''],moderator:'',flags:[],
   overview:{venue:'Lobby / Exhibition Pavilion',format:'Open networking break',config:'No stage activity. Screens on loop. Deal Room open.',objective:'Delegates network and visit the Deal Room between Plenary 4 and 5.'},
   avCues:[
     {type:'av',label:'Screens',text:'All screens: "NETWORKING BREAK — Plenary 5 begins at 11:00".'},
     {type:'av',label:'Music',text:'Ambient playlist resumes.'},
     {type:'stage',label:'Reset',text:'Stage team resets for Plenary 5 — Samantha Cohen fireside chat setup: 2 chairs centre stage.'}
   ],
   screenContent:[
     {slot:'Break Slide',type:'title',title:'NETWORKING BREAK',sub:'Plenary 5 — Global Partnerships for Growth begins at 11:00 · Deal Room is open'}
   ],
   mcScript:'Ladies and gentlemen, we will now take a short networking break. Please reconvene at 11:00 for Plenary Five — Global Partnerships for Growth.',
   mcDirection:'Short and clear. Point delegates towards the Deal Room and lobby.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:20,day:2,order:20,startTime:'11:00',duration:60,title:'Plenary 5 — Global Partnerships for Growth',type:'panel',
   speakers:['His Excellency Wamkele Mene — Secretary-General, AfCFTA Secretariat (Fireside Chat)','Madam Elsie Attafuah — Resident Representative, UNDP','Massimo de Luca — Head of Cooperation, European Union Delegation to Nigeria and ECOWAS','Donna McGowan — Country Director, British Council Nigeria','Jacky Amprou — Country Director, Agence Française de Développement (AFD), Nigeria'],
   moderator:'Mr. Zaki Cooper',
   flags:[
     {kind:'ok',text:'Full panel confirmed in 2 June 2026 programme: Attafuah/UNDP, de Luca/EU, McGowan/British Council, Amprou/AFD.'},
     {kind:'info',text:'Session structure: Samantha Cohen CVO OBE (CEO CWEIC) chairs fireside. Wamkele Mene delivers fireside chat. Zaki Cooper moderates panel.'},
     {kind:'warn',text:'Wamkele Mene: confirm in-person or video link for this session.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Fireside Chat (Wamkele Mene) + panel discussion',config:'Chair: Samantha Cohen. Fireside: 2 seats for Samantha + Wamkele Mene. Swap to panel for main discussion.',objective:"Examine how international cooperation and cross-border investment can accelerate Africa's economic transformation. Situate Lagos within the broader AfCFTA architecture and the global diplomatic investment landscape."},
   avCues:[
     {type:'av',label:'Fireside Setup',text:'2 chairs, centre stage. 2 lavs or directional mics. Chair: Samantha Cohen. Fireside guest: Wamkele Mene.'},
     {type:'av',label:'Wamkele Mene',text:'⚠️ Confirm: in-person or video link? If video — test at 10:30 during networking break.'},
     {type:'av',label:'Panel Swap',text:'After fireside, stage team swaps to panel table. Practice this transition at rehearsal. Moderator: Zaki Cooper takes over from Samantha Cohen for panel portion.'},
     {type:'stage',label:'Diplomatic Protocol',text:'Ambassador/HC seating order: confirm with CWEIC and protocol team. Diplomatic rank determines order.'},
     {type:'warn',label:'Thin Panel',text:'Only HE Jonny Baxter confirmed in panel. Confirm full panel list with client — programme likely incomplete at this point.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 5',sub:'Global Partnerships for Growth'},
     {slot:'Chair Lower Third',type:'lt',name:'Samantha Cohen CVO OBE',role:'Chair · CEO',org:'Commonwealth Enterprise and Investment Council (CWEIC)'},
     {slot:'Fireside Lower Third',type:'lt',name:'His Excellency Wamkele Mene',role:'Secretary-General',org:'African Continental Free Trade Area (AfCFTA)'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mr. Zaki Cooper',role:'Moderator',org:''},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Madam Elsie Attafuah — Resident Representative, UNDP\n· Massimo de Luca — Head of Cooperation, EU Delegation to Nigeria and ECOWAS\n· Donna McGowan — Country Director, British Council Nigeria\n· Jacky Amprou — Country Director, AFD Nigeria'}
   ],
   mcScript:'We now move to Plenary Five — Global Partnerships for Growth. This session is chaired by Samantha Cohen, CEO of CWEIC. We open with a Fireside Chat with the Secretary-General of the African Continental Free Trade Area — Mr. Wamkele Mene.',
   mcDirection:'After announcing the fireside, exit stage completely. Samantha Cohen runs the fireside. Zaki Cooper takes over as moderator for the panel portion.',
   moderatorNotes:"Session objective: examine how international cooperation accelerates Africa's transformation. Fireside opener: ~20 minutes. Panel: ~30 minutes. Q&A: 10 minutes.",
   moderatorQuestions:["Mr. Mene — where is Lagos in the AfCFTA implementation roadmap, and what would it take to make it a primary AfCFTA hub?","What is the most concrete bilateral investment outcome your mission has committed to with Lagos?","How does the AfCFTA architecture change the calculus for international investors looking at Lagos versus other African markets?","What role can development institutions play in de-risking private sector entry into Lagos infrastructure?"]},

  {id:25,day:2,order:21,startTime:'12:00',duration:60,title:'Networking Break',type:'break',
   speakers:[''],moderator:'',flags:[],
   overview:{venue:'Lobby / Exhibition Pavilion',format:'Open networking break',config:'No stage activity. Screens on loop. Deal Room open.',objective:'Midday networking opportunity between Plenary 5 and Plenary 6.'},
   avCues:[
     {type:'av',label:'Screens',text:'All screens: "NETWORKING BREAK — Plenary 6 begins at 13:00 · Deal Room is open."'},
     {type:'av',label:'Music',text:'Ambient playlist.'},
     {type:'stage',label:'Reset',text:'Stage team resets for Plenary 6 panel.'}
   ],
   screenContent:[
     {slot:'Break Slide',type:'title',title:'NETWORKING BREAK',sub:'Plenary 6 — Talent, Creativity & Culture begins at 13:00 · Deal Room is open'}
   ],
   mcScript:'Ladies and gentlemen, we break now for networking. Please reconvene at 13:00 for Plenary Six — Talent, Creativity and Culture.',
   mcDirection:'Short delivery. Deal Room and lobby open.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:21,day:2,order:22,startTime:'13:00',duration:60,title:'Plenary 6 — Talent, Creativity & Culture',type:'panel',
   speakers:['Her Excellency Hannatu Musa Musawa — Minister of Art, Culture, Tourism & Creative Economy (Opening Remarks)','Mrs. Toke Benson-Awoyinka — Honourable Commissioner for Tourism Arts and Culture','Mrs. Bolanle Austen-Peters — Chief Executive Officer, Terra Kulture','Mrs. Chioma Ude — Founder, Africa International Film Festival (AFRIFF)','Mrs. Keke Hammond — Co-Founder/COO, Flytime Africa'],
   moderator:'Ms. Zain Asher, CNN',
   flags:[
     {kind:'ok',text:'Moderator updated: Ms. Zain Asher, CNN (changed from Rolake in 2 June 2026 programme).'},
     {kind:'info',text:'Omoyemi Akerele moved from Plenary 6 panel to Masterclasses. Keke Hammond confirmed in Plenary 6.'},
     {kind:'ok',text:'Opening Remarks confirmed: HE Hannatu Musa Musawa, Minister of Art, Culture, Tourism & Creative Economy.'}
   ],
   overview:{venue:'Main Plenary Hall',format:'Keynote address + panel discussion',config:'Panel table: 5 panellists + moderator. Keynote at podium.',objective:"Explore how talent, creativity and cultural industries are shaping Africa's economic future. Position Nigeria's creative economy as a structured investment proposition — music, film, fashion, digital content."},
   avCues:[
     {type:'av',label:'Opening Slide',text:'"PLENARY 6: TALENT, CREATIVITY AND CULTURE"'},
     {type:'av',label:'Keynote',text:'HE Hannatu Musa Musawa keynote at podium. Official portrait/title slide. Lower third: Minister of Art, Culture, Tourism & Creative Economy.'},
     {type:'av',label:'Audio',text:'5 panel mics + moderator mic + podium mic for keynote.'},
     {type:'stage',label:'Stage',text:'Panel table for 6. Keynote at podium first. Full panel seated before keynote begins.'},
     {type:'av',label:'Zain Asher',text:'Zain Asher moderates Plenary 6. Brief her alongside Masterclasses (14:00–14:45) which she also moderates.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 6',sub:'Talent, Creativity & Culture'},
     {slot:'Keynote Lower Third',type:'lt',name:'Her Excellency Hannatu Musa Musawa',role:'Keynote Address · Minister of Art, Culture, Tourism & Creative Economy',org:'Federal Republic of Nigeria'},
     {slot:'Moderator Lower Third',type:'lt',name:'Ms. Zain Asher',role:'Moderator',org:'CNN'},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Mrs. Toke Benson-Awoyinka — Commissioner for Tourism Arts & Culture, Lagos State\n· Mrs. Bolanle Austen-Peters — CEO, Terra Kulture\n· Mrs. Chioma Ude — Founder, Africa International Film Festival (AFRIFF)\n· Mrs. Keke Hammond — Co-Founder/COO, Flytime Africa'}
   ],
   mcScript:"We now move to Plenary Six — Talent, Creativity and Culture. This session is moderated by Zain Asher of CNN. We begin with Opening Remarks from the Minister of Art, Culture, Tourism and Creative Economy — Her Excellency Hannatu Musa Musawa.",
   mcDirection:'Ministerial protocol applies for Opening Remarks entry. Panel is fully seated before MC begins.',
   moderatorNotes:"Session objective: present Nigeria's creative economy as a structured investment proposition. Keep discussion grounded in investment potential, IP frameworks, diaspora engagement, and workforce development.",
   moderatorQuestions:["What is the annual GDP contribution of Nigeria's creative economy, and what would it take to double it in 5 years?","How do we move from 'Nigeria is creative' to 'Nigeria is investable' in the creative sector?","What role does IP protection play in attracting serious capital to the music and film industries?","What does Lagos Fashion Week or AFRIFF need to become globally competitive institutions?"]},

  {id:26,day:2,order:23,startTime:'14:00',duration:45,title:'Plenary 7 — Energy and Sustainability',type:'panel',
   speakers:['Mr. Abiodun Ogunleye — Honourable Commissioner for Energy, Lagos State','Barrister Ismaeel Ahmed — Chairman, Presidential Initiative on CNG/EV','Mr. Alex Milne — Director of Partnerships and Policy, Africa Speciality Risks','Mr. Kola Adesina — Group Managing Director, Sahara Group'],
   moderator:'Mrs. Rolake Akinkugbe-Filani',
   flags:[
     {kind:'ok',text:'Full panel confirmed in 2 June 2026 programme: Ismaeel Ahmed/CNG-EV, Alex Milne/Africa Speciality Risks, Kola Adesina/Sahara Group.'},
     {kind:'warn',text:'PARALLEL SESSION — runs at same time as Masterclasses (14:00–14:45). Separate room and dedicated AV/Stage teams required for both.'},
     {kind:'info',text:'Rolake Akinkugbe-Filani moderates Plenary 7 (directly after Plenary 4 on Day 2). Brief her on the session.'}
   ],
   overview:{venue:'TBC — confirm room (Main Hall or dedicated breakout)',format:'Panel discussion',config:'Panel table for 2 panellists + moderator. Confirm room assignment — may run in parallel with Masterclasses in separate space.',objective:'Explore opportunities from deregulation of the electricity sector and implications for Lagos State. Discuss renewable energy, clean energy, power generation, distribution and transmission. Path to uninterrupted power supply for households and businesses in Lagos.'},
   avCues:[
     {type:'av',label:'Room',text:'⚠️ Confirm: is Plenary 7 in the main hall or a separate room? Dedicated AV team if not main hall.'},
     {type:'av',label:'Opening Slide',text:'"PLENARY 7: ENERGY AND SUSTAINABILITY"'},
     {type:'av',label:'Audio',text:'2 panel mics + moderator mic.'},
     {type:'stage',label:'Parallel',text:'Masterclasses run simultaneously 14:00–14:45 in a separate space. Both sessions need independent Stage and AV teams. Confirm logistical split with client.'},
     {type:'warn',label:'Panel Thin',text:'Only 2 panellists confirmed. Likely incomplete — request full list from client.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 7',sub:'Energy and Sustainability'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mrs. Rolake Akinkugbe-Filani',role:'Moderator',org:'EnergyInc Advisors'},
     {slot:'Panel Lower Thirds',type:'note',text:'Rotate per speaker:\n· Mr. Abiodun Ogunleye — Commissioner for Energy, Lagos State\n· Barrister Ismaeel Ahmed — Chairman, Presidential Initiative on CNG/EV\n· Mr. Alex Milne — Director of Partnerships and Policy, Africa Speciality Risks\n· Mr. Kola Adesina — Group Managing Director, Sahara Group'}
   ],
   mcScript:'[Delivered at entrance to Plenary 7 room] We now begin Plenary Seven — Energy and Sustainability. This session is moderated by Mrs. Rolake Akinkugbe-Filani.',
   mcDirection:'Confirm whether this is a split session requiring a separate MC for Plenary 7 vs. Masterclasses. Coordinate with Stage Manager on room flow.',
   moderatorNotes:'Session objective: explore deregulation opportunities in the electricity sector and the path to reliable power in Lagos. Keep grounded in policy implications and private sector investment opportunities.',
   moderatorQuestions:['What does electricity sector deregulation mean practically for a manufacturing investor entering Lagos today?','What is the realistic timeline for the Lagos power distribution network to be reliable enough for industrial-scale users?','How should Lagos structure incentives to attract clean energy investment at scale?','What role can the CANEX model play in financing energy infrastructure across West Africa?']},

  {id:27,day:2,order:24,startTime:'14:00',duration:45,title:'Masterclasses — Music, Film and Fashion',type:'panel',
   speakers:['Tiwa Savage — Musician / Founder, Tiwa Savage Music Foundation','Mr. David Oyelowo OBE — Hollywood Actor / Director','Mrs. Omoyemi Akerele — Founder / Chief Executive Officer, Lagos Fashion Week'],
   moderator:'Zain Asher — CNN',
   flags:[
     {kind:'warn',text:'PARALLEL SESSION — runs at same time as Plenary 7 (14:00–14:45). Separate room and dedicated AV/Stage team required.'},
     {kind:'ok',text:'Full speaker list confirmed in 2 June 2026 programme: Tiwa Savage, David Oyelowo OBE, Omoyemi Akerele.'},
     {kind:'warn',text:'Format — intimate masterclass. Confirm room setup (theatre, roundtable, or studio) with client.'}
   ],
   overview:{venue:'TBC — separate room from Plenary 7',format:'Masterclasses — Music, Film and Fashion',config:'Intimate setup. Zain Asher moderates. Three masterclass speakers confirmed.',objective:'Deeper-dive session on the creative economy: music (Tiwa Savage), film (David Oyelowo OBE), fashion (Omoyemi Akerele/Lagos Fashion Week). High-engagement format for a smaller invited audience.'},
   avCues:[
     {type:'av',label:'Room',text:'Separate room from Plenary 7. Dedicated AV and Stage team assigned.'},
     {type:'av',label:'Screens',text:'"MASTERCLASSES — Music, Film and Fashion"'},
     {type:'stage',label:'Zain Asher',text:'Zain Asher moderates Masterclasses AND Plenary 6 (immediately before). Brief her on both sessions together. High-profile talent — confirm green room, security, and access requirements for Tiwa Savage and David Oyelowo.'},
     {type:'warn',label:'Talent',text:'Tiwa Savage and David Oyelowo OBE are international celebrities — confirm riders, green room, photography/social media policy.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'MASTERCLASSES',sub:'Music, Film and Fashion'},
     {slot:'Moderator Lower Third',type:'lt',name:'Zain Asher',role:'Moderator',org:'CNN'},
     {slot:'Speaker 1 Lower Third',type:'lt',name:'Tiwa Savage',role:'Musician / Founder',org:'Tiwa Savage Music Foundation'},
     {slot:'Speaker 2 Lower Third',type:'lt',name:'Mr. David Oyelowo OBE',role:'Actor / Director',org:'Hollywood'},
     {slot:'Speaker 3 Lower Third',type:'lt',name:'Mrs. Omoyemi Akerele',role:'Founder / CEO',org:'Lagos Fashion Week'}
   ],
   mcScript:'[Delivered at Masterclasses room entrance] Welcome to the Masterclasses — Music, Film and Fashion. This intimate session is moderated by Zain Asher of CNN. Our speakers today are Tiwa Savage, Mr David Oyelowo OBE, and Mrs Omoyemi Akerele.',
   mcDirection:'Intimate, conversational tone — different from the main hall plenaries. Brief Zain Asher on the format. Confirm security and access arrangements for Tiwa Savage and David Oyelowo.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:28,day:2,order:25,startTime:'14:45',duration:15,title:'Showcase — Lagos Fashion Show',type:'performance',
   speakers:['Lagos Fashion Show'],moderator:'',
   flags:[
     {kind:'warn',text:'Closing performance — technical requirements TBC. Request stage plot, sound requirements, and number of models/crew from Lagos Fashion Week team.'},
     {kind:'info',text:'New session — not in previous programme. Added in 20 May 2026 update.'}
   ],
   overview:{venue:'Main Hall or dedicated showcase space — TBC',format:'Closing Performance / Fashion Show',config:'Stage for fashion show. Runway if applicable. Full lighting and audio for performance.',objective:'Cultural closing moment before the Closing Session. Celebrate Lagos as a creative capital.'},
   avCues:[
     {type:'av',label:'Music',text:'Lagos Fashion Show provides or approves soundtrack. Confirm DJ/playback format and audio file delivery 48h before.'},
     {type:'av',label:'Lighting',text:'Runway/performance lighting required. Coordinate with LFW team on lighting brief.'},
     {type:'av',label:'Screens',text:'"SHOWCASE — Lagos Fashion Show". Event branding. Transition slides during performance.'},
     {type:'stage',label:'Setup',text:'Confirm stage and runway dimensions required. Clear all chairs from runway path if applicable. Models staging area confirmed.'},
     {type:'warn',label:'Tech Requirements',text:'Request full tech rider from Lagos Fashion Week: sound, lighting, runway, backstage space, number of looks/models, run time.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'SHOWCASE',sub:'Lagos Fashion Show · Closing Performance'},
     {slot:'Note',type:'note',text:'Coordinate with Lagos Fashion Week design team on on-screen branding to complement the show aesthetic.'}
   ],
   mcScript:'Ladies and gentlemen — a special moment to close our afternoon sessions. Please welcome the Lagos Fashion Show.',
   mcDirection:'Short, punchy intro. Let the show speak for itself. Confirm whether MC stays on stage or steps aside entirely.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:22,day:2,order:26,startTime:'15:00',duration:15,title:'Closing Session',type:'speech',
   speakers:['Lagos State Government & Partners — MoU Signing','Governor Babajide Sanwo-Olu — Closing Vision Statement','Mr. Babatunde Onigbanjo — Permanent Secretary, MCCTI (Vote of Thanks)'],moderator:'',
   flags:[
     {kind:'warn',text:'MoU signatories: number and signing order TBC — determines table size and signing sequence'},
     {kind:'ok',text:'Vote of Thanks confirmed: Mr. Babatunde Onigbanjo, Permanent Secretary, MCCTI'},
     {kind:'info',text:'Session compressed: was 30 min (14:00) in previous programme. Now 15 minutes (15:00–15:15). Strict timing required.'}
   ],
   overview:{venue:'Main Plenary Hall — Podium + Signing Table',format:"MoU signing → Governor's Closing Vision Statement → Vote of Thanks",config:'Signing table on stage with backdrop. Press photographers in position. Governor at podium.',objective:"Formally close the Forum's plenary programme; execute MoU signings; deliver Governor's closing vision; Vote of Thanks."},
   avCues:[
     {type:'av',label:'Closing Slide',text:'"CLOSING SESSION — INVEST LAGOS 3.0". Full event branding.'},
     {type:'av',label:'MoU Signing',text:'MoU signing backdrop displayed prominently. Press photo position: 3m from signing table, frontal. Capture all signatories.'},
     {type:'av',label:'Timing',text:'15 MINUTES TOTAL. Strict. MoU signing: ~5 min. Governor: 5–7 min. Vote of Thanks: 2 min. MC must manage firmly.'},
     {type:'stage',label:'Signing Table',text:'⚠️ Confirm: number of signatories → determines table size. Signing order. Who presents documents? Documents pre-positioned face-down before session.'},
     {type:'warn',label:'Open Items',text:'1. How many MoU signatories?\n2. Confirm signing order and who presents documents\n3. Optional closing video reel — yes or no? If yes, deliver 48h before.'}
   ],
   screenContent:[
     {slot:'Session Opening Slide',type:'title',title:'CLOSING SESSION',sub:'Invest Lagos 3.0 · 9 June 2026'},
     {slot:'MoU Signing Slide',type:'title',title:'MEMORANDA OF UNDERSTANDING',sub:'Signing Ceremony · Lagos State Government & Partners'},
     {slot:'Governor Closing Lower Third',type:'lt',name:'Mr. Babajide Olusola Sanwo-Olu',role:'Closing Vision Statement · Executive Governor',org:'Lagos State'},
     {slot:'Vote of Thanks Lower Third',type:'lt',name:'Mr. Babatunde Onigbanjo',role:'Vote of Thanks · Permanent Secretary, MCCTI',org:'Lagos State Government'},
     {slot:'Final Slide',type:'title',title:'THANK YOU',sub:'Invest Lagos 3.0 · 8–9 June 2026 · Eko Hotel & Suites, Lagos'}
   ],
   mcScript:'Distinguished guests, we now move to our Closing Session. We begin with the Memoranda of Understanding Signing Ceremony, followed by Closing Remarks from the Executive Governor of Lagos State, and a Vote of Thanks.',
   mcDirection:"Pace deliberately. 15 minutes total — no overruns. Vote of Thanks speaker positioned before MC hands over. Close warmly and clearly announce Day 3 site visits.",
   moderatorNotes:'',moderatorQuestions:[]},

  // ═══════════════════════════════════════════════════
  // DAY THREE — WEDNESDAY 10 JUNE 2026
  // Full Day — Off-site
  // ═══════════════════════════════════════════════════

  {id:29,day:3,order:27,startTime:'08:00',duration:480,title:'Full Day — Site Visits',type:'other',
   speakers:['Arridex — Advanced Manufacturing and Asset Integrity, Victoria Island, Lagos (Half Day)','Dangote Petroleum Refinery, Ibeju Lekki, Lagos (Full Day)','Lekki Free Zones, Lagos Port, Ibeju Lekki, Lagos (Full Day)'],moderator:'',
   flags:[
     {kind:'info',text:'Day 3 now has 3 locations: Arridex (Half Day, Victoria Island) + Dangote Refinery + Lekki Free Zones (both Full Day, Ibeju Lekki). Two separate groups may be required.'},
     {kind:'warn',text:'Security clearance required for Dangote Petroleum Refinery — initiate process with refinery management early.'},
     {kind:'warn',text:'Transport: buses from Eko Hotel — confirm bus count, departure times (split for VI and Lekki), and return times.'},
     {kind:'warn',text:'Arridex half-day visit: confirm point of contact, tour route, max group size, and security requirements at Victoria Island site.'}
   ],
   overview:{venue:'Off-site: Three locations across Lagos',format:'Full Day Site Visits — Arridex (Half Day, Victoria Island) + Dangote Refinery + Lekki Free Zones (Ibeju Lekki)',config:'Buses from Eko Hotel. Two separate routing groups: Victoria Island (Arridex) and Ibeju Lekki (Dangote + LFTZ). Confirm routing and travel time.',objective:"Give delegates direct access to Lagos's flagship industrial and economic zones. Three locations spanning advanced manufacturing, petroleum refining, and free trade zones."},
   avCues:[
     {type:'av',label:'N/A',text:'No formal AV required. Prepare branded name lanyards and a delegate briefing note for the buses.'},
     {type:'stage',label:'Logistics',text:'Three sites require careful logistics split. Arridex (VI) — half day. Dangote Refinery + LFTZ (Ibeju Lekki) — full day. Confirm if delegates split into two groups or visit all three in sequence.'},
     {type:'warn',label:'Security',text:'Dangote Petroleum Refinery: initiate security clearance for all delegates. Passport/ID data collection required in advance.'},
     {type:'warn',label:'Arridex',text:'Confirm Arridex Victoria Island point of contact, max group size, photography policy, and security requirements.'},
     {type:'warn',label:'LFTZ',text:'Confirm Lekki Free Zone point of contact, tour route, and maximum group size.'}
   ],
   screenContent:[
     {slot:'Day 3 Slide',type:'title',title:'DAY THREE — SITE VISITS',sub:'Invest Lagos 3.0 · 10 June 2026'},
     {slot:'Site 1',type:'title',title:'Arridex — Advanced Manufacturing and Asset Integrity',sub:'Half Day Visit · Victoria Island, Lagos'},
     {slot:'Site 2',type:'title',title:'Dangote Petroleum Refinery',sub:'Full Day Visit · Ibeju Lekki, Lagos'},
     {slot:'Site 3',type:'title',title:'Lekki Free Zones, Lagos Port',sub:'Full Day Visit · Ibeju Lekki, Lagos'}
   ],
   mcScript:'TBC — briefing to be delivered on the bus. Prepare a short delegate briefing note: schedule, rules of each site, safety requirements, photography policy.',
   mcDirection:'Day 3 likely has a separate logistics lead. Confirm whether the MC role extends to Day 3 or if a dedicated tour guide/host takes over.',
   moderatorNotes:'',moderatorQuestions:[]},
]
