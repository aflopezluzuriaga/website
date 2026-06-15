---
name: skill-authoring
description: "Use this skill when authoring a new skill file for the kit or for a project, or when revising an existing skill. Triggers: 'let's write a skill for this,' 'I keep correcting Claude the same way — can we make a skill,' 'this needs a skill,' 'we should codify this,' 'how should I structure this skill,' 'draft a skill for X.' Covers (1) the general principles and conventions of Andrea's skills kit — naming, frontmatter discipline, cluster structure, decomposition principle, marker discipline — that any new skill must honor; (2) when to write a skill versus leave a task uncodified; (3) what a skill file contains; (4) the workflow for drafting a skill with Claude; (5) when a project-local skill should be promoted to the kit. Does NOT cover the consolidation workflow that moves skills from project repos into the kit — that lives in SkillPropagation's `skills_consolidation_skill.md` and only runs in SkillPropagation."
---

# Skill Authoring

A skill is a reusable instruction file that tells Claude how to handle a recurring task. The kit already contains skills for paper processing, document processing, writing, email drafting, formatting, session management, and more. But most projects also accumulate their own skills — for tasks specific to how the project works that the generic kit doesn't cover.

This skill is the meta-skill: how to write a new skill that fits the kit's conventions, whether it lives in a project's `skills/` folder for project-local use, or eventually gets promoted to the kit itself.

## When to use this skill

Read this skill when:
- The user says "let's write a skill for this," "I keep correcting Claude the same way — can we make a skill," "this needs a skill," "we should codify this," "how should I structure this skill," "draft a skill for X."
- A task is being done for the third (or fourth, or fifth) time with roughly the same instructions, and codifying the pattern would save the same explanations every future time.
- An existing skill is being revised substantively and the reviser wants to check the conventions.

Do not use this skill for:
- Project-specific configuration that belongs in `CLAUDE.md`, not in a reusable skill (parameters, folder names, deliverable lists, project-specific conventions).
- Editing an existing skill in a minor way (typo, small wording fix) where re-reading the conventions adds nothing.
- The kit-maintenance workflow that pulls candidate skills out of project repos and merges them into the canonical kit — that runs only in SkillPropagation via `skills_consolidation_skill.md` and is a different shape of work.

---

## Part 1 — General principles and conventions of the kit

Before writing any new skill, internalize the conventions below. They're not arbitrary — each one is a response to drift the kit has accumulated and corrected over time. New skills that honor them slot in cleanly; new skills that don't create drift the next audit will catch.

### Naming conventions

Files in the kit follow a small set of suffix conventions:

- `_skill.md` — instruction files Claude reads and follows. The unit of the kit.
- `_template.md` — templates that get copied into projects and filled in (e.g., `CLAUDE_template.md`, `STATUS_template.md`).
- Plain descriptive `.md` — assets that aren't instruction files but are read for content (e.g., `andreas_palette.md` is a color reference, not an instruction).
- `_preamble.tex` / `_preamble.js` — code resources paired with a skill (e.g., `fmm_paper_preamble.tex` pairs with `fmm_paper_latex_skill.md`).

Format-prefix discipline applies where multiple variants of a format exist: `fmm_paper_latex_skill.md`, `academic_paper_latex_skill.md`, the `fmm_coordination_slides_latex_skill.md` / `fmm_coordination_slides_pptx_skill.md` pair (Beamer and PowerPoint variants of the same deck), `academic_slides_skill.md`. The prefix names the variant; the rest names the kind of thing.

Lowercase throughout, words separated by underscores. The two exceptions are `CLAUDE_template.md` and `STATUS_template.md`, where the uppercase prefix preserves the convention that `CLAUDE.md` and `STATUS.md` themselves are uppercase in every repo.

### Frontmatter discipline

Every skill file starts with YAML frontmatter:

```yaml
---
name: skill-name-in-kebab-case
description: "One paragraph describing what the skill is for, what triggers it, and what it does NOT cover. Include the literal phrases the user might say."
---
```

Two non-obvious rules:

1. **The `description:` is sourced from observed phrasings, not designer assumptions.** Claude pattern-matches on the description to decide whether to read the skill. If the description doesn't contain phrases the user actually uses, the skill won't trigger at the right moment. Before drafting frontmatter, list the phrasings the user would actually say when invoking this skill. Use those phrasings literally in the description.

2. **Name what the skill does NOT cover, alongside what it does.** The description should distinguish the skill from adjacent skills. If two skills overlap on triggers but cover different work, both descriptions should name the boundary explicitly. (See `project_tracker_skill.md` and `finish_session_skill.md` for an example — both fire at session close, but `project_tracker_skill.md` does not save full conversations, and `finish_session_skill.md` does not re-implement the per-step procedures.)

Assets (non-skill files) can get skill-shaped frontmatter if they need discoverability — `andreas_palette.md` has frontmatter so Claude finds it when producing visuals.

### The decomposition principle: when to split a skill

A skill is a split candidate when **all three** of these hold:

1. It has a clear triage or branch step that routes to substantively different protocols.
2. The protocols evolve asymmetrically over time (the patterns of one change without affecting the other).
3. Typical invocations load only part of the content (when handling paper A, the Protocol B section is dead weight).

When all three hold, splitting produces a triage skill plus protocol-specific skills (see `materials_processing_skill.md` + `paper_processing_academic_skill.md` + `paper_processing_institutional_skill.md`; see `writing_skill.md` + `writing_notes_skill.md` + `writing_drafting_skill.md`).

Do **not** split for these reasons:

- **Size alone.** A long skill is not a split candidate if it's a linear workflow. `housekeeping_skill.md` is long but its steps flow into each other; splitting would fragment it.
- **Reference skills.** Style guides and format references (`andrea_writing_style_skill.md`, `fmm_docx_formatting_skill.md`) are consulted by lookup, not followed end-to-end. Splitting them doesn't change how they're used.
- **Mode parameters.** `housekeeping_skill.md` has audit-mode and repair-mode. Modes are parameters, not branches; they don't justify splitting.

### Cluster structure

**Scope of this section.** Cluster structure is a kit-side organizational convention. It applies to skills that live **in the kit** — `LastSkillUpdate/` in SkillPropagation, and the curated subset of `skills/` that each content repo receives at propagation. Skills authored inside a content repo are project-local at creation; they live outside the cluster structure. Cluster placement is decided only if and when a project-local skill is consolidated into the kit (the consolidation conversation in SkillPropagation makes the placement call at that point — not the author at creation time). The rules below describe how that placement works when it happens.

The kit is organized into **eight functional clusters**. The canonical roster — cluster names, membership, and order — lives in `CLAUDE_template.md`'s Skills section (point, don't restate: an enumerated copy carried here drifted as the kit grew). Every kit skill lives in exactly one cluster.

Two cross-cutting rules govern cluster work:

**Cluster placement is decided by current purpose, not anticipated future generality.** `writing_branch_skill.md` lives in Repo and session infrastructure (always-active), not in Writing and deliverables where its topic would suggest, because `finish_session_skill.md` (always-active) invokes it as a required action — the hard dependency that exists *now* places it, not the cluster its name points at.

**Cluster completeness invariant.** Every skill's hard dependencies (workflow steps that invoke another skill as a required action) must resolve within the always-active group or within the source skill's own cluster. If a new skill needs to invoke a skill in another cluster, either the dependency moves to the always-active group, or one of the two skills moves clusters. Soft references (descriptive prose, hand-off notes, "see also") are not constrained by the invariant.

### Physical placement vs. cluster placement

Two different "where does it go" questions, easily conflated:

- **Physical placement** — where the skill *file* actually sits in the repo. This is the author's call **at creation**, governed by the **folder-skill placement rule** in `structure_conventions.md` ("Skills layout") and refined per type in the repo's archetype spec (coordination §2a; the operation spec's structure-notes Folder-skills bullet; the research spec's skills-and-machinery note). The shape: a single-file skill is a **loose file** (`skills/` holds at most one folder, `GeneralSkills/`, and everything else in it is loose); a skill that **needs its own folder** (multiple files, or a `corpus/`) does *not* live in `skills/` — it goes **folder-local, next to the work it serves**. `CLAUDE.md`'s skills table rosters every skill wherever it physically lives — `skills/` itself is map-exempt machinery, not the roster.
- **Cluster placement** — which of the eight functional clusters a skill belongs to. This is **not** a creation-time call; it is decided at consolidation in SkillPropagation, only for skills being absorbed into the kit (see the scope note above and Part 5).

So the creation-time structural decisions are the **propagation axis** (project-specific vs. generic-candidate) and **physical placement** — both worked through in Part 4, Step 2. Cluster comes later, and only for generic candidates that graduate. Don't reach for the substance of the folder-skill rule here; read it in `structure_conventions.md` + the archetype spec. This section only fixes which question is being asked when.

### Per-propagation per-cluster curation

The kit ships to each project as a curated subset, not the full kit. At project setup and at every kit propagation, the user and Claude decide per cluster whether the cluster activates for this project. Activated clusters' skills are copied into `skills/`; deactivated clusters' skills are not copied (or are removed if they were present from a prior propagation).

This is relevant to skill authoring only at the consolidation stage — when a project-local generic-candidate skill is being absorbed into the kit, the cluster placement decision also shapes how widely the skill will be available across projects (a skill placed in a cluster that's often deactivated will not be present where it's needed). At creation time in a content repo, the author doesn't make this call; the file is project-local and isn't curated.

Curation runs at the cluster grain but is not all-or-nothing: the cluster is the **proposal unit**, and individual skills within an activated cluster can be skipped or added per repo (the relaxed rule that replaced v2.x's all-or-nothing-per-cluster contract; `skills_curation_skill.md` owns the activation rules — point, don't restate). When consolidating a new skill into the kit, do not design it to *require* whole-cluster activation: it should degrade gracefully if a sibling skill is not present.

### Version and last-updated marker discipline

The kit uses two independent version trackers. They never track each other.

**Skill version — MAJOR.MINOR.PATCH.** Each skill carries its own semantic version, classified by what a change does to *that skill*:

- **MAJOR** (x → x+1): the skill behaves differently when invoked — a step added, removed, or reordered, or a workflow restructured or replaced. ("Step" means something the skill *does* during an interaction, not an explanatory passage.)
- **MINOR** (x.y → x.y+1): same behavior, refined — a caveat, a clarification, an added explanation, or a new rule that only sharpens how an existing step is described.
- **PATCH** (x.y.z → x.y.z+1): trivial — a typo, an accent, a formatting fix. This is the floor; three components, never more.

Tie-breaker for the ambiguous middle (e.g. a newly added hard rule): does it change what the skill *does* when invoked (major), or only how an existing step is described (minor)?

**Kit version — MAJOR.MINOR.** The canonical package in `LastSkillUpdate/` carries a separate version that marks a *dissemination* — a consolidate-and-re-propagate event. It has no patch level, because a dissemination is costly and is never run for a trivial fix.

- **MAJOR** (x → x+1): the kit's functional structure changes — workflow, clusters, curation/propagation, or naming/decomposition conventions — or a deliberate re-baseline. Volume alone does not force a major; many purely additive skills are still a minor, though a milestone-worthy additive release may be stamped major as a deliberate call.
- **MINOR** (x.y → x.y+1): skills added or updated, including a complementary skill that does not change any workflow.

**Two clauses that keep the trackers from colliding:**

1. A skill's version is its own and is **never set equal to the kit's**. A skill at v1.1 lives fine inside a kit at v2 or v3.
2. The kit version is stamped **only at dissemination**, and a planning cycle is named for the kit version it targets. Intermediate commits within a multi-session cycle do not bump the kit version.

**Marker format.** Every skill ends with a single italic line:

```
*Last updated: YYYY-MM-DD — vX.Y.Z (description of change; brief notes on prior versions in parentheses)*
```

One trailing marker per file. When a skill is revised, the marker is updated in place — prior versions preserved as notes within the parenthetical, never as stacked markers above or below. (Stacked-marker drift recurred through v2.1.12 / v2.1.14; do not reintroduce it.)

### Atomic-commit discipline for kit changes

Changes that touch multiple kit files (renaming a skill, splitting a skill, adding a new skill with wiring updates in `CLAUDE_template.md` and `PROJECT_SETUP.md`) must ship as one atomic commit via the GitHub Trees API, not as multiple single-file commits via the Contents API. This is enforced in SkillPropagation; project-local skill additions in a single content repo don't need this discipline because they touch fewer files.

---

## Part 2 — When to write a skill

A dedicated skill is warranted by **either** of two signals — you don't need both:

- **Frequency.** The same kind of task, with roughly the same instructions, **three or more times.** The third time the same correction or context appears is the cue. Here the recipe is encoded once, and the skill's own runs accumulate material over time (the *skill→corpus* direction).
- **Tacit-knowledge capture.** A task done *rarely* but carrying a lot of unwritten knowledge — there's a body of good and bad examples you reason from, and a skill would make the implicit explicit. Here the skill is distilled *from* that example body (the *corpus→skill* direction). A low-frequency task can still warrant a skill on this signal alone.

If the task warrants its own **`corpus/`** — task-tuning material with provenance to the skill — it is a **task-unit**, not a one-off, and that has a placement consequence (Part 4, Step 2: a corpus-backed skill is folder-needing and lands folder-local, with its `corpus/` alongside). `corpus/` is the cleanest marker of the difference: a task-unit has one; a one-off, made with the general skills only, does not. *(The full frequency-vs-tacit-knowledge triage and the corpus rules live in the coordination archetype spec §8 and `structure_conventions.md`; this is the authoring-side view of them.)*

Other good triggers:

- The same correction appears across multiple sessions ("you forgot to include X," "the structure should be Y, not Z").
- A task has a fixed structure that can be articulated (steps, sections, conventions) and retyping it every time is friction.
- The task is something a colleague or future-you might also do, and writing it down would save the same explanations.

**When NOT to write a skill:**

- For a one-off task. If it won't recur, don't formalize it.
- For a task that can't yet be articulated. If "what good looks like" is still unclear, do the task a few more times first. Codify when the pattern is stable, not when it's still forming.
- For something already covered. Check existing skills first — sometimes what's needed is a small addition to an existing skill, not a new one.
- For project-specific configuration. Parameters, folder names, deliverable lists, collaborator names — these belong in `CLAUDE.md`, not in a reusable skill.

---

## Part 3 — What a skill file contains

The components, in order:

### 1. YAML frontmatter

Two fields: `name:` (kebab-case, matches the filename minus `_skill.md`) and `description:` (one paragraph). See Part 1 for the discipline.

### 2. Title

A single `#` heading with the human-facing skill name. Title case is fine; the filename is the convention point.

### 3. One-paragraph summary

What the skill does, who uses it, when. This is what a human reads to confirm they're at the right file.

### 4. "When to use this skill" section

A short list of triggering scenarios for human confirmation, plus an explicit "Do not use this skill for" subsection that names what's out of scope. The frontmatter's `description:` is for Claude's pattern-matching; this section is the human-readable counterpart.

### 5. Prerequisites (optional)

If the skill assumes certain parameters or files exist in the project's `CLAUDE.md`, list them here.

### 6. The workflow

The core of the skill. A numbered series of steps Claude follows. Each step should be:

- **Specific.** Not "extract the text" but "use PyMuPDF to extract text. If fewer than 100 words come out, classify as scanned PDF and flag for manual review."
- **Imperative.** Tell Claude what to do, not what the task is about.
- **Decision-aware.** If a step branches ("if X, do this; if Y, do that"), spell out the branches.

### 7. Key rules

A short bulleted list of non-negotiable rules. These often capture the mistakes already seen — "do not skip the outline step," "do not summarize quotes verbatim," "always show before committing."

### 8. Edge cases

Things that don't fit the main workflow but recur. Worked examples here are valuable.

### 9. Setting up for a new project (optional)

If the skill needs configuration in the project's `CLAUDE.md`, describe what to add there. This is how the generic skill becomes specific to a project.

### 10. Last-updated marker

A single trailing italic line. See Part 1 for the discipline.

---

## Part 4 — Workflow: drafting a skill with Claude

### Step 1 — Describe the task

Describe the task to Claude in concrete terms: what the input looks like, what the output looks like, who the audience is, what makes a good output versus a bad one. Examples help — "the last time I did this, the result was X, and what I wanted was Y."

### Step 2 — Decide placement: the propagation axis and the physical home

Every new skill is born project-local — it lives in the repo where it was authored. Two placement decisions are made now, at creation, and both are the author's call. (A third — *cluster* placement — is **not** made here; see the end of this step.)

**Decision 1 — propagation axis: project-specific or generic candidate?** Will this skill ever be useful in another project?

- **Project-specific** — it references a deliverable, collaborator, parameter, or workflow unique to this project, and will never propagate. It stays **out of `skills/`** so the discovery sweep correctly ignores it (the sweep only looks inside `skills/`). Where it physically lands is Decision 2.
- **Generic candidate** — it describes a pattern that could apply across projects, even if authored in one repo for now. Place it **inside `skills/`** (flat, or in the general-kit subfolder if the repo has split `skills/`) so the next discovery sweep picks it up; consolidation later decides cluster placement, generalizes phrasings, and merges it into the kit; a future propagation ships it to other repos.

If the decision isn't clear, default to project-specific — a skill is promoted later by moving it into `skills/` and logging it; a skill that propagates prematurely is harder to claw back.

**Decision 2 — physical home: apply the folder-skill placement rule.** This is where the file actually sits. The binding rules live in `structure_conventions.md` ("Skills layout") and the repo's archetype spec (coordination §2a; the operation spec's structure-notes Folder-skills bullet; the research spec's skills-and-machinery note) — read those; the shape is:

- A **single-file** skill is a **loose file** (`skills/` holds at most one folder, `GeneralSkills/`; everything else in it is loose). A generic candidate's loose file goes in `skills/` per Decision 1; a project-specific single-file skill goes **folder-local, next to the work it serves** (e.g. a single-task skill at `funding/skills/tc-drafting/`, or the N=1 root `{task}_skill/`).
- A skill that **needs its own folder** (multiple files — agents, render scripts, templates, or a `corpus/`) does **not** live in `skills/`. It goes folder-local: N=1 (single task) → repo root `{task}_skill/`; N>1 (composition) → a self-contained `tasks/{task}/` holding the skill + `corpus/` + `instances/` together, or, for homogeneous tasks sharing a domain skill, the layer-parallel container variant with a shared repo-skill at root.
- Wherever it lands, **`CLAUDE.md`'s skills table is the roster** — register the skill there regardless of physical location; `skills/` itself is map-exempt machinery, not the roster.

**The two axes line up in practice, so they don't fight.** A folder-needing skill is tied to a task's `corpus/`/`instances/`, so it is project-specific and goes folder-local; a generic candidate is a single-file pattern and goes as a loose file in `skills/`. The `skills/` invariant — at most the one `GeneralSkills/` folder — means a multi-file skill folder never sits in `skills/` anyway. Whether the skill warrants a `corpus/` (and is therefore folder-needing rather than a loose single file) is settled by the Part 2 triage; if it has one, the corpus is skill-scoped and travels with the skill's folder.

Filename in all cases: `<purpose>_skill.md`. See Part 1 naming conventions.

There is no **cluster** placement at this step. Cluster placement happens at consolidation in SkillPropagation, not at creation in the content repo — see Part 1's "Physical placement vs. cluster placement" and Part 5.

### Step 3 — Source observed phrasings for the frontmatter

Before Claude drafts frontmatter, list the literal phrasings used when invoking this skill. Use them in the `description:`. If the phrasings aren't clear yet, name the most natural way the task would come up.

### Step 4 — Claude proposes a draft

Ask Claude to draft a skill file using the structure in Part 3. Read it carefully.

### Step 5 — Iterate

The work happens here. Common things to fix:

- The `description:` is too vague — make it more specific; include the actual triggering phrasings.
- The workflow is too high-level — break a step into substeps.
- A rule is missing — add it.
- An assumption is wrong — flag it.
- The skill is doing too much — check Part 1's decomposition principle; if all three conditions hold, split.

Don't expect the first draft to be right. Skills get better as they're used.

### Step 6 — Test it

Use the skill on a real task. Where Claude gets it right and where it doesn't are both signals. The places it gets wrong are usually places where the skill needs more detail.

### Step 7 — Save and wire

Save the file at the physical home chosen in Step 2 (Decision 2), then wire it up per the propagation axis (Decision 1).

**Physical placement (both cases):**
- Save the skill at its folder-skill home — a generic candidate's loose file in `skills/`; a project-specific single-file skill folder-local next to the work; a folder-needing skill in its `{task}_skill/` or `tasks/{task}/` folder, per `structure_conventions.md` + the archetype spec.
- If the skill warrants a **`corpus/`** (the Part 2 triage), create it skill-scoped alongside the skill and seed it by direction: a **frequency** skill's corpus accumulates from its runs over time (skill→corpus), so it may start empty; a **tacit-knowledge** skill's corpus holds the **inputs that make the skill** — the good and bad examples it was distilled from — placed now, with a provenance pointer back to the skill (corpus→skill).
- Register the skill in **`CLAUDE.md`'s skills table** regardless of where the file sits — that table is the roster.

**If the skill is project-specific:**
- Add its row to the "Project-specific skills" sub-table in the project's `CLAUDE.md`, with the actual path. (The template comments this sub-table out by default; uncomment it the first time a project-specific skill lands.)
- No `skills/CHANGELOG.md` entry — that changelog is for kit-side state, not project-specific work.
- Optionally note in STATUS.md if the addition is part of in-flight work worth tracking.

**If the skill is a generic candidate:**
- It is saved inside `skills/` (Decision 1), so the discovery sweep will see it.
- **Add an entry to `skills/CHANGELOG.md`** noting the new file as a generic candidate, with a brief description of what it does and why it's a candidate (one or two sentences). This entry is what the next discovery sweep reads to recognize the file as a deliberate addition rather than ambient drift.
- **Add a row to the project's `CLAUDE.md` under a "Project-local skills (created in this repo, pending consolidation)" section.** If the section doesn't exist yet (no prior project-local skill in this repo), create it as a subsection of the Skills section, between the last cluster and the "Kit metadata" sub-table. The row carries three columns: skill file, purpose, and a *suggested cluster* — the author's intuition about which kit cluster the skill should land in at consolidation. The suggestion is advisory; consolidation makes the binding decision. This section exists for as long as the project has unconsolidated generic candidates.
- **Note in STATUS.md** under recent sessions or current state — a short line that this generic-candidate skill was added. STATUS.md keeps the project's tracker honest; the changelog is for downstream consolidation.
- The next discovery sweep in SkillPropagation will pick up the file from `skills/`, the consolidation conversation will decide cluster placement and generalize the frontmatter, and a future propagation will ship the canonical version back to relevant repos.

In either case: do not pre-assign a cluster, do not write the skill's frontmatter as if it were already in the kit, and do not anticipate generalizations the consolidation conversation will make. The author's job at this step ends when the file (and its `corpus/`, if any) is in place and the relevant logs are updated.

### Step 8 — Reuse and revise

Each use surfaces small things to improve. Iterate. Skills are living documents.

---

## Part 5 — The downstream lifecycle: from generic-candidate to kit skill

Promotion isn't a decision the author makes at creation time. It happens through the kit's existing discovery and consolidation infrastructure in SkillPropagation. This section describes what happens after a generic-candidate skill is placed in `skills/` and logged.

**Step A — Next discovery sweep.** When the user next runs a sweep in SkillPropagation (`incoming_discovery_skill.md`), the Skills Diff Check prompt runs in each content repo and compares `skills/` against the repo's `LastSkillUpdate/` snapshot. The generic-candidate skill appears as a new file. The `skills/CHANGELOG.md` entry provides context (when added, what for). A bundle zip is produced and brought into SkillPropagation's `incoming/`.

**Step B — Consolidation.** The next consolidation session (`skills_consolidation_skill.md`) unpacks the bundle, classifies the new skill as an addition, and runs the kit-side decisions: cluster placement (per Part 1), frontmatter generalization (drop project-specific phrasings; source new phrasings from observed usage), naming check (does it conform to the kit's naming conventions; rename if not), wiring updates in `CLAUDE_template.md` (cluster row) and `PROJECT_SETUP.md` (Phase 3 menu, Files-to-copy list, Appendix), and a CHANGELOG entry in `LastSkillUpdate/CHANGELOG.md`.

**Step C — Propagation.** A future propagation (Part C of `PROJECT_SETUP.md`) ships the now-canonical skill to relevant content repos as part of the per-cluster curation conversation. Repos that activate the cluster receive the skill; repos that don't, don't.

**What this means for the author.** The author's job ends at "saved in `skills/`, logged in changelog and STATUS.md." Cluster placement, generalization, kit-wide phrasing — all of it happens later, by people (or a session) with full visibility of the kit. The author writes the skill that works in this project; the consolidation conversation translates it into a kit skill.

**One thing the author can do to make consolidation easier:** keep project-specific references in the project's `CLAUDE.md` (parameters, paths, collaborator names), not baked into the skill body. A clean generic-candidate references its inputs via parameters defined elsewhere; a messy one hard-codes project specifics into rules. The cleaner one is straightforward to consolidate.

**Signals that a generic-candidate is consolidation-ready:**
- It has been used unchanged for long enough that the patterns are stable.
- It would work as-is (or with light frontmatter edits) in a different project.
- It doesn't duplicate something already in the kit.

The discovery sweep will pick up the candidate regardless of readiness; the consolidation conversation is where readiness is judged. A candidate that isn't ready can be deferred, archived, or rejected — the project repo's copy stays in place either way.

---

## Part 6 — Worked example: a talking-points skill

Suppose the user finds themselves asking Claude to prepare talking points for meetings repeatedly, and keeps giving the same kinds of instructions. Here's how the conversation might go:

**User:** "I'd like to write a skill for preparing talking points. Each time I ask, I usually need: 3–5 main points, each with a one-line message and 2–3 supporting facts; ordered from most to least important; in my voice (direct, evidence-based, no filler). The audience varies — sometimes a minister, sometimes a peer, sometimes a journalist. Can you draft a skill?"

**Claude:** "Before drafting, the two creation-time placement calls. **Propagation axis:** talking-points prep is a general pattern, not tied to anything unique to this repo, so I'd call it a generic candidate and save it in `skills/` where the next sweep can find it. **Physical home:** it's a single-file deliverable skill, and there's no example-corpus driving it (the frequency signal, not tacit-knowledge), so it's a loose file — not a task-unit folder, no `corpus/`. Filename: `talking_points_skill.md`. No cluster call here — that's consolidation's job if it ever gets promoted (Part 5)."

**User:** "Right. Go ahead."

**Claude:** [drafts `talking_points_skill.md` with frontmatter, when-to-use, workflow, rules]

**User:** "Looks good but: the `description:` should mention 'briefing,' 'preparation for a meeting,' and 'key messages' — those are the phrases I actually use. Also, you have a step that says 'identify the audience' — turn that into a specific question Claude should ask me at the start, because I always forget to say. And add a rule: if I haven't given you the meeting context, ask before drafting."

**Claude:** [revises]

**User:** "Better. Let's test it." [uses the skill on a real meeting]

**User:** "It worked but the points were too long. Add: 'Each main message is one sentence, max 20 words.' That's a hard limit."

**Claude:** [adds the rule, bumps the version]

After a few iterations like that, the skill captures how this task is actually done. The next time the user says "prepare talking points for the meeting with X," Claude reads the skill and produces something close to what the user would have produced themselves, without retyping the instructions.

If, six months later, the same skill is being used unchanged in three projects, that's the promotion signal — a candidate to graduate into the kit per Part 5.

---

## Part 7 — Common mistakes

- **Description too vague to trigger.** "Write professionally" tells Claude nothing about when to read this file. Specific triggering phrasings, included literally, are what make the skill discoverable.
- **Skill content duplicated in CLAUDE.md.** If the same instructions appear in multiple projects' CLAUDE.md files, that's a skill, not project context. Move it.
- **No examples.** Examples are the fastest way to teach Claude what good looks like. Include at least one worked example for any non-trivial skill.
- **Trigger phrasings invented by the designer.** "When the user wants to optimize their workflow" is a designer phrase; nobody says that. Use the user's actual words.
- **Cluster-shopping at creation time.** Project-local skills don't get a *cluster* — that's a consolidation decision in SkillPropagation, not a creation-time call. At creation the structural calls are the **propagation axis** (project-specific vs. generic-candidate → whether the file goes in `skills/`) and the **physical home** (the folder-skill placement rule → loose-in-`skills/`, folder-local, or a task-unit folder, plus where a `corpus/` lands). Cluster is a different, later, SkillPropagation-side decision.
- **Hoisting a folder-needing skill into `skills/`.** A skill with multiple files or a `corpus/` does not belong in `skills/` — that folder holds at most `GeneralSkills/` plus loose single files. A corpus-backed skill goes folder-local, next to the work it serves (`structure_conventions.md` + the archetype spec). Putting it in `skills/` breaks the one-folder invariant the next audit will catch.
- **Forgetting to log a generic candidate.** A new file in `skills/` without a corresponding `skills/CHANGELOG.md` entry is ambient drift, not a deliberate candidate. The log entry is what tells the next discovery sweep this was intentional.
- **Pre-generalizing for the kit.** Writing the frontmatter, naming, and wording as if the skill were already in the kit anticipates work that belongs in consolidation. Write what works in the project; let consolidation translate.
- **Stacking last-updated markers.** Add the new marker and consolidate prior notes into its parenthetical. Don't leave older markers above or below.
- **Splitting too early.** A skill with two sections is not necessarily a split candidate. All three conditions of the decomposition principle must hold.
- **Splitting too late.** A skill with a triage step that's been routing to two divergent protocols for months is overdue for a split. The drift compounds.

---

*Last updated: June 11, 2026 — v2.0.0 (v4 final-pass fix build: the cluster enumeration trimmed to a pointer at `CLAUDE_template.md`'s canonical roster and the count corrected seven → eight (R3 — the enumerated copy had drifted: no archetype cluster, no v4 additions); the v3.2-retired all-or-nothing-per-cluster rule replaced with the relaxed cluster-proposal / free-per-skill rule + a pointer at `skills_curation_skill.md` (M2). Carries the v2.0.0 floor; final stamp at the v4 re-baseline.) Prior: June 10, 2026 — v2.0.0 (v4 archetype_conventions review fixes: the two folder-skill rule references updated from "coordination §2a, inherited by operation" to name each spec's own section — the operation spec now states its folder-skill form self-containedly (its structure-notes Folder-skills bullet), so the cross-spec inheritance framing is retired; a deployed repo carries only its own spec, so the old pointer was unreadable in place. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 9, 2026 — v2.0.0 (v4 cycle, skill_authoring placement reconcile: separated the two creation-time placement axes — the **propagation axis** (project-specific vs. generic-candidate → `skills/` membership) and **physical placement** (the folder-skill rule: single-file-loose vs. folder-needing task-unit, folder-local next to the work, where a `corpus/` lands), pointing at `structure_conventions.md` "Skills layout" + the archetype specs (coordination §2a) for the binding rules rather than restating them. Added a Part 1 "Physical placement vs. cluster placement" anchor; folded the frequency-OR-tacit-knowledge triage and corpus-as-task-unit-marker into Part 2; rewrote Step 2 (two axes) and Step 7 (save at the folder-skill home, place the `corpus/` + the inputs-that-make-a-skill when warranted); fixed the Part 6 worked example (was cluster-shopping at creation) and the Part 7 "only structural call" mistake, and added a hoisting-a-folder-skill-into-`skills/` mistake. Closes the v4 worklist's skill_authoring-placement-reconcile item; the open sub-question resolved to placement + a light Part-2 touch, `[SKILL-FEEDBACK]` left out of scope. Stamped at the v2.0.0 floor; final v4 stamp at cycle close. Prior: June 8, 2026 — v2.0.0 (v4 cycle, #8 branch/exploration build: updated the Repo-and-session-infrastructure cluster list to the split branch skills (writing branch + exploration branch), and re-pointed the "current purpose, not anticipated generality" worked example from the retired `branch_workflow_skill.md` to `writing_branch_skill.md` — which still illustrates the principle, since `finish_session_skill.md` invokes it as a required action so its current dependency, not its topical cluster, places it. Prior: May 28, 2026 — v2.0.0 (rewrote Part 1's version/marker discipline to the two-tracker convention: skill version MAJOR.MINOR.PATCH by behavioral change to the skill; kit version MAJOR.MINOR by dissemination; a skill's version is never set equal to the kit's. First file carrying the v2.0.0 floor — the kit-wide marker reset, file renames, and the kit package version land together at v3.2 cycle close. Prior history: promoted from `starter_package/how_to_write_a_skill.md` and reorganized into seven parts; Step 7 generic-candidate clause added in the May 28 consolidation.)))*
