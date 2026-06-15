---
name: cross-repo-import
description: "Workflow for importing already-processed material from another repo into this one — pulling files that were created or processed elsewhere and giving them a proper home here. Use when material that lives in a different repo needs to be brought in and placed, not re-made. Triggers: 'import X from repo Y,' 'bring in the material from [other repo],' 'pull the processed files from [repo] into here,' 'I need the [docs/extracts/notes] from my other repo,' 'copy over the [folder] from [repo].' The skill REMINDS and WALKS THROUGH — it never touches the access token itself and never reaches across repos on its own; the token re-scope is always Andrea's action. Does NOT cover the cross-repo discovery sweep (that is Andrea-driven, in SkillPropagation's incoming_discovery_skill.md); does NOT cover exporting or pushing material OUT to another repo (import is one-directional, read-only on the source); does NOT cover placing material already inside this repo (that is the intake funnel's placement check — structure_conventions.md); does NOT cover plain git operations."
---

# Cross-repo import workflow

**Status:** active.
**Owner:** Andrea Lopez-Luzuriaga.
**Applies to:** bringing **already-processed** material in from another repo — source PDFs, extracts, summaries, notes, a finished deliverable — and landing it **typed and placed** in this repo, not dumped at root. Universal: any repo can run an import, including a NONE repo.

**Does not apply to:** the discovery sweep that compares `skills/` across repos (Andrea-driven, SkillPropagation only); exporting material *out* of this repo (import is read-only on the source); placing a file that is already in this repo (the intake funnel / folder-creation placement check); general git use.

---

## Why this workflow exists

Importing by hand has a recurring failure mode (the "ghost"): the *derived* form gets pulled — an extract, a summary, a built `.docx` — while the *source* it came from is left behind in the other repo. Later the source is needed and it is gone from view. The fix is a staging step where the keep / drop / what-must-come-too decision is made deliberately **before** anything lands, instead of file-by-file on the fly. The staging home and its lifecycle are defined once in `structure_conventions.md` (the intake funnel); this skill owns the cross-repo **step-by-step** — one caller of that funnel — and points back there rather than redefining it.

## The token boundary (read first)

Claude sees one repo per session — the home repo, via its access token. Reading another repo requires the token to be **scoped to both**, and that change is **always Andrea's** (Settings → the fine-grained token → add the source repo, Contents: read). This skill's job is to **remind her at the right moments and walk the workflow**; it never edits the token, and it never reads the source repo until Andrea confirms the scope is in place. The import is **read-only on the source** — nothing is written to or deleted from the other repo.

## Workflow

1. **Confirm the import.** What is being brought in (which files / folder), from which source repo (`owner/name`), and roughly what it is (source material, derived artifacts, a deliverable). If the source repo isn't named, ask.

2. **Remind Andrea to scope the token, then stop.** Ask her to add the source repo to the token's repository access with Contents read, and to confirm when done. **Wait** — do not attempt a cross-repo read before she confirms.

3. **Read the named material into `workspace/staging/`.** Once both repos are visible, use the read helpers in `github_api_workflow_skill.md` pointed at the source `owner/name` (`gh_read`/`gh_list`, which already resolve the repo from the module global — set it to the source; binary/large files go through `gh_read`'s blob path, never the Contents API). Pull the named items into this repo's `workspace/staging/`. Nothing lands in the tree yet.

4. **Select in staging — the keep / drop / what-must-come-too call.** This is where the ghost problem is prevented, and it happens **here, before placement**. For each item, identify whether it is a **source** or a **derived** form, and whether its counterpart also needs to come: the kit keeps **both forms** when both carry information (the source PDF *and* its extract), so importing a derived artifact while orphaning its source is the failure to catch. Drop genuine working residue that has no reason to live here. Surface the keep/drop list to Andrea; nothing leaves staging until she confirms.

5. **Place each kept item by the repo's normal placement rules.** Hand off to the intake funnel's full check (`structure_conventions.md`) — origin-typed intake for the archetype repos (`materials_processing_skill.md` and the paper branches), the placement proposal otherwise. Read the target home from the current `FOLDER_MAP`s/indexes; an import re-files into *this* repo's shape and is **not** governed by how the source repo had it organized. Register each landed item in the right index/`FOLDER_MAP`.

6. **Empty staging.** Once everything kept is placed, clear `workspace/staging/` back to its labeled-empty resting state.

7. **Remind Andrea to re-scope the token back.** Prompt her to remove the source repo from the token's access now that the import is done. Hers to do; the skill only reminds.

## Key rules

- **Never touch the token; only remind.** Steps 2 and 7 are reminders. Claude does not edit, store, or assume the token's scope — it waits for Andrea's confirmation.
- **Read-only on the source.** Reads only; never write to or delete from the other repo. The source's files stay exactly as they were.
- **Select before placing.** The keep/drop decision is made in staging (Step 4), not file-by-file during placement. This is the ghost-problem fix; do not skip it.
- **Don't orphan a source.** Before dropping a source form, confirm its derived form carries everything needed — and vice versa. When unsure, keep both (the kit's keep-both-forms rule).
- **Re-file into this repo's shape.** Placement reads this repo's maps; the source repo's organization does not carry over.

## Edge cases

- **Large or binary files (PDFs, images, `.docx`).** Use `gh_read` (blob API) for these — the Contents API silently truncates above ~1 MB. See `github_api_workflow_skill.md`.
- **A big, multi-session import.** If selection and placement won't finish in one session, it is a candidate for a carryover (`multisession_task_skill.md`); the half-imported state lives in `workspace/staging/` meanwhile, which is exactly what staging is for.
- **Source material the other repo had indexed.** Don't carry its index entries verbatim — re-index here per this repo's placement rules (Step 5).
- **Token can't be scoped to the source (e.g. a repo Andrea can't grant the agent access to).** Then the import is Andrea-bridged: she downloads the material and drops it into this repo's `workspace/staging/` herself, and the workflow resumes at Step 4 (select) — Steps 2–3 are simply skipped.

---

*Last updated: June 10, 2026 — v2.0.0 (v4 staging-intake-funnel build: reconciled to caller status — the conventions pointer re-aimed at the generalized intake-funnel section (the old import-section title no longer exists), Step 5's hand-off named as the funnel's full check, and the placing-inside-this-repo boundary line re-pointed in frontmatter and body. Workflow unchanged. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 9, 2026 — v2.0.0 (v4 cycle, cross-repo-import build: new skill. Operationalizes the universal import protocol whose staging home and lifecycle were defined in `structure_conventions.md` (workspace-folders build) — this skill owns the step-by-step and points back there. Prompt-don't-perform throughout: the token re-scope is always Andrea's (Steps 2/7 remind, never touch it); reads are one-directional and read-only on the source, routed through `github_api_workflow_skill.md`'s read helpers pointed at the source `owner/name`; the keep/drop/what-must-come-too selection happens in `workspace/staging/` before placement (the ghost-problem fix from the BankStrategy import); placement is a soft hand-off to the repo's normal origin-typed intake / folder-creation placement check, not a hard invoke, keeping it clean against the cluster-completeness invariant. Placed in the always-active Repo and session infrastructure cluster (universal — any repo, NONE included — and fires only on an import trigger, the same always-active-but-triggered pattern as `github_api_workflow_skill.md`). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.)*
