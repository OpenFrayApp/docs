// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// Load Fathom in production builds only (`astro build`), never on the dev server / localhost.
const isProd = process.argv.includes('build');
const fathomHead = isProd
  ? [
      {
        tag: /** @type {const} */ ('script'),
        attrs: {
          src: 'https://cdn.usefathom.com/script.js',
          'data-site': 'CZDKZIAS',
          defer: true,
        },
      },
    ]
  : [];

// The OpenFray handbook. Built separately (like the app under /console) and merged
// into dist/docs by scripts/assemble-site.mjs, so it lives at openfray.app/docs
// without touching the custom marketing homepage. `base` prefixes every route.
export default defineConfig({
  site: 'https://openfray.app',
  base: '/docs',
  server: { port: 4322 },
  integrations: [
    starlight({
      title: 'OpenFray Docs',
      description:
        'How OpenFray works — the DnD 5e combat console for Game Masters: encounters, effects, spells, the compendium, campaigns, and dice.',
      logo: {
        src: './src/assets/mark.svg',
        alt: 'OpenFray',
      },
      // Extends Starlight's built-in <head> (title, canonical, description, base OG and
      // Twitter tags) with the pieces it doesn't emit: og:image, the remaining Twitter
      // card tags, keywords, and JSON-LD structured data.
      components: {
        Head: './src/components/Head.astro',
      },
      // Fathom analytics — privacy-friendly, cookieless (same site id as the console
      // and marketing site), production only. The CSP in site/public/_headers already
      // allows cdn.usefathom.com across the whole deploy, including /docs.
      head: fathomHead,
      customCss: ['./src/styles/theme.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/OpenFrayApp',
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Overview', link: '/' },
            { label: 'Getting started', link: '/getting-started/' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            { label: 'Creatures, players & quick adds', link: '/concepts/combatants/' },
            { label: 'How effects work', link: '/concepts/effects/' },
            { label: 'Honest dice', link: '/concepts/dice/' },
            { label: 'Your account & what’s saved', link: '/concepts/account/' },
          ],
        },
        {
          label: 'Running a fight',
          items: [
            { label: 'Run rounds & turns', link: '/guides/encounters/' },
            { label: 'Resolve an attack', link: '/guides/attacks/' },
            { label: 'Roll saving throws', link: '/guides/saves/' },
            { label: 'Apply & manage effects', link: '/guides/effects/' },
            { label: 'Track concentration', link: '/guides/concentration/' },
            { label: 'Spend creature resources', link: '/guides/resources/' },
            { label: 'Cast a spell', link: '/guides/spells/' },
            { label: 'Handle death & dying', link: '/guides/death/' },
            { label: 'Rest & clear the board', link: '/guides/rests/' },
            { label: 'Share the player view', link: '/guides/player-view/' },
            { label: 'End the fight', link: '/guides/recap/' },
          ],
        },
        {
          label: 'Your library',
          items: [
            { label: 'Set up a campaign & house rules', link: '/guides/campaigns/' },
            { label: 'Build your own creatures & spells', link: '/guides/making-your-own/' },
            { label: 'Import from D&D Beyond', link: '/guides/importer/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'The tracker', link: '/reference/tracker/' },
            { label: 'The stat block', link: '/reference/stat-block/' },
            { label: 'The compendium', link: '/reference/compendium/' },
            { label: 'Dice & roll formulas', link: '/reference/dice/' },
            { label: 'The game log', link: '/reference/game-log/' },
            { label: 'Settings & appearance', link: '/reference/settings/' },
          ],
        },
        // The console and the marketing site live outside /docs. Starlight prefixes
        // `base` onto root-relative sidebar links, so these have to be full URLs.
        {
          label: 'OpenFray',
          items: [
            { label: 'Open the console', link: 'https://openfray.app/console/' },
            { label: 'Open the website', link: 'https://openfray.app/' },
          ],
        },
      ],
    }),
    // Emits /docs/sitemap-index.xml (base-prefixed), which Starlight's <head> already
    // links to. The marketing site emits its own sitemap at the domain root; robots.txt
    // points crawlers at both.
    sitemap(),
  ],
});
