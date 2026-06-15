---
name: coordination-archetype
description: >
  The structure-and-index preset for a coordination repo — work organized as
  narrow repeated tasks producing a deliverable per run (reviews, proposals,
  syntheses, briefs), one task or several plus one-offs. Kept only by repos whose
  declared type is coordination/repeated-task. Read after structure_conventions.md
  and archetype_conventions.md (the common layers), alongside naming_conventions.md.
  Defines the substrate,
  resource typing, subject-keyed instances, the index set, the feedback edge,
  composition, the one-off home and triage, and promotion — the invariants the
  archetype audit checks a coordination repo against.
---

# Coordination archetype — repeated-task — spec

*Shares the universal floor (naming, `FOLDER_MAP`, structure conventions, the
`_ex` rule, reading-order) by reference — see `naming_conventions.md` /
`structure_conventions.md` — and the archetype-common layer (born-minimal
promote-on-evidence, origin-based typing, the shared-spine / "one repo or two"
test, by-subject keying, the fixed skeleton) — see `archetype_conventions.md`.
This doc describes only what is **different** about a repeated-task repo —
coordination's forms of those common rules, and its own index set.*

---

## 1. The shape — one archetype, universal spine, per-repo specialization

A repeated task is narrow and specific — review a publication and return comments, synthesize a meeting into a panorama, make a proposal, write a policy brief — and the repo exists because that task is done **many times**. The unit is the **instance** (one run + its output), **not** a line of inquiry.

A repo holds **N repeated-task units (N ≥ 1; N = 1 is the special case), plus optionally some one-offs** — work produced with only the general skills (§8). Each folder of work is **triaged** to one side: a *repeated task* (has its own dedicated skill + corpus) → a task-unit (composition, §7); a *one-off* (general skills only) → the one-off home (§8). The triage is an ongoing reading, not a setup gate, and things **promote** between the two on evidence (§9). A repo may also hold a **heavy one-off component** alongside its repeated tasks — that is still this archetype, sorted by the triage, not a separate one.

The key design principle: **the spine is universal; the specifics are per-repo.**

- **Universal across every repeated-task repo:** the substrate (§2), the resource rules (§3), the index set (§5), the feedback edge (§6), composition/one-off/promotion (§§7–9).
- **Per-repo, discovered at restructure time** (§4, §10): the **instance-internal layout** and the **domain machinery** — found from what the task actually does, proposed by Claude, **confirmed by Andrea at setup**, recorded once. Worked examples, not mandates.

`CLAUDE.md` declares: type = **coordination / repeated-task**, the number of tasks (single or composed), the variant (**flat**/**cyclic**, §4), the confirmed **instance layout**(s) (§4), and the spec version.

## 2. The substrate (universal)

- **`skills/`** — holds **`GeneralSkills/`** (the propagated kit) plus any **single-file** skills (kit or repo-specific). **Invariant: at most one folder inside `skills/`, and it is `GeneralSkills/`; everything else in `skills/` is loose files.** A repo-specific skill that **needs its own folder** (multiple files — agents, render, playbook, templates) does **not** live in `skills/` — it goes elsewhere (the folder-skill placement rule, §2a). `CLAUDE.md` rosters every skill wherever it lives.

### 2a. Folder-skill placement (where a folder-needing repo skill lives)

- **N = 1 (single task):** one folder-skill at the **repo root**, `{task}_skill/`. Born-minimal — no shared/task split needed when there's one task.
- **N > 1 (composition):** folder-skills split by **scope**, mirroring nest-vs-share (§7):
  - a **shared repo-skill** (serves the whole repo, part of the shared layer) → **repo root**, sibling to `skills/`/`reference/`/`assets/`;
  - **task-specific repo-skills** (each belongs to one task) → **default: a self-contained `tasks/{task}/` folder holding that task's skill + `corpus/` + `instances/` together** (more consolidated, and it answers the "scattered skill-folders at root" worry directly). **Variant (homogeneous tasks that share a domain skill):** lay out task-parallel by layer — `{container}/{task}` (skills) alongside `corpus/{task}` and `instances/{task}` — i.e. `{container}/{t1,t2}/` alongside `corpus/{t1,t2}/` and `instances/{t1,t2}/`, so the skill layer **nests identically to corpus and instances** (layer-consistency, and it obeys *multiplicity-inside-folders-never-at-root*). The container is **generic**, named by the repo (e.g. `agents/`). **Which layout to use keys on shared-domain, not task-count N:** if the tasks share a domain skill (homogeneous pipelines), the layer-parallel variant + a root shared repo-skill make sense; if they share nothing at the skill level (heterogeneous tasks), use self-contained `tasks/{task}/` units and there is **no** shared repo-skill layer.
- This is the **(c) promote-on-evidence** move: N=1 sits at root (`{task}_skill/`); when a second task appears, task skills move into the container nested by task and any **shared** repo-skill stays at root.
- **`reference/`** — your-side material **consulted each run**, **kept current**. Maintained. **Repo-scoped** (shared by all tasks and one-offs).
- **`corpus/`** — what a **skill was built from / is tuned by**; has provenance to its skill; **accumulates**. **Skill-scoped** (one corpus per task, §7).

`reference` and `corpus` differ in kind: one is maintained and shared; one grows and is per-skill.

## 3. Resources: papers, materials, assets (universal rules)

Literature/materials handling is **not reinvented per archetype** — it follows the shared rules in `naming_conventions.md` / `structure_conventions.md` and the paper-processing skills (`papers/` text/summaries; the typed indexes).

**Origin-based typing** is the archetype-common rule (`archetype_conventions.md`): typed by **origin relative to *this* repo**, not authorship; the one special category is what the repo produces; a **provenance override** exists on upload (ask when unclear). In a coordination repo that means **instances' outputs — and any reference the repo produces for its own future runs — are the repo's own**, while everything brought in (FMM-authored or received alike — both collapse to materials) is typed normally as paper / material / asset with a scope.

**Promotable-resource rule (papers + materials):** born at **instance scope**, catalogued once in its typed index with the row shape **`item · scope · used-by · location`**, **promoted toward `reference/` on second use** — the index surfaces the candidate; Andrea confirms; the file moves and scope/used-by update. The coordination echo of research's lift-to-`general/`.

**Instance-that-is-also-a-resource (dual-life):** an output of one run can also be a resource other tasks reuse (e.g. a canonical narrative that is both a `messaging` output *and* a reused source). The **instance is the home; `reference/` (+ `REFERENCE_INDEX`) carries a pointer, never a copy** — and this is the rare case that legitimately puts an item in `REFERENCE_INDEX` (in-repo-produced reference). **Origin-typing coexists with an authorship split for organization:** typing-for-promotion stays origin-based (§ above), but a coordination repo may *organize* `reference/literature/` by source (external / own-institution / other) because "what is our own literature?" is a live query — organization by authorship, typing by origin, both true at once.

**Assets are born SHARED** in `assets/` (the exception) — the reusable thing is often the **structure** (a chart template, a brief format), not just the image. No used-by/promotion. **Tight definition:** an asset is a visual **building block not yet embedded in any deliverable** (an SVG, a chart, a generated image); a reusable **slide** is a task's **corpus**, not an asset — don't let "assets" swallow slide drafts. *(Distinct from kit-bundled assets — logo, Word preamble, slide backgrounds — which are **kit machinery** living in the general-kit skills folder, not work-product assets; see §10.)*

## 4. Instances — universal naming, per-repo layout

- **Subject-keyed naming** (coordination's form of the archetype-common by-subject keying — `archetype_conventions.md`). Instances are found **by subject** — the inverse of research's `who_what_year`. `lowercase_underscore`, subject primary, qualifiers only to disambiguate: `review_<subject>`, `proposal_<subject>_<call>`. (The archetype's acceptance test: an instance is findable by subject without remembering where it lives.)
- **Per-repo instance-internal layout (discovered, not templated).** What sits *inside* one instance depends on what a run **produces, consumes, and keeps**. Setup proposes the layout (X/Y/Z) and **asks Andrea to confirm**; it's **recorded once at the repo level** (`instances/FOLDER_MAP` + a `CLAUDE.md` line); every new instance conforms. **One `FOLDER_MAP` per instance** maps its subfolders (not one per subfolder). An instance subfolder with **no content doesn't exist as a git folder**; the instance `FOLDER_MAP` documents intent regardless.
  - **Worked example — review:** `submitted/` (author versions) + `review/` (comments + paired email) + `inputs/` (instance background).
  - **Worked example — synthesis:** `inputs/` (consumed: presentation + transcript + notes) + `extracts/` (kept, indexed audit trail) + the product (panorama) at instance root.
- **Flat vs cyclic variant (universal).** Default **flat**. **Cyclic** (task runs on a calendar): runs grouped under a cycle container, each cycle with its own `lessons_learned.md` (§6). Flat→cyclic later, no migration. **Per-cycle source material lives in the cycle container** (e.g. `instances/2026_call/call/` — the call's raw docs + its decode), *not* in the skill — so the skill stays **year-agnostic**. **Composition × cyclic nesting: task outer, cycle inner** — `instances/{task}/{cycle}/proposal_<subject>/`; per-cycle source in `{cycle}/call/`; per-task `lessons_learned.md`. **Call material shared across tasks** (e.g. one application form + selection criteria serving both tasks) is kept **once in `reference/`, scope-tagged, not duplicated per cycle**. A derived-analysis blob that is *both* built-from-corpus *and* cited-each-run splits by role (distilled patterns → the skill; evidence → `reference/`; per-cycle source → the cycle) — **but a tightly-interleaved dual-role blob is better relocated whole by its *primary* role than physically cleaved**.

## 5. Indexes — all created up front (universal)

Created at setup **at repo root** (ALL_CAPS), following the archetype-common typed-index behavior (`archetype_conventions.md`: created up front and empty-but-headed, pointer-only, self-registering). **Large reference layer -> root points, `FOLDER_MAP` enumerates:** when faithful per-document typing would swell a root index (e.g. tens of docs), keep the root index thin — explicit rows only for the *recurring* received input plus per-container pointer rows — and enumerate the detail in each container's `FOLDER_MAP`. **Typed indexes carry no per-document quality metadata** (reliability, confidentiality); when a repo tracks that, a **domain registry/catalog** is its home (see §10). **Emphasis is task-shaped:** the always-load-bearing core is `INSTANCES` / `OUTPUTS` / `REFERENCE`; others carry weight depending on the task (e.g. `DEEPDIVES` is core for *review/verification* tasks but may sit empty for a *synthesis* task).

- **`INSTANCES_INDEX`** — **the spine.** Every run, **subject-led**, keyed by the **run not the country/subject-owner** (two meetings on one country = two rows), with qualifiers + outcome status. When composed, sectioned by task. Instances are **never deleted**: an outdated run or a superseded output keeps its folder and its row — the outcome/status column marks it — coordination's form of the universal *nothing-destroyed-on-a-state-change* rule (`structure_conventions.md`).
- **`OUTPUTS_INDEX`** — finished products, **sectioned: by repeated task, then one-offs.** One thin pointer-only surface (so cross-dependencies — a one-off drawing on a task's material — stay visible). Splitting into a separate `ONEOFFS_INDEX` is **deferred until evidence**: only if a repo's one-off pile grows large *and* independent (instrument it; don't split pre-emptively — thinness, not splitting, keeps it scannable).
- **`PAPERS_INDEX`**, **`MATERIALS_INDEX`** — carry the promotable-resource rule (§3).
- **`ASSETS_INDEX`** — born-shared work-product assets (no used-by/promotion).
- **`NOTES_INDEX`** — cross-instance reading/thinking by subject.
- **`DEEPDIVES_INDEX`** — verified claim-verification runs (core for review-type tasks; may be empty for synthesis). Verification discipline: only *verified* dives indexable; the row cites the verified output; a candidate list isn't deleted until verification completes.
- **`REFERENCE_INDEX`** — **usually empty under origin-typing.** Holds only **in-repo-produced** reference items (reference the repo makes for its own future runs) — rare. Brought-in reference material is typed (paper/material/asset with scope=reference) and lives in those indexes, not here. The index is kept (anti-drift, all-up-front) but expected empty; the audit cross-check still runs.

## 6. The feedback edge (universal, outcome-driven, deliberate)

Outputs can improve a skill — but **only outputs carrying information the skill did not generate itself.**

- **Feed back:** external **outcomes / feedback / corrections** (a proposal funded or not + reviewer comments). Signal from the world.
- **Do NOT feed back:** a clean output that came out well *because the skill is good* — circular.
- **Trigger = an outcome event**, not task completion — may fire weeks later, or never. Feed back the **delta** (result + *why*), not the artifact.
- **Lessons → corpus** (per-task). Cyclic: per-cycle `lessons_learned.md` → that task's `corpus/` at cycle close. Flat: straight to `corpus/`.
- **finish_session prompts (this archetype; prompt-not-perform):** (1) "does anything you did today need feeding back to a process/skill?" → save the conversation + a to-do; (2) the **real-world-signal** question — did an outcome arrive on an instance awaiting one?; (3) the **promotion-drift** question (§9) — has a one-off started recurring, or a single-task repo grown a second task?

## 7. Composition — more than one repeated task in a repo

One repo, **N repeated tasks** (N = 1 is the special case, just as the research archetype is one archetype with N lines). The rule: **nest what's task-scoped, share what's repo-scoped.**

- **Task-scoped (nests by task):** `instances/{task}/`, `corpus/{task}/`, and **one dedicated skill per task** in `skills/` side by side.
- **Repo-scoped (stays single, shared by all tasks):** `reference/`, `assets/`, the general kit.
- **Multiplicity nests *inside* a root folder, never at the root** — `instances/{panorama,comparison}/`, not `instances_panorama/` + `instances_comparison/` siblings. The root skeleton is fixed by the archetype; flexibility lives one level down.
- **Indexes:** one thin run-keyed spine (`INSTANCES_INDEX`, sectioned by task) + per-instance `FOLDER_MAP` detail. No per-task root index; no second detail file.
- **Born-additive:** a second task drops in without restructuring the first (same no-migration discipline as a new research line).
- **Shared-spine test (before composing):** the archetype-common "one repo or two" test (`archetype_conventions.md`), in coordination's terms — is `reference`/`assets` genuinely co-used across the tasks, or are these co-located strangers? If they don't share a real spine, they may be two repos, not one composed repo.

## 8. One-offs, and the triage

A **one-off** is a deliverable produced **once, with only the general skills** and the repo's shared `reference/`/`assets/` — it has **no dedicated skill and no corpus** of its own. It lives in the repo precisely *because* it draws on the shared layer (e.g. a one-off that uses a task's `messaging` material) — the shared resource is the reason for co-location, the same binding that justifies composition.

- **Home:** a `oneoffs/` (or `adhoc/`) sibling to `instances/`, subject-keyed, same inputs+output layout idea; output lands in the **one-off section of `OUTPUTS_INDEX`** (§5).
- **Default + "undecided yet":** the one-off home is the **lowest-commitment slot**, and so it is also the **default home for work whose nature isn't decided** — you start something, don't yet know if it'll grow a skill, and it sits here until evidence resolves it (§9). *Not knowing is a first-class, supported state* — you are never forced to predict.

**The triage (per folder of work):** does it have, or warrant, **its own dedicated skill + corpus**? → **yes → task-unit** (§7). → **no, made with general skills only → one-off.** A dedicated skill is warranted for **either** of two reasons:

- **frequency** — done often enough to encode the recipe (corpus grows *from* the skill's runs: skill→corpus); or
- **tacit-knowledge capture** — done rarely but carrying a lot of unwritten knowledge (good/bad examples to infer from), where a skill makes the implicit explicit (the skill is distilled *from* an example-corpus: corpus→skill).

So **"task-unit" is decoupled from "high frequency"** — a rarely-run but skilled-and-corpus-backed thing is still a task-unit. `corpus/` is the cleanest marker: a task-unit has one; a one-off does not.

## 9. Promotion — born-minimal, promote-on-evidence

The born-minimal, promote-on-evidence principle is archetype-common (`archetype_conventions.md`): nothing is classified by prediction; everything **enters at its lowest-commitment honest reading** and **promotes only on observed evidence**, additively, no migration. Coordination's three promotions:

- **one-off → task-unit:** when a one-off **recurs** (second occurrence), **or** turns out to be **tacit-knowledge-heavy and worth capturing** (you've accumulated good/bad examples). Promotion = give it a dedicated skill, start its `corpus/{task}/`, move its past one-off outputs into `instances/{task}/` as the first instances, re-section it in `OUTPUTS_INDEX`. The repo isn't rebuilt; the one-off **graduates**.
- **single-task repo → composition repo:** when a second repeated task appears (N=1 → N>1) — add the task's skill, `instances/{task}/`, `corpus/{task}/`; `reference`/`assets` stay shared.
- **The drift check surfaces candidates** (finish_session / the periodic revision pass), so promotion is **noticed, not predicted**: "you've done this kind of one-off a few times / accumulated examples — give it a skill and make it a task?"

## 10. Domain machinery + shared machinery (by reference)

**Domain machinery is per-repo and guaranteed a home.** A repo carries task-specific rules the generic spec can't enumerate — review-status labels, intake variants, comments-and-email pairing, controlled vocabularies. The spec **guarantees a home** (in `CLAUDE.md` and/or a domain skill), and domain machinery is **preserved verbatim** through any restructure. **But naming rules are NOT domain machinery** — they're *shared* machinery, conformed to `naming_conventions.md` (an old CamelCase `AuthorTitleYear` rule is retired, not preserved). A repo may also carry its **own domain catalog** broader than its contents (e.g. an index of all division publications) — kept, distinct in role from `PAPERS_INDEX`. **Typed indexes don't hold per-document quality metadata** (reliability, confidentiality, etc.) — when a repo tracks that per document, a **domain registry** is the home. **Kit-bundled assets** (logo, Word preamble, slide backgrounds) are **kit machinery** in the general-kit skills folder — *not* the born-shared work-product `assets/` (§3).

**"Corpus" is the task-tuning material only.** The word is overloaded — a *body of literature* ("the corpus of FMM publications") is **reference material**, not a task `corpus/`; keep index labels and prose from conflating the two (a literature body lives in `reference/literature/`). **Tracker-shaped residue inside a composition:** a repeated-task repo can contain pieces that are operational-tracker shaped (a lookup DB, a revision tracker — *track/route*, not produce-per-run); they land as consulted **`reference/data/`** datasets with their lookup skills as domain machinery, **not** as task-units. The operational tracker stays a non-archetype, but it can appear *as residue within* a composition.

**Index-file convention.** Content folders use **`FOLDER_MAP`**. Folders owned by a skill keep that skill's **`INDEX.md`** (`workspace/claude_conversations/`, `workspace/agent_outputs/`). The skill owns its index; `FOLDER_MAP` is the default everywhere else.

**Common machinery (by reference):** the **universal floor** — naming, `FOLDER_MAP` everywhere, the root inbox (accidental staging swept into the intake check), the `_ex` rule, reading-order — from `naming_conventions.md` / `structure_conventions.md` (applies to any repo, archetype or NONE); and the **archetype-common layer** — origin-typing, promote-on-evidence, the shared-spine test, by-subject keying, the fixed skeleton — from `archetype_conventions.md` (every archetype repo, not NONE).


---
*Kit file — added in the v4 archetype-layer promotion (Stage 1a), 2026-06-05; the index-file-convention workspace reference reconciled to `claude_conversations/` 2026-06-09 (v4 workspace-folders build); re-pointed to the new common layer in the v4 archetype_conventions build 2026-06-09 — the header note and §10 now reference `archetype_conventions.md` for the archetype-common rules, and §3 origin-typing / §9 promote-on-evidence / §7 shared-spine test / §4 subject-keying state coordination's *forms* of those common rules rather than restating the general principle. **Post-build review fixes 2026-06-10** (v4 archetype_conventions review): §3's "borrowed from the research archetype" framing replaced by naming the traveling shared files directly (a deployed coordination repo carries no research spec to follow the pointer into); §5's index lead re-pointed to the new L2 typed-index-behavior section, keeping coordination's own forms (large-reference thinning, no-quality-metadata, task-shaped emphasis); the `INSTANCES_INDEX` bullet gains the explicit instance-retention clause — coordination's form of the universal nothing-destroyed rule, previously asserted by the operation spec but stated nowhere here. June-11 final-pass fix build (v4): the floor-list 'root-as-inbox' mention aligned with the redefined root inbox — accidental staging swept into the intake check (W4 — the logged Tier-2 ride). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
