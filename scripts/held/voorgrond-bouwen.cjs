const sharp = require("sharp");
const PUB = __dirname + "/../../public/beeld";
// Polygoon (in 2000x1116-weergavecoördinaten) rond toonbank, dozen, laptop en pakketten; de vrouw komt uit het Vision-masker.
const S = 2752 / 2000;
const POLY = [[780,1116],[772,650],[792,548],[800,452],[978,440],[974,402],[1188,398],[1192,598],[1420,648],[1620,702],[1800,762],[2000,800],[2000,1116]];

// Masker krimpen met een min-filter (horizontaal en verticaal), werkt ook op zachte maskers.
const krimp = (bron, W, H, r) => {
  const h1 = Buffer.alloc(W * H), uit = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let m = 255; for (let d = -r; d <= r; d++) { const xx = x + d; if (xx >= 0 && xx < W) m = Math.min(m, bron[y * W + xx]); }
    h1[y * W + x] = m;
  }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let m = 255; for (let d = -r; d <= r; d++) { const yy = y + d; if (yy >= 0 && yy < H) m = Math.min(m, h1[yy * W + x]); }
    uit[y * W + x] = m;
  }
  return uit;
};

(async () => {
  const W = 2752, H = 1536;
  const scene = await sharp(__dirname + "/werk/scene.jpg").raw().toBuffer();
  const groen = await sharp(__dirname + "/werk/groen.png").raw().toBuffer();
  // Vision-masker (de vrouw): zachte rand zoals in de eerste versie, 1-2 px gekrompen tegen een lichte zoom van de muur.
  const vision = await sharp(__dirname + "/werk/masker.png").removeAlpha().toColourspace("b-w").blur(1.6).linear(6, -6 * 150).extractChannel(0).raw().toBuffer({ resolveWithObject: true });
  console.log("vision-masker", vision.info.width, vision.info.height, vision.info.channels);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><polygon points="${POLY.map(([x,y]) => `${x*S},${y*S}`).join(" ")}" fill="#fff"/></svg>`;
  const polyObj = await sharp(Buffer.from(svg)).flatten({ background: "#000" }).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  const poly = polyObj.data; console.log("poly", polyObj.info.channels, "kanalen, lengte", poly.length, "verwacht", W * H);
  // Groenscherm (toonbank, dozen, pakketten): zachte drempel zoals in de eerste versie...
  const gm = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = groen[i*3], g = groen[i*3+1], b = groen[i*3+2];
    const groenheid = g - Math.max(r, b);                 // puur groen ≈ 255, gewone pixels < 40
    const nietGroen = 1 - Math.min(Math.max((groenheid - 40) / 60, 0), 1);
    gm[i] = Math.round(255 * nietGroen * (poly[i] / 255));
  }
  // ...maar 5 px gekrompen: het groenscherm is een JPEG en de 8x8-blokken langs de rand (vooral rond de armen, tegen de
  // lichtblauwe muur) kwamen anders als blokkerige zoom mee. De vrouw zelf komt uit het Vision-masker, dus daar kost dit niets.
  const gmKlein = krimp(gm, W, H, 5);
  const alpha = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) alpha[i] = Math.max(vision.data[i], gmKlein[i]);
  // Lichte verzachting van de rand (eerste versie)
  const zachtObj = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).blur(0.7).extractChannel(0).raw().toBuffer({ resolveWithObject: true });
  if (zachtObj.info.channels !== 1) throw new Error("zacht heeft " + zachtObj.info.channels + " kanalen");
  const zacht = zachtObj.data;
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) { rgba[i*4] = scene[i*3]; rgba[i*4+1] = scene[i*3+1]; rgba[i*4+2] = scene[i*3+2]; rgba[i*4+3] = zacht[i]; }
  const vg = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
  await vg.clone().resize({ width: 2560 }).png({ compressionLevel: 9 }).toFile(`${PUB}/held-persoon.png`);
  await sharp(__dirname + "/werk/scene.jpg").resize({ width: 2560 }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${PUB}/held-winkel.jpg`);
  // Controlebeeld: voorgrond op donkere ondergrond
  const vol = await sharp({ create: { width: W, height: H, channels: 3, background: "#141a2e" } }).composite([{ input: await vg.clone().png().toBuffer() }]).png().toBuffer();
  await sharp(vol).resize({ width: 1600 }).jpeg({ quality: 80 }).toFile(__dirname + "/werk/controle.jpg");
  await sharp(vol).extract({ left: 1828, top: 236, width: 560, height: 700 }).toFile(__dirname + "/werk/zoom-hoofd.png");
  for (const f of ["held-persoon.png", "held-winkel.jpg"]) { const m = await sharp(`${PUB}/${f}`).metadata(); console.log(f, m.width, m.height); }
})().catch(e => { console.error(e); process.exit(1); });
