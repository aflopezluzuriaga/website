---
name: fmm-docx-formatting
description: "Visual formatting specification for Word (.docx) documents Andrea produces in her IDB Fiscal Management Division role — colors, fonts, spacing, tables, headers/footers, title blocks. Use whenever generating a .docx for Andrea: policy notes, knowledge briefs, division memos, institutional documents. Pairs with fmm_word_preamble.js as the executable implementation, and andreas_palette.md as the canonical color source. Triggers: 'make this into a Word doc,' 'export to docx,' 'generate the Word version,' 'format this as an FMM document,' or any request to produce a .docx deliverable in Andrea's institutional style. Does NOT cover writing voice or content strategy — for that use andrea_fmm_institutional_style_skill.md."
---

# FMM Document Formatting Skill — Word (.docx) Style Guide

**Purpose:** This skill defines the visual formatting for Word documents produced by Andrea Lopez-Luzuriaga in her role at the IDB Fiscal Management Division (FMM). Use this skill whenever producing a .docx file for Andrea. This covers colors, fonts, spacing, tables, headers/footers, and title blocks. It does NOT cover writing voice or content strategy — for that, see `andrea_fmm_institutional_style_skill.md`.

**Technology:** Documents are generated using `docx-js` (`npm install -g docx`). Follow the general docx skill at `/mnt/skills/public/docx/SKILL.md` for setup, validation, and technical rules. This skill adds Andrea's specific formatting preferences on top.

**Implementation:** The executable implementation of this style guide is `fmm_word_preamble.js` (in `skills/`). That file should always match these specifications. **Colors come from `andreas_palette.md` — the canonical source for the kit's palette.** When updating formatting, update this skill and `fmm_word_preamble.js`; when updating colors, update `andreas_palette.md` and sweep all consuming files per the palette's "Files that mirror this palette" section.

---

## Color Palette

Uses Andrea's palette. See `andreas_palette.md` for the full set of colors,
their character, and aesthetic principles. The colors defined in
`fmm_word_preamble.js` mirror the palette — never edit them independently;
update the palette and sweep all consuming files in one atomic commit.

All hex values omit the `#` prefix (docx-js convention).

`COLORS` is defined in `fmm_word_preamble.js`, which mirrors `andreas_palette.md` (the canonical source — names, hex/RGB, and character notes live there). Do **not** restate hex values in this skill; the examples below reference colors symbolically (`COLORS.PrimaryBlue`, `COLORS.Black`, …) and stay correct when the palette moves. The preamble also defines the implementation utilities (`Black`, `White`, `AltRowShade`) that are not part of the design palette.

**Usage rules:**
- Body text is always **black**.
- Titles and headings use the **blues** — never black, never green.
- PrimaryBlue for the main title and Heading 1.
- DarkBlue for bold lead-in phrases within paragraphs.
- SecondaryBlue for Heading 2, header, footer, and table column headers.
- Greens, SoftBlue, and WarmCream are reserved for future use (charts, callout boxes, status indicators).

---

## Typography

```javascript
const FONT = "Arial";
const TITLE_SIZE = 28;      // 14pt — maximum allowed
const HEADING1_SIZE = 26;   // 13pt
const HEADING2_SIZE = 24;   // 12pt
const BODY_SIZE = 22;       // 11pt
const FOOTNOTE_SIZE = 18;   // 9pt
```

**Rules:**
- **No font larger than 14pt.** Title is 14pt max. Andrea dislikes large fonts.
- Body text: 11pt Arial, black, justified.
- Footnotes: 9pt Arial.
- Line spacing: 276 (1.15x) for body paragraphs.
- Paragraph spacing: `{ after: 200 }` for body, `{ after: 120 }` for list items.

---

## Document Defaults

```javascript
styles: {
  default: {
    document: {
      run: { font: FONT, size: BODY_SIZE, color: COLORS.Black },
      paragraph: { alignment: AlignmentType.JUSTIFIED },
    },
  },
  // ... heading overrides below
}
```

**Paragraphs are justified by default.** Headings and title block elements override to LEFT or CENTER as needed.

---

## Heading Styles

```javascript
paragraphStyles: [
  {
    id: "Title", name: "Title", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { size: TITLE_SIZE, bold: true, font: FONT, color: COLORS.PrimaryBlue },
    paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER },
  },
  {
    id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { size: HEADING1_SIZE, bold: true, font: FONT, color: COLORS.PrimaryBlue },
    paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 },
  },
  {
    id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { size: HEADING2_SIZE, bold: true, font: FONT, color: COLORS.SecondaryBlue },
    paragraph: { spacing: { before: 240, after: 100 }, outlineLevel: 1 },
  },
  {
    id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { size: BODY_SIZE, bold: true, font: FONT, color: COLORS.SecondaryBlue },
    paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 2 },
  },
]
```

**No horizontal lines between sections.** Spacing only. Andrea dislikes section dividers.

---

## Title Block

The title block is **centered** and includes up to four elements:

1. **Title** — 14pt bold PrimaryBlue, centered (use the Title style)
2. **Subtitle** — 12pt PrimaryBlue, centered (optional; use when the title needs a second line explaining scope)
3. **Byline** — 11pt black, centered (optional; see "Byline rules" below)
4. **Source line** — 9pt black italic, centered (optional; use when the document is based on an external source)

### Byline rules — IMPORTANT

The byline is **optional and has no defaults**. Two specific rules:

- **Author name.** Do NOT add Andrea's name (or anyone else's) to the byline by default. Many FMM documents are co-produced — with Marta, Monica, Erivaldo, others — and unilaterally putting one name on a co-produced document is wrong. Before generating the docx, **always ask Andrea**: "Should your name go on this as author?" Ask the same question for any other author too. If she says no, omit the byline entirely. If she says yes, ask for the exact attribution she wants (e.g., just her name, or "Andrea Lopez-Luzuriaga and Monica Calijuri", etc.).
- **Date.** Do NOT include the date in the byline. The page header already shows "FMM — [month] [year]" on every page, so a date in the byline is redundant. The date stays in the header only.

If Andrea confirms a byline, render it as just the author name(s), no date — for example: `"Andrea Lopez-Luzuriaga"` or `"Andrea Lopez-Luzuriaga and Monica Calijuri"`.

```javascript
// Title
new Paragraph({
  style: "Title",
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Document Title Here", bold: true, size: TITLE_SIZE, font: FONT, color: COLORS.PrimaryBlue })],
}),
// Subtitle (optional)
new Paragraph({
  spacing: { after: 80 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Subtitle explaining scope", size: HEADING2_SIZE, font: FONT, color: COLORS.PrimaryBlue })],
}),
// Byline — OPTIONAL, only if Andrea confirms. Author name only, no date.
new Paragraph({
  spacing: { after: 300 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Andrea Lopez-Luzuriaga", size: BODY_SIZE, font: FONT, color: COLORS.Black })],
}),
// Source line (optional)
new Paragraph({
  spacing: { after: 300 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: "Based on [source document description]", size: FOOTNOTE_SIZE, font: FONT, color: COLORS.Black, italics: true })],
}),
```

**Andrea's name does NOT go in the title itself** — if a byline is added, it goes below the title.

---

## Header and Footer

The header carries the division label; the footer carries the page number and IDB logo. "FMM" appears only in the header to avoid duplication.

```javascript
// HEADER — right-aligned, 9pt SecondaryBlue italic
headers: {
  default: new Header({
    children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({
        text: "FMM — March 2026",
        font: FONT, size: FOOTNOTE_SIZE, color: COLORS.SecondaryBlue, italics: true
      })],
    })],
  }),
},

// FOOTER — page number (left) + IDB logo (right), using tab stops
footers: {
  default: new Footer({
    children: [new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: FOOTNOTE_SIZE, color: COLORS.SecondaryBlue }),
        new TextRun({ text: "\t" }),
        // IDB logo ImageRun appended here if KnowledgeLogo.png exists
      ],
    })],
  }),
},
```

**Rules:**
- Header: right-aligned, 9pt SecondaryBlue italic. Format: `"FMM — [month] [year]"`
- Footer: page number left (9pt SecondaryBlue), IDB logo right. No "FMM" text in the footer.
- **Note:** As of April 2026, the LaTeX preamble (`fmm_paper_preamble.tex`) matches the Word convention: header carries "FMM — [date]" (right-aligned, 9pt SecondaryBlue italic), footer has page number (left) + IDB logo (right), no "FMM" text. Previously the LaTeX footer included bold "FMM" text next to the logo because standalone PDFs needed the branding; this moved to the header for consistency with Word.

---

## Tables

Andrea prefers clean, minimal tables — no heavy borders, no grid lines between cells.

```javascript
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };

// Header row
new TableCell({
  borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 2, color: COLORS.PrimaryBlue }, left: noBorder, right: noBorder },
  shading: { fill: COLORS.LightBlue, type: ShadingType.CLEAR },
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({
    children: [new TextRun({ text: "Column Header", bold: true, font: FONT, size: BODY_SIZE, color: COLORS.DarkBlue })],
  })],
})

// Data row
new TableCell({
  borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.LightBlue }, left: noBorder, right: noBorder },
  shading: rowIdx % 2 === 1 ? { fill: COLORS.AltRowShade, type: ShadingType.CLEAR } : undefined,
  margins: { top: 50, bottom: 50, left: 100, right: 100 },
  children: [new Paragraph({
    children: [new TextRun({ text: "Cell value", font: FONT, size: BODY_SIZE, color: COLORS.Black })],
  })],
})
```

**Rules:**
- Header row: LightBlue background, DarkBlue bold text, PrimaryBlue bottom border only.
- Data rows: no vertical borders, subtle LightBlue bottom border, alternating row shading (`AltRowShade` on odd rows).
- No outer table borders.
- Always use `WidthType.DXA` (never percentage).
- Always use `ShadingType.CLEAR` (never SOLID).

---

## Lists

```javascript
numbering: {
  config: [
    {
      reference: "fmm-bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: 720, hanging: 360 } },
          run: { color: COLORS.PrimaryBlue },
        },
      }],
    },
    {
      reference: "fmm-numbers",
      levels: [{
        level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: 720, hanging: 360 } },
          run: { color: COLORS.PrimaryBlue, bold: true },
        },
      }],
    },
  ],
},
```

**Rules:**
- Bullet markers and numbers are PrimaryBlue.
- Numbers are bold.
- Use the "bold lead-in" pattern for list items: first phrase in bold (optionally DarkBlue), followed by regular-weight explanation.
- Never use unicode bullets manually — always use the numbering config.

---

## In-Paragraph Emphasis

For key findings or lead-in phrases within body paragraphs:

```javascript
new TextRun({ text: "Key finding statement. ", font: FONT, size: BODY_SIZE, bold: true, color: COLORS.DarkBlue }),
new TextRun({ text: "Supporting explanation and details follow in regular weight black text.", font: FONT, size: BODY_SIZE }),
```

This is the "bold lead-in" pattern — a short declarative statement in bold DarkBlue, followed by the elaboration in regular black. Use sparingly for the most important points. The `boldLeadIn()` helper in `fmm_word_preamble.js` generates this pattern.

---

## Page Setup

```javascript
page: {
  size: { width: 12240, height: 15840 },  // US Letter
  margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },  // 1 inch all around
}
```

Content width: 9360 DXA (for table widths).

**Note:** Both the Word documents and the FMM LaTeX preamble (`fmm_paper_preamble.tex`) use 1-inch margins, kept consistent across formats inside the IDB ecosystem (Outlook, Teams, printing), where 1 inch is standard. (The LaTeX preamble previously used 1.25 inch; it was reduced to 1 inch on April 22, 2026 for cross-format consistency.)

---

## Checklist Before Generating a Document

1. Read the general docx skill (`/mnt/skills/public/docx/SKILL.md`) for technical rules.
2. Set COLORS, FONT, and size constants as defined above — or use `fmm_word_preamble.js` directly.
3. Title block: centered, PrimaryBlue title, optional black byline (author name only — ASK Andrea first; never add by default; date stays in header, not in byline). No name in the title itself.
4. Header: "FMM — [month] [year]" right-aligned, 9pt SecondaryBlue italic.
5. Footer: page number (left, 9pt SecondaryBlue) + IDB logo (right). No "FMM" text in footer.
6. Body paragraphs: justified, 11pt Arial, line spacing 276.
7. No horizontal lines or dividers between sections.
8. Tables: minimal borders, LightBlue header, alternating row shading.
9. Validate with `python scripts/office/validate.py output.docx`.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: preamble location corrected to `skills/` (M3); the embedded verbatim `COLORS` hex block collapsed to a pointer at `fmm_word_preamble.js`/`andreas_palette.md` — the worked examples reference colors symbolically, and the skill no longer carries an untracked third copy of the palette (A′-9; the block was found current, not stale as logged — collapsed on the drift-safety argument, Andrea's call); the table example's hardcoded `F5F9FB` literal → `COLORS.AltRowShade`. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: May 28, 2026 — v2.0.0 (v3.2: corrected the Page Setup note — the FMM LaTeX preamble now uses 1-inch margins (reduced from 1.25 inch on April 22, 2026), so the prior "wider LaTeX margins for readability" rationale was dropped and both formats are documented at 1 inch; collapsed five stacked version markers into this single line per the marker-discipline rule. Carries the v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package version land at v3.2 cycle close. Prior: v2.3 (May 13, 2026) — `word_preamble.js` references renamed to `fmm_word_preamble.js` (v2.1.12); v2.2 (May 13, 2026) — added YAML frontmatter (v2.1.11); v2.1 (May 13, 2026) — palette names reconciled LightBluePale→SoftBlue and BgColor→WarmCream (v2.1.9 / v3.0), Color Palette section pointed to `andreas_palette.md`; v2.0 (May 2, 2026) — byline rules tightened (ask before adding any byline, date removed); v1.1 (April 13, 2026) — initial version.)*
