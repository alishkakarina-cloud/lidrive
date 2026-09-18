// Downloads CC0 Lixiang photos from Wikimedia Commons and writes optimized WebP (+ JPEG fallback) into public/img.
// Run: node scripts/fetch-photos.mjs
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import sharp from "sharp";

const WIDTHS = [480, 960, 1600, 2560];
const UA = "LiDriveSite/1.0 (alisherka077@gmail.com)";

const PHOTOS = {
  heroL9: "Moscow, LiXiang L9, April 2025 01.jpg",
  heroL8: "Li Auto L8 010.jpg",
  heroL7: "2025 Lixiang L7 silver front.jpg",
  l9Rear: "Moscow, LiXiang L9, April 2025 03.jpg",
  l9Cockpit: "Li Auto L9 II 003.jpg",
  l8Cockpit: "Li Auto L8 II 003.jpg",
  l6Interior: "Li Auto L6 II 003.jpg",
  l9Street: "Moscow, Lixiang Li9, Aug 2025 01.jpg",
  l9Showroom: "Li Auto L9 II 002.jpg",
  l9Front: "Li Auto L9 II 001.jpg",
  l7Black: "Moscow, Li Auto L7 black, Sept 2025 01.jpg",
  megaStreet: "Moscow, Li Auto Mega, July 2025 04.jpg",
};

mkdirSync("public/img", { recursive: true });

for (const [key, file] of Object.entries(PHOTOS)) {
  if (existsSync(`public/img/${key}-2560.webp`)) continue;
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
  let buf;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (res.ok) {
      buf = Buffer.from(await res.arrayBuffer());
      break;
    }
    await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
  }
  if (!buf) throw new Error(`download failed: ${file}`);
  const meta = await sharp(buf).metadata();
  console.log(key, `${meta.width}x${meta.height}`);
  for (const w of WIDTHS) {
    const pipeline = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
    writeFileSync(`public/img/${key}-${w}.webp`, await pipeline.clone().webp({ quality: 82, effort: 5 }).toBuffer());
  }
  writeFileSync(`public/img/${key}-1600.jpg`, await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toBuffer());
}
console.log("done");
