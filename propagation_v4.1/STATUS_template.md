# STATUS — [Repo Name]

*Last updated: YYYY-MM-DD HH:MM — reviewed*

<!--
  This is STATUS.md, the project tracker for this repo.

  The header line above tracks the last update's timestamp and review state.
  - `reviewed` means Andrea reviewed the update before commit.
  - `unreviewed` means Claude committed the update at session close without
    Andrea's review (because she didn't have time). The flag will surface at
    the next session start so Andrea can review then.

  STATUS.md is read at session start (on Andrea's "yes") and updated at
  session close (mandatory). See `skills/project_tracker_skill.md` for the
  full protocol.

  Sections can be omitted if not applicable. The structure is a guide,
  not a contract.
-->

## What this repo is

[One paragraph. Stable across sessions. What is this project, who's it for, what's the deliverable, what's the timeline. Replaceable when the project scope changes; otherwise leave alone.]

## Workflow mode

**Workflow mode:** branches

<!--
  `branches` — every workstream gets its own branch; merges land on `main` via PR.
  `main_only` — quick personal/scratch repos; everything happens on `main`. Skip the PR overhead.

  Default is `branches`. Change to `main_only` for scratch/ephemeral repos.
-->

## Cluster activations (current)

<!--
  Records which clusters of the skills kit are active in this repo. Updated at
  every kit propagation (Part C) and at initial integration (Part A or B).

  The four optional clusters are activated or deactivated per propagation based
  on project signals — see `skills/skills_curation_skill.md` for the workflow.
  The always-active group ships with every propagation; it's listed here so
  future sessions can see what's in `skills/` without opening the folder.

  Cluster-level rule: each optional cluster is all-or-nothing, except
  Final-production formats where each format-pair is independent.

  Replace the placeholders below at first propagation. Initial-template state
  is "unknown" — the first curation conversation sets the real values.
-->

- Source material: unknown
- Writing and deliverables: unknown
- Voice and style: unknown
- Final-production formats:
  - Word: unknown
  - FMM LaTeX paper: unknown
  - Academic paper LaTeX: unknown
  - Academic slides: unknown
  - FMM coordination slides: unknown
- Always-active skills: shipped (palette, repo and session infrastructure, brainstorming, kit metadata)

Last curated: not yet curated (initial template state)

## Current state

[What's in flight, what's blocked, what's the next move. Updated each session at close. Bullets work; prose works; whatever Andrea finds readable.]

<!--
  Open exploration branches (per exploration_branch_skill.md) are tracked here as
  ordinary Current-state items — the finish_session light arm notes an open
  exploration's state at close. The branch itself is registered in
  BRANCHES_LOG.md at the repo root (on main) at creation; that is the
  authoritative registry. This section only carries the working status so
  session-start orientation surfaces it. No separate subsection — that would
  duplicate BRANCHES_LOG.
-->

- **[Workstream name]:** [status, what's pending, what's blocked]
- **[Workstream name]:** [status, what's pending, what's blocked]

### Pending re-integrations

<!--
  This subsection tracks drift between chapter and section files when a repo
  uses hierarchical naming (long documents organized as A_chapter_*.md
  assembled from A1_section_*.md, A2_section_*.md, etc.). When a section
  file is edited after its chapter has been assembled, add an entry here so
  the chapter gets re-assembled when Andrea is ready. Remove the entry once
  re-assembled.

  If this repo doesn't use hierarchical naming, this subsection stays empty
  with the placeholder below — it costs nothing and is here in case the
  repo's structure changes later.

  Entry format:
  - **[Chapter file]** — section [section file] edited YYYY-MM-DD HH:MM,
    chapter last assembled YYYY-MM-DD HH:MM. Re-assembly pending.
-->

(none)

### Pending placement fixes

<!--
  This subsection records folder moves that were deferred. When a folder was
  created in a rush and a later placement check finds it mis-placed or
  duplicative but Andrea defers the fix, the folder-creation placement check
  in CLAUDE.md's Working Conventions records the pending move here. It is
  re-surfaced at session start and session close until the move is made.
  Remove the entry once the folder is moved (or the placement is confirmed
  fine after all).

  Entries are added only by the CLAUDE.md placement check, never by hand here.
  Recording an entry never moves anything (prompt-don't-perform).

  If no move has ever been deferred, this subsection stays empty with the
  placeholder below — it costs nothing and is here in case it's needed later.

  Entry format:
  - **`path/to/folder/`** — duplicates `other/path/` / outside the archetype
    skeleton. Proposed home: `proposed/path/`. Recorded YYYY-MM-DD.
-->

(none)

### Index audit

<!--
  Records when the repo's index audit last ran. At session close, the cadence
  read in project_tracker_skill.md compares this date against
  INDEX_AUDIT_INTERVAL (default 30 days, set in CLAUDE.md) and reminds if
  overdue. The reminder fires at every close until the date is refreshed.
  The date is stamped automatically by housekeeping_skill.md's index-audit
  mode — its closing commit writes today's date here (the write-back), so
  the reminder stops only when the audit actually ran. The close-out
  itself only reminds (prompt-don't-perform); it never runs the audit.
  See `skills/project_tracker_skill.md`.
-->

Index audit last run: (never)

## Recent sessions

[Rolling log of the last 5–10 sessions. Each entry: date, one-line headline of what was done, optional link to a saved conversation or brainstorm if one exists. Older entries fall off as new ones land.]

- **YYYY-MM-DD** — [headline]. [Optional: link to saved conversation/brainstorm.]
- **YYYY-MM-DD** — [headline].

## Open questions

<!--
  Open questions are *decisions to resolve*. Forward-looking *actions* are not
  tracked here — they live in `workspace/to_do/`, the universal action tracker
  (working-tracker-not-catalog; see `skills/structure_conventions.md`), pointed
  at from STATUS.md, not duplicated in it.
-->

[Things to resolve. Migrated here from CLAUDE.md's old Parking Lot section at integration time. Add new questions as they come up; remove when resolved.]

- [Question, with context if needed.]
- [Question.]

## Archived workstreams

[Summary table of finished work. One row per workstream. The summary column is the load-bearing part — a one-sentence caption per workstream so future-Andrea can scan archived work without opening files.]

| Workstream | Date archived | One-line summary of what was learned |
|---|---|---|
| [Name] | YYYY-MM-DD | [Summary.] |

## Known issues

[Bugs, gotchas, things that broke and how they were fixed. Stable across sessions; only updates when something new breaks.]

- **[Issue title]:** [Description. How it was diagnosed. Fix or workaround.]

---
*Last updated: June 12, 2026 — v4.1 (post-v4.0 MINOR stamp — Part C self-containment (Steps 2.5, 8.5) + the workspace standing-document convention; additive, no renames. Prior: June 12, 2026 — v4.0 (v4 re-baseline — kit package version stamped v4.0 (v3.1 → v4.0, MAJOR; templates carry the kit version, the two-tracker exception — skills floor at v2.0.0). No content change in this stamp; the cycle's content is in the v4 build entries and the v4.0 re-baseline entry of `CHANGELOG.md`. Prior: June 11, 2026 — v2.0.0 (v4 final-pass fix build: versioned marker added — this template previously carried no marker (R2); content unchanged this build. For the template's change history see `CHANGELOG.md`'s v4 entries (content-staleness June 10; universal-to-do June 8; root #2 slice 1 June 7; folder-move close-out June 6). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.)))*
