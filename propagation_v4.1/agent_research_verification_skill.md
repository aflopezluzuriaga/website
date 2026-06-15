---
name: agent-research-verification
description: "Codifies the workflow for delegating literature searches or evidence synthesis to external deep-research agents (Claude Research, ChatGPT Deep Research, or similar) so their outputs become trustworthy inputs to deliverables. Core principle: agent outputs are NEVER directly citable. Only the verification document — produced by cross-checking agent claims against retrieved originals — is citable. Triggers: 'I'm going to run a deep dive on X,' 'let's draft a research prompt,' 'I have an agent output to file,' 'verify this deep-research output,' 'save the agent results,' 'what dives have I done on X?', or any reference to Claude Research, ChatGPT Deep Research, or similar agent platforms. The skill orchestrates: prompt drafting (consulting LESSONS.md for known agent failure modes), filing the raw output, the sources table the agent produces, handing off to the project's papers protocol for retrieved originals, verification against those originals, and discipline around LESSONS.md so prompt engineering compounds across dives. Does NOT replace the project's papers protocol — Step 6 hands off to it explicitly."
---

# Agent Research Verification Skill

This skill defines the workflow for handling output from external deep-research agents (Claude Research, ChatGPT Deep Research, or similar tools). It exists because agent outputs look authoritative but are not. They contain fabricated citations, misattributed claims, overstated magnitudes, and silently dropped counter-evidence. Using them directly in deliverables is unsafe.

The workflow's core principle: **agent outputs are never directly citable. Only the verification document — produced by cross-checking agent claims against retrieved originals — is citable.** The raw agent output remains in the project as an audit trail.

The workflow has a second purpose beyond per-dive verification: **patterns in agent errors accumulate in a `LESSONS.md` file, and that file is consulted before drafting any new deep-research prompt.** Prompt engineering compounds across dives rather than starting from scratch each time.

**What this skill is, and what it is not.** This skill defines (a) the folder structure for agent outputs, (b) the per-dive file set and naming convention, (c) the eight-step workflow from prompt to citable verification, (d) the verification-document structure, (e) the INDEX.md workflow tracker for dives, plus the archetype-blind registration of verified dives into the repo's own deep-dives catalog, (f) the LESSONS.md discipline for prompt engineering, (g) the hand-off rules to the project's papers protocol for retrieved originals, and (h) the workflow-skip logging discipline that keeps gaps from compounding silently.

It is **not** the papers protocol itself — Step 6 hands off to the project's `materials_processing_skill.md` family and, when non-paper sources are present, to `document_processing_skill.md`. It is also **not** a brainstorming or thinking-notes skill — for rough-idea work upstream of running a dive, use `brainstorming_skill.md`. And it is **not** a substitute for reading and engaging with the papers it surfaces — the verification step requires retrieving and reading the originals, not just trusting the agent's summary.

---

## When to use this skill

Read this skill when:
- Andrea says "I'm going to run a deep dive on X," "let's draft a research prompt," "let's set up an agent dive," or similar.
- Andrea returns from running a deep-research dive with output to file ("I have the output," "let me share what the agent produced").
- Andrea asks "what dives have I done on X?", "have I already researched this?", or any retrieval question about past agent work.
- Andrea asks to verify an existing raw agent output ("verify this," "let's check the agent's claims," "do the second pass").
- Any reference to Claude Research, ChatGPT Deep Research, Perplexity Deep Research, or similar agent platforms in the context of literature search or evidence synthesis.

Do not use this skill for:
- One-off web searches Claude does inline in a working chat (that's just normal work).
- Reading and processing a paper Andrea found on her own (that's `materials_processing_skill.md`).
- Brainstorming what to research (that's `brainstorming_skill.md` upstream).
- Writing the deliverable that uses verified findings (that's `writing_skill.md` Protocol 2).

---

## Repo-specific parameters

The repo's `CLAUDE.md` provides project-specific values for the parameters below. If `CLAUDE.md` does not define a parameter, use the default given here.

| Parameter | Description | Default |
|---|---|---|
| `AGENT_OUTPUTS_FOLDER` | Where agent-research artifacts live | `workspace/agent_outputs/` |
| `AGENT_OUTPUTS_INDEX` | Topic-grouped tracker for all dives | `workspace/agent_outputs/INDEX.md` |
| `AGENT_OUTPUTS_LESSONS` | Cross-dive error patterns and prompt-engineering responses | `workspace/agent_outputs/LESSONS.md` |
| `AGENT_OUTPUTS_SKIPS` | Cross-dive register of workflow skip events | `workspace/agent_outputs/WORKFLOW_SKIPS.md` |
| `PAPERS_PROTOCOL_SKILL` | Project's paper-processing skill (used at Step 6 hand-off) | `materials_processing_skill.md` |
| `DOCUMENT_PROTOCOL_SKILL` | Project's document-processing skill (used at Step 6 hand-off for non-paper sources) | `document_processing_skill.md` |
| `TODO_FILE` | Andrea's project to-do file (workflow-follow-ups appended here) | `AndreaTracking/ToDoAndrea.md` |

If `CLAUDE.md` does not define these parameters, use the defaults — but flag to Andrea that the parameters should be added to `CLAUDE.md` so future sessions don't have to re-infer them.

---

## Folder structure

```
workspace/agent_outputs/
├── INDEX.md                          ← topic-grouped tracker for all dives
├── LESSONS.md                        ← cross-dive error patterns + prompt-engineering responses
├── WORKFLOW_SKIPS.md                 ← cross-dive register of workflow skip events
├── <topic_slug_1>/
│   ├── YYYYMMDD_HHMM_prompt.md
│   ├── YYYYMMDD_HHMM_raw.md
│   ├── YYYYMMDD_HHMM_retrieval.md        ← source table (table 1, immutable) + worked-down pass tables + residual not-retrieved list
│   ├── YYYYMMDD_HHMM_workflow_notes.md   ← lazy; only when something was skipped
│   └── YYYYMMDD_HHMM_verification.md
└── <topic_slug_2>/
    └── ...
```

**Folder-per-topic.** A topic is a substantive research question that Andrea might run multiple dives on over time. Topic slugs are lowercase, snake_case, descriptive (`tax_evasion_lac`, `vat_compliance_costs`, not `topic_1`).

**Files inside a topic carry the dive's date-and-time stamp.** Multiple dives on the same topic coexist without overwriting. All files for one dive share the same `YYYYMMDD_HHMM_` prefix so they sort adjacent when the folder is listed. The timestamp is the *dive identifier*, not a per-file modification date — verification done a week later still carries the dive's original timestamp.

**File set per dive:**

| File | Naming | Produced by | Purpose | Citable? |
|---|---|---|---|---|
| Prompt | `YYYYMMDD_HHMM_prompt.md` | Drafter chat (Step 1) | The prompt that was run, plus filing instructions for the researcher | N/A — input artifact |
| Raw output | `YYYYMMDD_HHMM_raw.md` | Researcher chat (Step 3) | Unedited agent synthesis | **No** — audit trail only |
| Retrieval doc | `YYYYMMDD_HHMM_retrieval.md` | Researcher files table 1 (Step 4); retriever appends passes + residual (Step 5) | One kept, accumulating document: **table 1** = every source × every candidate link (the researcher's verbatim record, append-only below it); the per-pass "still missing" tables; the residual "not retrieved + reason" list at the foot | **No** — kept backlog + input to verification; never deleted |
| Workflow notes | `YYYYMMDD_HHMM_workflow_notes.md` | Any chat (lazy — only when a skip happens) | Narrative of skips and overrides for this dive | **No** — audit/bookkeeping |
| Verification | `YYYYMMDD_HHMM_verification.md` | Verifier chat (Step 7) | Two-table claim-by-claim cross-check against the dive's declared source folders | **Yes** — the only citable artifact |

Plus: retrieved originals processed through the project's papers protocol and (when applicable) document-processing protocol land in the dive's **declared source folders** — wherever the repo's `FOLDER_MAP`s place literature and non-paper material — not in `agent_outputs/`.

**The retrieval doc is the dive's kept backlog — never deleted.** It is not scratch. Table 1 preserves the agent's full candidate list verbatim; the pass tables show the narrowing; the residual list records what was *not* retrieved and why (paywalled / broken link / not found). That residual is what you return to when a paywalled source later becomes reachable — so the document is retained for the life of the dive, and beyond as audit trail, never pruned. The SimplifiedRegimen failure — the candidate list deleted before retrieval finished, losing the not-yet-retrieved backlog — is exactly what keeping one accumulating document prevents.

**A dive may stop at raw.** If Andrea decides the agent output is exploratory and won't be used for a deliverable, verification is optional. INDEX.md marks the dive as `raw only — not for citation`. The audit trail is still preserved.

---

## The eight-step workflow

The workflow is described below as eight numbered steps. Before the steps themselves, two pieces of structural discipline that frame how the steps are run:

### Operating pattern: five chats, five roles

The workflow is run across **five separate chat sessions**, each owning a distinct role and a distinct file output. This is the recommended pattern; the step descriptions below name which chat owns each step.

| Chat | Role | Owns | Produces |
|---|---|---|---|
| 1 | **Drafter** | Step 1 (prompt drafting and filing the prompt) | `YYYYMMDD_HHMM_prompt.md` |
| 2 | **Researcher** (the deep-research agent — Claude Research in this project) | Steps 2, 3, 4 (running the dive, filing the raw output and the source table) | `YYYYMMDD_HHMM_raw.md` and `YYYYMMDD_HHMM_retrieval.md` (table 1) |
| 3 | **Retriever** | Step 5 (iterative-pass web retrieval, working table 1 with Andrea) | appends the pass tables + residual list to `YYYYMMDD_HHMM_retrieval.md` (no separate file) |
| 4 | **Source processor** | Step 6 (papers protocol on academic sources first, then document-processing protocol on non-paper sources) | per-paper outputs (papers protocol) and per-document outputs (document-processing protocol) |
| 5 | **Verifier** | Step 7 (writing the two-table verification against the dive's declared source folders) | `YYYYMMDD_HHMM_verification.md` — the only citable artifact |

The separation is not a workaround; it is the discipline. Each chat sees only the information it needs to do its job, and crucially, **the verifier in chat 5 does not know what the drafter in chat 1 expected to find.** Co-locating drafting and verification in one chat biases the verification toward "did the agent answer the prompt" rather than "do the claims hold against primary sources." The five-chat split forecloses that bias by construction.

**The file system is the contract between chats.** Each chat opens fresh, reads what its predecessors filed, and writes what its successors need. No chat depends on remembered context from another chat.

For the avoidance of doubt: this project's researcher chat is always Claude Research. The pattern is platform-agnostic in principle (any deep-research agent could play the role); in this project, Claude Research is the standing choice.

### Session-start ritual: check what's filed before doing your step

Each chat (chats 2–5) opens fresh and depends on prior chats having filed their artifacts. The session-start ritual is: read what should be there, name what's missing, and complain before doing anything else. The ritual is **not a block** — Andrea can override — but the override is logged (see Workflow notes and Cross-dive register sections below), not waved through.

**Per-chat expectations:**

| Chat opening | Should already exist in the repo | Reads from prompt header |
|---|---|---|
| Researcher (chat 2) | `_prompt.md` filed by drafter; INDEX row at `prompt drafted — not yet run` | Dive ID, Topic |
| Retriever (chat 3) | All researcher artifacts: `_raw.md` and `_retrieval.md` (with table 1 filed); INDEX row at `raw only — not for citation` | Source folders (knows where retrieved non-paper files go) |
| Source processor (chat 4) | The worked `_retrieval.md` (table 1 + pass tables + residual list); retrieved files in their declared folders | Source folders (knows which folders to process and in what order — papers first, documents second) |
| Verifier (chat 5) | All of the above, plus papers processed (papers protocol) and documents processed (document-processing protocol) | Source folders (knows which folders define the verification universe) |

**The ritual, step by step:**

1. The chat reads its expected prior artifacts from the repo.
2. If everything is present → proceed normally with the chat's step.
3. If something is missing → the chat **complains**, names exactly what's missing, and asks Andrea: *deliberate override, or accident?*
   - **Accident** → Andrea goes back to the missing step (or another chat) and completes it. This chat does not proceed.
   - **Deliberate override** → Andrea explicitly signals the override (e.g., "yes, override, I want to start the verifier with partial papers"). The chat proceeds, **and** triggers the workflow-notes-and-to-do logging (see the Workflow notes section below).

**Andrea-side override marker (optional shortcut).** Andrea can pre-empt the complaint by including a phrase like `[override: <reason>]` in her first message. The chat skips the complaint step, but **still does the bookkeeping** — the override marker reduces the prompt friction, not the logging discipline. The whole point is that overrides are visible later, not invisible.

**Why complain rather than block.** Andrea has legitimate reasons to do steps out of order — a quick verifier read against partial papers, a retriever run started before the researcher's filing has fully landed, etc. Blocking would be paternalistic and would push her to work around the chat. Complaining-and-logging makes the cost of the skip visible without removing her authority.

### Step 1 — Prompt drafting

**Owned by the drafter chat (chat 1).** Claude and Andrea co-draft the deep-research prompt iteratively. A clean prompt has:

- **A clear research question** (one sentence, no compound questions).
- **Scoped geography or scope** (which countries, which time period, which type of evidence).
- **Explicit quality criteria** (peer-reviewed journals, working papers from a defined list of institutions, etc.).
- **An exclusion list** of papers already in the project's library, so the agent doesn't re-surface what Andrea already has.
- **An honest-picture instruction** ("Report counter-evidence and null results as prominently as supporting evidence. Where evidence is mixed or weak, say so explicitly. Do not pad the response to make findings appear more conclusive than they are.").
- **Mitigations for known failure modes**, drawn from `LESSONS.md` (see below).
- **A Deliverables section specifying two outputs and a multi-candidate sources table.** The agent is instructed to produce (a) its synthesis report and (b) a "Sources cited" table with one row per source. The table has at least these columns: claim supported (which part of the research question the source backs) · citation (author, year, title) · link candidate 1 (journal / DOI) · link candidate 2 (working paper) · link candidate 3 (institutional repository) · link candidate 4 (other — preprint server, archived PDF, blog post). The agent provides *all* link candidates it can find for each source, not just one. The multi-candidate format is what the retriever chat (chat 3) needs to work the table in passes when paywalls block the first-choice link.

**Read `LESSONS.md` before drafting.** This is the load-bearing read. Every accumulated lesson from past dives is a prompt-engineering response to a known agent failure mode. Open the file, surface any patterns relevant to the current topic or to the agent platform being used, and bake the mitigations into the prompt being drafted. If the same pattern has surfaced repeatedly, the mitigation may need strengthening — flag that to Andrea.

**Also read `WORKFLOW_SKIPS.md` before drafting.** Same session-start moment as the `LESSONS.md` read; see the Cross-dive register section below for how patterns get surfaced.

Iterate on the prompt with Andrea until she approves it. The approved prompt gets filed at the end of Step 1 (not at Step 3, despite what older one-operator versions of this workflow assumed — in the five-chat pattern, the drafter files its own output before handing off).

**Source folders question (workflow-configuration, not prompt content).** Before filing the prompt, the drafter chat asks Andrea which folders this dive's sources will be processed into and verified against. The skill does **not** assume a folder: it reads the repo's `FOLDER_MAP`s — the per-folder purpose index every repo carries regardless of archetype — and proposes the home they indicate for academic sources (where the repo keeps literature) plus any non-paper folder, then confirms. Phrasing: *"This dive's academic sources will go to the repo's literature home, which the `FOLDER_MAP`s put at `<suggested>`; any non-paper sources to `<suggested>`. Confirm or correct."* This is a one-question check, answered per dive. The answer goes in the prompt file's header `Source folders` field (see header template below). It does **not** go into the prompt body the agent sees — the agent doesn't need to know about the repo's folder structure; the question exists so downstream chats know where to put files and where to check. Reading the `FOLDER_MAP`s keeps this skill blind to the archetype: do **not** hardcode a folder, do **not** scan the raw tree to guess, and do **not** read the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime.

If the repo's maps are thin or empty (a new or migration-gap repo) and don't show where literature or non-paper material lives, the suggestion degrades to asking Andrea outright — flag the gap, never silently hardcode a home. A declared folder that doesn't yet exist is created when the retriever (or source processor) first writes to it; if a needed home isn't represented in the maps at all, surface that rather than inventing structure.

#### Prompt file header template

The prompt file (`<YYYYMMDD_HHMM>_prompt.md`) starts with a metadata block that downstream chats read at session start:

```markdown
# Deep-Research Prompt — <one-line dive title>

**Dive ID:** <YYYYMMDD_HHMM>
**Topic:** <topic_slug>
**Agent platform:** Claude Research
**Drafted:** <YYYY-MM-DD> (drafter chat)
**Skill:** `skills/agent_research_verification_skill.md` Step 1
**Source folders:** <comma-separated list of the folders this dive's sources are processed into and verified against — the repo's literature home plus any non-paper folders, as declared per Step 1's source-folders question; read from the repo's `FOLDER_MAP`s, not assumed>

---

[prompt body — research question, decomposition, deliverables, etc.]

---

[Filing instructions for the researcher chat — see Step 2 handoff packet]
```

**INDEX.md gets a row added in the same commit** as filing the prompt. Status: `prompt drafted — not yet run`. See INDEX.md structure below for the row format.

### Step 2 — Run the dive

**Owned by the researcher chat (chat 2 — Claude Research in this project).** Andrea pastes the prompt (with the handoff packet appended, see below) into the deep-research agent. This happens **outside** the drafter chat; the drafter does not run dives.

#### Drafter → Researcher handoff packet

Because the researcher chat runs as a separate session and files its own output, the drafter chat hands the researcher a packet of filing instructions appended to the prompt itself. The packet specifies the shared dive timestamp, the destination paths, the header to prepend, and the INDEX.md update.

The timestamp is set by the drafter chat at the time of prompt filing (`YYYYMMDD_HHMM`), and the researcher chat **reuses that exact stamp** for both files it produces, so the prompt, raw output, and retrieval doc all sort adjacent in the topic folder. The researcher does not stamp the files with its own run time.

**Template (paste at the end of the prompt before handing it off):**

````markdown
**Filing instructions (for the researcher chat).**

When you produce the output, file two documents at the topic folder, both stamped with this dive's ID:

- `workspace/agent_outputs/<topic_slug>/<YYYYMMDD_HHMM>_raw.md` — the synthesis report.
- `workspace/agent_outputs/<topic_slug>/<YYYYMMDD_HHMM>_retrieval.md` — the **source table (table 1)**: the Sources cited table, every source × every candidate link (multi-candidate links per source; see the Deliverables section of this prompt for the column spec). This is the first, immutable section of the dive's retrieval doc — the retriever appends the pass tables and the residual list *below* it. Do not edit or delete table 1 later; only append beneath it.

Prepend this header to the raw file (the body below it is the untouched synthesis):

```markdown
---
**Source:** Claude Research
**Date run:** YYYY-MM-DD HH:MM
**Prompt:** [<YYYYMMDD_HHMM>_prompt.md](<YYYYMMDD_HHMM>_prompt.md)
**Retrieval doc:** [<YYYYMMDD_HHMM>_retrieval.md](<YYYYMMDD_HHMM>_retrieval.md)
**Status:** raw — not for citation in deliverables. Verification produces the citable input.
---
```

In the same commit, update `workspace/agent_outputs/INDEX.md` under the `<topic_slug>` topic: change Status from `prompt drafted — not yet run` to `raw only — not for citation`.

Repo access is via the GitHub REST API (git push is blocked); the patterns and the project token are in `CLAUDE.md` at the repo root.
````

When Andrea returns to a new working chat to start the retriever (chat 3) phase, advance to Step 5. (Steps 3 and 4 are owned by the researcher chat and have already happened by then.)

### Step 3 — File the raw output

**Owned by the researcher chat (chat 2).** The unedited synthesis is filed at `<AGENT_OUTPUTS_FOLDER>/<topic_slug>/<YYYYMMDD_HHMM>_raw.md`, with the header block from the handoff packet prepended. INDEX.md is updated to status `raw only — not for citation` in the same commit.

If this is a re-dive on a topic that already has earlier dives, the researcher chat (or the drafter chat returning to review) considers whether INDEX.md should mark any earlier dive as `superseded`. Propose the supersession to Andrea — don't apply silently. Sometimes the new dive is a different angle, not a replacement.

### Step 4 — The source table arrives with the raw (as table 1 of the retrieval doc)

**Owned by the researcher chat (chat 2).** The source table is **produced by the researcher** and filed as **table 1** of the dive's retrieval doc (`<YYYYMMDD_HHMM>_retrieval.md`). There is no separate extract-links step performed by the drafter — the link list is part of the researcher's deliverable, specified in the prompt's Deliverables section (per Step 1's checklist).

What still belongs at this point in the workflow is a **completeness check** on table 1. Before the retriever chat opens, someone (typically the retriever chat at its first action, or the drafter chat returning briefly) scans the raw output for any claim that lacks a corresponding row in table 1, and flags those for follow-up. A claim without a source row is a candidate for the `fabricated` or `unverifiable` verdict at Step 7 and should be noted so the retriever doesn't burn a pass looking for a source that doesn't exist.

### Step 5 — Retrieve originals

**Owned by the retriever chat (chat 3) in the five-chat pattern.** This is iterative work between Andrea and a fresh chat dedicated to retrieval; see the retrieval pass workflow below.

Paywalled items, broken links, and "no link found" entries are flagged as unretrievable but are **not blockers**. The verification step (Step 7) will mark claims from unretrievable sources as `unverifiable` — that is honest accounting, not failure.

#### The retrieval pass workflow

Retrieval proceeds in **passes**, one link-candidate column at a time, working **table 1** (the multi-candidate source table) of the dive's retrieval doc (`_retrieval.md`). Each pass appends a new "still missing" table *below* the last, so the doc accumulates the whole narrowing — never overwrite table 1 or a prior pass table.

**Pass 1:** Andrea attempts to retrieve every source using its **column 1** link (journal / DOI). Whatever she gets she drops into the dive's declared source folders — the repo's literature home for academic sources, the declared documents folder for non-paper sources. She returns to the retriever chat and reports back: *"I tried column 1, here's what I got."* The chat checks the destination folders against table 1 and **appends a fresh "still missing" table** to `_retrieval.md`, with the column-1 links struck through.

**Pass 2:** Andrea attempts the still-missing sources using their **column 2** link (working paper). Returns to the chat. Chat builds the next fresh table.

**Passes 3+:** Same pattern with columns 3, 4, etc., until either everything retrievable is in the destination folders or the remaining sources are confirmed unretrievable.

**Substitution decisions during the passes.** Sometimes Andrea retrieves a working paper version and decides to **cite the published version** anyway (e.g., the working paper has the same content but the deliverable's audience expects the journal citation). This is a legitimate choice and goes into the retrieval doc as a substitution note (in the pass table or the residual list): *retrieved working paper, cited as journal version*. The verifier (chat 5) reads this and accounts for it in the verification table — a verdict of `confirmed` against a working-paper retrieval is still a confirmation of the cited claim, as long as the working paper and the journal version match on the verified point.

**End of retrieval.** The retriever closes the doc with a **residual list** at the foot of `YYYYMMDD_HHMM_retrieval.md`: one row per source that was *not* retrieved, with its reason (`paywalled` / `broken link` / `not found`), plus, for the sources that were retrieved, which column's link succeeded, which version is in the destination folder, and which version will be cited if different (substitution notes). The full doc — table 1, the pass tables, the residual list — is what the verifier reads in Step 7 to know *what kind of unverifiability* a missing source represents, and is the kept backlog Andrea returns to when a paywalled source later becomes reachable.

### Step 6 — Process retrieved sources through the project's protocols

**Owned by the source-processor chat (chat 4) in the five-chat pattern.** A fresh chat opens, sees the retrieval doc and the new files in the dive's declared source folders, and runs each through the project's protocols on its own terms — without exposure to the dive's prompt or framing. This insulation is deliberate: sources are processed on their content, not on whether the agent's claim about them was right.

**Sequential, not interleaved — papers first, documents second.**

1. The chat first runs the project's papers protocol (`<PAPERS_PROTOCOL_SKILL>`, default `materials_processing_skill.md`) on every new academic source the retriever filed in the dive's declared literature home. (That protocol is itself archetype-blind — it reads the repo's `FOLDER_MAP`s to place and index each paper — so this skill names no folder.) This pass completes fully before the next protocol starts.
2. If the dive has non-paper sources, the chat then runs the project's document-processing protocol (`<DOCUMENT_PROTOCOL_SKILL>`, default `document_processing_skill.md`) on every new non-paper source in the dive's declared documents folder.

Sequencing matters because the two protocols have different outputs (different summary structures, different indexes, different BibTeX entry types). Running them sequentially keeps the chat's working memory clean and avoids cross-contamination of output formats.

This is a **hand-off, not duplication**. This skill does not re-describe how papers or documents are processed. Read the relevant project protocol and follow it.

When the sources are processed and in their destination folders (with index entries and per-source outputs in place), advance to Step 7.

### Step 7 — Verification (second pass)

**Owned by the verifier chat (chat 5) in the five-chat pattern.** The verifier opens fresh against the repo state: it reads `_raw.md`, `_retrieval.md` (table 1, the pass tables, and the residual list), and the dive's processed sources in the declared source folders. It does **not** see the prompt and is **not** told what the drafter expected to find. The verification is a clean-room read against primary sources.

**The verifier checks claims only against the dive's declared source folders.** A claim whose source is not in those folders is `unverifiable` — even if the source exists on the open web. The verifier does not retrieve sources mid-verification; retrieval and protocol-processing happen at Steps 5 and 6, in chats 3 and 4, before the verifier chat opens. By the time the verifier sits down, the ground-truth library is closed.

The retrieval doc's residual list distinguishes *kinds* of unverifiability — paywalled, broken link, not found, working-paper-substituted-for-journal — so when the verifier marks a claim `unverifiable`, the synthesis section names which kind. "Unverifiable because the source was paywalled" is different from "unverifiable because no source was retrievable for this claim" and the deliverable downstream may care about the distinction.

**Verifier's session-start confirmation.** Even though the prompt header carries the `Source folders` field, the verifier chat explicitly confirms with Andrea at session start which folder holds the non-paper documents for this dive. The header is the default; the confirmation is the discipline. Fresh chats don't assume.

For each **headline claim** in the agent's raw output — a finding, a magnitude, a causal statement, anything that could appear in a deliverable — the verification asks:

- Did the agent represent the source accurately?
- Are magnitudes (effect sizes, sample sizes, time periods) correct?
- Is the identification strategy described correctly?
- Are claims about "no evidence exists" defensible?

**Headline claims only.** The verification tables are not exhaustive. Background context, definitions, and framing don't need rows. The principle: if a claim isn't worth a row in the verification table, it isn't worth citing in a deliverable.

Where a claim cannot be verified because the source wasn't retrievable (or wasn't processed into the dive's declared folders), mark it `unverifiable`. That is honest accounting — not confirmation.

See the **Verification document structure** section below for the full template, including the two-table body structure.

After the verification document is produced:
- **INDEX.md status flipped** to `verified` in the same commit. (`INDEX.md` here is this skill's own workflow tracker — see below.)
- **The verified dive is registered in the repo's deep-dives catalog** in the same commit — see "Registering the verified dive in the repo's catalog" below. Only verified dives register; a raw dive earns no catalog row.
- **LESSONS.md updated** if a new error pattern surfaces, or if an existing pattern accumulates a third instance. See the LESSONS.md discipline section below.

### Step 8 — The verification document is the citable input

After Step 7, the verification document is the **only** artifact from this dive that can be cited in deliverables. The raw output remains as audit trail.

When drafting a deliverable that uses findings from this dive:
- Cite the verification doc as the synthesis source.
- Cite the underlying papers (from the repo's literature home) and documents (from the dive's declared documents folder) for the empirical claims themselves, using the project's normal citation conventions.
- Never cite the raw agent output. If you find yourself wanting to ("the agent said X"), the right move is to verify the claim against the original source and write the verified version.

### Registering the verified dive in the repo's catalog

There are **two index surfaces**, and this skill writes to both at different moments. Keeping them distinct is the point:

- **This skill's workflow tracker** — `<AGENT_OUTPUTS_INDEX>` (default `workspace/agent_outputs/INDEX.md`). The skill **owns** this file (it lives in the skill's own `workspace/agent_outputs/` folder). It tracks **every dive at every status** — `prompt drafted`, `raw only`, `verification in progress`, `verified`, `superseded` — and is the operational ledger for running the workflow. It is *not* part of the repo's by-subject catalog, and it holds rows (raw, prompt-drafted) that the catalog must not.
- **The repo's deep-dives catalog** — the repo's own by-subject index of **verified** deep-research runs, which the rest of the repo's retrieval points at, so a verified dive is findable by subject alongside the repo's papers, notes, and other materials rather than buried inside `agent_outputs/`. This is **not** owned or named by this skill.

On verification completion, register the verified dive in that repo catalog. **Do this archetype-blind, exactly as the papers protocol places papers:** read the repo's `FOLDER_MAP`s to find the existing deep-dives / verified-output index, add the dive in the shape that index already uses, and confirm placement before writing. **Never name a specific index file and never read the archetype layer (`archetype_conventions.md` or an archetype spec) at runtime** — repo types carry this differently (in one repo type the catalog is a named deep-dives detail index that the repo's materials index points at; in another it is a typed, reliability-tagged output row; the skill stays blind to which). Register **only verified dives** — the citability rule and the catalog's "verified only" rule are the same line. The registration is batched into the **same commit** as the verification doc and the workflow-tracker status flip.

If the repo's maps show no deep-dives catalog at all (a thin/new repo, or a repo whose type doesn't carry one), **degrade to asking Andrea** and flag the gap — do not invent a catalog or hardcode one. The skill's own workflow tracker still records the dive regardless; what's missing in that case is only the repo-catalog cross-reference, which is a setup/migration gap to surface, not to paper over.

---

## Workflow notes and to-do logging (lazy artifact)

When a chat detects a skip and Andrea overrides (per the session-start ritual above), or when any step is done out of order, the chat creates or appends to a dive-specific **workflow notes** file:

`workspace/agent_outputs/<topic_slug>/<YYYYMMDD_HHMM>_workflow_notes.md`

This file is **lazy**: it exists only for dives where something was skipped or done out of order. Dives that ran cleanly have no workflow notes file. Its presence in the topic folder is itself a signal that the dive has bookkeeping that needs attention later.

**Format** — one entry per skip event:

```markdown
## <ISO timestamp> — <chat that detected the skip>

**What was skipped:** [The artifact or step that was missing when this chat opened.]

**Override or accident:** [Deliberate override / Andrea proceeded after being prompted / chat proceeded after explicit override marker.]

**Reason given (if any):** [Andrea's stated reason, if she gave one.]

**Follow-up to-do:** [What needs to happen to close the gap — e.g., "complete the retrieval log retroactively from chat history," "re-run papers processor against the missing sources."]

**To-do file entry:** [Link to the corresponding line in `<TODO_FILE>`.]
```

**Paired to-do entry.** In the same write, the chat appends a line to `<TODO_FILE>` (default `AndreaTracking/ToDoAndrea.md`) under a section:

```markdown
### Agent-research workflow follow-ups

- [ ] [Topic slug / dive timestamp] — [What was skipped, one line] — see [workflow_notes.md](workspace/agent_outputs/<topic_slug>/<YYYYMMDD_HHMM>_workflow_notes.md)
```

If the section does not yet exist in `<TODO_FILE>`, create it. The to-do entry is the durable surface — it lives where Andrea's other to-dos live, so the gap doesn't get lost in `agent_outputs/`'s structure.

**When the to-do is closed.** Andrea checks the box in `<TODO_FILE>` and either (a) leaves the workflow_notes entry as audit trail, or (b) adds a closing note to the workflow_notes file describing how the gap was resolved. Either is fine.

---

## Cross-dive pattern detection: WORKFLOW_SKIPS.md

A single register at `<AGENT_OUTPUTS_SKIPS>` (default `workspace/agent_outputs/WORKFLOW_SKIPS.md`) aggregates every skip event across every dive. The dive-level `_workflow_notes.md` files are the human-readable narrative; this register is the structured cross-dive data.

**Why a separate register.** Pattern detection — "have I skipped this step on three or more dives?" — should be a single file-read, not a scan across N dives' workflow notes. The register mirrors how `LESSONS.md` works for prompt-engineering patterns: one file collecting cross-dive signal.

**Format:**

```markdown
# Workflow Skips Register

*Cross-dive register of every workflow skip event. Patterns surface here (same step skipped on 3+ dives) before they show up as habits.*

---

| Dive | Chat | Step skipped | Reason | Resolved? | Workflow notes link |
|---|---|---|---|---|---|
| <topic> / <YYYY-MM-DD HH:MM> | <chat name> | <step skipped> | <one-line reason> | <✓ date / open> | [link](<topic>/<YYYYMMDD_HHMM>_workflow_notes.md) |
```

**When the register is written to.** Same commit as the workflow_notes file creation/append. The chat that's logging the skip writes both files atomically.

**Pattern surfacing — done at session start by any chat.**

When a chat reads `LESSONS.md` at session start (per Step 1's discipline), it **also** reads `WORKFLOW_SKIPS.md` and counts skip events per step. If any step has been skipped on **three or more dives**, the chat surfaces this to Andrea at the start of the session, before doing anything else:

> "Heads up — the retrieval log has been skipped on 4 dives now (<topic_1> / <date_1>, <topic_2> / <date_2>, …). This is a pattern, not a one-off. Worth looking at why this keeps happening: is the retrieval log harder to produce than the workflow assumes, or is it the kind of step that always gets skipped under time pressure? Either is fixable, but the fix is different."

The surfacing is **not a complaint** about the specific dive in front of the chat — it's a meta-observation about the workflow. The chat names the pattern and asks Andrea what to do; it doesn't refuse to proceed.

**What "the fix is different" means in practice:**
- *Step is harder than the workflow assumes* → revise the skill / the artifact format / the prompt so the step is cheaper to do.
- *Step gets skipped under time pressure* → strengthen the session-start complaint, or build a stricter pre-commit check, or accept the gap and adjust the verifier's expectations.

Both are legitimate responses. The register exists so Andrea has the data to choose between them rather than guessing.

The threshold of three matches the project-level "codify after the third repetition" rule (see Working Conventions in CLAUDE.md): recurrence beats triviality, and the third instance is when a one-off becomes a pattern.

---

## INDEX.md structure

`<AGENT_OUTPUTS_INDEX>` is a topic-grouped tracker for every dive in the project. It is **this skill's own workflow tracker** — the operational ledger that follows each dive through every status — and is distinct from the repo's by-subject deep-dives catalog (see "Registering the verified dive in the repo's catalog" above): the tracker holds all dives at all statuses; the catalog holds verified dives only.

### Top of file

```markdown
# Agent Research Index

*Audit trail and citability ledger for all deep-research dives in this project.*

**Citability rule:** Only `verified` dives are usable as sources in deliverables. Raw agent output is audit trail only.

**Status values:**
- `verified` — verification document exists; citable in deliverables.
- `raw only — not for citation` — prompt + raw output exist; no verification yet.
- `verification in progress` — verification started; not yet citable.
- `superseded` — a later dive replaces this one; kept for audit trail.
- `prompt drafted — not yet run` — prompt filed; agent dive pending (no raw output yet).

---
```

### Per topic

Each topic gets a `## <topic_slug>` heading, a one-sentence description, and a four-column table:

```markdown
## tax_evasion_lac

*Evidence on tax evasion magnitudes and policy responses in Latin America and the Caribbean.*

| Date | Angle | Status | Notes |
|---|---|---|---|
| 2026-09-20 09:00 | Refresh focused on Brazil + Mexico post-2024 reforms | verified | Claude Research. Supersedes 2026-05-13 dive (narrower geographic scope). |
| 2026-05-13 14:30 | Initial dive — LAC evidence on tax evasion magnitudes | superseded | Claude Research. |
```

**Column conventions:**

- **Date:** `YYYY-MM-DD HH:MM`, human-readable, matches the timestamp on the dive's files.
- **Angle:** one sentence on what the dive's framing was, especially how it differs from prior dives on the same topic. This is the load-bearing column for finding the right past dive.
- **Status:** one of the five legend values.
- **Notes:** free-form. Convention: include the agent platform; if superseding an earlier dive, name it; flag any major retrieval gaps.

**Topic description.** One sentence above the table per topic. Cheap; disambiguates short slugs. If the scope of a topic drifts across dives, revise the description.

### Discipline

- **Add a row when the prompt is filed (end of Step 1).** Status: `prompt drafted — not yet run`.
- **Update the row's status when the raw output is filed (Step 3).** Status: `raw only — not for citation`.
- **Update the row's status when verification is in progress (Step 7 started).** Status: `verification in progress`.
- **Update the row's status when verification completes (Step 7 done).** Status: `verified`.
- **Mark earlier rows `superseded`** when a new dive replaces them. Always propose to Andrea — don't apply silently. The Notes column on the new row names what it supersedes and why.

**INDEX updates are batched with the dive's file commits**, not separate commits. Every state change in the workflow updates INDEX in the same commit as the corresponding file write.

---

## LESSONS.md structure

`<AGENT_OUTPUTS_LESSONS>` accumulates cross-dive patterns in agent errors and the prompt-engineering responses that mitigate them. **It is consulted at Step 1 of every new dive.**

### Top of file

```markdown
# Agent Research — Lessons Learned

Cross-dive patterns in agent errors, and the prompt-engineering responses that
mitigate them. Consult this file when drafting any new deep-research prompt
(Step 1 of agent_research_verification_skill.md). Each entry is a pattern
observed across at least two dives; entries marked `Cross-project candidate: Y`
are flagged for possible hoisting into the kit's skill itself in a future
SkillPropagation session.

---
```

### Per entry

```markdown
## <pattern_name>

**Description:** [What the agent does wrong, in one paragraph.]

**Surfaced in:**
- [Topic slug / dive date — link to the verification doc that surfaced it]
- [Topic slug / dive date — link]

**Prompt response:** [The engineering fix — concrete language to bake into future prompts.]

**Cross-project candidate?** [Y / N — Y when the pattern is generic enough to apply beyond this project's domain.]

**Last updated:** YYYY-MM-DD
```

**Example:**

```markdown
## magnitude_overstatement

**Description:** The agent reports headline effect sizes (treatment effects, elasticities, response coefficients) without confidence intervals or comparison to the null hypothesis. Reported magnitudes have been roughly 2x the published values in two verified cases.

**Surfaced in:**
- tax_evasion_lac / 2026-05-13 — [verification](tax_evasion_lac/20260513_1430_verification.md)
- vat_compliance_costs / 2026-06-01 — [verification](vat_compliance_costs/20260601_1100_verification.md)

**Prompt response:** Include in the methodology section of every prompt: "Report effect sizes with confidence intervals or standard errors. Explicitly compare each headline finding against the null hypothesis or a no-effect baseline. Where a finding has been challenged in subsequent literature, report the challenge."

**Cross-project candidate?** Y — magnitude overstatement is a generic agent failure mode, not domain-specific to tax work.

**Last updated:** 2026-06-01
```

### Discipline

- **A pattern earns an entry when it has been observed in two or more dives.** A single-dive observation lives in that verification doc's "patterns in the agent's errors" section, not yet in LESSONS.md. Promote to LESSONS.md when the second instance appears.
- **At verification completion (Step 7),** Claude reviews the new verification's error-patterns section against existing LESSONS.md entries. If a new pattern surfaces (second instance of something), propose an entry to Andrea. If an existing entry accumulates a third instance, propose strengthening the prompt response.
- **The `Cross-project candidate?` field is set at write time.** Andrea (or Claude with Andrea's approval) judges whether the pattern is generic or domain-specific. Generic patterns are flagged Y so the cross-project hoisting agenda (see below) can pick them up.
- **`Last updated`** is bumped whenever the entry is revised — new dive surfaces it, prompt response is strengthened, cross-project status reconsidered.

---

## Verification document structure

The verification doc at `<topic_slug>/<YYYYMMDD_HHMM>_verification.md` follows this template.

### Header

```markdown
# Verification — <topic_slug> — <dive date>

**Prompt:** [<YYYYMMDD_HHMM>_prompt.md](<YYYYMMDD_HHMM>_prompt.md)
**Raw output:** [<YYYYMMDD_HHMM>_raw.md](<YYYYMMDD_HHMM>_raw.md)
**Retrieval doc:** [<YYYYMMDD_HHMM>_retrieval.md](<YYYYMMDD_HHMM>_retrieval.md)
**Agent platform:** Claude Research
**Verification date:** YYYY-MM-DD
**Source folders for this dive:** [the repo's literature home] and [non-paper folder name, or "none — academic sources only"]
**Retrieval coverage (required):** [State totals AND enumerate every source that was *not* retrieved, each with its reason (paywalled / broken link / not found), copied from the residual list at the foot of `_retrieval.md`. This is the durable record of the backlog in the citable artifact — e.g., "12 of 18 cited sources retrieved (8 in the literature folder, 4 in <documents folder>). Not retrieved: Smith 2019 (paywalled); Lopez 2021 (broken link); Vega 2022 (not found); Ortiz 2020 (paywalled). Unverifiable claims marked below."]
```

### Body — claim-by-claim tables (two tables, by source type)

The verification body has **two tables**, one for academic paper sources and one for non-paper document sources. The two tables exist whether or not the dive has both source types — if a source type has no claims, the table is empty with a one-line "no [academic / non-paper] sources for this dive" note. Two visibly-separate tables make absences visible; a merged table with a source-type column can look complete while silently dropping a category.

**Part 1: Academic paper sources** *(verified against the dive's declared literature folder)*

| Claim from agent output | Agent's cited source | What the original (in the literature folder) actually says | Verdict |
|---|---|---|---|
| [Verbatim claim] | [Author, year + how the agent cited it] | [What the retrieved original actually says] | [verdict] |

**Part 2: Non-paper document sources** *(verified against the dive's declared documents folder)*

| Claim from agent output | Agent's cited source | What the original (in the documents folder) actually says | Verdict |
|---|---|---|---|
| [Verbatim claim] | [Document title, institution, date + how the agent cited it] | [What the retrieved original actually says] | [verdict] |

**Verdict values (same vocabulary across both tables):**

- `confirmed` — original says what the agent claimed.
- `partially confirmed` — original supports part of the claim but not all of it (e.g., magnitude is roughly right but scope is narrower than the agent implied).
- `contradicted` — original says something materially different from what the agent claimed.
- `unverifiable` — original is not in the dive's declared source folders. Not confirmation; do not cite. The retrieval log names the reason (paywalled, broken link, not found, etc.).
- `fabricated` — the claim doesn't appear in any retrieved source. The agent invented it.
- `misattributed` — the claim appears somewhere, but not in the source the agent cited. (Common with research agents; they mash findings together and attach them to nearby citations.)

**Headline claims only.** A row is justified only if the claim could appear in a deliverable. Background framing, definitions, and connective tissue do not need rows in either table.

### Synthesis section

```markdown
## Synthesis

### Claims that survive

[The verified, citable findings, restated in Andrea's own words — paste-ready
for deliverables. Each survival should reference its row in the table(s) above.]

### Claims to retire

[What the agent said that didn't hold up, and why. Worth recording so the
same claim doesn't get re-introduced in a later session.]

### Patterns in the agent's errors

[If specific failure modes showed up in this dive — magnitude overstatement,
counter-evidence dropped, fabricated citations, identification strategy
mischaracterized — note them here. At verification completion, Claude reviews
this section against LESSONS.md to decide whether a new entry or update is
warranted.]

### Updated honest-picture summary

[The "what does the evidence actually support" paragraph, replacing the
agent's framing with what survives the second pass. This is what Andrea
hands to herself when starting a deliverable a month later — the load-bearing
output of the verification.]
```

The synthesis section's fourth sub-section — the updated honest-picture summary — is the load-bearing output. The tables are the work; the synthesis is the use.

---

## Cross-project hoisting

The `Cross-project candidate? Y` flag in LESSONS.md entries exists because some agent failure modes are generic across projects (magnitude overstatement, counter-evidence drop, fabricated citations) while others are domain-specific (e.g., LAC-vs-Caribbean conflation in tax work).

**Hoist-later mechanism.** A pattern becomes a candidate for kit-side hoisting — promotion from project-local LESSONS.md into this skill's prompt-drafting guidance — when it has appeared in two or more projects with the `Cross-project candidate? Y` flag.

**Who detects cross-project patterns?** Claude in any one session sees only that session's repo, so the detection is **Andrea-driven**. When she opens a SkillPropagation session and asks "what's pending for the kit?", she can search her content repos for `Cross-project candidate: Y` entries — that's the hoisting agenda. The discipline of setting the flag at write time makes the agenda surfaceable rather than retrospective.

**When hoisting happens.** The hoist is a kit-side change: the generic pattern's prompt response gets added to this skill's Step 1 guidance (or to a "Known agent failure modes" reference section). The project-local LESSONS.md entries can stay — they're the historical record of how the lesson was learned. Future projects benefit from the hoisted version even before they've experienced the pattern themselves.

**Claude in a content-repo session** has a smaller role here: when reading LESSONS.md at Step 1, if a pattern looks generic and isn't yet flagged `Cross-project candidate: Y`, suggest to Andrea that the flag may be appropriate. Don't apply silently.

---

## Common pitfalls

- **Don't cite the raw output, ever.** The whole skill exists to prevent this. If a deliverable cites "the agent said," roll back and verify against the original.
- **Don't let the drafter chat do the verification.** The drafter knows what the prompt was looking for, which biases the second pass toward "did the agent answer my question" rather than "do the claims hold against primary sources." The five-chat pattern (drafter / researcher / retriever / source processor / verifier) exists precisely to enforce this separation — collapsing drafter and verifier into one chat collapses the discipline.
- **Don't skip verification because the dive "looks fine."** Agent output is most dangerous when it looks coherent and authoritative. Coherence is not accuracy.
- **Don't process unretrieved sources as `confirmed`.** If the source wasn't retrieved and processed into the dive's declared folders, the verdict is `unverifiable`, not `confirmed`. This is the most consequential discipline rule in the skill.
- **Don't let INDEX.md fall behind.** Every state change in the workflow updates INDEX in the same commit. If INDEX doesn't reflect reality, the citability rule degrades to "trust whoever last spoke."
- **Don't skip the LESSONS.md and WORKFLOW_SKIPS.md reads at Step 1.** Prompt engineering compounds only if past lessons are actually consulted, and workflow patterns surface only if the skips register is actually read. Reading both files before drafting is the load-bearing discipline.
- **Don't merge raw output into a verification doc to save time.** They are different artifacts with different epistemic status. The verification doc is your synthesis; the raw output is what the agent produced. Merging them collapses the provenance.
- **Don't run a topic twice without checking INDEX first.** The "did I already run this?" check is what INDEX exists for. A new dive on a topic that already has dives should either explicitly supersede the prior one, or carry a different angle. Both should be reflected in INDEX's Notes column.
- **Don't delete the retrieval doc, or treat it as scratch.** It is the dive's kept backlog — table 1 (every source × every candidate link), the pass tables, and the residual not-retrieved-with-reasons list. It's how you pick up a paywalled source weeks later. Pruning it loses the backlog silently — the SimplifiedRegimen failure. The verification doc's required coverage field copies the residual list, so the backlog also lands in the citable artifact.
- **Don't waive away the session-start ritual.** The ritual exists because gaps in prior steps are invisible to a fresh chat. Complaining-and-logging is cheap; silent drift across chats is expensive.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the archetype-blind rule broadened from 'never read an archetype spec at runtime' to the whole archetype layer incl. `archetype_conventions.md` (W1, two sites — the logged Tier-2 ride from the archetype_conventions review). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 8, 2026 — v2.0.0 floor (v4 bundled kit-skill fix, deep-dive verification retention): merged the dive's `_sources.md` (the agent's source table) and `_retrieval_log.md` (the retriever's working record) into one kept, accumulating document `_retrieval.md` — table 1 (every source × every candidate link, the researcher's verbatim record, append-only) → per-pass "still missing" tables → a residual "not retrieved + reason" list at the foot. Stated the retention guard (the retrieval doc is the dive's kept backlog, never deleted), and made the verification header's coverage field **required** and required to enumerate the unretrieved residual, so the not-yet-retrieved backlog lands in the citable artifact too. This supersedes the original "delete the candidate list only after verification" framing (the SimplifiedRegimen lesson): keeping one document beats a delete-after guard, because a kept document cannot go missing. Two artifacts collapsed to one; `_sources.md` / `_retrieval_log.md` are retired (the names survive only as documented predecessors here). The five-chat operating pattern, session-start ritual, two-table verification body, verdict vocabulary, and `LESSONS.md`/`WORKFLOW_SKIPS.md` discipline are unchanged. Final v4 stamp at cycle close. Prior: v2.0.0 floor (June 6, 2026, v4 bin-1 index slice, completion-frame step 3) — made the skill archetype-blind on placement and on the verified-dive catalog. The hardcoded root `papers/` academic-source home is retired everywhere it appeared (the source-folders question, the prompt and verification headers, the retrieval and source-processing steps, the verification Part-1 table): academic sources land in the repo's literature home, read from the repo's `FOLDER_MAP`s and confirmed — never hardcoded, never spec-read at runtime. No archetype carries a root `papers/` (research keeps literature in its shared layer, coordination in its reference layer or instance-scoped, operation in reliability-tagged `reference/`), so the prior hardcode would have made the step-4 audit-against-archetype read kit-induced drift. On the index side, added the archetype-blind registration of **verified** dives into the repo's own deep-dives catalog (the by-subject index the repo's materials/intake index points at in the archetypes that name one — operation carries none, so the skill names none and conforms to what the repo's `FOLDER_MAP`s show), distinct from this skill's own `workspace/agent_outputs/INDEX.md` workflow tracker, which is spec-endorsed (coordination archetype §10) and unchanged. The five-chat operating pattern, session-start ritual, two-table verification body, verdict vocabulary, `LESSONS.md`/`WORKFLOW_SKIPS.md` discipline, and the cross-project hoisting machinery are untouched (none makes the audit lie). The reliability/confidentiality model reconciliation is deferred (conform-to-existing handles registration without resolving it). Kit-wide marker reset and final package version land at the v4 re-baseline. Prior: v3.1 (May 28, 2026) — consolidation: promoted the five-chat operating pattern (drafter / researcher / retriever / source-processor / verifier) to canonical, with session-start ritual, Drafter→Researcher handoff packet, researcher-produced multi-candidate sources table, iterative-pass retrieval workflow with substitution logging, sequential source-processing (papers protocol then document-processing protocol), verifier-doesn't-retrieve rule, per-dive source-folders question, two-table verification body, lazy workflow-notes artifact with paired ToDoAndrea.md logging, and the WORKFLOW_SKIPS.md cross-dive register with three-or-more-dives pattern surfacing; sourced from AITaxBID. Prior: v1.0 (May 13, 2026) — initial draft for v2.1.12; eight-step single-operator workflow; wiring to CLAUDE_template.md, PROJECT_SETUP.md, audit_repo_skill.md done in the v2.1.12 wiring commit per v3.0_planning.md Session 3.5.)*
