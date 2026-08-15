---
title: Dice & roll formulas
description: The formulas the OpenFray roll box understands — advantage, keep-highest, exploding dice — and how Dungeons and Dragons 5e effects are worked into a roll.
keywords:
  - Dungeons and Dragons 5e dice roller
  - DnD 5e dice formulas
  - 5e advantage dice
  - dice notation
---

The **dice bar** rolls anything by hand: type a formula like `2d6+3`, or tap a die. On a
laptop it sits along the bottom of the screen; on a phone it sits at the top of the
**Controls** screen. This page lists the formulas it understands and what OpenFray works
into a roll for you. Why the dice are fair, and where every roll is recorded, is
explained in [Honest dice](/docs/concepts/dice/).

## Rolling by hand

The box takes a formula and rolls it. Beyond `2d6+3`, it understands:

| Type this             | And you get                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `1d20+7`              | one die, plus a flat modifier                                          |
| `2d20adv` / `2d20dis` | roll two, keep the higher or lower; both are shown                     |
| `4d6kh3`              | roll four, keep the highest three (`kl` keeps the lowest)              |
| `2d6+1d4+2`           | as many dice and modifiers as you like, added together                 |
| `1d6!`                | exploding: a die landing on its highest face is rolled again and added |
| `1d6x10`              | multiply that group of dice, so a d6 gives 10, 20, 30 and so on        |

The **d20 d12 d10 d8 d6 d4** buttons beside the box are shortcuts for a single die, for
when someone just needs a number.

Every roll made here is written into the [game log](/docs/reference/game-log/), dice in
brackets, like every other roll.

## What's worked into a roll

Whatever is on a creature is worked into its rolls for you:

- **Advantage and disadvantage** from conditions and [effects](/docs/concepts/effects/)
  are applied. Both dice show in the box you rolled from and in the log, with the one
  that counted highlighted and the one it dropped dimmed beside it.
- **Bonuses and penalties** (Bless's +1d4, Bane's −1d4) are added and shown.
- **Critical hits** follow your campaign's
  [crit rule](/docs/guides/campaigns/#house-rules).
- A creature's **saves** include its bonuses, plus defenses like Magic Resistance and
  Evasion.

OpenFray rolls for creatures because it has their numbers. A player's rolls stay with
the player, and you type in the result. See
[Honest dice](/docs/concepts/dice/#players-roll-their-own).
