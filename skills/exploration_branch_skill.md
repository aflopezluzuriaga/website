---
name: exploration-branch
description: "Workflow for running an exploration on a real git branch — a long-lived side-extension that tests whether a claim on `main` holds, or that develops a side line in isolation, before its result is folded back in. Use when the work could overturn or redirect `main` and so must not live on it until resolved. Triggers: 'this could overturn main,' 'let's test whether X still holds,' 'run a robustness check on a branch,' 'put this on an exploration branch,' 'branch this as a side line,' or when an additive folder turns out to be testing a main claim (promotion). Begins at 'branch decided' — either from the purpose-triage in brainstorming_skill.md's hand-off (the testing verdict) or from a folder→branch promotion. Does NOT make the branch-or-folder decision itself (that is brainstorming_skill.md's hand-off triage); does NOT cover additive supplementary work that never risks a main claim (that is a folder on `main` via the folder-creation placement check); does NOT cover collaborative document review (writing_branch_skill.md); does NOT cover general-purpose git branching (plain git)."
---

# Exploration branch workflow

**Status:** active.
**Owner:** Andrea Lopez-Luzuriaga.
**Applies to:** an *exploration* — a unit of work that tests whether something on `main` holds (a robustness check, an alternative specification, a re-analysis that could move a conclusion) or develops a side line, and that is kept off `main` on a real git branch until its result is known. The branch is long-lived: it spans as many sessions as the exploration needs.

**Does not apply to:** the decision of whether an offshoot needs a branch at all — that triage lives in `brainstorming_skill.md`'s hand-off (see below). Additive work that adds to `main` without putting any `main` claim at risk (a supplementary descriptive cut, a case study) is a folder on `main` via the folder-creation placement check, and never invokes this skill. Collaborative document review on an ephemeral, one-session branch is `writing_branch_skill.md`. Any other branch use is plain git.

---

## Why this workflow exists

Some work cannot safely live on `main` while it is in progress, because its *purpose* is to put a `main` claim at risk. A robustness check that might flip a sign, an alternative specification that might replace the headline one — if that work sat on `main`, then `main` would carry a claim that is actively being contested, and anyone reading or pulling it (a coworker, a future session, Andrea herself) would take a contested claim for a settled one. Isolation on a branch keeps `main` truthful while the question is open.

This is a different problem from the one `writing_branch_skill.md` solves. A writing branch isolates a document under review so `main` stays stable and the review state does not scroll past in chat; it is ephemeral, typically one session, and merges as a finished deliverable. An exploration branch isolates a *question* so `main` stays truthful; it is long-lived, and it merges as one of three outcomes — the claim held, the work was additive after all, or `main` was overturned. **Lifespan and isolation are independent axes**: the writing branch is short-lived-and-isolated, the exploration branch is long-lived-and-isolated.

---

## When to use this workflow

This skill **begins at "branch decided."** It does not make the branch-or-folder call. There are exactly two ways an exploration reaches it:

1. **From the brainstorming triage.** When a brainstorm resolves into an offshoot rather than a primary deliverable, `brainstorming_skill.md`'s hand-off asks one question — is this work *testing* whether `main` holds, or *adding* to `main`? A *testing* verdict routes here. (An *adding* verdict routes to a folder on `main` and never reaches this skill.)
2. **From a folder→branch promotion.** Work that began as additive (a folder on `main`) surfaces a result that puts a `main` claim at risk. Its purpose has flipped from adding to testing, so it is promoted to an exploration branch mid-stream (see "The two ways it begins").

**Do not use this skill for:**
- The branch-or-folder triage itself — that is `brainstorming_skill.md`'s hand-off.
- Additive supplementary work that never risks a `main` claim — that is a folder on `main` via the folder-creation placement check.
- Collaborative document review — that is `writing_branch_skill.md`.
- General-purpose branch use — plain git.

---

## Entry check — confirm the triage happened

When this skill is invoked **directly** (Andrea says "branch this exploration" without a brainstorm having run the triage), confirm the triage was actually made: ask whether this work is *testing* a `main` claim or *adding* to `main`.

- If it is *adding*, this is the wrong skill — route to a folder on `main` via the folder-creation placement check.
- If it is *testing*, proceed.
- If Andrea proceeds onto an exploration branch anyway, against the entry check (e.g. she is confident and does not want the triage), that is a legitimate **override**. Record it as a `[SKILL-FEEDBACK]` note (per `structure_conventions.md`) so the override is captured rather than lost — this skill is one *writer* to that channel, not its owner. Then proceed.

The entry check exists because the triage is the cheap moment to catch a misclassification; once on a branch, an additive piece has paid the isolation cost for nothing.

---

## The two ways an exploration branch begins

### From the brainstorming triage (the clean start)

The triage returned *testing*. Create the branch from `main` and register it. The branch holds the exploration's working files, its own `FOLDER_MAP.md`, and a `BRANCH_RESEARCH.md` log.

- **Branch ref:** `<slug>-explore-<date>` (e.g. `aml-elasticity-explore-jun-12`). See `naming_conventions.md`.
- **Create the branch** per `github_api_workflow_skill.md` (branch-create recipe).
- **Register it at creation** with one line in `BRANCHES_LOG.md` at the repo root on `main` (format in `structure_conventions.md`): date, branch-ref, `extends:` the subject/parent it hangs off, `testing:` the `main` claim being put at risk, `origin: created`.

### Promotion from a folder mid-stream (the intent flip)

Something opened as *adding* (a folder on `main`) surfaces a result that puts a `main` claim at risk. Its purpose has become *testing*. Either Andrea or Claude flags it — prompt, don't perform.

Mechanics:
- **Cut a branch from `main` now** (same ref convention, `origin: promoted-from <folder>`).
- **Leave the already-landed additive work on `main`.** It was additive in good faith; pulling it back off `main` would churn `main` and falsify history. Only the *forward* testing work goes on the branch.
- **Record** a `BRANCHES_LOG.md` line carrying `origin: promoted-from <folder>` plus the triggering hypothesis, and leave a folder→branch pointer in the folder's `FOLDER_MAP.md`.

There is no reverse "demotion" mechanism: a branch opened to test something that turns out additive simply merges early as additive (see Route, below).

---

## While the branch is open

- **The in-branch `FOLDER_MAP.md`** is the exploration folder's own map — the universal convention (`structure_conventions.md`), not a new index type. Its description slot carries `Extends:` (the subject/parent), `Testing:` (the `main` claim at risk), and `Standing:` (the distilled current answer, updated as the exploration progresses), alongside the standard content map.
- **`BRANCH_RESEARCH.md`** is the in-branch log (`structure_conventions.md`). It is a two-part file: a **review** on top (what the exploration was opened for, the hypothesis, what was done, how it turned out, how it connects to `main` — the lifecycle arc) and the chronological **trail** beneath (newest-first session entries). Its header names the branch-ref, so provenance is explicit once anything from it reaches `main`.
- **Reading the branch needs no checkout.** Read in-branch files via the `?ref=<branch>` discipline in `github_api_workflow_skill.md`. To orient on an open exploration, the path is: subject index → the `BRANCHES_LOG.md` line → fetch the in-branch `FOLDER_MAP.md` via `?ref=<branch>`. Never check out a branch to hunt.

---

## The finalize protocol

An exploration's merge is a deliberate **finalize** act, invoked directly when the exploration looks concluded — it can happen mid-session and does not wait for session close. Claude prompts when the exploration looks done ("this looks concluded — finalize it?"); Andrea confirms. (`finish_session_skill.md` stays light on an open exploration branch — it notes state, it does not prompt-to-merge; finalizing is this protocol, invoked on its own.)

Run the four steps in order. The order is load-bearing: you cannot decide what to do with stray files (reconcile) until the review has said what the product *is*.

### Step a — Review

Sweep the `BRANCH_RESEARCH.md` trail into its top review section. Set `Standing` to one of three outcomes:
- **held / null** — the check confirmed the claim, or returned nothing that moves it (e.g. a robustness check with a null result). `main`'s claim survives. *A null result is a held check, not an overturn.*
- **additive** — the work never was testing `main`; it adds.
- **overturn** — a *load-bearing* `main` claim is contradicted (e.g. the predicted sign flips).

Then do the blast-radius read: what on `main` depends on the claim this exploration touched?

### Step b — Reconcile

With the product now defined by the review, diff the branch against it and decide, file by file, what happens to anything *not* part of the product: fold it into the product, move it to `workspace/`, or drop it. This is the merge-time cousin of `finish_session_skill.md` Step 1's uncommitted-work inventory — nothing vanishes silently.

### Step c — Route on `Standing`

- **held / null / additive — land clean.** The exploration is a contained product folder; it lands by its `extends:` parent into a per-subject `explorations/` nest at the subject's home (born on first merge; not a repo-wide explorations root). `Standing` freezes to the outcome and becomes the merged folder's description; the parent's `FOLDER_MAP.md` gains one roster line carrying the branch-origin tag.
- **overturn — does not land clean.** A git-merge here would land both the old and the new claim and report "no conflicts" while `main` is now self-contradictory. Instead:
  1. **Stage, don't merge to canonical.** Bring the branch content to `workspace/staging/` via the `?ref=<branch>` read.
  2. **Supersede but retain.** The old claim is kept as recorded rationale, with a pointer to the exploration that overturned it and to the new claim. Nothing is destroyed on a state change — this is the exploration form of the kit's universal supersede-but-retain rule (operation §2; research stage history). Even a heavy overturn ends with the old claim retained as rationale, never deleted.
  3. **Track the downstream restructure as real work.** The overturn sets off a restructure — tracing the ripple across `main`, scaled to the blast radius (the merge itself never does a fuzzy mechanical dependent-scan). Record it as a workstream in `STATUS.md` Current state and hand execution to the writing skills; like any real work its plan lives *inside* that work and its position in `STATUS.md`, not in a separate doc. A large revision may itself open a `writing_branch_skill.md` branch. If the restructure spans sessions, the `multisession_task_skill.md` gate fires on it independently (as on any long work) — it is not auto-opened here.

### Step d — Record and delete

- Append the merge annotation to the exploration's `BRANCHES_LOG.md` line (`→ merged <date> into <path>` for the clean case; the staging pointer + the `STATUS.md` restructure workstream for an overturn).
- Move the raw `BRANCH_RESEARCH.md` trail to `workspace/branch_logs/<branch-ref>.md` (history, quarantined out of the retrieval tree but kept on `main` so it survives branch deletion — it holds the "why this, what was ruled out" that `Standing` does not).
- Write the outcome line to `STATUS.md` (for an overturn, the line opens the restructure workstream in Current state).
- **Delete the branch.** Both record-halves are on `main` after the split, so deleting costs only the raw commit-by-commit git history, never the decision-relevant record.

---

## Key rules

1. **Prompt, don't perform.** Promotion, finalize, and the overturn route are all flagged and confirmed, never done silently.
2. **Finalize is a deliberate, direct act** — it can run mid-session and does not wait for session close. `finish_session_skill.md` stays light on an open exploration branch; it does not re-implement the merge.
3. **Nothing is destroyed on a state change.** Held/null/additive retain their record; an overturn supersedes-but-retains the old claim. The branch is deleted only after both record-halves are on `main`.
4. **The trail earns its keep.** The raw `BRANCH_RESEARCH.md` trail is not recoverable from `Standing` — it carries the reasoning (`why this spec, what was ruled out`) that the frozen `Standing` line cannot. That is why it is preserved in `workspace/branch_logs/`, not dropped at delete.
5. **No checkout to read.** Branch state is read via `?ref=<branch>`; the retrieval path runs subject index → `BRANCHES_LOG.md` → in-branch `FOLDER_MAP.md`.

---

## Composition with other skills

- **`brainstorming_skill.md`** — owns the purpose-triage in its hand-off that routes a *testing* offshoot here. This skill begins after that decision.
- **`github_api_workflow_skill.md`** — owns the branch-create / merge recipes and the `?ref=<branch>` read discipline this skill calls.
- **`structure_conventions.md`** — defines the artifact formats (`BRANCHES_LOG.md`, `BRANCH_RESEARCH.md`, the in-branch `FOLDER_MAP.md` slots, `workspace/branch_logs/`, `workspace/staging/`); this skill owns only the *workflow* of writing them.
- **`writing_branch_skill.md`** — the ephemeral document-review sibling; a large overturn revision may open one downstream.
- **The skill-feedback channel** (`structure_conventions.md` `[SKILL-FEEDBACK]`) — this skill is one *writer* (the entry-check override), not its owner.
- **`project_tracker_skill.md` / the writing skills** — the overturn's downstream restructure is real work: tracked as a `STATUS.md` workstream and executed via the writing skills (Step c), with its plan embedded in the work, not a separate doc. **`multisession_task_skill.md`** enters only if that restructure spans sessions — its gate fires independently; this skill does not hand off a plan.

---

## What this workflow doesn't cover

- **The branch-or-folder triage** — `brainstorming_skill.md`'s hand-off.
- **Additive folders on `main`** — the folder-creation placement check.
- **Document review** — `writing_branch_skill.md`.
- **The artifact formats** — defined in `structure_conventions.md`; this skill writes them, it does not define them.
- **Restructure execution** — the writing skills, tracked as a `STATUS.md` workstream; a restructure that spans sessions rides the `multisession_task_skill.md` gate like any long work.

---

## Note to revisit

- **Shared triage extraction.** The purpose-triage lives in `brainstorming_skill.md`'s hand-off as a discrete named step. If a *second* entry point to a testing exploration proves real (e.g. a robustness check that arises mid-analysis with no brainstorm), extract the triage to a shared step per extract-when-proven. Not built shared now.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the two stacked trailing markers merged into one per the single-marker rule (M5); no content change — the merged text keeps the corrected overturn-route framing. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: new skill — the long-lived, isolated side-extension half of the `branch_workflow` split (`branch_workflow_skill.md` became `writing_branch_skill.md` for the ephemeral document-review half). Begins at "branch decided" (the brainstorming purpose-triage's testing verdict, or a folder→branch promotion); carries the entry check and the finalize protocol (review → reconcile → route-on-`Standing` → record+delete) with three outcomes (held/null · additive · overturn). Overturn route corrected the same cycle (v4 multisession_task build) to the constraint-vs-real-work distinction: the restructure is real work, tracked as a `STATUS.md` workstream and executed via the writing skills (#8's `STATUS.md` routing is primary, not a fallback); `multisession_task_skill.md` is referenced only as the gate that fires if the restructure spans sessions, never the route's owner — the overturn never hands off a plan. Placed in the always-active Repo and session infrastructure cluster. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.)*
