/**
 * Renders the Zone 4 station cards in scripts/activity-cards/ to PNG masters
 * in activity-img/.
 *
 * Headless Chrome is the renderer because the cards are HTML and CSS: no
 * image library in the dependency tree draws text this well, and the same
 * files can be opened in a browser and printed for the physical table.
 *
 * The cards are laid out at 1000x750 CSS px and shot at device scale 2, so a
 * master is 2000x1500 -- the 4:3 the exhibit grid wants, and enough pixels
 * for A5 landscape at roughly 340 dpi.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const CARDS = ['decode-the-symbol', 'sign-your-name-in-morse', 'the-2050-wall'];

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome or Edge binary found. Checked:\n  ' + CHROME_CANDIDATES.join('\n  '));
  process.exit(1);
}

const outDir = resolve('activity-img');
mkdirSync(outDir, { recursive: true });

// Chrome refuses to write a screenshot next to a profile it does not own, and
// reuses a running instance unless given its own user-data-dir.
const profile = resolve('node_modules/.cache/card-render-profile');
rmSync(profile, { recursive: true, force: true });
mkdirSync(profile, { recursive: true });

for (const card of CARDS) {
  const src = resolve('scripts/activity-cards', `${card}.html`);
  if (!existsSync(src)) {
    console.error(`Missing source: ${src}`);
    process.exit(1);
  }
  const out = join(outDir, `${card}.png`);

  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=2',
      '--window-size=1000,750',
      `--user-data-dir=${profile}`,
      // Gives the webfonts and the chart script time to settle before the
      // frame is captured; without it the shot can land on fallback faces.
      '--virtual-time-budget=6000',
      `--screenshot=${out}`,
      `file:///${src.replaceAll(String.fromCharCode(92), '/')}`,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );

  if (!existsSync(out)) {
    console.error(`FAILED: ${card} produced no file`);
    process.exit(1);
  }
  console.log(`rendered  ${card}.png  (${(statSync(out).size / 1024).toFixed(0)} KB)`);
}

rmSync(profile, { recursive: true, force: true });
console.log(`\n${readdirSync(outDir).length} file(s) in activity-img/`);
