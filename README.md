# OpenFray handbook

The Starlight handbook served at [openfray.app/docs](https://openfray.app/docs/):
how the console works, from the first fight to every reference table, written for
players and Game Masters.

This repo is one part of OpenFray. The console and the website live in their own
repos, and [openfray.app](https://github.com/OpenFrayApp/openfray.app) ties the
three together into the single deploy that serves the domain. This repo works on its own: clone it, install, and run.

## Running it

```bash
npm install
npm run dev
```

The handbook builds with `/docs/` as its base path; the parent repo's assembly
step copies it into the deployed site.

## Before contributing

Read [AGENTS.md](./AGENTS.md). Every published word follows the parent repo's
STYLE.md.

## License

[AGPL-3.0-or-later](./LICENSE).
