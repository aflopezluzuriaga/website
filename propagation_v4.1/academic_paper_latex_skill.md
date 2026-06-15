---
name: academic-paper-latex
description: "Use this skill when Andrea asks to create, edit, or set up a LaTeX academic paper — working papers, journal submissions, research documents. Triggers include: 'set up the LaTeX for my paper,' 'academic paper template,' 'paper in LaTeX,' 'Overleaf setup,' or any reference to producing an academic document in LaTeX (not a policy note or institutional document — those use fmm_paper_preamble.tex). Do NOT use for slides (use academic_slides_skill.md) or for Word documents (use fmm_docx_formatting_skill.md)."
---

# Academic Paper LaTeX Skill

Template and conventions for academic economics papers in LaTeX. Designed for working papers, journal submissions, and research documents compiled in Overleaf or a local LaTeX installation.

**Rule:** Read this skill before setting up or editing any academic paper LaTeX file. Do not rely on memory of its contents from prior conversations.

---

## Before Starting — Confirm with Andrea

1. **Paper title**
2. **Authors and affiliations** (determines title page layout and "I" vs. "we")
3. **Is there a `.bib` file?** If not, create one. All citations go through BibTeX — no hardcoded references.
4. **Journal or submission requirements?** (formatting constraints, word limits, citation style)
5. **Working language:** Default is English.

---

## Preamble

The full LaTeX preamble lives in `academic_paper_preamble.tex`. When
setting up a paper, **copy the preamble's contents into the top of the main
`.tex` file** you produce — do not `\input{}` it. The preamble begins with
`\documentclass{article}` and is designed to be the literal start of a
standalone `.tex` file, not an included fragment.

### Key preamble rules

- **This is an ACADEMIC preamble.** Document chrome (title, section
  headers, links) follows academic conventions — black titles, default-blue
  links via `blue!60!black`. No FMM branding (no FMM header, no IDB logo
  footer, no PrimaryBlue title).
- **Andrea's palette IS defined for figures.** The preamble includes
  Andrea's color palette (PrimaryBlue, SecondaryBlue, LightBlue, DarkBlue,
  SoftBlue, DarkGreen, LightGreen, WarmCream) for use in figures, TikZ
  diagrams, and pgfplots charts. Figures often travel between an academic
  working paper and an FMM policy note as the same chart; they use Andrea's
  palette in both contexts. Do NOT use these colors for document chrome.
- **Colors mirror `andreas_palette.md`.** Never edit the colors block in
  the preamble file independently. To add or change a color, update the
  palette and sweep all consuming files in one atomic commit (see the
  palette file's "Files that mirror this palette" section).
- **Add packages BEFORE the `\hyperref` block.** Hyperref must be loaded
  last.
- **`natbib` for citations.** Use `\citet{}` for in-text citations ("Autor
  (2003)") and `\citep{}` for parenthetical citations ("(Autor, 2003)").
  The bibliography style can be changed per journal — `aer` for American
  Economic Review style is the default. Confirm with Andrea.
- **No hardcoded citations.** All references go through the `.bib` file.
  If a paper doesn't have a BibTeX entry yet, create one.
- **Line numbers** are available via `\linenumbers` — uncomment for draft
  review, comment out for submission.

---

## Title Page

The title page is a custom `\begin{titlepage}` with centered elements. Not the standard `\maketitle`.

```latex
\begin{titlepage}
\centering
\vspace*{1.5cm}
{\LARGE\bfseries Paper Title\par}
\vspace{1cm}

% Authors — one minipage per author, side by side
\begin{minipage}[t]{0.4\textwidth}
\centering
{\large Author One\par}
\vspace{0.3cm}
{\normalsize Affiliation One\\
\href{mailto:email@example.com}{email@example.com}}
\end{minipage}
\hspace{0.75cm}
\begin{minipage}[t]{0.4\textwidth}
\centering
{\large Author Two\par}
\vspace{0.3cm}
{\normalsize Affiliation Two}
\end{minipage}

\vspace{1cm}

% Abstract
\begin{minipage}{0.9\textwidth}
\begin{center}{\large\bfseries Abstract}\end{center}
\vspace{0.3cm}
\small
\onehalfspacing
\noindent Abstract text here.
\end{minipage}

\vspace{0.8cm}

% JEL codes and keywords
\begin{minipage}{0.85\textwidth}
\noindent\textbf{JEL Codes}: O33, J21\\
\noindent\textbf{Keywords}: keyword1, keyword2, keyword3
\end{minipage}
\end{titlepage}
```

**Rules:**
- Title in `\LARGE\bfseries`, no color — black on white.
- Authors side by side in minipages. For 3+ authors, use three minipages or stack into rows.
- Abstract in a 0.9-width minipage, `\small`, 1.5-spaced.
- JEL codes and keywords below the abstract.
- A `\footnotemark`/`\footnotetext` on the title can point to a replication package, acknowledgments, or version URL.

---

## Paper Structure

Standard empirical economics:

1. **Introduction** — self-contained summary: question, contribution, mechanism, strategy, key results, implications
2. **Framework / Literature** — conceptual framework, literature positioning
3. **Data and Empirical Strategy** — data description, identification, estimation
4. **Results** — main results, robustness, heterogeneity
5. **Conclusion** — findings, policy implications, limitations

Adapt to the paper. Theory papers, reviews, and measurement papers have different structures — follow Andrea's outline.

---

## Tables

**Default convention: tables live in external files.** Each table is a standalone `.tex` file in a `tables/` subfolder, included in the main document via `\input{}`. This makes it easy to regenerate tables from Stata, R, or Python without editing the paper.

In the main `.tex` file:
```latex
\input{tables/table_results.tex}
```

The external table file (`tables/table_results.tex`) is self-contained:
```latex
\begin{table}[htbp]
    \centering
    \caption{Table Title}
    \label{tab:label}
    \footnotesize
    \begin{tabular}{@{}lcc@{}}
        \toprule
        Variable & Model 1 & Model 2 \\
        \midrule
        \emph{Coefficient name} & 0.372*** & 0.372*** \\
         & (15.96) & (15.87) \\
        \bottomrule
        \multicolumn{3}{l}{\footnotesize * p<0.10, ** p<0.05, *** p<0.01} \\
    \end{tabular}
    \tablenote{Estimation details, sample, controls.}
\end{table}
```

**Rules:**
- Use `booktabs` exclusively (`\toprule`, `\midrule`, `\bottomrule`). No vertical lines.
- `\footnotesize` for table content.
- Standard errors in parentheses below coefficients.
- Significance stars as table footnote.
- `\tablenote{}` for substantive notes (data sources, sample restrictions, controls).
- `\label` immediately after `\caption` for correct cross-referencing.
- If Andrea provides a table directly in chat (not as an external file), it's fine to write it inline — but the default is external.

---

## Figures

**Same convention: figures live in a `figures/` subfolder.** Referenced by path in the main document.

```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.8\textwidth]{figures/density_scores.png}
    \caption{Figure Title}
    \label{fig:label}
    \figurenote{Description of what the figure shows, data source.}
    \figuresource{Source if applicable.}
\end{figure}
```

**Rules:**
- Every figure gets a `\figurenote{}` explaining what the reader should see.
- `\figuresource{}` when the data comes from an external source.
- For side-by-side figures, use `subcaption` with two `\begin{subfigure}` environments.

### Project folder structure

```
paper/
├── main.tex              ← the paper
├── references.bib        ← bibliography
├── tables/
│   ├── table_results.tex
│   ├── table_robustness.tex
│   └── ...
└── figures/
    ├── density_scores.png
    ├── spending_trends.png
    └── ...
```

---

## Citations

**Always use `natbib` commands**, never hardcode references.

| Pattern | Command | Output |
|---------|---------|--------|
| In-text | `\citet{Autor2003}` | Autor (2003) |
| Parenthetical | `\citep{Autor2003}` | (Autor, 2003) |
| Multiple | `\citep{Autor2003, Acemoglu2024}` | (Autor, 2003; Acemoglu, 2024) |
| With page | `\citep[p.~15]{Autor2003}` | (Autor, 2003, p. 15) |

End the document with:

```latex
\bibliography{references}  % or whatever the .bib file is named
\end{document}
```

---

## Equations

```latex
\begin{equation}
C_{it} = f(X_{it}, \varepsilon_{it})
\label{eq:cost}
\end{equation}
```

Define variables immediately after the equation in an indented minipage or inline text. Reference as `Equation~\eqref{eq:cost}`.

---

## Cross-Referencing

- Figures: `Figure~\ref{fig:label}`
- Tables: `Table~\ref{tab:label}`
- Equations: `Equation~\eqref{eq:label}`
- Sections: `Section~\ref{sec:label}`

Always use `~` (non-breaking space) before `\ref`.

---

## Differences from the FMM LaTeX Paper Preamble

This template is for academic papers and differs from the FMM LaTeX paper
preamble (`fmm_paper_preamble.tex`, used via `fmm_paper_latex_skill.md` for
policy notes and institutional documents):

| Feature | Academic paper | FMM paper |
|---------|---------------|-----------|
| Margins | 1 inch all around | 1 inch all around |
| Spacing | 1.5 (`\onehalfspacing`) | Single |
| Font | Latin Modern (default) | Default LaTeX |
| Title page | Custom `\titlepage` with author minipages | Centered title block |
| Headers/footers | None (clean) | FMM branded header + IDB logo footer |
| Section titles | Default LaTeX (black) | PrimaryBlue colored |
| Link colors | `blue!60!black` (academic convention) | PrimaryBlue |
| Andrea's palette | Defined, but ONLY for figures/TikZ/pgfplots | Used throughout (chrome + figures) |
| Bibliography | `natbib` + `.bib` file | Inline or `natbib` |

**Key point:** the academic paper preamble defines Andrea's color palette
so that figures and TikZ diagrams can use the same colors as in FMM
documents — because a chart often appears in both an academic paper and a
policy note. But the document chrome (titles, sections, links) is academic,
not FMM-branded.

---

*Last updated: May 28, 2026 — v2.0.0 (v3.2: corrected the "Differences from the FMM LaTeX Paper Preamble" table — the FMM paper margin was listed as 1.25 inch, but `fmm_paper_preamble.tex` was reduced to 1 inch on April 22, 2026, so both templates are now 1 inch. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.2 (May 13, 2026) — preamble extracted to `academic_paper_preamble.tex` as part of v3.0 work, Andrea's palette added for figure/TikZ use, document chrome unchanged.)*
