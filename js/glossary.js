/* ================================================================
   ArchWander — Architectural Glossary Data
   data-glossary.js
   ================================================================ */
const GLOSSARY = [
  {
    id: 'adaptive-reuse',
    term: 'Adaptive Reuse',
    cat: 'Urban',
    def: 'The process of repurposing an existing building for a use different from its original function, such as converting a factory into apartments or a warehouse into offices. Adaptive reuse preserves architectural heritage while reducing the environmental impact of demolition and new construction. It is widely valued in urban planning as a strategy for sustainable city renewal.',
    wiki: 'https://en.wikipedia.org/wiki/Adaptive_reuse_of_buildings'
  },
  {
    id: 'art-deco',
    term: 'Art Deco',
    cat: 'Style',
    def: 'A visual arts and architectural style that emerged in the 1920s and flourished internationally through the 1930s and 1940s. It is characterised by bold geometric forms, rich ornamentation, symmetrical compositions, and the use of modern materials such as stainless steel, chrome, and glass. Iconic examples include the Chrysler Building in New York and the Palais de Chaillot in Paris.',
    wiki: 'https://en.wikipedia.org/wiki/Art_Deco'
  },
  {
    id: 'art-nouveau',
    term: 'Art Nouveau',
    cat: 'Style',
    def: 'An international style of art, architecture, and applied art that peaked in popularity between 1890 and 1910. Art Nouveau is characterised by organic, flowing lines inspired by natural forms such as plants, flowers, and insects. Architects like Victor Horta in Brussels and Antoni Gaudí in Barcelona produced seminal works in this style.',
    wiki: 'https://en.wikipedia.org/wiki/Art_Nouveau'
  },
  {
    id: 'atrium',
    term: 'Atrium',
    cat: 'Space',
    def: 'A large, open interior space within a building, typically multi-storey and covered by a skylight or glazed roof. Originating in ancient Roman domestic architecture, the atrium has been reinterpreted in modern buildings as a grand communal hall that brings natural light deep into a structure. It often serves as a visual and social focal point in hotels, office towers, and civic buildings.',
    wiki: 'https://en.wikipedia.org/wiki/Atrium_(architecture)'
  },
  {
    id: 'bauhaus',
    term: 'Bauhaus',
    cat: 'Style',
    def: 'A highly influential German art school (1919–1933) and the design philosophy it pioneered, which sought to unify fine art, craft, and industrial production. Bauhaus architecture emphasises functional simplicity, the honest use of materials, and the rejection of historical ornament. Its principles shaped Modernism worldwide and are evident in buildings characterised by flat roofs, open floor plans, and minimal decoration.',
    wiki: 'https://en.wikipedia.org/wiki/Bauhaus'
  },
  {
    id: 'beaux-arts',
    term: 'Beaux-Arts',
    cat: 'Style',
    def: 'A classical architectural style that flourished in the late 19th and early 20th centuries, rooted in the teaching of the École des Beaux-Arts in Paris. It features grand symmetrical facades, elaborate stone carvings, monumental staircases, and the free application of classical Greek and Roman elements. Typical examples include major civic buildings, railway stations, and cultural institutions in North American and European cities.',
    wiki: 'https://en.wikipedia.org/wiki/Beaux-Arts_architecture'
  },
  {
    id: 'biophilic-design',
    term: 'Biophilic Design',
    cat: 'Sustainability',
    def: 'An approach to architecture and interior design that incorporates natural elements — such as plants, water, natural light, and organic materials — to strengthen the connection between building occupants and the natural world. Research links biophilic environments to improved well-being, productivity, and stress reduction. It goes beyond mere aesthetics to embed nature as a functional and integral part of the built environment.',
    wiki: 'https://en.wikipedia.org/wiki/Biophilic_design'
  },
  {
    id: 'brise-soleil',
    term: 'Brise-Soleil',
    cat: 'Facade',
    def: 'A fixed or adjustable shading device attached to a building\'s exterior, designed to reduce solar heat gain while preserving views and natural ventilation. The term is French for "sun-breaker." Popularised by Le Corbusier in the mid-20th century, brise-soleil systems have become a hallmark of energy-conscious modern architecture in hot climates.',
    wiki: 'https://en.wikipedia.org/wiki/Brise_soleil'
  },
  {
    id: 'brutalism',
    term: 'Brutalism',
    cat: 'Style',
    def: 'An architectural style that emerged in the 1950s and gained prominence through the 1970s, characterised by the bold, raw expression of structural materials — most notably exposed concrete (béton brut). Brutalist buildings typically feature massive, fortress-like forms, repetitive modular elements, and an uncompromising aesthetic that prioritises honesty of construction over ornamentation.',
    wiki: 'https://en.wikipedia.org/wiki/Brutalist_architecture'
  },
  {
    id: 'cantilever',
    term: 'Cantilever',
    cat: 'Structure',
    def: 'A projecting structural element — such as a beam, slab, or floor plate — that is anchored at only one end and extends horizontally without external bracing or support at the free end. Cantilevers are achieved through the use of rigid connections and counterweights, and are a dramatic demonstration of structural engineering. Famous examples include the overhanging floors of Frank Lloyd Wright\'s Fallingwater.',
    wiki: 'https://en.wikipedia.org/wiki/Cantilever'
  },
  {
    id: 'cladding',
    term: 'Cladding',
    cat: 'Facade',
    def: 'The application of one material over another to provide a skin or layer on the exterior of a building. Cladding materials include stone, brick, metal panels, glass, timber, and terracotta, and serve both protective and aesthetic functions. The choice of cladding significantly defines a building\'s visual character and its weathering performance.',
    wiki: 'https://en.wikipedia.org/wiki/Cladding_(construction)'
  },
  {
    id: 'colonnade',
    term: 'Colonnade',
    cat: 'Space',
    def: 'A row of columns supporting an entablature or arched structure, creating a covered walkway or portico along the facade of a building or public space. Colonnades are a defining feature of classical Greek and Roman architecture and have been continuously revived in Neoclassical and Beaux-Arts styles. They provide sheltered pedestrian circulation while articulating the facade with rhythm and depth.',
    wiki: 'https://en.wikipedia.org/wiki/Colonnade'
  },
  {
    id: 'curtain-wall',
    term: 'Curtain Wall',
    cat: 'Facade',
    def: 'A non-structural outer cladding system for a building, typically composed of glass panels held in a lightweight aluminium framework that hangs like a curtain from the building\'s structural frame. Because it carries no floor loads, a curtain wall allows for expansive glazed facades that maximise natural light. The system became ubiquitous in commercial high-rise architecture from the mid-20th century onwards.',
    wiki: 'https://en.wikipedia.org/wiki/Curtain_wall_(architecture)'
  },
  {
    id: 'deconstructivism',
    term: 'Deconstructivism',
    cat: 'Style',
    def: 'A postmodern architectural movement that emerged in the 1980s, characterised by the fragmentation and deliberate distortion of conventional architectural forms. Deconstructivist buildings often feature non-rectilinear, intersecting geometric shapes that create a sense of controlled chaos and visual tension. Key practitioners include Frank Gehry, Zaha Hadid, Daniel Libeskind, and Rem Koolhaas.',
    wiki: 'https://en.wikipedia.org/wiki/Deconstructivism'
  },
  {
    id: 'facade',
    term: 'Facade',
    cat: 'Facade',
    def: 'The principal exterior face or front of a building, typically the elevation facing a public street or open space. The facade is the primary interface between a building and its urban context, and carries the greatest architectural expression. It combines functional elements — windows, doors, cladding, shading — with the visual identity of the structure.',
    wiki: 'https://en.wikipedia.org/wiki/Facade'
  },
  {
    id: 'fenestration',
    term: 'Fenestration',
    cat: 'Facade',
    def: 'The arrangement, proportion, and design of windows, doors, and other openings in a building\'s facade. Fenestration patterns define the rhythm and scale of an elevation and directly influence the building\'s relationship with natural light, ventilation, and energy performance. Architectural styles are often distinguished by characteristic fenestration patterns, from the narrow lancet windows of Gothic cathedrals to the floor-to-ceiling glazing of Modernist towers.',
    wiki: 'https://en.wikipedia.org/wiki/Fenestration'
  },
  {
    id: 'floor-plate',
    term: 'Floor Plate',
    cat: 'Structure',
    def: 'The horizontal structural slab at each level of a multi-storey building, which defines the usable floor area at that level. The size and shape of floor plates directly affect a building\'s structural efficiency, spatial flexibility, and relationship to natural light. Skyscraper design involves carefully balancing floor plate dimensions against structural core requirements and exterior setbacks.',
    wiki: 'https://en.wikipedia.org/wiki/Floor_plate'
  },
  {
    id: 'flying-buttress',
    term: 'Flying Buttress',
    cat: 'Structure',
    def: 'An arched masonry structure projecting from the upper wall of a Gothic cathedral and transferring the lateral thrust of the vaulted ceiling outward to a free-standing pier. By resolving outward forces externally, flying buttresses allowed medieval builders to replace heavy solid walls with expansive stained-glass windows, transforming the interior quality of Gothic churches. They remain one of the most recognisable structural innovations in architectural history.',
    wiki: 'https://en.wikipedia.org/wiki/Flying_buttress'
  },
  {
    id: 'gothic-revival',
    term: 'Gothic Revival',
    cat: 'Style',
    def: 'An architectural movement that began in England in the mid-18th century and reached its peak in the 19th century, characterised by the revival of medieval Gothic forms including pointed arches, ribbed vaults, tracery windows, and vertical emphasis. The style was championed by figures such as Augustus Pugin and John Ruskin, and was widely used for churches, universities, and government buildings throughout Europe and North America.',
    wiki: 'https://en.wikipedia.org/wiki/Gothic_Revival_architecture'
  },
  {
    id: 'green-roof',
    term: 'Green Roof',
    cat: 'Sustainability',
    def: 'A roof of a building that is partially or completely covered with vegetation and a growing medium, planted over a waterproofing membrane. Green roofs reduce stormwater runoff, improve urban biodiversity, lower building heat gain, and mitigate the urban heat island effect. They can range from lightweight "extensive" sedum mats to fully landscaped "intensive" rooftop gardens capable of supporting trees and public spaces.',
    wiki: 'https://en.wikipedia.org/wiki/Green_roof'
  },
  {
    id: 'high-tech-architecture',
    term: 'High-Tech Architecture',
    cat: 'Style',
    def: 'A late Modern architectural style that emerged in the 1970s and celebrates industrial materials and engineering systems by placing them visibly on the exterior of buildings. Structural elements, mechanical ducts, and service cores — typically hidden inside traditional buildings — become expressive architectural features. The Centre Pompidou in Paris by Renzo Piano and Richard Rogers is the canonical example.',
    wiki: 'https://en.wikipedia.org/wiki/High-tech_architecture'
  },
  {
    id: 'international-style',
    term: 'International Style',
    cat: 'Style',
    def: 'A major architectural style that emerged in Western Europe and North America in the 1920s and was characterised by functional clarity, rectilinear forms, open interior spaces, and the extensive use of glass, steel, and reinforced concrete. The term was coined by Henry-Russell Hitchcock and Philip Johnson in 1932. The International Style became the dominant global language of commercial architecture in the mid-20th century.',
    wiki: 'https://en.wikipedia.org/wiki/International_Style'
  },
  {
    id: 'landmark',
    term: 'Landmark',
    cat: 'Urban',
    def: 'A building, structure, or site that is recognised for its historical, cultural, or architectural significance and serves as a point of reference within the cityscape. Landmarks may be legally designated to protect them from demolition or unsympathetic alteration. Beyond their official status, landmarks anchor collective memory and provide visual identity to their surrounding neighbourhoods.',
    wiki: 'https://en.wikipedia.org/wiki/Landmark'
  },
  {
    id: 'leed',
    term: 'LEED',
    cat: 'Sustainability',
    def: 'Leadership in Energy and Environmental Design — a globally recognised green building certification system developed by the US Green Building Council. Buildings are awarded points across categories including sustainable site planning, water efficiency, energy performance, materials selection, and indoor air quality. LEED certification levels range from Certified through Silver, Gold, and Platinum.',
    wiki: 'https://en.wikipedia.org/wiki/Leadership_in_Energy_and_Environmental_Design'
  },
  {
    id: 'listed-building',
    term: 'Listed Building',
    cat: 'Urban',
    def: 'A building placed on a statutory register of structures of special architectural or historic interest, subject to legal controls that restrict alteration, extension, or demolition without government consent. The listing system originated in the UK but equivalent heritage protection designations exist in most countries. Grade I (exceptional), Grade II* (particularly important), and Grade II (nationally important) are the three listing tiers in England.',
    wiki: 'https://en.wikipedia.org/wiki/Listed_building'
  },
  {
    id: 'massing',
    term: 'Massing',
    cat: 'Structure',
    def: 'The three-dimensional bulk and overall form of a building, considered as an abstract sculptural object before surface detail is applied. Massing studies help architects understand how a building relates to its site, casts shadows, and reads in the cityscape. Decisions about massing — horizontal versus vertical, stepped versus monolithic — fundamentally shape the architectural experience.',
    wiki: 'https://en.wikipedia.org/wiki/Massing_(architecture)'
  },
  {
    id: 'masterplan',
    term: 'Masterplan',
    cat: 'Urban',
    def: 'A comprehensive long-term planning document that guides the development or redevelopment of a large site or district, establishing frameworks for land use, building density, street networks, open space, and infrastructure. Masterplans are developed for new towns, regeneration zones, campuses, and large mixed-use developments. They balance regulatory control with sufficient flexibility to allow the area to evolve over time.',
    wiki: 'https://en.wikipedia.org/wiki/Urban_planning'
  },
  {
    id: 'mixed-use',
    term: 'Mixed-Use',
    cat: 'Urban',
    def: 'A type of urban development that combines residential, commercial, cultural, institutional, or entertainment uses in a single building or on a single site. Mixed-use development is favoured in contemporary urban planning for creating vibrant, walkable neighbourhoods, reducing reliance on private cars, and activating streets at multiple times of day. It contrasts with monofunctional zoning, which separates uses into distinct zones.',
    wiki: 'https://en.wikipedia.org/wiki/Mixed-use_development'
  },
  {
    id: 'modernism',
    term: 'Modernism',
    cat: 'Style',
    def: 'A broad architectural movement of the 20th century that rejected historical eclecticism and ornamentation in favour of rational planning, structural honesty, and the expression of new industrial materials and technologies. Modernism encompassed the International Style, Bauhaus, and later movements and was championed by figures such as Le Corbusier, Mies van der Rohe, and Walter Gropius. Its influence reshaped the built environment worldwide.',
    wiki: 'https://en.wikipedia.org/wiki/Modern_architecture'
  },
  {
    id: 'neoclassicism',
    term: 'Neoclassicism',
    cat: 'Style',
    def: 'An architectural style that emerged in the mid-18th century as a reaction against Baroque excess, drawing inspiration from the forms and principles of ancient Greek and Roman architecture. Neoclassical buildings feature columned porticos, symmetrical facades, pediments, and restrained ornament. The style became the preferred idiom for civic, governmental, and cultural institutions across Europe and the Americas.',
    wiki: 'https://en.wikipedia.org/wiki/Neoclassical_architecture'
  },
  {
    id: 'parametric-design',
    term: 'Parametric Design',
    cat: 'Style',
    def: 'An approach to architectural design that uses computational algorithms and defined parameters to generate complex, often organic or mathematically derived forms that would be difficult to conceive or draw by hand. Parametric tools such as Grasshopper and generative algorithms allow architects to explore vast design possibilities and optimise for performance or material efficiency. The style is associated with architects such as Zaha Hadid and firms exploring complex geometries.',
    wiki: 'https://en.wikipedia.org/wiki/Parametric_design'
  },
  {
    id: 'pilotis',
    term: 'Pilotis',
    cat: 'Structure',
    def: 'A series of columns or stilts that raise a building above the ground, freeing the ground level for open space, circulation, or parking. Pilotis were one of Le Corbusier\'s "Five Points of Architecture" and became a defining motif of Modernist housing and civic buildings. By lifting the building mass, pilotis allow landscape and movement to flow continuously beneath the structure.',
    wiki: 'https://en.wikipedia.org/wiki/Pilotis'
  },
  {
    id: 'plaza',
    term: 'Plaza',
    cat: 'Space',
    def: 'An open urban public space, typically paved, surrounded by buildings and used for public assembly, markets, and social life. Plazas have been central to urban design since antiquity — from the Roman forum and Spanish colonial plaza mayor to the corporate plaza bonuses of 20th-century American zoning. The quality of a plaza depends on its scale, sun exposure, ground-level activity, and seating.',
    wiki: 'https://en.wikipedia.org/wiki/Plaza'
  },
  {
    id: 'podium',
    term: 'Podium',
    cat: 'Structure',
    def: 'A low-rise base structure from which a taller tower rises, common in high-density urban developments. The podium typically contains retail, parking, or public uses at the street level, creating an active ground-floor frontage while the tower above provides a slender profile in the skyline. Podium-and-tower typologies are prevalent in Asia and North America.',
    wiki: 'https://en.wikipedia.org/wiki/Podium_(architecture)'
  },
  {
    id: 'portico',
    term: 'Portico',
    cat: 'Space',
    def: 'A covered entrance porch attached to the exterior of a building, consisting of a roof supported by columns. The portico is a defining feature of classical temple architecture and was widely adopted in Neoclassical and Beaux-Arts civic buildings as a grand ceremonial entrance. It provides shelter at the threshold and communicates the building\'s civic or institutional importance.',
    wiki: 'https://en.wikipedia.org/wiki/Portico'
  },
  {
    id: 'postmodernism',
    term: 'Postmodernism',
    cat: 'Style',
    def: 'An architectural movement that emerged in the 1960s and dominated through the 1980s as a reaction to the perceived austerity and dogmatism of Modernism. Postmodern architecture reintroduces historical references, ornament, colour, and irony, often combining stylistic quotations in playful or provocative ways. Key figures include Robert Venturi, Michael Graves, and Philip Johnson.',
    wiki: 'https://en.wikipedia.org/wiki/Postmodern_architecture'
  },
  {
    id: 'precast-concrete',
    term: 'Precast Concrete',
    cat: 'Structure',
    def: 'Structural or decorative concrete elements cast and cured off-site in a controlled factory environment, then transported and assembled on-site. Precast concrete panels, beams, and columns offer greater quality control than in-situ casting, speed up construction, and allow complex surface textures and finishes. The technique is widely used in housing, infrastructure, and large commercial buildings.',
    wiki: 'https://en.wikipedia.org/wiki/Precast_concrete'
  },
  {
    id: 'reinforced-concrete',
    term: 'Reinforced Concrete',
    cat: 'Structure',
    def: 'Concrete with embedded steel bars (rebar) or mesh that gives the composite material the compressive strength of concrete and the tensile strength of steel, enabling the construction of floors, beams, columns, and shells with far greater spanning capability than unreinforced concrete or masonry. Developed in the late 19th century, reinforced concrete transformed modern architecture and engineering, enabling the construction of skyscrapers, bridges, and thin shell structures.',
    wiki: 'https://en.wikipedia.org/wiki/Reinforced_concrete'
  },
  {
    id: 'setback',
    term: 'Setback',
    cat: 'Structure',
    def: 'A zoning or design requirement that establishes the minimum distance a building or its upper storeys must be positioned from a property line, street edge, or neighbouring structure. Setbacks ensure access to daylight, air, and sky exposure in dense urban environments. The tiered, wedding-cake profiles characteristic of pre-war New York skyscrapers resulted from mandatory setback regulations introduced after 1916.',
    wiki: 'https://en.wikipedia.org/wiki/Setback_(architecture)'
  },
  {
    id: 'skyscraper',
    term: 'Skyscraper',
    cat: 'Structure',
    def: 'A tall, continuously occupied building with multiple storeys, typically defined as exceeding 150 metres in height, though the term broadly describes any building that dramatically exceeds the height of its surroundings. The skyscraper typology was pioneered in Chicago and New York in the late 19th century, enabled by the invention of the steel frame, safety elevator, and later the curtain wall. Skyscrapers have become the defining symbols of global commercial cities.',
    wiki: 'https://en.wikipedia.org/wiki/Skyscraper'
  },
  {
    id: 'supertall',
    term: 'Supertall',
    cat: 'Structure',
    def: 'A term used by the Council on Tall Buildings and Urban Habitat (CTBUH) to describe skyscrapers exceeding 300 metres in height. Supertall structures require advanced structural systems — such as outrigger frames and tuned mass dampers — to resist wind loads and building sway. The 21st century has seen a proliferation of supertalls in cities across Asia, the Middle East, and the Americas.',
    wiki: 'https://en.wikipedia.org/wiki/Skyscraper#Supertall_and_megatall'
  },
  {
    id: 'terracotta',
    term: 'Terracotta',
    cat: 'Facade',
    def: 'An unglazed or glazed fired clay product used as a decorative and structural cladding material in architecture. Terracotta was widely used in Victorian and Beaux-Arts buildings for ornamental mouldings, friezes, and facade panels because it could be mass-produced in intricate shapes at relatively low cost. Its rich warm tones and ability to be shaped into complex relief patterns made it a versatile material for facades.',
    wiki: 'https://en.wikipedia.org/wiki/Terra_cotta_in_architecture'
  },
  {
    id: 'urban-design',
    term: 'Urban Design',
    cat: 'Urban',
    def: 'The interdisciplinary field concerned with the design of cities, towns, and neighbourhoods at the scale between architecture and urban planning. Urban design addresses the arrangement and appearance of streets, squares, parks, building frontages, and public infrastructure to create functional, attractive, and cohesive urban environments. It integrates architecture, landscape architecture, and town planning.',
    wiki: 'https://en.wikipedia.org/wiki/Urban_design'
  },
  {
    id: 'vault',
    term: 'Vault',
    cat: 'Structure',
    def: 'An arched structural form used to span a space and support the weight of material above it, created from stone, brick, or concrete. The basic barrel vault — a continuous semicircular arch — was developed in ancient Rome, while the cross vault (formed by two intersecting barrel vaults) and the ribbed vault (with structural ribs directing loads to piers) were central to Gothic cathedral construction. Vaulted ceilings remain a powerful architectural element conveying grandeur and permanence.',
    wiki: 'https://en.wikipedia.org/wiki/Vault_(architecture)'
  },
  {
    id: 'vernacular-architecture',
    term: 'Vernacular Architecture',
    cat: 'Style',
    def: 'Architecture produced without professional architects, using locally available materials and traditional construction techniques suited to the local climate, culture, and topography. Vernacular buildings — from thatched English cottages to Japanese machiya townhouses — embody accumulated practical wisdom and regional identity. The term is contrasted with "academic" or "formal" architecture produced according to prescribed stylistic rules.',
    wiki: 'https://en.wikipedia.org/wiki/Vernacular_architecture'
  }
];

// ══════════════════════════════════════════════════════════════════
// STYLE GLOSSARY
// Click a style tag → overlay with definition, history, key buildings
// ══════════════════════════════════════════════════════════════════

var STYLE_GLOSSARY = {
  'art deco': {
    title: 'Art Deco',
    period: '1920s – 1940s',
    origin: 'Paris, France',
    description: 'A bold, decorative style that celebrated modern industrial society through geometric ornamentation, rich materials, and vertical emphasis. Born at the 1925 Exposition Internationale in Paris, it became the defining aesthetic of Jazz Age prosperity.',
    characteristics: [
      'Geometric and chevron ornamentation',
      'Vertical emphasis with setback massing',
      'Rich materials: chrome, glass, marble, terracotta',
      'Stylized sunburst, ziggurat, and fan motifs',
      'Strong bilateral symmetry',
    ],
    keyArchitects: ['William Van Alen', 'Raymond Hood', 'Shreve, Lamb & Harmon'],
    significance: 'Represented the optimism of industrialization — fell out of fashion after WWII but has seen major revival in preservation and appreciation.',
  },
  'beaux-arts': {
    title: 'Beaux-Arts',
    period: '1880s – 1920s',
    origin: 'Paris, France',
    description: "A grand, classical style developed at the French École des Beaux-Arts, emphasizing monumentality, symmetry, and lavish sculptural ornamentation. Became the dominant style for civic and institutional buildings in America's Gilded Age.",
    characteristics: [
      'Classical columns and pilasters',
      'Rusticated stone bases',
      'Grand stairways and ceremonial facades',
      'Elaborate sculptural decoration',
      'Symmetrical, axial plans',
    ],
    keyArchitects: ['McKim, Mead & White', 'Richard Morris Hunt', 'Carrère and Hastings'],
    significance: "Defined the civic ambitions of the Gilded Age — many of the world's great train stations, libraries, and museums were built in this style.",
  },
  'neoclassical': {
    title: 'Neoclassical',
    period: '1750s – Present',
    origin: 'Europe',
    description: 'A revival of ancient Greek and Roman architectural ideals, emphasizing order, symmetry, and rationality. Emerged as a reaction against Baroque excess, driven by Enlightenment philosophy and archaeological rediscoveries at Pompeii.',
    characteristics: [
      'Greek or Roman columnar orders (Doric, Ionic, Corinthian)',
      'Triangular pediments',
      'Symmetrical facades',
      'Restrained, flat wall surfaces',
      'Monumental civic scale',
    ],
    keyArchitects: ['Robert Adam', 'Claude Nicolas Ledoux', 'John Nash', 'Benjamin Henry Latrobe'],
    significance: 'Became the default language of democracy and civic authority — the US Capitol, the Panthéon in Paris, and countless courthouses follow this tradition.',
  },
  'gothic revival': {
    title: 'Gothic Revival',
    period: '1740s – Early 20th c.',
    origin: 'England',
    description: 'A 19th-century movement that revived medieval Gothic style — pointed arches, ribbed vaults, flying buttresses — driven by Romantic nationalism and religious revival. In America, it defined university campuses and Episcopal churches.',
    characteristics: [
      'Pointed (Gothic) arches',
      'Vertical soaring towers',
      'Tracery windows and stained glass',
      'Flying buttresses',
      'Asymmetrical, picturesque massing',
    ],
    keyArchitects: ['Augustus Pugin', 'John Ruskin', 'James Renwick Jr.', 'Cass Gilbert'],
    significance: "More than a style, it was a moral argument — Pugin and Ruskin believed Gothic was the only honest, Christian architecture. It shaped educational buildings worldwide.",
  },
  'modernist': {
    title: 'Modernist',
    period: '1920s – 1970s',
    origin: 'Europe (Germany, France)',
    description: "An umbrella for early-to-mid 20th century architecture that rejected historical ornament in favor of pure form, honest materials, and functional clarity. Grounded in the Bauhaus, De Stijl, and Le Corbusier's Five Points.",
    characteristics: [
      'Flat roofs and open floor plans',
      '"Form follows function" principle',
      'Structural honesty — exposed concrete, steel, glass',
      'Absence of decorative ornament',
      'International Style uniformity',
    ],
    keyArchitects: ['Le Corbusier', 'Mies van der Rohe', 'Walter Gropius', 'Louis Kahn'],
    significance: 'The most influential architectural movement of the 20th century — its legacy is contested: liberating in theory but often alienating in practice for urban dwellers.',
  },
  'expressionist modernism': {
    title: 'Expressionist Modernism',
    period: '1950s – 1970s',
    origin: 'Europe / USA',
    description: 'A strand of mid-century modernism that embraced sculptural, emotional form over the cool rationalism of the International Style. Associated with Eero Saarinen, Le Corbusier\'s late work, and Hans Scharoun.',
    characteristics: [
      'Sculptural, non-orthogonal forms',
      'Dramatic cantilevers and curves',
      'Exposed concrete (Béton brut)',
      'Bold structural expression',
      'Emotional, poetic spatial quality',
    ],
    keyArchitects: ['Eero Saarinen', 'Le Corbusier (late)', 'Hans Scharoun', 'Paul Rudolph'],
    significance: 'A rebellion against gridded uniformity — buildings like the TWA Terminal and Ronchamp proved architecture could be sculpture at urban scale.',
  },
  'postmodern': {
    title: 'Postmodern',
    period: '1960s – 1990s',
    origin: 'USA / Europe',
    description: "A playful, ironic reaction against Modernism's austerity. Postmodernism reintroduced historical references, color, ornament, and wit — sometimes as pastiche, sometimes as serious cultural commentary. Robert Venturi's 'complexity and contradiction' was its manifesto.",
    characteristics: [
      'Historical references used ironically or decoratively',
      'Exaggerated classical elements at non-classical scale',
      'Bold color and pattern',
      'Flat, applied ornament rather than structural',
      'Pop culture and kitsch influence',
    ],
    keyArchitects: ['Robert Venturi', 'Michael Graves', 'Philip Johnson', 'Charles Moore'],
    significance: "Short-lived but culturally significant — its critique of Modernism's failures was largely correct, even if its own solutions were aesthetically contentious.",
  },
  'contemporary': {
    title: 'Contemporary',
    period: '1990s – Present',
    origin: 'Global',
    description: 'A broad category encompassing current architecture that defies a single style. Contemporary buildings may be minimalist, parametric, sustainable, or culturally contextual — united by digital tools and global material culture rather than a shared aesthetic ideology.',
    characteristics: [
      'Digital design methods (BIM, parametric modeling)',
      'High-performance glazing and curtain walls',
      'Sustainability and green certification focus',
      'Contextual or placemaking sensibility',
      'Hybrid typologies (mixed-use programs)',
    ],
    keyArchitects: ['Zaha Hadid', 'Bjarke Ingels', 'Kengo Kuma', 'Renzo Piano'],
    significance: 'Contemporary architecture grapples with climate change, cultural identity, and digital fabrication — its legacy is still being written.',
  },
  'adaptive reuse': {
    title: 'Adaptive Reuse',
    period: '1970s – Present',
    origin: 'Global',
    description: 'The practice of repurposing existing buildings for new uses — converting factories into lofts, warehouses into galleries, power stations into museums. Driven by sustainability, economics, and growing appreciation for industrial heritage.',
    characteristics: [
      'Preserved industrial or historical structure',
      'New program inserted into old envelope',
      'Contrast between old and new materials',
      'Minimal intervention philosophy',
      'Often mixed-use to ensure viability',
    ],
    keyArchitects: ['Herzog & de Meuron', 'David Chipperfield', 'Annabelle Selldorf'],
    significance: 'The greenest building is the one already standing — adaptive reuse dramatically reduces embodied carbon compared to demolition and new construction.',
  },
  'landscape': {
    title: 'Landscape Architecture',
    period: '1850s – Present',
    origin: 'USA / Europe',
    description: 'The design of outdoor spaces, from urban parks to regional greenways. Frederick Law Olmsted established the profession in America with Central Park; today landscape architects shape everything from rooftop gardens to ecological restoration projects.',
    characteristics: [
      'Integration of natural and built systems',
      'Ecological and hydrological design',
      'Seasonal change as a design element',
      'Pedestrian experience and circulation',
      'Community programming and public space',
    ],
    keyArchitects: ['Frederick Law Olmsted', 'Calvert Vaux', 'Lawrence Halprin', 'Kathryn Gustafson'],
    significance: "Parks are infrastructure — Olmsted argued that green space was essential to mental health and social cohesion in industrial cities, a thesis borne out by a century of research.",
  },
  'high-tech': {
    title: 'High-Tech / Structural Expressionism',
    period: '1970s – 1990s',
    origin: 'UK',
    description: 'A movement that celebrated engineering and industrial technology as beauty. Structural systems, mechanical services, and circulation are expressed — even celebrated — on the exterior. The Centre Pompidou turned a building inside out.',
    characteristics: [
      'Exposed structure (steel, tension cables)',
      'External mechanical services (ducts, pipes)',
      'Flexible, open floor plans',
      'Industrial materials and prefabrication',
      'Transparency and lightness',
    ],
    keyArchitects: ['Norman Foster', 'Richard Rogers', 'Renzo Piano', 'Nicholas Grimshaw'],
    significance: 'High-Tech democratized the machine aesthetic — it also solved real problems of flexibility and transparency in an era of rapidly changing office work.',
  },
  'parametric design': {
    title: 'Parametric Design',
    period: '2000s – Present',
    origin: 'Global (digital era)',
    description: 'Architecture generated through computational algorithms and parametric modeling, where form emerges from rule-based systems responding to structural, environmental, or aesthetic parameters. Enabled by Grasshopper, Rhino, and digital fabrication.',
    characteristics: [
      'Non-standard, algorithmically generated forms',
      'Complex surface tessellations and patterns',
      'Structural optimization through form-finding',
      'Digital fabrication (CNC, robotic assembly)',
      'Often undulating or fractal-like appearance',
    ],
    keyArchitects: ['Zaha Hadid', 'Patrik Schumacher', 'UNStudio', 'Toyo Ito'],
    significance: 'Parametric design broke the tyranny of the right angle — critics argue it produces spectacular forms without sufficient attention to human experience and urban context.',
  },
  'traditional korean': {
    title: 'Traditional Korean (Hanok)',
    period: 'Goryeo era (918 CE) – Present',
    origin: 'Korea',
    description: 'A vernacular building tradition characterized by curved tiled roofs, wooden post-and-beam structure with gongpo bracket systems, natural stone foundations, and the ondol underfloor heating system. Hanok is deeply attuned to Korean climate and cosmology.',
    characteristics: [
      'Curved, upswept tile roofs with dancheong coloring',
      'Wooden column-and-beam construction with bracket systems',
      'Ondol (underfloor radiant heating)',
      'Courtyard typology (madang)',
      'Site orientation by bae-san-im-su (mountain-water) principle',
    ],
    keyArchitects: ['Anonymous master craftsmen (도편수)', 'Seung H-Sang (contemporary)'],
    significance: 'Hanok represents a sophisticated, climate-responsive architecture developed over centuries — contemporary architects are reinterpreting it to express modern Korean identity.',
  },
};

// ── Open Style Glossary Overlay ───────────────────────────────────
function openStyleGlossary(styleName) {
  var existing = document.getElementById('style-gloss-overlay');
  if (existing) existing.parentNode.removeChild(existing);

  var key = styleName.toLowerCase().trim();
  var info = STYLE_GLOSSARY[key];

  // Build list of buildings in current data with this style
  var styleBuildings = (typeof LOCS !== 'undefined' ? LOCS : []).filter(function(l) {
    return (l.styleGroups || []).some(function(s) { return s.toLowerCase() === key; });
  }).sort(function(a, b) { return (a.yr || 9999) - (b.yr || 9999); });

  var buildingsHtml = styleBuildings.map(function(w) {
    var catMeta = (typeof _ccMeta === 'function') ? _ccMeta(w) : null;
    var iconHtml = catMeta
      ? '<div class="sg-thumb" style="background:' + catMeta.bg + '"><img src="' + catMeta.icon + '"></div>'
      : '<div class="sg-thumb"></div>';
    return '<div class="sg-bld-item" onclick="openLocById(\'' + w.id + '\');closeStyleGlossary()">'
      + iconHtml
      + '<div class="sg-bld-body">'
        + '<div class="sg-bld-name">' + w.name + '</div>'
        + '<div class="sg-bld-meta">' + (w.yr || '—') + (w.arch ? ' · ' + w.arch : '') + '</div>'
      + '</div></div>';
  }).join('');

  if (!buildingsHtml) {
    buildingsHtml = '<div class="sg-empty">No buildings found in current city.</div>';
  }

  var definitionHtml = info
    ? '<div class="sg-period">' + info.period + ' &nbsp;·&nbsp; ' + info.origin + '</div>'
      + '<p class="sg-desc">' + info.description + '</p>'
      + '<div class="sg-section">Key Characteristics</div>'
      + '<ul class="sg-chars">' + info.characteristics.map(function(c) { return '<li>' + c + '</li>'; }).join('') + '</ul>'
      + '<div class="sg-section">Associated Architects</div>'
      + '<div class="sg-archs">' + info.keyArchitects.map(function(a) { return '<span class="sg-arch-chip">' + a + '</span>'; }).join('') + '</div>'
      + '<div class="sg-section">Historical Significance</div>'
      + '<p class="sg-sig">' + info.significance + '</p>'
    : '<p class="sg-desc" style="color:var(--text-secondary)">'
      + 'No definition available for this style yet.'
      + '</p>';

  var overlay = document.createElement('div');
  overlay.id = 'style-gloss-overlay';
  overlay.className = 'style-gloss-overlay';
  overlay.innerHTML =
    '<div class="style-gloss-panel">'
      + '<div class="sg-hdr">'
        + '<button class="sg-back-btn" onclick="closeStyleGlossary()">◀</button>'
        + '<div class="sg-hdr-text">'
          + '<div class="sg-title">' + (info ? info.title : styleName) + '</div>'
          + '<div class="sg-subtitle">Architectural Style</div>'
        + '</div>'
      + '</div>'
      + '<div class="sg-body">'
        + '<div class="sg-def-section">' + definitionHtml + '</div>'
        + '<div class="sg-divider"></div>'
        + '<div class="sg-bld-section">'
          + '<div class="sg-section sg-bld-header">'
            + 'Buildings in this style'
            + '<span class="sg-bld-count">' + styleBuildings.length + '</span>'
          + '</div>'
          + '<div class="sg-bld-list">' + buildingsHtml + '</div>'
        + '</div>'
      + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() { overlay.classList.add('visible'); });
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeStyleGlossary();
  });
}

function closeStyleGlossary() {
  var el = document.getElementById('style-gloss-overlay');
  if (!el) return;
  el.classList.remove('visible');
  setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
}

/* ================================================================
   ARCHITECTURAL GLOSSARY PANEL
   Uses GLOSSARY array from data-glossary.js
   ================================================================ */

var _glossOpen    = false;
var _glossCurTerm = null;

var BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/* ── Open / Close ──────────────────────────────────────────── */

function openGlossary() {
  if (_glossOpen) { closeGlossary(); return; }
  _glossOpen = true;

  var overlay = document.getElementById('gloss-overlay');
  var panel   = document.getElementById('gloss-panel');
  if (overlay) overlay.style.display = 'block';
  if (panel)   panel.style.display   = 'flex';

  var btn = document.getElementById('sba-gloss');
  if (btn) btn.classList.add('active');

  showGlossaryList();
}

function closeGlossary() {
  _glossOpen    = false;
  _glossCurTerm = null;

  var overlay = document.getElementById('gloss-overlay');
  var panel   = document.getElementById('gloss-panel');
  if (overlay) overlay.style.display = 'none';
  if (panel)   panel.style.display   = 'none';

  var btn = document.getElementById('sba-gloss');
  if (btn) btn.classList.remove('active');
}

/* ── List View ──────────────────────────────────────────────── */

function showGlossaryList() {
  _glossCurTerm = null;

  // Reset header
  var backBtn  = document.getElementById('gloss-back-btn');
  var hdrTitle = document.getElementById('gloss-hdr-title');
  if (backBtn)  backBtn.style.display  = 'none';
  if (hdrTitle) hdrTitle.textContent   = 'Glossary';

  // Show A-Z bar
  var azBar = document.getElementById('gloss-az-bar');
  if (azBar) azBar.style.display = '';

  if (typeof GLOSSARY === 'undefined' || !GLOSSARY.length) {
    var body = document.getElementById('gloss-body');
    if (body) body.innerHTML = '<p style="padding:20px;color:#aaa;font-size:13px">No glossary data loaded.</p>';
    return;
  }

  // Sort terms A-Z
  var sorted = GLOSSARY.slice().sort(function(a, b) {
    return a.term.localeCompare(b.term);
  });

  // Build set of letters present
  var letters = [];
  var seen    = {};
  sorted.forEach(function(t) {
    var l = t.term[0].toUpperCase();
    if (!seen[l]) { seen[l] = true; letters.push(l); }
  });

  // A-Z bar
  if (azBar) {
    azBar.innerHTML = letters.map(function(l) {
      return '<button class="gloss-az-btn" onclick="_glossScrollLetter(\'' + l + '\')">' + l + '</button>';
    }).join('');
  }

  // Build body HTML
  var html      = '';
  var curLetter = null;
  sorted.forEach(function(t) {
    var l = t.term[0].toUpperCase();
    if (l !== curLetter) {
      curLetter = l;
      html += '<div class="gloss-letter-hdr" id="gloss-letter-' + l + '">' + l + '</div>';
    }
    html += '<button class="gloss-term-row" onclick="openGlossaryTerm(\'' + t.id + '\')">'
          +   '<span class="gloss-term-name">' + _escHtml(t.term) + '</span>'
          +   '<span class="gloss-cat-badge ' + _glossCatClass(t.cat) + '">' + _escHtml(t.cat) + '</span>'
          + '</button>';
  });

  var body = document.getElementById('gloss-body');
  if (body) body.innerHTML = html;
}

function _glossScrollLetter(letter) {
  var el = document.getElementById('gloss-letter-' + letter);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── Term Detail View ───────────────────────────────────────── */

function openGlossaryTerm(termId) {
  // Open panel first if not already open
  if (!_glossOpen) {
    openGlossary();
  }

  if (typeof GLOSSARY === 'undefined') return;
  var t = GLOSSARY.find(function(g) { return g.id === termId; });
  if (!t) return;

  _glossCurTerm = termId;

  // Update header
  var backBtn  = document.getElementById('gloss-back-btn');
  var hdrTitle = document.getElementById('gloss-hdr-title');
  if (backBtn)  backBtn.style.display  = 'flex';
  if (hdrTitle) hdrTitle.textContent   = t.term;

  // Hide A-Z bar in detail view
  var azBar = document.getElementById('gloss-az-bar');
  if (azBar) azBar.style.display = 'none';

  // Related locations
  var relLocs = _getRelatedLocs(t);

  // Build detail HTML
  var wikiBtn = t.wiki
    ? '<a href="' + t.wiki + '" target="_blank" class="gloss-wiki-btn">Wikipedia →</a>'
    : '';

  var relHtml = '';
  if (relLocs.length) {
    relHtml = '<div class="gloss-rel-hdr">Related Locations<span class="gloss-rel-count">(' + relLocs.length + ')</span></div>'
            + '<div class="gloss-loc-grid">'
            + relLocs.map(function(loc) { return _glossLocCard(loc); }).join('')
            + '</div>';
  } else {
    relHtml = '<div class="gloss-rel-hdr">Related Locations</div>'
            + '<div class="gloss-loc-empty">No locations found for this term.</div>';
  }

  var html = '<div class="gloss-term-detail">'
           +   '<div class="gloss-detail-cat">'
           +     '<span class="gloss-cat-badge ' + _glossCatClass(t.cat) + '">' + _escHtml(t.cat) + '</span>'
           +   '</div>'
           +   '<p class="gloss-detail-def">' + _escHtml(t.def) + '</p>'
           +   wikiBtn
           +   relHtml
           + '</div>';

  var body = document.getElementById('gloss-body');
  if (body) {
    body.innerHTML = html;
    body.scrollTop = 0;
  }
}

/* ── Navigate to location from glossary ────────────────────── */

function _glossNavLoc(locId) {
  closeGlossary();
  if (typeof LOCS === 'undefined') return;
  var loc = LOCS.find(function(l) { return l.id === locId; });
  if (!loc) return;

  var cityCode = null;
  if (typeof CITY_META !== 'undefined') {
    cityCode = Object.keys(CITY_META).find(function(k) {
      return CITY_META[k].key === loc.city;
    });
  }

  if (cityCode && typeof selectCity === 'function') {
    selectCity(cityCode);
  }

  setTimeout(function() {
    if (typeof openLoc === 'function') openLoc(loc);
  }, cityCode ? 1400 : 0);
}

/* ── Related Locations ──────────────────────────────────────── */

function _getRelatedLocs(term) {
  if (typeof LOCS === 'undefined' || !LOCS.length) return [];

  // Build regex: allow any whitespace/hyphen between words for multi-word terms
  var escaped = term.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  // Allow whitespace or hyphens between words
  escaped = escaped.replace(/\\ /g, '[\\s\\-]+');
  var rx;
  try {
    rx = new RegExp(escaped, 'i');
  } catch(e) {
    return [];
  }

  var results = [];
  for (var i = 0; i < LOCS.length; i++) {
    var loc = LOCS[i];
    var desc = (loc.desc || '');
    if (rx.test(desc)) {
      results.push(loc);
      if (results.length >= 30) break;
    }
  }
  return results;
}

/* ── Location card HTML ─────────────────────────────────────── */

function _glossLocCard(loc) {
  var photo = (loc.photos && loc.photos.length) ? loc.photos[0] : BLANK_GIF;
  var cityLabel = '';
  if (typeof CITY_META !== 'undefined') {
    var cityKey = Object.keys(CITY_META).find(function(k) {
      return CITY_META[k].key === loc.city;
    });
    if (cityKey) cityLabel = CITY_META[cityKey].label;
  }
  var arch = loc.arch || (loc.archs && loc.archs[0]) || '';
  var meta = [cityLabel, arch].filter(Boolean).join(' · ');

  return '<button class="gloss-loc-card" onclick="_glossNavLoc(\'' + _escAttr(loc.id) + '\')">'
       +   '<img class="gloss-loc-thumb" src="' + _escAttr(photo) + '" alt=""'
       +     ' onerror="this.onerror=null;this.src=\'' + BLANK_GIF + '\';this.style.background=\'#e8e8e4\'">'
       +   '<div class="gloss-loc-info">'
       +     '<div class="gloss-loc-name">' + _escHtml(loc.name) + '</div>'
       +     (meta ? '<div class="gloss-loc-meta">' + _escHtml(meta) + '</div>' : '')
       +   '</div>'
       + '</button>';
}

/* ── Linkify glossary terms in description ──────────────────── */

function linkGlossaryTerms(text) {
  if (typeof GLOSSARY === 'undefined' || !GLOSSARY.length) return text;
  if (!text || typeof text !== 'string') return text;

  // Skip if the text already contains HTML tags (except entities)
  if (/<[a-zA-Z]/.test(text)) return text;

  // Sort by term length descending to avoid partial matches
  var sorted = GLOSSARY.slice().sort(function(a, b) {
    return b.term.length - a.term.length;
  });

  var result  = text;
  var linked  = 0;
  var MAX_LINKS = 8;

  for (var i = 0; i < sorted.length; i++) {
    if (linked >= MAX_LINKS) break;
    var t = sorted[i];

    // Build word-boundary-aware regex
    // Multi-word: allow any whitespace between words
    var escaped = t.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    escaped = escaped.replace(/\\ /g, '[\\s]+');

    // Use lookaround to avoid partial-word matches
    var rxStr = '(?<![a-zA-Z])(' + escaped + ')(?![a-zA-Z])';
    var rx;
    try {
      rx = new RegExp(rxStr, 'gi');
    } catch(e) {
      continue;
    }

    // Check if already linked for this term
    var alreadyLinked = result.indexOf('openGlossaryTerm(\'' + t.id + '\')') !== -1;
    if (alreadyLinked) continue;

    var count = 0;
    result = result.replace(rx, function(match, p1) {
      if (count > 0) return match; // only first occurrence per term
      count++;
      linked++;
      return '<span class="gloss-term-link" onclick="openGlossaryTerm(\'' + t.id + '\')">' + p1 + '</span>';
    });
  }

  return result;
}

/* ── Utilities ───────────────────────────────────────────────── */

function _glossCatClass(cat) {
  var map = {
    'Style':          'gloss-cat-style',
    'Structure':      'gloss-cat-structure',
    'Facade':         'gloss-cat-facade',
    'Space':          'gloss-cat-space',
    'Sustainability': 'gloss-cat-sustainability',
    'Urban':          'gloss-cat-urban'
  };
  return map[cat] || 'gloss-cat-style';
}

function _escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function _escAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
