---
name: paper-processing-institutional
description: Protocol B for processing institutional-style reports (G20 background notes, IMF/World Bank/OECD/UN flagship reports, multilateral working-group papers, regional development bank policy reports, tax-authority research syntheses, institutional monographs). Invoked from materials_processing_skill.md's Step 0 triage when the document does NOT have most of (abstract, research question/hypothesis, original estimates from authors' own data). Covers institutional-author renaming, text extraction with acronym/box preservation, synthesized-findings summary, index registration, a `@techreport` bibliography entry, and setting Claude status. Use directly when the protocol is already known; otherwise start from materials_processing_skill.md.
---

# Paper Processing — Protocol B (institutional-style)

This skill executes Protocol B: the per-document workflow for institutional-style reports, after the Step 0 triage in `materials_processing_skill.md` has routed the document here.

For shared context (prerequisites, folder structure, status framework, lookup protocol, project setup), see `materials_processing_skill.md`. This file carries only the Protocol B pipeline.

## When this skill applies

Triage in `materials_processing_skill.md` Step 0 returned "institutional-style." The document is a substantive analytical report that synthesizes evidence, positions a framework, or advises on policy, but does NOT present the authors' own original empirical or theoretical research with a stated hypothesis.

Common examples: G20 background notes; IMF / World Bank / OECD / UN flagship reports; multilateral working-group papers (Platform for Collaboration on Tax (PCT), Inclusive Framework, etc.); regional development bank policy reports; tax-authority research syntheses; institutional monographs that compile chapter contributions into a unified policy argument.

If you arrived here without running the triage, go back and run Step 0 first — the protocol choice changes filename convention, summary emphasis, and BibTeX entry type, and getting it wrong means redoing the work.

---

## Step 1B — Rename using institutional convention

Pattern: `institution_shortTitle_year.pdf`

- **institution** (lowercase):
  - For multilaterals: short acronym — `imf`, `worldBank`, `oecd`, `un`, `idb`, `caf`, `pct`, `g20`, `g7`.
  - For governments: country code or name + agency acronym in camelCase — `brazilRfb`, `mexicoSat`, `chileSii`, `peruSunat`.
  - For working groups: the group's acronym — `g20`, `pct`, `iif`.
- **shortTitle**: two descriptive words in camelCase, no spaces.
- **year**: publication year.
- Examples: `imf_g20RevenueAdmin_2025.pdf`, `worldBank_taxCapacity_2024.pdf`, `oecd_taxAdmin30_2023.pdf`, `brazilRfb_confiaProgram_2024.pdf`.

If multiple institutions co-published, lead with the principal author institution (the one whose staff produced the document — usually named on the cover). If the document is co-branded by a working group whose members include several institutions, use the working group's acronym (e.g., `pct_capacityDev_2025` rather than naming all four PCT members).

When unsure, ask the user.

---

## Step 2B — Extract full text

Save as `TEXT_institution_shortTitle_year.md` in the `text/` subfolder of the report's home — the home `materials_processing_skill.md`'s placement rule proposed and the user confirmed, never a hardcoded folder. Same general approach as Protocol A: clean, readable markdown; preserve section structure, tables, and key formatting; strip headers/footers, page numbers, and decorative artifacts.

Institutional reports often have heavy front matter (foreword, acknowledgments, list of acronyms, list of figures and boxes). Three specific rules:
- **Preserve the acronym list verbatim** — these are reference material for downstream work.
- **Preserve boxes and figure captions with their key data**, since these often carry the report's quotable findings.
- Strip decorative front matter (forewords, dedications) unless they contain substantive framing.

---

## Step 3B — Write a comprehensive summary

Save as `SUMMARY_institution_shortTitle_year.md` in the `summaries/` subfolder of the report's home (the same home as the text extraction; see `materials_processing_skill.md`'s placement rule). Structure parallels Protocol A but with institutional-appropriate emphasis.

**(a) What the report argues** — Purpose of the document, who commissioned it (or the request context — G20 ask, presidency mandate, board request), the principal thesis or position, and how it relates to prior or companion reports from the same institution. The "argues" framing applies even when the report seems neutral — institutional reports always carry a position, even if implicit.

**(b) Document type, methods, and findings** — This section replaces Protocol A's "Methodology & key findings." It must cover:
- **Document provenance:** what kind of report this is (background note, flagship, working paper, monograph, technical note); commissioning context; institutional team and lead authors; companion reports if part of a series; partner institutions consulted.
- **Frameworks and databases drawn on:** which institutional tools or datasets are used (e.g., for tax/fiscal: TADAT, ISORA, RA-GAP, IDB MICs survey; for macro: WEO, IFS; for trade: COMTRADE). Name them so the user can locate underlying sources.
- **Headline synthesized findings:** the report's main numerical claims or qualitative conclusions, with their underlying citation when the report attributes them. Be explicit when a number is *the report's own synthesis* versus *a number it borrows from a cited paper* (cite the original where given).
- **Policy framework or recommendations:** the structured guidance the report offers — typology of reforms, decision frameworks, sequencing logic, country-typology distinctions (advanced economies / emerging markets / low-income developing countries / fragile states).
- **Country case studies, if any:** which countries are profiled, what for, and whether Latin America and the Caribbean (LAC) is represented.

The precision principle still applies: name the tools, name the countries, name the underlying papers. "Synthesizes IMF research" is not enough — say which papers, which datasets, which estimates.

**(c) [Conditional section — only if `CONDITIONAL_SECTION` is defined AND the report has relevant content]** — Same as Protocol A. If the report has LAC-specific content (country cases, regional cuts, LAC-specific tables), extract here. Frequently empty for institutional reports with global framing.

**(d) Relevance to the project** — In addition to the standard "why this matters" framing, address two questions specific to institutional reports:
- **What position does this report represent?** ("This is the IMF's authoritative public statement on X as of 2025"; "This is the OECD Inclusive Framework's framing of pillar 2 implementation"). Readers want to know what position they are implicitly endorsing or arguing against if they cite it.
- **Cross-references in the existing library.** Institutional reports almost always cite papers already in the repo's existing paper collection. List the matches with relative paths to the existing summaries — this knits the library together and saves future readers a step.

### Summary evolution principle

The (a)–(d) structure above is a **floor, not a ceiling**. As the user works with a report over time, the summary should grow with cross-references, accessible explanations, and the user's own notes. Do not trim or reorganize expanded summaries back to the minimal format. (Same principle as Protocol A.)

---

## Step 4B — Register in the repo's indexes

Same row format as Protocol A. The paper-detail index is the repo's existing one, located by reading the `FOLDER_MAP`s (never named here). The "Outlet" column (or its equivalent in the project's index format) should describe the document type rather than a journal — examples: "IMF G20 background note," "World Bank Policy Research Working Paper," "OECD policy paper," "IDB Technical Note IDB-TN-XXXX," "UN flagship report."

Then add the report's row to the repo's **materials index** — the repo-level single lookup, also located via the `FOLDER_MAP`s — in the shape that index already uses: title, type `paper`, the path to the PDF in the report's home, and a link to its paper-detail-index row / summary. Keep the row minimal — the institutional metadata stays in the paper-detail index and the summary. Write each row in the shape the repo's index already has; never name a file or read an archetype spec at runtime.

---

## Step 5B — Update the bibliography

If the repo maintains a bibliography, add an entry to it — the bibliography file is located by reading the `FOLDER_MAP`s, never a hardcoded filename; a repo that tracks citability another way (e.g. a reliability tag) has none, so skip this step there. Use `@techreport` for institutional reports. Required fields:
- `author = {{Institution Name}}` — **double braces** preserve casing and prevent BibTeX from treating "Fund" or "Bank" as a surname.
- `title`, `institution`, `year`.
- `type` — describe the document type (e.g., "G20 Background Note," "Policy Research Working Paper," "Technical Note").
- `month` — when relevant.
- `note` — for institutional team, lead authors, and partner institutions if needed.
- `abstract` — copy from the report's executive summary if no separate abstract exists.

For **monographs published as books**, use `@book` with `publisher`, `address`, and `isbn` if available. For **chapters within institutional monographs**, use `@inbook` referring back to the parent `@book` entry.

Cite key follows the filename convention: `imf_g20RevenueAdmin_2025`, `worldBank_taxCapacity_2024`, etc.

---

## Step 6B — Set Claude status and flag if relevant

Same status framework as Protocol A. The four Claude status values are: **Recommend full read**, **Recommend skim**, **Summary sufficient**, **Flagged — [reason]**. Full vocabulary and rationale in `materials_processing_skill.md`'s Status framework section.

One observation specific to institutional reports: they tend to cluster at "Recommend full read" (when they're flagship statements relevant to active work) or "Summary sufficient" (when they're routine technical updates or peripheral). Set the status based on the report's current relevance to active task folders, not just its general quality.

When setting "Recommend full read" or "Flagged," also tell the user *in the conversation* why — don't just set the label silently.

---

## Edge cases specific to Protocol B

- **Working papers from multilateral institutions are usually Protocol A**, not B — they have abstracts, hypotheses, identification strategies, and are written in academic-paper structure even when the institution is the publisher. If you arrived here on a working paper that has clear academic structure, re-triage via `materials_processing_skill.md` Step 0.
- **Monographs with chapter-level empirical work** are still Protocol B at the document level (the value is the synthesis), but if a chapter is heavily reused on its own, consider creating a separate Protocol A summary for that chapter and cross-linking.
- **Reports without named individual authors** (e.g., OECD secretariat reports, UN agency reports) are unambiguously Protocol B.
- **Reports with named authors but commissioned by an institution** (e.g., "Prepared by Smith and Jones for the G20") — the cover usually names the institution as the publisher and the individuals as the production team. Treat as Protocol B; list the production team in section (b) under "institutional team."
- **Co-published institutional reports**: Lead with the principal author institution; use working-group acronym if co-branded by a working group with multiple members.
- **Very short institutional documents** (policy briefs, 2-pagers): Still follow the full workflow; the summary may be shorter than the original — that's fine, the value is in the structured format and indexing.

For triage-level edge cases (borderline cases between academic and institutional, non-English papers, papers with no clear year), see `materials_processing_skill.md`'s Edge Cases section.

---

## Composition with other skills

- **`materials_processing_skill.md`** — Parent triage skill. Routes here when Step 0 returns institutional-style. Carries the canonical Status framework, Prerequisites, Folder Structure, and Lookup Protocol.
- **`paper_processing_academic_skill.md`** — Sibling skill for Protocol A (academic-style papers). Not invoked from this skill; the choice is made at the triage upstream.
- **`project_tracker_skill.md`** — the repo's paper-detail index is in the freshness-audit's `TRACKED_LOCATIONS`. New entries added by this skill are picked up by the session-start audit.

---

*Last updated: June 6, 2026 — v2.0.0 floor (v4 bin-1 index slice, completion-frame step 3, index-name-agnostic re-edit): made Protocol B archetype-blind on placement and index/bibliography naming, in step with its now-blind parent `materials_processing_skill.md`. Text/summary artifacts file into the `text/`/`summaries/` subfolders of the report's home — the home proposed-and-confirmed by the parent's placement rule, no longer the hardcoded `papers/` (the §3(d) cross-reference to "the project's `papers/` collection" generalized too). Step 4B registers in the repo's paper-detail index and materials index located via the `FOLDER_MAP`s (no `MATERIALS_INDEX`/`PAPERS_INDEX` names); Step 5B's `@techreport` bibliography entry is conditional and the `.bib` is located via the `FOLDER_MAP`s, not hardcoded — a repo that tracks citability another way skips it. Same operation gap the document/agent units closed (operation spec §5 routes the paper path here, and operation carries none of those named files). Pipeline logic, summary structure, status framework, and triage otherwise unchanged. Prior: May 28, 2026 — v2.0.0 (v3.2 materials-triage merge: parent triage references updated from `paper_processing_skill.md` to `materials_processing_skill.md` for the rename; added repo-level index registration to Step 4B. Pipeline unchanged. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.0 — extracted from `paper_processing.md` v2.0 in the v2.1.7 paper-processing split; carries only Protocol B — Steps 1B–6B — plus Protocol B's own edge cases.)*


