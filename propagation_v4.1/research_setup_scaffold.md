---
name: research-setup-scaffold
description: >
  Birth skeleton for a NEW research repo. Born minimal (a single line, N=1, a
  paper); promotes to an agenda (N>1) if more lines appear, no migration. Built
  from new_repo_setup.md Step 3; full design in research_archetype_spec.md.
  Kit-resident; not copied into content repos.
---

# Research archetype — new-repo scaffold (Phase-1 birth skeleton)

*Build this for a NEW research repo. Born minimal: a single line (N=1, a paper); it promotes
to an agenda (N>1) if more lines appear. No migration — just create the skeleton. Full design:
`research_archetype_spec.md`.*

## Create
```
REPO ROOT
├── CLAUDE.md            declares: type=research, variant=paper (N=1) | agenda (N>1),
│                        line stage(s), spec version; serves as merge router
├── STATUS.md
├── <line>/              PREFIXED line-container, named for the line — even a lone paper
│   │                    gets <paper>/, never a bare draft/ at root (the line is named from
│   │                    day one so growth is append-only)
│   ├── FOLDER_MAP.md
│   ├── draft/           the line's primary written output (universal across stages)
│   ├── quantitative/    active-stage work folder
│   ├── qualitative/     active-stage work folder
│   ├── research_proposal/  active-stage work folder
│   └── deliverables/    umbrella; categories born on demand
│        (context/ born at expansion, not at N=1; correspondence/ born on demand)
├── general/             central shared LITERATURE layer
│   ├── FOLDER_MAP.md
│   ├── papers/          each paper = text + summary
│   │   ├── text/
│   │   └── summaries/
│   ├── background/
│   └── notes/           central cross-line notes
├── skills/              GeneralSkills/ + single-file skills (folder-skill rule)
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
└── (funding/ agenda-level, first-class — born on demand)
```

The work folders inside the line-container reflect the line's **stage** (active / editing /
chapter / advisory), which `new_repo_setup.md` proposes and Andrea confirms. The set above is
the **active** offer (a new paper's default); other stages offer fewer folders. Stages offer,
never limit — any folder is still born on demand if the line grows into it.

## Six root indexes (create all up front, self-documenting, empty-but-headed, ALL_CAPS)
`MATERIALS_INDEX` · `OUTPUTS_INDEX` · `ASSETS_INDEX` · `PAPERS_INDEX` · `NOTES_INDEX` · `DEEPDIVES_INDEX`

## Rules at birth
- The line is a **prefixed container from day one**; a second line is added beside it (append-only).
- Naming: content `lowercase_underscore`, structural `ALL_CAPS`; paper stem = `who_what_year`,
  lowercase, and doubles as the BibTeX cite key (see `naming_conventions.md`).
- `FOLDER_MAP.md` in every content folder; machinery (`skills/`, `workspace/`) is exempt.
- Indexes are pointer-only, line-sectioned, self-registered at creation.
- Universal floor (naming, structure, import protocol) per `naming_conventions.md` /
  `structure_conventions.md`, **plus the archetype-common layer** (`archetype_conventions.md`)
  — every archetype repo carries it; a NONE repo does not.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; `workspace/to_do/` added to the scaffolded universal layer 2026-06-08 (v4 universal-to-do build); research's `general/to_do/` retired in favor of it; `workspace/multisession_active_tasks/` added 2026-06-08 (v4 multisession_task build); the workspace subtree reconciled to one created-up-front labeled-empty-home convention 2026-06-09 (v4 workspace-folders build) — `_import_staging/` merged into shared `workspace/staging/`, `conversations/` → `claude_conversations/`, `branch_logs/`/`visuals/` added, and `agent_outputs/`/`visuals/` marked curated-skill (archetype-scoped). The archetype-common layer (`archetype_conventions.md`) added to the birth line 2026-06-09 (v4 archetype_conventions build). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close. Post-v4 (2026-06-12): noted each `workspace/` subfolder carries a `README.md` label (see `structure_conventions.md`).*
