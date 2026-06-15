---
name: fmm-coordination-slides-latex
description: "Use this skill when Andrea asks to create, edit, or work on FMM division coordination slides — internal presentations for division meetings, strategic planning, knowledge updates, brainstorming sessions, or process documentation. Triggers include: 'make slides for the division meeting,' 'coordination slides,' 'slides for Marta,' 'division presentation,' 'update the strategic map,' or any reference to Beamer slides for internal FMM use. This is the Beamer/LaTeX variant; for a PowerPoint deck use fmm_coordination_slides_pptx_skill.md. Do NOT use for academic presentations (conference talks, paper presentations, seminar slides) — those use academic_slides_skill.md."
---

# FMM Coordination Slides Skill — Beamer / LaTeX

Beamer template and formatting conventions for internal FMM division slides. This is the Beamer/LaTeX variant; the PowerPoint counterpart is `fmm_coordination_slides_pptx_skill.md`, which shares the same backgrounds and palette. These are coordination and planning presentations — division meetings, strategic maps, knowledge agenda updates, brainstorming sessions, process documentation.

**Technology:** LaTeX Beamer, compiled via Overleaf or local LaTeX installation.

**Rule:** Read this skill before creating or editing any FMM coordination slides. Do not rely on memory of its contents from prior conversations.

---

## Before Starting — Ask Andrea

1. **Language:** Default is English. Ask: "English or Spanish for this deck?" If Spanish, use `\usepackage[spanish]{babel}`.
2. **Body background:** Ask: "Light blue or white background for body slides?"
   - **Light blue:** `BackgroundBody.png` — soft gradient with logos
   - **White:** `BackgroundBodyWhite.png` — clean white with logos
   - The title slide always uses `BackgroundTitle.png` (dark blue with logos).

---

## Color Palette

Uses Andrea's palette. See `andreas_palette.md` for the full set of colors,
their character, and aesthetic principles. The colors defined in the preamble
file (`fmm_coordination_slides_preamble.tex`) mirror the palette — never edit
them independently; update the palette and sweep all consuming files in one
atomic commit.

**Slide-specific role assignments:**
- Frame titles: PrimaryBlue
- Bullet and sub-bullet markers: SecondaryBlue
- Page numbers: PrimaryBlue (centered, hidden on title slide)
- TikZ arrows: PrimaryBlue
- TikZ content boxes: LightBlue fill
- tcolorbox frames and title pills: SecondaryBlue
- Heatmaps / conditional formatting: WarmCream (high), SoftBlue (mid), LightGreen (low)

---

## Beamer Preamble

The full Beamer preamble lives in `fmm_coordination_slides_preamble.tex`.
When generating a slide deck, **copy the preamble's contents into the top
of the main `.tex` file** you produce — do not `\input{}` it. The preamble
begins with `\documentclass{beamer}` and is designed to be the literal start
of a standalone `.tex` file, not an included fragment.

### Key preamble rules

- **Colors mirror `andreas_palette.md`.** Never edit the colors block in the
  preamble file independently. To add or change a color, update the palette
  and sweep all consuming files in one atomic commit (see the palette file's
  "Files that mirror this palette" section).
- **Background image choice.** The preamble defaults to
  `BackgroundBodyWhite.png` for body slides. If Andrea chose the light-blue
  background, change the filename to `BackgroundBody.png` on the line marked
  in the preamble file. The title slide always uses `BackgroundTitle.png`.
- **The body font is Beamer's default sans** (Computer Modern Sans). The
  preamble loads no custom font package and sets no font directives — Beamer's
  default font theme is already sans. (v3.2 dropped the prior
  `\usepackage[sfdefault]{FiraSans}` in favor of the default.)

---

## Slide Types

### Title slide

Uses the dark blue background. White bold title, white date. No page number.

```latex
{
\setbeamertemplate{background canvas}[title]
\begin{frame}
\titlepage
\end{frame}
}
```

### Text + bullets slide

The most common slide type. Bold lead-in labels for structure.

```latex
\begin{frame}{Frame Title Here}
\textbf{Key point:} Supporting explanation.

\begin{itemize}
    \item \textbf{Label:} Detail or explanation.
    \item \textbf{Label:} Detail or explanation.
\end{itemize}
\end{frame}
```

**Formatting rules:**
- Frame titles are concise — topic or section name, not full sentences.
- Use `\textbf{}` lead-ins for structure (Contexto, Objetivo, Formato, Responsable, Recursos, Proceso, etc.).
- Keep bullet text to 1–2 lines. If a bullet needs more, it should be a paragraph above the list.
- Sub-bullets for secondary detail only — avoid nesting deeper than two levels.

### Action item slide

For strategic plans, work assignments, initiative tracking.

```latex
\begin{frame}{Section Title}
\textbf{Initiative description in one sentence}

Supporting paragraph with context — what and why.

\begin{itemize}
    \item \textbf{Formato:} What the deliverable looks like
    \item \textbf{Responsable(s):} Who owns it
    \item \textbf{Recursos:} Budget or resource needs
\end{itemize}
\end{frame}
```

### Diagram source: TikZ vs. SVG

Diagrams inside slides can be authored two ways: **TikZ inside the .tex** (native Beamer) or **external SVG files** authored via `visuals_workflow_skill.md` and included as image files. The choice depends on what kind of diagram it is.

**Use TikZ when:**
- The diagram is a flow of content boxes with arrows — strategic maps, hierarchies, decision trees, process flows. TikZ's box + arrow primitives are designed for this and the preamble already defines the necessary styling (LightBlue fills, PrimaryBlue arrows, DarkBlue/DarkGreen emphasis nodes, tcolorbox process flows).
- The diagram needs to align with text or other Beamer elements at compile time (positions relative to slide layout).
- The diagram uses `\pause` or other Beamer overlay reveals that need to be part of the .tex flow.
- The diagram is mostly text with small geometric scaffolding (org charts, simple flowcharts).

**Use SVG (via the visuals workflow) when:**
- The diagram has significant illustrative content beyond box + arrow primitives — e.g., a graph of a utility function with annotations, a stylized economic diagram with axes and curves, a density plot with annotated dots.
- The diagram needs precise positioning of many elements that TikZ-by-hand would make tedious.
- The same diagram may be reused outside the deck (handout, paper, poster). SVG is portable; TikZ is bound to a Beamer project.
- The diagram benefits from iteration via chat-rendered previews (visual feedback faster than LaTeX compile cycles).

When SVG is the right choice, `visuals_workflow_skill.md`'s three-stage workflow applies: sketch + description in the markdown deck mirror first, review on the branch, then SVG iteration post-merge with chat previews. SVGs live in `workspace/visuals/` and are pulled into the Beamer deck as `\includegraphics{...}` (after conversion to PDF or PNG, or via `\includesvg` if the preamble enables it).

### TikZ diagram slide

For strategic maps, knowledge product hierarchies, process flows. Use the color conventions:
- Content boxes: `fill=LightBlue`, `draw=PrimaryBlue` or no border
- Emphasis/central nodes: `draw=DarkBlue` (fiscal/institutional topics) or `draw=DarkGreen` (research/analytical topics)
- Arrows: PrimaryBlue, `Stealth` tips
- Text labels: `\bfseries\small` for box titles

### tcolorbox process flow

For multi-step processes shown as horizontal boxes with arrows.

```latex
\newtcolorbox{stepbox}[1][]{
  enhanced, colback=white, colframe=SecondaryBlue,
  width=0.29\textwidth, arc=8pt, boxrule=0.9pt,
  attach boxed title to top center={yshift=-2mm},
  colbacktitle=SecondaryBlue, coltitle=white,
  fonttitle=\bfseries\small,
  boxed title style={colback=SecondaryBlue, boxrule=0pt, arc=6pt},
  before upper={\setlength{\parskip}{2pt}\setlength{\itemsep}{2pt}},
  #1
}
```

Place boxes in a `tikzpicture` with `\node` and connect with gray arrows.

---

## Content Guidelines

These are **internal coordination slides** — not public-facing, not academic.

- **Concise and action-oriented.** Each slide should have a clear purpose: inform, assign, or decide.
- **One idea per slide.** If a slide has more than one topic, split it.
- **Bold lead-ins do the structural work.** The audience should be able to scan the bold text and understand the slide's structure without reading the detail.
- **Spanish or English consistently** within a deck — do not mix unless quoting a title or term of art.
- **Pause (`\pause`) sparingly.** Use for sequential reveals when presenting process steps or changes. Do not pause every bullet.

---

## Required Assets

These files must be in the same directory as the .tex file (or accessible via path):

| File | Purpose |
|------|---------|
| `BackgroundTitle.png` | Dark blue title slide background with FMM + BID logos |
| `BackgroundBody.png` | Light blue body slide background with logos (option A) |
| `BackgroundBodyWhite.png` | White body slide background with logos (option B) |

Additional image assets (icons, diagrams) are project-specific — not part of the generic template.

---

## Markdown Mirror Convention

When creating a slide deck, also create a `_text.md` file alongside the `.tex` file. This markdown file contains the plain-text content of every slide, one section per slide. It serves two purposes: (1) easy diffing in GitHub when the slide content changes, and (2) a readable reference for reviewing slide text without opening LaTeX. Update the markdown mirror whenever the `.tex` file is updated. Include a version number and date at the top.

---

*Last updated: May 28, 2026 — v2.0.0 (v3.2: renamed from `fmm_coordination_slides_skill.md` to `fmm_coordination_slides_latex_skill.md` and split into format variants — the new `fmm_coordination_slides_pptx_skill.md` is the PowerPoint counterpart; frontmatter `name` and the description updated to disambiguate the Beamer/LaTeX variant. Earlier this cycle: dropped the custom FiraSans body font for Beamer's default sans and collapsed two stacked markers. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v3.1 (May 28, 2026) — added the TikZ-vs-SVG subsection; v1.3 (May 13, 2026) — preamble extracted to `fmm_coordination_slides_preamble.tex`, palette pointed to `andreas_palette.md`.)*
