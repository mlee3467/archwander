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
    id:'yoyogi-national-gymnasium',
    name:'Yoyogi National Gymnasium',
    cat:'Cultural', cc:'c-cul', styleGroup:'Modernist',
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public', style:'Metabolist',
    lat:35.6683, lng:139.6951,
    addr:'2-1-1 Jinnan, Shibuya-ku, Tokyo 150-0041', hood:'Shibuya / Harajuku',
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
    id:'tokyo-metropolitan-government',
    name:'Tokyo Metropolitan Government Building',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1991, access:'Open to Public', style:'Contemporary',
    lat:35.6895, lng:139.6917,
    addr:'2-8-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo 163-8001', hood:'Nishi-Shinjuku',
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
    id:'st-marys-cathedral-tokyo',
    name:'St. Mary\'s Cathedral Tokyo',
    cat:'Religious', cc:'c-rel', styleGroup:'Modernist',
    era:'1930–1969', city:'tokyo',
    arch:'Kenzo Tange', archs:['Kenzo Tange'],
    yr:1964, access:'Open to Public', style:'Modernist',
    lat:35.7186, lng:139.7316,
    addr:'3-16-15 Sekiguchi, Bunkyo-ku, Tokyo 112-0014', hood:'Bunkyo / Sekiguchi',
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
    id:'tods-omotesando',
    name:'Tod\'s Omotesando Building',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2004, access:'Open to Public', style:'Contemporary',
    lat:35.6672, lng:139.7098,
    addr:'5-1-15 Jingumae, Shibuya-ku, Tokyo 150-0001', hood:'Omotesando',
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
    id:'mikimoto-ginza-2',
    name:'Mikimoto Ginza 2',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Toyo Ito', archs:['Toyo Ito'],
    yr:2005, access:'Open to Public', style:'Contemporary',
    lat:35.6711, lng:139.7639,
    addr:'2-4-12 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
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
    id:'dior-omotesando',
    name:'Dior Omotesando',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'SANAA', archs:['SANAA','Kazuyo Sejima','Ryue Nishizawa'],
    yr:2003, access:'Open to Public', style:'Contemporary',
    lat:35.6653, lng:139.7095,
    addr:'5-9-11 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
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

  {
    id:'national-art-center-tokyo',
    name:'The National Art Center, Tokyo',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'SANAA', archs:['SANAA','Kisho Kurokawa (original concept)'],
    yr:2007, access:'Free Admission', style:'Contemporary',
    lat:35.6656, lng:139.7268,
    addr:'7-22-2 Roppongi, Minato-ku, Tokyo 106-8558', hood:'Roppongi',
    desc:'The National Art Center in Roppongi, completed in 2007 and the largest exhibition space in Japan at 50,000 sq m, was designed by the late Kisho Kurokawa but its final realisation reflects close collaboration with SANAA. The building\'s most distinctive feature is its undulating glass facade of alternating concave and convex curves that runs the entire 200-metre length of the building, creating a shimmering, continuously shifting surface of glass that appears to breathe. The interior is equally dramatic: two inverted concrete cones rise from the ground floor like enormous funnel forms, serving as restaurants. The building has no permanent collection — it is entirely a rental exhibition space, hosting major rotating shows from Japanese and international institutions. Its scale, central Roppongi location, and free-admission public floors make it one of the most visited art venues in Japan.',
    hours:'Wed–Mon 10:00 AM – 6:00 PM (Fri–Sat to 8:00 PM) · Closed Tuesday', lastEntry:'30 min before closing',
    admission:'Free (most areas) · Special exhibitions ticketed',
    tourOk:true, tourInfo:'The lobby, public floors, and restaurant are freely accessible. Special exhibition tickets vary. Located in Roppongi Art Triangle with Mori Art Museum and Suntory Museum of Art.',
    web:'https://www.nact.jp/english',
    transit:'Hibiya Oedo → Roppongi (Exit 4A, 5 min)',
    walkFrom:'Roppongi Hills (Mori Tower): 6 min · 21_21 Design Sight (Ando): 5 min',
    gmaps:'https://maps.google.com/?q=National+Art+Center+Tokyo+Roppongi',
    archdaily:'https://www.archdaily.com/tag/national-art-center-tokyo',
    wiki:'https://en.wikipedia.org/wiki/The_National_Art_Center,_Tokyo',
    tags:['SANAA','National Art Center','Roppongi','Undulating Glass','Exhibition','Free'],
    photos:[
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Art_Center_Tokyo.jpg?width=800',
      'https://commons.wikimedia.org/wiki/Special:FilePath/National_Art_Center_Tokyo_interior.jpg?width=800'
    ],
    drawings:[]
  },

  // ── SHIGERU BAN ───────────────────────────────────────────────

  {
    id:'curtain-wall-house-tokyo',
    name:'Curtain Wall House',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:1995, access:'Exterior Only', style:'Contemporary',
    lat:35.7494, lng:139.6917,
    addr:'Itabashi-ku, Tokyo', hood:'Itabashi',
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
    id:'nicolas-hayek-center',
    name:'Nicolas G. Hayek Center',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Shigeru Ban', archs:['Shigeru Ban'],
    yr:2007, access:'Open to Public', style:'Contemporary',
    lat:35.6718, lng:139.7639,
    addr:'2-6-9 Ginza, Chuo-ku, Tokyo 104-0061', hood:'Ginza',
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
    id:'nezu-museum',
    name:'Nezu Museum',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2009, access:'Paid Ticket', style:'Contemporary',
    lat:35.6639, lng:139.7168,
    addr:'6-5-1 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
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
    id:'asakusa-culture-tourist-info',
    name:'Asakusa Culture Tourist Information Center',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2012, access:'Free Admission', style:'Contemporary',
    lat:35.7118, lng:139.7966,
    addr:'2-18-9 Kaminarimon, Taito-ku, Tokyo 111-0034', hood:'Asakusa',
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
    id:'japan-national-stadium',
    name:'Japan National Stadium (Olympic Stadium)',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Kengo Kuma', archs:['Kengo Kuma'],
    yr:2019, access:'Paid Ticket', style:'Contemporary',
    lat:35.6781, lng:139.7142,
    addr:'10-1 Kasumigaokamachi, Shinjuku-ku, Tokyo 160-0013', hood:'Gaienmae / Shinjuku',
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
    id:'house-na-tokyo',
    name:'House NA',
    cat:'Residential', cc:'c-res', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2011, access:'Exterior Only', style:'Contemporary',
    lat:35.7417, lng:139.6602,
    addr:'Nerima-ku, Tokyo', hood:'Nerima',
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
    id:'musashino-art-university-library',
    name:'Musashino Art University Museum & Library',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Sou Fujimoto', archs:['Sou Fujimoto'],
    yr:2010, access:'Open to Public', style:'Contemporary',
    lat:35.7322, lng:139.5529,
    addr:'1-736 Ogawa-cho, Kodaira-shi, Tokyo 187-8505', hood:'Kodaira (Greater Tokyo)',
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
    id:'spiral-building-tokyo',
    name:'Spiral (Wacoal Art Center)',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1985, access:'Open to Public', style:'Contemporary',
    lat:35.6639, lng:139.7165,
    addr:'5-6-23 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama / Omotesando',
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
    id:'hillside-terrace-tokyo',
    name:'Hillside Terrace',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Fumihiko Maki', archs:['Fumihiko Maki'],
    yr:1992, access:'Open to Public', style:'Contemporary',
    lat:35.6494, lng:139.7002,
    addr:'18-12 Sarugakucho, Shibuya-ku, Tokyo 150-0033', hood:'Daikanyama',
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
    id:'horyuji-treasures-gallery',
    name:'Gallery of Hōryū-ji Treasures',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Yoshio Taniguchi', archs:['Yoshio Taniguchi'],
    yr:1999, access:'Paid Ticket', style:'Contemporary',
    lat:35.7188, lng:139.7747,
    addr:'13-9 Uenokoen, Taito-ku, Tokyo 110-8712', hood:'Ueno',
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
    id:'omotesando-hills',
    name:'Omotesando Hills',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2006, access:'Open to Public', style:'Contemporary',
    lat:35.6671, lng:139.7083,
    addr:'4-12-10 Jingumae, Shibuya-ku, Tokyo 150-0001', hood:'Omotesando',
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
    id:'21-21-design-sight',
    name:'21_21 Design Sight',
    cat:'Cultural', cc:'c-cul', styleGroup:'Contemporary',
    era:'2000–Present', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:2007, access:'Paid Ticket', style:'Contemporary',
    lat:35.6663, lng:139.7306,
    addr:'9-7-6 Akasaka, Minato-ku, Tokyo 107-0052', hood:'Roppongi / Tokyo Midtown',
    desc:'21_21 Design Sight, located within the Tokyo Midtown complex in Roppongi and opened in 2007, is a design museum and gallery co-founded by Issey Miyake, Naoto Fukasawa, and Taku Satoh, with a building designed by Tadao Ando. The building is Ando\'s most poetic in Tokyo: two large angular steel plates — each a single folded plane of weathering steel — project from a low concrete base and sweep down from the sky to the ground in dramatic diagonal planes. Most of the museum is below grade, with the steel roof planes acting as skylights that channel natural light deep into the underground galleries. The building is minimal to an extreme — its entire above-ground presence is the two steel plates and a narrow concrete base — allowing the surrounding Hinokicho Park to dominate. The concept, inspired by Issey Miyake\'s idea of making "a single stitch from a single piece of cloth," directly informs the building\'s own single-fold structural logic.',
    hours:'Tue–Sun 10:00 AM – 7:00 PM · Closed Monday (Tue if Mon is public holiday)', lastEntry:'6:30 PM',
    admission:'Adults ¥1,400 · Students ¥800 · Under 15 free',
    tourOk:true, tourInfo:'Curated temporary design exhibitions rotate 2–3 times per year. The garden and exterior are freely accessible in the Midtown park. The annual "design sight" programme features talks and events.',
    web:'https://www.2121designsight.jp/en',
    transit:'Hibiya Oedo → Roppongi (Exit 8, 5 min)',
    walkFrom:'National Art Center (SANAA): 5 min · Mori Art Museum: 5 min · Suntory Museum of Art: 2 min',
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
    id:'collezione-tokyo',
    name:'Collezione',
    cat:'Landmarks', cc:'c-lmk', styleGroup:'Contemporary',
    era:'1970–1999', city:'tokyo',
    arch:'Tadao Ando', archs:['Tadao Ando'],
    yr:1989, access:'Open to Public', style:'Contemporary',
    lat:35.6645, lng:139.7155,
    addr:'6-1-3 Minami-Aoyama, Minato-ku, Tokyo 107-0062', hood:'Minami-Aoyama',
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
  }

];
