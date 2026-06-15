# Project Setup & Skill Integration Guide

This file is the entry point for any session that involves the skills kit's
lifecycle — new projects, existing repos, kit updates, or portability
evaluations.

**Rule:** Read this file before doing anything that involves the kit. Do not
rely on memory of its contents from prior conversations.

## When to use this file — trigger map

| Andrea says… | Go to… |
|---|---|
| "set up a new project/repo," "start a new repo," "create CLAUDE.md for X" | **Part A: New Project Setup** |
| "integrate the skills into this repo," "bring this repo in line with the kit," repo has no `skills/` folder yet | **Part B: Skill Integration for Existing Repos** |
| "update the skills on this repo," "propagate the kit," "apply v2.X to this repo" | **Part C: Propagating Kit Updates to Repos** |

---

## Step 0 — Triage

Before proceeding, confirm which Part applies. The triage questions:

1. **Does the repo have a `CLAUDE.md`?**
   - No → **Part A**
   - Yes → continue

2. **Does the repo have a `skills/` folder?**
   - No → **Part B**
   - Yes → continue

3. **Is Andrea asking about…**
   - Updating the kit (new version) → **Part C**
   - (Note: as of v2.0.3, there is no longer a session-end "evaluate portability" path. Improvements made during normal work simply remain in the repo's `skills/` folder; the next discovery sweep run from `SkillPropagation` picks them up via SHA diff. Portability — "is this generic or project-specific?" — is decided at consolidation time, not in-session, because consolidation has the full picture (canonical master + all repos' bundles).)

If unclear, ask Andrea which path to follow.

---
---

# Part A: New Project Setup

Use this when starting a repo from scratch. The answers to the questionnaire below populate `CLAUDE_template.md` and determine which skills to activate, which folders to create, and what the CLAUDE.md should contain.

**Rule:** Ask the questions in the order below. Group related questions naturally (2–3 at a time), don't fire all of them at once. Use the answers to fill in the template. If Andrea has already provided some answers in her initial message, skip those questions — don't ask what you already know.

---

## Phase 1: Project Identity

**Q1. Project name**
What should we call this project? (Used for the CLAUDE.md header and folder references.)

**Q2. Project overview**
What is this project about? What problem does it address, what are the deliverables, and who is the audience? (2–3 sentences is enough — we can expand later.)

**Q3. Project question**
Can you state the core research/policy question in one sentence? (This is used by the paper processing skill to write relevance sections in summaries. If the project doesn't involve papers, we can skip this.)

**Q4. Working language**
What language do we work in? Will final products need translation?

---

## Phase 2: Collaborators

**Q5. Who works on this project?**
For each person: name, role, and whether they have direct repo access or contribute through someone else. Also: will anyone other than Andrea interact with Claude directly on this repo?

---

## Phase 3: Archetype triage

Before curating skills or building structure, classify the repo into an
archetype — **research**, **coordination**, **operation**, or **NONE** — and
confirm it with Andrea. The archetype decides the repo's structure and index set
(the scaffold builds them in the Setup actions below) and which single archetype
spec the repo keeps (curation reads the confirmed type at Q6). Run the triage per
`new_repo_setup.md` Steps 1–2; this phase is the triage and confirmation only —
the scaffold (its Step 3) runs after curation.

**The triage is a proposer step, not a fixed questionnaire.** Its intent
questions ask about the *nature of the intended work*, which Q2 (overview) and Q3
(question) already speak to. Don't re-ask what those answered — read the
archetype signal from them, ask only the disambiguating questions that remain
(in particular the research-vs-operation seam: a dated external target / a reform
being driven → operation, vs. inquiry for its own sake → research), then
**propose the archetype with the evidence that drove it and STOP.** Wait for
Andrea's confirmation before anything is built.

Capture, as part of the confirmation, what the scaffold and the spec need: the
**variant/stage** (research: single-paper N=1 / agenda N>1; coordination:
single-task N=1 / composition N>1, flat or cyclic; operation: single-reform N=1 /
matrix N>1) and the **named work-unit(s)** — the line/paper, the repeated
task(s), or the reform(s). For a single-line / single-task / single-reform new
repo, note the **N=1** case: born minimal now, promotes additively later if a
second appears — no migration. A **NONE** repo keeps no archetype spec and gets
only the universal layer.

The confirmed `type` / `variant` / `spec-version` is what the Setup actions write
into the CLAUDE.md archetype declaration, and what Q6 reads to keep the matching
spec (single-select). **Index definitions are not set here** — they live in the
archetype spec (`research_archetype_spec.md`, `coordination_archetype_spec.md`,
`operation_archetype_spec.md`), described there first.

---

## Phase 4: Skills Activation

The skills kit is activated through **per-propagation curation** — see
`skills/skills_curation_skill.md` for the workflow. At project setup (Part A),
existing-repo integration (Part B), and kit propagation (Part C), Claude proposes
which clusters of the kit should be active for the project, anchored to project
signals, with Andrea confirming, overriding, or refining — by cluster, or down to
individual skills.

The cluster structure — what's in each cluster and what each skill does —
lives in `CLAUDE_template.md`'s Skills section. The four optional clusters get
the proposal; the always-active group (palette, repo and session infrastructure,
brainstorming, kit metadata, the universal naming/structure conventions) ships to
every project without a question. The single archetype spec is fixed by the
confirmed type (Phase 3) — also no question.

The four optional clusters:
- **Source material: reading and processing**
- **Writing and deliverables**
- **Voice and style**
- **Final-production formats** (with per-format-pair sub-asks — the natural grain
  for that cluster)

**Granularity — cluster is the default unit, individual skills can be picked.**
Claude proposes at the cluster level because clusters are the fastest unit to
reason about, but the decision is Andrea's: take a cluster whole, skip it, or pick
individual skills inside it. There is no all-or-nothing rule and no special-case
cluster — see `skills_curation_skill.md` ("Granularity") for how partial picks are
handled and the one risk they introduce (orphaned intra-cluster dependencies,
which Claude warns about but does not block). *(This relaxed rule — a cluster-level
proposal with a free per-skill decision — replaces the pre-v3.2 all-or-nothing
rule, under which partial activation was refused and Final-production formats were
the lone exception.)*

**Q6. Open the curation conversation.**

Curation reads the **confirmed archetype** from Phase 3: the always-active group
ships unconditionally, and the single archetype spec is fixed by the confirmed
`type` (the matching one of the three specs; NONE keeps none) — a constrained
pick, not proposed against signals. For the four **optional** clusters, Claude
proposes activate/skip for all of them together, each naming the signal it's
based on (Q1–Q5 and the archetype); Andrea confirms, overrides, or refines down
to individual skills. The activated clusters determine which follow-up parameter
questions (Q7/Q8) fire — when a cluster is activated, all parameter questions for
the skills inside it fire.

The curation conversation itself is saved to the repo's
`workspace/claude_conversations/` via `repo_conversations_skill.md` (tags
include `curation` and `propagation-vX.Y.Z`). STATUS.md records the
resulting cluster-activation state. Together, STATUS.md tells future-you
what's active now and the saved conversation tells why.

### Follow-up parameter questions, fired by cluster activation

**If Source material cluster is activated:**

**Q7a. Conditional section?**
When processing papers, is there a specific subset of findings to extract when present? (E.g., "LAC-specific findings," "findings on AI in legal contexts.") If not, summaries will use the standard (a)(b)(d) structure without a conditional section.

**Q7b. BibTeX file name?**
Default is `references.bib` at the repo root. Different name?

**Q7c. How should input documents be organized?**
By source institution? By theme? By document type? (Default: by source institution, with subfolders like `inputs/Ministry/`, `inputs/WorldBank/`, `inputs/Legislature/`.)

**Q7d. Reliability labels?**
The defaults are: Citable, Validated, Under construction, Working draft, Flagged. Do these fit this project, or do you want to customize?

**Q7e. Confidentiality labels?**
The defaults are: PUBLIC, INTERNAL, CONFIDENTIAL. Do these fit, or do you want to customize?

**Q7g. Agent outputs folder location?**
Default is `workspace/agent_outputs/`. Different location?

**Q7h. Papers protocol entry point?**
The agent_research skill hands off to the papers protocol at Step 6. Default is `materials_processing_skill.md`. If this project uses a different entry point, name it.

**If Writing and deliverables cluster is activated:**

**Q8a. Will this project involve structured note-taking?**
In a previous project, we maintained five tracking documents (master notes, parameter tracker, verify-in-repo list, to-do list, progress table). Does this project need something similar? If so, what would you want to track across sources?

**Q8b. What status labels will you use for papers/sources?**
Default set: Must-read, Read, No need to read, Middle importance, Flagged. Want to customize?

---

## Phase 5: Working Conventions

**Q11. Main working format?**
Default is markdown. Should we work in something else from the start (e.g., LaTeX)? (This is a working-conventions choice, not a structure one — the folders come from the archetype scaffold, not from the format.)

**Q12. Any project-specific conventions?**
Things like: naming rules for files, how team members submit inputs, special commit procedures, tone/scope guidelines for the deliverable.

**Default conventions (included in every new project):**
- Iterative workflow — Claude waits for Andrea's go-ahead before producing output
- CLAUDE.md is a living document
- Repetition rule — if a task is done 3+ times, check whether it should be codified
- "Uploaded" / "pushed" = GitHub repo
- Skills stay in `skills/` — don't duplicate skill content into CLAUDE.md

---

## After the questionnaire: Setup actions

Once Andrea has confirmed the archetype (Phase 3), completed the curation conversation (Q6), and answered the remaining questions, Claude does the following:

1. **Generate the CLAUDE.md** from `CLAUDE_template.md`, filled in with Andrea's answers. Set the **archetype declaration** (the YAML frontmatter `type` / `variant` / `spec-version`) from the confirmed triage — a NONE repo sets `type: NONE` and deletes the variant/spec-version lines. The Skills section reflects the curated set (the always-active group + skills in activated clusters + the single archetype spec for the declared type; no rows for deactivated clusters or for the kit-resident birth tools). Present for review before committing.

2. **Scaffold the confirmed archetype.** Read the matching `<archetype>_setup_scaffold.md` and build the birth skeleton it specifies: the archetype's folders, its **index set** (created up front, self-documenting, empty-but-headed, `ALL_CAPS`), and a `FOLDER_MAP.md` stub in each content folder. The scaffold also builds the universal layer every repo gets — `workspace/` (with the universal subfolders `claude_conversations/`, `brainstorms/`, `to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`, all **created up front as labeled-empty homes**, contents born on use) and `skills/`; an **archetype** scaffold additionally creates the **curated-skill homes** `workspace/agent_outputs/` (`agent_research_verification`) and `workspace/visuals/` (`visuals_workflow`). A **NONE** repo gets only the universal layer (no archetype folders, no curated-skill homes, no archetype-common layer, no archetype spec). Folder model, index definitions, and naming are **not redefined here** — they live in the archetype spec and the convention files (`structure_conventions.md`, `naming_conventions.md`, and — for an archetype repo — the archetype-common `archetype_conventions.md`); Part A runs the scaffold and points at them.

### Skills layout — flat vs. two-subfolder

The `skills/` layout follows `structure_conventions.md` ("Skills layout"): flat by default, split into a general-kit subfolder + a repo-specific subfolder **only when repo-specific skills actually exist**. `LastSkillUpdate/` always rides inside the active kit folder, named by the `KIT_FOLDER` parameter (default `skills/`; `skills/GeneralSkills/` under the two-subfolder layout). Where the paths below read `skills/foo.md`, substitute `${KIT_FOLDER}/foo.md` if the repo uses the two-subfolder layout; the substitution is mechanical.

3. **Copy the curated skill subset** into `${KIT_FOLDER}` — the always-active group + every skill in every activated cluster (with Final-production format-pair sub-decisions applied) + the single archetype spec matching the declared type (NONE copies no spec). The kit metadata files (`PROJECT_SETUP.md`, `CLAUDE_template.md`, `STATUS_template.md`, `CHANGELOG.md`) ship as part of the always-active group. Birth tools (`new_repo_setup.md`, the three `*_setup_scaffold.md`) are **kit-resident** — read at setup, never copied into the repo. Mirror the copied files into the `LastSkillUpdate/` snapshot (byte-identical; the baseline future Skills Diff Check sweeps compare against). Source from the most recent consolidation zip (filtered to the curated subset) or fetch via the GitHub API from `SkillPropagation`.

4. **Create the cluster-conditional starter files** — the artifacts keyed to *which optional clusters* were activated at Q6, which the archetype scaffold does not own:
   - `references.bib` (or the custom name from Q7b) — if Source material is active and paper processing is among the parameters.
   - `workspace/agent_outputs/INDEX.md` and `workspace/agent_outputs/LESSONS.md` — if Source material is active and agent research is among the parameters.
   - Any tracking documents defined at Q8a.
   - *(The archetype `*_INDEX` set and every `FOLDER_MAP.md` are built by the scaffold in step 2, not here.)*

5. **Populate STATUS.md** at repo root, generated from `LastSkillUpdate/STATUS_template.md` and filled from the setup interview (project overview, workflow mode, etc.). The cluster-activations block records the curated state **and the confirmed archetype** (`Repo archetype: <type> (variant, spec vX.Y.Z)` / `NONE`), per `skills_curation_skill.md` Step 7, replacing the initial-template "unknown" values. Header flag: `reviewed` (Andrea just confirmed every entry).

6. **Save the curation conversation** to `workspace/claude_conversations/` per `repo_conversations_skill.md` (tags include `curation` and `propagation-vX.Y.Z`, where vX.Y.Z is the kit version integrated). This is the audit trail for why the activations and the archetype are what they are.

7. **Commit everything** in one initial commit naming the archetype and the activated clusters, then **summarize** what was set up, which clusters were activated, and what's in the Parking Lot for later decisions.

---
---

# Part B: Skill Integration for Existing Repos

Use this when a repo already has a `CLAUDE.md` and needs to be brought in line with the current generic skills kit. The goal is to integrate the generic skills without overwriting project-specific content — and to surface cases where the repo's version of something is better than the generic.

**Core principle:** The repo's project-specific content (project overview, collaborators, deliverables, project question, parameters, tracking documents, conventions) is sacred. The generic skills are tools that serve the project — they get added alongside or underneath what already exists, never on top of it.

---

## Phase 1: Audit the Existing Repo

### Step 1 — Read the existing CLAUDE.md

Read the full CLAUDE.md. Understand:
- What the project is about
- Who the collaborators are
- What deliverables exist
- What protocols are already in place (writing, reading, paper processing, etc.)
- What folder structure exists
- What conventions are defined
- Whether there's a `skills/` folder already, and if so, what's in it
- Whether there's a `skills/CHANGELOG.md` (used to determine which kit version the repo is on — if present)

### Step 2 — Inventory for Andrea

Present a short summary to Andrea:

> "Here's what I found in this repo's CLAUDE.md:
> - **Project:** [name and brief description]
> - **Protocols in place:** [list — e.g., writing protocol, paper processing, note-taking]
> - **Skills folder:** [exists / doesn't exist] [if exists: contains X, Y, Z]
> - **Kit version the repo is on:** [read from skills/CHANGELOG.md, or 'unknown' if no CHANGELOG]
> - **Conventions:** [key conventions already defined]
> - **Folder structure:** [what's there]"

Wait for Andrea to confirm the inventory is accurate before proceeding.

---

## Phase 2: Gap Analysis

Phase 2 has two stages: **cluster curation** (proposing which clusters of
the kit should be active for this repo) and then **per-skill gap analysis**
inside the activated clusters.

### Stage 1: Cluster curation

Run the per-cluster curation conversation per `skills/skills_curation_skill.md`.
Signal sources for Part B are: the repo's existing `CLAUDE.md`, `FOLDER_MAP.md`
(or legacy `AboutFolder.md`) files, any existing `skills/`-like content, `STATUS.md` if present, recent
commits. The current `skills/` folder contents (if any) are consulted only
to detect drift (orphaned files); they are NOT what proposals anchor on.

The four optional clusters get the sequential ask. The always-active group
(palette, repo and session infrastructure, brainstorming, kit metadata)
ships without a per-cluster question.

After the curation conversation, the curated set is what gets gap-analyzed
in Stage 2.

### Stage 2: Per-skill gap analysis (inside activated clusters)

For each skill **inside an activated cluster**, classify it:

| Category | Meaning | Action |
|---|---|---|
| **Missing** | The repo doesn't address this at all | Propose adding it |
| **Covered but weaker** | The repo has something, but the generic skill is more developed | Propose replacing with the generic, preserving project-specific parameters |
| **Equivalent** | The repo's version and the generic are functionally the same | No action needed |
| **Stronger in repo** | The repo has a better version than the generic | Note in the integration report. The next discovery sweep run from `SkillPropagation` picks up the difference via SHA diff and surfaces it for consolidation. No in-session action required. |

Skills in deactivated clusters are not gap-analyzed — they are not part of
this repo's kit. If a deactivated cluster's skill has a project-specific
analog in the repo (e.g., a project-specific paper-processing protocol in
a repo where Source material cluster is deactivated), that analog stays
where it is and is not classified against the generic skill.

### How to assess each skill (only for skills inside activated clusters)

**Writing workflow (`writing_skill.md` + Protocol skills) — Writing cluster:**
- Does the repo have a writing/drafting protocol? How detailed is it?
- Does it have a reading/note-taking protocol?
- Does it separate the two (thinking vs. writing)?
- Are the key rules present (interactive outlines, one-pass drafting, review-before-commit)?
- The skill ships as three files since v2.1.8: `writing_skill.md` (triage with shared content), `writing_notes_skill.md` (Protocol 1), `writing_drafting_skill.md` (Protocol 2). All three propagate together; the triage routes to the appropriate protocol skill.

**Paper processing (`materials_processing_skill.md` + `paper_processing_academic_skill.md` + `paper_processing_institutional_skill.md`) — Source material cluster:**
- Does the repo process papers? If so, how?
- Are the steps defined (Step 0 triage; then per-protocol rename, extract, summarize, index, BibTeX)?
- Are project-specific parameters set (PROJECT_QUESTION, CONDITIONAL_SECTION)?
- Is there a tracking/status system?
- All three skills propagate together. If the repo currently references `paper_processing.md` (the pre-split single-file version), the Part C refactor renames the reference and adds the two protocol skills.

**Document processing (`document_processing_skill.md`) — Source material cluster:**
- Does the repo process non-academic documents (legislation, government reports, institutional material)? If so, how?
- Are the steps defined (rename, extract, summarize, classify, index, cross-reference)?
- Are reliability and confidentiality labels defined?
- Is there a master index and folder-level indexing?

**Agent research verification (`agent_research_verification_skill.md`) — Source material cluster:**
- Does the project run deep-research agents (Claude Research, ChatGPT Deep Research, similar)? If yes:
  - Is there a folder for agent outputs? Where?
  - Is there a discipline distinguishing raw agent output from verified findings? (Most older projects won't — this is the discipline the skill codifies.)
  - Is there an INDEX.md tracking past dives?
  - Is there a LESSONS.md of prompt-engineering responses to past failure modes?
- If the project runs agent dives but lacks these structures, propose adopting the skill plus bootstrapping `workspace/agent_outputs/INDEX.md` and `workspace/agent_outputs/LESSONS.md`.

**Email drafting (`email_drafting_skill.md`) — Writing cluster:**
- Is there any email protocol? (Most older repos won't have one — this skill is newer.)

**Marta's writing voice (`marta_writing_voice_skill.md`) — Voice and style cluster:**
- Does the project produce content for Marta? If so, is there a voice guide?

**Writing style profiles (academic and FMM institutional) — Voice and style cluster:**
- Does the repo reference a style profile? Is it inline or in a separate file?
- Are the key elements present (draft-first-style-second, do-not-infer, pre-styling checklist)?

**Translation review (`translation_review_skill.md` + `translation_corrections_log.md`) — Voice and style cluster:**
- Does the repo produce Spanish deliverables?
- Is there existing translation-corrections material (notes, marked-up translations, ad-hoc pair lists) worth folding into `translation_corrections_log.md` at adoption?

**Word formatting (`fmm_docx_formatting_skill.md` + `fmm_word_preamble.js`) — Final-production formats:**
- Does the repo produce Word documents? If so, is there a formatting spec?
- Is `fmm_word_preamble.js` present?
- Is `KnowledgeLogo.png` present?

**FMM LaTeX paper (`fmm_paper_latex_skill.md` + `fmm_paper_preamble.tex`) — Final-production formats:**
- Does the repo produce FMM-styled LaTeX policy notes or institutional papers? If yes, is there a preamble?

**Academic paper LaTeX (`academic_paper_latex_skill.md` + `academic_paper_preamble.tex`) — Final-production formats:**
- Does the project produce an academic paper in LaTeX?

**FMM coordination slides — Beamer/LaTeX (`fmm_coordination_slides_latex_skill.md` + `fmm_coordination_slides_preamble.tex`) or PowerPoint (`fmm_coordination_slides_pptx_skill.md` + `fmm_coordination_slides_pptx_preamble.py`) — Final-production formats:**
- Does the project produce internal division slides?
- Are the three background assets present (`BackgroundTitle.png`, `BackgroundBody.png`, `BackgroundBodyWhite.png`)?

**Academic slides (`academic_slides_skill.md` + `academic_slides_preamble.tex`) — Final-production formats:**
- Does the project produce academic presentations (conference talks, seminars)?
- Is `IDBLogo.png` present?

**Always-active group — no per-skill gap analysis, but two confirmations:**

These skills ship to every repo without per-cluster ask. Two parameter
confirmations still apply:

- **Housekeeping (`housekeeping_skill.md`):** confirm whether the repo's default housekeeping scope (`papers/`, `Drafts/`, `inputs/`) matches this project, or whether the parameters need tuning (e.g., exclude or add folders).
- **Project tracker (`project_tracker_skill.md`) and STATUS.md:** does the repo have a `STATUS.md` at root, or any equivalent project-level tracking file? If not, one will be bootstrapped during Phase 3 (Integration) — Claude reads the existing `CLAUDE.md`, `FOLDER_MAP.md` (or legacy `AboutFolder.md`) files, recent `CHANGELOG.md` entries (if present), and recent commits, drafts a `STATUS.md` from those signals (including the cluster-activations block populated from Stage 1's curation), walks Andrea through section-by-section for review, then commits.
- Does the existing `CLAUDE.md` have a "Parking Lot" section? If yes, it will be migrated to STATUS.md's "Open questions" section at bootstrap time, and the CLAUDE.md Parking Lot section removed in the same commit.
- Does the repo's default workflow mode (`branches` vs `main_only`) need to be confirmed? Most content repos use `branches`; only quick personal/scratch repos use `main_only`.
- Folder bootstrap: every universal `workspace/` subfolder defined in `structure_conventions.md` that does not exist in the repo is created in the integration commit — unconditionally, per the created-up-front convention (an empty subfolder is a labeled home reading as state, never clutter). No per-folder ask. Where the repo has an existing arrangement doing the same job (a root `TODO.md`, a conversations folder under another name), Claude proposes reconciling it into the universal home — prompt-don't-perform; the home is created either way. Curated-skill homes (`workspace/agent_outputs/`, `workspace/visuals/`) follow their owning skill's curation, not this bootstrap. *(Replaces the v2.2 per-folder ask / Deferred-folders mechanism.)*

### Present the gap analysis

Show Andrea a table covering skills inside activated clusters only:

| Skill | Cluster | Status | Notes |
|---|---|---|---|
| Writing workflow | Writing (activated) | Covered but weaker — has a writing protocol but missing the reading/note-taking protocol and session resumption rules | Propose adding generic, preserving the project's outline-unit and drafting-unit conventions |
| Paper processing | Source material (activated) | Equivalent — full pipeline already defined with project-specific parameters | No action; copy to `skills/` as-is |
| Email drafting | Writing (activated) | Missing | Propose adding |
| Word formatting | Final-production formats (activated, Word selected) | Missing | Propose adding |
| ... | ... | ... | ... |

**Wait for Andrea's input.** She decides what to integrate. Do not proceed without her go-ahead on each item.

---

## Phase 3: Integration

For each skill Andrea approves:

### Step 1 — Create the `skills/` folder (if it doesn't exist)

Create `skills/` at the repo root.

### Step 2 — Copy in the curated skill subset

Copy each skill file from `SkillPropagation/LastSkillUpdate/` into the repo's `skills/` per the curation outcome from Phase 2 Stage 1. Use the standard filenames — do not rename them. The curated subset = the always-active group plus every skill in every activated cluster (with format-pair sub-decisions applied for Final-production formats).

Files grouped by cluster — copy each cluster's files only if that cluster was activated in Phase 2 Stage 1:

**Source material: reading and processing** *(copy these if Source material cluster was activated)*
- `skills/materials_processing_skill.md`
- `skills/paper_processing_academic_skill.md`
- `skills/paper_processing_institutional_skill.md`
- `skills/document_processing_skill.md`
- `skills/agent_research_verification_skill.md`

**Writing and deliverables** *(copy these if Writing cluster was activated)*
- `skills/writing_skill.md` (triage)
- `skills/writing_notes_skill.md` (Protocol 1 — ships alongside triage)
- `skills/writing_drafting_skill.md` (Protocol 2 — ships alongside triage)
- `skills/visuals_workflow_skill.md` (visuals embedded in markdown deliverables; invoked from drafting)
- `skills/email_drafting_skill.md`

**Voice and style** *(copy these if Voice cluster was activated)*
- `skills/andrea_writing_style_skill.md`
- `skills/andrea_fmm_institutional_style_skill.md`
- `skills/marta_writing_voice_skill.md`
- `skills/translation_review_skill.md` + `skills/translation_corrections_log.md` *(companion pair — the Spanish naturalness review; ships whenever the Voice cluster is active. On propagation to a repo that already carries the log, the log reconciles per Step 3's per-file local-modification handling — local pairs are never silently dropped)*

**Final-production formats** *(copy only the format-pairs selected in the cluster's sub-asks)*
- `skills/fmm_docx_formatting_skill.md` + `skills/fmm_word_preamble.js` *(if Word selected)*
- `skills/fmm_paper_latex_skill.md` + `skills/fmm_paper_preamble.tex` *(if FMM LaTeX paper selected)*
- `skills/academic_paper_latex_skill.md` + `skills/academic_paper_preamble.tex` *(if Academic paper LaTeX selected)*
- `skills/academic_slides_skill.md` + `skills/academic_slides_preamble.tex` *(if Academic slides selected)*
- `skills/fmm_coordination_slides_latex_skill.md` + `skills/fmm_coordination_slides_preamble.tex` *(if FMM coordination slides — Beamer selected)*
- `skills/fmm_coordination_slides_pptx_skill.md` + `skills/fmm_coordination_slides_pptx_preamble.py` *(if FMM coordination slides — PowerPoint selected)*
- `skills/KnowledgeLogo.png` *(if Word formatting or FMM LaTeX paper is among selected format-pairs)*
- `skills/IDBLogo.png` *(if academic slides is among selected format-pairs)*
- `skills/BackgroundTitle.png`, `BackgroundBody.png`, `BackgroundBodyWhite.png` *(if coordination slides is among selected format-pairs)*

**Always-active group** *(copy all — these ship to every repo)*
- `skills/skill_authoring_skill.md` *(meta-skill for authoring new skills; needed in every repo so the conventions are available wherever new skills are written)*
- `skills/project_tracker_skill.md`
- `skills/finish_session_skill.md`
- `skills/writing_branch_skill.md` *(in always-active group; required dependency of `finish_session_skill.md`)*
- `skills/exploration_branch_skill.md` *(in always-active group; the long-lived exploration-branch workflow — placed with `writing_branch_skill.md`, added v4 #8)*
- `skills/multisession_task_skill.md` *(in always-active group; the multi-session carryover — universal because its home `workspace/multisession_active_tasks/` is defined in `structure_conventions.md` for every repo, added v4 multisession_task)*
- `skills/repo_conversations_skill.md`
- `skills/housekeeping_skill.md`
- `skills/github_api_workflow_skill.md`
- `skills/cross_repo_import_skill.md` *(in always-active group; universal — any repo can import from another, NONE included — and leans on `github_api_workflow_skill.md`'s read helpers; fires only on an import trigger, added v4 cross-repo-import)*
- `skills/skills_curation_skill.md` *(needed in every repo so future propagations can run the curation conversation)*
- `skills/andreas_palette.md` *(invocable across formats, code, and ad-hoc visuals)*
- `skills/brainstorming_skill.md`
- `skills/STATUS_template.md` *(informational reference — the actual `STATUS.md` lives at repo root, generated from this template at bootstrap time)*
- `skills/CLAUDE_template.md` *(template ships for reference)*
- `skills/PROJECT_SETUP.md` *(setup-guide reference ships for completeness)*
- `skills/CHANGELOG.md` *(records which kit version the repo is on; future Part C runs read this)*

**Repo structure and archetype** *(always-active group; floor conventions to every repo, the archetype-common layer to archetype repos only, spec single-select)*
- `skills/naming_conventions.md` *(universal — copied to every repo)*
- `skills/structure_conventions.md` *(universal — copied to every repo, including NONE)*
- `skills/archetype_conventions.md` *(archetype-common — copied to every archetype repo; a NONE repo does not get it)*
- `skills/<archetype>_archetype_spec.md` — copy the **one** spec matching the repo's declared type (`research` / `coordination` / `operation`); a NONE repo copies none
- *Not copied per-repo:* `skills/new_repo_setup.md` and the three `skills/*_setup_scaffold.md` files are kit-resident birth tools, read from the kit at new-repo setup only — never copied into a content repo.

### Step 2b — Bootstrap STATUS.md and tracked folders

This step runs after the skills are copied but before CLAUDE.md is refactored. It establishes the project-level tracker and ensures the folders the new skills depend on exist.

**Folder bootstrap (create unconditionally).** For each universal `workspace/` subfolder defined in `structure_conventions.md`, check whether it exists in the repo:
- If yes → skip.
- If no → create it in this Part B integration commit. No ask — the universal subfolders are load-bearing homes for always-active skills, created up front as labeled-empty homes per the convention; an empty subfolder reads as state, never clutter, so declining one saves nothing and breaks the floor every skill reads.

If the repo has an **existing arrangement doing the same job** as a universal subfolder (a root `TODO.md` where `workspace/to_do/` now lives, a conversations folder under another name), Claude proposes reconciling it into the universal home — migration is Andrea's call (prompt-don't-perform), but the universal home is created either way. Curated-skill homes (`workspace/agent_outputs/`, `workspace/visuals/`) follow their owning skill's curation, not this bootstrap. *(This replaces the v2.2 per-folder ask and its **Deferred folders** CLAUDE.md subsection; a repo still carrying that subsection has it resolved at the next Part C run — see `project_tracker_skill.md`, Folder bootstrap protocol.)*

**STATUS.md bootstrap.** Follow the procedure in `project_tracker_skill.md` Bootstrap → Part B section:
1. Read the existing `CLAUDE.md`, all `FOLDER_MAP.md` (or legacy `AboutFolder.md`) files, recent `CHANGELOG.md` entries (if present), and recent commits (last 10–20 on `main`).
2. Draft a STATUS.md based on what those artifacts reveal about the repo's current state. Use `LastSkillUpdate/STATUS_template.md` as the structural skeleton.
3. Walk Andrea through the draft section by section for review.
4. Once approved, STATUS.md is committed alongside the other Part B changes.

**Parking Lot migration.** If the existing `CLAUDE.md` has a "Parking Lot" section, its contents migrate to STATUS.md's "Open questions" section during bootstrap. The CLAUDE.md Parking Lot section is removed in the same commit (handled in Step 3 — Refactor CLAUDE.md).

Header flag on the new STATUS.md: `reviewed` (Andrea just reviewed every section).

### Step 3 — Refactor CLAUDE.md

This is the most delicate step. The goal: make CLAUDE.md reference the `skills/` files instead of having protocols inline, while preserving all project-specific content.

**What to preserve (never delete or overwrite):**
- Project Overview section (name, description, question, audience, deliverables)
- Collaborators section
- Project-specific parameters (PROJECT_QUESTION, CONDITIONAL_SECTION, BIB_FILE, etc.)
- Project-specific conventions
- Folder structure (add `skills/` to the table, don't replace other entries)
- Any project-specific skills or protocols that aren't covered by the generic kit

**What migrates out of CLAUDE.md (handled in Step 2b — Bootstrap STATUS.md):**
- The Parking Lot section, if present. Its contents move to STATUS.md's "Open questions." Remove the CLAUDE.md Parking Lot section in this Step 3 refactor commit.

**What to refactor:**
- Inline protocols that now have a generic skill equivalent → replace with a reference to the skill file plus the project-specific parameters. Use the pattern from `CLAUDE_template.md`:
  > **Generic skill:** `skills/[skill_file].md`. The section below is the project-specific implementation — it adds parameters and any conventions that go beyond the generic skill.
- Add the Skills table (from `CLAUDE_template.md`) listing all activated skills with their "When to use" triggers
- Add the standard conventions if not already present (iterative workflow, CLAUDE.md is living, repetition rule, uploaded=repo, skills stay in skills/, generic-skill improvements trigger artifacts)

**What to add:**
- Skills table
- References to newly added skills
- Any sections from `CLAUDE_template.md` that the repo is missing and that apply (e.g., Draft Versioning, Writing Style Profiles section, Document Format & Export Workflows)

### Step 4 — Present the updated CLAUDE.md

Show Andrea the full updated CLAUDE.md. Highlight what changed:
- "Added: Skills table, reference to email_drafting_skill.md, reference to writing_skill.md"
- "Refactored: Writing protocol now references `skills/writing_skill.md` — project-specific parameters preserved"
- "Unchanged: Project Overview, Collaborators, Paper Processing parameters, folder structure"

**Wait for approval before committing.**

### Step 5 — Commit

Commit the `skills/` folder and the updated CLAUDE.md with a message like:
```
Integrate generic skills kit (v1.X): add skills/, refactor CLAUDE.md to reference skill files
```

### Step 6 — Flag "Stronger in repo" cases

If any skills were classified as "Stronger in repo" in the gap analysis, note them in the integration report. The next discovery sweep run from `SkillPropagation` will pick them up via SHA diff and surface them for consolidation. No in-session action — portability calls happen at consolidation time, not during integration.

---
---

# Part C: Propagating Kit Updates to Repos

Use this when the canonical skills kit has been updated in `SkillPropagation/LastSkillUpdate/` (new version, renames, new skills, existing skills modified) and Andrea wants to push those updates into an existing repo that already has `skills/` integrated.

**When to trigger:** Andrea says "update the skills on this repo," "push the new skills," "propagate the kit," "apply v1.X to this repo."

**Core principles:**
- The canonical kit lives in `SkillPropagation/LastSkillUpdate/`. It is the source of truth.
- Each Claude session can only see the repo it's running in. Andrea is the bridge: she creates a staging folder in the repo with the new files, then Claude diffs.
- Never overwrite without checking. Repos may have local modifications that should be preserved or reconciled. Local modifications are detected per-file (Step 3 classification); they don't filter which files propagate, only how content merges.
- **Per-propagation per-cluster curation** (v2.1.13 change, replacing the v2.0.1 full-kit-by-default convention). At each propagation, Claude runs the curation conversation per `skills_curation_skill.md`, proposing per-cluster activation based on project signals (STATUS.md, CLAUDE.md, recent commits, recent conversations — NOT the current `skills/` folder contents). Andrea confirms or overrides cluster by cluster. The curated subset is what gets applied to `skills/`; clusters that were active but are now inactive have their files hard-removed.
- The always-active group (palette, repo and session infrastructure, brainstorming, kit metadata) ships with every propagation without per-cluster ask. See `skills_curation_skill.md` for the rationale and the cluster completeness invariant that lets curation work without runtime dependency resolution.
- After updates land, the repo's `skills/LastSkillUpdate/` snapshot is refreshed wholesale to match the active `skills/` (Step 9). This is what the next discovery cycle's Skills Diff Check compares against.

---

## Step 1 — Andrea stages the new version

Before invoking Claude, Andrea creates `skills/pending_vX.Y/` at the repo root (where `vX.Y` is the target kit version — e.g., `pending_v4.0/`; the folder name carries whatever version is being propagated). She populates it with the **full kit** by extracting the consolidation zip from `SkillPropagation` directly into this staging folder.

Staging is always the full kit. Curation happens *in session*, not at staging — the staging folder is the candidate set; the curation conversation decides which of those candidates actually land in `skills/`. Pre-curating at staging would anchor decisions on Andrea's setup-time guesses rather than on a deliberate per-propagation conversation.

When the session starts, the staging folder exists alongside `skills/`.

---

## Step 2 — Claude reads both folders and the CHANGELOG

Read:
1. `skills/pending_vX.Y/CHANGELOG.md` — what changed between the repo's current version and the target
2. `skills/CHANGELOG.md` — what version the repo is currently on (if no CHANGELOG, assume v1.0 or earlier)
3. Every file in `skills/` and `skills/pending_vX.Y/`

Extract from the staging CHANGELOG: renames applied, new files added, existing files modified, version numbers (from → to).

---

## Step 2.5 — Confirm the archetype declaration (declaration-backfill)

Before any file classification or diff, read the repo's root `CLAUDE.md` for the `archetype:` YAML declaration block (the 1d format: `archetype:` / `variant:` / `spec_version:`).

**If present:** confirm it matches the staged spec's current `spec_version`; note any gap for the update plan. Continue to Step 3.

**If absent** (repos restructured into archetype shapes before the declaration format existed will not carry it — this is the expected case for v4.0 propagation):
1. Determine the archetype from the repo's actual structure, tested against the staged `archetype_conventions.md` and the `*_archetype_spec.md` files — not from memory or from the repo's self-description alone. If Andrea has named the archetype (e.g., from the propagation manifest), treat it as the hypothesis to confirm, not the answer.
2. Determine `variant` and `spec_version` from the repo and the staged spec.
3. Present the proposed declaration block to Andrea for approval, flagging any mismatch between the named archetype and the observed structure.
4. On approval, add the block to the repo's `CLAUDE.md` (it lands in the same atomic commit as the rest of the propagation, Step 9).

The declaration gates the rest of Part C: the repo keeps **only** the matching `*_archetype_spec.md` (a NONE repo keeps none, and skips archetype-dependent steps). Archetype *conformance* verification (housekeeping Check 12) is not run here — it runs post-propagation, per Step 10.

---

## Step 3 — Classify each file

For each file in the staging folder, classify it:

| Category | Definition | Action |
|---|---|---|
| **Up to date** | Repo has a file with the same name and byte-identical content | No action (subject to Step 3.5 curation — file may still be removed if its cluster is deactivated) |
| **Rename target** | Staging has a new name; repo has a corresponding file under the old name (per the kit CHANGELOG) | Rename the repo's file to the new name, then compare content (still subject to Step 3.5 curation) |
| **Outdated — unmodified** | Repo has the file with older content; content matches the older kit version exactly | Replace with new kit version if its cluster stays active (Step 3.5); otherwise remove |
| **Outdated — locally modified** | Repo has the file with older content AND the content differs from that older kit version (repo customized it) | Flag for Andrea — show the diff, let her decide merge / replace / keep. If the cluster is deactivated in Step 3.5, the local-modification question is moot (file removed); flag explicitly so Andrea doesn't lose customization without realizing it. |
| **New in staging, not in repo** | Staging has a file the repo doesn't have | Add if its cluster is activated in Step 3.5; do not add if its cluster is deactivated |
| **Repo-only** | Repo has a file not in staging (project-specific or older kit file Andrea chose to exclude) | Leave untouched |

Step 3 classification determines **how** each file's content changes; Step 3.5 curation determines **whether** the file is present in the repo at all. They are independent dimensions of the propagation.

Also scan for references: after identifying renames, search the whole repo (not just `skills/`) for mentions of the old filename. Typical places:
- Root `CLAUDE.md`
- `FOLDER_MAP.md` (or legacy `AboutFolder.md`) files in any folder
- Task-specific skills that may reference generic skills
- Redirect stubs or documentation files

List every reference to any renamed file.

---

## Step 3.5 — Run the curation conversation

Per-propagation per-cluster curation per `skills/skills_curation_skill.md`. Signal sources for Part C are STATUS.md, recent commits, recent conversations (`workspace/claude_conversations/`), and CLAUDE.md — NOT the current `skills/` folder contents. Anchoring on the folder anchors on what was decided at last propagation, which is exactly what curation is designed to make a fresh decision against.

Walk Andrea through the four optional clusters sequentially. Confirm or override each. Then compute the curation delta — ADD (cluster activated, file not currently present), REMOVE (cluster deactivated, file currently present), UNCHANGED (cluster still active, file present, version-update behavior from Step 3 applies).

Present the delta to Andrea for final confirmation before continuing to Step 4. The curation conversation itself gets saved per `repo_conversations_skill.md` Step 8.

---

## Step 4 — Present the update plan

Show Andrea a table that combines per-file classification (Step 3) with the curation delta (Step 3.5):

```
| File | Cluster | Repo state | Staging state | Status | Proposed action |
|------|---------|-----------|---------------|--------|-----------------|
| writing_skill.md | Writing (active) | v1.0 | v3.0 | Outdated — unmodified; also see split into Protocol skills | Replace with triage + 2 protocols |
| materials_processing_skill.md | Source material (active) | v2.0.0 | v2.0.0 | Up to date | No action |
| email_drafting_skill.md | Writing (active) | v1.0 (modified) | v1.1 | Outdated — locally modified | Review diff |
| MartaRuizArranz_WritingVoice_Skill.md → marta_writing_voice_skill.md | Voice and style (active) | old name | new name | Rename target | Rename + compare |
| fmm_coordination_slides_latex_skill.md | Final-production / FMM coordination slides (active) | — | v1.2 | New in staging | Add (per curation) |
| academic_paper_latex_skill.md | Final-production / Academic paper LaTeX (inactive) | v1.0 | v1.2 | Cluster deactivated in curation | Remove from skills/ |
| project_specific_tracker.md | (project-specific, not kit) | — | — | Repo-only | Leave |
```

The Cluster column shows whether the file's cluster was activated in Step 3.5 (curation) and, for Final-production formats, which format-pair was selected.

For renames, also list the references found in Step 3:
```
References to `MartaRuizArranz_WritingVoice_Skill` found outside skills/:
- CLAUDE.md L42: Skills table row
- CLAUDE.md L87: Writing style profiles section
- FOLDER_MAP.md L12: ...
(N references total)
```

**Wait for Andrea's approval per line.**

---

## Step 5 — Apply updates

For each approved operation:

**Rename target:** Rename the repo's file. Then treat the content comparison as one of the other categories below.

**Outdated — unmodified:** Replace the file's content with the staging version.

**Outdated — locally modified:** Show the three-way diff (old kit, repo's version, new kit). Andrea decides:
- **Accept kit version** — replace (local modifications are lost)
- **Merge** — Claude integrates the kit changes into the repo's modified version, preserving local customizations. Present the merged file for review before saving.
- **Keep repo version** — skip this file

**New in staging, not in repo:** Add if the file's cluster was activated in Step 3.5 (curation). Do not add otherwise. The decision was made in curation; Step 5 just executes.

**Cluster deactivated (file present in repo, cluster deactivated in Step 3.5):** Hard-remove the file from `skills/`. No soft-archive, no commented-out reference. Update CLAUDE.md's Skills table to remove the row (Step 7).

---

## Step 6 — Update references for renames

For each rename Andrea approved, update every reference identified in Step 3. Scan the whole repo, not just `skills/`. This includes the root `CLAUDE.md`, `FOLDER_MAP.md` (or legacy `AboutFolder.md`) files in any folder, task-specific skills, and redirect stubs.

Present the list of updated references to Andrea before committing.

---

## Step 7 — Update CLAUDE.md

After applying file changes:
- Update the Skills table in CLAUDE.md if any filenames changed
- Add rows for any new files that were added in this propagation (per the Step 3.5 curation — files added when their cluster was activated)
- Remove rows for files that were removed (per Step 3.5 — files removed when their cluster was deactivated, plus deletions from renames)
- Update the Cluster activations (current) block in STATUS.md to reflect the post-propagation state
- If the repo's working conventions section has the legacy "generic-skill improvements trigger an improvement artifact" rule (added in v1.3, retired in v2.0.2), **remove it.** The session-end artifact path no longer exists; portable changes are picked up by the next discovery sweep run from `SkillPropagation`.
- Update any other cross-references affected by renames or changes

---

## Step 8 — Update the repo's skills/CHANGELOG.md

Replace the repo's `skills/CHANGELOG.md` with the one from staging. This records which kit version the repo is now on — future Part C runs read this.

---

## Step 8.5 — Scaffold the workspace folders

The universal `workspace/` subfolders are labeled-empty homes created up front (`structure_conventions.md`); a repo propagated from a pre-v4 kit will be missing the ones v4 added (`to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`). Bring the repo's `workspace/` up to the full set its archetype requires.

- **Every repo (NONE included):** `claude_conversations/`, `brainstorms/`, `to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`.
- **Archetype repos also** (research / coordination / operation, per the `*_setup_scaffold.md` birth tree): `agent_outputs/`, `visuals/`.

For each folder in the set that does not already exist, create it with its **standing document** per the table in `structure_conventions.md` — the document is the folder's permanent label *and* what persists it in git (git and the Contents/Trees API track files, not bare directories — see the Appendix), so it survives task completion and the folder never collapses to empty:
- `claude_conversations/` → `INDEX.md` (header per `repo_conversations_skill.md`).
- `agent_outputs/` → `INDEX.md` + `LESSONS.md` (headers per `agent_research_verification_skill.md`); `WORKFLOW_SKIPS.md` is born-on-use.
- every other folder → `README.md` (a titled one-line label, per the table).

Instantiate index headers empty (no rows yet). Never overwrite an existing standing document, and never create or touch folder *contents*. These additions land in the propagation's atomic commit (Step 11).

---

## Step 9 — Refresh the `skills/LastSkillUpdate/` snapshot

After all file updates in `skills/` have landed (Steps 5–8), refresh the snapshot subfolder so it byte-matches the active `skills/`. The snapshot tracks the curated state of `skills/`, not the full kit — it's what the next discovery cycle's Skills Diff Check compares against.

Operation:
1. If `skills/LastSkillUpdate/` does not exist, create it.
2. Replace the entire contents of `skills/LastSkillUpdate/` with a copy of the active `skills/` files (excluding `LastSkillUpdate/` itself — don't recurse).
3. Both folders should now be byte-identical at the file level.

Why this step exists: future discovery cycles (Skills Diff Check) compare each repo's active `skills/` against this snapshot. If the snapshot is stale, the diff produces noise. Refresh-from-active means the snapshot represents *what this repo last received and decided to keep* — not *what canonical master had at the time*. So if Andrea declined a specific file in Step 5, the snapshot reflects her choice, and the next discovery cycle won't keep flagging the absent file as "missing from current."

Note: the snapshot is read-only between propagations. Andrea and Claude only edit files in active `skills/` during normal work; `LastSkillUpdate/` is touched only by Part C runs.

---

## Step 10 — Housekeeping pass (added v2.0.4)

Before the atomic commit, run a housekeeping pass to make sure the rest of the repo is internally consistent with the updated `skills/`. Skill propagation can leave stale references, missing index entries, and navigation tables that no longer reflect reality. Catching this here means the propagation commit ships a *coherent* repo, not just an updated `skills/` folder surrounded by stale infrastructure.

**Scope: infrastructure only.** Housekeeping checks repo infrastructure files (root `CLAUDE.md`, `FOLDER_MAP.md`, `README.md`, `PAPERS_INDEX.md`, navigation tables in folder-level `FOLDER_MAP.md` files, repo-specific task skills under non-`skills/` paths). It does **not** modify deliverables (`Drafts/`, `papers/`, `inputs/extracts/`, `inputs/summaries/`, `NotesFromReading/`, etc.). Deliverables are work product; housekeeping only checks that infrastructure references *to* deliverables are accurate.

**Checklist.** Run all of these against the post-propagation repo state:

1. **Root `CLAUDE.md` — skill table consistency.** Every skill in `skills/` either has a row or has been intentionally excluded by Andrea. No rows for files that don't exist in `skills/`. Cross-references in working conventions and trigger maps point to files that exist.

2. **`FOLDER_MAP.md` — repository structure section.** The folder layout shown matches the actual folder structure on disk. Any folders mentioned exist; any folders that exist are mentioned (or intentionally omitted).

3. **`README.md` — internal consistency.** If it mentions skills or kit version, those mentions are current.

4. **Repo-specific task skills (under non-`skills/` paths).** Their own `FOLDER_MAP.md` and any internal references stay consistent with their content. References *from* repo-specific skills *to* generic skills point to files that exist.

5. **Indexes — `PAPERS_INDEX.md`, or whatever the repo uses.** Files mentioned exist. Files that exist in their respective folders are mentioned (or intentionally omitted — e.g., archived or excluded items). Note: index *content* (whether a paper has been read, status labels, etc.) is not housekeeping's concern; only the structural presence of entries.

6. **Folder-level `FOLDER_MAP.md` files.** Any navigation tables or file lists in these files match folder reality.

7. **Skill-to-skill cross-references inside `skills/`.** If a skill mentions another skill by filename, the referenced file exists in `skills/` (or in `LastSkillUpdate/`). This is a sanity check on the propagation itself, not on the repo — but cleanest to run here.

**Auto-fix vs. surface.** Two categories:

- **Trivially-fixable** (auto-apply in the same atomic commit as the propagation): a stale name reference to a renamed file (apply the rename); a clearly-deleted skill mentioned in CLAUDE.md's table (remove the row); a missing skill row in CLAUDE.md's table for a file that exists in `skills/` (add the row).

- **Requires-decision** (surface for Andrea, do not commit until she decides): an index entry that *might* be stale or *might* be intentionally minimal; a deliverable mentioned that doesn't exist (could be deleted, could be a typo, could be planned-but-not-created); any structural change to navigation that's larger than a renaming.

**Reporting format.** Produce a brief housekeeping report:

```
Housekeeping pass — N findings:
  Auto-applied (M):
    - <file>: <what was fixed>
    - ...
  Requires decision (K):
    - <file>: <what was found, options for how to resolve>
    - ...
```

If there are zero findings: report "Housekeeping pass — clean." Proceed to Step 11.

If there are auto-applied items: include them in the atomic commit. Proceed to Step 11.

If there are requires-decision items: pause and let Andrea decide each one. Apply her decisions, then proceed to Step 11. **Do not commit until requires-decision items are resolved or explicitly deferred.**

---

## Step 11 — Commit and clean up

Atomic commit:
1. All file updates in `skills/`
2. Renamed files (old path deleted, new path added)
3. Updated references in the repo's own documentation (from Step 6 rename pass)
4. Auto-applied housekeeping fixes from Step 10
5. Andrea-approved requires-decision housekeeping items from Step 10
6. Updated `CLAUDE.md`
7. Updated `skills/CHANGELOG.md`
8. Refreshed `skills/LastSkillUpdate/` snapshot (full contents)
9. **Delete the `skills/pending_vX.Y/` staging folder** — its job is done

Commit message:
```
Update skills kit from v[A.B] to v[X.Y]

- [file]: [action — replace / merge / rename / ...]
- [file]: [action]
- Updated N references to renamed files across repo
- Housekeeping: M auto-fixes, K Andrea-approved adjustments
- Refreshed skills/LastSkillUpdate/ snapshot to v[X.Y]
```

Present the commit summary to Andrea showing what was applied, what was skipped, and any new files she chose to decline.

---

## Common pitfalls (added v2.0.2)

These are mistakes encountered during real propagations. Read these before starting; they're cheap to avoid if you know about them and annoying to recover from if you don't.

- **Empty-file commits when adding new files.** When Step 5 adds a "New in staging" file, the file's content must actually be loaded before commit. If the helper or workflow optimized for "diffs only" (downloading just files that *differ* from the active `skills/`), additions are skipped — they aren't in the differs list. The commit goes through with an empty file. Fix: before applying any operations in Step 5, ensure every file in the staging folder has its content loaded, regardless of category. The "additions" and "renames" categories especially need this.

- **Folder deletion is per-file in the GitHub API.** Step 10 says "delete the staging folder," but the GitHub Contents/Trees API doesn't have a directory-level delete — you delete each file individually, and the directory disappears automatically because git doesn't track empty folders. Don't try to also issue a separate "delete the directory" call; it'll fail or no-op confusingly. Just iterate the files.

---
---

# Appendix: Full Skills Kit Inventory

For reference, these are all the files in the generic skills kit. When setting up a new project (Part A), integrating into an existing repo (Part B), or propagating updates (Part C), this is the complete list of files that may be copied to `skills/`.

Grouped by functional cluster, matching the structure used in `CLAUDE_template.md`'s Skills section and the Phase 3 menu above. The canonical roster is `CLAUDE_template.md`'s **eight** Skills-section clusters; **"Meta and templates" directly below is an Appendix-only inventory grouping** — the kit's meta files, which ship with the always-active group — not a ninth cluster, and it never appears in curation.

### Meta and templates

| File | Type | Purpose |
|---|---|---|
| `PROJECT_SETUP.md` | Meta | This file — project setup and skill integration. Ships in the always-active group to every repo (informational reference, not active workflow). |
| `CLAUDE_template.md` | Template | Blank CLAUDE.md template. Ships in the always-active group to every repo (each repo's actual root `CLAUDE.md` is generated from this template at setup). |
| `CHANGELOG.md` | Meta | Version history for the skills kit (copied to repos' `skills/` so each repo knows which version it's on) |
| `STATUS_template.md` | Template | Template for the per-repo `STATUS.md` file generated at bootstrap |

### Source material: reading and processing

| File | Type | Purpose |
|---|---|---|
| `materials_processing_skill.md` | Skill | Paper processing — Step 0 triage and shared infrastructure (prerequisites, folder structure, status framework vocabulary, lookup, project setup). Routes documents to Protocol A or B |
| `paper_processing_academic_skill.md` | Skill | Paper processing — Protocol A (academic-style papers). Per-document workflow: rename, extract, summarize with thesis/methodology/findings/relevance, BibTeX `@article`/`@unpublished`, Claude status |
| `paper_processing_institutional_skill.md` | Skill | Paper processing — Protocol B (institutional-style reports). Per-document workflow: institutional rename, extract with acronym/box preservation, synthesized-findings summary, BibTeX `@techreport`/`@book`/`@inbook`, Claude status |
| `document_processing_skill.md` | Skill | Document processing pipeline for operational and institutional documents (rename, extract, summarize, classify, index, cross-reference) |
| `agent_research_verification_skill.md` | Skill | Deep-research-agent workflow: prompt drafting, raw-output filing, link extraction, hand-off to papers protocol, verification of claims against retrieved originals, INDEX.md tracker, LESSONS.md for prompt-engineering compounding. **Core principle: agent outputs are NEVER directly citable — only the verification document is.** |

### Writing and deliverables

| File | Type | Purpose |
|---|---|---|
| `writing_skill.md` | Skill | Writing workflow triage (routes to Protocol 1 or Protocol 2) + shared content: how the two protocols interact, project-setup parameters |
| `writing_notes_skill.md` | Skill | Writing workflow — Protocol 1 (reading and note-taking as coupled operation; fully interactive; always on `main`) |
| `writing_drafting_skill.md` | Skill | Writing workflow — Protocol 2 (drafting on a branch; planning loops, one-pass drafting, compiled outline + divergence table; 10k-word scale check, hierarchical naming, assembly cycles) |
| `visuals_workflow_skill.md` | Skill | Visuals embedded in markdown deliverables — sketch in markdown, review, SVG generated post-merge; invoked from drafting; consumes `andreas_palette.md`; home `workspace/visuals/` |
| `email_drafting_skill.md` | Skill | Andrea's email voice and workflow |

### Voice and style

| File | Type | Purpose |
|---|---|---|
| `andrea_writing_style_skill.md` | Skill | Andrea's academic writing voice |
| `andrea_fmm_institutional_style_skill.md` | Skill | FMM institutional writing voice |
| `marta_writing_voice_skill.md` | Skill | Marta Ruiz-Arranz's writing voice |
| `translation_review_skill.md` | Skill | Spanish translation review — naturalness pass + correction capture (companion: `translation_corrections_log.md`) |
| `translation_corrections_log.md` | Record | Append-only Spanish corrections log (unnatural → natural → why); pairs merged into the canonical at consolidation, never silently dropped at propagation |

### Final-production formats

| File | Type | Purpose |
|---|---|---|
| `fmm_docx_formatting_skill.md` | Skill | Word document formatting (colors, fonts, tables, headers) |
| `fmm_word_preamble.js` | Code | Executable docx-js preamble implementing the formatting skill (paired with `fmm_docx_formatting_skill.md`; colors mirror `andreas_palette.md`) |
| `fmm_paper_latex_skill.md` | Skill | FMM-styled LaTeX paper workflow (policy notes, institutional papers, FMM-branded standalone PDFs) |
| `fmm_paper_preamble.tex` | Code | FMM LaTeX paper preamble (copy-paste template; colors mirror `andreas_palette.md`); paired with `fmm_paper_latex_skill.md` |
| `academic_paper_latex_skill.md` | Skill | Academic paper LaTeX workflow (working papers, journal submissions) |
| `academic_paper_preamble.tex` | Code | Academic LaTeX paper preamble (copy-paste template; Andrea's palette defined for figures/TikZ only — document chrome is academic); paired with `academic_paper_latex_skill.md` |
| `academic_slides_skill.md` | Skill | Academic presentation slides (Beamer/Boadilla, conference talks, seminars) |
| `academic_slides_preamble.tex` | Code | Academic Beamer slides preamble (copy-paste template; colors mirror `andreas_palette.md`); paired with `academic_slides_skill.md` |
| `fmm_coordination_slides_latex_skill.md` | Skill | FMM coordination slides (Beamer template, backgrounds, formatting) |
| `fmm_coordination_slides_preamble.tex` | Code | FMM coordination Beamer slides preamble (copy-paste template; colors mirror `andreas_palette.md`); paired with `fmm_coordination_slides_latex_skill.md` |
| `fmm_coordination_slides_pptx_skill.md` | Skill | FMM coordination slides (PowerPoint variant, backgrounds, formatting) |
| `fmm_coordination_slides_pptx_preamble.py` | Code | FMM coordination PowerPoint chrome/helpers (python-pptx; colors mirror `andreas_palette.md`); paired with `fmm_coordination_slides_pptx_skill.md` |
| `KnowledgeLogo.png` | Asset | IDB logo for Word document footers and FMM LaTeX paper footers (copied only if Word formatting or FMM LaTeX paper is activated) |
| `IDBLogo.png` | Asset | IDB logo for academic slides (copied only if academic slides is activated) |
| `BackgroundTitle.png` | Asset | Dark blue title-slide background for FMM coordination slides (copied only if coordination slides is activated) |
| `BackgroundBody.png` | Asset | Light blue body-slide background for FMM coordination slides (copied only if coordination slides is activated) |
| `BackgroundBodyWhite.png` | Asset | White body-slide background for FMM coordination slides (copied only if coordination slides is activated) |

### Shared assets

| File | Type | Purpose |
|---|---|---|
| `andreas_palette.md` | Asset | Andrea's canonical color palette — names, hex/RGB, character notes, aesthetic principles. Mirrored by `fmm_word_preamble.js`, `fmm_coordination_slides_pptx_preamble.py`, and all `.tex` preamble files. Invocable directly anywhere colors are needed (final-production formats, code-generated visualizations, ad-hoc visuals). |

### Repo and session infrastructure

| File | Type | Purpose |
|---|---|---|
| `skill_authoring_skill.md` | Skill | The meta-skill: how to author a new skill that fits the kit's conventions. Covers (1) general principles and conventions of the kit (naming, frontmatter, decomposition, cluster structure, last-updated marker discipline), (2) when to write a skill, (3) what a skill file contains, (4) workflow for drafting with Claude, (5) the downstream lifecycle (sweep → consolidation → propagation). Every new skill is born project-local; cluster placement is a consolidation-time decision in SkillPropagation, not a creation-time decision in the content repo |
| `skills_curation_skill.md` | Skill | The per-propagation per-cluster curation workflow. Codifies the cognitive contract (cluster-level proposal, free per-skill decision — no all-or-nothing rule; Final-production format-pairs are the natural sub-grain) and the cluster completeness invariant (an activated cluster's dependencies must be on the always-active group or in the same cluster). Used at all three propagation points (Part A new-repo setup, Part B existing-repo integration, Part C update propagation), with signal sources varying by point (questionnaire / existing-repo content / STATUS.md + commits + conversations — explicitly NOT current `skills/` folder contents) |
| `project_tracker_skill.md` | Skill | Defines `STATUS.md` as the repo's project-level tracker (session-start check, session-close mandatory update, freshness audit, bootstrap, Pending re-integrations subsection) |
| `finish_session_skill.md` | Skill | Session close-out orchestrator — five-step sequence wiring together STATUS.md update, conversation save (conditional), branch disposition (conditional), and uncommitted-work check; does not duplicate the procedures in the canonical skills, only sequences them |
| `writing_branch_skill.md` | Skill | Ephemeral, single-document review branch (bracketed comments + direct edits); invoked by `finish_session_skill.md` for branch disposition at session close and by `writing_drafting_skill.md` for review cycles during drafting. In the always-active group because `finish_session_skill.md` is always-active and invokes it as a required action (cluster completeness invariant). |
| `exploration_branch_skill.md` | Skill | Long-lived, isolated exploration branch for work whose purpose is to test whether a `main` claim holds; reached from `brainstorming_skill.md`'s purpose-triage or a folder→branch promotion; finalized via the review→reconcile→route→record+delete protocol. In the always-active group (added v4 #8, placed with `writing_branch_skill.md`). |
| `multisession_task_skill.md` | Skill | The multi-session carryover — a per-task carryover doc (`workspace/multisession_active_tasks/MULTISESSION_CARRYOVER_<task_stem>.md`) carrying one task across the sessions it takes to finish when resource limits force the split; a two-question gate decides carryover-vs-prompt; worklist-mimic format; folded into `STATUS.md` and deleted at completion. In the always-active group because its home is defined in `structure_conventions.md` for every repo (added v4 multisession_task). |
| `repo_conversations_skill.md` | Skill | Save, index, and retrieve substantive Claude↔user conversations in a repo (transcript format, INDEX.md, tag vocabulary) |
| `housekeeping_skill.md` | Skill | Three-mode infrastructure consistency check across a content repo (audit / repair / index-audit) |
| `github_api_workflow_skill.md` | Skill | GitHub REST API workflow when git push is blocked: Contents API for single-file work, Trees API for atomic multi-file commits |
| `cross_repo_import_skill.md` | Skill | Prompt-don't-perform import of already-processed material from another repo: reminds Andrea to scope the token to both repos (never touches it), reads into `workspace/staging/` via the `github_api_workflow_skill.md` read helpers (read-only on the source), selects keep/drop/what-must-come-too in staging before placement (the ghost-problem fix), hands off to the repo's normal placement rules, empties staging. Staging home/lifecycle in `structure_conventions.md`. In the always-active group — universal, any repo (NONE included), fires only on an import trigger (added v4 cross-repo-import). |

### Repo structure and archetype

Always-active group. The two convention files are copied to every repo; the archetype spec is copied **single-select** (the one matching the repo's declared type; NONE copies none). The triage and the three scaffolds are kit-resident birth tools — read from the kit at new-repo setup, never copied into a content repo.

| File | Type | Purpose |
|---|---|---|
| `naming_conventions.md` | Convention | Universal naming rule — content `lowercase_underscore`, structural `ALL_CAPS`; carry-safety, paper-stem/cite-key identity. Copied to every repo. |
| `structure_conventions.md` | Convention | Universal structure layer — root files + archetype declaration, `workspace/` + the intake funnel (`staging/`), the `FOLDER_MAP` convention, governance rules, created-up-front vs born, root-as-accidental-staging, reference-by-subject, reading-order, the `_ex` rule, skills layout. Copied to every repo (incl. NONE). |
| `archetype_conventions.md` | Convention | Archetype-common layer — born-minimal promote-on-evidence, origin-based typing, the shared-spine / "one repo or two" test, by-subject keying, the archetype-fixed root skeleton, and the three-layer placement model. Copied to every archetype repo; a NONE repo gets none. |
| `research_archetype_spec.md` | Spec | Full structure-and-index spec for research repos (research lines: paper N=1 / agenda N>1). Single-select. |
| `coordination_archetype_spec.md` | Spec | Full structure-and-index spec for coordination/repeated-task repos (tasks: single N=1 / composition N>1, plus one-offs). Single-select. |
| `operation_archetype_spec.md` | Spec | Full structure-and-index spec for operation repos (reforms: single N=1 / matrix N>1; reliability + confidentiality tags). Single-select. |
| `new_repo_setup.md` | Birth tool | Archetype triage + scaffold for a new repo. Kit-resident; read at setup, not copied per-repo. |
| `research_setup_scaffold.md` | Birth tool | Research birth skeleton. Kit-resident; read at setup, not copied per-repo. |
| `coordination_setup_scaffold.md` | Birth tool | Coordination birth skeleton. Kit-resident; read at setup, not copied per-repo. |
| `operation_setup_scaffold.md` | Birth tool | Operation birth skeleton. Kit-resident; read at setup, not copied per-repo. |

### Thinking aids

| File | Type | Purpose |
|---|---|---|
| `brainstorming_skill.md` | Skill | Two-phase structured-questioning discipline for refining rough ideas before drafting, planning, or deciding |

---

*Last updated: June 12, 2026 — v4.1 (post-v4.0 MINOR stamp. Workspace-scaffold build: added Step 8.5 — Part C now scaffolds the universal `workspace/` subfolders (each with its standing document — INDEX where a skill owns it, else README) on a propagated repo, so a folder never collapses to empty when a task finishes; closes the gap where pre-v4 repos never received the v4-added workspace homes. Earlier same day, worklist #1, Part C repair: added Step 2.5 declaration-backfill — Part C now implements the v4.0 manifest's gate off its own text; `pending_v2.X/` → version-generic `pending_vX.Y/` (4 sites); `AboutFolder.md` → `FOLDER_MAP.md` (or legacy `AboutFolder.md`) at 6 Part-B/Part-C sites — the dual form is deliberate, Parts B/C scan repos that predate the rename. Package version unchanged pending cycle close. Earlier June 12: v4 re-baseline — kit package version stamped v4.0 (v3.1 → v4.0, MAJOR; templates carry the kit version, the two-tracker exception — skills floor at v2.0.0). No content change in this stamp; the cycle's content is in the v4 build entries and the v4.0 re-baseline entry of `CHANGELOG.md`. Prior: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the missing `visuals_workflow_skill.md` Appendix row added (M4); Step 10 housekeeping scope `AboutFolder.md` → `FOLDER_MAP.md` (5 sites) and the two retired `MasterIndex.md` examples removed (A′-13, as re-scoped); the Appendix palette row gains the pptx preamble (A′-1); 'Meta and templates' named an Appendix-only inventory grouping against the canonical eight clusters (R3). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 retrofit-folder-bootstrap build: the Part-B folder bootstrap (the always-active confirmations bullet and Step 2b) rewritten from per-folder asking to unconditional creation of the universal `workspace/` subfolders defined in `structure_conventions.md`, with a reconcile proposal for existing same-job arrangements and the curated-home boundary stated; the **Deferred folders** CLAUDE.md subsection mechanism retired (legacy subsections resolve at the next Part C — see `project_tracker_skill.md`, Folder bootstrap protocol). The text now points at the universal set rather than enumerating it, ending the stale-list failure mode that fossilized the old two-folder list. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 10, 2026 — v2.0.0 (v4 translation-review build: added the `translation_review_skill.md` + `translation_corrections_log.md` companion pair to the Voice-and-style Files-to-copy block (with the propagation-reconcile note for the log), a Part-C per-skill question block (Spanish deliverables; existing corrections material to fold in at adoption), and two Appendix rows — the log row introduces the **Record** type value (a kit-shipped file that accumulates locally; neither Skill nor Code nor Asset fit). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 10, 2026 — v2.0.0 (v4 staging-intake-funnel build: the Appendix `structure_conventions.md` Convention row updated to the intake-funnel / root-as-accidental-staging framing — walk-caught rider; the row had described the import protocol and the old root-inbox rule, both generalized by this build. The kit-propagation `pending_v2.X/` staging in Part C is a different concept and is untouched. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 archetype_conventions build: added `skills/archetype_conventions.md` to the Repo-structure-and-archetype always-active group (between the floor conventions and the single-select spec; copied to every archetype repo, a NONE repo gets none) and a matching Appendix Convention row; refined the group header to "floor conventions to every repo, the archetype-common layer to archetype repos only, spec single-select"; updated the Part A scaffold step-2 convention-files pointer to include `archetype_conventions.md` for archetype repos and to note NONE has no archetype-common layer; reflected reading-order + the `_ex` rule in the Appendix `structure_conventions.md` row. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 cross-repo-import build: added `skills/cross_repo_import_skill.md` to the always-active Files-to-copy group (after `github_api_workflow_skill.md`) and to the Appendix Repo-and-session-infrastructure cluster. Universal/any-repo but trigger-fired, so it ships in the always-active group with no optional-cluster menu entry — the `github_api_workflow_skill.md` pattern. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 workspace-folders build: reconciled the Part-A scaffold step-2 universal-layer sentence to the canonical created-up-front workspace set — `claude_conversations/` (renamed from `conversations/`), `brainstorms/`, `to_do/`, `multisession_active_tasks/`, `staging/` (merged from `_import_staging/`), `branch_logs/` — and split off `agent_outputs/`/`visuals/` as archetype-scoped curated-skill homes a NONE repo does not get; renamed the five other full-path `workspace/conversations/` references to `workspace/claude_conversations/`; dropped the legacy `workspace/notes/` from the Part-C audit-scope confirm line. The Part-B/C per-folder bootstrap-ask is left as-is (retrofit behavior, distinct from birth-time scaffolding). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 carryover-rename build: the multisession_task artifact renamed **plan-doc → carryover** in the Files-to-copy note and the Appendix row — file `MULTISESSION_PLAN_` → `MULTISESSION_CARRYOVER_`, "plan-vs-prompt" → "carryover-vs-prompt"; "plan" reserved kit-wide for in-the-work approach-planning; Appendix row kept in sync with `CLAUDE_template.md`. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 multisession_task build: added `skills/multisession_task_skill.md` to the always-active Files-to-copy group (after `exploration_branch_skill.md`) and to the Appendix Repo-and-session-infrastructure cluster; the Part A scaffold step 2 now also creates the universal `workspace/multisession_active_tasks/` folder. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 universal-to-do build: added `to_do/` to the universal `workspace/` layer the Part A scaffold builds (step 2), so every repo is born with the universal action tracker defined in `structure_conventions.md`. Part of the universal-to-do atomic commit. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: renamed `branch_workflow_skill.md` references to `writing_branch_skill.md` (Part B files-to-copy + Appendix row) and added `exploration_branch_skill.md` to both the always-active files-to-copy list and the Appendix. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v4 Stage 1, sub-unit 1c: rewired Part A to the archetype system. Inserted Phase 3 (Archetype triage — `new_repo_setup.md` Steps 1–2: intent questions leaning on Q2/Q3, propose + STOP + confirm, capturing variant/stage and the named work-unit(s)); renumbered Skills Activation to Phase 4, now reading the confirmed archetype (single-select spec); deleted the old Phase 4 (Project Structure) — Q9 absorbed into the triage, Q10 dropped (inbound material is scaffolded + `workspace/_import_staging/`), Q11 relocated to Phase 5; replaced the post-questionnaire folder/starter-file lists with scaffold-the-confirmed-archetype + copy-curated-subset + cluster-conditional starter files (index definitions defer to the specs; skills layout defers to `structure_conventions.md`). Swept the stale “all-or-nothing per cluster” framing (Phase 4 lead-in + the Appendix curation row) and its paired “sequential ask” / “only cluster for per-skill drill-down” phrasing to the relaxed cluster-proposal/free-per-skill rule already in `skills_curation_skill.md`, naming the pre-v3.2 predecessor. Part B/C pre-archetype residue (`papers/`/`Drafts/`/`inputs/`, audit default scope, housekeeping) left for future work. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 5, 2026 — v4 Stage 1a: added the always-active **Repo structure and archetype** cluster — a files-to-copy block in Part B Step 2 (both convention files to every repo, the declared-type archetype spec single-select, NONE none; triage + scaffolds marked kit-resident, not copied per-repo) and the matching Appendix inventory entry (three specs, two conventions, four birth tools). Part A's flow is untouched here; reconciling it to the archetypes is sub-unit 1c. Prior: May 28, 2026 — v3.2 cycle, kit package version stamps at cycle close (materials-triage merge: `paper_processing_skill.md` references renamed to `materials_processing_skill.md` throughout; `MATERIALS_INDEX.md` added to the starter-files list; Source-material version-table sample updated to the v2.0.0 floor). Prior: v3.0 (added `skills_curation_skill.md` row to Appendix Repo and session infrastructure cluster as the cluster's second row, immediately after `skill_authoring_skill.md`; this closes the v2.1.13 wiring gap. Also added a Layout convention section to Part A Phase 3 codifying the flat vs. two-subfolder layout decision and the `KIT_FOLDER` parameter; the invariant — `LastSkillUpdate/` lives inside the active kit folder — is now documented. Path references throughout this document remain literal as `skills/...` for readability; substitution to `${KIT_FOLDER}/...` is mechanical where the two-subfolder layout applies. Prior: v2.1.15 (May 14, 2026): added `skill_authoring_skill.md` to the always-active group Files-to-copy list and to the Appendix Repo and session infrastructure cluster; this is the meta-skill for authoring new skills, promoted from `starter_package/how_to_write_a_skill.md`. v2.1.13 (May 14, 2026): Parts A/B/C rewritten with critical-eyes discipline — every "full-kit-by-default" sentence rewritten, Phase 3 cluster sub-tables in Part A cut in favor of pointing at `CLAUDE_template.md`, Q6 reframed from informational to curation-conversation opener, Part B Phase 2 restructured into two stages, Part C gains Step 3.5 (curation conversation), `branch_workflow_skill.md` and `skills_curation_skill.md` added to always-active group. v2.1.12 (May 13, 2026): Appendix restructured into clustered tables matching `CLAUDE_template.md`'s Skills section and the Phase 3 menu; v2.1.9 drift fixed — added missing entries for `andreas_palette.md`, `fmm_paper_latex_skill.md`, `academic_paper_preamble.tex`, `academic_slides_preamble.tex`, `fmm_coordination_slides_preamble.tex`; `agent_research_verification_skill.md` added to Source material cluster; `word_preamble.js` renamed to `fmm_word_preamble.js`. v2.1.10 rename history and v2.1.9 architecture preserved.).))*












