---
name: document-processing
description: "The document branch of materials processing. Use when a user provides a non-academic, operational/institutional document — legislation, institutional reports, government memos, terms of reference, draft policies, consultant deliverables, budget or program documents — and wants it filed and summarized. Reached from materials_processing_skill.md's Step 0 (Cut 1) when the material is a document rather than a paper; also use directly when the document/paper call is already obvious. Triggers include: uploading a PDF or DOCX and asking to 'process this,' 'add this,' 'file this document,' or 'I put it in [folder], process it.' Handles text extraction, summarization, folder-level indexing, repo-level materials indexing, and cross-referencing — working in the folder where the document already lives by default. Does NOT triage document-vs-paper (that is materials_processing_skill.md's job), handle academic or institutional papers (the paper protocols do), note-taking, or discussion of documents after processing."
---

# Document Processing Skill

A reusable workflow for building and maintaining a structured library of operational and institutional documents across projects. Handles the full pipeline from uploaded document to indexed, summarized, classified, and cross-referenced entry.

## When to Use

- A user provides a document (PDF, DOCX, or other) and asks to add it to the project's document library
- A user asks to reprocess or update an existing document entry

## The document branch of materials processing

This skill is the **document branch** of the materials triage. The
document-vs-paper decision is made upstream in `materials_processing_skill.md`
(Step 0, Cut 1); by the time you are here, that call has been made and the
material is an operational/institutional document — legislation, government
reports, institutional strategies, draft memos, consultant deliverables, terms
of reference, budget documents, reform proposals, multilateral program
documents, and similar.

The other branches build a **citation library** (author-centric, BibTeX,
methodology summaries) via the paper protocols. This branch builds an
**operational knowledge base** (source-centric, reliability-classified,
cross-referenced, feeding into drafting). Both register their output in the
repo's single repo-level materials index.

You don't re-litigate the routing here. If you reached this skill directly and
the material turns out to argue or synthesize like a paper (authors, a thesis, a
methodology section, would earn a BibTeX entry), go back to
`materials_processing_skill.md` Step 0 — the boundary criteria live there now.

> **Predecessor.** Earlier kit versions adjudicated the document-vs-paper
> boundary in two places — a "what this is NOT" section here and the paper
> triage's scope section. The v3.2 materials-triage merge moved that decision
> into `materials_processing_skill.md`; this section no longer carries the
> discriminator, only the routing assumption.

---

## Prerequisites

Before using this skill in a project, the project's CLAUDE.md should define:

1. **Where the document lives** — Documents are heterogeneous and arrive in different places, so location is a per-document decision, not a fixed setup detail. The common case is that the user has *already put the document somewhere* and is telling you to process it ("I put it in `[folder]`, process it"). When that's the case, **work in place**: the document stays where it is, its `extracts/` and `summaries/` subfolders are created alongside it if absent, and its path is recorded in the indexes. When a document arrives with no obvious home, **read the repo's `FOLDER_MAP`s, suggest a home, and confirm with the user before filing** — never infer or hardcode a location, and never read the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime. See Step 0 below.

2. **File naming convention** — How source files are renamed. Default convention:
   ```
   shortdescription_institution_monthyear.ext
   ```
   Rules:
   - All lowercase, underscores instead of spaces
   - Short description: 2–4 words, no articles or prepositions
   - Institution: abbreviated (e.g., `imf`, `wb`, `mef`, `idb`)
   - Month-year: three-letter month + four-digit year (e.g., `feb2026`). If only the year is known, use just the year
   - Extension: source files keep their original extension; extractions use `.md`

3. **Derived file prefixes:**
   - `TEXT_` — raw text extractions, stored in `extracts/`
   - `SUMMARY_` — document summaries, stored in `summaries/`

4. **Reliability labels** *(project-specific — see below)*
5. **Confidentiality labels** *(project-specific — see below)*

If these are not yet defined when the user asks to process a document, ask the user to provide them — or note them as pending and proceed with the extraction and summary steps. Labels can be assigned retroactively.

---

## Reliability Labels

Every document in the library is assigned a reliability label. The label determines how the document can be used during drafting and analysis.

**These labels are project-specific.** Each project defines labels that fit its context. During project setup, ask the user what labels make sense — or defer until the first document arrives and define them then.

### Default labels (adapt to project)

| Label | Meaning | Usage rules |
|-------|---------|-------------|
| **Citable** | Published, final, authoritative. Numbers and statements can be cited directly. | Use as-is. Cite institution + date. |
| **Validated** | Internal or partner document, final version, reviewed. Content is reliable but may not be public. | Use for substance and numbers, but check confidentiality before citing externally. |
| **Under construction** | Draft being actively worked on. Content is directionally correct but may change. | Use for ideas and structure. Verify specific numbers before citing. Note which version/date you used. |
| **Working draft** | Early-stage internal draft. May contain gaps, placeholders, or unverified content. | Use cautiously for orientation only. Do not cite numbers or specific claims without independent verification from a higher-category source. |
| **Flagged — verify with [user]** | Document has known errors or outdated sections, but may contain useful content. | Never use without explicit confirmation from the user. Show the specific content you want to use and ask. |

### Using reliability labels in practice

1. **Check the label first.** Before using any document, look up its reliability label.
2. **Citable and Validated:** Use freely. For Validated documents, check confidentiality before citing in external-facing materials.
3. **Under construction:** Use for ideas and structure. Flag specific numbers as needing verification. Always record the version or date you read.
4. **Working draft:** Orientation only. Do not cite specific numbers or claims without confirming against a higher-category source.
5. **Flagged:** Always ask the user before using anything from a flagged document.
6. **Conflicts between sources:** Prefer the higher-category source. If both are the same category, flag the discrepancy and ask the user.
7. **Logging inputs:** When recording inputs in notes or drafts, always include the document name, folder path, and reliability label.

---

## Confidentiality Labels

Every document summary includes a confidentiality tag. These determine what can be shared in external-facing materials.

### Default labels (adapt to project)

| Tag | Meaning |
|-----|---------|
| `PUBLIC` | Publicly available document (e.g., published reports, legislation, press releases) |
| `INTERNAL` | Internal working document, not for external circulation |
| `CONFIDENTIAL` | Marked "For Official Use Only" or equivalent; restricted distribution |

Apply the most restrictive classification that matches the document's markings or context. When in doubt, classify as `INTERNAL`.

---

## Folder Structure

A document lives wherever the repo's `FOLDER_MAP`s place it — there is no fixed `inputs/` tree this skill imposes. Whatever the containing folder, the document's derived files sit beside it:

```
[containing folder]/          ◄── located per the repo's FOLDER_MAPs (Step 0)
├── FOLDER_MAP.md             the folder-level index and document registry
├── [source files]
├── extracts/
│   └── TEXT_filename.md
└── summaries/
    └── SUMMARY_filename.md
```

Each containing folder carries a `FOLDER_MAP.md` that serves as the folder-level index and document registry. The repo-level materials index — the single lookup that makes documents findable across folders — is the repo's own (discovered, not named here; see Step 5).

---

## Processing Workflow

When a user provides a document and asks to process it:

### Step 0 — Locate the document's home

Resolve *where the document lives* before doing anything else, because for
documents this is the genuinely variable decision (papers always go to
`papers/`; documents don't).

- **If the user already placed it** ("I dropped it in `[folder]`," "process the
  file in `[folder]`," or it's plainly sitting in a task or source folder) →
  **work in place there.** Create that folder's `extracts/` and `summaries/`
  subfolders if they don't exist. Do not relocate the document to match any
  convention.
- **If there's no obvious home** → read the repo's `FOLDER_MAP`s, **suggest** a
  home that fits the existing structure, and **confirm with the user before
  filing.** Never infer or hardcode a location; never read the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime.

Whichever applies, the document's actual path is what gets recorded in
`FOLDER_MAP.md` and the repo-level materials index — so the item is findable
wherever it sits.

### Step 1 — Rename using the project's convention

Rename the file following the project's naming convention. If the naming is ambiguous (e.g., no clear date, uncertain institution), ask the user before proceeding.

### Step 2 — Text extraction

- **For PDFs:** Attempt text extraction with PyMuPDF (`fitz`). If fewer than 100 words are extracted, classify the file as **SCANNED PDF** and note it in `FOLDER_MAP.md` and the repo-level materials index. Do not attempt OCR — flag it to the user for manual review.
- **For DOCX files:** Extract text including table cells (not just paragraph text — many institutional documents use tables). Use `python-docx` with table iteration.
- **For large files (>1MB on GitHub):** Use the GitHub blob API (`/git/blobs/{sha}`) rather than the contents API, which truncates files over 1MB.
- Save the extraction as `TEXT_filename.md` in the folder's `extracts/` subfolder. The filename must match the source file's name (under the naming convention), with the `TEXT_` prefix and `.md` extension.

### Step 3 — Document summary

Write a summary and save it as `SUMMARY_filename.md` in the folder's `summaries/` subfolder. Follow this structure:

**Header block:**
- **Source file:** Reference to the source filename
- **Confidentiality:** The appropriate tag
- **Reliability:** The appropriate label
- **File metadata:** File type, extraction status, word count, author (if known), date
- **Document description:** One sentence on what the document is

**Body — mirror the original document's structure:**
- The summary must follow the same section and subsection structure as the original document. Use the original headings (translated to the project's working language if needed). Do not reorganize, merge, or skip sections.
- Every section in the original gets a corresponding section in the summary — even if the content seems minor. The reader should see that everything was covered.
- Each section's summary should be comprehensive enough that the reader gets a solid grasp of what the section says without opening the source. Include: key arguments, specific data points (numbers, percentages, dates, names), policy positions, recommendations, and any caveats or qualifications the authors make.
- Do not filter for project relevance or infer what the reader might want. Summarize what the document actually says, completely and neutrally. Project relevance notes can be added at the end of each section as a separate clearly-marked paragraph, but they must not replace or shorten the substantive summary.

**Footer:**
- **Template value** (if applicable): For reference documents from other contexts (e.g., a DPL from another country, a reform law from a peer), note what structural or design lesson the document offers for the current project. Example: "This DPL's fiscal rule design — escape clause with automatic return to adjustment path — is a useful template for structuring the fiscal pillar of the IDB PBL."
- **Cross-references:** Links to related documents in other folders.
- **Glossary of acronyms** (if the document introduces terms not already defined in other summaries).

#### Worked example — summary structure

```markdown
# Summary — [filename].pdf

**Source file:** `[folder]/[filename].pdf`
**Confidentiality:** `[PUBLIC / INTERNAL / CONFIDENTIAL]`
**Reliability:** `[label]`
**Type:** [file type — e.g., PDF — World Bank Program Document]
**Extraction status:** [Full text extractable / Scanned — flagged for manual review]
**Word count:** ~[N]
**Author:** [institution or person]
**Date:** [month year]

---

## Document Description

[One paragraph: what the document is, its scope, key structural features.]

---

## [Section heading from original document] (¶1–N)

**[Subsection topic] (¶1):** [Summary with specific data points — percentages,
dollar amounts, dates, institutional names. Not vague.]

**[Subsection topic] (¶2):** [Continue mirroring the document's structure.]

---

## Cross-References

- **[Related doc]:** `[folder]/[filename]` — [why this connection matters]

---

## Glossary of Acronyms

| Acronym | Full name | What it is |
|---------|-----------|------------|
| **[ABC]** | [Full Name] | [Brief plain-language explanation] |
```

**Key features to replicate:**
- Header block with all metadata fields populated.
- Document description: one paragraph with the document's full name, scope, and key structural features.
- Body sections mirror the original's structure. Paragraph references (¶1, ¶2...) help locate content in the source.
- Each section includes specific data points (percentages, dollar amounts, dates, institutional names) — not vague summaries.
- Cross-references link to other documents in the repo with a note on why the connection matters.
- Glossary includes a "What it is" column — especially useful for institutional terms that are unfamiliar even when spelled out.

### Step 4 — Update `FOLDER_MAP.md`

Add the new document's entry to the relevant folder's `FOLDER_MAP.md`, following the format of existing entries. Include:
- Confidentiality classification
- Reliability label
- File type and extraction status
- Size (word count)
- Date and author (if known)
- Main sections and key messages (a condensed version of the summary)
- A "Notes" section at the bottom flagging cross-references to other documents

### Step 5 — Update the indexes

First, update the relevant folder's `FOLDER_MAP.md` (Step 4) so the folder-level registry is current.

Then register the document in the repo's **existing repo-level materials index** — the single lookup that makes documents findable across folders. Find that index by reading the repo's `FOLDER_MAP`s; **do not assume a particular index name or row schema.** Add the document's row in the shape that index already uses, conforming to it rather than imposing one: at minimum the document name, a `document` type marker, its actual path (from Step 0), and a link to its detailed entry (the folder's `FOLDER_MAP.md` or the summary). Keep the row a minimal pointer — the reliability/confidentiality detail and the section-level content stay in the summary and `FOLDER_MAP.md`, not in the repo-level index. If the new document creates important cross-references, record those in the `FOLDER_MAP.md` entry.

### Step 6 — Check for duplicates

Before finalizing, check if an identical or near-identical file already exists in the repo. If it does, flag it to the user — do not keep both without explicit instruction.

---

## Versioning

When a document is updated (new draft of the same document):
- Rename by appending `_v01`, `_v02`, etc.: `concept_note_idb_mar2026_v01.docx`, `concept_note_idb_mar2026_v02.docx`
- Update the `FOLDER_MAP.md` and repo-level materials index entries to reflect the new version
- If the previous version's summary and extraction are still in the repo, note which version they correspond to

---

## Infrastructure Files

These files are part of the repo structure and are **never renamed:**
- `FOLDER_MAP.md` — one per containing folder (the folder-level index and document registry)
- The repo's repo-level materials index — the single lookup shared with the paper branches, at the repo root; its name is the repo's own, discovered from the repo's `FOLDER_MAP`s, not fixed by this skill
- `CLAUDE.md`, `README.md` — repo-level infrastructure

---

## Setting Up for a New Project

This skill does **not** build a repo's folder or index structure — that is born at repo setup, owned by the archetype scaffold (`new_repo_setup.md` and the per-archetype `*_setup_scaffold.md`). When a user asks to "set up document processing" for a new project, configure the skill's project-specific parameters; do not hand-create folders or indexes.

1. **Ask about reliability labels** — What labels make sense for this project's documents? Present the defaults and ask the user to customize. It's OK to defer this until the first document arrives.
2. **Ask about confidentiality labels** — Same approach. The PUBLIC / INTERNAL / CONFIDENTIAL defaults work for most institutional projects.
3. **Ask about naming convention** — Present the default (`shortdescription_institution_monthyear.ext`) and ask if it needs modification.
4. **Add the document processing protocol to the project's CLAUDE.md** — Fill in the project-specific labels and parameters.

**Pre-v4 repos (no archetype structure yet).** If the repo predates the archetype scaffold and lacks a repo-level materials index or per-folder `FOLDER_MAP`s, **flag the missing structure as a migration gap** and surface it to the user — do not hand-build a folder or index tree, which risks materializing a layout the repo's archetype would not have. Proceed with extraction and summary in place; record the migration gap so the structure can be regularized when the repo is brought onto the current kit.

---

## Edge Cases

- **Scanned PDFs:** Do not attempt OCR. Note the file as scanned in `FOLDER_MAP.md` and the repo-level materials index, and flag it to the user for manual review.
- **Non-text-primary documents:** Spreadsheets, slide decks, and databases may need adapted extraction. Flag to the user and discuss approach.
- **Documents in other languages:** Extract text as-is. Summaries are written in the project's working language (translate if needed).
- **Very short documents** (cover letters, 1-page memos): Still follow the workflow, but the summary may be shorter than the original. The value is in the classification, indexing, and cross-referencing.
- **Documents without clear dates or authors:** Ask the user. If unknown, note it in the metadata as "Date unknown" or "Author unknown."
- **Bundled documents** (e.g., a PDF containing multiple separate reports): Ask the user whether to treat as one document or split into separate entries.

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the archetype-blind rule broadened from 'never read an archetype spec at runtime' to the whole archetype layer incl. `archetype_conventions.md` (W1, two sites — the logged Tier-2 ride from the archetype_conventions review). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 6, 2026 — v2.0.0 (v4 bin-1 index slice: made indexing archetype-blind. Dropped the `MasterIndex.md` prescription — no archetype defines a master index, so it was kit-induced drift the archetype audit would have flagged on every repo. The skill no longer names a repo-level index: it registers the document in the repo's existing repo-level materials index, discovered from the repo's `FOLDER_MAP`s in the shape that index already uses, never naming a file or reading a spec at runtime. This is a deliberate asymmetry with `materials_processing_skill.md`, which still names `MATERIALS_INDEX` — `document_processing` runs in operation repos that have no `MATERIALS_INDEX`, so it cannot name one. Carried the `AboutFolder.md` → `FOLDER_MAP.md` rename through this file — the v3.2 1e-rename pass exempted this file until its own redesign, which is now. Stripped the `inputs/` tree from the Folder Structure section and the setup steps: no archetype has an `inputs/` folder, and repo birth is the scaffold's job; placement stays archetype-blind via Step 0 (work-in-place; otherwise suggest from `FOLDER_MAP`s and confirm before filing). The reliability/confidentiality label model is left unchanged — reconciling it against the operation spec's six-level first-class-column scale and the coordination spec's domain-registry treatment is a separate deferred unit. The `MasterIndex.md` → `MASTER_INDEX.md` casing rename is mooted by the drop. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at the v4 re-baseline. Prior: v2.0.0 (v3.2 materials-triage merge: reframed as the document branch of `materials_processing_skill.md`; document-vs-paper boundary moved up into the triage's Step 0; added Step 0 work-in-place and `MATERIALS_INDEX.md` registration). v1.3 (v3.0.1) stale `paper_processing.md` → `paper_processing_skill.md` reference fix; v1.2 (May 13, 2026) renamed from `document_processing.md` per the v2.1.10 naming sweep.)*
