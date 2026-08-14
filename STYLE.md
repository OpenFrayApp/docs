# The teaching voice

How the handbook is written. Read the
[shared style core](https://github.com/OpenFrayApp/openfray/blob/main/STYLE.md)
first: the words table, the grammar, and the game-text mechanics live there. This
guide holds everything specific to teaching.

---

## The golden rule

> **We write for someone who is not technical, and who has never used OpenFray.**
> They need clear, complete, step-by-step instructions.

This is technical documentation. It is not a book, an essay, or a story about the app. Every
sentence exists to get a reader from "I don't know how to do this" to "done". If a sentence
does something else (sets a mood, admires the design, makes a joke), cut it.

Two working tests:

- **Could a first-time GM follow this page, alone, with the app open, and succeed?** If not,
  it needs more detail, not more polish.
- **Does the page still work with every image removed?** If not, the writing is doing too
  little. Images support the text; they never carry it.

**The handbook explains; it never sells.** No calls to action beyond "open the console", no
feature pitches, no comparisons with other tools. The persuading belongs to the site, and
its guide names the devices it may use that this register bans.

## Voice

- **Plain and direct.** High-school reading level is the ceiling for anything this repo
  ships; the handbook aims lower still, at middle school. Short words over long ones, one
  idea per sentence, and about 25 words at most.
- **Second person.** "You" is the reader; "OpenFray" is the app. Never "we" for the app.
- **Present tense.** "OpenFray rolls the save," not "OpenFray will roll the save."
- **Active voice.** "Click **Begin** to start the fight," not "The fight is started by
  clicking **Begin**." The one exception is not blaming the reader: "The file didn't
  import," not "You imported the wrong file."
- **Neutral.** No marketing language, no superlatives, no self-praise. Describe what the app
  does; let the reader decide if it's good.
- **No narration.** Don't set scenes, don't address the reader's feelings, don't editorialize
  about the table, the pizza, or the rules argument.

Before and after:

| Don't                                                                        | Do                                                                                           |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| "It's for the break, the rules argument, the pizza."                         | "Use **Pause** when the session stops for a break."                                          |
| "That's the deal with reminders: you get the memory, you keep the judgment." | "OpenFray shows the reminder. It doesn't apply any effect for you."                          |
| "This is the column you watch."                                              | "The tracker shows everyone in the fight, in initiative order."                              |
| "OpenFray helps you _run_ a spell without playing the rulebook at you."      | "Casting a spell rolls its dice, shows its card, and offers to add its effect to the board." |

Contractions are fine ("don't", "you'll"). They read naturally. Rhetorical questions and
mid-sentence asides are not. Write a second sentence instead.

---

## Page structure

### One page, one task

Each page covers one job: running a fight, applying an effect, building a creature. If a page
starts covering two unrelated jobs, split it and link between them. Readers land mid-site from
search, so every page must stand on its own.

### Anatomy of a page

1. **Frontmatter `title`** — sentence case, short enough to fit the sidebar, and identical to
   the sidebar label in `astro.config.mjs`.
2. **Frontmatter `description`** — one sentence saying what the page covers. It is the search
   and social preview; write it for someone deciding whether to click.
3. **Introduction** — two to four sentences, before the first heading: what this page covers
   and when you'd need it. Never open with a heading.
4. **`##` sections** — one topic each, in the order a reader does the work.
5. **A "Where to next" list** at the end of tutorial-style pages, linking the
   natural follow-ons.

### Headings

- Sentence case: "Adding an effect", not "Adding An Effect".
- Descriptive, not generic. "Effects a saving throw ends" beats "Details" or "More".
- Never put a heading immediately after another heading. Every section gets at least one
  introductory sentence before any list, table, or image.
- `##` and `###` only. If you need `####`, the page probably needs splitting.

### Introduce everything

Every document, every section, and every list gets an introduction. A list dropped in without
a lead-in line tells the reader nothing about why it's there. One sentence is enough.

### Lists

- **Numbered** when order matters (steps). **Bulleted** when it doesn't.
- One action per step. Start with the verb: "Click **Begin**." "Type the damage."
- Say what happens after an action when it isn't obvious: "Click **Start combat**. You're in
  round 1, at the top of the list."
- Keep a procedure to about seven steps. Longer means it's two procedures.
- Full sentences in a list end with a period; fragments don't. Be consistent within one list.
- If a sentence is turning into three or more comma-separated items, make it a list.

### Tables

Use a table when the reader is choosing between options, or looking up a value. Two to three
columns. Keep cells to a phrase or a short sentence. Don't use a table for a procedure.

### Walls of text

Break up any paragraph longer than about five lines. Use a list, a table, a subheading, or a
second paragraph.

---

## Referring to the interface

- **Bold the exact label**: **Add creature**, **Roll saves**, **Apply effect**. Copy the
  capitalization from the app. Don't "fix" it here.
- Bold is only for UI labels. Use italics for emphasis, sparingly.
- **Say where it is** the first time: "**Apply effect**, in the controls beside the stat
  block". A reader who can't find the button can't follow the step.
- Name icon-only controls by both icon and function: "the **campfire** (short rest)".
- Describe navigation as a path when it's more than one hop: "Open **Settings** (the gear at
  the top right), then tick the libraries your table uses."
- Don't describe screen positions that change on small screens without saying so.

---

## Screenshots and images

A screenshot supports the text. It never carries information the text leaves out.

**Rules:**

- **Write the instruction in full first.** The image confirms; it never carries information
  that isn't in the text. Screen-reader users and search engines get the text only.
- **Place the image below the step it illustrates**, never above.
- **One process per image.** More than about three steps in a single screenshot means two
  images.
- **Crop to what matters**, plus enough surroundings for the reader to recognize where they
  are. Include the top bar or the sidebar in the first screenshot of a new area, so the reader
  can navigate to it.
- **Capture in the app's default dark theme**, at 2× (Retina), with no browser chrome.
- **Annotate in bright red** (`#E5484A`): outlines, arrows, and short labels.
  Number the annotations when the surrounding text is a numbered list, and make the
  numbers match.
- **Use sample data.** No real names, emails, or anything you'd have to blur.
- **Use the current build.** Re-shoot when the UI changes; every capture is a shotlist
  recipe in this repo's `screenshots/` (see AGENTS.md), never a by-hand edit.

**Files:**

- Live in `src/assets/screens/`, referenced by relative path from the page.
- Kebab-case names that describe the content: `roll-initiative.png`, `death-save-row.png`.
  Never `screenshot-2026-07-24.png`.
- Only committed captures a page actually uses. Delete the ones a rewrite orphans.

**Alt text:**

- One sentence of maximum 150 characters, describing what the image shows and what
  is highlighted: "The Apply effect box, with its duration, condition, modifier and
  reminder sections outlined in red and numbered one to four."
- Don't start with "Image of" or "Screenshot showing".
- Don't restate the paragraph above it.
- Decorative images don't belong in the docs at all. If it's decorative, delete it.
- The alt text is the contract the capture has to keep; a re-shoot matches it or the
  text changes with the picture.

---

## Links

- **Descriptive link text.** Link the thing being linked to: "see
  [Campaigns & house rules]". Never "click [here]" or a bare "[read more]".
- **Internal links are absolute and end with a slash**, because the handbook is served under
  `/docs`: `/docs/concepts/effects/`, `/docs/getting-started/`. The console is `/console/`;
  the marketing site is `/`.
- **Anchors** are lowercase, hyphenated, and short. Don't repeat words already in the page
  path.
- **Link once per section**, on the first useful mention. Don't link the same page four times
  on one screen.
- **Link to the specific section** when the reader needs one part of a long page.
- **No redirects.** Link the final destination. Moving a page adds a `docsMoves` entry in
  the openfray repo's assemble script, in the same change.

---

## Callouts

Starlight asides. Use them for information that would otherwise interrupt
the flow. Always give a title in brackets. At most one per section, and never two in a row.

| Aside           | Use it for                                                            |
| --------------- | --------------------------------------------------------------------- |
| `:::note[…]`    | A fact worth stepping out of the flow for: a requirement, a limit.    |
| `:::tip[…]`     | A faster route the reader would otherwise miss.                       |
| `:::caution[…]` | Something that behaves differently than expected, or can't be undone. |
| `:::danger[…]`  | Data loss. Rare, and for deletion only.                               |

Recurring ones to keep worded identically wherever they appear:

- `:::note[Needs an account]` — the feature requires signing in.
- `:::note[Coming later]` — planned, not built.

---

## Accessibility

- Text must convey everything, with images removed.
- One `<h1>` per page (Starlight generates it from `title`); headings never skip a level.
- Don't rely on color, position, or shape alone: "the red outline" is fine as a description,
  but the text must also name the button.
- Link text makes sense read on its own, out of context.
- Tables get a header row and no merged cells.

---

## Before you publish

- [ ] The page covers one task, and its title says which.
- [ ] `title` and `description` are filled in; the sidebar label matches the title.
- [ ] The page opens with an introduction, and every section and list has a lead-in line.
- [ ] Steps are numbered, one action each, starting with a verb.
- [ ] Every UI label is bold and matches the app exactly.
- [ ] A first-time GM could follow it with the app open.
- [ ] It reads the same with every image removed.
- [ ] Screenshots are current, cropped, annotated in red, and have alt text.
- [ ] Links are descriptive, absolute, and resolve after the assembled build.
- [ ] Terminology matches the core's words table, especially **Game Master**, never DM.
- [ ] Nothing describes a feature that doesn't exist yet.
- [ ] `npm run format` is clean, and prose wraps at 90 columns.
