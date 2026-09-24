# Release 1.3.0 capture audit

This inventory tracks the captures referenced by the handbook for
[docs#5](https://github.com/OpenFrayApp/docs/issues/5).

## Capture source

The initial console source was `d7d5ed57a3371347799b4ce2d7ef97f4eb4e67cd`, pinned by
the parent repository’s `develop` commit `7ba53c795289aaf39ef1d34bb17d96471d6ee534`.

The desktop-width follow-up uses console commit
`32ba9c1af84e7eb2709b4b4ffd66e3225f353021`, which makes tablet Search icon-only.
This follow-up commit is not yet pinned by the parent. Captures use
`http://localhost:5199/console/`, the default dark theme, and the configured 2× scale.
The two videos retain their initial capture source.

Signed-in recipes use the dedicated Discord capture account, `sirdaniel`, through
`.shotlist/gm.json`. That file is private and untracked. The saved session was verified
in a fresh browser context before captures resumed.

The character-picker recipe no longer clears the shared board. The encounter-sharing
recipe adds one Awakened Shrub and removes that creature during teardown. Its removal
target was absent before the run. No campaign, saved character, homebrew template, or
saved encounter was edited or deleted. The publishing form was never submitted.

## Coverage

The handbook references 79 images: 73 recipe PNGs, four manual PNGs, and two GIFs.
It also references three MP4 videos and their three JPEG posters. Every referenced
asset appears below. Image paths are relative to `src/assets/screens/`; video paths
are relative to `public/videos/`. Page paths are relative to `src/content/docs/`.

All 73 recipes were run against the pinned console. Stale selectors were updated for
numbered creatures, drag buttons, the import dialog, and the log column. Initiative
fields now match exact names, including Goblin Minion 1. The saved-encounter recipe
succeeded on retry after a detached-element failure.

The two supported video scenes, `set-concentration` and `type-hit-points`, were
recorded again with their posters. The remaining manual assets are retained with
explicit exceptions below.

| Page                         | Recipe PNGs                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `getting-started.md`         | `layout`, `phone-layout`, `tablet-layout`, `add-buttons`, `begin`, `roll-initiative`                                     |
| `concepts/account.md`        | `sign-in`, `profile-panel`                                                                                               |
| `concepts/combatants.md`     | `add-creature-dropdown`, `add-pc-dropdown`, `add-pc-dropdown-signedin`, `add-npc-dropdown`, `creature-duplicate-renamed` |
| `concepts/dice.md`           | `dice-log`                                                                                                               |
| `concepts/effects.md`        | `effect-badge`                                                                                                           |
| `guides/attacks.md`          | `attack-resolve`, `attack-advantage`, `immunity-damage`                                                                  |
| `guides/campaigns.md`        | `campaign-form`, `campaigns-tab`, `campaign-notes`                                                                       |
| `guides/concentration.md`    | `keep-concentration`                                                                                                     |
| `guides/death.md`            | `death-save-row`, `death-saves`, `dead-combatants`                                                                       |
| `guides/effects.md`          | `apply-effect`, `add-bous-penalty-effect`, `example-reckless`, `example-reminder`, `applied-effects`, `effect-counter`   |
| `guides/encounters.md`       | `encounter-difficulty`, `turn-controls`, `fight-timer`, `drag-handle`, `end-combat-alert`                                |
| `guides/importer.md`         | `import-json` (also used in `guides/making-your-own.md`)                                                                 |
| `guides/making-your-own.md`  | `custom-creature`, `custom-spell`, `import-json`                                                                         |
| `guides/player-view.md`      | `player-view-panel`                                                                                                      |
| `guides/publish-creature.md` | `share-creature-button`                                                                                                  |
| `guides/publishing.md`       | `share-encounter-form`, `save-share-buttons` (also used in `guides/saving.md`)                                           |
| `guides/recap.md`            | `recap`                                                                                                                  |
| `guides/resources.md`        | `legendary-actions`, `lair-toggle`, `legendary-resistance`, `effect-legendary-resistance`, `spent-recharge-ability`      |
| `guides/rests.md`            | `rest-buttons`, `short-rest`, `clear-board`                                                                              |
| `guides/saves.md`            | `save-resolve`, `magic-resistance`, `group-save`                                                                         |
| `guides/saving.md`           | `save-share-buttons`, `saved-encounter-card`                                                                             |
| `guides/spells.md`           | `cast-spell`, `cast-spell-modal`, `gm-cast-spell`, `game-log-spell-casted`                                               |
| `reference/compendium.md`    | `compendium`, `library-badges`, `characters-tab`                                                                         |
| `reference/game-log.md`      | `game-log-modal`                                                                                                         |
| `reference/keyboard.md`      | `keyboard-help`                                                                                                          |
| `reference/settings.md`      | `rule-sets`, `settings-panel`, `creature-labels`, `player-view-settings`, `keyboard-settings`, `theme-toggle`            |
| `reference/stat-block.md`    | `stat-block-full`                                                                                                        |
| `reference/tracker.md`       | `tracker-row`                                                                                                            |

## Visual review

Every PNG was inspected in labeled contact sheets. Corrected captures were inspected
again individually. The review covered content, crop, callouts, and the referenced
page’s alt text. Full-header captures show Search: the desktop layout, tablet layout,
phone layout (magnifying-glass button), compendium, and creature dropdown.
Close crops of individual controls intentionally omit unrelated header controls.

All desktop recipes use 1800 CSS pixels of width; their heights vary with the crop.
Only `tablet-layout` (1180×820) and `phone-layout` (375×812) use smaller viewports.
The tablet header fits one row with icon-only Search; its tracker scrolls while the
controls and log sit below. The phone has the stacked header and bottom navigation.
The sign-in capture has no annotation, and its alt text describes the unmarked page.
Its crop includes the whole wordmark and the sign-in content. The concentration-check
crop includes the full control cluster.

The import and campaign-form recipes wait for Saved or Saving elsewhere before opening.
Account recovery otherwise can restore the view after the form opens and erase its
sample text. A populated-field check now rejects an empty capture.

The Save and Share callouts were separated and their buttons outlined. Alt text now
matches numbered goblins, the attack result without assuming a hit, and the tracker’s
actual outlines. The cleanup instructions now name the trash can shown in the capture.

Both refreshed videos were inspected through sampled frames spanning their actions.
The hit-point scene shows damage, healing, and an absolute value. The concentration
scene shows setting Darkness, ending it, and both log entries. Their crops exclude
the header. The old animations and attack video were also inspected through sampled
frames; this does not certify them as current captures.

## Retained assets and blockers

These assets were inspected but were not refreshed. They remain release exceptions.
No music captures were introduced.

| Asset                                            | Page                      | Status and required follow-up                                                                                                                         |
| ------------------------------------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `campaign-picker.png`                            | `guides/campaigns.md`     | Stale footer and campaign names. Requires a native-dropdown capture outside shotlist; the operating system paints the open menu.                      |
| `importer-browser-pin.png`                       | `guides/importer.md`      | Retained Chrome extension menu. Requires the installed importer and browser-chrome capture; the console commit does not pin the extension.            |
| `importer-options.png`                           | `guides/importer.md`      | Retained three-toggle options panel. Requires an importer build and extension capture.                                                                |
| `importer-popup.png`                             | `guides/importer.md`      | Retained importer result with Copy JSON and Download .json. Requires an importer build and source fixture. The creature heading is partially clipped. |
| `reorder-combatants.gif`                         | `reference/tracker.md`    | Retained drag animation. Shotlist captures stills; the video recorder has no reorder scene.                                                           |
| `use-reaction.gif`                               | `guides/resources.md`     | Retained reaction toggle animation. Its controls predate the current layout; the recorder has no reaction scene.                                      |
| `attack-resolution.mp4`, `attack-resolution.jpg` | `guides/attacks.md`       | Stale header without Search. The recorder only implements concentration and hit-point scenes; an attack scene or manual recording is required.        |
| `set-concentration.mp4`, `set-concentration.jpg` | `guides/concentration.md` | Refreshed and reviewed.                                                                                                                               |
| `type-hit-points.mp4`, `type-hit-points.jpg`     | `reference/tracker.md`    | Refreshed and reviewed.                                                                                                                               |

## Verification

The handbook test suite and build passed. The installed test runner reports ten passing
tests, including a duplicate five-test suite in a local worktree. This repository has
no separate typecheck script; the Astro build generated its content types. Recipe lint
passed for all 87 recipe, macro, and data files.

The initial `npx shotlist --check --diff --keep-going` passed: 68 recipes matched,
five were skipped, and none failed. The desktop-width comparison matched 65 recipes
and skipped five. Campaign-form and import readiness timed out; sign-in compared against
the crop revised during the run. All three targeted follow-up checks passed after the
readiness and crop corrections, covering all 68 comparable recipes. Existing region masks exclude variable dice and clocks in nine recipes.
Five existing recipes disable pixel comparison because they contain variable results: `attack-resolve`, `game-log-modal`,
`immunity-damage`, `magic-resistance`, and `recap`. Their captures were reviewed visually.

The independent standards review found no new recipe or prose violations. It identified
the stale retained captures as unresolved standards exceptions and noted the clipped
importer heading. The spec review identified two prose corrections: the game-log page’s
cleanup icon and the combatants page’s list of derived numbers. Both were corrected.

The desktop-width follow-up passed standards and spec reviews with no findings.
Console validation passed 3,482 unit tests, 31 browser tests, writer-identity checks,
lint, and typechecking. Header screenshots were inspected at widths 820, 1025, 1180,
and 1800. The 1180px header stays on one row; the 1025px header still wraps naturally.

This audit does not declare the retained assets current or the release ready.
