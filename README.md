# OpenFray handbook

The Starlight handbook served at [openfray.app/docs](https://openfray.app/docs/):
how the console works, from the first fight to every reference table, written for
players and Game Masters.

This repo is one part of OpenFray. The console and the website live in their own
repos, and [openfray](https://github.com/OpenFrayApp/openfray) ties the
three together into the single deploy that serves the domain. This repo works on its own: clone it, install, and run.

## Running it

```bash
npm install
npm run dev
```

The handbook builds with `/docs/` as its base path; the parent repo's assembly
step copies it into the deployed site. `npm test` covers the annotation scripts.

## Screenshots

Every capture in the handbook (and the site's hero shots) is a
[shotlist](https://github.com/SirDarcanos/shotlist) recipe in `screenshots/`. Run
the console, then `npx shotlist <name> --install` re-shoots one and copies it where
it belongs; `npx shotlist --check` reports the captures the app has moved on from.
The site's marketing captures live in the site repository's own screenshot pipeline.
The scripts in `scripts/` draw the red callouts onto handbook captures. Never edit a
screenshot by hand.

## Before contributing

Use the shared
[Contributor workflow](https://github.com/OpenFrayApp/openfray/blob/main/docs/development/contributor-workflow.md),
[Verification commands](https://github.com/OpenFrayApp/openfray/blob/main/docs/development/verification.md),
and [Repository file policy](https://github.com/OpenFrayApp/openfray/blob/main/docs/development/repository-files.md)
for branch targets, check scope, and private local files.

Read [AGENTS.md](./AGENTS.md). Every published word follows the parent repo's
STYLE.md.

## License

[AGPL-3.0-or-later](./LICENSE).
