---
name: archetype-conventions
description: >
  The archetype-common layer — conventions shared by every archetype repo
  (research / coordination / operation) but NOT carried by a NONE repo. Sits
  between the universal floor (structure_conventions.md, every repo) and the
  per-type spec (the one <type>_archetype_spec.md a repo keeps). Holds the rules
  that presuppose an archetype: born-minimal promote-on-evidence, origin-based
  typing, the shared-spine / "one repo or two" test, by-subject keying,
  typed-index behavior, and the archetype-fixed root skeleton. Read after
  structure_conventions.md and before
  the repo's archetype spec. A NONE repo does not carry this file.
---

# Archetype conventions — the archetype-common layer

This is the **middle of three layers**. It holds what every *archetype* repo
shares but a **NONE repo does not** — the rules that only make sense once a repo
has an archetype at all.

- **Floor (L1) — `structure_conventions.md`.** Archetype-independent; every repo
  keeps it, NONE included.
- **Archetype-common (L2) — this file.** Shared by all three archetypes
  (research / coordination / operation); **a NONE repo does not carry it.**
- **Type-specific (L3) — the archetype spec.** The one
  `<type>_archetype_spec.md` a repo keeps for its declared type.

Read in that order: `structure_conventions.md` → **this file** →
`<type>_archetype_spec.md`. The floor names it as a sibling to
`naming_conventions.md`; the spec describes only what is *different* about its
type, leaning on this file for the common rules rather than restating them.

## How a rule lands in a layer — one test, applied twice

A repo's structure is three layers, and any rule is placed by **one test asked
twice**:

1. **Does it survive without an archetype?** If yes — it holds for a NONE repo
   too — it is **floor (L1)**, in `structure_conventions.md`. If no — it
   presupposes an archetype — it is **not** floor.
2. **Does it have a type-specific form?** The part that does peels to **L3**, in
   whichever specs carry it. The general principle behind it stays **L2**, here.

The axis is **general-vs-specific, not count.** A rule "shared by exactly two of
the three archetypes" is *not* a duplication problem and does *not* get demoted
to the specs: research's form and coordination's form are **two specific
realizations of one general principle**, and the principle belongs here while
each realization stays in its spec. (This is why the same shape — e.g.
born-minimal promotion — is stated once here and *realized* one, two, or three
times below, without the count changing where the principle lives.)

What makes the rules in this file L2 rather than L1 is the same fact each time: a
NONE repo has no reusable skeleton, no typed buckets or typed root indexes, no
typed repeated units, and is not retrieved by subject — so the rules below have
**nothing to attach to** in a NONE repo. They begin to apply the moment a repo has an archetype.

## Born-minimal, promote-on-evidence

Nothing is classified by prediction. Everything **enters at its lowest-commitment
honest reading** and **promotes only on observed evidence** — additively, no
migration, no rebuild. *Not knowing yet* is a first-class, supported state; the
structure never forces a repo to guess what it will become. The drift check (the
periodic revision pass / session-close prompts) **surfaces** promotion
candidates, so a promotion is *noticed*, not predicted.

The principle has **three faces** — the same move at three scales. The *names* of
the units peel to each spec (L3); the move itself is common:

- **Unit count — N = 1 → N > 1.** A repo is born holding one unit and grows to
  many by **adding a unit beside the first**, never by restructuring the first.
  The unit is a research **line**, a coordination **task**, or an operation
  **reform** (L3); the N=1 special case (a single paper / single task /
  single-reform op) and its promotion to the N>1 case (agenda / composition /
  matrix) is the same born-additive shape each time.
- **Classification — one-off → recognized unit.** A piece of work first read as a
  **one-off** (produced with the general skills only, drawing on the shared
  layer) becomes a **recognized unit with its own dedicated machinery** when
  evidence shows it warrants one. The triage and the marker that distinguishes
  the two are type-specific (L3 — e.g. coordination's dedicated-skill-plus-corpus
  test); the promote-when-evidence-arrives rule is common.
- **Resource — lift on second use.** A resource born at a **narrow scope**
  (one unit's) is **promoted toward the shared layer on its second use** — the
  index surfaces the candidate, the move is confirmed, scope and used-by update.
  The shared home it lifts *to* is type-specific (L3 — research's `general/`,
  coordination's `reference/`); the lift-on-second-use rule is common.

## Origin-based typing

The typing axis is **origin relative to *this* repo**, not authorship. Anything
**produced outside the repo and brought in** is typed normally — paper / material
/ asset, with a scope — **regardless of who authored it** (a colleague's document
and a downloaded one collapse: both are just brought-in material). The **one
special category is what *this* repo produces** — its units' outputs, and any
shared-layer resource it makes for its own future work. A **provenance override**
exists: a document authored in another repo can be marked as *yours* on upload;
ask when it is unclear.

A repo may still **organize** a layer by authorship even though it **types** by
origin (e.g. splitting shared reference into own-institution / external when "what
is our own?" is a live query) — organization by authorship and typing by origin
are both true at once, on different axes. The typed **index set** these buckets
fill is type-specific (L3).

This is L2, not floor: a NONE repo has no typed index buckets to sort intake
into, so origin-typing has nothing to act on there.

## The shared spine, and the "one repo or two" test

An archetype repo holding more than one unit keeps a **shared spine** — the
central layer the units draw on in common — distinct from the per-unit work. What
the spine *contains* is type-specific (L3 — research's `general/` literature,
coordination's shared `reference/`/`assets/`, operation's cross-reform
`reference/`).

Before composing several units into **one** repo, apply the **"one repo or
two"** test: is the spine **genuinely co-used** across the units, or are they
**co-located strangers** that merely sit together? If they share no real spine,
they are probably **two repos, not one**. The shared resource is what *earns* the
composition; without it, composing only invents a spine that isn't there. (Each
spec states this in its own units' terms — research's agenda-vs-multiproject,
coordination's co-used-vs-co-located — but the test is the same.)

## Retrieval is keyed by subject / topic

In an archetype repo, **you find things by what they are about** — the retrieval
key is the **subject / topic**, not the deliverable type, the producer, or the
location. This is distinct from, and sits on top of, the floor's *no-scan
locatability* (everything reachable through the maps and indexes without scanning
the tree, per `structure_conventions.md`): the floor guarantees you never scan;
this layer fixes the **key you look up by**.

The **form** of the key is type-specific (L3): research's `who_what_year` paper
stem, coordination's subject-keyed instance names, operation's topic-keyed
outputs. The choice to key by subject at all is the common rule, and it is the
archetype's acceptance test — *the repo's hardest-to-find thing should be
findable by subject, without remembering where it lives.* It is L2 because a NONE
tracker is keyed by its own operational key (a lookup key, a routing field), not
by subject.

## Typed-index behavior

An archetype repo carries a set of **typed root indexes** (*which* ones is
type-specific — L3). Their **behavior** is common:

- **Created up front, empty-but-headed.** The full set exists from setup,
  self-documenting; an empty index keeps its one-line header so it reads as
  *ready*, not broken (anti-drift — the structure never waits for content).
- **Pointer-only.** A typed index locates content; it never stores it. Rows are
  pointers into the tree. (The one documented exception: operation's
  `POSITIONS_REGISTER.md` is content-bearing by design and sits *outside* the
  `*_INDEX` family — see that spec.)
- **Self-registering at creation.** Placement is known at the moment a file is
  made — the index row is written then, never reconstructed later.
- **Kept current at close; verified on a cadence.** Rows' live-claim fields
  (status/outcome labels, reliability tags, summaries) are refreshed at session
  close for the files the session touched — `project_tracker_skill.md`
  implements; an update Andrea had no time to review carries a trailing
  `[unreviewed]` marker until the next index audit sweeps it — and verified
  periodically by `housekeeping_skill.md`'s index-audit mode. This is the
  universal feeding process: an index with no process behind it is a liability
  (operation §6 names the rule; it holds for every typed index).
- **No central catch-all.** There is no `MASTER_INDEX`: the floor's
  `FOLDER_MAP` tree plus the typed indexes leave nothing for one to absorb
  (the anti-sponge mechanism itself is floor — `structure_conventions.md`).

This is L2, not floor, because a NONE repo carries no typed root indexes — its
`FOLDER_MAP`s and its own operational lookups are its whole index layer.

## The root skeleton is fixed by the archetype

The set of **root purpose-folders is determined by the repo's type**, not
improvised per repo — the archetype lays down a standard skeleton, and every repo
of that type is born with it. This is precisely **the rule a NONE repo lacks**: a
NONE repo has no preset archetype skeleton (it gets a *tailored, bespoke*
skeleton instead — see below), which is why this clause is L2 and not floor.

The floor still governs **how many folders sit at root and where flexibility
lives** (the two-extra-root cap, flexibility-inside-folders-never-at-root,
multiplicity-nests-under-one-root-folder) — those apply to every repo including
NONE, and stay in `structure_conventions.md`. What an archetype adds on top is
the **fixed skeleton itself**. The specific skeleton per type is L3 (research's
prefixed line-containers + `general/`; coordination's `instances/` + `reference/`
+ `corpus/`; operation's `reforms/` + `funding/` + `products/`).

## NONE is a kind, not a deficient archetype

A **NONE** repo is the **residual kind** — a repo too idiosyncratic to fit any
reusable skeleton (the operational tracker / lookup / dashboard is canonical). It
is **not** an archetype repo missing its spec; it is a repo for which no general
structure fits, so it gets a **tailored bespoke skeleton** built for it directly.

A NONE repo therefore carries **the floor only** (`structure_conventions.md` +
`naming_conventions.md`) **plus its bespoke skeleton** — **no spec, and not this
file.** The decision rule is already encoded at birth (`new_repo_setup.md` Q1):
*track / route* work → NONE; *produce deliverables* → an archetype. Put the other
way: **if a repo would fit a general structure, it is an archetype, not NONE.**


---
*Kit file — created 2026-06-09 in the v4 `archetype_conventions` build. Promotes
the archetype-common layer (L2) into its own file: the born-minimal
promote-on-evidence principle (three faces), origin-based typing, the shared-spine
/ "one repo or two" test, by-subject keying, and the archetype-fixed root
skeleton — gathered from where they were scattered (and partly duplicated) across
the three archetype specs, restated once here archetype-neutrally, with each
type-specific form left in its spec. Establishes the three-layer model
(floor → archetype-common → type-specific) and the one-test-applied-twice
placement rule. A NONE repo does not carry this file. **Post-build review fixes 2026-06-10**
(v4 archetype_conventions review): added the **typed-index behavior** section
(created-up-front/empty-but-headed, pointer-only with the `POSITIONS_REGISTER`
exception, self-registering, no `MASTER_INDEX`) — gathering the behavior the
three specs each restated, and revising the June-9 placement table's L1 call
for it (typed root indexes are archetype objects; a NONE repo carries none, so
the behavior is L2); the NONE justification sentence tightened to **typed**
repeated units / typed root indexes. Kit version floor v2.0.0;
final stamp set by the v4 re-baseline at cycle close. **Content-staleness build
2026-06-10:** the typed-index behavior section gains the **kept-current-at-close
/ verified-on-a-cadence** bullet — the universal feeding process (close-side
entry refresh implemented by `project_tracker_skill.md`, the `[unreviewed]`
marker, periodic verification by `housekeeping_skill.md`'s index-audit mode) —
stated here as the L2 requirement, symmetric with the floor's `FOLDER_MAP`
status refresh.*

