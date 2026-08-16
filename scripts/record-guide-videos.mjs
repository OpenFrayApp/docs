/**
 * Record the handbook's guide videos from the running console.
 *
 *   node scripts/record-guide-videos.mjs set-concentration
 *   node scripts/record-guide-videos.mjs type-hit-points
 *
 * Writes public/videos/<scene>.mp4 and its poster <scene>.jpg. The console must be
 * running (npm run dev in the console repo, port 5199), and ffmpeg must be on PATH.
 *
 * The page is rendered at CSS zoom 2 inside a doubled viewport, so the recording
 * carries retina-density pixels; every crop is measured from the live layout. A dot
 * cursor is injected because a headless recording has no pointer to follow.
 */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';

const URL = 'http://localhost:5199/console/';
const OUT = 'public/videos';
const SIZE = { width: 2880, height: 1800 };

/** Playwright, resolved the way shotlist resolves it: the project, then the npx cache. */
function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = ['playwright', 'playwright-core'];
  try {
    for (const dir of readdirSync(join(homedir(), '.npm', '_npx'))) {
      candidates.push(join(homedir(), '.npm', '_npx', dir, 'node_modules', 'playwright'));
    }
  } catch {
    // No npx cache; the plain specifiers may still resolve.
  }
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      continue;
    }
  }
  throw new Error('Playwright is not installed. Install it with: npm i -D playwright');
}

/** A visible cursor: a dot that follows the mouse, pulsing on every press. */
async function injectCursor(page) {
  await page.evaluate(() => {
    const dot = document.createElement('div');
    dot.style.cssText =
      'position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;' +
      'border-radius:50%;background:rgba(255,255,255,.85);border:2px solid rgba(2,6,23,.9);' +
      'box-shadow:0 0 6px rgba(0,0,0,.6);pointer-events:none;z-index:99999;' +
      'transition:transform 80ms';
    document.body.append(dot);
    document.addEventListener('mousemove', (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    });
    document.addEventListener('mousedown', () => (dot.style.transform = 'scale(0.6)'));
    document.addEventListener('mouseup', () => (dot.style.transform = 'scale(1)'));
  });
}

/** Move the mouse to an element in a glide, so the eye can follow it. */
async function glide(page, locator) {
  const box = await locator.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 30 });
  await page.waitForTimeout(250);
}

async function press(page, locator) {
  await glide(page, locator);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
  await page.waitForTimeout(350);
}

async function addQuickAdd(page, name, ac, hp) {
  await page.getByRole('button', { name: 'Quick add', exact: true }).click();
  await page.getByLabel('Quick add name').fill(name);
  await page.getByLabel('AC', { exact: true }).fill(String(ac));
  await page.getByLabel('Max HP').fill(String(hp));
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.waitForTimeout(200);
}

async function addCreature(page, name) {
  await page.getByRole('button', { name: 'Add creature', exact: true }).click();
  await page.getByPlaceholder('Search creatures…').fill(name);
  await page.waitForTimeout(350);
  await page
    .getByRole('button', { name: new RegExp('^' + name) })
    .first()
    .click();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
}

/**
 * The Concentrate control in use: name the spell, set it, and end it, with the log
 * writing both lines. Cropped to the controls-and-log column.
 */
async function setConcentration(page) {
  await addQuickAdd(page, 'Zara', 15, 33);
  await addCreature(page, 'Young Black Dragon');
  await page.getByRole('button', { name: 'Begin' }).click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Start combat' }).click();
  await page.waitForTimeout(600);
  await page.getByText('Young Black Dragon').first().click();
  await page.waitForTimeout(400);

  const aside = page.locator('aside');
  const box = await aside.boundingBox();
  // The column runs the full window; the story fits in its top stretch.
  const crop = { ...box, height: Math.min(box.height, 1000) };

  const from = seconds();
  await press(page, page.getByRole('button', { name: 'Concentrate' }));
  await page.keyboard.type('Darkness', { delay: 110 });
  await page.waitForTimeout(300);
  await press(page, page.getByRole('button', { name: 'Set', exact: true }));
  await page.waitForTimeout(1800);
  await press(page, page.getByRole('button', { name: 'End concentration' }));
  await page.waitForTimeout(1600);
  return { crop, from };
}

/**
 * Hit points typed into the rows: damage with -4, set outright with a number, heal
 * back with +9. Cropped to the tracker's rows, and staged like the old tint still.
 */
async function typeHitPoints(page) {
  await addQuickAdd(page, 'Bandit', 12, 5);
  await addCreature(page, 'Mage');
  await addQuickAdd(page, 'Cultist', 13, 23);

  // The HP total is the row's one button without an accessible name (see the
  // set-hp macro), so it is found by its shape.
  const row = (name) =>
    page.locator('li, div').filter({ hasText: name }).filter({ hasText: /AC \d/ }).last();
  const hp = (name) =>
    row(name).locator('button:not([aria-label])').filter({ hasText: /^\d+$/ }).first();
  const type = async (name, text) => {
    await press(page, hp(name));
    await page.keyboard.type(text, { delay: 140 });
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
  };

  const first = await row('Bandit').boundingBox();
  const last = await row('Cultist').boundingBox();
  const crop = {
    x: 24,
    y: first.y - 90,
    width: first.x + first.width + 24 - 24,
    height: last.y + last.height + 24 - (first.y - 90),
  };

  const from = seconds();
  await type('Bandit', '-4');
  await type('Mage', '-9');
  await type('Mage', '+9');
  await type('Cultist', '18');
  await page.waitForTimeout(900);
  return { crop, from };
}

const SCENES = { 'set-concentration': setConcentration, 'type-hit-points': typeHitPoints };
const name = process.argv[2];
if (!SCENES[name]) {
  console.error(`Give a scene to record: ${Object.keys(SCENES).join(', ')}`);
  process.exit(1);
}

const dir = mkdtempSync(join(tmpdir(), 'guide-video-'));
const browser = await loadPlaywright().chromium.launch();
const context = await browser.newContext({
  viewport: SIZE,
  colorScheme: 'dark',
  recordVideo: { dir, size: SIZE },
});
// The tape runs from here; scenes stamp where their staging ends, and the encode
// starts the cut a touch earlier.
const started = Date.now();
const seconds = () => Math.max(0, (Date.now() - started) / 1000 - 0.4);
const page = await context.newPage();
await page.goto(URL, { waitUntil: 'load' });
await page.waitForSelector('button:has-text("Add creature"):visible');
await page.waitForTimeout(800);
await page.evaluate(() => (document.body.style.zoom = '2'));
await injectCursor(page);
await page.waitForTimeout(400);

const { crop, from } = await SCENES[name](page);
const video = page.video();
await context.close();
await browser.close();
const webm = await video.path();

// Whole, even pixels: yuv420p halves chroma, so an odd crop shifts every color.
const even = (v) => 2 * Math.floor(v / 2);
const rect = `${even(crop.width)}:${even(crop.height)}:${even(crop.x)}:${even(crop.y)}`;
execFileSync('ffmpeg', [
  '-y',
  '-i',
  webm,
  '-ss',
  String(from),
  '-vf',
  `crop=${rect}`,
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  '20',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-an',
  `${OUT}/${name}.mp4`,
]);
execFileSync('ffmpeg', [
  '-y',
  '-sseof',
  '-0.6',
  '-i',
  `${OUT}/${name}.mp4`,
  '-frames:v',
  '1',
  '-q:v',
  '3',
  `${OUT}/${name}.jpg`,
]);
rmSync(dir, { recursive: true, force: true });
console.log(`${OUT}/${name}.mp4 (${even(crop.width)}×${even(crop.height)}) and its poster written`);
