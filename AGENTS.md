Guidance for AI agents (and humans) working on the OpenFray handbook. The
cross-repo agreements (code style, writing style, committing, working agreements)
live in the
[openfray repo's AGENTS.md](https://github.com/OpenFrayApp/openfray/blob/main/AGENTS.md),
and every published word follows this
repo's [STYLE.md](./STYLE.md) (the teaching voice), built on the shared core in
that repo. **Read all three before writing here.** This file carries what is specific to this repo:
the handbook itself and the screenshot pipeline.

## What this repo is

The Starlight handbook served at `/docs` on [openfray.app](https://openfray.app),
built with `/docs/` as its base path so links and assets already point under it.
The handbook documents the console; a renamed label or moved control in the app is
a handbook change too, made in the same breath.

```bash
npm install
npm run dev        # localhost:4322/docs/
npm test           # the annotation scripts' suite
npm run build      # prose check, then astro build
```

Reorganizing handbook URLs needs redirects: the old-to-new map lives in the
openfray repo's `scripts/assemble-site.mjs` (`docsMoves`). Add an entry there in
the same change that moves a page.

## Screenshots

**Every capture in the handbook is a recipe.** They live in `screenshots/`: one YAML
file per picture, with the shared setup in `macros/` and the sample party and foes in
`data/`. `shotlist.config.yaml` at the root installs them under `src/assets/screens/`;
the site's marketing captures moved to the site repo, which has its own config. Run the
console, then:

| Command                         | What it does                                  |
| ------------------------------- | --------------------------------------------- |
| `npx shotlist`                  | list the recipes                              |
| `npx shotlist <name> --install` | re-shoot one and copy it where it belongs     |
| `npx shotlist --all --install`  | re-shoot everything                           |
| `npx shotlist --check`          | report the captures the app has moved on from |

A capture is data, so re-shooting a stale one is a command rather than an afternoon. If a
picture needs something the recipe vocabulary cannot say, that is a missing primitive in
[shotlist](https://github.com/SirDarcanos/shotlist). Add it there instead of an escape
hatch. Three rules the recipes rely on:

- Fill an initiative for **every** combatant, creatures included, or the console rolls
  theirs and the board reorders between runs.
- A shot framing live dice or the fight clock can never match itself. Prefer masking the
  random part with `check.ignore` over `check: false`, and mask **the whole column it
  sits in** rather than the one row: a total one digit wider re-wraps its row and moves
  every line under it, which is what made `dice-log` pass or fail at random.
- Blur after typing. A `fill` leaves a caret and a focus ring that do not render the same
  way twice; `optional: [{ blur: { css: ':focus' } }]` is the guard.

### Captures that need an account

A recipe asks for a signed-in browser with `session: gm`. The session is declared in
`shotlist.config.yaml` under `site.sessions` and written by `npx shotlist --login gm`,
which opens a browser to sign in **by hand**, so no password goes anywhere near a config.
It lands in `.shotlist/gm.json`, which is gitignored and never committed: anyone holding
that file is signed in as that account. `verify` in the config is the account button, so
an abandoned sign-in fails the login instead of writing a session that quietly shoots the
anonymous console. When it expires, run `--login gm` again.

The account behind it is a dedicated docs account holding **fixture data**, not anybody's
game: three campaigns, the sample party from `data/party.yaml` as saved characters, three
homebrew creatures and one homebrew spell. That is what makes these captures
reproducible: the recipes only ever *read* it. Two rules follow:

- **Never let a recipe create, rename or delete account data.** shotlist has no teardown
  and cannot accept a `window.confirm`, so anything a run creates accumulates on every
  later run and the picture changes. `import-json` pastes a stat block and never submits
  it, which is why it is safe.
- **Never seed the board on a `gm` recipe.** A signed-in board syncs to the account, so
  the next run would seed on top of the last one. Leave that account's board empty.

Account data arrives after first paint, so wait for it by name (`wait: { text: Zara }`)
rather than for the control that will hold it. The picker renders "No saved characters
yet" until it lands.

### Captures with no recipe

Six stay by-hand, because they need something the pipeline cannot do at all:

- **A native dropdown**: `campaign-picker` shows the active-campaign `<select>` open, and
  the operating system draws that list outside the page. Shooting it closed does not work
  either. The mark lands on a box that never paints, because a `<select>`'s text content
  includes every option, so the smallest element matching the selected text is an
  `<option>`. It needs a query primitive shotlist does not have.
- **Motion**: `reorder-combatants` and `use-reaction` are GIFs, and shotlist takes
  stills.
- **The browser extension**: `importer-browser-pin`, `importer-options`, and
  `importer-popup` picture the importer's own UI around the console.

The handbook's videos in `public/videos/` are recorded by
`scripts/record-guide-videos.mjs`, one scene per file, from the running console; a
UI change re-records a scene the same way a recipe re-shoots a still.

The scripts in `scripts/` draw the red callouts onto captures
(`docs-screenshot-annotations.mjs` for the pipeline, `annotate-screenshot.mjs` for
the rare by-hand capture); `tests/` covers the drawing. Never edit a screenshot by
hand, and never commit one whose recipe can't reproduce it.

## Working here

- Each page's screenshot alt text is the contract the picture has to keep; keep
  them in step.
- Commit subjects use the `Docs:` area; the full committing and PR agreements are
  in the parent repo's AGENTS.md.
