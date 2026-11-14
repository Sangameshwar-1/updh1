/**
 * Uploads the rendered Zone 4 station cards from activity-img/ to Cloudinary.
 *
 * Same signing scheme as scripts/upload-photos.mjs -- the parameters that are
 * signed must be in alphabetical order, with the API secret appended and no
 * separator -- but this one carries its own small manifest instead of reading
 * organized_photos/mapping.json, because these cards are generated here rather
 * than sorted out of a photo dump.
 *
 * Public IDs are new, so nothing existing is replaced. overwrite and
 * invalidate are still set so that re-running after a copy change replaces the
 * asset and clears Cloudinary's cached derivatives -- without invalidate the
 * old card keeps being served in some sizes and formats.
 */
import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

if (existsSync('.env.local')) {
  const envContent = readFileSync('.env.local', 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [k, ...v] = trimmed.split('=');
      process.env[k.trim()] = v.join('=').trim();
    }
  }
}

const cloud = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const key = process.env.CLOUDINARY_API_KEY;
const secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud || !key || !secret) {
  console.error('Missing Cloudinary credentials. Expected them in .env.local or the environment.');
  process.exit(1);
}

const FOLDER = 'museum/zone-4/activities';

const CARDS = [
  { file: 'decode-the-symbol.png', publicId: `${FOLDER}/decode-the-symbol-card` },
  { file: 'sign-your-name-in-morse.png', publicId: `${FOLDER}/sign-your-name-in-morse-card` },
  { file: 'the-2050-wall.png', publicId: `${FOLDER}/the-2050-wall-card` },
];

async function upload({ file, publicId }, idx, total) {
  const path = resolve('activity-img', file);
  if (!existsSync(path)) {
    console.error(`[${idx + 1}/${total}] MISSING: ${path} — run scripts/render-activity-cards.mjs first`);
    return false;
  }

  const timestamp = Math.round(Date.now() / 1000);
  const toSign = `invalidate=true&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${secret}`;
  const signature = createHash('sha1').update(toSign).digest('hex');

  const fd = new FormData();
  fd.append('file', new Blob([readFileSync(path)]), file);
  fd.append('api_key', key);
  fd.append('timestamp', String(timestamp));
  fd.append('overwrite', 'true');
  fd.append('invalidate', 'true');
  fd.append('signature', signature);
  fd.append('public_id', publicId);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: 'POST',
      body: fd,
    });
    const data = await res.json();
    if (data.secure_url) {
      console.log(`[${idx + 1}/${total}] OK  ${publicId}  ${data.width}x${data.height}`);
      console.log(`            ${data.secure_url}`);
      return true;
    }
    console.error(`[${idx + 1}/${total}] FAILED  ${publicId} ->`, data.error?.message || data);
    return false;
  } catch (err) {
    console.error(`[${idx + 1}/${total}] ERROR  ${publicId} ->`, err.message);
    return false;
  }
}

let ok = 0;
for (let i = 0; i < CARDS.length; i++) {
  if (await upload(CARDS[i], i, CARDS.length)) ok++;
  await new Promise((r) => setTimeout(r, 200));
}
console.log(`\nUploaded ${ok} of ${CARDS.length} station cards to cloud "${cloud}".`);
process.exit(ok === CARDS.length ? 0 : 1);
