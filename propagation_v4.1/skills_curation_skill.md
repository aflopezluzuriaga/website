---
name: skills-curation
description: >
  Run per-propagation per-cluster skills curation in a content repo — propose
  which clusters of the kit should be active for this project, anchored to
  project signals (questionnaire answers, STATUS.md, CLAUDE.md, recent commits,
  recent conversations), and apply the curated state by hard-adding or
  hard-removing skill files from the repo's `skills/` folder. Use when running
  Part A new-project setup, Part B existing-repo integration, or Part C kit
  propagation, at the cluster-activation step. NOT for editing the canonical kit
  itself — that lives in SkillPropagation/LastSkillUpdate/.
---

# Skills Curation Skill

This skill defines the **per-propagation per-cluster curation conversation** —
the workflow Claude follows at the cluster-activation step of any kit
application (Part A / Part B / Part C of `PROJECT_SETUP.md`).

It replaces the prior "full-kit-by-default" convention. The kit ships in
clusters, not as a flat list, and at each application point Claude proposes
per-cluster activation based on project signals, with Andrea confirming or
overriding cluster by cluster.

## Authority rule

`PROJECT_SETUP.md` invokes this skill at the right step in each Part. If there
is a conflict between this skill and `PROJECT_SETUP.md` on the curation
workflow's substance, **this skill wins**. `PROJECT_SETUP.md` describes when
to invoke; this skill describes what the invocation does.

## Core principles

1. **Anchor on project signals, not on current folder contents.** Project
   signals are: questionnaire answers (Part A), repo content from CLAUDE.md
   and STATUS.md and recent commits (Parts B and C), recent conversations
   (Part C). The current `skills/` folder is consulted only to detect drift
   (orphaned files), never to anchor proposals. Anchoring on the folder
   anchors on stale artifacts — a previous decision that became a default.
2. **Cluster is the default unit; individual skills can be picked. Hard-add and hard-remove.** Claude proposes activation at the cluster
   level, but Andrea can take a whole cluster, skip it, or pick individual
   skills inside it. Whatever is activated ships; whatever is not has its
   files deleted from `skills/` — no soft-archive, no no-op-but-present.
   The point is keeping `skills/` lean; reversibility is the next
   propagation. See "Granularity" below for how partial picks are handled
   and the one risk they introduce.
3. **Recovery via next propagation only.** If a cluster is deactivated and
   later turns out to be needed, reactivation happens at the next propagation
   cycle. No mid-propagation undo plumbing.
4. **Suggest all clusters at once; Andrea decides across them.** Claude
   presents a proposed activate/skip for every optional cluster together,
   each with its skill list and the signal behind the call, and Andrea
   decides — whole cluster, skip, or individual skills. (Replaced the prior
   one-cluster-at-a-time ask, which paired with an all-or-nothing rule that
   no longer holds.)

## Granularity

Claude proposes at the **cluster** level — clusters are the fastest resolution
to reason about, so the proposal is framed cluster by cluster. But the decision
is Andrea's: she can take a cluster whole, skip it, or pick individual skills
inside it. Claude suggests; Andrea decides. There is no all-or-nothing rule and
no special-case cluster.

(History: through v3.2 this was a hard all-or-nothing rule — whole clusters
only, partial activation refused, with Final-production formats as the lone
exception. The cluster design held in most repos but chafed in a couple, so the
rule was relaxed to a cluster-level proposal with a free per-skill decision.)

**The one risk partial picks introduce: orphaned dependencies.** A few clusters
contain a skill that hard-depends on a sibling — a triage skill that routes to
its protocols (Source material's `materials_processing_skill.md` routes to its
academic and institutional protocols; Writing's `writing_skill.md` routes to
`writing_notes_skill.md` and `writing_drafting_skill.md`). Picking a triage
without its protocols, or a protocol without its triage, leaves an orphan that
breaks mid-workflow. When a pick would orphan an intra-cluster hard dependency,
Claude **warns and names the missing piece** — it does not block. Andrea still
decides. (Cross-*cluster* hard dependencies don't arise; the cluster
completeness invariant below keeps them out by design.)

## The cluster completeness invariant (architectural constraint, not runtime check)

Curation works without runtime dependency resolution because the kit is
designed to honor a structural invariant:

> **Every skill's hard dependencies must resolve within the always-active
> group or within the skill's own cluster.** Hard dependencies between
> non-always-active clusters are a kit-design bug, not a curation feature
> to support.

A *hard dependency* is a workflow step in skill X that invokes skill Y as a
required action — if Y is absent, X breaks mid-sequence. Soft references
("see also Y," "Y often runs after X," hand-off prose) are not dependencies
and don't trigger the invariant.

When kit redesign sessions add or move a skill, the cluster completeness
invariant must be checked. This is automated via `housekeeping_skill.md`
Check 11 (added v2.1.13), which scans every kit-side skill for cross-
cluster references and flags any that look like hard dependencies.

**Provenance of the invariant.** Named by Andrea at the Session 4 audit
(May 13, 2026), then audited against the kit-as-it-stood: one hard
violation found and fixed (`branch_workflow_skill.md`, since renamed
`writing_branch_skill.md`, promoted to the always-active group, since
`finish_session_skill.md` Step 2 invokes it).
The audit also confirmed the kit was substantially aligned with the
invariant already — 35 of 36 flagged cross-cluster references were soft.

## The two groups

The kit's seven clusters from `CLAUDE_template.md` split into:

### Always-active group (skip the ask, ship always)

Treated as one infrastructure-layer group. No project signal
could ever say no; the question would be redundant. These ship to every
project.

The group contains:
- `andreas_palette.md` (Shared assets cluster — colors invoked anywhere
  visuals come up)
- `project_tracker_skill.md`, `finish_session_skill.md`,
  `repo_conversations_skill.md`, `housekeeping_skill.md`,
  `github_api_workflow_skill.md`, `writing_branch_skill.md`,
  `exploration_branch_skill.md` (Repo and session infrastructure cluster —
  the session-start/-close spine. `writing_branch_skill.md` is here because
  `finish_session_skill.md` Step 2 (branch disposition) invokes it as a
  required action; the cluster completeness invariant then *requires* it to
  be always-active. `exploration_branch_skill.md` is here by placement
  decision — the two branch skills kept together — *not* by the invariant:
  nothing always-active hard-invokes it (`finish_session`'s light arm and
  `brainstorming`'s triage are both soft hand-offs), so its membership is a
  choice, not a requirement.)
- `brainstorming_skill.md` (Thinking aids cluster — trigger is
  conversational, not project-shaped)
- Kit metadata files: `CLAUDE_template.md`, `PROJECT_SETUP.md`,
  `STATUS_template.md`, `CHANGELOG.md` (define how the repo works at all)
- `naming_conventions.md`, `structure_conventions.md` (Repo structure and
  archetype cluster — the universal floor; they ship to every repo, NONE
  included, with no ask), `archetype_conventions.md` (the archetype-common
  layer — ships to every archetype repo, a NONE repo gets none)

These four clusters keep their distinct functional groupings in
`CLAUDE_template.md`'s Skills inventory (the functional reading still
matters when you're asking "what does this skill do?"), but at the curation
layer they collapse into one group.

**Three curation behaviours in this one cluster.** (1) The **floor conventions**
(`naming_conventions.md`, `structure_conventions.md`) ship to **every repo
unconditionally**, NONE included, like the rest of the always-active group. (2)
The **archetype-common layer** (`archetype_conventions.md`) ships to **every
archetype repo and only those** — unconditional *within* archetype repos (all
three types get the same file, so it is **not** single-select), but **absent from
a NONE repo**; the gate is simply `type` ≠ NONE, read from the declaration. (3)
The **archetype spec is single-select**: the cluster carries exactly one of the
three specs (`research_archetype_spec.md`, `coordination_archetype_spec.md`,
`operation_archetype_spec.md`) — the one matching the repo's declared `type` in
`CLAUDE.md` — and a NONE repo carries none. The spec pick is a *constrained* one,
reusing the same per-skill pick machinery as the optional clusters (see
"Granularity"), but *determined by the declaration* rather than proposed against
project signals. So
the cluster as a whole stays always-active — there is no activate/skip question,
it always ships — while the single spec inside it is fixed by `type`. The triage
(`new_repo_setup.md`) and the three `*_setup_scaffold.md` files are kit-resident
birth tools, read from the kit at new-repo setup and never curated into a repo's
`skills/`.

### Optional clusters (sequential ask)

Four clusters where project signals genuinely differentiate.

- **Source material: reading and processing** — `materials_processing_skill.md`,
  `paper_processing_academic_skill.md`,
  `paper_processing_institutional_skill.md`, `document_processing_skill.md`,
  `agent_research_verification_skill.md`. Signal: project involves
  literature, papers, deep-research agents, or institutional source
  documents.
- **Writing and deliverables** — `writing_skill.md`, `writing_notes_skill.md`,
  `writing_drafting_skill.md`, `email_drafting_skill.md`. Signal: project
  produces written deliverables using the structured note-taking + drafting
  protocol. Default lean: yes, because most projects write something; but
  knowledge-coordination admin projects without a structured deliverable
  may not need it. (The branch skills — `writing_branch_skill.md` and
  `exploration_branch_skill.md` — live in the always-active group, not
  here; see the always-active group above for the rationale.)
- **Voice and style** — `andrea_writing_style_skill.md`,
  `andrea_fmm_institutional_style_skill.md`, `marta_writing_voice_skill.md`,
  `translation_review_skill.md` + `translation_corrections_log.md` (a companion
  pair — the Spanish naturalness review; no independent signal: it rides the
  cluster, so wherever the voice skills activate, the pair ships too).
  Signal: project produces content in one or more of these voices. Rarely
  all three.
- **Final-production formats** — `fmm_docx_formatting_skill.md` +
  `fmm_word_preamble.js`, `fmm_paper_latex_skill.md` +
  `fmm_paper_preamble.tex`, `academic_paper_latex_skill.md` +
  `academic_paper_preamble.tex`, `academic_slides_skill.md` +
  `academic_slides_preamble.tex`, `fmm_coordination_slides_latex_skill.md` +
  `fmm_coordination_slides_preamble.tex`, `fmm_coordination_slides_pptx_skill.md` +
  `fmm_coordination_slides_pptx_preamble.py`, plus `KnowledgeLogo.png` (auto-
  attaches when Word or FMM LaTeX paper is active). Signal: project produces
  output in specific final-production formats. Its five format-pairs are independent, so picking individual pairs here is the common case rather than the exception.

## Step-by-step workflow

### Step 1 — Determine which Part is running

The signal-sources differ by Part:

| Part | Trigger | Signal-sources for proposals |
|---|---|---|
| Part A | New project setup | Questionnaire answers (Q1–Q5 from `PROJECT_SETUP.md`) |
| Part B | Existing-repo integration | Repo CLAUDE.md, STATUS.md (if present), FOLDER_MAP.md files, existing skills/skill-like files, recent commits |
| Part C | Kit propagation to existing repo | STATUS.md, recent commits, recent conversations (from `workspace/claude_conversations/`), CLAUDE.md. **NOT the current `skills/` folder contents.** |

**The archetype spec is the exception to "signals drive the proposal."** Its
pick is not proposed from project signals — it is read from the declaration. The
single-select axis keys off `CLAUDE.md`'s `archetype.type` frontmatter: in Part
A the declared type is the one the new-repo triage just confirmed and the
scaffold wrote; in Part B/C it is read from the repo's existing `CLAUDE.md`. This
skill *reads* the declaration and acts on it — it does not run the triage or
write the declaration (those belong to `new_repo_setup.md` and the scaffold,
wired into Part A by `PROJECT_SETUP.md`).

If Part is unclear, confirm with Andrea before proceeding.

### Step 2 — Inventory signals

For each optional cluster, gather the relevant project signals. Write a brief
internal note (one sentence per cluster) of what signal points to activation
or deactivation. This is what Claude will name explicitly during the ask.

Examples of signals → proposals:

- Questionnaire Q1 says "policy note on tax compliance" → Source material
  cluster proposed active (literature review implied); Writing cluster active
  (note is a deliverable); Voice cluster active (FMM institutional likely);
  Final-production cluster active (Word + FMM LaTeX likely).
- STATUS.md mentions "weekly division meeting slides" → FMM coordination
  slides format-pair active.
- Recent commits show no document drafts in 60 days, only admin updates →
  Writing cluster proposed inactive for this propagation.

If a signal is ambiguous or weak, propose conservatively and surface the
ambiguity in the ask ("I'm not sure whether you'll need X — defaulting to no,
let me know if I should activate").

### Step 3 — Present all optional clusters and let Andrea decide

First, resolve the archetype spec from the declaration — this is stated, not
asked. Read `CLAUDE.md`'s `archetype.type` and report the result: the one spec
being kept (or, for NONE, that no spec is kept) and any other specs being
removed as strays. The convention files are not mentioned per-repo — they always
ship.

Most of the time the declaration and the specs on disk agree, and this is a
one-line statement. When they disagree — the declared type's spec is **absent**,
a NONE repo **carries a spec**, more than one spec is present and they don't
reduce to the declared one, or **no archetype is declared at all** (a repo that
predates the archetype system) — **warn and name the mismatch, propose
normalizing to the one spec the declaration implies (or to none), and proceed as
Andrea decides. Don't block.** This is the same stance the skill takes on
orphaned intra-cluster dependencies (see "Granularity"): surface the problem,
name the fix, leave the decision to Andrea. The universal convention files ship
regardless of any archetype mismatch.

Then present all four optional clusters together — Source material, Writing and
deliverables, Voice and style, Final-production formats — each with its proposed
activate/skip, its skill list, and the signal behind the call. Andrea decides
per cluster: take it whole, skip it, or pick individual skills inside it.

```
**Optional clusters — proposal**

1. Source material — <activate / skip>
   Skills: <comma-separated list>
   Signal: <why this call>

2. Writing and deliverables — <activate / skip>
   Skills: <list>
   Signal: <why>

3. Voice and style — <activate / skip>
   Skills: <list>
   Signal: <why>

4. Final-production formats — <activate / skip, by format-pair>
   Pairs: <list each format-pair>
   Signal: <why>

For each: take the whole cluster, skip it, or name the individual skills you want.
```

Wait for Andrea's decision and absorb it before staging.

If a pick would orphan an intra-cluster hard dependency — a triage without its
protocols, or a protocol without its triage — warn and name the missing piece,
then proceed as Andrea decides. Don't block. (See "Granularity.")

### Step 4 — Sub-asks for Final-production formats

Final-production formats is where per-pair picking is most common, since the
five format-pairs are independent. When Andrea is choosing among pairs, the
detail reads:

```
**Cluster 4 — Final-production formats**

This cluster has five format-pairs plus the logo asset. Each format-pair
(skill + preamble) is independent. Based on signals, I propose:

- Word formatting (fmm_docx_formatting_skill.md + fmm_word_preamble.js):
  YES / NO — <signal>
- FMM LaTeX paper (fmm_paper_latex_skill.md + fmm_paper_preamble.tex):
  YES / NO — <signal>
- Academic paper LaTeX (academic_paper_latex_skill.md + academic_paper_preamble.tex):
  YES / NO — <signal>
- Academic slides (academic_slides_skill.md + academic_slides_preamble.tex):
  YES / NO — <signal>
- FMM coordination slides — Beamer (fmm_coordination_slides_latex_skill.md + fmm_coordination_slides_preamble.tex):
  YES / NO — <signal>
- FMM coordination slides — PowerPoint (fmm_coordination_slides_pptx_skill.md + fmm_coordination_slides_pptx_preamble.py):
  YES / NO — <signal>
- KnowledgeLogo.png: auto-attaches if Word OR FMM LaTeX paper is active

Ship as proposed? (yes / modify the list / skip the whole cluster)
```

The logo asset is not a separate question. Its dependency on Word and FMM
LaTeX paper is structural — when either is active, the logo ships; when both
are inactive, it doesn't.

### Step 5 — Stage the curated state

After all four optional clusters have been confirmed (and the always-active
band added implicitly), assemble the full activated file list. This is what
ships to `skills/` after the propagation.

Compute the delta against current state:
- Files to ADD (in activated state, not currently in `skills/`)
- Files to REMOVE (in `skills/` but cluster now inactive)
- Files to LEAVE UNCHANGED (in `skills/` and still active — Step 3 of Part C's
  classify-each-file logic still applies to these for version updates)

The Repo structure and archetype cluster contributes to the same delta: the two
convention files are always in (UNCHANGED if present, ADD if missing); the spec
matching the declared `type` is ADD if missing and UNCHANGED if present (its
version skew, if any, is handled by Part C Step 3 classification like any other
unchanged-but-present file — no separate machinery); the other two specs are
REMOVE as strays. A NONE repo adds no spec and removes any spec found.

Present the delta to Andrea for final confirmation before applying:

```
**Curation delta:**

ADD (N files):
- <file>
- <file>

REMOVE (N files):
- <file>
- <file>

UNCHANGED but still subject to version classification (N files):
- <file>
- <file>

Apply? (yes / revise)
```

### Step 6 — Apply the curated state

Adds and removes go into the same atomic commit as the rest of the propagation
(or the rest of Part A/B setup). Hard-remove means delete: no archive
subfolder, no `_archived/` suffix, no commented-out CLAUDE.md row. Gone.

The version-classification logic for unchanged files runs as defined in
`PROJECT_SETUP.md` Part C Step 3 — curation determines whether the file is
present, classification determines whether its content updates. The kept
archetype spec rides this same path: curation keeps it, and any version update
to it is the ordinary Part C Step 3 classification — no new machinery. Stray
specs are hard-removed exactly like a deactivated cluster's files.

### Step 7 — Update STATUS.md cluster-activations block

Update (or create, for Part A) the STATUS.md `Cluster activations (current)`
block to reflect the curated state. Format:

```
## Cluster activations (current)

- Source material: <active / inactive>
- Writing and deliverables: <active / inactive>
- Voice and style: <active / inactive>
- Final-production formats:
  - Word: <active / inactive>
  - FMM LaTeX paper: <active / inactive>
  - Academic paper LaTeX: <active / inactive>
  - Academic slides: <active / inactive>
  - FMM coordination slides: <active / inactive>
- Repo archetype: <research | coordination | operation | NONE> (variant <…>, spec <vX.Y.Z>) — NONE carries no variant/spec
- Always-active skills: shipped (palette, repo and session infrastructure, repo structure conventions, brainstorming, kit metadata)

Last curated: YYYY-MM-DD (propagation v2.X.Y)
```

The Always-active line names what's in the group so future-you can see at a
glance what shipped without a per-cluster question. The four optional
clusters get explicit active/inactive states. The Repo archetype line records
the declared archetype (the single-select axis): which spec the repo carries and
the version it was structured under, or NONE. It sits in this block because the
archetype is the cluster's single-select state — what's active *within* the
always-active Repo structure and archetype cluster.

### Step 8 — Save the curation conversation

The curation conversation itself is the audit trail of *why*. Save it via
`repo_conversations_skill.md` to the repo's conversations folder. Use tags
that include `curation` and `propagation-v2.X.Y` so future lookups by tag
find it cleanly. The conversation is automatically findable via
`workspace/claude_conversations/INDEX.md`.

This step is NOT optional. STATUS.md tells future-you what's active now; the
saved conversation tells future-you why. Both are needed.

## When a new skill is added to the always-active group

If the kit adds a skill to the always-active group (currently: the palette,
repo and session infrastructure cluster, brainstorming, kit metadata), that
addition silently ships to every repo that pulls the next propagation. This
is the trade-off of always-active: no per-repo checkpoint.

**Mitigation:** when this happens, the propagation conversation in the FIRST
repo to pull the change should reconfirm the always-active classification
explicitly:

> "v2.X.Y adds <skill> to the always-active group. Should it remain
> always-active, or should it move to one of the optional clusters?"

Andrea's answer for that propagation either confirms always-active (the new
skill ships everywhere going forward) or moves it to an optional cluster
(subsequent propagations include it in the relevant cluster's ask).

The decision propagates by updating this skill, not by per-repo flag.

## Open scope — what this skill does NOT cover

- **What's *inside* each cluster.** The cluster contents are defined by the
  kit's structure (Skills inventory in `CLAUDE_template.md`). When the kit
  reorganizes clusters, this skill consumes the new structure but doesn't
  argue with it.
- **The Gap Analysis classification in Part B** (Missing / Covered but weaker
  / Equivalent / Stronger in repo). That logic still runs, but only on
  skills *inside* activated clusters. Curation is the outer filter; Gap
  Analysis is the inner one.
- **Local modifications.** If a repo has a heavily customized version of a
  skill in an activated cluster, the file is still flagged for diff review per
  Part C Step 3. Curation doesn't override per-file diff handling.
- **The archetype triage and the declaration itself.** This skill consumes the
  declared `type` and acts on it — keep the matching spec **and
  `archetype_conventions.md`** for an archetype repo (remove both, and any stray
  spec, from a NONE repo), record the archetype in STATUS.md. It does NOT run the
  archetype triage, write the `CLAUDE.md` declaration, or define what each spec
  contains. The triage and scaffold live in `new_repo_setup.md` (wired into Part A
  by `PROJECT_SETUP.md`); the spec contents live in the three
  `*_archetype_spec.md` files and the common rules in `archetype_conventions.md`.

## Pointers to related material

- `PROJECT_SETUP.md` — Parts A, B, C invoke this skill at the cluster-
  activation step.
- `repo_conversations_skill.md` — defines how the curation conversation gets
  saved (Step 8).
- `housekeeping_skill.md` — Check 10 (added v2.1.13) verifies STATUS.md
  cluster-activations block matches actual `skills/` contents.
- `STATUS_template.md` — defines the cluster-activations block as part of
  every project's STATUS.md.
- `new_repo_setup.md` — the kit-resident archetype triage + scaffold that
  confirms the type and writes the `CLAUDE.md` declaration this skill reads.
- `research_archetype_spec.md`, `coordination_archetype_spec.md`,
  `operation_archetype_spec.md` — the three full specs; the single-select pick
  keeps the one matching the declared `type`.
- The cluster structure itself lives in `CLAUDE_template.md`'s Skills section.

---

*Last updated: June 10, 2026 — v2.0.0 (v4 translation-review build: added the `translation_review_skill.md` + `translation_corrections_log.md` companion pair to the Voice and style cluster list, with the ride-along rule stated — the pair has no independent activation signal; it ships wherever the voice skills activate. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 archetype_conventions build: taught the cluster the **third curation behaviour** — the new `archetype_conventions.md` (archetype-common layer) ships to every archetype repo and only those (unconditional within archetype repos, so **not** single-select; absent from NONE; gate is `type` ≠ NONE), alongside the unconditional floor conventions and the single-select spec. Added it to the cluster file enumeration, replaced the two-behaviour "convention files unconditional / spec single-select" framing with the three-behaviour statement, and extended the keep/remove behaviour note to keep `archetype_conventions.md` for archetype repos and strip it from NONE. The reference-walk catch this build (the §2 edit-surface inventory had not listed this skill). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 workspace-folders build: renamed the two live `workspace/conversations/` references (Part-C signal-sources row + the saved-conversation INDEX path) to `workspace/claude_conversations/`, completing the conversations-folder rename cascade. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: added `exploration_branch_skill.md` to the always-active group list — by placement decision (the two branch skills kept together), not the cluster-completeness invariant, since nothing always-active hard-invokes it; renamed the live `branch_workflow_skill.md` references to `writing_branch_skill.md` (cluster list + the two cluster-description notes) and restored the historical name in the invariant-provenance line. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v2.0.0 (v4 sub-unit 1b: taught the single-select archetype axis. Registered the always-active "Repo structure and archetype" cluster — the two universal convention files ship to every repo; the archetype spec is single-select by the `CLAUDE.md`-declared `type` (NONE keeps none) — and threaded the spec pick through the always-active framing and Steps 1/3/5/6/7 + the "does NOT cover" section: read the declaration rather than project signals (Step 1), state the resolved spec and warn-don't-block on declaration/spec mismatch (Step 3, mirroring the orphaned-dependency stance), fold conventions + matching spec into the delta with strays removed and kept-spec version skew riding Part C Step 3 (Steps 5–6), record the declared archetype in the STATUS.md cluster-activations block (Step 7). Reuses the existing per-skill pick pattern — no new curation mode; the triage and declaration-writing stay in `new_repo_setup.md`/the scaffold. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: June 6, 2026 — v4 sub-unit 1e-rename: `AboutFolder.md` → `FOLDER_MAP.md` (1 occurrence) per the promoted naming/structure conventions; token-only swap. Carries the v2.0.0 floor; final stamp at the v4 re-baseline. Prior: May 28, 2026 — v3.2: added the FMM coordination PowerPoint variant (`fmm_coordination_slides_pptx_skill.md` + `fmm_coordination_slides_pptx_preamble.py`) to the cluster file list and the curation questionnaire, and renamed the Beamer skill reference to `fmm_coordination_slides_latex_skill.md`. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close.).)*
