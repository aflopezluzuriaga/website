---
name: academic-slides
description: "Use this skill when Andrea asks to create, edit, or work on academic presentation slides — conference talks, seminar presentations, paper presentations, workshop slides. Triggers include: 'conference slides,' 'seminar presentation,' 'slides for my paper,' 'presentation for [conference name],' or any reference to Beamer slides for an academic audience. Do NOT use for internal FMM coordination slides (division meetings, strategic planning) — those use fmm_coordination_slides_latex_skill.md or fmm_coordination_slides_pptx_skill.md."
---

# Academic Slides Skill

Beamer template and formatting conventions for academic presentations — conference talks, seminars, paper presentations, workshops.

**Technology:** LaTeX Beamer (Boadilla theme with custom colors), compiled via Overleaf or local LaTeX installation.

**Rule:** Read this skill before creating or editing any academic slides. Do not rely on memory of its contents from prior conversations.

---

## Before Starting — Ask Andrea

1. **Language:** Default is English. Ask: "English or Spanish for this deck?" If Spanish, use `\usepackage[spanish]{babel}`.
2. **Confirm the following:**
   - Paper title
   - Authors and affiliations
   - Conference/seminar name and date
   - Whether this is co-authored (affects "I" vs. "we" in slide text)

---

## Color Palette

Uses Andrea's palette. See `andreas_palette.md` for the full set of colors,
their character, and aesthetic principles. The colors defined in the preamble
file (`academic_slides_preamble.tex`) mirror the palette — never edit them
independently; update the palette and sweep all consuming files in one atomic
commit.

**Slide-specific role assignments:**
- Frame title bar: PrimaryBlue background, white text
- Bullet markers: SecondaryBlue
- Section divider text: PrimaryBlue
- Block titles: PrimaryBlue (via Boadilla theme)
- Table highlights: `\rowcolor{LightBlue}`
- TikZ diagrams: PrimaryBlue for points/lines, DarkGreen for curves/frontiers, SecondaryBlue for annotations
- Heatmaps / conditional formatting: WarmCream (high), SoftBlue (mid), LightGreen (low)

---

## Beamer Preamble

The full Beamer preamble lives in `academic_slides_preamble.tex`. When
generating a slide deck, **copy the preamble's contents into the top of the
main `.tex` file** you produce — do not `\input{}` it. The preamble begins
with `\documentclass{beamer}` and is designed to be the literal start of a
standalone `.tex` file, not an included fragment.

### Key preamble rules

- **Colors mirror `andreas_palette.md`.** Never edit the colors block in the
  preamble file independently. To add or change a color, update the palette
  and sweep all consuming files in one atomic commit (see the palette file's
  "Files that mirror this palette" section).
- **Beamer theme colors are set explicitly** (`\setbeamercolor{...}`) rather
  than relying on Boadilla defaults. If overriding, edit the preamble file,
  not the skill.
- **IDB logo overlay on non-title slides** is implemented via
  `\addtobeamertemplate{frametitle}` — keep this; do not move to per-frame
  manual placement.
- **Hyperref must be loaded last among packages** that interact with links.
  The preamble file orders packages accordingly.

---

## Title Page

The title page includes: title, authors with affiliations, conference/seminar name, date, and the IDB logo.

```latex
\title[Short Title]{Full Paper Title}
\author[LastName et al.]{
  Author One\inst{1} \and Author Two\inst{2} \and Author Three\inst{1}
}
\institute[]{
  \scriptsize{
    \inst{1} Inter-American Development Bank
    \and \inst{2} University Name, Department
  }
}
\date[MM-DD-YYYY]{Conference or Seminar Name \\ Month Day, Year}

\titlegraphic{
  \vspace{-0.5cm}
  \includegraphics[height=0.35in]{IDBLogo.png}
}
```

**Rules:**
- Full title in the main `\title{}`, short title in brackets for the footer bar.
- Authors listed with `\inst{}` markers linking to affiliations.
- `\date{}` carries both the conference/seminar name and the date — conference name on the first line, date on the second.
- IDB logo in `\titlegraphic{}` at 0.35in height (same as non-title slides).
- Andrea uses `\inst{$*$}` and `\inst{$\ddagger$}` symbols rather than numbers — either convention is fine, confirm with Andrea.

---

## Presentation Structure

Academic presentations follow this arc:

### 1. Title slide

```latex
\begin{frame}
\titlepage
\end{frame}
```

### 2. Motivation (1–2 slides)

Set up the problem. Why does this matter? End with the research question, often as a `\begin{block}` or a direct question.

### 3. Outline slide

List the remaining sections. Keep it simple — 4–6 items.

```latex
\begin{frame}{Outline}
\begin{itemize}
\item Background
\item Hypotheses
\item Empirical Strategy
\item Results
\item Conclusion
\end{itemize}
\end{frame}
```

### 4. Section divider slides

Every time the presentation moves to a new section from the outline, insert a divider slide. These are visually distinct — large PrimaryBlue text, centered, no other content. **Must use `[plain]` to suppress the frametitle bar overlay**, and `\vfill` above and below to vertically center the text.

```latex
\begin{frame}[plain]
\vfill
{\Huge \textcolor{PrimaryBlue}{
\begin{center}
Section Name
\end{center}}}
\vfill
\end{frame}
```

Use `\section{Section Name}` before the divider for navigation bar tracking.

### 5. Content slides

The body of the presentation. See Slide Types below.

### 6. Conclusion (1–2 slides)

Main findings, then policy implications. Each as a separate slide.

### 7. Thank you slide

```latex
\begin{frame}{Thank you!}
\begin{center}
\vspace{1cm}
Contact: \\
\texttt{email@iadb.org}
\end{center}
\end{frame}
```

### 8. Appendix (optional)

Detailed derivations, extra tables, robustness checks. Use `\appendix` and `\section*{Appendix}`. Link to appendix slides from the main presentation using `\beamergotobutton` and back using `\beamerreturnbutton`.

---

## Slide Types

### Text + bullets

The most common type. Same conventions as coordination slides: bold lead-ins, 1–2 line bullets, max two nesting levels.

### Two-column layout

Use when showing a figure alongside interpretation, or two related charts.

```latex
\begin{columns}[t]
\begin{column}{0.48\textwidth}
  % Left content (figure or text)
\end{column}
\begin{column}{0.48\textwidth}
  % Right content (interpretation or second figure)
\end{column}
\end{columns}
```

**Prefer two-column layouts when possible** — they use slide space efficiently and keep figures next to their interpretation.

### Block slides

For hypotheses, key questions, or highlighted results. Boadilla theme styles these with PrimaryBlue headers.

```latex
\begin{block}{Hypothesis 1: Fragmentation}
Statement of the hypothesis.
\end{block}
```

### Equation slides

Equations in `\begin{equation}` with variable definitions below in an indented `\begin{minipage}`.

```latex
\begin{equation}
C_{it} = f(X_{it}, PSE_{it})
\end{equation}

\hspace{2.5cm}\begin{minipage}{0.78\textwidth}
\begin{itemize}
\item $C_{it}$: Description
\item $X_{it}$: Description
\end{itemize}
\end{minipage}
```

### Table slides

Use `booktabs` (`\toprule`, `\midrule`, `\bottomrule`). Highlight key rows with `\rowcolor{LightBlue}`. Wrap in `\begin{small}` if the table is dense.

### Heatmap / conditional-color tables

For tables where cells should be colored by category (e.g., high/mid/low), use `\cellcolor` with the heatmap colors and `\makecell` for multi-line cell content (requires `\usepackage{makecell}`). Add a legend below the table.

```latex
\cellcolor{WarmCream}\makecell{$-$58.8\% \\ {\tiny ($-$63.6, $-$53.5)}}
```

Convention for three tiers:
- `WarmCream` — highest intensity
- `SoftBlue` — middle
- `LightGreen` — lowest intensity

Legend at the bottom of the table:
```latex
{\tiny \colorbox{WarmCream}{\strut} Higher ($>$X\%) \quad
\colorbox{SoftBlue}{\strut} Middle (Y--X\%) \quad
\colorbox{LightGreen}{\strut} Lower ($<$Y\%)}
```

### TikZ diagram slides

For conceptual frameworks, frontier illustrations, process diagrams. Use the color conventions from the palette. Scale diagrams with `scale=0.63` or similar to fit the slide.

### Navigation buttons

Use `\beamergotobutton` and `\beamerreturnbutton` with `\hyperlink` and `\label` to connect main slides to appendix detail. Place buttons at the bottom-right of the slide.

```latex
\hyperlink{TargetLabel}{\beamergotobutton{Button Text}}
% and on the target slide:
\hyperlink{SourceLabel}{\beamerreturnbutton{Back}}
```

---

## Formatting Rules

- **`\pause` for sequential reveals.** Use within slides to build arguments step by step. Especially useful for hypotheses (reveal one at a time) and results (show finding, then interpretation).
- **Significance stars** in tables: `* p<0.10, ** p<0.05, *** p<0.01` as a footnote below the table.
- **Bold for emphasis** within bullets: `\textbf{key term}` for the most important phrase in each bullet.
- **Equations are motivated.** Before showing an equation, explain in words what it captures. After, define each term.
- **Figures get interpretation.** Never show a figure without text explaining what the audience should see in it — either in a column next to it or in a line below.

---

## Required Assets

| File | Purpose |
|------|---------|
| `IDBLogo.png` | IDB logo, placed bottom-left on all non-title slides and in `\titlegraphic` on title slide (0.35in height) |

Additional figure files (charts, maps, density plots) are project-specific.

---

## Markdown Mirror Convention

When creating a slide deck, also create a `_text.md` file alongside the `.tex` file. This markdown file contains the plain-text content of every slide, one section per slide. It serves two purposes: (1) easy diffing in GitHub when the slide content changes, and (2) a readable reference for reviewing slide text without opening LaTeX. Update the markdown mirror whenever the `.tex` file is updated. Include a version number and date at the top.

---

*Last updated: May 28, 2026 — v2.0.0 (v3.2: aligned the Color Palette section's heatmap tiers to WarmCream (high) / SoftBlue (mid) / LightGreen (low), matching this skill's own Heatmap/conditional-color-tables section and #12; the prior line conflicted (PrimaryBlue high / WarmCream low). Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v1.3 (May 13, 2026) — preamble extracted to `academic_slides_preamble.tex` as part of v3.0 work, Color Palette section pointed to `andreas_palette.md`.)*
