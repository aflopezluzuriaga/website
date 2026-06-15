# STATUS — website

*Last updated: 2026-06-15 — reviewed*

## What this repo is

Andrea Lopez-Luzuriaga's personal academic website, served via GitHub Pages at andrealopezluzuriaga.net. A deliberately fast, simple, low-bandwidth static site (hand-edited HTML/CSS), with published papers under `papers/` and images under `fotos/`. Solo repo — Andrea is the only contributor and the only person who interacts with Claude here. No fixed timeline; ongoing maintenance.

## Workflow mode

**Workflow mode:** main_only

<!-- Solo static site, direct HTML/CSS edits — PR overhead not worth it. Flip to `branches` if a larger rework ever warrants isolation. -->

## Cluster activations (current)

- Source material: off
- Writing and deliverables: off
- Voice and style: off
- Final-production formats:
  - Word: off
  - FMM LaTeX paper: off
  - Academic paper LaTeX: off
  - Academic slides: off
  - FMM coordination slides: off
- Always-active skills: shipped (palette, repo and session infrastructure, brainstorming, kit metadata)

Last curated: 2026-06-15 (initial integration — Part A, NONE archetype, zero optional clusters)

## Current state

- **Kit integration:** Done. The repo was set up via PROJECT_SETUP Part A reconciled to an existing repo (NONE archetype, no optional clusters). `CLAUDE.md`, `STATUS.md`, the `workspace/` skeleton, and `skills/` (always-active floor + `LastSkillUpdate/` mirror) landed in the initial setup commit. The kit source folder `propagation_v4.1/` was removed on 2026-06-15 (curated copies retained in `skills/`; full kit exists in the separate kit repo).
- No site-content workstreams in flight.

### Pending re-integrations

(none)

### Pending placement fixes

(none)

### Index audit

Index audit last run: (never)

## Recent sessions

- **2026-06-15** — Removed `propagation_v4.1/` (full kit folder); curated subset retained in `skills/`. Resolved the kit-disposition open question.
- **2026-06-15** — Initial kit integration (Part A, NONE archetype, zero optional clusters): generated `CLAUDE.md` and `STATUS.md`, scaffolded the `workspace/` standing folders and `skills/` (always-active floor mirrored into `LastSkillUpdate/`).

## Open questions

(none)

## Known issues

- **Git push blocked:** the egress proxy rejects git clone/push for this environment, so all repo writes go through the GitHub REST API (Contents API for single files, Trees API for atomic multi-file commits). See `skills/github_api_workflow_skill.md`.

---
*STATUS.md generated 2026-06-15 from STATUS_template.md (kit v4.1).*
