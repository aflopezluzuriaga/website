---
name: structure-conventions
description: >
  The kit's universal structure layer (the floor), kept in every repo regardless
  of archetype (including NONE). Covers the root files and the archetype
  declaration, workspace/, the FOLDER_MAP distributed-index convention, the
  session-close status refresh, the two-extra-folders governance rules, the
  created-up-front vs born-on-creation split, the intake funnel and
  root-as-accidental-staging, reference-by-subject,
  reading-order, and skills layout. The archetype-common rules live in
  archetype_conventions.md, and the per-archetype folder structure and index set
  in the repo's archetype spec — not here. Read when creating or placing any
  folder.
---

# Repo structure conventions — the universal layer

Describes the universal layer every repo gets regardless of type. The layers
*above* it are **not** here: the archetype-common rules live in
`archetype_conventions.md`, and the per-type purpose-folders and index sets live
in the repo's archetype spec (the one spec the repo keeps for its declared type).
A NONE repo carries only this universal layer (plus a bespoke skeleton); an
archetype repo reads all three, in order.

## The three-layer model

A repo's structure has three layers:

1. **Universal layer (this document).** Archetype-independent — identical in
   every repo, and what makes the skills operate at all. Every repo keeps it,
   including a NONE repo.
2. **Archetype-common layer (`archetype_conventions.md`).** The rules shared by
   every archetype repo but meaningless without one — born-minimal promotion,
   origin-based typing, the shared-spine test, by-subject keying, the
   archetype-fixed root skeleton. Carried by every research / coordination /
   operation repo; **a NONE repo does not carry it.**
3. **Type-specific layer (the archetype spec).** The part that *varies* across
   repo types: which purpose-folders a repo has and which indexes it carries. It
   lives in the one `<type>_archetype_spec.md` for the repo's declared type. A
   NONE repo has no archetype spec — it is not a deficient archetype but a
   *kind* of its own: a repo too idiosyncratic for any reusable skeleton, given
   a tailored bespoke one instead. It carries only this universal layer, plus
   that bespoke skeleton.

**Where a rule lands — one test, applied twice.** (1) Does it survive without an
archetype? Yes (it holds for a NONE repo too) → it is universal, here. No → not
universal. (2) Does it have a type-specific form? That part peels to the spec
(L3); the general principle behind it stays in `archetype_conventions.md` (L2).
The axis is **general-vs-specific, not count** — a rule shared by exactly two
archetypes is two realizations of one principle, not duplication.
`archetype_conventions.md` states the full model and owns the layer between this
floor and the specs.

## The universal layer

### Root files (every repo)

- **`CLAUDE.md`** — the front door: routing + the skills table.
- **`STATUS.md`** — repo-level current state.
- **Archetype declaration** (in `CLAUDE.md`): the repo's `type` (research /
  coordination / operation / NONE), `variant` (e.g. single-paper / agenda;
  single-task / composition; single-reform / matrix), and the `spec version` it
  was structured under — so checks and routing read the declared type rather than
  re-diagnosing it. A NONE repo declares `type = NONE` and carries no
  spec-version (it keeps no archetype spec).

### `workspace/` (every repo)

The working layer — Claude's *and* Andrea's (saved conversations, handoffs,
working artifacts, the **`to_do/`** action tracker (see below), the
**`multisession_active_tasks/`** carryover home (see below), the **`staging/`** intake funnel (see below), and the exploration-branch **`branch_logs/`**
trail). A concrete universal folder present in every repo. "Workspace" is the
name of this *folder* — not a name for the whole universal layer.

**Subfolders are created up front as labeled-empty homes.** Every `workspace/`
subfolder is scaffolded at repo birth, not created lazily on first use. Each
carries a **standing document** — an `INDEX.md` where an always-active or curated
skill owns the folder, otherwise a `README.md` — created up front *with its
header*. Since git and the GitHub API track files, not bare directories, this
document is also what persists the home: it stays put across task completion, so
finishing a task empties the *contents*, never the folder. An empty
subfolder reads as *state* — "no saved conversations yet," "no active
multi-session task," "nothing staged" — never as breakage or a missing folder;
its contents are born on use, but the folder is always there to receive them, so
nothing is ever created ad hoc mid-session. This is the universal-layer
application of the *created-up-front vs born-on-creation* rule below.

The **universal** subfolders are present in **every repo, NONE included**:
`claude_conversations/`, `brainstorms/`, `to_do/`, `multisession_active_tasks/`,
`staging/`, `branch_logs/` — each owned by a universal convention or an
always-active skill. Subfolders owned by a **curated** skill —
`agent_outputs/` (`agent_research_verification_skill.md`) and `visuals/`
(`visuals_workflow_skill.md`) — are scaffolded by the **archetype** birth trees
(research / coordination / operation), **not** the universal/NONE layer, and so
appear only in archetype repos; see each `*_setup_scaffold.md`.

**The standing document per subfolder** (created up front with its header — used by
the birth scaffold in Part A and Part C's workspace-scaffold step alike):
- `claude_conversations/` — `INDEX.md`, per `repo_conversations_skill.md`'s Index format (`# Index — Claude Conversations` + the conversations table header, no rows yet).
- `brainstorms/` — `README.md`: Brainstorming / thinking-out-loud docs. Empty = none yet.
- `to_do/` — `README.md`: Forward-looking action items (working tracker, not a catalog). Empty = no pending actions.
- `multisession_active_tasks/` — `README.md`: Multi-session carryover docs (one task across sessions). Empty = no active multi-session task.
- `staging/` — `README.md`: Intake funnel; everything new enters here before placement. Empty = nothing staged (the normal resting state).
- `branch_logs/` — `README.md`: Raw exploration-branch research trails. Empty = no branch logs yet.
- `agent_outputs/` — `INDEX.md` + `LESSONS.md`, per `agent_research_verification_skill.md` (its INDEX.md and LESSONS.md headers; `WORKFLOW_SKIPS.md` is born-on-use). *(archetype repos only)*
- `visuals/` — `README.md`: Visuals-workflow outputs (`visuals_workflow`). Empty = none yet. *(archetype repos only)*

For a `README.md`-bearing folder the document is a titled label (`# <Folder> — <one-line purpose>`); for an `INDEX.md`/`LESSONS.md` folder the owning skill defines the header, instantiated empty. The document is permanent: a task's contents come and go, the standing doc (and so the folder) stays.

### The `to_do/` tracker (every repo)

`workspace/to_do/` holds the repo's **forward-looking action items** — a
*working tracker, not a catalog*. Created up front and self-documenting: an
empty `to_do/` means "no pending actions," not broken. It is **distinct from the
repo's other tracking surfaces**: `STATUS.md` Open questions are *decisions to
resolve*; a **to-do is an action to take**; notes are reading/thinking. It
**takes no index row** (it lives in `workspace/`, which is map-exempt) and is
**pointed at from `STATUS.md`**. Ownership is **inline** — a default-owner line
plus `(owner: …)` tags on items that differ. A completed item is **cleared on
completion** (the durable record of what was done lives in the `STATUS.md`
session close-out, not here, so the tracker stays a live list);
`project_tracker_skill.md` runs that retirement at session close. Universal — every
repo carries it, NONE included.

### The `multisession_active_tasks/` folder (every repo)

`workspace/multisession_active_tasks/` is the home for the **multi-session carryover** — the working doc that carries one task across the several sessions it
takes to finish, when resource limits (context, execution risk, fatigue) force
the split. Like `to_do/`, it is **created up front and reads as state: an empty
folder means "no active multi-session task."** The carryover doc itself is **born on
use**, when a task crosses the multi-session threshold, and is named
`MULTISESSION_CARRYOVER_<task_stem>.md`. It is **distinct from `to_do/`**: `to_do/`
holds deferred *intentions*, this holds the live state of the *task in hand*. It
**takes no index row** (it lives in `workspace/`, which is map-exempt). The
workflow that decides when a carryover is warranted, maintains it across sessions, and
folds it into `STATUS.md` at completion lives in `multisession_task_skill.md`;
this layer only defines the home. *(The term "plan" is reserved kit-wide for in-the-work approach-planning — the approach that lives inside the work, with `STATUS.md` carrying position; the **carryover** is the distinct artifact that resource limits force into being.)* Universal — every repo carries the folder, NONE
included.

### The intake funnel — `workspace/staging/` (every repo)

Everything new to the repo enters through **`workspace/staging/`** — a file
Andrea drops in, material imported from another repo, branch content from an
overturning merge. The drop rule is **zero-decision**: nothing about where the
thing will live is decided at drop time. That is what makes the rule survive
being rushed — a rule with an embedded placement decision is the rule not
followed. `workspace/staging/` is the repo's **single transient hold-and-place
area**; every caller follows the same lifecycle — **hold → place into permanent
homes → empty** — so an empty `staging/` is the normal resting state, and a
non-empty one at session close is a legible signal (`project_tracker_skill.md`
prompts on it at close). (If two callers are ever mid-flight at once, sub-batch
by a named subfolder; not worth pre-building until it happens.)

**The full check, at placement time — propose-first, never interrogate-first.**
Placement out of staging runs: identify each item by a skim (ask what a thing is
only when the skim can't tell) → the **adjacency/duplicate check** — read the
item against the current `FOLDER_MAP`s and the repo's typed indexes and ask *do
we already have this, or something adjacent to it?* → the placement proposal,
flagging any probable duplicate or supersession → on Andrea's approval, place,
register in the right index/`FOLDER_MAP`, empty staging. The adjacency step is
what intake adds over the folder-creation placement check: that check decides
*where a new thing goes*; this one first asks *whether the repo already has it*.
A bulk drop batches — one index pass, one proposal message, not one exchange per
file.

**The rushed path ("stage it and use it now").** Nothing about staging blocks
reading a file, so a staged item can be used immediately — the **lightning
check** (below) still runs first. Placement is deferred, recorded as a **Pending
placement fixes** entry in `STATUS.md` (the `project_tracker_skill.md` slot,
re-surfaced at session start and close until resolved). The rushed use pre-pays
identification: the entry carries what Andrea said the thing was, plus any
probable-duplicate flag from the lightning check. The non-empty-staging prompt
at close is the backstop if an entry is missed — the files themselves can't go
invisible.

**The lightning check — the always-run tier.** Ten seconds, not ten minutes, and
it runs even rushed: an **identity skim** (title page, headers — not a read)
plus a **typed-index grep** by topic/title against whatever indexes the repo
carries. **Hit** → say so and work from the *processed* form (the summary, the
extraction) — never re-process; the staged copy is flagged probable-duplicate in
its Pending entry and resolved at placement. **Near-hit** (an earlier *version*
is filed) → a supersession, not a duplicate: use the new informed by the
existing summary; placement follows the repo's superseded-but-retained handling.
**Miss** → proceed. No placement, no `FOLDER_MAP` write, no interrogation at
this tier; its findings pre-pay the full check. The check's *triggers* and
*type-routing* are a working convention in the repo's `CLAUDE.md` — the file in
context at arbitrary work moments — and this layer defines the tier itself.

**Two callers own their step-by-steps elsewhere.** The cross-repo import
workflow — the token-scope reminder, the read into staging, the
keep/drop/what-must-come-too selection — lives in `cross_repo_import_skill.md`;
an import lands **typed and placed, not dumped at root**, through this same
funnel. The exploration-branch overturn route (`exploration_branch_skill.md`)
stages here too. Neither redefines the staging home or the lifecycle.

### The `FOLDER_MAP` convention — the distributed, anti-sponge index

**Everything in a repo is locatable through its maps and indexes, without
scanning the tree** — the no-scan guarantee this convention implements. (Which
*key* you look up by is a layer-2 question; see `archetype_conventions.md`.)

Every main folder carries a **`FOLDER_MAP.md`** doing two jobs in one file:
- **Description** (rides on top) — what the folder is for, and briefly what's in it.
- **Map / index** (the architectural role) — the catalog of the folder's own contents, read to *locate* without scanning. Weight scales with the folder's role: a leaf folder's map is a short list; a category folder's rosters the whole category (e.g. the sub-units it holds) — same artifact, more catalog when the folder holds more.

`FOLDER_MAP.md` is the **authoritative, distributed index for its folder** — the
description orients; the map is why the file exists in the retrieval
architecture. Because every folder self-describes and self-maps, there is no
leftover that needs a central catch-all — which is the mechanism that prevents a
single root index from becoming a sponge that absorbs everything structureless
and never stabilizes. Any root-level lookup is at most a **thin pointer** to the
per-folder `FOLDER_MAP`s, never a second copy of their contents.

> **Name note.** `FOLDER_MAP` was chosen over `FOLDER_INDEX` so the name carries
> both roles — orient *and* locate — in one word. The cost: it sits just outside
> the repo-level `*_INDEX` family (`MATERIALS_INDEX`, `PAPERS_INDEX`). The typed
> archetype indexes a category folder may also carry are defined in the repo's
> archetype spec.

### End-of-session status refresh

The main-category `FOLDER_MAP.md`s get their **status refreshed at session
close.** This is a requirement the universal layer generates;
`finish_session_skill.md` implements it.

### Governance rules (in force in every repo)

- **At most two extra repo-specific root folders**, for genuinely
  repo-particular needs, beyond the repo's standing set of root purpose-folders.
- **Flexibility inside folders, never at the root.** Folder *contents* can be
  arranged with some freedom; the set of root folders stays standard. (Applies to
  every repo, NONE included.)

*(The rule that an archetype **fixes** the standing root skeleton lives in
`archetype_conventions.md` — it is the one governance rule a NONE repo lacks, so
it is archetype-common, not universal. The two clauses above bound root folders
for **every** repo: for an archetype repo, beyond the fixed skeleton; for a NONE
repo, beyond its bespoke one.)*

### The `_ex` exception slots

A **bounded gap-slot** for something the standing folder set has no home for: **at
most two per level**, named for what they are with an `_ex` suffix (`<name>_ex1`,
lowercase). A lingering `_ex` is a standing question; **reaching for a third
(`_ex3`) means a folder is missing** — a signal the structure has a gap (you can
override to keep moving, but the flag persists). What counts as the *standing set*
a gap is measured against is the repo's own: for an archetype repo, its type's
skeleton (the spec); for a NONE repo, its bespoke one.

## Recursion: the sub-unit case

A repo that holds sub-units (mini-projects, or any category of repeated units)
holds them under **one root purpose-folder** — so the root stays
purpose-organized and the two-extra cap holds no matter how many sub-units there
are (the multiplicity lives *inside* the folder, where flexibility belongs).

This makes the universal conventions **recurse one level.** Each sub-unit inside
that folder is its own structural unit: its own description + map in its own
`FOLDER_MAP.md`, refreshed at session end, exactly like the repo root. The
category folder's own `FOLDER_MAP.md` is a **thin roster** pointing at the
sub-units, never a copy — the anti-sponge rule holding one level down.

So the universal-layer rules are written as applying **at each structural
level**, not only at repo root. How a category of repeated sub-units is shaped
for a given repo type (a shared spine plus N units) is defined in that type's
archetype spec.

## Created up front vs born on creation

Two layers, to settle what gets scaffolded:
- **Known structure is created up front and self-documents.** Indexes, the
  standard folders a repo type always has, and every `FOLDER_MAP` exist from the
  start — *even when empty* — and each documents what belongs in it. An
  empty-but-documented folder is a labeled home, not clutter; it is what lets a
  new file route itself to the right place.
- **Unknowable-yet structure is born on creation/expansion.** Anything that
  depends on information you don't have yet (how a repo expands, which
  deliverable types appear) is *not* pre-scaffolded; it's created when that
  information arrives. Don't pre-create empty folders for things that may never
  exist.

## The root inbox — accidental staging

Loose content at the repo root is **accidental staging**: it means "needs
placing" (a signal, like `_ex3`), exactly as if it had been dropped in
`workspace/staging/`, and it is swept into the same intake check — not handled
by a separate protocol. **Root should normally be empty of loose content** —
accumulation there is itself a flag. When unsure where something goes, drop it
in `workspace/staging/` (or at root — the funnel treats the two the same) and
the placement check files it from the documented indexes and `FOLDER_MAP`s.

## Reference by index entry or stable key, not hard path

Inside documents, reference other things **by index entry or stable key, not by
hard file path**, so moving or renaming a file doesn't stale the reference.
Hard-coded paths in prose are a form of path dependency; they break silently on
the next reorganization.

## Reading order — shallow to deep

Where a thing is kept in **layered forms** (a short pointer, a fuller middle
form, the heavy original), an index entry lists them **shallow-to-deep**, and a
reader **stops at the shallowest layer that answers**, opening the heavy form only
when needed. This is a universal reading-cost discipline; the *specific* layered
encodings a repo type uses (a paper's `summary · text · pdf`, an operation's
`OUTPUTS_INDEX` → register → output) are defined in the repo's archetype spec.

## Nothing is destroyed on a state change

When a repo's recorded state changes — a claim is overturned, an option is
dropped, a stage is relabeled, a structure is superseded — the prior state is
**retained as rationale or history, never deleted.** A state change *re-files*
the past (marks it superseded, points at what replaced it and why); deleting it
would erase the reasoning the next decision needs. The rule is universal; each
layer realizes it in its own form: research keeps both forms and its stage
history (research spec §12), coordination retains instances past their outcome
(coordination spec §5), operation supersedes-but-retains dropped reforms and
positions (operation spec §2), and the exploration-branch overturn route below
stages and supersedes rather than overwriting `main`.

## Skills layout

`skills/` stays **flat by default**. Split it into a general-kit subfolder + a
repo-specific subfolder **only when repo-specific skills actually exist**
(otherwise the split is redundant). `LastSkillUpdate/` always rides inside the
general-kit folder. A single-task skill lives **folder-local, next to the work it
serves** (e.g. `funding/skills/tc-drafting/`), rostered in `CLAUDE.md` — not
hoisted into `skills/`. (`skills/` itself stays map-exempt machinery;
`CLAUDE.md`'s table is the roster.) Archetype specs may refine folder-skill
placement for their type.

## The skills CHANGELOG and the `[SKILL-FEEDBACK]` channel

`skills/CHANGELOG.md` is the **kit's version history**, copied into every repo so
it knows which kit version it carries. It is overwritten wholesale on each kit
update — it is **not** the repo's own work log (that is `STATUS.md`; different
layers).

It carries two entry kinds:
- **Versioned kit-change entries** — a `## vX.Y — …` heading, authored centrally
  in `SkillPropagation` when the kit changes.
- **`[SKILL-FEEDBACK]` entries** — a `## [SKILL-FEEDBACK] — <skill> — <date>`
  heading, **no version stamp**, logged in a content repo when a kit skill
  misfired or could be better and there was no time to fix it then. The tag sits
  in the leading slot where a version would go; its presence there marks an entry
  with **no file change behind it.**

`[SKILL-FEEDBACK]` entries are **evidence, not edits.** They are swept back at the
next discovery, analyzed centrally in `SkillPropagation`, and **never merged into
the canonical CHANGELOG.** They survive being overwritten because the propagation
that overwrites them is the same one that ships the resulting fix — by then the
note is spent. (The sweep, extraction, and routing mechanics live in
`SkillPropagation`'s discovery and consolidation skills, not here; this layer
only defines the entry type and the tag.)
## Exploration-branch artifacts

An *exploration* — a branch whose purpose is to test whether a `main` claim
holds (a robustness check, an alternative specification; see
`exploration_branch_skill.md`) — carries a small, fixed set of artifacts. They
are **defined here**; the workflow that creates and routes them lives in
`exploration_branch_skill.md`, which never redefines their format. These are
universal (any repo can run an exploration), so they live in this layer.

- **`BRANCHES_LOG.md`** — a repo-root file **on `main`**, and a *log*, not an
  index: one line appended **per exploration branch at creation** (writing
  branches stay out — they are ephemeral and findable via git). It retires "go
  scan the branches." The file is **born on the first exploration's registration**
  — no scaffold creates it; a repo that has never run an exploration simply has
  none, and that absence is state, not drift. Line form:
  `- YYYY-MM-DD · <branch-ref> · extends: <the subject/parent it hangs off> · testing: <main claim at risk> · origin: created | promoted-from <folder> (<result>)`
  At merge, **one annotation is appended** to that branch's line —
  `→ merged <date> into <path>` (or, for an overturn, the staging pointer plus the `STATUS.md` restructure workstream).
  A merge is a single terminal event, so logging it stays log-like; the file
  does not become a status tracker.

- **The in-branch `FOLDER_MAP.md`** — **not a new type.** An exploration folder
  carries the universal `FOLDER_MAP.md` like any folder; it gains three
  description slots: **`Extends:`** (the subject/parent it hangs off),
  **`Testing:`** (the `main` claim at risk), and **`Standing:`** (the distilled
  current answer, updated as the exploration runs and frozen at merge). Because
  it is the universal map, the exploration system stays archetype-blind.

- **`BRANCH_RESEARCH.md`** — the **in-branch log**, inside the branch. A
  two-part file: a **review** on top (what the exploration was opened for, the
  hypothesis, what was done, how it turned out, how it connects to `main`) and
  the chronological **trail** beneath (newest-first session entries). Its header
  names the branch-ref, so provenance is explicit once anything from it reaches
  `main`. **It splits at merge:** the review distils into the merged product
  folder's `FOLDER_MAP` (`Standing` + the branch-origin roster line), and the
  raw trail moves to `workspace/branch_logs/<branch-ref>.md`.

- **`workspace/branch_logs/<branch-ref>.md`** — the raw `BRANCH_RESEARCH` trail
  after merge: history, quarantined out of the retrieval tree but kept on `main`
  so it survives branch deletion. It earns its keep because the "why this spec,
  what was ruled out" reasoning is not recoverable from the frozen `Standing`
  line.

- **`workspace/staging/`** — the repo's transient intra-repo staging area,
  **created up front as a labeled-empty home** and **shared through the universal intake funnel** (above). An overturning merge brings branch content here (via a
  `?ref=<branch>` read) rather than git-merging to canonical, because a git-merge
  would land both the old and the new claim and report no conflicts while `main`
  is now self-contradictory. Empty between uses — that is its resting state.

- **The per-subject `explorations/` nest** — a merged exploration lands by its
  `extends:` parent into an `explorations/` folder at the subject's home, **born
  on the subject's first merged exploration** (not a repo-wide explorations root,
  which would fight organize-by-subject and spend a root slot).


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; the skills CHANGELOG / `[SKILL-FEEDBACK]` channel section added 2026-06-07; the exploration-branch artifacts section added 2026-06-08 (#8 branch/exploration build); the universal `to_do/` tracker defined here 2026-06-08 (v4 universal-to-do build) — promoted from research's `general/to_do/` to a universal `workspace/to_do/` construct, `workspace/` reframed as the working layer of Claude *and* Andrea; the `multisession_active_tasks/` carryover home defined here 2026-06-08 (v4 multisession_task build, where the artifact was named the plan-doc); the artifact renamed **plan-doc → carryover** and "plan" reserved kit-wide for in-the-work approach-planning 2026-06-08 (v4 carryover-rename build); the universal **workspace folder-creation convention** added 2026-06-09 (v4 workspace-folders build) — all `workspace/` subfolders created up front as labeled-empty homes, `_import_staging/` merged into a single shared `workspace/staging/`, and the universal-vs-curated subfolder split stated (`agent_outputs/`/`visuals/` are archetype-scoped, not in NONE); a pointer from the import section to the new `cross_repo_import_skill.md` — which owns the import step-by-step while this layer keeps the staging home and lifecycle — added 2026-06-09 (v4 cross-repo-import build); upgraded from a two-layer to a **three-layer** model 2026-06-09 (v4 archetype_conventions build) — the new `archetype_conventions.md` (archetype-common layer, L2) inserted between this floor and the per-type specs, the one-test-applied-twice placement rule stated in "The three-layer model," the **skeleton-fixed-by-archetype** governance clause moved out to L2 (the one rule a NONE repo lacks) while the two-extra-cap / flexibility-inside clauses were reworded skeleton-agnostic so they apply cleanly to a NONE repo's bespoke skeleton, and a universal **reading-order (shallow-to-deep)** statement added as the L1 home for the discipline the specs realize, and the **`_ex` gap-slot general rule** (two per level, third flags a missing folder) promoted from research §11 to this floor (the type-specific "what counts as a missing folder" stays in each spec). **Post-build review fixes 2026-06-10** (v4 archetype_conventions review): added the universal **nothing-destroyed-on-a-state-change** section (the L1 home the June-9 placement table assigned but the build had not written; realizations named per layer), an explicit **no-scan locatability** statement opening the `FOLDER_MAP` section (the floor principle `archetype_conventions.md` cites), the "Reference by index/**subject**" heading reworded to **index entry or stable key** (NONE-wording guard — a NONE repo is not retrieved by subject), and a NONE-is-a-kind framing sentence in the three-layer model. The import section generalized into the universal **intake funnel** 2026-06-10 (v4 staging-intake-funnel build) — everything new to the repo enters `workspace/staging/` under a zero-decision drop rule; placement runs the full check (identify → adjacency/duplicate check against the maps and typed indexes → propose → place → empty; bulk drops batch); a rushed-use path defers placement via a `STATUS.md` Pending placement fixes entry with the close-side non-empty-staging prompt as backstop; the always-run **lightning check** tier defined here (identity skim + typed-index grep; hit → work from the processed form, never re-process; near-hit → supersession; its triggers and type-routing live in `CLAUDE.md`'s Working Conventions); the root inbox redefined as accidental staging swept into the same check; import and the exploration-overturn route named as callers owning their step-by-steps elsewhere. June-11 final-pass fix build (v4): the overturn annotation's reserved-word fix — the staging pointer plus the `STATUS.md` restructure workstream, not a 'plan' (W3); `BRANCHES_LOG.md`'s birth timing stated — born on the first exploration's registration, no scaffold creates it (A′-11); the `extends:` placeholder wording clarified (W5). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close. Post-v4 (workspace-scaffold build, 2026-06-12): each `workspace/` subfolder now carries a one-line `README.md` (label + git-persistence); canonical label table added here.*
