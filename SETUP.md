# Setup — From Stone to Smartphone

The website for our pop-up museum. React + Vite + TypeScript, deployed on Vercel,
with every image served from Cloudinary.

Live: https://updh.vercel.app

---

## 1. What you need installed

- **Node 20 or newer** (`node --version`). Node 18 works but is older than what the
  site was built against.
- Git.

> **Windows people: run everything from PowerShell or Command Prompt, not WSL.**
> The project lives on the Windows filesystem. If you install from Windows and then
> run from WSL (or the reverse) you get this:
>
> ```
> Error: Cannot find module @rollup/rollup-linux-x64-gnu
> ```
>
> That is not the npm bug the message suggests. Rollup ships a different native
> binary per platform, and one `node_modules` cannot serve both. Pick one and stay
> there. If you must switch, delete `node_modules` and `package-lock.json` and
> reinstall.

---

## 2. Get it running

```bash
git clone https://github.com/Sangameshwar-1/updh1.git
cd updh1
npm install
```

Create a file called `.env.local` in the project root with one line:

```
VITE_CLOUDINARY_CLOUD_NAME=b7ey3fox
```

Then:

```bash
npm run dev
```

Open http://localhost:5173.

**That one line is all you need** to build pages, edit captions, change styling, or
work on any zone. You do not need any password or API key for normal work.

`.env.local` is in `.gitignore`. Never remove it from there, and never commit the file.

---

## 3. Environment variables, and which are secret

| Variable | Secret? | Who needs it |
| --- | --- | --- |
| `VITE_CLOUDINARY_CLOUD_NAME` | No | Everyone. It is `b7ey3fox`, and it already appears in every image URL the site serves. |
| `CLOUDINARY_API_KEY` | Semi | Only for API uploads |
| `CLOUDINARY_API_SECRET` | **Yes** | Only Sangameshwar |
| `UPLOAD_ACCESS_TOKEN` | **Yes** | Only Sangameshwar |

The bottom two sign upload requests. Anyone holding them can write to our Cloudinary
account. Ask Sangameshwar directly if you genuinely need them — over a direct message,
never in a group chat, an issue, a commit, or this file.

Anything prefixed `VITE_` is compiled into the public JavaScript bundle and is readable
by anyone who opens the site. That prefix is the whole security boundary: never put a
secret behind it.

---

## 4. Adding or replacing images

**Use the Cloudinary web console.** This is the normal path and needs no credentials
beyond a console login.

Every image on the site currently shows a generated placeholder card. To replace one
with a real photograph:

1. Log in to Cloudinary → Media Library.
2. Find the folder, e.g. `museum/zone-1/indus-seals`.
3. Upload your photo and set its **public ID** to exactly the existing one, e.g.
   `indus-seal`. Confirm the overwrite.

The site picks it up immediately. **No code change, no redeploy, no rebuild** — the
page is already pointing at that ID.

Folder layout mirrors the routes one for one:

```
museum/home                     museum/zone-2/printing
museum/zone-1/ashokan-edicts    museum/zone-2/newspapers
museum/zone-1/indus-seals       museum/zone-2/telegraph
museum/zone-1/oral-traditions   museum/zone-2/telephone
museum/zone-1/postal-history    museum/zone-3/radio
museum/zone-4/activities        museum/zone-3/television
museum/about/team               museum/zone-3/satellites
museum/gallery                  museum/zone-3/digital-networks
```

Each zone area also has a `tile` image used on the home page, e.g.
`museum/zone-3/radio/tile`.

Guidelines: upload the largest version you have — the site resizes automatically and
never scales an image up. Use JPEG or PNG. Landscape, roughly 4:3, suits the exhibit
grid best.

---

## 5. Where to edit things

| I want to change… | Edit |
| --- | --- |
| A caption, date, or credit | `src/data/exhibits.ts` |
| A zone or section title | `src/data/zones.ts` |
| Colours, fonts, spacing | `src/index.css` |
| The home page | `src/pages/Home.tsx` |
| An exhibit page layout | `src/pages/AreaPage.tsx` |

**Exhibit text is curatorial.** It is transcribed from our Phase 4 label copy so the
captions on the site match the captions on the physical wall. If you change a date or
a credit, change it in both places.

Two rules we agreed on and should keep:

- Never claim a meaning for the Indus script. It is undeciphered, and the exhibition
  says so explicitly.
- A replica or model gets labelled as one. Several objects are team-made in 2026, and
  the date shown must not imply the object is antique. Follow the existing pattern:
  *"Reproduced 2026; telegraph service began in India in 1851."*

Routes are generated from `zones.ts`, so adding an area there creates its page
automatically. Add a matching key in `exhibits.ts`.

---

## 6. Before you push

```bash
npm run build
```

This runs TypeScript and the production build. If it fails locally it will fail on
Vercel. Pushing to `main` deploys automatically.

---

## 7. Troubleshooting

**Images show "IMAGE PENDING" cards.**
That is correct — those are placeholders for photographs we have not sourced yet.
Replace them per section 4.

**Images show "Image unavailable" instead.**
The asset is genuinely missing from Cloudinary, or `.env.local` is absent. Check that
the file exists and that you restarted the dev server afterwards — Vite reads env
files only at startup.

**Images broke after deploying.**
`VITE_CLOUDINARY_CLOUD_NAME` must be set in Vercel → Settings → Environment
Variables, *and* you must redeploy. Vite bakes env values in at build time, so saving
the variable alone changes nothing. A bundle built without it contains
`res.cloudinary.com/undefined/...`.

**`Cannot find module @rollup/rollup-linux-x64-gnu`.**
See the Windows/WSL warning in section 1.

**Refreshing a zone page gives a 404.**
Should not happen — `vercel.json` rewrites all non-API routes to `index.html`. If it
does, that file is missing or malformed.
