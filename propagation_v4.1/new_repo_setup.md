---
name: new-repo-setup
description: >
  Birth-time archetype triage + scaffold for a NEW repo (not restructuring an
  existing one). Classifies the repo into research / coordination / operation /
  NONE from intent questions, proposes the archetype with reasoning and waits for
  confirmation, then builds the birth skeleton from the matching scaffold.
  Kit-resident birth tool, read at new-repo setup; not copied into content repos.
---

# New-repo setup — archetype triage + scaffold

*For standing up a **new** repo. Runs as part of project setup: detect new repo →
triage the archetype through the questionnaire → scaffold the structure + indexes.
Proposer model: it proposes the archetype with evidence and **waits for Andrea's
confirmation** before scaffolding.*

## When this runs

A **new / empty repo** is being set up. There is nothing to inventory —
classification comes from **intended work**, asked as questions, not from reading
an existing tree.

## Step 1 — Triage through the questionnaire (intent, not files)

Ask Andrea these, in order; stop at the first clear archetype but capture the answers:

1. **Will this repo mainly *track or route* work (a tracker/dashboard/lookup), rather than
   *produce* deliverables?** → **NONE** (operational tracker; keep centralized, no archetype).
2. **Is the work *lines of inquiry* — building up literature/evidence toward papers or
   analytical outputs, pursued for their own sake?** → **RESEARCH**.
3. **Is the work *one narrow task done many times*, a deliverable per run** (reviews,
   proposals, presentations, briefs) — or *several* such tasks (+ one-offs)? → **COORDINATION**.
4. **Is the work *one dated, multi-year effort toward policy reform(s)*** — with a reform
   matrix and/or a funding workstream, sub-products feeding reforms? → **OPERATION**.

**Disambiguating questions when 2 vs 4 is unclear** (the research-vs-operation seam):
- Is there a **dated external target / a reform being driven** (→ operation), or **inquiry for
  its own sake** (→ research)?
- Will there be a **funding workstream** and/or a **policy-change matrix**? (→ operation)

If genuinely unclear, present both readings and ask — don't force it.

## Step 2 — Propose, with reasoning, and STOP

Present the proposed archetype, the answers that drove it, and the one alternative ruled out.
**Wait for Andrea's confirmation.** (For a single-task / single-reform new repo, note it's the
**N=1** case — it will promote later if a 2nd task/reform/line appears; born minimal now.)

## Step 3 — Scaffold the chosen archetype (Phase-1 skeleton only)

On confirmation, build the **birth skeleton** for that archetype — folders + root indexes
(self-documenting, empty-but-headed) + `FOLDER_MAP` stubs + a `CLAUDE.md` archetype
declaration. **No migration phases** (nothing to migrate — it's a new repo). Each archetype's
skeleton is in `<archetype>_setup_scaffold.md`. Read the matching one and build it.

An **archetype** repo carries all three layers: the universal floor
(`structure_conventions.md` + `naming_conventions.md`), the archetype-common layer
(`archetype_conventions.md`), and its one `<archetype>_archetype_spec.md`. A **NONE** repo
keeps **only the floor** (`structure_conventions.md` + `naming_conventions.md`) plus a bespoke
skeleton — no spec, and not `archetype_conventions.md`.

After scaffolding, the repo is born correctly-structured; Andrea starts working, and the
archetype's own spec governs from there.


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; Step 3 NONE-vs-archetype layering made explicit 2026-06-09 (v4 archetype_conventions build) — an archetype repo carries the floor + `archetype_conventions.md` + its spec, a NONE repo the floor only + a bespoke skeleton. Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
