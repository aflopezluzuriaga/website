---
name: paper-processing-academic
description: Protocol A for processing academic-style papers (journal articles, working papers, dissertations, white papers with original empirical or theoretical contribution). Invoked from materials_processing_skill.md's Step 0 triage when the document has two or more of (abstract, research question/hypothesis, original estimates from authors' own data). Covers renaming, text extraction, comprehensive summary writing, index registration, a bibliography entry, and setting Claude status. Use directly when the protocol is already known; otherwise start from materials_processing_skill.md.
---

# Paper Processing — Protocol A (academic-style)

This skill executes Protocol A: the per-document workflow for academic-style papers, after the Step 0 triage in `materials_processing_skill.md` has routed the document here.

For shared context (prerequisites, folder structure, status framework, lookup protocol, project setup), see `materials_processing_skill.md`. This file carries only the Protocol A pipeline.

## When this skill applies

Triage in `materials_processing_skill.md` Step 0 returned "academic-style." The document has two or more of:
- An abstract (not an executive summary).
- A stated research question or hypothesis.
- Original estimates the authors produced from data they analyzed.

If you arrived here without running the triage, go back and run Step 0 first — the protocol choice changes filename convention, summary emphasis, and BibTeX entry type, and getting it wrong means redoing the work.

---

## Step 1A — Rename using convention

Rename the file to: `Author_shortTitle_year.pdf`

- **Author**: last name of the first author.
- **shortTitle**: two descriptive words in camelCase, no spaces.
- **year**: publication year.
- Example: `Acemoglu_simpleAI_2024.pdf`.

If the naming is ambiguous (e.g., institutional author, no clear publication year), ask the user before proceeding.

---

## Step 2A — Extract full text

- Save as `TEXT_Author_shortTitle_year.md` in the `text/` subfolder of the paper's home — the home `materials_processing_skill.md`'s placement rule proposed and the user confirmed, never a hardcoded folder.
- Produce a clean, readable markdown version of the paper's content.
- Preserve section structure, tables (as markdown tables), and key formatting.
- Strip headers/footers, page numbers, and other artifacts.

---

## Step 3A — Write a comprehensive summary

Save as `SUMMARY_Author_shortTitle_year.md` in the `summaries/` subfolder of the paper's home (the same home as the text extraction; see `materials_processing_skill.md`'s placement rule).

Structure:

**(a) What the paper argues** — Main thesis, research question, and contribution to the literature.

**(b) Methodology & key findings** — This section must be precise and detailed. Include:
- Data sources and sample: who, where, when, how many observations.
- Method: RCT, diff-in-diff, calibration, survey, structural model, etc.
- How key variables are constructed: exposure measures, outcome variables, controls.
- Identification strategy (if empirical) or key assumptions (if theoretical).
- Core results: effect sizes, magnitudes, main takeaways.

The description must be specific enough that someone can understand the methodology without reading the paper. Not vague ("uses cross-country data") but detailed ("uses PIAAC microdata for 23 OECD countries, 2012–2015, linking Felten AIOE scores crosswalked to ISCO-08 to individual-level employment outcomes via OLS with occupation × country fixed effects").

**(c) [Conditional section — only if `CONDITIONAL_SECTION` is defined AND the paper has relevant content]** — Extract all findings matching the project's filter. Only include this section if the paper actually contains matching data.

**(d) Relevance to the project** — How this paper connects to `PROJECT_QUESTION`. Why it matters, what it contributes, what gaps it fills.

### Summary evolution principle

The (a)–(d) structure above is a **floor, not a ceiling**. As the user works with a paper over time (asking questions, requesting explanations, cross-referencing with other papers), the summary should grow. Expanded summaries with worked examples, accessible explanations of technical concepts, cross-references, and the user's own notes are expected and desirable. Do not trim or reorganize expanded summaries back to the minimal format.

---

## Step 4A — Register in the repo's indexes

Add an entry to the repo's **paper-detail index** (located by reading the
`FOLDER_MAP`s, never named here) with:

- Full bibliographic information (authors, title, year, journal/source).
- 3-paragraph summary (same content as the summary file sections a, b, d — and c if present).
- Relative links to: the PDF, the full text file, and the summary file.
- **Claude status** — Claude's reading recommendation, set at processing time in Step 6A (see Status framework in `materials_processing_skill.md`).
- **User status** — Left blank until the user confirms their own label.

Then add the paper's row to the repo's **materials index** — the repo-level single lookup, also located via the `FOLDER_MAP`s — in the shape that index already uses: title, type `paper`, the path to the PDF in the paper's home, and a link to its paper-detail-index row / summary. Keep the row minimal — the bibliographic and status detail stays in the paper-detail index. Write each row in the shape the repo's index already has; never name a file or read an archetype spec at runtime.

---

## Step 5A — Update BibTeX

If the repo maintains a bibliography, add a new entry to it — the bibliography file is located by reading the `FOLDER_MAP`s, never a hardcoded filename. A repo that tracks citability another way (e.g. a reliability tag rather than a bibliography) has none; skip this step there. The cite key follows the same naming convention: `Author_shortTitle_year` (e.g., `Acemoglu_simpleAI_2024`). Always include an `abstract = {}` field with the paper's abstract (copied from the paper itself, not paraphrased).

Use `@article` for journal articles, `@unpublished` for working papers without a formal journal venue. Other BibTeX entry types may apply for specific cases (proceedings, dissertations) — use the standard BibTeX entry type for the publication kind.

---

## Step 6A — Set Claude status and flag if relevant

Based on the paper's content and its connection to `PROJECT_QUESTION`, set the **Claude status** in the index. This is Claude's recommendation — the user will confirm or override with their own label later.

The four Claude status values are: **Recommend full read**, **Recommend skim**, **Summary sufficient**, **Flagged — [reason]**. Full vocabulary and rationale in `materials_processing_skill.md`'s Status framework section.

When setting "Recommend full read" or "Flagged," also tell the user *in the conversation* why — don't just set the label silently.

---

## Edge cases specific to Protocol A

- **Multiple first authors**: Use the first listed author for the filename.
- **Working papers without journal**: Use the institution or series as the source in bibliographic info; BibTeX entry type is `@unpublished`. (If the document is a synthesis or position paper rather than a research paper, it should have routed to Protocol B at Step 0 — go back and re-triage.)
- **Very short academic papers** (research notes, short comments): Still follow the full workflow; the summary may be shorter than the original — that's fine, the value is in the structured format and indexing.

For triage-level edge cases (borderline cases between academic and institutional, non-English papers, papers with no clear year), see `materials_processing_skill.md`'s Edge Cases section.

---

## Composition with other skills

- **`materials_processing_skill.md`** — Parent triage skill. Routes here when Step 0 returns academic-style. Carries the canonical Status framework, Prerequisites, Folder Structure, and Lookup Protocol.
- **`paper_processing_institutional_skill.md`** — Sibling skill for Protocol B (institutional-style reports). Not invoked from this skill; the choice is made at the triage upstream.
- **`project_tracker_skill.md`** — the repo's paper-detail index is in the freshness-audit's `TRACKED_LOCATIONS`. New entries added by this skill are picked up by the session-start audit.

---

*Last updated: June 6, 2026 — v2.0.0 floor (v4 bin-1 index slice, completion-frame step 3, index-name-agnostic re-edit): made Protocol A archetype-blind on placement and index/bibliography naming, in step with its now-blind parent `materials_processing_skill.md`. Text/summary artifacts file into the `text/`/`summaries/` subfolders of the paper's home — the home proposed-and-confirmed by the parent's placement rule, no longer the hardcoded `papers/`. Step 4A registers in the repo's paper-detail index and materials index located via the `FOLDER_MAP`s (no `MATERIALS_INDEX`/`PAPERS_INDEX` names); Step 5A's bibliography entry is conditional and the `.bib` is located via the `FOLDER_MAP`s, not hardcoded — a repo that tracks citability another way skips it. Same operation gap the document/agent units closed (operation spec §5 routes the paper path here, and operation carries none of those named files). Pipeline logic, summary structure, status framework, and triage otherwise unchanged. Prior: May 28, 2026 — v2.0.0 (v3.2 materials-triage merge: parent triage references updated from `paper_processing_skill.md` to `materials_processing_skill.md` for the rename; added repo-level index registration to Step 4A. Pipeline unchanged. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.0 — extracted from `paper_processing.md` v2.0 in the v2.1.7 paper-processing split; carries only Protocol A — Steps 1A–6A — plus Protocol A's own edge cases.)*


