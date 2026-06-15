---
name: writing-notes
description: "Protocol 1 of the iterative writing workflow — reading, thinking, and note-taking. Use whenever the user is processing source material, reacting to content, building understanding, asking questions about a paper or document, or developing ideas that will later feed into writing. Reading and note-taking are treated as one coupled operation, not two separate steps. The protocol is fully interactive: present material → user reacts → update notes → wait for user to drive forward. Invoked from writing_skill.md's triage when the work is thinking-mode rather than drafting-mode. Use directly when the protocol is already known."
---

# Writing — Protocol 1 (reading, thinking, note-taking)

This skill executes Protocol 1: reading and note-taking as one coupled operation, after the triage in `writing_skill.md` has identified the work as thinking-mode (rather than drafting-mode in Protocol 2).

For shared context (when to use either protocol, how the protocols interact, project-setup parameters), see `writing_skill.md`. This file carries only the Protocol 1 workflow.

## When this skill applies

The triage in `writing_skill.md` identified the work as thinking-mode. The user is:

- Processing source material (papers, reports, data, transcripts) and reacting to it.
- Taking notes — even small ones — alongside the reading.
- Asking questions about what they're reading (methodology, context, cross-references).
- Building understanding that may or may not later feed into a writing deliverable.

If the user is producing a written deliverable instead (drafting a section, chapter, policy note, report), use `writing_drafting_skill.md`. The two protocols interleave during a project; this skill applies when the active mode is thinking work.

## Core principle

Fully interactive, user-driven pace. Claude does not move ahead without explicit go-ahead. Reading and note-taking are coupled, not sequential — every reading session produces some kind of note, even if small.

## Notes sets and their purpose

**A notes set has a purpose, declared at creation.** A project's notes are not one undifferentiated file. Each set captures a distinct *line of thinking* — not a topic label, but how Andrea is reasoning toward something: how she'll use the literature in the argument, how she's structuring the empirical strategy, what background the non-paper documents establish. When Protocol 1 first creates a notes set in a project, ask what thinking the set is for, and name it for that purpose (e.g. `litreview_intake_<how-it-feeds-the-paper>`, `empirical_strategy_notes`, `background_docs_notes`) rather than a generic catch-all. The generic bucket — the old "Andrea's notes" — goes stale precisely because nothing said what it was for; the declared purpose is what keeps distinct lines of reasoning from collapsing into each other and keeps the set findable later.

## Workflow

1. **Present the material** — Claude presents a summary or the source material for the user to review. When possible, present it as a rendered file in the side panel rather than dumping text inline in chat. No need to show full text unless the user asks.
2. **User reacts** — The user provides notes, reactions, questions, status labels, key takeaways. Claude answers questions, looks up details when asked, and engages with the user's thinking (see "Answering questions" below).
3. **Update notes** — Claude updates the relevant notes/tracking documents with the user's input. Show the proposed update to the user before committing (see "Show before committing" rule in `CLAUDE.md` Working Conventions).
4. **Do not move on** — Wait for the user to explicitly indicate they're done with the current item before presenting the next one. Do not ask "ready for the next one?" — let the user drive.

## Answering questions

When the user asks a question about the material — methodology, a specific detail, a cross-reference, institutional context — look it up and respond. This is part of the thinking process, not a distraction from it.

**Flesh out answers fully.** Give complete, step-by-step explanations — not compressed summaries. These explanations are valuable reference material later. Write as if the reader is coming back to this months from now and needs to understand the logic without re-reading the source. A good explanation given in chat today may become a note the user keeps for the duration of the project.

## "Check my notes" — recovering the line of thinking

A recurring Protocol 1 move: when Andrea is about to write and says "check my notes," she is asking Claude to recover *her own thinking* — the argument-building intent she captured while reading (how this paper feeds the point, how she wants to build the case). Read the relevant purpose-named notes set and surface that thinking back to her. When the notes refer to the original sources behind that thinking, follow the thread out to them as needed, using the project's defined lookup order (index → summaries → full text → source files, per `writing_skill.md`'s parameters). The move starts in the notes and reaches the sources through them — it is not a standalone source-fact lookup, which is "Answering questions" above.

## Questions vs. instructions

The user's messages during note-taking can be questions ("what does this mean?"), instructions ("add that to the notes"), or ambiguous. The rule:

- **If a message could be a question rather than an instruction, answer the question first and wait.** Do not update notes or tracking documents until the user explicitly says to add or push.
- **When the user says "add that" or "add this to the notes"** after a fleshed-out explanation, add the **full explanation** to the notes — not a compressed version. The fleshed-out version is more useful for future reference. If the user wants a shorter version, they will say so.

## Sorting inputs

The user may label their inputs with different destinations. Common patterns:

- "for notes" / "add to notes" → the relevant notes file.
- "for to-do" / "add to my list" → the to-do or tracker file.
- A question or "clarify this" → answer in chat first, wait for go-ahead before adding anywhere.

**Notes and to-dos are separate.** Never mix them. Notes capture understanding (what a document says, what it means, how it connects to other material). To-dos capture actions (things to follow up on, decisions to make, tasks to complete). Each goes in its own file or section.

## Pushing changes and saving

- Work interactively: user gives content, Claude drafts the note or update, user approves.
- **Always check with the user before committing changes** to notes, tracking documents, or the repo.
- **If moving to a new topic and there are uncommitted changes,** flag it: "We haven't saved yet — here's what I'd add to [file]. OK to save/push?" Wait for confirmation.

## Summary maintenance

When taking notes on a document, also review and improve the document's summary file if one exists — especially:
- Spelling out acronyms on first use so the summary is self-contained.
- Adding relevance annotations for the project.
- Fleshing out sections that are too compressed to be useful as standalone reference.

Summary updates are saved alongside note updates.

## Session resumption

Multi-session projects need a way to pick up where the user left off. The protocol:

1. **Check the progress tracker** (if the project maintains one) for current status — which document is in progress, what's been covered, what's next.
2. **Do NOT search past chats or conversations.** The tracker is the single source of truth for where we left off. Past chats may be incomplete, out of order, or from a different context. *(See CLAUDE.md Working Conventions for the canonical rule — "Trackers are the source of truth, not past chats" — applicable across all protocols.)*
3. **Read the existing notes** to understand the current state of accumulated knowledge.
4. **Tell the user where we are and what's next,** then wait for their go-ahead.

If the project doesn't have a progress tracker, ask the user where they'd like to pick up.

## Where Protocol 1 work lives

**Always on `main`.** Notes, summaries, and indexes are not moved to a branch. Branches are scoped to active drafting workstreams (Protocol 2's territory); Protocol 1 work happens on `main` even when a Protocol 2 branch is open in parallel.

There is **no branching mechanism for note-taking.** Bracketed deferred-action markers (used in `writing_branch_skill.md` for drafts) are a Protocol 2 mechanism, not a Protocol 1 mechanism. Reading-with-Claude is conversational; the conversation itself handles the work that deferred markers would handle for drafts. This was a design decision Andrea made explicitly during the v2.1.7 / v3.0 cycle.

## Key rules (summary)

- **Do not skip ahead.** The user may need multiple rounds of discussion on one item.
- **Answer questions inline and fully.** Look things up and respond with complete explanations — they become reference material.
- **Questions first, actions second.** If it might be a question, answer before updating anything.
- **Full version, not compressed.** When adding explanations to notes, keep the full version.
- **Track cross-references.** When a concept in one source connects to another, note it. These connections are valuable.
- **Show before committing.** Before updating any notes or tracking documents, show the user the proposed update and wait for approval. *(See CLAUDE.md Working Conventions for the universal rule.)*
- **Flag uncommitted work** before changing topics.
- **Depth varies.** Some items get a brief note, others get extensive treatment. Follow the user's lead.

## Project-specific parameters

For project-specific parameters (notes structure, to-do structure, progress tracker, lookup order, source material format, status labels), see `writing_skill.md`'s "Setting up for a new project" section — the canonical source.

The protocol expects: a notes file/structure, optionally a to-do/tracker file, optionally a progress tracker for session resumption, and a defined lookup order for answering questions. If any of these aren't yet defined when the user invokes Protocol 1, ask before proceeding.

## Composition with other skills

- **`writing_skill.md`** — Parent triage skill. Routes here when the active mode is thinking work. Carries shared content: how the two protocols interact, project-setup parameters.
- **`writing_drafting_skill.md`** — Sibling skill for Protocol 2. Not invoked from this skill; the choice between protocols happens upstream (the user signals which mode they're in).
- **`materials_processing_skill.md`** + Protocol skills — Protocol 1 often follows paper processing: process a paper through the paper_processing pipeline, then take notes on its summary via this skill.
- **`document_processing_skill.md`** — Same relationship for operational/institutional documents.
- **`project_tracker_skill.md`** — Notes folders are in the freshness-audit's `TRACKED_LOCATIONS`. New notes are picked up by the session-start audit.

---

*Last updated: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: the contrastive `branch_workflow_skill.md` reference renamed to `writing_branch_skill.md` (the writing-branch half of the branch_workflow split); behavior unchanged. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: May 29, 2026 — v2.0.0 (v3.2 batch D: two-part edit — (1) a notes set now declares its purpose at creation, capturing a distinct *line of thinking* and named for it, replacing the generic catch-all (the old "Andrea's notes") that goes stale; (2) new "check my notes" move — recover Andrea's argument-building thinking from the purpose-named set, then follow it out to the underlying sources via the project's lookup order. Marker floored to the v2.0.0 cycle baseline. Prior: v1.0 (May 13, 2026 — extracted from `writing_skill.md` v1.1 in the v2.1.7/v3.0 writing split, Protocol 1 unmodified; decision against bracketed markers for notes recorded in "Where Protocol 1 work lives").).)*

