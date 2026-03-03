// One-time image compression script — run with: node compress-images.mjs
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import path from "path";

const ASSETS = "./attached_assets";

const targets = [
  // [filename, maxWidth, quality]
  ["baker-library-day.jpeg",   1400, 78],
  ["tuck-school.jpeg",         1400, 78],
  ["hiking-nh-foliage.jpeg",   1200, 80],
  ["image_1766854017021.png",  1200, 82],
  ["library-claude-session.jpeg", 1200, 82],
  ["boston-charles-river.jpeg",   1200, 82],
  ["professional-headshot.jpeg",  800,  85],
];

for (const [file, maxW, quality] of targets) {
  const src = path.join(ASSETS, file);
  try {
    const s = await stat(src);
    const before = (s.size / 1024).toFixed(0);

    const img = sharp(src);
    const meta = await img.metadata();

    // Only resize if wider than maxW
    const pipeline = meta.width > maxW ? img.resize(maxW, null, { withoutEnlargement: true }) : img;

    const isJpeg = file.endsWith(".jpeg") || file.endsWith(".jpg");
    const buf = await (isJpeg
      ? pipeline.jpeg({ quality, mozjpeg: true })
      : pipeline.png({ quality, compressionLevel: 9 })
    ).toBuffer();

    const after = (buf.length / 1024).toFixed(0);

    // Only write if we actually made it smaller
    if (buf.length < s.size) {
      await import("fs").then(fs => fs.promises.writeFile(src, buf));
      console.log(`✓ ${file}: ${before}KB → ${after}KB (saved ${(((s.size - buf.length) / s.size) * 100).toFixed(0)}%)`);
    } else {
      console.log(`— ${file}: already optimal at ${before}KB`);
    }
  } catch (e) {
    console.log(`✗ ${file}: ${e.message}`);
  }
}
console.log("\nDone.");
