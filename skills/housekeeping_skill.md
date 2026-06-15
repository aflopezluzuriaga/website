---
name: housekeeping
description: "Run a consistency check across a repo — verifying that infrastructure files (CLAUDE.md, FOLDER_MAP.md files, indexes like MATERIALS_INDEX.md, PAPERS_INDEX.md, navigation tables) accurately describe what is actually on disk, and that internal cross-references resolve. Triggers: 'let's do housekeeping,' 'housekeeping,' 'audit the repo,' 'check this repo is clean,' 'run a consistency check,' 'are the indexes up to date,' 'is CLAUDE.md still accurate,' 'find orphaned files,' 'is anything missing,' 'does this repo match its archetype,' 'check for archetype drift.' Runs in audit mode (report only), repair mode (propose fixes per finding, apply on approval), or index-audit mode — the dedicated per-entry currency verification of what the repo's indexes, registers, and FOLDER_MAP descriptions claim, run as its own session on the INDEX_AUDIT_INTERVAL cadence (triggers: 'run the index audit,' 'the index audit is overdue'). Never judges deliverable content quality — the boundary is infrastructure claims vs. deliverable quality: the audit may verify that the infrastructure's statements about the work are current; it never reviews whether the work itself is good. If the repo declares an archetype in its CLAUDE.md (type research/coordination/operation), Check 12 additionally verifies the repo's structure, index set, placement, and naming against the archetype-common layer (archetype_conventions.md) and the one archetype spec it carries — a conformance check, distinct in kind from the infrastructure-consistency checks. If the repo defines PALETTE_FILE in its CLAUDE.md, also runs the palette-consistency check across files listed in the palette's mirror section."
---

# Housekeeping Skill

This skill defines how to run a consistency check across a content repo — verifying that the repo's infrastructure files (indexes, navigation tables, `CLAUDE.md`, `FOLDER_MAP.md` files) accurately describe what is actually on disk. When the repo declares an archetype, the skill *additionally* checks the repo's structure against that archetype's carried spec (Check 12). That check is different in kind from the others: Checks 1–11 verify *internal consistency* (does the repo's own documentation match the repo's own disk), while Check 12 verifies *conformance to an external standard* (does the repo match the archetype spec it declares). Both are infrastructure checks — neither touches deliverable content.

The point is to catch drift. Over time, files get added, renamed, moved, or deleted, and the surrounding infrastructure that points at them does not always get updated in step. An audit pass finds the gaps so they can be repaired in one focused session, rather than tripping over them piecemeal during normal work.

**What this skill is, and what it is not.** The boundary is **infrastructure claims vs. deliverable quality**. This skill verifies that the repo's infrastructure tells the truth — both *structurally* (documentation matches disk: Checks 1–12, run in audit/repair mode) and *in what it claims* (index rows, register rows, and `FOLDER_MAP` descriptions still state what is currently true: the index audit, run in its own mode on its own cadence). It never judges the work itself — whether a paper is well-argued, a draft well-written, an analysis sound. A stale "awaiting outcome" label on an instance whose outcome arrived is an infrastructure defect, not a content judgment; that is the line. Check 12 widens "infrastructure" to include the repo's *structure* measured against its declared archetype spec, and the index audit widens it to include the *currency of infrastructure claims* — neither crosses into deliverable quality. *(This boundary replaces the prior structure-vs-content line, which deferred claim currency to "the separate index-system revision"; that revision is settled — the archetype layers now define each index's role — and the index-audit mode is the deferred check, built v4.)*

This skill **is** the on-demand form of housekeeping. The same housekeeping checklist also runs at skill propagation (Part C Step 10 of `PROJECT_SETUP.md`) — a subset riding the propagation commit, once, immediately before it. One concept, two wrappings: on demand (this skill, against a quiet repo, committing its own fixes — or just reporting, in audit mode) and at propagation (Step 10's pass, on the same atomic commit as the kit update). The checklist is shared; only the wrapping differs.

---

## When to use this skill

Read this skill when the user asks to:
- "Let's do housekeeping" / "do a housekeeping pass" (the primary phrasing)
- "Audit the repo" / "check this repo is clean" / "run a consistency check"
- "Are the indexes up to date?"
- "Is `CLAUDE.md` still accurate?"
- "Find orphaned files"
- "Run the index audit" / picking up `project_tracker`'s "the index audit is overdue" reminder (index-audit mode)

Do not use this skill for:
- Reviewing deliverable content quality.
- Checking out-of-scope folders not listed in the repo's `CLAUDE.md` audit scope.

---

## Three modes

The user chooses the mode at the start of the session. If unclear, ask.

- **Audit mode** — Report findings, propose no fixes, make no commits. Useful when the user wants to see the picture before deciding how to repair, or when running the audit as part of a broader review.
- **Repair mode** — Report findings, propose fixes per finding, apply on per-finding approval, commit at the end. Useful when the user wants to clean the repo in one pass.
- **Index-audit mode** — the dedicated per-entry currency check ("The index audit" section, after the checklist). Not a run of the Steps 1–5 checklist: it has its own protocol, is inherently interactive (findings adjudicated live, per finding), and ends in a single atomic commit of approved fixes plus the `STATUS.md` date stamp. Invoked by `project_tracker`'s cadence reminder ("the index audit is overdue") or directly ("run the index audit"). Per-entry verification is deliberately kept out of the routine audit pass so that pass stays cheap.

Audit and repair can shift mid-session: a clean audit may end with the user saying "repair these three." Switch modes when asked and continue. The index audit is its own session type and does not fold into a regular pass.

---

## Repo-specific parameters

The repo's `CLAUDE.md` provides project-specific values for the parameters below. If `CLAUDE.md` does not define a parameter, use the default given here.

| Parameter | Description | Default |
|---|---|---|
| `INFRASTRUCTURE_FILES` | List of repo infrastructure files to check | `CLAUDE.md`, `README.md`, all `FOLDER_MAP.md` files |
| `INDEX_FILES` | Repo-level index files (e.g., `MATERIALS_INDEX.md`, `PAPERS_INDEX.md`) | None — skip the index-consistency check if not defined |
| `DELIVERABLE_FOLDERS` | Folders containing deliverables that should be referenced from infrastructure. **When the repo declares an archetype, this is derived from the declared spec** (the deliverable/output homes it defines), discovered via the repo's `FOLDER_MAP.md` files — not the hardcoded default. The default below is the fallback for `type: NONE` and pre-archetype repos. | `papers/`, `Drafts/`, `inputs/` |
| `KIT_FOLDER` | Where generic skills live in this repo | `skills/` |
| `PALETTE_FILE` | Canonical color palette file. If defined, the palette-consistency check (Step 2, Check 8) runs against this file and the consumers listed in its "Files that mirror this palette" section. | None — skip the palette-consistency check if not defined |
| `AGENT_OUTPUTS_FOLDER` | Agent-research dives folder. If defined, Check 9 (agent-outputs workflow invariants) runs against it. | None — skip the agent-outputs check if not defined |
| `AGENT_OUTPUTS_INDEX` | Topic-grouped tracker for agent dives, consulted by Check 9. | `<AGENT_OUTPUTS_FOLDER>/INDEX.md` if `AGENT_OUTPUTS_FOLDER` is defined; otherwise None |
| `AGENT_OUTPUTS_LESSONS` | Cross-dive error patterns and prompt-engineering responses, consulted by Check 9. | `<AGENT_OUTPUTS_FOLDER>/LESSONS.md` if `AGENT_OUTPUTS_FOLDER` is defined; otherwise None |
| `EXCLUDED_PATHS` | Paths to skip during the audit (per-repo exceptions) | None |

The audit checks `INFRASTRUCTURE_FILES` for internal consistency, cross-checks `INDEX_FILES` against the contents of `DELIVERABLE_FOLDERS`, verifies references inside `KIT_FOLDER` resolve, and (when `PALETTE_FILE` is defined) verifies palette consumers stay in sync with the canonical palette. When `AGENT_OUTPUTS_FOLDER` is defined, Check 9 additionally verifies workflow invariants in the agent-research dives folder. Paths in `EXCLUDED_PATHS` are skipped entirely.

---

## Workflow

### Step 1 — Triage

Confirm:
1. The repo's `CLAUDE.md` exists and is readable.
2. The audit parameters are defined (or the defaults apply).
3. The user has chosen audit mode or repair mode.
4. **The index-audit date (cross-reminder; audit/repair modes).** Read `STATUS.md`'s "Index audit last run" date. If today minus that date exceeds `INDEX_AUDIT_INTERVAL` (default 30 days; the parameter lives in `project_tracker_skill.md`, set per-repo in `CLAUDE.md`), surface once: "the index audit is also overdue — schedule a dedicated session." Prompt-don't-perform; the regular pass does not absorb the index audit.
5. **The archetype declaration.** Read `CLAUDE.md`'s `archetype.type` frontmatter. If it is research/coordination/operation, Check 12 runs against the archetype-common layer (`archetype_conventions.md`) **and** the one carried `*_archetype_spec.md`; note the `variant` and `spec_version` for that check. If `type: NONE`, Check 12 is skipped (a NONE repo carries neither). If there is no declaration at all (a pre-archetype repo), Check 12 does not run; surface this once as a migration gap (the repo predates the archetype system) rather than checking against a guessed archetype — and `DELIVERABLE_FOLDERS` falls back to its hardcoded default.

If `CLAUDE.md` is missing or the repo structure does not match what's expected (no `skills/` folder, no `FOLDER_MAP.md` files), surface this immediately — the audit cannot proceed against an incoherent baseline. Suggest running `PROJECT_SETUP.md` Part B first.

### Step 2 — Run the checklist

These are ported from `PROJECT_SETUP.md` Part C Step 10, extended to cover cross-folder reference consistency.

1. **Root `CLAUDE.md` — skill table consistency.** Every file in `KIT_FOLDER` either has a row in `CLAUDE.md`'s skill table or has been intentionally excluded. No rows reference files that don't exist. Cross-references in working conventions and trigger maps point to files that exist.

2. **Root `CLAUDE.md` — folder structure section.** The folder layout shown matches the actual folder structure on disk. Folders mentioned exist; folders that exist are mentioned (or intentionally omitted).

3. **`FOLDER_MAP.md` files — navigation tables.** Any navigation tables or file lists match the folder's actual contents. Entries point to files that exist; files in the folder are listed (or intentionally omitted).

4. **`README.md` — internal consistency.** If it mentions skills, folders, or kit version, those mentions are current.

5. **`INDEX_FILES` — entry-to-file correspondence.** Every file in the relevant `DELIVERABLE_FOLDERS` either has an entry in its index file or has been intentionally omitted (e.g., archived, excluded). No entries point to files that don't exist. **Index *content* (status labels, "read" markers, summaries) is not checked in this pass** — only structural presence of entries; claim currency is the index audit's job (its own mode, its own cadence).

6. **Cross-folder reference consistency.** When a deliverable folder is referenced from elsewhere (e.g., a `Drafts/` file cites a paper in `papers/`, an `FOLDER_MAP.md` in `workspace/` points to a file in `inputs/`), the referenced file exists. This is the main extension beyond the propagation-time housekeeping check.

7. **Skill-to-skill cross-references inside `KIT_FOLDER`.** If a skill file mentions another skill by filename, the referenced file exists in `KIT_FOLDER`.

8. **Palette consistency (if `PALETTE_FILE` is defined).** When the repo has a canonical color palette (e.g., the kit's `andreas_palette.md` in SkillPropagation), verify:
   - **Completeness:** every color defined in any file listed under "Files that mirror this palette" exists in the canonical palette. No color silently introduced in a consumer without being added to the palette first.
   - **RGB consistency:** the RGB / hex value for each named color is identical across the palette and every consumer. No drift in values.
   - **Name consistency:** no consumer defines a color under a name not present in the palette (catches missed renames, like a stale `LightBluePale` after rename to `SoftBlue`).
   - **Sync header presence:** every consumer file listed in the palette's "Files that mirror this palette" section has a header comment naming the palette as canonical source. Missing or out-of-date headers are findings.
   - **Asset references resolve:** asset files referenced in the format skills or preambles (`KnowledgeLogo.png`, `IDBLogo.png`, `BackgroundTitle.png`, `BackgroundBody.png`, `BackgroundBodyWhite.png`, and similar) exist in the `KIT_FOLDER`.
   - **Skill ↔ preamble pairing:** every format skill referenced in `CLAUDE.md` that has a paired preamble file points to an existing preamble; every preamble file that exists is pointed to by some skill (no orphan preambles).

9. **Agent outputs folder consistency (if `AGENT_OUTPUTS_FOLDER` is defined).** When the repo has an agent-research workflow (per `agent_research_verification_skill.md`), verify:
   - **File-set completeness:** every dive folder under `AGENT_OUTPUTS_FOLDER` contains at least a `_prompt.md` and `_raw.md` pair. A dive folder with only one of the two is flagged (partial dive).
   - **Naming convention:** every file in a dive folder matches the `YYYYMMDD_HHMM_{prompt,raw,verification}.md` convention. Files that don't match (loose drafts, unprefixed notes) are flagged.
   - **INDEX bidirectional consistency:** every dive folder has a corresponding row in `AGENT_OUTPUTS_INDEX`; every row in `AGENT_OUTPUTS_INDEX` points to an existing dive folder. No orphan rows; no unindexed dives.
   - **Verified rows have verification docs:** every row in `AGENT_OUTPUTS_INDEX` marked `verified` has a `_verification.md` file in its dive folder.
   - **Superseded rows reference replacement:** every row marked `superseded` names which row supersedes it in the Notes column.
   - **LESSONS.md exists if any verification doc references error patterns:** verification docs include a "Patterns in the agent's errors" sub-section. If any verification doc lists patterns observed in two or more dives, `AGENT_OUTPUTS_LESSONS` should exist. (This is a workflow-invariant check — see note below.)

   **Note on workflow-invariant checks.** Check 9 was the kit's first audit check that enforces *workflow invariants* (INDEX↔folder consistency, verified-rows-have-verification-docs) rather than passive existence. Check 10 (added v2.1.13) is the second — STATUS.md cluster-activations block must stay in sync with actual `skills/` contents. **The rule-of-three threshold is now at two-of-three.** If a third workflow-invariant check is added, extract Checks 9, 10, and the new one into a separate `workflow_audit_skill.md` that this skill invokes. (Check 11, the cluster-completeness invariant, also does **not** count — it is a kit-only architectural invariant, not an operational workflow-invariant check. And Check 12, added later, is a *conformance* check, not a workflow-invariant one — it does not count toward this threshold either; its own extraction path is noted in Check 12.)

10. **Cluster activations consistency (STATUS.md block vs. `skills/` contents).** STATUS.md carries a `Cluster activations (current)` block recording which clusters of the kit are active in this repo (see `skills_curation_skill.md` and `STATUS_template.md`). Verify:
    - **Block presence:** STATUS.md has a `## Cluster activations (current)` section. If absent in a repo whose `skills/` exists, flag — STATUS.md is out of date with the curation discipline.
    - **Optional-cluster consistency:** for each of the four optional clusters (Source material; Writing and deliverables; Voice and style; Final-production formats), the block's stated activation matches actual file presence in `KIT_FOLDER`. If "Source material: active" but no source-material files are present, that's drift; if "Voice and style: inactive" but `andrea_writing_style_skill.md` is present, also drift.
    - **Final-production sub-state:** the five format-pair sub-entries (Word, FMM LaTeX paper, Academic paper LaTeX, Academic slides, FMM coordination slides) match actual file presence per format.
    - **Always-active group:** verify all always-active skills are present. Missing always-active files are findings regardless of what the block says.
    - **`Last curated:` field is present** and parses as a date (or is the initial-template value "not yet curated").

11. **Cluster completeness invariant (kit-side check; SkillPropagation only).** When this skill is run inside `SkillPropagation` (where `KIT_FOLDER` is `LastSkillUpdate/`), verify the kit honors the cluster completeness invariant: every skill's hard dependencies (workflow steps that invoke another skill as a required action) resolve within the always-active group or within the source skill's own cluster.
    - **Cross-cluster reference scan:** for each skill file in `LastSkillUpdate/`, find references to other skill files. Classify each reference by source and target cluster.
    - **Soft references are not violations.** Descriptive prose, "see also" notes, hand-off references, and audit-target references do not break the invariant. Only references that look like workflow invocations ("invoke X," "follow X Step N," "calls X to do Y") are flagged.
    - **Surface ambiguous references for human judgment.** If a reference is borderline, surface it as `Requires decision` rather than auto-classifying.
    - **In repos other than `SkillPropagation`, skip Check 11.** Content repos consume the kit; they don't define the cluster structure.
    - **Kit-only architectural invariant — does not count toward the rule-of-three.** Check 11 enforces a structural property of the kit itself, not an operational workflow invariant (Checks 9, 10), so it does **not** count toward the threshold for a `workflow_audit_skill.md` extraction.

12. **Archetype conformance (if an archetype is declared).** When `CLAUDE.md` declares `archetype.type` as research, coordination, or operation (per Step 1), check the repo's *structure* against the one archetype spec it carries. Skipped for `type: NONE` and for pre-archetype repos (surfaced as a migration gap in Step 1, not checked).

    **How the check reads the layers.** Read `archetype.type` → load **both** the archetype-common layer (`archetype_conventions.md` — the shared invariants: born-minimal promotion, origin-based typing, the shared-spine test, by-subject keying, the fixed skeleton) **and** the single carried `*_archetype_spec.md` (the type-specific structure, index set, and placement) → compare the repo to them along the fixed dimension frame below. The dimensions are owned by this check; the *content* of each dimension is read from the loaded layers — the shared invariants from `archetype_conventions.md`, the type-specific form from the spec's prose and structure diagram. Do **not** hardcode any one archetype's specifics into this skill, and do **not** name a repo's indexes or folders — discover them from the repo's `FOLDER_MAP.md` files, the same archetype-blind move the kit's other skills follow. This is the one skill that reads the conventions/spec layers at runtime; it reads the shared layer plus only the repo's *own* declared spec, never another's.

    - **Structure** — the repo's folders against the archetype's scaffold. Respect *born-on-creation*: a spec folder that is created only when it has content (e.g. operation's `funding/`, or `MATRIX.md` at a single-reform/N=1 operation) being **absent is not drift**. A missing *required* folder, or a folder that fits no part of the scaffold, is a finding.
    - **Index set** — does the repo carry the index **set** the spec defines (set membership, discovered via the `FOLDER_MAP`s — never by hardcoded name). Index *content freshness* is **not** checked here — that is the index audit's job (its own mode, its own cadence).
    - **Placement** — inputs and deliverables sit in the homes the spec defines.
    - **Naming** — folder and file naming against `naming_conventions.md` and the spec.
    - **Currency-guard (operation repos only).** Per operation spec §6, an index with no feeding process is a liability — flag any such index. The typed *root* indexes now carry the universal feeding process (close-side entry refresh + this skill's index audit; `archetype_conventions.md` typed-index behavior), so this flag's live targets are *local* indexes and registers (e.g. a self-indexing sub-product, operation §3) born without one. This check **flags** only.

    **Severity follows the spec's own invariant-vs-latitude line.** The specs deliberately leave per-repo latitude (e.g. operation §3's per-repo source sub-axes; coordination's "universal naming, per-repo layout"). Flagging that latitude as drift is a false positive. So: **drift fixes** (mechanical, auto-proposable in repair mode) are naming-convention violations, a missing *required* index from the set, and a missing *required* folder. **Requires-decision** items are structural extras, placement judgment, and the currency-guard flag — distinguishing a legitimate per-repo specialization from real drift needs the user's judgment, which the audit doesn't have. Net: most Check 12 findings are Requires-decision, the inverse of the consistency checks. Also surface a **spec-version skew** note if the repo's `spec_version` is older than the carried spec's version (the repo was structured under an earlier spec).

    **A different kind of check — and a seed.** Check 12 is conformance-to-an-external-standard, not the internal doc-matches-disk consistency of Checks 1–11, and it is **not** a workflow-invariant check — it does **not** count toward the Check 9/10 rule-of-three for a `workflow_audit_skill.md` extraction. It lives here because housekeeping is the repo's one comprehensive on-demand instrument. If a lightweight sibling materializes (the deferred `finish_session` end-of-session structure-drift prompt checks the same declaration, prompt-only), or if further conformance checks accrete, extract Check 12 into its own always-active `archetype_conformance_skill.md` that both this skill and `finish_session` invoke — at that point the shared logic justifies the extra file. Until then it stays one Check.

For each check, record findings as either:
- **Drift fix** — A reference no longer matches reality and the fix is mechanical (rename a stale reference; remove a row for a deleted file; add a row for an existing file missing from the table). In repair mode, these are proposed as one-line fixes.
- **Requires decision** — A finding where the right fix is not obvious (an orphaned file might be intentionally orphaned or genuinely stale; an index entry might be intentionally minimal). These get surfaced for the user regardless of mode.

### Step 3 — Report findings

Produce a structured report.

```
Audit pass — N findings across M checks:

Check 1 — CLAUDE.md skill table:
  Drift fixes (auto-proposable in repair mode):
    - [file]: [what was found, proposed fix]
  Requires decision:
    - [file]: [what was found, options]

Check 2 — ...

...

Summary: N drift fixes proposed, K requires-decision items surfaced.
```

If there are zero findings: report "Audit pass — clean." Done.

In **audit mode**: present the report. Done. Do not propose or apply fixes.

In **repair mode**: proceed to Step 4.

### Step 4 — Repair (repair mode only)

For each drift fix:
1. Show the user the proposed fix.
2. Wait for approval. The user may say "yes," "no, surface this," or "yes but change to X."
3. Apply approved fixes to local staging.

For each requires-decision item:
1. Present the options. Common options include:
   - **Update the reference** to point to where the file actually is.
   - **Delete the reference** if the referenced file is gone for good.
   - **Add the reference** if a file exists but is unindexed and should be.
   - **Surface as orphan** if the file exists but its disposition is unclear (the user may want to invoke `materials_processing_skill.md` or `document_processing_skill.md` on it, move it, or delete it — but **the audit does not auto-invoke other skills**; surfacing is the audit's job, deciding is the user's).
   - **Mark as intentional** — add a one-line note in the relevant `FOLDER_MAP.md` or index file documenting that the file is intentionally excluded.
2. Apply the user's decision to local staging.

Once all findings are resolved, proceed to Step 5.

### Step 5 — Commit (repair mode only)

Single atomic commit covering all approved fixes.

Commit message:

```
Audit-driven repair: M drift fixes, K decisions

- [file]: [what was fixed]
- [file]: [what was fixed]
- ...

Findings surfaced but deferred: J items (see audit report in conversation).
```

If items were surfaced and explicitly deferred by the user (not resolved this session), note them in the commit message so the audit trail is preserved.

---

## The index audit (index-audit mode)

The dedicated currency check on what the repo's infrastructure **claims**. Where Checks 1–12 verify structure cheaply in one pass, the index audit verifies **per entry** that live claims still hold — which is heavy, so it runs as its own session, against a quiet repo, on the cadence `project_tracker_skill.md`'s close-side read enforces (`INDEX_AUDIT_INTERVAL`, default 30 days).

**Scope — live claims, never records.** Staleness applies only to **live claims** — fields that say "this is true now": status and outcome labels, reliability tags, summary lines, `FOLDER_MAP` description slots, live register rows. **Records** — fields that say "this was true then": log lines (e.g. `BRANCHES_LOG`), frozen `Standing:` slots, superseded-but-retained register rows, old matrix versions — cannot go stale: their append/freeze semantics are exactly what the universal nothing-destroyed-on-a-state-change rule (`structure_conventions.md`) retains, and this audit never touches them. Also out of scope: `STATUS.md` (the freshness audit owns it), `MATRIX.md` (excluded until the matrix-characterization question settles), and — always — deliverable quality.

**Discovery is archetype-blind.** Find the surfaces from the repo's `FOLDER_MAP.md` tree and the typed root indexes the declared spec defines — never by hardcoded name. What each index's fields *claim* is read from the conventions/spec layers (`archetype_conventions.md` typed-index behavior; the carried spec's column definitions). The staleness frame above is owned by this mode, the same way Check 12 owns its dimension frame.

**A seed (extraction path).** This mode is the audit's first **content-aware** instrument — it reads what entries *claim*, not only whether files exist. If the collaborator-push capture backstop is ever built (the audit detecting and indexing collaborator pushes on Andrea's behalf), capture and the index audit are the content-aware family that extracts together into its own skill; until then the mode stays here.

**The protocol — three passes, then one commit:**

1. **`[unreviewed]` sweep.** Collect every index row carrying the trailing `[unreviewed]` marker (written by `project_tracker`'s close-side entry refresh when Andrea had no time to review). Present them grouped for review; on approval the marker comes off, with any corrections applied.
2. **Evidence pass.** For live-claim fields whose **targets** show commit activity since the "Index audit last run" date in `STATUS.md` (commits to `main` — the same authoritative source the freshness audit uses; work that never landed in a commit is invisible by design: *if it matters, leave a trace in the repo*), compare the claim against the target's current state and **propose a rewrite per finding**, evidence cited. **First run on a repo: no baseline date — the evidence pass is full**, every live claim against every target; it doubles as the population/baseline pass for a repo adopting the discipline.
3. **Interview pass — always full.** Claims only Andrea can falsify (an "awaiting outcome" whose event happened in the world; a shaping note's feasibility premise) leave no repo trace, so this pass never scopes down: sweep them and ask, batched by kind ("these four instances are awaiting outcomes — any arrivals?"). This is the comprehensive cousin of the coordination close-side real-world-signal prompt (`coordination_archetype_spec.md` §6) — the same question, run exhaustively on the audit's clock rather than opportunistically at close; complementary, not duplication.

**Severity.** The standard two categories, with the distribution inverted even harder than Check 12: **drift fix** only when a claim is falsified by unambiguous repo evidence with an obvious rewrite; **requires decision** for everything else — the entire interview pass by construction. Prompt-don't-perform throughout: nothing is rewritten without per-finding approval.

**Close and write-back.** One atomic commit: the approved fixes **plus** today's date stamped into `STATUS.md`'s "Index audit last run" slot. The stamp travels with the fixes — a stamp without them would claim an audit that didn't finish. The stamp is what silences `project_tracker`'s close-side reminder; no confirm-stamp step remains.

---

## Composition with other skills

This skill **surfaces findings**; it does not **act on them** by calling other skills. When an orphan file is detected and the user decides "this paper needs to be processed," the user invokes `materials_processing_skill.md` separately. The audit's job ends at surfacing.

Reasoning: the right action for any given orphan depends on context the audit doesn't have (is this paper still relevant? was it dropped intentionally? does it duplicate something else?). Auto-invoking a pipeline would prejudge the answer. The audit reports what it sees and lets the user decide.

---

## Notes on scope

- **Generic skill, propagates to all content repos.** Lives in `LastSkillUpdate/`. Each content repo's `CLAUDE.md` configures the parameters (or accepts defaults).
- **Quiet-repo audit.** Most findings will be structural drift, not propagation artifacts. The check distribution will look different from `PROJECT_SETUP.md` Step 10 housekeeping — fewer rename-stale references, more "this folder grew and the FOLDER_MAP.md didn't keep up."
- **Repair commits are separate from propagation commits.** Audit-driven fixes go in their own commit, not folded into a propagation commit. This keeps the audit trail clean and avoids mixing kit updates with repo housekeeping.

---

*Last updated: June 12, 2026 — v2.0.0 (v4 re-baseline: renamed `audit_repo_skill.md` → `housekeeping_skill.md` (frontmatter `name: audit-repo` → `housekeeping`; H1 title; "let's do housekeeping" / "housekeeping" made the primary triggers, "audit the repo" kept as a secondary alias) and unified the concept with the Part-C Step 10 housekeeping pass — one housekeeping checklist, two wrappings (on-demand here; a subset at propagation). Finding-1 count-note: Check 11 (cluster-completeness) stated as a kit-only architectural invariant that does not count toward the Check 9/10 workflow-invariant rule-of-three. The v3.2 batch-E #6 findings, executed at the re-baseline per plan; internal mode vocabulary (audit/repair/index-audit modes, the "audit pass" report header) deliberately kept — the rename was scoped to the skill identity + triggers. Carries the v2.0.0 floor; v4.0 kit stamp on the templates.) Prior: June 11, 2026 — v2.0.0 (v4 final-pass fix build: retired `MasterIndex.md` removed from the frontmatter index examples and the `INDEX_FILES` parameter examples (A′-6); the content-aware extraction-seed sentence added to the index-audit mode — the fidelity gap logged at the content-staleness build, closed (M6). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 content-staleness build: added **index-audit mode**, the third mode — the dedicated per-entry currency check on infrastructure claims, run on the `INDEX_AUDIT_INTERVAL` cadence with a three-pass protocol (`[unreviewed]` sweep → evidence pass scoped to targets with commit activity since the last audit date, full on first run → interview pass for Andrea-verifiable claims, always full) and a closing atomic commit that stamps "Index audit last run" in `STATUS.md` (the write-back that retires `project_tracker`'s confirm-stamp interim). The scope boundary redrawn from structure-vs-content to **infrastructure claims vs. deliverable quality** (frontmatter, the what-this-is paragraph, Check 5's and Check 12's scope notes rewritten — the deferred index-system track this mode is); staleness frame: live claims only, never records (the verification-side face of nothing-destroyed-on-a-state-change). Step 1 gains the overdue-index-audit cross-reminder in regular modes; Check 12's currency-guard flag re-aimed at local indexes born without a feeding process, now that typed root indexes carry the universal one (close-side refresh, `archetype_conventions.md`). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 9, 2026 — v2.0.0 (v4 archetype_conventions build: Check 12 now loads **both** the archetype-common layer (`archetype_conventions.md` — the shared invariants) **and** the one carried `*_archetype_spec.md` (the type-specific layer) for an archetype repo, reading the shared invariants from the former and the type-specific form from the latter; Step 1 triage and the description updated to match; a NONE repo still skips Check 12 (carries neither). No dimension-frame change. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 9, 2026 — v2.0.0 (v4 workspace-folders build: dropped the legacy `workspace/notes/` from the `DELIVERABLE_FOLDERS` NONE/pre-archetype fallback — notes now live in the archetypes' content layers, not `workspace/`; Check 12's structure dimension reads the created-up-front empty `workspace/` homes as expected state, not drift. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 6, 2026 — v2.0.0 (v4 completion-frame step 4: added **Check 12 — Archetype conformance**, the audit-against-archetype drift check (the cycle's goal and the first loop root). The check reads `CLAUDE.md`'s `archetype.type` declaration → loads the one carried `*_archetype_spec.md` → compares the repo along a fixed dimension frame (structure, index set, placement, naming, currency-guard); dimensions owned by the skill, content read from the spec's prose; archetype-blind (discovers via `FOLDER_MAP`s, never names a repo index, reads only the repo's own declared spec). Severity tracks the spec's invariant-vs-latitude line — naming + required index-set membership + required-folder presence are drift fixes; structural extras, placement, and the operation-only currency-guard flag are Requires-decision. Folded in the deferred `DELIVERABLE_FOLDERS` archetype-awareness (derived from the declared spec when an archetype is declared; the hardcoded list is now the NONE/pre-archetype fallback). Added Step 1 triage of the declaration and scope notes bounding the check to structural conformance (not deliverable content, not index content-freshness — the latter held for the separate index-system track). Trustworthy because completion-frame steps 2–3 first removed the kit-side contradictions that would have made it lie on first run. Marked as a different *kind* of check (conformance, not the internal-consistency Checks 1–11; explicitly not a workflow-invariant check for the Check 9/10 rule-of-three) and seeded for a future `archetype_conformance_skill.md` extraction if a lightweight `finish_session` sibling or further conformance checks materialize. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v2.0.0 (v4 sub-unit 1e-rename: `AboutFolder.md` → `FOLDER_MAP.md` (8 occurrences) per the promoted `naming_conventions.md` / `structure_conventions.md`; token-only swap — surrounding functional prose (e.g. the Check 3 “navigation tables” framing) left for this file’s own redesign. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: May 28, 2026 — v3.2 materials-triage merge: added `MATERIALS_INDEX.md` to the `INDEX_FILES` examples and the frontmatter index list; renamed the triage reference in the orphan-surface guidance. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.5 (v3.0): renamed parameter `SKILLS_FOLDER` → `KIT_FOLDER` to align with the layout-convention codification in `PROJECT_SETUP.md` Part A Phase 3. The parameter's role is unchanged: it names the active kit folder (default `skills/` for the flat layout; `skills/GeneralSkills/` for the two-subfolder layout where the repo has project-specific skills alongside). Prior: v1.4 (v2.1.13): added Check 10 — cluster activations consistency between STATUS.md block and `skills/` contents — and Check 11 — cluster completeness invariant scan for kit-side use in SkillPropagation. Workflow-invariant note updated: Check 10 is the second instance, so rule-of-three threshold is now at two-of-three; a third instance triggers extraction into `workflow_audit_skill.md`. v1.3 (v2.1.12): added Check 9 — agent outputs folder consistency — and three new parameters `AGENT_OUTPUTS_FOLDER` / `AGENT_OUTPUTS_INDEX` / `AGENT_OUTPUTS_LESSONS`, skipped in repos without `AGENT_OUTPUTS_FOLDER` defined. Hygiene: stale `paper_processing.md` references corrected to `paper_processing_skill.md` post v2.1.7 split; duplicate v1.1/v1.2 Last-updated markers consolidated. v1.2 YAML frontmatter (v2.1.11) and v1.1 Check 8 palette consistency (v2.1.9) preserved.)*



