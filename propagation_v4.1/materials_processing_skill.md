---
name: materials-processing
description: "Triage for everything that comes into a repo to be filed and summarized — academic papers, working papers, multilateral or government institutional reports, policy documents, AND operational/institutional documents (legislation, government memos, terms of reference, draft policies, consultant deliverables, budget documents). The single entry point: runs Step 0 to route each item to one of three branches — document processing via document_processing_skill.md, academic-paper Protocol A via paper_processing_academic_skill.md, or institutional-paper Protocol B via paper_processing_institutional_skill.md. Use whenever a user uploads a PDF/DOCX and asks to process it, file it, or add it to the repo. Does NOT handle note-taking, reading reviews, or discussion of materials after processing — those are separate workflows."
---

# Materials Processing Skill (triage)

This skill is the **single front door** for filing incoming materials into a
repo's library, plus the **shared infrastructure** for the paper branches. It
runs one Step 0 triage with a three-way outcome, then routes the item to the
branch that handles it. Nothing is processed here directly — the per-item
pipelines live in three sibling skills:

- **`document_processing_skill.md`** — the **document branch**: operational and
  institutional documents (legislation, government reports, terms of reference,
  consultant deliverables, budget and program documents, operational material).
- **`paper_processing_academic_skill.md`** — **Protocol A** for academic-style
  papers.
- **`paper_processing_institutional_skill.md`** — **Protocol B** for
  institutional-style reports.

This skill carries the content shared across the two **paper** branches
(prerequisites, the paper-branch artifacts and their placement rule, the
status framework vocabulary, the lookup protocol, and paper-branch
configuration) plus the repo-level **materials index** that catalogs everything
regardless of branch.
The document branch is self-contained: `document_processing_skill.md` carries
its own folder model, reliability/confidentiality labels, and indexing.

## When to use this skill

- A user uploads a PDF or DOCX and asks to file it, process it, or add it to the
  repo — whether it's a paper or an operational document.
- A user asks to reprocess or update an existing entry and the branch isn't
  already obvious.

If you already know the branch (e.g., the user said "process this paper" or
"file this piece of legislation"), you may go straight to the relevant branch
skill — but when in any doubt, run Step 0 here first. The triage is cheap and
getting the branch wrong means redoing the filename, summary, and index work.

## Scope: one triage, three branches

Step 0 makes two cuts in sequence:

1. **Document or paper?** Is this an operational/institutional *document* (a
   legal instrument, an operational deliverable, a program or budget document —
   something that is *used* or *acted on*), or a *paper* (a research or
   analytical work destined for the citation library — something that *argues*
   or *synthesizes*)?
2. **If a paper: academic-style or institutional-style?** The three diagnostic
   questions below split Protocol A from Protocol B.

> **Why the boundary lives here now.** Earlier kit versions adjudicated the
> document-vs-paper call in two places at once — `document_processing_skill.md`'s
> "what this is NOT" section and the paper triage's scope section — which let
> the two drift apart. The materials triage replaces that split: the
> document-vs-paper boundary is decided here, in one place, and the branches
> assume the routing decision has already been made.

---

## Prerequisites (paper branches)

These configure the **paper** branches. The document branch defines its own
prerequisites in `document_processing_skill.md`. Before using the paper branches
in a project, the project's CLAUDE.md should define:

1. **`PROJECT_QUESTION`** — A one-sentence description of the project's research
   question or focus (e.g., "How AI affects tax systems in Latin America and the
   Caribbean"). Used to write the relevance section of each paper summary.
2. **`CONDITIONAL_SECTION`** *(optional)* — A filter for a conditional section in
   summaries. Define what subset of findings to extract when present (e.g.,
   "LAC-specific findings"). If not defined, summaries skip section (c).
The paper-detail index, the bibliography, and the materials index are **not**
configured by name here. A paper touches three of the repo's existing homes —
its paper-detail index, its bibliography (when the repo keeps one), and its
materials index — and the skill finds each by reading the repo's `FOLDER_MAP`s
at filing time, never by a hardcoded filename (see the two sections below). A
repo that tracks citability some other way (e.g. a reliability tag instead of a
bibliography) has no bibliography to find — the skill skips that step rather than
creating one.

If `PROJECT_QUESTION` is not yet defined when the user asks to process a paper,
ask the user to provide it before proceeding.

---

## Paper-branch artifacts and their placement

Each processed paper produces three artifacts:
- the renamed PDF (`Author_shortTitle_year.pdf` / `institution_shortTitle_year.pdf` — see Cut 2),
- a text extraction `TEXT_<filename>.md`, in a `text/` subfolder of the paper's home,
- a summary `SUMMARY_<filename>.md`, in a `summaries/` subfolder of the paper's home.

The `text/` and `summaries/` subfolders and the `TEXT_`/`SUMMARY_` naming are the
paper pipeline's own within-folder convention — they sit inside whatever folder
holds papers in this repo.

**Placement is suggested and confirmed, not assumed.** This skill does not own
where papers live and never hardcodes a folder. At filing time, read the repo's
`FOLDER_MAP.md` files — the per-folder purpose index every repo carries
regardless of archetype — propose the home they indicate, and **confirm with the
user before filing.** Repo types place intake differently (a research repo keeps
literature in its shared layer; other types use their own intake folders);
reading the `FOLDER_MAP`s keeps this skill blind to the archetype while still
landing the paper in the right place. Do **not** scan the raw folder tree to
guess (archetype knowledge through the back door), do **not** read the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime (that would make this skill archetype-aware), and do **not** file
without the user's confirmation. If the maps are thin or empty in a new repo, the
suggestion degrades to "root, or wherever papers have been going" — still ask,
never silently hardcode.

The detail and lookup homes a paper touches — the repo's paper-detail index, its
bibliography (when it keeps one), and the repo-level materials index (next
section) — already exist in the repo, created at repo setup in the shape that
repo uses. This skill finds each by reading the repo's `FOLDER_MAP`s, adds to
them in the shape they already have, and never names a file or reads the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime. A repo that has no bibliography (citability tracked another way)
simply skips that step.

The document branch uses its own folder model and indexing; see
`document_processing_skill.md`.

---

## Materials index — the single lookup

Every processed item — paper or document — gets one row in the repo's materials
index, the repo-level lookup located by reading the `FOLDER_MAP`s: **the one
place Claude checks first to locate any material, so a lookup doesn't require
scanning the repo.**

This skill does **not** define the index's structure or its name. The materials
index already exists in the repo, created at repo setup in the shape that repo's
type uses, and it is self-documenting. **Locate it via the `FOLDER_MAP`s, follow
the shape it already has, and add the item's row in that shape** — do not impose a fixed schema from here. (In
a research repo, for instance, the index is sectioned by research line and points
to the detail indexes; this skill does not need to know that — it conforms to
what the index in front of it does.)

The one constant across repo types: the materials index is a **pointer-level
lookup, not a second copy of the detail.** The richer, type-specific metadata
lives in the detail indexes — the repo's paper-detail index for papers (bib
entry, reading status, summary links); the document library's own indexes for
documents (reliability, confidentiality) — which the materials-index row points
to.

Each branch adds the item's row to the materials index as part of its indexing
step (paper branches: alongside the paper-detail index update; document branch:
alongside its own folder-index update).

---

## Step 0 — Triage

When a user provides a material and asks to file or process it, **always start
with Step 0** unless the branch is already unambiguous.

### Cut 1 — document or paper?

Ask: is this something that is *used or acted on* (an operational/institutional
document), or something that *argues or synthesizes* (a paper for the citation
library)?

- **Document** → route to `document_processing_skill.md`. Typical: legislation,
  regulations, government memos, terms of reference, draft policies, consultant
  deliverables tied to one project, budget documents, loan/program documents,
  operational material. Rule of thumb: if it would *not* get a BibTeX entry and
  has no analytical thesis of its own, it's a document.
- **Paper** → continue to Cut 2. Typical: journal articles, working papers,
  dissertations, and institutional analytical/synthesis reports — anything with
  authors (individual or institutional), a thesis or synthesized position, and a
  place in a citation library.

**The genuinely fuzzy zone is institutional report vs. operational institutional
document** — both can come from the same publisher. The discriminator is what
the item *does*, not who published it:

- A World Bank / IMF / OECD **flagship or analytical report** that synthesizes
  evidence or positions a policy framework → **paper**, Protocol B.
- A World Bank **loan or program document**, an operational annex, a country
  ToR → **document**, the document branch.

For borderline calls, exercise judgment and flag the call to the user in the
conversation.

### Cut 2 — academic-style or institutional-style? (papers only)

Open the document and answer three quick questions:

1. Does it have an **abstract** (vs. an *executive summary*)?
2. Does it pose a **research question or hypothesis**?
3. Does it report **new estimates the authors produced from data they analyzed**
   (rather than synthesizing others' findings)?

- **Two or more "yes"** → **Protocol A** (academic-style). Read and follow
  `paper_processing_academic_skill.md`.
- **Two or more "no"** → **Protocol B** (institutional-style). Read and follow
  `paper_processing_institutional_skill.md`.

Common borderline cases:
- Multilateral working papers with abstracts and methods sections but heavy
  policy framing — usually Protocol A.
- Institutional monographs with chapter-level empirical work — usually Protocol
  B at the document level (the value is the synthesis).
- Country case studies with descriptive but not causal analysis — usually
  Protocol B.
- IDB Discussion Papers, Technical Notes, and Working Papers — most have
  research-paper structure and are Protocol A; monographs and synthesis pieces
  are Protocol B. Triage on structure, not on the publisher.

The paper pipeline is identical across protocols. What differs:

| Step | Protocol A | Protocol B |
|---|---|---|
| Filename | `Author_shortTitle_year.pdf` (individual author) | `institution_shortTitle_year.pdf` (institutional author) |
| Summary section (a) | Thesis, research question, contribution | Purpose, commissioning context, position |
| Summary section (b) | Data, sample, identification, effect sizes | Document type, frameworks/databases, headline findings, policy framework |
| Summary section (d) | Standard "relevance" framing | Same plus "what position does this represent" + cross-references |
| BibTeX entry type | `@article` / `@unpublished` | `@techreport` / `@book` / `@inbook` |

---

## Status framework — Tracking (canonical, applies to both paper protocols)

This is the canonical Status framework for the paper branches. Both protocol
skills set the Claude status as their final step and refer back to this table
for the label vocabulary. (The document branch uses its own reliability and
confidentiality labels, defined in `document_processing_skill.md`.)

The paper-detail index serves as the single tracking file for papers. Each paper
entry includes two status columns:

| Column | Set by | When | Purpose |
|---|---|---|---|
| **Claude status** | Claude | At processing time (Step 6 of either protocol) | Claude's reading recommendation |
| **User status** | The user | When they review/confirm | The user's own assessment |

**Claude status values:**

| Claude Status | Meaning |
|---|---|
| **Recommend full read** | Core to the project — the user should read this in full |
| **Recommend skim** | Useful but not central — reading the summary is probably enough, a skim of key sections would add value |
| **Summary sufficient** | Peripheral or tangential — the summary captures what the project needs |
| **Flagged — [reason]** | Something noteworthy that doesn't fit the above (e.g., "Flagged — methodological template for our estimation," "Flagged — contradicts Paper X") |

When setting "Recommend full read" or "Flagged," also tell the user *in the
conversation* why — don't just set the label silently.

**User status labels** — These are defaults; each project can customize:

| User Status | Meaning |
|---|---|
| **Must-read** | Core paper, user has read or will read in full |
| **Read** | User has read it, notes taken |
| **No need to read** | Reviewed summary, not worth a full read |
| **Middle importance** | Worth reading but not urgent |
| **Flagged** | Needs deeper review later |

The user may use other labels as they see fit. Claude never sets the user status
— only the user does. If the user provides a status label during conversation,
update the index accordingly.

**Index table format example:**

```markdown
| # | Paper | Claude Status | User Status | Links |
|---|-------|--------------|-------------|-------|
| 1 | Acemoglu et al. (2024). "The Simple Macroeconomics of AI." | Recommend full read | Must-read | [PDF](<paper-home>/Acemoglu_simpleAI_2024.pdf) · [Text](<paper-home>/text/TEXT_Acemoglu_simpleAI_2024.md) · [Summary](<paper-home>/summaries/SUMMARY_Acemoglu_simpleAI_2024.md) |
| 2 | IMF (2025). "G20 Background Note on Revenue Administration." | Recommend full read | | [PDF](<paper-home>/imf_g20RevenueAdmin_2025.pdf) · [Text](<paper-home>/text/TEXT_imf_g20RevenueAdmin_2025.md) · [Summary](<paper-home>/summaries/SUMMARY_imf_g20RevenueAdmin_2025.md) |
```

The detailed summary for each paper follows below its row (or in a separate
section of the index, depending on project preference).

---

## Lookup Protocol

When discussing a material in conversation, check Claude's indexes before
scanning the repo:

1. **Check the materials index first** — the repo's single lookup (located via
   the `FOLDER_MAP`s); it tells you what the item is, where it lives, and where
   its detail is.
2. **Check the detailed entry** — the paper-detail index row and the individual
   summary in the paper's `summaries/` subfolder for papers; the document's
   folder index and
   summary for documents.
3. **Go to the full text** only if deeper detail is needed.

Do not read full text by default — only when the user asks or when a specific
question requires it.

---

## Configuring the paper branches in a repo

Repo structure — the intake folders and the materials/detail indexes — is
created at repo setup by the archetype scaffold, **not here.** This skill does
not create intake folders, index files, or any folders. What it needs in place before
the paper branches run is the paper-branch configuration in the project's
CLAUDE.md:

1. Ensure `PROJECT_QUESTION` is defined (and `CONDITIONAL_SECTION`, if the repo
   uses one). The paper-detail index, the bibliography, and the materials index
   are **not** named here — the skill finds each by reading the repo's
   `FOLDER_MAP`s at filing time. If `PROJECT_QUESTION` is missing when a paper is
   to be processed, ask the user.
2. Ensure the project's CLAUDE.md references this triage skill plus whichever
   branch skills the project uses.

With those in place, process and file items via Step 0 and the branches, placing
each into the repo's existing structure per the placement rule above (read the
`FOLDER_MAP`s, suggest, confirm).

If a repo predates the v4 archetype scaffolding and lacks the intake structure or
the materials index, that is a setup/migration gap — flag it to the user rather
than hand-creating a structure that may not match the repo's archetype.

---

## Edge Cases (triage-level)

These are edge cases for the triage decision itself. Edge cases specific to
running a branch live in that branch's skill file.

- **Operational document that also reports original analysis** (e.g., a program
  evaluation): if the analytical contribution is the point and it would earn a
  BibTeX entry, treat as a paper (usually Protocol B); if it's an operational
  deliverable that happens to contain analysis, treat as a document. Flag the
  call.
- **Working papers without journal**: Triage as Protocol A if the paper has
  academic structure (abstract, hypothesis, methods, results); as Protocol B if
  it's a synthesis or position paper.
- **Papers or documents with no clear year**: Ask the user.
- **Non-English materials**: The triage applies on structure. Text extraction
  and summarization happen in the project's working language (ask if unclear).
- **Borderline triage**: When a cut is genuinely ambiguous, flag it to the user
  and proceed with your best judgment.

---

## Composition with other skills

- **`document_processing_skill.md`** — the document branch. Invoked from Step 0
  Cut 1 when the material is an operational/institutional document.
- **`paper_processing_academic_skill.md`** — Protocol A. Invoked from Step 0
  Cut 2 when triage returns academic-style.
- **`paper_processing_institutional_skill.md`** — Protocol B. Invoked from Step 0
  Cut 2 when triage returns institutional-style.
- **`project_tracker_skill.md`** — the repo's materials index, paper-detail
  index, and the document branch's folder index are in the freshness-audit's
  `TRACKED_LOCATIONS`.
  Updates from this skill and the branch skills are picked up by the
  session-start audit.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the archetype-blind rule broadened from 'never read an archetype spec at runtime' to the whole archetype layer incl. `archetype_conventions.md` (W1, two sites — the logged Tier-2 ride from the archetype_conventions review). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 6, 2026 — v2.0.0 floor (v4 bin-1 index slice, completion-frame step 3, **index-name-agnostic re-edit**): removed every hardcoded index/bibliography name from this skill and its two paper branches' shared infrastructure. The skill no longer names `MATERIALS_INDEX`, `PAPERS_INDEX`, or `references.bib` — it locates the repo's materials index, paper-detail index, and bibliography by reading the `FOLDER_MAP`s at filing time and writes in the shape each already uses, never reading an archetype spec at runtime. Same operation gap the document/agent units closed: operation spec §5 routes the paper path through these skills, and operation carries none of those named files (citability is a reliability tag, not a bib entry), so a literal read on a v4-scaffolded operation repo would flag a false gap or hand-create drift. `BIB_FILE`/`PAPERS_INDEX` are dropped as named config values (PROJECT_QUESTION and the optional CONDITIONAL_SECTION remain); the bibliography step is conditional — a repo that tracks citability another way has none to find and skips it. The status-framework example table's illustrative `papers/` link paths were neutralized to `<paper-home>/` (placement residue from the prior unit). Placement, index-shape-conformance, Step 0 triage, the paper pipeline, and the status framework vocabulary are otherwise unchanged from the prior step-3 unit; the deeper reliability-tag-as-citability model reconciliation stays deferred (the line the document/agent units held). Kit-wide marker reset and final package version land at the v4 re-baseline.*

*Previously: June 6, 2026 — v2.0.0 floor (v4 bin-1 index slice, completion-frame step 3): made the skill archetype-blind on placement and indexing. Paper placement is now read from the repo's `FOLDER_MAP`s, suggested, and **confirmed with the user before filing** — the hardcoded root `papers/` home is retired (the `text/`/`summaries/` within-folder pipeline and `TEXT_`/`SUMMARY_` naming are kept; spec §12 retention endorses the PDF+extraction+summary triplet). The materials-index section no longer prescribes a flat type-keyed schema — the skill conforms to the repo's existing materials index, whose shape is set at repo setup by the archetype scaffold — and the "index relationships under review / treat as flat" note is removed, now false against the v4 archetype specs that define the per-type index set. Structure-creating steps dropped from setup (the scaffold owns repo birth); a pre-v4-repo fallback (flag the gap, don't hand-create) added. Replaces the v3.2 hardcoded-`papers/`-plus-flat-index model. Step 0 triage, the paper pipeline, and the status framework are unchanged; the deeper index-axis redesign (topic/task keying, push-vs-pull) stays the separate AdmWorkFMM track, untouched here. Kit-wide marker reset and final package version land at the v4 re-baseline.*

*Previously: May 28, 2026 — v2.0.0 (v3.2 materials-triage merge: renamed from `paper_processing_skill.md` and broadened from a paper-only triage into the single front door for all incoming materials. Step 0 now makes two cuts — document-vs-paper, then academic-vs-institutional — routing to `document_processing_skill.md` (document branch) or the two paper protocols. The document-vs-paper boundary, previously split between this triage's scope section and `document_processing_skill.md`'s "what this is NOT," is consolidated here. Added the `MATERIALS_INDEX.md` single-lookup concept (deliberately minimal; index-system relationships deferred to the kit's index-system revision). Paper-branch shared infrastructure — Prerequisites, `papers/` Folder Structure, Status framework, Lookup — retained from the prior triage. **The rename is a deliberate v4 exception to the kit's naming-stability principle** (which kept umbrella triage names stable at v2.1.7 and v2.1.8 to avoid content-repo rename cascades): a v4 re-baseline re-propagates the whole kit, so the reference cascade rides along; content-repo CLAUDE.md and starter_package updates are deferred to v4 propagation. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: `paper_processing_skill.md` v3.0 (v2.1.7 split — triage-only after extracting Protocols A and B); previously `paper_processing.md` v2.0, renamed for the `_skill.md` convention.)*

