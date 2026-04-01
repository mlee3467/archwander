/* ============================================================
   ArchWander — Korean Translations (Compiler)

   This file combines all city-specific Korean translation files
   into a single LOCS_KO object used by index.html.

   To add a new city:
     1. Create data-ko-{city}.js  →  const LOCS_KO_{CITY} = {...}
     2. Add its <script> tag in index.html (before this file)
     3. Add  ...LOCS_KO_{CITY}  to the object below

   To update translations:
     - Use translate-tool.html to regenerate a city file
     - Or ask Claude to re-translate data-{city}.js
   ============================================================ */

const LOCS_KO = {
  ...LOCS_KO_NEW_YORK,
  ...LOCS_KO_SEOUL,
  ...LOCS_KO_LONDON,
  ...LOCS_KO_TOKYO,
};
