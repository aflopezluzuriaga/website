---
name: andreas-palette
description: "Andrea's canonical color palette for documents, slides, charts, diagrams, and any visual content. Read this skill whenever colors are needed for a deliverable and Andrea hasn't specified otherwise — code-generated charts (Python/R/Stata plots), TikZ or pgfplots figures, ad-hoc diagrams, slide accents, table fills. The palette is also the source of truth for the six preamble files in the kit that mirror it (the LaTeX preambles, fmm_word_preamble.js, fmm_coordination_slides_pptx_preamble.py); when colors are added or changed here, those mirrors must be updated in the same atomic commit. Triggers include: 'use Andrea's palette,' 'use my colors,' 'pick a color for this chart,' or any request to generate a visual where Andrea hasn't named specific colors."
---

# Andrea's Palette

Andrea's color palette for documents, slides, charts, diagrams, and any
other visual content. The palette is the canonical source of truth — every
file in the kit that defines colors mirrors what's here.

This file is also the default reference whenever colors are needed and
Andrea hasn't specified otherwise (a code-generated chart, a diagram, an
ad-hoc visualization). See the "How Andrea uses these colors" section
below for aesthetic guidance.

---

## The Palette

| Name | Hex | RGB | Character |
|---|---|---|---|
| PrimaryBlue   | `#196E8C` | (25, 110, 140)   | Strong saturated blue. Andrea's dominant accent. |
| SecondaryBlue | `#5E90A8` | (94, 144, 168)   | Mid-saturation blue. Pairs with PrimaryBlue as secondary accent. |
| LightBlue     | `#CBD8DF` | (203, 216, 223)  | Muted pale blue. Backgrounds, subtle borders. |
| DarkBlue      | `#004B70` | (0, 75, 112)     | Deep blue. Emphasis, bold lead-ins, contrast. |
| SoftBlue      | `#ADD8E6` | (173, 216, 230)  | Lighter pale blue, slightly warmer than LightBlue. Soft highlights, mid-intensity heatmaps. |
| DarkGreen     | `#4C7234` | (76, 114, 52)    | Muted forest green. Secondary emphasis, curves and frontiers in diagrams. |
| LightGreen    | `#B4C896` | (180, 200, 150)  | Sage/olive light green. Low-intensity highlights. |
| WarmCream     | `#FFF3D6` | (255, 243, 214)  | Warm yellow-cream. High-intensity heatmap cells, warm accents. |
| DarkYellow    | `#F7E272` | (247, 226, 114)  | Soft saturated yellow. FMM presentation title text on the dark title slide (subtitles white). Slide chrome, not a document/chart color. |
| MintGreen     | `#9FD0A3` | (159, 208, 163)  | Cool mint green. Second/contrast green for SVGs and figures; pairs cleanly against DarkGreen. |
| BrightBlue    | `#009ADE` | (0, 154, 222)    | Vivid azure. Accent/highlight only — table emphasis, callouts, elements that must pop. Not a fill or default. |
| BrightYellow  | `#FFDA00` | (255, 218, 0)    | Bright gold. Sparing accent/pop for visuals only; never a fill. |
| BrightGreen   | `#8DBA38` | (141, 186, 56)   | Punchy lime. Sparing accent/pop for visuals only; never a fill. |
| DeepGreen     | `#308144` | (48, 129, 68)    | Clean deep green. Reserve fourth green for labels/series when the other greens are in use. |
| LabelGray     | `#A6A6A8` | (166, 166, 168)  | Neutral mid-gray. Secondary labels/annotations on charts and images; not axes or gridlines (those stay black). |

---

## How Andrea uses these colors

- **Blues are the workhorses.** Text headings, the main series in a chart,
  the dominant shape in a diagram. PrimaryBlue is the default first color.
- **Other colors are for contrast and emphasis** — secondary series,
  accent elements, callouts. Not for large areas.
- **Axes, gridlines, and chart frames are always black.** Never colored.
- **Prefer toned-down/muted variants for large areas.** Save saturated
  colors for small accents. LightBlue, LightGreen, and WarmCream are
  preferred for backgrounds and large fills; PrimaryBlue and DarkBlue
  for small dominant elements.

**The colors added May 2026 have specific, narrower roles** (they extend the set above without changing its muted character):

- **DarkYellow** is slide chrome — the FMM presentation title on the dark title slide, with white subtitles. Not a document or chart color.
- **MintGreen** and **DeepGreen** are extra greens: MintGreen gives contrast in SVGs/figures (pairs against DarkGreen); DeepGreen is a reserve fourth green for labels/series when the others are taken.
- **BrightBlue**, **BrightYellow**, and **BrightGreen** are bright accents — used *sparingly* to make one thing pop (a highlighted cell, a callout), never as fills. They deliberately break the muted character above, so keep them to small accents.
- **LabelGray** is for secondary labels/annotations on charts and images, sitting between black and white. Axes and gridlines still stay black.

When invoking this palette for a chart, diagram, or ad-hoc visual, apply
these principles unless Andrea specifies otherwise.

When authoring visuals for markdown deliverables (sketches reviewed in
markdown, SVGs generated post-merge), see `visuals_workflow_skill.md`
for the three-stage workflow that consumes this palette.

---

## Files that mirror this palette

When colors here are added or changed, the following files must be
updated in the same atomic commit:

- `fmm_paper_preamble.tex` — FMM LaTeX paper preamble (`\definecolor` block)
- `fmm_word_preamble.js` — Word document generator (`COLORS` object)
- `academic_paper_preamble.tex` — academic LaTeX paper preamble (colors used for figures, TikZ, pgfplots; not for document chrome)
- `academic_slides_preamble.tex` — academic Beamer slides preamble
- `fmm_coordination_slides_preamble.tex` — FMM coordination Beamer slides preamble
- `fmm_coordination_slides_pptx_preamble.py` — FMM coordination PowerPoint chrome/helpers module (`COLORS` dict)

**Chrome/utility exemption (scoped).** The mirrors may define exactly three
implementation utilities that are **not** part of this design palette: `Black`
(`#000000`), `White` (`#FFFFFF`), and `AltRowShade` (`#F5F9FB` — alternating
table-row shading). The consistency check verifies the expressive palette above
is mirrored exactly and does not flag these three; any **other** color appearing
in a consumer file but not in this palette is still drift.

See `housekeeping_skill.md` for the consistency check that verifies these
files stay in sync with this palette.

---

## A note on names

These names match the FMM division's color conventions as of May 2026.
Andrea's palette and FMM's are coincidentally aligned — they started as
distinct, FMM standardized, Andrea adopted the FMM values because the
change didn't bother her. If FMM ever revises its colors again, Andrea's
palette won't automatically follow — that's a separate decision.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: `fmm_coordination_slides_pptx_preamble.py` added to the mirror list and the frontmatter count (five → six preamble mirrors — A′-1; content verified in sync, the instrument was blind); the scoped chrome/utility exemption stated — Black/White/AltRowShade are implementation utilities the consistency check does not flag (A′-8, Andrea's call: exemption over adding utilities to the palette table); the surviving standalone v1.0 marker collapsed into this footer (its content lives in the Prior chain). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: May 28, 2026 — v2.0.0 (v3.2: added seven palette colors — DarkYellow, MintGreen, BrightBlue, BrightYellow, BrightGreen, DeepGreen, LabelGray — with roles, mirrored into all five preamble/JS files in the same commit; collapsed stacked version markers into this single line per the marker-discipline rule. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v3.1 (May 28, 2026) — added cross-reference to `visuals_workflow_skill.md`, sourced from SimplifiedRegimen; v1.2 (May 13, 2026) — `word_preamble.js`->`fmm_word_preamble.js` rename in frontmatter and mirror list; v1.0 (May 13, 2026) — created in v3.0 work, reconciled palette drift (SoftBlue/WarmCream).)*
