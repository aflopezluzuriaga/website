---
name: fmm-paper-latex
description: "Use this skill when Andrea asks to create, edit, or set up an FMM-styled LaTeX document — policy notes, institutional papers, or any standalone PDF that needs FMM branding (FMM header, IDB logo footer, PrimaryBlue section titles). Triggers include: 'set up the policy note in LaTeX,' 'FMM paper template,' 'LaTeX version of the policy note,' 'institutional paper in LaTeX,' or any reference to producing an FMM-branded document in LaTeX. Do NOT use for academic working papers or journal submissions (use academic_paper_latex_skill.md) or for slides (use academic_slides_skill.md, or the fmm_coordination_slides_latex_skill.md / fmm_coordination_slides_pptx_skill.md pair for division coordination decks)."
---

# FMM LaTeX Paper Skill

Template and conventions for FMM-branded LaTeX documents — policy notes, institutional papers, and any standalone PDF that needs the FMM visual identity. The output is FMM-styled: FMM header on every page, IDB logo footer, PrimaryBlue section titles, Andrea's palette throughout.

**Technology:** LaTeX (pdflatex), compiled via Overleaf or local LaTeX installation. The preamble file is `fmm_paper_preamble.tex` (in `skills/`).

**Rule:** Read this skill before setting up or editing any FMM-styled LaTeX document. Do not rely on memory of its contents from prior conversations.

---

## Before Starting — Confirm with Andrea

1. **Document title and subtitle** (if any).
2. **Authors.** Like FMM Word documents, the byline is **optional and has no default**. Many FMM documents are co-produced. Ask: *"Should your name go on this as author?"* Ask the same for any other listed author. If no, omit the byline. If yes, ask for the exact attribution (e.g., just her name, or "Andrea Lopez-Luzuriaga and Monica Calijuri").
3. **Date for the page header.** The FMM header shows `FMM — [month] [year]` on every page. Set `\renewcommand{\fmmdate}{Month Year}` in the body of the document.
4. **Is there a `.bib` file?** If the document has citations, use BibTeX (`natbib`). If not, plain text references are acceptable for shorter policy notes.
5. **Working language:** Default is English; deliverables may be translated to Spanish or Portuguese at the end. Confirm the working language before drafting.

---

## Preamble

The full LaTeX preamble lives in `fmm_paper_preamble.tex`. When generating a document, **copy the preamble's contents into the top of the main `.tex` file** you produce — do not `\input{}` it. The preamble begins with `\documentclass{article}` and is designed to be the literal start of a standalone `.tex` file, not an included fragment.

### Key preamble rules

- **This is an FMM-styled preamble.** Document chrome uses Andrea's palette: PrimaryBlue section titles, SecondaryBlue subsection titles, FMM header right-aligned in 9pt SecondaryBlue italic, IDB logo in the footer.
- **Colors mirror `andreas_palette.md`.** Never edit the colors block in the preamble file independently. To add or change a color, update the palette and sweep all consuming files in one atomic commit (see the palette file's "Files that mirror this palette" section).
- **Paragraph spacing convention.** The preamble does NOT use `\usepackage{parskip}`. Paragraphs are separated by manual `\bigskip` commands between paragraphs in the body. This gives a visible blank line with no first-line indent — the FMM institutional style. Do not change this globally; per-document control is more predictable than `parskip`.
- **Citations render in BLACK by default** (`citecolor=black`). URLs and internal cross-references stay in PrimaryBlue. If a document type calls for coloured citations, override `\hypersetup` after the preamble in the body.
- **Margins are 1 inch all around.** Standard US Letter geometry. (Earlier versions used 1.25 inch; v1.2 of the preamble reduced this for cross-format consistency with the Word equivalent.)
- **Title size is fixed at 14pt** to match the Word preamble's title ceiling. Section titles use `\Large` (~14pt) and are PrimaryBlue. Subsection titles use `\large` (~12pt) and are SecondaryBlue.
- **Add packages BEFORE the `\hyperref` block.** Hyperref must be loaded last.
- **`\fmmdate` must be set in the document body.** The preamble defines `\newcommand{\fmmdate}{}` (empty default). The body uses `\renewcommand{\fmmdate}{Month Year}` to populate the header. If unset, the header shows just "FMM" with no date.

---

## Document Structure

A typical FMM LaTeX document:

```latex
\documentclass[letterpaper]{article}

% [paste the contents of fmm_paper_preamble.tex here — preamble starts with
% \documentclass, so the line above is REPLACED by the preamble's
% \documentclass, not added separately]

\renewcommand{\fmmdate}{May 2026}

\begin{document}

% Title block
\begin{center}
{\fontsize{14}{16.8}\selectfont\bfseries\color{PrimaryBlue}%
Document Title Here}
\\[0.5em]
{\large\color{SecondaryBlue} Optional subtitle}
\end{center}

% Optional byline — ONLY if Andrea confirms
% \begin{center}
% Andrea Lopez-Luzuriaga
% \end{center}

\bigskip

% Body content
\section{Introduction}

First paragraph of the document.

\bigskip

Second paragraph follows.

% ... and so on

\end{document}
```

**Rules:**
- The first line of the generated `.tex` is the preamble's `\documentclass{article}` line — not a separately typed one.
- Set `\fmmdate` immediately after the preamble, before `\begin{document}` (or just after — either works, but earlier is cleaner).
- Title block is centered, PrimaryBlue, 14pt bold. Optional subtitle in SecondaryBlue.
- Byline (if confirmed by Andrea) goes below the title block, in black, centered.
- Body paragraphs are separated by `\bigskip` for FMM spacing.

---

## Sections and Headings

Section, subsection, and subsubsection titles are all defined in the preamble:

- `\section{Title}` → 14pt bold PrimaryBlue
- `\subsection{Title}` → 12pt bold SecondaryBlue
- `\subsubsection{Title}` → 11pt bold SecondaryBlue

These are styled via `titlesec` in the preamble. Use them normally — no manual color or sizing in the body.

---

## Citations

If the document has formal citations, use `natbib`:

| Pattern | Command | Output |
|---------|---------|--------|
| In-text | `\citet{Author2024}` | Author (2024) |
| Parenthetical | `\citep{Author2024}` | (Author, 2024) |
| Multiple | `\citep{Author2024, Other2025}` | (Author, 2024; Other, 2025) |

End the document with:

```latex
\bibliography{references}
\end{document}
```

Citations render in **black** by default (the preamble sets `citecolor=black`). URLs and internal links remain PrimaryBlue.

For shorter policy notes without a `.bib` file, inline references in the body or footnotes are acceptable.

---

## Tables and Figures

Tables use `booktabs` (no vertical lines, `\toprule`, `\midrule`, `\bottomrule`). The preamble loads `booktabs`. Standard pattern:

```latex
\begin{table}[htbp]
    \centering
    \caption{Table Title}
    \label{tab:label}
    \footnotesize
    \begin{tabular}{@{}lcc@{}}
        \toprule
        Variable & Value 1 & Value 2 \\
        \midrule
        Indicator & 0.25 & 0.42 \\
        \bottomrule
    \end{tabular}
\end{table}
```

Figures use `graphicx` (loaded in the preamble). For FMM policy notes, figures often use Andrea's palette — see `andreas_palette.md` for the colors and how Andrea uses them.

---

## Header and Footer

The preamble defines both via `fancyhdr`:

- **Header (right-aligned, 9pt SecondaryBlue italic):** `FMM — [\fmmdate]`. Set `\fmmdate` in the body.
- **Footer (left: page number in SecondaryBlue; right: IDB logo `KnowledgeLogo.png`).** No "FMM" text in the footer — the header carries the FMM label.

The `KnowledgeLogo.png` file must be available in the compilation directory (Overleaf project root, or alongside the `.tex` file locally).

---

## Required Assets

| File | Purpose |
|------|---------|
| `KnowledgeLogo.png` | IDB logo for the footer |
| (`.bib` file) | Optional — only if the document has formal citations |

For Overleaf delivery: include `KnowledgeLogo.png` in the zip alongside the `.tex` file (and the `.bib` if used).

---

## Differences from the Academic Paper Preamble

This template is for FMM-styled documents and differs from `academic_paper_preamble.tex` (used via `academic_paper_latex_skill.md` for working papers and journal submissions):

| Feature | FMM paper | Academic paper |
|---------|-----------|---------------|
| Margins | 1 inch all around | 1 inch all around |
| Spacing | Single | 1.5 (`\onehalfspacing`) |
| Title page | Centered title block, in-body | Custom `\titlepage` with author minipages |
| Headers/footers | FMM header + IDB logo footer | None (clean) |
| Section titles | PrimaryBlue colored | Default LaTeX (black) |
| Link colors | PrimaryBlue | `blue!60!black` |
| Citation color | Black | `blue!60!black` |
| Andrea's palette | Used throughout (chrome + figures) | Defined, but ONLY for figures/TikZ/pgfplots |
| Bibliography | Optional (inline OK for short notes) | `natbib` + `.bib` file required |
| Typical use | Policy note, knowledge brief, division paper | Working paper, journal submission |

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: preamble location corrected to `skills/` (A′-12, M3's sibling in the other May-13 format skill). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: May 13, 2026 — v1.0 (initial version, written as part of v3.0 document-generation architecture work to close the orphan-preamble gap: `fmm_paper_preamble.tex` existed but no skill drove its use)*

