---
# Archetype declaration — set at setup (see PROJECT_SETUP Part A). Shared state,
# read by propagation and the audit. This repo is NONE: no archetype spec.
archetype:
  type: "NONE"
---

# CLAUDE.md — website

## Project Overview

This repo maintains Andrea Lopez-Luzuriaga's personal academic website, served via GitHub Pages at **andrealopezluzuriaga.net** (`CNAME`). It is a deliberately fast, simple, low-bandwidth site built from hand-edited HTML and CSS (`index.html`, `about.html`, `research.html`, `fast.css`), with published papers under `papers/` and images under `fotos/`. The design philosophy — keep it fast and simple, friendly to poor connections and mobile users, flag links to large files or external pages — is documented in `README.md`; the site is released under a Creative Commons BY-SA license.

**Deliverable:** the live site at andrealopezluzuriaga.net.

**Audience:** visitors to Andrea's academic site (colleagues, students, the general public), including readers on low-bandwidth connections in developing contexts.

**Language:** English. The site content is in English; the standard English-first workflow applies. No translation.

## Collaborators

- **Andrea Lopez-Luzuriaga** — sole owner, full repo access, the only person who interacts with Claude on this repo.

## Skills

Reusable skills are stored in `skills/`. These are cross-project tools — not specific to this project but referenced by this CLAUDE.md when relevant.

**Rule:** Read the relevant skill file before starting any task it covers. Do not rely on memory of the skill's contents from prior conversations.

This is a NONE-archetype repo with no optional skill clusters activated, so `skills/` carries the always-active floor only. `skills/` also holds the kit's reference/template files (`PROJECT_SETUP.md`, `CLAUDE_template.md`, `STATUS_template.md`, `CHANGELOG.md`) for completeness; these are reference material, not active workflows, so they have no rows below.

### Repo and session infrastructure

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/skill_authoring_skill.md` | Meta-skill: how to author a new skill that fits the kit's conventions | When Andrea says "let's write a skill for this," "we should codify this," or when revising an existing skill substantively |
| `skills/skills_curation_skill.md` | The per-propagation per-cluster curation workflow (Parts A/B/C) | At every propagation, or whenever a Part A/B/C workflow is entered |
| `skills/project_tracker_skill.md` | Defines `STATUS.md` as the repo's project-level tracker (session-start check, session-close update, freshness audit) | Every session: session-start check on Andrea's "yes," mandatory session-close update |
| `skills/finish_session_skill.md` | Session close-out orchestrator (uncommitted-work check → branch disposition → STATUS.md update → conditional conversation save) | Every session close ("thanks," "good night," "we're done," "let's wrap up") |
| `skills/writing_branch_skill.md` | Ephemeral single-document review branch (bracketed comments + direct edits) | Whenever a co-produced document is reviewed on a branch |
| `skills/exploration_branch_skill.md` | Long-lived isolated exploration branch for testing whether a `main` claim holds | When an offshoot must stay off `main` until resolved |
| `skills/multisession_task_skill.md` | Per-task carryover doc for a task that spans several sessions | When a task won't finish in one session and a resume prompt won't reliably carry it |
| `skills/repo_conversations_skill.md` | Save, index, and retrieve substantive Claude↔Andrea conversations in the repo | When Andrea asks to save a conversation, or after a substantive multi-turn exchange worth a permanent record |
| `skills/housekeeping_skill.md` | Three-mode infrastructure consistency check (audit / repair / index-audit) | When Andrea says "audit the repo," "run a consistency check," "is CLAUDE.md still accurate?" |
| `skills/github_api_workflow_skill.md` | GitHub REST API patterns when git push is blocked (Contents API for single files, Trees API for atomic multi-file commits) | When the environment blocks `git push` and repo writes go through the REST API — the case for this repo |
| `skills/cross_repo_import_skill.md` | Prompt-don't-perform import of already-processed material from another repo | When material from another repo needs to be brought in and placed here |

### Repo structure and archetype

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/naming_conventions.md` | Universal naming rule — content `lowercase_underscore`, structural `ALL_CAPS` | Before naming or renaming any file or folder |
| `skills/structure_conventions.md` | Universal structure layer — root files, `workspace/` + the `staging/` intake funnel, the `FOLDER_MAP` convention, governance rules, skills layout | When creating or placing any folder or file |

*(No archetype-common layer and no archetype spec — this is a NONE repo.)*

### Shared assets

| Asset file | Purpose | When to use |
|---|---|---|
| `skills/andreas_palette.md` | Andrea's canonical color palette — names, hex/RGB, character notes, aesthetic principles | Anytime colors are needed for an ad-hoc visual and Andrea hasn't named specific ones. Note: this is the FMM/work palette, not the website's own color scheme — do not apply it to the site's CSS unless Andrea asks |

### Thinking aids

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/brainstorming_skill.md` | Two-phase structured-questioning discipline for refining rough ideas before drafting, planning, or deciding | When Andrea says "let's brainstorm," "I want to think through X," or the task is vague and the right deliverable isn't obvious yet |

## Naming Conventions

The universal casing rule lives in `skills/naming_conventions.md` (content `lowercase_underscore`; structural files — the index family, `FOLDER_MAP`, `STATUS` — `ALL_CAPS`), and the folder model in `skills/structure_conventions.md`. This repo has no project-specific naming additions:

- **Site files are edited in place.** `index.html`, `about.html`, `research.html`, and `fast.css` are the live deliverable — edit them directly, no version-numbered filenames.
- **Git history is the version record.** No `archive/` binary-deliverable convention is needed here (the site files are plain text; git diffs cover revisions).
- **No `inputs_from_team/`** — this is a solo repo with no colleague inputs.

## Working Conventions

- **Trackers are the source of truth, not past chats.** `CLAUDE.md`, `FOLDER_MAP.md` files, and `STATUS.md` are the canonical record of where work was left off. Do not call `conversation_search` or `recent_chats` at session start; read the trackers. If Andrea references prior work, verify against the trackers first. Only search past chats when Andrea explicitly asks for a conversation not in the repo records.
- **STATUS.md is the project tracker — session-start check on Andrea's "yes," session-close mandatory update.** At session start, ask Andrea: *"Do you want me to check STATUS.md?"* If yes, follow `skills/project_tracker_skill.md`'s session-start protocol; if no, proceed. At session close, STATUS.md must be updated — draft, show Andrea, commit. The close-out sequence is orchestrated by `skills/finish_session_skill.md`.
- **Check placement before creating a folder.** When a new folder is needed, describe its purpose, read it against the repo's current `FOLDER_MAP`s, and propose the home before creating it. The first time Andrea points to a folder not in the maps, treat it as one she created: ask what it's for, run the placement check, then write its `FOLDER_MAP` and register it.
- **New material enters through `workspace/staging/`.** Anything new to the repo lands in `workspace/staging/` first, with no placement decision at drop time; placement out of staging runs the intake check in `skills/structure_conventions.md`.
- **Iterative workflow.** Andrea provides information in stages. Do not jump ahead or produce output without a go-ahead.
- **Don't infer — ask.** If you're missing information you need to act correctly — what file Andrea means, what counts as "done" — ask. Exception: when the gap is small enough to state your assumption inline and let Andrea correct it cheaply. Inferring silently is the failure mode.
- **Show before committing.** Before any write to the repo, briefly state what you're about to write and why, in prose, before the write tool call. One sentence is enough for routine writes. *Named exception: on a feature branch (per `skills/writing_branch_skill.md`), writes to the branch don't need per-write narration — the branch itself is the show-before-committing mechanism; the gate moves to the merge step.*
- **Codify after the third repetition.** If Andrea asks for the same type of task three or more times, check whether the pattern should be promoted to a rule (Working Conventions here, a repo-specific skill, or a status doc).
- **CLAUDE.md is a living document.** Update it as the project evolves.
- **"Uploaded" / "pushed" = GitHub repo.** When Andrea says she uploaded or pushed something, she means this project's GitHub repo.
- **Skills stay in `skills/`.** Do not duplicate skill content into CLAUDE.md — reference the skill file and read it when needed.
- **Repo file listing.** When you need to know what files exist in a folder, query the repo live via the GitHub API — do not rely on memory or a cached listing.

## Repository Structure

This is a NONE-archetype repo: it has only the universal floor (`skills/structure_conventions.md`: root files + `workspace/` + `skills/`) plus the site's own existing structure — no archetype-common layer, no archetype spec, no archetype folders.

To see what exists and where things live, read the live structure rather than a copy kept here:

- **The site itself** → root HTML/CSS files plus `papers/` (published PDFs) and `fotos/` (images), served via GitHub Pages (`CNAME` → andrealopezluzuriaga.net).
- **Kit infrastructure** → `skills/` (the always-active floor) and `workspace/` (universal session folders).
- **What's inside any given folder** → that folder's `FOLDER_MAP.md`.
- **What files are physically present** → query the repo live via the GitHub API; don't rely on memory or a cached listing.

---

*Created: June 15, 2026 — generated from `CLAUDE_template.md` (kit v4.1) via PROJECT_SETUP Part A, reconciled to an existing repo. Archetype: NONE. Optional clusters activated: none. Skills: always-active floor only.*
