---
name: operation-setup-scaffold
description: >
  Birth skeleton for a NEW operation repo. Born minimal (single-reform, N=1, no
  matrix); promotes to a matrix (N>1) and grows funding/ when there's an
  instrument, no migration. Built from new_repo_setup.md Step 3; full design in
  operation_archetype_spec.md. Kit-resident; not copied into content repos.
---

# Operation archetype — new-repo scaffold (Phase-1 birth skeleton)

*Build this for a NEW operation repo. Born minimal: single-reform (N=1, no matrix); promotes
to a matrix (N>1) if more reforms appear; `funding/` born only if there's a funding instrument.
No migration. Full design: `operation_archetype_spec.md`.*

## Create
```
REPO ROOT
├── CLAUDE.md            declares: type=operation, operation + target/date,
│                        single-reform | matrix, the reform(s), spec version
├── STATUS.md
├── POSITIONS_REGISTER.md  operation-wide position-coherence surface (§6); content-bearing,
│                        outside the pointer-only *_INDEX family; present from birth
├── reforms/             the unit
│   ├── (MATRIX.md only if N>1 — versioned policy-change matrix, tiered by OUTCOME;
│   │    reforms nest under outcomes: reforms/{outcome}/{reform}/)
│   └── reform_<x>/
│       ├── FOLDER_MAP.md
│       ├── questions/   the policy questions (the loop)
│       └── subproducts/ outputs answering them; reliability-tagged; recirculate as inputs
├── reference/           shared inputs; reliability + confidentiality tagged; origin-typed
│   └── FOLDER_MAP.md     (organize by source or kind — no fixed sub-axis)
├── products/            operation-level deliverables that recirculate as inputs
│   └── FOLDER_MAP.md
├── skills/              GeneralSkills/ + single-file skills
├── workspace/           subfolders created up front as labeled-empty homes (empty = state);
│   │                    contents born on use; each carries a standing doc up front (INDEX where
│   │                    a skill owns it — claude_conversations, agent_outputs — else README; see structure_conventions.md).
│   ├── claude_conversations/
│   ├── brainstorms/
│   ├── to_do/
│   ├── multisession_active_tasks/
│   ├── staging/
│   ├── branch_logs/
│   ├── agent_outputs/   (curated: agent_research_verification)
│   └── visuals/         (curated: visuals_workflow)
├── (oneoffs/ born when the first ad-hoc request arrives; general skills + shared reference)
└── (funding/ at ROOT only if there IS a funding instrument — born on creation;
     funding funds the OPERATION, not a reform; one workstream folder per source)
```

## Root indexes (create up front, self-documenting, empty-but-headed, ALL_CAPS)
`INSTANCES_INDEX`-equivalent for sub-products · `OUTPUTS_INDEX` · `PAPERS_INDEX` ·
`MATERIALS_INDEX` · `ASSETS_INDEX` · `NOTES_INDEX` · `DEEPDIVES_INDEX` · `REFERENCE_INDEX`
— every input row carries a **reliability** tag (Citable / Validated / Under construction /
Working draft / Background / Flagged) and a **confidentiality** marking
(PUBLIC / INTERNAL / CONFIDENTIAL).

## Rules at birth
- N=1 (single reform, no matrix) now; promotes to a matrix additively if a 2nd reform appears.
- Matrix (when it exists) is tiered by outcome; one outcome may hold several reforms.
- Matrix items are born-on-creation — no folder per outcome/reform until it has content.
- Dropped reforms/options are **retained as rationale**, never deleted.
- No nested `CLAUDE_*` files — folder routing lives in `FOLDER_MAP`.
- Products navigation: lean topic-keyed `OUTPUTS_INDEX` → `POSITIONS_REGISTER.md` → output,
  read shallow-to-deep (`operation_archetype_spec.md` §6). The register owns positions directly
  (matrix-independent) and is fed write-on-produce + superseded-but-retained — that feeding
  process is the currency guard.
- Universal floor (naming, structure, import protocol) per `naming_conventions.md` /
  `structure_conventions.md`, **plus the archetype-common layer** (`archetype_conventions.md`)
  — every archetype repo carries it; a NONE repo does not.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; `workspace/to_do/` added to the scaffolded universal layer 2026-06-08 (v4 universal-to-do build); `workspace/multisession_active_tasks/` added 2026-06-08 (v4 multisession_task build); the workspace subtree reconciled to one created-up-front labeled-empty-home convention 2026-06-09 (v4 workspace-folders build) — `_import_staging/` merged into shared `workspace/staging/`, `conversations/` → `claude_conversations/`, `branch_logs/`/`visuals/` added, and `agent_outputs/`/`visuals/` marked curated-skill (archetype-scoped); `POSITIONS_REGISTER.md` added to the birth tree and the products-navigation rule rewritten from deferred to built 2026-06-09 (v4 operation product-navigation build). The archetype-common layer (`archetype_conventions.md`) added to the birth line 2026-06-09 (v4 archetype_conventions build). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close. Post-v4 (2026-06-12): noted each `workspace/` subfolder carries a `README.md` label (see `structure_conventions.md`).*
