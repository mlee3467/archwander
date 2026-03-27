/* ============================================================
   ArchWander — Location Database (Combiner)

   This file combines all city data files into LOCS_DEFAULT.
   To add a new city:
     1. Create data-{city}.js  →  const LOCS_{CITY} = [...]
     2. Add its <script> tag in index.html (before this file)
     3. Add  ...LOCS_{CITY}  to the array below
   ============================================================ */

const LOCS_DEFAULT = [
  ...LOCS_NEW_YORK,
  ...LOCS_SEOUL,
  ...LOCS_LONDON,
  ...LOCS_TOKYO,
];
