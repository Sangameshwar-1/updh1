# Credentials — DO NOT COMMIT, DO NOT POST PUBLICLY

This file is gitignored on purpose. Share it person to person (direct message, or
hand someone the file). Never paste it into a group chat, an issue, a commit, a
screenshot, or a slide.

If it leaks: Cloudinary Console → Settings → Access Keys → generate a new key pair
and disable the old one. Then update this file, `.env.local`, and Vercel.

---

## Cloudinary account

| Field | Value |
| --- | --- |
| Cloud name | `b7ey3fox` |
| API key | `895393994839131` |
| API secret | `q2Ii-ATy8R4Byq7BChuCMhTYp7k` |
| Upload access token | `pZGef91-MFB_a1xL4pnunyzjt3GgWp_CmA-7qMu2rdY` |

The cloud name is not sensitive — it is in every image URL the site serves. The API
secret and upload token are. Anyone holding them can write to, and delete from, our
Cloudinary account.

---

## Your `.env.local`

Create this file in the project root. It is gitignored.

```
VITE_CLOUDINARY_CLOUD_NAME=b7ey3fox
CLOUDINARY_API_KEY=895393994839131
CLOUDINARY_API_SECRET=q2Ii-ATy8R4Byq7BChuCMhTYp7k
UPLOAD_ACCESS_TOKEN=pZGef91-MFB_a1xL4pnunyzjt3GgWp_CmA-7qMu2rdY
```

Restart `npm run dev` after creating it — Vite reads env files only at startup.

**For building pages and editing captions you need only the first line.** The rest
are for uploading.

---

## Uploading images

### The easy way — Cloudinary Media Library (no credentials needed)

Ask Sangameshwar to invite you as a user (Console → Settings → Users). Then:

1. Log in to Cloudinary → **Media Library**
2. Open the folder, e.g. `museum/zone-1/indus-seals`
3. Upload your photo, set its **public ID** to the existing one, e.g. `indus-seal`,
   and confirm the overwrite

It appears on the live site straight away. No code change, no redeploy.

This is the recommended route. It needs no API secret at all.

### The scripted way — only if you are uploading many at once

With `.env.local` filled in as above, a signed upload looks like this. The signature
is SHA-1 of the signed parameters sorted alphabetically, joined with `&`, with the
secret appended:

```js
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const timestamp = Math.round(Date.now() / 1000);
const publicId = 'museum/zone-1/indus-seals/indus-seal';
const toSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

const fd = new FormData();
fd.append('file', new Blob([readFileSync('photo.jpg')]), 'photo.jpg');
fd.append('api_key', process.env.CLOUDINARY_API_KEY);
fd.append('timestamp', String(timestamp));
fd.append('signature', createHash('sha1').update(toSign).digest('hex'));
fd.append('public_id', publicId);

const res = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
  { method: 'POST', body: fd },
);
console.log(await res.json());
```

Run it with the env file loaded, e.g. `node --env-file=.env.local upload.mjs`.

**Check before you overwrite.** Uploading to an existing public ID replaces that
asset. `museum/zone-2/telegraph/morse-code-chart` is a real exhibit image, not a
placeholder — do not overwrite it.

---

## Which public IDs exist

Every image is `<folder>/<id>`. Folders mirror the site routes. Each zone area also
has a `tile` used on the home page.

```
museum/home/hero
museum/zone-1/ashokan-edicts/ashokan-edict
museum/zone-1/indus-seals/indus-seal
museum/zone-1/oral-traditions/oral-tradition
museum/zone-1/postal-history/palm-leaf-manuscript
museum/zone-1/postal-history/dak-route-map
museum/zone-1/postal-history/stamps
museum/zone-1/postal-history/sample-letter-and-envelope
museum/zone-2/printing/handwritten-and-printed-samples
museum/zone-2/newspapers/hickys-bengal-gazette
museum/zone-2/telegraph/telegraph-diagram
museum/zone-2/telegraph/morse-code-chart      <-- real image, do not overwrite
museum/zone-2/telephone/landline-telephone
museum/zone-3/radio/radio-model
museum/zone-3/television/television-model
museum/zone-3/satellites/insat-satellite
museum/zone-3/digital-networks/phone-and-laptop
museum/zone-3/digital-networks/network-diagram
museum/zone-3/digital-networks/digital-information-examples
museum/zone-4/activities/decode-the-symbol
museum/zone-4/activities/crack-the-code
museum/zone-4/activities/which-source-would-you-trust
museum/zone-4/activities/future-of-communication-wall
museum/about/team/akula-harsha-vardhan
museum/about/team/santhosh
museum/about/team/bhanu-prakash
museum/about/team/nikhil-mohan-chowdary
museum/about/team/sangameshwar
```

Plus a tile per area: `museum/zone-1/ashokan-edicts/tile`, `museum/zone-2/radio/tile`,
and so on for all 13 areas.

---

## Vercel

Dashboard → `updh` project → Settings → Environment Variables. All four are already
set for Production. If you change one, **redeploy** — Vite bakes `VITE_*` values in at
build time, so saving alone does nothing.
