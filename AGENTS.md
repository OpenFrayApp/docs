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

**Every capture in the handbook and on the site is a recipe.** They live in
`screenshots/`: one YAML file per picture, with the shared setup in `macros/` and
the sample party and foes in `data/`. `shotlist.config.yaml` at the root maps where
captures install: the handbook's under `src/assets/screens/`, and six site recipes
into a `site` clone sitting beside this repo. Run the console, then:

| Command                         | What it does                                  |
| ------------------------------- | --------------------------------------------- |
| `npx shotlist`                  | list the recipes                              |
| `npx shotlist <name> --install` | re-shoot one and copy it where it belongs     |
| `npx shotlist --all --install`  | re-shoot everything                           |
| `npx shotlist --check`          | report the captures the app has moved on from |

A capture is data, so re-shooting a stale one is a command rather than an afternoon. If a
picture needs something the recipe vocabulary cannot say, that is a missing primitive in
[shotlist](https://github.com/SirDarcanos/shotlist). Add it there instead of an escape
hatch. Two rules the recipes rely on:
fill an initiative for **every** combatant, creatures included, or the console rolls
theirs and the board reorders between runs; and a shot framing live dice or the fight
clock takes `check: false`, because it can never match itself.

Thirteen captures still have no recipe, because they need something the pipeline
cannot stage anonymously. They stay by-hand until it can:

- **A signed-in account**: `add-pc-dropdown-signedin`, `campaign-form`,
  `campaign-picker`, `campaigns-tab`, `characters-tab`, `custom-creature`,
  `custom-spell`, and `import-json`.
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
