---
title: Honest dice
description: How the OpenFray combat console rolls Dungeons and Dragons 5e dice — a secure random generator, no tampering, every roll written down, and players rolling their own.
keywords:
  - fair virtual dice
  - Dungeons and Dragons 5e dice roller
  - DnD 5e roll log
  - random dice generator
---

Three rules govern every die OpenFray rolls: the rolls are truly random, every roll is
written down, and a player's dice are never rolled automatically. This page explains
each one. The formulas the roll box understands are in
[Dice & roll formulas](/docs/reference/dice/).

## Fair rolls

OpenFray uses your browser's built-in secure random generator, the same kind used for
things like passwords. Every number is equally likely, every time.

:::note[No "lucky" dice]
Some apps quietly nudge the dice so your luck "feels" more even, with fewer long streaks
of bad rolls. OpenFray never does that. Real dice have streaks, and so do these. What
you roll is what you get.
:::

## Every roll is written down

Every roll goes through the same place: attacks, saves, checks, damage, and initiative.
Each one is written into the **log** on the right, showing the dice that were rolled, in
brackets, and what was added to them. Nothing is rolled in secret, and anyone at the
table can check how a number came to be.

![The dice bar at the bottom of the screen and a log entry reading "1d20 [16] +2", both outlined in red and labeled.](../../../assets/screens/dice-log.png)

Rolls you make by hand from the dice bar land in the log too. The full history, grouped
by round, is covered in [The game log](/docs/reference/game-log/).

## Rolls know about effects

Whatever is on a creature is worked into its rolls for you: advantage and disadvantage
from [effects](/docs/concepts/effects/), bonuses and penalties like Bless's +1d4, a
campaign's [crit rule](/docs/guides/campaigns/#house-rules), and save bonuses such as
Magic Resistance and Evasion. When advantage is involved, both dice are shown, with the
one that counted highlighted and the other dimmed beside it.

## Players roll their own

OpenFray rolls for creatures because it has their numbers. It never rolls a player's
attack, save, or check on its own. Those dice belong to the player, and you type in the
result. Wherever a box resolves rolls for a mixed group, the creatures are rolled for
you and each player gets a field for what they rolled.

You can still choose to roll for a player from the console when they can't. Leave a
player's box blank in the [Roll initiative box](/docs/getting-started/#start-the-fight)
and OpenFray rolls their initiative, and
[Roll death save](/docs/guides/death/#death-saves) is the same fallback for a downed
character. In both cases the roll happens because you asked for it.
