// EXPORT PDF  (pure jsPDF + NotoSansKR TTF → vector text, real images)
// ══════════════════════════════════════════════════════════════════
var _pdfLibReady = false;
var _koreanFontB64 = null;

function _pdfLoadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="' + src + '"]')) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load: ' + src));
    document.head.appendChild(s);
  });
}

// PDF photo cache: Key = original URL, Value = { data (Uint8Array), w, h, fmt }
var _photoCache = new Map();

// Generate a static map image for a single location using Carto CDN tiles.
// Fetches a 5×5 tile grid (ensures full coverage even with offset), waits for
// every tile to settle, then crops to a centred landscape view with pin marker.
async function _staticMapForLoc(lat, lng, zoomLevel) {
  const zoom = zoomLevel || 16;
  const TILE = 512; // @2x tile pixel size
  const n = Math.pow(2, zoom);

  // Precise floating-point tile coordinates
  const xf = (lng + 180) / 360 * n;
  const latRad = lat * Math.PI / 180;
  const yf = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
  const tileX = Math.floor(xf);
  const tileY = Math.floor(yf);
  const offX = (xf - tileX) * TILE;
  const offY = (yf - tileY) * TILE;

  // Fetch 5×5 tile grid (wider coverage to avoid black edges)
  const GRID = 5, HALF = 2;
  const big = document.createElement('canvas');
  big.width = TILE * GRID; big.height = TILE * GRID;
  const bCtx = big.getContext('2d');
  bCtx.fillStyle = '#e8e8e4'; bCtx.fillRect(0, 0, big.width, big.height); // fallback bg

  const fetchTile = (dx, dy) =>
    fetch(`https://basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${tileX + dx}/${tileY + dy}@2x.png`, { credentials: 'omit' })
      .then(r => { if (!r.ok) throw 0; return r.blob(); })
      .then(b => createImageBitmap(b))
      .then(bmp => bCtx.drawImage(bmp, (dx + HALF) * TILE, (dy + HALF) * TILE))
      .catch(() => {});

  // Fire all tile fetches in parallel, then wait for ALL to finish
  const fetches = [];
  for (let dy = -HALF; dy <= HALF; dy++)
    for (let dx = -HALF; dx <= HALF; dx++)
      fetches.push(fetchTile(dx, dy));
  await Promise.all(fetches);

  // Crop: centre on target, landscape aspect (wider than tall)
  const outW = Math.round(TILE * 3.2);
  const outH = Math.round(TILE * 1.1);
  const cx = HALF * TILE + offX, cy = HALF * TILE + offY;
  const out = document.createElement('canvas');
  out.width = outW; out.height = outH;
  const oCtx = out.getContext('2d');
  oCtx.drawImage(big, cx - outW / 2, cy - outH / 2, outW, outH, 0, 0, outW, outH);

  // Draw marker pin at centre — 1.5× larger
  oCtx.font = '72px serif';
  oCtx.textAlign = 'center';
  oCtx.textBaseline = 'bottom';
  oCtx.fillText('\ud83d\udccd', outW / 2, outH / 2 + 14);

  return { dataUrl: out.toDataURL('image/jpeg', 0.88), w: outW, h: outH };
}

async function _loadPdfLibs() {
  if (_pdfLibReady) return;
  await _pdfLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  await _pdfLoadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js');
  _pdfLibReady = true;
}

async function _loadKoreanFont() {
  if (_koreanFontB64) return;
  const resp = await fetch('NotoSansKR-Regular.ttf');
  if (!resp.ok) throw new Error('NotoSansKR-Regular.ttf not found (' + resp.status + ')');
  const buf = await resp.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const CHUNK = 65536;
  const parts = [];
  for (let i = 0; i < bytes.length; i += CHUNK)
    parts.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK)));
  _koreanFontB64 = btoa(parts.join(''));
}

// Fetch image for PDF via wsrv.nl CORS image proxy.
// wsrv.nl follows redirects, adds Access-Control-Allow-Origin:*, resizes, and
// converts to JPEG — works with ANY Wikimedia URL including Special:FilePath.
async function _fetchImgForPdf(origUrl, timeout) {
  if (_photoCache.has(origUrl)) return _photoCache.get(origUrl);
  const tmout = timeout || 20000;
  // wsrv.nl proxy: handles redirects, adds CORS, resizes to 400px wide JPEG
  const proxyUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(origUrl) + '&w=400&output=jpg&q=75';

  try {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), tmout);
    const resp = await fetch(proxyUrl, { signal: ctl.signal });
    clearTimeout(tm);
    if (!resp.ok) { console.warn('[PDF] wsrv.nl', resp.status, origUrl); return null; }

    const buf = await resp.arrayBuffer();
    if (buf.byteLength < 200) return null; // too small = error page

    // Get dimensions by loading blob (no crossOrigin needed)
    const blob = new Blob([buf], { type: 'image/jpeg' });
    const objUrl = URL.createObjectURL(blob);
    const dims = await new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve(null);
      img.src = objUrl;
    });
    URL.revokeObjectURL(objUrl);
    if (!dims || !dims.w) return null;

    const result = { data: new Uint8Array(buf), w: dims.w, h: dims.h, fmt: 'JPEG' };
    _photoCache.set(origUrl, result);
    return result;
  } catch(e) { console.warn('[PDF] Fetch error:', origUrl, e.message); return null; }
}

async function _reverseGeocode(lat, lng) {
  try {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), 5000);
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=${LANG === 'ko' ? 'ko' : 'en'}`;
    const resp = await fetch(url, { signal: ctl.signal, headers: { 'User-Agent': 'ArchWander/1.0' } });
    clearTimeout(tm);
    const data = await resp.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch { return `${lat.toFixed(5)}, ${lng.toFixed(5)}`; }
}

async function exportPDF() {
  if (!nearMeActive || !walkOrigin) { alert(t('pdf_need_pin')); return; }
  const locs = getFiltered();
  if (!locs.length) { alert(t('pdf_no_locs')); return; }

  const btn = document.getElementById('export-pdf-btn');
  const origHTML = btn.innerHTML;
  btn.innerHTML = `<span>${t('pdf_generating')}</span>`;
  btn.disabled = true;

  const overlay = document.createElement('div');
  overlay.id = 'pdf-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(255,255,255,0.97);display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;';
  overlay.innerHTML = `
    <div style="text-align:center;width:320px;max-width:85vw">
      <div style="font-size:36px;margin-bottom:16px;animation:pdfPulse 1.8s ease-in-out infinite">📄</div>
      <div id="pdf-stage" style="font-size:15px;font-weight:600;color:#222;margin-bottom:8px">${LANG==='ko'?'PDF 준비 중…':'Preparing PDF…'}</div>
      <div id="pdf-detail" style="font-size:12px;color:#888;margin-bottom:16px;min-height:18px"></div>
      <div style="width:100%;height:6px;background:#e8e8e4;border-radius:3px;overflow:hidden">
        <div id="pdf-bar" style="width:0%;height:100%;background:linear-gradient(90deg,#3b82f6,#2563eb);border-radius:3px;transition:width 0.4s ease"></div>
      </div>
      <div id="pdf-pct" style="font-size:11px;color:#aaa;margin-top:8px">0%</div>
    </div>
    <style>@keyframes pdfPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}</style>
  `;
  document.body.appendChild(overlay);
  const _pdfBar = document.getElementById('pdf-bar');
  const _pdfStage = document.getElementById('pdf-stage');
  const _pdfDetail = document.getElementById('pdf-detail');
  const _pdfPct = document.getElementById('pdf-pct');
  function _pdfProgress(pct, stage, detail) {
    const p = Math.min(100, Math.round(pct));
    _pdfBar.style.width = p + '%';
    _pdfPct.textContent = p + '%';
    if (stage) _pdfStage.textContent = stage;
    _pdfDetail.textContent = detail || '';
  }

  try {
    // ── Load libs + font + reverse-geocode in parallel ──
    const [,, pinAddress] = await Promise.all([
      _loadPdfLibs(),
      _loadKoreanFont(),
      _reverseGeocode(walkOrigin.lat, walkOrigin.lng)
    ]);
    _pdfProgress(5, LANG==='ko'?'데이터 준비 중…':'Loading data…');

    const cityLabel = CITY_META[activeCity]?.label?.replace(/^\S+\s/, '') || activeCity;
    const walkMin   = parseInt(document.getElementById('walk-slider').value, 10);

    // ── Helpers (reuse global _displayName/_displayAddr/_displayHood) ──
    function _tf(loc, field) {
      if (LANG === 'ko' && typeof LOCS_KO !== 'undefined' && LOCS_KO[loc.id]?.[field])
        return LOCS_KO[loc.id][field];
      return loc[field] || '';
    }
    function _biName(loc, idx) {
      return `${idx + 1}. ${_displayName(loc)}`;
    }

    // ── Fetch photos via wsrv.nl proxy (handles CORS + redirects) ──
    const photoMap = {};
    let fetchCount = 0;
    for (let li = 0; li < locs.length; li++) {
      const loc = locs[li];
      if (!loc.photos?.length) continue;
      _pdfProgress(6 + (li / locs.length) * 54, LANG==='ko'?'사진 다운로드 중…':'Downloading photos…', `${li+1} / ${locs.length}`);
      const results = [];
      for (const url of loc.photos.slice(0, 4)) {
        const c = _photoCache.get(url);
        if (c) { results.push(c); continue; }
        // 150ms throttle to be polite to proxy
        if (fetchCount > 0) await new Promise(r => setTimeout(r, 150));
        const r = await _fetchImgForPdf(url, 15000);
        if (r) results.push(r);
        fetchCount++;
      }
      if (results.length) photoMap[loc.id] = results;
    }

    // ── Create jsPDF document ──
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    // Register NotoSansKR for both normal and bold (prevents Helvetica fallback)
    doc.addFileToVFS('NotoSansKR-Regular.ttf', _koreanFontB64);
    doc.addFont('NotoSansKR-Regular.ttf', 'NKR', 'normal');
    doc.addFont('NotoSansKR-Regular.ttf', 'NKR', 'bold');
    const F = 'NKR';

    const ML = 10, MR = 10, MT = 12, MBOT = 14;
    const PW = 210 - ML - MR; // 190mm printable width
    const PAGE_H = 297;
    const BLUE  = [0, 0, 255];
    const BLACK = [0, 0, 0];
    const GRAY  = [80, 80, 80];
    const LGRAY = [200, 200, 200];

    // Add page if insufficient space; returns updated y
    function _chkY(y, needed) {
      if (y + needed > PAGE_H - MBOT) { doc.addPage(); return MT; }
      return y;
    }

    const now = new Date();
    const dtStr = now.toLocaleDateString(LANG==='ko'?'ko-KR':'en-US',{year:'numeric',month:'long',day:'numeric'})
      + '  ' + now.toLocaleTimeString(LANG==='ko'?'ko-KR':'en-US',{hour:'2-digit',minute:'2-digit'});

    // ══════════════════════════════════════════
    // COVER PAGE
    // ══════════════════════════════════════════
    _pdfProgress(62, LANG==='ko'?'표지 생성 중…':'Generating cover…');
    let y = MT;

    // ArchWander™
    doc.setFont(F, 'bold');
    doc.setFontSize(28);
    doc.setTextColor(...BLUE);
    doc.text('ArchWander', ML, y);
    const awW = doc.getTextWidth('ArchWander');
    doc.setFontSize(9);
    doc.text('\u2122', ML + awW + 0.5, y - 5);
    y += 12;

    // City
    doc.setFont(F, 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...BLACK);
    doc.text(cityLabel, ML, y);
    y += 7;

    // Stats
    doc.setFont(F, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text(`${locs.length} ${t('pdf_locations')} \u00b7 ${walkMin} min ${t('pdf_walking')}`, ML, y);
    y += 5;

    // Pin address
    doc.setFontSize(9);
    const addrLines = doc.splitTextToSize(pinAddress, PW);
    doc.text(addrLines, ML, y);
    y += addrLines.length * 4.5;

    // Date / time
    doc.setFontSize(9);
    doc.text(dtStr, ML, y);
    y += 7;

    // Divider
    doc.setDrawColor(...LGRAY);
    doc.setLineWidth(0.3);
    doc.line(ML, y, 210 - MR, y);
    y += 5;

    // Summary heading
    doc.setFont(F, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...BLACK);
    doc.text(t('pdf_summary'), ML, y);
    y += 4;

    // Summary table
    doc.autoTable({
      startY: y,
      margin: { left: ML, right: MR },
      styles: { font: F, fontSize: 8, textColor: BLACK, cellPadding: 2 },
      headStyles: { fillColor: BLUE, textColor: [255,255,255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245,245,255] },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 52 },
        2: { cellWidth: 50 },
        3: { cellWidth: 16, halign: 'center' },
        4: { cellWidth: PW - 8 - 52 - 50 - 16 }
      },
      head: [['#', t('pdf_name'), t('pdf_architect'), t('pdf_year'), t('pdf_category')]],
      body: locs.map((loc, i) => [
        i + 1,
        _biName(loc, i).replace(/^\d+\.\s/, ''),
        loc.arch || '',
        loc.yr   || '',
        _allCats(loc).map(c => _tCat(c)).join(', ')
      ])
    });

    // ══════════════════════════════════════════
    // DETAIL PAGES — one per location
    // ══════════════════════════════════════════
    const MAP_H  = 50;  // fixed 50mm map height
    const PHOTO_H = 50; // fixed 50mm photo height

    for (let i = 0; i < locs.length; i++) {
      const loc = locs[i];
      _pdfProgress(62 + (i / locs.length) * 30, LANG==='ko'?'페이지 생성 중…':'Building pages…', `${i+1} / ${locs.length}`);

      doc.addPage();
      y = MT;

      // ── Numbered / bilingual title ──
      doc.setFont(F, 'bold');
      doc.setFontSize(15);
      doc.setTextColor(...BLACK);
      const titleLines = doc.splitTextToSize(_biName(loc, i), PW);
      doc.text(titleLines, ML, y);
      y += titleLines.length * 7 + 1;

      // ── Architect · Year ──
      doc.setFont(F, 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      doc.text(`${loc.arch || ''} \u00b7 ${loc.yr || ''}`, ML, y);
      y += 6;

      // ── Info table ──
      const fields = [];
      const sgs = _allSGs(loc).join(', ');
      if (sgs) fields.push([t('pdf_style'), sgs]);
      const cats = _allCats(loc).map(c => _tCat(c)).join(', ');
      if (cats) fields.push([t('pdf_category'), cats]);
      if (loc.access) fields.push([t('pdf_access'), _tAccess(loc.access)]);
      const hours = _tf(loc,'hours'), admission = _tf(loc,'admission'), transit = _tf(loc,'transit');
      if (loc.addr) fields.push([t('pdf_address'),      _displayAddr(loc)]);
      if (loc.hood) fields.push([t('pdf_neighborhood'), _displayHood(loc)]);
      if (hours)     fields.push([t('pdf_hours'),     hours]);
      if (admission) fields.push([t('pdf_admission'), admission]);
      if (transit)   fields.push([t('pdf_transit'),   transit]);
      if (loc.tags?.length) fields.push([t('pdf_tags'), loc.tags.join(', ')]);

      if (fields.length) {
        doc.autoTable({
          startY: y,
          margin: { left: ML, right: MR },
          styles: { font: F, fontSize: 8.5, textColor: BLACK, cellPadding: 2 },
          columnStyles: {
            0: { cellWidth: 35, fontStyle: 'bold', fillColor: [248,248,248] },
            1: { cellWidth: PW - 35 }
          },
          body: fields,
          theme: 'grid',
          tableLineColor: LGRAY,
          tableLineWidth: 0.1
        });
        y = doc.lastAutoTable.finalY + 4;
      }

      // ── Description (multi-page safe) ──
      const desc = _tf(loc, 'desc');
      if (desc) {
        const descLines = doc.splitTextToSize(desc, PW);
        const LH = 4.5;
        let li = 0;
        while (li < descLines.length) {
          y = _chkY(y, LH);
          doc.setFont(F, 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(...BLACK);
          const avail = Math.max(1, Math.floor((PAGE_H - MBOT - y) / LH));
          const chunk = descLines.slice(li, li + avail);
          doc.text(chunk, ML, y);
          y += chunk.length * LH;
          li += avail;
        }
        y += 4;
      }

      // ── Per-location map (static tiles, 50mm tall, marker at centre) ──
      if (loc.lat && loc.lng) {
        const mapData = await _staticMapForLoc(loc.lat, loc.lng, 16);
        if (mapData) {
          const mapAspect = mapData.w / mapData.h;
          const mapW = Math.min(PW, MAP_H * mapAspect); // full width or aspect-limited
          y = _chkY(y, MAP_H + 5 + PHOTO_H + 4);       // ensure room for map+photos
          try { doc.addImage(mapData.dataUrl, 'JPEG', ML, y, mapW, MAP_H); } catch(e) {}
          y += MAP_H;
        }
      }

      // ── Photos (below map, 5mm gap, 50mm height, left-aligned, aspect-ratio) ──
      const photos = photoMap[loc.id] || [];
      if (photos.length) {
        y += 5; // 5mm margin below map
        y = _chkY(y, PHOTO_H + 2);
        const GAP = 2;
        let xOff = ML;
        photos.forEach(p => {
          const imgW = PHOTO_H * (p.w / p.h);
          if (xOff + imgW > 210 - MR) return; // skip if overflows
          try { doc.addImage(p.data, p.fmt || 'JPEG', xOff, y, imgW, PHOTO_H); } catch(e) {}
          xOff += imgW + GAP;
        });
        y += PHOTO_H + 4;
      }
    }

    // ── Page numbers on all pages ──
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont(F, 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`${p} / ${totalPages}`, 105, 291, { align: 'center' });
    }

    _pdfProgress(99, LANG==='ko'?'파일 저장 중…':'Saving file…');
    const filename = `ArchWander_${cityLabel.replace(/\s+/g,'_')}_${new Date().toISOString().slice(0,10)}.pdf`;
    doc.save(filename);
    _pdfProgress(100, LANG==='ko'?'완료!':'Done!');
    await new Promise(r => setTimeout(r, 400));

  } catch (err) {
    console.error('PDF export failed:', err);
    alert('PDF export failed: ' + err.message);
  } finally {
    const o = document.getElementById('pdf-overlay');
    if (o) o.remove();
    btn.innerHTML = origHTML;
    btn.disabled = false;
  }
}

// ══════════════════════════════════════════════════════════════════
// ROUTE PDF EXPORT
// ══════════════════════════════════════════════════════════════════
async function exportRoutePDF() {
  if (!routeData || !routeLocations.length) {
    alert(LANG === 'ko' ? '먼저 경로를 계산하세요.' : 'Please calculate a route first.');
    return;
  }

  try {
    await Promise.all([_loadPdfLibs(), _loadKoreanFont()]);
  } catch(err) {
    alert('Failed to load PDF libraries: ' + err.message);
    return;
  }

  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF('p', 'mm', 'a4');
  var W = 210, MARGIN = 14, CW = W - 2 * MARGIN;

  // Register Korean font
  if (_koreanFontB64) {
    doc.addFileToVFS('NotoSansKR.ttf', _koreanFontB64);
    doc.addFont('NotoSansKR.ttf', 'NotoSansKR', 'normal');
  }

  var y = MARGIN;
  var locs = routeLocations;
  var cityLabel = activeCityKey.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });

  // ── Title ──
  doc.setFont(_koreanFontB64 ? 'NotoSansKR' : 'helvetica', 'normal');
  doc.setFontSize(20);
  doc.text('ArchWander Route', MARGIN, y + 7);
  y += 12;

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(cityLabel + '  ·  ' + locs.length + ' stops', MARGIN, y + 4);
  y += 10;

  // ── Route summary ──
  var distStr = routeData.distance < 1000
    ? Math.round(routeData.distance) + 'm'
    : (routeData.distance / 1000).toFixed(1) + 'km';
  var durMin = Math.ceil(routeData.duration / 60);
  var durStr = durMin < 60
    ? durMin + ' min'
    : Math.floor(durMin / 60) + 'h ' + (durMin % 60) + 'min';

  doc.setFillColor(247, 247, 245);
  doc.roundedRect(MARGIN, y, CW, 18, 3, 3, 'F');
  doc.setFontSize(11);
  doc.setTextColor(60);
  doc.text('Total: ' + distStr + '  ·  ' + durStr + ' walking  ·  ' + locs.length + ' stops', MARGIN + 6, y + 11);
  y += 24;

  doc.setDrawColor(220);
  doc.line(MARGIN, y, W - MARGIN, y);
  y += 6;

  // ── Itinerary ──
  for (var i = 0; i < locs.length; i++) {
    var loc = locs[i];

    // Page break check
    if (y > 250) {
      doc.addPage();
      y = MARGIN;
    }

    // Stop number circle
    doc.setFillColor(59, 130, 246);
    doc.circle(MARGIN + 5, y + 3, 4, 'F');
    doc.setFontSize(9);
    doc.setTextColor(255);
    doc.text(String(i + 1), MARGIN + 5, y + 4.5, { align: 'center' });

    // Location name
    doc.setFontSize(12);
    doc.setTextColor(17);
    doc.text(loc.name || '', MARGIN + 14, y + 4.5);
    y += 8;

    // Category + hood
    doc.setFontSize(9);
    doc.setTextColor(120);
    var meta = (_pCat(loc) || '') + (loc.hood ? '  ·  ' + loc.hood : '') + (loc.arch ? '  ·  ' + loc.arch : '');
    doc.text(meta, MARGIN + 14, y);
    y += 5;

    // Address
    if (loc.addr) {
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(loc.addr, MARGIN + 14, y);
      y += 4;
    }

    // Leg info (distance to next stop)
    if (routeData.legs && routeData.legs[i] && i < locs.length - 1) {
      var leg = routeData.legs[i];
      var legDist = leg.distance < 1000 ? Math.round(leg.distance) + 'm' : (leg.distance / 1000).toFixed(1) + 'km';
      var legDur = Math.ceil(leg.duration / 60) + ' min';
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text('   \u2193  ' + legDist + ' \u00b7 ' + legDur, MARGIN + 10, y + 3);
      y += 7;
    } else {
      y += 4;
    }
  }

  // ── Footer ──
  y += 6;
  if (y > 270) { doc.addPage(); y = MARGIN; }
  doc.setDrawColor(220);
  doc.line(MARGIN, y, W - MARGIN, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('Generated by ArchWander \u00b7 ' + new Date().toISOString().slice(0, 10), MARGIN, y);

  // Save
  var filename = 'ArchWander_Route_' + cityLabel.replace(/\s+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf';
  doc.save(filename);
}

// ══════════════════════════════════════════════════════════════════
