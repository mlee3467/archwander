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
  var isKo = typeof LANG !== 'undefined' && LANG === 'ko';

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
    buildingsHtml = '<div class="sg-empty">' + (isKo ? '이 스타일의 건물이 아직 없습니다' : 'No buildings found in current city.') + '</div>';
  }

  var definitionHtml = info
    ? '<div class="sg-period">' + info.period + ' &nbsp;·&nbsp; ' + info.origin + '</div>'
      + '<p class="sg-desc">' + info.description + '</p>'
      + '<div class="sg-section">' + (isKo ? '주요 특징' : 'Key Characteristics') + '</div>'
      + '<ul class="sg-chars">' + info.characteristics.map(function(c) { return '<li>' + c + '</li>'; }).join('') + '</ul>'
      + '<div class="sg-section">' + (isKo ? '대표 건축가' : 'Associated Architects') + '</div>'
      + '<div class="sg-archs">' + info.keyArchitects.map(function(a) { return '<span class="sg-arch-chip">' + a + '</span>'; }).join('') + '</div>'
      + '<div class="sg-section">' + (isKo ? '역사적 의의' : 'Historical Significance') + '</div>'
      + '<p class="sg-sig">' + info.significance + '</p>'
    : '<p class="sg-desc" style="color:var(--text-secondary)">'
      + (isKo ? '이 스타일에 대한 설명이 준비되지 않았습니다.' : 'No definition available for this style yet.')
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
          + '<div class="sg-subtitle">' + (isKo ? '건축 양식 사전' : 'Architectural Style') + '</div>'
        + '</div>'
      + '</div>'
      + '<div class="sg-body">'
        + '<div class="sg-def-section">' + definitionHtml + '</div>'
        + '<div class="sg-divider"></div>'
        + '<div class="sg-bld-section">'
          + '<div class="sg-section sg-bld-header">'
            + (isKo ? '이 스타일의 건물' : 'Buildings in this style')
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
