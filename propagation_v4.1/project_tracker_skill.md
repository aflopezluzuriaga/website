---
name: project-tracker
description: "STATUS.md project-level tracker for content repos — read at session start (on Andrea's 'yes' to a session-start check) and updated at session close. Tracks current state, in-flight work, blockers, decisions, open questions, and recent sessions for the repo as a whole. Triggers: 'let's pick up where we left off,' 'check status,' 'what were we doing?', 'what's in flight?', or any session-start orientation question. Also runs at session close to update the tracker, and on demand for bootstrapping STATUS.md in a new repo. Includes a lightweight freshness audit (TRACKED_LOCATIONS check at session start) that flags drift between STATUS.md and reality — distinct from the heavier on-demand infrastructure audit (housekeeping_skill.md). Does NOT save full conversations (use repo_conversations_skill.md) or store brainstorm summaries (use brainstorming_skill.md)."
---

# Project Tracker Skill

This skill defines how `STATUS.md` works as a content repo's project-level tracker — the file Claude reads at session start (on Andrea's "yes") and updates at session close. STATUS.md is the answer to "where are we?" for the repo as a whole: what's in flight, what's blocked, what's been decided, what's still open.

STATUS.md is **not** an audit of every change. It's a deliberate, curated record of the work that matters across sessions. Mechanical activity (file moves, typo fixes, routine processing) does not need to land in STATUS.md. Decisions, archivals, new tracked questions, and substantive session work do.

**What this skill is, and what it is not.** This skill defines (a) the STATUS.md template and what each section is for, (b) the session-start check protocol, (c) the session-close update protocol, (d) the freshness audit that detects when STATUS.md has drifted from reality, (e) the bootstrap procedure for setting up STATUS.md in a new or existing repo, (f) the hierarchical-naming integration tracking that supersedes v2.1.1's stop-gap, and (g) the pending-placement-fix tracking that pairs with `CLAUDE.md`'s folder-creation placement check, (h) the lightweight structure- and stage-drift peeks the freshness audit runs against the declared archetype, and (i) the session-close index-audit cadence read, and (j) the session-close done-to-do retirement check (every repo, against the universal `workspace/to_do/` tracker), (k) the session-close coordination feedback edge — corpus-feedback + the real-world-signal (coordination repos only), (l) the session-close promotion-drift check (coordination repos only), (m) the session-close index-entry refresh (archetype repos) that keeps typed-index rows' live claims current — the write side of the index audit, and (n) the session-close non-empty-staging prompt (every repo) — the backstop that keeps staged files visible when a Pending placement fixes entry was missed.

It is **not** the skill for repo-wide infrastructure consistency checking — that's `housekeeping_skill.md`. The relationship: `housekeeping_skill.md` is the heavy, on-demand check Andrea runs occasionally to catch drift across the whole repo's infrastructure; the **freshness audit** defined here is a lightweight, routine check that runs at session start (on Andrea's yes) against tracked locations only. Both can flag missing folders; only `housekeeping_skill.md` is comprehensive.

---

## When to use this skill

Read this skill when:
- Andrea says "let's pick up where we left off," "check status," "what were we doing?", "what's in flight?"
- A session is about to close (Andrea says "thanks," "good night," "we're done," "let's wrap up," or similar).
- A new content repo is being set up and STATUS.md needs to be bootstrapped.

Do not use this skill for:
- Heavy infrastructure audits across the whole repo (use `housekeeping_skill.md`).
- Saving full conversations (use `repo_conversations_skill.md`).
- Brainstorm summaries (use `brainstorming_skill.md`).

---

## Repo-specific parameters

The repo's `CLAUDE.md` provides project-specific values for the parameters below. If `CLAUDE.md` does not define a parameter, use the default given here.

| Parameter | Description | Default |
|---|---|---|
| `STATUS_LOCATION` | Where STATUS.md lives | Repo root (alongside CLAUDE.md) |
| `WORKFLOW_MODE` | `branches` (every workstream gets its own branch, merges via PR) or `main_only` (quick personal/scratch repos; everything happens on `main`) | `branches` |
| `TRACKED_LOCATIONS` | Folders and files the freshness audit checks for activity since STATUS.md's last update | `workspace/brainstorms/`, `workspace/claude_conversations/` (or the configured location for `repo_conversations_skill.md`), all `FOLDER_MAP.md` files (recursive) — which covers the repo's content, deliverable, and index folders wherever the archetype places them |
| `EXTRA_TRACKED_LOCATIONS` | Additional repo-specific paths to include in the freshness audit | None |
| `INDEX_AUDIT_INTERVAL` | How long before the session-close cadence read flags the repo's index audit as due | 30 days |

---

## STATUS.md structure

The full template lives in `STATUS_template.md`. The sections, in order:

1. **Header line: last-updated timestamp.** Format: `*Last updated: YYYY-MM-DD HH:MM — [reviewed | unreviewed]*`. The `unreviewed` flag indicates the most recent update was committed without Andrea's review (because the session closed and she didn't have time). It gets removed on her next review.
2. **What this repo is.** One paragraph. Stable across sessions.
3. **Workflow mode.** One line: `**Workflow mode:** branches` or `**Workflow mode:** main_only`. Tells Claude which workflow to use without asking each time.
4. **Current state.** What's in flight, what's blocked, what's the next move. Updated each session. Includes a **Pending re-integrations** subsection (described below) when hierarchical naming is in use, a **Pending placement fixes** subsection (described below) when a deferred folder move is waiting, and an **Index audit** record (the date the repo's index audit last ran, read by the session-close cadence check).
5. **Recent sessions.** Short log of the last 5–10 sessions and what each produced. Rolling — older entries fall off as new ones land.
6. **Open questions.** Things to resolve. This section absorbs what was previously the CLAUDE.md "Parking Lot" — moves here at integration time.
7. **Archived workstreams.** Summary table of finished work, one row each: workstream / date archived / one-line summary of what was learned.
8. **Known issues.** Bugs, gotchas, things that broke and how they were fixed. Stable; only updates when something new breaks.

Sections can be omitted if not applicable (e.g., no Archived workstreams in a young repo). The structure is a guide, not a contract.

---

## The Pending re-integrations subsection

Lives inside "Current state." This is the proper mechanism that replaces v2.1.1's stop-gap workaround.

**When it's needed.** When the repo has folders using hierarchical naming (chapter/section drafts: `A_chapter_*.md` assembled from `A1_section_*.md`, `A2_section_*.md`, etc.).

**What it tracks.** When a section file (`A1_section_*.md`) in `main` has been edited *after* its chapter (`A_chapter_*.md`) was assembled, the chapter and section drift — the chapter no longer reflects the section's current state. This subsection lists those drift cases so Andrea can decide whether to re-assemble the chapter or whether the section edit is small enough to defer.

**Format:**
```markdown
### Pending re-integrations

- **[A_chapter_drafting_process.md](path)** — section [A1_section_outline_unit.md](path) edited 2026-05-13 16:42, chapter last assembled 2026-05-12 09:15. Re-assembly pending.
- ...
```

**How drift is detected.** Manual for v1.0 — when Andrea edits a section in a way she knows creates drift, she tells Claude and the entry gets added. If this proves unreliable in practice (Andrea forgets to flag), v2 may add a commit-based inference (Claude scans commits at session start, flags edits to section files post-dating their chapter assembly). Starting manual to keep the skill simple.

**Read at session start.** When the start-of-session check runs and Andrea says yes, Claude reads this subsection and surfaces any pending re-integrations proactively before doing other work.

---

## The Pending placement fixes subsection

Lives inside "Current state." Pairs with the folder-creation placement check in the repo's `CLAUDE.md` Working Conventions — that check is where a deferred move gets recorded.

**When it's needed.** When a folder was created in a rush — during a session, or by Andrea outside one — and a placement check later finds it mis-placed or duplicative, but Andrea defers the fix rather than moving it then. The placement check flags it, does not move it, and records the pending move here. The subsection is created on first use; until a move has been deferred, it doesn't exist.

**What it tracks.** Each deferred placement fix: which folder or staged file, what's wrong with where it sits (mis-placed, duplicates an existing home, or used from staging with placement deferred), the proposed correct home, and when it was recorded. The entry persists across sessions until the move is made.

**Format:**
```markdown
### Pending placement fixes

- **`path/to/folder/`** — duplicates `other/path/` / sits outside the archetype skeleton. Proposed home: `proposed/path/`. Recorded 2026-06-06.
- ...
```

**How entries are added.** Two writers: the `CLAUDE.md` folder-creation placement check, on a deferred folder move; and the intake funnel's rushed path (`structure_conventions.md`), when a staged file is used now and placed later — that entry carries what Andrea said the file was plus any probable-duplicate flag from the lightning check. This subsection records; it does not decide. **Prompt-don't-perform:** recording an entry never moves anything.

**Read at session start and re-surfaced at session close.** At session start (on Andrea's yes), Claude surfaces any open entries proactively before other work, alongside Pending re-integrations. At session close, Claude re-surfaces any still-open entries so a deferred move isn't lost across the boundary. Either way the move is offered, never forced: remind Andrea the fix is still pending and ask whether to action it now — following the `CLAUDE.md` placement check to do the move and remove the entry — or leave it recorded for next time.

---

## Session-start check protocol

This is the central discipline. The flow:

1. **New session opens.** Andrea sends her first message.
2. **Before doing anything else, Claude asks:** *"Do you want me to check STATUS.md?"*
3. **If Andrea says no:** proceed with the actual request. STATUS.md is not read.
4. **If Andrea says yes:**
   1. Read STATUS.md. Note the last-updated timestamp and the `[reviewed | unreviewed]` flag.
   2. If the flag is `unreviewed`: surface this first. Ask Andrea whether she wants to review the last update now, or accept it as-is. If she reviews, fix the flag to `reviewed`.
   3. Run the **freshness audit** (next section).
   4. If freshness audit finds no post-timestamp activity: STATUS.md is current. Summarize the relevant Current state, Pending re-integrations, Pending placement fixes, and Open questions. Ask Andrea where she wants to pick up.
   5. If freshness audit finds post-timestamp activity: STATUS.md is stale. Surface what was found. Propose updates derived from the audit findings (see below). Get Andrea's review/correction. Commit the updated STATUS.md. Then summarize and proceed.
5. **Then engage with the actual request.**

---

## The freshness audit

Runs at session start when Andrea says yes. Lightweight; uses only the repo as source of truth. It runs three cheap passes — an activity check (Pass 1, below), then two conformance peeks (Pass 2 structure, Pass 3 stage). All three are deliberately lightweight: the heavy, interpretive archetype-conformance check lives in `housekeeping_skill.md` (Check 12), and the peeks route to it rather than duplicate it.

**Pass 1 — activity.** Inputs (both authoritative):
- **Files on disk** modified since STATUS.md's last-updated timestamp, in `TRACKED_LOCATIONS` and `EXTRA_TRACKED_LOCATIONS`.
- **Commits to `main`** since that timestamp — what was committed, what files were touched, what the messages say.

**Out of scope:** past-chats search, conversation history lookup. Past chats are not the repo. If a session didn't leave a trace in the repo (no commit, no saved brainstorm, no saved conversation), the freshness audit does not see it. The discipline that makes the tracker work is: **if it matters, leave a trace in the repo.** Brainstorming and repo-conversations skills are the mechanisms for leaving traces.

**Output of the audit:** a list of findings, each tagged with the source (file modification, commit, or both) and a short description of what changed.

**Proposing the update.** Claude reads the findings and drafts the STATUS.md edits derived from them. Default approach: commits give the structural skeleton (decision X landed, file Y was created); brainstorms and saved conversations give the content; Andrea fills in the *why* and the *what's still open*. The proposal is shown for Andrea's review; she corrects and approves. Then commit.

**Pass 2 — structure drift.** Read the declared archetype from `CLAUDE.md`'s `archetype.type` frontmatter and the matching `<archetype>_archetype_spec.md`. Cheap scan for the obvious: loose root files outside the spec's root-file set, folders off the skeleton, filled `_ex` placeholder slots, content folders missing a `FOLDER_MAP.md`. This is a peek, not the full audit — on any hit, surface it and route: "this looks off the archetype skeleton; run `housekeeping`'s Check 12 for the complete picture." Prompt-don't-perform. A NONE repo (no archetype) skips this pass.

**Pass 3 — stage drift.** For archetypes that record per-line or per-subproject stage labels (research does; coordination and operation mostly don't), read each line's recorded stage (wherever the archetype records it) and check it against cheap progress signals — for example, a line still labeled an early stage that now has drafted outputs. If a line looks to have outgrown its label, surface: "recorded as '[stage]' but looks further along — update the label?" No new storage; the label lives where the archetype already keeps it. Prompt-don't-perform. Repos whose archetype has no per-line stages skip this pass.

---

## Session-close update protocol

The other central discipline. The flow:

1. **Andrea signals close.** "Thanks," "good night," "we're done," "let's wrap up," or similar.
2. **Claude drafts the STATUS.md update for this session.** What changed in Current state, any new entries for Recent sessions, any new Open questions, any archivals, any new Known issues, any Pending re-integrations to add.
3. **Claude shows the draft to Andrea.**
4. **If Andrea has time:** she reviews, corrects, approves. Commit clean. Header flag set to `reviewed`.
5. **If Andrea says "just commit it":** Claude commits the draft as-is. Header flag set to `unreviewed`. The flag will surface at the next session start so Andrea can review then.
6. **Either way, the session ends with STATUS.md committed.**

**Re-surface open Pending placement fixes.** As part of the close-out, read the Pending placement fixes subsection and re-surface any still-open entry, so a deferred placement (a folder move, or a staged file awaiting its home) persists across the session boundary instead of going stale. Remind Andrea each is still pending and ask whether to action it now (follow `CLAUDE.md`'s folder-creation placement check to do the move and remove the entry) or leave it recorded. Prompt-don't-perform: never move a folder unprompted. (`finish_session_skill.md` Step 3 invokes this close-out protocol, so the re-surfacing rides the standard session close — no separate step there.)

**Index-audit cadence read.** Also as part of the close-out, read the "Index audit last run" date in `STATUS.md`. If today minus that date exceeds `INDEX_AUDIT_INTERVAL` (default 30 days), surface: "the repo's index audit is overdue (last run [date], interval [N] days) — run `housekeeping`'s index audit in a dedicated session when you can." Persistent by design: it fires at every close until the date is refreshed. The date is refreshed by `housekeeping_skill.md`'s index-audit mode itself — its closing commit stamps today's date into the slot (the write-back), so the reminder stops only when the audit genuinely ran. Prompt-don't-perform: this reminds, it never runs the audit. (`finish_session_skill.md` Step 3 invokes this close-out, so the reminder rides the standard session close — no separate step there.)

**Done-to-do retirement (every repo).** Every repo carries a `workspace/to_do/` tracker (the universal action tracker — `structure_conventions.md`). Check at close whether any items were completed this session. If so, surface: "these to-dos look done — clear them from the tracker?" On Andrea's yes, remove the completed lines; the record of what was finished lives in the STATUS.md close-out update (Recent sessions), not in the tracker, which stays a live working list per the universal "working tracker, not a catalog" rule (`structure_conventions.md`). Prompt-don't-perform: never delete a line unprompted, and never an unchecked one. (`finish_session_skill.md` Step 3 invokes this close-out, so the check rides the standard session close — no separate step there.)

**Non-empty-staging prompt (every repo).** Also as part of the close-out, check `workspace/staging/`. Its documented resting state is empty (`structure_conventions.md`, the intake funnel), so anything in it at close is a legible signal: either a placement is mid-flight or a rushed-use file was never placed. Surface what's there and ask: place it now (run the intake funnel's full check) or leave it staged — in which case confirm a **Pending placement fixes** entry exists for it, writing one if not. This is the belt-and-suspenders pair to the Pending entry: the entry nags by record, this prompt nags by state, so a staged file can't go invisible even if the entry was missed. Prompt-don't-perform: never place unprompted. (`finish_session_skill.md` Step 3 invokes this close-out, so the prompt rides the standard session close — no separate step there.)

**Index-entry refresh (archetype repos; NONE no-op).** For the files this session touched (the same touched-set the close-out already derives from commits and modified files), check whether their typed-index rows' **live-claim fields** — status/outcome labels, reliability tags, summary lines — still hold, and draft the updates. Discovery rides the `FOLDER_MAP` tree and the declared spec's typed root indexes, never hardcoded names. Andrea reviews → commit clean; no time → the updated row carries a trailing `[unreviewed]` marker (defined in `archetype_conventions.md` typed-index behavior), swept for review by the next index audit. This is the **write side** of the universal feeding process: the close keeps entries current, and `housekeeping_skill.md`'s index-audit mode is the periodic backstop — in steady state, entries go stale only when a close was skipped or rushed, which is exactly what the audit's evidence pass catches. Sibling to the floor's `FOLDER_MAP` status refresh (`structure_conventions.md`), which continues to ride `finish_session`. A NONE repo carries no typed indexes, so this is a no-op there. (`finish_session_skill.md` Step 3 invokes this close-out, so the refresh rides the standard session close — no separate step there.)

**Coordination feedback + promotion drift (coordination repos only).** If the repo's declared `archetype.type` is **coordination** — a no-op on research / operation / NONE — run these three prompts at close, all **prompt-don't-perform**, per `coordination_archetype_spec.md` §6 (the feedback edge) and §9 (promotion):

1. **Corpus-feedback.** Ask: "does anything you did today need feeding back to a skill/process?" Feed back **only outputs carrying information the skill did not generate itself** — an external outcome, feedback, or correction (a proposal funded or not + reviewer comments), never a clean self-generated output (that's circular). Feed back the **delta** (the result + *why*), not the artifact. If it can be actioned now, route the lesson to that task's `corpus/` — flat repo → straight to `corpus/`; cyclic → the per-cycle `lessons_learned.md`, folded into that task's `corpus/` at cycle close. If it's deferred, record it in `workspace/to_do/` (the universal action tracker) and save the conversation (`repo_conversations_skill.md`) so the trigger isn't lost.

2. **Real-world-signal.** Read `INSTANCES_INDEX`'s outcome-status for any instance **awaiting an outcome**, and ask whether one has since arrived. If so, surface it, feed the delta to that task's `corpus/` (same routing as above), and update the instance's outcome status. The trigger is an **outcome event**, not task completion — it may fire weeks later, or never, which is why it's checked at every close rather than at the run that produced the instance.

3. **Promotion-drift (§9).** Surface — never perform — a promotion **candidate**: a **one-off that has recurred** (a second occurrence) or **turned out tacit-knowledge-heavy** worth capturing → "give it a dedicated skill + `corpus/` and make it a task-unit?"; or a **single-task repo that has grown a second repeated task** → "promote to a composition (add the task's skill + `instances/{task}/` + `corpus/{task}/`; `reference`/`assets` stay shared)?" Promotion is real restructure work, done on Andrea's yes; left unactioned, the candidate self-resurfaces next close (the repo state still shows it), so it needs no separate storage. (The heavier acting-on-it pass is the separate periodic structure-and-index revision pass; this close-side check only surfaces.)

`finish_session_skill.md` Step 3 invokes this close-out, so all three ride the standard session close — no separate step there. **`project_tracker` needs no new machinery:** an awaiting-outcome instance already lives in `INSTANCES_INDEX`, a deferred feed-back action in `workspace/to_do/`, and a promotion candidate self-resurfaces from repo state.

**Mandatory, not optional.** Every session close triggers this. The asymmetry is intentional: losing the record is much worse than committing an unreviewed draft. An unreviewed draft can be corrected; a missing record cannot be reconstructed.

**Edge case — session ends without a close-out signal.** If Andrea gets pulled away, her laptop dies, or the connection drops, no close signal is given and STATUS.md is not updated. The next session-start audit will detect the gap (commits since last update, modified files since last update) and propose a reconstruction. This is acceptable degradation; trying to auto-update without Andrea's signal would be worse.

---

## Bootstrap procedure

How STATUS.md gets created the first time, in a repo that doesn't have one.

### Bootstrap during Part A (new repo setup)

When a new repo is being set up, `STATUS.md` is created during `PROJECT_SETUP.md` Part A as part of the initial folder/file creation. The template (`STATUS_template.md`) is copied to the repo root and filled in with answers from Andrea's setup interview:
- **What this repo is:** from Andrea's project overview answer.
- **Workflow mode:** from Andrea's workflow-mode answer (default `branches`).
- **Current state:** "Repo just set up. Initial structure created. No work in flight."
- **Recent sessions:** one entry — "Initial repo setup."
- **Open questions:** initially empty unless the setup interview surfaced any.
- **Archived workstreams:** initially empty.
- **Known issues:** initially empty.

The Pending re-integrations subsection is included only if Andrea indicated the project will use hierarchical naming.

The first commit on the new repo includes STATUS.md alongside the other initial files. Header flag: `reviewed` (because Andrea just confirmed every entry during the interview).

### Bootstrap during Part B (existing repo integration)

When an existing repo is being integrated with the kit for the first time, STATUS.md is bootstrapped as part of Part B's Skills Activation step. Claude:
1. Reads the repo's existing `CLAUDE.md`, all `FOLDER_MAP.md` files, recent `CHANGELOG.md` entries (if present), and recent commits (last 10–20 on `main`).
2. Drafts a STATUS.md based on what those artifacts reveal about the repo's current state.
3. Walks Andrea through the draft section by section for review.
4. Once approved, STATUS.md is committed alongside the other Part B changes.

The Parking Lot section from the existing CLAUDE.md (if present) is migrated to STATUS.md's "Open questions" section, and the CLAUDE.md Parking Lot section is removed in the same commit.

Header flag: `reviewed`.

### Bootstrap during Part C (propagation to an already-integrated repo)

When a repo that was integrated against an older kit version is being upgraded to v2.2 (which includes `project_tracker_skill.md`), STATUS.md is bootstrapped as part of Part C's propagation. Same flow as Part B — Claude drafts from existing artifacts, Andrea reviews. The Parking Lot migration also runs at this step.

---

## Folder bootstrap protocol

STATUS.md and the freshness audit depend on folders existing. The universal `workspace/` subfolders (defined in `structure_conventions.md`) are **created unconditionally, never asked about** — they are load-bearing homes for always-active skills, created up front as labeled-empty homes; an empty subfolder reads as state, never clutter. What varies by Part of `PROJECT_SETUP.md` is only *when* the creation happens:

**Part A (new repo):** the archetype/NONE scaffold creates the full layout at birth — the universal `workspace/` subfolders plus whatever else the scaffold specifies. No questions.

**Part B (existing repo, first integration):** any universal subfolder missing from the repo is created in the integration commit. If the repo has an existing arrangement doing the same job (a root `TODO.md` where `workspace/to_do/` now lives, a conversations folder under another name), Claude proposes reconciling it into the universal home — migration is Andrea's call (prompt-don't-perform), but the home is created either way.

**Part C (upgrade to a new kit version):** any universal subfolder still missing is created in the propagation commit. If the repo's `CLAUDE.md` carries a **Deferred folders** subsection from a pre-v4 integration, the listed folders are created and the subsection is removed in the same commit — the per-folder choice is superseded by the universal convention, and the removal is recorded in the propagation commit message rather than silently dropped. *(This replaces the v2.2 per-folder ask / Deferred-folders mechanism, retired when the `workspace/` subfolders became universal and load-bearing.)*

**First-use fallback (any repo, any time):** if a skill tries to use a folder that doesn't exist — which after integration should only happen in a repo not yet brought onto the current kit — the skill asks once: "this needs `[folder]` — create now, or exit?" If yes, the folder is created as part of the workflow's commit. If no, the skill explains what it can't do and exits.

---

## Composition with other skills

This skill is the **upstream session-start ritual and downstream session-close ritual** for every other skill in the kit.

- **`brainstorming_skill.md`** — saves brainstorms to `workspace/brainstorms/`, which is in `TRACKED_LOCATIONS`. The freshness audit detects new brainstorms and surfaces them as candidates for STATUS.md updates.
- **`repo_conversations_skill.md`** — saves conversations to the configured location, which is in `TRACKED_LOCATIONS`. Same freshness-audit pickup.
- **`writing_skill.md` Protocol 2** — drafts land in the deliverable's home folder (asked, not assumed; see that skill's *Placement is asked, not assumed* rule), which the recursive `FOLDER_MAP.md` scan in `TRACKED_LOCATIONS` covers wherever the archetype places it. Branch workflow events (creation, merge) appear in commits, which are also part of the audit.
- **`materials_processing_skill.md` and `document_processing_skill.md`** — registering a paper or document adds a row to the repo's materials/detail index (discovered from the `FOLDER_MAP`s, in the shape the repo uses); that index activity is caught by the recursive `FOLDER_MAP.md` scan and by commits.
- **`housekeeping_skill.md`** — comprehensive infrastructure check, run on demand. Findings that resolve into repair commits are picked up by the next session's freshness audit. Its **index-audit mode** is the read side of the index-entry refresh defined here: it sweeps `[unreviewed]` rows, verifies live claims on the `INDEX_AUDIT_INTERVAL` cadence, and stamps "Index audit last run" in `STATUS.md` on completion — the write-back that silences the close-side reminder.
- **`finish_session_skill.md`** — orchestrates the session close-out as a five-step sequence (uncommitted-work inventory → branch disposition → STATUS.md update → conditional conversation save → confirm close). The STATUS.md update protocol defined above is Step 3 of that sequence. When a close-out signal fires (Andrea says "thanks," "good night," "we're done"), `finish_session_skill.md` is the single entry point; this skill is invoked from there.

---

## Notes on scope

- **Generic skill, propagates to all content repos.** Lives in `LastSkillUpdate/`.
- **SkillPropagation itself does not get a STATUS.md.** SkillPropagation is the kit factory, not a content repo.
- **STATUS.md is not a substitute for CHANGELOG.md.** `CHANGELOG.md` (in `skills/`) records kit version history. STATUS.md records the *content repo's* work. They're different layers.
- **STATUS.md is not a substitute for `repo_conversations_skill.md`.** Saved conversations are detailed transcripts; STATUS.md is the curated current-state. Both can coexist.

---

*Last updated: June 10, 2026 — v2.0.0 (v4 retrofit-folder-bootstrap build: the Folder bootstrap protocol rewritten — the universal `workspace/` subfolders are created unconditionally at whichever Part runs (the per-folder \"create now or defer?\" ask and the **Deferred folders** CLAUDE.md subsection retired; Part C now resolves any legacy subsection: folders created, subsection removed, recorded in the propagation commit message); the Part-A line re-pointed from the stale `TRACKED_LOCATIONS` auto-create framing to the archetype/NONE scaffold; a reconcile proposal added for existing same-job arrangements (prompt-don't-perform); the first-use fallback kept as the safety net for repos not yet on the current kit. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 staging-intake-funnel build: added the **non-empty-staging prompt** to the session close-out (every repo; clause (n)) — staging's documented empty resting state makes a non-empty staging at close a legible signal; surface contents, offer placement via the intake funnel's full check, or confirm/write the Pending placement fixes entry; the belt-and-suspenders pair to the entry-based nag. Pending placement fixes generalized to **two writers** (the folder-creation check's defer + the intake funnel's rushed path) and its tracked set to folders *or staged files*; the close-out re-surface phrasing generalized to match. `finish_session_skill.md` needs no edit — Step 3 delegation inherits the prompt. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 content-staleness build: added the **index-entry refresh** to the session close-out (archetype repos; NONE no-op) — for files the session touched, typed-index rows' live-claim fields (status/outcome labels, reliability tags, summaries) are checked and updated, reviewed → clean or unreviewed → a trailing `[unreviewed]` marker swept by the next index audit; the write side of the universal feeding process whose read side is `audit_repo_skill.md`'s new index-audit mode. Registered as clause (m). The index-audit cadence read rewritten to the automatic write-back: the date is now stamped by the index-audit mode's closing commit, retiring the confirm-stamp interim and its deferral note. `audit_repo` composition bullet updated to the mode + write-back. `finish_session_skill.md` still needs no edit — Step 3 delegation inherits the refresh. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 9, 2026 — v2.0.0 (v4 workspace-folders build: renamed the `TRACKED_LOCATIONS` default `workspace/conversations/` to `workspace/claude_conversations/`, completing the conversations-folder rename cascade; tracked set otherwise unchanged. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 coordination-only pair — root #2's last members: added a **coordination-repos-only** session-close block (no-op on research / operation / NONE) holding the three `coordination_archetype_spec.md` §6/§9 prompts — **corpus-feedback** ("anything to feed back to a skill?"; external-outcome deltas only, routed to the task's `corpus/`, a deferred action to `workspace/to_do/`), the **real-world-signal** (an instance awaiting an outcome on `INSTANCES_INDEX` — did one arrive?), and **promotion-drift** §9 (one-off → task-unit, single-task → composition; surface the candidate only). All prompt-don't-perform. Registered as clauses (k) corpus-feedback/real-world-signal and (l) promotion-drift. **Single-file commit** — `project_tracker` needs no new machinery (awaiting-outcome rides `INSTANCES_INDEX`, deferred actions ride `workspace/to_do/`, promotion candidates self-resurface from repo state); the coordination spec already lists these as finish_session prompts so it needed no edit, and `finish_session` Step 3 delegation inherits the block. Built on the June-8 universal-to-do home (commit `f9d7e354`), which is what unblocked corpus-feedback's deferred to-do. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 8, 2026 — v2.0.0 (v4 universal-to-do build: generalized the done-to-do retirement check from research-only to **every repo**, now reading the universal `workspace/to_do/` tracker rather than the research-only `general/to_do/`. The "working tracker, not a catalog" rule reference re-points from `research_archetype_spec.md` §4 to `structure_conventions.md`, where the to-do construct is now defined universally. Clause (j) updated to every-repo. Behavior otherwise unchanged (delete-on-completion, durable record in the STATUS.md close-out, prompt-don't-perform). `finish_session_skill.md` still needs no edit — its Step 3 delegation inherits the generalized check. Part of the universal-to-do atomic commit (`structure_conventions.md` defines the tracker; the three specs/scaffolds + `PROJECT_SETUP`/`STATUS_template`/`CLAUDE_template` move the home to `workspace/to_do/`). Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 7, 2026 — v2.0.0 (v4 finish_session extension family, slice 2 — done-to-do retirement: added a session-close check that, in research repos only (the `general/to_do/` tracker is a research-archetype construct; coordination/operation no-op), prompts to clear checked-off to-do lines on Andrea's confirm — delete-on-completion, with the durable record living in the STATUS.md close-out, keeping `to_do/` a live working tracker per `research_archetype_spec.md` §4's "working tracker, not a catalog." Archive was ruled out by the §3 no-lifecycle-tier decision (a `done/` sink would be the same sponge the redesign fights). Owned by `project_tracker` (surfaced via `finish_session` Step 3), overriding the worklist's "likely owned by `finish_session`" guess on slice 1's precedent. Registered as clause (j). Single-file commit — the spec already supports the behavior and `CLAUDE_template`'s close clause already delegates to this protocol, so neither needed an edit. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 7, 2026 — v2.0.0 (v4 finish_session extension family, slice 1 — start-side drift peeks + close-side cadence read: extended the freshness audit with two lightweight conformance passes — Pass 2 structure drift (cheap archetype-skeleton scan that routes to `audit_repo` Check 12, not a duplicate of it; NONE repos skip) and Pass 3 stage drift (per-line stage-label peek for archetypes that record stages; prompt-don't-perform) — and added a session-close index-audit cadence read keyed to a new `INDEX_AUDIT_INTERVAL` param (default 30 days) against an "Index audit last run" date in `STATUS.md`, with confirm-stamp closing the loop (automatic write-back by `audit_repo` deferred to its review; content-staleness sense stays blocked on the navigation track). Registered both in the what-this-skill-defines list (clauses h, i), the Current-state structure note, and the params table. Companion edits this commit: `STATUS_template.md` (new **Index audit** subsection) and `CLAUDE_template.md` (Working-Conventions clause + the line-577 reconciliation of the freshness audit's over-claimed archetype conformance). `finish_session_skill.md` unchanged — its Step 3 delegation inherits the close-side read. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v2.0.0 (v4 folder-move close-out read: added a **Pending placement fixes** subsection to the `STATUS.md` structure (sibling to Pending re-integrations, inside Current state), defining where the `CLAUDE.md` folder-creation placement check records a deferred move; wired surfacing of open entries into both the session-start summary and the session-close protocol (prompt-don't-perform — the close-out reminds, never moves), and added clause (g) to the what-this-skill-defines list. This is the read end of the mechanism whose write end shipped in `CLAUDE_template.md` June 6; making `project_tracker` the owner of the slot replaces the prior informal "to-do at the end of `STATUS.md` surfaced only by `finish_session`'s close-out" framing — `finish_session_skill.md` Step 3 already delegates to this close-out protocol, so it inherits the close surfacing with no edit of its own. Companion edits: `CLAUDE_template.md` Working-Conventions bullet re-pointed, `STATUS_template.md` parallel empty subsection added. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v2.0.0 (v4 bin-1 index slice: made the freshness audit's `TRACKED_LOCATIONS` index-name-agnostic — removed the named-index clause (`MATERIALS_INDEX.md`/`PAPERS_INDEX.md`/`MasterIndex.md`) entirely. The recursive `FOLDER_MAP.md` scan already covers index files as folder contents and commits cover them again, so naming them was redundant and wrong on an operation repo, which carries none of those (typed reliability-tagged root indexes only; operation §3/§5). Neutralized the `MasterIndex.md` index example the placement slice deferred here, in both `TRACKED_LOCATIONS` and the `materials_processing`/`document_processing` Composition bullet — the bullet also rewritten to the now-shipped index-name-agnostic behavior of those two skills (register in the repo's existing index found via the `FOLDER_MAP`s, not in a named file). Same move as the `Drafts/` removal; the operation §6 currency guard and the hierarchical-naming refs stay out of scope (deferred to the navigation work and to writing-model ownership respectively). Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v2.0.0 (v4 bin-1 placement slice: removed the literal `Drafts/` from `TRACKED_LOCATIONS` — the recursive `FOLDER_MAP.md` scan already covers deliverable/content folders wherever the archetype places them, so the hardcode was both redundant and wrong on an archetype repo. Closes the `Drafts/`-entry deferral the 1e-rename note logged to the writing/placement redesign. The `MasterIndex.md` index example and hierarchical-naming refs are left for the index slice / writing-model ownership. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v2.0.0 (v4 sub-unit 1e-rename: `AboutFolder.md` → `FOLDER_MAP.md` (2 occurrences) per the promoted naming/structure conventions; token-only swap (the `TRACKED_LOCATIONS` `Drafts/` entry and the hierarchical-draft naming example were deferred to the writing/placement and template redesigns). Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: May 28, 2026 — v3.2 materials-triage merge: added `MATERIALS_INDEX.md` to `TRACKED_LOCATIONS` and to the downstream-pipelines note; renamed the triage reference. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.2 (v3.0.1): stale reference `paper_processing.md` → `paper_processing_skill.md` in the downstream-pipelines list — drift from the v2.1.7 paper-processing decomposition split that the v2.1.10 naming sweep did not catch. v1.1 (May 13, 2026, v2.1.14 hygiene): stacked v1.0.1 and v1.1 markers consolidated into a single trailing marker, per the discipline applied to `audit_repo_skill.md` v1.3 in v2.1.12. v1.1 substance: YAML frontmatter added for trigger-matching per the v2.1.11 frontmatter audit. v1.0.1: Composition section forward reference to "future session-end skill (Phase 2.2.E)" replaced with concrete pointer to `finish_session_skill.md`, which shipped in v2.1.6; no behavioral changes.)*




