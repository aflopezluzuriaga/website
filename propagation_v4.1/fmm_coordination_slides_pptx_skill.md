---
name: fmm-coordination-slides-pptx
description: "Use this skill when Andrea asks to create, edit, or work on FMM division coordination slides as a PowerPoint deck — internal presentations for division meetings, strategic planning, knowledge updates, brainstorming sessions, or process documentation, delivered as a .pptx. Triggers include: 'make a PowerPoint for the division meeting,' 'pptx coordination slides,' 'PowerPoint version of the division deck,' 'slides for Marta in PowerPoint,' or any reference to a .pptx for internal FMM use. This is the PowerPoint variant; for the Beamer/LaTeX variant use fmm_coordination_slides_latex_skill.md. Do NOT use for academic presentations (conference talks, paper presentations, seminar slides) — those use academic_slides_skill.md."
---

# FMM Coordination Slides Skill — PowerPoint (.pptx)

Template and formatting conventions for internal FMM division slides delivered as a PowerPoint deck. These are coordination and planning presentations — division meetings, strategic maps, knowledge agenda updates, brainstorming sessions, process documentation. This is the PowerPoint counterpart of the Beamer/LaTeX variant (`fmm_coordination_slides_latex_skill.md`); the two share the same visual identity, backgrounds, and palette, and differ only in production technology.

**Technology:** `python-pptx`, building the deck programmatically (`pip install python-pptx`). Follow the general pptx skill at `/mnt/skills/public/pptx/SKILL.md` for environment setup, rendering to images, and the required visual-QA loop. This skill adds Andrea's FMM coordination conventions on top.

**Implementation:** The executable chrome lives in `fmm_coordination_slides_pptx_preamble.py` (the paired helper module, parallel to `fmm_word_preamble.js` for Word). It carries the palette, the Arial font, full-bleed backgrounds, the safe-zone constants, and thin slide scaffolds. Import and use it rather than re-deriving chrome. **Colors come from `andreas_palette.md`** — the module's `COLORS` dict mirrors the palette; never edit it independently. When updating formatting, update this skill and the module; when updating colors, update `andreas_palette.md` and sweep all consuming files in one atomic commit.

**Rule:** Read this skill before creating or editing any FMM PowerPoint coordination deck. Do not rely on memory of its contents from prior conversations.

---

## Before Starting — Ask Andrea

1. **Language:** Default is English. Ask: "English or Spanish for this deck?" Keep one language consistently within a deck.
2. **Body background:** Ask: "Light blue or white background for body slides?"
   - **Light blue:** `BackgroundBody.png` — soft gradient with logos (`background_choice="blue"`)
   - **White:** `BackgroundBodyWhite.png` — clean white with logos (`background_choice="white"`)
   - The title slide always uses `BackgroundTitle.png` (dark blue with logos).

---

## Color Palette

Uses Andrea's palette. See `andreas_palette.md` for the full set of colors, their character, and aesthetic principles. The `COLORS` dict in `fmm_coordination_slides_pptx_preamble.py` mirrors the palette — never edit it independently; update the palette and sweep all consuming files in one atomic commit.

**Slide-specific role assignments:**
- Frame (body) titles: PrimaryBlue
- Title-slide main title: **DarkYellow**, with a white subtitle
- Bullet markers: PrimaryBlue (`▪`); bold lead-ins in DarkBlue, body text in black
- Accents (a highlighted callout, a "decision needed" pill): BrightBlue — **sparingly**; BrightYellow / BrightGreen only when a sharper pop is needed, never as fills
- Status dots (action items): DeepGreen (done), BrightBlue (in progress), LabelGray (pending)
- Secondary labels (owners, dates): LabelGray
- Heatmaps / conditional formatting: WarmCream (high), SoftBlue (mid), LightGreen (low)

**Load-bearing constraint — title placement.** On `BackgroundTitle.png` the right ~third brightens to cyan; DarkYellow title text only reads in the dark left zone. Keep the title within `TITLE_SAFE_WIDTH` (the `title_slide()` scaffold already does this) — do not center it across the slide or let it run into the bright edge.

---

## The Helper Module

The full chrome lives in `fmm_coordination_slides_pptx_preamble.py`. Import it and build on its scaffolds:

```python
from fmm_coordination_slides_pptx_preamble import (
    new_deck, title_slide, body_slide, bullets, callout, action_slide,
    textbox, run, color, COLORS, FONT, LOGO_SAFE_BOTTOM,
)

prs = new_deck()                                  # blank 16:9 deck
title_slide(prs, "Deck Title", "Subtitle line")   # DarkYellow title in the dark zone
s, top = body_slide(prs, "Frame title", "white")  # PrimaryBlue title; returns content_top
bullets(s, [("Lead-in. ", "supporting detail."), "plain bullet"])
prs.save("deck.pptx")
```

### Key module rules

- **The scaffolds set chrome, not content.** `title_slide`, `body_slide`, `action_slide` place the background and the load-bearing title; the caller adds the body. For any slide the scaffolds don't cover (two-column, a stat callout, a custom diagram), drop to raw `python-pptx` using `textbox()`, `run()`, and `color()` — don't force-fit a scaffold.
- **Keep content above `LOGO_SAFE_BOTTOM`.** The FMM and IDB logos are baked into the bottom corners of every background image — never place content over them, and never add a separate logo (it's already in the asset).
- **Backgrounds are full-bleed images**, applied by `background()`/the scaffolds. Don't recolor slide backgrounds with fills; use the provided PNGs.
- **Font is Arial** (`FONT`), matching the FMM Word documents. PowerPoint has Arial natively; the Beamer variant rides LaTeX's default sans, so the two production paths render in different-but-equivalent sans faces by design.

---

## Slide Types

### Title slide

Dark background, DarkYellow title in the dark left zone, white subtitle, no extra logo. `title_slide(prs, title, subtitle)`.

### Text + bullets slide

The most common type. PrimaryBlue frame title; bold DarkBlue lead-in labels do the structural work; `▪` markers in PrimaryBlue.

- Frame titles are concise — topic or section name, not full sentences.
- Keep bullet text to 1–2 lines; if a bullet needs more, make it a short paragraph above the list.
- Avoid nesting deeper than two levels.
- An accent `callout()` (BrightBlue) can flag a decision or deadline — use at most one per slide.

### Action item slide

For strategic plans, work assignments, initiative tracking. `action_slide(prs, title, rows)` where each row is `(status_color, task, owner)`: a status dot (DeepGreen done / BrightBlue in-progress / LabelGray pending), the task in bold DarkBlue, the owner in LabelGray.

- Defaults to the **white** background for legible owner labels. The light-blue background is fine too, but LabelGray owners read faint on it — use blue only when owners are deliberately de-emphasized.

### Diagrams: native shapes vs. external SVG/image

Mirrors the LaTeX variant's TikZ-vs-SVG choice, adapted for PowerPoint:

- **Native PowerPoint shapes** (autoshapes + connectors via `python-pptx`) when the diagram is a flow of content boxes with arrows — strategic maps, hierarchies, process flows. Use LightBlue box fills, PrimaryBlue connectors, DarkBlue/DarkGreen emphasis nodes, consistent with the palette roles.
- **External SVG/PNG** (authored via `visuals_workflow_skill.md`) when the diagram has significant illustrative content beyond boxes and arrows (a utility-function graph, an annotated economic diagram, a density plot), needs precise positioning of many elements, or will be reused outside the deck. Generate it through the visuals workflow and place it with `add_picture()`.

---

## Content Guidelines

These are **internal coordination slides** — not public-facing, not academic.

- **Concise and action-oriented.** Each slide informs, assigns, or decides.
- **One idea per slide.** If a slide has more than one topic, split it.
- **Bold lead-ins do the structural work** — the audience should scan the bold text and grasp the slide without reading the detail.
- **Spanish or English consistently** within a deck.
- **Every slide carries a background and stays clear of the baked-in logos.** No text-over-logo, no added logos.

---

## Required Assets

These files must be in the build directory (passed as `asset_dir`, default the current directory):

| File | Purpose |
|------|---------|
| `BackgroundTitle.png` | Dark blue title slide background with FMM + IDB logos |
| `BackgroundBody.png` | Light blue body slide background with logos (option A) |
| `BackgroundBodyWhite.png` | White body slide background with logos (option B) |

Plus the helper module `fmm_coordination_slides_pptx_preamble.py`. Additional image assets (icons, diagrams) are project-specific.

---

## Markdown Mirror Convention

When creating a deck, also create a `_text.md` file alongside the `.pptx`. It contains the plain-text content of every slide, one section per slide, for (1) easy diffing in GitHub when content changes and (2) a readable reference without opening PowerPoint. Update the mirror whenever the deck changes. Include a version number and date at the top.

---

## QA

Follow the visual-QA loop in `/mnt/skills/public/pptx/SKILL.md`: render to images, inspect for overflow / low contrast / content over the baked-in logos / DarkYellow title drifting into the bright edge, fix once, re-verify. The most common defects here are title text straying out of the dark zone and content colliding with the bottom-corner logos.

---

*Last updated: May 28, 2026 — v2.0.0 (v3.2: new skill. PowerPoint variant of the FMM coordination deck, split out alongside the renamed `fmm_coordination_slides_latex_skill.md`; programmatic python-pptx build paired with `fmm_coordination_slides_pptx_preamble.py`. Encodes the title/background/palette treatment validated with Andrea. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close.)*
