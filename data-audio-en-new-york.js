/* ============================================================
   ArchWander — Audio Guide Scripts · English · New York City
   ============================================================
   Structure:
     AUDIO_EN_NYC['location-id'] = {
       title:    display title for the player header,
       script:   full audio guide text (400–480 words, TTS-optimized)
     }

   Loading: this file is loaded lazily — only when the user
   opens the Audio Guide tab while viewing a New York location.
   It is NOT included in the initial page bundle.

   To add a new location:
     1. Add an entry below with the exact location id from data-new-york.js
     2. git add data-audio-en-new-york.js && git commit && git push
   ============================================================ */

// window.AUDIO_EN_NYC — must be on window so dynamic <script> injection
// can detect it via window[varName]. Using const/let would be block-scoped
// inside the script and NOT accessible on window after load.
window.AUDIO_EN_NYC = {

  'nyc-0001': {
    title: 'Empire State Building',
    script: `You are standing before the Empire State Building — a structure whose every dimension was a calculated act of ambition.

The building rests on 210 foundation columns driven into Manhattan's granite bedrock, carrying a total load of 365,000 tons. The steel skeleton comprises 57,000 tons of structural steel, assembled at an astonishing pace: 22 stories in 22 working days at the construction peak, with more than 3,400 workers on site daily. The Mohawk ironworkers from Kahnawake, Quebec — famed for their ease at dizzying heights — drove rivets into a frame that rose four and a half floors per week.

Architects Shreve, Lamb and Harmon clad this frame in 200,000 cubic feet of Indiana limestone, quarried from the soft, cream-colored beds of south-central Indiana that had supplied America's grandest buildings for a generation. Below street level, black Swedish granite lines the base of the storefronts. The aluminum spandrels between windows carry rippled, fanlike Art Deco reliefs — sunburst motifs interpreted as anthemions, the ancient Greek ornamental form of the honeysuckle flower — pressed from the same 730 tons of aluminum and stainless steel used throughout the building's trim.

The setback geometry you see — the tower stepping back in four distinct tiers as it rises — was not purely aesthetic. New York's 1916 Zoning Resolution mandated such setbacks to preserve light on the streets below. Architect William Lamb conceived the form from the top down, working backward from the building's needle profile to its broad base, giving each setback a purpose proportioned to the floor plates behind it.

The crown tells a stranger story. The uppermost 222 feet were designed as a mooring mast for transatlantic dirigibles. Passengers would theoretically dock and descend by gangplank to a mooring floor inside the spire. The great Zeppelin commander Hugo Eckener declared it impractical; only a handful of ships ever came close, and one docked for three minutes in September 1931. Today, the spire broadcasts television signals across the tri-state area.

Step inside the lobby, and the ambition turns intimate. Floors and lower walls are clad in Tennessee marble, bookmatched — meaning paired slabs from the same quarry block are mirrored against each other, so the grain flows in symmetrical waves. The ceiling, restored to its original splendor, is laid in 23-karat gold leaf, depicting stars, sunbursts, and interlocking gears — a celestial machine worthy of the most optimistic decade America ever built.

The 86th-floor observation deck offers 360 degrees of the city on a clear day. But first, linger in this lobby, and understand that the architects considered it the building's true threshold — not merely a passage, but a statement about what steel, stone, and human determination could accomplish together.`
  },

  'nyc-0002': {
    title: 'Chrysler Building',
    script: `You are looking at a building designed by an architect who understood that the sky itself could be used as a material.

The Chrysler Building was completed in 1930 for automobile magnate Walter Chrysler, designed by William Van Alen — who trained in Paris under the great Beaux-Arts master Victor Laloux and returned to New York determined to build something unlike anything the city had seen. He succeeded beyond even his own calculations.

The crown is the first thing to understand. It is clad entirely in Nirosta — a proprietary brand of eighteen-eight stainless steel, eighteen percent chromium and eight percent nickel — the first architectural use of this alloy in the United States. Because the dome is curved and tapered, every individual Nirosta sheet had to be measured and cut on-site, with most of the fabrication carried out in improvised workshops on the sixty-seventh and seventy-fifth floors. The result is a cruciform groin vault of seven concentric setback tiers, ribbed and riveted in a radiating sunburst pattern with triangular vaulted windows. Van Alen described his intent precisely: the stainless steel would allow the building to "literally dissolve into the sky." On a clear day, it does exactly that.

The sculptural program below the crown is a direct conversation with the automobile age. At the thirty-first floor, stainless steel replicas of the 1929 Chrysler Plymouth radiator cap project from the building's corners — architectural ornament drawn directly from the factory floor. At the sixty-first floor, massive eagle heads — modeled on Plymouth hood ornaments — jut from the corners, their beaks open, as if launching into flight. These are not decorative additions; they are the building's argument that the machine age deserved its own ornamental language.

Inside the lobby — open to the public — the walls are clad in red Moroccan marble with accents of onyx and blue marble. The elevator doors are among the finest examples of Art Deco inlay work anywhere: brass frameworks filled with rare African wood veneers cut in abstract lotus-flower patterns. Above, Edward Trumbull's ceiling mural — at completion the largest ceiling painting in the world, spanning 78 by 100 feet — depicts ocean liners, early aircraft, the Chrysler assembly line, and the building itself rising above its workers.

Van Alen's secret weapon was the 185-foot steel "Vertex" spire, assembled inside the fire shaft while his rival at 40 Wall Street celebrated victory. Raised through the dome in 90 minutes, it instantly added 185 feet to the building's height. The architectural world, briefly, was speechless. Few buildings since have managed to be so thoroughly theatrical and so thoroughly beautiful at the same time.`
  },

  'nyc-0007': {
    title: 'Solomon R. Guggenheim Museum',
    script: `Frank Lloyd Wright received this commission in 1943, spent sixteen years revising the design through 700 drawings and 6 different versions, died six months before the building opened in 1959, and never saw the work finished. What he left behind is one of the most debated buildings of the twentieth century.

The concept begins with a rejection. Wright believed the conventional museum — a sequence of rectangular rooms lined with paintings — fragmented experience and exhausted the visitor. His alternative was a single continuous space: a spiral ramp 1,416 feet long, ascending five stories at a five percent slope, widening as it climbs from 25 feet at the base to 32 feet at the top. Visitors take an elevator to the uppermost level and descend gradually, artworks arrayed along the outer wall, the full depth of the rotunda always visible on the inner side.

The structure is reinforced concrete — traditional poured-in-place concrete strengthened with steel rebar — but the geometry it was asked to form was anything but traditional. The curving walls are five inches thick, with concrete ribs running along the gallery walls both for structural reinforcement and to articulate the ramp into readable sections. The formwork — the temporary molds into which the wet concrete was poured — required elaborate plywood shaping for each curved surface. Every wall in this building is a custom piece.

Crowning the rotunda is the Lawson-Johnston family oculus, a domed skylight approximately 95 feet in diameter, aligned with the full width of the interior atrium. Natural light descends through the entire height of the spiral, changing with the weather and hour, giving the space a quality no artificial lighting system could replicate.

Wright called this approach "organic architecture" — the idea that a building should arise from its purpose and site the way a living organism arises from its environment. The nautilus shell was his touchstone: a form of continuous growth, each chamber flowing from the last, structure and geometry unified. The result is a building that makes you intensely aware of your own movement through space in a way that few museums anywhere achieve.

The institution's critics have never quieted. When the Guggenheim opened, the New York Times wrote that it was "a war between architecture and painting in which both come out badly wounded." Artists protested that the tilting walls and constant curvature made their work impossible to view correctly. But when you stand at the base of the rotunda and look up through the full height of the spiral — light falling from the oculus, the ramp unwinding above you, other visitors suspended in space above and below — the argument of the building becomes immediate and undeniable. It is one of the most powerful interior spaces in American architecture.`
  },

  'nyc-0017': {
    title: 'Seagram Building',
    script: `To understand why the Seagram Building matters, you need to understand what it chose not to do.

Completed in 1958, designed by Ludwig Mies van der Rohe with Philip Johnson for the distillery heir Samuel Bronfman, this 38-story tower occupies only a fraction of the Park Avenue block it could have filled. Mies pulled the building back 100 feet from the street, creating a granite plaza — 90 by 150 feet — with two shallow reflecting pools. In a city where every square foot of ground carries commercial value, this was an act of extraordinary restraint, and Bronfman sacrificed an estimated one million square feet of rentable floor area to make it.

The tower itself is the first office building in the world to use extruded bronze as a facade material. Look at the vertical elements running up the glass skin. Those bronze I-beams are not structural. The actual steel columns are set inside the glass curtain wall, hidden from view. What you see are purely expressive elements — shapes that tell the truth about the building's structural logic without literally being that structure. Mies was making an argument: that architecture is not merely engineering, but the elevation of construction into something with proportion, rhythm, and moral clarity. He studied the Seagram facade's proportional relationship between the bronze mullions and the glass panels for years before settling on the final dimensions.

The glazing system is equally precise. Seagram was the first New York skyscraper to use full-height plate glass windows, and Mies specified amber-tinted glass throughout — a choice that gives the tower its warm, glowing quality at dusk, when the interior lighting and the setting sun combine to make the bronze and glass seem to breathe.

Inside, the lobby is a masterpiece of material selection. Floors, walls, and columns are clad in travertine — the warm, porous Italian limestone used by the ancient Romans. The ceiling, 24 feet high, is finished in black cement and gray glass mosaic tile, one inch square. Every door handle, every threshold, every detail was designed by Mies himself.

The plaza Mies created was so admired that New York City codified it into law. The 1961 Zoning Resolution offered additional building height to any developer who created a comparable public open space. Within a decade, twenty acres of plazas appeared across Manhattan, all tracing their existence back to this single decision on Park Avenue.

Stand here long enough and you begin to feel it: that specific quality of calm amid the noise of the city. Mies described his ambition as "less is more." Standing in this plaza, you understand it is not a reduction. It is a concentration.`
  },

  'nyc-0004': {
    title: 'Flatiron Building',
    script: `The Flatiron Building stands at one of the most accident-prone intersections in Manhattan's history — where Broadway crosses Fifth Avenue at 23rd Street at an acute angle, creating a triangular block with a northern tip just 6.5 feet wide. Daniel Burnham, the Chicago architect who had defined the American skyscraper in the previous decade, took the commission in 1901 and built something the city had never encountered.

The structural system is the Chicago skeleton frame — a complete steel cage, all parts pre-cut off-site to precise dimensions and bolted together on site, with the walls serving no load-bearing function whatsoever. At one floor per week, the frame rose 22 stories to 307 feet, one of the tallest buildings in Manhattan at the time of its completion in 1902. The steel is dressed in limestone at the base and, as the building rises, in glazed terra-cotta produced by the Atlantic Terra Cotta Company in Tottenville, Staten Island — then one of the finest architectural ceramics manufacturers in America.

The terra-cotta cladding carries three distinct ornamental motifs across the facade: fleur-de-lis in the lower registers, gargoyle heads at the transitional zones, and eagle reliefs near the crown — a decorative program drawn from French and Italian Renaissance sources, applied with the precision of a Beaux-Arts trained office. Burnham's firm had designed the World's Columbian Exposition of 1893 in Chicago, which reset American architecture's aesthetic compass toward classical grandeur, and the Flatiron carries that gravity without heaviness.

The building became a sensation almost immediately, though not for architectural reasons. The triangular form created powerful wind tunnels that funneled gusts up Fifth Avenue, lifting women's skirts at the intersection. Police were posted to chase away men who gathered — giving rise to the phrase "23 Skidoo," a period slang for being expelled. The structural engineers had been right: the building did not topple. The wind went elsewhere.

Alfred Stieglitz photographed the building from Madison Square Park in 1902 and 1903, capturing it in falling snow. He described the experience of watching it approach him as "moving toward me like the bow of a monster ocean steamer — a picture of the new America which was in the making." His photographs, published in Camera Work, established the building as a subject worthy of serious artistic attention and helped transform architectural photography into a legitimate art form.

Stand now at the northern tip, where the building narrows to its point. Then walk back across the park to where Stieglitz stood. From here the building reads as a ship's prow, cutting through the grid of the city, still moving.`
  },

  'nyc-0009': {
    title: 'The High Line',
    script: `What you are walking on was built in 1934 as part of the West Side Improvement Project — New York City's solution to "Death Avenue," the nickname for the freight rail lines that ran at street level through Manhattan's Meatpacking and Chelsea districts and had killed more than 500 pedestrians by 1910.

The solution was elevation. A steel and concrete viaduct, 14 feet above street level and spanning 1.45 miles, was threaded through and sometimes directly through the lower floors of the manufacturing buildings it served. The structure was designed for the full weight of loaded freight trains — many times the load of any park — which made it structurally ideal for conversion decades later. The last freight train ran in 1980, carrying frozen turkeys. For the next two decades, the structure stood vacant, slowly colonized by self-seeded grasses, sumac, and aster that took hold in the gravel ballast. This unintended ecology became the design concept for everything that followed.

In 2009, landscape architect James Corner of Field Operations, working with architects Diller Scofidio and Renfro, opened the first phase of the park. Their governing philosophy was "honoring found conditions": rather than erasing the industrial past, they embedded the original railroad tracks into the walking surface so visitors walk directly on them, integrated the original steel structural members into the park furniture and guardrails, and made the wild, spontaneous quality of the abandoned years the aesthetic template for the designed landscape.

The planting was designed by Dutch landscape designer Piet Oudolf, who brings the same ecological philosophy to all his major works. Oudolf typically employs a 70-to-30 ratio of taller structural plants — grasses, native perennials, shrubs — to lower-growing ground-plane fillers, closely spaced to create a meadow density that suppresses weeds and reads as a complete living system. He selects for four-season interest: plants are chosen not only for their flowering moment but for their structural quality in winter, when dried stalks and seed heads are left standing to feed birds and provide visual texture against the city grid behind them.

Specific zones reward close attention. The Chelsea Thicket winds through a miniature forest of dogwoods, hollies, and bottlebrush buckeye. The Spur — the final segment, opened in 2019 — expands to the park's largest open space, with balconies cantilevering outward at 120 degrees, angled to direct your eye upward into the surrounding towers. Beneath your feet at several points, steel grating reveals the street below, keeping the threshold between park and city legible and alive.

What the designers understood is that the best urban park does not replace the city. It reframes it — giving you the same streets and buildings from a perspective that is slightly above, slightly apart, and completely unlike anything you can find at grade.`
  },

  'nyc-0003': {
    title: 'One World Trade Center',
    script: `Every dimension of this building carries a number that means something.

One World Trade Center rises to 1,776 feet — the year of American independence, chosen deliberately. The antenna mast, designed collaboratively by Skidmore, Owings and Merrill with artist Kenneth Snelson and secured by a cable tensegrity system, terminates precisely at that symbolic height. The building is the tallest in the Western Hemisphere, but its designers understood that height alone was insufficient. What this site required was geometry that communicated intention.

The structural logic begins at the base. A 185-foot concrete podium — windowless, clad in 4,000 vertical prismatic glass fins — houses mechanical systems and serves as the building's security buffer, set back 70 feet from the surrounding streets to separate the structure from vehicular approaches. The concrete used in the core reached 14,000 pounds per square inch compressive strength, the strongest concrete used in New York City at the time of construction. This ultra-high-strength core, which houses elevators and stairwells — including one reserved exclusively for first responders — acts as the primary spine for both gravity loads and lateral resistance against wind and seismic forces.

Above the podium, the tower's geometry performs a precise transformation. The base is a square, 200 feet on each side, aligned exactly with the Manhattan street grid. As the tower rises, the corners of that square are chamfered back at 45 degrees, creating eight elongated isosceles triangles that produce an octagonal cross-section at mid-height. The building then tapers toward the roof, where the stainless steel mast continues the line. From different angles across the city, the tower reads as faceted, almost crystalline; from others, nearly cylindrical. The designers at SOM called this deliberate ambiguity an "optical variability" — a building that refuses a single fixed silhouette.

Below the tower, at the level of the original street grid, the Memorial pools designed by Michael Arad occupy the exact footprints of the North and South Towers. Each void measures 192 feet square, set 30 feet below the plaza surface. Water sheets continuously down all four sides into the pools, then descends again through a central opening to a lower chamber you cannot see or reach. The concept, which Arad titled "Reflecting Absence," translates grief into physical form: a surface that cannot hold water, a center that cannot be filled. The 2,983 names of those killed — in the attacks of September 11, 2001 and February 26, 1993 — are inscribed in bronze panels around the pool edges, grouped so that friends and colleagues rest beside each other in death as they were in life.

Stand at the edge of a pool and look down. The architecture asks no more of you than that.`
  },

  'nyc-0016': {
    title: '30 Rockefeller Plaza',
    script: `In 1929, John D. Rockefeller Jr. signed a lease on 12 acres of midtown Manhattan to build a new home for the Metropolitan Opera. Within months, the stock market collapsed, the Met withdrew, and Rockefeller was left holding one of the most expensive leases in American real estate — in the worst economy in the nation's history. Rather than surrender it, he commissioned architect Raymond Hood to design something the city had never built: a complete urban district, self-financing, self-contained, and built through the Depression.

Fourteen buildings rose between 1930 and 1940. The centerpiece — 30 Rockefeller Plaza — stands 850 feet tall in 66 stories of Indiana limestone and aluminum, and it was designed to be read differently depending on where you stand. From the north or south, the building presents as a broad, flat slab. From the Fifth Avenue approach, down the Channel Gardens promenade, Hood's calculated setbacks make it read as a slender vertical tower, rising with the clarity of a single stroke upward. Hood had mastered the Art Deco setback not as a concession to zoning law but as a compositional tool, adjusting them precisely to the elevator banks inside so that each setback corresponded to a genuine internal transition. The east-side setbacks he added purely for aesthetic emphasis, to sharpen the vertical reading.

The facade's sculptural program was assembled from more than 30 artists. Above the main entrance, Lee Lawrie's limestone bas-relief depicts Wisdom — a nude male figure with a windswept beard — flanked by the figures of Sound and Light. The inscription beneath it quotes Isaiah, chapter 33, verse 6: "Wisdom and knowledge shall be the stability of thy times, and strength of salvation." The symbolic program of the entire complex — communication, progress, human knowledge — is compressed into this single relief above the door.

Inside, the main lobby holds José María Sert's mural "American Progress," a 16-foot-high, 41-foot-long allegorical painting depicting three centuries of the continent's development in black and gold. It replaced Diego Rivera's original fresco — a work commissioned for the same space that Rivera refused to modify when Rockefeller objected to the inclusion of a portrait of Lenin. The original was destroyed in 1934; Sert's replacement has been in place since 1937.

Beneath your feet, Hood's most invisible achievement: a subterranean network of passages, shopping corridors, and subway connections extending beneath the entire complex. He envisioned a city beneath the city — one in which pedestrians could move from building to building, from midtown to transit, without ever emerging into the weather. That network has been in continuous operation for nearly ninety years.`
  },

  'nyc-0008': {
    title: 'Whitney Museum of American Art',
    script: `Renzo Piano described his ambition for the Whitney Museum as building something "anti-iconic" — a building that does not seek to be admired from a distance, but instead engages, serves, and frames the city around it. Standing here, at the southern foot of the High Line, you can test that claim.

The building's primary material is custom-fabricated steel panel — sheets up to 20 meters long and only 8 millimeters thick, specially machined and textured in deep blue-gray. Piano and his team specified that these panels would weather and oxidize over time, developing a unique surface patina that integrates the building into the industrial history of the Meatpacking District around it. The choice resonates with the district's character: it is a material that ages honestly, accumulating the marks of time rather than resisting them.

The massing logic is asymmetric by design and by site. The bulk of the museum is positioned to the west, toward the Hudson River — a solid, introverted mass containing the main gallery floors. To the east, facing the High Line, the building opens through glass walls and steps down in a series of outdoor terraces. The result is a building that presents two entirely different faces: industrial and closed to the west, transparent and layered to the east. Piano has said the building "flirts with the High Line" — a characteristically understated way of describing a move that gives the park a built partner at human scale.

The gallery floors repay close attention from a structural standpoint. The fifth floor contains 18,000 square feet of entirely column-free exhibition space — the largest such uninterrupted gallery floor in New York City. This is achieved through careful long-span structural engineering, with an exposed precast-concrete core running vertically through the building's center carrying all gravity and lateral loads, freeing the gallery floors from intermediate columns entirely. Ceiling heights vary between floors, some reaching 18 feet, to accommodate works of different scales without wasted volume.

The outdoor terraces — 13,000 square feet across multiple levels — were conceived not as viewing platforms but as active programming spaces: stages for performance, outdoor sculpture, and public gathering. The stairs and terraces connect each gallery level to the exterior, giving visitors the option to circulate in and out of the building as they ascend, keeping the city always present in the gallery experience.

In the lobby, look at the four passenger elevators. Each is an artwork in itself: "Six in Four" by Richard Artschwager, employing plastic laminate, glass, and etched stainless steel. The freight elevator beside them is oversized and deliberately visible — a museum needs to move large works, and Piano decided that industrial necessity was worth celebrating rather than concealing.

This building wants to be useful. That is the hardest thing for architecture to be.`
  },

  'nyc-0006': {
    title: 'Brooklyn Bridge',
    script: `When the Brooklyn Bridge opened on May 24, 1883, it was the longest suspension bridge in the world and the first bridge ever built using steel — not iron — for its main cables. Those two facts together define its historical position: it arrived at the precise moment when engineering crossed from one era into the next.

The construction method for the towers is where the story begins, 78 feet below the East River. Two pneumatic caissons — airtight wooden chambers measuring 168 by 102 feet, open at the bottom — were sunk into the riverbed. Compressed air was forced inside to keep water out, and workers descended through airlocks to excavate the mud and sand below, which was ejected to the surface through pipes. The Brooklyn caisson reached its final depth of 44.5 feet. The Manhattan caisson had to go deeper: 78.5 feet, where pressures reached 35 pounds per square inch. At those pressures, workers began suffering what was then called "caisson disease" — what we now recognize as decompression sickness. Washington Roebling, who had taken over the project after his father John's fatal accident in 1869, descended into the Manhattan caisson repeatedly and was permanently paralyzed by the illness. He directed the remaining construction from his apartment in Brooklyn Heights, watching through a telescope, relaying instructions through his wife Emily Warren Roebling, who became the primary engineering intermediary between her bedridden husband and the work site. Emily was the first person to cross the completed bridge in the official ceremony, carrying a rooster as a symbol of victory.

The towers that emerged from this foundation stand 276 feet above the water in Brooklyn gneiss stone and granite, with the characteristic pointed arches of Gothic Revival architecture — each arch 117 feet tall and 33.75 feet wide — carrying the roadway through the towers. Roebling chose the Gothic idiom not simply for aesthetics but because the pointed arch's structural efficiency under vertical load matched the engineering demands of the tower's compression role.

The main cables are an engineering system of extraordinary precision. Each of the four main cables consists of 19 strands of wire; each strand contains 278 individual galvanized steel wires of 0.2-inch diameter. The total is 5,282 wires per cable, amounting to more than 14,000 miles of wire per cable across the entire span. These were not prefabricated: John Roebling's patented parallel-wire spinning method carried each wire individually across the span on traveling rope saddles, maintaining perfect parallel alignment so that every wire shares the tensile load equally.

Below the main cables, 400 diagonal stay cables extend from the towers — a hybrid system combining conventional suspension with cable-stayed stiffening, preventing the deck from swaying under asymmetric load. It was a structural innovation that defined suspension bridge design for the century that followed.

Walk to the center of the wooden pedestrian promenade — Roebling's deliberate gift, elevated 18 feet above the traffic lanes to give the crossing its own dignity. Look in both directions, at two skylines that were separate cities when these cables were first spun. What joined them was not just steel and stone. It was thirteen years and at least 27 lives, and one family's refusal to stop.`
  }

};
