/* ============================================================
   ArchWander — Tokyo Location Data
   Works by: Kenzo Tange · Toyo Ito · SANAA · Shigeru Ban ·
             Kengo Kuma · Sou Fujimoto · Fumihiko Maki ·
             Yoshio Taniguchi · Tadao Ando · Thomas Heatherwick
   Edit this file to add / modify Tokyo locations.
   ============================================================ */

var LOCS_TOKYO = [

  // ── KENZO TANGE ───────────────────────────────────────────────

  {
    id:'tok-0001',
    name:'Yoyogi National Gymnasium',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public',
    lat:35.6674867, lng:139.6989013,
    addr:'2-chōme-1-1 Jinnan, Shibuya, Tokyo', hood:'Shibuya / Harajuku',
    localName:'国立代々木競技場',
    localAddr:'東京都渋谷区神南2-1-1',
    localHood:'渋谷 / 原宿',
    desc: 'Completed in 1964 for the Tokyo Olympics, Kenzo Tange\'s Yoyogi National Gymnasium revolutionised sports architecture with the world\'s first double-cable suspension roof. Two monumental 40-metre towers anchor the structure, supporting massive cables that create a column-free interior. This geometric innovation combined functional elegance with technological daring. The sweeping roof curves evoke both ancient Japanese architecture and modernist vision. Important Cultural Property status (2021) reflects its watershed role in postwar Japanese design.',
    hours:'Exterior: 24/7 · Interior only during events', lastEntry:'',
    admission:'Free (exterior) · Event tickets for interior',
    tourOk:false, tourInfo:'The gymnasiums are operational sports facilities. The exterior and surrounding Yoyogi Park are freely accessible. Interior access during public sporting events.',
    transit:'Chiyoda → Harajuku (1 min walk)',
    walkFrom:'Harajuku Station: 2 min · Meiji Shrine: 5 min · Omotesando: 12 min',
    tags:['Kenzo Tange','1964 Olympics','Metabolism','Suspended Roof','Shibuya','National Monument'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi_National_Gymnasium_2013.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kokuritsu_Yoyogi_Ky%C5%8Dgij%C5%8D_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Da-iCE_MUSi-aM_10th_anniversary_arena_tour_2024%2C_at_Yoyogi_National_Stadium.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Found_Photo_-_Japan_-_Tokyo_-_Yoyogi_National_Stadium.tif_%2834176173641%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Yoyogi_National_Gymnasium.20191101.jpg?width=800'
    ]
  },

  {
    id:'tok-0002',
    name:'Tokyo Metropolitan Government Building',
    cc:'c-lmk',
    cats:['Landmarks'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1991, access:'Open to Public',
    lat:35.6889392, lng:139.6914165,
    addr:'2-chōme-8-1 Nishishinjuku, Shinjuku City, Tokyo', hood:'Nishi-Shinjuku',
    localName:'東京都庁舎',
    localAddr:'東京都新宿区西新宿2-8-1',
    localHood:'西新宿',
    desc: 'Tokyo\'s iconic Metropolitan Government Building (1991) by Kenzo Tange transforms Gothic cathedral aesthetics into high-rise form. Twin 243-metre towers crowned with tilted spires reference Notre-Dame, creating an unmistakable skyline landmark. The octagonal floor plan enables column-free 19.2-metre spans across 48 floors. Reflective glass and refined ornamentation represent Tange\'s late evolution toward decorative modernism, while monumental atrium and public spaces evoke civic grandeur.',
    hours:'North Observatory: Tue–Sun 9AM–10:30PM · South Observatory: daily 9AM–10:30PM', lastEntry:'10:30 PM',
    admission:'Free',
    tourOk:true, tourInfo:'Both observatories are free to access. The North Tower has evening views until 10:30PM. Guided tours of the Metropolitan Assembly Hall available (Japanese only).',
    transit:'Oedo Marunouchi → Tochomae (3 min)',
    walkFrom:'Shinjuku Station West Exit: 10 min · Shinjuku Park Tower (Gehry): 5 min',
    tags:['Kenzo Tange','Observatory','Free','Government','Shinjuku','Twin Tower','Panoramic View'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Government_Building_Morning1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Government_Building_2012.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Projection_show_at_the_Tokyo_Metropolitan_Government_Building.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Westward_view_from_Tokyo_Metropolitan_Government_Building_2024-09-05.jpg?width=800'
    ]
  },

  {
    id:'tok-0003',
    name:'St. Mary\'s Cathedral Tokyo',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public',
    lat:35.7141917, lng:139.7264929,
    addr:'3-chōme-16-15 Sekiguchi, Bunkyo City, Tokyo', hood:'Bunkyo / Sekiguchi',
    localName:'聖マリア大聖堂',
    localAddr:'東京都文京区関口3-16-15',
    localHood:'文京 / 関口',
    desc: 'Kenzo Tange\'s 1964 St. Mary\'s Cathedral remains an architectural manifesto in concrete. Eight hyperbolic paraboloid shell surfaces intersect to form a dramatic cross, their stainless steel cladding catching light like a sacred vessel. This geometric abstraction achieves spiritual grandeur through pure structural logic, the shells rising without traditional supports. The cathedral\'s material honesty of exposed concrete meeting polished metal reflects postwar Japanese modernism\'s spiritual dimension.',
    hours:'Mon–Sat 10AM–6PM · Sun 1PM–4PM', lastEntry:'',
    admission:'Free · Donations welcome',
    tourOk:false, tourInfo:'Visitors are welcome during opening hours. Organ concerts and services held regularly.',
    transit:'Yurakucho → Edogawabashi (7 min walk)',
    walkFrom:'Edogawabashi Station: 7 min',
    tags:['Kenzo Tange','Cathedral','Hyperbolic Paraboloid','Stainless Steel','Bunkyo','Religious'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/20030702_2_July_2003_Tokyo_Cathedorale_1_Tange_Kenzou_Sekiguchi_Tokyo_Japan_b.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_St._Mary%27s_Cathedral%2C_Tokyo_3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_St._Mary%27s_Cathedral%2C_Tokyo_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/20030702_2_July_2003_Tokyo_Cathedorale_4_Tange_Kenzou_Sekiguchi_Tokyo_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/20030702_2_July_2003_Tokyo_Cathedorale_door_Tange_Kenzou_Sekiguchi_Tokyo_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/20030702_2_July_2003_Tokyo_Cathedorale_Metal_1_Tange_Kenzou_Sekiguchi_Tokyo_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/StMary%27sCathedral-Tokyo-01.jpg?width=800'
    ]
  },

  // ── TOYO ITO ──────────────────────────────────────────────────

  {
    id:'tok-0004',
    name:'Tod\'s Omotesando Building',
    cc:'c-lmk',
    cats:['Landmarks','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2004, access:'Open to Public',
    lat:35.6659248, lng:139.7101451,
    addr:'5-1-5 Jingumae, Shibuya-ku, Tokyo', hood:'Omotesando',
    localName:'TOD\'S表参道ビル',
    localAddr:'東京都中央区銀座7-16-16',
    localHood:'銀座',
    desc: 'Toyo Ito\'s TOD\'S Omotesando (2004) grafts natural imagery onto urban commerce through innovative material expression. Nine tree silhouettes distilled from Omotesando\'s famous zelkova canopy generate six facades from 30cm-thick reinforced concrete. The complex pattern emerges through structural discipline: forces flow organically through the material, unifying skin and skeleton. Seamless glass connections create prismatic transparency, synthesising Ito\'s philosophy of drawing parametric complexity from nature.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a luxury retail store. The building exterior and ground floor are viewable at all times. Interior is the Tod\'s boutique.',
    transit:'Ginza Hanzomon → Omotesando (Exit A2, 3 min)',
    walkFrom:'Prada Omotesando (Herzog & de Meuron): 3 min · Omotesando Hills (Ando): 2 min',
    tags:['Toyo Ito','Omotesando','Concrete Tree Structure','Retail','Facade','Shibuya'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/%E3%83%92%E3%83%A5%E3%83%BC%E3%82%B4%E3%83%9C%E3%82%B9%E8%A1%A8%E5%8F%82%E9%81%93%E5%BA%97_May_30%2C_2019.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tod%27s_at_Omotesando.jpg?width=800'
    ]
  },

  {
    id:'tok-0005',
    name:'Mikimoto Ginza 2',
    cc:'c-lmk',
    cats:['Landmarks'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2005, access:'Open to Public',
    lat:35.6737659, lng:139.7659374,
    addr:'Japan, 〒104-8145 Tokyo, Chuo City, Ginza, 2-chōme−4−１２ MIKIMOTO Ginza 2', hood:'Ginza',
    localName:'ミキモト銀座2',
    localAddr:'東京都中央区銀座4-5-5',
    localHood:'銀座',
    desc: 'Toyo Ito\'s Mikimoto Ginza 2 (2005) treats a luxury flagship as a sculptural jewel. The nine-story seamless facade of pearl-white welded steel panels mirrors Mikimoto\'s identity. Ultra-thin 20cm exterior walls function structurally while serving as finish, with welds ground smooth and finished in pearl pink. Factory-assembled panels achieve seamless continuity impossible in traditional systems, integrating structural rationality with gemlike beauty.',
    hours:'Mon–Sun 11:00 AM – 7:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Mikimoto jewellery boutique.',
    transit:'Ginza Marunouchi Hibiya → Ginza (Exit B4, 2 min)',
    walkFrom:'Ginza Six: 3 min · Chanel Ginza (Peter Marino): 3 min',
    tags:['Toyo Ito','Ginza','Perforated Steel','Retail','Structural Facade','Pink'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mikimoto_Ginza2.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_2010_1000000379_1_%285372872502%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Le_magasin_Mikimoto_Ginza_2_%28Tokyo%2C_Japon%29_%2841990094114%29.jpg?width=800'
    ]
  },

  // ── SANAA ─────────────────────────────────────────────────────

  {
    id:'tok-0006',
    name:'Dior Omotesando',
    cc:'c-lmk',
    cats:['Landmarks','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'SANAA', archs:['SANAA','Kazuyo Sejima','Ryue Nishizawa'],
    yr:2003, access:'Open to Public',
    lat:35.6673417, lng:139.7072622,
    addr:'5-chōme-9-11 Jingūmae, Shibuya, Tokyo', hood:'Minami-Aoyama / Omotesando',
    localName:'ディオール表参道',
    localAddr:'東京都港区南青山5-9-11',
    localHood:'南青山 / 表参道',
    desc: 'SANAA\'s Dior Omotesando (2003) dissolves the boundary between fashion and architecture through translucent materiality. Double-layered acrylic-glass facade creates undulating, drapery-like appearance as though the building itself is draped like a Dior gown. Curved acrylic panels interact with external light creating ethereal shimmer. The 30-metre fully-glazed facade achieves paradoxical transparency where opacity transforms into depth. Eight apparent stories emerge from four physical floors through cascading visual layers.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Dior flagship boutique.',
    transit:'Ginza Hanzomon → Omotesando (Exit A5)',
    walkFrom:'Tod\'s Omotesando: 5 min · Prada Aoyama: 2 min',
    tags:['SANAA','Kazuyo Sejima','Ryue Nishizawa','Omotesando','Acrylic Curtain Wall','Retail','Transparent'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Christian_Dior_Omotesando_Tokyo_2016.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Le_magasin_Dior_Omotesando_%28Tokyo%29_%2842066222724%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Christian_Dior_Omotesando_Tokyo_2015.JPG?width=800'
    ]
  },


  // ── SHIGERU BAN ───────────────────────────────────────────────

  {
    id:'tok-0007',
    name:'Curtain Wall House',
    cc:'c-res',
    cats:['Residential','Retail'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:1995, access:'Exterior Only',
    lat:35.7549646, lng:139.7021549,
    addr:'18-5 Sakaechō, Itabashi City, Tokyo', hood:'Itabashi',
    localName:'カーテンウォール・ハウス',
    localAddr:'東京都渋谷区神宮前',
    localHood:'渋谷 / 神宮前',
    desc: 'Shigeru Ban\'s Curtain Wall House (1995) pioneers flexible urban domestic space through radical simplicity. Terrace and interior connect via operable glass doors while vinyl curtains at roof edge control privacy and light. The three-story steel frame responds to the client\'s nostalgia for pre-modern Japanese home flexibility. The curtain becomes architectural mediator: neither permanent wall nor total transparency but adaptive threshold. Winner of the 1996 Yoshioka Prize.',
    hours:'Private residence · Exterior viewable from street', lastEntry:'',
    admission:'Private residential building',
    tourOk:false, tourInfo:'Private residence, not open to visitors. Exterior viewable from the street.',
    transit:'Multiple lines → Itabashi-ku area',
    walkFrom:'',
    tags:['Shigeru Ban','Curtain Wall','Residential','Transparent','Itabashi','Fabric Facade'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shigeru_Ban_Curtain_Wall_House.jpg?width=800'
    ]
  },

  {
    id:'tok-0008',
    name:'Nicolas G. Hayek Center',
    cc:'c-lmk',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:2007, access:'Open to Public',
    lat:35.6689576, lng:139.763065,
    addr:'7 Chome-9-18 Ginza, Chuo City, Tokyo 104-0061, Japan', hood:'Ginza',
    localName:'ニコラス・G・ハイエックセンター',
    localAddr:'長野県北佐久郡軽井沢町長倉',
    localHood:'軽井沢',
    desc: 'Shigeru Ban\'s Nicolas G. Hayek Center (2007) transforms corporate branding into architectural spectacle in Ginza. The fourteen-story facade features mechanised glass shutters spanning floor-to-ceiling, rendering the building as transformable \'machine\' open to street perception. Four-layer atrium wall gardens create living facades, while the central \'Avenue of Time\' penetrates ground to basement connecting civic street to underground galleries. Corporate restraint yields to playful public engagement.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Swatch Group multi-brand boutique.',
    transit:'Ginza Marunouchi Hibiya → Ginza (Exit C2)',
    walkFrom:'Mikimoto Ginza 2 (Ito): 2 min · Chanel Ginza: 3 min',
    tags:['Shigeru Ban','Ginza','Sliding Facade','Green Wall','Retail','Swatch','Transparency'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nicolas_G._Hayek_Center_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nicolas_G._Hayek_Center_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Le_%22Nicolas_G._Hayek_Center%22_%28Tokyo%2C_Japon%29_%2828825954958%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Le_centre_Nicolas_G._Hayek_%28Tokyo%2C_Japon%29_%2842700044401%29.jpg?width=800'
    ]
  },

  // ── KENGO KUMA ────────────────────────────────────────────────

  {
    id:'tok-0009',
    name:'Nezu Museum',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2009, access:'Paid Ticket',
    lat:35.6619412, lng:139.717499,
    addr:'6-chōme-5-1 Minamiaoyama, Minato City, Tokyo', hood:'Minami-Aoyama / Omotesando',
    localName:'根津美術館',
    localAddr:'東京都渋谷区神宮前6-32-2',
    localHood:'渋谷 / 神宮前',
    desc: 'Kengo Kuma\'s Nezu Museum (2009) embodies \'material minimalism\' through refined spatial composition. Timber louvers and stone carefully mediate between formal art spaces and intimate garden courts. The two-story structure respects site topography while maximising gallery volume. Bamboo-screened northern approach sequences entry ceremonially. Roof thinness through structural innovation achieves lightness matching the surrounding landscape, where modesty becomes profound and material honesty becomes spiritual presence.',
    hours:'Tue–Sun 10:00 AM – 5:00 PM · Closed Monday', lastEntry:'4:30 PM',
    admission:'Adults ¥1,300 · University students ¥1,000 · Under 15 free',
    tourOk:true, tourInfo:'Museum audio guides available (Japanese and English). The garden and tea houses are open to all ticket holders. The café with garden views is popular.',
    transit:'Ginza Hanzomon → Omotesando (Exit A5, 8 min)',
    walkFrom:'Dior Omotesando (SANAA): 3 min · Prada Aoyama: 5 min',
    tags:['Kengo Kuma','Museum','Japanese Art','Bamboo Roof','Garden','Minami-Aoyama','Tea House'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_museum_entrance_tokyo_2014.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_Garten-20091020-RM-112901.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_Laterne-20091020-RM-113122.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_Garten-20091020-RM-115433.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_Garten-20091020-RM-113550.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_P5091729.jpg?width=800'
    ]
  },

  {
    id:'tok-0010',
    name:'Asakusa Culture Tourist Information Center',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2012, access:'Free Admission',
    lat:35.7106517, lng:139.7965387,
    addr:'Japan, 〒111-0034 Tokyo, Taito City, Kaminarimon, 2-chōme−18−９ 浅草文化観光センタ', hood:'Asakusa',
    localName:'浅草文化観光センター',
    localAddr:'東京都港区南青山6-5-1',
    localHood:'南青山',
    desc: 'Kengo Kuma\'s Asakusa Cultural Tourism Center (2012) reimagines tall buildings through Edo townhouse typology. Seven layers of wooden cedar louver-clad cubic forms stacked asymmetrically evoke \'layered single-story architecture.\' Ground-floor transparency connects Asakusa street to multilevel interior. Each level varies height, roof angle, and character, preventing monotonous verticality. The free eighth-floor observation terrace overlooks Thunder Gate, proving contemporary tall buildings can embrace local vernacular.',
    hours:'Daily 9:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'The center has free maps, guides, and multilingual tourism information. The rooftop terrace offers direct views of the Kaminarimon Gate and Sensoji.',
    transit:'Ginza → Asakusa (2 min walk)',
    walkFrom:'Kaminarimon Gate: 1 min · Sensoji Temple: 3 min · Nakamise Shopping Street: 2 min',
    tags:['Kengo Kuma','Asakusa','Stacked Roofs','Tourist Center','Traditional','Wood','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Culture_Tourist_Information_Center_dllu.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Culture_Tourist_Information_Center_%40_Asakusa_%2811752068094%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Culture_Tourism_Center.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Culture_Tourist_Information_Center_%2853081289999%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0011',
    name:'Japan National Stadium (Olympic Stadium)',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2019, access:'Paid Ticket',
    lat:35.6794449, lng:139.7142888,
    addr:'10-1 Kasumigaokamachi, Shinjuku City, Tokyo', hood:'Gaienmae / Shinjuku',
    localName:'国立競技場',
    localAddr:'広島県広島市中区中島町1-2',
    localHood:'広島 / 平和公園',
    desc: 'Kengo Kuma\'s Japan National Stadium (2019) culminates his philosophy of \'forest architecture.\' Nationwide wood from 47 prefectures frames the roof soffit as poetic unity across regional diversity. Modest 47-metre height avoids visual domination, allowing horizontal \'breathing\' compatible with Meiji Shrine\'s sacred forest. Double-layered timber eaves express structural honesty through material warmth. Kuma\'s vision, influenced by seeing Tange\'s 1964 Yoyogi Gymnasium as a youth, achieves joyous democracy through elemental simplicity.',
    hours:'Stadium tours: daily 10AM–4PM (tours depart hourly) · Event hours vary', lastEntry:'',
    admission:'Stadium tour: Adults ¥1,000 · Under 6 free',
    tourOk:true, tourInfo:'Guided stadium tours available in Japanese and English. Tours include the field, locker rooms, and VIP areas. Event tickets sold separately.',
    transit:'Ginza Hanzomon → Gaienmae (10 min walk)',
    walkFrom:'Meiji Jingu Gaien: 3 min · Yoyogi National Gymnasium (Tange): 10 min',
    tags:['Kengo Kuma','Olympic Stadium','Wood Louvres','2020 Olympics','Shinjuku','National Stadium'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/View_of_the_new_National_Stadium_for_the_Olympics_%2849376747462%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/New_national_stadium_tokyo_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_National_Stadium_Tokyo_2020_Olympics_%2851481561365%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Olympic_Stadium_%2814151170157%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_National_Stadium_2024_1.jpg?width=800'
    ]
  },

  // ── SOU FUJIMOTO ──────────────────────────────────────────────

  {
    id:'tok-0012',
    name:'House NA',
    cc:'c-res',
    cats:['Residential','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2011, access:'Exterior Only',
    lat:35.6610141, lng:139.7218249,
    addr:'2-chōme-24-7 Nishiazabu, Minato City, Tokyo', hood:'Nerima',
    localName:'ハウスNA',
    localAddr:'東京都世田谷区',
    localHood:'世田谷',
    desc: 'Sou Fujimoto\'s House NA (2011) deconstructs dwelling into spatial poetry through nested transparent boxes. Three layered volumes create paradoxical privacy: external transparency obscures interior dwelling while interior opens toward garden courtyards. Floor-to-ceiling glazing defies conventional domestic boundaries, with inhabitants immersed in transitional zones. Fujimoto\'s minimalist vocabulary of pure geometry, glass, and void creates spatial ambiguity enriching lived experience, articulating home as permeable threshold rather than enclosed sanctuary.',
    hours:'Private residence · Exterior viewable from street', lastEntry:'',
    admission:'Private residential building',
    tourOk:false, tourInfo:'Private home, not open to visitors.',
    transit:'Seibu Ikebukuro Line → Nerima area',
    walkFrom:'',
    tags:['Sou Fujimoto','Residential','Glass','Transparent','Platforms','Nerima','Radical'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/House_NA_Sou_Fujimoto.jpg?width=800'
    ]
  },

  {
    id:'tok-0013',
    name:'Musashino Art University Museum & Library',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2010, access:'Open to Public',
    lat:35.7261162, lng:139.4483158,
    addr:'1-chōme-736 Ogawachō, Kodaira, Tokyo', hood:'Kodaira (Greater Tokyo)',
    localName:'武蔵野美術大学 美術館・図書館',
    localAddr:'岡山県倉敷市本町7-12',
    localHood:'倉敷',
    desc: 'Sou Fujimoto\'s Musashino Art University Museum & Library (2010) spirals thought through space via a monumental bookshelf wall descending through both levels. The architect conceived \'searchability\' and \'strollability\' allowing serendipitous discovery through visible circulation. Shelves organise radially by classification enabling sightlines across multiple openings. Glass with reflective film mirrors surrounding trees. The \'forest of books\' transforms library design into architectural meditation on how spatial experience shapes learning.',
    hours:'Mon–Sat 10:00 AM – 6:00 PM · Closed Sunday', lastEntry:'5:30 PM',
    admission:'Free',
    tourOk:false, tourInfo:'Open to the public during university opening hours.',
    transit:'JR Chuo Line → Kokubunji or Higashi-Koganei (15 min bus)',
    walkFrom:'',
    tags:['Sou Fujimoto','Library','Museum','Spiral Bookshelves','University','Kodaira','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Musashino_Art_University_Library.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Musashino_library_interior.jpg?width=800'
    ]
  },

  // ── FUMIHIKO MAKI ─────────────────────────────────────────────

  {
    id:'tok-0014',
    name:'Spiral (Wacoal Art Center)',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1985, access:'Open to Public',
    lat:35.6635795, lng:139.7117609,
    addr:'5-chōme-6-23 Minamiaoyama, Minato City, Tokyo', hood:'Minami-Aoyama / Omotesando',
    localName:'スパイラル',
    localAddr:'静岡県浜松市中区中央3-9-1',
    localHood:'浜松',
    desc: 'Fumihiko Maki\'s Spiral (Wacoal Art Center, 1985) pioneers postmodern spatial complexity through collage aesthetics. Nine stories spiral downward through sculptural atria with interior ramps creating fluid circulation. Aluminium panels, glass, and metallic tiles compose the sharp exterior; within, the spiral becomes exhibition framework, cafe landscape, and gathering space unified by diagonal sight lines. Maki\'s geometric vocabulary of squares, circles, and cones creates dynamic visual rhythm.',
    hours:'Daily 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (gallery and café) · Event spaces ticketed',
    tourOk:false, tourInfo:'The ground-floor gallery, café, and atrium spiral ramp are freely accessible. Upper-floor events ticketed separately.',
    transit:'Ginza Hanzomon → Omotesando (Exit B1, 3 min)',
    walkFrom:'Nezu Museum (Kuma): 2 min · Omotesando Hills (Ando): 5 min',
    tags:['Fumihiko Maki','Art Center','Gallery','Minami-Aoyama','Collage Facade','Urban','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Spiral_Building_interior_2024.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Spiral_house_Tokyo.jpg?width=800'
    ]
  },

  {
    id:'tok-0015',
    name:'Hillside Terrace',
    cc:'c-lmk',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1992, access:'Open to Public',
    lat:35.6485903, lng:139.7005109,
    addr:'18-8 Sarugakuchō, Shibuya, Tokyo', hood:'Daikanyama',
    localName:'ヒルサイドテラス',
    localAddr:'岡山県高梧市',
    localHood:'高梧',
    desc: 'Fumihiko Maki\'s Hillside Terrace (1967-1998) represents 30 years of urban village design through sensitive incremental development. Respecting Daikanyama\'s forested topography, Maki\'s masterplan fragments a large site into human-scaled buildings connected by unified aesthetic language: warm materials, scaled proportions, generous pedestrian pathways. Cultural venues, residences, and retail create urban vitality, proving that authentic urbanism emerges through patient consistency rather than singular gesture.',
    hours:'Shops and gallery: daily 11AM–7PM · Public spaces 24/7', lastEntry:'',
    admission:'Free (public spaces and galleries)',
    tourOk:false, tourInfo:'The complex is freely walkable and mixed-use. Daikanyama as a neighbourhood is best explored on foot. The Tsutaya Books (Klein Dytham) nearby is also worth visiting.',
    transit:'Tokyu Toyoko → Daikanyama (3 min walk)',
    walkFrom:'Daikanyama T-Site (Tsutaya): 3 min · Log Road Daikanyama: 5 min',
    tags:['Fumihiko Maki','Daikanyama','Mixed-Use','Urban Quarter','Incremental','Shibuya','Low-rise'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace_C_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace%2C_Building_C_20241020_%28III%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace%2C_Building_C_20241020_%28II%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace%2C_Building_C_20241020.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace_D_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace_A_B_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace_C.jpg?width=800'
    ]
  },

  // ── YOSHIO TANIGUCHI ──────────────────────────────────────────

  {
    id:'tok-0016',
    name:'Gallery of Hōryū-ji Treasures',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Yoshio Taniguchi', archs:['Yoshio Taniguchi'],
    yr:1999, access:'Paid Ticket',
    lat:35.72012110000001, lng:139.7765754,
    addr:'13-9 Uenokōen, Taito City, Tokyo', hood:'Ueno',
    localName:'法隆寺宝物館',
    localAddr:'東京都目黒区中目黒1-1-26',
    localHood:'中目黒',
    desc: 'Yoshio Taniguchi\'s Gallery of Horyuji Treasures (1999) creates meditative sanctity through austere material expression. Three compositional elements establish spatial logic through phenomenological clarity: reinforced concrete walls contain ancient Buddhist treasures within hushed darkness while expansive glazing connects to landscape pools. Light modulation becomes principal design tool. The architectural experience honours art without competing, with monastic restraint creating silence, order, and refinement.',
    hours:'Tue–Sun 9:30 AM – 5:00 PM (Fri–Sat to 9:00 PM) · Closed Monday', lastEntry:'30 min before closing',
    admission:'General: ¥1,000 (includes all Tokyo National Museum galleries)',
    tourOk:true, tourInfo:'Free English audio guides. The building is part of the Tokyo National Museum campus — also visit the main Honkan building and the Heiseikan.',
    transit:'Multiple → Ueno (10 min walk through park)',
    walkFrom:'Tokyo National Museum main entrance: 5 min · Ueno Zoo: 5 min',
    tags:['Yoshio Taniguchi','Museum','Buddhist Art','Hōryū-ji','Ueno','Minimalism','Reflecting Pool'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_The_Gallery_of_Horyuji_Treasures_02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_The_Gallery_of_Horyuji_Treasures_03.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_The_Gallery_of_Horyuji_Treasures_04.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_National_Museum_The_Gallery_of_Horyuji_Treasures_%2852504277325%29.jpg?width=800'
    ]
  },

  // ── TADAO ANDO — TOKYO ────────────────────────────────────────

  {
    id:'tok-0017',
    name:'Omotesando Hills',
    cc:'c-lmk',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2006, access:'Open to Public',
    lat:35.6673273, lng:139.708663,
    addr:'4-chōme-12-10 Jingūmae, Shibuya, Tokyo', hood:'Omotesando',
    localName:'表参道ヒルズ',
    localAddr:'東京都渋谷区代官山町20-11',
    localHood:'代官山',
    desc: 'Tadao Ando\'s Omotesando Hills (2006) synthesises commercial spectacle with urban restraint through subterranean strategy. The signature spiral ramp matching Omotesando\'s slope establishes second street, integrating structure into existing hierarchy. Ando suppressed building height despite 100-shop programme, embedding volume beneath grade. Skylights modulate light within underground commerce while zelkova trees frame facade edges. Market architecture achieves nobility through material honesty and spatial generosity.',
    hours:'Shopping: Mon–Sun 11:00 AM – 11:00 PM · Restaurants: 11AM–11:30PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible. The interior spiral ramp atrium is the main spatial experience. The preserved Dojunkai Apartment wing at the west end is worth observing.',
    transit:'Ginza Hanzomon → Omotesando (Exit A2, 1 min)',
    walkFrom:'Tod\'s Omotesando (Ito): 2 min · Prada Aoyama (Herzog & de Meuron): 5 min · Dior (SANAA): 5 min',
    tags:['Tadao Ando','Omotesando','Concrete','Spiral Atrium','Retail','Mixed-Use','Shibuya'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando_Hills_2012.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando_Hills%2C_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/L%27int%C3%A9rieur_du_centre_commercial_Omotesando_Hills_%28Tokyo%2C_Japon%29_%2841893745325%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotemall.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando-Tokyo---2024-07-05_04.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando_Hills_Disney_Dream_Christmas_Illumination_2012_%288317268953%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/%E8%A1%A8%E5%8F%83%E9%81%93%E4%B9%8B%E4%B8%98_%2816201488181%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0018',
    name:'21_21 Design Sight',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2007, access:'Paid Ticket',
    lat:35.6672495, lng:139.7304848,
    addr:'Japan, 〒107-0052 Tokyo, Minato City, Akasaka, 9-chōme−7−６ 東京ミッドタウン ミッドタウン・ガーデン', hood:'Roppongi / Tokyo Midtown',
    localName:'21_21 DESIGN SIGHT',
    localAddr:'東京都江東区豊洲3-2-20',
    localHood:'豊洲',
    desc: 'Tadao Ando\'s 21_21 DESIGN SIGHT (2007) manifests Issey Miyake\'s \'single cloth\' philosophy through folded steel plate architecture. The distinctive roof descends from sky toward earth like a decisive sheet of metal. Underground galleries exploit natural light through skylights and sunken courtyard. Ando\'s use of giant single-piece iron showcases Japanese technological mastery while achieving humility through material restraint. This museum proves design sanctity emerges through structural honesty.',
    hours:'Tue–Sun 10:00 AM – 7:00 PM · Closed Monday (Tue if Mon is public holiday)', lastEntry:'6:30 PM',
    admission:'Adults ¥1,400 · Students ¥800 · Under 15 free',
    tourOk:true, tourInfo:'Curated temporary design exhibitions rotate 2–3 times per year. The garden and exterior are freely accessible in the Midtown park. The annual "design sight" programme features talks and events.',
    transit:'Hibiya Oedo → Roppongi (Exit 8, 5 min)',
    walkFrom:'National Art Center (Kurokawa): 5 min · Mori Art Museum: 5 min · Suntory Museum of Art: 2 min',
    tags:['Tadao Ando','Design Museum','Roppongi','Tokyo Midtown','Steel Roof','Underground','Issey Miyake'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Site2121.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_DESIGN_SIGHT.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_DESIGN_SIGHT_2018-3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_DESIGN_SIGHT_Interior_2015.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_DESIGN_SIGHT_Gift_shop_2018.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_DESIGN_SIGHT%E6%A8%A1%E5%9E%8B.jpg?width=800'
    ]
  },

  {
    id:'tok-0019',
    name:'LA COLLEZIONE',
    cc:'c-lmk',
    cats:['Landmarks','Skyscrapers'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:1989, access:'Open to Public',
    lat:35.6625759, lng:139.71631299999999,
    addr:'Japan, 〒107-0062 Tokyo, Minato City, Minamiaoyama, 6-chōme−1−３ コレッツィオーネビル', hood:'Minami-Aoyama',
    localName:'コレッツィオーネ',
    localAddr:'東京都千代田区丸の内',
    localHood:'丸の内',
    desc: 'Tadao Ando\'s LA COLLEZIONE (1989) establishes commercial architecture through geometric purity and spatial generosity. Three rectangular volumes and a cylindrical tower organise on a 6.15-metre grid, their intersection creating dynamic urban threshold. Subterranean strategy extends to three basement levels with skylights ensuring daylight penetration. Ando\'s geometric clarity and material economy create timeless retail framework, showing how commercial architecture can age gracefully.',
    hours:'Daily 11:00 AM – 8:00 PM (retail/restaurant hours)', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a retail and dining complex.',
    transit:'Ginza Hanzomon → Omotesando (Exit B1, 5 min)',
    walkFrom:'Nezu Museum (Kuma): 3 min · Spiral (Maki): 5 min',
    tags:['Tadao Ando','Concrete','Minami-Aoyama','Retail','Cylindrical','Atrium','1989'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/La_Collezione_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/La_Collezione_3.jpg?width=800'
    ]
  },

  // ── KISHO KUROKAWA ─────────────────────────────────────────────

  {
    id:'tok-0020',
    name:'Nakagin Capsule Tower',
    cc:'c-his',
    cats:['Historic'],
    styleGroups:['Modernist'],
    era:'1970–1999', city:'tokyo',
    arch:'Kisho Kurokawa', archs:['Kisho Kurokawa'],
    yr:1972, access:'Open to Public',
    lat:35.6656763, lng:139.7634251,
    addr:'8-chōme-16-10 Ginza, Chuo City, Tokyo', hood:'Shimbashi / Ginza',
    localName:'中銀カプセルタワービル',
    localAddr:'東京都新宿区',
    localHood:'新宿',
    desc: 'Kisho Kurokawa\'s Nakagin Capsule Tower (1972) manifests Metabolism\'s utopian vision through modular dwelling capsules. 140 prefabricated units replaceable every 25 years cluster around two central concrete shafts. Windowless steel capsules of 2.3 by 4 by 2.1 metres contain sleeping, working, and bathing zones in miniature efficiency. Though inhabited for 50 years, replacement never occurred. Demolished 2022, preserved capsules now reside in museums worldwide as memorials to 1970s Japanese futurism\'s audacious dreams.',
    hours:'Site demolished (April 2022). Preserved capsules on display at various museums worldwide.', lastEntry:'',
    admission:'N/A (site only)',
    tourOk:false, tourInfo:'The building was demolished in 2022. The site is accessible. Preserved capsules are exhibited at MoMA (New York), M+ (Hong Kong), and Japanese venues.',
    transit:'JR Yamanote / Tokaido → Shimbashi (5 min walk); Ginza Line → Shimbashi (4 min walk)',
    walkFrom:'Shiodome (Nihon TV Tower): 5 min · Ginza district: 8 min',
    tags:['Kisho Kurokawa','Metabolism','Capsule','Prefab','Demolished','Shimbashi','Icon','1972'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_%2851473998263%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_%2851474105123%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_03.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_%2851473893286%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin_Capsule_Tower_%2851473917286%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0021',
    name:'National Art Center Tokyo',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kisho Kurokawa', archs:['Kisho Kurokawa'],
    yr:2007, access:'Open to Public',
    lat:35.6644852, lng:139.7266474,
    addr:'7-chōme-22-2 Roppongi, Minato City, Tokyo', hood:'Roppongi',
    localName:'国立新美術館',
    localAddr:'京都府京都市東山区',
    localHood:'京都 / 東山',
    desc: 'Kisho Kurokawa\'s National Art Center Tokyo (2007) expresses naturalistic biomimicry through undulating glass curtain wall. The three-dimensionally curved glass creates intermediate zones between interior and forest landscape. The concept of \'museum within a forest\' employs parametric glass complexity to dissolve architectural boundaries. Named Kurokawa\'s final museum before his death in 2007, this building crystallises his lifelong vision of communion between contemporary architecture and organic environment.',
    hours:'Wed–Mon 10:00–18:00 (Fri–Sat until 20:00). Closed Tue.', lastEntry:'30 min before closing',
    admission:'Free (galleries may charge for exhibitions)',
    tourOk:false, tourInfo:'The building is freely accessible. Individual exhibitions may require tickets.',
    transit:'Chiyoda → Nogizaka (Exit 6, directly connected); Hibiya / Oedo → Roppongi (7 min walk)',
    walkFrom:'21_21 Design Sight (Ando): 8 min · Mori Art Museum: 10 min',
    tags:['Kisho Kurokawa','Roppongi','Glass Facade','Exhibition','Museum','2007','National'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_National_Art_Center%2C_Tokyo_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_National_Art_Center_%2C_Tokyo_-_panoramio_%281%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Art_Center%2C_Tokyo_-_DSC06720.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Art_Center_%40_Tokyo_%2811495419793%29.jpg?width=800'
    ]
  },

  // ── KUNIO MAEKAWA ───────────────────────────────────────────────

  {
    id:'tok-0022',
    name:'Tokyo Bunka Kaikan',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kunio Maekawa', archs:['Kunio Maekawa'],
    yr:1961, access:'Open to Public',
    lat:35.7136701, lng:139.7760319,
    addr:'5-45 Uenokōen, Taito City, Tokyo', hood:'Ueno',
    localName:'東京文化会館',
    localAddr:'東京都江東区',
    localHood:'江東',
    desc: 'Kunio Maekawa\'s Tokyo Bunka Kaikan (1961) achieves civic monumentality through sculptural concrete. Maekawa\'s studies under Le Corbusier manifest in dramatic geometric forms with the projecting cantilever roof sweeping skyward. Interior spatial hierarchy establishes grand foyer beneath starlit sky ceiling, then descent to symphony hall with acoustically calibrated chamber. Bold colour sophistication enlivens interior experience, synthesising Le Corbusian form-making with Japanese material sensibility.',
    hours:'Lobby: open on performance days. Box office: 10:00–18:00 (closed Mon unless event).', lastEntry:'',
    admission:'Varies by event',
    tourOk:false, tourInfo:'The lobby and exterior are freely accessible on performance days. Interior tours not regularly offered.',
    transit:'JR Yamanote / Keihin-Tohoku → Ueno (Park Exit, 5 min walk)',
    walkFrom:'Tokyo National Museum: 5 min · Shinobazu Pond: 8 min',
    tags:['Kunio Maekawa','Ueno','Concert Hall','Brutalism','Japanese Modernism','Le Corbusier','1961','Important Cultural Property'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Wongwt_%E4%B8%8A%E9%87%8E%E5%85%AC%E5%9C%92_%2817284237285%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Bunka_Kaikan_kort_na_de_voorstelling_%E2%80%98Romeo_en_Julia%E2%80%99_van_het_Royal_Ballet%2C_-2_juli_2023_17%EF%BC%9A11.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Wongwt_%E6%9D%B1%E4%BA%AC%E6%96%87%E5%8C%96%E6%9C%83%E9%A4%A8_%2817098044799%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Ueno_20241013_171445.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Bunka_Kaikan_2006_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/View_of_Shibuya_circa_1960.jpg?width=800'
    ]
  },

  // ── JUNZO SAKAKURA ──────────────────────────────────────────────

  // ── JUNZO YOSHIMURA ─────────────────────────────────────────────

  {
    id:'tok-0024',
    name:'International House of Japan',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Junzo Yoshimura, Junzo Sakakura & Kunio Maekawa', archs:['Junzo Yoshimura','Junzo Sakakura','Kunio Maekawa'],
    yr:1955, access:'Open to Public',
    lat:35.6585198, lng:139.7334457,
    addr:'Japan, 〒106-0032 Tokyo, Minato City, Roppongi, 5-chōme−11−１６ 国際文化会館', hood:'Roppongi',
    localName:'国際文化会館',
    localAddr:'台北市中山区',
    localHood:'台北',
    desc: 'International House of Japan (1955) represents three titans of Japanese postwar modernism: Kunio Maekawa, Junzo Sakakura, and Junzo Yoshimura collaborating under Le Corbusier\'s philosophical inheritance. Completed ten years after the Pacific War, the project symbolised Japan\'s reconstruction through diplomatic engagement. The registered tangible cultural property preserves modernist principles of material honesty, functional clarity, and human-scaled proportion, demonstrating that architectural mastery required collective wisdom.',
    hours:'Garden open to members and guests. Café/restaurant open to public: 11:00–22:00.', lastEntry:'',
    admission:'Café/restaurant: open to public (free entry). Events: varies.',
    tourOk:false, tourInfo:'The garden is primarily for members. The café, restaurant, and ground floor public areas are accessible to all.',
    transit:'Tokyo Metro Namboku → Roppongi-itchome (Exit 1, 3 min walk)',
    walkFrom:'Ark Hills: 5 min · Roppongi Hills: 10 min',
    tags:['Junzo Yoshimura','Junzo Sakakura','Kunio Maekawa','Roppongi','Japanese Modernism','Garden','1955','Cultural Exchange'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/International_House_of_Japan.jpg?width=800'
    ]
  },

  // ── ARAKAWA + MADELINE GINS ─────────────────────────────────────

  {
    id:'tok-0025',
    name:'Reversible Destiny Lofts Mitaka',
    cc:'c-res',
    cats:['Residential','Skyscrapers','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Arakawa + Madeline Gins', archs:['Arakawa','Madeline Gins'],
    yr:2005, access:'Paid Ticket',
    lat:35.6810142, lng:139.5380376,
    addr:'2-chōme-2-8 Ōsawa, Mitaka, Tokyo', hood:'Mitaka',
    localName:'三鷹天命反転住宅',
    localAddr:'シンガポール',
    localHood:'シンガポール',
    desc: 'Arakawa Shusaku and Madeline Gins\' Reversible Destiny Lofts Mitaka (2005) proposes \'architecture for not dying\' through deliberate spatial disorientation. Fourteen vivid colours activate three buildings containing nine residential-studio units. Uneven floors, varied ceiling heights, and intentionally confusing sequences challenge bodily habituation. Tea ceremony room crowns the ensemble, integrating Eastern meditation with Western artistic provocation. This utopian proposal transforms architecture into perceptual awakening.',
    hours:'Tours: Sat–Sun 11:00–16:00 (reservation required). Overnight stays: bookable.', lastEntry:'',
    admission:'Guided tour: ¥1,500. Overnight stay: from ¥5,000/person.',
    tourOk:true, tourInfo:'Weekend guided tours available by reservation. The lofts can be rented overnight for a full sensory experience.',
    transit:'JR Chuo Line → Mitaka (20 min walk or bus to Osawa 3-chome)',
    walkFrom:'Ghibli Museum: 20 min on foot',
    tags:['Arakawa','Madeline Gins','Experimental','Mitaka','Residential','Philosophy','Anti-Gravity','2005'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Reversible_Destiny_Lofts.jpg?width=800'
    ]
  },

  // ── WONDERWALL (MASAMICHI KATAYAMA) ─────────────────────────────

  // ── KLEIN DYTHAM ARCHITECTURE ───────────────────────────────────

  {
    id:'tok-0027',
    name:'Daikanyama T-Site',
    cc:'c-cul',
    cats:['Cultural','Skyscrapers'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Klein Dytham Architecture', archs:['Klein Dytham Architecture'],
    yr:2011, access:'Open to Public',
    lat:35.6491181, lng:139.7001437,
    addr:'16-15 Sarugakuchō, Shibuya, Tokyo', hood:'Daikanyama',
    localName:'代官山T-SITE',
    localAddr:'東京都台東区上野公園8-36',
    localHood:'上野',
    desc: 'Klein Dytham Architecture\'s Daikanyama T-SITE (2011) redefines retail as cultural destination through pavilion composition. Three buildings organised by \'magazine street\' blur interior-exterior boundaries, serving Tsutaya\'s design-conscious clientele. Cafes, art galleries, and design lounges supplement retail. Klein Dytham\'s British-Japanese sensibility creates sophisticated spatial variety while maintaining coherence. Winner of World Architecture Festival Best Retail Award, demonstrating how contemporary commerce achieves cultural authority through spatial intelligence.',
    hours:'7:00–26:00 (2 AM) daily', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Freely accessible during opening hours. Lounge membership available for the second-floor Anjin magazine library.',
    transit:'Tokyu Toyoko Line → Daikanyama (5 min walk)',
    walkFrom:'Log Road Daikanyama: 3 min · Hillside Terrace (Maki): 5 min',
    tags:['Klein Dytham','Daikanyama','Tsutaya','Bookstore','Retail','Forest','2011','Lifestyle'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Daikanyama_Tsutaya_Books.jpg?width=800'
    ]
  },

  // ── ATELIER BOW-WOW ─────────────────────────────────────────────

  {
    id:'tok-0028',
    name:'Tower Machiya',
    cc:'c-res',
    cats:['Residential','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Atelier Bow-Wow', archs:['Atelier Bow-Wow'],
    yr:2005, access:'Private',
    lat:35.7080137, lng:139.7228267,
    addr:'〒162-0041 Tokyo, Shinjuku City, Wasedatsurumakichō, ５１８−22', hood:'Ookayama',
    localName:'タワー町家',
    localAddr:'東京都渋谷区',
    localHood:'渋谷',
    desc: 'Atelier Bow-Wow\'s Tower Machiya (2010) adapts traditional Edo communal dwelling typology to vertical urban constraint. Sited on narrow Shinjuku lot of 3-metre frontage, the design stacks seven floors asymmetrically with each level creating distinct spatial character. Tea ceremony room crowns the composition while the central staircase transforms into \'garden\' pathway. Ground-floor wooden louver screens establish street presence, proving traditional Japanese spatial principles remain generative for contemporary urban dwelling.',
    hours:'Private residence. Exterior view only.', lastEntry:'',
    admission:'N/A',
    tourOk:false, tourInfo:'Private residential building. Exterior visible from the street.',
    transit:'Tokyu Meguro / Oimachi Lines → Ookayama',
    walkFrom:'Tokyo Institute of Technology campus: 5 min',
    tags:['Atelier Bow-Wow','Pet Architecture','Machiya','Residential','Tokyo','Narrow Lot','2005'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Atelier_bow-wow%2C_sectional_model_of_house_tower%2C_tokyo_2006.jpg?width=800'
    ]
  },

  // ── JUNYA ISHIGAMI ──────────────────────────────────────────────

  // ── HIROSHI NAKAMURA & NAP ──────────────────────────────────────

  // ── YOSHIHIRO SATO ──────────────────────────────────────────────

  // ── TAKASHI YAMAGUCHI ───────────────────────────────────────────

  {
    id:'tok-0032',
    name:'Mujin-to Production Gallery',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Takashi Yamaguchi & Associates', archs:['Takashi Yamaguchi'],
    yr:2005, access:'Open to Public',
    lat:35.6915144, lng:139.8094054,
    addr:'5-chōme-10-5 Kōtōbashi, Sumida City, Tokyo', hood:'Koenji',
    localName:'無人島プロダクション',
    localAddr:'東京都港区南青山5-2-1',
    localHood:'南青山 / 裏参道',
    desc: 'Mujin-to Production Gallery occupies a 1948-built wooden warehouse, formerly a cardboard factory, renovated as an artist-run contemporary space. The industrial-scale interior features exposed wood and stone walls with the gallery deliberately preserving a historic section of the Otagawa levee, creating a poetic fusion of Tokyo\'s working past and cultural present through adaptive reuse celebrating raw materiality over white-cube aesthetics.',
    hours:'Tue–Sat 12:00–19:00. Closed Sun–Mon.', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Gallery open to public during exhibition periods.',
    transit:'JR Chuo / Sobu Line → Koenji (North Exit, 5 min walk)',
    walkFrom:'Koenji shopping streets: 5 min',
    tags:['Takashi Yamaguchi','Minimalism','Gallery','White','Koenji','Tokyo','Spatial'],
    photos:[]
  },

  // ── YUICHIRO HIGUCHI ────────────────────────────────────────────

  // ── NIKKEN SEKKEI ──────────────────────────────────────────────

  {
    id:'tok-0034',
    name:'Tokyu Plaza Ginza',
    cats:['Retail','Landmarks','Commercial'], cc:'c-ret', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Nikken Sekkei', archs:['Nikken Sekkei'],
    yr:2016, access:'Open to Public',
    lat:35.6722448, lng:139.7624127,
    addr:'5-chōme-2-1 Ginza, Chuo City, Tokyo', hood:'Ginza',
    localName:'東急プラザ銀座',
    localAddr:'東京都渋谷区霞ヶ丘町',
    localHood:'霞ヶ丘 / 信濃町',
    desc: 'Tokyu Plaza Ginza, completed 2016, draws inspiration from traditional Edo kirikko glass craftsmanship in its diamond-cut facade geometry. Designed by Nikken Sekkei, the 34-story mixed-use tower merges contemporary retail and offices with historic craftsmanship references, featuring the \'Kiriko Terrace\' rooftop lounge overlooking Ginza\'s commercial streetscape.',
    hours:'Shops: daily 11:00 AM – 9:00 PM · KIRIKO TERRACE (roof garden): 11:00 AM – 11:00 PM', lastEntry:'',
    admission:'Free access · Individual shops may charge',
    tourOk:false, tourInfo:'The building\'s rooftop garden is freely accessible to the public during opening hours. A good vantage point for viewing the Ginza streetscape and Tokyo skyline.',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (C2/C3 exit, 1 min) · Yurakucho → Yurakucho (3 min)',
    walkFrom:'Ginza Six: 5 min · Shibuya: 15 min by metro',
    tags:['Nikken Sekkei','Edo Kiriko','Ginza','Retail','Rooftop Garden','Facade','2016'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza_20241021.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza_KIRIKO_TERRACE_Greenside_-_Nov_11%2C_2017.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza7.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza4.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza_at_night%2C_Tokyo_2016-10-17_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_in_Ginza.jpg?width=800'
    ]
  },

  // ── JUN AOKI & ASSOCIATES ─────────────────────────────────────

  {
    id:'tok-0036',
    name:'Louis Vuitton Matsuya Ginza',
    cats:['Retail','Landmarks'], cc:'c-ret', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Aoki & Associates', archs:['Jun Aoki & Associates'],
    yr:2004, access:'Open to Public',
    lat:35.6720994, lng:139.7666277,
    addr:'3-6-1 Ginza, Chuo-ku, Tokyo 104-8130', hood:'Ginza',
    localName:'ルイ・ヴィトン松屋銀座',
    localAddr:'東京都江東区豊洲2-4-9',
    localHood:'豊洲 / お台場',
    desc: 'Louis Vuitton Matsuya Ginza, designed by Jun Aoki, stages a dialogue between Ginza\'s Art Deco past and Vuitton\'s geometric heritage. The 2013 facade progresses from traditional edo-komon patterns through Art Deco geometry to the iconic Damier motif, creating a seamless visual narrative across architectural history layers.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Louis Vuitton boutique within the Matsuya Ginza department store. The facade is best viewed from Chuo Dori at dusk when the LED illumination is active.',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A13 exit, 1 min)',
    walkFrom:'Mikimoto Ginza 2 (Toyo Ito): 3 min · Tokyo International Forum: 10 min',
    tags:['Jun Aoki','Louis Vuitton','Matsuya','Ginza','Facade','LED','Monogram','Retail','2004'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Le_magasin_Louis_Vuitton_Matsuya_Ginza_%28Tokyo%29_%2828834352748%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Buildings_around_Ginza_%2866652%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0037',
    name:'Louis Vuitton Ginza Namiki',
    cats:['Retail','Landmarks'], cc:'c-ret', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Aoki & Associates', archs:['Jun Aoki & Associates','Peter Marino Architect'],
    yr:2004, access:'Open to Public',
    lat:35.6700085, lng:139.7619692,
    addr:'7-chōme-6-1 Ginza, Chuo City, Tokyo', hood:'Ginza / Namiki Dori',
    localName:'ルイ・ヴィトン銀座並木通り店',
    localAddr:'東京都新宿区',
    localHood:'新宿',
    desc: 'Louis Vuitton Ginza Namiki (2021) features Jun Aoki and Peter Marino\'s iconic \'water column\' facade of undulating dichroic-coated glass that shifts from azure to amber depending on light angle. This 8-story tower references Ginza\'s historical sandbanks through fluid geometry and advanced optical glazing technology.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Louis Vuitton flagship boutique on Namiki Dori. The facade\'s illuminated Damier pattern is most visible after dark. Namiki Dori (Tree-Lined Street) is one of Ginza\'s most architecturally concentrated retail streets.',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (B5 exit, 3 min)',
    walkFrom:'LV Matsuya Ginza (Jun Aoki): 5 min · De Beers Ginza: 4 min',
    tags:['Jun Aoki','Peter Marino','Louis Vuitton','Ginza','Damier','Retail','Facade','Namiki Dori','2004'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Louis_Vuitton_Ginza_Namiki_20241021.jpg?width=800'
    ]
  },

  // ── JUN MITSUI & ASSOCIATES ───────────────────────────────────

  {
    id:'tok-0038',
    name:'De Beers Ginza Building',
    cats:['Retail','Landmarks'], cc:'c-ret', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Mitsui & Associates Architects', archs:['Jun Mitsui & Associates Architects'],
    yr:2005, access:'Open to Public',
    lat:35.6734606, lng:139.7664485,
    addr:'V88 Building, 2-chōme-5-11 Ginza, Chuo City, Tokyo', hood:'Ginza',
    localName:'デビアス銀座ビル',
    localAddr:'東京都中央区銀座',
    localHood:'銀座',
    desc: 'De Beers Ginza Building (V88), designed by Jun Mitsui, presents a gracefully curved stainless-steel facade that ripples like light ribbons rising from the earth. The 2008 Maronier-dori landmark uses metalwork to evoke both feminine silhouettes and auroral light, receiving the 13th Stainless Steel Association Excellence Award.',
    hours:'Mon–Sun 11:00 AM – 7:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'De Beers jewellery boutique. The facade\'s crystal-facet geometry is best appreciated from the opposite side of Chuo Dori, particularly in afternoon light.',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A2 exit, 3 min)',
    walkFrom:'LV Matsuya Ginza (Jun Aoki): 2 min · Mikimoto Ginza 2 (Toyo Ito): 4 min',
    tags:['Jun Mitsui','De Beers','Ginza','Diamond','Faceted Glass','Retail','Jewelry','2005'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/De_Beers_Ginza_Building_20241021.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/De_Beers_Diamond_Jewellers%2C_De_Beers_Ginza_Building_%282016-09-01_by_naobim_%40Pixabay_1648310%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/De_Beers_Ginza_Building%2C_Tokyo_-_Mar_22%2C_2015_%281%29.jpg?width=800'
    ]
  },

  // ── KENZO TANGE / METABOLIST ──────────────────────────────────

  {
    id:'tok-0039',
    name:'Shizuoka Press and Broadcasting Center',
    cats:['Historic','Landmarks','Commercial'], cc:'c-his', styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1967, access:'Open to Public',
    lat:35.6687555, lng:139.7589379,
    addr:'8-chōme-3-7 Ginza, Chuo City, Tokyo', hood:'Ginza / Shimbashi',
    localName:'静岡新聞放送センター',
    localAddr:'東京都新宿区西新宿3-7-1',
    localHood:'西新宿',
    desc: 'Shizuoka Press and Broadcasting Center (1967) embodies Kenzo Tange\'s Metabolism vision: a single central concrete cylinder from which office wings branch like a tree\'s boughs. This organic structural metaphor exemplifies 1960s Japanese avant-garde architecture and underwent invisible seismic strengthening in 2022 while preserving original design language.',
    hours:'Office building · Exterior viewable 24/7', lastEntry:'',
    admission:'Private office building · Exterior freely visible',
    tourOk:false, tourInfo:'The building is a functioning office tower for the Shizuoka Broadcasting System Tokyo bureau. The exterior — best seen from across the elevated expressway — is accessible 24/7. A registered Important Cultural Property candidate.',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A4 exit, 8 min) · JR → Shimbashi (5 min)',
    walkFrom:'Ginza Six: 8 min · Yamaha Ginza (Nikken Sekkei): 2 min',
    tags:['Kenzo Tange','Metabolism','Metabolist','Ginza','1967','Cantilever','Cylindrical Core','Historic','Important Cultural Property'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/GINZA_SKY_WALK_2024_Shizuoka_Press_and_Broadcasting_Center_%2854534529867%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shizuoka_Press_and_Broadcasting_Center_in_Tokyo3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shizuoka_Press_and_Broadcasting_Center%2C_Ginza%2C_Tokyo_-_Jan_19%2C_2023_%284%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shizuoka_press_broadcasting_building_June_27_2019_details_etc_15_27_03_962000.jpeg?width=800'
    ]
  },

  // ── RAFAEL VIÑOLY ─────────────────────────────────────────────

  {
    id:'tok-0040',
    name:'Tokyo International Forum',
    cats:['Cultural','Public','Landmarks'], cc:'c-cul', styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Rafael Viñoly Architects', archs:['Rafael Viñoly Architects'],
    yr:1997, access:'Open to Public',
    lat:35.6767504, lng:139.7634509,
    addr:'3-chōme-5-1 Marunouchi, Chiyoda City, Tokyo', hood:'Marunouchi / Yurakucho',
    localName:'東京国際フォーラム',
    localAddr:'東京都港区',
    localHood:'港区',
    desc: 'Tokyo International Forum (1996), designed by Rafael Vinoly following international competition, soars as a crystalline vessel evoking a ship navigating Tokyo Bay. Its dramatic glass-and-steel atrium and organically curved forms redefine the conference centre typology, blending transparency with monumental presence in the heart of Tokyo\'s business district.',
    hours:'Atrium: 24/7 (free) · Halls: event hours vary', lastEntry:'',
    admission:'Atrium free · Hall events ticketed',
    tourOk:true, tourInfo:'The glass atrium is freely open to the public 24/7. Tours of the building\'s engineering and architecture are available. The Tokyo Antique Market is held on alternate months in the outdoor plaza.',
    transit:'JR Yamanote/Keihin-Tohoku → Yurakucho (1 min) · Yurakucho → Yurakucho (B5 exit, 1 min)',
    walkFrom:'Tokyo Station Marunouchi: 5 min · Imperial Palace East Garden: 10 min',
    tags:['Rafael Viñoly','Marunouchi','Convention','Glass Atrium','Ship Hull','Public','Yurakucho','1997'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo-International-Forum_Glass-Building_Outside.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo-International-Forum_Square.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum%2C_Tokyo%3B_April_2021_%2868%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum%2C_Tokyo%3B_April_2021_%2860%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Interior_of_the_Tokyo_International_Forum_Glass_Building%2C_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Interior_of_the_Tokyo_International_Forum_glass_building_with_roller_shades_in_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum%2C_Tokyo%3B_April_2021_%2804%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum_10.jpg?width=800'
    ]
  },

  // ── HERZOG & DE MEURON ────────────────────────────────────────

  {
    id:'tok-0041',
    name:'Miu Miu Aoyama',
    cats:['Retail','Landmarks'], cc:'c-ret', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Herzog & de Meuron', archs:['Herzog & de Meuron'],
    yr:2015, access:'Open to Public',
    lat:35.6643057, lng:139.7142277,
    addr:'3-17-8 Minamiaoyama, Minato City, Tokyo', hood:'Minamiaoyama / Omotesando',
    localName:'ミュウミュウ青山店',
    localAddr:'東京都世田谷区',
    localHood:'世田谷',
    desc: 'Miu Miu Aoyama, designed by Herzog & de Meuron (2015), presents a closed copper-clad exterior with dramatic overhanging threshold. The minimalist box opens only through a sculptural overhang inviting entry into richly detailed interior clad in embossed copper, embodying the architects\' material restraint and interior drama.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Miu Miu boutique, freely accessible. The concrete shelf facade is best appreciated from across the narrow side street; the moss and seasonal vegetation on the shelves varies throughout the year.',
    transit:'Ginza/Hanzomon/Chiyoda → Omotesando (A5 exit, 5 min)',
    walkFrom:'Omotesando Hills (Tadao Ando): 3 min · Prada Omotesando (Herzog & de Meuron): 5 min',
    tags:['Herzog & de Meuron','Miu Miu','Aoyama','Omotesando','Concrete','Retail','Stacked Shelves','2015','Vegetation'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Miu_Miu_Aoyama_Herzog_de_Meuron_Tokyo.jpg?width=800'
    ]
  },

  // ── NORIHIKO DAN AND ASSOCIATES ───────────────────────────────

  // ── OMA ───────────────────────────────────────────────────────

  // ── HEATHERWICK STUDIO ────────────────────────────────────────

  {
    id:'tok-0044',
    name:'Azabudai Hills',
    cats:['Landmarks','Commercial','Cultural','Public'], cc:'c-lmk', styleGroups:['Contemporary','Landscape'],
    era:'2000–Present', city:'tokyo',
    arch:'Heatherwick Studio', archs:['Heatherwick Studio','Pelli Clarke & Partners','Diller Scofidio + Renfro'],
    yr:2023, access:'Open to Public',
    lat:35.6616382, lng:139.7403669,
    addr:'1-chōme-3-1 Azabudai, Minato City, Tokyo', hood:'Azabudai / Toranomon',
    localName:'麻布台ヒルズ',
    localAddr:'東京都渋谷区',
    localHood:'渋谷',
    desc: 'Azabudai Hills (2023) represents dual-architect collaboration: Pelli Clarke & Partners designed three elegant tapered towers while Thomas Heatherwick created a flowing, garden-wrapped podium emphasising organic curves and planting. This new landmark fuses geometric precision with nature-inspired landscapes in one of Tokyo\'s most ambitious recent developments.',
    hours:'Garden and public areas: daily 24/7 · Retail: 11:00 AM – 9:00 PM · Gallery: 10:00 AM – 7:00 PM', lastEntry:'',
    admission:'Garden and public areas: free · Gallery: ticketed (from ¥3,200)',
    tourOk:true, tourInfo:'The central garden and public walkways are freely accessible at all times. The Azabudai Hills Gallery (teamLab) requires timed entry tickets booked in advance. The development also contains a Mori Art Museum satellite space.',
    transit:'Hibiya Line → Kamiyacho (3 min) · Namboku → Roppongi-Itchome (5 min)',
    walkFrom:'Roppongi Hills: 10 min · Tokyo Tower: 10 min · Toranomon Hills: 7 min',
    tags:['Heatherwick Studio','Pelli Clarke','Diller Scofidio Renfro','DS+R','Azabudai','Mixed-Use','Landscape','2023','teamLab','Tallest Japan','Minato-ku'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2024_Azabudai_Hills_Mori_JP_Tower_%282%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_%28Garden_Plaza_B%2C_towers%2C_and_sign%3B_2025-11-06%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_202307.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Gallery_courtyard_2024.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Garden_Plaza_A_and_B_20241021.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Garden_Plaza_A_and_B_20241021_%28II%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Garden_Plaza_B_B1_2024.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Market_2024.jpg?width=800'
    ]
  },

  // ── LE CORBUSIER ──────────────────────────────────────────────

  {
    id:'tok-0045',
    name:'National Museum of Western Art',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Le Corbusier', archs:['Le Corbusier','Kunio Maekawa','Junzo Sakakura'],
    yr:1959, access:'Open to Public',
    lat:35.7154, lng:139.7762,
    addr:'7-7 Uenokoen, Taito City, Tokyo', hood:'Ueno',
    localName:'国立西洋美術館',
    localAddr:'東京都台東区上野公園7-7',
    localHood:'上野',
    desc: 'National Museum of Western Art preserves Le Corbusier\'s 1959 concrete masterpiece, a pilotis-elevated box embodying his Modulor proportions and Infinite Growth Museum concept. Japan\'s only realised Corbusier building, UNESCO-recognised alongside his global legacy, showcases pure Modernist discipline with characteristic exposed concrete and mathematical spatial logic.',
    hours:'Tue–Sun 9:30 AM – 5:30 PM (Fri until 8 PM) · Closed Mon', lastEntry:'30 min before closing',
    admission:'Permanent collection: ¥500 · Special exhibitions vary',
    tourOk:true, tourInfo:'The building exterior and pilotis ground floor are freely accessible during museum hours. Photography permitted in permanent collection galleries.',
    transit:'JR → Ueno (1 min walk)',
    walkFrom:'Ueno Station Park Exit: 1 min · Tokyo Bunka Kaikan: 2 min · Tokyo National Museum: 5 min',
    tags:['Le Corbusier','UNESCO','World Heritage','Ueno','Museum','Modernism','Pilotis','1959'],
    photos:[]
  },

  // ── FRANK LLOYD WRIGHT ────────────────────────────────────────

  {
    id:'tok-0046',
    name:'Jiyu Gakuen Myonichikan',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Modernist'],
    era:'Pre-1930', city:'tokyo',
    arch:'Frank Lloyd Wright', archs:['Frank Lloyd Wright','Arata Endo'],
    yr:1921, access:'Open to Public',
    lat:35.7219, lng:139.7126,
    addr:'2-chōme-31-3 Nishiikebukuro, Toshima City, Tokyo', hood:'Ikebukuro',
    localName:'自由学園明日館',
    localAddr:'東京都豊島区西池袋2-31-3',
    localHood:'池袋',
    desc: 'Jiyu Gakuen Myonichikan (1921-1927) shows Frank Lloyd Wright\'s Prairie Style grafted onto Tokyo\'s hillside through horizontal massing and abundant Oya stone. Designed with disciple Arata Endo, this pioneering synthesis of Japanese materials and Wright\'s organic principles remains a cultural landmark recognised as Important Cultural Property.',
    hours:'Tue–Sun 10:00 AM – 4:00 PM · Closed Mon', lastEntry:'3:30 PM',
    admission:'¥500 (viewing) · ¥800 (with tea)',
    tourOk:true, tourInfo:'Self-guided viewing of the main hall and lecture rooms. English pamphlet available. The building hosts weddings on weekends, so some areas may be restricted.',
    transit:'JR → Ikebukuro (5 min walk) · Seibu → Ikebukuro (5 min)',
    walkFrom:'Ikebukuro Station Metropolitan Exit: 5 min',
    tags:['Frank Lloyd Wright','Prairie Style','Important Cultural Property','Ikebukuro','1921','School','Oya Stone'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Jiyu_gakuen_myonichikan.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Jiyugakuen_Myonichikan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Auditorium%2C_Jiyu_Gakuen_Myonichikan%2C_Ikebukuro%2C_Tokyo._Photographed_2018-06-16.jpg?width=800'
    ]
  },

  // ── HERZOG & DE MEURON ────────────────────────────────────────

  {
    id:'tok-0047',
    name:'Prada Aoyama',
    cc:'c-com',
    cats:['Commercial'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Herzog & de Meuron', archs:['Herzog & de Meuron'],
    yr:2003, access:'Open to Public',
    lat:35.6653, lng:139.7118,
    addr:'5-chōme-2-6 Minamiaoyama, Minato City, Tokyo', hood:'Omotesando / Aoyama',
    localName:'プラダ青山店',
    localAddr:'東京都港区南青山5-2-6',
    localHood:'表参道 / 青山',
    desc: 'Prada Aoyama (2002-2003) showcases Herzog & de Meuron\'s diagonal-grid frame holding bulging, custom-faceted glass. The structure wrapped in undulating glass planes demonstrates how diagonal bracing becomes visible aesthetic expression while stabilising seismic forces through innovative damping technology.',
    hours:'Daily 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Operating luxury retail store. The exterior and ground floor are the primary architectural experience. Photography of the facade freely permitted.',
    transit:'Ginza Hanzomon Chiyoda → Omotesando (5 min walk)',
    walkFrom:'Omotesando Station A5 Exit: 3 min · Dior Omotesando: 2 min · Nezu Museum: 4 min',
    tags:['Herzog & de Meuron','Pritzker','Prada','Omotesando','Flagship Store','Glass Facade','2003'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/PRADA_BOUTIQUE_AOYAMA.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Prada_Boutique_Aoyama.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/PRADA_Building_-_panoramio.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/PRADA_-_panoramio.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/PRADA_Building%2C_Inside_-_panoramio.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Prada_Aoyama.jpg?width=800'
    ]
  },

  // ── RENZO PIANO ───────────────────────────────────────────────

  {
    id:'tok-0048',
    name:'Maison Hermès',
    cc:'c-com',
    cats:['Commercial','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Renzo Piano', archs:['Renzo Piano Building Workshop'],
    yr:2001, access:'Open to Public',
    lat:35.6718, lng:139.7649,
    addr:'5-chōme-4-1 Ginza, Chuo City, Tokyo', hood:'Ginza',
    localName:'メゾンエルメス',
    localAddr:'東京都中央区銀座5-4-1',
    localHood:'銀座',
    desc: 'Maison Hermes (2001) by Renzo Piano wraps a 13,500-panel glass-block envelope that transmutes daylight to soft blue and interior glow to warm amber. This luminous six-story capsule represents Piano\'s rare Japanese work, with load-bearing glass blocks reinforced using structural geometry that creates ethereal luminosity from industrial material.',
    hours:'Store: daily 11:00 AM – 8:00 PM · Gallery: Mon–Sat 11:00 AM – 8:00 PM, Sun until 7:00 PM', lastEntry:'',
    admission:'Store and gallery: free',
    tourOk:true, tourInfo:'The 8th-floor Le Forum gallery hosts rotating contemporary art exhibitions, free to enter. The ground-floor atrium and retail spaces are also architecturally notable.',
    transit:'Ginza Marunouchi Hibiya → Ginza (2 min walk)',
    walkFrom:'Ginza Station A7 Exit: 1 min · Tokyu Plaza Ginza: 3 min · De Beers Ginza: 2 min',
    tags:['Renzo Piano','Pritzker','Hermès','Ginza','Glass Block','Gallery','Free','2001'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_Hermes_Ginza_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/HermesBuildingTokyo.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Colourful_intersection_at_Ginza_-_Tokyo_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hermes_Ginza.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/MaisonHerm%C3%A8s-Tokyo-RenzoPiano-2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hermes%2C_Ginza%2C_Tokyo_-_DSC09661.JPG?width=800'
    ]
  },

  // ── JEAN NOUVEL ───────────────────────────────────────────────

  {
    id:'tok-0049',
    name:'Dentsu Headquarters Building',
    cc:'c-com',
    cats:['Commercial','Landmarks'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jean Nouvel', archs:['Jean Nouvel','Obayashi Corporation'],
    yr:2002, access:'Exterior Only',
    lat:35.6604, lng:139.7630,
    addr:'1-chōme-8-1 Higashishinbashi, Minato City, Tokyo', hood:'Shiodome',
    localName:'電通本社ビル',
    localAddr:'東京都港区東新橋1-8-1',
    localHood:'汐留',
    desc: 'Dentsu Headquarters Building (2002) by Jean Nouvel curves as a boomerang-shaped crystal rising above Hamarikyu gardens. Its facade grades from pure white to dark grey ceramic-coated glass, embodying his \'Crystal and Rock\' concept of transparency crowning earthen solidity.',
    hours:'Exterior: 24/7 · Interior: private office building', lastEntry:'',
    admission:'Exterior only (lobby occasionally accessible)',
    tourOk:false, tourInfo:'Private office building. The exterior and Shiodome public plazas offer the best views. The curved east facade is best appreciated from Hamarikyu Gardens.',
    transit:'Oedo Yurikamome → Shiodome (1 min walk)',
    walkFrom:'Shiodome Station: 1 min · Hamarikyu Gardens: 3 min · Ginza: 10 min',
    tags:['Jean Nouvel','Pritzker','Shiodome','Office Tower','Curved Glass','2002','Dentsu'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dentsu_Building-20060317.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dentsu_Headquarters_Building_-_panoramio.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/%E9%9B%BB%E9%80%9A%E6%9C%AC%E7%A4%BE%E3%83%93%E3%83%AB_Dentsu_Building_-_panoramio.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dentsu_Headquarters_Building_in_Tokyo%2C_2019_-_322.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bunkyodo_Group_Bookstore_in_Dentsu_Building_2015.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dentsu_Headquarters_Building%2C_SIO-SITE_%282010-05-08_17.29.36%29.jpg?width=800'
    ]
  },

  // ── NORMAN FOSTER ─────────────────────────────────────────────

  {
    id:'tok-0050',
    name:'Century Tower',
    cc:'c-com',
    cats:['Commercial'],
    styleGroups:['Contemporary','High-Tech'],
    era:'1970–1999', city:'tokyo',
    arch:'Norman Foster', archs:['Foster + Partners','Obayashi Corporation'],
    yr:1991, access:'Exterior Only',
    lat:35.7078, lng:139.7635,
    addr:'2-chōme-1-6 Kanda Surugadai, Chiyoda City, Tokyo', hood:'Ochanomizu',
    localName:'センチュリータワー',
    localAddr:'東京都千代田区神田駿河台2-1-6',
    localHood:'御茶ノ水',
    desc: 'Century Tower (1991), Norman Foster\'s only Japanese office building, opens through twin bridged atriums between low and high tower sections. Exposed bracing and glass-suspended inter-story corridors exemplify Foster\'s high-tech precision adapted to Tokyo\'s seismic demands.',
    hours:'Exterior: 24/7 · Interior: private', lastEntry:'',
    admission:'Exterior only',
    tourOk:false, tourInfo:'Private office building. Best viewed from the Ochanomizu Bridge or Hijiri-bashi Bridge over the Kanda River.',
    transit:'JR Marunouchi → Ochanomizu (3 min walk)',
    walkFrom:'Ochanomizu Station: 3 min · Nikolai Cathedral: 5 min',
    tags:['Norman Foster','Pritzker','High-Tech','Diagrid','Ochanomizu','1991','Structural Expression'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Century_Tower_at_Japan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Century_Tower_Juntendo.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Chuo-Sobu_Line_Ichigaya_2022-11-24_4.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/JR_Minami-Shinjuku_building_from_Hotel_Century_Southern_Tower.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/JR_Tokyo_General_Hospital_from_Hotel_Century_Southern_Tower.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Marunouchi_%26_Tokyo_Station_2.jpg?width=800'
    ]
  },

  // ── KPF ───────────────────────────────────────────────────────

  {
    id:'tok-0051',
    name:'Roppongi Hills Mori Tower',
    cc:'c-lmk',
    cats:['Landmarks','Commercial','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kohn Pedersen Fox', archs:['Kohn Pedersen Fox','Irie Miyake Architects'],
    yr:2003, access:'Open to Public',
    lat:35.6605, lng:139.7292,
    addr:'6-chōme-10-1 Roppongi, Minato City, Tokyo', hood:'Roppongi',
    localName:'六本木ヒルズ森タワー',
    localAddr:'東京都港区六本木6-10-1',
    localHood:'六本木',
    desc: 'Roppongi Hills Mori Tower (2003), designed by Kohn Pedersen Fox, anchors this urban village with 54 floors of offices, retail, and cultural space capped by the Mori Art Museum. Its sophisticated structural systems and integrated programming redefine the Japanese super-tower typology as a city within a city.',
    hours:'Tower: varies by tenant · Observation Deck: 10:00 AM – 11:00 PM · Mori Art Museum: 10:00 AM – 10:00 PM', lastEntry:'30 min before closing',
    admission:'Tokyo City View + Mori Art Museum: ¥2,000 · Sky Deck (rooftop): +¥500',
    tourOk:true, tourInfo:'The Mori Art Museum and Tokyo City View observation deck offer combined tickets. The rooftop Sky Deck is weather-dependent. The surrounding public spaces, garden, and arena are free.',
    transit:'Hibiya Oedo → Roppongi (3 min walk)',
    walkFrom:'Roppongi Station: 3 min · National Art Center: 8 min · Azabudai Hills: 10 min',
    tags:['KPF','Roppongi','Observation Deck','Mori Art Museum','Mixed-Use','2003','Maman','Louise Bourgeois'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mori_Tower_-_Roppongi%2C_Tokyo%2C_Japan_-_DSC06760.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Roppongi_Hills_Mori_Tower_from_Tokyo_Tower_Day_cropped.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mori_Tower_Tokyo_City_View_before_renovation_2013.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/%E6%A3%AE%E3%82%BF%E3%83%AF%E3%83%BC%E5%9B%9E%E8%BB%A2%E3%83%89%E3%82%A2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mori_Art_Museum_Entrance_2013.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Tower_%28Roppongi_Hills_Mori_Tower_-_TOKYO_CITY_VIEW%29.jpg?width=800'
    ]
  },

  // ── SOM ───────────────────────────────────────────────────────

  {
    id:'tok-0052',
    name:'Tokyo Midtown',
    cc:'c-lmk',
    cats:['Landmarks','Commercial','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Skidmore Owings & Merrill', archs:['Skidmore Owings & Merrill','Nikken Sekkei'],
    yr:2007, access:'Open to Public',
    lat:35.6659, lng:139.7314,
    addr:'9-chōme-7-1 Akasaka, Minato City, Tokyo', hood:'Roppongi / Akasaka',
    localName:'東京ミッドタウン',
    localAddr:'東京都港区赤坂9-7-1',
    localHood:'六本木 / 赤坂',
    desc: 'Tokyo Midtown (2007) by SOM reimagines the plaza as layered garden inspired by traditional Japanese temple grounds, with the 54-story tower as central rock. Overlapping facade planes evoke shoji screens while maintaining visual continuity, creating dialogue between corporate verticality and landscape tradition.',
    hours:'Shops: 11:00 AM – 9:00 PM · Restaurants: 11:00 AM – 11:00 PM · Garden: 24/7', lastEntry:'',
    admission:'Public areas and garden: free · Museums: ticketed',
    tourOk:true, tourInfo:'The public garden and ground-level retail are freely accessible. The Suntory Museum of Art and 21_21 Design Sight require separate tickets.',
    transit:'Hibiya Oedo → Roppongi (5 min walk) · Chiyoda → Nogizaka (3 min)',
    walkFrom:'Roppongi Station: 5 min · National Art Center: 3 min · 21_21 Design Sight: 1 min',
    tags:['SOM','Nikken Sekkei','Roppongi','Mixed-Use','Tallest Tokyo','Suntory Museum','Ritz-Carlton','2007'],
    photos:[]
  },

  {
    id:'tok-0053',
    name:'Otemachi One Tower',
    cc:'c-com',
    cats:['Commercial','Landmarks'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Skidmore Owings & Merrill', archs:['Skidmore Owings & Merrill','Nihon Sekkei'],
    yr:2020, access:'Exterior Only',
    lat:35.6873, lng:139.7633,
    addr:'1-chōme-2-1 Otemachi, Chiyoda City, Tokyo', hood:'Otemachi / Marunouchi',
    localName:'Otemachi Oneタワー',
    localAddr:'東京都千代田区大手町1-2-1',
    localHood:'大手町 / 丸の内',
    desc: 'Otemachi One Tower (2020), a 40-story office-hotel hybrid, anchors Otemachi station with Four Seasons on upper floors and integrated retail at ground level. The building consolidates Tokyo\'s business district with modern mixed-use activation through contemporary curtain-wall design.',
    hours:'Public spaces and garden: daily · Tower: private offices', lastEntry:'',
    admission:'Public areas: free',
    tourOk:false, tourInfo:'The public garden and ground-floor retail areas are accessible. The tower floors are private offices.',
    transit:'Marunouchi Tozai Chiyoda Hanzomon → Otemachi (1 min walk)',
    walkFrom:'Otemachi Station: 1 min · Imperial Palace East Gardens: 5 min · Tokyo Station: 8 min',
    tags:['SOM','Otemachi','Office Tower','Four Seasons','Public Garden','2020'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/%C5%8Ctemachitemachi_One_Tower.jpg?width=800'
    ]
  },

  // ── OMA ───────────────────────────────────────────────────────

  {
    id:'tok-0054',
    name:'Toranomon Hills Station Tower',
    cc:'c-lmk',
    cats:['Landmarks','Commercial'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'OMA', archs:['OMA','Mori Building'],
    yr:2023, access:'Open to Public',
    lat:35.6662, lng:139.7499,
    addr:'2-chōme-6-1 Toranomon, Minato City, Tokyo', hood:'Toranomon',
    localName:'虎ノ門ヒルズステーションタワー',
    localAddr:'東京都港区虎ノ門2-6-1',
    localHood:'虎ノ門',
    desc: 'Toranomon Hills Station Tower (2023), designed with OMA involvement, orchestrates a vertical axis connecting street-level public plazas through a 49-story mixed-use volume. Public bridges and elevated plaza create three-dimensional urban continuity in Tokyo\'s rapidly developing Toranomon district.',
    hours:'Public areas: 7:00 AM – 11:00 PM · Retail: 11:00 AM – 9:00 PM', lastEntry:'',
    admission:'Public areas: free',
    tourOk:true, tourInfo:'Ground-level public spaces and retail floors are accessible. The station integration means visitors naturally pass through the building\'s architectural spaces.',
    transit:'Hibiya → Toranomon Hills (direct connection)',
    walkFrom:'Toranomon Hills Station: 0 min · Azabudai Hills: 7 min · Kamiyacho: 5 min',
    tags:['OMA','Shohei Shigematsu','Toranomon','Mori Building','Station Tower','2023','A-Frame'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_Toranomon_Hills_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Toranomon_Hills_3_towers.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Toranomon_Hills_Atrium_2015.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Toranomon_Hills_Glass_Rock_%2831834%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Toranomon_Hills_Office_Lobby_2015.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Toranomon_Hills_Oval_Plaza_dusk_view_2015.jpg?width=800'
    ]
  },

  {
    id:'tok-0055',
    name:'Harajuku Quest',
    cc:'c-com',
    cats:['Commercial','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'OMA', archs:['OMA','Shohei Shigematsu'],
    yr:2025, access:'Open to Public',
    lat:35.6703, lng:139.7029,
    addr:'1-chōme-14-30 Jingumae, Shibuya City, Tokyo', hood:'Harajuku',
    localName:'ハラカド (原宿クエスト)',
    localAddr:'東京都渋谷区神宮前1-14-30',
    localHood:'原宿',
    desc: 'Harakado (Tokyu Plaza Harajuku, 2024) features an all-glass polyhedral facade using SSG structural sealant glazing, creating a faceted jewel-box aesthetic without exposed framing. Hiroki Hirata\'s exterior design crowns a shopping destination at Omotesando\'s iconic intersection, reflecting Harajuku\'s youthful energy through crystalline geometry.',
    hours:'Daily 11:00 AM – 9:00 PM (varies by tenant)', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Commercial complex with freely accessible public floors, terraces, and food halls.',
    transit:'JR → Harajuku (2 min walk) · Chiyoda Fukutoshin → Meiji-jingumae (1 min)',
    walkFrom:'Harajuku Station: 2 min · Takeshita Street: 0 min · Omotesando Hills: 8 min',
    tags:['OMA','Shohei Shigematsu','Harajuku','Mixed-Use','Retail','2025','Takeshita'],
    photos:[]
  },

  // ── NIKKEN SEKKEI ─────────────────────────────────────────────

  {
    id:'tok-0056',
    name:'Tokyo Skytree',
    cc:'c-lmk',
    cats:['Landmarks'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Nikken Sekkei', archs:['Nikken Sekkei'],
    yr:2012, access:'Open to Public',
    lat:35.7101, lng:139.8107,
    addr:'1-chōme-1-2 Oshiage, Sumida City, Tokyo', hood:'Oshiage / Sumida',
    localName:'東京スカイツリー',
    localAddr:'東京都墨田区押上1-1-2',
    localHood:'押上 / 墨田',
    desc: 'Tokyo Skytree (2012), designed by Nikken Sekkei, reaches 634 metres as a tapered digital spire referencing Japanese pagoda sway-damping principles. Its central concrete core and steel tube truss frame harmonise movement through separate oscillation periods, marrying traditional structural wisdom with cutting-edge engineering in the world\'s tallest broadcasting tower.',
    hours:'Observation Decks: 10:00 AM – 9:00 PM (last entry 8:00 PM)', lastEntry:'8:00 PM',
    admission:'Tembo Deck (350m): ¥2,100 · Tembo Deck + Galleria (450m): ¥3,100',
    tourOk:true, tourInfo:'Timed entry tickets recommended, especially on weekends. Fast Tickets available for premium pricing. The Solamachi shopping complex at the base is free to access.',
    transit:'Tobu Skytree → Tokyo Skytree (0 min) · Hanzomon Asakusa → Oshiage (0 min)',
    walkFrom:'Oshiage Station: 1 min · Asakusa/Sensō-ji: 15 min',
    tags:['Nikken Sekkei','Tallest Tower','634m','Observation Deck','Sumida','2012','Broadcasting','Solamachi'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2012%E5%B9%B4%E9%9A%85%E7%94%B0%E5%B7%9D%E8%8A%B1%E7%81%AB%E5%A4%A7%E4%BC%9A.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_tokyo_skytree.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Interior_of_Tokyo_Skytree_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mt.Fuji_%26_Tokyo_SkyTree_%286906783193%29b.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_%2C_%E6%9D%B1%E4%BA%AC_-_Flickr_-_Melvin_Loi_%281%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Skytree_at_night_%28Miyabi%29.jpg?width=800'
    ]
  },

  // ── KUNIO MAEKAWA ─────────────────────────────────────────────

  {
    id:'tok-0057',
    name:'Tokyo Metropolitan Art Museum',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Modernist','Brutalist'],
    era:'1970–1999', city:'tokyo',
    arch:'Kunio Maekawa', archs:['Kunio Maekawa'],
    yr:1975, access:'Open to Public',
    lat:35.7174, lng:139.7725,
    addr:'8-36 Uenokoen, Taito City, Tokyo', hood:'Ueno',
    localName:'東京都美術館',
    localAddr:'東京都台東区上野公園8-36',
    localHood:'上野',
    desc: 'Tokyo Metropolitan Art Museum (1975) showcases Kunio Maekawa\'s modernist vision of public space as social plaza. Distinctive brick-like unglazed tiles and inward-facing courtyard prioritise human gathering over monumental expression, embodying his Le Corbusian education filtered through Japanese sensibility for community-centred cultural architecture.',
    hours:'Tue–Sun 9:30 AM – 5:30 PM (Fri until 8:00 PM) · Closed Mon', lastEntry:'30 min before closing',
    admission:'Free (lobby galleries) · Special exhibitions: ¥800–¥2,000',
    tourOk:true, tourInfo:'The lobby galleries and public spaces are free. The building\'s exterior relationship to Ueno Park is best appreciated from the sunken entrance plaza.',
    transit:'JR → Ueno (7 min walk)',
    walkFrom:'Ueno Station Park Exit: 7 min · National Museum of Western Art: 3 min · Tokyo National Museum: 5 min',
    tags:['Kunio Maekawa','Brutalist','Ueno','Museum','Le Corbusier Disciple','1975','Brick'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_metropolitan_art_museum01_1920.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_metropolitan_art_museum02s4s2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Art_Museum_02_%2815133033203%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Art_Museum_01_%2815133033473%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Teien_Art_Museum_PB292377.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Teien_Art_Museum_PB292392.jpg?width=800'
    ]
  },

  // ── TAKAMASA YOSHIZAKA ────────────────────────────────────────

  {
    id:'tok-0058',
    name:'Athénée Français',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Modernist','Brutalist'],
    era:'1930–1969', city:'tokyo',
    arch:'Takamasa Yoshizaka', archs:['Takamasa Yoshizaka'],
    yr:1962, access:'Exterior Only',
    lat:35.6970, lng:139.7565,
    addr:'2-chōme-11 Kanda Surugadai, Chiyoda City, Tokyo', hood:'Ochanomizu',
    localName:'アテネ・フランセ',
    localAddr:'東京都千代田区神田駿河台2-11',
    localHood:'御茶ノ水',
    desc: 'Athenee Francais (1962), designed by Takaaki Yoshizaka, a Le Corbusier disciple, crowns Ochanomizu with a pink concrete tower evoking Andean sunsets. Adorned with Minerva\'s profile and owl weathervane, the building ingeniously accommodates three phases of expansion without visual trace, expressing playful postwar modernism.',
    hours:'Exterior: 24/7 · Interior: students only', lastEntry:'',
    admission:'Exterior only',
    tourOk:false, tourInfo:'Operating language school, not open to casual visitors. The facade is the primary experience — best viewed from the street.',
    transit:'JR → Ochanomizu (3 min walk) · Marunouchi → Ochanomizu (3 min)',
    walkFrom:'Ochanomizu Station: 3 min · Century Tower (Foster): 2 min · Nikolai Cathedral: 3 min',
    tags:['Takamasa Yoshizaka','Le Corbusier Disciple','Brutalist','Ochanomizu','Language School','1962','Mural'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Athenee_Francais.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Ath%C3%A9n%C3%A9e_Fran%C3%A7ais_-_Tokyo_-_DSC04852.JPG?width=800'
    ]
  },

  // ── ANTONIN RAYMOND ───────────────────────────────────────────

  {
    id:'tok-0059',
    name:'St. Anselm\'s Church',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Antonin Raymond', archs:['Antonin Raymond'],
    yr:1954, access:'Open to Public',
    lat:35.6551, lng:139.7259,
    addr:'4-chōme-6-22 Kamiosaki, Shinagawa City, Tokyo', hood:'Meguro / Gotanda',
    localName:'カトリック目黒教会（聖アンセルモ教会）',
    localAddr:'東京都品川区上大崎4-6-22',
    localHood:'目黒 / 五反田',
    desc: 'St. Anselm\'s Church Meguro (1956) by Antonin Raymond pioneered Japan\'s first corrugated-shell structure, a geometric innovation applied to its austere concrete chapel. This postwar masterpiece fuses Raymond\'s Wright-influenced modernism with Benedictine contemplative space through structural daring and spiritual restraint.',
    hours:'Daily 9:00 AM – 5:00 PM · Mass times vary', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'Active Catholic parish. Visitors welcome during open hours. Please be respectful during services.',
    transit:'JR Namboku Mita → Meguro (5 min walk)',
    walkFrom:'Meguro Station: 5 min',
    tags:['Antonin Raymond','Church','Concrete','Meguro','1954','Modernism','Czech-American'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/St._Anselm%27s_Catholic_Church_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/St._Anselm%27s_Catholic_Church_2.jpg?width=800'
    ]
  },

  {
    id:'tok-0060',
    name:'Tokyo Women\'s Christian University Chapel',
    cc:'c-cul',
    cats:['Cultural','Religious'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Antonin Raymond', archs:['Antonin Raymond'],
    yr:1938, access:'Exterior Only',
    lat:35.7268, lng:139.5920,
    addr:'2-chōme-6-1 Zenpukuji, Suginami City, Tokyo', hood:'Nishi-Ogikubo',
    localName:'東京女子大学礼拝堂',
    localAddr:'東京都杉並区善福寺2-6-1',
    localHood:'西荻窪',
    desc: 'Tokyo Women\'s University Chapel (1938), designed by Antonin Raymond, features 42 colours of stained glass illuminating a concrete sanctuary. Modelled on Perret\'s Rancies chapel, it represents Raymond\'s wartime synthesis of European liturgical modernism and Japanese craft sensibility.',
    hours:'Campus: Mon–Sat daytime · Chapel: limited access', lastEntry:'',
    admission:'Campus exterior: free (public can walk grounds)',
    tourOk:false, tourInfo:'Active university campus. The grounds are accessible but buildings are generally restricted to students and staff. Best visited during open campus days.',
    transit:'JR → Nishi-Ogikubo (12 min walk) · JR → Kichijoji (bus)',
    walkFrom:'Nishi-Ogikubo Station: 12 min',
    tags:['Antonin Raymond','University','Chapel','Pre-War','Suginami','1938','Campus'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tonjo0156.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tonjo0159.jpg?width=800'
    ]
  },

  // ── DAVID CHIPPERFIELD ────────────────────────────────────────

  {
    id:'tok-0061',
    name:'The Okura Tokyo Heritage Wing',
    cc:'c-com',
    cats:['Commercial','Cultural'],
    styleGroups:['Contemporary','Modernist'],
    era:'2000–Present', city:'tokyo',
    arch:'Taniguchi and Associates / Shimizu Corporation', archs:['Yoshio Taniguchi','Shimizu Corporation'],
    yr:2019, access:'Open to Public',
    lat:35.6655, lng:139.7439,
    addr:'2-chōme-10-4 Toranomon, Minato City, Tokyo', hood:'Toranomon',
    localName:'The Okura Tokyo',
    localAddr:'東京都港区虎ノ門2-10-4',
    localHood:'虎ノ門',
    desc: 'The Okura Tokyo Heritage Wing embodies postwar Japanese hotel architecture designed by Taniguchi Yoshiro. Originally opened in 1962, the iconic open-lobby atrium established a template for modern luxury hospitality. The 2019 Heritage Wing respectfully recreates this spatial language through son Taniguchi Yoshio\'s design, preserving the iconic lobby that earned worldwide admiration through decades of refined elegance.',
    hours:'Lobby: 24/7 (hotel guests and visitors) · Restaurant reservations recommended', lastEntry:'',
    admission:'Lobby: free to visit',
    tourOk:true, tourInfo:'The Heritage Wing lobby is freely accessible and worth visiting specifically for its architecture. No reservation needed to view the lobby.',
    transit:'Hibiya → Kamiyacho (5 min walk) · Namboku → Tameike-Sanno (5 min)',
    walkFrom:'Kamiyacho Station: 5 min · US Embassy: 2 min · Azabudai Hills: 8 min',
    tags:['Yoshio Taniguchi','Hotel Okura','Heritage','Lobby','Toranomon','2019','Reconstruction','Lantern'],
    photos:[]
  },

  {
    id:'tok-0062',
    name:'Valentino Ginza',
    cc:'c-com',
    cats:['Commercial'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'David Chipperfield', archs:['David Chipperfield Architects'],
    yr:2007, access:'Open to Public',
    lat:35.6712, lng:139.7643,
    addr:'5-chōme-9-5 Ginza, Chuo City, Tokyo', hood:'Ginza',
    localName:'ヴァレンティノ銀座',
    localAddr:'東京都中央区銀座5-9-5',
    localHood:'銀座',
    desc: 'Valentino Ginza showcases refined contemporary retail architecture within Ginza. David Chipperfield\'s design features full-height metal mesh facade softly mediating street light by day and glowing with interior luminescence at night. Minimalist black metal entrance harmonises with surrounding architectural language, creating a gallery-like sanctuary for sophisticated retail experience.',
    hours:'Daily 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Operating luxury retail store. The facade and ground floor are the primary architectural experience.',
    transit:'Ginza Marunouchi Hibiya → Ginza (3 min walk)',
    walkFrom:'Ginza Station: 3 min · Maison Hermès: 2 min · Tokyu Plaza Ginza: 4 min',
    tags:['David Chipperfield','Pritzker','Valentino','Ginza','Flagship Store','2007'],
    photos:[]
  },

  // ── STEVEN HOLL ───────────────────────────────────────────────

  {
    id:'tok-0063',
    name:'Makuhari Housing',
    cc:'c-res',
    cats:['Residential'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Steven Holl', archs:['Steven Holl Architects'],
    yr:1996, access:'Exterior Only',
    lat:35.6472, lng:140.0384,
    addr:'2-chōme Mihama, Mihama-ku, Chiba City, Chiba', hood:'Makuhari (Chiba)',
    localName:'幕張ベイタウン パティオス4番街',
    localAddr:'千葉県千葉市美浜区美浜2丁目',
    localHood:'幕張（千葉）',
    desc: 'Makuhari Housing Patios 4th Street represents thoughtful residential urbanism in Makuhari Bay Town, Chiba. This mixed-use residential complex completed in 1995 embraces European-influenced planning principles with modern Japanese sensibilities, creating an orderly streetscape and pedestrian-scaled architecture that balances contemporary comfort with human-centred design.',
    hours:'Exterior: 24/7 · Interior: private residences', lastEntry:'',
    admission:'Exterior only',
    tourOk:false, tourInfo:'Private residential complex. The courtyards and facades can be viewed from public pathways around the complex.',
    transit:'JR Keiyo → Kaihin-Makuhari (10 min walk)',
    walkFrom:'Kaihin-Makuhari Station: 10 min',
    tags:['Steven Holl','Housing','Makuhari','Chiba','Courtyard','1996','Residential'],
    photos:[]
  },

  // ── TRADITIONAL & HISTORIC — TEMPLES & SHRINES ────────────────

  {
    id:'tok-0064',
    name:'Sensō-ji',
    cc:'c-rel',
    cats:['Religious','Landmarks'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:645, access:'Open to Public',
    lat:35.7148, lng:139.7967,
    addr:'2-chōme-3-1 Asakusa, Taito City, Tokyo', hood:'Asakusa',
    localName:'浅草寺',
    localAddr:'東京都台東区浅草2-3-1',
    localHood:'浅草',
    desc: 'Sensoji Temple\'s Main Hall represents postwar restoration of Tokyo\'s spiritual heritage. Destroyed in the 1945 firebombing, the 1958 reinforced concrete reconstruction preserves original proportions while adapting materials for permanence. This temple dating to 628 CE balances structural durability with classical temple forms, serving millions of annual pilgrims as Tokyo\'s oldest and most visited sacred site.',
    hours:'Temple grounds: 24/7 · Main Hall: 6:00 AM – 5:00 PM (Oct–Mar from 6:30)', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'Freely accessible at all times. The grounds are especially atmospheric at night when the gates are illuminated. Nakamise shopping street shops close by early evening.',
    transit:'Ginza Asakusa Tobu → Asakusa (5 min walk)',
    walkFrom:'Asakusa Station: 5 min · Asakusa Culture Tourist Info Center: 1 min · Tokyo Skytree: 15 min',
    tags:['Temple','Traditional','Asakusa','Kaminarimon','Buddhist','645 AD','Oldest Tokyo','Pagoda'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_during_snowfall_-_Flickr_-_Manish_Prabhune.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_-_Senso-ji_35_%2815576702197%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/100_views_edo_039.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hozomon_Gate%28left%29%E3%83%BBFive-storied_Pagoda%28center%29%E3%83%BBFortune_Slip_Shop%28right%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hozomon_on_an_overcast_day_dllu.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hozomon_sensoji_back.jpg?width=800'
    ]
  },

  {
    id:'tok-0065',
    name:'Meiji Shrine',
    cc:'c-rel',
    cats:['Religious','Landmarks','Public'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:1920, access:'Open to Public',
    lat:35.6764, lng:139.6993,
    addr:'1-1 Yoyogikamizonocho, Shibuya City, Tokyo', hood:'Harajuku / Yoyogi',
    localName:'明治神宮',
    localAddr:'東京都渋谷区代々木神園町1-1',
    localHood:'原宿 / 代々木',
    desc: 'Meiji Shrine embodies Japanese spirituality within Tokyo\'s urban forest. The original 1920 main hall was rebuilt in 1958 after wartime destruction. Surrounded by an intentionally cultivated 100-acre forest planted from 100,000 donated trees by landscape experts, the shrine creates tranquil sanctuary honouring Emperor and Empress Meiji amid urban density, demonstrating the power of landscape architecture as spiritual medium.',
    hours:'Sunrise to sunset (varies seasonally, approx. 5:00 AM – 6:30 PM)', lastEntry:'',
    admission:'Free (shrine) · Museum: ¥1,000',
    tourOk:true, tourInfo:'Freely accessible during daylight hours. The inner garden (Gyoen, ¥500) features an iris garden and is especially beautiful in June. Arrive early to avoid crowds.',
    transit:'JR → Harajuku (1 min walk) · Chiyoda Fukutoshin → Meiji-jingumae (5 min)',
    walkFrom:'Harajuku Station: 1 min · Yoyogi National Gymnasium: 5 min · Omotesando: 10 min',
    tags:['Shinto','Traditional','Harajuku','Forest','Meiji Emperor','1920','Sacred','Kengo Kuma Museum'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_Meiji_Shrine.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Emperor-Meiji-Empress-Shoken-Meiji-Shrine-c1926.png?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji_Jingu_2023-3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji_Shrine%2C_Barrels_of_sake.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji_Shrine-2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji_Shrine-4.jpg?width=800'
    ]
  },

  {
    id:'tok-0066',
    name:'Zōjō-ji',
    cc:'c-rel',
    cats:['Religious','Landmarks'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:1393, access:'Open to Public',
    lat:35.6579, lng:139.7481,
    addr:'4-chōme-7-35 Shibakoen, Minato City, Tokyo', hood:'Shiba / Tokyo Tower',
    localName:'増上寺',
    localAddr:'東京都港区芝公園4-7-35',
    localHood:'芝 / 東京タワー',
    desc: 'Zojoji Temple\'s contemporary Main Hall, completed 1974, represents postwar Buddhist architecture at its finest. This reinforced concrete structure masterfully integrates traditional temple forms with modern structural clarity. The building demonstrates how contemporary materials serve spiritual expression while preserving 650 years of temple history, a pioneering example of heritage-conscious modernism in Japanese sacred architecture.',
    hours:'Temple grounds: daily 6:00 AM – 5:30 PM · Treasure Gallery: 10:00 AM – 4:00 PM', lastEntry:'',
    admission:'Temple grounds: free · Treasure Gallery: ¥700',
    tourOk:true, tourInfo:'Freely accessible. The Tokugawa mausoleum area requires a separate ticket. The Sangedatsumon gate is the architectural highlight. Famous view: Tokyo Tower framed behind the main hall.',
    transit:'Mita → Onarimon (3 min walk) · Oedo → Daimon (5 min)',
    walkFrom:'Onarimon Station: 3 min · Tokyo Tower: 5 min · Hamamatsucho Station: 8 min',
    tags:['Temple','Buddhist','Traditional','Tokugawa','Tokyo Tower View','Sangedatsumon','1622 Gate','Shiba'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/20110405-TokyoTower-Sakura01.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/100_views_edo_049.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/100_views_edo_079.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kawase_Z%C3%B4j%C3%B4ji.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mausoleum_of_Sugenin.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mausoleum_of_Taitokuin.JPG?width=800'
    ]
  },

  {
    id:'tok-0067',
    name:'Nezu Shrine',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:1706, access:'Open to Public',
    lat:35.7206, lng:139.7614,
    addr:'1-chōme-28-9 Nezu, Bunkyo City, Tokyo', hood:'Nezu / Yanaka',
    localName:'根津神社',
    localAddr:'東京都文京区根津1-28-9',
    localHood:'根津 / 谷中',
    desc: 'Nezu Shrine preserves Edo period architectural magnificence through its Gongen-zuri style buildings. The current structures date to 1706, commissioned by shogun Tokugawa Ienobu as a unified national construction project. Postwar restoration lovingly recreated ornate gilt details and structural integrity, maintaining the shrine\'s role as living monument to Edo craftsmanship and spiritual continuity.',
    hours:'Grounds: daily 6:00 AM – 5:00 PM · Azalea Festival: April', lastEntry:'',
    admission:'Free (Azalea garden: ¥300 during festival)',
    tourOk:true, tourInfo:'Freely accessible. The azalea festival in April draws large crowds. The torii tunnel on the hillside is photogenic year-round. Combine with a walk through the Yanaka/Nezu/Sendagi historic district.',
    transit:'Chiyoda → Nezu (5 min walk) · Namboku → Todaimae (5 min)',
    walkFrom:'Nezu Station: 5 min · University of Tokyo: 10 min · Ueno Park: 15 min',
    tags:['Shinto','Traditional','Edo Period','1706','Torii Tunnel','Azalea','Important Cultural Property','Nezu'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Shrine_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu-jinja-4.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_jinja_-_Honden_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_jinja_-_Honden_11.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_jinja_-_Honden_12.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_jinja_-_Sukibei_2.jpg?width=800'
    ]
  },

  {
    id:'tok-0068',
    name:'Imperial Palace East Gardens',
    cc:'c-pub',
    cats:['Public','Landmarks'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional / Landscape', archs:['Traditional'],
    yr:1968, access:'Open to Public',
    lat:35.6875, lng:139.7553,
    addr:'1-1 Chiyoda, Chiyoda City, Tokyo', hood:'Marunouchi / Imperial Palace',
    localName:'皇居東御苑',
    localAddr:'東京都千代田区千代田1-1',
    localHood:'丸の内 / 皇居',
    desc: 'Imperial Palace East Gardens comprise the former Edo Castle\'s residential core, now a public landscape museum opened in 1968 following postwar democratisation. Carefully preserved Edo-period gates and contemporary additions demonstrate how historical sites adapt to public use while respecting authentic heritage, offering layered experience of feudal, imperial, and democratic spatial histories.',
    hours:'Tue–Sun 9:00 AM – varies seasonally (4:00 PM Nov–Feb, 5:00 PM Mar/Sep/Oct, 6:00 PM Apr–Aug) · Closed Mon & Fri', lastEntry:'30 min before closing',
    admission:'Free',
    tourOk:true, tourInfo:'Free admission through the Otemon Gate. Bag check at entrance. The Ninomaru Garden is the primary landscape destination; the castle keep foundations offer city views.',
    transit:'Marunouchi Tozai Chiyoda → Otemachi (5 min walk)',
    walkFrom:'Otemachi Station: 5 min · Tokyo Station: 10 min · Otemachi One: 5 min',
    tags:['Imperial Palace','Garden','Edo Castle','Traditional','Free','Marunouchi','Stone Walls','Landscape'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Imperial_Palace_Tokyo_East_Garden_View.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_East_Gardens_of_the_Imperial_Palace_%28Edo_Castle_Ruin%29_entrance_by_Don_Ramey_Logan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Imperial_Palace_East_Gardens_%283800901533%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Imperial_Palace_East_Garden_Japan_1989_air.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Street_light%2C_East_Gardens_of_the_Imperial_Palace_-_Tokyo%2C_Japan_-_DSC09018.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Imperial_Palace_East_Gardens_%289000324274%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0069',
    name:'Rikugi-en',
    cc:'c-pub',
    cats:['Public'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Yanagisawa Yoshiyasu', archs:['Yanagisawa Yoshiyasu'],
    yr:1702, access:'Open to Public',
    lat:35.7329, lng:139.7468,
    addr:'6-chōme-16-3 Honkomagome, Bunkyo City, Tokyo', hood:'Komagome',
    localName:'六義園',
    localAddr:'東京都文京区本駒込6-16-3',
    localHood:'駒込',
    desc: 'Rikugi-en Garden represents the apotheosis of Edo period landscape design. Created over seven years (1695-1702) by daimyo Yanagisawa Yoshiyasu, incorporating profound literary references to classical poetry\'s six principles, this circuit-style garden features meticulously composed views of Japanese and Chinese landscape types. An exemplary document of early modern Japanese aesthetic philosophy embedded in topography.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM) · Extended hours during illumination events', lastEntry:'4:30 PM',
    admission:'¥300',
    tourOk:true, tourInfo:'English pamphlet available. Spring cherry blossom and autumn maple illumination events (evening) are particularly popular and may require queuing.',
    transit:'JR Namboku → Komagome (2 min walk)',
    walkFrom:'Komagome Station: 2 min',
    tags:['Garden','Edo Period','1702','Strolling Garden','Cherry Blossom','Autumn Leaves','Illumination','Komagome'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/View_from_Fujishiro-toge_Hill_at_Rikugi-en_Garden%2C_Tokyo_%28Detail%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rikugi-en_20181124-2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rikugi-en_20181124-1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rikugi-en_20181124-3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rikugi-en_Gardens%2C_Tokyo%3B_November_2012_%2801%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Rikugi-en_Gardens%2C_Tokyo%3B_November_2012_%2806%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0070',
    name:'Koishikawa Kōrakuen',
    cc:'c-pub',
    cats:['Public'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Tokudaiji Michifusa / Zhu Shunshui', archs:['Tokudaiji Michifusa','Zhu Shunshui'],
    yr:1629, access:'Open to Public',
    lat:35.7056, lng:139.7509,
    addr:'1-chōme-6-6 Koraku, Bunkyo City, Tokyo', hood:'Iidabashi / Suidobashi',
    localName:'小石川後楽園',
    localAddr:'東京都文京区後楽1-6-6',
    localHood:'飯田橋 / 水道橋',
    desc: 'Koishikawa Korakuen exemplifies early Edo daimyo landscape philosophy. Created by Mito domain founder Tokugawa Yorifusa beginning 1629 and perfected by son Mitsukuni, this garden synthesises Japanese composition with Chinese literati influences through advisor Zhu Shunshui. The name derives from Ouyang Xiu, embedding neo-Confucian ethics into design. Designated special historic site and scenic beauty, it remains East Asia\'s oldest completed daimyo garden.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM)', lastEntry:'4:30 PM',
    admission:'¥300',
    tourOk:true, tourInfo:'English pamphlet available. Less crowded than Rikugi-en. The full-moon bridge and plum grove (February) are highlights.',
    transit:'Oedo Tozai Namboku → Iidabashi (3 min walk) · JR → Suidobashi (5 min)',
    walkFrom:'Iidabashi Station: 3 min · Tokyo Dome: 2 min',
    tags:['Garden','Edo Period','1629','Oldest Tokyo Garden','Chinese Influence','Full-Moon Bridge','Special Historic Site'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_-_Bunky%C5%8D-ku%2C_Tokyo%2C_Japan_-_DSC09183.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_-_Benzai-Tenno-Miya.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_Garden_%40_Tokyo_%289114156093%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_-_Naitei_and_Tokyo_Dome.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_%282008.09%29.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koishikawa_Korakuen_Garden%2C_Tokyo.jpg?width=800'
    ]
  },

  {
    id:'tok-0071',
    name:'Asakusa Shrine',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:1649, access:'Open to Public',
    lat:35.7148, lng:139.7978,
    addr:'2-chōme-3-1 Asakusa, Taito City, Tokyo', hood:'Asakusa',
    localName:'浅草神社',
    localAddr:'東京都台東区浅草2-3-1',
    localHood:'浅草',
    desc: 'Asakusa Shrine preserves Edo period Gongen-zuri architecture adjacent to Sensoji. The current buildings donated by shogun Tokugawa Iemitsu in 1649 feature exemplary timber joinery and gilded ornamental details. Careful postwar restoration revived the original vibrant polychrome palette, with the registered Important Cultural Property exemplifying how Edo sacred architecture survives as both spiritual centre and architectural document.',
    hours:'Grounds: 24/7 · Main hall: 9:00 AM – 4:30 PM', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'Adjacent to Sensō-ji — visit both together. The Sanja Matsuri (third weekend of May) is one of Tokyo\'s largest festivals.',
    transit:'Ginza Asakusa → Asakusa (5 min walk)',
    walkFrom:'Sensō-ji Main Hall: 1 min · Asakusa Station: 5 min',
    tags:['Shinto','Traditional','Edo Period','1649','Important Cultural Property','Sanja Matsuri','Asakusa'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Shrine_2024.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_shrine_2012.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_-_Tokyo_%28Asakusa%29_%2810005265814%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tori-no-Ichi_2011%2C_Asakusa%2C_Tokyo%2C_Japan.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa%2C_Tokyo%2C_Japan_%286936222869%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_-_Senso-ji_82_%2815163996964%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0072',
    name:'Kanda Shrine',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Traditional', archs:['Traditional'],
    yr:1934, access:'Open to Public',
    lat:35.7022, lng:139.7682,
    addr:'2-chōme-16-2 Sotokanda, Chiyoda City, Tokyo', hood:'Akihabara / Ochanomizu',
    localName:'神田明神（神田神社）',
    localAddr:'東京都千代田区外神田2-16-2',
    localHood:'秋葉原 / 御茶ノ水',
    desc: 'Kanda Shrine\'s 1934 reconstruction represents innovative adaptation of traditional shrine architecture. After the 1923 earthquake, this rare ferro-concrete structure designed to evoke Edo Gongen forms using modern materials withstood the 1945 firebombing. The registered important cultural properties demonstrate how 20th-century engineering solved seismic and fire risks while preserving cultural continuity in downtown Tokyo.',
    hours:'Grounds: 24/7 · Main hall: 9:00 AM – 4:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'Freely accessible. The Kanda Matsuri (mid-May, odd years) is one of Tokyo\'s three great festivals. Combine with a visit to nearby Akihabara.',
    transit:'JR → Ochanomizu (5 min walk) · Ginza Marunouchi → Suehirocho (5 min)',
    walkFrom:'Ochanomizu Station: 5 min · Akihabara Station: 7 min · Athénée Français: 5 min',
    tags:['Shinto','Traditional','730 AD','Concrete Reconstruction','Akihabara','Kanda Matsuri','1934'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kanda-Myojin_torii.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kanda-Myojin_2012.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/KandaMyojin8816.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/100_views_edo_010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/KandaMyojinGate8837.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/KandaMyojinLanterns8758.jpg?width=800'
    ]
  },

  // ── MJ'S SPECIFIC ADDITIONS — GARDENS & SHRINES ───────────────

  {
    id:'tok-0073',
    name:'Hamarikyu Gardens',
    cc:'c-pub',
    cats:['Public','Landmarks'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Tokugawa Shogunate', archs:['Tokugawa Shogunate'],
    yr:1654, access:'Open to Public',
    lat:35.6596, lng:139.7638,
    addr:'1-1 Hamarikyuteien, Chuo City, Tokyo', hood:'Shiodome / Tsukiji',
    localName:'浜離宮恩賜庭園',
    localAddr:'東京都中央区浜離宮庭園1-1',
    localHood:'汐留 / 築地',
    desc: 'Hamarikyu Gardens\' tidal-inlet design exemplifies Edo shogunal landscape aesthetics. Developed from 1654 and refined by successive shoguns, this 23-hectare garden features Tokyo Bay\'s unique tidal mechanism as compositional element. Unlike sister gardens that lost tidal action, Hamarikyu\'s saline pool still rises and falls with the bay, preserving authentic landscape choreography designated special historic site and scenic beauty.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM)', lastEntry:'4:30 PM',
    admission:'¥300',
    tourOk:true, tourInfo:'English pamphlet available. The teahouse on the pond serves matcha (¥510). Water bus service connects Hamarikyu to Asakusa — a scenic way to arrive. Combine with a visit to Tsukiji Outer Market.',
    transit:'Oedo Yurikamome → Shiodome (5 min walk) · Oedo → Tsukijishijo (7 min)',
    walkFrom:'Shiodome Station: 5 min · Dentsu Building (Nouvel): 3 min · Tsukiji Outer Market: 8 min',
    tags:['Garden','Edo Period','1654','Tidal Garden','Teahouse','Tokugawa','Shiodome Skyline','Water Bus'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2018_Hama-riky%C5%AB_Garden_02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/France_Loiret_La_Bussiere_Potager_05.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bjh42_Yedo_TycoonGarden.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/HamaRikyuAutumn.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hamarikyu_Garden_as_seen_from_Shiodome.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hamarikyu_Gardens.jpg?width=800'
    ]
  },

  {
    id:'tok-0074',
    name:'Kiyosumi Garden',
    cc:'c-pub',
    cats:['Public'],
    styleGroups:['Traditional','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Iwasaki Yatarō (patron)', archs:['Iwasaki Yatarō'],
    yr:1878, access:'Open to Public',
    lat:35.6810, lng:139.7987,
    addr:'3-chōme-3-9 Kiyosumi, Koto City, Tokyo', hood:'Kiyosumi-Shirakawa',
    localName:'清澄庭園',
    localAddr:'東京都江東区清澄3-3-9',
    localHood:'清澄白河',
    desc: 'Kiyosumi Garden represents Meiji entrepreneurial patronage of landscape design. Created from 1878 by Mitsubishi founder Iwasaki Yataro, the circuit garden designed by tea practitioner Isogai Souyo incorporates famous stones from across Japan. Though damaged in earthquakes, the garden embodies the literati tradition, with Josiah Conder\'s 1885 red-brick villa reflecting the site\'s cosmopolitan Meiji character.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM)', lastEntry:'4:30 PM',
    admission:'¥150',
    tourOk:true, tourInfo:'Compact garden ideal for a focused 30–45 minute visit. Combine with the surrounding Kiyosumi-Shirakawa coffee shops. Less crowded than central Tokyo gardens.',
    transit:'Hanzomon Oedo → Kiyosumi-Shirakawa (3 min walk)',
    walkFrom:'Kiyosumi-Shirakawa Station: 3 min · Museum of Contemporary Art Tokyo: 10 min',
    tags:['Garden','Meiji Era','Mitsubishi','Stepping Stones','Kiyosumi-Shirakawa','1878','Strolling Garden'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi_Teien_-_Japanese_gardern_1.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-1.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-2.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-3.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-4.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kiyosumi-7.JPG?width=800'
    ]
  },

  {
    id:'tok-0075',
    name:'Hie Shrine',
    cc:'c-rel',
    cats:['Religious'],
    styleGroups:['Traditional'],
    era:'1930–1969', city:'tokyo',
    arch:'Traditional (reconstructed 1967)', archs:['Traditional'],
    yr:1478, access:'Open to Public',
    lat:35.6757, lng:139.7398,
    addr:'2-chōme-10-5 Nagatacho, Chiyoda City, Tokyo', hood:'Akasaka / Nagatacho',
    localName:'日枝神社',
    localAddr:'東京都千代田区永田町2-10-5',
    localHood:'赤坂 / 永田町',
    desc: 'Hie Shrine demonstrates continuous sacred architecture across Tokyo\'s transformation. Founded 1478 by Ota Dokan and relocated to current Akasaka site in 1659, the shrine embodies spiritual continuity. The 1958 reconstruction respectfully recreated spatial and iconographic essence after 1945 destruction. Modern additions demonstrate how sacred architecture evolves while maintaining authority across centuries of social upheaval.',
    hours:'Daily 5:00 AM – 6:00 PM (Oct–Mar until 5:00 PM)', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'Freely accessible. The torii gate tunnel on the south (Akasaka) side is the most photogenic approach. Escalator available for less mobile visitors. Combine with nearby Akasaka dining.',
    transit:'Ginza Namboku → Tameike-Sanno (3 min walk) · Chiyoda → Akasaka (3 min)',
    walkFrom:'Tameike-Sanno Station: 3 min · National Diet Building: 5 min',
    tags:['Shinto','Traditional','Torii Tunnel','Nagatacho','Sanno Matsuri','1478','Government District'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hie_Shrine_Big_Torii_with_escalators_in_the_background.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hie_Shrine_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hie_Shrine_Torii.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hie_Shrine_Torii_row.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Escalator_at_Hie_Shrine.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hie_Shrine_big_Torii.jpg?width=800'
    ]
  },

  {
    id:'tok-0076',
    name:'Kyu-Furukawa Gardens',
    cc:'c-pub',
    cats:['Public','Residential'],
    styleGroups:['Traditional','Western','Landscape'],
    era:'Pre-1930', city:'tokyo',
    arch:'Josiah Conder', archs:['Josiah Conder','Ogawa Jihei'],
    yr:1917, access:'Open to Public',
    lat:35.7429, lng:139.7389,
    addr:'1-chōme-27-39 Nishigahara, Kita City, Tokyo', hood:'Komagome / Nishigahara',
    localName:'旧古河庭園',
    localAddr:'東京都北区西ヶ原1-27-39',
    localHood:'駒込 / 西ヶ原',
    desc: 'Kyu-Furukawa Gardens showcase Josiah Conder\'s Western domestic architecture framed by classical landscape. The 1917 manor house exhibits Neo-Renaissance detailing with first-floor Western spaces contrasting Japanese second-floor quarters. Garden designer Ogawa Jihei integrated the mansion into a classical stroll garden, epitomising Meiji-Taisho elite culture where Western forms served cosmopolitan life within Japanese aesthetic frameworks.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM)', lastEntry:'4:30 PM',
    admission:'¥150',
    tourOk:true, tourInfo:'The rose garden is at its peak in May and October. The Japanese garden is especially beautiful in autumn. Interior mansion tours are available on limited dates (check website).',
    transit:'JR → Komagome (12 min walk) · Namboku → Nishigahara (7 min)',
    walkFrom:'Nishigahara Station: 7 min · Rikugi-en: 10 min',
    tags:['Josiah Conder','Western Mansion','Japanese Garden','Rose Garden','Meiji Era','1917','Ogawa Jihei'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Western-style_garden_%40_Kyu-Furukawa_Gardens_%289105373412%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Furukawa_Gardens_%289103145153%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Furukawa_Gardens_%289105383586%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Furukawa_Gardens_%289103154003%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lantern_%40_Kyu-Furukawa_Gardens_%289103155039%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lantern_%40_Kyu-Furukawa_Gardens_%289105387190%29.jpg?width=800'
    ]
  },

  {
    id:'tok-0077',
    name:'Kyu-Iwasaki-tei Garden',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Josiah Conder', archs:['Josiah Conder'],
    yr:1896, access:'Open to Public',
    lat:35.7112, lng:139.7699,
    addr:'1-chōme-3-45 Ikenohata, Taito City, Tokyo', hood:'Ueno / Yushima',
    localName:'旧岩崎邸庭園',
    localAddr:'東京都台東区池之端1-3-45',
    localHood:'上野 / 湯島',
    desc: 'Kyu-Iwasaki-tei\'s Western mansion represents apex Meiji neo-Jacobean design. Commissioned by Mitsubishi\'s Hisaya Iwasaki in 1896, Josiah Conder created a two-story wooden villa with 17th-century English vocabularies combining Tuscan columns below, Ionic above, with Islamic ornamental motifs. Designated important cultural property, documenting Western architectural aspiration and Conder\'s central role in establishing Meiji institutional modernism.',
    hours:'Daily 9:00 AM – 5:00 PM (last entry 4:30 PM)', lastEntry:'4:30 PM',
    admission:'¥400',
    tourOk:true, tourInfo:'Interior of the Western mansion is accessible (shoe removal required). Audio guide available. Photography restricted in some interior rooms. English signage throughout.',
    transit:'Chiyoda → Yushima (3 min walk) · Ginza → Ueno-hirokoji (5 min)',
    walkFrom:'Yushima Station: 3 min · Ueno Station: 10 min · National Museum of Western Art: 12 min',
    tags:['Josiah Conder','Meiji Era','Mitsubishi','Western Mansion','Important Cultural Property','1896','Jacobean'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Former_Iwasaki_Family_House_and_Garden_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu_Iwasaki_Tei_Garden_%28180139793%29.jpeg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Iwasaki-tei_Gardens_%40_Ueno_%2811096196424%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Iwasaki-tei_Gardens_%40_Ueno_%2811096171256%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Iwasaki-tei_Gardens_%40_Ueno_%2811096197174%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kyu-Iwasaki-tei_Gardens_%40_Ueno_%2811096199244%29.jpg?width=800'
    ]
  },

  // ── EDO-TOKYO OPEN AIR MUSEUM ─────────────────────────────────

  {
    id:'tok-0078',
    name:'Edo-Tokyo Open Air Architectural Museum',
    cc:'c-cul',
    cats:['Cultural','Landmarks'],
    styleGroups:['Traditional','Modernist'],
    era:'1970–1999', city:'tokyo',
    arch:'Various (relocated buildings)', archs:['Various'],
    yr:1993, access:'Open to Public',
    lat:35.7156, lng:139.5096,
    addr:'3-chōme-7-1 Sakuracho, Koganei City, Tokyo', hood:'Koganei',
    localName:'江戸東京たてもの園',
    localAddr:'東京都小金井市桜町3-7-1',
    localHood:'小金井',
    desc: 'Edo-Tokyo Open-Air Architectural Museum preserves thirty relocated buildings spanning Edo through early Showa periods. Established 1993, the museum reclaims historically significant structures threatened by development: bathhouses, merchant homes, sake breweries, and samurai residences. Three landscape zones document architectural evolution and building technologies while enabling hands-on historical experience.',
    hours:'Tue–Sun 9:30 AM – 5:30 PM (Oct–Mar until 4:30 PM) · Closed Mon', lastEntry:'30 min before closing',
    admission:'¥400',
    tourOk:true, tourInfo:'Allow 2–3 hours minimum. The Shitamachi commercial street and the Maekawa residence are highlights. The museum shop sells architectural books. Studio Ghibli fans should visit the Kodakara-yu bathhouse.',
    transit:'JR → Musashi-Koganei (bus 5 min) · Seibu → Hanakoganei (walk 5 min)',
    walkFrom:'Musashi-Koganei Station: 25 min (or bus) · Hanakoganei Station: 5 min',
    tags:['Open Air Museum','Edo Period','Meiji','Taisho','Relocated Buildings','Spirited Away','Maekawa House','Koganei'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Bar-Kagiya.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Edo-Tokyo_Open_Air_Architectural_Museum_PB252276.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Edo-tokyo-tatemono_okawa.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Edo-tokyo-tatemono_toden.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Edotokyo-tatemonoen.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Farmhouse-of-Tsunashima-Family-00.jpg?width=800'
    ]
  },

  // ── TOKYO TOWER ───────────────────────────────────────────────

  {
    id:'tok-0079',
    name:'Tokyo Tower',
    cc:'c-lmk',
    cats:['Landmarks'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Tachū Naitō', archs:['Tachū Naitō','Nikken Sekkei'],
    yr:1958, access:'Open to Public',
    lat:35.6586, lng:139.7454,
    addr:'4-chōme-2-8 Shibakoen, Minato City, Tokyo', hood:'Shiba / Shibakoen',
    localName:'東京タワー',
    localAddr:'東京都港区芝公園4-2-8',
    localHood:'芝 / 芝公園',
    desc: 'Tokyo Tower represents postwar Japan\'s technological optimism through structural innovation. Architect Naito Tatchu designed this 333-metre steel lattice tower (1957-1958) to surpass the Eiffel Tower, creating Tokyo\'s symbol of reconstruction. The trilinear truss structure absorbs seismic and wind forces through engineered flexibility, a metaphor for postwar resilience and 1950s modernist confidence.',
    hours:'Main Deck: 9:00 AM – 11:00 PM · Top Deck Tour: 9:00 AM – 10:45 PM', lastEntry:'10:30 PM (Main), 10:15 PM (Top)',
    admission:'Main Deck: ¥1,200 · Top Deck Tour: ¥2,800',
    tourOk:true, tourInfo:'The Top Deck Tour includes a guided experience with projection mapping. An outdoor staircase walk (600 steps) to the Main Deck is available on weekends and holidays. Night views are particularly popular.',
    transit:'Oedo → Akabanebashi (5 min walk) · Mita → Onarimon (6 min)',
    walkFrom:'Onarimon Station: 6 min · Zōjō-ji: 3 min · Azabudai Hills: 10 min · Roppongi Hills: 15 min',
    tags:['Tokyo Tower','Landmark','1958','333m','Observation Deck','Tachū Naitō','Broadcasting','Icon'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Tower_Afterglow.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2011_Japan_Earthquake_Tokyo_Tower.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/20101225-tokyotower-tarotokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/BaseofTokyoTower.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shiba-koen%2C_aerial_view_on_Tokyo_Tower_at_dusk_%28Unsplash%29.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Tower_1961.jpg?width=800'
    ]
  },

// ── MEIJI-ERA HISTORIC BUILDINGS ──────────────────────────────

  {
    id:'tok-0080',
    name:'Nikolai Cathedral (Holy Resurrection Cathedral)',
    cc:'c-rel',
    cats:['Religious','Landmarks'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Josiah Conder / Shinichiro Okada', archs:['Josiah Conder','Shinichiro Okada'],
    yr:1891, access:'Open to Public',
    lat:35.6969, lng:139.7655,
    addr:'4-1-3 Kanda Surugadai, Chiyoda City, Tokyo', hood:'Ochanomizu / Kanda',
    localName:'東京復活大聖堂（ニコライ堂）',
    localAddr:'東京都千代田区神田駿河台4-1-3',
    localHood:'御茶ノ水 / 神田',
    desc: 'Nikolai Cathedral represents 19th-century international Gothic Revival synthesised with Japanese craftsmanship. Begun 1884 from designs by Russian architect Schyurbulov and refined by Josiah Conder, the Byzantine-inflected structure features red-brick masonry culminating in a gleaming green-copper dome at 35 metres. Damaged in the 1923 earthquake, the 1929 restoration by Okada Shinichiro used reinforced concrete beneath original surfaces, preserving authentic exterior while modernising seismic resilience.',
    hours:'Oct–Mar: 1:00 PM – 3:30 PM · Apr–Sep: 1:00 PM – 4:00 PM', lastEntry:'',
    admission:'¥300 (photography not permitted inside)',
    tourOk:true, tourInfo:'Brief visiting hours. The dome exterior is best viewed from Hijiribashi Bridge. Located near Century Tower (Foster) and Athénée Français (Yoshizaka).',
    transit:'Chiyoda → Shin-Ochanomizu (1 min walk) · JR → Ochanomizu (4 min)',
    walkFrom:'Shin-Ochanomizu Station: 1 min · Century Tower: 3 min · Athénée Français: 3 min',
    tags:['Josiah Conder','Byzantine','Orthodox','Cathedral','1891','Important Cultural Property','Dome','Ochanomizu'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Resurrection_Cathedral_March_2019.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nikolai-do.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nikolai_do_Alex_K_01.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nicholai-Do_after_Great_Kanto_earthquake.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nikolai-do_1409.JPG?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/MatsumotoShunsuke_Nikolai_Cathedral_March_1941.png?width=800'
    ]
  },

  {
    id:'tok-0081',
    name:'Akasaka Palace (State Guest House)',
    cc:'c-cul',
    cats:['Cultural','Landmarks'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Katayama Tokuma', archs:['Katayama Tokuma'],
    yr:1909, access:'Open to Public',
    lat:35.6800, lng:139.7288,
    addr:'2-1-1 Moto-Akasaka, Minato City, Tokyo', hood:'Akasaka / Moto-Akasaka',
    localName:'迎賓館赤坂離宮',
    localAddr:'東京都港区元赤坂2-1-1',
    localHood:'赤坂 / 元赤坂',
    desc: 'Akasaka Palace represents Meiji court architecture at peak ambition. Architect Katayama Tokuma designed this 1909 Neo-Baroque palace combining Western magnificence with Japanese artistic traditions. Each room showcases different French, Empire, and Henri II styles alongside Japanese craftsmanship. Advanced features including electric lighting anticipated modern standards. Japan\'s sole Neo-Baroque palace became the first post-Meiji structure designated national treasure (2009).',
    hours:'Daily 10:00 AM – 5:00 PM (closed during state functions)', lastEntry:'4:00 PM',
    admission:'Main building + garden: ¥1,500 · Including Japanese Annex: ¥2,000',
    tourOk:true, tourInfo:'Timed entry; check website for closure days during state events. The Japanese-style annex by Taniguchi Yoshiro (1974) is also accessible.',
    transit:'Ginza Marunouchi → Aoyama-itchome (7 min walk)',
    walkFrom:'Aoyama-itchome Station: 7 min · Meiji Memorial Picture Gallery: 10 min',
    tags:['Neo-Baroque','National Treasure','State Guest House','1909','Katayama Tokuma','Palace','Diplomatic'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/2019_Akasaka_Palace_02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Akasaka_Palace-1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Akasaka_Palace_3.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Akasaka_Palace_5.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Akasaka_Palace_6.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/10sen_Stamp_of_Akasaka_Palace.JPG?width=800'
    ]
  },

  {
    id:'tok-0082',
    name:'Tokyo Station Marunouchi Building',
    cc:'c-lmk',
    cats:['Landmarks'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Kingo Tatsuno', archs:['Kingo Tatsuno'],
    yr:1914, access:'Open to Public',
    lat:35.6812, lng:139.7671,
    addr:'1-9-1 Marunouchi, Chiyoda City, Tokyo', hood:'Marunouchi',
    localName:'東京駅 丸の内駅舎',
    localAddr:'東京都千代田区丸の内1-9-1',
    localHood:'丸の内',
    desc: 'Tokyo Station\'s Marunouchi facade exemplifies Meiji institutional modernism. Architect Tatsuno Kingo designed this 1914 red-brick and white granite station combining British Queen Anne aesthetics with Japanese craftsmanship. Brick bonding patterns establish dignified horizontality befitting the transport nexus. Bombed in 1945, the 2012 restoration faithfully recreated southern and northern domes, restoring architectural completeness while preserving century-old structural authenticity.',
    hours:'Station: 24/7 · Tokyo Station Gallery: 10:00 AM – 6:00 PM (Fri until 8:00 PM)', lastEntry:'',
    admission:'Station: free · Gallery: varies by exhibition',
    tourOk:true, tourInfo:'The restored domes and facade are best viewed from the Marunouchi side plaza (KITTE rooftop garden offers an elevated view). The Tokyo Station Hotel occupies part of the building.',
    transit:'JR Marunouchi Chiyoda → Tokyo Station',
    walkFrom:'Imperial Palace: 10 min · Meiji Seimei Kan: 5 min · Otemachi One: 8 min',
    tags:['Kingo Tatsuno','Red Brick','1914','Restoration','Queen Anne','Important Cultural Property','Railway','Dome'],
    photos:[]
  },

  {
    id:'tok-0083',
    name:'Tokyo National Museum Hyokeikan',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Katayama Tokuma', archs:['Katayama Tokuma'],
    yr:1908, access:'Open to Public',
    lat:35.7186, lng:139.7739,
    addr:'13-9 Ueno Park, Taito City, Tokyo', hood:'Ueno',
    localName:'東京国立博物館 表慶館',
    localAddr:'東京都台東区上野公園13-9',
    localHood:'上野',
    desc: 'Tokyo National Museum Hyokeikan celebrates imperial commemoration through architectural grandeur. Designed 1901-1908 by Katayama Tokuma to honour Crown Prince Taisho\'s marriage, this Neo-Baroque structure features distinctive green-bronze domed rotunda with sophisticated mosaic tilework and sculptural programme. Designated important cultural property, demonstrating how Meiji institutional architecture combined Western monumentality with Japanese technical mastery.',
    hours:'Only during special exhibitions · Typically 9:30 AM – 5:00 PM', lastEntry:'',
    admission:'Varies by exhibition',
    tourOk:true, tourInfo:'Not always open. Check TNM website for exhibition schedule. The exterior is viewable from the museum grounds during regular hours.',
    transit:'JR → Ueno Park Exit (6 min walk)',
    walkFrom:'TNM Honkan: 2 min · National Museum of Western Art: 4 min · Tokyo Bunka Kaikan: 3 min',
    tags:['Katayama Tokuma','Baroque','1908','Museum','Ueno','Crown Prince Wedding','Dome'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hyokeikan_of_Tokyo_National_Museum_2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hyoukeikan.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_National_Museum_Hyokeikan_and_the_Tulip_Tree_P1022617.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_National_Museum_Hyokeikan_Entrance_Hall_Dome_P3303409.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_National_Museum_Hyokeikan_Staircase_P3303404.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Koizumi_Ueno.jpg?width=800'
    ]
  },

  {
    id:'tok-0084',
    name:'Sogakudo Concert Hall (Former Tokyo Music School)',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Yamaguchi Hanroku / Kuru Masamichi', archs:['Yamaguchi Hanroku','Kuru Masamichi'],
    yr:1890, access:'Open to Public',
    lat:35.7180, lng:139.7731,
    addr:'8-43 Ueno Park, Taito City, Tokyo', hood:'Ueno',
    localName:'旧東京音楽学校 奏楽堂',
    localAddr:'東京都台東区上野公園8-43',
    localHood:'上野',
    desc: 'Sogakudo Concert Hall pioneers Japanese modern concert architecture. Designed 1890 by government engineers as Tokyo Music School\'s auditorium, this Japanese-Western hybrid features slate-tiled roof, brick masonry, and innovative internal acoustics through curved vault ceiling. Relocated and restored 1987, this Important Cultural Property documents Japan\'s Meiji adaptation of Western music pedagogy through architecture blending Eastern formal traditions with Western requirements.',
    hours:'Tue–Sun 9:30 AM – 4:30 PM (check for closures)', lastEntry:'',
    admission:'¥300',
    tourOk:true, tourInfo:'Small, intimate concert hall. Occasional performances on the historic organ. Located within Ueno Park near the Tokyo National Museum.',
    transit:'JR → Ueno Park Exit (10 min walk)',
    walkFrom:'TNM Honkan: 3 min · National Museum of Western Art: 5 min',
    tags:['Concert Hall','Victorian','1890','Oldest Concert Hall','Organ','Important Cultural Property','Ueno','Music'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo01s2048.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo02s2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo03s2048.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo04s2010.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo05s2040.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sogakudo06s2000.jpg?width=800'
    ]
  },

  {
    id:'tok-0085',
    name:'Meiji Seimei Kan (Meiji Life Insurance Building)',
    cc:'c-com',
    cats:['Commercial','Landmarks'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Shinichiro Okada', archs:['Shinichiro Okada'],
    yr:1934, access:'Exterior Only',
    lat:35.6796, lng:139.7618,
    addr:'2-1-1 Marunouchi, Chiyoda City, Tokyo', hood:'Marunouchi',
    localName:'明治生命館',
    localAddr:'東京都千代田区丸の内2-1-1',
    localHood:'丸の内',
    desc: 'Meiji Seimei-kan represents zenith of Art Deco commercial modernism in Japan. Architect Okada Shinichiro created this 1934 eight-story monument combining Neo-Renaissance vocabulary with powerful Corinthian orders and Art Deco geometric severity. Okada tragically died during construction; his brother completed the masterwork. Designated important cultural property as first Showa-era building so honoured, exemplifying how modernist structure and classical ornament unified in service of institutional permanence.',
    hours:'Exterior: 24/7 · Interior: limited public access (weekend ground floor)', lastEntry:'',
    admission:'Free (exterior)',
    tourOk:true, tourInfo:'Weekend ground-floor viewing may be available. The facade is best appreciated from the Marunouchi Naka-dori approach. Adjacent to the Mitsubishi Ichigokan Museum (Conder replica).',
    transit:'JR → Tokyo Station Marunouchi South Exit (5 min walk) · Yurakucho → Yurakucho (5 min)',
    walkFrom:'Tokyo Station: 5 min · Tokyo International Forum: 3 min',
    tags:['Shinichiro Okada','Neoclassical','1934','Marunouchi','GHQ','Important Cultural Property','Insurance','Columns'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji-Life-Insurance-Building-01.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/%E6%98%8E%E6%B2%BB%E5%AE%89%E7%94%B0%E7%94%9F%E5%91%BD%E4%BF%9D%E9%99%BA%E7%9B%B8%E7%8E%8B%E4%BC%9A%E7%A4%BE.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji_life_insurance_building_2.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meijiseimeikan1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji-Life-Insurance-Building-02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meiji-Life-Insurance-Building-03.jpg?width=800'
    ]
  },

  {
    id:'tok-0086',
    name:'Tokyo National Museum Honkan (Main Building)',
    cc:'c-cul',
    cats:['Cultural','Landmarks'],
    styleGroups:['Traditional'],
    era:'1930–1969', city:'tokyo',
    arch:'Watanabe Jin', archs:['Watanabe Jin'],
    yr:1937, access:'Open to Public',
    lat:35.7189, lng:139.7766,
    addr:'13-9 Ueno Park, Taito City, Tokyo', hood:'Ueno',
    localName:'東京国立博物館 本館',
    localAddr:'東京都台東区上野公園13-9',
    localHood:'上野',
    desc: 'Tokyo National Museum Honkan synthesises Japanese architectural modernism. Architect Watanabe Jin won the 1931 competition from 273 entries with \'Teikangumi\' Imperial Crown style combining concrete rationality with traditional tiled roofing. Completed 1937, this structure pioneered fireproofing and anti-theft systems. The imposing symmetrical composition asserted Japanese institutional confidence, representing an era when modernism claimed authentic cultural synthesis.',
    hours:'Tue–Sun 9:30 AM – 5:00 PM (Fri–Sat until 9:00 PM)', lastEntry:'30 min before closing',
    admission:'¥1,000',
    tourOk:true, tourInfo:'Japan\'s premier art museum. Allow 2+ hours. The Hyokeikan and Gallery of Horyuji Treasures (Taniguchi) are on the same grounds.',
    transit:'JR → Ueno Park Exit (6 min walk)',
    walkFrom:'Ueno Station Park Exit: 6 min · National Museum of Western Art: 3 min · Keisei Ueno: 8 min',
    tags:['Watanabe Jin','Imperial Crown','Teikan','Museum','Ueno','1937','Japanese Art','National Treasure'],
    photos:[]
  },

  {
    id:'tok-0087',
    name:'Tokyo Metropolitan Teien Art Museum (Former Asakanomiya Residence)',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Traditional','Western'],
    era:'1930–1969', city:'tokyo',
    arch:'Gondo Yukichi / Henri Rapin', archs:['Gondo Yukichi','Henri Rapin','René Lalique'],
    yr:1933, access:'Open to Public',
    lat:35.6380, lng:139.7222,
    addr:'5-21-9 Shirokanedai, Minato City, Tokyo', hood:'Shirokanedai',
    localName:'東京都庭園美術館（旧朝香宮邸）',
    localAddr:'東京都港区白金台5-21-9',
    localHood:'白金台',
    desc: 'Tokyo Metropolitan Teien Art Museum preserves Japanese Art Deco at global standards. The 1933 Asaka Palace designed by French decorator Henri Lapin and architect Gondo Yokichi synthesises Parisian Art Deco sophistication with Japanese craftsmanship. Every room displays different Western decorative vocabulary alongside refined Japanese motifs. Designated important cultural property, exemplifying how 1930s international style found Japanese courtly expression.',
    hours:'Daily 10:00 AM – 6:00 PM · Closed between exhibitions', lastEntry:'5:30 PM',
    admission:'¥1,200 (varies by exhibition)',
    tourOk:true, tourInfo:'The building interior is the main attraction. The garden (accessible separately, ¥200) is a peaceful bonus. Check website for exhibition schedule — closed between shows.',
    transit:'JR → Meguro (7 min walk) · Namboku Mita → Shirokanedai (6 min walk)',
    walkFrom:'Meguro Station: 7 min · Happo-en Garden: 10 min',
    tags:['Art Deco','1933','Lalique','Henri Rapin','Prince Asaka','Museum','Garden','Shirokanedai'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Teien_Art_Museum_02.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Teien_Museum_Garden.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Teien_Annex.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Prince_Asaka_residence.jpg?width=800'
    ]
  },

  {
    id:'tok-0088',
    name:'National Museum of Nature and Science (Former Tokyo Science Museum)',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Kasuya Kenzo', archs:['Kasuya Kenzo'],
    yr:1931, access:'Open to Public',
    lat:35.7163, lng:139.7763,
    addr:'7-20 Ueno Park, Taito City, Tokyo', hood:'Ueno',
    localName:'国立科学博物館（旧東京科学博物館本館）',
    localAddr:'東京都台東区上野公園7-20',
    localHood:'上野',
    desc: 'National Museum of Nature and Science\'s main gallery demonstrates optimistic modernist institutional design. Engineer Kasuya Kenzo designed this 1931 Neo-Renaissance structure with distinctive aeroplane-shaped roofline visible from above. Central atrium features magnificent stained glass designed by Ogawa Saji. Advanced fireproofing proved resilient through 1945 bombing. Designated important cultural property, embodying Meiji and Showa confidence in scientific progress through architecture.',
    hours:'Tue–Sun 9:00 AM – 5:00 PM (Fri–Sat until 8:00 PM) · Closed Mon', lastEntry:'30 min before closing',
    admission:'¥630 (adults)',
    tourOk:true, tourInfo:'Major museum — allow 2+ hours. The original 1931 building (Japan Gallery) is the architectural highlight. A blue whale model marks the entrance.',
    transit:'JR → Ueno Park Exit (4 min walk)',
    walkFrom:'Ueno Station: 4 min · National Museum of Western Art: 2 min',
    tags:['Neo-Renaissance','1931','Museum','Science','Ueno','Important Cultural Property','Airplane Plan'],
    photos:[]
  },

  {
    id:'tok-0089',
    name:'Meiji Memorial Picture Gallery',
    cc:'c-cul',
    cats:['Cultural','Landmarks'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Kobayashi Masatsugu', archs:['Kobayashi Masatsugu'],
    yr:1926, access:'Open to Public',
    lat:35.6791, lng:139.7205,
    addr:'1-1 Kasumigaokamachi, Shinjuku City, Tokyo', hood:'Meiji Jingu Gaien / Aoyama',
    localName:'明治神宮外苑 聖徳記念絵画館',
    localAddr:'東京都新宿区霞ヶ丘町1-1',
    localHood:'明治神宮外苑 / 青山',
    desc: 'Meiji Memorial Picture Gallery memorialises Emperor Meiji through monumental architecture. Architect Kobayashi Masatsugu\'s 1926 design, selected from 156 competition entries, features formal Greco-Roman composition with central domed rotunda flanked by painting halls. Granite exterior and marble interior create timeless dignity. Designated important cultural property, demonstrating how early 20th-century Japan created institutional monuments honouring Meiji achievement.',
    hours:'Daily 9:00 AM – 5:00 PM', lastEntry:'4:30 PM',
    admission:'¥500',
    tourOk:true, tourInfo:'The ginkgo avenue (best in late November) creates one of Tokyo\'s most photographed autumn scenes. Located near the new National Stadium (Kengo Kuma).',
    transit:'JR → Shinanomachi (5 min walk) · Oedo → Kokuritsu-Kyogijo (5 min)',
    walkFrom:'Shinanomachi Station: 5 min · National Stadium: 5 min · Akasaka Palace: 10 min',
    tags:['Gallery','1926','Meiji Emperor','Ginkgo Avenue','Granite','Important Cultural Property','Gaien'],
    photos:[]
  },

  {
    id:'tok-0090',
    name:'Shibusawa Eiichi Memorial Museum (Bankoro & Seien Bunko)',
    cc:'c-cul',
    cats:['Cultural','Residential'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Various', archs:['Various'],
    yr:1917, access:'Open to Public',
    lat:35.7518, lng:139.7379,
    addr:'1-1-3 Oji, Kita City, Tokyo (within Asukayama Park)', hood:'Oji',
    localName:'渋沢栄一邸 晩香廬・青淵文庫',
    localAddr:'東京都北区王子1-1-3 飛鳥山公園内',
    localHood:'王子',
    desc: 'Shibusawa Eiichi Memorial Museum comprises two Arts and Crafts masterpieces by architect Tanabe Junkichi. Bankoro (1917), a wooden tea pavilion for Shibusawa\'s 77th birthday, exemplifies refined joinery. Seien Bunko (1925), of brick and reinforced concrete for his 80th, features stained glass bearing the family crest. Both registered important cultural properties demonstrate how Taisho patrons commissioned architecture embodying handcrafted integrity within modern programmes.',
    hours:'Tue–Sun 10:00 AM – 5:00 PM · Closed Mon', lastEntry:'4:30 PM',
    admission:'¥300',
    tourOk:true, tourInfo:'The Bankoro cottage interior is occasionally viewable. Combine with the adjacent Asukayama Museum and Paper Museum.',
    transit:'JR → Oji (3 min walk) · Toden Arakawa → Asukayama',
    walkFrom:'Oji Station: 3 min · Asukayama Park: inside',
    tags:['Shibusawa Eiichi','Memorial','1917','Asukayama','Important Cultural Property','Meiji','¥10000 Note'],
    photos:[]
  },

  {
    id:'tok-0091',
    name:'Old Mikawashima Sewage Pumping Station',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional'],
    era:'Pre-1930', city:'tokyo',
    arch:'Yonemoto Shinichi (chief engineer)', archs:['Yonemoto Shinichi'],
    yr:1922, access:'Open to Public',
    lat:35.7334, lng:139.7770,
    addr:'Arakawa 2-2-1, Arakawa City, Tokyo (within Mikawashima Water Reclamation Center)', hood:'Mikawashima / Arakawa',
    localName:'旧三河島汚水処分場 喞筒場',
    localAddr:'東京都荒川区荒川2-2-1',
    localHood:'三河島 / 荒川',
    desc: 'Old Mikawashima Sewage Pumping Station represents first-generation modern infrastructure architecture. This 1922 facility pioneered Tokyo\'s modern sewage treatment using Viennese Secession design vocabulary with vertical-horizontal compositions and flat planes. Red brick from Shinagawa combined with spare geometric detailing created functional beauty. Surviving the 1923 earthquake, designated important cultural property, elevating infrastructure to architectural significance.',
    hours:'9:00 AM – 5:00 PM (advance reservation required)', lastEntry:'',
    admission:'Free (reservation required by phone)',
    tourOk:true, tourInfo:'Must reserve in advance via phone (03-6458-3940). Guided tours explain the history of Tokyo\'s sewage system.',
    transit:'Toden Arakawa → Arakawa-nichome (3 min walk) · Chiyoda → Machiya (13 min)',
    walkFrom:'Arakawa-nichome Stop: 3 min',
    tags:['Industrial','Brick','1922','Sewerage','Important Cultural Property','Arakawa','Infrastructure'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/The_Old_Mikawashima_Sanitary_Sewage_Disposal_Plant_%283%29.JPG?width=800'
    ]
  },

  {
    id:'tok-0092',
    name:'Shinjuku Gyoen Old Rest House',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Unknown (Stick Style)', archs:['Traditional'],
    yr:1896, access:'Open to Public',
    lat:35.6853, lng:139.7094,
    addr:'Shinjuku Gyoen, 11 Naitomachi, Shinjuku City, Tokyo', hood:'Shinjuku',
    localName:'新宿御苑 旧洋館御休所',
    localAddr:'東京都新宿区内藤町11 新宿御苑内',
    localHood:'新宿',
    desc: 'Shinjuku Gyoen\'s Old Western Rest House (1896) exemplifies American Stick Style adapted to imperial gardens. Designed by Imperial Household Ministry architects, this timber pavilion combined American vocabulary with Japanese formal gardens. Designated important cultural property, documenting how Western recreational architecture facilitated Meiji imperial leisure culture within Japanese landscape traditions.',
    hours:'Open 2nd and 4th Saturday of each month, 10:00 AM – 3:00 PM', lastEntry:'',
    admission:'Free with Shinjuku Gyoen admission (¥500)',
    tourOk:true, tourInfo:'Very limited opening hours — only two Saturdays per month. Check Shinjuku Gyoen website. The garden itself is worth the visit regardless.',
    transit:'Marunouchi → Shinjuku-gyoenmae (5 min walk)',
    walkFrom:'Shinjuku-gyoenmae Station: 5 min · Shinjuku Station: 15 min',
    tags:['Victorian','Stick Style','1896','Imperial','Important Cultural Property','Shinjuku Gyoen','Wooden'],
    photos:[]
  },

  {
    id:'tok-0093',
    name:'Hitotsubashi University Kanematu Auditorium',
    cc:'c-cul',
    cats:['Cultural'],
    styleGroups:['Traditional','Western'],
    era:'Pre-1930', city:'tokyo',
    arch:'Ito Chuta', archs:['Ito Chuta'],
    yr:1927, access:'Exterior Only',
    lat:35.6858, lng:139.4387,
    addr:'2-1 Naka, Kunitachi, Tokyo', hood:'Kunitachi',
    localName:'一橋大学 兼松講堂',
    localAddr:'東京都国立市中2-1',
    localHood:'国立',
    desc: 'Hitotsubashi University\'s Kanematu Auditorium (1927) showcases architect Ito Chuta\'s Romanesque modernism. This reinforced concrete structure features distinctive gargoyle-like fantasy creatures throughout, a signature flourish symbolising institutional aspiration. Rough-textured tile exterior asserted modernist confidence. Designated registered cultural property, subsequent renovation integrated contemporary seismic engineering while preserving eccentric originality.',
    hours:'Limited public access (university building)', lastEntry:'',
    admission:'Generally exterior only (open during special events)',
    tourOk:false, tourInfo:'Active university building with limited public access. Open campus days and concerts offer interior access.',
    transit:'JR Chuo → Kunitachi (South Exit, 6 min walk)',
    walkFrom:'Kunitachi Station: 6 min',
    tags:['Ito Chuta','Neo-Romanesque','University','1927','Kunitachi','Tangible Cultural Property','Auditorium'],
    photos:[]
  },

  // ── YOKOHAMA ──────────────────────────────────────────────────

  {
    id:'tok-0094',
    name:'Yokohama International Passenger Terminal',
    cc:'c-lmk',
    cats:['Landmarks','Public'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Foreign Office Architects (FOA)', archs:['Foreign Office Architects','Farshid Moussavi','Alejandro Zaera-Polo'],
    yr:2002, access:'Open to Public',
    lat:35.4510, lng:139.6474,
    addr:'1-1-4 Kaigandori, Naka-ku, Yokohama, Kanagawa', hood:'Yokohama (Kanagawa)',
    localName:'横浜港大さん橋国際客船ターミナル',
    localAddr:'神奈川県横浜市中区海岸通1-1-4',
    localHood:'横浜（神奈川）',
    desc: 'Yokohama International Passenger Terminal by Foreign Office Architects represents 21st-century computational design liberation. Winner of the 1995 international competition from 660 entries, Alejandro Zaera-Polo and Farshid Moussavi\'s continuous-surface architecture undulates floor, wall, and ceiling as unified composition connected through flowing ramps. Completed 2002, this \'Continuous Architecture\' exemplifies how computer-aided design enabled sculptural form previously impossible through conventional means.',
    hours:'Rooftop deck: 24/7 · Interior/lobby: 9:00 AM – 9:30 PM', lastEntry:'',
    admission:'Free',
    tourOk:true, tourInfo:'The rooftop "Osanbashi Deck" is freely accessible 24/7 with panoramic views of Yokohama Bay, Minato Mirai skyline, and (on clear days) Mount Fuji. Best visited at sunset.',
    transit:'Minato Mirai → Nihon-Odori (7 min walk) · JR → Sakuragicho (15 min walk)',
    walkFrom:'Nihon-Odori Station: 7 min · Yokohama Red Brick Warehouse: 10 min · Chinatown: 8 min',
    tags:['FOA','Farshid Moussavi','Zaera-Polo','Yokohama','Terminal','Continuous Surface','Rooftop Park','Free','2002'],
    photos:[]
  }

];
