import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = path.resolve("public/images");
const textRoots = [path.resolve("src"), path.resolve("public")];
const imageExtensions = new Set([".jpg", ".jpeg", ".png"]);
const textExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".json"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(filePath));
    } else {
      files.push(filePath);
    }
  }

  return files;
}

function webpPathFor(filePath) {
  return path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}.webp`);
}

function toPublicRelative(filePath, extOverride) {
  const relative = path.relative(path.resolve("public"), filePath).split(path.sep).join("/");
  if (!extOverride) return relative;
  return relative.replace(/\.(jpe?g|png)$/i, extOverride);
}

async function replaceReferences(conversions) {
  const textFiles = [];
  for (const root of textRoots) {
    textFiles.push(...await walk(root));
  }

  for (const file of textFiles) {
    if (!textExtensions.has(path.extname(file))) continue;

    let source = await fs.readFile(file, "utf8");
    const original = source;

    for (const { sourcePath, targetPath } of conversions) {
      const from = toPublicRelative(sourcePath);
      const to = toPublicRelative(targetPath);
      source = source.split(from).join(to);
    }

    if (source !== original) {
      await fs.writeFile(file, source);
    }
  }
}

async function main() {
  const images = (await walk(imageRoot)).filter((file) => imageExtensions.has(path.extname(file).toLowerCase()));
  const conversions = [];
  let originalBytes = 0;
  let webpBytes = 0;

  for (const image of images) {
    const target = webpPathFor(image);
    const inputStats = await fs.stat(image);
    originalBytes += inputStats.size;

    await sharp(image)
      .rotate()
      .webp({ quality: 82, effort: 5 })
      .toFile(target);

    const outputStats = await fs.stat(target);
    webpBytes += outputStats.size;
    conversions.push({ sourcePath: image, targetPath: target });
  }

  await replaceReferences(conversions);

  for (const { sourcePath, targetPath } of conversions) {
    if (sourcePath !== targetPath) {
      await fs.unlink(sourcePath);
    }
  }

  console.log(`Converted ${conversions.length} images to WebP.`);
  console.log(`Original: ${(originalBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`WebP: ${(webpBytes / 1024 / 1024).toFixed(1)} MB`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
