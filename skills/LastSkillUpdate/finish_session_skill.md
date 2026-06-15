---
name: finish-session
description: "Close-out ritual orchestrator for session end. Sequences the five close-out steps in the right order — uncommitted-work inventory, branch disposition, STATUS.md update, conditional conversation save, confirm close — so nothing is missed. Does not re-implement those steps; points at the canonical skills (project_tracker_skill.md, repo_conversations_skill.md, writing_branch_skill.md, exploration_branch_skill.md) for the per-step procedure. Triggers: 'thanks,' 'thank you,' 'good night,' 'good morning' (when context indicates session end), 'we're done,' 'let's wrap up,' 'let's stop here,' 'good stopping point,' 'save and stop,' 'wrap and commit,' or any clear session-close phrasing. Does NOT run for mid-session checkpoints, mid-session branch merges, or mid-session conversation saves — those go directly to the canonical skills without this orchestrator."
---

# Finish Session Skill

This skill defines the close-out ritual for a session. It is a **sequencing skill**: it does not duplicate work that other skills do, it orchestrates them in the right order so nothing is missed at session end.

The pieces of the close-out are already defined elsewhere: STATUS.md updates live in `project_tracker_skill.md`, conversation saves live in `repo_conversations_skill.md`, branch merges live in `writing_branch_skill.md` (and an exploration branch is finalized separately — per `exploration_branch_skill.md` — not at close). What this skill adds is (a) an explicit close-out trigger, (b) an ordered sequence so the pieces run in a sensible order, (c) a check for uncommitted work that none of the other skills owns, and (d) a single point of reference for "what happens when Andrea says we're done."

**What this skill is, and what it is not.** This skill defines the *checklist and ordering* for closing a session. It is **not** a re-implementation of STATUS.md updates, conversation saves, or merges — those remain in their canonical skills, and this skill points at them. The relationship: each step here is a one-line trigger ("if X, do Y per skill Z"); the per-step procedures stay in the canonical skills.

---

## When to use this skill

Read this skill when Andrea signals session close. Close-out signals include:
- "thanks," "thank you"
- "good night," "good morning" (when context indicates session end)
- "we're done," "let's wrap up," "let's stop here," "good stopping point"
- "save and stop," "wrap and commit"
- Or any phrasing where Andrea is clearly closing the session.

Do not use this skill for:
- Mid-session checkpoints. There is no mid-session checkpoint discipline in this kit; if work matters, it gets committed when it lands. The session-start freshness audit in `project_tracker_skill.md` reconstructs whatever drift accumulated.
- Branch merges that happen mid-session at Andrea's explicit request (those go straight to `writing_branch_skill.md` Step 6 without this skill running).
- An exploration-branch finalize, which is a deliberate mid-session act (per `exploration_branch_skill.md`), not a close-out step.
- Conversation saves that happen mid-session at Andrea's explicit request (those go straight to `repo_conversations_skill.md` Trigger 1 without this skill running).

---

## The close-out sequence

When a close-out signal fires, Claude runs the following five steps in order. Each step has a stop condition; do not advance until the current step is resolved.

### Step 1 — Inventory uncommitted work

Before anything else, scan for work touched this session that hasn't been committed yet. This is the gap none of the other skills owns.

Sources to check:
- Any file Claude has written to in this session that hasn't been pushed via the GitHub API.
- Drafts, indexes, brainstorms, notes, or other tracked artifacts modified in conversation but not yet committed.

If everything is committed, say so and move to Step 2.

If there are uncommitted changes:
1. Surface the list to Andrea.
2. Ask: "commit these now, defer to a later session, or discard?"
3. On Andrea's choice, act accordingly (commit, leave alone, or revert).
4. Then advance.

This step is not about being comprehensive — it's about catching the obvious gaps. The session-start freshness audit in `project_tracker_skill.md` is the safety net for anything missed here.

### Step 2 — Branch disposition (if applicable)

If session work happened on a branch, handle it **by branch type** — the two branch skills close out differently.

**Writing branch** (per `writing_branch_skill.md` — an ephemeral, single-document review branch): check whether it reached a natural stopping point.
- If the draft is complete and Andrea has approved it, ask: "ready to merge?"
  - If yes: follow `writing_branch_skill.md` Step 6 (merge to main, then ask about branch disposition).
  - If no: branch stays open for the next session. Note this in the STATUS.md update at Step 3.
- If the draft is mid-progress, do not ask about merging. The branch persists. Note state in STATUS.md at Step 3.

**Exploration branch** (per `exploration_branch_skill.md` — a long-lived branch testing whether a `main` claim holds): **stay light.** Do *not* prompt to merge. An exploration is finalized by a deliberate, separate act — the finalize protocol in `exploration_branch_skill.md`, invoked directly when the exploration is concluded, which can be mid-session and does not belong to session close. At close, just commit any work-in-progress to the branch and note the exploration's state in the STATUS.md update at Step 3 (it is already registered in `BRANCHES_LOG.md` from its creation). The branch persists across sessions until it is finalized. This mirrors how a mid-session writing merge bypasses this skill and goes straight to `writing_branch_skill.md` Step 6 — finalizing is its own act, not a close-out step.

If no branch work was happening this session, skip this step.

### Step 3 — STATUS.md update

Mandatory. Follow `project_tracker_skill.md`'s session-close update protocol in full:
1. Draft the update.
2. Show Andrea.
3. If she reviews: commit clean (`reviewed` flag).
4. If she says "just commit it": commit as-is (`unreviewed` flag).

Do not skip. Do not abbreviate. The skill exists for a reason and this step is its main trigger.

Edge case — if the session is closing because Andrea is being interrupted (laptop dying, called away mid-conversation, etc.) and she explicitly says "I have to go right now": commit STATUS.md immediately with the best draft Claude can produce, flag as `unreviewed`. Skip Steps 4 and 5 since Andrea is gone. Better an `unreviewed` STATUS.md than no update at all.

### Step 4 — Conversation save (conditional)

Check the `repo_conversations_skill.md` proactive-offer conditions:
1. Did the conversation have 3+ substantive Q&A turns on a coherent topic?
2. Did Claude consult the repo's content (papers, inputs, drafts, etc.) to answer?
3. Andrea has signaled closure (this is implicit — the close-out is why we're here).

If all three are true: offer the save per `repo_conversations_skill.md` Trigger 2.
- If Andrea accepts: follow the save workflow in `repo_conversations_skill.md`.
- If Andrea declines: skip.

If any of the three is false (e.g., it was a short admin exchange): skip silently. Do not offer; the conditions aren't met.

The order matters: STATUS.md is updated *before* the conversation-save offer. Two reasons: (a) STATUS.md is mandatory and should not be blocked by the optional save; (b) if Andrea declines the save, Claude has already done the most important close-out work.

### Step 5 — Confirm close

Once Steps 1–4 are resolved, confirm to Andrea that the session is wrapped. A one-line "STATUS.md committed, [conversation saved | no save needed], [branch merged | branch stays open | no branch work]. Until next time."

Then stop. Do not pull her into another exchange.

---

## What this skill does NOT do

- **Does not redefine the STATUS.md draft format.** That lives in `project_tracker_skill.md`. This skill says "follow that protocol;" it does not repeat the protocol.
- **Does not redefine the merge mechanics.** Writing-branch merges live in `writing_branch_skill.md` Step 6; an exploration-branch finalize lives in `exploration_branch_skill.md` and is invoked directly, never re-implemented here.
- **Does not redefine the conversation-save format.** That lives in `repo_conversations_skill.md`.
- **Does not introduce a mid-session checkpoint.** If Andrea wants to save mid-session, she can invoke any of the underlying skills directly. This skill only fires on close-out signals.
- **Does not assume a code-implementation hand-off.** The upstream `claude_researcher` `finish-convo` skill includes an "ask about creating a plan doc" step tied to their `write-a-plan` skill. Andrea's kit does not have an implementation-planning skill (Item 10 in v2.2 planning was rejected because `writing_skill.md` Protocol 2 already covers turning conversations into structured deliverables). If Andrea later adds a code-implementation planning skill, this skill's sequence will need a new step; for now, the gap is intentional.

---

## Composition with other skills

This skill is the **downstream session-close orchestrator** that wires together the kit's existing close-out pieces.

- **`project_tracker_skill.md`** — owns the STATUS.md update protocol. This skill triggers it (Step 3).
- **`repo_conversations_skill.md`** — owns the conversation-save protocol. This skill triggers it conditionally (Step 4).
- **`writing_branch_skill.md`** — owns the writing-branch merge protocol (Step 6 there). This skill triggers it conditionally (Step 2 here).
- **`exploration_branch_skill.md`** — owns the exploration finalize protocol. This skill does *not* trigger it; at close it stays light on an exploration branch and notes state (Step 2). Finalizing is a separate, deliberate act, invoked directly.
- **`github_api_workflow_skill.md`** — owns the commit mechanics used in Step 1. This skill does not duplicate the commit recipes; it points at the canonical patterns.

The upstream cross-link: `project_tracker_skill.md` mentions "the future session-end skill (Phase 2.2.E) will formalize the session-close protocol described above." That's this skill. Now that this skill ships, the close-out sequence has a single entry point.

---

## Notes on scope

- **Generic skill, propagates to all content repos.** Lives in `LastSkillUpdate/`.
- **SkillPropagation itself does not use this skill at session close.** SkillPropagation is the kit factory; its close-out discipline is "commit the kit changes per the consolidation workflow," which is governed by `skills_consolidation_skill.md`, not this skill.
- **No `update-docs` analog.** The upstream `claude_researcher` has a separate `update-docs` skill for mid-session checkpoints. This kit deliberately does not port it — see v2.2 planning Item 7 for the rationale.

---

*Last updated: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: Step 2 (branch disposition) is now branch-type-aware. A writing branch keeps the ready-to-merge prompt (`branch_workflow_skill.md` renamed → `writing_branch_skill.md` throughout); an exploration branch gets a light arm — note state, do not prompt-to-merge — because finalizing is a separate, deliberate act in `exploration_branch_skill.md`, invoked directly (mirroring how a mid-session writing merge bypasses this skill). Intro, do-not-use list, doesn't-do, and composition sections updated to name both branch skills. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: v1.1 (v2.1.14 hygiene: stacked v1.0 and v1.1 markers consolidated into a single trailing marker, per the discipline applied to `audit_repo_skill.md` v1.3 in v2.1.12. v1.1 substance: YAML frontmatter added for trigger-matching per the v2.1.11 frontmatter audit. v1.0: initial skill ship in v2.1.6.))*
