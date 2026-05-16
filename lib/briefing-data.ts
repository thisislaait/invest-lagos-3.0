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

export const SESSIONS: BriefingSession[] = [
  {id:1,day:1,order:1,startTime:'09:30',duration:10,title:'Cultural Performance',type:'performance',
   speakers:['TBC — Cultural Performer'],moderator:'',
   flags:[{kind:'warn',text:'Performer TBC'}],
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
   speakers:['Mrs Folashade Kaosarat Bada Ambrose — Honourable Commissioner, MCCTI, Lagos State'],moderator:'',
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
     {slot:'Lower Third',type:'lt',name:'Mrs Folashade Kaosarat Bada Ambrose',role:'Honourable Commissioner for Commerce, Cooperatives, Trade and Investment',org:'Lagos State Government'},
     {slot:'Background Slide',type:'logo',text:'Lagos State Coat of Arms — full-bleed on screen behind podium'}
   ],
   mcScript:'Please welcome to the stage the Honourable Commissioner for Commerce, Cooperatives, Trade and Investment of Lagos State — Mrs Folashade Kaosarat Bada Ambrose.',
   mcDirection:'Commissioner should be positioned at stage entrance before MC intro begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:3,day:1,order:3,startTime:'09:45',duration:5,title:'Opening Remarks',type:'speech',
   speakers:['Lord Marland — Chair, Commonwealth Enterprise and Investment Council (CWEIC)'],moderator:'',
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
   speakers:['The Hon Shirley Botchwey — Secretary-General, The Commonwealth'],moderator:'',
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
     {slot:'Lower Third',type:'lt',name:'The Hon Shirley Botchwey',role:'Secretary-General',org:'The Commonwealth'},
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

  {id:7,day:1,order:7,startTime:'10:20',duration:10,title:'Messages of Goodwill — Forum Co-Chairs',type:'speech',
   speakers:['Abdul Samad Rabiu, CFR, CON — Chairman, BUA Group','Alhaji Aliko Dangote, GCON — Chairman, Dangote Group'],moderator:'',
   flags:[{kind:'info',text:'Confirm speaking order with protocol team before event day'}],
   overview:{venue:'Main Plenary Hall — Podium or Panel Table',format:'Two sequential addresses',config:'Podium (confirm if both at podium or seated table). Two mics.',objective:'Forum Co-Chairs set the private-sector tone and signal business confidence in the Forum.'},
   avCues:[
     {type:'av',label:'Slides',text:'Speaker 1: BUA Group logo + [Name TBC]. Speaker 2: Dangote Group logo + Alhaji Aliko Dangote.'},
     {type:'av',label:'Audio',text:'Podium mic per speaker. Clean transition between the two.'},
     {type:'stage',label:'Format',text:'Confirm: are both Co-Chairs at podium sequentially, or seated at a table?'},
     {type:'av',label:'Note',text:'Abdul Samad Rabiu (BUA) confirmed. Confirm speaking order: Rabiu first, Dangote second. Brief both on 4-minute time limit.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'MESSAGES OF GOODWILL',sub:'Forum Co-Chairs'},
     {slot:'Speaker 1 Lower Third',type:'lt',name:'Abdul Samad Rabiu, CFR, CON',role:'Chairman',org:'BUA Group'},
     {slot:'Speaker 2 Lower Third',type:'lt',name:'Alhaji Aliko Dangote',role:'Chairman',org:'Dangote Group'},
     {slot:'Design Note',type:'note',text:'Consider: Dangote Group logo + BUA Group logo as side-by-side holding slide before session begins.'}
   ],
   mcScript:'We will now hear Messages of Goodwill from our distinguished Forum Co-Chairs. First, we welcome the Chairman of BUA Group — Abdul Samad Rabiu. Followed by the Chairman of Dangote Group — Alhaji Aliko Dangote.',
   mcDirection:'Confirm speaking order before script is finalised. Brief both speakers on 4-minute time limit each.',
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
     {type:'warn',label:'Protocol',text:'All attendees standing on Presidential entry. MC gives instruction to rise. Confirm exit protocol — does the President remain for remainder of morning or depart?'}
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

  {id:9,day:1,order:9,startTime:'11:30',duration:60,title:'Official Opening of Pavilions & Exhibition',type:'other',
   speakers:['President of Nigeria · Governor Sanwo-Olu · Selected VIP Guests'],moderator:'',
   flags:[{kind:'warn',text:'Tour route & guide TBC'}],
   overview:{venue:'Exhibition Pavilion & Lobby',format:'Guided VIP tour with ribbon-cutting',config:'No stage. Roaming mics. Photography team in position. Refreshments served.',objective:'Officially open the exhibition floor; give VIP guests first access before delegates.'},
   avCues:[
     {type:'av',label:'Music',text:'Ambient background music through PA system in lobby and pavilion. Upbeat, non-intrusive.'},
     {type:'av',label:'Screens',text:'"OFFICIAL OPENING OF PAVILIONS & EXHIBITION — Lagos State Investment Forum 2026". Loop event branding.'},
     {type:'av',label:'Roaming Mic',text:'One roaming mic for tour guide. Fresh battery. Brief the guide on mic handling.'},
     {type:'stage',label:'Logistics',text:'Tour route confirmed and walked by Stage Manager before session. Security sweep of pavilion. Photo team in 3 positions: ribbon-cutting, pavilion entrance, VIP walkthrough.'},
     {type:'warn',label:'Open Item',text:'Who is the official tour guide? Is there a ribbon-cutting? How many VIPs on the guided tour? Is the tour invitation-only?'}
   ],
   screenContent:[
     {slot:'Lobby Screens',type:'title',title:'OFFICIAL OPENING OF PAVILIONS & EXHIBITION',sub:'Lagos State Investment Forum 2026 · 8 June 2026'},
     {slot:'Pavilion Screens',type:'title',title:'WELCOME TO THE EXHIBITION',sub:'Delegates are warmly invited to explore the pavilion · Refreshments are served'},
     {slot:'Note',type:'note',text:'No speaker lower thirds required. Focus on wayfinding and branding across all lobby and pavilion screens.'}
   ],
   mcScript:'Distinguished guests, the President and Governor will now officially open the Pavilion and Exhibition. Delegates are warmly invited to observe the guided tour. Tea, coffee and refreshments are being served in the lobby. We reconvene in the Plenary Hall at 12:30.',
   mcDirection:'Deliver before VIP party departs for pavilion. Speak clearly — some guests may already be moving.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:10,day:1,order:10,startTime:'12:30',duration:60,title:"Governors' Investment Showcase Panel",type:'panel',
   speakers:['Dr. Alex Otti, OFR — Governor, Abia State','Peter Ndubuisi Mbah — Governor, Enugu State','Senator Hope Uzodimma — Governor, Imo State','Alhaji Abba Kabir Yusuf — Governor, Kano State','Mr. Babajide Olusola Sanwo-Olu — Governor, Lagos State','Prince Dapo Abiodun — Governor, Ogun State','Alhaji AbdulRahman AbdulRazaq — Governor, Kwara State','Pastor Umo Bassey Eno — Governor, Akwa Ibom State'],
   moderator:'Dr. Jumoke Oduwole — Honourable Minister of Trade and Investment',
   flags:[{kind:'info',text:'Confirm seating order by protocol rank before event day'}],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'High-table panel: 8 governors + chair',config:'9 seats. Name placards. 9 mics. Water on table. All Governors in holding room 15 min before.',objective:'Each Governor delivers a focused 5–6 minute investment pitch. Chair manages time strictly.'},
   avCues:[
     {type:'av',label:'Slides',text:"Session title slide: \"GOVERNORS' INVESTMENT SHOWCASE PANEL\". Panel lower third strip with all 8 governor names + states."},
     {type:'av',label:'Individual Lower Thirds',text:'Switch to individual lower third for each governor as they speak. Pre-load all 8 in order.'},
     {type:'av',label:'Audio',text:'9 mics on panel table — all open. Chair mic slightly elevated in mix.'},
     {type:'stage',label:'Setup',text:'9 chairs on stage. Name placards in protocol seating order. All Governors in holding room 15 minutes before session start.'},
     {type:'warn',label:'Protocol',text:'Seating order by protocol rank — confirm with client protocol team before event day.'}
   ],
   screenContent:[
     {slot:'Session Opening Slide',type:'title',title:"GOVERNORS' INVESTMENT SHOWCASE PANEL",sub:'Day 1 · 12:30 · Main Plenary Hall'},
     {slot:'Governor Lower Third — Template',type:'lt',name:'H.E. [Governor Name]',role:'Executive Governor',org:'[State] State, Federal Republic of Nigeria'},
     {slot:'All 8 Lower Thirds — Pre-load list',type:'note',text:'1. Dr. Alex Otti, OFR · Governor, Abia State\n2. Peter Ndubuisi Mbah · Governor, Enugu State\n3. Senator Hope Uzodimma · Governor, Imo State\n4. Alhaji Abba Kabir Yusuf · Governor, Kano State\n5. Mr. Babajide Olusola Sanwo-Olu · Governor, Lagos State\n6. Prince Dapo Abiodun · Governor, Ogun State\n7. Alhaji AbdulRahman AbdulRazaq · Governor, Kwara State\n8. Pastor Umo Bassey Eno · Governor, Akwa Ibom State'},
     {slot:'Chair Lower Third',type:'lt',name:'Dr. Jumoke Oduwole',role:'Honourable Minister of Trade and Investment',org:'Federal Republic of Nigeria'}
   ],
   mcScript:"Ladies and gentlemen, we now move to the Governors' Investment Showcase Panel. This high-visibility session brings together Governors from eight Nigerian states to present targeted investment opportunities to our distinguished audience. Chairing this session is the Honourable Minister of Trade and Investment — Dr. Jumoke Oduwole.",
   mcDirection:'Allow governors to walk on before beginning intro. Confirm all are seated. Dr. Oduwole introduced last as she opens the panel.',
   moderatorNotes:"Each Governor delivers a focused 5–6 minute pitch on their state's investment opportunities. Chair manages time strictly — visible signal agreed with Stage Manager. Sequence: Opening remarks by chair → Governor pitches in order → Short Q&A at chair's discretion.",
   moderatorQuestions:['[State Governor]: What is the single most investable sector in your state right now, and what are you offering investors?','[Follow-up]: What specific barrier has your state removed in the last 12 months that was previously blocking investment?','[General]: Which of your states is best positioned to partner with Commonwealth investors on a ready-to-go project?']},

  {id:11,day:1,order:11,startTime:'13:30',duration:60,title:"Plenary 1 — Lagos: Africa's Global Gateway",type:'panel',
   speakers:['Lord Marland — Chair, CWEIC','Dr. Jumoke Oduwole — Minister of Trade and Investment','Sola Obadimu — NACCIMA','Tony O. Elumelu, CFR — Chairman, Heirs Holdings','Haresh Aswani — CEO, Tolaram'],
   moderator:'Mrs. Folashade Kaosarat Bada Ambrose — Commissioner, MCCTI',
   flags:[{kind:'info',text:'Governor delivers keynote to open this session'}],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Keynote opener + panel discussion',config:"Panel table: 5–6 seats. Moderator at end. Governor returns to stage for keynote opener.",objective:"Position Lagos as Africa's primary investment gateway for Commonwealth and international capital."},
   avCues:[
     {type:'av',label:'Opening Slide',text:"\"PLENARY 1: LAGOS — AFRICA'S GLOBAL GATEWAY\". Session branding."},
     {type:'av',label:'Keynote transition',text:"Governor's portrait/seal slide for keynote opener. Transition to panel lower thirds after keynote ends."},
     {type:'av',label:'Audio',text:"5–6 panel mics live. Governor at podium mic for keynote — switch to panel mic when he joins the table."},
     {type:'stage',label:'Setup',text:"Panel seated before Governor's keynote begins. Governor speaks at podium then joins panel. Confirm his seat is reserved."}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 1',sub:"Lagos: Africa's Global Gateway"},
     {slot:'Keynote Opener',type:'lt',name:'Mr. Babajide Olusola Sanwo-Olu',role:'Executive Governor — Opening Keynote',org:'Lagos State'},
     {slot:'Panel Lower Thirds — list',type:'note',text:'Rotate through each panellist as they speak:\n· Lord Marland — Chair, CWEIC\n· Dr. Jumoke Oduwole — Minister of Trade & Investment\n· Sola Obadimu — NACCIMA\n· Tony O. Elumelu, CFR — Chairman, Heirs Holdings\n· Haresh Aswani — CEO, Tolaram'},
     {slot:'Moderator Lower Third',type:'lt',name:'Mrs Folashade Kaosarat Bada Ambrose',role:'Chair · Commissioner, MCCTI',org:'Lagos State Government'}
   ],
   mcScript:"We now move to our first Plenary Discussion — Lagos: Africa's Global Gateway. This session is chaired by the Honourable Commissioner for MCCTI, Mrs. Folashade Kaosarat Bada Ambrose. We begin with an Opening Keynote from His Excellency, Governor Babajide Sanwo-Olu.",
   mcDirection:'Governor returns to stage — alert him 5 minutes before session start. Confirm panel is fully seated before MC begins.',
   moderatorNotes:"Session objective: position Lagos as Africa's primary investment gateway. Chair to manage 60 minutes: ~10 min keynote → 35 min panel → 15 min Q&A.",
   moderatorQuestions:["What makes Lagos uniquely capable of absorbing large-scale capital compared to other African cities?","How does Nigeria's current policy environment affect investor confidence — and what has changed in the past 2 years?","What is the single biggest barrier for Commonwealth investors entering Lagos, and who is responsible for removing it?","Which sector offers the fastest time-to-return for an investor entering Lagos today?"]},

  {id:12,day:1,order:12,startTime:'14:30',duration:60,title:'Networking Lunch',type:'break',
   speakers:[''],moderator:'',
   flags:[{kind:'warn',text:'Sectoral Working Lunch rooms TBC'}],
   overview:{venue:'Lunch Venue — TBC · Sectoral Working Lunches in parallel breakout rooms',format:'Open networking lunch + parallel invitation-only working lunches',config:'No stage activity. Ambient music. Screens on loop.',objective:'Delegates network freely. Invitation-only Working Lunches run in parallel for targeted sector discussions.'},
   avCues:[
     {type:'av',label:'Music',text:'Ambient playlist through PA. Jazz or light contemporary — confirm vibe with client.'},
     {type:'av',label:'Screens',text:'All screens: "NETWORKING LUNCH — Reconvene at 15:30 | Parallel Sessions in Breakout Rooms A & B."'},
     {type:'stage',label:'Reset',text:'Stage team resets main hall during lunch for afternoon parallel sessions. Brief AV teams for Breakout A & B.'},
     {type:'warn',label:'Breakout Rooms',text:'Confirm: which rooms host the Sectoral Working Lunches? Who are the hosts? Client to provide list.'}
   ],
   screenContent:[
     {slot:'Lunch Slide',type:'title',title:'NETWORKING LUNCH',sub:'Please reconvene at 15:30 · Parallel Sessions: Breakout Room A & Breakout Room B'},
     {slot:'Directional Slide (loop)',type:'title',title:'AFTERNOON SESSIONS BEGIN AT 15:30',sub:'Plenary 2 — Technology & Innovation → Breakout Room A\nPlenary 3 — Unlocking Investment → Breakout Room B'},
     {slot:'Note',type:'note',text:'Run directional slide on a 30-second loop to help guests navigate to afternoon breakout sessions.'}
   ],
   mcScript:'Ladies and gentlemen, we now break for Networking Lunch. Invitation-only Sectoral Working Lunches are running in parallel — check your delegate pack for room assignments. Lunch is served in [ROOM TBC]. We reconvene at 15:30 for our parallel afternoon sessions in Breakout Rooms A and B.',
   mcDirection:'Confirm lunch room name before event day to fill [ROOM TBC].',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:13,day:1,order:13,startTime:'15:30',duration:120,title:'Plenary 2 — The Future of Technology & Innovation',type:'panel',
   speakers:['Mr. Olatubosun Alake — Commissioner, Ministry of Innovation, Science and Technology (MIST)','Mr. Mitchell Elegbe — Founder & Group MD/CEO, Interswitch Group','Mr. Tosin Eniolorunda — CEO, Moniepoint MFB','Mr. Iyinoluwa Samuel Aboyeji, OON — Founder, Andela','Mr. Olumide Balogun — Nigeria Country Director, Google','Representative, Starlink','Mr. Kayode Adeleke — President & CEO, RusselSmith Group'],
   moderator:'Dipo Fatokun — Chairman, Flutterwave',
   flags:[{kind:'info',text:'BREAKOUT A — Elon Musk confirmed: Keynote Address / Video Message'}],
   overview:{venue:'Breakout Room A — Separate AV team',format:'Panel + Elon Musk keynote contribution (format TBC)',config:'Breakout Room A. Dedicated AV & Stage team. Panel table: 7 seats + chair.',objective:'Explore AI, digital infrastructure and fintech as drivers of inclusive growth. Scale conditions for the Lagos tech sector.'},
   avCues:[
     {type:'av',label:'Room',text:'BREAKOUT ROOM A — Dedicated AV team assigned. This cue sheet is for Breakout A AV operator.'},
     {type:'av',label:'Opening Slide',text:'"PLENARY 2: THE FUTURE OF TECHNOLOGY & INNOVATION — Breakout Room A"'},
     {type:'av',label:'Elon Musk',text:'CONFIRMED: Keynote Address / Video Message format. Test at full rehearsal. Backup: second copy of file. Confirm delivery format and file specs with client 48h before.'},
     {type:'av',label:'Live Call Tech',text:'If live video call: stable wired internet line (not WiFi). Video platform confirmed. Dedicated technician. Test at 14:30 during lunch break.'},
     {type:'stage',label:'Stage',text:'Breakout A has its own Stage Manager. Confirm mic setup, panel table, seating for 8. Water on table.'},
     {type:'warn',label:'Critical',text:'Test Elon Musk video/call setup at full rehearsal. Confirm final delivery format (pre-recorded vs live) 48h before event. Dedicated technician on standby.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 2',sub:'The Future of Technology & Innovation · Breakout Room A'},
     {slot:'Elon Musk Slide — Live Call',type:'title',title:'SPECIAL KEYNOTE CONTRIBUTION',sub:'Elon Musk · Entrepreneur & Technologist · [Live Address]'},
     {slot:'Elon Musk Lower Third — Live',type:'lt',name:'Elon Musk',role:'Special Keynote Contribution',org:'[Live Video Address]'},
     {slot:'Elon Musk Slide — Pre-recorded',type:'title',title:'KEYNOTE VIDEO',sub:'Elon Musk · Entrepreneur & Technologist'},
     {slot:'Panel Lower Thirds — list',type:'note',text:'Rotate per speaker:\n· Dipo Fatokun — Chairman, Flutterwave\n· Olatubosun Alake — Commissioner, MIST, Lagos State\n· Mitchell Elegbe — Founder & Group MD/CEO, Interswitch Group\n· Tosin Eniolorunda — CEO, Moniepoint MFB\n· Iyinoluwa Samuel Aboyeji, OON — Founder, Andela\n· Olumide Balogun — Nigeria Country Director, Google\n· Representative, Starlink (name TBC)\n· Kayode Adeleke — President & CEO, RusselSmith Group'}
   ],
   mcScript:'Ladies and gentlemen, our afternoon parallel sessions are now beginning. Plenary 2 — The Future of Technology and Innovation — is taking place in Breakout Room A, chaired by Dipo Fatokun, and opens with a Keynote Address from Elon Musk. Please make your way there now.',
   mcDirection:'Delivered in main hall before guests disperse. Breakout A MC handles session from this point.',
   moderatorNotes:"Session objective: explore AI, digital infrastructure and fintech as drivers of inclusive growth in Lagos. Anchor in what investors need to hear — not what tech founders want to say.",
   moderatorQuestions:["What is the single infrastructure investment that would most accelerate Lagos's tech sector in the next 5 years?","Fintech has scaled — what's the next wave, and who is positioned to lead it from Lagos?","How does Nigeria's regulatory environment compare to Kenya and South Africa for international tech investors today?","What does interest in Africa from global tech leaders signal for Lagos — and how should the city position itself?"]},

  {id:14,day:1,order:14,startTime:'15:30',duration:120,title:'Plenary 3 — Unlocking Investment',type:'panel',
   speakers:['Managing Director, IFC West Africa (name TBC)','Mr. Afolabi Olorode \u2014 Ag. MD/CEO, FBNQuest Merchant Bank (now Quest Merchant Bank)','Ms. Patience Oniha \u2014 Director-General, Debt Management Office Nigeria','Adeola Ukoha \u2014 Coverage Manager Nigeria, British International Investment','Mr. Samaila Zubairu \u2014 CEO, Africa Finance Corporation','Representative, Standard Chartered Bank (name TBC)','Mr. Olusegun Alebiosu \u2014 MD/CEO, First Bank of Nigeria','Abubakar Suleiman \u2014 MD/CEO, Sterling Bank'],
   moderator:'Mr. Aig Imoukhouede — Co-Chair, Lagos Finance and Investment Council (LFIC)',
   flags:[{kind:'info',text:'BREAKOUT B — parallel to Plenary 2'}],
   overview:{venue:'Breakout Room B — Separate AV team',format:'Keynote opener + panel discussion',config:'Breakout Room B. Dedicated AV & Stage team. Panel table for 9.',objective:'Examine capital deployment mechanics — blended finance, DFI co-investment. Address barriers to financial close on large infrastructure transactions in Lagos.'},
   avCues:[
     {type:'av',label:'Room',text:'BREAKOUT ROOM B — Dedicated AV team assigned. This cue sheet is for Breakout B AV operator.'},
     {type:'av',label:'Slides',text:'"PLENARY 3: UNLOCKING INVESTMENT — Breakout Room B". Keynote: City of London / CityUK representative.'},
     {type:'av',label:'Audio',text:'8 panel mics + chair mic.'},
     {type:'stage',label:'Stage',text:'Breakout B Stage Manager confirms: panel table for 9. Water on table.'},
     {type:'warn',label:'Keynote',text:'CityUK keynote rep — confirm individual name and title before event day.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 3',sub:'Unlocking Investment · Breakout Room B'},
     {slot:'Keynote Opener Slide',type:'title',title:'OPENING KEYNOTE',sub:'Representative, City of London / CityUK — [Name TBC]'},
     {slot:'Keynote Lower Third',type:'lt',name:'[Name TBC]',role:'Representative',org:'City of London / CityUK'},
     {slot:'Chair Lower Third',type:'lt',name:'Mr. Aig Imoukhouede',role:'Co-Chair',org:'Lagos Finance and Investment Council (LFIC)'},
     {slot:'Panel Lower Thirds — list',type:'note',text:'Rotate per speaker:\n· MD, IFC West Africa (name TBC)\n· Afolabi Olorode — Ag. MD/CEO, FBNQuest Merchant Bank (now Quest Merchant Bank)\n· Patience Oniha — Director-General, Debt Management Office Nigeria\n· Adeola Ukoha — Coverage Manager Nigeria, British International Investment\n· Samaila Zubairu — CEO, Africa Finance Corporation\n· Representative, Standard Chartered (name TBC)\n· Olusegun Alebiosu — MD/CEO, First Bank of Nigeria\n· Abubakar Suleiman — MD/CEO, Sterling Bank'}
   ],
   mcScript:'Plenary 3 — Unlocking Investment — is taking place simultaneously in Breakout Room B. Please make your way there now.',
   mcDirection:'Delivered in main hall alongside Plenary 2 announcement. Breakout B MC handles session from this point.',
   moderatorNotes:'Session objective: unlock the mechanics of capital deployment for Lagos infrastructure projects. Focus on blended finance, DFI co-investment, and barriers to financial close. Keynote from City of London rep sets the international capital market context.',
   moderatorQuestions:['What is the single biggest barrier to financial close on large Lagos infrastructure projects right now?','How should Lagos structure a blended finance vehicle to attract DFI co-investment?','What does the City of London need to see from Lagos before recommending it as an investable market to its member firms?','Which sector has the clearest pathway to bankable projects in Lagos today?']},

  {id:15,day:1,order:15,startTime:'19:00',duration:150,title:'Gala Dinner',type:'performance',
   speakers:['Performance: Berklee College of Music'],moderator:'',
   flags:[{kind:'warn',text:'Berklee rider TBC · Gala running order TBC'}],
   overview:{venue:'Gala Dinner Venue — TBC (Eko Hotel ballroom or garden)',format:'Seated gala dinner + live performance',config:'Full gala AV setup. Round tables. Performance stage. Separate from plenary configuration.',objective:'Celebrate Day 1, create networking opportunities, showcase cultural excellence through the Berklee College of Music.'},
   avCues:[
     {type:'av',label:'Setup',text:'Full gala AV — dedicated sound system for Berklee. NOT the plenary rig. Confirm with venue AV team.'},
     {type:'av',label:'Sound Check',text:'Berklee College of Music: sound check BEFORE 19:00. Book slot 17:00–18:30 during dinner service setup.'},
     {type:'av',label:'Screens',text:'Gala screens: welcome slide + table seating plan + event branding. NOT presentation mode.'},
     {type:'av',label:'Lighting',text:'Warm dinner lighting initially. Shift to performance lighting for Berklee set. Coordinate with lighting designer.'},
     {type:'stage',label:'Stage',text:'Full stage reset from plenary configuration. Confirm Berklee stage plot, backline, power requirements.'},
     {type:'warn',label:'Open Items',text:'1. Berklee rider received?\n2. Sound check slot confirmed with them?\n3. Gala running order — who speaks? In what order?\n4. Seating plan confirmed and printed?\n5. Which space within Eko Hotel?'}
   ],
   screenContent:[
     {slot:'Welcome Slide',type:'title',title:'GALA DINNER',sub:'Lagos State Investment Forum 2026 · 8 June 2026 · Eko Hotel & Suites'},
     {slot:'Performance Announcement',type:'title',title:'LIVE PERFORMANCE',sub:'Berklee College of Music'},
     {slot:'Berklee Lower Third',type:'lt',name:'Berklee College of Music',role:'Live Performance',org:'Boston, Massachusetts · USA'},
     {slot:'Design Note',type:'note',text:'Gala screens should use the full event colour palette — warmer, more celebratory than the daytime conference look. Consider animated or richly branded assets for the gala environment.'}
   ],
   mcScript:'TBC — Gala Dinner programme and running order to be confirmed separately with the client. A dedicated Gala MC script will be prepared once the programme is confirmed.',
   mcDirection:'Gala may have a separate MC. Confirm with client. If same MC — request full Gala running order 5 days before event.',
   moderatorNotes:'',moderatorQuestions:[]},

  // DAY 2
  {id:16,day:2,order:16,startTime:'09:30',duration:30,title:'Opening Recap — Forum Chairman',type:'speech',
   speakers:['Forum Chairman — TBC'],moderator:'',
   flags:[{kind:'warn',text:'Forum Chairman identity TBC · Confirm with client · Programme lists singular'}],
   overview:{venue:'Main Plenary Hall — Podium or Panel',format:'Opening recap — speeches or panel dialogue (TBC)',config:'Podium or 2-seat panel. Confirm with client.',objective:'Re-open Day 2 with reflection on Day 1 outcomes. Set the agenda for Day 2. Energise delegates.'},
   avCues:[
     {type:'av',label:'Slides',text:'Day 2 opening slide: "DAY TWO — 9 JUNE 2026". Forum logo. Forum Chairs\' names + titles once confirmed.'},
     {type:'av',label:'Audio',text:'Podium or panel mics depending on confirmed format.'},
     {type:'stage',label:'Stage',text:'Confirm Forum Chairs are in the building by 09:00. Green room access confirmed.'},
     {type:'warn',label:'Open Item',text:'Forum Chair names not confirmed. Confirm with client: who are the Forum Chairs, and is this a speech or conversation format?'}
   ],
   screenContent:[
     {slot:'Day 2 Opening Slide',type:'title',title:'DAY TWO — LAGOS STATE INVESTMENT FORUM',sub:'9 June 2026 · Eko Hotel & Suites · Welcome back'},
     {slot:'Session Slide',type:'title',title:'OPENING RECAP',sub:'Forum Chairs'},
     {slot:'Chair Lower Third — Template',type:'lt',name:'[Forum Chair Name — TBC]',role:'Forum Chair',org:'Lagos State Investment Forum 2026'},
     {slot:'Optional',type:'note',text:'Prepare a "Day 1 Highlights" recap slide deck (5–6 slides, key quotes/moments) as optional backdrop during opening remarks. Confirm with client.'}
   ],
   mcScript:"Good morning and welcome to Day Two of Invest Lagos 3.0. Yesterday was remarkable — and today we go further. I'm delighted to welcome our Forum Chairman to open today's proceedings.",
   mcDirection:'Energetic delivery — Day 2 needs a strong re-open. Forum Chairs should be standing by before MC begins.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:17,day:2,order:17,startTime:'10:00',duration:30,title:'⚠️ Programme Gap — 10:00 to 10:30',type:'break',
   speakers:[''],moderator:'',
   flags:[{kind:'warn',text:'Unaccounted 30-min gap — needs client decision'}],
   overview:{venue:'TBD',format:'Unscheduled buffer — requires client decision',config:'N/A until confirmed',objective:'Clarify with client: is this an intentional buffer, a Deal Room showcase slot, or a missing session?'},
   avCues:[
     {type:'warn',label:'Programme Gap',text:'30-minute gap exists in the programme between Opening Recap (ends 10:00) and Plenary 4 (starts 10:30). Must be resolved before event day.'},
     {type:'warn',label:'Options',text:'Option A: Intentional buffer / networking time\nOption B: Deal Room showcase or exhibition viewing\nOption C: A session is missing from the programme — request full agenda from client'}
   ],
   screenContent:[
     {slot:'If Used as Buffer',type:'title',title:'NETWORKING & DEAL ROOM',sub:'Delegates are invited to visit the Deal Room and Exhibition · Plenary 4 begins at 10:30'},
     {slot:'Note',type:'note',text:'This gap will not appear on-screen as a "gap" — we will fill it with directional/networking content regardless. What matters is confirming the intent with the client.'}
   ],
   mcScript:'[If used as networking time]: Ladies and gentlemen, we have a short break before our next session. The Deal Room is open — we encourage you to make connections. We reconvene at 10:30.',
   mcDirection:'Only deliver if gap is confirmed as networking time.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:18,day:2,order:18,startTime:'10:30',duration:60,title:'Plenary 4 — Building the Cities of the Future',type:'panel',
   speakers:['Dr. Peer Lubasch \u2014 CEO, Julius Berger Nigeria Plc','Mr. Biodun Ogunleye \u2014 Hon. Commissioner for Energy / Special Adviser on Works, Lagos State','Dr. Jobson Oseodion Ewalefoh \u2014 DG, Infrastructure Concession Regulatory Commission (ICRC)','Mr. Dai Shunfa \u2014 CEO, Lekki Free Zone','Aminu Umar-Sadiq \u2014 MD, Nigeria Sovereign Investment Authority (NSIA)','Mr. Jerome Frost \u2014 Global Managing Director, Arup Group','Representative, NEOM','Representative, Adani Group','Representative, British Steel','Mr. Tom Cartledge \u2014 CEO, Benoy','Representatives: Wellington School, Charter House School, Rugby School'],
   moderator:'Dr. Kadri Obafemi Hamzat — Deputy Governor, Lagos State',
   flags:[{kind:'info',text:'AfDB President: Dr. Sidi Ould Tah confirmed \u00b7 Confirm in-person vs video format'}],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Keynote opener (AfDB President) + large panel',config:'Panel table up to 10 seats. AfDB President keynote to open. Deputy Governor chairs.',objective:'Explore infrastructure, energy and industrial ecosystems shaping globally competitive African cities. Anchor around Lekki–Epe Airport, metro rail, Fourth Mainland Bridge.'},
   avCues:[
     {type:'av',label:'Slides',text:'"PLENARY 4: BUILDING THE CITIES OF THE FUTURE". AfDB President keynote slide. Panel title cards.'},
     {type:'av',label:'AfDB President',text:'⚠️ Confirm: in-person or via video link? If video — test live connection at rehearsal. Backup plan if link fails?'},
     {type:'av',label:'Audio',text:'Up to 10 panel mics. Chair mic elevated. Confirm gooseneck or lapel with venue.'},
     {type:'stage',label:'Setup',text:'Large panel — confirm table can seat 10 comfortably. Name placards. Water. Deputy Governor confirmed for moderator briefing pack.'},
     {type:'warn',label:'AfDB',text:'Dr. Sidi Ould Tah (AfDB President) confirmed. Attendance format (in-person or video) still to be confirmed \u2014 test setup at rehearsal.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 4',sub:'Building the Cities of the Future'},
     {slot:'AfDB Keynote Slide',type:'title',title:'KEYNOTE ADDRESS',sub:'Dr. Sidi Ould Tah \u00b7 President, African Development Bank Group'},
     {slot:'AfDB Lower Third',type:'lt',name:'Dr. Sidi Ould Tah',role:'President',org:'African Development Bank Group'},
     {slot:'Chair Lower Third',type:'lt',name:'Dr. Kadri Obafemi Hamzat',role:'Chair · Deputy Governor',org:'Lagos State'},
     {slot:'Panel Lower Thirds — list',type:'note',text:'Pre-load all panellist lower thirds. Rotate as each speaks:\n· Dr. Peer Lubasch — CEO, Julius Berger Nigeria Plc\n· Biodun Ogunleye — Commissioner for Energy / Special Adviser on Works, Lagos State\n· Dr. Jobson Oseodion Ewalefoh — DG, ICRC\n· Dai Shunfa — CEO, Lekki Free Zone\n· Aminu Umar-Sadiq — MD, NSIA\n· Jerome Frost — Global MD, Arup Group\n· Representative, NEOM (name TBC)\n· Representative, Adani Group (name TBC)\n· Representative, British Steel (name TBC)\n· Tom Cartledge — CEO, Benoy\n· Representatives: Wellington School, Charter House School, Rugby School (names TBC)'}
   ],
   mcScript:'We now move to Plenary Four — Building the Cities of the Future. Chairing this session is the Deputy Governor of Lagos State, Dr. Kadri Obafemi Hamzat. We open with a Keynote Address from the President of the African Development Bank Group — Dr. Sidi Ould Tah.',
   mcDirection:'Large panel — keep MC intro crisp. Do not list all panellists by name. Chair will introduce panellists.',
   moderatorNotes:'Session objective: explore infrastructure, energy and industrial ecosystems shaping globally competitive African cities. Key for investors: financing mechanisms, returns profile, execution capacity. Focus on Lekki–Epe Airport, Fourth Mainland Bridge, metro rail.',
   moderatorQuestions:['Which single infrastructure project in Lagos offers the clearest commercial return for private investors in the next decade?','How does Lagos compare to NEOM, Diamniadio, or Eko Atlantic as a model for intentional city-building?','What is the role of international firms in building Lagos\'s infrastructure capacity — beyond the contract?','Energy: what is the honest timeline for reliable power in Lagos, and what does it cost to solve it?']},

  {id:19,day:2,order:19,startTime:'11:30',duration:30,title:'Networking Break',type:'break',
   speakers:[''],moderator:'',flags:[],
   overview:{venue:'Lobby / Exhibition Pavilion',format:'Open networking break',config:'No stage activity. Screens on loop. Deal Room open.',objective:'Delegates network and visit the Deal Room between Plenary 4 and 5.'},
   avCues:[
     {type:'av',label:'Screens',text:'All screens: "NETWORKING BREAK — Plenary 5 begins at 12:00".'},
     {type:'av',label:'Music',text:'Ambient playlist resumes.'},
     {type:'stage',label:'Reset',text:'Stage team resets for Plenary 5 fireside chat opener — 2 chairs centre stage.'}
   ],
   screenContent:[
     {slot:'Break Slide',type:'title',title:'NETWORKING BREAK',sub:'Plenary 5 — Global Partnerships for Growth begins at 12:00 · Deal Room is open'}
   ],
   mcScript:'Ladies and gentlemen, we will now take a short networking break. Please reconvene at 12:00 for Plenary Five — Global Partnerships for Growth.',
   mcDirection:'Short and clear. Point delegates towards the Deal Room and lobby.',
   moderatorNotes:'',moderatorQuestions:[]},

  {id:20,day:2,order:20,startTime:'12:00',duration:60,title:'Plenary 5 — Global Partnerships for Growth',type:'panel',
   speakers:['Dr. Richard Montgomery, CMG \u2014 High Commissioner, United Kingdom to Nigeria','H.E. SUZUKI Hideo \u2014 Ambassador of Japan to Nigeria','Mrs. Annett Gunther \u2014 Ambassador of Germany to Nigeria','Abhishek Singh \u2014 Ambassador of India to Nigeria','Visiting Ministers','Dr. George Elomb \u2014 President, Afrexim Bank'],
   moderator:'Samantha Cohen CVO OBE — CEO, CWEIC',
   flags:[{kind:'warn',text:'Wamkele Keabetswe Mene: confirm in-person or video format'}],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Fireside Chat opener (Wamkele Mene) → Full panel',config:'Fireside: 2 chairs, 2 mics. Swap to panel table for main discussion.',objective:"Examine how international cooperation and cross-border investment can accelerate Africa's transformation. Situate Lagos within AfCFTA architecture."},
   avCues:[
     {type:'av',label:'Fireside Setup',text:'2 chairs, centre stage. 2 lavs or directional mics. Remove podium. Transition to panel table after fireside ends (~20 min).'},
     {type:'av',label:'Slides',text:'"PLENARY 5: GLOBAL PARTNERSHIPS FOR GROWTH". Fireside opener slides. AfCFTA logo for Wamkele Mene.'},
     {type:'av',label:'Wamkele Mene',text:'⚠️ Confirm: in-person or video link? If video — test at 11:30 during networking break.'},
     {type:'stage',label:'Stage Swap',text:'Fireside format first. After fireside, swift stage swap to panel table. Practice this transition at rehearsal.'},
     {type:'stage',label:'Diplomatic Protocol',text:'Ambassador seating order: confirm with CWEIC and protocol team. Diplomatic rank determines order.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 5',sub:'Global Partnerships for Growth'},
     {slot:'Fireside Intro Slide',type:'title',title:'FIRESIDE CHAT',sub:"AfCFTA — Africa's Trade Architecture"},
     {slot:'Fireside Lower Third',type:'lt',name:'Wamkele Keabetswe Mene',role:'Secretary-General',org:'African Continental Free Trade Area (AfCFTA)'},
     {slot:'Chair Lower Third',type:'lt',name:'Samantha Cohen CVO OBE',role:'Chair · CEO',org:'Commonwealth Enterprise and Investment Council (CWEIC)'},
     {slot:'Panel Lower Thirds — list',type:'note',text:'Rotate per speaker:\n· Dr. Richard Montgomery, CMG — High Commissioner, UK to Nigeria\n· H.E. SUZUKI Hideo — Ambassador of Japan to Nigeria\n· Mrs. Annett Gunther — Ambassador of Germany to Nigeria\n· Abhishek Singh — Ambassador of India to Nigeria\n· Visiting Ministers (names TBC)\n· Dr. George Elomb — President, Afrexim Bank'}
   ],
   mcScript:'We now move to Plenary Five — Global Partnerships for Growth. Chairing this session is the CEO of the Commonwealth Enterprise and Investment Council — Samantha Cohen. We begin with a Fireside Chat with the Secretary-General of the African Continental Free Trade Area, Mr. Wamkele Keabetswe Mene.',
   mcDirection:'After announcing fireside, exit stage completely — two-chair format works best without MC visible.',
   moderatorNotes:"Session objective: examine how international cooperation accelerates Africa's transformation. Fireside opener: 15–20 minutes. Panel: 30 minutes. Q&A: 10 minutes.",
   moderatorQuestions:["Mr. Mene — where is Lagos in the AfCFTA implementation roadmap, and what would it take to make it a primary AfCFTA hub?","What is the most concrete bilateral investment outcome any of your nations has committed to with Lagos today?","How does the AfCFTA architecture change the calculus for international investors looking at Lagos versus other African markets?","What is the one thing the Commonwealth can do that no bilateral agreement can achieve for Lagos?"]},

  {id:21,day:2,order:21,startTime:'13:00',duration:60,title:'Plenary 6 — Talent, Creativity and Culture',type:'panel',
   speakers:['Don Jazzy (Michael Collins Ajereh) \u2014 CEO, Mavin Records','Chief Executive Officer, Netflix Africa (name TBC)','Mr. Niklas Adalberth \u2014 Founder, Norrsken Africa','Mrs. Bolanle Austen-Peters \u2014 CEO, Terra Kulture','Mr. Obi Asika \u2014 Director-General, National Council for Arts and Culture'],
   moderator:'Eva Omaghomi — Chair',
   flags:[{kind:'warn',text:'Keynote: 3 options per programme — Prof. Wole Soyinka / Bolanle Austen-Peters / Kunle Afolayan — client to confirm · Panel speakers confirmed'}],
   overview:{venue:'Main Plenary Hall — Panel Stage',format:'Keynote opener + panel + optional showcase',config:'Panel table 5–6 seats. Keynote at podium. Optional: Nollywood/Fashion Week video showcase.',objective:"Explore how Nigeria's creative economy can be institutionalised as a structured investment proposition."},
   avCues:[
     {type:'av',label:'Slides',text:'"PLENARY 6: TALENT, CREATIVITY AND CULTURE". Keynote slide — update once speaker confirmed.'},
     {type:'av',label:'Nollywood Showcase',text:'⚠️ Confirm format: pre-produced video reel, live presentation, or both. If video — send to AV team 48h before for QC.'},
     {type:'av',label:'Lagos Fashion Week',text:'⚠️ Same as above — confirm format. If video: 48h before. If live: stage and lighting requirements needed.'},
     {type:'stage',label:'Showcase Logistics',text:'If live showcase element — confirm tech rider, stage requirements, and timing within the 60-minute session.'},
     {type:'warn',label:'Critical',text:'Three keynote candidates: Prof. Wole Soyinka / Bolanle Austin-Peters / Kunle Afolayan. Client to confirm which — urgently. Each requires different slide, lower third, and MC script.'}
   ],
   screenContent:[
     {slot:'Session Slide',type:'title',title:'PLENARY 6',sub:'Talent, Creativity and Culture'},
     {slot:'Keynote Slide — Option A',type:'title',title:'KEYNOTE ADDRESS',sub:'Professor Wole Soyinka · Nobel Laureate in Literature'},
     {slot:'Keynote Lower Third — Option A',type:'lt',name:'Professor Wole Soyinka',role:'Nobel Laureate in Literature · Keynote Address',org:''},
     {slot:'Keynote Slide — Option B',type:'title',title:'KEYNOTE ADDRESS',sub:'Bolanle Austin-Peters · Founder, Terra Kulture'},
     {slot:'Keynote Slide — Option C',type:'title',title:'KEYNOTE ADDRESS',sub:'Kunle Afolayan · Filmmaker · Founder, Golden Effects Pictures'},
     {slot:'Chair Lower Third',type:'lt',name:'Eva Omaghomi',role:'Chair',org:'Lagos State Investment Forum 2026'},
     {slot:'Showcase Slide',type:'title',title:'NOLLYWOOD & LAGOS FASHION WEEK',sub:'Creative Economy Showcase'}
   ],
   mcScript:'We now move to Plenary Six — Talent, Creativity and Culture. This session is chaired by Eva Omaghomi. We begin with a Keynote Address from [CONFIRM: Professor Wole Soyinka / Bolanle Austin-Peters / Kunle Afolayan].',
   mcDirection:'[NAME] to be confirmed before script is finalised. Prepare three versions — one per keynote candidate.',
   moderatorNotes:"Session objective: present Nigeria's creative economy as a structured investment proposition. Chair to keep discussion grounded in investment potential, IP frameworks, and workforce development.",
   moderatorQuestions:["What is the annual GDP contribution of Nigeria's creative economy, and what would it take to double it in 5 years?","What does Nollywood need that Lagos can provide — and what does Lagos get in return?","How do we move from 'Nigeria is creative' to 'Nigeria is investable' in the creative sector?","What role does IP protection play in attracting serious capital to the music and film industries?"]},

  {id:22,day:2,order:22,startTime:'14:00',duration:30,title:'Closing Session — The Way Forward',type:'speech',
   speakers:['Governor of Lagos State (Closing Remarks)','MoU Signatories (number TBC)'],moderator:'',
   flags:[{kind:'warn',text:'MoU signatories TBC · Vote of Thanks speaker TBC'}],
   overview:{venue:'Main Plenary Hall — Podium + Signing Table',format:"Communiqué reading → MoU signing → Governor's Closing Remarks → Vote of Thanks",config:'Signing table on stage with backdrop. Press photographers in position. Governor at podium.',objective:"Formally close the Forum's plenary programme; execute MoU signings; capture outcomes of the two-day Forum."},
   avCues:[
     {type:'av',label:'Closing Slide',text:'"CLOSING SESSION — THE WAY FORWARD". Lagos State Investment Forum 2026 branding.'},
     {type:'av',label:'MoU Signing',text:'MoU signing backdrop displayed prominently. Press photo position: 3m from signing table, frontal. Capture all signatories.'},
     {type:'av',label:'Closing Video',text:'Optional: closing montage/highlight reel before Closing Remarks. Confirm with client. If yes — deliver video file 48h in advance for QC.'},
     {type:'stage',label:'Signing Table',text:'⚠️ Confirm: number of signatories → determines table size. Signing order. Who presents documents? Documents pre-positioned face-down before session.'},
     {type:'warn',label:'Open Items',text:'1. How many MoU signatories?\n2. Confirm signing order\n3. Who reads the Communiqué?\n4. Who delivers the Vote of Thanks?\n5. Closing video — yes or no?'}
   ],
   screenContent:[
     {slot:'Session Opening Slide',type:'title',title:'THE WAY FORWARD',sub:'Closing Session · Lagos State Investment Forum 2026'},
     {slot:'Communiqué Slide',type:'title',title:'FORUM COMMUNIQUÉ',sub:'Lagos State Investment Forum 2026 · 8–9 June 2026'},
     {slot:'MoU Signing Slide',type:'title',title:'MEMORANDA OF UNDERSTANDING',sub:'Signing Ceremony · Lagos State Investment Forum 2026'},
     {slot:'Closing Remarks Slide',type:'title',title:'CLOSING REMARKS',sub:'Executive Governor, Lagos State'},
     {slot:'Governor Closing Lower Third',type:'lt',name:'Mr. Babajide Olusola Sanwo-Olu',role:'Closing Remarks · Executive Governor',org:'Lagos State'},
     {slot:'Vote of Thanks',type:'lt',name:'[Vote of Thanks Speaker — TBC]',role:'Vote of Thanks',org:'Lagos State Investment Forum 2026'},
     {slot:'Final Slide',type:'title',title:'THANK YOU',sub:'Lagos State Investment Forum 2026 · See you next year'}
   ],
   mcScript:'Distinguished guests, we now move to our Closing Session and the Way Forward. We begin with the reading of the Forum Communiqué, followed by the Memoranda of Understanding Signing Ceremony, Closing Remarks from the Executive Governor of Lagos State, and a Vote of Thanks.',
   mcDirection:"Pace deliberately. Allow full applause after Governor's remarks. Vote of Thanks speaker should be positioned before MC hands over.",
   moderatorNotes:'',moderatorQuestions:[]},

  {id:23,day:2,order:23,startTime:'14:30',duration:90,title:'Networking Lunch (Closing)',type:'break',
   speakers:[''],moderator:'',flags:[],
   overview:{venue:'Lunch Venue',format:'Closing networking lunch — informal',config:'No stage. Ambient music. Thank-you branding on screens.',objective:'Final networking opportunity. Safe farewell to international guests.'},
   avCues:[
     {type:'av',label:'Music',text:'Closing playlist — celebratory, warm. Volume at conversation level.'},
     {type:'av',label:'Screens',text:'Thank you slide with full event branding. Logo lockup.'}
   ],
   screenContent:[
     {slot:'Closing Screen',type:'title',title:'THANK YOU FOR JOINING US',sub:'Lagos State Investment Forum 2026 · Eko Hotel & Suites · Lagos, Nigeria'},
     {slot:'Safe Travels Slide',type:'title',title:'SAFE TRAVELS',sub:'Lagos State Investment Forum 2026'}
   ],
   mcScript:"Ladies and gentlemen, this concludes the formal programme of the Lagos State Investment Forum 2026. On behalf of Lagos State, our Forum Co-Chairs, and the entire organising team — thank you for your presence, your ideas, and your commitment to Lagos. Please join us for a Networking Lunch. Safe travels to all our international guests.",
   mcDirection:'Final words from the MC. Warm, gracious delivery. No rush.',
   moderatorNotes:'',moderatorQuestions:[]},
]
