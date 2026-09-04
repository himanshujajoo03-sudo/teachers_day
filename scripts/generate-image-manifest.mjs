/**
 * generate-image-manifest.mjs
 *
 * Scans public/faculty/<N>/ folders and writes public/faculty-images.json
 * so the frontend knows which image filename to load per faculty number.
 *
 * Run automatically via: npm run generate-manifest  (or as part of dev/build)
 */

import { readdirSync, existsSync, writeFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const facultyDir = join(projectRoot, 'public', 'faculty');
const outputFile = join(projectRoot, 'public', 'faculty-images.json');

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const manifest = {};

if (existsSync(facultyDir)) {
  for (let i = 1; i <= 22; i++) {
    const folderPath = join(facultyDir, String(i));
    if (!existsSync(folderPath)) {
      manifest[i] = null;
      continue;
    }

    let found = null;
    try {
      const files = readdirSync(folderPath);
      for (const file of files) {
        const ext = extname(file).toLowerCase();
        if (SUPPORTED_EXT.has(ext)) {
          found = file;
          break;
        }
      }
    } catch (e) {
      // empty folder
    }

    manifest[i] = found ? `/faculty/${i}/${found}` : null;
  }
} else {
  console.warn('[manifest] public/faculty/ folder does not exist. No images mapped.');
}

writeFileSync(outputFile, JSON.stringify(manifest, null, 2), 'utf-8');

console.log('[manifest] faculty-images.json written:');
for (const [k, v] of Object.entries(manifest)) {
  console.log(`  Faculty ${k.padStart(2, ' ')}: ${v ?? '(no photo — will use fallback)'}`);
}
