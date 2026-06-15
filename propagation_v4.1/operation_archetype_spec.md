---
name: operation-archetype
description: >
  The structure-and-index preset for an operation repo — a working repository for
  one dated, multi-year effort to achieve policy reform(s), one reform or a matrix
  of several. Kept only by repos whose declared type is operation. Read after
  structure_conventions.md and archetype_conventions.md (the common layers),
  alongside naming_conventions.md. Defines the reform unit and
  the matrix, the question/sub-product feedback loop, the structure (reforms/,
  funding/, products/, oneoffs/), first-class reliability + confidentiality tags,
  intake, and the products layer — the invariants the archetype audit checks an
  operation repo against.
---

# Operation archetype — spec

*Sibling to the research and coordination archetypes. Shares the universal floor
(naming, `FOLDER_MAP`, structure conventions, the `_ex` rule, reading-order;
`naming_conventions.md` / `structure_conventions.md`) and the archetype-common
layer (born-minimal promote-on-evidence, origin-based typing, the shared-spine /
"one repo or two" test, by-subject keying, the fixed skeleton;
`archetype_conventions.md`) by reference. This doc describes only what
is **different** about an operation repo.*

---

## 1. The shape — one archetype, N reforms

An operation pursues **policy reform(s)** toward a dated target. The unit is the **reform** (a policy change). Like the other two archetypes it is **one archetype with N units**, and the archetype-common N=1→N>1 promotion shape (`archetype_conventions.md`) applies here as reforms: a **single-reform operation (N=1)** promotes to a **matrix (N>1)** when a second reform appears — born-additive, no migration. (Research's line→agenda and coordination's task→composition are the same shape, stated once in the common layer.)

**Matrix tier = OUTCOME, reforms nest under outcomes.** A matrix is organized by **outcome component**, and **reforms nest under outcomes** — `reforms/{outcome}/{reform}/` — because one outcome can carry several reforms. "One component = one reform" does **not** hold; decide outcome/reform layering up front, not mid-structure. **N=1 (single-reform operation):** one reform, no matrix — the reform *is* the operation's focus; lighter scaffold. **N>1 (multi-reform operation):** a **versioned policy-change matrix** coordinates the reforms (V0→V1→V2). A single-reform operation **promotes to a matrix** when a second reform appears — born-additive, no migration (per the §1 promotion shape).

`CLAUDE.md` declares: type = **operation**, the operation + target/date, single-reform or matrix, the reform(s), and the spec version.

## 2. The loop — the generative engine

A reform is worked by a **feedback loop**, not a one-way pipeline:

> **matrix / reform ⇄ policy questions ⇄ sub-products**

- **Forward:** a reform poses **policy questions** (what does the country need? what's the best practice?); working a question produces **sub-products** (diagnostics, research notes, positions); sub-products inform the reform / the matrix.
- **Backward:** a sub-product's analysis — or the **government's decision** in response ("option A isn't viable given your analysis") — **revises the matrix**, which re-opens or retires reforms and questions, which changes what sub-products are needed.

Each **matrix version is a snapshot of the loop's state** (which is why the matrix is versioned — V0→V1→V2 records the loop turning). This loop is the "research-like" feel of an operation, but bounded: a policy question is pursued **instrumentally** (to decide/justify a reform), not for its own sake.

**Research can outrun the matrix.** The loop often produces more analysis than the matrix carries — sub-products that map to *no live matrix condition* (e.g. adjacent-policy diagnostics, landscape work, credit-rating analysis). They are **not** orphans: file under the nearest reform as broader-scope analysis (or as `products/` if operation-level). So **not every sub-product traces to a live reform.**

**Superseded-but-retained (the key rule).** When a reform or option is dropped, it and its sub-products are **not deleted** — they become the recorded **rationale**: the **decision and its reasoning** ("why we dropped A," the dispreferred-but-superior alternative and why it lost) in the **`POSITIONS_REGISTER`** (§6), and the **sub-products** re-filed under the nearest reform as broader-scope analysis — both retained and citable. The matrix changing its mind deliberately is normal; the work that drove the change is re-filed as rationale, never orphaned. *(The operation form of the universal nothing-destroyed-on-a-state-change rule — `structure_conventions.md`.)* It is also exactly the prior-position the **position-coherence check** (§6) surfaces at write-time, read from the register.

## 3. The structure

```
OPERATION REPO   (CLAUDE.md: operation, target/date, single-reform|matrix, spec)
├── CLAUDE.md · STATUS.md · POSITIONS_REGISTER.md · the root indexes (typed; reliability-tagged)
│
├── reforms/                ◄── the unit (one archetype, N reforms)
│   ├── MATRIX.md           the versioned policy-change matrix — N>1 ONLY (the coordinator;
│   │                       tracks versions + which reforms are live / dropped-retained).
│   │                       A single-reform op has no MATRIX.md.
│   └── reform_<x>/
│       ├── FOLDER_MAP.md
│       ├── questions/      the policy questions worked for this reform (the loop)
│       ├── subproducts/    outputs answering them (diagnostics, notes, positions);
│       │                   recirculate as inputs; each carries a reliability tag
│       └── (status: live / dropped-retained = rationale)
│
├── funding/                ◄── ROOT-level: funds the OPERATION (not a reform)
│   └── tc_<source>/        a funding-source workstream (TC abstract + funder formulario);
│                           integrates the operation's inputs into a fundable proposal; 1+
│
├── reference/              shared inputs across reforms; reliability-tagged; origin-typed
│   ├── <by source or by kind>            (organize by source-institution or by kind —
│   │                          a literature/strategy/data sub-axis is per-repo, not
│   │                          archetype-level — use it only if the sources divide that way)
│
├── products/               ◄── operation-level deliverables that recirculate as inputs
│   └── <product lines>     incl. standalone knowledge products (accreted)
│
├── oneoffs/                ad-hoc requests (boss/ministry "3-pager on X"); general skills +
│                           shared reference; no dedicated skill; promote → a product line
├── skills/                 GeneralSkills/ + single-file skills (folder-skill rule applies)
└── workspace/              scratch (Claude's + Andrea's); subfolders created up front per
                            structure_conventions.md: claude_conversations/ · brainstorms/ · to_do/ ·
                            multisession_active_tasks/ · staging/ · branch_logs/ · agent_outputs/ · visuals/
```

Notes on the structure:

- **`reforms/` and `funding/` are both at root.** Funding funds the *operation* (it pays for the research and diagnostics), so it is operation-level, parallel to the reforms — not nested under any one reform. Each funding source (the TC) is a workstream folder inside `funding/`. **Funding is born-on-creation, not scaffolded empty** — an operation with no funding instrument has no `funding/` folder at all. Usually present, not always.
- **`MATRIX.md` lives inside `reforms/` and only at N>1** — it is the cross-reform coordinator/index, not a sub-product. At N=1 it's absent. **Matrix items are born-on-creation** — no folder per matrix item (outcome/reform) until it has content.
- **`POSITIONS_REGISTER.md` is operation-wide, at root** — the position-coherence surface (§6). Content-bearing (distilled positions, not just pointers), so it sits **outside** the pointer-only `*_INDEX` family; present from birth in every operation repo, single-reform or matrix.
- **The loop nests inside each reform** — `questions/` + `subproducts/`. One reform can have many sub-products.
- **No nested `CLAUDE_*` files — fold into the folder's `FOLDER_MAP`.** A folder-local routing doc is a `FOLDER_MAP`, not a second front-door file; only the repo root has `CLAUDE.md`.
- **Folder-skills.** A repo-specific skill that needs its own folder (multiple
  files, a `corpus/`) does not live in `skills/` (the floor's folder-skill rule —
  `structure_conventions.md` "Skills layout"). Operation's form: an
  **operation-wide** folder-skill sits at the repo root, sibling to
  `skills/`/`reference/`; a **reform- or product-scoped** folder-skill nests with
  the work it serves, inside that reform or product line — multiplicity inside
  folders, never at root.
- **`subproducts/` ≠ `products/`.** `subproducts/` are the per-reform analysis feeding a reform; `products/` are operation-level deliverables that recirculate as inputs across the operation. Different layers.
- **Sub-products may carry their own local index** by design (operation repos run heavy; sub-products self-indexing is intended, not drift) — but see §6 on the currency risk.

## 4. Reliability + confidentiality tags (first-class)

The feature that distinguishes operation repos: **every input carries a reliability category and a confidentiality marking**, relied on at work-time. These are **load-bearing metadata** — a column in the indexes, traveling with the input.

- **Reliability scale:** **Citable / Validated / Under construction / Working
  draft / Background / Flagged.** The tag records **citability, not origin**
  (origin is the separate origin-typing axis). Two levels are not-citable-yet for
  *different reasons, with different routes to citable*:
  - **Working draft** — *your own* unfinished output: not citable because you
    haven't finished it; becomes Citable when you **finish/publish** it.
  - **Background** — external material you consult but haven't validated: not
    citable because you haven't checked it (its author may well have finished
    it); becomes Citable when you **verify** it. Legacy "Reference"-style notes
    map here, not to Working draft.
- **Confidentiality:** **PUBLIC / INTERNAL / CONFIDENTIAL**, running alongside reliability — also first-class.

## 5. Intake

- **Mediated colleague inputs (tracked):** documents arrive from named colleagues, are processed through the document/paper-processing skills, and **reliability-tagged** on intake.
- **Fast ad-hoc requests (one-offs):** "a 3-pager on X" arrives structureless, gets a name, becomes a standalone product → the **one-off home** (general skills + shared reference, no dedicated skill). A recurring ad-hoc type **promotes** to a product line.
- **Imported processed material:** material brought in from another repo is
  staged through `workspace/staging/` per the universal intake funnel
  in `structure_conventions.md` — so an import lands typed and placed, not
  dumped.

## 6. The products layer — structure, reliability, and navigation

Operation repos generate a **stream of outputs that recirculate as inputs** (a sub-product answering reform A feeds reform B and the funding application; products feed later products). This is the layer the category most depends on.

**Borrowing is not citing.** Outputs recirculate freely as inputs, but when a
later output draws on an earlier one that is still a **Working draft**, it does
**not** cite that draft — it cites the **original resources the earlier output
cited** (each carrying its own reliability), so every citation resolves to a
published/validated source. Once the earlier output is finished/published it
becomes **Citable** and can be cited directly (§4). The repo's outputs build on
each other freely while no citation ever resolves to an unpublished sibling
draft.

**Structure (the archetype provides):** `products/` and per-reform `subproducts/` as homes; every output a first-class, reliability-tagged item — borrowable as a later input immediately, directly citable once it reaches Citable; superseded reforms' sub-products retained as rationale (§2).

**Navigation — three layers, read shallow-to-deep.** Operations file by source but are **retrieved by topic**, so retrieval is topic-keyed, and it runs in the universal reading-order discipline (`structure_conventions.md`: stop at the shallowest layer that answers, open the heavy form only when needed) with a rung added for *positions*:

- **`OUTPUTS_INDEX` — the quick scan.** Pointer-only per the archetype-common typed-index behavior (`archetype_conventions.md`; the register below is the documented content-bearing exception): each output keyed by **topic**, carrying its **reliability** tag and a **pointer** into the register and the output. Grep by topic to see what exists on X.
- **`POSITIONS_REGISTER.md` — the distilled middle layer.** What each output *concluded and recommends*, and the decision it resolved — without opening every output.
- **The output itself — the full detail**, opened only when the distilled row isn't enough.

**`POSITIONS_REGISTER.md` — the position-coherence surface.** A *register* is a maintained authoritative record — not an index (it holds content, not just pointers) and not a log (it is revised, not append-only). Created up front and self-documenting, at the **repo root** beside the indexes and `STATUS.md`, spanning the whole operation (coherence cuts across reforms and across the multi-year span, so it is operation-wide, not per-reform). Each row carries:

> **topic · position/decision · recommendation · shaping note · pointer to the output**

The **shaping note** is where the value concentrates: the *resolved trade-off* — "chose A over B," or "technically B is stronger but not politically feasible, so A" — the dispreferred-but-superior alternative and **why it lost**. That note is what stops a closed question being reopened, or a set-aside option re-argued, a year on.

The register **owns its positions directly** — reform- and option-level decisions included — and **does not depend on the matrix**: it stands up identically whether the operation is single-reform (no matrix), multi-reform, or hasn't settled one. The matrix, *where it exists*, records the **government's feasibility/intent** (a slow-moving statement of what is wanted and possible); the register records **our analysis and the decisions it drove**, with their rationale at a point in time. Different facts about different things — an option can be analytically strong yet politically off the table — so the register restates nothing the matrix holds and never relies on it (a soft "see also" is fine; a dependency is not).

**Feeding process (the currency guard).** A row is written **when an output is produced**, and when the loop (§2) revises a position the row is **updated under superseded-but-retained** — prior position kept as rationale, current one made live. That feeding process *is* the currency guard: it keeps the register a record of live positions rather than the stale "everything" snapshot operation repos drift toward. The discipline generalizes — a self-indexing sub-product (§3) earns a local register only with a feeding process behind it; **an index or register with no feeding process is a liability**, which `housekeeping_skill.md`'s operation-only currency-guard flag surfaces.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; `workspace/to_do/` added to the §3 workspace listing 2026-06-08 (v4 universal-to-do build, inheriting the universal tracker from `structure_conventions.md`); the §3 workspace listing reconciled to the canonical created-up-front set 2026-06-09 (v4 workspace-folders build) — legacy `notes/` dropped, `conversations/` → `claude_conversations/`, `_import_staging/` → shared `staging/`, `branch_logs/`/`visuals/` added; the deferred §6 navigation layer built 2026-06-09 (v4 operation product-navigation build) — §6 rewritten from "navigation deferred" to the three-layer topic-keyed retrieval (lean `OUTPUTS_INDEX` → `POSITIONS_REGISTER` → output), the new root-level **`POSITIONS_REGISTER.md`** defined as the position-coherence surface (matrix-independent; owns reform/option decisions and their shaping rationale directly), the currency guard recast as the register's write-on-produce + superseded-but-retained feeding process, and §2/§3 reconciled to read coherence from the register rather than the matrix version (matrix-as-versioned-coordinator framing deliberately left intact); companion edit `operation_setup_scaffold.md`. Re-pointed to the new common layer in the v4 archetype_conventions build 2026-06-09 — the header note references `archetype_conventions.md` (origin-typing moved there from the by-reference list), §1's N=1→N>1 shape re-pointed and its cross-type table removed (the "written 3×" duplication), and §6's reading-order cross-reference re-aimed from "research §7" to the universal home in `structure_conventions.md`; the matrix / loop / reliability-confidentiality / products / `POSITIONS_REGISTER` content left intact. **Post-build review fixes 2026-06-10** (v4 archetype_conventions review): the header's "one-off home and folder-skill nesting detail it inherits from coordination (§2a)" removed — a deployed operation repo carries no coordination spec (single-select), so the reference was unreadable in place — and a self-contained **Folder-skills** note added to §3's structure notes (operation-wide at root; reform/product-scoped nests with the work); §2's nothing-destroyed parenthetical re-pointed at the new universal floor section; §6's `OUTPUTS_INDEX` "pointer-only like every `*_INDEX`" re-pointed at the new L2 typed-index behavior, the register exception kept. June-11 final-pass fix build (v4): §5's 'universal import protocol' phrasing updated to the universal intake funnel (W2 — the logged Tier-2 ride from the staging-intake-funnel build). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
