import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';

// Attempt to load .env.local if present
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
  console.error('Missing Cloudinary credentials. Please verify .env.local exists.');
  process.exit(1);
}

const mappingFile = 'organized_photos/mapping.json';
if (!existsSync(mappingFile)) {
  console.error('mapping.json not found. Run organize-photos.mjs first.');
  process.exit(1);
}

const mapping = JSON.parse(readFileSync(mappingFile, 'utf8'));

console.log(`Starting upload of ${mapping.length} assets to Cloudinary cloud "${cloud}"...`);

async function uploadAsset(item, idx, total) {
  const timestamp = Math.round(Date.now() / 1000);
  const publicId = item.publicId;

  // Parameters to sign in alphabetical order
  const toSign = `invalidate=true&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${secret}`;
  const signature = createHash('sha1').update(toSign).digest('hex');

  const fd = new FormData();
  const fileBytes = readFileSync(item.dest);
  fd.append('file', new Blob([fileBytes]), `${item.publicId}.jpg`);
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
      console.log(`[${idx + 1}/${total}] SUCCESS: ${publicId} -> ${data.secure_url}`);
      return { ok: true, item, data };
    } else {
      console.error(`[${idx + 1}/${total}] FAILED: ${publicId} ->`, data.error?.message || data);
      return { ok: false, item, error: data.error };
    }
  } catch (err) {
    console.error(`[${idx + 1}/${total}] ERROR: ${publicId} ->`, err.message);
    return { ok: false, item, error: err };
  }
}

async function run() {
  let successCount = 0;
  for (let i = 0; i < mapping.length; i++) {
    const res = await uploadAsset(mapping[i], i, mapping.length);
    if (res.ok) successCount++;
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log(`\nUpload complete! Successfully uploaded ${successCount} of ${mapping.length} assets.`);
}

run();
