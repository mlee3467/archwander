/* ============================================================
   ArchWander — Tokyo Location Data
   Works by: Kenzo Tange · Toyo Ito · SANAA · Shigeru Ban ·
             Kengo Kuma · Sou Fujimoto · Fumihiko Maki ·
             Yoshio Taniguchi · Tadao Ando · Thomas Heatherwick
   Edit this file to add / modify Tokyo locations.
   ============================================================ */

const LOCS_TOKYO = [

  // ── KENZO TANGE ───────────────────────────────────────────────

  {
    id:'tok-0001',
    name:'Yoyogi National Gymnasium',
    cat:'Cultural', cc:'c-cul', styleGroup:'Modernist',
    cats:['Cultural'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public', style:'Metabolist',
    lat:35.6683, lng:139.6951,
    addr:'2-1-1 Jinnan, Shibuya-ku, Tokyo 150-0041', hood:'Shibuya / Harajuku',
    localName:'国立代々木競技場',
    localAddr:'東京都渋谷区神南2-1-1',
    localHood:'渋谷 / 原宿',
    desc:'The Yoyogi National Gymnasium, designed for the 1964 Tokyo Olympics by Kenzo Tange, is widely regarded as one of the greatest works of 20th-century architecture. The twin stadiums — the Main Hall (capacity 15,000) and Sub Hall (capacity 4,000) — are suspended from dramatic sweeping steel cables anchored to two massive concrete masts, creating organic shell-like roofscapes that undulate like ocean waves. Tange synthesised the steel-cable tensile technology of Western modernism with formal references to traditional Japanese shrine architecture — the sweeping roof curves echo Shinto ceremonial forms. The result is a building that appears both ancient and futuristic, timeless and entirely of its moment. It remains the defining work of the Japanese Metabolist movement and one of the most copied structural systems in sports architecture worldwide.',
    hours:'Exterior: 24/7 · Interior only during events', lastEntry:'',
    admission:'Free (exterior) · Event tickets for interior',
    tourOk:false, tourInfo:'The gymnasiums are operational sports facilities. The exterior and surrounding Yoyogi Park are freely accessible. Interior access during public sporting events.',
    web:'https://www.naash.go.jp/yoyogi',
    transit:'Chiyoda → Harajuku (1 min walk)',
    walkFrom:'Harajuku Station: 2 min · Meiji Shrine: 5 min · Omotesando: 12 min',
    gmaps:'https://maps.google.com/?q=Yoyogi+National+Gymnasium+Tokyo',
    archdaily:'https://www.archdaily.com/tag/yoyogi-national-gymnasium',
    wiki:'https://en.wikipedia.org/wiki/Yoyogi_National_Gymnasium',
    tags:['Kenzo Tange','1964 Olympics','Metabolism','Suspended Roof','Shibuya','National Monument'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi_National_Stadium_1964.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Yoyogi_National_First_Gymnasium.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0002',
    name:'Tokyo Metropolitan Government Building',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1991, access:'Open to Public', style:'Contemporary',
    lat:35.6895, lng:139.6917,
    addr:'2-8-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-8001', hood:'Nishi-Shinjuku',
    localName:'東京都庁舎',
    localAddr:'東京都新宿区西新宿2-8-1',
    localHood:'西新宿',
    desc:'The Tokyo Metropolitan Government Building (都庁, Tochō) is Kenzo Tange\'s final major Tokyo commission and the headquarters of the Tokyo Metropolitan Government. The complex consists of a 48-floor twin-towered Main Building No. 1 (243 m), a 34-floor Main Building No. 2, and a semicircular Metropolitan Assembly Hall. The towers split at the 33rd floor into twin spires, their granite-clad facades articulated with Gothic tracery-like patterns that read as a pixelated texture at close range and as a monumental urban form from a distance. Two free public observation decks at 202 m offer panoramic views of the entire Tokyo metropolitan area, including Mount Fuji on clear days.',
    hours:'North Observatory: Tue–Sun 9AM–10:30PM · South Observatory: daily 9AM–10:30PM', lastEntry:'10:30 PM',
    admission:'Free',
    tourOk:true, tourInfo:'Both observatories are free to access. The North Tower has evening views until 10:30PM. Guided tours of the Metropolitan Assembly Hall available (Japanese only).',
    web:'https://www.metro.tokyo.lg.jp/english/offices/observat.html',
    transit:'Oedo Marunouchi → Tochomae (3 min)',
    walkFrom:'Shinjuku Station West Exit: 10 min · Shinjuku Park Tower (Gehry): 5 min',
    gmaps:'https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building',
    archdaily:'https://www.archdaily.com/tag/tokyo-metropolitan-government-building',
    wiki:'https://en.wikipedia.org/wiki/Tokyo_Metropolitan_Government_Building',
    tags:['Kenzo Tange','Observatory','Free','Government','Shinjuku','Twin Tower','Panoramic View'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_Metropolitan_Government_Building.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_city_hall.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0003',
    name:'St. Mary\'s Cathedral Tokyo',
    cat:'Religious', cc:'c-rel', styleGroup:'Modernist',
    cats:['Religious'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public', style:'Modernist',
    lat:35.7186, lng:139.7316,
    addr:'3-16-15 Sekiguchi, Bunkyo-ku, Tokyo 112-0014', hood:'Bunkyo / Sekiguchi',
    localName:'聖マリア大聖堂',
    localAddr:'東京都文京区関口3-16-15',
    localHood:'文京 / 関口',
    desc:'St. Mary\'s Cathedral in Bunkyo-ku is one of Kenzo Tange\'s most sculptural works and a masterpiece of post-war Japanese religious architecture. Completed in 1964, the same year as the Yoyogi Gymnasium, the cathedral is composed of eight hyperbolic paraboloid stainless-steel shells that sweep upward from near-ground level to form a cross-shaped skylight at the apex, 39 metres above the nave floor. From above, the building reads as a pure cross; from street level, it is an abstract, flowing form unlike any traditional church typology. The interior is bare concrete with light entering through the cross-shaped ceiling aperture and narrow vertical glass strips — producing an intensely atmospheric space that is simultaneously modern and deeply sacred.',
    hours:'Mon–Sat 10AM–6PM · Sun 1PM–4PM', lastEntry:'',
    admission:'Free · Donations welcome',
    tourOk:false, tourInfo:'Visitors are welcome during opening hours. Organ concerts and services held regularly.',
    web:'https://cathedral.catholic.ne.jp',
    transit:'Yurakucho → Edogawabashi (7 min walk)',
    walkFrom:'Edogawabashi Station: 7 min',
    gmaps:'https://maps.google.com/?q=St+Mary+Cathedral+Tokyo+Bunkyo',
    archdaily:'https://www.archdaily.com/tag/st-mary-s-cathedral-tokyo',
    wiki:'https://en.wikipedia.org/wiki/Tokyo_Cathedral',
    tags:['Kenzo Tange','Cathedral','Hyperbolic Paraboloid','Stainless Steel','Bunkyo','Religious'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/St._Mary%27s_Cathedral_Tokyo_1.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/St._Mary_Cathedral%2C_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── TOYO ITO ──────────────────────────────────────────────────

  {
    id:'tok-0004',
    name:'Tod\'s Omotesando Building',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2004, access:'Open to Public', style:'Contemporary',
    lat:35.6672, lng:139.7098,
    addr:'5-1-15 Jingumae, Shibuya-ku, Tokyo 150-0001', hood:'Omotesando',
    localName:'銀座シックスプレイス（医療施設）',
    localAddr:'東京都中央区銀座7-16-16',
    localHood:'銀座',
    desc:'The Tod\'s Omotesando Building by Toyo Ito (2004) is a seven-story flagship boutique on the famous shopping boulevard that stands as one of the most structurally inventive facades in contemporary Tokyo. The entire structural system of the building is expressed in its glass facade as an interlocking pattern of concrete tree branches — a three-dimensional structure derived from the silhouette of the zelkova trees lining Omotesando Avenue. The concrete branches become progressively thinner toward the upper floors, creating a gradated lacework of structure and glass that is simultaneously load-bearing, decorative, and environmental. The building was the first to bring the language of structural expressionism to luxury retail in Tokyo, and directly influenced a generation of brand flagship architecture on the same street.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a luxury retail store. The building exterior and ground floor are viewable at all times. Interior is the Tod\'s boutique.',
    web:'https://www.tods.com',
    transit:'Ginza Hanzomon → Omotesando (Exit A2, 3 min)',
    walkFrom:'Prada Omotesando (Herzog & de Meuron): 3 min · Omotesando Hills (Ando): 2 min',
    gmaps:'https://maps.google.com/?q=Tod%27s+Omotesando+Building+Tokyo',
    archdaily:'https://www.archdaily.com/tag/tod-s-omotesando-building',
    wiki:'https://en.wikipedia.org/wiki/Tod%27s_Omotesando_Building',
    tags:['Toyo Ito','Omotesando','Concrete Tree Structure','Retail','Facade','Shibuya'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tod%27s_Omotesando_Building.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tods_Omotesando_Toyo_Ito.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0005',
    name:'Mikimoto Ginza 2',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2005, access:'Open to Public', style:'Contemporary',
    lat:35.6711, lng:139.7639,
    addr:'2-4-12 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'ミキモト銀座2',
    localAddr:'東京都中央区銀座4-5-5',
    localHood:'銀座',
    desc:'The Mikimoto Ginza 2 building by Toyo Ito, completed in 2005, is a nine-story flagship boutique for the Japanese pearl jewellery brand in Ginza. Its external structural wall is a continuous steel plate perforated by irregular, organic window openings — each one a unique shape — that give the building the appearance of Swiss cheese or a piece of pink-painted lace. The irregular openings are not arbitrary: they result from a structural optimisation of the steel skin that allows the plate to carry gravity loads without a conventional column-and-beam frame. The result is a building that achieves structural efficiency through apparent randomness, its pink metallic surface standing out vividly against the conservative stone and glass facades of its Ginza neighbours. Mikimoto Ginza 2 and the adjacent Tod\'s Omotesando established Ito\'s reputation for creating structural facades that act simultaneously as building skin, structure, and ornament.',
    hours:'Mon–Sun 11:00 AM – 7:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Mikimoto jewellery boutique.',
    web:'https://www.mikimoto.com',
    transit:'Ginza Marunouchi Hibiya → Ginza (Exit B4, 2 min)',
    walkFrom:'Ginza Six: 3 min · Chanel Ginza (Peter Marino): 3 min',
    gmaps:'https://maps.google.com/?q=Mikimoto+Ginza+2+Tokyo',
    archdaily:'https://www.archdaily.com/tag/mikimoto-ginza-2',
    wiki:'https://en.wikipedia.org/wiki/Mikimoto_Ginza_2',
    tags:['Toyo Ito','Ginza','Perforated Steel','Retail','Structural Facade','Pink'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Mikimoto_Ginza_2_Building_by_Toyo_Ito.jpg?width=800'
    ],
    drawings:[]
  },

  // ── SANAA ─────────────────────────────────────────────────────

  {
    id:'tok-0006',
    name:'Dior Omotesando',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'SANAA', archs:['SANAA','Kazuyo Sejima','Ryue Nishizawa'],
    yr:2003, access:'Open to Public', style:'Contemporary',
    lat:35.6653, lng:139.7095,
    addr:'5-9-11 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
    localName:'ディオール表参道',
    localAddr:'東京都港区南青山5-9-11',
    localHood:'南青山 / 表参道',
    desc:'The Dior Omotesando building by SANAA (Kazuyo Sejima + Ryue Nishizawa), completed in 2003, is a six-story boutique on the Omotesando retail boulevard. The facade is defined by a double-layer curtain wall of semi-transparent acrylic panels suspended within the outer glass — the inner acrylic layer ripples and curves gently, giving the building the appearance of draped fabric or a diaphanous veil. The effect is particularly ethereal at night, when the building glows from within. SANAA\'s design dissolves the conventional boundary between exterior and interior: the building appears simultaneously solid and transparent, heavy and weightless. It is often cited alongside Tod\'s Omotesando and Prada Aoyama as the defining works of the "Omotesando generation" of Japanese boutique architecture.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Dior flagship boutique.',
    web:'https://www.dior.com',
    transit:'Ginza Hanzomon → Omotesando (Exit A5)',
    walkFrom:'Tod\'s Omotesando: 5 min · Prada Aoyama: 2 min',
    gmaps:'https://maps.google.com/?q=Dior+Omotesando+Tokyo',
    archdaily:'https://www.archdaily.com/tag/dior-omotesando',
    wiki:'https://en.wikipedia.org/wiki/Dior_building,_Omotesando',
    tags:['SANAA','Kazuyo Sejima','Ryue Nishizawa','Omotesando','Acrylic Curtain Wall','Retail','Transparent'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dior_Aoyama_SANAA.jpg?width=800'
    ],
    drawings:[]
  },


  // ── SHIGERU BAN ───────────────────────────────────────────────

  {
    id:'tok-0007',
    name:'Curtain Wall House',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential','Retail'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:1995, access:'Exterior Only', style:'Contemporary',
    lat:35.7494, lng:139.6917,
    addr:'Itabashi-ku, Tokyo', hood:'Itabashi',
    localName:'カーテンウォール・ハウス',
    localAddr:'東京都渋谷区神宮前',
    localHood:'渋谷 / 神宮前',
    desc:'The Curtain Wall House (1995) is one of Shigeru Ban\'s most iconic early residential works and a key project in his exploration of transparency and the dissolution of the boundary between interior and exterior. The two-story house has no conventional exterior walls on two sides: floor-to-ceiling fabric curtains — reminiscent of traditional Japanese shoji screens but operating at architectural scale — can be fully drawn back to merge the interior with the outdoor terrace and the surrounding urban environment. When drawn, the curtains billow gently in the breeze, animating the facade with movement. The structural frame is exposed, and the roof floats lightly above. The project directly challenges the conventional Western expectation of privacy and enclosure, proposing instead a porous domestic space in dialogue with its neighbourhood.',
    hours:'Private residence · Exterior viewable from street', lastEntry:'',
    admission:'Private residential building',
    tourOk:false, tourInfo:'Private residence, not open to visitors. Exterior viewable from the street.',
    web:'https://shigerubanarchitects.com',
    transit:'Multiple lines → Itabashi-ku area',
    walkFrom:'',
    gmaps:'https://maps.google.com/?q=Curtain+Wall+House+Shigeru+Ban+Itabashi+Tokyo',
    archdaily:'https://www.archdaily.com/tag/curtain-wall-house',
    wiki:'https://en.wikipedia.org/wiki/Curtain_Wall_House',
    tags:['Shigeru Ban','Curtain Wall','Residential','Transparent','Itabashi','Fabric Facade'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shigeru_Ban_Curtain_Wall_House.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0008',
    name:'Nicolas G. Hayek Center',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:2007, access:'Open to Public', style:'Contemporary',
    lat:35.6718, lng:139.7639,
    addr:'2-6-9 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'紙の教会',
    localAddr:'長野県北佐久郡軽井沢町長倉',
    localHood:'軽井沢',
    desc:'The Nicolas G. Hayek Center in Ginza, completed by Shigeru Ban in 2007, is the Tokyo flagship for the Swatch Group, housing nine Swiss watch brands across a 12-story building. The building\'s entire facade is a fully glazed double-skin that opens floor by floor: massive sliding glass doors on each level can retract completely into the building, transforming the enclosed retail floors into open-air terraces. When open, the entire building dissolves into a stacked sequence of transparent platforms. Vertical gardens — planted walls of living greenery — run through the building\'s atrium, visible through the glass from the street. The effect is a building that breathes: the distinction between inside and outside, between the luxury retail world within and the bustling Ginza streetscape without, is entirely dissolved when the facades are open.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a Swatch Group multi-brand boutique.',
    web:'https://www.swatchgroup.com',
    transit:'Ginza Marunouchi Hibiya → Ginza (Exit C2)',
    walkFrom:'Mikimoto Ginza 2 (Ito): 2 min · Chanel Ginza: 3 min',
    gmaps:'https://maps.google.com/?q=Nicolas+Hayek+Center+Ginza+Tokyo',
    archdaily:'https://www.archdaily.com/tag/nicolas-g-hayek-center',
    wiki:'https://en.wikipedia.org/wiki/Nicolas_G._Hayek_Center',
    tags:['Shigeru Ban','Ginza','Sliding Facade','Green Wall','Retail','Swatch','Transparency'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nicolas_G_Hayek_Center_Ginza.jpg?width=800'
    ],
    drawings:[]
  },

  // ── KENGO KUMA ────────────────────────────────────────────────

  {
    id:'tok-0009',
    name:'Nezu Museum',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2009, access:'Paid Ticket', style:'Contemporary',
    lat:35.6639, lng:139.7168,
    addr:'6-5-1 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
    localName:'ナインアワーズ渋谷北',
    localAddr:'東京都渋谷区神宮前6-32-2',
    localHood:'渋谷 / 神宮前',
    desc:'The Nezu Museum, designed by Kengo Kuma and opened in 2009, houses a private collection of pre-modern Japanese and East Asian art assembled by industrialist Kaichiro Nezu in the early 20th century. Kuma\'s design replaces an earlier museum building on the same site with a new structure characterized by an enormous overhanging thatched-style roof of thin bamboo screens and natural timber that extends over the main facade and sweeps visitors from the Omotesando streetscape into a covered approach path. The interior galleries are minimally lit to protect the artefacts, with warm timber, bamboo, and stone used throughout in place of conventional architectural finishes. The 17,000 sq m landscaped garden at the rear — a rare expanse of natural scenery in central Tokyo — contains five traditional tea houses and is accessible to all museum visitors.',
    hours:'Tue–Sun 10:00 AM – 5:00 PM · Closed Monday', lastEntry:'4:30 PM',
    admission:'Adults ¥1,300 · University students ¥1,000 · Under 15 free',
    tourOk:true, tourInfo:'Museum audio guides available (Japanese and English). The garden and tea houses are open to all ticket holders. The café with garden views is popular.',
    web:'https://www.nezu-muse.or.jp/en',
    transit:'Ginza Hanzomon → Omotesando (Exit A5, 8 min)',
    walkFrom:'Dior Omotesando (SANAA): 3 min · Prada Aoyama: 5 min',
    gmaps:'https://maps.google.com/?q=Nezu+Museum+Tokyo',
    archdaily:'https://www.archdaily.com/tag/nezu-museum',
    wiki:'https://en.wikipedia.org/wiki/Nezu_Museum',
    tags:['Kengo Kuma','Museum','Japanese Art','Bamboo Roof','Garden','Minami-Aoyama','Tea House'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nezu_Museum_garden.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0010',
    name:'Asakusa Culture Tourist Information Center',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2012, access:'Free Admission', style:'Contemporary',
    lat:35.7118, lng:139.7966,
    addr:'2-18-9 Kaminarimon, Taito-ku, Tokyo 111-0034', hood:'Asakusa',
    localName:'根津美術館',
    localAddr:'東京都港区南青山6-5-1',
    localHood:'南青山',
    desc:'The Asakusa Culture Tourist Information Center, designed by Kengo Kuma and completed in 2012, stands directly opposite Sensoji Temple\'s iconic Kaminarimon (Thunder Gate) and serves as the main visitor orientation hub for Asakusa. Kuma\'s design stacks eight traditionally-roofed wooden volumes — each with its own sloping roof — one atop the other, creating a vertical "stack" of miniature house-forms that evokes the dense, layered streetscape of traditional Asakusa and the multiple scales of the neighbourhood, from street-level shop to temple pagoda. The building is clad in thin horizontal wooden louvres that give the facades a warm, textured surface. The roof of each stacked level provides a small terrace or garden. The building directly engages the tension between traditional townscape and the modern tourist infrastructure required to serve Asakusa\'s 30 million annual visitors.',
    hours:'Daily 9:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'The center has free maps, guides, and multilingual tourism information. The rooftop terrace offers direct views of the Kaminarimon Gate and Sensoji.',
    web:'https://www.city.taito.lg.jp/kanko/asakusainfo.html',
    transit:'Ginza → Asakusa (2 min walk)',
    walkFrom:'Kaminarimon Gate: 1 min · Sensoji Temple: 3 min · Nakamise Shopping Street: 2 min',
    gmaps:'https://maps.google.com/?q=Asakusa+Culture+Tourist+Information+Center+Tokyo',
    archdaily:'https://www.archdaily.com/tag/asakusa-culture-tourist-information-center',
    wiki:'https://en.wikipedia.org/wiki/Asakusa_Culture_Tourist_Information_Center',
    tags:['Kengo Kuma','Asakusa','Stacked Roofs','Tourist Center','Traditional','Wood','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_Culture_Tourist_Information_Center.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Asakusa_info_center_Kengo_Kuma.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0011',
    name:'Japan National Stadium (Olympic Stadium)',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2019, access:'Paid Ticket', style:'Contemporary',
    lat:35.6781, lng:139.7142,
    addr:'10-1 Kasumigaokamachi, Shinjuku-ku, Tokyo 160-0013', hood:'Gaienmae / Shinjuku',
    localName:'広島平和記念資料館',
    localAddr:'広島県広島市中区中島町1-2',
    localHood:'広島 / 平和公園',
    desc:'Japan National Stadium, also known as the Olympic Stadium, was designed by Kengo Kuma and completed in 2019 as the main venue for the 2020 Tokyo Olympics (held in 2021). Kuma was selected following the controversial cancellation of Zaha Hadid\'s original winning design due to cost overruns. His proposal returned to a fundamentally different philosophy: a stadium that sits low and gently in its landscape, clad in horizontal timber louvres — sourced from 47 Japanese prefectures, one per prefecture — that wrap the facade and roof eaves in warm natural wood. The 68,000-seat stadium is designed to appear as a "forest" from the surrounding Meiji Jingu Gaien park, its green roof planted with native species. The contrast with Hadid\'s futuristic proposal underscored the enduring tension in Japanese architecture between local material tradition and global formal ambition.',
    hours:'Stadium tours: daily 10AM–4PM (tours depart hourly) · Event hours vary', lastEntry:'',
    admission:'Stadium tour: Adults ¥1,000 · Under 6 free',
    tourOk:true, tourInfo:'Guided stadium tours available in Japanese and English. Tours include the field, locker rooms, and VIP areas. Event tickets sold separately.',
    web:'https://www.jpnsport.go.jp/kokuritu/english',
    transit:'Ginza Hanzomon → Gaienmae (10 min walk)',
    walkFrom:'Meiji Jingu Gaien: 3 min · Yoyogi National Gymnasium (Tange): 10 min',
    gmaps:'https://maps.google.com/?q=Japan+National+Stadium+Tokyo',
    archdaily:'https://www.archdaily.com/tag/japan-national-stadium',
    wiki:'https://en.wikipedia.org/wiki/Japan_National_Stadium',
    tags:['Kengo Kuma','Olympic Stadium','Wood Louvres','2020 Olympics','Shinjuku','National Stadium'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_National_Stadium_2019.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Japan_National_Stadium_interior.jpg?width=800'
    ],
    drawings:[]
  },

  // ── SOU FUJIMOTO ──────────────────────────────────────────────

  {
    id:'tok-0012',
    name:'House NA',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2011, access:'Exterior Only', style:'Contemporary',
    lat:35.7417, lng:139.6602,
    addr:'Nerima-ku, Tokyo', hood:'Nerima',
    localName:'チムニー・ハウス',
    localAddr:'東京都世田谷区',
    localHood:'世田谷',
    desc:'House NA, completed in 2011 by Sou Fujimoto, is one of the most radical private houses built in Tokyo in the 21st century. The house eschews conventional floors, walls, and rooms entirely: instead, 21 small steel platforms at varying heights are connected by ladders and steps within a completely transparent glass envelope, creating a three-dimensional landscape in which the inhabitants move through a continuous spatial sequence without defined ceilings or floors. From the outside, the house appears as a glass lantern — the interior life of its occupants fully exposed to the narrow residential street. Fujimoto has described the design as a "forest" in which people find their own "branches" — inhabiting the space instinctively according to the season, light, and their activity. House NA is widely cited as the built realisation of Fujimoto\'s theoretical work on primitive shelter and the dissolution of architectural convention.',
    hours:'Private residence · Exterior viewable from street', lastEntry:'',
    admission:'Private residential building',
    tourOk:false, tourInfo:'Private home, not open to visitors.',
    web:'https://sou-fujimoto.net',
    transit:'Seibu Ikebukuro Line → Nerima area',
    walkFrom:'',
    gmaps:'https://maps.google.com/?q=House+NA+Sou+Fujimoto+Nerima+Tokyo',
    archdaily:'https://www.archdaily.com/tag/house-na',
    wiki:'https://en.wikipedia.org/wiki/House_NA',
    tags:['Sou Fujimoto','Residential','Glass','Transparent','Platforms','Nerima','Radical'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/House_NA_Sou_Fujimoto.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0013',
    name:'Musashino Art University Museum & Library',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2010, access:'Open to Public', style:'Contemporary',
    lat:35.7322, lng:139.5529,
    addr:'1-736 Ogawa-cho, Kodaira-shi, Tokyo 187-8505', hood:'Kodaira (Greater Tokyo)',
    localName:'倉敷常磐館',
    localAddr:'岡山県倉敷市本町7-12',
    localHood:'倉敷',
    desc:'The Musashino Art University Museum and Library, completed in 2010 by Sou Fujimoto, is one of the most discussed academic buildings in contemporary Japanese architecture. The library is organised as a continuous, self-similar spiral of bookshelves that begins at the perimeter wall and spirals inward to the centre of the building, creating a single uninterrupted surface of books that is simultaneously the structure, the furniture, and the spatial organiser of the interior. As visitors move through the stacks, they experience a constantly changing depth of shelf — sometimes one row deep, sometimes three — while the overall spiral form creates a radial reading landscape in which any position in the library offers a view through multiple layers of books toward the centre. The building blurs the distinction between object, furniture, architecture, and landscape — a key theme in Fujimoto\'s work.',
    hours:'Mon–Sat 10:00 AM – 6:00 PM · Closed Sunday', lastEntry:'5:30 PM',
    admission:'Free',
    tourOk:false, tourInfo:'Open to the public during university opening hours.',
    web:'https://mauml.musabi.ac.jp/museum/en',
    transit:'JR Chuo Line → Kokubunji or Higashi-Koganei (15 min bus)',
    walkFrom:'',
    gmaps:'https://maps.google.com/?q=Musashino+Art+University+Library+Tokyo',
    archdaily:'https://www.archdaily.com/tag/musashino-art-university-library',
    wiki:'https://en.wikipedia.org/wiki/Musashino_Art_University_Museum_%26_Library',
    tags:['Sou Fujimoto','Library','Museum','Spiral Bookshelves','University','Kodaira','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Musashino_Art_University_Library.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Musashino_library_interior.jpg?width=800'
    ],
    drawings:[]
  },

  // ── FUMIHIKO MAKI ─────────────────────────────────────────────

  {
    id:'tok-0014',
    name:'Spiral (Wacoal Art Center)',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1985, access:'Open to Public', style:'Contemporary',
    lat:35.6639, lng:139.7165,
    addr:'5-6-23 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
    localName:'浜松市楽器博物館',
    localAddr:'静岡県浜松市中区中央3-9-1',
    localHood:'浜松',
    desc:'The Spiral Building (officially the Wacoal Art Center) by Fumihiko Maki, completed in 1985, is one of the finest urban buildings in Tokyo and a key work of late-20th-century Japanese architecture. The building\'s facade is a collage of fragments — a curved wall, a conical form, a rectilinear grid of tiles, a cylindrical element at the corner — each drawn from a different formal vocabulary and assembled into a coherent urban face. Inside, a spiralling ramp connects a ground-floor gallery and café to upper-floor event spaces, shops, and offices, organising a complex civic programme in a fluid interior landscape. The project was an important forerunner of postmodern urban collage strategies in Japan. The ground floor gallery and café remain freely accessible, making Spiral an unusually permeable cultural institution on one of Tokyo\'s most exclusive shopping streets.',
    hours:'Daily 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free (gallery and café) · Event spaces ticketed',
    tourOk:false, tourInfo:'The ground-floor gallery, café, and atrium spiral ramp are freely accessible. Upper-floor events ticketed separately.',
    web:'https://www.spiral.co.jp',
    transit:'Ginza Hanzomon → Omotesando (Exit B1, 3 min)',
    walkFrom:'Nezu Museum (Kuma): 2 min · Omotesando Hills (Ando): 5 min',
    gmaps:'https://maps.google.com/?q=Spiral+Building+Wacoal+Art+Center+Tokyo',
    archdaily:'https://www.archdaily.com/tag/spiral-building',
    wiki:'https://en.wikipedia.org/wiki/Spiral_(building)',
    tags:['Fumihiko Maki','Art Center','Gallery','Minami-Aoyama','Collage Facade','Urban','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Spiral_Building_Aoyama_Maki.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0015',
    name:'Hillside Terrace',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1992, access:'Open to Public', style:'Contemporary',
    lat:35.6494, lng:139.7002,
    addr:'18-12 Sarugakucho, Shibuya-ku, Tokyo 150-0033', hood:'Daikanyama',
    localName:'高梧塾',
    localAddr:'岡山県高梧市',
    localHood:'高梧',
    desc:'Hillside Terrace in Daikanyama is Fumihiko Maki\'s life work — a complex of seven building phases built incrementally over 24 years (1969–1992) along Kyu-Yamate-dori avenue. Rather than a single building, Hillside Terrace is an urban quarter: a sequence of low-rise mixed-use buildings — shops, galleries, apartments, offices, an ambassador\'s residence — that grew one by one alongside the neighbourhood\'s own evolution. The complex is widely credited with establishing Daikanyama\'s identity as Tokyo\'s most refined neighbourhood for design, food, and fashion. Each phase of Hillside Terrace responds to its period while maintaining formal consistency through the use of white stucco, open colonnades, and carefully scaled courtyards. The complex demonstrates the potential of architecture to shape urban character over time, without a masterplan, through the cumulative effect of consistently considered individual buildings.',
    hours:'Shops and gallery: daily 11AM–7PM · Public spaces 24/7', lastEntry:'',
    admission:'Free (public spaces and galleries)',
    tourOk:false, tourInfo:'The complex is freely walkable and mixed-use. Daikanyama as a neighbourhood is best explored on foot. The Tsutaya Books (Klein Dytham) nearby is also worth visiting.',
    web:'https://www.hillsideterrace.com',
    transit:'Tokyu Toyoko → Daikanyama (3 min walk)',
    walkFrom:'Daikanyama T-Site (Tsutaya): 3 min · Log Road Daikanyama: 5 min',
    gmaps:'https://maps.google.com/?q=Hillside+Terrace+Daikanyama+Tokyo',
    archdaily:'https://www.archdaily.com/tag/hillside-terrace',
    wiki:'https://en.wikipedia.org/wiki/Hillside_Terrace',
    tags:['Fumihiko Maki','Daikanyama','Mixed-Use','Urban Quarter','Incremental','Shibuya','Low-rise'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Hillside_Terrace_Daikanyama.jpg?width=800'
    ],
    drawings:[]
  },

  // ── YOSHIO TANIGUCHI ──────────────────────────────────────────

  {
    id:'tok-0016',
    name:'Gallery of Hōryū-ji Treasures',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Yoshio Taniguchi', archs:['Yoshio Taniguchi'],
    yr:1999, access:'Paid Ticket', style:'Contemporary',
    lat:35.7188, lng:139.7747,
    addr:'13-9 Uenokoen, Taito-ku, Tokyo 110-8712', hood:'Ueno',
    localName:'CLASKA',
    localAddr:'東京都目黒区中目黒1-1-26',
    localHood:'中目黒',
    desc:'The Gallery of Hōryū-ji Treasures at the Tokyo National Museum in Ueno, completed in 1999 by Yoshio Taniguchi, is widely regarded as one of the finest museum buildings in Japan and the project that established his international reputation before his selection for the MoMA expansion in New York. The building houses 300 of the 300 sacred objects donated to the imperial household from Hōryū-ji temple in Nara — 7th and 8th century Buddhist sculptures, metalwork, and textiles. Taniguchi\'s design is the opposite of spectacle: a long, flat, low box of granite and glass that seems to float above a reflecting pool, creating a meditative threshold between the noise of Ueno Park and the intense concentration of the artefacts within. The interior is stripped to absolute minimalism — white walls, stone floors, diffuse natural light — ensuring total focus on the objects. The building is a near-perfect example of Taniguchi\'s principle that "architecture should disappear."',
    hours:'Tue–Sun 9:30 AM – 5:00 PM (Fri–Sat to 9:00 PM) · Closed Monday', lastEntry:'30 min before closing',
    admission:'General: ¥1,000 (includes all Tokyo National Museum galleries)',
    tourOk:true, tourInfo:'Free English audio guides. The building is part of the Tokyo National Museum campus — also visit the main Honkan building and the Heiseikan.',
    web:'https://www.tnm.jp/modules/r_free_page/index.php?id=104',
    transit:'Multiple → Ueno (10 min walk through park)',
    walkFrom:'Tokyo National Museum main entrance: 5 min · Ueno Zoo: 5 min',
    gmaps:'https://maps.google.com/?q=Gallery+of+Horyuji+Treasures+Ueno+Tokyo',
    archdaily:'https://www.archdaily.com/tag/gallery-of-horyuji-treasures',
    wiki:'https://en.wikipedia.org/wiki/Gallery_of_H%C5%8Dry%C5%AB-ji_Treasures',
    tags:['Yoshio Taniguchi','Museum','Buddhist Art','Hōryū-ji','Ueno','Minimalism','Reflecting Pool'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Gallery_of_Horyuji_Treasures_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Horyuji_Treasures_Gallery_exterior.jpg?width=800'
    ],
    drawings:[]
  },

  // ── TADAO ANDO — TOKYO ────────────────────────────────────────

  {
    id:'tok-0017',
    name:'Omotesando Hills',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2006, access:'Open to Public', style:'Contemporary',
    lat:35.6671, lng:139.7083,
    addr:'4-12-10 Jingumae, Shibuya-ku, Tokyo 150-0001', hood:'Omotesando',
    localName:'代官山晴美舎',
    localAddr:'東京都渋谷区代官山町20-11',
    localHood:'代官山',
    desc:'Omotesando Hills, completed in 2006, is Tadao Ando\'s largest commercial project and a defining landmark of the Omotesando retail boulevard. The complex replaced the beloved Dojunkai Aoyama Apartments (1927) — which Ando preserved in part, reconstructing the original six-story block at the western end — with a 250-metre-long, six-story retail and residential complex. The key design move is the sectional spiral: the main atrium descends three floors below grade, with a continuous ramped interior street that spirals around the atrium walls, allowing visitors to walk from street level to the basement through a smooth, uninterrupted spatial sequence. The facade along Omotesando matches exactly the height of the zelkova tree canopy — 24 metres — ensuring the trees remain the dominant element of the street. The entire building is clad in Ando\'s signature board-formed concrete.',
    hours:'Shopping: Mon–Sun 11:00 AM – 11:00 PM · Restaurants: 11AM–11:30PM', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible. The interior spiral ramp atrium is the main spatial experience. The preserved Dojunkai Apartment wing at the west end is worth observing.',
    web:'https://www.omotesandohills.com',
    transit:'Ginza Hanzomon → Omotesando (Exit A2, 1 min)',
    walkFrom:'Tod\'s Omotesando (Ito): 2 min · Prada Aoyama (Herzog & de Meuron): 5 min · Dior (SANAA): 5 min',
    gmaps:'https://maps.google.com/?q=Omotesando+Hills+Tokyo',
    archdaily:'https://www.archdaily.com/tag/omotesando-hills',
    wiki:'https://en.wikipedia.org/wiki/Omotesando_Hills',
    tags:['Tadao Ando','Omotesando','Concrete','Spiral Atrium','Retail','Mixed-Use','Shibuya'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando_Hills_exterior.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Omotesando_Hills_interior_ramp.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0018',
    name:'21_21 Design Sight',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2007, access:'Paid Ticket', style:'Contemporary',
    lat:35.6663, lng:139.7306,
    addr:'9-7-6 Akasaka, Minato-ku, Tokyo 107-0052', hood:'Roppongi / Tokyo Midtown',
    localName:'パナソニック汐先ビル',
    localAddr:'東京都江東区豊洲3-2-20',
    localHood:'豊洲',
    desc:'21_21 Design Sight, located within the Tokyo Midtown complex in Roppongi and opened in 2007, is a design museum and gallery co-founded by Issey Miyake, Naoto Fukasawa, and Taku Satoh, with a building designed by Tadao Ando. The building is Ando\'s most poetic in Tokyo: two large angular steel plates — each a single folded plane of weathering steel — project from a low concrete base and sweep down from the sky to the ground in dramatic diagonal planes. Most of the museum is below grade, with the steel roof planes acting as skylights that channel natural light deep into the underground galleries. The building is minimal to an extreme — its entire above-ground presence is the two steel plates and a narrow concrete base — allowing the surrounding Hinokicho Park to dominate. The concept, inspired by Issey Miyake\'s idea of making "a single stitch from a single piece of cloth," directly informs the building\'s own single-fold structural logic.',
    hours:'Tue–Sun 10:00 AM – 7:00 PM · Closed Monday (Tue if Mon is public holiday)', lastEntry:'6:30 PM',
    admission:'Adults ¥1,400 · Students ¥800 · Under 15 free',
    tourOk:true, tourInfo:'Curated temporary design exhibitions rotate 2–3 times per year. The garden and exterior are freely accessible in the Midtown park. The annual "design sight" programme features talks and events.',
    web:'https://www.2121designsight.jp/en',
    transit:'Hibiya Oedo → Roppongi (Exit 8, 5 min)',
    walkFrom:'National Art Center (Kurokawa): 5 min · Mori Art Museum: 5 min · Suntory Museum of Art: 2 min',
    gmaps:'https://maps.google.com/?q=21_21+Design+Sight+Tokyo+Midtown',
    archdaily:'https://www.archdaily.com/tag/21-21-design-sight',
    wiki:'https://en.wikipedia.org/wiki/21_21_Design_Sight',
    tags:['Tadao Ando','Design Museum','Roppongi','Tokyo Midtown','Steel Roof','Underground','Issey Miyake'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/21_21_Design_Sight_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/2121_Design_Sight_exterior.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0019',
    name:'Collezione',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    cats:['Landmarks','Skyscrapers'],
    styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:1989, access:'Open to Public', style:'Contemporary',
    lat:35.6645, lng:139.7155,
    addr:'6-1-3 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama',
    localName:'グーグルジャパン本社',
    localAddr:'東京都千代田区丸の内',
    localHood:'丸の内',
    desc:'Collezione (1989) is an early commercial building by Tadao Ando in Minami-Aoyama, housing a retail and restaurant complex. The building demonstrates Ando\'s ability to create dramatic interior experiences from simple geometric moves: a cylindrical concrete tower, a rectilinear block, and a spiralling ramp are combined around a central atrium open to the sky. The exterior is entirely Ando\'s characteristic board-formed concrete, largely unbroken except for the circular drum and rectangular block articulation. The interior, however, opens dramatically around the atrium court — a narrow slot of sky accessed by the spiralling stair that draws visitors upward through the building. Collezione is one of Ando\'s earliest explorations of the courtyard section that would recur throughout his career, and an important early example of his work in Tokyo\'s competitive commercial architecture market.',
    hours:'Daily 11:00 AM – 8:00 PM (retail/restaurant hours)', lastEntry:'',
    admission:'Free (retail)',
    tourOk:false, tourInfo:'Freely accessible as a retail and dining complex.',
    web:'https://www.andotadao.org',
    transit:'Ginza Hanzomon → Omotesando (Exit B1, 5 min)',
    walkFrom:'Nezu Museum (Kuma): 3 min · Spiral (Maki): 5 min',
    gmaps:'https://maps.google.com/?q=Collezione+Minami-Aoyama+Tokyo',
    archdaily:'https://www.archdaily.com/tag/collezione',
    wiki:'https://en.wikipedia.org/wiki/Collezione_(building)',
    tags:['Tadao Ando','Concrete','Minami-Aoyama','Retail','Cylindrical','Atrium','1989'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Collezione_Aoyama_Ando.jpg?width=800'
    ],
    drawings:[]
  },

  // ── KISHO KUROKAWA ─────────────────────────────────────────────

  {
    id:'tok-0020',
    name:'Nakagin Capsule Tower',
    cat:'Historic', cc:'c-his', styleGroup:'Modernist',
    cats:['Historic'],
    styleGroups:['Modernist'],
    era:'1970–1999', city:'tokyo',
    arch:'Kisho Kurokawa', archs:['Kisho Kurokawa'],
    yr:1972, access:'Open to Public', style:'Metabolism',
    lat:35.6659, lng:139.7594,
    addr:'8-16-10 Ginza, Chuo-ku, Tokyo (site)', hood:'Shimbashi / Ginza',
    localName:'ミニマルメディアセンター',
    localAddr:'東京都新宿区',
    localHood:'新宿',
    desc:'The defining built statement of Japanese Metabolism, the Nakagin Capsule Tower comprised 140 prefabricated steel pods — each 2.3 × 3.8 m — bolted onto two reinforced concrete cores. Every capsule was conceived as a replaceable, interchangeable unit: a cell that could be unplugged, shipped away, and exchanged as the city evolved like a living organism. Kisho Kurokawa designed the tower as both a manifesto and a home, each capsule fitted with a circular porthole window, a built-in reel-to-reel deck, and a fold-down bed. Demolished in April 2022 despite sustained preservation campaigns, the tower survives in fragments — individual capsules now in the collections of MoMA New York, the Neue Nationalgalerie Berlin, and multiple Japanese institutions — ensuring that its argument about architecture as metabolic process remains unresolved.',
    hours:'Site demolished (April 2022). Preserved capsules on display at various museums worldwide.', lastEntry:'',
    admission:'N/A (site only)',
    tourOk:false, tourInfo:'The building was demolished in 2022. The site is accessible. Preserved capsules are exhibited at MoMA (New York), M+ (Hong Kong), and Japanese venues.',
    web:'https://nakagincapsuletower.com',
    transit:'JR Yamanote / Tokaido → Shimbashi (5 min walk); Ginza Line → Shimbashi (4 min walk)',
    walkFrom:'Shiodome (Nihon TV Tower): 5 min · Ginza district: 8 min',
    gmaps:'https://maps.google.com/?q=35.6659,139.7594',
    archdaily:'https://www.archdaily.com/tag/nakagin-capsule-tower',
    wiki:'https://en.wikipedia.org/wiki/Nakagin_Capsule_Tower',
    tags:['Kisho Kurokawa','Metabolism','Capsule','Prefab','Demolished','Shimbashi','Icon','1972'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Nakagin.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0021',
    name:'National Art Center Tokyo',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Kisho Kurokawa', archs:['Kisho Kurokawa'],
    yr:2007, access:'Open to Public', style:'Contemporary',
    lat:35.6650, lng:139.7274,
    addr:'7-22-2 Roppongi, Minato-ku, Tokyo 106-8558', hood:'Roppongi',
    localName:'竹の庭',
    localAddr:'京都府京都市東山区',
    localHood:'京都 / 東山',
    desc:'The National Art Center Tokyo (国立新美術館) is Kisho Kurokawa\'s final major work and the largest exhibition space in Japan. The undulating glass façade — 200 m long, sculpted into a continuous series of concave and convex curves — filters natural light into the interior in a way that changes through the day and season. The building contains no permanent collection: its 14 galleries are dedicated entirely to temporary exhibitions, positioning the NACT as a civic platform rather than an institutional repository. Two inverted concrete cones rise through the atrium — tapering upward to cafés cantilevered high above the lobby — creating one of Tokyo\'s most theatrical public interiors. Completed the year of Kurokawa\'s death, it stands as his meditation on light, transparency, and the public life of art.',
    hours:'Wed–Mon 10:00–18:00 (Fri–Sat until 20:00). Closed Tue.', lastEntry:'30 min before closing',
    admission:'Free (galleries may charge for exhibitions)',
    tourOk:false, tourInfo:'The building is freely accessible. Individual exhibitions may require tickets.',
    web:'https://www.nact.jp',
    transit:'Chiyoda → Nogizaka (Exit 6, directly connected); Hibiya / Oedo → Roppongi (7 min walk)',
    walkFrom:'21_21 Design Sight (Ando): 8 min · Mori Art Museum: 10 min',
    gmaps:'https://maps.google.com/?q=National+Art+Center+Tokyo',
    archdaily:'https://www.archdaily.com/tag/national-art-center-tokyo',
    wiki:'https://en.wikipedia.org/wiki/National_Art_Center,_Tokyo',
    tags:['Kisho Kurokawa','Roppongi','Glass Facade','Exhibition','Museum','2007','National'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Art_Center_Tokyo_2010.jpg?width=800'
    ],
    drawings:[]
  },

  // ── KUNIO MAEKAWA ───────────────────────────────────────────────

  {
    id:'tok-0022',
    name:'Tokyo Bunka Kaikan',
    cat:'Cultural', cc:'c-cul', styleGroup:'Modernist',
    cats:['Cultural','Residential'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kunio Maekawa', archs:['Kunio Maekawa'],
    yr:1961, access:'Open to Public', style:'Japanese Modernism',
    lat:35.7148, lng:139.7749,
    addr:'5-45 Ueno Koen, Taito-ku, Tokyo 110-8716', hood:'Ueno',
    localName:'水のミュージアム',
    localAddr:'東京都江東区',
    localHood:'江東',
    desc:'Standing at the northern edge of Ueno Park opposite the Tokyo National Museum, the Tokyo Bunka Kaikan (Tokyo Metropolitan Festival Hall) is the defining work of Kunio Maekawa — Le Corbusier\'s most devoted Japanese apprentice, and the man most responsible for transplanting the language of European modernism into postwar Japan. The building\'s muscular concrete form — pilotis-raised, with a dramatically upswept roof canopy and deeply textured tile-clad facades — translates Corbusian principles into a scale and materiality appropriate to the Japanese city. Its 2,303-seat main hall is one of the country\'s finest concert spaces. Designated an Important Cultural Property in 2003, it remains proof that fidelity to a master need not preclude genuine invention.',
    hours:'Lobby: open on performance days. Box office: 10:00–18:00 (closed Mon unless event).', lastEntry:'',
    admission:'Varies by event',
    tourOk:false, tourInfo:'The lobby and exterior are freely accessible on performance days. Interior tours not regularly offered.',
    web:'https://www.t-bunka.jp',
    transit:'JR Yamanote / Keihin-Tohoku → Ueno (Park Exit, 5 min walk)',
    walkFrom:'Tokyo National Museum: 5 min · Shinobazu Pond: 8 min',
    gmaps:'https://maps.google.com/?q=Tokyo+Bunka+Kaikan+Ueno',
    archdaily:'https://www.archdaily.com/tag/tokyo-bunka-kaikan',
    wiki:'https://en.wikipedia.org/wiki/Tokyo_Bunka_Kaikan',
    tags:['Kunio Maekawa','Ueno','Concert Hall','Brutalism','Japanese Modernism','Le Corbusier','1961','Important Cultural Property'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_bunka_kaikan01s3200.jpg?width=800'
    ],
    drawings:[]
  },

  // ── JUNZO SAKAKURA ──────────────────────────────────────────────

  {
    id:'tok-0023',
    name:'Harumi Apartment Complex',
    cat:'Historic', cc:'c-his', styleGroup:'Modernist',
    cats:['Historic','Residential'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Junzo Sakakura', archs:['Junzo Sakakura'],
    yr:1958, access:'Open to Public', style:'Corbusian Modernism',
    lat:35.6546, lng:139.7808,
    addr:'4-chome Harumi, Chuo-ku, Tokyo', hood:'Harumi',
    localName:'トーゴ美術館',
    localAddr:'東京都港区',
    localHood:'港区',
    desc:'Designed by Junzo Sakakura — who spent eight years in Le Corbusier\'s Paris atelier before returning to Japan — the Harumi Apartment Complex introduced the unité d\'habitation typology to Japanese public housing. Four slab blocks rise on pilotis above open landscaped ground in Harumi, a postwar reclaimed waterfront district of Chuo Ward. Commissioned by the Japan Housing Corporation as a model for modern collective living, the project set compositional and social standards that influenced a generation of public housing in Japan. Sakakura\'s use of the pilotis, roof garden, and free façade — all Corbusian principles — was understood at the time as a serious statement about what a democratic urban life could be. The surviving blocks are now protected as Important Cultural Properties.',
    hours:'Exterior freely visible. Interior: residential, private.', lastEntry:'',
    admission:'Free (exterior)',
    tourOk:false, tourInfo:'The exterior and grounds are accessible. The buildings are active residences and interiors are private.',
    web:'',
    transit:'Tokyo Metro Yurakucho / Toei Oedo → Tsukishima (15 min walk); Bus: Harumi 4-chome',
    walkFrom:'Tsukishima (monjayaki district): 15 min · Harumi waterfront: 5 min',
    gmaps:'https://maps.google.com/?q=Harumi+Apartments+Tokyo',
    archdaily:'',
    wiki:'https://en.wikipedia.org/wiki/Harumi_Flats',
    tags:['Junzo Sakakura','Le Corbusier','Public Housing','Modernism','Harumi','Important Cultural Property','1958'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Harumi_apartments.jpg?width=800'
    ],
    drawings:[]
  },

  // ── JUNZO YOSHIMURA ─────────────────────────────────────────────

  {
    id:'tok-0024',
    name:'International House of Japan',
    cat:'Cultural', cc:'c-cul', styleGroup:'Modernist',
    cats:['Cultural'],
    styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Junzo Yoshimura, Junzo Sakakura & Kunio Maekawa', archs:['Junzo Yoshimura','Junzo Sakakura','Kunio Maekawa'],
    yr:1955, access:'Open to Public', style:'Japanese Modernism',
    lat:35.6602, lng:139.7357,
    addr:'5-11-16 Roppongi, Minato-ku, Tokyo 106-0032', hood:'Roppongi',
    localName:'台湾デザインセンター',
    localAddr:'台北市中山区',
    localHood:'台北',
    desc:'Commissioned to rebuild Japan\'s connections with the international scholarly community after the war, the International House of Japan was a joint work by three architects who collectively defined the first generation of Japanese modernism: Junzo Yoshimura, Junzo Sakakura, and Kunio Maekawa — all formed in the orbit of Le Corbusier. Yoshimura\'s sensibility is most legible in the building\'s unhurried dialogue with its classical Japanese garden: corridors open onto verandahs, the garden folds into the building\'s geometry, and the boundary between inside and outside is allowed to dissolve. A rare modern building that absorbs traditional spatial culture rather than displacing it, the complex remains in active use as a cultural and academic institution.',
    hours:'Garden open to members and guests. Café/restaurant open to public: 11:00–22:00.', lastEntry:'',
    admission:'Café/restaurant: open to public (free entry). Events: varies.',
    tourOk:false, tourInfo:'The garden is primarily for members. The café, restaurant, and ground floor public areas are accessible to all.',
    web:'https://www.i-house.or.jp',
    transit:'Tokyo Metro Namboku → Roppongi-itchome (Exit 1, 3 min walk)',
    walkFrom:'Ark Hills: 5 min · Roppongi Hills: 10 min',
    gmaps:'https://maps.google.com/?q=International+House+of+Japan+Roppongi',
    archdaily:'',
    wiki:'https://en.wikipedia.org/wiki/International_House_of_Japan',
    tags:['Junzo Yoshimura','Junzo Sakakura','Kunio Maekawa','Roppongi','Japanese Modernism','Garden','1955','Cultural Exchange'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/International_House_of_Japan.jpg?width=800'
    ],
    drawings:[]
  },

  // ── ARAKAWA + MADELINE GINS ─────────────────────────────────────

  {
    id:'tok-0025',
    name:'Reversible Destiny Lofts Mitaka',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential','Skyscrapers','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Arakawa + Madeline Gins', archs:['Arakawa','Madeline Gins'],
    yr:2005, access:'Paid Ticket', style:'Experimental',
    lat:35.6836, lng:139.5528,
    addr:'2-2-8 Osawa, Mitaka-shi, Tokyo 181-0015', hood:'Mitaka',
    localName:'シンガポール科学博物館',
    localAddr:'シンガポール',
    localHood:'シンガポール',
    desc:'Built on the conviction that habituated perception leads to physical decline and death, artist Shusaku Arakawa and philosopher Madeline Gins designed these nine apartments to permanently disorient their occupants. Floors pitch and undulate; ceiling heights shift without warning from 1.4 m to 3.5 m; spherical recesses punctuate surfaces; primary colors collide against each other without resolution. Every spatial convention — level floor, neutral wall, readable threshold — is systematically refused. The Mitaka lofts are the most fully realized expression of their "reversible destiny" thesis: that architecture designed to resist the body\'s expectations can slow, and perhaps reverse, the process of aging. Available for overnight stays and weekend tours, they remain the world\'s most inhabitable philosophical argument.',
    hours:'Tours: Sat–Sun 11:00–16:00 (reservation required). Overnight stays: bookable.', lastEntry:'',
    admission:'Guided tour: ¥1,500. Overnight stay: from ¥5,000/person.',
    tourOk:true, tourInfo:'Weekend guided tours available by reservation. The lofts can be rented overnight for a full sensory experience.',
    web:'https://www.rdloftsmitaka.com',
    transit:'JR Chuo Line → Mitaka (20 min walk or bus to Osawa 3-chome)',
    walkFrom:'Ghibli Museum: 20 min on foot',
    gmaps:'https://maps.google.com/?q=Reversible+Destiny+Lofts+Mitaka',
    archdaily:'https://www.archdaily.com/tag/reversible-destiny-lofts',
    wiki:'https://en.wikipedia.org/wiki/Reversible_Destiny_Lofts',
    tags:['Arakawa','Madeline Gins','Experimental','Mitaka','Residential','Philosophy','Anti-Gravity','2005'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Reversible_Destiny_Lofts.jpg?width=800'
    ],
    drawings:[]
  },

  // ── WONDERWALL (MASAMICHI KATAYAMA) ─────────────────────────────

  {
    id:'tok-0026',
    name:'Uniqlo Ginza Flagship',
    cat:'Retail', cc:'c-ret', styleGroup:'Contemporary',
    cats:['Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Wonderwall (Masamichi Katayama)', archs:['Wonderwall','Masamichi Katayama'],
    yr:2012, access:'Open to Public', style:'Concept Retail Design',
    lat:35.6698, lng:139.7641,
    addr:'6-9-5 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'トーマス・ヘザーウィック・スタジオ',
    localAddr:'ロンドン',
    localHood:'ロンドン',
    desc:'Masamichi Katayama of Wonderwall is the architect most responsible for defining what Tokyo retail design became in the 2000s and 2010s — a discipline in which spatial branding is indistinguishable from cultural identity. The Uniqlo Ginza flagship, occupying twelve floors of a Ginza tower, is among his most ambitious spatial works: a vertical cascade of experience in which each floor is distinguished by a different material palette, proportion, and lighting condition, yet the whole reads as a single continuous spatial narrative. Katayama\'s influence extends from Harajuku streetwear boutiques (Bape, Neighborhood) to global fashion retail, but his Ginza work represents the maturation of his thinking into something genuinely architectural.',
    hours:'Daily 11:00–21:00', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'The store is freely accessible during opening hours.',
    web:'https://www.uniqlo.com/jp/store/list/ginza.html',
    transit:'Tokyo Metro Ginza / Hibiya / Marunouchi → Ginza (Exit A2, 2 min walk)',
    walkFrom:'Ginza Six: 5 min · Itoya Stationery: 3 min',
    gmaps:'https://maps.google.com/?q=Uniqlo+Ginza+Flagship',
    archdaily:'',
    wiki:'',
    tags:['Wonderwall','Masamichi Katayama','Ginza','Retail Design','Uniqlo','2012','Interior','Flagship'],
    photos:[],
    drawings:[]
  },

  // ── KLEIN DYTHAM ARCHITECTURE ───────────────────────────────────

  {
    id:'tok-0027',
    name:'Daikanyama T-Site',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural','Skyscrapers'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Klein Dytham Architecture', archs:['Klein Dytham Architecture'],
    yr:2011, access:'Open to Public', style:'Contemporary',
    lat:35.6481, lng:139.7027,
    addr:'17-5 Sarugakucho, Shibuya-ku, Tokyo 150-0033', hood:'Daikanyama',
    localName:'東京都美術館',
    localAddr:'東京都台東区上野公園8-36',
    localHood:'上野',
    desc:'Designed by Klein Dytham Architecture (KDa) for Tsutaya Books, Daikanyama T-Site reimagined the bookstore as a forest retreat for thoughtful adults. Three low-rise volumes — clad in a laser-cut T-pattern screen that shifts between transparency and opacity with the light — are connected by elevated walkways through a canopy of mature camphor trees. The result is less a retail complex than a micro-district: books, music, film, café, and curated lifestyle objects arranged in an unhurried sequence that rewards slow movement. It immediately became a globally cited model for experience-led retail and a defining landmark of Daikanyama\'s identity as Tokyo\'s most refined neighborhood for slow urban living.',
    hours:'7:00–26:00 (2 AM) daily', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Freely accessible during opening hours. Lounge membership available for the second-floor Anjin magazine library.',
    web:'https://store.tsite.jp/daikanyama/',
    transit:'Tokyu Toyoko Line → Daikanyama (5 min walk)',
    walkFrom:'Log Road Daikanyama: 3 min · Hillside Terrace (Maki): 5 min',
    gmaps:'https://maps.google.com/?q=Daikanyama+T-Site+Tokyo',
    archdaily:'https://www.archdaily.com/285103/daikanyama-t-site-klein-dytham-architecture',
    wiki:'https://en.wikipedia.org/wiki/Daikanyama_T-Site',
    tags:['Klein Dytham','Daikanyama','Tsutaya','Bookstore','Retail','Forest','2011','Lifestyle'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Daikanyama_Tsutaya_Books.jpg?width=800'
    ],
    drawings:[]
  },

  // ── ATELIER BOW-WOW ─────────────────────────────────────────────

  {
    id:'tok-0028',
    name:'Tower Machiya',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential','Retail'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Atelier Bow-Wow', archs:['Atelier Bow-Wow'],
    yr:2005, access:'Private', style:'Tokyo Pet Architecture',
    lat:35.6059, lng:139.6561,
    addr:'Ookayama, Meguro-ku, Tokyo', hood:'Ookayama',
    localName:'ジェイアール東日本デザインフェスティバル',
    localAddr:'東京都渋谷区',
    localHood:'渋谷',
    desc:'Tower Machiya is one of the most lucid expressions of the design philosophy that Atelier Bow-Wow (Momoyo Kaijima and Yoshiharu Tsukamoto) developed through their landmark survey "Made in Tokyo": the conviction that the city\'s tightest, most irregular, most constrained sites are precisely where the richest spatial invention becomes possible — that limitation is the precondition of character. Rising on a narrow urban plot, the building stacks machiya (traditional townhouse) spatial logic vertically: intimate rooms with low ceilings alternate with double-height volumes; the staircase becomes the building\'s primary spatial event; the section negotiates privacy and light with an ingenuity no plan alone could achieve. It is both a home and a manifesto.',
    hours:'Private residence. Exterior view only.', lastEntry:'',
    admission:'N/A',
    tourOk:false, tourInfo:'Private residential building. Exterior visible from the street.',
    web:'https://bow-wow.jp',
    transit:'Tokyu Meguro / Oimachi Lines → Ookayama',
    walkFrom:'Tokyo Institute of Technology campus: 5 min',
    gmaps:'https://maps.google.com/?q=Ookayama+Meguro+Tokyo',
    archdaily:'https://www.archdaily.com/tag/atelier-bow-wow',
    wiki:'https://en.wikipedia.org/wiki/Atelier_Bow-Wow',
    tags:['Atelier Bow-Wow','Pet Architecture','Machiya','Residential','Tokyo','Narrow Lot','2005'],
    photos:[],
    drawings:[]
  },

  // ── JUNYA ISHIGAMI ──────────────────────────────────────────────

  {
    id:'tok-0029',
    name:'KAIT Workshop',
    cat:'Academic / Institution', cc:'c-edu', styleGroup:'Contemporary',
    cats:['Academic / Institution'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Junya Ishigami', archs:['Junya Ishigami'],
    yr:2008, access:'Open to Public', style:'Structural Minimalism',
    lat:35.5042, lng:139.3614,
    addr:'1030 Shimo-Ogino, Atsugi-shi, Kanagawa (near Tokyo)', hood:'Atsugi / Kanagawa',
    localName:'ユニクロ銀座店',
    localAddr:'東京都中央区銀座3-8-15',
    localHood:'銀座',
    desc:'The KAIT Workshop at Kanagawa Institute of Technology is Junya Ishigami\'s breakthrough built work — a single-storey glass pavilion covering 2,000 sqm whose structural system defies immediate comprehension. Three hundred and five slender steel columns, each of a different cross-section and set at a subtly varying angle, carry the flat roof in an arrangement that resembles a forest more than an engineered grid. No column is redundant; each carries a precise load in a precisely calibrated direction; together they produce a space without hierarchy, without emphasis, without beginning or end. The workshop accommodates student making across its open floor — welding, woodworking, ceramics — dissolving the boundary between workshop and landscape. Junya Ishigami was awarded the Pritzker Prize in 2024.',
    hours:'Open during Kanagawa Institute of Technology campus hours (term time).', lastEntry:'',
    admission:'Free with campus access',
    tourOk:false, tourInfo:'The building is on the KIT campus and accessible during university hours. No formal tours offered.',
    web:'https://www.jnyi.jp',
    transit:'Odakyu Odawara Line → Atsugi; bus to Kanagawa Institute of Technology (40 min from Shinjuku)',
    walkFrom:'KIT main campus buildings: adjacent',
    gmaps:'https://maps.google.com/?q=Kanagawa+Institute+of+Technology+KAIT+Workshop',
    archdaily:'https://www.archdaily.com/13953/kait-workshop-junya-ishigami',
    wiki:'https://en.wikipedia.org/wiki/KAIT_Workshop',
    tags:['Junya Ishigami','KAIT','Pritzker 2024','Columns','Structural','Minimalism','Workshop','Kanagawa','2008'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/KAIT_workshop.jpg?width=800'
    ],
    drawings:[]
  },

  // ── HIROSHI NAKAMURA & NAP ──────────────────────────────────────

  {
    id:'tok-0030',
    name:'Dancing Trees, Singing Birds',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Hiroshi Nakamura & NAP', archs:['Hiroshi Nakamura'],
    yr:2009, access:'Open to Public', style:'Organic Contemporary',
    lat:35.3256, lng:139.4843,
    addr:'5-2-35 Tsujido Motomachi, Fujisawa-shi, Kanagawa (greater Tokyo area)', hood:'Fujisawa / Shonan',
    localName:'アップルストア表参道',
    localAddr:'東京都港区南青山1-13-18',
    localHood:'表参道 / 南青山',
    desc:'Hiroshi Nakamura & NAP Architects are among the most consistently inventive practices in contemporary Japanese architecture, working at the intersection of sensory experience, material research, and landscape. Dancing Trees, Singing Birds — a childcare facility in Fujisawa — is one of the studio\'s most celebrated early works. The building\'s irregular roof mimics the branching canopy of the surrounding forest, its curved profile generated by tracing the shadow patterns cast by existing trees onto the site. Interior light filters through skylights at the same angles and rhythms as the foliage above, making the building a literal instrument of the natural environment. NAP\'s Tokyo residential and commercial commissions continue this inquiry into architecture as perceptual event.',
    hours:'Not open to general public (childcare facility).', lastEntry:'',
    admission:'N/A',
    tourOk:false, tourInfo:'Private childcare facility. Exterior visible from street.',
    web:'https://www.nap-archi.com',
    transit:'JR Tokaido Line → Tsujido (10 min walk)',
    walkFrom:'Shonan coast: 15 min',
    gmaps:'https://maps.google.com/?q=Dancing+Trees+Singing+Birds+Fujisawa',
    archdaily:'https://www.archdaily.com/152972/dancing-trees-singing-birds-nap-architects',
    wiki:'',
    tags:['Hiroshi Nakamura','NAP','Organic','Childcare','Fujisawa','Forest','Roof','2009'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Dancing_Trees_Singing_Birds.jpg?width=800'
    ],
    drawings:[]
  },

  // ── YOSHIHIRO SATO ──────────────────────────────────────────────

  {
    id:'tok-0031',
    name:'Sakuradai Court Village',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential','Cultural'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Yoshihiro Sato', archs:['Yoshihiro Sato'],
    yr:2007, access:'Open to Public', style:'Urban Housing',
    lat:35.7307, lng:139.6553,
    addr:'Sakuradai, Nerima-ku, Tokyo', hood:'Nerima',
    localName:'ルイ・ヴィトン松屋銀座',
    localAddr:'東京都中央区銀座3-6-1',
    localHood:'銀座',
    desc:'Yoshihiro Sato is among the Tokyo architects who have approached housing not as a typological problem but as an urban design challenge — asking how collective residential buildings can produce street life, shared space, and spatial variety at the scale of the neighbourhood. The Sakuradai Court Village project in Nerima Ward is a notable example of this approach: a complex of housing units arranged to create internal courtyards and semi-public passages that invert the typical relationship between the residential block and the street, producing an interior neighbourhood of its own.',
    hours:'Exterior freely visible. Residential interior: private.', lastEntry:'',
    admission:'Free (exterior)',
    tourOk:false, tourInfo:'Residential complex. Exterior and shared walkways may be accessible.',
    web:'',
    transit:'Seibu Ikebukuro Line → Sakuradai',
    walkFrom:'Nerima ward local area',
    gmaps:'https://maps.google.com/?q=Sakuradai+Nerima+Tokyo',
    archdaily:'',
    wiki:'',
    tags:['Yoshihiro Sato','Nerima','Housing','Courtyard','Residential','Tokyo','2007'],
    photos:[],
    drawings:[]
  },

  // ── TAKASHI YAMAGUCHI ───────────────────────────────────────────

  {
    id:'tok-0032',
    name:'Mujin-to Production Gallery',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    cats:['Cultural','Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Takashi Yamaguchi & Associates', archs:['Takashi Yamaguchi'],
    yr:2005, access:'Open to Public', style:'Minimalism',
    lat:35.7060, lng:139.6564,
    addr:'2-3-20 Koenji-Kita, Suginami-ku, Tokyo', hood:'Koenji',
    localName:'モンクレール裏参道',
    localAddr:'東京都港区南青山5-2-1',
    localHood:'南青山 / 裏参道',
    desc:'Takashi Yamaguchi & Associates have built a singular body of work around white monochromatic space — galleries, chapels, and institutions where the suppression of material incident allows architecture to become pure spatial experience. Their Tokyo gallery works extend the studio\'s Osaka-rooted practice of extreme material reduction: walls, floors, and ceilings rendered in a consistent white ground that shifts tonally only with the movement of natural light. In the tradition of Japanese ma (negative space), emptiness is treated as the primary architectural material, and the human body and the art placed within become the only events the building acknowledges.',
    hours:'Tue–Sat 12:00–19:00. Closed Sun–Mon.', lastEntry:'',
    admission:'Free',
    tourOk:false, tourInfo:'Gallery open to public during exhibition periods.',
    web:'',
    transit:'JR Chuo / Sobu Line → Koenji (North Exit, 5 min walk)',
    walkFrom:'Koenji shopping streets: 5 min',
    gmaps:'https://maps.google.com/?q=Koenji+Suginami+Tokyo',
    archdaily:'',
    wiki:'',
    tags:['Takashi Yamaguchi','Minimalism','Gallery','White','Koenji','Tokyo','Spatial'],
    photos:[],
    drawings:[]
  },

  // ── YUICHIRO HIGUCHI ────────────────────────────────────────────

  {
    id:'tok-0033',
    name:'House in Komazawa',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    cats:['Residential'],
    styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Yuichiro Higuchi', archs:['Yuichiro Higuchi'],
    yr:2010, access:'Private', style:'Contemporary',
    lat:35.6400, lng:139.6630,
    addr:'Komazawa, Setagaya-ku, Tokyo', hood:'Komazawa',
    localName:'ユニバーサル・スタジオ・ジャパン',
    localAddr:'大阪府大阪市此花区桜島2-1-33',
    localHood:'ユニバーサルシティ',
    desc:'Yuichiro Higuchi works within the long tradition of experimental residential architecture that has made Tokyo\'s urban fabric a laboratory of domestic invention. Operating at the scale of the individual house — the scale at which Japanese architects have historically been freest to speculate — Higuchi\'s residential work explores the relationship between programme, section, and light in the constrained conditions of the Tokyo plot. The house in Komazawa is representative of a generation of Tokyo practitioners who inherited the formal intensity of the 1990s Atelier movement and redirected it toward a more nuanced engagement with the textures of everyday urban life.',
    hours:'Private residence. Not open to public.', lastEntry:'',
    admission:'N/A',
    tourOk:false, tourInfo:'Private residential building.',
    web:'',
    transit:'Tokyu Den-en-toshi Line → Komazawa-Daigaku',
    walkFrom:'Komazawa Olympic Park: 10 min',
    gmaps:'https://maps.google.com/?q=Komazawa+Setagaya+Tokyo',
    archdaily:'',
    wiki:'',
    tags:['Yuichiro Higuchi','Residential','Komazawa','Setagaya','Tokyo','Contemporary'],
    photos:[],
    drawings:[]
  },

  // ── NIKKEN SEKKEI ──────────────────────────────────────────────

  {
    id:'tok-0034',
    name:'Tokyu Plaza Ginza',
    cat:'Retail', cats:['Retail','Landmarks','Commercial'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Nikken Sekkei', archs:['Nikken Sekkei'],
    yr:2016, access:'Open to Public', style:'Contemporary',
    lat:35.6697, lng:139.7628,
    addr:'5-2-1 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'新国立競技場',
    localAddr:'東京都渋谷区霞ヶ丘町',
    localHood:'霞ヶ丘 / 信濃町',
    desc:'Tokyu Plaza Ginza, completed in 2016, occupies the prominent Sukiyabashi intersection at the gateway to Ginza. Nikken Sekkei designed the 11-storey retail complex with a prismatic glass facade directly inspired by the traditional Edo Kiriko cut-glass technique — the angled facets fracture and multiply reflections of the surrounding city in the same way that a craftsman\'s grinding wheel creates layered refractions in hand-cut Edo glassware. The result is a facade that appears to shift colour and transparency with changing light and viewing angle. The rooftop KIRIKO TERRACE, a landscaped garden with panoramic views across Ginza and the Imperial Palace moat, is freely accessible to visitors — a rare piece of public urban green space in one of Tokyo\'s densest commercial districts.',
    hours:'Shops: daily 11:00 AM – 9:00 PM · KIRIKO TERRACE (roof garden): 11:00 AM – 11:00 PM', lastEntry:'',
    admission:'Free access · Individual shops may charge',
    tourOk:false, tourInfo:'The building\'s rooftop garden is freely accessible to the public during opening hours. A good vantage point for viewing the Ginza streetscape and Tokyo skyline.',
    web:'https://ginza.tokyu-plaza.com',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (C2/C3 exit, 1 min) · Yurakucho → Yurakucho (3 min)',
    walkFrom:'Ginza Six: 5 min · Shibuya: 15 min by metro',
    gmaps:'https://maps.google.com/?q=Tokyu+Plaza+Ginza+Tokyo',
    archdaily:'https://www.archdaily.com/tag/tokyu-plaza-ginza',
    wiki:'https://en.wikipedia.org/wiki/Tokyu_Plaza_Ginza',
    tags:['Nikken Sekkei','Edo Kiriko','Ginza','Retail','Rooftop Garden','Facade','2016'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyu_Plaza_Ginza_2016.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0035',
    name:'Yamaha Ginza Building',
    cat:'Retail', cats:['Retail','Cultural','Commercial'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Nikken Sekkei', archs:['Nikken Sekkei'],
    yr:2010, access:'Open to Public', style:'Contemporary',
    lat:35.6681, lng:139.7668,
    addr:'7-9-14 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'観音寺現代美術館',
    localAddr:'香川県豊島郡土庄町豊島',
    localHood:'豊島 / 瀬戸内',
    desc:'The Yamaha Ginza Building, rebuilt by Nikken Sekkei in 2010, serves as the flagship Tokyo showroom for Yamaha\'s full range of musical instruments, audio equipment, and music education. The building\'s facade deploys a rhythmic pattern of vertical aluminium fins and glazing that evokes musical notation — the alternating opaque and transparent bays read as the bars and spaces of a musical score when seen from Chuo Dori. The interior showrooms occupy eight floors, with a concert hall, recording studios, and hands-on instrument demonstration spaces integrated across the building section. The project demonstrates Nikken Sekkei\'s command of programme-driven facade design: every element of the exterior expression is rooted in the building\'s function as a temple to sound and music.',
    hours:'Daily 11:00 AM – 7:00 PM (concert hall hours vary)', lastEntry:'',
    admission:'Showrooms free · Concert and event tickets vary',
    tourOk:false, tourInfo:'The instrument showrooms on all floors are open to the public. Musical instrument demonstrations and workshops are frequently held. Check the Yamaha website for concert and event schedules.',
    web:'https://www.yamahamusic.jp/shop/ginza',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A4 exit, 5 min)',
    walkFrom:'Shizuoka Press Building (Tange): 2 min · Ginza Six: 8 min',
    gmaps:'https://maps.google.com/?q=Yamaha+Ginza+Building+Tokyo',
    archdaily:'https://www.archdaily.com/tag/yamaha-ginza',
    wiki:'',
    tags:['Nikken Sekkei','Yamaha','Music','Retail','Ginza','Concert Hall','Facade'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_Ginza_Building_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── JUN AOKI & ASSOCIATES ─────────────────────────────────────

  {
    id:'tok-0036',
    name:'Louis Vuitton Matsuya Ginza',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Aoki & Associates', archs:['Jun Aoki & Associates'],
    yr:2004, access:'Open to Public', style:'Contemporary',
    lat:35.6712, lng:139.7637,
    addr:'3-6-1 Ginza, Chuo-ku, Tokyo 104-8130', hood:'Ginza',
    localName:'キッザニア',
    localAddr:'東京都江東区豊洲2-4-9',
    localHood:'豊洲 / お台場',
    desc:'Jun Aoki\'s facade renewal for Louis Vuitton at Matsuya Ginza, completed in 2004, is one of the most influential pieces of retail facade design in contemporary Japan. The existing Matsuya department store building was wrapped in a new double-skin glass curtain wall perforated with a pattern derived from the Louis Vuitton monogram — the overlapping LV initials and floral motifs are translated into a screen of circular and rhombus-shaped apertures in a thin aluminium mesh. By day the facade reads as a shimmering, semi-transparent veil; at night, LED illumination transforms the entire surface into a glowing lantern that projects the pattern onto the surrounding street. The project established Jun Aoki as the definitive architect of Louis Vuitton\'s global retail identity, leading to commissions in Paris, New York, and Osaka.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Louis Vuitton boutique within the Matsuya Ginza department store. The facade is best viewed from Chuo Dori at dusk when the LED illumination is active.',
    web:'https://jp.louisvuitton.com',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A13 exit, 1 min)',
    walkFrom:'Mikimoto Ginza 2 (Toyo Ito): 3 min · Tokyo International Forum: 10 min',
    gmaps:'https://maps.google.com/?q=Louis+Vuitton+Matsuya+Ginza',
    archdaily:'https://www.archdaily.com/tag/louis-vuitton-matsuya-ginza',
    wiki:'',
    tags:['Jun Aoki','Louis Vuitton','Matsuya','Ginza','Facade','LED','Monogram','Retail','2004'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Louis_Vuitton_Matsuya_Ginza.jpg?width=800'
    ],
    drawings:[]
  },

  {
    id:'tok-0037',
    name:'Louis Vuitton Ginza Namiki',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Aoki & Associates', archs:['Jun Aoki & Associates','Peter Marino Architect'],
    yr:2004, access:'Open to Public', style:'Contemporary',
    lat:35.6708, lng:139.7645,
    addr:'2-6-1 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza / Namiki Dori',
    localName:'スクエア・エニックス本社',
    localAddr:'東京都新宿区',
    localHood:'新宿',
    desc:'The Louis Vuitton Ginza Namiki flagship, completed in 2004 on Ginza\'s tree-lined Namiki Dori, is the product of a collaboration between Jun Aoki as design architect and Peter Marino as interior architect — a partnership that would define luxury retail architecture globally for the following two decades. Aoki clad the seven-storey building in an outer skin of translucent glass panels printed with a pattern derived from the Damier chessboard motif — Louis Vuitton\'s signature textile pattern since 1888 — creating a facade that appears to glow from within at night. The glass screen is separated from the structural envelope by a narrow cavity, allowing the outer skin to register wind movement and create an ever-shifting moiré effect as the viewer passes. Peter Marino\'s interior floors are thematically distinct, each presenting a different chapter of the Louis Vuitton universe in materials ranging from ebonised oak to champagne-coloured metal mesh.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Louis Vuitton flagship boutique on Namiki Dori. The facade\'s illuminated Damier pattern is most visible after dark. Namiki Dori (Tree-Lined Street) is one of Ginza\'s most architecturally concentrated retail streets.',
    web:'https://jp.louisvuitton.com',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (B5 exit, 3 min)',
    walkFrom:'LV Matsuya Ginza (Jun Aoki): 5 min · De Beers Ginza: 4 min',
    gmaps:'https://maps.google.com/?q=Louis+Vuitton+Ginza+Namiki+Tokyo',
    archdaily:'https://www.archdaily.com/tag/louis-vuitton-ginza',
    wiki:'',
    tags:['Jun Aoki','Peter Marino','Louis Vuitton','Ginza','Damier','Retail','Facade','Namiki Dori','2004'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Louis_Vuitton_Ginza_Namiki_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── JUN MITSUI & ASSOCIATES ───────────────────────────────────

  {
    id:'tok-0038',
    name:'De Beers Ginza Building',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Jun Mitsui & Associates Architects', archs:['Jun Mitsui & Associates Architects'],
    yr:2005, access:'Open to Public', style:'Contemporary',
    lat:35.6718, lng:139.7640,
    addr:'5-4-1 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
    localName:'読売日本テレビ文化センター',
    localAddr:'東京都中央区銀座',
    localHood:'銀座',
    desc:'The De Beers Ginza Building by Jun Mitsui & Associates Architects is among the most literal exercises in brand-derived facade design in the Ginza luxury retail district. The entire building envelope is conceived as a faceted crystal — the glass and steel facade is composed of irregular diamond-shaped panels angled at varying inclinations, so that the building appears to be a single large-cut gemstone when seen from across Chuo Dori. The facet angles are calibrated to catch and scatter direct sunlight throughout the day, creating a building that sparkles and shifts in intensity from morning to evening. At night, backlighting transforms the crystal into a luminous presence. The project demonstrates Jun Mitsui\'s consistent approach: distilling a brand\'s most essential visual metaphor — in this case, the cut diamond itself — into a structural and atmospheric facade condition.',
    hours:'Mon–Sun 11:00 AM – 7:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'De Beers jewellery boutique. The facade\'s crystal-facet geometry is best appreciated from the opposite side of Chuo Dori, particularly in afternoon light.',
    web:'https://www.debeers.com/en-jp',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A2 exit, 3 min)',
    walkFrom:'LV Matsuya Ginza (Jun Aoki): 2 min · Mikimoto Ginza 2 (Toyo Ito): 4 min',
    gmaps:'https://maps.google.com/?q=De+Beers+Ginza+Building+Tokyo',
    archdaily:'',
    wiki:'',
    tags:['Jun Mitsui','De Beers','Ginza','Diamond','Faceted Glass','Retail','Jewelry','2005'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/De_Beers_Ginza_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── KENZO TANGE / METABOLIST ──────────────────────────────────

  {
    id:'tok-0039',
    name:'Shizuoka Press and Broadcasting Center',
    cat:'Historic', cats:['Historic','Landmarks','Commercial'], cc:'c-his', styleGroup:'Modernist', styleGroups:['Modernist'],
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1967, access:'Open to Public', style:'Metabolist',
    lat:35.6655, lng:139.7682,
    addr:'8-3-7 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza / Shimbashi',
    localName:'パークハイアット東京',
    localAddr:'東京都新宿区西新宿3-7-1',
    localHood:'西新宿',
    desc:'The Shizuoka Press and Broadcasting Center (静岡新聞・静岡放送東京支局) of 1967 is one of Kenzo Tange\'s most celebrated Metabolist buildings and one of the most radical structural demonstrations in Tokyo\'s post-war cityscape. The building consists of a single cylindrical concrete service core — housing stairs, lifts, utilities, and a communications mast — from which eleven irregular office floor-plates are cantilevered in pairs at alternating angles. Each floor slab projects 8–10 metres from the central shaft with no peripheral columns; the impression is of capsule-like rooms clipped to a mast, ready to be added to, rearranged, or removed. The design directly embodies the Metabolist manifesto published by Tange, Kurokawa, and their contemporaries in 1960: that the city and its buildings should be understood as living organisms capable of growth and transformation. Standing at the southern end of Ginza between two major expressways, the tower reads as a structural diagram, pure and uncompromising.',
    hours:'Office building · Exterior viewable 24/7', lastEntry:'',
    admission:'Private office building · Exterior freely visible',
    tourOk:false, tourInfo:'The building is a functioning office tower for the Shizuoka Broadcasting System Tokyo bureau. The exterior — best seen from across the elevated expressway — is accessible 24/7. A registered Important Cultural Property candidate.',
    web:'',
    transit:'Ginza/Hibiya/Marunouchi → Ginza (A4 exit, 8 min) · JR → Shimbashi (5 min)',
    walkFrom:'Ginza Six: 8 min · Yamaha Ginza (Nikken Sekkei): 2 min',
    gmaps:'https://maps.google.com/?q=Shizuoka+Press+Building+Ginza+Tokyo',
    archdaily:'https://www.archdaily.com/tag/shizuoka-press-and-broadcasting-center',
    wiki:'https://en.wikipedia.org/wiki/Shizuoka_Press_and_Broadcasting_Center',
    tags:['Kenzo Tange','Metabolism','Metabolist','Ginza','1967','Cantilever','Cylindrical Core','Historic','Important Cultural Property'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Shizuoka_Press_Building_Ginza_Kenzo_Tange.jpg?width=800'
    ],
    drawings:[]
  },

  // ── RAFAEL VIÑOLY ─────────────────────────────────────────────

  {
    id:'tok-0040',
    name:'Tokyo International Forum',
    cat:'Cultural', cats:['Cultural','Public','Landmarks'], cc:'c-cul', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'1970–1999', city:'tokyo',
    arch:'Rafael Viñoly Architects', archs:['Rafael Viñoly Architects'],
    yr:1997, access:'Open to Public', style:'Contemporary',
    lat:35.6771, lng:139.7636,
    addr:'3-5-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005', hood:'Marunouchi / Yurakucho',
    localName:'LVMH watches & jewels',
    localAddr:'東京都港区',
    localHood:'港区',
    desc:'The Tokyo International Forum, completed in 1997 to designs by Rafael Viñoly Architects following an international competition won in 1989, is one of the largest and most complex convention and performing-arts centres in Japan. The complex consists of four solid granite-and-glass hall blocks (Halls B, C, D, and E) grouped around the extraordinary Glass Building — a 60-metre-high ship-hull-shaped glass and steel atrium that spans the full 210-metre length of the site, its keel pointing toward Tokyo Station. The Glass Building\'s interior is suspended by a pair of inclined steel trusses visible through the glass, forming a transparent exoskeleton that glows at night. The atrium serves as an urban passageway connecting Yurakucho to Marunouchi, freely accessible 24 hours a day, and hosts the biannual Tokyo Antique Market and regular public events on its elevated walkways. The total site covers 41,544 square metres and can accommodate over 5,000 visitors across its eight halls.',
    hours:'Atrium: 24/7 (free) · Halls: event hours vary', lastEntry:'',
    admission:'Atrium free · Hall events ticketed',
    tourOk:true, tourInfo:'The glass atrium is freely open to the public 24/7. Tours of the building\'s engineering and architecture are available. The Tokyo Antique Market is held on alternate months in the outdoor plaza.',
    web:'https://www.t-i-forum.co.jp/en',
    transit:'JR Yamanote/Keihin-Tohoku → Yurakucho (1 min) · Yurakucho → Yurakucho (B5 exit, 1 min)',
    walkFrom:'Tokyo Station Marunouchi: 5 min · Imperial Palace East Garden: 10 min',
    gmaps:'https://maps.google.com/?q=Tokyo+International+Forum',
    archdaily:'https://www.archdaily.com/tag/tokyo-international-forum',
    wiki:'https://en.wikipedia.org/wiki/Tokyo_International_Forum',
    tags:['Rafael Viñoly','Marunouchi','Convention','Glass Atrium','Ship Hull','Public','Yurakucho','1997'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tokyo_International_Forum_interior.jpg?width=800'
    ],
    drawings:[]
  },

  // ── HERZOG & DE MEURON ────────────────────────────────────────

  {
    id:'tok-0041',
    name:'Miu Miu Aoyama',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Herzog & de Meuron', archs:['Herzog & de Meuron'],
    yr:2015, access:'Open to Public', style:'Contemporary',
    lat:35.6643, lng:139.7133,
    addr:'5-4-10 Minamiaoyama, Minato-ku, Tokyo 107-0062', hood:'Minamiaoyama / Omotesando',
    localName:'キープ・アット・ホーム',
    localAddr:'東京都世田谷区',
    localHood:'世田谷',
    desc:'Herzog & de Meuron\'s Miu Miu Aoyama (2015) stands as one of the most structurally inventive luxury retail buildings in Tokyo\'s fashion district. The four-storey building is wrapped in a facade of stacked precast concrete shelves — deep horizontal cantilever trays that project progressively further from the face of the building as they ascend, creating a tiered, geological section reminiscent of sedimentary rock strata. Narrow glazed slots between the concrete layers admit controlled ribbons of daylight into the interior, while the shelves themselves act as integrated planters, growing moss and small vegetation that changes with the seasons. The result is a facade that is simultaneously brutally structural and quietly natural, operating in careful dialogue with the mature zelkova tree canopy of nearby Omotesando. It is among the few Herzog & de Meuron projects in Japan and represents their continued interest in the tectonic materiality of concrete as a living surface.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Miu Miu boutique, freely accessible. The concrete shelf facade is best appreciated from across the narrow side street; the moss and seasonal vegetation on the shelves varies throughout the year.',
    web:'https://www.miumiu.com',
    transit:'Ginza/Hanzomon/Chiyoda → Omotesando (A5 exit, 5 min)',
    walkFrom:'Omotesando Hills (Tadao Ando): 3 min · Prada Omotesando (Herzog & de Meuron): 5 min',
    gmaps:'https://maps.google.com/?q=Miu+Miu+Aoyama+Tokyo',
    archdaily:'https://www.archdaily.com/tag/miu-miu-aoyama',
    wiki:'',
    tags:['Herzog & de Meuron','Miu Miu','Aoyama','Omotesando','Concrete','Retail','Stacked Shelves','2015','Vegetation'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Miu_Miu_Aoyama_Herzog_de_Meuron_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── NORIHIKO DAN AND ASSOCIATES ───────────────────────────────

  {
    id:'tok-0042',
    name:'Keyaki Building',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'Norihiko Dan and Associates', archs:['Norihiko Dan and Associates'],
    yr:2008, access:'Open to Public', style:'Contemporary',
    lat:35.6648, lng:139.7140,
    addr:'5-6-2 Minamiaoyama, Minato-ku, Tokyo 107-0062', hood:'Minamiaoyama / Omotesando',
    localName:'自然と建築センター',
    localAddr:'東京都江東区',
    localHood:'江東',
    desc:'The Keyaki Building by Norihiko Dan and Associates takes its name from the keyaki (zelkova) trees — the same species that canopy Omotesando avenue — whose forms are abstracted into the building\'s facade. Norihiko Dan, who inherited and extended the legacy of his father Kenzo Tange\'s practice, applies a rigorous structural intelligence to the question of how a small commercial building might speak to the mature urban landscape of Omotesando without competing with it. The facade system uses a layered screen of perforated metal panels whose aperture pattern is derived from the branching silhouette of the keyaki tree in winter, allowing natural light to filter through in the same dappled pattern as the tree canopy overhead. At ground level, the building steps back to create a small covered arcade, a semi-public threshold between the pavement and the retail interior consistent with the pedestrian grain of the Omotesando side streets.',
    hours:'Shops: daily 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access',
    tourOk:false, tourInfo:'Small commercial and retail building freely accessible during shop hours. The perforated metal facade and ground-floor arcade are best observed in late afternoon, when the dappled shadow pattern the screen casts onto the interior floors is most vivid.',
    web:'',
    transit:'Ginza/Hanzomon/Chiyoda → Omotesando (A5 exit, 3 min)',
    walkFrom:'Miu Miu Aoyama (Herzog & de Meuron): 3 min · Omotesando Hills (Tadao Ando): 5 min',
    gmaps:'https://maps.google.com/?q=Keyaki+Building+Omotesando+Tokyo',
    archdaily:'',
    wiki:'',
    tags:['Norihiko Dan','Keyaki','Zelkova','Omotesando','Aoyama','Perforated Facade','Retail','2008'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Keyaki_Building_Omotesando_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── OMA ───────────────────────────────────────────────────────

  {
    id:'tok-0043',
    name:'Coach Omotesando Flagship',
    cat:'Retail', cats:['Retail','Landmarks'], cc:'c-ret', styleGroup:'Contemporary', styleGroups:['Contemporary'],
    era:'2000–Present', city:'tokyo',
    arch:'OMA (Office for Metropolitan Architecture)', archs:['OMA (Office for Metropolitan Architecture)'],
    yr:2016, access:'Open to Public', style:'Contemporary',
    lat:35.6657, lng:139.7128,
    addr:'5-3-1 Minamiaoyama, Minato-ku, Tokyo 107-0062', hood:'Minamiaoyama / Omotesando',
    localName:'デジタルアート美術館',
    localAddr:'東京都江東区',
    localHood:'江東',
    desc:'OMA\'s Coach Omotesando flagship, designed under the leadership of Shohei Shigematsu and completed in 2016, translates OMA\'s characteristic graphic and programmatic intelligence into a mid-scale luxury retail building on one of Tokyo\'s most architecturally competitive streets. The building\'s facade is articulated in bands of warm-toned stone and glazing, with the horizontal datum of the Omotesando streetscape extended into the building section. OMA organised the retail floors as a sectional promenade rather than stacked slabs — visitors encounter the Coach collection through a continuous spatial loop of ramps, platforms, and level changes that reference the movement patterns of a New York brownstone walk-up, a reference to Coach\'s American heritage. The ground floor is pulled back from the street to create a generous covered entry zone that functions as a semi-public threshold — OMA\'s consistent argument that even luxury retail should contribute to the public life of the city around it.',
    hours:'Mon–Sun 11:00 AM – 8:00 PM', lastEntry:'',
    admission:'Free access (retail)',
    tourOk:false, tourInfo:'Coach flagship boutique. The sectional organisation of the interior is best explored by ascending through all retail floors. The entry forecourt functions as a publicly accessible covered space.',
    web:'https://www.coach.com',
    transit:'Ginza/Hanzomon/Chiyoda → Omotesando (A5 exit, 4 min)',
    walkFrom:'Keyaki Building (Norihiko Dan): 3 min · Prada Omotesando (Herzog & de Meuron): 4 min',
    gmaps:'https://maps.google.com/?q=Coach+Omotesando+Flagship+Tokyo',
    archdaily:'https://www.archdaily.com/tag/coach-omotesando',
    wiki:'',
    tags:['OMA','Rem Koolhaas','Shohei Shigematsu','Coach','Omotesando','Retail','Flagship','2016','Sectional'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Coach_Omotesando_OMA_Tokyo.jpg?width=800'
    ],
    drawings:[]
  },

  // ── HEATHERWICK STUDIO ────────────────────────────────────────

  {
    id:'tok-0044',
    name:'Azabudai Hills',
    cat:'Landmarks', cats:['Landmarks','Commercial','Cultural','Public'], cc:'c-lmk', styleGroup:'Contemporary', styleGroups:['Contemporary','Landscape'],
    era:'2000–Present', city:'tokyo',
    arch:'Heatherwick Studio', archs:['Heatherwick Studio','Pelli Clarke & Partners','Diller Scofidio + Renfro'],
    yr:2023, access:'Open to Public', style:'Contemporary',
    lat:35.6587, lng:139.7399,
    addr:'1-2-4 Azabudai, Minato-ku, Tokyo 106-0041', hood:'Azabudai / Toranomon',
    localName:'東京建築文化館',
    localAddr:'東京都渋谷区',
    localHood:'渋谷',
    desc:'Azabudai Hills, opened in November 2023, is one of the most ambitious urban development projects in Tokyo\'s history — a 8.1-hectare mixed-use district in Minato-ku that replaces a mid-20th-century residential neighbourhood with three landmark towers, 24,000 sqm of retail, a hotel, international school, and a significant contemporary art museum. The central landscape — a 6,000 sqm garden designed by Heatherwick Studio — is the project\'s civic heart: a topographically complex public green space planted with over 150 species of trees and flowering plants that creates the impression of a low hill at the centre of the city. Thomas Heatherwick\'s contribution addresses the fundamental critique of large-scale Tokyo development — the erasure of street life and public ground — by treating the landscape as a spatial event, not a residual amenity. The tallest tower (330 m, by Pelli Clarke & Partners) was briefly the tallest building in Japan at completion. Tower B, by Diller Scofidio + Renfro, includes the Azabudai Hills Gallery operated by teamLab. The project establishes a new model for high-density urban development in which landscape and public realm are primary design drivers.',
    hours:'Garden and public areas: daily 24/7 · Retail: 11:00 AM – 9:00 PM · Gallery: 10:00 AM – 7:00 PM', lastEntry:'',
    admission:'Garden and public areas: free · Gallery: ticketed (from ¥3,200)',
    tourOk:true, tourInfo:'The central garden and public walkways are freely accessible at all times. The Azabudai Hills Gallery (teamLab) requires timed entry tickets booked in advance. The development also contains a Mori Art Museum satellite space.',
    web:'https://www.azabudaihills.com',
    transit:'Hibiya Line → Kamiyacho (3 min) · Namboku → Roppongi-Itchome (5 min)',
    walkFrom:'Roppongi Hills: 10 min · Tokyo Tower: 10 min · Toranomon Hills: 7 min',
    gmaps:'https://maps.google.com/?q=Azabudai+Hills+Tokyo',
    archdaily:'https://www.archdaily.com/tag/azabudai-hills',
    wiki:'https://en.wikipedia.org/wiki/Azabudai_Hills',
    tags:['Heatherwick Studio','Pelli Clarke','Diller Scofidio Renfro','DS+R','Azabudai','Mixed-Use','Landscape','2023','teamLab','Tallest Japan','Minato-ku'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_Tokyo_2023.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/Azabudai_Hills_aerial.jpg?width=800'
    ],
    drawings:[]
  }

];
