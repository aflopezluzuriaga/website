---
name: research-archetype
description: >
  The structure-and-index preset for a research repo — work organized around
  research lines (a paper, or several papers sharing literature/background as an
  agenda). Kept only by repos whose declared type is research. Read after
  structure_conventions.md and archetype_conventions.md (the common layers),
  alongside naming_conventions.md. Defines the line-container
  shape, the general/ shared spine, placement rules, the six root indexes, notes
  and deep dives, and retention — the invariants the archetype audit checks a
  research repo against.
---

# Research archetype — spec

*Sibling to the coordination and operation archetypes. The archetype-common
machinery — born-minimal promote-on-evidence, origin-based typing, the
shared-spine / "one repo or two" test, by-subject keying, the archetype-fixed
root skeleton — lives in `archetype_conventions.md`; the universal floor (naming,
`FOLDER_MAP`, structure conventions, the `_ex` rule, reading-order) in
`naming_conventions.md` / `structure_conventions.md`. This doc describes only
what is **specific to a research repo** — research's forms of those common rules,
and its own index set.*

---

## 1. What this is, and when it applies

A research repo holds work organized around **research lines** — a paper, or
several papers that share literature/background/empirics (an "agenda"). **Paper
and agenda are one archetype:** an agenda is the same layout with more than one
line. A single paper is the archetype at **N = 1 line**.

North-star: the archetype-common by-subject acceptance test
(`archetype_conventions.md`), in research's form — **any paper, note, or asset
findable by its subject (the `who_what_year` stem, the line-sectioned indexes)
without remembering where it lives, and never scanning the repo (or its
branches) to locate it.** Every rule below serves that.

## 2. What exists up front vs. what is born later

The universal **created-up-front vs born-on-creation** rule
(`structure_conventions.md`) governs; this is its research realization:

- **Created up front** (the layout *determined* by "this is a research paper"):
  the indexes, `general/` and its standard subfolders, the line's standard work
  folders, and every `FOLDER_MAP` — present from the start even when empty, each
  documenting what belongs in it.
- **Born later** (depends on information you don't have yet): the line's
  `context/` (born at expansion, §6), the specific `deliverables/` categories
  (born when the first of each is produced, §5), and a second line (born when it
  exists).

## 3. Core shape — the prefixed line-container

Each research line is a **container folder, named for the line, carrying the
standard skeleton inside it**:

```
<line>/
├── FOLDER_MAP.md          ← navigation + the line's map; records cross-line pointers
├── draft/                 ← the paper draft (the academic paper) — only this
├── quantitative/
├── qualitative/
├── research_proposal/
└── deliverables/          ← umbrella; categories born on demand (§5)
    (context/ is NOT here at N=1 — born at expansion, §6)
```

Two non-negotiables:

- **The line is named/prefixed from day one** — even a lone paper gets
  `<paper>/`, never a bare `draft/` at the root. This makes growth
  *append-only*: a second line is added beside the first, never nested
  reactively. Bare root names are the path-dependency trap.
- **The skeleton lives inside the container.** Root holds *lines* (plus
  `general/` and machinery), not line×subfolder. Inner folders are bare
  (`draft/`, not `<line>_draft/`) — the container namespaces them.

`draft/` holds **only the paper draft**. All other deliverables (a government
policy brief, a report to your boss, a presentation, …) live under
`deliverables/` in categories created on demand (§5).

### Per-line stages (recorded, not enforced)

Each line carries a **stage** — `active`, `editing`, `chapter`, or `advisory` —
recorded in its `FOLDER_MAP` with a light *heading-toward* note (e.g. "advisory
(could become a paper)"). A repo whose lines sit at different stages stamps
**"agenda, mixed"** in `CLAUDE.md`.

The stage is **descriptive, not a constraint.** It drives only the **offer** of what
to scaffold up front (Claude proposes a line's stage from the inventory;
you confirm — same propose-then-ask as decomposition). It **forbids nothing**: every
folder is still born on demand, and a line grows into any shape by creating folders
when first used. A line *changes stage* simply by its folders growing and its label
being updated (`advisory -> active` when it starts a paper) — **no migration, no
rebuild.** This is the soft lifecycle: a line has a trajectory, recorded, not locked.

What each stage *offers* up front (never limits):
- **active** — full work folders: `draft/`, `quantitative/`, `qualitative/`,
  `research_proposal/`, `deliverables/`.
- **editing** — late-stage/published, empirics elsewhere: `draft/` + `deliverables/`
  + **`correspondence/`** (see below — for an editing line this is mainly R&R intake:
  editor letters, referee reports); `archive/`/versions born on demand if it re-opens.
- **chapter** — a book chapter, not an academic paper: `draft/` + `deliverables/`.
- **advisory** — no paper; deliverables-led: `deliverables/` (+ `context/` as needed);
  `research_proposal/` too if the advisory work is itself a request-stage proposal;
  `draft/` born only if it starts producing a written paper. (Stages offer, never limit.)

**`draft/` is the universal "primary written output" folder** across stages — the
chapter for a `chapter` line, the paper draft for an `active` line. The stage label
disambiguates; the folder is never renamed on transition.

### Inbound material — `correspondence/` (any line)

A line may have (born on demand) a **`correspondence/`** folder for material exchanged
with people *outside* the line's own work — and it is for any line, not only editing:
referee reports and editor letters; a coauthor's or contractor's deliverable; a
contracted data buy; **and the request *you* authored that opened the exchange**.
Request and return are filed **together**, so an outstanding ask is visible from the
moment you write it, before anything comes back (the work itself happens off-repo, in
the contributor's space — you track the ask and the return, not their process).
Placement follows the usual rule: tied to one line -> that line's `correspondence/`;
spanning lines (a contractor for the whole agenda, a multi-line coauthor) ->
an **agenda-level `correspondence/`** sibling to `general/`.

### `funding/` (agenda-level, first-class)

An agenda may carry a first-class **`funding/`** folder (born on demand) for
technical-cooperation / coordination material — funding proposals, budgets, TC docs.
It is a *recognized* archetype folder, sibling to `general/` — **not** an `_ex` slot,
so it doesn't spend the repo-specific-root budget.

## 4. The shared spine — `general/`

`general/` is the repo's **central shared layer** (vs. line-specific): the
shared **literature** you draw *from*, **and** the central `notes/` tracker
(reading/thinking). **At N = 1,
background and context are one thing and live together in `general/background/`;
there is no line-level `context/` yet** (it's born at expansion, §6).

Reference/background material lives in `general/` **regardless of how many lines
use it** — it's *referential*, not *transformed*, and pre-placing it here avoids
a later lift. (This is the key refinement of the placement rules: see §5 rule 3.)

**To-dos live in `workspace/to_do/`, not `general/`** — the universal action
tracker, defined in `structure_conventions.md` (working-tracker-not-catalog, no
index row, pointed at from `STATUS.md`, inline ownership). Forward-looking
actions are a universal construct, so `general/` carries only `notes/` and the
shared literature; the research-specific `general/to_do/` is **retired in favor
of** the universal `workspace/to_do/`. (A to-do is still not a note — notes are
reading/thinking, indexed by line-of-thinking in `NOTES_INDEX`; to-dos are
actions, not retrieved by subject.)

## 5. Placement — the rules

Decide any item's home by how it's used:

1. **Co-owned reference → `general/`.** Shared **literature** (shared by nature),
   regardless of consumer count. But **source/institutional/setting material is
   line-specific** — in a multi-setting agenda it lives in each line's `context/`,
   not a shared `general/background/`. `general/background/` exists only for
   background genuinely co-owned across lines (e.g. a single paper, where it merges
   with context until expansion, §6).
2. **Produced by one line, reused by others → owned by the producing line,
   others point.** A result one line makes lives in that line; consumers
   reference it via a `FOLDER_MAP` pointer — never copied, never hoisted to
   `general/` (it's owned, not co-owned).
3. **Transformed/data input consumed by one line → nested inside that line.**
   This rule is for **inputs a line transforms** (e.g. a dataset feeding a
   model), *not* reference/background material (which goes to `general/` per
   rule 1 even at single use). It graduates to its own home (a pointer target)
   only if a second consumer appears.

**Visuals are their own layer.** Every visualization you make — charts, figures,
maps, one-offs included — goes in **`ASSETS_INDEX`**, because a visual is revised
across the paper's life (a living object, not a frozen output). Skill machinery
(preambles, generator scripts, palettes-as-code) is *not* an asset — it lives in
`skills/` and is rostered in `CLAUDE.md` (§9).

**Deliverables are created on demand.** `deliverables/` is the line-level
umbrella; its categories are born when the first of each is produced and are
**named for what they are** — e.g. `policy_brief_gov/`, `report_<recipient>/`,
`presentations/`. No category is pre-created empty.

## 6. Expansion — when a line grows or a second line appears

Expansion is a **deliberate decision point**, not an automatic "add a folder."
When (if) the repo grows, ask **"in which direction?"** — another paper in the
same setting / a new country / a new system / a new method — and *that answer*
decides the split:

- A line-level **`context/` is born at this point**, and the
  background-vs-context split is decided here: what was genuinely shared stays in
  `general/background/`; what turns out to be specific to one line moves to that
  line's `context/`. The split is made *with information*, at the moment you have
  it — not guessed up front (which is why `context/` is absent at N = 1).
- A **second line-container** is added beside the first (append-only).
- Shared material is **lifted to `general/`** as it becomes co-owned.

**At an agenda restructure** (multiple lines already present), this split is not
deferred — it's decided when the lines are decomposed: the lines and
the shared-vs-line-specific assignment (`general/background/` vs each line's
`context/`) are determined up front, because the information already exists.

Expansion is also where the archetype-common **"one repo or two" test**
(`archetype_conventions.md`) bites, in research's terms: lines that share no
literature/background/empirics are probably **two repos, not an agenda** — the
shared spine (`general/`) is what earns the composition.

## 7. Indexes

**Six index files at the repo root.** All follow the archetype-common
typed-index behavior (`archetype_conventions.md`: created up front and
self-documenting, pointer-only, self-registered at creation); research's form
is **line-sectioned**:

- `MATERIALS_INDEX.md` — intake, by line + a `general` section. Points to the
  detail indexes.
- `OUTPUTS_INDEX.md` — deliverables the repo produces, by line.
- `ASSETS_INDEX.md` — **all visualizations you made** (§5).
- Detail indexes — `PAPERS_INDEX.md` (bib + reading status + summary links; may carry an **optional `source`/category
  column** to preserve a provenance axis lost when source-type folders collapse —
  e.g. FMM / academic / framework / reference),
  `NOTES_INDEX.md` (§8), `DEEPDIVES_INDEX.md` (§8).

**Entry encoding — layered pointers in reading order.** Every entry lists its
forms shallow-to-deep; a reader stops at the shallowest layer that answers and
opens the heavy form only if needed:

- paper → `summary · text · pdf` (don't open the PDF unprompted)
- asset → `index entry · svg · rendered`
- written piece → `outline · final doc`

**By-subject retrieval** is "grep the line-sectioned indexes by subject." Subject
*tags* are deferred — added only if grep proves weak.

## 8. Notes and deep dives

- **Notes cluster centrally**, subfoldered by subject: `general/notes/<subject>/`
  (e.g. `literature/`, `rct_design/`). Indexed in **`NOTES_INDEX.md`**, which
  records per set **what it holds** *and* **what you were doing when you made it**
  (the line of thinking at creation) so you return by purpose, not by guessing.
- **Deep dives** (verified deep-research runs) → **`DEEPDIVES_INDEX.md`**, a
  detail index `MATERIALS_INDEX` points at. **Only verified dives are
  indexable;** a raw dive earns no row. Use a dive's findings, but **cite the
  verified output**, not the raw dive. Craft/log files (`LESSONS`,
  `WORKFLOW_SKIPS`) stay *outside* the catalog.

## 9. `FOLDER_MAP.md`, the root inbox, and placement

**`FOLDER_MAP.md`** is the universal distributed-index convention
(`structure_conventions.md`): every content folder carries one (description +
map); machinery (`skills/`, `workspace/`) is exempt. Research specifics: it does
**not** re-list the detail the typed indexes hold (no double-writing); plain name
everywhere, the path disambiguates.

**Skills, assets, machinery.** A repo-specific skill need not sit in `skills/`;
it may live where it's produced **as long as it's registered in `CLAUDE.md`**
(the skills table is the roster — no separate skill roster). The division with
assets: **loaded/run by name → `skills/` + `CLAUDE.md` roster, not in
`ASSETS_INDEX`**; **a made visual retrieved by subject → `ASSETS_INDEX`**.

**The root inbox** is the universal intake rule (`structure_conventions.md`):
loose content at root is *accidental staging* — it means "needs placing" and is
swept into the same intake check as `workspace/staging/`. Root should normally
be empty of loose content.

## 10. Naming

Naming follows `naming_conventions.md` (content `lowercase_underscore`,
structural `ALL_CAPS`). Research-specific points, all governed by that file:

- Paper stems keep `who_what_year`, lowercase (`acemoglu_simple_ai_2024`). **The
  stem is the BibTeX cite key**, so renaming a stem rewrites the `.bib` keys and
  every `\cite{}` — see `naming_conventions.md` for the stem/cite-key rule.
- Compound surnames collapse to one lowercase token (`DellAcqua` -> `dellacqua`).
- Human-readable display text (titles, headings, index labels) is exempt.

## 11. The `_ex` exception discipline

The `_ex` gap-slot rule is universal (`structure_conventions.md`): at most two
per level, `_ex` suffix, a third (`_ex3`) flags a missing folder. In a research
repo the **levels are repo root and inside each line**, and a missing folder
means a gap against the research skeleton (§3) — the archetype is missing a
folder the work needs.

## 12. Retention and reading-order (keep both forms)

Both forms of a thing are kept by design — **no canonical-vs-derived flag**.
Retention by type: papers/materials keep PDF + extraction + summary; visuals keep
source (svg) + rendered; written work keeps **all `.md`s** (full thinking
history) but **only the last rendered doc**. The index encodes reading order
(§7); it does not mark a "canonical" form. This is a reading-cost optimization —
shallow first, heavy form only when needed.

**0-byte source placeholders:** if a source file is empty (0 bytes) but its
derivatives (extraction/summary) are full, delete the empty source, keep the
derivatives, and log the wanted original to re-add in `STATUS.md`.

## 13. Root files and machinery

Root files (`CLAUDE.md` + the archetype declaration, `STATUS.md`), `workspace/`
and its created-up-front subfolders, and `skills/` are the universal layer
(`structure_conventions.md`). Research-specific: `CLAUDE.md` declares
`variant = single-paper / agenda` and the line stage(s) alongside `type` and the
spec version.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; the `general/to_do/` tracker migrated to the universal `workspace/to_do/` 2026-06-08 (v4 universal-to-do build) — §4 keeps `notes/` + literature in `general/` and points at `structure_conventions.md` for the action tracker; §13 workspace listing reframed. §13 workspace names reconciled to the canonical set (`conversations` → `claude_conversations/`) 2026-06-09 (v4 workspace-folders build); slimmed both directions in the v4 archetype_conventions build 2026-06-09 — added the common-layer header note pointing at `archetype_conventions.md` for the lifted L2 rules (born-minimal promote-on-evidence, origin-typing, the shared-spine/"one repo or two" test, by-subject keying, the fixed skeleton), and pushed the L1 floor this spec had restated down to `structure_conventions.md` (§2 created-up-front → pointer + research's born-later list; §9 `FOLDER_MAP`/root-inbox → pointers; §13 root files/workspace → pointer; §11 `_ex` general rule → the floor, keeping research's levels + missing-folder meaning). **Post-build review fixes 2026-06-10** (v4 archetype_conventions review): §1 north-star slimmed to research's *form* of the L2 by-subject acceptance test (the general statement now lives once in `archetype_conventions.md`); §6 gains research's form of the "one repo or two" test (the realization L2's spine section cites, previously missing); §7's index-behavior lead re-pointed to the new L2 typed-index-behavior section, keeping research's line-sectioned form, and the standalone "No `MASTER_INDEX`" paragraph dropped (L2 owns it). §9's root-inbox paragraph reworded to the root-as-accidental-staging framing 2026-06-10 (v4 staging-intake-funnel build) — loose root content is swept into the universal intake check. Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
