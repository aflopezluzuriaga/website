---
# Archetype declaration — set at setup (see PROJECT_SETUP Part A). Shared state,
# read by propagation (which archetype spec to keep/update) and the audit (what
# to check the repo against). Replace the bracketed values; keep the keys.
archetype:
  type:         "[research | coordination | operation | NONE]"
  variant:      "[research: single-paper|agenda · coordination: single-task|composition · operation: single-reform|matrix]"
  spec_version: "[archetype-spec version this repo was structured under, e.g. v2.0.0]"
# NONE repo: set type to NONE and DELETE the variant and spec_version lines —
# a NONE repo keeps no archetype spec, so it carries no spec-version.
---

# CLAUDE.md — [PROJECT_NAME]

<!-- 
  TEMPLATE INSTRUCTIONS (delete this block after filling in):
  
  1. Replace all [BRACKETED_PLACEHOLDERS] with project-specific values
  2. Delete any sections that don't apply to this project
  3. The Parking Lot section is for items you haven't decided yet — move them 
     into the appropriate section as you define them
  4. This template assumes skills/ lives in the repo. If skills are stored 
     elsewhere, adjust the paths in the Skills table.
  5. CLAUDE.md is a living document — update it as the project evolves.
  6. To set up a new project interactively, use PROJECT_SETUP.md 
     instead of filling this template manually. For existing repos that need 
     skill integration, use Part B of the same file.
  7. The archetype declaration in the YAML frontmatter (top of file) is set at 
     setup per PROJECT_SETUP Part A — pick the repo's type and variant, and the 
     spec-version it was structured under. For a NONE repo, set type to NONE and 
     delete the variant and spec_version lines. Semantics: structure_conventions.md.
-->

## Project Overview

[2–3 paragraphs describing the project: what it is, what problem it addresses, what the deliverables are. Include enough institutional context that someone (or Claude) reading this for the first time understands the setting.]

**Background documents:**
- [List key background documents in the repo with brief descriptions. These are inputs to the project — reports, terms of reference, prior work — not deliverables.]

**Project question:** [One sentence. This is used by the paper processing workflow to write relevance sections in summaries. Delete this line if the project doesn't involve papers.]

**Tone & scope guidelines:**
- [Key constraints on the deliverable's voice, scope, or framing. E.g., "Realistic but cautious assessment," "Avoid geopolitics," "Targets a broad policy audience." Delete if not needed.]

**Deliverables:**
- [List each deliverable with its audience]

**Language:** [Working language. Note if final products will be translated.]

## Collaborators

- **[Name]** — [role, repo access level]
- [Other collaborators and how they interact with the repo]

<!-- 
  Be specific about collaboration modes:
  - Who has direct repo access vs. who contributes through someone else
  - Who will interact with Claude directly on this repo
  - If only one person is on the repo, say so explicitly
  - How team member inputs are received (e.g., "through Andrea," "via shared folder")
-->

## Skills

Reusable skills are stored in `skills/`. These are cross-project tools — not specific to this project but referenced by this CLAUDE.md when relevant.

**Rule:** Read the relevant skill file before starting any task it covers. Do not rely on memory of the skill's contents from prior conversations.

Skills are grouped by functional cluster. Within each cluster, rows are ordered by dependency-flow (the skill at the top is the entry point; later rows are invoked by earlier ones, or are utility plumbing). When two clusters share a dependency, the relationship is noted in the relevant row's "Purpose" or "When to use" column.

### Source material: reading and processing

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/materials_processing_skill.md` | Materials triage — the single front door for filing incoming materials. Step 0 routes each item to one of three branches (document processing, academic-paper Protocol A, institutional-paper Protocol B); carries the paper-branch shared infrastructure (prerequisites, `papers/` folder structure, status framework, lookup) and the `MATERIALS_INDEX.md` single lookup | When any paper or operational/institutional document is provided to file or process; start here unless the branch is already obvious |
| `skills/paper_processing_academic_skill.md` | Paper processing — Protocol A (academic-style papers): renaming, text extraction, summary with thesis/methodology/findings/relevance, BibTeX `@article` or `@unpublished`, Claude status | Invoked from `materials_processing_skill.md` Step 0 when triage returns academic-style (paper has abstract, hypothesis, original estimates); use directly when protocol is already known |
| `skills/paper_processing_institutional_skill.md` | Paper processing — Protocol B (institutional-style reports): institutional renaming, text extraction with acronym/box preservation, synthesized-findings summary, BibTeX `@techreport`/`@book`/`@inbook`, Claude status | Invoked from `materials_processing_skill.md` Step 0 when triage returns institutional-style (G20/IMF/World Bank/OECD/UN/IDB synthesis or policy reports); use directly when protocol is already known |
| `skills/document_processing_skill.md` | Document branch of the materials triage — pipeline for operational/institutional documents (locate-in-place, rename, extract, summarize, classify, index, cross-reference) | Routed here from `materials_processing_skill.md` Step 0 when the material is a document (legislation, government reports, institutional documents, operational material); use directly when the document/paper call is obvious |
| `skills/agent_research_verification_skill.md` | Deep-research-agent workflow: prompt drafting (consulting LESSONS.md for known failure modes), filing raw output, extracting links, hand-off to papers protocol at Step 6, verification of agent claims against retrieved originals, INDEX.md tracker. **Core principle: agent outputs are NEVER directly citable — only the verification document is.** | When Andrea says "I'm going to run a deep dive," "let's draft a research prompt," "I have an agent output to file," "verify this dive," or references Claude Research / ChatGPT Deep Research / similar agent platforms |

### Writing and deliverables

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/writing_skill.md` | Writing workflow triage — routes to Protocol 1 (reading/note-taking) or Protocol 2 (drafting); shared content: how the two protocols interact, project-setup parameters | When a project involves reading source material or producing written deliverables — always read this first to triage before invoking a protocol skill |
| `skills/writing_notes_skill.md` | Writing workflow Protocol 1 — reading, thinking, and note-taking as one coupled operation; fully interactive (present material → user reacts → update notes → wait); always lives on `main` (no branching for notes) | Invoked from `writing_skill.md` when the active mode is thinking work: processing source material, taking notes, developing ideas |
| `skills/writing_drafting_skill.md` | Writing workflow Protocol 2 — drafting written content on a branch; plan interactively, draft in one pass, finalize with compiled outline + divergence table; includes 10k-word scale check, hierarchical naming for chapter/section drafts, and assembly cycles | Invoked from `writing_skill.md` when the active mode is drafting work: producing a section, chapter, policy note, report, or any substantial deliverable |
| `skills/visuals_workflow_skill.md` | Authoring visuals (figures, diagrams, charts) embedded inside a markdown deliverable bound for Word, PDF, or LaTeX. Three-stage workflow: sketch-plus-description in the markdown draft → review on the branch → SVG iteration post-merge with chat previews. Consumes `andreas_palette.md` for colors; does NOT cover the final SVG→PNG→format embed (that's the format skill) or whole-slide compositions (those are the slides skills) | When a markdown deliverable needs visuals that aren't markdown-native tables; triggers include "let's add visuals," "make a sketch for this," "we need a diagram here," "let's see the SVG" |
| `skills/email_drafting_skill.md` | Andrea's email voice and workflow | When drafting any email |

### Voice and style

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/andrea_writing_style_skill.md` | Academic writing voice | Only when explicitly asked to apply academic style |
| `skills/andrea_fmm_institutional_style_skill.md` | FMM institutional writing voice | Only when explicitly asked to apply institutional style |
| `skills/marta_writing_voice_skill.md` | Marta Ruiz-Arranz's writing voice for FMM knowledge products | When drafting content for Marta's signature or review |
| `skills/translation_review_skill.md` (+ companion `skills/translation_corrections_log.md`) | Spanish translation review — naturalness, not proofreading; Andrea's corrections captured to the companion log so first-pass Spanish improves over time | When translating any deliverable to Spanish, and at the review round of a translated branch |

### Final-production formats

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/fmm_docx_formatting_skill.md` | Word document formatting (colors, fonts, tables, headers) | When producing .docx files |
| `skills/fmm_word_preamble.js` | Executable docx-js preamble implementing the formatting skill (colors mirror `andreas_palette.md`) | When generating Word documents |
| `skills/fmm_paper_latex_skill.md` | FMM-styled LaTeX paper workflow (policy notes, institutional papers, FMM-branded standalone PDFs) | When setting up or editing an FMM-styled LaTeX document |
| `skills/fmm_paper_preamble.tex` | FMM LaTeX paper preamble (copy-paste template; colors mirror `andreas_palette.md`) | Used by `skills/fmm_paper_latex_skill.md` when generating FMM-styled LaTeX documents |
| `skills/academic_paper_latex_skill.md` | Academic paper LaTeX workflow (working papers, journal submissions) | When setting up or editing an academic paper in LaTeX |
| `skills/academic_paper_preamble.tex` | Academic LaTeX paper preamble (copy-paste template; Andrea's palette defined for figures/TikZ only — document chrome is academic) | Used by `skills/academic_paper_latex_skill.md` when generating academic LaTeX documents |
| `skills/academic_slides_skill.md` | Academic presentation slides workflow (Beamer/Boadilla, conference talks, seminars) | When creating or editing academic presentation slides |
| `skills/academic_slides_preamble.tex` | Academic Beamer slides preamble (copy-paste template; colors mirror `andreas_palette.md`) | Used by `skills/academic_slides_skill.md` |
| `skills/fmm_coordination_slides_latex_skill.md` | FMM coordination slides workflow (Beamer/LaTeX template, internal division presentations) | When creating or editing internal division slides in Beamer |
| `skills/fmm_coordination_slides_preamble.tex` | FMM coordination Beamer slides preamble (copy-paste template; colors mirror `andreas_palette.md`) | Used by `skills/fmm_coordination_slides_latex_skill.md` |
| `skills/fmm_coordination_slides_pptx_skill.md` | FMM coordination slides workflow (PowerPoint variant, internal division presentations) | When creating or editing internal division slides as a .pptx |
| `skills/fmm_coordination_slides_pptx_preamble.py` | FMM coordination PowerPoint chrome/helpers module (python-pptx; colors mirror `andreas_palette.md`) | Used by `skills/fmm_coordination_slides_pptx_skill.md` |
| `skills/KnowledgeLogo.png` | IDB logo for Word document footers and FMM LaTeX paper footers | Used by `skills/fmm_word_preamble.js` and `skills/fmm_paper_preamble.tex` |

### Shared assets

| Asset file | Purpose | When to use |
|---|---|---|
| `skills/andreas_palette.md` | Andrea's canonical color palette — names, hex/RGB, character notes, aesthetic principles. Mirrored by `fmm_word_preamble.js`, `fmm_coordination_slides_pptx_preamble.py`, and all `.tex` preamble files in **Final-production formats**; also invocable directly anywhere colors are needed. | Anytime colors are needed and Andrea hasn't named specific ones — applies to final-production formats, code-generated visualizations (Python/R/Stata plots, TikZ/pgfplots figures), and ad-hoc visuals (SVG diagrams, charts in chat, mental maps, slide accents) |

### Repo and session infrastructure

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/skill_authoring_skill.md` | The meta-skill: how to author a new skill that fits the kit's conventions. Covers (1) general principles and conventions of the kit (naming, frontmatter, decomposition, cluster structure, last-updated marker discipline), (2) when to write a skill, (3) what a skill file contains, (4) workflow for drafting with Claude, (5) the downstream lifecycle (sweep → consolidation → propagation). Every new skill is born project-local; the author's only structural decision at creation is project-specific (lives outside `skills/`) vs. generic-candidate (lives in `skills/`, logged in `skills/CHANGELOG.md` for next sweep). Cluster placement is a consolidation-time decision in SkillPropagation, not a creation-time decision | When Andrea says "let's write a skill for this," "I keep correcting Claude the same way — can we make a skill," "this needs a skill," "we should codify this," "how should I structure this skill," "draft a skill for X"; or when revising an existing skill substantively |
| `skills/skills_curation_skill.md` | The per-propagation per-cluster curation workflow. Codifies the cognitive contract (cluster-level proposal, free per-skill decision — no all-or-nothing rule; Final-production format-pairs are the natural sub-grain) and the cluster completeness invariant (an activated cluster's dependencies must be on the always-active group or in the same cluster). Used at all three propagation points (Part A new-repo setup, Part B existing-repo integration, Part C update propagation), with signal sources varying by point (questionnaire / existing-repo content / STATUS.md + commits + conversations — explicitly NOT current `skills/` folder contents) | At every propagation: when Andrea says "let's run the curation," "let's curate the skills for this repo," "propagate the kit update"; or implicitly whenever Part A / B / C workflows are entered |
| `skills/project_tracker_skill.md` | Defines `STATUS.md` as the repo's project-level tracker — session-start check (on Andrea's "yes"), session-close mandatory update, freshness audit against repo state, bootstrap, Pending re-integrations subsection for hierarchical-naming drift | Every session: at the start, ask Andrea if she wants to check STATUS.md; at session close (Andrea's "thanks," "good night," "we're done"), draft the update and commit |
| `skills/finish_session_skill.md` | Session close-out orchestrator — five-step sequence (uncommitted-work inventory → branch disposition → STATUS.md update → conditional conversation save → confirm close) that wires together `project_tracker_skill.md`, `repo_conversations_skill.md`, and `writing_branch_skill.md` in the right order | Every session close: when Andrea says "thanks," "good night," "we're done," "let's wrap up," or any close-out phrasing |
| `skills/writing_branch_skill.md` | Ephemeral, single-document review branch (bracketed comments + direct edits); invoked by `finish_session_skill.md` for branch disposition and by `writing_drafting_skill.md` for review cycles | Whenever a co-produced document is reviewed on a branch — merge to main at session close, or mid-session at Andrea's request |
| `skills/exploration_branch_skill.md` | Long-lived, isolated exploration branch — work whose purpose is to test whether a `main` claim holds (robustness check, alternative spec), merging as held/null, additive, or overturn via the finalize protocol; reached from `brainstorming_skill.md`'s purpose-triage or a folder→branch promotion | When an offshoot tests a `main` claim and must stay off `main` until resolved; finalize is a deliberate, direct act |
| `skills/multisession_task_skill.md` | The multi-session carryover — a per-task carryover doc (`workspace/multisession_active_tasks/MULTISESSION_CARRYOVER_<task_stem>.md`) carrying one task across the several sessions it takes to finish when resource limits (context, execution risk, fatigue) force the split. A two-question gate decides carryover-vs-prompt; the doc is a worklist-mimic — volatile resume-head over a stable objective / sequence / decisions body — folded into `STATUS.md` and deleted at completion. Distinct from `workspace/to_do/` (deferred intentions, not the task in hand) | When a task won't finish in one session and a resume prompt won't reliably carry it across the gap; when Andrea says "make a carryover" for a task |
| `skills/repo_conversations_skill.md` | Save, index, and retrieve substantive Claude↔Andrea conversations in a repo (transcript format, INDEX.md, tag vocabulary) | When Andrea explicitly asks to save the current conversation, when working through a topic over multiple sessions where finding the prior exchange matters, or proactively after a substantive multi-turn exchange that's worth a permanent record |
| `skills/housekeeping_skill.md` | Three-mode infrastructure check (audit / repair / index-audit) — verifies `CLAUDE.md`, `FOLDER_MAP.md` files, indexes, and cross-folder references against actual repo state; index-audit mode verifies index rows' live claims on the `INDEX_AUDIT_INTERVAL` cadence and stamps "Index audit last run" in `STATUS.md` | When Andrea says "audit the repo," "run a consistency check," "is `CLAUDE.md` still accurate?", "find orphaned files," or "run the index audit" (incl. picking up the overdue reminder) |
| `skills/github_api_workflow_skill.md` | GitHub REST API patterns when git push is blocked: Contents API for single-file work, Trees API for atomic multi-file commits | When the working environment blocks `git push` (sandbox egress restrictions, etc.) and repo writes must go through the REST API |
| `skills/cross_repo_import_skill.md` | Prompt-don't-perform workflow for importing already-processed material from another repo — reminds Andrea to scope the access token to both repos (the token is always hers; the skill never touches it), reads the named material into `workspace/staging/` via `github_api_workflow_skill.md`'s read helpers (read-only on the source), makes the keep/drop/what-must-come-too selection in staging *before* placement (the ghost-problem fix), then hands off to the repo's normal placement rules and empties staging. Staging home/lifecycle defined in `structure_conventions.md`; this skill owns the step-by-step | When material that lives in another repo needs to be brought in and placed here — "import X from repo Y," "bring in the material from [other repo]," "pull the processed files from [repo]"; not for the discovery sweep and not for exporting out |

### Repo structure and archetype

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/naming_conventions.md` | Universal naming rule — content `lowercase_underscore`, structural/organization `ALL_CAPS`; carry-safety rationale, the paper-stem/cite-key identity. Kept in every repo. | Before naming or renaming any file or folder |
| `skills/structure_conventions.md` | Universal structure layer (the floor) — root files + archetype declaration, `workspace/` + the intake funnel (`staging/`), the `FOLDER_MAP` convention, the governance rules, created-up-front vs born-on-creation, root-as-accidental-staging, reference-by-subject, reading-order, the `_ex` rule, skills layout. Kept in every repo (including NONE). | When creating or placing any folder or file |
| `skills/archetype_conventions.md` | Archetype-common layer — born-minimal promote-on-evidence, origin-based typing, the shared-spine / "one repo or two" test, by-subject keying, the archetype-fixed root skeleton, and the three-layer placement model. Kept in **every archetype repo** (research / coordination / operation); a NONE repo keeps none. | When structuring, placing, or typing files in an archetype repo |
| `skills/<archetype>_archetype_spec.md` | Full structure-and-index spec for this repo's declared archetype — the one of `research_archetype_spec.md` / `coordination_archetype_spec.md` / `operation_archetype_spec.md` matching the `type` declared in this CLAUDE.md. Kept **single-select** (one per repo); a NONE repo keeps none. The archetype audit checks the repo against it. | When structuring, placing, indexing, or auditing files against the repo's archetype |

<!--
  ARCHETYPE SPEC ROW: replace `<archetype>` with this repo's declared type
  (research / coordination / operation). Delete this row entirely if type = NONE.
  The two convention files above are kept in every repo and are NOT substituted.
  The triage (`new_repo_setup.md`) and the three `*_setup_scaffold.md` files are
  kit-resident birth tools, read from the kit at new-repo setup — they are NOT
  copied into this repo.
-->

### Thinking aids

| Skill file | Purpose | When to use |
|---|---|---|
| `skills/brainstorming_skill.md` | Two-phase structured-questioning discipline (Understanding → Exploration of 2–3 alternatives) for refining rough ideas before drafting, planning, or deciding; ends with optional save of a structured summary | When Andrea says "let's brainstorm," "I want to think through X," "help me refine this idea," or when the task is vague and the right deliverable isn't obvious yet |

<!-- 
  CUSTOMIZE THE SKILLS TABLE:
  - Delete rows for skills this project won't use
  - Add project-specific skills (not cross-project) in a separate table below
  - The "When to use" column is important — it tells Claude when to read the skill
-->

<!-- UNCOMMENT if this project has project-specific skills:
Project-specific skills (not cross-project):

| Skill file | Purpose | When to use |
|---|---|---|
| `[path/to/skill]` | [Description] | [Trigger] |
-->

## Paper Processing Workflow

<!-- DELETE this entire section if the project doesn't involve papers. -->

> **Generic skill:** `skills/materials_processing_skill.md` (triage), with Protocols A and B in `skills/paper_processing_academic_skill.md` and `skills/paper_processing_institutional_skill.md`. The section below is the project-specific implementation — it adds parameters and any conventions that go beyond the generic skills.

`skills/materials_processing_skill.md` is the single entry point for **both** papers and operational documents — its Step 0 routes papers to a protocol below and operational documents to the Document Processing Workflow further down. When a paper is provided to add to the repo's paper home, start there. Use these project-specific parameters:

- **PROJECT_QUESTION:** "[One sentence describing the project's research focus]"
- **CONDITIONAL_SECTION:** "[What subset of findings to extract when present. E.g., 'LAC-specific findings' or 'findings on AI tools in legal contexts.' Set to 'None' if no conditional section is needed.]"

The materials/papers index and the bibliography are **not named as parameters here** — the skill discovers them by reading the repo's `FOLDER_MAP`s at filing time and writes in the shape each already uses (a repo that tracks citability without a `.bib` simply has none to find). See `skills/materials_processing_skill.md`.

### Lookup protocol
When discussing a paper in conversation:
1. First check the repo's materials index (discovered from the `FOLDER_MAP`s) to locate it, then its paper-detail index row for quick reference
2. Then check the individual summary in `<paper-home>/summaries/`
3. Only go to full text in `<paper-home>/text/` if deeper detail is needed

### Summary format standard
All summaries in `<paper-home>/summaries/` follow this structure:

- **(a) What the paper argues** — Main thesis, research question, contribution. 3–5 sentences.
- **(b) Methodology & key findings** — Detailed and precise. Include subsections as appropriate: Data and sample (who, where, when, how many), Experimental design or Approach (for theoretical/review papers), Identification strategy (if empirical), Evaluation, Key results (with tables of effect sizes where available). The description must be specific enough to understand the methodology without reading the paper — not vague ("uses cross-country data") but detailed ("uses PIAAC microdata for 23 OECD countries, 2012–2015, linking Felten AIOE scores crosswalked to ISCO-08 to individual-level employment outcomes via OLS with occupation × country fixed effects").
- **(c) [Conditional — project-specific findings]** — Only include if CONDITIONAL_SECTION is defined above and the paper has matching data. Otherwise skip to (d).
- **(d) Relevance to [PROJECT_NAME]** — How this paper connects to the project. Design lessons, hypotheses, limitations for generalizability.

Summaries are a floor, not a ceiling — they grow as Andrea works through a paper (questions, cross-references, expanded methodology notes). Do not trim expanded summaries back to the minimal format.

### Flagging
If a paper contains content that seems especially relevant to the project, flag it to Andrea with a note on why she should read it in full.

### File naming convention
- PDFs: `Author_shortTitle_year.pdf` (e.g., `Acemoglu_simpleAI_2024.pdf`)
- Summaries: `SUMMARY_Author_shortTitle_year.md`
- Text extractions: `TEXT_Author_shortTitle_year.md`
- BibTeX cite keys: `Author_shortTitle_year`

## Document Processing Workflow

<!-- DELETE this entire section if the project doesn't involve operational/institutional documents. -->

> **Generic skill:** `skills/document_processing_skill.md` — the document branch of the materials triage. The single entry point is still `skills/materials_processing_skill.md` (Step 0 routes operational documents here). The section below is the project-specific implementation — it adds parameters and any conventions that go beyond the generic skill.

When an operational/institutional document is provided, follow the full protocol in `skills/document_processing_skill.md` — working in the folder where the document already lives by default — with these project-specific parameters:

- **Folder organization:** a document already placed somewhere is processed in place; one that arrives with no home is filed where the document skill proposes after reading the repo's `FOLDER_MAP`s (by source institution / theme / document type, per the repo's own structure — not a fixed `inputs/` tree).
- **Materials lookup:** the document skill locates the repo's materials index by reading the `FOLDER_MAP`s and writes in the shape it already uses — not named as a parameter here.

### Reliability labels

<!-- CUSTOMIZE: Define the labels that fit this project. Defaults: -->

| Label | Meaning |
|-------|---------|
| **Citable** | Published, final, authoritative |
| **Validated** | Internal or partner document, final, reviewed |
| **Under construction** | Active draft, directionally correct |
| **Working draft** | Early-stage, may have gaps |
| **Flagged — verify with Andrea** | Known issues, use only with confirmation |

### Confidentiality labels

<!-- CUSTOMIZE: Defaults: -->

| Tag | Meaning |
|-----|---------|
| `PUBLIC` | Publicly available |
| `INTERNAL` | Internal working document |
| `CONFIDENTIAL` | Restricted distribution |

### File naming convention
- Source files: `shortdescription_institution_monthyear.ext` (e.g., `budget_reform_mef_feb2026.pdf`)
- Text extractions: `TEXT_shortdescription_institution_monthyear.md`
- Summaries: `SUMMARY_shortdescription_institution_monthyear.md`

## Agent Research Workflow

<!-- DELETE this entire section if the project doesn't involve deep-research agent dives (Claude Research, ChatGPT Deep Research, similar). -->

> **Generic skill:** `skills/agent_research_verification_skill.md`. The section below is the project-specific implementation — it adds parameters and any conventions that go beyond the generic skill.

When Andrea runs a deep-research agent (Claude Research, ChatGPT Deep Research, or similar) to surface literature or evidence, follow the full protocol in `skills/agent_research_verification_skill.md`. **Core principle: agent outputs are never directly citable. Only the verification document — produced by cross-checking agent claims against retrieved originals — is citable.** The skill hands off to this project's papers protocol at Step 6 for retrieved originals.

Project-specific parameters:

- **AGENT_OUTPUTS_FOLDER:** `workspace/agent_outputs/` (default)
- **AGENT_OUTPUTS_INDEX:** `workspace/agent_outputs/INDEX.md` (default)
- **AGENT_OUTPUTS_LESSONS:** `workspace/agent_outputs/LESSONS.md` (default)
- **AGENT_OUTPUTS_SKIPS:** `workspace/agent_outputs/WORKFLOW_SKIPS.md` (default)
- **PAPERS_PROTOCOL_SKILL:** `materials_processing_skill.md` (default — adjust if this project uses a different papers-protocol entry point)

## Writing Protocol for Drafts

<!-- DELETE this section if the project doesn't involve drafting. -->

> **Generic skill:** Protocol 2 lives in `skills/writing_drafting_skill.md` (see `skills/writing_skill.md` for the parent triage). Read the full protocol before any drafting task. The key rules are repeated here for quick reference.

This protocol applies whenever Andrea asks Claude to draft new content (paper sections, policy notes, reports). Note-taking and other non-writing tasks follow their own protocols.

### Key rules

- **The workflow is: overall outline of the outline unit → detailed outline of next drafting unit → agree on length → draft on branch → review on branch → repeat until all drafting units are done → compile descriptive outline + divergence table → review outline → re-read draft → joint approval → merge → ask about branch deletion.** See `skills/writing_drafting_skill.md` for the full step-by-step.
- **Outlining means branching.** If you're building an outline (step 1 of Protocol 2), the work goes on a branch from that point onward — outline file, drafting-unit drafts, compiled outline, review machinery, all on the branch — per `skills/writing_branch_skill.md`. The branch is created when the outline is first saved (and after the scale check), not after the first drafting unit is drafted. Inline drafting (no branch) is for short writes that don't earn an outline step: emails, short talking points, brief messages, single-slide bullets.
- **The drafting unit is one level below the outline unit.** Outline unit = section → drafting unit = subsection. Outline unit = chapter → drafting unit = section. A Protocol 2 instance is scoped to one outline unit. Assembling completed outline units into a higher-level whole is a new Protocol 2 instance (an *assembly cycle*), not a continuation.
- **Scale check at outline approval.** Before creating the branch, Claude estimates the implied document length from the outline (drafting units × typical drafting-unit length, read from this project's drafting-unit sizing entry below or asked if not specified). If the estimate exceeds ~10,000 words / ~25 pages, Claude surfaces the estimate and suggests splitting the outline into smaller outline units. The decision is Andrea's; Claude does not split unilaterally. The flag is to keep Andrea disciplined about scope, not to block work. Assembly cycles suspend this check.
- **Drafts that are part of a larger hierarchical whole** (chapter, book) follow the hierarchical naming convention in the Naming Conventions section below. Every outline unit fits inside a known container (e.g., section work assumes a chapter outline exists, at least as a skeleton).
- **The planning steps are still interactive.** Do not skip the outline or jump to drafting. The outline work is where Andrea thinks through the project — it's not overhead, it's the point.
- **The drafting step is NOT interactive in regular cycles.** Claude produces the full drafting unit in one pass on the branch. This yields better prose (coherent flow, no repetition, consistent argument). **Named exception: assembly cycles** replace the one-pass draft with collaborative integration of pre-existing pieces.
- **Review happens on the branch**, not inline in chat. Andrea uses the bracketed-comments + direct-edits mechanics in `skills/writing_branch_skill.md`. Per-drafting-unit narration is not needed during drafting (see the Working Conventions show-before-committing exception); the branch provides the inspection affordance.
- **Document-level finalization before merge.** Once all drafting units are drafted and reviewed, Claude compiles a descriptive outline of the finished document plus a divergence table comparing it to the plan. Andrea reviews the outline first, then re-reads the draft for final adjustments. Both the outline and the draft are approved as a pair and merged together. The compiled outline ships in `main` as a companion artifact to the draft.
- **Outlines are living documents.** They get updated as writing reveals new structural needs. Always push updated outlines to the branch.

### Drafting-unit sizing

Typical drafting-unit length for this project: [SPECIFY — e.g., "1,500 words per subsection" or "policy-note paragraphs of ~300 words each." This is the input to the scale check. If not specified, Claude will ask at outline approval.]

## Protocol: Note-Taking from Reading

<!-- DELETE this section if the project doesn't involve structured reading. -->

> **Generic skill:** Protocol 1 lives in `skills/writing_notes_skill.md` (see `skills/writing_skill.md` for the parent triage). The section below is the project-specific implementation, including the tracking documents and conventions for this project.

When Andrea is reviewing papers and taking notes, follow this workflow:

### Documents maintained

<!-- 
  CUSTOMIZE: Define the specific tracking documents for this project.
  Common categories (not all projects need all of them):
  
  1. Master reading notes — one section per paper with status, key findings, 
     reactions, cross-paper connections
  2. Cross-paper parameter tracking — if the project tracks a framework across 
     papers (e.g., TFP decomposition parameters, effect sizes, cost estimates)
  3. Verification list — papers referenced by other papers that may be important 
     and need to be checked
  4. To-do list — forward-looking actions now live in the universal
     `workspace/to_do/` tracker (see `skills/structure_conventions.md`), not in a
     project-specific doc; list here only any *additional* project-specific tracker.
  5. Progress tracker — which papers have been reviewed, which summaries updated
  
  Define each document with its path and purpose. Example:
  
  1. `NotesFromReading/GeneralNotes.md` — Master reading notes. One section 
     per paper with: status, key findings, reactions, cross-paper connections.
  2. `NotesFromReading/ParameterTracking.md` — Cross-paper tracking for 
     [framework]. Add entries when a paper provides evidence on [parameters].
-->

[Define your tracking documents here]

### Step-by-step flow

1. **Present the summary** — Copy the summary file from `<paper-home>/summaries/` to outputs and present it as a rendered file in the side panel (not inline in chat). No need to look up the full text unless Andrea asks.
2. **Andrea gives notes** — She provides reactions, status labels, key takeaways, questions. Answer her questions. If she asks about methodology or specific details, look them up in `<paper-home>/text/`.
3. **Update the summary** if the conversation reveals new details worth preserving (e.g., methodology, country coverage, limitations discovered in the text).
4. **Update tracking documents** with her notes for that paper.
5. **Commit after each paper** — Commit all changed files to repo before moving to the next paper.
6. **Do not move to the next paper until Andrea explicitly says to move on.** Do not ask "Paper X?" or "Ready for the next one?" — wait for Andrea to indicate she is done with the current paper. Papers may require multiple rounds of discussion.

### Review-before-commit rule
Before committing any updates to tracking documents, show Andrea the proposed note inline in chat and wait for her go-ahead. Only commit after approval.

### Status labels

<!-- 
  CUSTOMIZE: Define the status labels for this project. Defaults:
-->

- **Must-read** — Core paper for the project
- **Read** — Andrea has read it, notes taken
- **No need to read** — Reviewed summary, not worth full read
- **Middle importance** — Worth reading but not urgent
- **Flagged** — Needs deeper review later
- Other labels as Andrea sees fit

### Conventions
- Do NOT look up full text automatically — only when Andrea asks
- Do NOT label papers as must-read unless Andrea says so
- Wait for Andrea's notes before writing anything to the documents
- If Andrea asks "show me my notes for X" — show the section from the master notes file
- If Andrea says "move to next" — commit pending changes first, then present the next summary
- Papers are reviewed in index order (1, 2, 3...) unless Andrea says otherwise
- When starting a new session, check the progress tracker and/or ask Andrea where we left off
- Cross-references between papers are encouraged — when a concept in one paper connects to another, note it in the summary or notes

## Writing Style Profiles

Three writing style profiles are available in `skills/`:

1. **`skills/andrea_writing_style_skill.md`** — Academic voice. For academic papers, working papers, and analytical documents where Andrea is the author.
2. **`skills/andrea_fmm_institutional_style_skill.md`** — FMM institutional voice. For policy notes, knowledge briefs, strategy documents, and division communications.
3. **`skills/marta_writing_voice_skill.md`** — Marta's voice. For content that Marta will sign, present, or publish (op-eds, blog posts, briefs, talking points).

A fourth pair rides the cluster: `skills/translation_review_skill.md` + `skills/translation_corrections_log.md` — not a voice profile but the Spanish-translation naturalness review the profiles' §14 hands off to.

### When to use
**Do not apply a writing style unless Andrea explicitly asks.** The styles are never applied by default. When Andrea asks to apply a style, follow the full instructions in the corresponding `.md` file — including the checklists, the "draft first, style second" principle, and the "do not infer — ask" rule.

### Marta's voice: two-pass rule
When Andrea asks to write in Marta's voice (or says "for Marta," "Marta's voice," or starts a task mentioning Marta in a writing context):

- **For substantial documents** (policy notes, blog posts longer than a few paragraphs, briefs, reports): always suggest applying Andrea's FMM Institutional voice first for structural discipline, then Marta's voice as a second pass. The institutional profile provides the argumentation and evidence grounding; Marta's voice adds the rhetorical layer (problem-solution sandwich, evidence stacking, reform optimism, rhetorical questions).
- **For small pieces** (LinkedIn posts, short talking points, a one-paragraph intro): Marta's voice alone is fine.

### Workflow when Andrea asks to apply a style
1. **Ask which style** — Academic, FMM Institutional, or Marta's voice.
2. **Run the pre-styling checklist** from the chosen style profile. Flag any issues before proceeding.
3. **Save the current plain version** — Before applying any style edits, save the current document as `[filename]_PLAIN.md` in the same directory. This is the unstyled backup.
4. **Apply the style** following all instructions in the corresponding profile.

## Document Format & Export Workflows

### Main working format: Markdown
Drafts are written in markdown since the final product goes to a designer and human editor.

<!-- 
  CUSTOMIZE: If this project uses a different primary format (e.g., LaTeX 
  from the start), change this section accordingly.
-->

### Final-production formats

Each format has a **skill** (workflow) and a **preamble** (formatting setup). The preamble files are copy-paste templates — at generation time, copy the preamble's contents into the top of the main file produced. Do NOT `\input{}` the LaTeX preambles or otherwise treat them as runtime includes. Word's `fmm_word_preamble.js` IS a runtime `require()`'d file.

| Format | Skill | Preamble |
|---|---|---|
| FMM-styled LaTeX paper (policy note, institutional paper) | `skills/fmm_paper_latex_skill.md` | `skills/fmm_paper_preamble.tex` |
| Academic LaTeX paper (working paper, journal submission) | `skills/academic_paper_latex_skill.md` | `skills/academic_paper_preamble.tex` |
| FMM-styled Word document (.docx) | `skills/fmm_docx_formatting_skill.md` | `skills/fmm_word_preamble.js` |
| Academic Beamer slides (conference, seminar) | `skills/academic_slides_skill.md` | `skills/academic_slides_preamble.tex` |
| FMM coordination Beamer slides (internal) | `skills/fmm_coordination_slides_latex_skill.md` | `skills/fmm_coordination_slides_preamble.tex` |
| FMM coordination PowerPoint slides (internal) | `skills/fmm_coordination_slides_pptx_skill.md` | `skills/fmm_coordination_slides_pptx_preamble.py` |

### Colors default to Andrea's palette

When colors are needed and Andrea hasn't specified otherwise — a code-generated chart, a TikZ diagram, an ad-hoc visualization, any visual element — **default to the palette in `skills/andreas_palette.md`**. The palette file holds the canonical color set, character notes, and Andrea's aesthetic principles (blues for dominant areas, muted tones for large surfaces, black axes). Consult it before reaching for matplotlib defaults or picking colors arbitrarily.

### Atomic-commit color-sweep protocol

When Andrea asks to **add a new color**, **change an existing color**, or **modify the palette in any way**, do the following in one atomic commit via the Git Trees API (see `skills/github_api_workflow_skill.md`):

1. Update `skills/andreas_palette.md` — the canonical source.
2. Update `skills/fmm_paper_preamble.tex` (`\definecolor` block + version stamp).
3. Update `skills/fmm_word_preamble.js` (`COLORS` object + version stamp).
4. Update `skills/academic_paper_preamble.tex` (`\definecolor` block).
5. Update `skills/academic_slides_preamble.tex` (`\definecolor` block).
6. Update `skills/fmm_coordination_slides_preamble.tex` (`\definecolor` block).
7. Update `skills/fmm_coordination_slides_pptx_preamble.py` (`COLORS` dict + version stamp).

Never update only one file. The whole set lands together or none of it lands. This discipline is why the palette has a single canonical home and explicit sync headers in every consuming file.

If a color change also affects role assignments documented in the format skills (e.g., "Heading 1 = PrimaryBlue" in `fmm_docx_formatting_skill.md`), include those skill files in the same commit. Run the palette-consistency audit in `skills/housekeeping_skill.md` afterward to verify the sweep landed cleanly.

## Naming Conventions

> The universal casing rule lives in `skills/naming_conventions.md` (content
> `lowercase_underscore`; structural files — the index family, `FOLDER_MAP`,
> `STATUS` — `ALL_CAPS`), and the folder model in `skills/structure_conventions.md`.
> Academic papers and institutional documents are named by their own pipelines
> (the Paper and Document Processing sections above), which take precedence. This
> section covers the project-level conventions on top: how your own drafts are
> versioned, and how inputs received from colleagues are filed.

### Versioning your own drafts and deliverables

Files you produce — drafts, deliverables, working documents.

**Current version:** one file with a descriptive name, no version number — always
the current version. Keep a markdown mirror (`.md`) alongside any binary
deliverable for diffing on GitHub. (For slide decks, the markdown mirror is the
`_text.md` file — see the slide skills.)

**Attribution, not person-names.** Don't put a person's name in your own
deliverable filenames or folders; attribution lives in the folder's
`FOLDER_MAP.md`, the version log, or commit messages. (Colleague-input files are
the one exception — they encode the contributor; see below.)

**Archive convention:** before a major revision, copy the current file into
`archive/` with a version number appended, then overwrite the main file with the
new version. `archive/` is append-only.

```
project_folder/
  FOLDER_MAP.md
  policy_note_vat.docx        ← always current
  policy_note_vat.md          ← markdown mirror of current
  archive/
    policy_note_vat_v01.docx
    policy_note_vat_v02.docx
```

**Version log:** track what each archived version represents in the folder's
`FOLDER_MAP.md` — one line per version:

```
## Version log
- v01: Initial draft (2026-03-25)
- v02: After Yarygina comments on methodology (2026-04-02)
- v03: Submitted to division chief (2026-04-10)
- Current: Incorporating division chief feedback (in progress)
```

**What counts as a major revision:** structural changes, incorporating a round of
feedback, new sections, major rewrites, or anything you flag as major. Routine
edits (typos, small rewording, adding a paragraph) don't need an archive snapshot
— git history covers those.

**Dates in filenames:** use them only for inputs received from colleagues (below)
or when the date is meaningful content (a dataset snapshot). Don't date your own
drafts for version tracking — use the version-number / archive system instead.

### Hierarchical naming for multi-part drafts

When a draft is part of a larger hierarchical whole (a chapter of a book, a
section of a chapter), the filename encodes its position (`A_chapter_…`,
`A1_section_…`, `A1a_subsection_…`, with `_OUTLINE` companions). That scheme — and
when a subsection earns its own file — is owned by
`skills/writing_drafting_skill.md`; see there. Drift between an assembled chapter
and a later-edited section is tracked in `STATUS.md`'s "Pending re-integrations"
subsection (`skills/project_tracker_skill.md`).

### Inputs from colleagues

Files received from team members that aren't academic papers or institutional
documents — revised drafts with comments, feedback, data files, presentations,
reference material.

**Storage:** each project folder that receives them keeps an `inputs_from_team/`
subfolder. Files go here in their original format, unmodified.

**Naming:** `description_firstinitiallastname_yyyy-mm-dd.ext`
- `description` — brief lowercase description (e.g., `comments_section3`,
  `revised_budget_table`)
- `firstinitiallastname` — contributor's first initial + last name, lowercase, no
  separator (e.g., `ayarygina`, `mcalijuri`)
- `yyyy-mm-dd` — date received
- Examples: `comments_section3_ayarygina_2026-04-02.docx`,
  `data_update_mcalijuri_2026-04-05.xlsx`

**Why dates here but not for your own drafts?** Inputs from colleagues are
snapshots — received once, they don't evolve in your repo, so the date marks when
you got it. Your own drafts evolve, so the archive + version-log system fits them
better.

### A worked project folder

A typical deliverable folder with the conventions applied:

```
project_folder/
  FOLDER_MAP.md                          ← version log, metadata, status
  deliverable_name.docx                  ← always the current version
  deliverable_name.md                    ← markdown mirror for GitHub diffs
  archive/
    deliverable_name_v01.docx
    deliverable_name_v02.docx
  inputs_from_team/
    comments_intro_ayarygina_2026-04-02.docx
    revised_tables_mcalijuri_2026-04-05.xlsx
```

## Working Conventions

- **Trackers are the source of truth, not past chats.** `CLAUDE.md`, `FOLDER_MAP.md` files, and any project-level status doc are the canonical record of where work was left off — they're in the repo, version-controlled, and Andrea reads the same text Claude does. Past Claude↔Andrea chats can drift, are invisible to Andrea, and can't be audited. Do not call `conversation_search` or `recent_chats` as part of session start; read the trackers instead. If Andrea references prior work ("last time we decided X"), verify against the trackers before responding. Only search past chats when Andrea explicitly asks for a conversation that isn't in the repo records. **Saved conversations in `workspace/claude_conversations/` are retrievable artifacts, not the resumption mechanism** — they're inputs for analytical work, not where to look for "where did we leave off."
- **STATUS.md is the project tracker — session-start check on Andrea's "yes," session-close mandatory update.** At session start, before doing anything else, ask Andrea: *"Do you want me to check STATUS.md?"* If yes, follow `skills/project_tracker_skill.md`'s session-start check protocol (read, run the freshness audit — tracked-locations + commits activity, plus the lightweight structure- and stage-drift peeks against the declared archetype — propose updates if drift is found, summarize, then proceed). If no, proceed directly with Andrea's request. At session close (Andrea says "thanks," "good night," "we're done," or similar), STATUS.md *must* be updated — draft the changes, show Andrea, commit clean if she reviews or commit with `unreviewed` flag if she doesn't have time; the close-out also reminds Andrea if the repo's index audit is overdue (per `INDEX_AUDIT_INTERVAL`, default 30 days). Mandatory, not optional. See `skills/project_tracker_skill.md` for the full protocol. The session-close sequence — uncommitted-work check, branch disposition, STATUS.md update, conditional conversation save — is orchestrated by `skills/finish_session_skill.md`; the STATUS.md update is Step 3 of that sequence.
- **Check placement before creating a folder — and when Andrea points to a new one.** When a new folder is needed, first describe its purpose in plain terms, read that against the repo's current `FOLDER_MAP`s and indexes, and decide which case it is: a *new instance of an existing task* (it goes under that task, in the instance shape that task already uses), a *new task* (it gets its own home, corpus, and index section), or *genuinely new structure* (propose the best place for it). Ask only the questions that change where the folder goes — not more — then propose the home and write the folder's `FOLDER_MAP`. **The first time Andrea points to a folder that isn't in the maps,** treat it as one she created herself: ask what it's for, run the same placement check (is this where it belongs? does it duplicate something that already exists?), then write its `FOLDER_MAP` and register it — surfacing an unregistered folder on first reference is the session-start check in `skills/project_tracker_skill.md`. **If a folder was already created in a rush** (either path) and looks mis-placed or duplicative, flag it but do not move it; if Andrea defers, record the pending move in `STATUS.md`'s **Pending placement fixes** subsection (per `skills/project_tracker_skill.md`), which re-surfaces open entries at session start and session close until the move is made. Nothing is blocked; the move just waits, recorded.
- **Check the indexes before processing, producing, or asking — and stage new material first.** Anything new to the repo — a file Andrea drops in, imported material, branch content — enters through `workspace/staging/`, with no placement decision at drop time; placement out of staging runs the intake check in `skills/structure_conventions.md`. Before working, run the **lightning check** — an identity skim plus a grep of the repo's indexes by topic/title; ten seconds, always, even rushed — at four moments: **using a staged file**, **about to produce** (a summary, an extraction, a visual, a section), **about to ask** Andrea for an input the repo might already hold, and (subsumed in the full check) at placement. Route by what's being made, reading whatever maps and typed indexes this repo carries: *source-material work* → the materials/papers indexes (`MATERIALS_INDEX` first, then `PAPERS_INDEX`/`DEEPDIVES_INDEX` where carried) — **point, don't rebuild**: a hit means work from the processed form, never re-process. *Visuals and assets* → `ASSETS_INDEX` — **always tell Andrea** about a hit or near-hit; adapting an existing image is often faster than making a new one, and adapt-vs-rebuild is her call. *Written deliverables* → `OUTPUTS_INDEX`, read `index → outline → draft`. A near-hit (an earlier version) means use the new informed by the existing summary. Index layer only — no tree scan; prompt-don't-perform.
- **Iterative workflow:** Andrea provides information in stages. Do not jump ahead or produce output without a go-ahead. For writing tasks, follow the Writing Protocol above.
- **Don't infer — ask.** If you're missing information you need to act correctly — what file Andrea means, what audience the deliverable is for, what counts as "done," which language to draft in — ask. A confident output based on wrong assumptions is worse than a quick clarifying question. Andrea prefers a one-round-trip clarification to an undo. Exception: when the gap is small enough that you can state your assumption inline and Andrea can correct it cheaply ("I'll assume you mean the Spanish version unless you'd rather the English — let me know"). Inferring silently is the failure mode.
- **Show before committing.** Before any write to the repo or production deliverable, briefly state what you're about to write and why, in prose, before the actual write tool call. Andrea can interject before the write lands. For most routine writes (a paragraph in a draft, a one-line index update) a one-sentence narration is sufficient. The scripted confirmation gates that appear in specific skills (consolidation commits, branch merges, file deletions) are the emphatic cases — where the cost of a wrong write is high enough that you should also pause and wait for confirmation. **Named exception: on a feature branch (per `skills/writing_branch_skill.md`), writes to the branch don't need per-write narration — the branch itself is the show-before-committing mechanism, since Andrea sees every commit on the branch before it merges to `main`.** The emphatic gate moves to the merge step.
- **Codify after the third repetition.** If Andrea asks for the same type of task three or more times — in one session, or across sessions if you can see it in `CLAUDE.md` or a status doc — check whether the pattern should be promoted to a rule. Three codification homes: `CLAUDE.md`'s Working Conventions (if the rule applies project-wide, every session), a repo-specific task skill under `skills/` or as a project-local `Generic skill / project-specific implementation` block (if it's a reusable workflow), or a status doc (if it's a project-specific decision that doesn't generalize). The threshold of three is sharp on purpose: codifying after the first ask is premature; codifying after the fifth means Andrea has been repeating herself.
- **CLAUDE.md is a living document.** Update it as the project evolves.
- **"Uploaded" / "pushed" = GitHub repo.** When Andrea says she uploaded or pushed something, she means to this project's GitHub repo. When she asks to check what she uploaded, look at the repo.
- **Skills stay in `skills/`.** Do not duplicate skill content into CLAUDE.md — reference the skill file and read it when needed. The inline protocol sections above are project-specific implementations; the generic versions live in `skills/`.
- **Repo file listing:** The Repository Structure section below points to the repo's archetype spec and each folder's `FOLDER_MAP.md` for folders and their purpose, not individual files. When you need to know what files exist in a folder, query the repo live via the GitHub API — do not rely on memory or a cached listing.

<!-- 
  CUSTOMIZE: Add project-specific conventions here. Examples from past projects:
  - Tone/scope constraints on deliverables
  - How team member inputs are stored (inputs_from_team/ convention)
  - Special commit procedures
-->

## Repository Structure

This repo's folder model and index set are defined by its **archetype spec** — the one of `research_archetype_spec.md` / `coordination_archetype_spec.md` / `operation_archetype_spec.md` that matches the `type` in the archetype declaration at the top of this file — over the **archetype-common layer** (`skills/archetype_conventions.md`) and the universal floor (`skills/structure_conventions.md`). The repo was scaffolded at setup from the matching `<archetype>_setup_scaffold.md` (folders + index set + a `FOLDER_MAP.md` in every content folder). A **NONE** repo has only the universal floor (`skills/structure_conventions.md`: root files + `workspace/` + `skills/`) plus a bespoke skeleton — no archetype-common layer, no spec, no archetype folders.

To see what exists and where things live, read the live structure rather than a copy kept here:

- **What the folders are and how they're organized** → the repo's archetype spec (folder model), `skills/archetype_conventions.md` (the archetype-common layer), and `skills/structure_conventions.md` (the universal floor: root files, `workspace/`, the import protocol, skills layout, the `FOLDER_MAP` convention).
- **What's inside any given folder** → that folder's `FOLDER_MAP.md`, the authoritative distributed index for its own contents. Root-level lookups (`MATERIALS_INDEX`, `PAPERS_INDEX`, the archetype's other indexes) are thin pointers, not second copies.
- **What files are physically present** → query the repo live via the GitHub API; don't rely on memory or a cached listing.

The freshness audit in `skills/project_tracker_skill.md` runs a lightweight skeleton peek against the archetype spec at session start — flagging the obvious (a folder the spec expects but the repo lacks, or one off the skeleton) and routing to `housekeeping`'s Check 12 for the full picture — so the structure stays honest without a hand-maintained table here.

*(This section was a concrete folder/file table with a "Used by" dependency column through v3.x; v4 sub-unit 1c replaced it with this pointer — the distributed `FOLDER_MAP` model plus the archetype spec are the authoritative structure reference, and a mirrored table here would only go stale as a born-minimal repo grows.)*


---

*Last updated: June 12, 2026 — v4.1 (post-v4.0 MINOR stamp — Part C self-containment (Steps 2.5, 8.5) + the workspace standing-document convention; additive, no renames. Prior: June 12, 2026 — v4.0 (v4 re-baseline — kit package version stamped v4.0 (v3.1 → v4.0, MAJOR; templates carry the kit version, the two-tracker exception — skills floor at v2.0.0). No content change in this stamp; the cycle's content is in the v4 build entries and the v4.0 re-baseline entry of `CHANGELOG.md`. Prior: June 11, 2026 — v2.0.0 (v4 final-pass fix build: R1 — the legacy Naming Conventions block fully rewritten (general casing → pointer at `naming_conventions.md`; hierarchical naming → pointer at `writing_drafting_skill.md`; the archive/version-log and inputs-from-colleagues conventions kept and rewritten in current vocabulary — `archive/`, `inputs_from_team/`, `FOLDER_MAP.md` version log — with the example tree rebuilt; closes the deferred 1f template-prose pass for this block); the Paper/Document/Note-Taking mirror sections made index-name-agnostic like their skills (A′-2/3/4 — retired BIB_FILE/PAPERS_INDEX/MATERIALS_INDEX params dropped, the hardcoded `papers/` tree → `<paper-home>/`, folder organization → FOLDER_MAP discovery); the retired `MasterIndex.md` MASTER_INDEX param line dropped (M1); `AGENT_OUTPUTS_SKIPS` added to the Agent-Research mirror (A′-5); the Working-Conventions trackers bullet `AboutFolder.md` → `FOLDER_MAP.md` (A′-7); the color-sweep protocol gains step 7 and the palette Skills-table row gains `fmm_coordination_slides_pptx_preamble.py` (A′-1); this file's Skills section stands as the canonical eight-cluster roster (R3). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 translation-review build: added the `skills/translation_review_skill.md` (+ companion `skills/translation_corrections_log.md`) row to the Voice and style Skills cluster after Marta's voice row, and one rides-the-cluster line to the Writing Style Profiles section — the pair is not a fourth profile; it is the Spanish naturalness review the profiles' §14 hands off to. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 10, 2026 — v2.0.0 (v4 staging-intake-funnel build: added the intake-funnel / lightning-check Working-Conventions bullet, sibling to the folder-creation placement check — anything new to the repo enters `workspace/staging/` with no placement decision at drop time; the lightning check (identity skim + index grep, ten seconds, always-run) fires at four moments (use-from-staging, about-to-produce, about-to-ask, subsumed at placement), type-routed to the materials/assets/outputs indexes reading whatever the repo carries, point-don't-rebuild, prompt-don't-perform. The `structure_conventions.md` Skills-table row description updated to the intake-funnel / root-as-accidental-staging framing and its trigger column extended to files. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 10, 2026 — v2.0.0 (v4 content-staleness build: the `skills/audit_repo_skill.md` Skills-table row updated from "Two-mode (audit / repair)" to the three modes — the new index-audit mode (live-claim verification on the `INDEX_AUDIT_INTERVAL` cadence + the `STATUS.md` write-back stamp) — with the "run the index audit" trigger added; rider caught in the same row: the stale `AboutFolder.md` token → `FOLDER_MAP.md` (pre-existing 1e-rename residue in deferred template prose). The Working-Conventions close clause needs no edit — it names the overdue reminder, which is unchanged-true, and delegates the close-out to `project_tracker_skill.md`, which inherits the new index-entry refresh. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 archetype_conventions build: added the `skills/archetype_conventions.md` row to the Repo-and-archetype Skills cluster, between `structure_conventions.md` and the spec row — kept in every archetype repo, NONE none; reflected reading-order and the `_ex` rule in the `structure_conventions.md` row; rewrote the Repository Structure section to the three-layer framing (archetype spec over `archetype_conventions.md` over the universal floor; a NONE repo = floor only + bespoke skeleton, no archetype-common layer, no spec). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 9, 2026 — v2.0.0 (v4 cross-repo-import build: added the `skills/cross_repo_import_skill.md` row to the always-active Repo-and-session-infrastructure cluster, immediately after `github_api_workflow_skill.md` (the skill it leans on); matching entries added to `PROJECT_SETUP.md`'s always-active Files-to-copy group and the Appendix. The skill is universal/any-repo but fires only on an import trigger — the same always-active-but-triggered pattern as `github_api_workflow_skill.md`, so no optional-cluster menu entry. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 carryover-rename build: the `skills/multisession_task_skill.md` row's artifact renamed **plan-doc → carryover** (file `MULTISESSION_PLAN_` → `MULTISESSION_CARRYOVER_`), gate phrasing "plan-vs-prompt" → "carryover-vs-prompt", trigger "make the plan" → "make a carryover". The word "plan" is now reserved kit-wide for in-the-work approach-planning, so the blessed writing/brainstorming "plan" uses in this file are untouched; kept in sync with `PROJECT_SETUP.md`'s Appendix row. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 multisession_task build: added the `skills/multisession_task_skill.md` row to the always-active Repo-and-session-infrastructure cluster, immediately after `exploration_branch_skill.md`; matching entries added to `PROJECT_SETUP.md`'s Phase 3 menu, the always-active Files-to-copy group, and the Appendix. Stamped at the v2.0.0 floor; final v4 stamp at cycle close.) Prior: June 8, 2026 — v2.0.0 (v4 universal-to-do build: minimal touch to the legacy "Documents maintained" CUSTOMIZE block — the "To-do list" bullet now points at the universal `workspace/to_do/` tracker (`structure_conventions.md`) rather than describing a project-specific to-do doc, since forward-looking actions are now a universal construct. (The pre-archetype CamelCase block that note deferred to a 1f pass was rewritten in the June-11 final-pass fix build — R1; that deferral is closed.) Part of the universal-to-do atomic commit. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: renamed `branch_workflow_skill.md` references to `writing_branch_skill.md` (four inline refs + the Skills-table row, refined to the ephemeral single-document framing) and added the `exploration_branch_skill.md` row to the always-active Repo-and-session-infrastructure cluster. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 7, 2026 — v4 cycle, finish_session extension family slice 1: named the new structure- and stage-drift peeks in the freshness-audit Working-Conventions clause, added the session-close overdue-index-audit reminder (keyed to the new `INDEX_AUDIT_INTERVAL` param, default 30 days), and reconciled the Repository-Structure line that over-claimed the freshness audit's archetype conformance — it now states the cheap-peek-routes-to-Check-12 behavior accurately. Companion edits this commit: `project_tracker_skill.md` (the two passes + the cadence read) and `STATUS_template.md` (the new **Index audit** record). Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v4 cycle, folder-move close-out read: re-pointed the deferred-move record from an informal "to-do at the end of `STATUS.md`, surfaced by `finish_session_skill.md`'s close-out" to a defined **Pending placement fixes** subsection owned by `skills/project_tracker_skill.md` (sibling to Pending re-integrations, inside Current state), re-surfaced at both session start and session close. The owner of `STATUS.md` now defines the slot rather than this convention reaching in to name a location; close surfacing rides `finish_session_skill.md` Step 3's delegation to the project-tracker close-out protocol, so no `finish_session` edit is needed, and start surfacing co-locates with the unregistered-folder catch. Completes the build-pending close-out read flagged in the prior entry. Companion edits this commit: `project_tracker_skill.md` (new subsection + start/close surfacing) and `STATUS_template.md` (parallel empty subsection). Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v4 cycle, folder-creation placement check: added a Working-Conventions bullet requiring a placement check before any folder is created (describe the folder → read against the repo's current `FOLDER_MAP`s/indexes → instance-of-existing-task / new-task / genuinely-new triage → propose home + write the folder's `FOLDER_MAP`), plus the first-reference catch for a folder Andrea created outside a session (run the same check and register it; surfacing the unregistered folder is `project_tracker_skill.md`'s session-start check) and the rushed-override (flag, do not move, record the pending move as a to-do at the end of `STATUS.md` so `finish_session_skill.md`'s close-out re-surfaces it next session). Closes the entry-side anti-duplication/placement gap from the AdmWorkFMM index diagnostic. Behavioral convention only; its `finish_session` close-out read is build-pending. Naming-section structure-prose (`Drafts/`/`Archive/`/`AboutFolder.md`) deliberately untouched — rides the deferred 1f / writing-placement passes. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v4 Stage 1, sub-unit 1c: replaced the concrete Repository Structure table (folder/file rows + the “Used by” dependency column) with a pointer to the repo's archetype spec, `structure_conventions.md`, and each folder's `FOLDER_MAP.md` — the distributed-index model plus the archetype spec are the authoritative structure reference, and a mirrored table would only go stale as a born-minimal repo grows; the dependency view is recoverable from the spec + active clusters + the freshness audit. Updated the working-conventions “Repo file listing” bullet that pointed at the removed table. Swept the stale “all-or-nothing per cluster” phrasing in the `skills_curation_skill.md` row to the relaxed cluster-proposal/free-per-skill rule. The Naming-section banner and the remaining template structure-prose (Naming/Document-Format vocabulary, hierarchical-draft naming, Drafts/Archive model) are untouched — they ride a later template structure-prose pass (1f) and the writing/placement redesign that owns them. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v4 Stage 1, sub-unit 1d: added the archetype declaration (`type` / `variant` / `spec-version`) as YAML frontmatter at the top of the file — the line propagation (which archetype spec to keep/update) and the archetype audit (what to check against) will read. Semantics per `structure_conventions.md`; a NONE repo declares `type: NONE` only and carries no `variant`/`spec-version`. Surface form is Option A (frontmatter, machine-first), reusing the kit's frontmatter-as-machine-metadata pattern and the Tier 1 YAML-parse check. Declaration only — the template's structure-prose reconciliation (the 1a Naming banner, Repository Structure table, Drafts/Archive model, hierarchical-draft naming) is re-homed to later sub-units per v4 planning (table → 1c; Drafts/Archive model → writing/placement redesign; residue → provisional 1f). Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: May 28, 2026 — v3.2 cycle, kit package version stamps at cycle close (materials-triage merge: the `materials_processing_skill.md` Skills-table row rewritten to the single-front-door / three-branch description; `document_processing_skill.md` row reframed as the document branch; `MATERIALS_INDEX.md` added to the Folder/File table and to both the Paper and Document workflow sections; lookup protocol now checks `MATERIALS_INDEX.md` first). Prior: v3.0 (added `skills_curation_skill.md` row to Repo and session infrastructure cluster as the cluster's second row, immediately after `skill_authoring_skill.md`; this closes the v2.1.13 wiring gap where the skill had been added to `PROJECT_SETUP.md`'s always-active group Files-to-copy list but not to the cluster tables in `CLAUDE_template.md` or the `PROJECT_SETUP.md` Appendix. Prior: v2.1.15 (May 14, 2026): added `skill_authoring_skill.md` row to Repo and session infrastructure cluster as the cluster's first row; this is the meta-skill for authoring new skills, promoted from `starter_package/how_to_write_a_skill.md`. v2.1.13 (May 14, 2026): `branch_workflow_skill.md` moved from Writing and deliverables cluster to Repo and session infrastructure cluster to honor the cluster completeness invariant — `finish_session_skill.md` (always-active) Step 2 invokes it as a required action. v2.1.12 (May 13, 2026): Skills table restructured into seven functional clusters — Source material / Writing and deliverables / Voice and style / Final-production formats / Shared assets / Repo and session infrastructure / Thinking aids; new Agent Research Workflow section + agent_research_verification_skill.md wired in; `workspace/agent_outputs/` and its INDEX.md/LESSONS.md added to Repository Structure; `word_preamble.js` renamed to `fmm_word_preamble.js` for naming-convention consistency with the other format preambles. v2.1.10 rename history and v2.1.9 architecture preserved.).)))*















