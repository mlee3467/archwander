/* ============================================================
   ArchWander — London Location Data
   19 locations · Foster + Partners · Richard Rogers · Renzo Piano
   Edit this file to add / modify London locations.
   ============================================================ */

const LOCS_LONDON = [

  // ── FOSTER + PARTNERS ──────────────────────────────────────

  {
    id:'lon-0001',
    name:'30 St Mary Axe (Gherkin)',
    cat:'Skyscrapers', cats:["Skyscrapers","Landmarks","Commercial"], cc:'c-sky', styleGroup:'High-Tech', styleGroups:["High-Tech","Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:2003, access:'Free Admission', style:'High-Tech',
    lat:51.5145, lng:-0.0803,
    addr:'30 St Mary Axe, City of London EC3A 8EP', hood:'City of London',
    desc:'The Gherkin is London\'s most recognisable tower, its 180-metre bullet-shaped profile rising above the medieval street grid of the City. Designed by Foster + Partners for Swiss Re and completed in 2003, the diagrid structural frame eliminates internal columns and creates column-free floor plates throughout. Six light wells spiral up the building\'s exterior, channelling natural ventilation through the offices and cutting energy consumption by roughly half compared to a conventional sealed tower. Unusually for a skyscraper, every panel of its diamond-patterned glass facade is flat, yet the geometry gives the illusion of a continuous curve.',
    hours:'Lobby: Mon–Fri 7:00 AM – 7:00 PM · Upper floors: private',
    lastEntry:'',
    admission:'Free (lobby only) · Upper floors private',
    tourOk:true, tourInfo:'Open House London (September) grants public access to upper floors. The private dining room at the apex occasionally hosts corporate events visible through the glazed dome.',
    web:'https://www.30stmaryaxe.com',
    transit:'Circle District → Aldgate · Central Waterloo & City → Bank (5 min walk)',
    walkFrom:'Liverpool Street: 6 min · Lloyd\'s of London: 3 min · Leadenhall Market: 4 min',
    gmaps:'https://maps.google.com/?q=30+St+Mary+Axe+London',
    archdaily:'https://www.archdaily.com/tag/30-st-mary-axe',
    wiki:'https://en.wikipedia.org/wiki/30_St_Mary_Axe',
    tags:['Foster + Partners','Norman Foster','High-Tech','Diagrid','Swiss Re','Gherkin','Skyscraper','City of London','RIBA Stirling Prize'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/30_St_Mary_Axe_from_Leadenhall_Street.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/30_St_Mary_Axe%2C_%27Gherkin%27.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/30_St_Mary_Axe_-_The_Gherkin_from_Leadenhall_St_-_Nov_2006.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_MMB_41_30_St_Mary_Ax.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0002',
    name:'Bloomberg European HQ',
    cat:'Landmarks', cats:["Landmarks","Commercial"], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:2017, access:'Free Admission', style:'Contemporary',
    lat:51.5122, lng:-0.0912,
    addr:'3 Queen Victoria Street, City of London EC4N 4TQ', hood:'City of London',
    desc:'Widely regarded as the world\'s most sustainable office building, Bloomberg\'s European headquarters received the highest ever BREEAM Outstanding score of 98.5% at the time of its completion. Foster + Partners\'s design reinstates a Roman-era street — Watling Street — through the site and incorporates some 16,000 bronze petal-shaped fins on its curved facade that open and close to regulate airflow. Beneath the building, a permanent public exhibition displays the remains of London\'s Roman Temple of Mithras, excavated on the same site in the 1950s.',
    hours:'Ground floor arcade & Mithraeum: daily · Offices: private',
    lastEntry:'',
    admission:'Free (arcade and Mithraeum museum)',
    tourOk:true, tourInfo:'The London Mithraeum in the basement is free to visit and open to the public. The building interior can be visited during Open House London.',
    web:'https://www.londonmithraeum.com',
    transit:'Central → Bank (2 min) · Circle District → Mansion House (3 min)',
    walkFrom:'St Paul\'s Cathedral: 5 min · Tate Modern: 10 min · Bank: 3 min',
    gmaps:'https://maps.google.com/?q=Bloomberg+European+HQ+London',
    archdaily:'https://www.archdaily.com/880369/bloomberg-london-foster-and-partners',
    wiki:'https://en.wikipedia.org/wiki/Bloomberg_London',
    tags:['Foster + Partners','Bloomberg','BREEAM','Sustainable','Mithraeum','Roman','City of London','RIBA Stirling Prize 2018'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bloomberg_London_exterior_-_Cannon_Street%2C_Walbrook.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bloomberg_London_central_ramp_-_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bloomberg_London_central_ramp_-_3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bloomberg_London_lobby_-_3.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0003',
    name:'Great Court, British Museum',
    cat:'Cultural', cats:["Cultural","Landmarks","Public"], cc:'c-cul', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:2000, access:'Free Admission', style:'Contemporary',
    lat:51.5194, lng:-0.1270,
    addr:'Great Russell Street, Bloomsbury, London WC1B 3DG', hood:'Bloomsbury',
    desc:'The Queen Elizabeth II Great Court transformed the long-neglected inner courtyard of the British Museum into Europe\'s largest covered public square. Foster + Partners\'s steel-and-glass roof — a 3,312-panel gridshell no two panes of which are identical — spans the 2-acre courtyard and encloses the iconic circular Reading Room at its centre. Completed in 2000 for the museum\'s 250th anniversary, the roof resolves the previously impossible geometry of fitting a circular room inside a rectangular courtyard through parametric design that predated mainstream computational tools.',
    hours:'Daily 10:00 AM – 5:30 PM (Fri to 8:30 PM) · Great Court open from 9:00 AM',
    lastEntry:'5:00 PM',
    admission:'Free (Great Court and permanent collection) · Paid for special exhibitions',
    tourOk:true, tourInfo:'Free highlights tours of the permanent collection depart from the Great Court regularly. The Reading Room is open to the public on selected dates.',
    web:'https://www.britishmuseum.org',
    transit:'Central Piccadilly → Holborn (3 min) · Northern → Tottenham Court Road (5 min)',
    walkFrom:'Tottenham Court Road: 5 min · Covent Garden: 10 min · Oxford Street: 8 min',
    gmaps:'https://maps.google.com/?q=British+Museum+London',
    archdaily:'https://www.archdaily.com/tag/british-museum',
    wiki:'https://en.wikipedia.org/wiki/Queen_Elizabeth_II_Great_Court',
    tags:['Foster + Partners','Gridshell','Glass Roof','British Museum','Free','Bloomsbury','Parametric','Reading Room'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/British_Museum_Dome.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/British_Museum_Great_Court_roof.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_-_Great_Russell_Street_-_British_Museum_-_Great_Court_-_View_NNW_II.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Britmuseum.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0004',
    name:'Canary Wharf Underground Station',
    cat:'Infrastructure', cats:["Infrastructure","Commercial"], cc:'c-inf', styleGroup:'High-Tech', styleGroups:["High-Tech","Contemporary"],
    era:'1970–1999', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:1999, access:'Free Admission', style:'High-Tech',
    lat:51.5051, lng:-0.0198,
    addr:'Canary Wharf, Isle of Dogs, London E14 5AB', hood:'Canary Wharf',
    desc:'Foster + Partners\'s Jubilee Line extension station at Canary Wharf is one of the largest underground stations ever built in Britain — a vast elliptical concrete cavern 300 metres long and 28 metres high, capable of handling 40 trains per hour. The station\'s coffered concrete roof and glass canopy entrance, sheltering commuters like the ribbed shell of a mussel, became an icon of late 1990s infrastructure ambition. It was part of the celebrated Jubilee Line Extension, a project that turned the London Underground into a gallery of contemporary architecture with individual stations designed by Roland Paoletti\'s roster of landmark architects.',
    hours:'Mon–Sat 5:00 AM – 12:30 AM · Sun 7:00 AM – 11:30 PM',
    lastEntry:'',
    admission:'Oyster/contactless or valid ticket required',
    tourOk:false, tourInfo:'The station is a working transport hub. The dramatic concourse and escalator hall are visible to all passengers.',
    web:'https://tfl.gov.uk',
    transit:'Jubilee → Canary Wharf · Elizabeth line → Canary Wharf',
    walkFrom:'One Canada Square: 3 min · Museum of London Docklands: 8 min',
    gmaps:'https://maps.google.com/?q=Canary+Wharf+Underground+Station',
    archdaily:'https://www.archdaily.com/tag/canary-wharf-station',
    wiki:'https://en.wikipedia.org/wiki/Canary_Wharf_tube_station',
    tags:['Foster + Partners','Jubilee Line','Infrastructure','Underground','Canary Wharf','Concrete','1999'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Canary_Wharf_Wide_View%2C_London_-_July_2009.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Canary_Wharf_Tube_Station_-_July_2009.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_elevators_leaving_-_entering_Canary_Wharf_Underground_Station_-_geograph.org.uk_-_1128533.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/CanaryWharfTubeA.JPG?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0005',
    name:'City Hall (GLA Building)',
    cat:'Public', cats:["Public","Landmarks","Commercial"], cc:'c-pub', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:2002, access:'Free Admission', style:'Contemporary',
    lat:51.5055, lng:-0.0785,
    addr:'The Queen\'s Walk, Southwark, London SE1 2AA', hood:'South Bank / London Bridge',
    desc:'London\'s City Hall, completed in 2002 on the South Bank opposite the Tower of London, is an exercise in geometric energy efficiency: the building\'s distinctive tilted globe form minimises surface area exposed to direct sunlight, reducing solar gain, while a 500-metre public spiral ramp winds upward through its ten storeys. Foster + Partners calculated the optimal tilt angle to shade the offices below, creating a shape that appears different from every angle. Though the Greater London Authority relocated to Stratford in 2021 and the building was rebranded, it remains a major public space housing the outdoor amphitheatre The Scoop on its riverside.',
    hours:'Exterior and riverside: always open · Interior access varies',
    lastEntry:'',
    admission:'Free (exterior)',
    tourOk:true, tourInfo:'The building is visible from the riverside walk and the interior ramp was historically open during business hours. Check current access with the current operator.',
    web:'https://www.london.gov.uk',
    transit:'Jubilee → London Bridge (5 min) · Northern → London Bridge (5 min)',
    walkFrom:'Tower Bridge: 4 min · Tate Modern: 15 min · Borough Market: 8 min',
    gmaps:'https://maps.google.com/?q=City+Hall+London+Queens+Walk',
    archdaily:'https://www.archdaily.com/tag/city-hall-london',
    wiki:'https://en.wikipedia.org/wiki/City_Hall,_London',
    tags:['Foster + Partners','GLA','South Bank','Sustainable','Globe','Spiral Ramp','Thames'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_-_City_Hall_%284%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/City_Hall%2C_South_Bank_-_geograph.org.uk_-_1281903.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_-_City_Hall_%283%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/GLA_Chamber.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0006',
    name:'Millennium Bridge',
    cat:'Infrastructure', cats:["Infrastructure","Landmarks","Public"], cc:'c-inf', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners', 'Arup', 'Anthony Caro'],
    yr:2002, access:'Free Admission', style:'Contemporary',
    lat:51.5096, lng:-0.0981,
    addr:'Millennium Bridge, City of London / Bankside EC4V 3QH', hood:'City of London / Bankside',
    desc:'London\'s only dedicated pedestrian crossing over the Thames, the Millennium Bridge connects St Paul\'s Cathedral to Tate Modern in a single elegant aluminium span of 325 metres. Designed by Foster + Partners with engineers Arup and sculptor Anthony Caro, the bridge was famously closed two days after opening in 2000 due to unexpected lateral swaying caused by pedestrian footfall synchronisation — the "wobbly bridge" becoming one of engineering\'s most public failures. Following a £5 million modification to install 37 fluid viscous dampers, it reopened in 2002 and is now one of London\'s most beloved public spaces.',
    hours:'Always open',
    lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'The bridge is a public pedestrian route open at all times. The views of St Paul\'s from the South Bank end are among London\'s finest.',
    web:'https://en.wikipedia.org/wiki/Millennium_Bridge,_London',
    transit:'Central → St Paul\'s (5 min) · Jubilee Northern → Southwark (5 min)',
    walkFrom:'St Paul\'s Cathedral: 5 min · Tate Modern: 3 min · Shakespeare\'s Globe: 7 min',
    gmaps:'https://maps.google.com/?q=Millennium+Bridge+London',
    archdaily:'https://www.archdaily.com/tag/millennium-bridge',
    wiki:'https://en.wikipedia.org/wiki/Millennium_Bridge,_London',
    tags:['Foster + Partners','Arup','Bridge','Pedestrian','Thames','Millennium','Wobbly Bridge','Free','St Paul\'s'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_Millenium_Bridge.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Under_the_Millennium_Bridge%2C_London_%28geograph_4907090%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bridge_horiz_mode_shock.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bridge_vert_mode_shock.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0007',
    name:'HSBC UK HQ (8 Canada Square)',
    cat:'Skyscrapers', cats:["Skyscrapers","Commercial","Landmarks"], cc:'c-sky', styleGroup:'High-Tech', styleGroups:["High-Tech","Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners'],
    yr:2002, access:'Private', style:'High-Tech',
    lat:51.5041, lng:-0.0202,
    addr:'8 Canada Square, Canary Wharf, London E14 5HQ', hood:'Canary Wharf',
    desc:'The HSBC Group headquarters at 8 Canada Square is one of the defining towers of Canary Wharf\'s second generation, a 200-metre steel-and-glass prism completed by Foster + Partners in 2002. Unlike the ornamental pyramid of One Canada Square nearby, HSBC\'s tower is rigorously technical — its structural frame is fully expressed on the exterior, the facade flush and precisely detailed, the plan a pure 57×57-metre square. The building\'s mechanical plant, staircases and lifts are distributed on the perimeter, freeing all 50,000 square metres of floor space from internal obstructions, and the trading floors were among the most advanced in the world at opening.',
    hours:'Private — no public access',
    lastEntry:'',
    admission:'Private (office building)',
    tourOk:false, tourInfo:'The building is closed to the public. The Canary Wharf estate and its public spaces surrounding the tower are accessible to all.',
    web:'https://www.canarywharf.com',
    transit:'Jubilee → Canary Wharf · Elizabeth line → Canary Wharf (3 min)',
    walkFrom:'Canary Wharf Station: 3 min · One Canada Square: 5 min · Museum of London Docklands: 8 min',
    gmaps:'https://maps.google.com/?q=8+Canada+Square+Canary+Wharf',
    archdaily:'https://www.archdaily.com/tag/hsbc-canary-wharf',
    wiki:'https://en.wikipedia.org/wiki/HSBC_UK_Building,_London',
    tags:['Foster + Partners','HSBC','Canary Wharf','Skyscraper','High-Tech','Office','Docklands'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/HSBC_HQ.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0008',
    name:'Wembley Stadium',
    cat:'Public', cats:["Public","Landmarks"], cc:'c-pub', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Foster + Partners', archs:['Foster + Partners', 'HOK Sport'],
    yr:2007, access:'Paid Ticket', style:'Contemporary',
    lat:51.5560, lng:-0.2796,
    addr:'Olympic Way, Wembley, London HA9 0WS', hood:'Wembley',
    desc:'The new Wembley Stadium, designed by Foster + Partners and HOK Sport and opened in 2007, is England\'s national football ground and Europe\'s second-largest stadium at 90,000 capacity. Its defining feature is the 133-metre-high steel arch that spans the entire length of the pitch, supporting the vast retractable roof and serving as a landmark visible from much of London. The arch replaced the Twin Towers of the original 1923 Wembley, which had become synonymous with English football but were structurally inadequate. The roof covers all 90,000 seats — a first for a stadium of this scale — and the arch doubles as a navigation beacon for Heathrow flights.',
    hours:'Tours: Daily 10:00 AM – 4:00 PM (non-event days) · Events: varies',
    lastEntry:'',
    admission:'Stadium tours: £25 adults · Match tickets vary',
    tourOk:true, tourInfo:'Behind-the-scenes stadium tours run daily on non-event days, including access to changing rooms, players\' tunnel, and the pitch-side view.',
    web:'https://www.wembleystadium.com',
    transit:'Metropolitan → Wembley Park (10 min walk) · Jubilee → Wembley Park',
    walkFrom:'Wembley Park Station: 10 min · Wembley Arena: 8 min',
    gmaps:'https://maps.google.com/?q=Wembley+Stadium',
    archdaily:'https://www.archdaily.com/tag/wembley-stadium',
    wiki:'https://en.wikipedia.org/wiki/Wembley_Stadium',
    tags:['Foster + Partners','HOK Sport','Stadium','Arch','Football','National Stadium','Wembley'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_Wembley.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_2012_Olympic_Stadium_%2813_July_2012%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/%22Wemberley.......Wemberley%22_-_geograph.org.uk_-_1770078.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/BVB-Fans_in_Wembley.jpg?width=800'
    ],
    drawings:[]
  },

  // ── RICHARD ROGERS / ROGERS STIRK HARBOUR + PARTNERS ───────

  {
    id:'lon-0009',
    name:"Lloyd's of London",
    cat:'Historic', cats:["Historic","Commercial","Landmarks"], cc:'c-his', styleGroup:'High-Tech', styleGroups:["High-Tech"],
    era:'1970–1999', city:'london',
    arch:'Richard Rogers Partnership', archs:['Richard Rogers Partnership'],
    yr:1986, access:'Private', style:'High-Tech',
    lat:51.5127, lng:-0.0825,
    addr:'1 Lime Street, City of London EC3M 7HA', hood:'City of London',
    desc:'Lloyd\'s of London is the building that defined the High-Tech architectural movement and made Richard Rogers a global name. Completed in 1986, six years after the Centre Pompidou in Paris established the style Rogers co-invented with Renzo Piano, Lloyd\'s turned the principle inside out on a tight City of London plot: all service elements — lifts, staircases, utilities, lavatories — are externalised into six satellite towers on the perimeter, liberating the interior for the vast open trading floor known as the "Room." The building\'s stainless steel ducts, blue crane arms and exposed structure are simultaneously industrial and elegant, and it remains the most radical corporate building ever erected in the City.',
    hours:'Private — no public access',
    lastEntry:'',
    admission:'Private (working insurance market)',
    tourOk:false, tourInfo:'The building is a working insurance market and not open to the public. Open House London sometimes grants access. The exterior is best viewed from Lime Street.',
    web:'https://www.lloyds.com',
    transit:'Circle District Hammersmith → Monument (5 min) · Central → Bank (5 min)',
    walkFrom:'Leadenhall Market: 3 min · Gherkin: 3 min · Bank: 8 min',
    gmaps:'https://maps.google.com/?q=Lloyd%27s+of+London',
    archdaily:'https://www.archdaily.com/tag/lloyds-of-london',
    wiki:"https://en.wikipedia.org/wiki/Lloyd%27s_of_London_(building)",
    tags:['Richard Rogers','High-Tech','Inside-Out','Insurance','City of London','Grade I Listed','1986','Stainless Steel'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd%27s_insurance_exterior_at_night.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd%27s_Building_-_Atrium_11th_floor_looking_at_the_Walkie-Talkie.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd%27s_Building_-_Atrium_roof.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lloyd%27s_Building_-_Escalators_fisheye.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0010',
    name:'Leadenhall Building (Cheesegrater)',
    cat:'Skyscrapers', cats:["Skyscrapers","Commercial","Landmarks"], cc:'c-sky', styleGroup:'High-Tech', styleGroups:["High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Rogers Stirk Harbour + Partners', archs:['Rogers Stirk Harbour + Partners'],
    yr:2014, access:'Free Admission', style:'High-Tech',
    lat:51.5138, lng:-0.0826,
    addr:'122 Leadenhall Street, City of London EC3V 4AB', hood:'City of London',
    desc:'The Leadenhall Building — popularly the "Cheesegrater" for its wedge-shaped profile — tapers northward to preserve the protected view of St Paul\'s Cathedral from Fleet Street, transforming a planning constraint into its most distinctive architectural feature. Rogers Stirk Harbour + Partners\'s 224-metre tower, completed in 2014, expresses its megaframe structural system entirely on the exterior in orange-painted steel, freeing the 48,000-square-metre interior of every column. A 15-storey public atrium at the base extends the City\'s streets into the building at ground level, a rare act of civic generosity in London\'s financial district.',
    hours:'Public atrium: Mon–Fri 7:00 AM – 7:00 PM · Office floors: private',
    lastEntry:'',
    admission:'Free (ground floor atrium)',
    tourOk:true, tourInfo:'The public atrium with its dramatic exposed steel frame is open during business hours. Sky garden access is private.',
    web:'https://www.theleadenhallbuilding.com',
    transit:'Circle District → Aldgate (5 min) · Central Waterloo & City → Bank (7 min)',
    walkFrom:'Lloyd\'s of London: 1 min · Gherkin: 3 min · Leadenhall Market: 2 min',
    gmaps:'https://maps.google.com/?q=Leadenhall+Building+London',
    archdaily:'https://www.archdaily.com/tag/leadenhall-building',
    wiki:'https://en.wikipedia.org/wiki/Leadenhall_Building',
    tags:['Rogers Stirk Harbour + Partners','Richard Rogers','Cheesegrater','Skyscraper','High-Tech','Megaframe','City of London','St Paul\'s View'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Cheesegrater_and_Gherkin.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/122_Leadenhall_Street_-_geograph-3968154-by-Julian-Osley.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_-_Leadenhall_Building_%281%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Gherkin_Cheesegrater_Abstract.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0011',
    name:'The O2 Arena (Millennium Dome)',
    cat:'Public', cats:["Public","Landmarks"], cc:'c-pub', styleGroup:'High-Tech', styleGroups:["High-Tech","Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Richard Rogers Partnership', archs:['Richard Rogers Partnership', 'Buro Happold'],
    yr:2000, access:'Paid Ticket', style:'High-Tech',
    lat:51.5030, lng:0.0032,
    addr:'Peninsula Square, Greenwich, London SE10 0DX', hood:'Greenwich Peninsula',
    desc:'The Millennium Dome — now The O2 — is the world\'s largest dome structure, a 365-metre diameter tensile fabric roof supported by twelve 100-metre steel masts whose number evokes the months of the year and the hours on a clock face. Designed by Richard Rogers Partnership with Buro Happold as a national monument for the millennium, it opened on 31 December 1999 and was immediately controversial; following closure in 2001, AEG transformed it into The O2, Europe\'s busiest entertainment arena. The dome\'s fabric roof is now traversable on a guided "Up at The O2" climbing experience.',
    hours:'Entertainment venue: event days only · Up at The O2: daily 10:00 AM – 5:00 PM',
    lastEntry:'',
    admission:'Entry to The O2 varies by event · Up at The O2: from £30',
    tourOk:true, tourInfo:'The Up at The O2 roof walk is open daily and provides panoramic views of London. The entertainment complex is accessible to the public.',
    web:'https://www.theo2.co.uk',
    transit:'Jubilee → North Greenwich (adjacent)',
    walkFrom:'North Greenwich Station: 5 min',
    gmaps:'https://maps.google.com/?q=The+O2+Arena+London',
    archdaily:'https://www.archdaily.com/tag/millennium-dome',
    wiki:'https://en.wikipedia.org/wiki/The_O2_Arena',
    tags:['Richard Rogers','Millennium Dome','O2','Tensile Structure','High-Tech','Greenwich','Masts','Entertainment'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_MMB_V9_Millennium_Dome.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_MMB_W7_Millennium_Dome.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Basket_Ball_at_the_O2_Arena.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/London_2012_Olympic_Stadium_%2813_July_2012%29.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0012',
    name:'Heathrow Terminal 5',
    cat:'Infrastructure', cats:["Infrastructure","Commercial"], cc:'c-inf', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Rogers Stirk Harbour + Partners', archs:['Rogers Stirk Harbour + Partners'],
    yr:2008, access:'Paid Ticket', style:'Contemporary',
    lat:51.4721, lng:-0.4877,
    addr:'Heathrow Airport, Terminal 5, Longford, Hounslow TW6 2GA', hood:'Heathrow',
    desc:'Heathrow Terminal 5 is one of the largest buildings in the United Kingdom, a single-span roof 396 metres long covering a naturally lit concourse designed to handle 30 million passengers a year. Rogers Stirk Harbour + Partners\'s design, developed over 19 years through one of the longest planning inquiries in British history, uses 16 roof "petals" — prefabricated off-site — that click together to form a gentle wave above the passenger hall. The terminal\'s structural system is deliberately exposed, creating a light-filled space that counters the typical enclosure of airport terminals, and the primary structure required no paint or fire protection due to innovative engineering.',
    hours:'24 hours (operational)',
    lastEntry:'',
    admission:'Access for passengers with valid tickets only',
    tourOk:false, tourInfo:'Terminal 5 is restricted to departing passengers and those with arriving passengers. The building\'s most dramatic spaces — the departure hall and its roof — are visible only from airside.',
    web:'https://www.heathrow.com/terminals/terminal-5',
    transit:'Elizabeth line → Heathrow Terminal 5 (direct) · Heathrow Express → Paddington (21 min)',
    walkFrom:'Terminal 5 Station: adjacent',
    gmaps:'https://maps.google.com/?q=Heathrow+Terminal+5',
    archdaily:'https://www.archdaily.com/tag/heathrow-terminal-5',
    wiki:'https://en.wikipedia.org/wiki/Heathrow_Terminal_5',
    tags:['Rogers Stirk Harbour + Partners','Richard Rogers','Heathrow','Airport','Infrastructure','Single Span Roof','Terminal'],
    photos:[
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/T5A_interior.jpg/800px-T5A_interior.jpg'
    ],
    drawings:[]
  },

  {
    id:'lon-0013',
    name:'One Hyde Park',
    cat:'Residential', cats:["Residential","Landmarks"], cc:'c-res', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Rogers Stirk Harbour + Partners', archs:['Rogers Stirk Harbour + Partners'],
    yr:2011, access:'Private', style:'Contemporary',
    lat:51.5023, lng:-0.1603,
    addr:'Knightsbridge, London SW1X 7LJ', hood:'Knightsbridge',
    desc:'One Hyde Park is the world\'s most expensive residential development, its four glass pavilions rising adjacent to Hyde Park at Knightsbridge and regularly cited as London\'s priciest address. Rogers Stirk Harbour + Partners designed the development as a series of four linked but separate residential blocks, each rotated to maximise park views, with shared leisure facilities including a swimming pool, spa, cinema and squash courts concealed below ground. At opening, its penthouse apartments sold for over £100 million each. The building\'s transparent glass facades were a deliberate counterpoint to the closed, defensive architecture typical of ultra-luxury London developments.',
    hours:'Private residential — no public access',
    lastEntry:'',
    admission:'Private',
    tourOk:false, tourInfo:'One Hyde Park is a private residential development. The adjacent Hyde Park and the Serpentine Gallery are open to the public.',
    web:'https://www.onehydepark.com',
    transit:'Piccadilly → Knightsbridge (3 min)',
    walkFrom:'Hyde Park: 1 min · Harrods: 5 min · Serpentine Gallery: 10 min',
    gmaps:'https://maps.google.com/?q=One+Hyde+Park+London',
    archdaily:'https://www.archdaily.com/tag/one-hyde-park',
    wiki:'https://en.wikipedia.org/wiki/One_Hyde_Park',
    tags:['Rogers Stirk Harbour + Partners','Richard Rogers','Luxury Residential','Knightsbridge','Hyde Park','World\'s Most Expensive'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/No_1_Hyde_Park%2C_London.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/One_Hyde_Park_under_construction_in_May_2010.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/One_Hyde_Park_-_Edinburgh_Gate%2C_Knightsbridge_-_liftshaft.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/One_Hyde_Park_%2843969329645%29.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0014',
    name:'88 Wood Street',
    cat:'Landmarks', cats:["Landmarks","Commercial"], cc:'c-lmk', styleGroup:'High-Tech', styleGroups:["High-Tech","Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Rogers Stirk Harbour + Partners', archs:['Rogers Stirk Harbour + Partners'],
    yr:2000, access:'Private', style:'High-Tech',
    lat:51.5158, lng:-0.0912,
    addr:'88 Wood Street, City of London EC2V 7RS', hood:'City of London',
    desc:'88 Wood Street is among Richard Rogers\'s most sophisticated smaller towers, a 19-storey office building in the heart of the City whose facade changes expression across its four elevations to respond to the surrounding streets. The north face is enclosed in reflective glass, while the south is opened up with projecting aluminium sunshades; the east and west elevations express the building\'s structural frame. Most distinctive is the cylindrical utility tower that breaks free of the rectangular mass at the north-east corner — a characteristically Rogers move that externalises services into an architectural element and creates variety in the City\'s streetscape.',
    hours:'Private office building',
    lastEntry:'',
    admission:'Private',
    tourOk:false, tourInfo:'The building is a private office building. The exterior is fully viewable from Wood Street and Fore Street.',
    web:'https://www.rshp.com',
    transit:'Central → St Paul\'s (5 min) · Metropolitan Circle District → Barbican (5 min)',
    walkFrom:'Barbican: 7 min · St Paul\'s: 7 min · Museum of London: 5 min',
    gmaps:'https://maps.google.com/?q=88+Wood+Street+London',
    archdaily:'https://www.archdaily.com/tag/88-wood-street',
    wiki:'https://en.wikipedia.org/wiki/88_Wood_Street',
    tags:['Rogers Stirk Harbour + Partners','Richard Rogers','High-Tech','City of London','Office','Cylindrical Tower'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/88_Wood_St%2C_London.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Vents_88_London_Wall_Richard_Rogers.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/88_Wood_Street%2C_London.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lift_at_London_Wall_-_geograph.org.uk_-_643165.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0015',
    name:'Neo Bankside',
    cat:'Residential', cats:["Residential"], cc:'c-res', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Rogers Stirk Harbour + Partners', archs:['Rogers Stirk Harbour + Partners'],
    yr:2012, access:'Private', style:'Contemporary',
    lat:51.5072, lng:-0.1012,
    addr:'Holland Street, Bankside, London SE1 9JU', hood:'Bankside / Southwark',
    desc:'Neo Bankside is a luxury residential development of six pavilions on London\'s South Bank, directly adjacent to Tate Modern, that became the centre of a significant privacy dispute when Tate Modern\'s Blavatnik Building extension opened its viewing terrace overlooking the apartments\' floor-to-ceiling glazed facades. Rogers Stirk Harbour + Partners deliberately used transparent glass as an ethical stance — the architects believed Londoners had a right to live openly in the city — but the dispute, which reached the UK Supreme Court, highlighted the tensions between architectural transparency and residential privacy. The development\'s expressed steel frames and richly coloured service cores are characteristic of Rogers\'s palette.',
    hours:'Private residential',
    lastEntry:'',
    admission:'Private',
    tourOk:false, tourInfo:'Neo Bankside is private. The adjacent Tate Modern, Shakespeare\'s Globe, and Bankside riverside walk are all public.',
    web:'https://www.rshp.com',
    transit:'Jubilee Northern → Southwark (7 min) · District Circle → Blackfriars (8 min)',
    walkFrom:'Tate Modern: 2 min · Shakespeare\'s Globe: 4 min · Millennium Bridge: 5 min',
    gmaps:'https://maps.google.com/?q=Neo+Bankside+London',
    archdaily:'https://www.archdaily.com/tag/neo-bankside',
    wiki:'https://en.wikipedia.org/wiki/Neo_Bankside',
    tags:['Rogers Stirk Harbour + Partners','Richard Rogers','Residential','Bankside','South Bank','Transparency','Tate Modern'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/NEO_Bankside%2C_London.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Neo_Bankside.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Neo_Bankside_apartment_buildings%2C_London.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Neo_Bankside_apartment_buildings%2C_London_%28side_view%29.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0016',
    name:'Montevetro',
    cat:'Residential', cats:["Residential","Landmarks"], cc:'c-res', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'1970–1999', city:'london',
    arch:'Richard Rogers Partnership', archs:['Richard Rogers Partnership'],
    yr:1999, access:'Private', style:'Contemporary',
    lat:51.4731, lng:-0.1723,
    addr:'Battersea Church Road, Battersea, London SW11 3LY', hood:'Battersea',
    desc:'Montevetro is Richard Rogers\'s first major residential tower in London, a tapering glass block of 103 apartments rising above the Thames at Battersea that pioneered the transparent, light-filled residential aesthetic Rogers would later develop at Neo Bankside. Completed in 1999 on the site of a former flour mill, the building\'s glass facade steps back in plan at each floor to follow the building\'s triangular site, creating a distinctive silhouette when viewed from the river. The project helped establish Battersea\'s transformation from industrial riverside district to luxury residential neighbourhood, a process that continues with the adjacent Battersea Power Station redevelopment.',
    hours:'Private residential',
    lastEntry:'',
    admission:'Private',
    tourOk:false, tourInfo:'The building is private residential. The Thames Path alongside provides good views of the facade from the riverside.',
    web:'https://www.rshp.com',
    transit:'Overground → Clapham Junction (15 min walk) · Bus 344 → Battersea Church Road',
    walkFrom:'Battersea Power Station: 12 min · Chelsea Bridge: 10 min',
    gmaps:'https://maps.google.com/?q=Montevetro+Battersea+London',
    archdaily:'https://www.archdaily.com/tag/montevetro',
    wiki:'https://en.wikipedia.org/wiki/Montevetro',
    tags:['Richard Rogers','Residential','Battersea','Thames','Glass','1999'],
    photos:[],
    drawings:[]
  },

  {
    id:'lon-0017',
    name:'Chiswick Business Park',
    cat:'Landmarks', cats:["Commercial","Landmarks"], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Richard Rogers Partnership', archs:['Richard Rogers Partnership'],
    yr:2000, access:'Free Admission', style:'Contemporary',
    lat:51.4913, lng:-0.2652,
    addr:'566 Chiswick High Road, Chiswick, London W4 5YE', hood:'Chiswick',
    desc:'Chiswick Business Park is Rogers\'s largest commercial campus in London, a landscaped park of twelve office buildings arranged around a central lake and public gardens in west London, developed by Stanhope from 2000 onwards. Unlike conventional business parks designed for car dependency, Chiswick was conceived as a community — a "campus" with cafes, concierge services, and a hotel integrated into the landscape — that anticipated the post-industrial workplace. The buildings\' expressed steel structures and coloured panel systems are characteristic of Rogers\'s vocabulary, and the public lake and gardens are open to all, making it one of west London\'s more pleasant semi-public green spaces.',
    hours:'Public gardens and lake: daily dawn to dusk · Offices: private',
    lastEntry:'',
    admission:'Free (public grounds)',
    tourOk:true, tourInfo:'The public gardens, lake and outdoor seating areas are accessible to all. Individual buildings are private offices.',
    web:'https://www.chiswickpark.com',
    transit:'District → Gunnersbury or Chiswick Park (10–15 min walk)',
    walkFrom:'Gunnersbury Station: 12 min · Kew Bridge: 15 min',
    gmaps:'https://maps.google.com/?q=Chiswick+Business+Park+London',
    archdaily:'https://www.archdaily.com/tag/chiswick-business-park',
    wiki:'https://en.wikipedia.org/wiki/Chiswick_Business_Park',
    tags:['Richard Rogers','Business Park','Chiswick','Campus','Landscape','Lake','West London'],
    photos:[],
    drawings:[]
  }
];

// ── ADDITIONS ─────────────────────────────────────────────────

LOCS_LONDON.push(

  // ── RENZO PIANO — THE SHARD (completed entry) ──────────────

  {
    id:'lon-0018',
    name:'The Shard',
    cat:'Skyscrapers', cats:["Skyscrapers","Landmarks","Commercial"], cc:'c-sky', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Renzo Piano Building Workshop', archs:['Renzo Piano Building Workshop'],
    yr:2012, access:'Paid Ticket', style:'Contemporary',
    lat:51.5045, lng:-0.0865,
    addr:'32 London Bridge Street, London SE1 9SG', hood:'London Bridge / Southwark',
    desc:'At 310 metres, the Shard is Western Europe\'s tallest building, its tapering glass spire rising above London Bridge to become the South Bank\'s defining landmark. Renzo Piano\'s design draws on the vertical spires of Wren\'s City churches and the masts of the Thames sailing ships visible in 18th-century paintings of the river — the concept of a "shard of glass" inserted into London\'s skyline. The building\'s eight angled glass facades are designed to never appear the same twice: the glass is slightly angled at each floor so they reflect different parts of the sky throughout the day and in different weathers. Inside, a mixed-use vertical city combines offices, hotel, apartments, restaurants, and a public viewing gallery at levels 68–72.',
    hours:'Viewing Gallery: daily 10:00 AM – 10:00 PM (Fri–Sat to 11:00 PM)', lastEntry:'1 hour before closing',
    admission:'Viewing Gallery: from £32 adults · Combined tickets available',
    tourOk:true, tourInfo:'The View from The Shard on levels 68–72 is open to the public. The Sky Deck at level 72 is open-air. Booking in advance strongly recommended.',
    web:'https://www.theviewfromtheshard.com',
    transit:'Jubilee Northern → London Bridge (adjacent)',
    walkFrom:'London Bridge Station: 2 min · Borough Market: 4 min · Tate Modern: 12 min',
    gmaps:'https://maps.google.com/?q=The+Shard+London',
    archdaily:'https://www.archdaily.com/tag/the-shard',
    wiki:'https://en.wikipedia.org/wiki/The_Shard',
    tags:['Renzo Piano','Supertall','London Bridge','South Bank','Viewing Gallery','Mixed-Use'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_Shard_from_the_south.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_Shard_-_Nov_2012.jpg?width=800'
    ],
    drawings:[]
  },

  // ── THOMAS HEATHERWICK — LONDON ──────────────────────────────

  {
    id:'lon-0019',
    name:'Coal Drops Yard',
    cat:'Landmarks', cats:["Landmarks","Retail"], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:["Contemporary","Adaptive Reuse"],
    era:'2000–Present', city:'london',
    arch:'Heatherwick Studio', archs:['Heatherwick Studio'],
    yr:2018, access:'Open to Public', style:'Contemporary',
    lat:51.5361, lng:-0.1241,
    addr:'Coal Drops Yard, Stable Street, London N1C 4AB', hood:'King\'s Cross',
    desc:'Coal Drops Yard is a retail and cultural destination in the King\'s Cross regeneration area, designed by Heatherwick Studio and opened in October 2018. The project transforms two Victorian coal-dropping warehouses (built 1850–1863) into a contemporary retail district by connecting the two rooftops with a dramatic canopy of kissing curved steel roofs that meet at a central ridge, creating a new public street between the buildings below. The intervention adds 10,000 sq m of new floor area while preserving the brick and ironwork of the original structures. The resulting space — with its sloped pedestrian street, elevated walkways, and boutique shops — became an immediate landmark of adaptive reuse and urban regeneration in London.',
    hours:'Daily — retail and dining hours vary by vendor', lastEntry:'',
    admission:'Free (public space) · Individual venue charges apply',
    tourOk:false, tourInfo:'Freely accessible as a public space. Part of the wider King\'s Cross regeneration. The adjacent Granary Square, Gasholders, and Lewis Cubitt Park are all within walking distance.',
    web:'https://coaldropsyard.com',
    transit:'Victoria Metropolitan Northern Piccadilly Circle Hammersmith → King\'s Cross St Pancras',
    walkFrom:'King\'s Cross Station: 8 min · St Pancras International: 8 min · Granary Square: 2 min',
    gmaps:'https://maps.google.com/?q=Coal+Drops+Yard+London',
    archdaily:'https://www.archdaily.com/903793/coal-drops-yard-heatherwick-studio',
    wiki:'https://en.wikipedia.org/wiki/Coal_Drops_Yard',
    tags:['Heatherwick Studio','Thomas Heatherwick','Adaptive Reuse','King\'s Cross','Retail','Victorian Heritage','Roof'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Coal_Drops_Yard_London_2018.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Coal_Drops_Yard_interior.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0020',
    name:'Rolling Bridge',
    cat:'Landmarks', cats:["Landmarks","Public","Infrastructure"], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Heatherwick Studio', archs:['Heatherwick Studio'],
    yr:2004, access:'Open to Public', style:'Contemporary',
    lat:51.5193, lng:-0.1841,
    addr:'Grand Union Canal, Paddington Basin, London W2 1LF', hood:'Paddington',
    desc:'The Rolling Bridge at Paddington Basin is one of Heatherwick Studio\'s earliest and most celebrated public works. Completed in 2004, it is a pedestrian footbridge that opens by curling up on itself into a compact octagonal shape, its eight sections folding together until the handrail touches the deck, then unrolling back into a straight 12-metre walkway. The mechanism is driven by a hydraulic system embedded in each segment\'s handrail, allowing the bridge to curl and uncurl smoothly in around five minutes. The bridge opens every Friday at noon to allow boats to pass. The project — conceived when Heatherwick was in his early thirties — established his studio\'s reputation for engineering ingenuity and kinetic public design, and won the Structural Steel Design Award in 2005.',
    hours:'Open permanently for pedestrians · Rolling mechanism: Fridays at noon (approx)', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'The bridge rolls up every Friday at approximately 12:00 PM. Paddington Basin is a pleasant waterside walk accessible from Paddington Station.',
    web:'https://heatherwick.com/projects/rolling-bridge',
    transit:'Bakerloo Circle District Hammersmith → Paddington',
    walkFrom:'Paddington Station: 5 min',
    gmaps:'https://maps.google.com/?q=Rolling+Bridge+Paddington+Basin+London',
    archdaily:'https://www.archdaily.com/tag/rolling-bridge',
    wiki:'https://en.wikipedia.org/wiki/Rolling_Bridge',
    tags:['Heatherwick Studio','Thomas Heatherwick','Bridge','Kinetic','Paddington','Public Art','Engineering'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rolling_Bridge_Paddington.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'lon-0021',
    name:'Google UK HQ (King\'s Cross)',
    cat:'Landmarks', cats:["Commercial","Landmarks"], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:["Contemporary","High-Tech"],
    era:'2000–Present', city:'london',
    arch:'Heatherwick Studio', archs:['Heatherwick Studio','BIG (Bjarke Ingels Group)'],
    yr:2024, access:'Open to Public', style:'Contemporary',
    lat:51.5358, lng:-0.1244,
    addr:'6 Handyside Street, London N1C 4DN', hood:'King\'s Cross',
    desc:'Google\'s new UK headquarters at King\'s Cross, completed in 2024, is a joint design by Heatherwick Studio and BIG (Bjarke Ingels Group). The 11-story, 100,000 sq m building occupies a prominent site adjacent to Regent\'s Canal and the King\'s Cross regeneration area. The facade is characterised by a bespoke interlocking pattern of aluminium fins that modulate solar gain while creating a dynamic, ever-changing surface depending on the angle of view and light. The building features a rooftop garden with a running track and swimming pool, and a publicly accessible ground-floor arcade. The project is one of the most anticipated contemporary buildings in London and a landmark of the ongoing transformation of King\'s Cross.',
    hours:'Ground-floor public space: daily · Offices: private', lastEntry:'',
    admission:'Public ground floor only · Office building',
    tourOk:false, tourInfo:'',
    web:'https://heatherwick.com/projects/google-hq',
    transit:'Victoria Metropolitan Northern Piccadilly Circle Hammersmith → King\'s Cross St Pancras',
    walkFrom:'King\'s Cross Station: 7 min · Coal Drops Yard: 3 min · Granary Square: 4 min',
    gmaps:'https://maps.google.com/?q=Google+HQ+Kings+Cross+London',
    archdaily:'https://www.archdaily.com/tag/google-hq-kings-cross',
    wiki:'https://en.wikipedia.org/wiki/Google_UK_headquarters',
    tags:['Heatherwick Studio','BIG','Google','King\'s Cross','Aluminium Fins','Rooftop Garden'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Google_Kings_Cross_HQ.jpg?width=800'
    ],
    drawings:[]
  },

  // ── TADAO ANDO — LONDON ──────────────────────────────────────

  {
    id:'lon-0022',
    name:'Lisson Gallery Bell Street',
    cat:'Cultural', cats:["Cultural","Commercial"], cc:'c-cul', styleGroup:'Contemporary', styleGroups:["Contemporary"],
    era:'2000–Present', city:'london',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:1992, access:'Free Admission', style:'Contemporary',
    lat:51.5228, lng:-0.1617,
    addr:'52–54 Bell Street, London NW1 5DA', hood:'Marylebone / Lisson Grove',
    desc:'The Lisson Gallery extension on Bell Street, designed by Tadao Ando and completed in 1992, is the architect\'s only built work in London and one of his earliest European commissions. Ando transformed a pair of Victorian terraced houses and an adjacent former dairy into a sequence of gallery spaces connected by his signature board-formed exposed concrete walls, punctuated by skylights that wash the surfaces in natural light. The intervention is characteristically understated — Ando retained the existing brick facades facing the street while replacing the interiors with pure geometric volumes in concrete. The Lisson Gallery, founded in 1967, is one of the world\'s leading contemporary art galleries, and the building remains a quiet landmark of Ando\'s material philosophy applied to the adaptive reuse of urban fabric.',
    hours:'Mon–Fri 10:00 AM – 6:00 PM · Sat 11:00 AM – 5:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'',
    web:'https://www.lissongallery.com',
    transit:'Bakerloo → Marylebone · Jubilee → Baker Street',
    walkFrom:'Marylebone Station: 8 min · Baker Street: 10 min',
    gmaps:'https://maps.google.com/?q=Lisson+Gallery+52+Bell+Street+London',
    archdaily:'https://www.archdaily.com/tag/lisson-gallery',
    wiki:'https://en.wikipedia.org/wiki/Lisson_Gallery',
    tags:['Tadao Ando','Gallery','Concrete','Marylebone','Adaptive Reuse','Contemporary Art'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lisson_Gallery_London_Ando.jpg?width=800'
    ],
    drawings:[]
  }

);
