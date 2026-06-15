---
name: iterative-writing-workflow
description: "Triage skill for the two-protocol writing workflow: Protocol 1 (reading, thinking, note-taking — fully interactive, lives on main) via writing_notes_skill.md, and Protocol 2 (drafting written content — outline interactively, draft in one pass on a branch, finalize with compiled outline + divergence table) via writing_drafting_skill.md. Use whenever a project involves reading source material and producing written deliverables (policy notes, papers, reports, chapters). Also use when the user asks to set up a writing workflow or organize how to collaborate on a document. This triage skill routes to the right protocol and carries the shared content: how the two protocols interact, and project-setup parameters."
---

# Iterative Writing Workflow (triage)

This skill is the **triage and shared infrastructure** for the two-protocol writing workflow. It decides whether work-at-hand is thinking work (reading and note-taking — Protocol 1) or writing work (drafting deliverables — Protocol 2), and routes to the appropriate protocol skill.

The protocol-specific workflows live in two sibling skills:

- **`writing_notes_skill.md`** — Protocol 1 for reading, thinking, and note-taking.
- **`writing_drafting_skill.md`** — Protocol 2 for drafting written content.

This skill carries: scope and when-to-use guidance, how the two protocols interact, and the project-setup parameters used by both.

## When to use this skill

Use this skill (and its two protocol skills) whenever a project involves:

- Reading and processing source material (papers, reports, data).
- Taking notes and developing ideas interactively.
- Producing written deliverables (reports, chapters, policy notes, papers, talking points, op-eds).

The two protocols exist because thinking work and writing work have fundamentally different dynamics. Thinking work benefits from tight interactivity. Writing work benefits from larger drafting passes. Each protocol is tuned to its own dynamic.

## Choosing a protocol

| The user is… | Protocol | Skill |
|---|---|---|
| Reading sources, reacting, asking questions, taking notes, developing ideas | **Protocol 1** | `writing_notes_skill.md` |
| Producing a written deliverable (section, chapter, policy note, report) | **Protocol 2** | `writing_drafting_skill.md` |

**The protocols are not sequential phases.** A typical project interleaves them: read sources (Protocol 1) → build an outline (Protocol 2 step 1) → process more sources (Protocol 1) → draft (Protocol 2) → revisit a claim against sources (Protocol 1) → continue drafting (Protocol 2). The user signals which mode they're in. When in doubt, ask.

## How the two protocols interact

In a typical project, the user alternates between protocols:

1. **Protocol 1** — Process source material, take notes, develop ideas.
2. **Protocol 2, step 1** — Use the accumulated understanding to build an overall outline.
3. **Protocol 1** — Continue processing material (may reveal new angles).
4. **Protocol 2, steps 2–7** — Draft drafting units, revising the outline as needed.
5. **Protocol 1** — Go back to sources to check a claim, fill a gap, or process new material.
6. **Protocol 2** — Continue drafting.

**Where work lives.** Branches enter at Protocol 2 step 1 (outline → scale check → branch) and stay open until the document is done, per `writing_branch_skill.md`. **Protocol 1 work lives on `main`** — notes, summaries, indexes are never moved to a branch. Branches are scoped to the active drafting workstream, not to all work happening in parallel. A typical session may write to notes on `main` (Protocol 1) and to a draft on a branch (Protocol 2) in the same session.

**Reading and note-taking are coupled.** For this user, reading is rarely separated from note-taking — even small marginal notes count. Protocol 1 treats reading-with-note-taking as one operation, not two. The protocol's workflow reflects this: present material → user reacts and notes → update notes file → wait. There is no "reading-only" mode separate from "note-taking" mode.

**Reading-with-Claude is conversational.** When working through sources with Claude, the conversation itself does the work that deferred-marker mechanisms (bracketed comments) handle for drafts. Brackets-in-notes is a feature Andrea considered and rejected: the conversation already handles it. Bracketed comments are a Protocol 2 mechanism (used on branches via `writing_branch_skill.md`), not a Protocol 1 mechanism.

## Setting up for a new project

When adopting this workflow for a new project, document the following in your project's CLAUDE.md (or equivalent coordination file). Both protocols use these parameters.

- **Source material format** — What are the inputs? (PDFs, reports, data, transcripts.)
- **Notes structure** — What tracking documents do you maintain? Where do they live? *(Protocol 1.)*
- **To-do / tracker structure** — Separate from notes. Where do action items go? *(Protocol 1.)*
- **Progress tracker** — For session resumption: where is the file that records what's been covered and what's next? *(Protocol 1.)*
- **Deliverable format** — What's the output? (Word doc, LaTeX, markdown, slides.) *(Protocol 2.)*
- **Deliverable placement** — Outputs are not assumed into a fixed folder. At production, Protocol 2 asks where the deliverable lands and suggests by reading the repo's `FOLDER_MAP`s — never a hardcoded home. *(Protocol 2.)*
- **Style profiles** — Do you have writing style guides? When should they be applied? *(Protocol 2.)*
- **Version control** — How are outlines and drafts saved? (Git, file system, cloud storage.) *(Protocol 2.)*
- **Drafting-unit sizing** — Typical drafting-unit length for the project (e.g., "1,500 words per subsection," "policy-note paragraphs of ~300 words each"). This calibrates step 3 of Protocol 2 *and* the scale check at step 1. *(Protocol 2.)*
- **Lookup order** — When answering questions about source material, what files should Claude check first? (e.g., index → summaries → full text → source files.) *(Both protocols.)*

The protocol skills reference these parameters; this triage skill is the canonical source for the list.

## Composition with other skills

- **`writing_notes_skill.md`** — Protocol 1. Invoked when the user is reading sources, taking notes, or developing ideas.
- **`writing_drafting_skill.md`** — Protocol 2. Invoked when the user is producing a written deliverable.
- **`writing_branch_skill.md`** — Used by Protocol 2 from step 1 onward. Not used by Protocol 1.
- **`materials_processing_skill.md`** + Protocol skills — Protocol 1 often follows paper processing: process a paper through `materials_processing_skill.md`, then take notes on its summary via `writing_notes_skill.md`.
- **`document_processing_skill.md`** — Same relationship as paper processing for operational/institutional documents.
- **`project_tracker_skill.md`** — Notes folders and deliverable folders are covered by the freshness audit's recursive `FOLDER_MAP.md` scan in `TRACKED_LOCATIONS`, wherever the archetype places them. Updates from both protocols are picked up by the session-start audit.

---

*Last updated: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: `branch_workflow_skill.md` references renamed to `writing_branch_skill.md` (the writing-branch half of the branch_workflow split); behavior unchanged. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 6, 2026 — v2.0.0 (v4 bin-1 placement slice: added the **Deliverable placement** setup parameter — outputs are not assumed into a fixed folder; Protocol 2 asks at production and suggests from the repo's `FOLDER_MAP`s. Updated the `project_tracker` composition pointer. Carries the v2.0.0 floor (prior marker was v3.0; the v4 cycle floors edited files to the v2.0.0 baseline); final stamp at the v4 re-baseline. Prior: May 13, 2026 — v3.0 (split: triage-only after extracting Protocols 1 and 2 into `writing_notes_skill.md` and `writing_drafting_skill.md`. Previously this file was `writing_skill.md` v1.1 carrying both protocols; the name is kept as the umbrella entry point. Shared content — how the protocols interact, project-setup parameters — remains here as the canonical source.).)*


