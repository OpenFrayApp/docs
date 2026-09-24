---
title: Your account & what's saved
description: What works in the OpenFray combat console without an account, what signing in adds, where your Dungeons and Dragons 5e game is stored, and how to delete it all.
keywords:
  - OpenFray account
  - save Dungeons and Dragons 5e encounters
  - DnD 5e combat console sign in
  - sync fights across devices
---

Running a fight needs no account at all. Signing in is free, and it adds everything
OpenFray has to store for you: fights that sync between devices, campaigns and house
rules, saved characters, homebrew and imported creatures, your own presets, and a named
player-view link. This page explains where your game lives in each case, and how to
delete it.

## Without an account

Open [the console](/console/) and run a fight straight away. The whole fight works:
creatures from the built-in books, players, initiative, effects, spells, group saves,
dice, and the compendium.

Your fight is held **in that browser tab**. Reload the page, or recover from a browser
crash, and the fight is still there. Close the tab on purpose and the fight is gone.
This is deliberate: nothing of yours sits on a server you never asked to use. OpenFray
warns you before you close a tab with a fight in it.

You can also share a read-only [player view](/docs/guides/player-view/) with your table
without an account. The shared view is stored on no server either way. It reaches your
players' screens as the board changes and is kept nowhere.

A handful of things do stick around on your own device without an account: your
[library choices](/docs/reference/settings/#libraries), your keyboard shortcuts, your
choice of light or dark mode, and the link your player view uses, plus the
[PIN](/docs/guides/player-view/#lock-it-with-a-pin) locking it and the
[backdrop](/docs/guides/player-view/#put-a-backdrop-behind-it) behind it. All of those
belong to the browser rather than to you, so another computer starts fresh.

## Signing in

Sign in with **Discord** or **Google**. It's free, and the first time you sign in an
account is created for you. Tick the box to accept the
[terms](https://openfray.app/terms) and the
[privacy policy](https://openfray.app/privacy) first: creating the account is what
accepts them, and the sign-in screen is the last place to ask before Discord or Google
takes over. You need to be 13 or older.

From then on, these follow you between devices:

| What                              | Why you'd want it                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| **The fight you're running**      | close the laptop mid-session, pick it up next week exactly where you left off        |
| **Creatures and spells you make** | your homebrew and imports, in your own library                                       |
| **Characters**                    | build the party once instead of retyping them each session                           |
| **Campaigns**                     | your table's [house rules](/docs/guides/campaigns/) and private notes on the game    |
| **Your player-view link**         | name it something your table remembers, and keep it between sessions                 |
| **Saved fights**                  | keep a board [as it stands](/docs/guides/saving/) and come back to it                |
| **What you've published**         | the [links you've handed out](/docs/guides/publishing/), and a way to take them down |

Saving happens in the background while you play. You never wait for it, and there's no
save button. Saving a fight to come back to later is a different thing, with its own
button: see [Save a fight for later](/docs/guides/saving/).

Nothing you did before signing in is thrown away. The fight on your board stays put.

Signing out is the one place that isn't symmetrical. The player-view link's name belongs
to the account, so signing out stops the share and mints a fresh anonymous link in its
place. Anyone holding the old one is left behind. See
[Naming the link](/docs/guides/player-view/#naming-the-link).

## Checking save status

The colored dot after the **Settings** gear shows the board’s save status. Hover over it,
focus it with the keyboard, or tap it to read the message:

- Green: **Saved**.
- Amber: **Saving** or **Saving elsewhere**.
- Gray: **Offline** or **Sign in to resume saving**.
- Red: **Save failed** or **Copies need attention**.

The same popover offers the actions available for that state: **Sign in**, **Retry saving**,
**Download recovery copy**, **Take over saving**, or **Resolve copies**. Press **Escape**
or click outside it to close it.

## Your profile

Click your **account**, then **Profile**. It shows the email you signed in with and how
(Google or Discord; OpenFray never sees your password either way), and holds two
settings beyond deleting the account, covered next.

![The Profile panel: the signed-in email and provider, the display name field holding a
name, and the default-license dropdown, its email masked.](../../../assets/screens/profile-panel.png)

- **Display name** is what appears in two places: the **Run by** line on your
  [player view](/docs/guides/player-view/#what-your-players-see), and the byline on
  anything you [publish](/docs/guides/publishing/). It starts as whatever your sign-in
  provider handed over, and leaving it blank publishes and shares anonymously instead.
- **Default license for shared encounters** is what the
  [publish dialog](/docs/guides/publishing/#licenses-and-what-they-cover)'s license field
  starts on, so a Game Master who always publishes under the same terms doesn't pick them
  every time. Changing it here changes nothing you've already published; it's only where
  the next one starts.

## Deleting everything

In **Profile**, **Delete account** removes your account and everything attached to it:
your fights, creatures, spells, characters, and campaigns. Anything you published comes
down with it, and anyone holding one of those links will find it gone. You're asked to
type your email to confirm.

:::danger[Deleting is permanent]
Deleting your account cannot be undone, and nothing is kept. If you sign back in later
with the same Google or Discord account, a fresh account is created.
:::
