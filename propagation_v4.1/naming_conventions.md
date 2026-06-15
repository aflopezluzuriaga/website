---
name: naming-conventions
description: >
  The kit's universal naming rule, kept in every repo regardless of archetype
  (including NONE). Content files and folders use lowercase under_score;
  structural/organization files (the index family, FOLDER_MAP, STATUS) use
  ALL_CAPS. Covers the carry-safety rationale, underscore-not-hyphen, the
  human-readable-display exemption, and the paper-stem / BibTeX cite-key
  identity. Read before naming or renaming any file or folder.
---

# Naming conventions

## The rule: two categories

Names fall into two categories, each internally consistent, with the difference
between them carrying meaning:

| Category | Form | What it covers |
|---|---|---|
| **Content** | `under_score` (lowercase, underscore-delimited) | Ordinary repo content — folders, working files, anything created and moved in the course of work. The default. |
| **Structural / organization** | `ALL_CAPS` (underscore-delimited) | Repo-organization files: the index family (`MATERIALS_INDEX`, `PAPERS_INDEX`, the archetype indexes), `FOLDER_MAP`, `STATUS`, and similar scaffolding. |

The capitals are deliberate and load-bearing: they make the
structural/organization files **pop out from content at a glance**, so a folder
can be scanned and its scaffolding identified instantly. Case carries the
meaning "this is a structural file." This is one rule with two categories — not
an inconsistency.

## Why this rule

- **Carry-safety.** Names move by path through the GitHub API. Mixed-case
  (CamelCase) is lossy to carry: every internal capital is a spot where the
  casing gets guessed wrong, the API treats it as a different path, and the file
  goes missing or duplicates (e.g. `Knowledgelogo.png` vs `KnowledgeLogo.png`).
  **Both `under_score` and `ALL_CAPS` are carry-safe** — neither has mixed casing
  to guess wrong. CamelCase is the form that breaks; it is retired.
- **Readability.** Word-breaks are read faster when marked. The underscore *is*
  the space made literal — it puts the break exactly where it's read, without
  requiring the casing to be supplied correctly each time. So `under_score`
  gives the same word-break signal CamelCase gave, minus the part that breaks.
- **Visual distinction.** `ALL_CAPS` for the structural files lets repo-
  organization files be identified at a glance, while staying carry-safe.

## Underscore vs. hyphen (within the content category)

`under_score`, not `hyphen-case`, for content names: underscores survive
double-click selection (the whole token highlights as one word), read cleanly in
code and in Stata / R / Python, and match the kit's existing convention. Hyphens
would be preferable only for URL slugs / web contexts, which the kit doesn't
have. (The conversations skill's `<short-tag>` filename slugs use hyphens by
that skill's own convention — a localized exception inside saved-conversation
filenames, not the general rule.)

## Branch names (a hyphen exception)

Git branch refs use **hyphens**, lowercase — by git convention, the same kind of
localized exception as the conversation `<short-tag>` slugs above:
`<slug>-<purpose>-<date>`. The purpose token names the branch kind — `edits` /
`restructure` / `redraft` / `review` for a writing branch
(`writing_branch_skill.md`), and **`explore`** for an exploration branch
(`exploration_branch_skill.md`) — e.g. `aml-elasticity-explore-jun-12`. A branch
ref is a transient git identifier, not repo content carried by path into the
tree, so the content `under_score` rule does not bind it.

## Human-readable display text is exempt

The carry-safety rule binds only names a **machine carries by path** (filenames,
identifiers skills parse). Text a person *reads* and no machine carries by path
— document titles, headings, the human label inside a `FOLDER_MAP` index
entry — can be written however reads best, including capitalized words with
spaces. The pairing is free because the index entry already exists: the index
can show `Mexico VAT — descriptive paper` while the file on disk is
`paper_mexico_vat.md`. The scanned thing is readable; the carried thing is safe.

## Names that double as identifiers — paper-processing stems and cite keys

The paper-processing skills (`paper_processing_academic_skill.md`,
`paper_processing_institutional_skill.md`, `materials_processing_skill.md`) name
renamed PDFs on a `who_what_year` stem, reuse that stem for the extracted-text
and summary files (`TEXT_<stem>.md`, `SUMMARY_<stem>.md`), **and reuse it as the
BibTeX cite key.**

**Keep the `who_what_year` structure; lowercase the whole stem under the content
rule.** The structure front-loads the author/institution handle and folds the
cite key into the filename so disk and `\cite{}` share one identity. Only the
casing changes: the intra-token CamelCase (`simpleAI`, `g20RevenueAdmin`) is the
carry-unsafe, non-reconstructible form this convention retires. So
`acemoglu_simple_ai_2024`, `imf_g20_revenue_admin_2025`.

**Authorship (collapse vs split) is read from the source at intake, not guessed
from the stem.** Whether a multi-token surname is one person's compound surname
(collapse: `reyestagle`) or several co-authors (split: `kleven_kreiner_saez`) is
**undecidable from the stem alone** — read it off the document's
citation/authorship when the paper is processed, and fix it once, correctly.
Given that:

**Compound surnames collapse to a single lowercase token** — `DellAcqua` ->
`dellacqua`, `delRioChanona` -> `delriochanona` (drop the internal capital; the
surname does not split into multiple tokens).

**Cite-key scope.** The lowercasing rule binds only keys that *are* filename
stems (the paper-processing `stem = key = filename` identity). A legacy or
external `.bib` whose keys are *not* filenames (e.g. a Zotero library) is
**exempt** — no carry-safety is at stake, so its keys are left as-is.

**Renaming a stem rewrites its cite key.** Because the stem *is* the cite key,
lowercasing or otherwise renaming a stem rewrites that paper's `.bib` entry key
and every `\cite{}` that points to it. Do this as a deliberate per-file
migration — read the source, fix the key once — not a blanket find-replace. The
`TEXT_` / `SUMMARY_` prefixes and the `PAPERS_INDEX` / `MATERIALS_INDEX` files
already satisfy the `ALL_CAPS` structural rule and don't change.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; the branch-name hyphen exception added 2026-06-08 (#8 branch/exploration build). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
