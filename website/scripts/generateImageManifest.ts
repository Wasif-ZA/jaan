// scripts/generateImageManifest.ts (CommonJS style)
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(process.cwd(), "public/images");
const exts = /\.(png|jpe?g|gif|webp|avif)$/i;

interface ImageFile {
  name: string;
}

const images: string[] = fs
  .readdirSync(imagesDir)
  .filter((f: string) => exts.test(f));

const outPath = path.join(process.cwd(), "image-manifest.json");
fs.writeFileSync(outPath, JSON.stringify(images, null, 2));

console.log(`🖼  Wrote ${images.length} entries to image-manifest.json`);
