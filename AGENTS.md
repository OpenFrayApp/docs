Guidance for AI agents (and humans) working on the OpenFray handbook. The
cross-repo agreements (code style, writing style, committing, working agreements)
live in the
[openfray repo's AGENTS.md](https://github.com/OpenFrayApp/openfray/blob/main/AGENTS.md).
The shared workspace is `/Users/nico/GitHub/openfray/openfray-app/`. Read its
`AGENTS.md` and `STYLE.md` before working here. For cross-repo work, read its
`CONTEXT-MAP.md`. Every published word follows this
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
- Click by role and name, not bare `text:`, on anything from a shared list row. `text:`
  needs an element whose own trimmed content matches exactly, and a count or a badge
  sitting beside the name as a sibling node (`Bellwright Acolyte ×2`) means no element's
  text is ever exactly the name alone. The click silently lands on nothing, and the step
  after it times out with no clue why. `role: button, name: …, exact: true` matches the
  accessible name instead, which the sibling doesn't touch.

### Captures that need an account

A recipe asks for a signed-in browser with `session: gm`. The session is declared in
`shotlist.config.yaml` under `site.sessions` and written by `npx shotlist --login gm`,
which opens a browser to sign in **by hand**, so no password goes anywhere near a config.
It lands in `.shotlist/gm.json`, which is gitignored and never committed: anyone holding
that file is signed in as that account. `verify` in the config is the account button, so
an abandoned sign-in fails the login instead of writing a session that quietly shoots the
anonymous console. When it expires, run `--login gm` again.

**One account serves both this repo and the site.** That is deliberate: the handbook's
captures and the site's marketing captures sign in as the same `gm` account, so its
fixture data belongs to both and to neither exclusively.

What is there, and whose it is:

| Fixture | Kept for |
| ------- | -------- |
| Three campaigns, three homebrew creatures, one homebrew spell, one saved encounter | the handbook |
| The sample party from `data/party.yaml` as saved characters (Zara, Mira, Tav, Ren) | the handbook |
| Four more saved characters (Bram Ironfist, Elowen Vale, Kessa Quick, Sister Mirad) | the site |
| The account's display name, and whatever is on the board | the site, mostly |

Fixture data is what makes these captures reproducible: almost every recipe only ever
*reads* it. Sharing one account is what makes that fragile, so:

- **Never clear the board, and never delete or rename anything you did not create.** The
  other side's work is live on this account and may be mid-fight on it. The two
  bulk-clear buttons take everything, which is somebody else's encounter as often as your
  own. When a capture needs something gone, take that one thing.
- **Fixtures are created once, by hand, outside any recipe**, the same way the campaigns
  and characters were seeded, never inside a recipe's own `setup`. A recipe that creates
  what it shoots leaves that behind for every later run to inherit, and the picture
  quietly changes each time. `import-json` pastes a stat block and never submits it,
  which is why it is the one exception that gets away with touching the form at all.
- **A recipe that must put something on the board owns taking exactly that back off.**
  The board is account state, not browser state: it syncs to whichever account is signed
  in, so it outlives the browser context a run closes at the end. `share-encounter-form`
  adds one creature and removes that one creature in its own `teardown`, addressing it by
  row (`button[aria-label="Remove <name>"]`), which raises no confirm and works whether or
  not a fight is running. Pick something unlikely to be on the board already: a row is
  addressed by name, so adding an Ogre to a board that has one makes the removal
  ambiguous. Teardown runs in the same browser after the shot, pass or fail, which is what
  makes any of this possible.
- **Expect the other side's fixtures to move.** A capture framing the character list or
  the publishing byline shows the site's fixtures too, so `--check` will flag it when the
  site changes them. That is the cost of one account, and it is a re-shoot, not a bug.
  Re-shoot against what is actually there rather than reaching for the other side's data
  to put it back.
- **The board is local-first, and closing the browser doesn't wait for it.** A removal
  renders at once but reaches the account through a debounced background save, and
  teardown's browser closes the instant its last step ends. A `wait` of a second or two
  after the clearing click is what lets the save actually leave before the tab does.
  Without it, the next run inherits whatever teardown thought it had removed.

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
