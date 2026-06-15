---
name: writing-branch
description: "Branch-based workflow for collaboratively producing markdown documents that Andrea wants to review and edit before signoff. The branch is ephemeral — typically one session — and merges as a finished deliverable. Use whenever Claude and Andrea are jointly producing a document (slide content, talking points, briefings, narrative drafts, papers, literature mappings, research notes) and Andrea needs to read and react at her own pace before merging to main. Triggers automatically when Protocol 2 of writing_skill.md engages (outlining → branch). Also use when Andrea says 'put this on a branch,' 'let's review this before signoff,' 'I want to read this carefully,' or proposes a multi-round review on a co-produced doc. Branches hold markdown only — companion artifacts (docx, pptx, LaTeX) are built from main after merge. Does NOT apply to an exploration whose purpose is to test whether a claim on main holds (a robustness check, an alternative specification) — that is a long-lived, isolated exploration branch with its own skill (exploration_branch_skill.md); nor to general-purpose branch use (experiments, parallel versions, code refactors — plain git)."
---

# Writing branch workflow for collaborative document review

**Status:** active.
**Owner:** Andrea Lopez-Luzuriaga.
**Applies to:** any case where Claude and Andrea are jointly producing a document and Andrea wants to read and comment on it before signing off. Typical examples: slide content, talking points, briefings, narrative drafts, papers, literature mappings, research notes — with or without companion artifacts (docx, pptx) generated from the markdown. The branch is ephemeral — it holds one document under review and closes at merge.

**Does not apply to:** an *exploration* — work whose purpose is to test whether a claim on `main` holds (a robustness check, an alternative specification, a re-analysis that could move a conclusion). That is a long-lived, isolated exploration branch with its own skill (`exploration_branch_skill.md`). Nor does it apply to general-purpose branch use (an experiment, a parallel version, a code refactor) — that is plain git. This skill is specifically the ephemeral, single-document review branch.

---

## Why this workflow exists

When a document goes through review and edits, working directly in `main` creates two problems:

1. **Edits scroll past in chat.** When Andrea reads the document at her own pace and reacts, her comments accumulate. If she sends them all in one chat message, Claude has to parse a wall of edits and risks missing one. If she sends them across several messages, intermediate state lives only in chat history.
2. **`main` becomes unstable.** A coworker pulling `main` mid-edit gets a half-finished document. The deck Marta clicks to open three days from now should not be a draft.

The branch workflow solves both: edits go in the markdown file with inline notes, the branch holds intermediate state, and `main` only updates when review is done.

---

## When to use this workflow

**Use a branch when:**
- **Protocol 2 of `writing_skill.md` is engaged** — i.e., an outline is being built or has been built. Outlining triggers a branch automatically, at the point the outline is first saved (after the scale check). The branch holds the outline, the drafting-unit drafts, the compiled outline + divergence table, and the review. See `writing_skill.md` Protocol 2 step 1.
- Claude and Andrea have produced a document together (not via Protocol 2 — e.g., a doc imported from elsewhere, or a second pass on a finished doc) and Andrea wants to review it before signoff.
- The document is markdown — with or without companion artifacts (docx, pptx). The branch only ever holds markdown. Companion artifacts are built from `main` after merge (see Step 4 and Step 6).
- The deliverable will be touched by other people (Marta, the RA, coworkers) and `main` should stay stable through the review.

**Skip the branch (work directly in `main`) when:**
- The change is a single small edit that takes one round.
- The task is exploratory drafting where Andrea is iterating in real time in chat and there is no outline yet (emails, short talking points, brief messages, single-slide bullets).
- The file is a working scratch document not consumed by anyone else.
- Andrea wants a branch to test whether a `main` claim holds — a robustness check, an alternative specification, anything whose purpose is to put a `main` claim at risk. That is an exploration branch (`exploration_branch_skill.md`), not this skill. For any other branch reason, use plain git.

When in doubt, propose the branch and let Andrea say no. But if Protocol 2 is engaged, there is no doubt — branch.

---

## The protocol

### Step 1 — Branch creation

When starting an edit round on a document, Claude creates a branch from `main`:

```bash
# Get the SHA of main
MAIN_SHA=$(curl -s -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/$REPO/git/refs/heads/main" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")

# Create the branch
curl -s -X POST -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/$REPO/git/refs" \
  -d "{\"ref\":\"refs/heads/BRANCH_NAME\",\"sha\":\"$MAIN_SHA\"}"
```

**Branch naming convention:** `<project-slug>-<purpose>-<date>`
- Project slug: short, kebab-case (e.g. `marta-oecd`, `aml-paper`, `cfr-strategy`).
- Purpose: `edits`, `restructure`, `redraft`, `review`.
- Date: `mmm-d` format (e.g. `may-1`, `jun-15`).
- Examples: `marta-oecd-edits-may-1`, `aml-paper-redraft-jun-3`.

Once a branch exists, Claude points Andrea to it and tells her which files to edit.

### Step 2 — Andrea edits in the branch

Andrea opens the markdown files in the branch (via VS Code, GitHub web UI, or any text editor) and works in two modes — interchangeably, in the same file:

**Mode 1 — Inline bracketed comments.** Andrea writes her thoughts in plain language inside square brackets, in her own words. Examples:

```
[this is wrong, fix it]
[too long, cut to one sentence]
[change "12 puntos" to "12 puntos del PIB"]
[move this to slide 8]
[not sure about this paragraph — what do you think]
[check that Bellon 2022 is the right citation here]
```

There is no fixed vocabulary or required tag — Andrea writes what she means and Claude figures out what to do. The principle: brackets signal "this is a note for Claude, not document content."

**Mode 2 — Direct edits to the text.** Andrea may rewrite a paragraph, replace a sentence, or restructure a list directly, without leaving an instruction. The new text *is* the edit.

Both modes are valid and can appear in the same file at the same time.

**How Claude reads bracketed comments.** Claude infers what the comment means from its content:

- If it reads as an instruction (e.g. "fix the typo", "change X to Y", "delete this", "move to slide 8") → Claude does the thing, and asks first if it's substantive enough to involve a choice.
- If it reads as a question or expression of uncertainty (e.g. "not sure about this", "what do you think", "is this the right framing") → Claude treats it as a discussion item, not an instruction. Claude responds in chat or in the report-back, but does not edit the document.
- If it's ambiguous (could be either) → Claude asks before acting.

If Andrea wants the action interpretation forced, she can write something unambiguous like "yes, do it" or "fix this." If she wants the question interpretation forced, a question mark or "not sure" makes it clear.

### Step 3 — Andrea edits on the remote

Andrea always edits the markdown files directly in the branch via the GitHub web UI (or local git, if she prefers — the substance is the same: edits are committed to the branch, not pasted in chat).

Andrea signals end-of-round with phrases like "ready," "done," "go ahead," or "take it from there." At that point Claude pulls the latest branch state.

This skill does not support a "paste edits in chat" path. Edits live in the branch, not in chat. Discussion of edits — questions, decisions, framing — happens in chat; the edits themselves do not.

### Step 4 — Claude applies the edits and proofreads direct changes

Claude pulls the latest branch state. Andrea's edits come in two flavors and are handled differently:

**Mode 1 — Bracketed comments.** Claude applies what each comment asks for, per the interpretation rules in Step 2 (action vs. question vs. ambiguous). Claude strips the brackets from the final text after applying. Anything ambiguous gets surfaced in the report-back without auto-editing.

**Mode 2 — Direct edits (Andrea wrote new text in place).** Claude detects these by comparing the current branch state to the branch-creation commit (`git diff <creation-commit> <branch-tip>`). Anything that changed but isn't a bracketed comment is a direct edit. Claude proofreads each direct edit:

- **Light proofreading — silent fixes.** Typos, missing or wrong accents (especially for Spanish), capitalization, punctuation, citation formatting (e.g., reformatting "Adan et al, 2023" → "Adan et al. 2023"). Claude just applies these.
- **Heavy proofreading — surface as a note.** Terminology drift (e.g., Andrea wrote "brecha" but the doc convention is "distancia"), inconsistency with the rest of the document, voice or style mismatch. Claude does *not* auto-fix these. Instead, Claude raises them in the report-back with a parenthetical reminder that Andrea should have left a comment for these — i.e., heavy issues are discussed before action, never silently corrected.

After applying Mode 1 actions and Mode 2 light fixes, Claude pushes the updated markdown to the **branch** (not to main).

**Companion artifacts are not built on the branch.** If the markdown has companion artifacts (docx, pptx, LaTeX), they stay at whatever state they had on `main` when the branch was created — *the branch never contains a regenerated artifact*. The reason: Andrea iterates on markdown across multiple rounds, and rebuilding the artifact on every round wastes effort and clutters the branch. Artifacts are produced only after the markdown is approved and merged (see Step 6).

### Step 5 — Claude reports back

After applying, Claude confirms what was changed and what's now in the branch, with three sections:

- **Comment-driven changes.** Files updated per Andrea's bracketed comments. Comments that needed interpretation (i.e. ambiguous — could be instruction or question) are surfaced. Comments Claude read as questions or expressions of uncertainty get Claude's response here. Verification requests (e.g. comments asking Claude to check a fact or citation) get the result here.
- **Direct edits — light fixes applied silently.** A short list of mechanical fixes Claude made to Andrea's direct edits (typos corrected, accents added, etc.). One line each, mostly for transparency. Andrea can skim or skip.
- **Direct edits — heavy issues flagged.** Anything Claude noticed in Andrea's direct edits that crosses into terminology, consistency, or voice — *not auto-fixed*, surfaced for Andrea to decide. Each item includes a parenthetical reminder that Andrea should have left a comment in this case, so the heavy issue gets resolved before action.

This becomes the next checkpoint — Andrea reads it, decides if another round is needed, and either iterates or merges.

### Step 6 — Merge to main

When Andrea says "merge" or "ready to merge" or "looks good, merge it":

```bash
# Merge the branch into main via the API
curl -s -X POST -H "Authorization: token $TOKEN" \
  "https://api.github.com/repos/$REPO/merges" \
  -d "{\"base\":\"main\",\"head\":\"BRANCH_NAME\",\"commit_message\":\"Merge BRANCH_NAME: brief summary of what changed\"}"
```

Claude reports the merge SHA and confirms `main` is updated.

**Companion files in the merge.** When the branch holds a draft produced via `writing_skill.md` Protocol 2, the merge includes both the draft (`<name>.md`) and the compiled outline + divergence table (`<name>_OUTLINE.md`) as a pair — they're approved together at Protocol 2 step 11 and merged together. Both ship in `main`.

**Building companion artifacts after merge.** If the merged markdown drives a docx, pptx, or LaTeX deliverable, Claude builds the artifact from `main` once Andrea asks. If Andrea does not ask, no artifact is built — the markdown on `main` is the deliverable. The build happens on `main`, not on the branch (the branch is closed at merge).

**Branch disposition — ask every merge.** After the merge, Claude asks Andrea whether to keep or delete the branch. There is no default. Branches are not part of the repo's history unless Andrea says so. Ask every round, no carryover from prior decisions. If she says delete, Claude deletes the branch via the GitHub API. If she says keep, the branch stays and Claude does nothing further.

---

## Conventions for Claude

1. **Branch creation is at Claude's initiative when the trigger conditions are met.** Andrea does not need to ask. Claude proposes: "I'm setting up a branch `<name>` for this round of edits." If Andrea wants to skip the branch, she says so.

2. **Never push edits to `main` while a branch is open for that document.** Pushing to both creates conflicts. The branch is the authoritative version while it's open.

3. **Branches hold markdown only. Companion artifacts (docx, pptx, LaTeX) are built from `main` after merge, only when Andrea asks.** Do not regenerate or push artifacts to the branch under any circumstances. Stale artifacts on `main` during a review round are expected — they reflect the last merged version of the markdown, not the in-flight branch.

4. **Inline notes get stripped from the output, not preserved.** The final markdown that lives in main is clean text. Andrea's notes are processing instructions, not document content.

5. **If Andrea's note is ambiguous, ask before applying.** Don't guess on substantive changes. For typo-level fixes, just apply.

6. **For Andrea's direct edits, light fixes are silent and heavy issues are surfaced.** Mechanical things (typos, accents, punctuation, citation formatting) get fixed without comment. Anything that crosses into terminology, consistency, or voice is *never* auto-fixed — it goes in the heavy-issues section of the report-back so Andrea can decide. The principle: if Andrea wanted Claude to make the call on a heavy issue, she would have left a comment.

7. **At end of round, surface every interpretation Claude made.** If Andrea wrote "tighten this paragraph" and Claude rewrote it three different ways, Claude says so and shows the result.

8. **Branches accumulate per project.** If Andrea opens a second round of edits, create a new branch (e.g. `marta-oecd-edits-may-2`) — do not reuse the previous branch. Each branch represents one closed edit round.

---

## What this workflow doesn't cover

- **Exploration branches.** Work whose purpose is to test whether a `main` claim holds is a long-lived, isolated exploration branch — see `exploration_branch_skill.md`. This protocol is the ephemeral, single-document review case only.
- **General-purpose branch use.** Any other branch reason (an experiment, a parallel version, a code refactor) uses plain git, not this skill.
- **Code review.** Code collaboration uses standard PR-based git flow but isn't formalized here.
- **Multi-author editing.** If a coworker is also editing the document at the same time, this protocol breaks. Tell Andrea immediately if that happens.
- **Permissions.** This protocol assumes Andrea's PAT has write access to the repo. If Claude can't push to the branch, the PAT doesn't have the right permissions.

---

*Last updated: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: renamed from `branch_workflow_skill.md` to `writing_branch_skill.md` — the ephemeral, single-document review half of the branch_workflow split; the long-lived testing/exploration half is the new `exploration_branch_skill.md`. Frontmatter `name` → `writing-branch`; the "general branch use → plain git" disclaimer now carves out exploration branches first (the most likely misroute), in the description, the header, the When-to-use skip list, and the doesn't-cover section. Stays in the always-active Repo and session infrastructure cluster. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: v2.0.4 (May 13, 2026) — added YAML frontmatter for trigger-matching per the v2.1.11 frontmatter audit; v2.0.3 rename preserved.)*



