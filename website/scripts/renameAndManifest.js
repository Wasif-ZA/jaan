// scripts/renameAndManifest.js   <-- plain JS
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(process.cwd(), "public/images");
const exts = /\.(png|jpe?g|gif|webp|avif)$/i;

const files = fs.readdirSync(imagesDir).filter((f) => exts.test(f)).sort();

files.forEach((old, i) => {
  const ext = path.extname(old).toLowerCase();
  const newName = `pic${i + 1}${ext}`;
  if (old !== newName) {
    fs.renameSync(path.join(imagesDir, old), path.join(imagesDir, newName));
    console.log(`${old} → ${newName}`);
  }
});

fs.writeFileSync(
  path.join(process.cwd(), "image-manifest.json"),
  JSON.stringify(files.map((_, i) => `pic${i + 1}${path.extname(files[i]).toLowerCase()}`), null, 2)
);

console.log(`🖼  Updated manifest with ${files.length} images.`);
