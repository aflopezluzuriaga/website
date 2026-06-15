/**
 * fmm_word_preamble.js — FMM-branded Word document configuration
 *
 * The Word document generator. The Word-side equivalent of the LaTeX
 * preamble files: it implements Andrea's palette and FMM document
 * conventions for .docx output.
 *
 * Required by Node scripts that generate .docx documents — this file is
 * a true runtime include (`require()`), unlike the .tex preamble files
 * which are copy-paste templates.
 *
 * Colors mirror andreas_palette.md. If you add or change a color, update
 * andreas_palette.md AND every consuming file listed in the palette's
 * "Files that mirror this palette" section, in one atomic commit.
 *
 * Usage:
 *   const fmm = require('./fmm_word_preamble');
 *   const doc = fmm.createDocument({ title, subtitle, author, sourceLine, monthYear, children });
 *
 * Title-block rules (see fmm_docx_formatting_skill.md for full text):
 *   - title:     required.
 *   - subtitle:  optional.
 *   - author:    optional. DO NOT default to Andrea's name. Many FMM docs are
 *                co-produced; the calling script must ASK Andrea before
 *                populating this field for any document.
 *   - date:      DEPRECATED in the byline. The page header already shows
 *                "FMM — [month] [year]" via the `monthYear` field, so a date
 *                in the byline is redundant. The function signature still
 *                accepts `date` for backward compatibility, but new scripts
 *                should not pass it.
 *   - monthYear: required for the page header (e.g., "Mayo 2026"). Pass
 *                explicitly; do not derive from `date`.
 *   - sourceLine: optional 9pt italic line crediting an external source.
 *
 * Style guide reference: fmm_docx_formatting_skill.md
 *
 * Last updated: May 28, 2026 — v2.0.0 (v3.2: added the seven new palette colors
 *   (DarkYellow, MintGreen, BrightBlue, BrightYellow, BrightGreen, DeepGreen, LabelGray)
 *   to the COLORS object, mirroring andreas_palette.md; and enlarged the footer
 *   KnowledgeLogo to ~0.25in (18x14 -> 30x24 px) to match the LaTeX footer. Carries the
 *   v2.0.0 floor under the two-tracker convention; kit-wide marker reset and kit package
 *   version land at v3.2 cycle close. Prior: v2.2 (May 13, 2026) word_preamble.js ->
 *   fmm_word_preamble.js rename; v2.1 (May 13, 2026) palette reconciliation; v2.0
 *   (May 2, 2026) byline rules.)
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, PageOrientation, LevelFormat,
  ExternalHyperlink, InternalHyperlink, Bookmark, FootnoteReferenceRun,
  TabStopType, TabStopPosition,
  TableOfContents, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, ImageRun
} = require('docx');
const fs = require('fs');
const path = require('path');

// Path to the IDB logo used in the footer (place KnowledgeLogo.png next to this file)
const FOOTER_IMAGE_PATH = path.join(__dirname, 'KnowledgeLogo.png');

// ============================================================
// COLORS — mirror andreas_palette.md
//
// If you add or change a color, update andreas_palette.md AND every
// consuming file listed in the palette's "Files that mirror this palette"
// section, in one atomic commit. See andreas_palette.md for the canonical
// definitions and aesthetic guidance.
// ============================================================
const COLORS = {
  PrimaryBlue:   "196E8C",  // RGB(25, 110, 140)  — Title, Heading 1, bullet/number markers
  SecondaryBlue: "5E90A8",  // RGB(94, 144, 168)  — Heading 2, header, footer, table accents
  LightBlue:     "CBD8DF",  // RGB(203, 216, 223) — Table header background, subtle borders
  DarkBlue:      "004B70",  // RGB(0, 75, 112)    — Bold lead-ins, emphasis, table headers
  SoftBlue:      "ADD8E6",  // RGB(173, 216, 230) — Reserved (callout boxes, soft highlights)
  DarkGreen:     "4C7234",  // RGB(76, 114, 52)   — Reserved (positive indicators)
  LightGreen:    "B4C896",  // RGB(180, 200, 150) — Reserved (positive backgrounds)
  WarmCream:     "FFF3D6",  // RGB(255, 243, 214) — Reserved (warm highlight, heatmap accent)
  DarkYellow:    "F7E272",  // RGB(247, 226, 114) — Reserved (FMM slide title; not used in documents)
  MintGreen:     "9FD0A3",  // RGB(159, 208, 163) — Reserved (contrast green for figures/SVGs)
  BrightBlue:    "009ADE",  // RGB(0, 154, 222)   — Reserved (accent/highlight — tables, callouts; sparing)
  BrightYellow:  "FFDA00",  // RGB(255, 218, 0)   — Reserved (accent/pop — sparing, never a fill)
  BrightGreen:   "8DBA38",  // RGB(141, 186, 56)  — Reserved (accent/pop — sparing, never a fill)
  DeepGreen:     "308144",  // RGB(48, 129, 68)   — Reserved (reserve fourth green for labels/series)
  LabelGray:     "A6A6A8",  // RGB(166, 166, 168) — Secondary labels/annotations (not axes/gridlines)
  // Implementation utilities (not part of Andrea's design palette):
  Black:         "000000",  // Body text, byline
  White:         "FFFFFF",
  AltRowShade:   "F5F9FB",  // Alternating table row shading
};

// ============================================================
// PAGE SETUP — US Letter with 1-inch margins
// ============================================================
// DXA units: 1440 DXA = 1 inch
const PAGE = {
  size: {
    width:  12240,  // US Letter width  (8.5 in)
    height: 15840,  // US Letter height (11 in)
  },
  margin: {
    top:    1440,   // 1 inch
    bottom: 1440,   // 1 inch
    left:   1440,   // 1 inch
    right:  1440,   // 1 inch
    header: 706,
    footer: 708,
  },
};

// Content width = page width - left margin - right margin
const CONTENT_WIDTH = PAGE.size.width - PAGE.margin.left - PAGE.margin.right; // 9360

// ============================================================
// TYPOGRAPHY
// ============================================================
const FONT = "Arial";

// Font sizes in half-points (22 = 11pt, 24 = 12pt, etc.)
const SIZE = {
  title:     28,  // 14pt — maximum allowed; Andrea dislikes large fonts
  heading1:  26,  // 13pt
  heading2:  24,  // 12pt
  body:      22,  // 11pt
  footnote:  18,  // 9pt  — header, footer, source lines
};

// Line spacing: 276 = 1.15 lines
const SPACING = {
  line:            276,
  afterParagraph:  200,   // body paragraphs
  afterListItem:   120,   // list items (tighter)
  beforeHeading1:  300,
  afterHeading1:   120,
  beforeHeading2:  240,
  afterHeading2:   100,
};

// ============================================================
// STYLES — heading styles that override Word built-ins
// ============================================================
const STYLES = {
  default: {
    document: {
      run: {
        font: FONT,
        size: SIZE.body,
        color: COLORS.Black,
      },
      paragraph: {
        alignment: AlignmentType.JUSTIFIED,
        spacing: {
          line: SPACING.line,
          after: SPACING.afterParagraph,
        },
      },
    },
  },
  paragraphStyles: [
    {
      id: "Title",
      name: "Title",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: SIZE.title,
        bold: true,
        font: FONT,
        color: COLORS.PrimaryBlue,
      },
      paragraph: {
        spacing: { before: 0, after: 200 },
        alignment: AlignmentType.CENTER,
      },
    },
    {
      id: "Heading1",
      name: "Heading 1",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: SIZE.heading1,
        bold: true,
        font: FONT,
        color: COLORS.PrimaryBlue,
      },
      paragraph: {
        spacing: { before: SPACING.beforeHeading1, after: SPACING.afterHeading1 },
        outlineLevel: 0,
      },
    },
    {
      id: "Heading2",
      name: "Heading 2",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: SIZE.heading2,
        bold: true,
        font: FONT,
        color: COLORS.SecondaryBlue,
      },
      paragraph: {
        spacing: { before: SPACING.beforeHeading2, after: SPACING.afterHeading2 },
        outlineLevel: 1,
      },
    },
    {
      id: "Heading3",
      name: "Heading 3",
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true,
      run: {
        size: SIZE.body,
        bold: true,
        font: FONT,
        color: COLORS.SecondaryBlue,
      },
      paragraph: {
        spacing: { before: 200, after: 80 },
        outlineLevel: 2,
      },
    },
  ],
};

// ============================================================
// NUMBERING — bullet and numbered lists with PrimaryBlue markers
// ============================================================
const NUMBERING = {
  config: [
    {
      reference: "fmm-bullets",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            run: { color: COLORS.PrimaryBlue },
            paragraph: { indent: { left: 720, hanging: 360 } },
          },
        },
        {
          level: 1,
          format: LevelFormat.BULLET,
          text: "\u2013",  // en-dash for second level
          alignment: AlignmentType.LEFT,
          style: {
            run: { color: COLORS.PrimaryBlue },
            paragraph: { indent: { left: 1440, hanging: 360 } },
          },
        },
      ],
    },
    {
      reference: "fmm-numbers",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: {
            run: { color: COLORS.PrimaryBlue, bold: true },
            paragraph: { indent: { left: 720, hanging: 360 } },
          },
        },
        {
          level: 1,
          format: LevelFormat.LOWER_LETTER,
          text: "%2.",
          alignment: AlignmentType.LEFT,
          style: {
            run: { color: COLORS.PrimaryBlue },
            paragraph: { indent: { left: 1440, hanging: 360 } },
          },
        },
      ],
    },
  ],
};

// ============================================================
// HEADER — right-aligned "FMM — [month] [year]"
// ============================================================
function createHeader(monthYear) {
  const text = monthYear ? `FMM — ${monthYear}` : "FMM";
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text,
            font: FONT,
            size: SIZE.footnote,
            color: COLORS.SecondaryBlue,
            italics: true,
          }),
        ],
      }),
    ],
  });
}

// ============================================================
// FOOTER — page number (left) + IDB logo (right)
// ============================================================
function createFooter(imagePath) {
  const imgPath = imagePath || FOOTER_IMAGE_PATH;
  const footerChildren = [
    new TextRun({
      children: [PageNumber.CURRENT],
      font: FONT,
      size: SIZE.footnote,
      color: COLORS.SecondaryBlue,
    }),
    new TextRun({
      text: "\t",
    }),
  ];

  // Append the IDB logo if the image file exists
  if (fs.existsSync(imgPath)) {
    footerChildren.push(
      new ImageRun({
        type: "png",
        data: fs.readFileSync(imgPath),
        transformation: { width: 30, height: 24 },
        altText: { title: "IDB Logo", description: "Inter-American Development Bank logo", name: "IDB Logo" },
      })
    );
  }

  return new Footer({
    children: [
      new Paragraph({
        tabStops: [
          { type: TabStopType.RIGHT, position: TabStopPosition.MAX },
        ],
        spacing: { before: 0, after: 0 },
        children: footerChildren,
      }),
    ],
  });
}

// ============================================================
// HELPER: Title block (title + optional subtitle + byline + optional source)
// ============================================================
function createTitleBlock({ title, subtitle, author, date, sourceLine }) {
  const children = [];

  // Title — PrimaryBlue, centered, 14pt bold
  if (title) {
    children.push(
      new Paragraph({
        style: "Title",
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: title,
            bold: true,
            font: FONT,
            size: SIZE.title,
            color: COLORS.PrimaryBlue,
          }),
        ],
      })
    );
  }

  // Subtitle (optional) — PrimaryBlue, centered, 12pt
  if (subtitle) {
    children.push(
      new Paragraph({
        spacing: { after: 80 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: subtitle,
            size: SIZE.heading2,
            font: FONT,
            color: COLORS.PrimaryBlue,
          }),
        ],
      })
    );
  }

  // Byline — OPTIONAL. Author only by default; date is deprecated here
  // (header carries it). Calling script must have asked Andrea before
  // populating `author`. See top-of-file docstring for full rules.
  const bylineText = [author, date].filter(Boolean).join(" — ");
  if (bylineText) {
    children.push(
      new Paragraph({
        spacing: { after: 300 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: bylineText,
            size: SIZE.body,
            font: FONT,
            color: COLORS.Black,
          }),
        ],
      })
    );
  }

  // Source line (optional) — 9pt black italic, centered
  if (sourceLine) {
    children.push(
      new Paragraph({
        spacing: { after: 300 },
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: sourceLine,
            size: SIZE.footnote,
            font: FONT,
            color: COLORS.Black,
            italics: true,
          }),
        ],
      })
    );
  }

  return children;
}

// ============================================================
// HELPER: Heading paragraphs
// ============================================================
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun(text)],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun(text)],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun(text)],
  });
}

// ============================================================
// HELPER: Body paragraph (plain text, or array of TextRuns)
// ============================================================
function para(content, options = {}) {
  const children = typeof content === 'string'
    ? [new TextRun({ text: content, font: FONT, size: SIZE.body })]
    : content;
  return new Paragraph({
    spacing: { line: SPACING.line, after: SPACING.afterParagraph },
    ...options,
    children,
  });
}

// ============================================================
// HELPER: Bold lead-in pattern
// A short declarative phrase in bold DarkBlue, followed by
// regular-weight black explanation. Use sparingly.
// ============================================================
function boldLeadIn(leadText, followText) {
  return [
    new TextRun({ text: leadText, font: FONT, size: SIZE.body, bold: true, color: COLORS.DarkBlue }),
    new TextRun({ text: followText, font: FONT, size: SIZE.body }),
  ];
}

// ============================================================
// HELPER: Text runs
// ============================================================
function bold(text) {
  return new TextRun({ text, bold: true, font: FONT, size: SIZE.body });
}

function italic(text) {
  return new TextRun({ text, italics: true, font: FONT, size: SIZE.body });
}

function link(text) {
  return new TextRun({
    text,
    font: FONT,
    size: SIZE.body,
    color: COLORS.PrimaryBlue,
    underline: {},
  });
}

// ============================================================
// HELPER: Bullet item
// ============================================================
function bullet(content, level = 0) {
  const children = typeof content === 'string'
    ? [new TextRun({ text: content, font: FONT, size: SIZE.body })]
    : content;
  return new Paragraph({
    numbering: { reference: "fmm-bullets", level },
    spacing: { line: SPACING.line, after: SPACING.afterListItem },
    children,
  });
}

// ============================================================
// HELPER: Numbered item
// ============================================================
function numbered(content, level = 0) {
  const children = typeof content === 'string'
    ? [new TextRun({ text: content, font: FONT, size: SIZE.body })]
    : content;
  return new Paragraph({
    numbering: { reference: "fmm-numbers", level },
    spacing: { line: SPACING.line, after: SPACING.afterListItem },
    children,
  });
}

// ============================================================
// HELPER: Highlight box (like tcolorbox in LaTeX)
// Renders as a single-cell table with LightBlue background
// ============================================================
function highlightBox(contentParagraphs) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: COLORS.SecondaryBlue };
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: CONTENT_WIDTH, type: WidthType.DXA },
            shading: { fill: COLORS.LightBlue, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: contentParagraphs,
          }),
        ],
      }),
    ],
  });
}

// ============================================================
// HELPER: Minimal table with clean styling
// Header: LightBlue background, DarkBlue bold text, PrimaryBlue bottom border
// Data: no vertical borders, subtle LightBlue bottom border, alternating shading
// ============================================================
function simpleTable(headers, rows, colWidths) {
  const colCount = headers.length;
  const defaultColWidth = Math.floor(CONTENT_WIDTH / colCount);
  const widths = colWidths || Array(colCount).fill(defaultColWidth);
  const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      new TableCell({
        borders: {
          top: noBorder,
          bottom: { style: BorderStyle.SINGLE, size: 2, color: COLORS.PrimaryBlue },
          left: noBorder,
          right: noBorder,
        },
        width: { size: widths[i], type: WidthType.DXA },
        shading: { fill: COLORS.LightBlue, type: ShadingType.CLEAR },
        margins: cellMargins,
        children: [
          new Paragraph({
            children: [new TextRun({ text: h, bold: true, color: COLORS.DarkBlue, font: FONT, size: SIZE.body })],
          }),
        ],
      })
    ),
  });

  const dataRows = rows.map((row, rowIdx) =>
    new TableRow({
      children: row.map((cell, colIdx) =>
        new TableCell({
          borders: {
            top: noBorder,
            bottom: { style: BorderStyle.SINGLE, size: 1, color: COLORS.LightBlue },
            left: noBorder,
            right: noBorder,
          },
          width: { size: widths[colIdx], type: WidthType.DXA },
          shading: rowIdx % 2 === 1 ? { fill: COLORS.AltRowShade, type: ShadingType.CLEAR } : undefined,
          margins: cellMargins,
          children: [
            new Paragraph({
              children: [new TextRun({ text: String(cell), font: FONT, size: SIZE.body, color: COLORS.Black })],
            }),
          ],
        })
      ),
    })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...dataRows],
  });
}

// ============================================================
// MAIN: Create a complete FMM-branded document
// ============================================================
function createDocument({ title, subtitle, author, date, sourceLine, monthYear, children, footnotes }) {
  const titleBlock = createTitleBlock({ title, subtitle, author, date, sourceLine });

  // Derive monthYear for header from date if not provided
  const headerMonthYear = monthYear || date || undefined;

  const docConfig = {
    styles: STYLES,
    numbering: NUMBERING,
    sections: [
      {
        properties: {
          page: PAGE,
        },
        headers: {
          default: createHeader(headerMonthYear),
        },
        footers: {
          default: createFooter(),
        },
        children: [...titleBlock, ...children],
      },
    ],
  };

  if (footnotes) {
    docConfig.footnotes = footnotes;
  }

  return new Document(docConfig);
}

// ============================================================
// MAIN: Save document to file
// ============================================================
async function saveDocument(doc, filepath) {
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filepath, buffer);
  return filepath;
}

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  // Constants
  COLORS,
  PAGE,
  CONTENT_WIDTH,
  FONT,
  SIZE,
  SPACING,
  STYLES,
  NUMBERING,
  FOOTER_IMAGE_PATH,

  // Document creation
  createDocument,
  saveDocument,

  // Helpers
  createTitleBlock,
  createHeader,
  createFooter,
  h1, h2, h3,
  para,
  bold, italic, link,
  boldLeadIn,
  bullet, numbered,
  highlightBox,
  simpleTable,

  // Re-export docx-js classes for convenience
  Paragraph, TextRun, Table, TableRow, TableCell,
  PageBreak, HeadingLevel, AlignmentType,
  ExternalHyperlink, FootnoteReferenceRun,
  BorderStyle, WidthType, ShadingType,
};




