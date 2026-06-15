---
name: coordination-setup-scaffold
description: >
  Birth skeleton for a NEW coordination/repeated-task repo. Born minimal (one
  task, N=1); promotes to composition (N>1) and grows a one-off home on evidence,
  no migration. Built from new_repo_setup.md Step 3; full design in
  coordination_archetype_spec.md. Kit-resident; not copied into content repos.
---

# Coordination archetype — new-repo scaffold (Phase-1 birth skeleton)

*Build this for a NEW repeated-task repo. Born minimal: one task (N=1); promotes to composition
(N>1) if a 2nd task appears, and grows a one-off home when the first one-off arrives. No
migration. Full design: `coordination_archetype_spec.md`.*

## Create
```
REPO ROOT
├── CLAUDE.md            declares: type=coordination/repeated-task, single-task|composition,
│                        variant flat|cyclic, the confirmed instance layout, spec version
├── STATUS.md
├── skills/              GeneralSkills/ + single-file skills (at most one folder = GeneralSkills/)
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
├── reference/           consulted each run, maintained
│   └── FOLDER_MAP.md
├── instances/           the runs (N=1: subject-keyed runs directly;
│   │                    N>1: nest by task — see below)
│   └── FOLDER_MAP.md     records the confirmed per-repo instance layout (X/Y/Z)
├── corpus/              what built/tunes the skill
│   └── FOLDER_MAP.md
├── assets/              born-shared work-product building blocks
│   └── FOLDER_MAP.md
└── (oneoffs/ born when the first one-off arrives)
```
- **N=1 folder-skill:** if the task's skill needs a folder, it sits at ROOT as `{task}_skill/`.
- **N>1 (composition):** default **self-contained** `tasks/{task}/` (skill + corpus + instances
  together) for heterogeneous tasks; layer-parallel variant only if tasks share a domain skill.

## Eight root indexes (create up front, self-documenting, empty-but-headed, ALL_CAPS)
`INSTANCES_INDEX` (spine, run-keyed) · `OUTPUTS_INDEX` (sectioned: by task, then one-offs) ·
`PAPERS_INDEX` · `MATERIALS_INDEX` · `ASSETS_INDEX` · `NOTES_INDEX` · `DEEPDIVES_INDEX` · `REFERENCE_INDEX`

## Rules at birth
- Instances subject-keyed (`review_<subject>`, `proposal_<subject>_<call>`).
- Origin-typing: brought-in → paper/material/asset; promotable rule (born instance-scope,
  promote to reference on 2nd use). Assets born-shared.
- `FOLDER_MAP.md` in content folders; skill-owned folders keep their `INDEX.md`.
- Universal floor (naming, structure, import protocol) per `naming_conventions.md` /
  `structure_conventions.md`, **plus the archetype-common layer** (`archetype_conventions.md`)
  — every archetype repo carries it; a NONE repo does not.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; `workspace/to_do/` added to the scaffolded universal layer 2026-06-08 (v4 universal-to-do build); `workspace/multisession_active_tasks/` added 2026-06-08 (v4 multisession_task build); the workspace subtree reconciled to one created-up-front labeled-empty-home convention 2026-06-09 (v4 workspace-folders build) — `agent_outputs/` added (it had been missing from coordination), `_import_staging/` merged into shared `workspace/staging/`, `conversations/` → `claude_conversations/`, `branch_logs/`/`visuals/` added, and `agent_outputs/`/`visuals/` marked curated-skill (archetype-scoped). The archetype-common layer (`archetype_conventions.md`) added to the birth line 2026-06-09 (v4 archetype_conventions build). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close. Post-v4 (2026-06-12): noted each `workspace/` subfolder carries a `README.md` label (see `structure_conventions.md`).*
