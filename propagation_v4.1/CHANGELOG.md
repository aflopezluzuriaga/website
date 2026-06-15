# Skills Kit Changelog

Track changes to generic skills so that Part B integrations on older repos can identify what's new.

**Entry types.** A `## vX.Y …` heading is a versioned kit change. A
`## [SKILL-FEEDBACK] — <skill> — <date>` heading (no version) is a behavioral
note logged in a content repo when a kit skill misfired or could be better; it
has no file change behind it, is swept and analyzed in SkillPropagation, and
never carries a version bump of its own. See `structure_conventions.md`.

---

## v4.1 — June 12, 2026 — MINOR: Part C self-containment + the workspace-folder scaffold (post-v4.0)

The formal stamp rolling up the post-v4.0 work that shipped the same day as the re-baseline (the build entries below). **MINOR (v4.0 → v4.1):** additive — two new Part C steps (2.5 declaration-backfill, 8.5 workspace scaffold) and the workspace standing-document convention; no renames, no reclassifications, no repo restructuring forced. The kit version is MAJOR.MINOR (no kit-level PATCH), so this is v4.1.

Rolls up:
- **Part C repair** — Step 2.5 declaration-backfill + the `pending_vX.Y` / `FOLDER_MAP` token sweep; Part C now implements the v4.0 manifest's declaration gate off its own text.
- **Workspace-folder scaffold** — Step 8.5; propagation brings a repo's `workspace/` up to its full archetype set, each folder created up front with its **standing document** (an `INDEX.md` where a skill owns it — `claude_conversations`, `agent_outputs` — else a `README.md`), so a folder never collapses to empty when a task finishes.

**Propagation target is now v4.1.** The 15-repo list, archetype grouping, and the declaration-backfill gate in the v4.0 entry's manifest are unchanged; the adopted delta now also includes the Part C repairs and the workspace scaffold. All 15 repos propagate straight to v4.1 (none has taken v4.0). Templates stamped v4.1.

Tier 1: PASS — see commit.

---

## post-v4 — workspace-scaffold build — June 12, 2026 — Part C Step 8.5: scaffold the universal `workspace/` folders on propagated repos; skill-owned standing documents (INDEX where a skill owns the folder, else README) as the persistence mechanism

Worklist (post-v4). Andrea's find while propagating: a repo updated by Part C got its `skills/` refreshed but never received the `workspace/` subfolders the skills expect — the v4 archetype-layer promotion added `to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/` to the **birth** scaffold (Part A) but Part C (propagation to an existing repo) had no step to create them, so every pre-v4 repo was missing them after propagation. Same defect class as the Step 2.5 gap: a convention (`structure_conventions.md`'s "created up front as labeled-empty homes") with no implementing step in Part C. Files changed: `PROJECT_SETUP.md`, `structure_conventions.md`, `research_setup_scaffold.md`, `coordination_setup_scaffold.md`, `operation_setup_scaffold.md`.

- **The standing-document mechanism, made concrete.** "Labeled-empty home" was underspecified — git and the GitHub Contents/Trees API track files, not bare directories, so an empty folder cannot persist without a file, and it must survive a task finishing (the contents clear; the folder must not collapse to empty). Decided: each `workspace/` subfolder carries a **standing document** created up front *with its header* — an `INDEX.md` where a skill owns the folder (`claude_conversations/` per `repo_conversations`; `agent_outputs/` takes `INDEX.md` + `LESSONS.md` per `agent_research_verification`), otherwise a `README.md` (`to_do/`, `brainstorms/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`, `visuals/`). *(An initial cut used a uniform README everywhere; corrected — before any repo propagated — after the skill-owned folders' mandated indexes were checked against a live repo's audit.)* `structure_conventions.md` carries the canonical per-folder standing-document table.
- **Part C Step 8.5 — Scaffold the workspace folders.** New step after the `skills/` updates, before the snapshot: ensure the repo's `workspace/` carries the full set its archetype requires (universal six for every repo incl. NONE: `claude_conversations/`, `brainstorms/`, `to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`; archetype repos also `agent_outputs/`, `visuals/`); create any missing folder with its standing document (INDEX header from the owning skill for `claude_conversations/` and `agent_outputs/`, else a titled README), in the propagation's atomic commit. Never overwrites an existing document, never touches folder contents.
- **Scaffolds aligned.** The three `*_setup_scaffold.md` birth trees note that each subfolder carries its standing doc (INDEX or README), so Part A (birth) and Part C (propagation) stay in step.

Tier 1: PASS — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## post-v4 — Part C repair build — June 12, 2026 — Step 2.5 declaration-backfill added; residual-token sweep (`pending_vX.Y`, `FOLDER_MAP`) — formal version stamp at the post-v4 cycle close

Worklist #1 (`post_v4_worklist.md`). Both defects were Andrea's find at the AITaxBID staging review, hours after the v4.0 stamp — the staged Part C could not run the v4.0 propagation off its own text. File changed: `PROJECT_SETUP.md`.

- **Step 2.5 — declaration-backfill (the missing step).** The v4 `1d` build emitted the `archetype:` declaration in `CLAUDE_template` but never wrote the implementing Part-C step; the backfill existed only in the v4.0 manifest's gating language. Now a real numbered step before the file diff: read the repo's `CLAUDE.md` for the block; if absent, determine the archetype from the actual structure (a Andrea-named archetype is the hypothesis to confirm, not the answer), determine variant + spec_version, present for approval, add in the propagation's atomic commit. Gates spec retention (one matching spec; NONE keeps none); Check-12 conformance stays post-propagation (Step 10).
- **Token sweep (a):** `pending_v2.X/` → version-generic `pending_vX.Y/` at all 4 sites, with a current `pending_v4.0/` example — the rule no longer fossilizes at whichever version wrote it.
- **Token sweep (b):** `AboutFolder.md` → `FOLDER_MAP.md` (or legacy `AboutFolder.md`) at 6 sites — Part C Steps 3/6 + the Step-4 example, and 3 Part-B signal-source lists (scope extended from the worklist's 2: same defect class, found in the reference walk). The dual form is deliberate: Parts B/C scan repos that predate the rename, so the legacy name is part of what the scan must find.
- **No-edit finding:** the review's `workspace/claude_conversations/` flag does not hold — that token is already the current convention (June-9 build); inspected, left as-is.
- **Quality-gate note:** both defect classes (promise-without-implementation; within-file vocabulary drift) passed Tier 1 by construction — they are semantic, not mechanical. Worklist #2 carries the kit-wide pass and the meta-rider to fold both classes into the close-out gate.

Tier 1: PASS — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## v4.0 — June 12, 2026 — re-baseline (v3.1 → v4.0, MAJOR): the archetype system + kit-wide renames shipped; per-skill markers floored to v2.0.0; templates stamped v4.0

The formal package stamp closing the v3.2 + v4 cycle. The cycle's *content* shipped across the build entries below (Stage 1 archetype promotion through the June-11 final-pass fix build); this entry is the bookkeeping close-out — the version stamp, the marker re-baseline, the `housekeeping` rename, and the propagation manifest. **MAJOR, justified twice over:** externally-visible renames that force reference cascades in content repos (`AboutFolder.md` → `FOLDER_MAP.md`, `audit_repo_skill.md` → `housekeeping_skill.md`, `paper_processing` → `materials_processing`, `branch_workflow_skill.md` split into `writing_branch` + `exploration_branch`) and reclassifications that force repos to adapt (the three-archetype system + the two convention layers, the single-select spec axis, the curation changes); **and** a deliberate re-baseline (all content repos reset to v4.0 at propagation, ending per-repo version drift). Either ground alone carries the major bump.

**The two-tracker stamp.** Per-skill version markers and the kit package version are separate namespaces. This re-baseline **floors every per-skill marker to v2.0.0** (the common per-skill baseline — most files were already there from the v4 builds; only `email_drafting_skill.md`, untouched all cycle, needed flooring, from v1.3) and **stamps the templates v4.0** (`CLAUDE_template.md`, `PROJECT_SETUP.md`, `STATUS_template.md` carry the package version — the two-tracker exception). This entry **resolves the "final stamp at the v4 re-baseline / at cycle close" deferral** the skill footers carry: the v2.0.0 floor is the final per-skill state, and the v4.0 stamp is the kit-level final stamp, applied here — no per-footer sweep, and the historical "Prior:" entries keep their original wording.

**The `housekeeping` rename (v3.2 batch-E #6, finding 3 — executed here).** `audit_repo_skill.md` → `housekeeping_skill.md`: frontmatter `name: audit-repo` → `housekeeping`; "let's do housekeeping" / "housekeeping" made the primary triggers, "audit the repo" kept as a secondary alias; the skill unified with the Part-C Step 10 housekeeping pass (one checklist, two wrappings — on-demand and at-propagation). All live references across the kit rewritten (`CLAUDE_template`, `PROJECT_SETUP`, `STATUS_template`, `project_tracker`, `archetype_conventions`, `andreas_palette`, `operation_archetype_spec`, `skill_authoring`, `skills_curation`, and the file's own body); CHANGELOG history keeps the `audit_repo` name as the record of past state. **Finding 1 (count-note):** Check 11 (cluster-completeness) is a kit-only architectural invariant and does not count toward the Check 9/10 workflow-invariant rule-of-three.

**CHANGELOG completeness backfill.** The completeness pass added the four build entries that had shipped to `LastSkillUpdate/` without one (operation product/output navigation; the universal `workspace/to_do/` tracker; the coordination close-out pair; the finish_session extension family) and the missing heading on the bundled-kit-skill-fixes entry — so the per-build trail is complete before the worklist (the cycle's other complete record) is distilled and deleted at close.

**starter_package — refresh deferred to a follow-up.** It lags at v1.0 (a mirror of `LastSkillUpdate/` at v3.0): no archetype layer, five v4-renamed/split files still present (`audit_repo`, `branch_workflow`, `paper_processing`×3), ~12 v4 skills short, old-cluster README. Refreshing it is its own task (re-mirror + archetype layer + rename cascades + README/CHANGELOG rewrite) and it is **not** on the propagation path — content repos take the kit from `LastSkillUpdate/` via the consolidation zip — so its staleness does not block v4.0. Tracked at cycle close.

**Propagation manifest (Part C — Andrea-driven, gated on declaration-backfill).** All 15 content repos carry a pre-v4 kit and need Part C propagation of the full v3.2 + v4 delta. **Each is gated on the declaration-backfill check:** confirm the repo's `CLAUDE.md` carries the 1d `archetype:` YAML block; if absent (the live repos were restructured into archetype *shapes* before the June-6 YAML format existed), backfill the minimal Part-C slice (set the declaration, keep the one matching spec); then run `housekeeping` / Check 12.

| Archetype | Repos |
|---|---|
| Research | LegalAIPeru, TaxComplexityFDI, TaxAdmJensen, EditingPapers, SimplifiedRegimen, AITaxBID |
| Coordination | EditorFMM, NotesTFD, CountryStrategies, RPG, DEIF, AdmWorkFMM |
| Operation | GrayListPan, PanPbl |
| None | task-tracker |

The delta a repo adopts: the three-archetype structure (the two universal convention files + `archetype_conventions.md` + the one single-select `*_archetype_spec.md` + the `CLAUDE.md` archetype declaration), the renames (`FOLDER_MAP.md`, `housekeeping_skill.md`, `materials_processing_skill.md`, the branch-skill split), the `MATERIALS_INDEX.md` rollout, and every v4 build below. The terminal `LastSkillUpdate/` (and `GeneralSkills/`) folder-casing rename runs **last** in propagation — after the v4 reference reconciliation lands and the branch-pending cutovers merge (carried to `STANDING_TODOS.md` at cycle close).

Tier 1: PASS — see commit.

---

## v4 — final-pass fix build — June 11, 2026 — the close-out quality gate's one atomic commit: every Session A + A′ finding fixed

The fix build of the final-pass kit review (reading Sessions A and A′ + the B-verify pass, June 10; Andrea's standing disposition: fix everything). One atomic Trees-API commit closing all verified findings before the v3.2+v4.0 re-baseline. Decisions made at build: **R3** — the canonical cluster set is `CLAUDE_template.md`'s **eight** Skills-section clusters; "Meta and templates" is an Appendix-only inventory grouping, never in curation; `skill_authoring`'s drifted enumeration trimmed to a pointer (point-don't-restate). **R2** — marker formats regularized **by type, not collapsed**: skills carry the versioned `*Last updated*` form, convention files the `*Kit file —*` footer (verified deliberate in all three convention files); `STATUS_template.md` gains its missing marker and `multisession_task_skill.md`'s convention-style footer converts to the skill form. **A′-8** — a scoped chrome/utility exemption (Black/White/AltRowShade) stated in the palette's mirror section rather than adding utilities to the palette table, so Check 8 verifies the expressive palette exactly without flagging structural fills; with that, the two preambles need **no content change** and the worklist's tentative 17-file set lands at 16 + CHANGELOG. **A′-9 corrected at build** — the docx skill's embedded `COLORS` block was found **current, not stale** as logged; collapsed to a pointer anyway on the drift-safety argument (an untracked copy outside the sweep's mirror list), Andrea's call. **R1** (the heaviest item) — `CLAUDE_template`'s legacy naming block fully rewritten: pointers to `naming_conventions.md` and `writing_drafting`, the archive/version-log and inputs-from-colleagues conventions kept in current vocabulary, the example tree rebuilt; the footer's 1f deferral closed. Files changed (all keep the v2.0.0 floor; final v4 stamp at the re-baseline): `CLAUDE_template.md` (R1, M1, A′-2/3/4/5/7, A′-1, R3), `PROJECT_SETUP.md` (M4, A′-13, A′-1, R3), `skill_authoring_skill.md` (M2, R3), `fmm_docx_formatting_skill.md` (M3, A′-9), `fmm_paper_latex_skill.md` (A′-12), `exploration_branch_skill.md` (M5), `audit_repo_skill.md` (A′-6 ×2, M6), `andreas_palette.md` (A′-1 ×2, A′-8, stray v1.0 marker), `STATUS_template.md` (R2), `multisession_task_skill.md` (R2), `structure_conventions.md` (W3, W5, A′-11), `operation_archetype_spec.md` (W2), `coordination_archetype_spec.md` (W4), and `materials_processing_skill.md` / `document_processing_skill.md` / `agent_research_verification_skill.md` (W1 ×6 — the archetype-blind rule broadened to the whole archetype layer incl. `archetype_conventions.md`).

Tier 1: PASS — see commit.

---

## v4 — retrofit-folder-bootstrap build — June 10, 2026 — Parts B/C create the universal `workspace/` set unconditionally; the per-folder ask and Deferred-folders mechanism retired

The close of the worklist's Part-B/C bootstrap-ask item (re-logged June 10 after falling through the archetype-vs-NONE hand-off). The tension: the retrofit flow asked per workspace subfolder ("create now, or defer?") with declines recorded in a **Deferred folders** CLAUDE.md subsection, while the June-9 workspace-folders convention made those subfolders universal, created up front, and load-bearing for always-active skills (`staging/` carries the intake funnel, `to_do/` the done-to-do retirement and corpus-feedback deferrals, `multisession_active_tasks/` the carryover home, `branch_logs/` the exploration trails). A "deferred" universal folder would have the audit flag a gap `PROJECT_SETUP` itself blessed — the bin-1 shape, the kit's own machinery making the instrument lie. Resolved (Andrea's call, June 10 — the item was deliberately deferred to be decided once everything was built): the ask is retired. Parts B and C create any missing universal subfolder unconditionally in their integration/propagation commit; an existing same-job arrangement (a root `TODO.md`, an old conversations folder name) gets a reconcile proposal — prompt-don't-perform, the home is created either way; a legacy Deferred-folders subsection is resolved at the next Part C (folders created, subsection removed in the same commit, recorded in the commit message). The rewritten text **points at the universal set defined in `structure_conventions.md` instead of enumerating it** — the retired ask had fossilized a two-folder list (`brainstorms/`, `claude_conversations/`) precisely because it carried its own copy of a list that moved on. The curated-home boundary is stated (`agent_outputs/`, `visuals/` follow their owning skill's curation, not this bootstrap); the first-use fallback is kept as the safety net for repos not yet on the current kit. Files changed (both keep the v2.0.0 floor; final v4 stamp at cycle close): `PROJECT_SETUP.md` (the Part-B always-active confirmations bullet + Step 2b); `project_tracker_skill.md` (the Folder bootstrap protocol, including the stale Part-A `TRACKED_LOCATIONS` auto-create framing re-pointed at the archetype/NONE scaffold).

Tier 1: PASS — see commit.

---

## v4 — translation-review build — June 10, 2026 — the Spanish naturalness review + corrections-log companion pair, in the Voice and style cluster

The build of the translation-review root (design closed June 10): Claude's Spanish translations are correct but unnatural — they read as translated — and the reviewer of record is Andrea's ear. The skill externalizes that tacit instrument pair by pair so first-pass Spanish improves and she corrects less over time. Two design revisions from the recorded entry, made at build with Andrea: the unit shape moved from folder-skill to a **companion-file pair** (the format-cluster pattern — two loose files in `skills/`, dissolving the open placement fork and the one-folder-invariant rewording entirely), and the pairs' lifecycle moved from diverted-not-merged to **merged-into-canonical at consolidation** (a correction pair is portable learning, not repo-local evidence — every repo inherits every repo's corrections at the next propagation). Files changed (all keep the v2.0.0 floor; final v4 stamp at cycle close): NEW `translation_review_skill.md`; NEW `translation_corrections_log.md`; `andrea_writing_style_skill.md`; `andrea_fmm_institutional_style_skill.md`; `skills_curation_skill.md`; `CLAUDE_template.md`; `PROJECT_SETUP.md`.

- **The skill (`translation_review_skill.md`, NEW).** Covers both moments: the first pass (apply the distilled patterns while translating; Claude may self-flag sentences that read translated) and the review round. The review rides the existing `writing_branch_skill.md` flow unmodified — translate on a branch, Andrea corrects in place, **the diff is the pair-capture** (her review effort stays what it would be anyway). One seam stated explicitly: her direct corrections are authoritative on naturalness — never "proofread" back; writing-branch's heavy-proofread flag narrows to genuine within-document conflicts. Close-out four-step: walk the diff → Claude drafts a one-line why per pair (Andrea confirms, fixing only the wrong ones) → append to the log → maturity check (a recurring kind → a *proposed* patterns edit, prompt-don't-perform). No pre-built taxonomy — categories emerge from the log; the patterns section is seeded with Andrea's two named kinds (em-dash recasting, carried-over connectors). The §14 boundary stated: naturalness lives at the sentence's joints; the voice profiles' structure-and-conciseness discipline holds in the Spanish — never a license to drift circular. Spanish only; Portuguese excluded *with the reason* (no reviewer instrument — Andrea's Portuguese ear cannot adjudicate naturalness; a Portuguese loop is a different design with a different reviewer).
- **The companion log (`translation_corrections_log.md`, NEW; Appendix type Record).** Append-only raw trail (date · document/branch-ref · unnatural → natural → why), never edited or pruned locally. Lifecycle through the cycle, stated in both files: local appends sweep back at discovery like any changed kit file; consolidation merges pairs into the canonical log and folds matured patterns into the skill; propagation reconciles per Part C's per-file local-modification handling, so pairs appended since the last sweep are never silently dropped. Kept as a separate file (not a section of the skill) so the growing trail never rides along when the skill loads at translation time.
- **The §14 hand-off (`andrea_writing_style_skill.md` §14, `andrea_fmm_institutional_style_skill.md` §14).** One pointer line each: Spanish translations run through the review skill, which works *below* the section's discipline, never against it.
- **Wiring (Voice and style cluster, ride-along activation).** No independent curation signal — wherever the voice skills activate, the pair ships: `skills_curation_skill.md` cluster list; `CLAUDE_template.md` Skills-table row + one rides-the-cluster line in the Writing Style Profiles section (the pair is not a fourth profile); `PROJECT_SETUP.md` Voice Files-to-copy block, a Part-C per-skill question block (Spanish deliverables; existing corrections material to fold in at adoption), and two Appendix rows.
- **Machinery deliberately untouched (extract-when-proven).** The diff prompt already bundles any content difference; consolidation is conversational and reads the files it handles (the lifecycle rule lives in them); Part C already runs per-file reconciliation. If a real propagation fumbles the log, that is the evidence for a machinery touch — not built now.

Tier 1: PASS — see commit.

---

## v4 — staging-intake-funnel build — June 10, 2026 — the universal intake funnel, the type-routed lightning check, and the close-side non-empty-staging prompt

The build of the resurfacing root (design closed June 10): the kit's anti-duplication gap was that every intake protocol decided *where a thing goes* and none asked *do we already have it* (the BankStrategy re-upload pain), and nothing checked the indexes at produce/ask moments. Resolved as one intake funnel plus an always-run check tier — convention + touches to existing files, no new skill (extract-when-proven confirmed). Files changed (all keep the v2.0.0 floor; final v4 stamp at cycle close): `structure_conventions.md`; `CLAUDE_template.md`; `project_tracker_skill.md`; `cross_repo_import_skill.md`; `PROJECT_SETUP.md`; `research_archetype_spec.md`.

- **The intake funnel (`structure_conventions.md`, generalizing the June-9 import section).** Everything new to the repo enters `workspace/staging/` — a dropped file, an import, overturn branch content — under a **zero-decision drop rule** (a rule with an embedded placement decision is the rule not followed). The **full check at placement**, propose-first never interrogate-first: identify by skim → the **adjacency/duplicate check** against the `FOLDER_MAP`s + typed indexes (the genuinely new step) → placement proposal → approve → place + register → empty staging; bulk drops batch into one index pass + one proposal. The **rushed path** ("stage it and use it now"): use immediately from staging, lightning check first, placement deferred via a `STATUS.md` Pending placement fixes entry. The hold→place→empty lifecycle and the sub-batch-if-proven note are kept; import and the exploration-overturn route are named as callers owning their step-by-steps elsewhere.
- **The lightning check (tier defined in `structure_conventions.md`; trigger + type-routing in `CLAUDE_template.md` Working Conventions).** Always-run, even rushed: identity skim + typed-index grep by topic/title. Hit → work from the *processed* form, never re-process; near-hit → a supersession (use the new informed by the existing summary; superseded-but-retained governs placement); miss → proceed. No placement, no `FOLDER_MAP` write at this tier. Four triggers — use-from-staging · about-to-produce · about-to-ask · subsumed in the full check at placement — **type-routed**: source-material work → `MATERIALS_INDEX` (then `PAPERS_INDEX`/`DEEPDIVES_INDEX`), point-don't-rebuild; visuals/assets → `ASSETS_INDEX`, always surface to Andrea (adapt-vs-rebuild is her call); written deliverables → `OUTPUTS_INDEX` via `index → outline → draft`. The bullet reads whatever maps/indexes the repo carries (archetype-blind; degrades to the `FOLDER_MAP`s in a NONE repo — never demands a file the repo lacks), and sits as sibling to the folder-creation placement check: that bullet is structure (where does a folder go), this one is content (does the repo already have it, and where does it enter). The trigger lives in `CLAUDE_template` because it is the one file guaranteed in context at arbitrary work moments — a rule written only in the conventions file fires only during structure work, exactly when the produce-side moments don't occur.
- **The root inbox redefined (`structure_conventions.md`; research spec §9 reworded to match).** Loose content at root = **accidental staging**, swept into the same intake check — resolving the two-drop-zones collision between the old root-inbox protocol and the funnel. The `_ex3`-like signal reading and root-normally-empty rule are kept.
- **Close-side surfaces (`project_tracker_skill.md`).** New clause **(n)**, the **non-empty-staging prompt** (every repo): staging's documented empty resting state makes non-empty-at-close a legible signal — surface contents, offer placement now or confirm/write the Pending entry; the entry nags by record, the prompt nags by state (the index-audit belt-and-suspenders shape). Lives in the close-out, not the freshness audit — the audit is a session-start instrument; this prompt's family (cadence read, done-to-do retirement, index-entry refresh) is the close-out's. **Pending placement fixes generalized to two writers** (the folder-creation check's defer + the rushed path's staged file) and to tracking folders *or staged files*. `finish_session_skill.md` needs no edit — Step 3 delegation inherits the prompt, as with every prior close-side member.
- **`cross_repo_import_skill.md` reconciled to caller status.** Its conventions pointer re-aimed at the renamed section (the old "Importing material from another repo" title no longer exists), Step 5's hand-off named as the funnel's full check, the placing-inside-this-repo boundary re-pointed. Workflow unchanged — point-don't-restate held.
- **Walk-caught riders.** `PROJECT_SETUP.md`'s Appendix `structure_conventions.md` row and `CLAUDE_template.md`'s Skills-table row both described "the import protocol" and "the root inbox" — updated to the new framing (the Skills-table row's trigger column also extended to "any folder or file"). The kit-propagation `pending_v2.X/` staging in `PROJECT_SETUP` Part C is a different concept, untouched. Two Tier-2 rides logged, not edited: `coordination_archetype_spec.md`'s "root-as-inbox" floor-list mention (true at the name level; ride its next touch) and `operation_archetype_spec.md` §5's "per the universal import protocol" (still true — import remains the cross-repo caller — but predates the funnel framing; ride its next touch).

Tier 1: PASS — see commit.

---

## v4 — content-staleness build — June 10, 2026 — index-audit mode (audit_repo's third mode), the close-side index-entry refresh, and the STATUS.md write-back

The content sense of the index-freshness cadence, the deferred check the shipped time-proxy framework pointed at: the cadence read told Andrea to "run audit_repo's index audit," but no content-level index audit existed (Check 5 is structural by design). This build creates it, plus the write-side discipline that keeps it cheap. Files changed (all keep the v2.0.0 floor; final v4 stamp at cycle close): `audit_repo_skill.md`; `project_tracker_skill.md`; `STATUS_template.md`; `archetype_conventions.md`; `CLAUDE_template.md`.

- **Index-audit mode (`audit_repo`'s third mode, its own session type).** Not a thirteenth check — per-entry claim verification is heavy, so it stays out of the routine pass (the cost gradient that erodes the audit habit) and runs on the `INDEX_AUDIT_INTERVAL` cadence. Three passes, then one commit: the **`[unreviewed]` sweep** → the **evidence pass** (live claims whose *targets* show commit activity since the "Index audit last run" date; full on a repo's first run, doubling as the population/baseline pass) → the **interview pass** (claims only Andrea can falsify — awaiting-outcomes, feasibility premises — always full; the comprehensive cousin of coordination's close-side real-world-signal prompt). Severity inverts harder than Check 12: drift fix only on unambiguous repo evidence; the whole interview pass is requires-decision by construction. Prompt-don't-perform per finding.
- **The staleness frame: live claims, never records.** Staleness applies only to fields that say "this is true now" (status/outcome labels, reliability tags, summaries, `FOLDER_MAP` descriptions, live register rows); fields that say "this was true then" (logs, frozen `Standing:` slots, superseded-but-retained rows, old matrix versions) cannot go stale — the verification-side face of nothing-destroyed-on-a-state-change. Frame owned by the mode (the Check 12 precedent); discovery archetype-blind via the `FOLDER_MAP` tree and the declared spec. `MATRIX.md` excluded until the parked matrix-characterization question settles.
- **Close-side index-entry refresh (`project_tracker` clause (m); archetype repos, NONE no-op).** Andrea's design contribution, generalizing write-on-produce to write-on-touch: at session close, typed-index rows for files the session touched get their live-claim fields checked and updated — reviewed → clean, no time → a trailing `[unreviewed]` marker swept by the next index audit. The write side of the universal feeding process; the audit becomes the periodic backstop (in steady state entries go stale only when a close was skipped — exactly what the evidence pass catches). Sibling to the floor's `FOLDER_MAP` status refresh. Per-row/per-index date columns considered and rejected (schema cost across the specs for precision the close-side discipline makes unnecessary); the repo-wide date slot stays, and "last modified" = commits to `main`.
- **The boundary redrawn: infrastructure claims vs. deliverable quality.** The audit's old structure-vs-content line deferred claim currency to "the separate index-system revision," which the archetype layers have since settled — so the scope language is rewritten, not caveated (frontmatter, the what-this-is paragraph, Check 5's and Check 12's notes): the audit may verify that the infrastructure's statements about the work are current; it never judges whether the work is good. Check 12's currency-guard flag re-aimed at *local* indexes born without a feeding process, now that typed root indexes carry the universal one.
- **The write-back (the root's named hard dependency).** Index-audit mode's closing atomic commit stamps "Index audit last run" in `STATUS.md` — fixes and stamp travel together — retiring `project_tracker`'s confirm-stamp interim and its deferral note; the cadence reminder now stops only when the audit genuinely ran. `STATUS_template`'s comment block rewritten to match. Step 1 of regular audit/repair mode gains the overdue-index-audit cross-reminder (the second nag layer, riding the audit Andrea reliably remembers to run). The L2 typed-index behavior section gains the kept-current-at-close / verified-on-a-cadence bullet, stating the feeding process where the behavior lives. `finish_session` needs no edit (Step 3 delegation inherits the refresh); the operation spec needs none (§6's discipline statement stays true, now universally realized). `CLAUDE_template` *did* need one the reference walk caught late: its Skills-table row claimed "Two-mode (audit / repair)," which this build falsifies — updated to the three modes + the index-audit trigger, with a rider fix of the row's stale `AboutFolder.md` token (pre-existing 1e-rename residue).

Tier 1: PASS — see commit.

---

## v4 — archetype_conventions review fixes — June 10, 2026 — design review of the June-9 L2 build: two unwritten L1 homes written, typed-index behavior reclassified to L2, cross-spec references retired

A full design review of the June-9 `archetype_conventions` build (fidelity against the build's 31-item placement table, placement-logic re-derivation of every item, the four build disciplines, and a whole-kit reference walk) surfaced a small set of approved fixes, shipped here in one atomic commit. Files changed (all keep the v2.0.0 floor; final v4 stamp at cycle close): `structure_conventions.md`; `archetype_conventions.md`; `research_archetype_spec.md`; `coordination_archetype_spec.md`; `operation_archetype_spec.md`; `skill_authoring_skill.md`.

- **The unwritten L1 principle (the review's clearest finding).** The placement table assigned *nothing-destroyed-on-a-state-change* to the floor, but the build never wrote it — operation §2 cited "the universal rule" while the rule was stated nowhere, and the floor's own exploration-overturn route used supersede-but-retain without a home for the principle. `structure_conventions.md` now carries the section, with each layer's realization named; **coordination's realization** — instance retention, asserted by the operation spec but stated nowhere in coordination's — is added to its §5 `INSTANCES_INDEX` bullet, completing the realization set.
- **Typed-index behavior reclassified L1 → L2 (a deliberate placement-table revision).** Pointer-only / self-registering / no-`MASTER_INDEX` describe **typed root indexes**, which are archetype objects — a NONE repo carries none, so the behavior had no floor object to attach to (and in fact had landed nowhere general: it survived stated separately in all three specs, the written-3× scatter the build existed to end). New `archetype_conventions.md` **Typed-index behavior** section (created-up-front / empty-but-headed, pointer-only with `POSITIONS_REGISTER` as the documented content-bearing exception, self-registering at creation, no central catch-all); the three specs slimmed to their forms plus pointers (research keeps line-sectioned + the six-index set; research §7's standalone "No `MASTER_INDEX`" paragraph dropped — L2 owns it). The anti-sponge mechanism stays floor, where it is a `FOLDER_MAP` property.
- **Cross-spec dangling references retired (single-select means a deployed repo carries one spec).** Operation's header "the one-off home and the folder-skill nesting detail it **inherits from coordination (§2a)**" was unreadable in a deployed operation repo; replaced by a self-contained **Folder-skills** note in operation §3 (operation-wide folder-skill at root; reform/product-scoped nests with the work it serves). Coordination §3's "borrowed from the research archetype" reframed to name the traveling shared files directly. `skill_authoring_skill.md`'s two mirrored "(coordination §2a, inherited by operation)" references updated to name each spec's own section.
- **Research's missing realization + slim.** L2's spine section claims each spec states the "one repo or two" test in its own terms; research stated no form — §6 now carries it (lines sharing no literature/background/empirics are probably two repos; the `general/` spine earns the agenda). §1's north-star slimmed to research's *form* of the L2 by-subject acceptance test, removing the near-verbatim duplication.
- **NONE-wording guard + weak-anchor fixes (floor + L2).** Floor heading "Reference by index/**subject**" → "**index entry or stable key**" (a NONE repo is not retrieved by subject); L2's boundary sentence tightened to "no **typed** repeated units / typed root indexes" (a NONE tracker can hold non-archetype multiplicity, which the floor's recursion section governs); a NONE-is-a-kind framing sentence added to the floor's three-layer model; an explicit **no-scan locatability** statement now opens the floor's `FOLDER_MAP` section — the standalone principle L2's keying section cites, previously stated only as a clause about one file type.

Tier 1: PASS — **reference resolution** (no stale "inherits from coordination (§2a)" or "borrowed from the research archetype" framing remains anywhere in the kit; every file the edits point at — `archetype_conventions.md`, `structure_conventions.md`, the specs — exists; the dropped research `MASTER_INDEX` paragraph leaves no dangling pointer, kit-wide grep). **YAML frontmatter parse** (all six edited files parse). **Cluster consistency** (no cluster surfaces touched; no skills moved). **Version-stamp/CHANGELOG consistency** (all six files carry a June-10 v2.0.0-floor review-fixes footer note; this entry prepended). **Cluster-completeness invariant** holds (convention files are read-by, not workflow-invoked; no new cross-cluster hard dependency).

---

## v4 — archetype_conventions — June 9, 2026 — new `archetype_conventions.md`: the archetype-common layer (L2) made explicit, gathering the rules scattered across the three specs into one home

Resolves the archetype-vs-NONE general-structure review. The universal-vs-archetype line had been drawn incrementally all cycle (the universal `to_do/`, `multisession_active_tasks/`, the workspace folder-creation convention, the universal-vs-curated subfolder split); this build makes it explicit as a **three-layer model with one stated placement rule** — the "stop drawing the line incrementally" outcome. Files changed (the new file carries the v2.0.0 floor; the 13 edited files keep theirs; final v4 stamp at cycle close): NEW `archetype_conventions.md`; `structure_conventions.md`; `research_archetype_spec.md`, `coordination_archetype_spec.md`, `operation_archetype_spec.md`; `research_setup_scaffold.md`, `coordination_setup_scaffold.md`, `operation_setup_scaffold.md`; `new_repo_setup.md`; `audit_repo_skill.md`; `CLAUDE_template.md`; `PROJECT_SETUP.md`; `skills_curation_skill.md`.

- **The model — three layers, one test applied twice.** A repo's structure is the **universal floor** (`structure_conventions.md`, every repo incl. NONE), the **archetype-common layer** (`archetype_conventions.md`, every archetype repo, not NONE), and the **type-specific layer** (the one `<type>_archetype_spec.md`). Placement: (1) does a rule survive without an archetype? → floor, else not floor; (2) does it have a type-specific form? → that part peels to the spec, the general principle stays in `archetype_conventions.md`. The axis is **general-vs-specific, not count** — a rule shared by exactly two archetypes is two realizations of one principle, not duplication.
- **L2 gathered (not invented).** The archetype-common content already existed, scattered as duplication and cross-references across the three specs. `archetype_conventions.md` gathers it: **born-minimal promote-on-evidence** (three faces — unit-count N=1→N>1, classification one-off→recognized-unit, resource lift-on-second-use; unit *names* peel to L3), **origin-based typing**, the **shared-spine / "one repo or two" test**, **by-subject/topic keying**, and the **archetype-fixed root skeleton**. It opens with its scope and "a NONE repo does not carry this file."
- **Two cleanup directions in the specs.** (a) **Lifted up:** the N=1→N>1 shape (written 3×) re-pointed and operation's cross-type table removed; origin-typing, promote-on-evidence, and the shared-spine test re-pointed via each spec's header note; operation §6's reading-order cross-reference re-aimed from "research §7" to the floor. (b) **Pushed down:** the L1 floor the specs *restated* (research §2 created-up-front, §9 `FOLDER_MAP`/root-inbox, §13 root files/workspace) re-pointed to `structure_conventions.md` instead of duplicated.
- **L1 additions to the floor.** Per the placement table, two items that were stated only in research are general-floor rules: the **`_ex` gap-slot rule** (two per level, a third flags a missing folder — promoted from research §11, the type-specific "what counts as a missing folder" left in each spec) and the **reading-order (shallow-to-deep)** discipline (the L1 home operation §6 now points at). `structure_conventions.md`'s opening upgraded from a two-layer to a three-layer framing with the placement test; the **skeleton-fixed-by-archetype** governance clause moved out to L2 (the one rule a NONE repo lacks) while the two-extra-cap / flexibility-inside clauses were reworded skeleton-agnostic so the NONE carve-outs drop.
- **Wiring.** The three scaffolds carry `archetype_conventions.md` at birth; `new_repo_setup.md` distinguishes archetype repos (floor + `archetype_conventions` + spec) from NONE (floor only + bespoke skeleton); `audit_repo_skill.md` Check 12 now reads the shared layer **plus** the carried spec; `CLAUDE_template.md` gains the cluster row + a three-layer Repository-Structure section; `PROJECT_SETUP.md` gains the Files-to-copy line, the Appendix row, and the Part-A scaffold pointer.
- **Reference-walk catch (`skills_curation_skill.md`).** The §2 edit-surface inventory had not listed this skill, but the mechanical reference walk (run before scope, per `structural_redesign_skill` v1.2) found it: its "Repo structure and archetype" cluster knew only two curation behaviours (unconditional floor conventions, single-select spec). `archetype_conventions.md` is a **third**: shipped to every archetype repo and only those (unconditional within archetype repos — not single-select — absent from NONE). Folded in. Same "inventory under-counts, the reference walk catches it" pattern logged on the carryover-rename and workspace-folders builds.

Tier 1: PASS — **reference resolution** (every reference the build introduced resolves: all 13 edited files point at `archetype_conventions.md`, which is present; the only other additions are the legitimate `<type>_archetype_spec.md` / `<archetype>_archetype_spec.md` patterns; a staged-vs-original diff confirmed no *new* broken reference — the pre-existing historical/example/forward-seed refs in changelog and footer prose were untouched). **YAML frontmatter parse** (the new file's frontmatter and every edited file's frontmatter parse). **Cluster consistency** (`archetype_conventions.md` sits after `structure_conventions.md` in all three parallel surfaces — the `CLAUDE_template` cluster table, the `PROJECT_SETUP` Files-to-copy group, and the Appendix — same cluster, same position; no skills moved). **Version-stamp/CHANGELOG consistency** (all 13 edited files carry a June-9 v2.0.0-floor archetype_conventions footer note; the new file carries the floor; this entry prepended). **Cluster-completeness invariant** holds — `archetype_conventions.md` is a read-by convention file, not a workflow-invoked skill, so no new cross-cluster hard dependency.

---

## v4 — operation product/output navigation — June 9, 2026 — new root-level `POSITIONS_REGISTER.md`; the `OUTPUTS_INDEX → register → output` three-layer read

The operation archetype's deferred product/output navigation layer (operation spec §6 named it). The open fork — position-coherence as a *field in the product index* vs a *separate write-time check reading the matrix* — resolved to a third shape (Andrea's instinct): keep the index lean and point at a substantial standalone document. Files changed (both carry the v2.0.0 floor; final v4 stamp at cycle close): `operation_archetype_spec.md`, `operation_setup_scaffold.md`.

- **`POSITIONS_REGISTER.md` (NEW, root-level, operation-wide).** A *register* — a maintained authoritative record, not an index (it holds content, not just pointers) and not a log (revised, not append-only). Distilled rows: **topic · position/decision · recommendation · shaping note · pointer to the output**.
- **Three-layer read, shallow-to-deep:** lean topic-keyed `OUTPUTS_INDEX` (pointer-only) → `POSITIONS_REGISTER` → the full output.
- **Matrix-independence (the load-bearing decision).** The register owns its positions directly and never depends on `MATRIX.md`, so it stands up identically in single-reform (no matrix), multi-reform, or matrix-undecided repos. The matrix records the government's feasibility/intent; the register records our analysis and the decisions it drove — different facts, no double-write.
- **The shaping note** is the value core: the resolved trade-off ("chose A over B," "B is stronger but politically infeasible, so A"), so a closed question isn't reopened a year on.
- **Currency guard = the register's own feeding process** (write-on-produce; revise under superseded-but-retained); `audit_repo`'s operation-only currency-guard flag still surfaces any register lacking one. The matrix-as-versioned-coordinator characterization question was left parked. `audit_repo` Check 12 inherits the file structurally (discovers via `FOLDER_MAP`s); `CLAUDE_template` points at the spec — neither needed an edit.

Tier 1: PASS — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## v4 — cross-repo-import — June 9, 2026 — new `cross_repo_import_skill.md`: a prompt-don't-perform workflow for importing already-processed material from another repo

New skill operationalizing the universal import protocol. The workspace-folders build (June 9) had already written the import *convention* into `structure_conventions.md` ("Importing material from another repo") — the staging home and the hold→place→empty lifecycle — but there was no skill carrying the step-by-step, and by-hand imports had been done several times messily (the recurring "ghost": a derived form gets pulled while its source is left behind in the other repo, e.g. the BankStrategy import). Frequency (3–4 manual imports) plus that tacit-knowledge mess clears `skill_authoring`'s "write a skill" bar. Files changed (the new skill carries the v2.0.0 floor; the four wiring/pointer files keep theirs; final v4 stamp at cycle close): NEW `cross_repo_import_skill.md`; `CLAUDE_template.md` (cluster row); `PROJECT_SETUP.md` (Files-to-copy + Appendix); `structure_conventions.md` (pointer from the import section); `github_api_workflow_skill.md` (Cross-repo reads note).

- **Prompt-don't-perform throughout.** The skill reminds Andrea to scope the access token to both repos (Step 2) and to re-scope it back when done (Step 7); the token is **always hers** — the skill never edits, stores, or assumes it, and never reads the source repo until she confirms the scope is in place.
- **Read-only on the source, one-directional.** Reads pull the named material into `workspace/staging/` via `github_api_workflow_skill.md`'s read helpers pointed at the source `owner/name`; nothing is ever written to or deleted from the other repo. A new **Cross-repo reads** note in `github_api_workflow` records that the read helpers take the repo from the `REPO` global (point it at the source; writes always target the home repo) — confirming the existing recipe already works cross-repo, no new recipe.
- **Selection in staging, before placement (the ghost-problem fix).** The keep / drop / what-must-come-too call is made in `workspace/staging/` (Step 4), not file-by-file during placement: identify each item as a source or a derived form and bring the counterpart when both carry information (the kit's keep-both-forms rule), so a derived artifact is never imported while its source is orphaned.
- **Placement is a soft hand-off, not a hard invoke.** Kept items land via the repo's normal origin-typed intake / folder-creation placement check, re-filed into *this* repo's shape (not the source's). Written as a soft reference, so the always-active skill carries no hard cross-cluster dependency (cluster-completeness invariant holds).
- **Point-don't-restate.** The staging home and lifecycle stay defined in `structure_conventions.md`; the skill owns the workflow and points back (a pointer sentence was added to the convention's import section, parallel to how it points at `exploration_branch_skill.md`). Kept lean because the skill propagates to content repos.
- **Wiring: always-active but trigger-fired.** Universal (any repo, NONE included — it leans only on `github_api_workflow`, itself universal), so it ships in the **always-active Repo-and-session-infrastructure cluster**, placed immediately after `github_api_workflow_skill.md` in the `CLAUDE_template` cluster table, the Files-to-copy always-active group, and the Appendix. It fires only on an import trigger — the same always-active-but-triggered pattern as `github_api_workflow` — so there is **no optional-cluster (Phase 3) menu entry** (that menu is only for the four optional clusters).

Tier 1: PASS — reference resolution (every file the new skill and the wiring point at exists in `LastSkillUpdate/`: `structure_conventions.md`, `github_api_workflow_skill.md`, `materials_processing_skill.md`, `multisession_task_skill.md`; the new `cross_repo_import_skill.md` is referenced from `CLAUDE_template.md`, `PROJECT_SETUP.md` (×2), `structure_conventions.md`, and `github_api_workflow_skill.md`, and the file is present; no broken references introduced), YAML frontmatter parse (the new skill's frontmatter and every edited file's frontmatter parse), cluster consistency (the new row sits after `github_api_workflow_skill.md` in all three parallel lists — `CLAUDE_template` cluster table, Files-to-copy always-active group, Appendix — same cluster, same position; no skills moved), version-stamp/CHANGELOG consistency (each edited file's trailing marker carries a June-9 v2.0.0-floor note; the new skill carries the floor; this entry prepended). Tier 2 (non-blocking): `exploration_branch_skill.md` carries two stacked trailing markers (pre-existing drift, against the single-marker rule) — out of this build's scope, noted for a future touch of that file.

---

## v4 — skill_authoring placement reconcile — June 9, 2026 — `skill_authoring_skill.md` taught the post-archetype folder-skill placement rule + the corpus/inputs-that-make-a-skill patterns

Reconciled `skill_authoring_skill.md` with the placement system introduced after it was written. The skill knew only one placement axis — a binary "generic candidate → `skills/`; project-specific → outside `skills/` (a project-named subfolder)" — and was blind to the folder-skill placement rule, the skill-scoped `corpus/`, and where the inputs that make a skill go. Single-file change; commit also touches `CHANGELOG.md`. File changed (carries the v2.0.0 floor; final v4 stamp at cycle close): `skill_authoring_skill.md`.

- **Two axes, separated.** Creation-time placement is now two decisions, both the author's: the **propagation axis** (project-specific vs. generic-candidate → whether the file sits in `skills/` for the discovery sweep to see) and **physical placement** (the folder-skill rule → loose-in-`skills/` vs. folder-local-next-to-the-work vs. a task-unit folder). Step 2 was rewritten to run both; a Part 1 "Physical placement vs. cluster placement" anchor was added to frame them against cluster placement (which stays a consolidation-side decision, unchanged).
- **Point, don't restate.** The binding rules live in `structure_conventions.md` ("Skills layout") and the archetype specs (coordination §2a, inherited by operation; the research spec's skills-and-machinery note); `skill_authoring` owns the *trigger* ("decide placement now, via the folder-skill rule") and points at those files for the *substance* — the same deferral pattern it already uses for cluster placement, kept lean because this skill propagates to content repos.
- **The two axes line up, so they don't fight.** A folder-needing skill is tied to a task's `corpus/`/`instances/`, so it is project-specific and goes folder-local; a generic candidate is a single-file pattern and goes loose in `skills/`. The `skills/` invariant (at most the one `GeneralSkills/` folder) means a multi-file skill folder never sits in `skills/` anyway — stated explicitly so the discovery-sweep-only-sees-`skills/` constraint and the folder-local rule don't appear to collide.
- **Corpus + inputs-that-make-a-skill (Step 7).** When a skill warrants a `corpus/`, it is created skill-scoped alongside the skill: a **frequency** skill's corpus accumulates from runs (skill→corpus, may start empty); a **tacit-knowledge** skill's corpus holds the good/bad examples it was distilled from, placed at creation with a provenance pointer (corpus→skill).
- **Part 2 reach (the open sub-question, resolved).** The worklist item asked whether the gap was placement-only or more. Resolved to placement **plus a light Part-2 touch**: the §8 frequency-OR-tacit-knowledge triage was folded in (the prior "same task three times" signal captured only the frequency half), with `corpus/` named as the task-unit-vs-one-off marker — because the corpus decision is what makes a skill folder-needing. The `[SKILL-FEEDBACK]` channel was left **out of scope** (malfunction-logging, a separate concern with its own home).
- **Critical-eyes rewrite.** Fixed the Part 6 worked example, which had Claude doing *cluster*-shopping at creation (contradicting the skill's own rule), to do the two creation-time placement calls instead; corrected the Part 7 "the only structural call is project-specific vs. generic-candidate" mistake to name both axes; added a Part 7 mistake against hoisting a folder-needing skill into `skills/`. The `BrochureFMM/` project-named-subfolder example (wrong placement model) is gone, replaced by folder-local examples (`funding/skills/tc-drafting/`, `{task}_skill/`, `tasks/{task}/`).
- **Flagged, not folded (scope discipline).** Part 1's cluster *list* looks stale post-v4 (no `multisession_task`, the convention/spec files, `visuals_workflow`); that is a cluster-list audit, a separate concern from placement, left for its own pass.

Tier 1: PASS — reference resolution (every file `skill_authoring` now points at exists in `LastSkillUpdate/`: `structure_conventions.md`, `coordination_archetype_spec.md`, `research_archetype_spec.md`, `operation_archetype_spec.md`; the retired `BrochureFMM/brochure_fmm_skill.md` example carried no cross-reference; no broken references introduced), YAML frontmatter parse (the unchanged frontmatter block parses), no cluster-structure change (no skills moved between clusters; the cluster *list* was not edited), version-stamp/CHANGELOG consistency (the footer carries the June-9 v2.0.0-floor note; this entry prepended). Tier 2 (non-blocking): the stale Part 1 cluster list, flagged above.

---

## v4 — workspace folder-creation convention — June 9, 2026 — all `workspace/` subfolders created up front; `_import_staging/` merged into shared `staging/`; `conversations/` → `claude_conversations/`; universal-vs-curated split

Reconciled how `workspace/` subfolders come into being across the kit to a single convention: **every subfolder is scaffolded at repo birth as a labeled-empty home** (empty = state — "no saved conversations yet," "nothing staged" — never breakage), with contents born on use. This ends the prior mix where some folders were scaffolded up front (`to_do/`, `multisession_active_tasks/`, `conversations/`, `brainstorms/`) and others were born lazily on first use (`staging/` "on demand", `branch_logs/`, `visuals/` "not part of the default repo structure"). Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): `structure_conventions.md` (the convention + the merge + the universal-vs-curated split), `research/coordination/operation_setup_scaffold.md` (birth trees), `research/coordination/operation_archetype_spec.md` (workspace listings), `visuals_workflow_skill.md` (folder now up front), `audit_repo_skill.md` + `repo_conversations_skill.md` + `PROJECT_SETUP.md` + `skills_curation_skill.md` + `project_tracker_skill.md` (residue cleanup + the rename cascade). `CLAUDE_template.md` needed no edit — it already used `claude_conversations/` and points at the spec rather than enumerating folders.

- **Three folders flipped to up-front.** `staging/`, `branch_logs/`, and `visuals/` were born-on-use; they are now scaffolded up front as labeled-empty homes. Their *contents* are still born on use.
- **`_import_staging/` merged into a single `workspace/staging/`.** The import-protocol staging area and the exploration-branch overturn staging area had identical transient lifecycles (hold → place into permanent homes → empty); they are now one shared `workspace/staging/`, which also retires the lone underscore-prefixed folder name. If an import and an overturn are ever mid-flight at once, sub-batch by a named subfolder — not pre-built (extract-when-proven).
- **`conversations/` → `claude_conversations/` (rename cascade).** The owning skill (`repo_conversations_skill.md`) and `CLAUDE_template.md` already used `claude_conversations/`; the scaffolds, two archetype specs, and three skills still said `conversations/` — `PROJECT_SETUP.md` (5 live references), `skills_curation_skill.md` (2), and `project_tracker_skill.md` (1, the `TRACKED_LOCATIONS` default). A rename is not complete until references are rewritten (the `github_api_workflow` rule), so all were carried through; the Tier 1 reference-resolution check caught the `skills_curation`/`project_tracker` pair the first pass missed. Historical CHANGELOG entries keep the old name as the record of past state.
- **Universal vs curated split (the principle this build embeds).** A `workspace/` subfolder is **universal** (every repo, NONE included) when owned by a universal convention or an always-active skill — `claude_conversations/`, `brainstorms/`, `to_do/`, `multisession_active_tasks/`, `staging/`, `branch_logs/`. A subfolder owned by a **curated** skill — `agent_outputs/` (`agent_research_verification`) and `visuals/` (`visuals_workflow`) — is scaffolded by the **archetype** birth trees only, not the universal/NONE layer. Consequences: `agent_outputs/` **added to the coordination scaffold** (it had been missing); `agent_outputs/` **removed from a NONE repo's birth** (it was wrongly in the universal-layer sentence), aligning with agent verification being archetypes-only; `visuals/` added to all three archetype scaffolds.
- **Residue cleared.** The legacy `workspace/notes/` (notes now live in the archetypes' content layers, e.g. `general/notes/`) dropped from the `audit_repo` `DELIVERABLE_FOLDERS` fallback, the `PROJECT_SETUP` audit-scope line, and `repo_conversations`'s examples; the stray `workspace/research/` dropped from `repo_conversations`; the legacy `notes/` dropped from the operation spec's workspace listing.

Tier 1: PASS — reference resolution (zero live `_import_staging` or full-path `workspace/conversations/` tokens remain; `workspace/staging/` and `workspace/claude_conversations/` resolve consistently; no broken cross-references introduced), YAML frontmatter parse (all edited skill/convention files), no cluster-structure change (folder convention only, no skills moved between clusters), version-stamp/CHANGELOG consistency (every edited file's footer carries the June-9 v2.0.0-floor note; this entry prepended). Tier 2 (non-blocking): the Part-B/C per-folder bootstrap-ask in `PROJECT_SETUP` (retrofit behavior for existing repos) was left as-is, distinct from birth-time scaffolding — flagged to the new worklist item on archetype-vs-NONE general structure.

---



## v4 — bundled kit-skill fixes — June 8, 2026 — `github_api_workflow` rewrite-completeness + `agent_research_verification` retrieval-doc retention

Two independent bundled kit-skill fixes from the v4 backlog, shipped in one atomic Trees-API commit. A third bundled item — a `github_api_workflow` file-payload-for-binaries variant — was closed **solved-by-the-Python-rewrite** with no edit: the skill is Python-first, so writes go through `urllib` JSON bodies and never hit the shell `Argument list too long` limit the item targeted; adding a `-d @payload.json` curl recipe would re-introduce the shell-write pattern the skill deliberately deprecated. Files changed (both carry the v2.0.0 floor; final v4 stamp at cycle close): `github_api_workflow_skill.md`, `agent_research_verification_skill.md`.

- **`github_api_workflow` — rewrite completeness.** New subsection "Renaming is not complete until references are rewritten" (after Notes on the Trees API, before Branches). A rename re-points a content-addressed blob and changes *no file contents*, so a rename pass must rewrite old-path/old-name references in two places — files that point at the moved file, *and* the moved files themselves (the DEIF internal-reference lesson) — matching both path shapes (`inputs/X/` and bare `inputs/X`) and bare-name mentions (`AboutFolder` after an `AboutFolder.md` → `FOLDER_MAP.md` rename). Discipline note, no recipe change. Surfaced EditorFMM (path-form miss) + PanPbl Phase-4 (rename-into-contents).
- **`agent_research_verification` — retrieval-doc retention.** Merged the dive's two retrieval artifacts — `_sources.md` (the agent's source table) and `_retrieval_log.md` (the retriever's working record) — into **one kept, accumulating document** `_retrieval.md`: table 1 (every source × every candidate link, the researcher's verbatim record, append-only) → per-pass "still missing" tables (the worked column struck each pass) → a residual "not retrieved + reason" list at the foot. Stated the **retention guard** (the retrieval doc is the dive's kept backlog, never deleted; table-1 immutability is by convention, append-only) and made the verification header's coverage field **required** and required to *enumerate* the unretrieved residual, so the not-yet-retrieved backlog also lands in the citable artifact. **Supersedes** the backlog item's original "delete the candidate list only after verification completes (+ a check enforcing it)" framing (Andrea's call, this session): keeping one document beats a delete-after guard, because a kept document cannot go missing — with nothing deleted, the item's enforcement-check sub-ask collapses into "coverage is mandatory." The "record what was/wasn't retrieved" sub-ask was largely already present (per-source retrieval status + the `unverifiable` verdict); the merge makes it one durable surface. `_sources.md` / `_retrieval_log.md` retired (documented predecessors in the file footer). The five-chat pattern, session-start ritual, two-table verification body, and verdict vocabulary are unchanged.

Tier 1: PASS — reference resolution (live body of both files carries zero `_sources.md` / `_retrieval_log.md`; the two retired names survive only as documented-predecessor history in the agent skill's footer; `_retrieval.md` resolves consistently, 15 live mentions), YAML frontmatter parse (both files), no cluster-structure change, version-stamp/CHANGELOG consistency (both footers bumped to the June-8 v2.0.0-floor note; this entry prepended).

---

## v4 — carryover rename — June 8, 2026 — multisession_task artifact renamed plan-doc → carryover; "plan" reserved kit-wide

Reserved the word **plan** for in-the-work approach-planning (the approach that lives inside the work, with `STATUS.md` carrying position) and renamed the multi-session **constraint artifact** from "plan-doc" to **carryover** (file `MULTISESSION_PLAN_<task_stem>.md` → `MULTISESSION_CARRYOVER_<task_stem>.md`). The skill name (`multisession-task`) and its home `workspace/multisession_active_tasks/` are unchanged — "multisession" scopes the skill and its folder; "carryover" names what the artifact does (carry one task across the session gap). Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): `multisession_task_skill.md` (owner — term + filename + frontmatter + the "make the plan" trigger → "make a carryover"); `structure_conventions.md` (the `multisession_active_tasks/` definition + the reserve-rule note); `CLAUDE_template.md` (the Skills-table row); `PROJECT_SETUP.md` (Files-to-copy note + Appendix row, kept in sync with the template). `project_tracker_skill.md` and `finish_session_skill.md` needed no edit.

- **Why the rename.** "plan" was doing double duty: the in-the-work approach-plan *and* the cross-session constraint artifact. Reserving the word for the first and naming the second "carryover" makes each kit term mean one thing — the constraint-vs-real-work distinction the multisession_task build surfaced, now lexically enforced.
- **Carryover, defined.** One task split across sessions *because a prompt would be too fragile to carry it intact* (too small to hold the state, or stale across the gap). Strip context limits / execution risk / fatigue and the carryover vanishes while real work's in-the-work plan survives — the test that keeps the two apart.
- **Predecessor.** "carryover" supersedes the "plan-doc" / "multi-session task plan" framing of the June 8 multisession_task entry below; that entry is kept as history (it records the artifact's name at ship time). Prior CHANGELOG entries are not rewritten.
- **Blessed "plan" uses untouched.** The writing-outline ("plan interactively"), brainstorming's "planning," `project_tracker` / `STATUS.md` position-tracking, and the exploration overturn's in-work restructure plan all keep "plan" — the reserved sense, not the construct.

Tier 1: PASS — reference resolution (no live `MULTISESSION_PLAN_` token survives; `MULTISESSION_CARRYOVER_` consistent across all four files; the two parallel rows in `CLAUDE_template` / `PROJECT_SETUP` reworded in sync), YAML frontmatter parse (`multisession_task_skill.md`), no cluster-structure change (description-text only), and conflation cleanup (construct "plan" / "plan-doc" removed from live text; the two blessed "plan" keeps verified; `MULTISESSION_PLAN_` survives only as documented-predecessor history).

---

## v4 — multisession_task skill — June 8, 2026 — NEW `multisession_task_skill.md` (the former "task-lifecycle skill"), placed always-active

Shipped the multi-session task plan as a skill: a **constraint artifact** — a per-task plan-doc (`workspace/multisession_active_tasks/MULTISESSION_PLAN_<task_stem>.md`) that exists *only* because resource limits (context, execution risk, fatigue) force one task across several sessions, and that *vanishes* under the no-constraint thought-experiment (infinite context / no execution risk / no fatigue). Categorically distinct from `workspace/to_do/` (deferred intentions). Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): NEW `multisession_task_skill.md`; `structure_conventions.md` (the `multisession_active_tasks/` home); `CLAUDE_template.md` (cluster row); `PROJECT_SETUP.md` (Files-to-copy + Appendix + the Part A scaffold step 2 creates the folder at birth); `research/coordination/operation_setup_scaffold.md` (folder in the birth tree); `exploration_branch_skill.md` (overturn-route correction, below). `project_tracker_skill.md` and `finish_session_skill.md` needed no edit (no new machinery — the seams inherit).

- **The two-question gate** decides plan-vs-prompt, split by who can see the answer: Q1 *is one more session enough?* (Claude-readable) and Q2 *can a prompt carry it and still be intact on return?* (carrier-survival, Andrea-readable — fragile by size *or* by staleness across the gap). Both yes -> leave a prompt (reuse `STATUS.md` / a `to_do/` line, no new artifact); either no -> build the doc; ties go to the doc. Who-decides: on "make the plan," Claude argues *down* to a prompt on what it can see; a stated carrier reason makes the doc, no re-litigation.
- **The plan-doc** is a scaled-down worklist-mimic: a volatile **resume-head** over a stable body of **objective** / ordered **sequence** / **decisions & open questions** (settled calls recorded as conclusions so they are not re-litigated across the gap; open questions held off the volatile head so a rewrite never drops them). Scales down hard; folds into `STATUS.md` and is deleted at completion, the delete gated on the distill being *committed*.
- **Placement: always-active** Repo-and-session-infrastructure cluster — its home is defined in `structure_conventions.md` for every repo, so a curatable skill would leave a folder with no governing skill. The folder is created up front (empty = "no active multi-session task"); the plan-doc is born on use.
- **Born at the stop, never handed off.** The plan-doc is not produced by an upstream skill and passed over; the gate fires on a multi-session task *whatever its origin* (a brainstormed approach, an overturn restructure, a long job). This corrected an early over-reach in this build that had framed brainstorming and exploration as plan "producers."
- **The constraint-vs-real-work distinction (the spine).** Real work — approach-planning, an overturn's restructure tracing — survives the strip: it carries its plan *inside the work* and its position in `STATUS.md`, and acquires a plan-doc only if it independently trips the gate. Only the constraint scenario externalizes a separate plan-doc. So `exploration_branch_skill.md`'s overturn route was corrected — the restructure is real work, tracked as a `STATUS.md` workstream and executed via the writing skills (restoring #8's `STATUS.md` routing, now primary not a fallback); `multisession_task` is referenced only as the gate that fires if the restructure spans sessions, not the route's owner.
- **Logged as the next task:** a kit-wide sweep applying the same distinction across every skill (route real cross-session work to embedded-in-the-artifact + `STATUS.md` position; reserve a separate plan-doc for the constraint case), and settling where a real multi-step approach-plan lives if not a constraint doc. Also recorded: the `project_tracker_skill.md` "freshness-audit reference" the worklist anticipated does not exist — no edit there.

Tier 1: PASS — reference resolution (the new skill resolves from `CLAUDE_template`/`PROJECT_SETUP`/`structure_conventions`/`exploration_branch`; its own refs resolve), YAML frontmatter parse, cluster placement + parallel-list consistency (cluster row + Files-to-copy + Appendix in lockstep), and conflation cleanup (no live "producer" / "hand-off-a-plan" framing; `task-lifecycle` survives only as documented-predecessor history).

---

## v4 — #8 branch/exploration cluster — June 8, 2026 — `branch_workflow_skill.md` split into `writing_branch_skill.md` + new `exploration_branch_skill.md`

Split the single branch workflow into two skills along the lifespan/isolation axis: an ephemeral, single-document review branch, and a long-lived, isolated *exploration* branch (work whose purpose is to test whether a `main` claim holds). Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): NEW `exploration_branch_skill.md`; `branch_workflow_skill.md` → `writing_branch_skill.md` (renamed + scoped); `brainstorming_skill.md` (purpose-triage hand-off); `structure_conventions.md` (exploration-branch artifacts); `naming_conventions.md` (branch-name hyphen exception); `github_api_workflow_skill.md` (branch recipes + `?ref=` discipline); `finish_session_skill.md` (exploration light arm); `skill_authoring_skill.md` (cluster list + re-pointed example); `STATUS_template.md` (a Current-state note, no new subsection); and the rename cascade across `writing_skill.md`, `writing_drafting_skill.md`, `visuals_workflow_skill.md`, `writing_notes_skill.md`, `skills_curation_skill.md`, `CLAUDE_template.md`, `PROJECT_SETUP.md`. `project_tracker_skill.md` needed no edit. Both branch skills sit in the always-active Repo-and-session-infrastructure cluster.

- **The split.** `writing_branch_skill.md` keeps document review (ephemeral, ~one session, merges as a finished deliverable). `exploration_branch_skill.md` is new: long-lived, isolated, begins at "branch decided" — from `brainstorming_skill.md`'s purpose-triage (a *testing* verdict) or from a folder→branch promotion (an additive folder whose intent flips to testing mid-stream).
- **The brainstorming triage.** A discrete, conditional hand-off that fires only when a brainstorm resolves into an offshoot: *testing* a `main` claim → exploration branch; *adding* to `main` → a folder via the folder-creation placement check. By purpose, not probability. Written as a named step so it can be extracted to a shared triage if a second entry point ever proves real.
- **The finalize protocol** (review → reconcile → route-on-`Standing` → record+delete), a deliberate direct act, not a session-close step. `Standing` is held/null, additive, or overturn. Held/null/additive land clean at the `extends:` parent in a per-subject `explorations/` nest; an overturn stages to `workspace/staging/` (not a git-merge, which would land both claims and report no conflict), supersedes-but-retains the old claim, and hands downstream tracing to a task-lifecycle restructure plan.
- **Soft hand-off, by design.** The overturn route points at the not-yet-built task-lifecycle skill as a soft hand-off with a `STATUS.md` fallback, so an overturn completes today; it upgrades when that skill ships (revisit note carried in the skill and on the worklist). Soft references between interconnected skills, tightened on a later cycle, are the normal state — not a gap.
- **Artifacts** (defined in `structure_conventions.md`, written by the skill): `BRANCHES_LOG.md` (root, on `main`; a log, one line per exploration at creation + a merge annotation; explorations only); the in-branch `FOLDER_MAP.md` with `Extends:`/`Testing:`/`Standing:` slots (the universal map reused — keeps the system archetype-blind); `BRANCH_RESEARCH.md` (two-part in-branch log, review + trail, splitting at merge: review → product `FOLDER_MAP`, raw trail → `workspace/branch_logs/`). `BRANCH_RESEARCH.md` adapts Dan Parshall's `RESEARCH_LOG.md`.
- **#15 (`github_api_workflow_skill.md`).** Added `gh_create_branch` / `gh_merge` / `gh_delete_branch` and codified the `?ref=<branch>` read discipline (read in-branch files by ref; never check out). Rewrote "When to Stop and Use Git Directly" — branch/merge work is now in-scope, replacing the v1.2 carve-out that wrongly sent it to direct git in a push-blocked environment.
- **Cluster placement.** Both branch skills are always-active. `writing_branch` is *required* there by the cluster-completeness invariant (`finish_session` hard-invokes it); `exploration_branch` is there by placement decision (the two kept together), *not* the invariant — nothing always-active hard-invokes it.

Tier 1: PASS — reference resolution (no live reference to the deleted `branch_workflow_skill.md`; remaining mentions are CHANGELOG history, markers, and one "since renamed" provenance line), YAML frontmatter parse, cluster completeness (Check 11 — both branch skills always-active, the brainstorming hand-off soft), and rename integrity (new names present, old absent).

---

## v4 — coordination close-out pair — June 8, 2026 — coordination-only corpus-feedback + real-world-signal + promotion-drift prompts in `project_tracker`

Root #2's last buildable members: a coordination-repos-only session-close block (no-op on research / operation / NONE) carrying the three `coordination_archetype_spec.md` §6/§9 prompts. Single-file commit. File changed (carries the v2.0.0 floor; final v4 stamp at cycle close): `project_tracker_skill.md`.

- **Corpus-feedback** (clause (k)): external-outcome deltas → the task's `corpus/`; a deferred action → `workspace/to_do/`.
- **Real-world-signal** (clause (k)): an instance awaiting an outcome on `INSTANCES_INDEX` — did one arrive?
- **Promotion-drift** §9 (clause (l)): one-off → task-unit; single-task → composition; surface the candidate only.
- All prompt-don't-perform; no new machinery (awaiting-outcome rides `INSTANCES_INDEX`, deferred actions ride `workspace/to_do/`, promotion candidates self-resurface). The coordination spec needed no edit (already lists these as finish_session prompts); `finish_session` Step 3 delegation inherits the block.

Tier 1: PASS — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## v4 — universal `workspace/to_do/` tracker — June 8, 2026 — research's `general/to_do/` promoted to a universal action tracker in `structure_conventions.md`

Promoted the to-do construct from research's `general/to_do/` to a universal **`workspace/to_do/`** action tracker defined once in `structure_conventions.md` (working-tracker-not-catalog · no index row · pointed at from `STATUS.md` · inline ownership · created up front · NONE included); `workspace/` reframed as the working layer of Claude *and* Andrea. Emergent from the coordination pair — corpus-feedback's deferred "save a to-do" needed a home — generalized to all archetypes. Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): `structure_conventions.md`, `research_archetype_spec.md`, `operation_archetype_spec.md`, `project_tracker_skill.md`, `research_setup_scaffold.md`, `coordination_setup_scaffold.md`, `operation_setup_scaffold.md`, `PROJECT_SETUP.md`, `STATUS_template.md`, `CLAUDE_template.md` (coordination spec needed none).

- **Created up front, not born-on-use** — an empty `to_do/` is a true-empty labeled home (matches how `brainstorms/` / `claude_conversations/` scaffold).
- **Done-to-do retirement generalized** research-only → every repo (`project_tracker` clause (j); rule reference re-pointed to `structure_conventions.md`).
- **Boundary held** against the two existing surfaces: STATUS Open-questions = decisions; the `[SKILL-FEEDBACK]` CHANGELOG channel = skill-malfunction; `to_do/` = actions.

Tier 1: PASS — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## v4 — skill-feedback / malfunction channel — June 7, 2026 — `structure_conventions.md` + CHANGELOG convention + discovery/consolidation machinery

Added a standalone behavioral-feedback channel: a content repo can log a kit skill's malfunction or "could-be-better" observation as a tagged CHANGELOG entry that travels back to SkillPropagation as evidence, without being mistaken for a file edit. Files changed: `structure_conventions.md` (v2.0.0 floor), this `CHANGELOG.md` (convention legend + this entry), `skills_diff_check_prompt.md` (→ v2.0.4), `skills_consolidation_skill.md`. Born in the June 7 design pass; its own root, no #8 dependency.

- **Tag form.** A behavioral entry is `## [SKILL-FEEDBACK] — <skill> — <date>` with **no version stamp** — the bracketed tag occupies the leading slot where a version number normally goes, so "leading token isn't a version" is the detection signal. Chosen over a body-level type field because it reuses the one header line the sweep already parses (minimal machinery), and over `[MALFUNCTION]` because the channel also catches "could be better," not just "broke."
- **Home.** The convention is defined in `structure_conventions.md` (the universal layer — the rule lives in the convention doc, as the `FOLDER_MAP` rule does), with a one-line legend at the top of this file so a reader of the log sees what the tag means without chasing the doc.
- **Transport.** The CHANGELOG now participates in the discovery file-diff and bundles on a *content* difference; a `[SKILL-FEEDBACK]`-only change (no skill file edited) still comes back. The sweep's silent-edit cross-check exempts these entries (no file behind them by design). This reuses the existing repo→SkillPropagation carrier rather than adding transport.
- **Extract, don't merge.** At consolidation an incoming CHANGELOG is never merged into the master (it is a stale history snapshot plus notes, and would corrupt the canonical history). Its `[SKILL-FEEDBACK]` entries are extracted and routed by Andrea's disposition — act now (becomes a real skill edit this cycle), defer (recorded in `CONSOLIDATION_NOTES.md`, re-surfaced next cycle), or dismiss. Deferred notes survive on the SkillPropagation side in the consolidation-notes trail, never in the shipped CHANGELOG.
- **Overwrite is safe.** A note dies when the next propagation overwrites the repo's CHANGELOG — but that same propagation ships the fix the note prompted, so the note is spent by then. The one dependency: discovery must capture the note before that repo is propagated, which the bundle-on-CHANGELOG-difference rule guarantees. `PROJECT_SETUP` Step 8 (the overwrite) needed no change.

---

## v4 — finish_session extension family — June 6–7, 2026 — close-side members built in `project_tracker` (folder-move close-out; freshness-audit drift passes + index-freshness cadence; done-to-do retirement)

Root #2's close-side family, built across three commits, all in `project_tracker_skill.md` (no `finish_session` edit — its Step 3 delegation inherits each behavior). Files changed (all carry the v2.0.0 floor; final v4 stamp at cycle close): `project_tracker_skill.md`, `STATUS_template.md`, `CLAUDE_template.md`.

- **Folder-move close-out read** (`25331fd`, June 6): a **Pending placement fixes** subsection owned by `project_tracker` (sibling to Pending re-integrations, inside Current state) — the read end of the `CLAUDE_template` folder-creation placement check; open entries surface at session start (opt-in) and close (mandatory). Companion: `CLAUDE_template` write-end bullet re-pointed; `STATUS_template` parallel empty subsection.
- **Freshness-audit drift passes + cadence framework** (`50c054b6ad`, June 7): Pass 2 **structure-drift** (cheap archetype-skeleton peek routing to `audit_repo` Check 12; NONE skips) and Pass 3 **stage-drift** (per-line stage-label peek); plus the **index-freshness cadence** time-proxy (close-side read keyed to a new `INDEX_AUDIT_INTERVAL` param, default 30 days, against an "Index audit last run" slot in `STATUS_template`). Companion: `CLAUDE_template` Working-Conventions clause + the freshness-audit archetype-conformance reconciliation.
- **Done-to-do retirement** (`e622d4f3ca`, June 7): research-only close-out check clearing checked-off `general/to_do/` lines on confirm (delete-on-completion; record in the STATUS.md close-out; clause (j)) — later generalized to every repo by the universal-to-do build.

Tier 1: PASS (each commit) — reference resolution, YAML parse, no cluster change, version-stamp/CHANGELOG consistency.

---

## v4 — folder-creation placement check (`CLAUDE_template.md` Working Conventions) — June 6, 2026

Made folder creation a placement decision rather than a silent act, closing the entry-side anti-duplication/placement gap surfaced by the AdmWorkFMM index diagnostic. Files changed: `CLAUDE_template.md` (v2.0.0 floor).

- **Before creating a folder:** describe its purpose, read it against the repo's current `FOLDER_MAP`s and indexes, and run the instance / task / genuinely-new triage — a new instance routes under its task in that task's instance shape; a new task earns its own home, corpus, and index section; genuinely-new structure gets a proposed home. Ask only placement-deciding questions, then propose the home and write the folder's `FOLDER_MAP`.
- **First reference to a folder Andrea made outside a session:** run the same check and register it; surfacing the unregistered folder is `project_tracker_skill.md`'s session-start check.
- **Rushed override:** if a folder was already created and looks mis-placed/duplicative, flag it but do not move it; on defer, record the pending move as a to-do at the end of `STATUS.md` so `finish_session_skill.md`'s close-out re-surfaces it next session. Nothing blocks; the move waits, recorded.
- **Scope.** Behavioral convention only — the matching `finish_session` close-out read is build-pending. Naming-section structure-prose (`Drafts/`/`Archive/`/`AboutFolder.md`) untouched (deferred 1f / writing-placement passes own it). Covers the entry-side path; mid-work and forgotten-material cases still rely on the session-close description refresh (root #2).

---

## v4 — build the audit-against-archetype root (completion-frame step 4) — June 6, 2026 — `audit_repo_skill.md` Check 12 (Archetype conformance)

**The cycle's goal and the first loop root.** Added **Check 12 — Archetype conformance** to `audit_repo_skill.md`: the audit-against-archetype drift check. It reads `CLAUDE.md`'s `archetype.type` declaration, loads the one carried `*_archetype_spec.md` for that type, checks the repo against it, and reports drift. Files changed: `audit_repo_skill.md` (v2.0.0 floor). Trustworthy because completion-frame steps 2-3 first removed the kit-side placement/index-naming contradictions that would otherwise have made it read kit-induced drift on every repo's first run.

- **How it reads the spec.** The declaration is machine-readable YAML (`type`/`variant`/`spec_version`), so spec selection is deterministic; the one soft step is comparing the repo to the spec's prose invariants. The Check owns a fixed dimension frame (structure, index set, placement, naming, currency-guard) — archetype-blind procedure — and reads each dimension's content from the loaded spec's prose. No invariant block was added to the specs (dual-maintenance risk; prose carries conditional nuance a flat block loses; the shipped specs are already scrubbed to operational invariants). The Check never hardcodes an archetype's specifics and never names a repo index — it discovers via `FOLDER_MAP`s, and reads only the repo's own declared spec, the one runtime exception to the kit's archetype-blind rule.
- **Dimensions.** Structure against the scaffold (respecting born-on-creation: an absent on-demand folder like operation's `funding/` or `MATRIX.md` at N=1 is not drift); index **set** membership (not content freshness); placement; naming; and an operation-only currency-guard flag (operation §6 — an index with no feeding process; flag only, mechanism deferred to the navigation track).
- **Severity tracks the spec's invariant-vs-latitude line.** Naming, required-index-set membership, and required-folder presence are mechanical drift fixes; structural extras, placement, and the currency-guard flag are Requires-decision (legitimate per-repo latitude must not be flagged as drift). Most Check 12 findings are Requires-decision — the inverse of the consistency checks. A spec-version-skew note fires when the repo's `spec_version` trails the carried spec.
- **Folded in `DELIVERABLE_FOLDERS` archetype-awareness** (the deferred placement-slice item): when an archetype is declared, the deliverable homes are derived from the declared spec via `FOLDER_MAP`s; the hardcoded `papers/`/`Drafts/`/`inputs/`/`workspace/notes/` list is now the NONE/pre-archetype fallback. Added Step 1 triage of the declaration (NONE skips Check 12; a pre-archetype repo surfaces a one-time migration gap rather than being checked against a guess).

**Scope boundary (strictness bar).** Check 12 checks structural conformance only — not deliverable content, and not index content-staleness (held for the separate index-system revision). Marked as a different *kind* of check (conformance, not the internal doc-matches-disk consistency of Checks 1-11) and explicitly **not** a workflow-invariant check: it does not count toward the Check 9/10 rule-of-three. Its own extraction path — a future always-active `archetype_conformance_skill.md` shared with a lightweight `finish_session` sibling — is recorded in the Check for if the conformance family grows.

---

## v4 — bin-1 index slice — June 6, 2026 — `project_tracker` freshness audit goes index-name-agnostic

**Completion-frame step 3 (fifth and final unit), the last step-3 piece before step 4.** Made `project_tracker_skill.md`'s freshness audit archetype-blind on *what it tracks*: its `TRACKED_LOCATIONS` no longer names any repo index. Files changed: `project_tracker_skill.md` (v2.0.0 floor).

- **Why this is bin-1 (the operation gap).** The freshness audit's `TRACKED_LOCATIONS` default named the repo's indexes by file — `MATERIALS_INDEX.md`, `PAPERS_INDEX.md`, `MasterIndex.md` — cross-referencing the three paper-side skills. Confirmed against the specs: research §7 and coordination §5 carry `MATERIALS_INDEX`/`PAPERS_INDEX`/`DEEPDIVES_INDEX`, but operation carries **none of them** — operation §3 has only typed, reliability-tagged root indexes, and §5 routes intake through the processing skills. So on a v4 operation repo the audit would flag those named files missing (false positive) or watch the wrong thing — the same kit-induced drift the step-4 audit-against-archetype would read. The naming had to go.
- **The design call — remove, do not generalize (the `Drafts/` parallel).** The recursive `FOLDER_MAP.md` scan in `TRACKED_LOCATIONS` already covers the folders the maps describe, *including index files as folder contents* (every folder, root included, has a `FOLDER_MAP.md`); commits are a second input that catch index changes regardless. So a named-index clause is doubly redundant — and wrong on operation. Removed it entirely, exactly as the placement slice removed the literal `Drafts/`, rather than rewriting it to a name-agnostic "the indexes the repo declares" item (which would buy a redundant line to keep correct against the principle the `Drafts/` removal already set). The recursive-scan gloss was extended to name index folders as covered, so the removed clause's job is carried in the gloss.
- **Two surfaces neutralized.** (1) The `TRACKED_LOCATIONS` default cell — named-index clause dropped. (2) The Composition bullet for `materials_processing`/`document_processing` — rewritten name-agnostic *and* to the now-shipped behavior of those two skills (they register in the repo's existing index discovered from the `FOLDER_MAP`s, in the repo's shape; they no longer "create entries in `MATERIALS_INDEX.md`"). This neutralizes the `MasterIndex.md` index example the placement slice deferred here.

**Design questions resolved this session.** (1) *Does the freshness audit need to name or enumerate any index?* No — removed entirely, per the above. (2) *Is operation §6's currency guard ("an index with no feeding process is a liability") in scope here?* No — deferred. §6 itself assigns the guard mechanism to "the separate navigation work" (the deferred index-freshness-cadence item in the `finish_session` family), and the guard is a structural-soundness check, a different instrument from this skill's lightweight session-start cadence check. The skill already draws that line ("only `audit_repo_skill.md` is comprehensive").

**Out of scope (held by the strictness bar).** The hierarchical-naming material (the *Pending re-integrations* subsection, the chapter/section drift machinery, descriptor bullet (f)) — writing-model ownership, not index-system; left untouched. Operation §6's currency-guard mechanism — the navigation track. No `CamelCase`/`AboutFolder` residue in the file, so the naming-conform part was a no-op. Tier 1 PASS (YAML parse; body clean of `MATERIALS_INDEX`/`PAPERS_INDEX`/`MasterIndex` except the documented predecessor in the footer; cross-references resolve; no new cross-cluster hard dependency). **Step 3 complete — step 4 (build the audit-against-archetype root) next.** Carries the v2.0.0 floor.

## v4 — bin-1 index slice — June 6, 2026 — `materials_processing` + both paper branches go index-name-agnostic

**Completion-frame step 3 (fourth unit), the re-edit `agent_research_verification` resolved-and-deferred.** Removed every hardcoded index and bibliography name from the materials front door and the shared infrastructure of its two paper branches, so all three locate the repo's existing homes by reading the `FOLDER_MAP`s instead of naming files. Files changed: `materials_processing_skill.md`, `paper_processing_academic_skill.md`, `paper_processing_institutional_skill.md` (all v2.0.0 floor).

- **Why this is bin-1 (the operation gap, confirmed against the specs).** Operation spec §5 routes intake through the document/paper-processing skills, so an operation repo *is* a caller of all three — and operation carries none of the named files: no `MATERIALS_INDEX`, no `PAPERS_INDEX` (inbound docs land in `reference/`, reliability-tagged, §3/§5), no `.bib` (citability is the reliability tag, not a bib entry, §4), no root `papers/` (no archetype has one). Research §§7–8 and coordination §§3/§5 *do* carry `MATERIALS_INDEX`/`PAPERS_INDEX`/`.bib`. So a skill that names any of them makes a v4-scaffolded operation repo either flag a false gap or hand-create drift — exactly what the step-4 audit-against-archetype would read as kit-induced. The front door was already placement-blind and index-shape-conforming from the first step-3 unit, but still *named* the indexes; it routed into branches that still asserted the named rows and hardcoded `papers/`. Active kit-internal contradiction, now closed.
- **The cascade decision (one move for all three homes).** `MATERIALS_INDEX`, `PAPERS_INDEX`, and the bibliography get the *same* archetype-blind treatment: discover from the `FOLDER_MAP`s, write in the shape the repo's home already uses, never name a file, never read a spec at runtime. `BIB_FILE` did not need a separate mechanism — the bibliography step is simply made conditional (a repo with no bibliography, citability tracked another way, skips it). The deeper reliability-tag-as-citability **model** reconciliation stays deferred — the same line document_processing and agent_research_verification held; conform-to-existing handles registration without resolving it.
- **`materials_processing_skill.md`** — dropped `MATERIALS_INDEX`/`PAPERS_INDEX`/`references.bib` from the materials-index section, the paper-branch-artifacts section, the Prerequisites and Configuring sections (`BIB_FILE`/`PAPERS_INDEX` retired as named config values; `PROJECT_QUESTION` + optional `CONDITIONAL_SECTION` remain), the Lookup Protocol, and the `project_tracker` cross-reference. The status-framework example table's illustrative `papers/` link paths were neutralized to `<paper-home>/` (placement residue from the prior unit). Placement, index-shape-conformance, Step 0 triage, the paper pipeline, and the status framework vocabulary unchanged.
- **`paper_processing_academic_skill.md` / `paper_processing_institutional_skill.md`** — text/summary artifacts now file into the `text/`/`summaries/` subfolders of the paper's home as proposed-and-confirmed by the parent's placement rule (the hardcoded `papers/text/`/`papers/summaries/` and "path to the PDF in `papers/`" are gone; Protocol B's §3(d) "the project's `papers/` collection" generalized too). Step 4A/4B register in the repo's paper-detail index and materials index found via the `FOLDER_MAP`s; Step 5A/5B's bibliography entry is conditional and the `.bib` is found via the `FOLDER_MAP`s. The soft `project_tracker` cross-refs were generalized. Pipeline logic, summary structure, status framework, BibTeX field discipline, and triage edge cases unchanged.

**Confirmed in passing (the two checks the unit was asked to make).** Step 0 triage and the status framework touch no index naming — confirmed; the only residue was the status example's `papers/` link paths (placement, not naming), neutralized above. The soft `project_tracker` `TRACKED_LOCATIONS` cross-references were generalized in these three files; `project_tracker_skill.md`'s own `TRACKED_LOCATIONS` naming is its own step-3 unit (next), mirroring how `document_processing` shipped while `CLAUDE_template` still named the index.

**Out of scope (held by the strictness bar).** The reliability-tag-as-citability model reconciliation (deferred, as above). `project_tracker`'s freshness audit (the remaining step-3 unit). The AdmWorkFMM index-axis redesign. No `CamelCase`/`AboutFolder` residue in the three files, so the naming-conform part was a no-op. Carries the v2.0.0 floor.

## v4 — bin-1 index slice — June 6, 2026 — `agent_research_verification` goes archetype-blind on placement and the verified-dive catalog

**Completion-frame step 3 (third unit), the papers-side sibling.** Made `agent_research_verification_skill.md` archetype-blind on two axes — academic-source placement and the verified-dive catalog — the same move as the `materials_processing`/`document_processing` units and the placement slice. Files changed: `agent_research_verification_skill.md` (v3.1 → v2.0.0 floor).

- **Placement — `papers/` retired.** The skill hardcoded a root `papers/` academic-source home throughout (source-folders question, prompt + verification headers, retrieval pass, source-processing step, Part-1 verification table, citing step, folder-structure note). No archetype carries a root `papers/` — research keeps literature in `general/`, coordination in `reference/literature/` or instance-scoped, operation in reliability-tagged `reference/` — so the step-4 audit would read kit-induced drift on every repo. Academic sources now land in the repo's literature home, read from the repo's `FOLDER_MAP`s and confirmed; never hardcoded, never spec-read at runtime. The skill already carried a "declared source folders" abstraction (it was half-blind); the edit harmonized everything to it and generalized the source-folders question so the academic home is suggested-from-`FOLDER_MAP`s, not assumed. Filing already hands off to `materials_processing`, now itself archetype-blind on placement.
- **Index — verified-dive catalog, name-agnostic (a new step).** The discovery read settled the central design call: the skill's own `workspace/agent_outputs/INDEX.md` and the repo's deep-dives catalog are **two surfaces, not one**. The workspace `INDEX.md` is the skill-owned workflow tracker (all dives, all statuses) — spec-endorsed (coordination spec §10 names `workspace/agent_outputs/` as a skill-owned-`INDEX.md` folder) and left untouched. The repo's deep-dives catalog is the by-subject index of *verified* runs the repo's materials/intake index points at (research §8 `DEEPDIVES_INDEX`, only verified dives; coordination §5 same discipline). The skill never connected verified dives to it. Added an archetype-blind registration at verification completion: register the verified dive in the repo's existing deep-dives/verified-output index discovered from the `FOLDER_MAP`s, in the shape it uses, **never naming the index** (operation carries none — there it is a typed reliability-tagged output row), only verified dives, same commit as the verification doc and tracker status flip. Degrade-to-ask if the maps show no catalog.

**Resolved — the open question `document_processing` logged.** Does `materials_processing` carry the same latent operation gap? **Yes — and it is sharper than latent.** Operation spec §5 routes intake through the document/paper-processing skills; `materials_processing` is the paper-processing front door, so operation *is* a materials caller, and operation has no `MATERIALS_INDEX`. `materials_processing` still names `MATERIALS_INDEX` as the repo-root single lookup, and its pre-v4 fallback only catches repos that *predate* v4 scaffolding — so a v4-scaffolded operation repo falls through (false gap, or a hand-created `MATERIALS_INDEX` that is itself drift). It is an *active* kit-internal contradiction now: the document-branch commit made the document branch register in the repo's existing index (blind) while the front door routing to it still asserts the named-index row. **Coherent papers-side answer: all three (materials, document, agent) go index-name-agnostic.** The `document_processing` entry's "the asymmetry is correct" was wrong (it rested on an incomplete caller set).

**Deferred (execution-risk call).** The `materials_processing` re-edit is its own later step-3 unit, not folded here: a clean fix also touches its two paper-branch skills (`paper_processing_academic_skill.md`, `paper_processing_institutional_skill.md`, which name `MATERIALS_INDEX`), and bundling two unread files into this commit on a change that propagates everywhere raises mistake risk against the one-unit-per-commit discipline. The materials↔document incoherence sits in main until that unit — acceptable, as step 4 (the audit that would trip on it) isn't built yet and the unit is queued before it.

**Out of scope (held by the strictness bar).** Untouched: the five-chat operating pattern, session-start ritual, two-table verification body, verdict vocabulary, `LESSONS.md`/`WORKFLOW_SKIPS.md` discipline, cross-project hoisting, the `PAPERS_PROTOCOL_SKILL`/`DOCUMENT_PROTOCOL_SKILL` params (skill names, not folder/index names), the `workspace/agent_outputs/` workflow tracker. The reliability/confidentiality **model** reconciliation is deferred (conform-to-existing handles registration without resolving it). No `CamelCase`/`AboutFolder` residue in this file, so the naming-conform part was a no-op. Carries the v2.0.0 floor.

## v4 — bin-1 index slice — June 6, 2026 — `document_processing` goes archetype-blind on indexing

**Completion-frame step 3 (second unit).** The same archetype-blind move as the `materials_processing` unit, applied to the document branch of the materials triage. `document_processing_skill.md` was authored before Stage 1a promoted the archetype specs and prescribed a root `MasterIndex.md`, an `inputs/` source-folder tree, and `AboutFolder.md` folder indexes — none of which any archetype defines. Left standing, the step-4 audit-against-archetype check would read kit-induced drift on every coordination and operation repo that runs this skill on intake. Files changed: `document_processing_skill.md` (v2.0.0 floor).

- **Indexing — archetype-blind, a step past the queued frame.** The `MasterIndex.md` prescription is dropped (no archetype has a master index). The discovery read showed the queued scope's "conform to `MATERIALS_INDEX`" was research/coordination-shaped: coordination has a `MATERIALS_INDEX`, but **operation has none** — it carries typed reliability-tagged root indexes plus a deferred topic/position product index, with inbound documents in `reference/` and per-reform `subproducts/`. Operation repos explicitly run the document/paper-processing skills on intake (operation spec §5), so the skill cannot name a repo-level index. Step 5 now registers the document in the repo's *existing* repo-level materials index — discovered from the repo's `FOLDER_MAP`s, in the shape that index already uses — never naming a file or reading a spec at runtime. **Deliberate sibling asymmetry:** `materials_processing` still names `MATERIALS_INDEX` (its callers, research and coordination, both have one); `document_processing` does not, because it also runs in operation. Whether `materials_processing` carries the same latent operation gap is logged as an open question for the `agent_research_verification` / `project_tracker` units.
- **Rename — `AboutFolder.md` → `FOLDER_MAP.md`** carried through this file. The v3.2 1e-rename pass exempted `document_processing` "until its own redesign"; the rename and the index conform are one edit surface (the index-writing steps name the per-folder index throughout), so it lands here.
- **Placement / setup — `inputs/` tree retired.** No archetype has an `inputs/` folder, and repo birth is the scaffold's job. The structure section and setup steps no longer build an `inputs/` tree or any folders/indexes; placement stays archetype-blind via Step 0 (work-in-place where the user dropped the file; otherwise suggest from the repo's `FOLDER_MAP`s and confirm before filing). Added the pre-v4 migration-gap fallback.

**Out of scope (held by the strictness bar).** The reliability/confidentiality **model** reconciliation is deferred — the specs diverge (coordination keeps quality metadata out of typed indexes, a domain registry is its home; operation makes reliability/confidentiality first-class index columns; scales differ, this skill's 5 labels vs the operation spec's 6 adding "Background"). Conform-to-existing handles index *writing* without resolving the model. The AdmWorkFMM index-axis redesign and the `MasterIndex.md` → `MASTER_INDEX.md` casing rename (mooted by the drop) are also out. Dropping `MasterIndex` orphans no data — reliability/confidentiality live in the summary and `FOLDER_MAP.md`. Carries the v2.0.0 floor.

## v4 — bin-1 index slice — June 6, 2026 — `materials_processing` goes archetype-blind on placement and indexing

**Completion-frame step 3 (first unit).** The same archetype-blind move as the placement slice (step 2), now applied to the materials triage's placement-and-index model. `materials_processing_skill.md` was authored at v3.2, before Stage 1a promoted the archetype specs, and hardcoded a single archetype-agnostic model — a root `papers/` tree plus a flat type-keyed `MATERIALS_INDEX` carrying an "index relationships under review / treat as flat" note. Both now contradict the v4 specs (research places literature in its shared layer via named line-containers, with no `papers/` folder, and defines a line-sectioned, pointer-only root-index set in which `MATERIALS_INDEX` points to the detail indexes), so the step-4 audit-against-archetype check would read kit-induced drift on every research repo's first run. Fixed by deferring placement and index structure to what the repo already carries. Files changed: `materials_processing_skill.md` (v2.0.0 floor).

- **Placement** — the hardcoded root `papers/` home is retired. At filing time the skill reads the repo's `FOLDER_MAP`s (the per-folder purpose index every repo carries regardless of type), proposes the home they indicate, and **confirms with the user before filing** — never hardcodes, never scans the raw tree, never reads an archetype spec at runtime (which would make the skill archetype-aware). The paper pipeline's within-folder artifacts — `text/`/`summaries/` subfolders, `TEXT_`/`SUMMARY_` naming, the PDF+extraction+summary triplet — are kept (spec §12 retention endorses them; no conflict).
- **Indexing** — the materials-index section no longer prescribes a flat `Name/Type/Path/Link` schema. The index already exists in the repo, built at setup in the shape that repo's type uses and self-documenting; the skill reads it and adds its row in that shape. The "index relationships under review / treat as flat" note is deleted — false against the now-defined per-archetype index set. The pointer-level (not second-copy) nature is the one constant kept.
- **Setup** — the structure-creating steps (`create papers/`, `create MATERIALS_INDEX.md`) are dropped; the scaffold owns repo birth. What remains: ensure the paper-branch config values and the CLAUDE.md skill references are in place. Added an honest fallback for repos predating v4 scaffolding — flag the missing structure as a migration gap rather than hand-create one that may not match the archetype.

**Out of scope (held by the strictness bar).** The deeper index-axis redesign — topic/task keying, push-vs-pull, catalogue-vs-brief — is the **separate AdmWorkFMM track** (`deferred_items.md`, June 4), not folded in. The document branch's `inputs/` model (`document_processing_skill.md`) and `agent_research_verification`'s `papers/` model are the next units of step 3; the branch skills reference `MATERIALS_INDEX` by name, not by column shape, so this single-file commit passes Tier 1 reference-resolution standalone — semantic alignment of their row-writing rides those units. Step 0 triage and the status framework untouched. Carries the v2.0.0 floor.

## v4 — bin-1 placement slice — June 6, 2026 — writing skills go archetype-blind on output placement

**Completion-frame step 2.** Makes placement-producing skills **archetype-blind** per the settled 2026-06-05 decision (`deferred_items.md`): a skill never hardcodes or infers an output home — it asks where the deliverable lands and suggests by reading the repo's `FOLDER_MAP`s. Behavioral for the writing workflow; a one-line removal for the tracker. Files changed: `writing_drafting_skill.md`, `writing_skill.md`, `project_tracker_skill.md` (all v2.0.0 floor).

- **`writing_drafting_skill.md`** — new Key rule *Placement is asked, not assumed*, with hooks at branch creation (step 1) and merge (step 12). Additive: the skill named no containing folder before, so this fills the missing placement step rather than removing a hardcode. Hierarchical draft-file naming unchanged (its own filename scheme, not a folder rule).
- **`writing_skill.md`** — new *Deliverable placement* setup parameter in the canonical params list.
- **`project_tracker_skill.md`** — removed the literal `Drafts/` from `TRACKED_LOCATIONS`; the recursive `FOLDER_MAP.md` scan already covers deliverable folders wherever the archetype places them. Closes the `Drafts/`-entry deferral the 1e-rename note logged.

**Out of scope (logged, by the strictness bar).** `finish_session`'s generic "drafts" vocabulary (not a path-driven scan) — left. `materials_processing` (`papers/`), `document_processing` (`inputs/`), `agent_research_verification` (`papers/`) are placement-and-index models → the index slice (step 3). `audit_repo` `DELIVERABLE_FOLDERS` → build-the-audit (step 4). No `CamelCase`/`AboutFolder` residue in these three files. Carries the v2.0.0 floor.

## v4 — Stage 1, sub-unit 1c — June 6, 2026 — `PROJECT_SETUP.md` Part A rewired onto the archetype system

**Part A now runs archetype triage → scaffold instead of building the pre-archetype structure.** Wires in the kit-resident triage (`new_repo_setup.md`) and the per-archetype scaffolds so a new repo is born correctly structured, declared, and indexed. Files changed: `PROJECT_SETUP.md`, `CLAUDE_template.md` (both v2.0.0 floor).

**`PROJECT_SETUP.md` Part A flow:**

- **New Phase 3 — Archetype triage**, between Collaborators (Q5) and Skills Activation. Runs `new_repo_setup.md` Steps 1–2: intent questions that lean on Q2 (overview) / Q3 (question) and ask only the disambiguating remainder (the research-vs-operation seam), then **propose the archetype + variant/stage and STOP for confirmation** before anything is built. Confirmation captures the variant/stage and the named work-unit(s) the scaffold and spec need. Index definitions are explicitly deferred to the three `*_archetype_spec.md` files ("described there first").
- **Skills Activation renumbered to Phase 4**, now reading the **confirmed archetype**: always-active group ships unconditionally, the single archetype spec is fixed by the confirmed `type` (NONE keeps none), optional clusters proposed against Q1–Q5 + the archetype.
- **Old Phase 4 (Project Structure, Q9–Q11) deleted.** Q9 (deliverables → `Drafts/`) absorbed into the triage's work-unit capture; Q10 (background docs) dropped — inbound material now has a born home (the archetype reference layer + universal `workspace/_import_staging/`); Q11 (working format) relocated to Phase 5 as a working-conventions choice, not a structure one.
- **Setup actions collapsed** from build-the-folders/create-the-starter-files to: generate CLAUDE.md (declaration filled from the confirmed triage) → **scaffold the confirmed archetype** per its `*_setup_scaffold.md` (folders + index set + `FOLDER_MAP` stubs + universal layer) → copy the curated subset (+ `LastSkillUpdate/` snapshot) → cluster-conditional starter files the scaffold doesn't own (`references.bib`, agent-outputs trackers, Q8a tracking docs) → STATUS.md (records the archetype) → save the curation conversation → commit → summarize. The flat-vs-two-subfolder layout now defers to `structure_conventions.md`; the `KIT_FOLDER` substitution note is kept.

**`CLAUDE_template.md`:**

- **Repository Structure table → pointer** (re-homed to 1c from 1d). The concrete folder/file table and its "Used by" dependency column are replaced by prose pointing to the repo's archetype spec (folder model), `structure_conventions.md` (universal layer), and each folder's `FOLDER_MAP.md` (contents) — the distributed-index model is the authoritative reference, and a mirrored table goes stale as a born-minimal repo grows. The working-conventions "Repo file listing" bullet that pointed at the removed table was updated.

**All-or-nothing drift swept (the v3.2-era residue 1b logged).** Three sites still asserted "all-or-nothing per cluster," stale against the granularity relaxation in `skills_curation_skill.md`'s body: `PROJECT_SETUP.md` Phase 4 lead-in, the `PROJECT_SETUP.md` Appendix curation row, and the `CLAUDE_template.md` curation row. All three (plus the paired "sequential ask" and "only cluster warranting per-skill drill-down" framing) rewritten to the relaxed rule — cluster-level proposal, free per-skill decision — naming the pre-v3.2 predecessor per the critical-eyes discipline.

**Resolves the v4 open design items for 1c** (Q9–Q11 reconciliation; Repository Structure table-vs-pointer). **1f confirmed separate**: the template's remaining structure-prose (Naming/Document-Format vocabulary, hierarchical-draft naming, Drafts/Archive model, the 1a Naming banner) stays untouched here — 1c did only the critical-eyes minimum around the table — and rides a later focused pass / the writing-placement redesign that owns the Drafts pieces.

**Out of scope (left for future work).** Part B/C still carry pre-archetype folder residue (`papers/`/`Drafts/`/`inputs/` in Part B Step 2b, the audit default scope, the Step 10 housekeeping examples); these are outside 1c's Part-A footprint.

---

## v4 — Stage 1, sub-unit 1b — June 6, 2026 — `skills_curation_skill.md` learns the single-select archetype axis

**Additive (no behavioral change to existing cluster curation).** Teaches the
curation workflow to act on the archetype declaration that 1d began emitting.
Two coupled jobs: (a) register the new always-active **Repo structure and
archetype** cluster in this skill — it wasn't mentioned before — and (b) wire
the single-select spec pick. The two universal convention files
(`naming_conventions.md`, `structure_conventions.md`) join the always-active
group and ship to every repo, NONE included — not a pick. The archetype spec is
the existing per-skill in-cluster pick, *constrained* to exactly the one spec
matching the repo's declared `type` (NONE keeps none); the other two specs are
strays the delta removes. Reuses the existing pick pattern — **no third curation
mode** (per the closed decision to reuse, not invent).

**Where it threads in (additive edits only):**

- **Always-active framing** — the Repo structure and archetype cluster added to
  the always-active group; new paragraph names the always-active-*but*-single-
  select nuance: the cluster always ships (no activate/skip ask), while the one
  spec inside it is fixed by the declaration, not proposed against signals.
- **Step 1 (signal sources)** — the archetype is the exception to
  "signals drive the proposal": its pick is *read* from `CLAUDE.md`'s
  `archetype.type` frontmatter (Part A: the type the new-repo triage just
  confirmed and the scaffold wrote; Part B/C: the existing `CLAUDE.md`). The
  skill reads the declaration; it does not run triage or write it.
- **Step 3 (present)** — a derived archetype-resolution block precedes the
  optional-cluster proposal: state the kept spec (or none) and the strays
  removed. Mismatch — declared spec absent, NONE-carries-a-spec, multiple specs
  not reducing to the declared one, or no declaration at all — **warns and names
  the fix, proposes normalizing to the one (or none), and does not block**, the
  same stance the skill takes on orphaned intra-cluster dependencies.
- **Steps 5–6 (delta, apply)** — conventions always in; matching spec
  ADD-if-missing / UNCHANGED-if-present (version skew rides the existing Part C
  Step 3 classification — no new machinery); strays REMOVE; NONE adds no spec.
  Stray specs are hard-removed like a deactivated cluster's files.
- **Step 7 (STATUS.md)** — the cluster-activations block records the declared
  archetype (`Repo archetype: <type> (variant, spec vX.Y.Z)` / `NONE`); the
  always-active line gains the repo structure conventions.
- **"Does NOT cover"** — explicit boundary: this skill consumes the declared
  type and acts on it; it does not run the triage, write the declaration, or
  define spec contents (those are `new_repo_setup.md` / the scaffold / the three
  `*_archetype_spec.md` files).

**Resolves the v4 open design item "single-select curation mechanics"**
(ask/confirm flow, Part C version-skew handling, stray removal). The
declaration-set flow and Part A scaffold wiring remain 1c's.

**Drift noted, not fixed (out of 1b scope, flagged for 1c).** `PROJECT_SETUP.md`
Part A Phase 3 still asserts "each optional cluster is all-or-nothing," and the
`skills_curation_skill.md` *descriptions* inside `CLAUDE_template.md` and the
`PROJECT_SETUP.md` Appendix still say "all-or-nothing per cluster" — both stale
against the granularity relaxation already in this skill's body. Logged in v4
planning for the Part A reconciliation (1c) / a later pass.

**Closure:** Tier 1 PASS — reference resolution (every cross-reference in the
edited skill resolves to a kit file: the two conventions, the three specs,
`new_repo_setup.md`, `PROJECT_SETUP.md`, `CLAUDE_template.md`,
`audit_repo_skill.md`, `STATUS_template.md`, `repo_conversations_skill.md`),
YAML parse (frontmatter unchanged, parses), cluster-consistency (the cluster
name "Repo structure and archetype" matches `CLAUDE_template.md` and
`PROJECT_SETUP.md` Part B Step 2 + Appendix exactly), version-stamp/CHANGELOG
consistency (footer carries the 1b entry at the v2.0.0 floor; this entry
prepended). Stamped at the v2.0.0 floor; final v4 stamp at cycle close.

---

## v4 — Stage 1, sub-unit 1d — June 6, 2026 — `CLAUDE_template.md` emits the archetype declaration

**Additive (no behavioral change to existing sections).** Adds the archetype
declaration — `type` / `variant` / `spec_version` — as YAML frontmatter at the
top of `CLAUDE_template.md`, so generated `CLAUDE.md` files carry the line that
propagation (which archetype spec to keep/update) and the archetype audit (what
to check the repo against) will read. Semantics are fixed in
`structure_conventions.md`; 1d sets only the surface form — **Option A**
(frontmatter, machine-first), reusing the kit's existing
frontmatter-as-machine-metadata pattern and the Tier 1 YAML-parse check. A NONE
repo declares `type: NONE` and carries no `variant`/`spec_version` (it keeps no
archetype spec). A TEMPLATE INSTRUCTIONS bullet documents the fill-in; allowed
values live in YAML comments on the block. Stamped at the v2.0.0 floor; final v4
stamp at cycle close.

**Scope — declaration only (decided this session).** The template's deferred 1e
structure-prose is NOT touched here; it is re-homed to the redesigns that own
each piece: the Repository Structure table → **1c** (the Part A integrator,
which already must decide whether the template carries a concrete structure
table or points to the specs + scaffolds + `FOLDER_MAP`); the
Drafts/Archive/version-log model and the `AboutFolder` references inside it →
**the writing/placement redesign** (the home the 1e-rename note already carved
those `Drafts/` references to); the template-owned residue (clear the 1a Naming
banner, the Naming + Document Format vocabulary, the hierarchical-draft naming) →
**a dedicated template structure-prose pass — provisional 1f (or fold into 1c;
to confirm)**, after 1c lands so it builds on 1c's structure-presentation call.
The kit continues to carry both `AboutFolder` and `FOLDER_MAP` by design until
those land.

**Reading deferred.** 1d only *emits* the declaration. Propagation's keep/update
logic (1b) and the audit's read of it (a later v4 root) are out of scope here.

**Closure:** Tier 1 PASS — YAML parse (new frontmatter parses; `archetype` maps
to `type`/`variant`/`spec_version`), reference resolution (no new file
cross-references introduced), version-stamp/CHANGELOG consistency. Body-scoped
check confirms the deferred items are untouched: the `AboutFolder` references and
the 1a Naming banner remain as the documented pending work.

---

## v4 — Stage 1, sub-unit 1e-rename — June 6, 2026 — `AboutFolder.md` → `FOLDER_MAP.md` in consumer skills

**Mechanical vocabulary reconciliation (no behavioral change).** Renames the
folder-index filename `AboutFolder.md` → `FOLDER_MAP.md` across the four
**consumer** skills that reference it without owning the structure model:
`audit_repo_skill.md` (8), `repo_conversations_skill.md` (3),
`project_tracker_skill.md` (2), `skills_curation_skill.md` (1) — 14 references.
Token-only swap, per the promoted `naming_conventions.md` / `structure_conventions.md`
(`FOLDER_MAP` is a structural file, so ALL_CAPS). Surrounding functional prose
(e.g. audit Check 3's “navigation tables” framing) is left unchanged, to ride
with each file's own redesign. Stamped at the v2.0.0 floor; final v4 stamp at
cycle close.

**Deferred, not in this sub-unit (each rides with its owning redesign):**

- The model-owning files keep `AboutFolder` for now — `CLAUDE_template.md` (10),
  `PROJECT_SETUP.md` (11), `document_processing_skill.md` (12) — they ride with
  their own structure-section redesigns. The kit therefore carries both terms by
  design until those land.
- The writing-output `Drafts/` references (`project_tracker`'s `TRACKED_LOCATIONS`
  entry and example, audit's two examples) ride with the writing/placement
  redesign (a placement-model change, not a recase). The hierarchical-draft
  naming example rides with the template.
- `MasterIndex` (index-system revision), `LastSkillUpdate`/`GeneralSkills`
  (kit-folder migration), asset PNGs, and palette color names are exempt or owned
  elsewhere.

**Closure (grep-provable, body-scoped):** zero `AboutFolder` in the live body of
the four files; every remaining CamelCase token is on the allowlist (proper
nouns, repo name, exempt assets/identifiers). The retired term survives only as
the documented predecessor in each file's version-history footer. Tier 1 PASS
(reference resolution, YAML parse, version-stamp/CHANGELOG consistency).

---

## v4 — Stage 1a — June 5, 2026 — Archetype layer promoted to the kit

**Structural (additive) promotion.** Brings the archetype + index system into the
canonical kit so each repo can carry its archetype's structure and index
definitions, and the archetype audit (a later v4 root) has an in-repo spec to
check against. Nine new files added to `LastSkillUpdate/`; two existing files
wired to register them. No deletions, no renames. Stamped at the v2.0.0 floor;
the final v4 stamp is set by the cycle-close re-baseline (per v4 planning, the
plan does not depend on whether it reads as v4 or v4.x).

**New files (all in the new always-active "Repo structure and archetype" cluster):**

- `naming_conventions.md`, `structure_conventions.md` (NEW) — the universal
  naming and structure layers, kept in **every** repo including NONE. Promoted
  from the kit-design layer and scrubbed of kit-design meta (status notes,
  `deferred_items.md`/`index_redesign` pointers, "deferred to the archetype
  build" sections, the "four repo types" framing → research/coordination/
  operation/NONE). The two archetype-leaning governance clauses degrade
  gracefully for NONE. The universal **import protocol** (`workspace/_import_staging/`)
  lives here, not in any one archetype.
- `research_archetype_spec.md`, `coordination_archetype_spec.md`,
  `operation_archetype_spec.md` (NEW) — the three full archetype specs, kept
  **single-select** (one per repo, by declared `type`; NONE keeps none).
  Scrubbed to operational invariants only: the restructure playbooks and
  "open questions / out-of-scope" tails were cut (restructure-time/kit-design,
  not audit-time invariants; the north-star/acceptance test was preserved into
  each spec's §1); grounding war-stories generalized (rules kept, repo names and
  provenance dropped); named sibling-spec pointers generalized so none dangles
  when a repo keeps one spec. Operation's reliability scale carries six levels
  (Citable / Validated / Under construction / Working draft / Background /
  Flagged) — Working draft = your own unfinished output (route to citable:
  finish/publish); Background = external consult-but-unvalidated (route: verify);
  plus the borrow-is-not-citing rule for cross-output recirculation.
- `new_repo_setup.md` (NEW) — the birth-time archetype triage + scaffold.
- `research_setup_scaffold.md`, `coordination_setup_scaffold.md`,
  `operation_setup_scaffold.md` (NEW) — the three birth skeletons. All three
  create `workspace/` with its baseline subfolders (required by the
  always-active skills). The research scaffold was rebuilt to match its spec
  (prefixed `<line>/` line-container, never a bare `draft/` at root). The triage
  and three scaffolds are **kit-resident birth tools** — read from the kit at
  new-repo setup, never copied into a content repo.

**Files changed:**

- `CLAUDE_template.md` — added the always-active "Repo structure and archetype"
  cluster (two convention rows + a single-select archetype-spec placeholder row
  with substitution/NONE comment + the kit-resident birth-tools note). Added an
  authoritative banner to the legacy "Naming Conventions" section: the convention
  files govern; where the section still teaches the older vocabulary (CamelCase
  folders, `AboutFolder.md`, `Drafts/`/`Archive/`) the conventions win — pending
  reconciliation in sub-unit 1e. Part A flow untouched.
- `PROJECT_SETUP.md` — added the matching "Repo structure and archetype"
  files-to-copy block (Part B Step 2) and Appendix inventory entry. Part A flow
  untouched.

**Deferred (logged in v4 planning):**

- **1c** — rewrite Part A to run the archetype triage + scaffold and reconcile
  Q9–Q11 / the Setup-actions folder-building (Part A still builds the
  pre-archetype structure).
- **1e** — reconcile naming/structure vocabulary across **all** skills plus
  `CLAUDE_template.md` and `PROJECT_SETUP.md` (the `AboutFolder.md` → `FOLDER_MAP`
  rename, the template's structure sections). North star: every skill carries
  the naming/structure integration; where naming/structure disagree, the
  conventions win.

---

## v3.1 — May 28, 2026 — Visuals workflow promoted to kit; five-chat agent-research pattern; assorted skill additions

**Minor (additive) consolidation.** Absorbs pending work swept from four content repos (AdmWorkFMM, AITaxBID, GrayListPan, SimplifiedRegimen). No renames, no deletions, no externally-breaking changes — content repos receiving v3.1 gain a new skill and gain sections in existing skills; nothing they hold needs fixing.

**New skill:**

- `visuals_workflow_skill.md` (NEW, v3.1) — three-stage workflow (sketch-plus-description in markdown → review → SVG iteration post-merge) for authoring visuals embedded in markdown deliverables. Authored as a generic candidate in GrayListPan (2026-05-14), then hand-copied into AdmWorkFMM, AITaxBID, and SimplifiedRegimen ahead of kit propagation. All four copies were content-identical at consolidation (modulo one trailing newline), so promotion is a clean single addition with no version to reconcile.

**Files changed:**

- `agent_research_verification_skill.md` (v1.0 → v3.1): promoted the five-chat operating pattern (drafter / researcher / retriever / source-processor / verifier) to canonical, replacing the prior eight-step single-operator workflow. Adds the session-start ritual (complain-but-don't-block, with optional `[override: <reason>]` marker), the Drafter→Researcher handoff packet, a researcher-produced multi-candidate sources table, the iterative-pass retrieval workflow with substitution logging, sequential source-processing (papers protocol then document-processing protocol), the verifier-doesn't-retrieve rule, a per-dive source-folders question, a two-table verification body (academic / non-paper), the lazy workflow-notes artifact with paired `ToDoAndrea.md` logging, and the `WORKFLOW_SKIPS.md` cross-dive register with three-or-more-dives pattern surfacing. Source: AITaxBID (intentional redesign; was absent from AITaxBID's local CHANGELOG, recorded here).
- `marta_writing_voice_skill.md` (v2.1 → v3.1): Section 8 gained 8.6–8.9 (framing/wording lessons from Marta's 2026 Knowledge Agenda deck edits — lead-with-the-objective and she-rewrites-objectives-herself; directive deliverable-shaped verbs for flagship work; redistribution-as-headline, authoritative labels, anchor-to-named-IDB-initiatives); Section 9 gained 9.13 (when a deck can't tell one story, make structure explicit — numbering as fallback, reconciled with 9.3). Source: AdmWorkFMM. NOTE: this revision adds to both the prose half (Section 8) and the slide half (Section 9) — logged as a split-candidate signal for a future structural-redesign session.
- `skill_authoring_skill.md` (v1.0 → v3.1): Step 7 generic-candidate clause — new skills add a row to the project's CLAUDE.md under a "Project-local skills (created in this repo, pending consolidation)" section, with a suggested-cluster column. Source: GrayListPan.
- `andreas_palette.md` (v1.2 → v3.1): cross-reference pointing visuals authoring to `visuals_workflow_skill.md`. Source: SimplifiedRegimen.
- `fmm_coordination_slides_skill.md` (v1.3 → v3.1): new "Diagram source: TikZ vs. SVG" subsection cross-referencing `visuals_workflow_skill.md`. Source: SimplifiedRegimen.
- `writing_drafting_skill.md` (v1.0 → v3.1): `visuals_workflow_skill.md` added to the "Composition with other skills" list. Source: SimplifiedRegimen.

**Not actioned this consolidation (deferred):**

- GrayListPan's `notes/fmm_docx_image_workarounds.md` requested two image-embedding bug fixes in `fmm_word_preamble.js`. Deferred to its own focused session — it's code work no bundle staged, and folding it in would widen this otherwise-additive atomic commit. Logged in CONSOLIDATION_NOTES.
- GrayListPan's `AboutFolder.md` (repo-local curation history) — not a kit file; dropped.
- `marta_writing_voice_skill.md` prose/slide split — flagged as a structural-redesign candidate, not actioned here.

---

## v3.0.1 — May 14, 2026 — Hot-fix: stale `paper_processing.md` references in four skill bodies

**Patch fixing drift from the v2.1.7 paper-processing decomposition split.** The v2.1.7 split renamed the single-file `paper_processing.md` to `paper_processing_skill.md` (triage) plus `paper_processing_academic_skill.md` and `paper_processing_institutional_skill.md` (protocols). The split-time wiring updated `CLAUDE_template.md` and `PROJECT_SETUP.md`, and the v2.1.10 naming sweep handled file renames across the kit — but neither pass swept inbound references from other skill *bodies* to the old name. As a result, four skill files continued to reference the obsolete filename in live content (not in trailing markers, not in CHANGELOG history — in active prose that agents read and follow).

**Surfaced by content-repo agents during the in-flight v3.0 propagation to `admwork`, `aitaxidb`, and `simplifiedregime`.** Agents flagged the inconsistency between filenames in `skills/` (which match the v3.0 naming convention) and references inside skill bodies (which still pointed at the pre-split name). The fix is text-only — pure rename of `paper_processing.md` → `paper_processing_skill.md` at each site, no behavioral change.

**Files changed:**

- `brainstorming_skill.md` (v1.1 → v1.2): one occurrence in the hand-off list at the end of the skill.
- `document_processing_skill.md` (v1.2 → v1.3): two occurrences — the YAML frontmatter `description` field (which is read by skill-loading machinery), and the body's "What This Skill Covers vs. Paper Processing" section.
- `project_tracker_skill.md` (v1.1 → v1.2): one occurrence in the downstream-pipelines bullet list.
- `repo_conversations_skill.md` (v1.1 → v1.2): one occurrence in the consumer-skills list.
- `CHANGELOG.md`: this entry prepended.

**Files unchanged:**

- All other skill, code, and asset files. The four target files were the complete set of files with the stale-reference pattern, as confirmed by a word-boundary regex sweep of all `.md` files in `LastSkillUpdate/`.
- `CLAUDE_template.md`, `PROJECT_SETUP.md` — already correct; their references to `paper_processing.md` are in the trailing "Last updated" markers (historical record, not live instructions).

**Verification.** Post-patch, zero bare `paper_processing.md` references remain in any live skill body across the kit. Trailing markers, CHANGELOG entries, and historical narrative prose that name the pre-rename filename are preserved by design (they document the rename rather than instruct against it).

**What this patch does NOT do.**

- **No broader audit of inbound references from v2.1.10 + v2.1.12 renames.** The other ten renames in v2.1.10 (and the one in v2.1.12) may have left similar inbound-reference drift in other skill bodies. This hot-fix addresses only the bug surfaced during the in-flight propagation; a comprehensive sweep of all inbound references from all v3.0-cycle renames is deferred to a follow-up audit session, ideally bundled with whatever other hygiene findings emerge from the current propagation round.
- **No procedural change to prevent recurrence.** The structural lesson — renames need an inbound-reference sweep, not just a file-level rename — is real, but codifying it as a checklist item in `skill_authoring_skill.md` or the consolidation workflow is a separate decision, not bundled here.

**Why this is v3.0.1 and not v3.1.** v3.0.1 is a patch-level fix to v3.0's deliverables (resolving drift that v3.0 cycle introduced and missed). v3.1 was the planned follow-up cycle for v3.0's deferred items; v3.1 has been closed without action (see `v3.1_planning.md` and `deferred_items.md` at repo root). Future cycle work continues under v3.2 or later. This hot-fix is correctly numbered as a patch of v3.0, not a cycle in its own right.

---

## v3.0 — May 14, 2026 — Structural coherence: decomposition, naming, architecture, frontmatter, curation, meta-skill

**The kit's first structural-coherence cycle.** v3.0 is one piece of work — the cycle in which the skills kit became coherent at the structural layer: skills decomposed where they had two protocols underneath one filename, names harmonized across instruction files and templates and assets, document-generation formats restructured into a uniform skill+preamble pattern with a canonical color source, frontmatter audited and sourced from observed phrasings, a per-propagation per-cluster curation workflow introduced to replace the v2.0.1 full-kit-by-default convention, a cluster completeness invariant named and enforced, and a meta-skill promoted into the kit so the conventions travel with every content repo. The cycle ran across nine numbered patches (v2.1.7 through v2.1.15) over the period May 13–14, 2026; the patches are commits-of-convenience reflecting how the work was shipped across sessions, not conceptually distinct deliverables. Future readers should treat v3.0 as one substantive restructuring, with patch numbers as the audit trail of when each piece landed.

## How v3.0 differs from v2.2

v2.2 was an **additions** cycle (working-conventions additions, audit-repo skill, brainstorming, STATUS.md, finish-session). v3.0 is a **restructuring** cycle — almost everything v3.0 ships is a redesign of what already existed. The two cycles ran in parallel for a while; v2.2 closed at v2.1.6 (May 13, 2026) and v3.0 opened with v2.1.7 the same day. Both ship to content repos in the combined v2.1 + v2.2 + v3.0 propagation that follows this cycle's close.

## The seven substantive pieces

### 1. Decomposition

Two skills with branching protocols were split into triage + protocol files (shipped across v2.1.7 and v2.1.8).

`paper_processing.md` became three files: `paper_processing_skill.md` (triage), `paper_processing_academic_skill.md` (Protocol A — academic papers), `paper_processing_institutional_skill.md` (Protocol B — institutional documents). `writing_skill.md` became `writing_skill.md` (triage, name preserved), `writing_notes_skill.md` (Protocol 1 — reading + note-taking as one coupled operation), `writing_drafting_skill.md` (Protocol 2 — drafting with branch workflow, scale check, hierarchical naming, assembly cycles).

**The decomposition rule named during v2.1.7, refined by Phase 2 audit:** a skill is a split candidate when (a) it has a clear triage step routing to two or more substantively different protocols, (b) the protocols evolve asymmetrically over time, and (c) typical invocations load only part of the content. **All three** conditions, not just one. Size alone is not a criterion. Reference skills (style guides, format references, template guides) do not split even when large — they're consulted by lookup, not followed end-to-end. Linear workflows do not split even when long. Mode parameters (audit-mode vs. repair-mode in `audit_repo_skill.md`) are not alternative protocols — mode is a parameter, not a branch.

**One deferred split, deliberately:** `marta_writing_voice_skill.md` has slide-deck patterns in Section 9 structurally distinct from prose patterns in Sections 1–8 and 10. The skill itself says "Don't over-apply these rules outside of slide decks." But the file is in active construction — Marta gives feedback on real documents and patterns accrete in whichever section fits. Splitting a file under active construction risks fragmenting where new content lands. Revisit when the file stabilizes (deferred to v3.1).

### 2. Naming

Ten renames applied as one atomic commit (shipped in v2.1.10), plus one further rename in v2.1.12 (`word_preamble.js` → `fmm_word_preamble.js`) caught when cluster restructuring laid the format-preamble pairs side by side. The full rename table is preserved in the v2.1.10 and v2.1.12 entries.

**The convention codified during v2.1.11:**
- `_skill.md` for instruction files Claude reads and follows (lowercase, underscores)
- `_template.md` for repo templates (lowercase suffix, case-preserved prefix where the prefix is an established identifier — `CLAUDE_template.md`, `STATUS_template.md`)
- plain `.md` (descriptive name, lowercase) for assets like `andreas_palette.md`
- `.tex` / `.js` for code resources, with `_preamble` suffix where they pair with a skill, and a format prefix (`fmm_`, `academic_`) matching the paired skill's prefix

The "_Profile" suffix on the three voice files (which had previously implied a sub-category distinct from skills) was rejected. The test for "is this a skill?" is "does Claude read this and follow guidance from it?" — voice profiles meet that test. The renames promoted them to first-class skills.

**Side-fix during the sweep:** a stale `skills/paper_processing.md` reference in `CLAUDE_template.md` was caught by the Tier 1 check (drift from the v2.1.7 split that wasn't caught at split-time). The decomposition rule from v2.1.7 was sound; the wiring update was incomplete. The combination of decomposition (Piece 1) and naming sweep (Piece 2) in the same cycle is what made the gap visible.

### 3. Document-generation architecture

The kit's five document-generation formats (FMM Word, FMM LaTeX paper, academic LaTeX paper, academic slides, FMM coordination slides) restructured into a uniform **skill + separate preamble file** pattern, with `andreas_palette.md` as the canonical color source (shipped in v2.1.9).

**Five new files** anchor the pattern: `andreas_palette.md` (the canonical palette — names, hex/RGB, character notes, aesthetic principles, authoritative list of files that mirror it), `fmm_paper_latex_skill.md` (closes the orphan-preamble gap left by `latex_preamble.tex` having no skill driving its use), `academic_paper_preamble.tex`, `academic_slides_preamble.tex`, `fmm_coordination_slides_preamble.tex` (extracted from inline preambles in the corresponding skills).

**Palette names reconciled by union, not intersection.** The kit had drifted: slide skills had evolved palette names (`SoftBlue`, `WarmCream`) that the document files didn't have; `fmm_coordination_slides_skill.md` had both `LightBluePale` and `SoftBlue` defined with identical RGB (genuine duplicate definition). The reconciliation kept the slide-family names where duplicates existed (more descriptive: `WarmCream` over `BgColor`; `SoftBlue` over `LightBluePale`) and ensured all five consuming files now define the same 8 palette colors with identical RGB values and identical names.

**The new "Colors default to Andrea's palette" rule** in `CLAUDE_template.md` plus the **atomic-commit color-sweep protocol** (six files to update together when adding/changing any color) close the drift bug that produced the "random default Word doc" symptom before the cycle.

**Architectural decisions worth preserving:**
1. Every format gets skill + separate preamble (rejected the mixed pattern and the everything-inline pattern). Decisive argument: the color-sweep protocol works only if preambles are separate files.
2. Palette names reconciled by union, not intersection. Nothing dropped.
3. Audit lives in the generic `audit_repo_skill.md` as a parameterized Check 8 with `PALETTE_FILE` parameter (default None — skipped in repos without a palette), not in SkillPropagation's CLAUDE.md, so the kit-audit capability is available to any repo that adopts a canonical palette.
4. Implementation utilities (`Black`, `White`, `AltRowShade` in `fmm_word_preamble.js`) stay local to that file and are not promoted to `andreas_palette.md`. The palette is for design colors, not every hex value used in the codebase.
5. The misleading `\input{latex_preamble.tex}` usage comment was corrected. The actual pattern is copy-paste at generation time — a file beginning with `\documentclass` can't be `\input{}`'d (would break compilation). The kit had been getting away with this only because users were treating it as copy-paste in practice.

**The reading that won:** figures travel between academic papers and FMM policy notes — same chart, two destinations. That's why `academic_paper_preamble.tex` now defines Andrea's palette (for figures only, not for document chrome). Reading B (aesthetic travels) won over Reading A (separate visual worlds).

### 4. Frontmatter and trigger language

Twelve skill files that previously lacked YAML frontmatter now carry `name:` and `description:` fields (shipped in v2.1.11). The drafts were generated by Claude from body content, presented batch-by-batch, approved.

**The trigger-language discipline named during v2.1.9 and applied in v2.1.11:** the `description:` field should match observed user phrasings, not designer assumptions. Trigger phrasings come from how Andrea actually invokes the work, captured in the body of skill files and in conversations, then surfaced into frontmatter to make discovery reliable. The `skill_authoring_skill.md` promoted in v2.1.15 codifies this convention for all future skill writing.

**Coverage decision recorded in this stamp:** v2.1.11's audit covered the twelve skill files that previously lacked frontmatter entirely. The thirteen skill files that already had frontmatter were not re-validated against observed phrasings. v3.0 accepts this coverage as sufficient: the thirteen existing descriptions are not obviously broken, and Claude generally figures out which skill applies even when descriptions aren't perfectly tuned. No separate v3.1 audit pass on the existing thirteen is planned. If specific descriptions surface as failing in practice, they get fixed in normal skill-update flow rather than as a batch audit.

**The asset-vs-skill naming convention codified during this audit:** `_skill.md` for instructions, `_template.md` for templates, plain `.md` for assets like `andreas_palette.md`, `.tex` / `.js` for code resources with `_preamble` suffix where they pair with a skill. The convention applies forward; existing files conform.

**Bug caught by Tier 1 before commit:** initial frontmatter drafts used Python-style `\'` escapes for apostrophes inside double-quoted YAML strings. YAML doesn't recognize `\'` as a valid escape — the strings would have failed to parse. PyYAML parse check at Tier 1 caught all 8 affected files; fix was to remove the backslashes (apostrophes need no escape inside double-quoted YAML). The episode reinforces why Tier 1 includes machine-parseability checks, not just human-readable inspection.

### 5. Curation workflow

The most substantial architectural change in v3.0 (shipped in v2.1.13). Replaces the v2.0.1 full-kit-by-default convention with **per-propagation per-cluster curation**.

**The change.** At each application point (Part A new-project setup, Part B existing-repo integration, Part C kit propagation), Claude proposes which clusters should be active based on project signals (questionnaire for Part A; CLAUDE.md + STATUS.md + commits for Part B; STATUS.md + commits + conversations for Part C — explicitly NOT the current `skills/` folder contents). Andrea confirms or overrides cluster by cluster. The activated subset is what lands in `skills/`; clusters that were active but are now inactive have their files hard-removed.

**The cognitive contract.** Cluster-level granularity is enforced as a non-negotiable rule. Andrea named the underlying principle during Session 4: clusters are the resolution that fits in one head; per-skill drill-down sits below that resolution. The compromise: this repo does this cluster, or it doesn't. The only exception is Final-production formats, where the five format-pairs are independent rather than a coherent workflow.

**The two groups.** The kit's seven functional clusters from v2.1.12 collapse at the curation layer into: **always-active group** (palette, repo and session infrastructure, brainstorming, kit metadata — one infrastructure-layer group, shipped without ask) and **four optional clusters** (Source material; Writing and deliverables; Voice and style; Final-production formats with per-format-pair sub-asks). The seven-cluster functional structure is preserved in `CLAUDE_template.md`'s Skills inventory — functional reading and curation reading serve different jobs.

**The cluster completeness invariant.** Andrea named a structural constraint during Session 4: when something gets activated, its dependencies must be either on the always-active group or in the same cluster. This is a design-time invariant on the kit, not a runtime check during curation. Audit ran against all 25 kit-side skill files at the time: 36 raw cross-cluster references found, 35 soft (descriptive prose, hand-off notes, "see also" references, mirror lists), one hard violation: `finish_session_skill.md` (always-active) Step 2 invokes `branch_workflow_skill.md` (then in Writing cluster) as a required action. Fix: `branch_workflow_skill.md` promoted to the always-active group. The invariant is now enforced by `audit_repo_skill.md` Check 11 (SkillPropagation-only) going forward.

**Critical-eyes rewrite discipline.** When a structural reform lands, the *language* of surrounding text must update too — not just the mechanics. Andrea named this during Session 4. Applied during the `PROJECT_SETUP.md` rewrite in v2.1.13: every "full-kit-by-default" sentence rewritten (not annotated); the seven cluster sub-tables in Part A Phase 3 cut entirely (they duplicated `CLAUDE_template.md`); Q6 reframed from informational to curation-conversation opener; the v2.1.12 forward-pointer note deleted (the future arrived); the Part C v2.0.1 principle named as the predecessor being replaced. The discipline is now codified in `structural_redesign_skill.md` as a non-optional step of redesign sessions.

**The curation conversation is saved.** Per Step 8 of `skills_curation_skill.md`, every curation conversation is saved to the repo's `workspace/conversations/` via `repo_conversations_skill.md`, with tags `curation` and `propagation-vX.Y.Z`. STATUS.md tells future-Andrea what's active *now*; the saved conversation tells *why*. Both are needed.

**Recovery via next propagation only.** Hard-remove on deactivation. No soft-archive, no no-op-but-present. Reversibility is the next curation cycle.

### 6. Skill-authoring meta-skill

`skill_authoring_skill.md` promoted to the kit (shipped in v2.1.15). Originally lived in `starter_package/how_to_write_a_skill.md` as an authoring guide for external collaborators new to the workflow. Mid-Session-5b reframe: the starter package's audience shifted to Andrea herself, and the authoring guide is more valuable inside content repos than in the starter — so when a new skill needs drafting *inside* a content repo, Claude there has the conventions available. The promotion to `LastSkillUpdate/` makes the file propagate to every content repo via the always-active group.

**The substantive reframe encoded in the new file.** Every new skill is **born project-local**. The author's only structural decision at creation time: project-specific (lives outside `skills/`, never propagates) or generic-candidate (lives in `skills/`, logged in `skills/CHANGELOG.md` for the next discovery sweep). Cluster placement, frontmatter generalization, and kit-wide phrasing all happen at consolidation in SkillPropagation, not at creation in the content repo. This rejects the original starter-package file's framing where cluster placement was an authoring-time decision.

**Why the reframe matters.** It honors the existing infrastructure (the discovery skill's `skills/` vs outside-`skills/` distinction is already the mechanism). It scopes the author's cognitive load (one boolean at creation, not a multi-dimensional cluster decision). It puts kit-design decisions where the visibility is — the consolidation conversation has the whole kit in front of it; the content-repo author doesn't. It solves the cluster-completeness-invariant question cleanly: project-local skills aren't constrained by it; the invariant applies only after consolidation, and a violation at consolidation time is one of the things consolidation has to resolve.

**Body reorganization into seven labeled parts** (in the new skill file): general principles and conventions of the kit (Part 1, capturing all v3.0 conventions explicitly for reference); when to write a skill; what a skill file contains; workflow for drafting with Claude (eight steps; Step 2 is the project-specific-vs-generic decision; Step 7 branches save-and-wire by that decision); the downstream lifecycle (sweep → consolidation → propagation); worked example; common mistakes.

### 7. Hygiene discipline that emerged

Several hygiene-level conventions surfaced during the cycle and were codified:

**Last-updated marker consolidation discipline.** One trailing marker per skill file; prior versions preserved as numbered notes within the marker's parenthetical. Five skill files consolidated during v2.1.14 (`brainstorming_skill.md`, `finish_session_skill.md`, `project_tracker_skill.md`, `repo_conversations_skill.md`, `marta_writing_voice_skill.md` — the last also fixed a numbering regression where May 2's v2.0 change had been followed by May 13's changes stamped at v1.5 / v1.4, which was wrong). One version-marker format normalization in the same patch: `skills_curation_skill.md` v1.0 used a `## Version` section instead of the kit-standard trailing italic line — converted to the standard format.

**Atomic-commit-via-Trees-API discipline.** Multi-file commits use the Trees API (blobs → tree → commit → update ref) in a single atomic commit, not the Contents API one-file-at-a-time. v2.1.13 violated this (six Contents-API commits due to mid-session connection issues); v2.1.14 honored it, v2.1.15 honored it, and v3.0 stamping honors it. The discipline is now codified in `structural_redesign_skill.md`.

**Hygiene-fix-then-stamp pattern.** When an audit finds drift, the fix ships as a numbered patch ahead of the cycle stamp rather than folding silently into the stamp. v2.1.14 demonstrated this: Session 5a's audit found six findings; v2.1.14 fixed those six and only those six; v3.0 stamps the closed cycle afterward. The discipline keeps the audit trail reconstructible — "audit found drift → numbered patch fixed it → cycle stamp closes" is a sequence future readers can follow.

**Two-of-three threshold for workflow-invariant audit check extraction.** Check 9 (agent outputs, v2.1.12) was the first workflow-invariant check in `audit_repo_skill.md`; Check 10 (cluster-activations consistency, v2.1.13) is the second. The rule-of-three threshold for extracting these into a separate `workflow_audit_skill.md` now sits at two-of-three; a third instance triggers extraction.

**Skill-specific cluster placement reasoning, recorded:**
- `branch_workflow_skill.md` was placed in Writing and deliverables in v2.1.12 (locate by current purpose, not by anticipated future generality), then promoted to always-active in v2.1.13 to honor the cluster completeness invariant. The principle "current purpose first" still holds; the promotion was forced by an invariant violation.
- `andreas_palette.md` lives in Shared assets alone rather than tucked under Final-production formats because the palette serves three structurally different use cases (preamble mirrors, code-generated visualizations, ad-hoc visuals) and no single workflow cluster honestly contains all three.
- `skill_authoring_skill.md` is the first row of Repo and session infrastructure because it's the meta-skill that explains how the others were written.
- `skills_curation_skill.md` is the second row, also meta-level (meta about *which* skills are active in a given repo, complementing `skill_authoring_skill.md`'s meta about *how to write* skills).

## What v3.0 stamps in addition to the above

Three pieces of work land in the v3.0 stamp itself (this commit), not as separate patches:

1. **`skills_curation_skill.md` wiring gap closed.** Residual v2.1.13 drift: the skill had been added to the always-active group Files-to-copy list in `PROJECT_SETUP.md` but was missing from `CLAUDE_template.md`'s Repo and session infrastructure cluster table and from `PROJECT_SETUP.md`'s Appendix Repo and session infrastructure cluster table. v3.0 adds the missing rows (placed as the cluster's second row, immediately after `skill_authoring_skill.md` — both are meta-level skills).

2. **Skills-layout convention codified.** The invariant — `LastSkillUpdate/` lives inside the active kit folder — is now documented in `PROJECT_SETUP.md` Part A Phase 3 as the Layout convention section. The two layouts are named explicitly (flat: `skills/` for repos without project-specific skills; two-subfolder: `skills/GeneralSkills/` for repos that have `skills/[RepoSpecific]Skills/` alongside the kit). The `KIT_FOLDER` parameter names the active kit folder (default `skills/`). `audit_repo_skill.md`'s prior `SKILLS_FOLDER` parameter is renamed to `KIT_FOLDER` for kit-wide consistency. **Partial implementation:** path references throughout `PROJECT_SETUP.md` and `CLAUDE_template.md` remain literal as `skills/...` for readability; the substitution to `${KIT_FOLDER}/...` is mechanical where the two-subfolder layout applies and a head note in the Layout convention section directs the substitution. **Full parameterization of the ~225 literal `skills/` references across the two files is deferred to v3.1** — it's bounded mechanical work but requires per-reference judgment to distinguish literal paths from descriptive prose, and is better as a focused session in stages with review rather than folded into v3.0's atomic stamp.

3. **`starter_package/` refresh.** Nine patches (v2.1.7 through v2.1.15) had accumulated since v2.1.1 without a starter_package update, and the starter's framing had shifted mid-Session-5b (from "curated subset for external collaborators" to "Andrea's project-setup kit"). v3.0 mirrors `LastSkillUpdate/` wholesale into `starter_package/`, refreshes `starter_package/README.md` with the new framing, and stamps `starter_package/CHANGELOG.md` at v1.0 (the leap from v0.1 = breaking change in framing, earns the major bump).

A combined v2.1 + v2.2 + v3.0 **propagation instructions document** ships at the SkillPropagation repo root (`propagation_plan_v2.1+v2.2+v3.0.md`), self-contained so it can be dropped into any content repo and run without coordinating target repos centrally.

## Deferred to v3.1

**Marta's profile possible future split.** Slide-deck patterns (Section 9) vs prose patterns (Sections 1–8 + 10). Structural signal is real; file is in active construction. Revisit when the file stabilizes (rough estimate 3–6 months of no major edits). This is the only design-level deferral from v3.0.

**Full mechanical parameterization of `skills/` → `${KIT_FOLDER}/`** across `PROJECT_SETUP.md` and `CLAUDE_template.md` (~225 references). The decision is recorded in v3.0; the implementation is partial (Layout convention section + parameter rename + head note). The full substitution is bounded mechanical work but requires per-reference judgment to distinguish literal paths from descriptive prose. v3.1 work shape: focused session, staged in batches of 30–50 substitutions with review.

## Files changed in the v3.0 stamp itself

- `LastSkillUpdate/CHANGELOG.md`: this entry prepended
- `LastSkillUpdate/CLAUDE_template.md`: `skills_curation_skill.md` row added to Repo and session infrastructure cluster (between `skill_authoring_skill.md` and `project_tracker_skill.md`); trailing marker v2.1.15 → v3.0
- `LastSkillUpdate/PROJECT_SETUP.md`: `skills_curation_skill.md` row added to Appendix Repo and session infrastructure cluster (same placement); Layout convention section added to Part A Phase 3; trailing marker v2.1.15 → v3.0
- `LastSkillUpdate/audit_repo_skill.md`: parameter `SKILLS_FOLDER` renamed to `KIT_FOLDER` throughout (7 sites); trailing marker v1.4 → v1.5
- `starter_package/`: full mirror of `LastSkillUpdate/` (41 files replacing the prior six — `CLAUDE_TEMPLATE.md`, `PROJECT_SETUP.md`, `document_processing.md`, `paper_processing.md`, `writing_skill.md`, plus a refreshed `README.md`)
- `starter_package/README.md`: rewritten for the new framing (Andrea's project-setup kit, mirror of `LastSkillUpdate/`)
- `starter_package/CHANGELOG.md`: v1.0 entry (the leap from v0.1)
- `propagation_plan_v2.1+v2.2+v3.0.md`: NEW at SkillPropagation repo root — self-contained propagation instructions
- `v3.0_planning.md`: cycle closeout entry; cycle marked closed
- `v3.1_planning.md`: NEW at SkillPropagation repo root — opens the v3.1 cycle with the two deferred items

## Tier 1 consistency check: PASS

All references resolve. New `skills_curation_skill.md` rows in `CLAUDE_template.md` and `PROJECT_SETUP.md` Appendix mirror each other (same description shape, same placement). YAML frontmatter unchanged on all skill files (no parse risk). Cluster headings consistent across the four parallel lists (`CLAUDE_template.md` Skills section, `PROJECT_SETUP.md` Phase 3 menu, `PROJECT_SETUP.md` Files-to-copy list, `PROJECT_SETUP.md` Appendix). `starter_package/` mirrors `LastSkillUpdate/` exactly (41-for-41 file mapping). `KIT_FOLDER` parameter rename in `audit_repo_skill.md` resolves consistently across the file's 7 reference sites. No remaining `SKILLS_FOLDER` references.

## Atomic-commit discipline

Shipped as one Trees-API commit covering all files above. The fourth deliberate honoring of the discipline (after v2.1.13 violated it, v2.1.14 / v2.1.15 honored it). v3.0 closes with the discipline settling — the protocol is reliable when the connection holds.

## Cycle-level honest scope and process notes

1. **Scope expanded mid-cycle, productively.** Sessions 3.5, 4, and 5b each surfaced design-level concerns that the work itself made unavoidable. Session 3.5 expanded from "wire the new skill" to also include the cluster restructure (the new skill's placement question forced it). Session 4 expanded twice — first from "ship the curation workflow" to also include the cluster completeness audit and the `branch_workflow_skill.md` promotion (the cluster completeness invariant was named mid-session), then to include codifying the critical-eyes-rewrite discipline. Session 5b expanded from "refresh starter_package" to first promote `skill_authoring_skill.md` to the kit (the starter's audience reframed mid-session). Session 5c expanded from "stamp v3.0" to also record the skills-layout decision and ship its partial implementation. Each expansion was honest re-scoping — work-surfaced structural concerns, not adjacent items. Cycle ran longer than originally framed; output is correspondingly larger.

2. **Atomic-commit discipline violated once, honored four times.** v2.1.13 violated (six Contents-API commits due to mid-session connection issues); v2.1.14, v2.1.15, the v3.0 stamp each honored. Pattern: discipline holds when the connection holds. The discipline is now codified in `structural_redesign_skill.md`.

3. **Reason 2 boundary held cleanly in Session 5c.** Mid-session, the skills-layout implementation grew larger than originally scoped (full mechanical parameterization across ~225 references). Claude flagged Reason 2 execution risk; Andrea agreed to the partial-implementation-with-decision-recorded approach rather than push through. The full parameterization is deferred to v3.1. This is the protocol working as designed — Reason 2 is Claude's call to make, and naming it explicitly let the session land cleanly rather than ship a sprawling commit.

4. **Framing error caught at Session 5a start.** The original Session 5 plan said "run the audit checks against `LastSkillUpdate/`." But `audit_repo_skill.md` was designed for repos that **consume** the kit (with a `skills/` folder, STATUS.md cluster-activations, CLAUDE.md pointing into `skills/`), not for the source repo itself. The correct framing is a **housekeeping audit on `LastSkillUpdate/`** with checks drawn from `structural_redesign_skill.md`'s Tier 1 list. The framing error was caught at Session 5a start, corrected in the planning doc, and didn't affect the work that shipped.

5. **Sub-session split discipline.** Session 5 split into 5a (audit + v2.1.14 hygiene), 5b (skill_authoring promotion + v2.1.15), and 5c (this stamp). Three-phase commit pattern: audit → hygiene patch → cycle close. Cleaner audit trail than one large multi-purpose commit. The split is Reason 2 (execution-risk on multi-file multi-purpose commits) more than Reason 1 (cognitive load), captured honestly here so future cycles use the pattern deliberately.

---


## v2.1.15 — May 14, 2026 — `skill_authoring_skill.md` promoted to the kit

**Eighth v3.0-cycle patch (Session 5b first phase): `how_to_write_a_skill.md` is promoted from `starter_package/` to `LastSkillUpdate/`, renamed to `skill_authoring_skill.md` per the `_skill.md` convention, substantially rewritten to reflect every convention shipped in v2.1.7–v2.1.14, and placed in the always-active Repo and session infrastructure cluster. Existing wiring drift in `CLAUDE_template.md` (the v2.1.12 marker had not been bumped after the v2.1.13 `branch_workflow_skill.md` cluster move) is fixed alongside.**

**Why this exists.** The original `how_to_write_a_skill.md` lived in `starter_package/` only, framed as an authoring guide for collaborators new to the workflow. The original framing has shifted: the starter package is now Andrea's own project-setup kit (next session's refresh will mirror `LastSkillUpdate/` rather than maintain a curated minimal subset). With that reframe, the guide is more valuable as a kit skill that lives in every content repo — so when a new skill needs drafting *inside* a content repo, Claude there has the conventions available. Content-repo Claude does not have access to SkillPropagation's discipline files (`structural_redesign_skill.md`, the planning docs, the consolidation skill), so the skill-authoring conventions either travel with the kit or they don't exist in content repos.

**The reframe encoded in the new file.** The original starter-package guide treated cluster placement as an authoring-time decision. The new file does not. **Every new skill is born project-local.** The author makes one structural decision at creation time: project-specific (lives outside `skills/`, never propagates) or generic-candidate (lives in `skills/`, logged in `skills/CHANGELOG.md` for the next discovery sweep). Cluster placement, frontmatter generalization, and kit-wide phrasing all happen at consolidation in SkillPropagation, not at creation in the content repo. The file's Part 1 captures the kit's general principles and conventions explicitly for reference (naming, frontmatter discipline, decomposition principle, cluster structure with its scoping, per-propagation curation context, last-updated marker discipline, atomic-commit discipline); Part 4 Step 2 makes the project-specific-vs-generic decision the one creation-time call; Part 5 describes the downstream lifecycle (sweep → consolidation → propagation) so the author understands what happens after their `skills/` save without being asked to make those downstream decisions themselves.

**Body reorganization.** The original guide had a flat structure (when to write, what a skill contains, workflow, worked example, tips, mistakes). The new file is in seven labeled parts: (1) general principles and conventions of the kit, (2) when to write a skill, (3) what a skill file contains, (4) workflow for drafting with Claude (now eight steps; Step 2 is the project-specific-vs-generic decision; Step 7 branches save-and-wire by that decision and adds the changelog/STATUS.md logging requirement for generic candidates), (5) the downstream lifecycle, (6) worked example (updated to show the new conventions in action — no cluster decision at creation, project-specific vs generic instead), (7) common mistakes (the "cluster placement deferred" entry replaced with "cluster-shopping at creation time"; new entries for "forgetting to log a generic candidate" and "pre-generalizing for the kit").

**Frontmatter sourced from observed phrasings.** Following the v2.1.11 discipline: `description:` includes the literal phrases Andrea uses when invoking this work — "let's write a skill for this," "I keep correcting Claude the same way — can we make a skill," "this needs a skill," "we should codify this," "how should I structure this skill," "draft a skill for X." It also names what the skill does NOT cover: the consolidation workflow that moves project-local skills into the kit lives in SkillPropagation's `skills_consolidation_skill.md` and is a different shape of work, not duplicated here.

**Drift caught and fixed alongside.** The v2.1.13 patch moved `branch_workflow_skill.md` from the Writing and deliverables cluster to the Repo and session infrastructure cluster in `CLAUDE_template.md`, but the trailing version marker on `CLAUDE_template.md` was not bumped from v2.1.12 to v2.1.13 at that time. v2.1.15 catches the marker up to v2.1.15 directly, capturing the v2.1.13 cluster move in the marker's parenthetical along with the new `skill_authoring_skill.md` addition. This is a hygiene fix that lands in the same atomic commit because the same file was being updated anyway.

**Open wiring gap, flagged but not fixed in v2.1.15:** `skills_curation_skill.md` (shipped in v2.1.13) is in the always-active group Files-to-copy list in `PROJECT_SETUP.md` but is **not** in `CLAUDE_template.md`'s Repo and session infrastructure cluster row table or in the Appendix's Repo and session infrastructure cluster table. This is residual v2.1.13 wiring drift. Out of scope for v2.1.15's commit (the v2.1.15 scope is `skill_authoring_skill.md` promotion); captured in `v3.0_planning.md` for next session's housekeeping pass or for a focused patch.

**Files-to-copy and Appendix updates in PROJECT_SETUP.md.** The always-active group Files-to-copy list gains `skills/skill_authoring_skill.md` (first row, since it's the meta-skill that explains how the others were written). The Appendix's Repo and session infrastructure cluster table gains a corresponding row, also first.

**Starter package cleanup.** `starter_package/how_to_write_a_skill.md` is deleted. The starter package will be refreshed in next session by mirroring `LastSkillUpdate/`, at which point the new `skill_authoring_skill.md` will appear there automatically. Carrying the old version in `starter_package/` after promotion would be drift.

**Files changed in v2.1.15:**
- `LastSkillUpdate/skill_authoring_skill.md`: NEW — v1.0 (promoted from `starter_package/how_to_write_a_skill.md`, renamed, substantially rewritten)
- `LastSkillUpdate/CLAUDE_template.md`: v2.1.12 marker → v2.1.15; new row added to Repo and session infrastructure cluster; v2.1.13 drift caught in the marker
- `LastSkillUpdate/PROJECT_SETUP.md`: v2.1.12 marker → v2.1.15; Files-to-copy always-active group gains `skill_authoring_skill.md`; Appendix Repo and session infrastructure cluster table gains corresponding row
- `LastSkillUpdate/CHANGELOG.md`: this entry prepended
- `starter_package/how_to_write_a_skill.md`: DELETED (promoted to `LastSkillUpdate/`)
- `v3.0_planning.md`: v2.1.15 logged; Session 5b handover note updated

**Tier 1 consistency check.** New file's YAML frontmatter parses cleanly. All file references in the new skill resolve to real files in `LastSkillUpdate/` or at the SkillPropagation repo root (the body references `incoming_discovery_skill.md` and `skills_consolidation_skill.md` and identifies both as living "in SkillPropagation"). `talking_points_skill.md` referenced in Part 6's worked example is deliberately fictional. Cluster headings consistent across `CLAUDE_template.md` and `PROJECT_SETUP.md`.

**Atomic-commit discipline.** Shipped as one Trees-API commit covering all four file changes plus the starter-package deletion. The third deliberate honoring of the discipline (after v2.1.13 violated it and v2.1.14 honored it).

**Honest scope notes:**

1. **Scope held with one explicit adjacency-fix.** The original scope was promoting `how_to_write_a_skill.md` to the kit. The CLAUDE_template marker drift from v2.1.13 was caught while doing the v2.1.15 work; bumping the marker required absorbing the prior change in the parenthetical, which is a documentation hygiene fix rather than scope creep. The `skills_curation_skill.md` wiring gap was also caught but **deliberately not fixed** — that's a separate concern, captured in the planning doc for follow-up.

2. **Tier 1 check ran post-staging, pre-commit.** Per `structural_redesign_skill.md` discipline.

---

## v2.1.14 — May 13, 2026 — Last-updated marker consolidation + skills_curation_skill.md format normalization

**Session 5 Phase 1 audit hygiene fixes.** Phase 1's housekeeping audit on `LastSkillUpdate/` (Session 5 of the v3.0 cycle) surfaced six version-marker drift findings. v2.1.14 fixes them as one batch ahead of the v3.0 stamp.

**Five "Last updated" marker consolidations.** Five skill files had stacked Last-updated markers — the same drift pattern v2.1.12 caught and fixed in `audit_repo_skill.md` (v1.3) and `fmm_docx_formatting_skill.md` (v2.3). The pattern recurred because v2.1.11's frontmatter audit added new markers without consolidating the prior ones. Now consolidated per the v2.1.12 discipline (one trailing marker per file; prior versions preserved as numbered notes within the marker's parenthetical):

| File | Before | After |
|---|---|---|
| `brainstorming_skill.md` | v1.0 + v1.1 stacked | v1.1 consolidated |
| `finish_session_skill.md` | v1.0 + v1.1 stacked | v1.1 consolidated |
| `project_tracker_skill.md` | v1.0.1 + v1.1 stacked | v1.1 consolidated |
| `repo_conversations_skill.md` | v1.0.1 + v1.1 stacked | v1.1 consolidated |
| `marta_writing_voice_skill.md` | v2.0, v1.5, v1.4, v1.3.x, v1.2, v1.1 (six markers, with numbering regression) | v2.1 consolidated |

**Numbering regression on `marta_writing_voice_skill.md` fixed alongside.** The pre-consolidation chain had the May 2 substantive change stamped as v2.0 but the May 13 changes (rename + frontmatter) stamped as v1.5/v1.4 — a regression from v2.0 back to v1.x even though the v1.x changes were chronologically later. Now correctly stamped as v2.1, a post-v2.0 patch. Substance of every prior version is preserved in the consolidated marker.

**One version-marker format normalization.** `skills_curation_skill.md` v1.0 (shipped in v2.1.13) used a `## Version` section instead of the kit-standard trailing `*Last updated: ... — vX.Y ...*` italic line. Converted to the standard format for consistency with the other 25 skill files. No content change.

**Why this lands as v2.1.14 rather than rolling into the v3.0 stamp.** These are hygiene fixes that match a documented pre-v3.0 discipline (v2.1.12's "consolidate trailing markers" pattern). Stamping them as a numbered patch keeps the audit trail clean — Session 5's audit found drift, v2.1.14 fixed it, then v3.0 stamps the closed cycle. Folding them silently into the v3.0 stamp would hide that the audit found something.

**Tier 1: PASS** at commit time. All references resolve; no YAML frontmatter touched; cluster headers unchanged; six version stamps updated, six CHANGELOG-entry-style notes in the consolidated markers preserve full history.

**Files changed:**
- `LastSkillUpdate/brainstorming_skill.md`: v1.0/v1.1 → v1.1 consolidated
- `LastSkillUpdate/finish_session_skill.md`: v1.0/v1.1 → v1.1 consolidated
- `LastSkillUpdate/project_tracker_skill.md`: v1.0.1/v1.1 → v1.1 consolidated
- `LastSkillUpdate/repo_conversations_skill.md`: v1.0.1/v1.1 → v1.1 consolidated
- `LastSkillUpdate/marta_writing_voice_skill.md`: six markers → v2.1 consolidated (numbering regression fixed)
- `LastSkillUpdate/skills_curation_skill.md`: `## Version` section → trailing `*Last updated:*` line; v1.0 unchanged
- `LastSkillUpdate/CHANGELOG.md`: v2.1.14 entry prepended

---

## v2.1.13 — May 13–14, 2026

**Sixth v3.0-cycle patch (Session 4): per-propagation per-cluster curation workflow shipped — replaces the v2.0.1 full-kit-by-default convention. New `skills_curation_skill.md` codifies the workflow with cluster-level granularity as a cognitive contract. `structural_redesign_skill.md` v1.0 created at SkillPropagation root to codify the redesign protocol that ran ad hoc through Sessions 2, 3, and 3.5. `STATUS_template.md` gains a "Cluster activations (current)" block. `audit_repo_skill.md` gains Check 10 (cluster-activations consistency between STATUS.md and `skills/` contents) and Check 11 (cluster completeness invariant scan, SkillPropagation-only). `PROJECT_SETUP.md` Parts A, B, and C rewritten with critical-eyes discipline — every "full-kit-by-default" sentence rewritten, the seven cluster sub-tables in Part A Phase 3 cut in favor of pointing at `CLAUDE_template.md`, Q6 reframed from informational to curation-conversation opener, Part B Phase 2 restructured into two stages (cluster curation, then per-skill gap analysis inside activated clusters), Part C gains Step 3.5 (the curation conversation) between Step 3 (classify each file) and Step 4 (present the update plan). `branch_workflow_skill.md` moved from the Writing cluster to the always-active group to honor the cluster completeness invariant (`finish_session_skill.md` Step 2 invokes it as a required action — see below). Session 5 (final consolidation + starter_package refresh + v3.0 stamp + combined v2.1+v2.2+v3.0 propagation plan) is unblocked.**

**Why this exists.** The full-kit-by-default convention (v2.0.1) had been accumulating cost: every content repo carried every skill regardless of project shape, `skills/` folders grew over time without checkpoint, and propagation decisions anchored on what the folder *currently* contained rather than what the project *currently* needed. The v2.1.12 changelog flagged this as deferred work; Session 4 is when it shipped.

**The cognitive contract.** Cluster-level granularity is not an implementation convenience — it's a discipline Andrea named explicitly during Session 4: "the rule by cluster is enforced because those sets of tools are one package on my mind; keeping track what is there on the repo or what is not is not worth it." Clusters are the resolution she can hold in her head; per-skill drill-down is below that resolution. The compromise is: this repo does this cluster, or it doesn't. The Final-production formats cluster is the only exception, because its five format-pairs are independent rather than a coherent workflow.

**Cluster completeness invariant — surfaced and enforced.** When the curation workflow was being designed, Andrea named a structural constraint: "when something gets activated its dependencies are either on the always-active or on the same cluster." This is a design-time invariant on the kit, not a runtime check during curation. We audited the kit's 25 skill files against it: 36 cross-cluster references found, but classifying them as hard-dependency-vs-soft-reference, 35 were soft (descriptive prose, hand-off notes, "see also" references, mirror lists). One hard violation: `finish_session_skill.md` (always-active) invokes `branch_workflow_skill.md` (Writing cluster) as a required action in Step 2 (branch disposition). Fix: `branch_workflow_skill.md` promoted to the always-active group. `audit_repo_skill.md` Check 11 enforces the invariant going forward.

**Why Check 11 is SkillPropagation-only.** Content repos consume the kit; they don't define cluster structure. The invariant applies to kit design (where skills live, what depends on what), not to how a content repo uses the kit. Check 11 has the same shape as Check 8's `PALETTE_FILE` pattern — parameterized off whether the repo is SkillPropagation, skipped elsewhere.

**Check 10 is the workflow-invariant pattern's second instance.** Check 9 (added v2.1.12) was the first. Check 10 (cluster-activations consistency: STATUS.md's block matches actual `skills/` contents) is the second. The rule-of-three threshold for extracting workflow-invariant checks into a separate `workflow_audit_skill.md` now sits at two-of-three; a third instance triggers extraction. Documented in the body of `audit_repo_skill.md`.

**Critical-eyes discipline for `PROJECT_SETUP.md`.** When a structural reform lands, the *language* of the surrounding text must update too — not just the mechanics. Otherwise the codebase ends up with legacy framing alongside new logic, and readers have to figure out which layer to trust. Andrea named this during Session 4 ("this is a good opportunity to see it with critical eyes and reword it; otherwise we will have legacy design that does not make sense"). The discipline is now codified in `structural_redesign_skill.md` as a non-optional step of redesign sessions. Past instances caught by the same discipline: v2.1.9's misleading `\input{latex_preamble.tex}` comment, v2.1.10's stale `paper_processing.md` references that survived the v2.1.7 split.

**What got cut from `PROJECT_SETUP.md` Part A Phase 3.** The seven cluster sub-tables (lines 80-138 in the prior version) duplicated the Skills inventory in `CLAUDE_template.md`. Critical-eyes rewrite cut them in favor of: "the cluster structure lives in `CLAUDE_template.md`'s Skills section." Single source of truth. The cluster *names* are still listed in `PROJECT_SETUP.md` Phase 3 (one-line each) so the reader doesn't have to flip files to see what the four optional clusters are, but the detailed per-skill rows are gone. The "Default: the full skills kit is activated" sentence at the head of Phase 3 was rewritten, not annotated. The v2.1.12 forward-pointer note was deleted (it pointed at this very work as future; the future has arrived).

**Q6's role changed.** Was "Andrea's answer is informational — it does not filter the skill set. The full kit ships either way." Now: Q6 *opens the curation conversation*. The activated clusters from Q6 determine which follow-up parameter questions (Q7/Q8) fire. The follow-ups themselves are preserved verbatim (Q7a-e, Q7g-h, Q8a-b); their trigger language changed from "if X is likely to come up" to "if X cluster is activated."

**Part B Phase 2 — Gap Analysis — restructured into two stages.** Stage 1 (cluster curation) runs the per-cluster activation conversation, anchored on the existing repo's CLAUDE.md, AboutFolder.md files, existing `skills/`-like content, STATUS.md if present, and recent commits. Stage 2 (per-skill gap analysis inside activated clusters) runs the existing Missing/Covered-but-weaker/Equivalent/Stronger-in-repo classification. Skills inside deactivated clusters are not gap-analyzed — they don't belong in this repo's kit, so the question doesn't apply. If a deactivated cluster's skill has a project-specific analog in the repo, that analog stays where it is.

**Part C — Step 3.5 inserted.** Between Step 3 (classify each file) and Step 4 (present the update plan), a new Step 3.5 runs the curation conversation. Signal sources for Part C are STATUS.md, recent commits, recent conversations (`workspace/conversations/`), and CLAUDE.md — explicitly NOT the current `skills/` folder contents. Anchoring on the folder anchors on what was decided at last propagation, which is exactly what curation is designed to make a fresh decision against. Step 3 classification (Up to date / Rename target / Outdated unmodified / Outdated locally modified / New in staging / Repo-only) still runs and determines *how* each file's content changes; Step 3.5 curation determines *whether* the file is present in the repo at all. They're independent dimensions of the propagation, documented as such in the file. The core principle at the head of Part C — "the full kit propagates by default (v2.0.1)" — was rewritten as the new convention; the v2.0.1 framing is named as the predecessor being replaced.

**Staging stays as the full kit.** Andrea still stages the full kit at `skills/pending_v2.X/` before invoking Claude. Pre-curating at staging would anchor decisions on her setup-time guesses; the curation conversation is where the deliberate per-propagation decision happens. Step 1 of Part C now documents this distinction explicitly.

**STATUS.md cluster-activations block.** New section in `STATUS_template.md` between Workflow mode and Current state. Records: which optional clusters are active, sub-state for Final-production formats (Word / FMM LaTeX paper / Academic paper LaTeX / Academic slides / FMM coordination slides), the always-active group as a single line naming its contents, and the `Last curated:` date. Initial-template state is "unknown" so the first curation conversation is a required step for any new repo; defaulting to active or inactive would silently restore the old "full kit" behavior or break projects until first curation. The HTML comment on the section carries the cluster-level rule reminder.

**The curation conversation is saved.** Per Step 8 of `skills_curation_skill.md`, the curation conversation itself is saved to the repo's `workspace/conversations/` via `repo_conversations_skill.md`, with tags including `curation` and `propagation-vX.Y.Z` for findability. STATUS.md tells future-Andrea what's active *now*; the saved conversation tells her *why*. Both are needed; the save is not optional.

**The four-decisions-not-asked.** Two clusters that previously would have asked "always or optional?" got collapsed into one decision: the always-active group is one infrastructure-layer group, not three sub-clusters held to the per-cluster discipline. Andrea named this: "make them one group." Cleaner principle (some skills are infrastructure, some are project-shaped) and shorter conversation (four asks per propagation instead of seven). The always-active group is named in the curation skill and surfaced in STATUS.md as a single line.

**`CLAUDE_template.md` Skills inventory kept seven sub-tables.** Decision B in the conversation: the functional reading still matters when answering "what does this skill do?", so `CLAUDE_template.md` preserves the seven-cluster sub-table structure from v2.1.12. The collapse to "always-active group + four optional clusters" applies at the *curation* layer (STATUS.md, `skills_curation_skill.md`), not at the inventory layer. Cognitive cost of two different groupings of the same items, accepted because each grouping serves a different job.

**`structural_redesign_skill.md` v1.0.** New file at SkillPropagation root (NOT in `LastSkillUpdate/` — this skill is SkillPropagation-only and does not propagate to content repos). Codifies the redesign protocol that ran ad hoc through Sessions 2, 3, and 3.5: read the planning doc, confirm scope, read relevant kit files, propose-react-refine-propose, stage locally, Tier 1 consistency check, atomic Trees API commit, planning-doc update at close. Borrows mechanics from `skills_consolidation_skill.md` (atomic commit pattern, Tier 1 check templates) without duplicating; the new content is: scope discipline (one session = one scoped slice), planning-doc-as-source-of-truth, the close-of-session planning-doc update pattern, the critical-eyes-rewrite discipline. Session 4 is its first deliberate application. The mid-Session-4 cluster completeness audit is named as a worked example.

**Honest scope and process notes:**

1. **Scope expanded mid-session, twice.** First expansion: the cluster completeness audit (which surfaced the `finish_session → branch_workflow` violation) was not in the original Session 4 plan; it was added when Andrea named the principle "when something gets activated its dependencies are either on the always-active or on the same cluster." Audit ran, one violation found, fix shipped. Second expansion: the critical-eyes-rewrite discipline was named during the PROJECT_SETUP.md rewrite and added to `structural_redesign_skill.md` as a working convention. Both expansions were legitimate — they surfaced design-level concerns that the work itself made unavoidable — but the session is now longer than originally scoped. Captured for future Sessions: scope expansion that comes from the work surfacing structural concerns is not the same as scope expansion that comes from adding adjacent items; the former is honest re-scoping, the latter is creep.

2. **Atomic-commit discipline violated.** This patch shipped as six separate Contents-API commits rather than one atomic Trees-API commit, due to mid-session connection issues. The substance is right and Tier 1 was satisfied at each commit, but the discipline that `structural_redesign_skill.md` itself codifies was not honored for its first session of application. Captured honestly here. Future redesign sessions should use Trees API for multi-file commits.

3. **Session 4 split into 4a/4b in conversation, but shipped as one v2.1.13 commit set.** Mid-session, Claude proposed splitting into 4a (infrastructure: skills, audit, template) and 4b (PROJECT_SETUP.md rewrite) to manage execution risk on a large atomic commit. Andrea elected to push through; the split is preserved as a mental model in the planning doc but the version stamp is unified at v2.1.13.

**Files changed in v2.1.13 (six commits, mid-session):**
- `structural_redesign_skill.md`: NEW (repo root, SkillPropagation-only) — v1.0 + critical-eyes/cluster-completeness additions
- `LastSkillUpdate/skills_curation_skill.md`: NEW — v1.0 with cluster completeness invariant
- `LastSkillUpdate/STATUS_template.md`: cluster-activations block added
- `LastSkillUpdate/audit_repo_skill.md`: v1.3 → v1.4 (Checks 10, 11 added)
- `LastSkillUpdate/CLAUDE_template.md`: branch_workflow_skill.md moved from Writing cluster to Repo and session infrastructure cluster
- `LastSkillUpdate/PROJECT_SETUP.md`: Parts A/B/C rewritten with critical-eyes discipline
- `LastSkillUpdate/CHANGELOG.md`: this entry

**Tier 1 consistency check.** Each commit's staged state passed Tier 1 individually (references resolve, YAML parses, cluster headers consistent). A unified Tier 1 across the full v2.1.13 stack was not run, due to the non-atomic commit pattern.

---

## v2.1.12 — May 13, 2026

**Fifth v3.0-cycle patch (Session 3.5): new `agent_research_verification_skill.md` fully wired into the kit; Skills inventory restructured from a flat table into seven functional clusters across `CLAUDE_template.md`, `PROJECT_SETUP.md` Phase 3 menu, Files-to-copy list, and Appendix; `word_preamble.js` renamed to `fmm_word_preamble.js` for naming-convention consistency with the other format preambles; `audit_repo_skill.md` gains Check 9 — the kit's first workflow-invariant audit check; v2.1.9 architecture drift caught and corrected in the Appendix inventory. Session 4 (per-propagation per-cluster curation workflow) is the next session's primary work, ahead of what was previously Session 4 (final consolidation + v3.0 stamp), now renumbered Session 5.**

**Why this exists.** Session 3.5 started as a tightly-scoped wiring task: the new `agent_research_verification_skill.md` (drafted at the close of Session 3) needed Skills-table rows, parameter wiring, and a Check 9 entry in `audit_repo_skill.md`. Mid-session, two additional concerns surfaced that the wiring made unavoidable: (a) the flat Skills table had grown to 24 rows and was past the readability threshold, with the new skill's placement raising "where does it go?" as the wrong question — the real question was whether the list itself needed structure; (b) the new skill's placement adjacent to the format-preamble cluster surfaced that `word_preamble.js` was inconsistently named — every other preamble in the kit (FMM paper, academic paper, academic slides, FMM coordination slides) carries its format prefix, but the Word preamble didn't. Both concerns were addressed inside the same patch because their fixes touched the same files the wiring was touching anyway; deferring would have meant two propagations to content repos instead of one, and the consistency drift would have stayed visible in the propagation-ready state. Honest scope expansion, captured here.

**Why the cluster restructure.** Reading the 24-row Skills table with fresh eyes, six functional families were already visible: source-material processing (papers, documents, agent dives), writing and deliverables (writing-skill family, email, branch workflow), voice and style (the three voice profiles), final-production formats (Word, LaTeX papers × 2, slides × 2, logo asset), shared assets (the palette), repo and session infrastructure (audit, project_tracker, finish_session, repo_conversations, github_api), and thinking aids (brainstorming, with future capacity for pre-mortems and decision frameworks). The clusters were not invented — they were surfaced structure that already existed. The flat table hid them. Splitting under sub-headings makes each cluster 3-11 rows (readable on its own), gives cluster headers documentation value ("what skills do I have for X?" becomes a header-scan), and makes dependency direction visible by placement (the new agent-research skill goes under Source material *because* it hands off to the papers protocol at Step 6 — the cluster shows the relationship, not just the row description).

**Why seven clusters, not six.** "Shared assets" became its own cluster (currently one row: `andreas_palette.md`) because the palette serves three structurally different use cases — mirrored by final-production preambles, invocable from coding work (Python/R/Stata visualizations), invocable from ad-hoc visuals (SVG diagrams, charts in chat, mental maps) — and no single workflow cluster honestly contains all three. The productive-empty-bucket argument applies: future shared assets (a marta-voice quick reference, a glossary, an institutional-acronyms file) would land here naturally. Same reasoning kept "Thinking aids" standalone for `brainstorming_skill.md`: brainstorming is upstream of every workflow cluster, not part of any. Future thinking-aid skills (pre-mortems, decision frameworks, reframe-the-question) have a home.

**Cluster placement of cross-cutting skills, decided explicitly:** (a) `branch_workflow_skill.md` lives in **Writing and deliverables** rather than **Repo and session infrastructure**, because the skill exists to support the writing workflow (Protocol 2 invokes it) — locate by current purpose, not by anticipated future generality. (b) `andreas_palette.md` lives in **Shared assets** alone rather than tucked under Final-production formats, because forcing the broader use cases into the formatting cluster kept producing the "where does the palette go?" conversation. (c) `KnowledgeLogo.png` stays in **Final-production formats** because its consumers are local to that cluster (the FMM Word preamble and the FMM LaTeX paper preamble); the palette is genuinely cross-cluster but the logo isn't. Each placement is explained inline in the relevant table cell so future-Andrea sees the reasoning without having to reconstruct it.

**The rename.** `word_preamble.js` → `fmm_word_preamble.js`. Closes a gap left by the v2.1.10 naming sweep: that sweep focused on adding `_skill.md` and `_template.md` suffixes; it did not harmonize the format-prefix naming convention across code resources. The drift was visible once cluster restructuring laid the format-preamble pairs side by side — every other preamble had `fmm_` or `academic_` prefix; the Word one didn't. Single mechanical rename: file moves from `word_preamble.js` to `fmm_word_preamble.js`; references updated across `CLAUDE_template.md` (Skills table, Final-production formats unified table, color-sweep protocol, Repository Structure logo row), `PROJECT_SETUP.md` (Phase 3 menu, Phase 2 gap analysis, Files-to-copy, Appendix), `fmm_docx_formatting_skill.md` (frontmatter description + 4 body refs), `andreas_palette.md` (frontmatter description + "Files that mirror this palette" list), and the file's own header comment + Usage example.

**The new skill, fully wired.** `agent_research_verification_skill.md` (v1.0, ~417 lines, drafted at the close of Session 3) is now discoverable from every kit-side surface:
- **`CLAUDE_template.md` Skills section** — row in the new "Source material: reading and processing" cluster, placed last in that cluster (after document_processing) to reflect its Step-6 hand-off to the papers protocol.
- **`CLAUDE_template.md` Agent Research Workflow section** — new project-specific section between Document Processing Workflow and Writing Protocol for Drafts, parallel to the other workflow sections, with the four parameters (AGENT_OUTPUTS_FOLDER, AGENT_OUTPUTS_INDEX, AGENT_OUTPUTS_LESSONS, PAPERS_PROTOCOL_SKILL) named with their defaults.
- **`CLAUDE_template.md` Repository Structure** — three rows added (`workspace/agent_outputs/`, INDEX.md, LESSONS.md) with explicit "Used by" references to the new skill.
- **`PROJECT_SETUP.md` Phase 3 menu** — row in the Source material cluster table, followed by Q7g/Q7h follow-up questions (agent outputs folder, papers protocol entry point) that fire when Andrea indicates the project will run deep-research agents.
- **`PROJECT_SETUP.md` Phase 2 gap analysis (Part B)** — entry walking an existing-repo integration through the discipline check: is there a folder for agent outputs, a raw-vs-verified distinction, an INDEX, a LESSONS?
- **`PROJECT_SETUP.md` Files-to-copy list (Part B Phase 3 Step 2)** — listed under Source material cluster (the list itself was restructured to cluster-grouped format to match `CLAUDE_template.md`'s organization).
- **`PROJECT_SETUP.md` Appendix Full Skills Kit Inventory** — row in the Source material cluster table.
- **`audit_repo_skill.md`** — three new parameters added (`AGENT_OUTPUTS_FOLDER`, `AGENT_OUTPUTS_INDEX`, `AGENT_OUTPUTS_LESSONS`, all `None` defaults so repos without agent-research work skip the check), plus the new Check 9 (six sub-checks: file-set completeness per dive folder, naming-convention compliance, INDEX↔folder bidirectional consistency, verified-rows-have-verification-docs, superseded-rows-name-replacement, LESSONS.md presence when verification docs reference cross-dive error patterns).

**Check 9 is the kit's first workflow-invariant audit check.** Prior checks (1-8) enforce passive consistency: does this file exist, does this color match, does this row in the Skills table point to a real file. Check 9 enforces *workflow invariants*: does every dive have both a prompt and a raw file, does every INDEX row marked `verified` actually have a verification doc, do superseded rows name their replacements. That's a step forward in audit capability but also a complexity increase. A note in `audit_repo_skill.md` body documents the rule-of-three threshold: keep workflow-invariant checks inside `audit_repo_skill.md` until a third such check is added, then extract into a separate `workflow_audit_skill.md` that `audit_repo_skill.md` invokes. Premature extraction at one instance would be inventing generality that isn't earned yet.

**v2.1.9 architecture drift, caught and corrected.** During the Appendix restructure, the v2.1.9 document-generation work was found to be partially missing from the kit inventory: `andreas_palette.md`, `fmm_paper_latex_skill.md`, `academic_paper_preamble.tex`, `academic_slides_preamble.tex`, and `fmm_coordination_slides_preamble.tex` had been added to `LastSkillUpdate/` in v2.1.9 but were never propagated to the Appendix or to the Files-to-copy list. A content repo doing fresh Part B integration would have missed them. Caught during the cluster restructure (each preamble cluster row pointed at a file the Appendix didn't list), corrected in the same commit. This is exactly the kind of bug cluster-grouping makes visible — five orphan rows in a flat table can hide; the same gap in a clustered table where preamble pairs are visibly adjacent stands out.

**Cleanup riding along in audit_repo_skill.md.** Two side-fixes for hygiene: (a) two stale `paper_processing.md` references corrected to `paper_processing_skill.md` (drift from the v2.1.7 split that wasn't fully caught by v2.1.10), and (b) duplicate "Last updated" markers from v1.1 and v1.2 consolidated into a single v1.3 marker. The v2.1.10 sweep's "consolidate trailing markers" discipline was applied to all files touched in this patch — `fmm_docx_formatting_skill.md` similarly consolidated its v2.2 and v2.1 markers into a single v2.3 marker with prior version notes preserved as numbered prior-version entries.

**Three design decisions worth preserving in the changelog:**

1. **Cluster-restructure scope expansion was accepted explicitly.** The v3.0 working conventions warn against scope creep ("Per-session focus. Don't expand scope mid-session without explicit re-scoping"). The cluster restructure was an explicit re-scoping mid-session: the new skill couldn't be cleanly added to a 24-row flat table without raising "where does it go?" as the wrong question. Re-scoping was discussed, costs surfaced, decision made. Captured for future audits as the legitimate-scope-expansion pattern: when the wiring work *itself* surfaces a structural issue that wiring resolves alongside it, in-session resolution is the right call, with the CHANGELOG entry honestly naming both halves.

2. **Per-cluster curation is the next session's primary work, deferred deliberately.** Mid-Session-3.5, Andrea raised that the kit's current Part A/B/C convention (full-kit-by-default) doesn't match her actual usage patterns — she wants per-propagation per-cluster curation, with proposals anchored to project signals rather than to current `skills/` folder contents (which reflect past full-kit-default copies, not active decisions). This is a substantive workflow design, not a wiring task. Deferring to Session 4 was the right call because (a) it's a different shape of work than this patch's hygiene-clustered scope, (b) the granularity question (per-skill drill-down inside Final-production formats for projects that produce slides but not Word, or vice versa) deserves a focused reasoning-out-loud session, (c) the cluster restructure landed in v2.1.12 is itself a prerequisite — without cluster structure, "per-cluster decision" has no referents. Session ordering changes accordingly: what was Session 4 (final consolidation + v3.0 stamp) becomes Session 5; the new Session 4 is curation-workflow design and implementation.

3. **Repo-side skills layout (`skills/GeneralSkills/` + `skills/RepoSpecificSkills/` vs flat `skills/`) is deferred to a separate patch.** Discussion surfaced that `PROJECT_SETUP.md` already documents one convention (kit lives in `skills/` flat, repo-specific skills outside `skills/`) but some of Andrea's content repos use a two-subfolder layout. Both layouts share the invariant: `LastSkillUpdate/` is always a child of the active kit folder. The kit currently assumes flat layout in propagation paths; this is drift between documented and in-the-wild conventions. Deferred to v2.1.13 or v3.x: Andrea audits content repos, decides whether to bring layouts in line, pluralize the convention via a `KIT_FOLDER` parameter, or deprecate the flat convention.

**`agent_research_verification_skill.md` was already committed in Session 3 (May 13, 2026) at v1.0** — the file itself isn't new in this patch, only its wiring is. The CHANGELOG entry covers the full v2.1.12 ship: skill creation (already on disk, version unchanged) + wiring (new in this commit).

**Files changed:**

- `LastSkillUpdate/CLAUDE_template.md`: edit (v2.1.10 → v2.1.12). Skills section restructured into seven clustered sub-tables with cluster-structure preamble; "Rule" lifted to top-of-section; Agent Research Workflow section inserted between Document Processing and Writing Protocol for Drafts; three `workspace/agent_outputs/` rows added to Repository Structure; five `word_preamble.js` references renamed to `fmm_word_preamble.js`; footer marker bumped.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.10 → v2.1.12). Phase 3 Skills Activation menu restructured into seven cluster tables matching `CLAUDE_template.md`; Q7g/Q7h follow-up questions added for agent research; Phase 2 gap analysis entry added; Files-to-copy list restructured into cluster groups with `agent_research_verification_skill.md` added under Source material and `word_preamble.js` renamed; Appendix Full Skills Kit Inventory restructured into clustered tables with v2.1.9 drift fixed (five missing files added) and rename applied; one stale "Word formatting + word_preamble.js" reference in Phase 2 gap analysis renamed; footer marker bumped.
- `LastSkillUpdate/audit_repo_skill.md`: edit (v1.2 → v1.3). Three new parameters added to repo-specific-parameters table; Check 9 (agent outputs folder consistency, with note on workflow-invariant-check threshold) inserted after Check 8; two stale `paper_processing.md` references corrected to `paper_processing_skill.md`; duplicate v1.1/v1.2 Last-updated markers consolidated into single v1.3 marker; descriptive paragraph about the audit's coverage extended to mention Check 9.
- `LastSkillUpdate/fmm_docx_formatting_skill.md`: edit (v2.2 → v2.3). Five `word_preamble.js` references renamed to `fmm_word_preamble.js` (frontmatter description + 4 body locations: Implementation note, Color Palette section, boldLeadIn helper callout, Validation step); duplicate v2.1 and v2.2 Last-updated markers consolidated into single v2.3 marker with prior versions preserved as numbered entries.
- `LastSkillUpdate/andreas_palette.md`: edit (v1.1 → v1.2). One `word_preamble.js` reference renamed in the "Files that mirror this palette" list; one reference renamed in the frontmatter description field; footer marker bumped.
- `LastSkillUpdate/fmm_word_preamble.js`: NEW path (renamed from `word_preamble.js`). Header comment self-reference and Usage example require() path updated to new name; version marker bumped from v2.1 to v2.2 with rename note.
- `LastSkillUpdate/word_preamble.js`: DELETED (renamed; same content under new path above).
- `LastSkillUpdate/CHANGELOG.md`: v2.1.12 entry prepended (this entry).
- `LastSkillUpdate/agent_research_verification_skill.md`: unchanged (already at v1.0 from Session 3).

**Files unchanged:** every other file in `LastSkillUpdate/` not listed above. Notably the other format skills (`fmm_paper_latex_skill.md`, `academic_paper_latex_skill.md`, `academic_slides_skill.md`, `fmm_coordination_slides_skill.md`) and their preamble files are unchanged — they were already correct after v2.1.9.

**Tier 1 consistency check: PASS.** All cross-references inside `LastSkillUpdate/` resolve to existing files. Rename propagated to every grep match (CLAUDE_template, PROJECT_SETUP, fmm_docx_formatting_skill, andreas_palette, fmm_word_preamble.js itself). The new skill's filename matches across all wiring locations. Cluster headings match across CLAUDE_template, PROJECT_SETUP Phase 3 menu, Files-to-copy list, and Appendix. Check 9's parameter table additions don't break Check 8's palette logic (parallel structure, separate parameter prefixes).

**Tier 2 warnings:** None new from this commit.

**Cross-repo impact preview (for combined v2.1 + v2.2 + v3.0 propagation later).** Content repos absorbing this patch receive:
- A new skill file in `skills/` (`agent_research_verification_skill.md`)
- A rename: `skills/word_preamble.js` → `skills/fmm_word_preamble.js`. Every content-repo `CLAUDE.md` that mentions `word_preamble.js` needs the rename. Every script that does `require('./word_preamble')` needs the rename. This is a real propagation cost — propagation steps must include a sed-style rename pass per repo.
- A Skills table restructure in each content repo's `CLAUDE.md`. The flat 24-row table becomes seven sub-tables under cluster headings. Project-specific content (parameters, workflow blocks, conventions) is unaffected; only the Skills section is rebuilt.
- New rows in each content repo's `CLAUDE.md` Repository Structure section if the project will run agent research (`workspace/agent_outputs/` + INDEX.md + LESSONS.md).
- An Agent Research Workflow section added to each content repo's `CLAUDE.md` for projects that run agent research; deleted from the template wholesale for projects that don't.

**Next.** Session 4 (per-propagation per-cluster curation workflow design + implementation), ahead of Session 5 (final consolidation + self-audit + starter_package refresh + v3.0 stamp + combined v2.1 + v2.2 + v3.0 propagation plan to content repos).

---

## v2.1.11 — May 13, 2026

**Fourth v3.0-cycle patch and second half of Session 3: kit-wide YAML frontmatter audit. Twelve skill files that previously lacked frontmatter now carry a `name:` and `description:` field, drafted from Andrea's observed triggering phrasings rather than designer assumptions. After this patch, every workflow skill in the kit can be discovered by trigger-matching, including by Claude Code in content repos. Session 3 is now complete; Session 4 (final consolidation + self-audit + starter_package refresh + v3.0 stamp) is next.**

**Why the audit.** Twelve of the kit's skill files lacked YAML frontmatter, meaning trigger-matchers couldn't find them by description. The disparity was historical drift — some skills (paper-processing variants, writing-skill family, several format skills) had been written with frontmatter from the start; others (the older voice profiles, project tracker, brainstorming, finish-session, audit-repo, etc.) had been written before the frontmatter convention solidified. The v2.1.11 audit closes that gap.

**Trigger language sourced from observed phrasings.** The planning doc principle for this audit was explicit: `description:` fields should match Andrea's natural phrasings, not be designer assumptions about how she might invoke a skill. Drafts were generated, presented to Andrea, and either approved or revised based on the actual ways she has been observed triggering these skills. For voice-style skills (academic, FMM-institutional, Marta), the trigger language covers both explicit invocations ("apply Andrea's academic style") and implicit ones ("this is for a paper," "this is for a policy note") to match the range of phrasings real tasks present.

**Files updated (12):**

| File | Notes on frontmatter |
|---|---|
| `andreas_palette.md` | Asset, not a skill — but given skill-shaped frontmatter so Claude Code in content repos can discover it when producing visuals (charts, diagrams, slide accents) and Andrea hasn't named specific colors. |
| `audit_repo_skill.md` | Triggers cover both audit-mode (report only) and repair-mode (propose fixes) phrasings. |
| `brainstorming_skill.md` | Triggers cover the "rough idea, let me think out loud" framing — distinct from drafting and from saving the whole conversation. |
| `branch_workflow_skill.md` | Triggers cover both explicit branch requests and the implicit "I want to read this carefully" framing. Auto-engagement via Protocol 2 noted. |
| `email_drafting_skill.md` | Read-this-skill-before-drafting rule preserved at top of body. |
| `finish_session_skill.md` | Triggers list every close-out phrasing observed (thanks, good night, we're done, let's wrap up, etc.). |
| `fmm_docx_formatting_skill.md` | Pairs explicitly with `word_preamble.js` (executable) and `andreas_palette.md` (canonical colors). |
| `project_tracker_skill.md` | Triggers cover both session-start orientation ("where were we") and session-close update. |
| `repo_conversations_skill.md` | Triggers cover save-this-conversation and find-past-conversation use cases. The NOT-a-resumption-mechanism rule preserved in body. |
| `andrea_writing_style_skill.md` | Triggers cover both explicit ("apply Andrea's academic style") and implicit ("this is for a paper") forms. Iterative-drafting and translation-preservation rules noted. |
| `andrea_fmm_institutional_style_skill.md` | Same shape as the academic profile. Target-audience default (senior government official, finance minister's chief of staff benchmark) named in the description. |
| `marta_writing_voice_skill.md` | Two-pass rule for substantial documents explicitly named in the description so it can't be missed. Conflict resolution rule ("Marta's voice wins") preserved in body. |

**Files that intentionally do NOT receive frontmatter.** Four files in `LastSkillUpdate/` are not skills and were intentionally excluded: `CLAUDE_template.md` (template for content repos), `PROJECT_SETUP.md` (workflow setup doc), `STATUS_template.md` (template), and the kit's `CHANGELOG.md` itself. Of the asset family, only `andreas_palette.md` was promoted to having frontmatter because it has a discoverability requirement (Claude Code needs to find it); the PNGs, `word_preamble.js`, and the `.tex` preamble files don't have frontmatter because they're invoked from their paired skills, not directly via trigger-matching.

**Tier 1 consistency check: PASS.** No broken references introduced — frontmatter additions are pure prepends, no body content changed beyond the addition of a closing version-marker line where needed. Frontmatter YAML validates as parseable.

**Tier 2 warnings:** None.

**Next.** Session 4 — final consolidation and self-audit. Steps: run `audit_repo_skill.md` against the kit itself (now possible because the kit defines its own palette and the audit's Check 8 can verify it); refresh `starter_package/` (deferred since v2.1.1, accumulating five patches: v2.1.7 paper-split, v2.1.8 writing-split, v2.1.9 document-generation architecture, v2.1.10 naming sweep, v2.1.11 frontmatter audit); stamp v3.0 in CHANGELOG; produce the combined v2.1 + v2.2 + v3.0 propagation plan for content repos.

---

## v2.1.10 — May 13, 2026

**Third v3.0-cycle patch: kit-wide naming sweep. Ten renames apply the kit's naming conventions consistently — `_skill.md` for instruction files (including voice profiles), lowercase `_template.md` for templates, and a preamble file rename for parallelism with v2.1.9's new preamble files. Frontmatter audit (planned as the second half of Session 3) ships as a separate v2.1.11 commit. v3.0 stamping waits for Session 4's final consolidation and self-audit.**

**Why one batch.** The naming sweep was deliberately batched into one atomic commit (rather than spread across smaller commits) because every rename touches multiple wiring files in `LastSkillUpdate/` (CLAUDE_template, PROJECT_SETUP, cross-references inside skills) AND every content repo's CLAUDE.md at Phase 3 propagation. Batching pays the propagation cost once.

**Renames applied (10):**

| Old name | New name | Reason |
|---|---|---|
| `BranchWorkflow_Skill.md` | `branch_workflow_skill.md` | PascalCase → lowercase, capital-S `_Skill` → lowercase `_skill` |
| `github_api_workflow.md` | `github_api_workflow_skill.md` | Add `_skill.md` suffix |
| `document_processing.md` | `document_processing_skill.md` | Add `_skill.md` suffix |
| `email_drafting.md` | `email_drafting_skill.md` | Add `_skill.md` suffix |
| `STATUS_TEMPLATE.md` | `STATUS_template.md` | Lowercase `_template` suffix (uppercase prefix preserved — it's a template the repos visibly use as STATUS.md) |
| `CLAUDE_TEMPLATE.md` | `CLAUDE_template.md` | Same |
| `Andrea_Writing_Style_Profile.md` | `andrea_writing_style_skill.md` | `_Profile` → `_skill` (voice profiles ARE skills); fully lowercase |
| `Andrea_FMM_Institutional_Style_Profile.md` | `andrea_fmm_institutional_style_skill.md` | Same |
| `Marta_Writing_Voice_Profile.md` | `marta_writing_voice_skill.md` | Same |
| `latex_preamble.tex` | `fmm_paper_preamble.tex` | Three LaTeX preambles in the kit now — this name implied "the" preamble. Matches new `academic_paper_preamble.tex` and `fmm_coordination_slides_preamble.tex` from v2.1.9 |

**Why profiles became skills.** The test for "is this a skill?" is "does Claude read this and follow guidance from it?" Voice profiles meet that test — they instruct Claude how to draft in a specific voice. The `_Profile` suffix implied a sub-category that didn't carry its weight. Marta's profile itself already opens with "Read this skill before drafting…" — the file already self-described as a skill regardless of filename. Renaming makes the file system match the reality.

**Asset naming convention (incidentally codified).** `andreas_palette.md` uses plain `.md` (no `_skill.md` suffix) because it's an asset — a color reference — not a skill. The kit's naming convention is now: `_skill.md` for instruction files, `_template.md` for repo-templates, plain `.md` (with descriptive name) for assets, `.tex`/`.js` for code resources with `_preamble` suffix where they pair with a skill. No assets other than `andreas_palette.md` exist in the kit today, but the convention covers future additions.

**Files updated (references + version markers):**

- `LastSkillUpdate/CHANGELOG.md` — new v2.1.10 entry (this one). Historical entries untouched — they correctly reference the names that existed when those entries were written. Renames apply forward, not retroactively.
- `LastSkillUpdate/CLAUDE_template.md` — Skills table entries renamed; cross-references inside body text updated.
- `LastSkillUpdate/PROJECT_SETUP.md` — Skills menu, integration file list, and Appendix inventory updated.
- 12 other skill/preamble/asset files updated to point at new names where they cross-referenced renamed files.
- Repo-root `CLAUDE.md` — new entry for v3.0 cycle trigger phrasings ("Let's pick up v3.0" → read `v3.0_planning.md`).

**What did NOT change.** The content of any renamed file. Renames are filesystem-level only; the bodies are byte-identical to their pre-rename versions (with the sole exception of internal "Last updated" lines bumped to v2.1.10 for renamed files, and reference-update edits where a renamed file mentioned another renamed file).

**Tier 1 consistency check: PASS.** All cross-references inside `LastSkillUpdate/` resolve to existing files. No broken references introduced. File list matches actual filesystem.

**Tier 2 warnings:** None new from this commit. The frontmatter inconsistency (some skills have YAML frontmatter, some don't) is the explicit subject of the next commit (v2.1.11).

**Next.** v2.1.11 ships the frontmatter audit: YAML frontmatter added to the 12 skill files that lack it, with `description:` fields sharpened against Andrea's observed triggering phrasings. After v2.1.11, Session 4 runs the self-audit via `audit_repo_skill.md`, refreshes `starter_package/`, and stamps v3.0.

---

## v2.1.8 — May 13, 2026

**Second decomposition patch toward v3.0: `writing_skill.md` split into triage + Protocol 1 + Protocol 2, applying the same pattern landed in v2.1.7 for paper-processing. The umbrella name `writing_skill.md` is kept for the triage; Protocols 1 and 2 become `writing_notes_skill.md` and `writing_drafting_skill.md`. No version 3.0 stamping yet — that lands at the consolidation after Phase 2 of the v3.0 cycle completes.**

This is the second skill split in the v3.0 cycle's Phase 2 audit. The audit walks through every skill in `LastSkillUpdate/` applying the decomposition rule codified in v2.1.7's CHANGELOG. After this ship: paper-processing split (v2.1.7) and writing split (v2.1.8) are the two splits identified as worthwhile in Phase 2's first batch; the rest of the kit is either too small to split, has no clear triage step, or is reference-style content rather than workflow content. The remaining Phase 2 work is the naming-convention sweep and the frontmatter audit, both deferred to a single cross-cutting commit at the end of Phase 2.

**Why writing was split.** The original `writing_skill.md` v1.1 (26k chars) carried two protocols with fundamentally different dynamics: Protocol 1 (reading + note-taking — fully interactive, lives on `main`) and Protocol 2 (drafting — branch workflow, scale check, document-level finalization). The protocols are invoked in different modes, evolve asymmetrically (Protocol 2 has accreted significant machinery since v1.0 — branch workflow, scale check, hierarchical naming, assembly cycles; Protocol 1 has been stable), and most typical sessions load only one of them. This matches the decomposition rule's signature: clear triage between distinct protocols, asymmetric evolution, partial loading on typical tasks.

**Andrea-specific design discipline preserved.** Reading and note-taking are treated as one coupled operation in Protocol 1, reflecting Andrea's working style (she rarely reads without some form of note-taking — even a margin scribble counts). The split therefore does NOT further sub-divide Protocol 1 into "reading" and "note-taking." A separate design question — whether to introduce bracketed deferred-action markers for notes (parallel to `BranchWorkflow_Skill.md`'s mechanism for drafts) — was raised and rejected during v2.1.8 staging: reading-with-Claude is conversational, the conversation itself handles deferred markers, no new mechanism earned its place. The decision is documented explicitly in `writing_notes_skill.md`'s "Where Protocol 1 work lives" section so future-Andrea finds the reasoning if she revisits the question.

**Rename — `writing_skill.md` (v1.1 → v3.0; triage-only).** Now carries only the triage and shared content: when-to-use guidance, how the two protocols interact, project-setup parameters. The umbrella name is preserved because every existing reference across content repos' CLAUDE.md files points at `writing_skill.md`; keeping the name avoids a content-repo-wide rename cascade. The file's *role* shifts from "carries both protocols" to "triages between protocols," same pattern used for `paper_processing_skill.md` in v2.1.7.

**New skill — `writing_notes_skill.md` (v1.0).** Carries Protocol 1 in full: the workflow (present material → user reacts → update notes → wait), the rules about answering questions inline and fully, the questions-vs-instructions discipline, sorting inputs to notes vs. to-dos, summary maintenance, session resumption, and the explicit decision against branching for notes. Lifted from `writing_skill.md` v1.1 Protocol 1 verbatim with framing adjustments (cross-references to the triage skill for shared content; explicit invocation context "if you arrived here without the triage..."; the explicit note about reading-and-note-taking being coupled for this user).

**New skill — `writing_drafting_skill.md` (v1.0).** Carries Protocol 2 in full: the unit-of-work and container model, assembly cycles, the 12-step workflow (overall outline → scale check → branch → detailed outline → drafting → branch review → outline check → repeat → compile descriptive outline + divergence table → outline review → re-read → joint approval → merge), the key rules, the "why this works" reasoning. Lifted from `writing_skill.md` v1.1 Protocol 2 verbatim with one substantive update: the assembly-cycle drift discussion now points at `project_tracker_skill.md`'s STATUS.md "Pending re-integrations" subsection (which shipped in v2.1.4), replacing the v1.1 placeholder reference to "Working Conventions until the project tracker (Phase 2.2.D) lands."

**Three design decisions worth preserving in the changelog for future audits:**
1. **Triage skill stays at the original name.** Same pattern as paper-processing in v2.1.7. Preserves existing cross-references; minimizes content-repo propagation cost. The role change (carries-both-protocols → triages-between-protocols) is documented in the file's footer and structure, not its name.
2. **Protocol 1 is monolithic; no further sub-splitting.** Reading + note-taking are one operation for this user, codified in the skill body. A future user with a different working style could split them — but for this kit, the coupling is real and the split should reflect that.
3. **No bracketed-marker mechanism for notes.** Considered and rejected. Conversation handles what brackets would handle for drafts. Recorded in `writing_notes_skill.md` so the absence of the feature is intentional and visible.

**Honest accounting of the split's costs and benefits.** Total content grew 26k → 37k chars (about 39% growth from per-file preambles and composition sections — same proportion as v2.1.7's paper-processing split). Per-task read shrinks for Protocol 1 (17k vs 26k; saves ~9k) but stays roughly the same for Protocol 2 (27k vs 26k; slight increase). The main wins are workflow clarity (smaller editing surface, asymmetric evolution support, clear protocol-vs-triage boundary) and future-proofing — not immediate context savings. This is honest accounting per the principle codified in v2.1.7's CHANGELOG: name what the split actually buys.

**`CLAUDE_TEMPLATE.md` updated to v2.1.8.** Nine changes: (a) Skills table grew from 1 row to 3 rows for writing; (b) Writing Protocol for Drafts section's "Generic skill" pointer updated to name `writing_drafting_skill.md`; (c) reference to "writing_skill.md Protocol 2 for the full step-by-step" updated to point at `writing_drafting_skill.md`; (d) Protocol: Note-Taking from Reading section's "Generic skill" pointer updated to name `writing_notes_skill.md`; (e–g) Repository Structure rows for `Drafts/[Deliverable1]/`, `Drafts/[Deliverable1]/Archive/`, `Drafts/[Deliverable1]/InputsFromTeam/` updated to point at `writing_drafting_skill.md`; (h) Repository Structure row for `NotesFromReading/` updated to point at `writing_notes_skill.md`; (i) footer version bumped to v2.1.8.

**`PROJECT_SETUP.md` updated to v2.1.8.** Six changes: (a) When-it-comes-up table grew from 1 row to 3 rows for writing; (b) Part B gap analysis text updated to mention the three-file structure with copy-together guidance; (c) Files-to-copy list grew from 1 line to 3 lines for writing; (d) illustrative migration table example refreshed to reflect the split; (e) master file inventory grew from 1 row to 3 rows; (f) footer version bumped to v2.1.8.

**Files changed:**
- `LastSkillUpdate/writing_skill.md`: edit (v1.1 → v3.0; now triage-only).
- `LastSkillUpdate/writing_notes_skill.md`: NEW (v1.0 — Protocol 1).
- `LastSkillUpdate/writing_drafting_skill.md`: NEW (v1.0 — Protocol 2).
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.7 → v2.1.8). Skills table; two Writing Protocol generic-skill pointers; four Repository Structure rows; footer.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.7 → v2.1.8). Six inventory locations updated.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.8 entry prepended.

**Files unchanged:** all other files in `LastSkillUpdate/`; `v2.2_planning.md` (closed); `starter_package/` (refresh deferred until Phase 3 of v3.0). Notably `BranchWorkflow_Skill.md` is unchanged — Protocol 2 references it as before; no edits to its body.

**Tracked drift for the post-cycle consistency pass (v3.0 cycle).** None added in this patch. The Phase 2 naming-convention sweep and frontmatter audit are queued as a separate end-of-Phase-2 commit, not tracked as "drift" here.

**Cross-repo impact preview (for combined v2.1 + v2.2 + v3.0 propagation later).** Content repos absorbing this patch receive two new files in `skills/` (`writing_notes_skill.md`, `writing_drafting_skill.md`) and an updated `writing_skill.md` (now triage-only, name unchanged). Each repo's `CLAUDE.md` Skills table needs the 1-row-to-3-rows replacement (lift the three rows directly from this v2.1.8 `CLAUDE_TEMPLATE.md`). Project-specific Writing Protocol blocks (most content repos have these) need their generic-skill pointers updated from `writing_skill.md` to the appropriate protocol skill — `writing_drafting_skill.md` for the Writing Protocol for Drafts section, `writing_notes_skill.md` for the Protocol: Note-Taking from Reading section. No parameter changes, no folder changes, no workflow changes — drafting and note-taking happen the same way; only the file structure changed.

---

## v2.1.7 — May 13, 2026

**First structural patch toward v3.0: `paper_processing.md` split into a triage skill + two protocol skills, with `_skill.md` naming convention applied.** Initiates the v3.0 redesign cycle — structural reorganization for clearer editing surface, asymmetric protocol evolution, and (modestly) better per-task context budget. v3.0 stamping happens at final consolidation after Phase 2's kit-wide audit completes.

**Three new skills replacing one.** The pre-split file `paper_processing.md` (v2.0, May 2, 2026) bundled the triage (Step 0) plus two distinct downstream protocols (academic and institutional). At ~23k chars in a single file, the bundling made small edits to either protocol require navigating past the other, and meant that simple tasks (a paper that's clearly academic) still loaded the institutional-protocol prose. The split:

- **`paper_processing_skill.md` (v3.0)** — triage + shared infrastructure. Keeps the original file's name (per the naming-stability principle: existing references across CLAUDE_TEMPLATE, PROJECT_SETUP, and content-repo CLAUDE.md files keep working, with the file's *role* shifting from "does everything" to "triages and routes"). Contains: scope description, Prerequisites (the four parameters: PROJECT_QUESTION, CONDITIONAL_SECTION, BIB_FILE, PAPERS_INDEX), Folder Structure, Step 0 Triage (the three diagnostic questions + the differences table), the canonical Status framework vocabulary (Claude status + User status labels), Lookup Protocol, Setting Up for a New Project, and triage-level Edge Cases.
- **`paper_processing_academic_skill.md` (v1.0)** — NEW. Protocol A in full: Steps 1A–6A (rename → extract → summary with thesis/methodology/findings/relevance → master index → BibTeX → Claude status) plus Protocol A's own edge cases. References the triage skill for shared content rather than duplicating it.
- **`paper_processing_institutional_skill.md` (v1.0)** — NEW. Protocol B in full: Steps 1B–6B with the institutional emphasis (institutional renaming convention, acronym/box preservation in text extraction, synthesized-findings summary with document provenance and frameworks/databases, `@techreport`/`@book`/`@inbook` BibTeX) plus Protocol B's own edge cases. Notes-specific-to-Protocol-B section folded into the edge-cases section to avoid two parallel "things to remember" lists.

**Cross-reference design.** Each protocol skill points back to `paper_processing_skill.md` for shared content (Prerequisites, Folder Structure, Status framework vocabulary, Lookup Protocol). Where a protocol skill *needs* a small piece of shared content to act (e.g., Step 6A/6B uses the Status framework), the protocol skill inlines the minimum needed to act (the four Claude-status values: Recommend full read / Recommend skim / Summary sufficient / Flagged) plus a pointer to the canonical table. This avoids both duplication (full Status framework in two places) and friction (forcing the reader to open another file to see four values).

**Three design decisions worth preserving in the changelog:**

1. **Sequencing vs. duplication.** The triage skill is the canonical source for shared content; the protocol skills point at it rather than duplicating. Acceptable cost: when running a protocol skill alone, a question about (e.g.) Lookup Protocol requires opening the triage skill. Acceptable because (a) Lookup Protocol is usually invoked from a content repo's CLAUDE.md, not mid-processing, and (b) the simplicity-bias check (would I rather have duplicate-and-drift or pointer-and-jump?) lands on pointer.

2. **Honest cost accounting.** Total content across the three files (~32k chars) is ~38% larger than the pre-split single file (~23k chars). The growth comes from per-file preamble, frontmatter, and "Composition with other skills" sections that any standalone skill needs. The per-task read does shrink modestly (typical task post-split: ~19-24k vs. pre-split ~23k), but the immediate context-budget win is small. The real wins are workflow (smaller editing surface; asymmetric evolution; clearer triage-vs-protocol boundary) and future-proofing (when one protocol grows more than the other, only the one that's growing has to absorb the change). This is honest in the changelog so future audits don't expect a larger context-budget number.

3. **Naming convention applied at the split.** Three new files use the `_skill.md` suffix (`paper_processing_skill.md`, `paper_processing_academic_skill.md`, `paper_processing_institutional_skill.md`) — applying the consistency standard that lands kit-wide in Phase 2. `paper_processing.md` is the only file renamed in this patch; the other inconsistencies (`email_drafting.md`, `document_processing.md`, `github_api_workflow.md`, `BranchWorkflow_Skill.md`, `_TEMPLATE.md` casing) are batched into the Phase 2 audit so all renames propagate together at v3.0 final consolidation.

**YAML frontmatter on all three new files.** Each carries the `name:` and `description:` fields. The descriptions are crisp routing statements (when invoked, what the skill does, what it does NOT do) rather than full skill summaries — usable for Claude Code skill-discovery scanning if/when the kit gets used in that environment. Skills that lack frontmatter (`repo_conversations_skill.md`, `project_tracker_skill.md`, `finish_session_skill.md`, others) will gain it during Phase 2.

**`paper_processing.md` (the pre-split file) is deleted in this commit.** A clean delete, not a rename to one of the new files — the triage skill *replaces* the pre-split file in spirit but has a substantively different scope (triage-only vs. triage+both-protocols), so a rename would misrepresent the change. The Git history shows the old file's final state at the previous commit and the new files' initial state at this commit; the delete-and-add pattern reflects the structural change accurately.

**`CLAUDE_TEMPLATE.md` updated to v2.1.7.** Two changes: (a) Skills table replaces the single `paper_processing.md` row with three new rows (triage + Protocol A + Protocol B); (b) the project-specific Paper Processing Workflow section's "Generic skill" pointer updated to name all three files and to instruct content-repo CLAUDE.md authors to start with the triage skill. The project-specific parameter sheet (PROJECT_QUESTION, CONDITIONAL_SECTION, BIB_FILE, PAPERS_INDEX) and summary-format reference are unchanged — those are project-level customization layers, not affected by the skill split.

**`PROJECT_SETUP.md` updated to v2.1.7.** Four inventory locations updated: (a) the When-it-comes-up table in Part A Phase 2; (b) the Part B gap analysis section with a note about Part C rename + add-two-protocols at propagation time; (c) the Files-that-may-be-copied list in Part B Phase 3 Step 2; (d) the master file inventory. The one-row-becomes-three-rows pattern is consistent across all four locations.

**Files changed:**
- `LastSkillUpdate/paper_processing.md`: DELETED (was v2.0; content split into the three new files below).
- `LastSkillUpdate/paper_processing_skill.md`: NEW (v3.0). Triage + shared infrastructure.
- `LastSkillUpdate/paper_processing_academic_skill.md`: NEW (v1.0). Protocol A.
- `LastSkillUpdate/paper_processing_institutional_skill.md`: NEW (v1.0). Protocol B.
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.6 → v2.1.7). Skills table: 1 row → 3 rows. Paper Processing Workflow section: Generic-skill pointer updated.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.6 → v2.1.7). Four inventory locations updated; one row becomes three in each.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.7 entry prepended.

**Files unchanged:** all other files in `LastSkillUpdate/`; `v2.2_planning.md` (this is the v3.0 redesign cycle, not the v2.2 cycle — v2.2_planning.md retires at v3.0 final consolidation); `starter_package/` (refresh deferred until v3.0 final).

**Tracked drift for the post-cycle consistency pass.** No new items added in this patch. The Phase 2 kit-wide audit will surface naming inconsistencies (`email_drafting.md`, `document_processing.md`, `github_api_workflow.md`, `BranchWorkflow_Skill.md`, `_TEMPLATE.md` casing) and frontmatter inconsistencies (~5 skills lack YAML frontmatter); both batches land at v3.0 final.

**Cross-repo impact preview (for combined v2.1 + v2.2 + v3.0 Phase 3 propagation later).** Content repos absorbing this patch will need: (a) rename `paper_processing.md` references in their CLAUDE.md to `paper_processing_skill.md` (a single sed-style change per repo); (b) add references to the two new protocol skills next to the triage reference; (c) update the project-specific Paper Processing Workflow block's "Generic skill" pointer to name all three files. No parameter changes (PROJECT_QUESTION, CONDITIONAL_SECTION, BIB_FILE, PAPERS_INDEX still apply); no folder changes; no breaking changes to summary format or filename conventions. The triage's Step 0 vocabulary (academic-style vs. institutional-style with the three diagnostic questions) is identical to the v2.0 single-file version, so any documents already processed remain correctly classified — only future processing benefits from the cleaner separation.

---

## v2.1.6 — May 13, 2026

**Phase 2.2.E of the v2.2 cycle: new generic skill `finish_session_skill.md` added — session close-out orchestrator that sequences the kit's existing close-out pieces (uncommitted-work inventory, branch disposition, STATUS.md update, conditional conversation save) into one ordered ritual triggered by close-out signals.**

This patch lands the fifth and final substantive slice of the v2.2 cycle, completing the borrowings-and-evolutions sequence that began with v2.1.1 on May 12. With this ship, all approved items in `v2.2_planning.md` are resolved: Phases A/B/C/D shipped in v2.1.1–v2.1.4; the consistency pass ran as v2.1.5; Phase E ships now as v2.1.6; Items 3/10/15 were no-ops or rejected at the original cycle plan; Item 7 (`update-docs`) is formally rejected in this patch with rationale (see below); Item 14 (`git_fluency`) remains deferred to a future collaborator-mode cycle, unchanged. The v2.2 cycle is now ready for combined v2.1 + v2.2 Phase 3 propagation to content repos — that propagation is the cycle close, not a v2.x patch.

**New skill — `finish_session_skill.md` (v1.0).** A **sequencing skill**, not a workflow skill. The skill's body is a five-step close-out sequence: (1) **uncommitted-work inventory** — scan for files touched this session that haven't been committed; surface to Andrea with a commit/defer/discard choice; (2) **branch disposition (conditional)** — if branch work happened and reached a natural stopping point, ask about merging and point at `BranchWorkflow_Skill.md` Step 6 for the mechanics; (3) **STATUS.md update (mandatory)** — follow `project_tracker_skill.md`'s session-close update protocol in full, with an edge case for "I have to go right now" interruptions (commit `unreviewed` immediately, skip remaining steps); (4) **conversation save (conditional)** — if the `repo_conversations_skill.md` proactive-offer conditions are met (3+ substantive turns, repo content consulted, closure signal — and the closure signal is implicit since the close-out is why we're here), offer the save; (5) **confirm close** — one-line confirmation, then stop. The skill explicitly does NOT redefine STATUS.md format, merge mechanics, or conversation-save format; each step points at the canonical skill. Ordering matters: STATUS.md is updated *before* the conversation-save offer because the former is mandatory and the latter is optional.

**Three design decisions worth preserving in the changelog for future audits:**
1. **Sequencing-only, not workflow-replicating.** A larger skill that bundled the procedures (STATUS.md format inline, merge recipes inline, conversation-save format inline) would have been ~5x the size and duplicated content already in three other skills. The smaller sequencing-only version was chosen on simplicity-bias grounds (same discipline as v2.1.4's STATUS.md design that rejected a `USES_HIERARCHICAL_NAMING` parameter cascade). The value-add is the trigger, the ordering, and the uncommitted-work check — not re-stating procedures.
2. **No `update-docs` analog.** Inspection of upstream `danparshall/claude_researcher` at May 13, 2026 confirmed `update-docs` is the inner mid-session checkpoint that `finish-convo` calls — not a duplicate. For Andrea's kit, the inner write actions are already distributed across `project_tracker_skill.md`, `repo_conversations_skill.md`, and `github_api_workflow.md`; there is no inner operation left to extract. Mid-session checkpoint discipline itself isn't earned by current usage patterns (codify-after-third-repetition rule from `CLAUDE_TEMPLATE.md` Working Conventions hasn't been tripped). Item 7 in the planning doc is formally rejected, not deferred.
3. **No code-implementation hand-off step.** Upstream `finish-convo` includes an "ask about creating a plan doc" step tied to their `write-a-plan` skill. Andrea's kit rejected `write-a-plan` as Item 10 because `writing_skill.md` Protocol 2 already covers turning conversations into structured deliverables. The corresponding step is omitted; the planning doc records this as an intentional gap that future code-implementation work will need to fill.

**Inspection of upstream `danparshall/claude_researcher` (May 13, 2026, conducted at v2.1.6 staging).** Repo updated 2026-05-13. Their `template/skills/SKILL_INDEX.md` confirms `finish-convo` and `update-docs` exist as distinct skills with explicit relationship: `update-docs` is the "Core operation that finish-convo builds on." `finish-convo` calls `update-docs` first, then adds (a) ask about creating a plan doc, (b) `git add` + `git commit`, (c) `git push`. Both skills include runtime-detection blocks for claude.ai-sandbox vs Claude Code mode. The runtime-detection pattern is not ported to Andrea's kit — Andrea's kit is single-environment (claude.ai with REST-API workflow) and the detection block would be dead code. If Andrea ever runs from Claude Code, the detection pattern is a candidate borrowing.

**`project_tracker_skill.md` updated to v1.0.1.** Single change: the "Composition with other skills" section's forward reference to "the future session-end skill (Phase 2.2.E) — will formalize the session-close protocol described above" replaced with a concrete pointer to `finish_session_skill.md`, naming it as the single entry point for close-out signals and identifying the STATUS.md update protocol as Step 3 of its sequence. No behavioral changes to STATUS.md, the session-start check, the session-close update, the freshness audit, the bootstrap, or the Pending re-integrations subsection.

**`CLAUDE_TEMPLATE.md` updated to v2.1.6.** Two changes: (a) Skills table gains a row for `finish_session_skill.md` between `project_tracker_skill.md` and `KnowledgeLogo.png`; (b) the STATUS.md Working Conventions bullet (introduced in v2.1.4) is extended with a final sentence pointing at `finish_session_skill.md` as the close-out orchestrator and identifying STATUS.md update as Step 3 of its sequence. No other changes to Working Conventions, Writing Protocol, Naming Conventions, or Repository Structure.

**`PROJECT_SETUP.md` updated to v2.1.6.** `finish_session_skill.md` row added to: (a) the When-it-comes-up skills inventory table in Part A Phase 2; (b) the Part B gap analysis section with a note that the skill activates in every repo by default and depends on STATUS.md being bootstrapped (so Step 3 of the close-out has a target); (c) the Files-that-may-be-copied list in Part B Phase 3 Step 2; (d) the master file inventory at the end. No other changes.

**`v2.2_planning.md` updated.** Phase 2.2.E marked SHIPPED with resolution of all three open design questions (dependency on STATUS.md, naming, conflict with BranchWorkflow_Skill.md). Item 6 marked complete. Item 7 (`update-docs`) moved from "Inspection deferred" to formally rejected, with the rationale recorded. Item 14 (`git_fluency`) remains deferred to a future collaborator-mode cycle, unchanged.

**Files changed:**
- `LastSkillUpdate/finish_session_skill.md`: NEW (v1.0).
- `LastSkillUpdate/project_tracker_skill.md`: edit (v1.0 → v1.0.1). Composition section forward reference replaced with concrete pointer.
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.5 → v2.1.6). Skills table row added; STATUS.md Working Conventions bullet extended.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.5 → v2.1.6). Skill added to four inventory locations.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.6 entry prepended.
- `v2.2_planning.md` (repo root): Phase 2.2.E marked SHIPPED with resolutions; Item 7 marked rejected with rationale.

**Files unchanged:** all other files in `LastSkillUpdate/`; `starter_package/` (refresh deferred until Phase 3 propagation lands).

**Tracked drift for the post-cycle consistency pass.** No new items added in this patch. Section remains empty (v2.1.5 closed all prior items). The v2.2 cycle's substantive work is now complete; the next cycle step is combined v2.1 + v2.2 Phase 3 propagation to content repos.

**Cross-repo impact preview (for combined v2.1 + v2.2 Phase 3 propagation later).** Content repos absorbing this patch will receive `finish_session_skill.md` as a new file in `skills/`. No existing skill changes other than the small `project_tracker_skill.md` v1.0.1 patch (concrete pointer for the forward reference). Each repo's `CLAUDE.md` should add an entry pointing at `finish_session_skill.md` so close-out signals trigger the sequence; the existing STATUS.md Working Conventions bullet gets the one-sentence extension noted above. No parameter changes, no folder changes, no breaking changes. Repos that have been running with the v2.1.4 STATUS.md infrastructure since May 13 will see continuity — STATUS.md updates now happen as Step 3 of an orchestrated sequence rather than as a standalone close-out action, but the protocol itself is unchanged. Per the planning doc, this completes the v2.2 cycle's substantive ships; the propagation cycle delivering v2.1 + v2.2 together to each content repo is the next step.

---

## v2.1.5 — May 13, 2026

**Consistency pass: back-filled pre-existing drift in inventory lists. No new functionality.**

This patch closes the tracked-drift items from v2.1.2 and v2.1.4. Three pre-existing inventory omissions are fixed in this commit, all in the same category (skills present in the kit but missing from canonical inventory lists). No new skills, no new functionality, no behavioral changes — purely housekeeping.

The drift was tracked across the v2.2 cycle in `v2.2_planning.md`'s "Tracked drift for the post-cycle consistency pass" section, established during v2.1.2 (Phase 2.2.B) when scope-discipline was chosen over fold-in fixes. Running the consistency pass now, after Phase 2.2.D ships and before Phase 2.2.E begins, keeps each commit's CHANGELOG entry focused on its actual change and prevents Phase 2.2.E from inheriting or amplifying any of this drift.

**`PROJECT_SETUP.md` updated to v2.1.5.** Three entries added to the Part B Phase 3 Step 2 Files-to-copy list:
- `skills/BranchWorkflow_Skill.md` — skill has existed since v2.0; was always in the When-it-comes-up table and master file inventory, but never in the Files-to-copy list.
- `skills/repo_conversations_skill.md` — added to the kit in v2.1 (May 9, 2026); the v2.1 consolidation added it to the master file inventory but not to the Files-to-copy list.
- `skills/github_api_workflow.md` — added to the kit in v2.1 (May 9, 2026); same omission pattern as `repo_conversations_skill.md`.

**`CLAUDE_TEMPLATE.md` updated to v2.1.5.** Two Skills table rows added:
- `skills/repo_conversations_skill.md` — present in the kit since v2.1 but missing from the template's Skills table since its original ship. Now has a row with appropriate trigger language.
- `skills/github_api_workflow.md` — same omission since v2.1. Now has a row with trigger language covering environments where `git push` is blocked.

`BranchWorkflow_Skill.md` was already in the CLAUDE_TEMPLATE Skills table; no fix needed there.

**`v2.2_planning.md` updated.** Tracked drift section emptied (all three items resolved). Section is retained as a placeholder structure for future cycles — if drift accumulates again during Phase 2.2.E or any later cycle, it gets logged here.

**Files changed:**
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.4 → v2.1.5). Three lines added to Files-to-copy list.
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.4 → v2.1.5). Two rows added to Skills table.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.5 entry prepended.
- `v2.2_planning.md` (repo root): tracked drift items marked resolved.

**Files unchanged:** all other files in `LastSkillUpdate/`.

**Cross-repo impact preview.** Zero. This patch is purely about the kit's internal inventory lists. Content repos absorbing the eventual combined v2.1 + v2.2 propagation will receive the corrected lists, but no skill files change in this commit — the three skills were already shipping, just under-inventoried.

**Tracked drift for the post-cycle consistency pass.** Section now empty. All three items resolved. Future cycles can re-populate this section as new drift surfaces.

---

## v2.1.4 — May 13, 2026

**Phase 2.2.D of the v2.2 cycle: new generic skill `project_tracker_skill.md` and template `STATUS_TEMPLATE.md` added — STATUS.md becomes the per-repo project-level tracker with mandatory session-close updates, opt-in session-start checks, and the freshness audit against repo state.**

This patch lands the fourth slice of the v2.2 cycle and is the heaviest design work of the cycle. STATUS.md is a new per-content-repo file at repo root (alongside CLAUDE.md) that serves as the project's living state record: what the repo is, what workflow mode it uses, what's in flight, recent sessions, open questions, archived workstreams, known issues, and (for repos using hierarchical naming) pending re-integrations between section and chapter drafts. The companion skill defines the protocols, audits, and bootstrap procedures. The Pending re-integrations subsection inside Current state supersedes the v2.1.1 stop-gap workaround (where Claude asked "what's current?" at session start when entering a hierarchical-naming folder); that workaround is removed in this patch.

Per the planning doc, Phase 3 propagation remains deferred until v2.2 ships in full; v2.1.x patches continue to accumulate on v2.1 and propagate together as one combined cycle when v2.2 is complete.

**New skill — `project_tracker_skill.md` (v1.0).** Defines STATUS.md's structure (8 sections: header with last-updated timestamp + reviewed/unreviewed flag, what this repo is, workflow mode, current state with optional Pending re-integrations subsection, recent sessions, open questions, archived workstreams, known issues); the **session-start check protocol** (Claude asks "Do you want me to check STATUS.md?" before doing anything else — if yes, read STATUS.md, run the freshness audit, propose updates if drift is found, summarize, and ask where to pick up); the **session-close update protocol** (mandatory on Andrea's close-out signal — Claude drafts the update, shows it, commits clean if reviewed or with `unreviewed` flag if Andrea doesn't have time); the **freshness audit** (lightweight check against TRACKED_LOCATIONS on disk + commits to `main` since STATUS.md's last-updated timestamp — past-chats search is explicitly out of scope, the repo is the source of truth); the **bootstrap procedure** (one path per Part A new-repo setup / Part B existing-repo integration / Part C version upgrade); the **folder bootstrap protocol** (auto-create baseline folders in Part A; ask Andrea per-folder in Parts B and C; first-use fallback for any later missing-folder case). Repo-specific parameters: `STATUS_LOCATION`, `WORKFLOW_MODE` (`branches` default; `main_only` for scratch repos), `TRACKED_LOCATIONS` (baseline: `workspace/brainstorms/`, `workspace/conversations/`, all `AboutFolder.md` files, `Drafts/`, repo-level indexes), `EXTRA_TRACKED_LOCATIONS` (repo-specific additions).

**Three design decisions worth preserving in the changelog for future audits:**
1. **STATUS.md is mandatory on session close; review is optional.** The asymmetry is deliberate — losing the record is worse than committing an unreviewed draft. An unreviewed draft can be corrected at the next session start (the `unreviewed` flag surfaces it); a missing record cannot be reconstructed.
2. **Session-start check is opt-in (Claude asks Andrea each time).** Not every session needs the tracker read. The asking is the discipline; it gives Andrea control over when the tracker is invoked.
3. **The freshness audit uses commits + on-disk modifications only — no past-chats search.** The repo is the source of truth. Sessions that don't leave a trace in the repo (no commit, no saved brainstorm, no saved conversation) are invisible to the audit by design. This enforces the discipline that if work matters, it has to leave a trace via the brainstorming or repo-conversations skills.

**New template — `STATUS_TEMPLATE.md` (v1.0).** The structural skeleton for the per-repo STATUS.md file. Ships with the Pending re-integrations subsection always present, self-documenting via HTML comments, with `(none)` placeholder when nothing's pending. This is the simplest-thing-that-works call after considering and rejecting a `USES_HIERARCHICAL_NAMING` parameter approach — the wallpaper cost of a 3-line empty subsection is much lower than the engineering cost of a conditional parameter with a writing_skill.md trigger cascade.

**`CLAUDE_TEMPLATE.md` updated to v2.1.4.** New working convention added: "STATUS.md is the project tracker — session-start check on Andrea's 'yes,' session-close mandatory update." Skills table gains a row for `project_tracker_skill.md`. The Repository Structure table is **annotated** with a new "Used by" column showing which skills depend on each folder; this includes the new baseline tracked folders (`workspace/brainstorms/`, `workspace/conversations/`). The v2.1.1 hierarchical-naming stop-gap workaround block in the Naming Conventions section is **removed** and replaced with a pointer to STATUS.md's Pending re-integrations subsection. The "Parking Lot" section is **removed** from the template — Parking Lot items now migrate to STATUS.md's "Open questions" section at integration time. A new (commented) Deferred folders subsection placeholder is added below the Repository Structure table for documenting folders Andrea chose to defer at integration/propagation time.

**`PROJECT_SETUP.md` updated to v2.1.4.** Multiple changes:
- Part A (new repo setup): **baseline tracked folders (`workspace/brainstorms/`, `workspace/conversations/`) are auto-created** as part of step 2 (folder structure creation); no asking. STATUS.md is created at root from `STATUS_TEMPLATE.md` as part of step 3 (starter files), filled in with answers from Andrea's setup interview. Header flag: `reviewed`.
- Part B Phase 3 (existing repo integration): a new **Step 2b — Bootstrap STATUS.md and tracked folders** is inserted between Step 2 (copy skills) and Step 3 (refactor CLAUDE.md). Folder bootstrap is per-folder asking with a Deferred folders subsection in CLAUDE.md for declined folders. STATUS.md is drafted from existing artifacts (CLAUDE.md, AboutFolder files, recent CHANGELOG entries, recent commits), walked through section by section for Andrea's review, committed. Parking Lot from existing CLAUDE.md is migrated to STATUS.md's "Open questions" at this step; CLAUDE.md Parking Lot section is removed in Step 3.
- Step 3 (Refactor CLAUDE.md): "What to preserve" list updated — Parking Lot items removed from preserve (they migrate to STATUS.md in Step 2b). New "What migrates out of CLAUDE.md" entry documents the Parking Lot migration.
- Part B Phase 2 (gap analysis): new questions added for project_tracker and STATUS.md presence, workflow mode, folder bootstrap.
- Skill inventory rows added for `project_tracker_skill.md` and `STATUS_TEMPLATE.md` in all four canonical locations (When-it-comes-up table, Part B gap analysis, Files-to-copy list, master file inventory).

**`v2.2_planning.md` updated.** Phase 2.2.D marked SHIPPED with resolution of all five open design questions and the v2.1.1 hierarchical-naming integration requirement. Items 11, 12, and 13 all resolved together since they were designed to fold into one STATUS.md infrastructure.

**Files changed:**
- `LastSkillUpdate/project_tracker_skill.md`: NEW (v1.0).
- `LastSkillUpdate/STATUS_TEMPLATE.md`: NEW (v1.0).
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.3 → v2.1.4). STATUS.md working convention added; Skills table row added; Repository Structure table annotated; v2.1.1 hierarchical-naming workaround removed; Parking Lot section removed.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.3 → v2.1.4). Baseline folders auto-created in Part A; Step 2b inserted in Part B; gap analysis extended; Parking Lot migration documented; inventory tables updated in four locations.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.4 entry prepended.
- `v2.2_planning.md` (repo root): Phase 2.2.D marked SHIPPED with resolution of open design questions; Items 11, 12, 13 all resolved.

**Files unchanged:** all other files in `LastSkillUpdate/`; `starter_package/` (deferred refresh until full v2.2 cycle lands).

**Tracked drift for the post-cycle consistency pass.** No new items added in this patch. Two items remain from v2.1.2 (`repo_conversations_skill.md` and `github_api_workflow.md` missing from `PROJECT_SETUP.md` Files-that-may-be-copied list and `CLAUDE_TEMPLATE.md` Skills table). After this v2.1.4 ship, only Phase 2.2.E remains in the v2.2 cycle; the consistency pass then cleans up tracked drift in a dedicated commit before Phase 3 propagation.

**Cross-repo impact preview (for combined v2.1 + v2.2 Phase 3 propagation later).** Content repos absorbing this patch will receive `project_tracker_skill.md` and `STATUS_TEMPLATE.md` as new files in `skills/`. At Part C propagation time, each repo will need: (a) a bootstrap of STATUS.md from existing artifacts (the procedure is the same as Part B Step 2b); (b) migration of any Parking Lot section from CLAUDE.md to STATUS.md Open questions; (c) per-folder asking for missing baseline tracked folders (`workspace/brainstorms/`, `workspace/conversations/`); (d) annotation of the Repository Structure table with the new "Used by" column (this is largely mechanical — Claude can generate it during the Part C refactor). The session-start check protocol becomes active in every repo as soon as STATUS.md exists; the session-close protocol becomes active immediately. Repos using hierarchical naming (any of Andrea's long-document repos) gain the proper Pending re-integrations subsection — the v2.1.1 stop-gap workaround is no longer needed once STATUS.md is in place, and CLAUDE.md's stop-gap block is removed in the same Part C refactor.

---

## v2.1.3 — May 13, 2026

**Phase 2.2.C of the v2.2 cycle: new generic skill `brainstorming_skill.md` added — two-phase structured-questioning discipline (Understanding → Exploration) for refining rough ideas before drafting, planning, or deciding.**

This patch lands the third slice of the v2.2 cycle, following v2.1.1 and v2.1.2 the previous day. The new skill ports the generalizable core of `claude_researcher`'s upstream brainstorming skill — Phases 1 and 2 of its five-phase structure — and adds an Andrea-specific save mechanism that produces a structured summary (not a transcript) on request. The three upstream phases that did not port were either redundant with Andrea's existing working conventions (incremental presentation) or specific to code-implementation infrastructure (git worktree setup, hand-off to a Writing Plans skill). See `v2.2_planning.md` Item 9 for the original design and `brainstorming_skill.md` for the full spec. Per the planning doc, Phase 3 propagation remains deferred until v2.2 ships in full; v2.1.x patches continue to accumulate on v2.1 and propagate together as one combined cycle when v2.2 is complete.

**New skill — `brainstorming_skill.md` (v1.0).** Two phases: **Understanding** (one question at a time, prefer multiple choice, gather purpose/constraints/success criteria, stop when picture is clear) and **Exploration** (2–3 genuinely different alternatives with trade-offs, surface not recommend, loop back to Phase 1 when new constraints emerge). The skill runs in conversation by default. At the end of the brainstorm — triggered either by Andrea explicitly signaling completion or by Andrea shifting into actual work that uses the brainstorm's output — Claude pauses **once** to ask: "Do you want to save this brainstorm?" If yes, Claude produces a structured summary artifact (not a transcript): question, constraints, success criteria, alternatives considered (each with core idea, in-practice description, trade-offs), what Andrea landed on, why, what's still open, next action. Default filename `YYYYMMDD_brainstorm_[short-topic].md`; default location `workspace/brainstorms/` if it exists, otherwise ask. The save prompt fires once per session; if Andrea declines and later changes her mind, she can ask explicitly.

**Composition with other skills.** The brainstorming skill is upstream of `writing_skill.md` Protocol 2 — when the brainstorm produces a rough outline or framing, Protocol 2 picks up for drafting. Other hand-offs: `paper_processing.md` when the brainstorm clarified what to do with a source; `document_processing.md` for the same in the non-academic case; `email_drafting.md` when the brainstorm decided the angle for a response. Andrea names the next move; the skill does not auto-invoke. The skill is also distinct from `repo_conversations_skill.md`: `repo_conversations` saves whole conversations as chronological transcripts for retrieval; `brainstorming` (when save is requested) produces a structured summary of the distilled product. The two are complementary, not duplicative.

**Future code-project hook noted in the skill body.** When the kit gains a code-implementation planning skill (either by porting `claude_researcher`'s `write-a-plan` skill or by building Andrea's own), `brainstorming_skill.md`'s hand-off section will be extended with a code-project branch (brainstorm → implementation planning rather than → Protocol 2). As of v2.1.3, no such skill exists; the placeholder is documented in the skill so future-Andrea can wire it up cleanly when she's ready to start a code project.

**`PROJECT_SETUP.md` updated to v2.1.3.** `brainstorming_skill.md` row added to: (a) the When-it-comes-up skills inventory table in Part A Phase 2; (b) the Part B gap analysis section with a note about `workspace/brainstorms/` folder; (c) the Files-that-may-be-copied list in Part B Phase 3 Step 2; (d) the master file inventory at the end. No other changes.

**`CLAUDE_TEMPLATE.md` updated to v2.1.3.** `brainstorming_skill.md` row added to the Skills table with trigger phrases. No other changes.

**Files changed:**
- `LastSkillUpdate/brainstorming_skill.md`: NEW (v1.0).
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.2 → v2.1.3). Brainstorming skill added to four locations.
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1.2 → v2.1.3). Brainstorming skill row added to Skills table.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.3 entry prepended.
- `v2.2_planning.md` (repo root): Phase 2.2.C marked shipped with resolution of open design questions.

**Files unchanged:** all other files in `LastSkillUpdate/`; `starter_package/` (deferred refresh until full v2.2 cycle lands).

**Tracked drift for the post-cycle consistency pass.** No new items added in this patch. The two items surfaced during v2.1.2 (`repo_conversations_skill.md` and `github_api_workflow.md` missing from `PROJECT_SETUP.md` Files-that-may-be-copied list and `CLAUDE_TEMPLATE.md` Skills table) remain queued for the consistency pass after Phases D and E complete. See `v2.2_planning.md` Tracked drift section.

**Cross-repo impact preview (for combined v2.1 + v2.2 Phase 3 propagation later).** Content repos absorbing this patch will receive `brainstorming_skill.md` as a new file in `skills/`. No existing skill changes; no parameter changes; no breaking changes. Each repo's `CLAUDE.md` should add an entry pointing at `brainstorming_skill.md` so the brainstorm triggers work. Repos that want the save artifact may need a `workspace/brainstorms/` folder added at propagation time; the skill will ask Andrea where to save if the default folder doesn't exist, so this is not blocking.

---

## v2.1.2 — May 12, 2026

**Phase 2.2.B of the v2.2 cycle: new generic skill `audit_repo_skill.md` added — two-mode infrastructure consistency check (audit / repair) for content repos.**

This patch lands the second slice of the v2.2 cycle, following v2.1.1 earlier the same day. The new skill codifies what was previously a propagation-only housekeeping pass (`PROJECT_SETUP.md` Part C Step 10), generalizes it to run on demand against any content repo, and extends the check set to cover cross-folder reference consistency — the case where a `Drafts/` file cites a paper in `papers/`, or an `AboutFolder.md` in `workspace/` points to a file in `inputs/`. See `v2.2_planning.md` Item 8 for the original design and `audit_repo_skill.md` for the full spec. Per the planning doc, Phase 3 propagation remains deferred until v2.2 ships in full; v2.1.x patches continue to accumulate on v2.1 and propagate together as one combined cycle when v2.2 is complete.

**New skill — `audit_repo_skill.md` (v1.0).** Two modes: **audit** (report findings, propose no fixes, no commit) and **repair** (propose per-finding fixes, apply on approval, commit at end). Seven checks: (1) `CLAUDE.md` skill table matches `SKILLS_FOLDER` contents; (2) `CLAUDE.md` folder-structure section matches disk; (3) folder-level `AboutFolder.md` navigation matches folder reality; (4) `README.md` is current re: skills/folders/kit version; (5) `INDEX_FILES` entry-to-file correspondence in `DELIVERABLE_FOLDERS`; (6) cross-folder reference consistency (the main extension beyond Step 10's housekeeping check); (7) skill-to-skill cross-references inside `SKILLS_FOLDER`. Findings classified as drift fix (mechanical) or requires-decision (judgment needed). Repair-mode options for orphans include update, delete, add, surface, or mark-as-intentional. **Composition rule: surface, do not auto-invoke.** When an orphan is detected, the skill reports it and the user decides whether to invoke `paper_processing.md`, `document_processing.md`, etc. — auto-invocation would prejudge context the audit doesn't have. Configurable parameters via `CLAUDE.md`: `INFRASTRUCTURE_FILES`, `INDEX_FILES`, `DELIVERABLE_FOLDERS`, `SKILLS_FOLDER`, `EXCLUDED_PATHS`.

**`PROJECT_SETUP.md` updated to v2.1.2.** `audit_repo_skill.md` row added to: (a) the When-it-comes-up skills inventory table in Part A Phase 2; (b) the Part B gap analysis section with a note that the skill activates in every repo by default; (c) the Files-that-may-be-copied list in Part B Phase 3 Step 2; (d) the master file inventory at the end. No other changes.

**`CLAUDE_TEMPLATE.md` updated to v2.1.2.** `audit_repo_skill.md` row added to the Skills table with trigger phrases. No other changes.

**Files changed:**
- `LastSkillUpdate/audit_repo_skill.md`: NEW (v1.0).
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1.1 → v2.1.2). Audit skill added to four locations.
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.1 → v2.1.2). Audit skill row added to Skills table.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.2 entry prepended.
- `v2.2_planning.md` (repo root): Phase 2.2.B marked shipped; pre-existing drift in PROJECT_SETUP.md and CLAUDE_TEMPLATE.md noted as a tracked item for a separate consistency-pass commit later.

**Files unchanged:** all other files in `LastSkillUpdate/`; `starter_package/` (deferred refresh until full v2.2 cycle lands).

**Tracked items for future consistency pass.** While adding `audit_repo_skill.md` to the inventory lists, two pre-existing inventory omissions surfaced and were intentionally not fixed in this commit (Andrea's call: scope discipline, fix in a dedicated consistency commit after the remaining v2.2 phases land):
- `repo_conversations_skill.md` is missing from `PROJECT_SETUP.md`'s Files-that-may-be-copied list and from `CLAUDE_TEMPLATE.md`'s Skills table.
- `github_api_workflow.md` is missing from `PROJECT_SETUP.md`'s Files-that-may-be-copied list and from `CLAUDE_TEMPLATE.md`'s Skills table.

These will be cleaned up alongside any other drift surfaced during the planned consistency pass after v2.2 phases C, D, and E complete.

**Cross-repo impact preview (for combined v2.1 + v2.2 Phase 3 propagation later).** Content repos absorbing this patch will receive `audit_repo_skill.md` as a new file in `skills/`. No existing skill changes; no parameter changes; no breaking changes. Each repo's `CLAUDE.md` should add an entry pointing at `audit_repo_skill.md` so the audit triggers work; default parameters (`INFRASTRUCTURE_FILES`, `INDEX_FILES`, `DELIVERABLE_FOLDERS`, `SKILLS_FOLDER`, `EXCLUDED_PATHS`) cover most repos out of the box. Repos with non-standard folder layouts may need tuning at Phase 3 time.

---

## v2.1.1 — May 12, 2026

**Phase 2.2.A of the v2.2 cycle: Working Conventions block expanded; Writing Protocol restructured to use the branch workflow by default, with new document-level finalization, a 10,000-word scale check, and hierarchical naming for chapter/section drafts.**

This patch lands the first slice of the v2.2 cycle — borrowings from `danparshall/claude_researcher` that the May 9, 2026 v2.1 consolidation deferred, plus an Andrea-driven evolution of the Writing Protocol that surfaced during this session. See `v2.2_planning.md` at repo root for the full cycle plan. Per the planning doc, Phase 3 propagation remains deferred until v2.2 ships in full; v2.1.1 and any subsequent v2.1.x patches accumulate on v2.1 and propagate together as one combined cycle when v2.2 is complete.

**`CLAUDE_TEMPLATE.md` updated to v2.1.** Working Conventions block expanded from one universal rule (the existing 3+-repetition codification rule) to five, lifted and adapted from `claude_researcher`'s RESEARCHER.md §1.5 and §5: trackers-are-source-of-truth-not-past-chats (Item 1 of v2.2 planning), don't-infer-ask (Item 4), show-before-committing with a named exception for branch writes (Item 5), and a richer version of codify-after-third-repetition (Item 2). The Writing Protocol section was also rewritten: any drafting task that builds an outline now goes on a branch from step 1 (after a scale check), per `BranchWorkflow_Skill.md`; new outline-unit / drafting-unit terminology distinguishes Protocol 2's scope from its drafting pass size; a new document-level finalization phase (compiled outline + divergence table → outline review → re-read → joint approval) lands before merge. Inline drafting (no branch) is retained for short writes that don't earn an outline step. Naming Conventions section gained a new "Hierarchical naming for drafts" subsection covering the `A1`/`A2`/`B1` chapter/section scheme for projects organizing long documents into hierarchical files.

**`writing_skill.md` Protocol 2 restructured to v1.1.** Step 1 now includes a scale check (suggest splitting if implied length > ~10,000 words / ~25 pages) before the branch is created at the end of step 1. Steps 2–7 retain the iterative per-drafting-unit cycle but with review on the branch (not inline chunk review in chat). **New steps 8–12** add a document-level finalization phase: Claude compiles a descriptive outline + divergence table of the finished document, Andrea reviews the outline first, Andrea re-reads the draft for final adjustments, both the outline and the draft are approved as a pair, then merge with an explicit branch-deletion question. New "Unit of work" section formalizes the outline-unit / drafting-unit / container distinction. New "Assembly cycles" subsection describes how to combine already-completed pieces into a higher-level whole (chapter assembly from sections, etc.): scale check suspended, step 2 lighter for pre-existing pieces, step 4 replaced by collaborative integration. The "Setting up for a new project" list renames "Subsection sizing" to "Drafting-unit sizing." Cross-reference parentheticals added to Protocol 1's session-resumption and show-before-committing rules pointing at the canonical universal rules in CLAUDE.md Working Conventions. The v1.0 inline-chunk-review approach is retired.

**`BranchWorkflow_Skill.md` updated to v1.5.** Trigger section: Protocol 2 engagement is now a named primary trigger, not a "when in doubt" case. Step 6 (Merge to main) updated: companion files (compiled outline + divergence table) explicitly named as part of the merge; branch-deletion question strengthened to "ask every merge, no carryover from prior decisions, no default."

**`repo_conversations_skill.md` updated to v1.0.1.** Clarifying paragraph added near the top: saved conversations are retrievable artifacts, not the resumption mechanism. Resolves Item 1 of the v2.2 planning doc from the skill's side; the canonical rule lives in CLAUDE_TEMPLATE.md Working Conventions.

**`PROJECT_SETUP.md` updated to v2.1.1.** Light terminology refresh in Part B audit table to match writing_skill.md v1.1 ("outline-unit and drafting-unit conventions" instead of "outline and subsection conventions"). No inventory change.

**Repo-level: `CLAUDE.md` updated.** Added a trigger entry for "Let's pick up v2.2" pointing at `v2.2_planning.md`. The planning doc was missing from CLAUDE.md's "Before doing anything" list and "When Andrea says…" section; this fills the gap.

**Repo-level: `v2.2_planning.md` updated.** Note added to Item 11 (STATUS.md / project tracker design): Phase 2.2.D's tracker design must accommodate the chapter/section drift problem introduced by v2.1.1's hierarchical naming convention — per-folder tracker scope, integration state tracking, TODO surfacing, relationship to AboutFolder.md, session-start read. Documents the cross-phase dependency.

**Files changed:**
- `LastSkillUpdate/CLAUDE_TEMPLATE.md`: edit (v2.0.2 → v2.1). Working Conventions expanded; Writing Protocol rewritten; Hierarchical naming subsection added.
- `LastSkillUpdate/writing_skill.md`: edit (v1.0 → v1.1). Protocol 2 restructured around branch workflow + document-level finalization + scale check + assembly cycles.
- `LastSkillUpdate/BranchWorkflow_Skill.md`: edit (v1.4 → v1.5). Trigger updated for Protocol 2 integration; Step 6 strengthened.
- `LastSkillUpdate/repo_conversations_skill.md`: edit (v1.0 → v1.0.1). Clarifying paragraph added.
- `LastSkillUpdate/PROJECT_SETUP.md`: edit (v2.1 → v2.1.1). Terminology refresh, no inventory change.
- `LastSkillUpdate/CHANGELOG.md`: v2.1.1 entry prepended.
- `CLAUDE.md` (repo root): v2.2 trigger added.
- `v2.2_planning.md` (repo root): Item 11 integration note added.

**Files unchanged:** all other 16 files in `LastSkillUpdate/`; `starter_package/` (will be refreshed in a separate pass once the full v2.2 cycle lands — scrubbing required).

**Cross-repo impact preview (for combined v2.1 + v2.2 Phase 3 propagation later).** Content repos absorbing this patch will find that the inline-chunk-review behavior described in older sessions no longer matches the skill. If any repo's `CLAUDE.md` contains a project-specific Writing Protocol implementation that explicitly references "review in chunks," that section will need updating during Part C — flag for Andrea at propagation time. Same flag if a repo's CLAUDE.md uses "subsection" as the universal drafting-unit term without the outline-unit / drafting-unit distinction; that language is now stale. The trackers-not-past-chats rule may also surface tension in repos that have been heavily using `repo_conversations_skill.md` as a resumption mechanism — those repos may need a `CLAUDE.md` clarification on first read. Content repos using long-document workflows will need a "Drafting-unit sizing" entry in their CLAUDE.md to support the new scale check; this is a small CLAUDE.md addition per repo, not a structural change. **Adopting the hierarchical naming convention is a per-repo decision** — existing section/chapter files do not need to be renamed to absorb v2.1.1; Andrea decides at Part C whether each repo retroactively renames its existing drafts or applies the convention only to new drafts going forward.

---

## v2.1 — May 9, 2026

**Two new skills added; BranchWorkflow scope broadened; latex_preamble recovers a previously-lost SimplifiedRegimen improvement.**

This consolidation absorbs three swept bundles (AdmWorkFMM, GrayListPan, SimplifiedRegimen) and bumps the kit from v2.0.4 to v2.1. Minor bump: substantive additions plus one notable edit, but no renames, deletions, or breaking signature changes that would force content repos to adapt.

**New skill — `github_api_workflow.md` (v1.1).** Codifies safe patterns for working with a GitHub repo via the REST API when standard git push/pull is blocked. Originated in SimplifiedRegimen after a May 2026 incident where a shell+curl move helper silently corrupted 25 files; the skill encodes the lessons. The bundled version covered the Contents API only; this consolidation extended it with a Contents-API-vs-Trees-API decision section and a full Trees API recipe for atomic multi-file commits. Single-file work uses Contents API; multi-file batches use Trees API for atomicity. Move/Rename and Bulk Operations sections reframed accordingly. The Trees API path is what `SkillPropagation`'s own consolidation commits already use (Step 9 of the consolidation skill), so the kit and the skill are now aligned.

**New skill — `repo_conversations_skill.md` (v1.0).** Originated in GrayListPan. Defines how to save, index, and retrieve substantive Claude↔user conversations inside a repo. Two save triggers (explicit + proactive-after-3-substantive-turns); fixed transcript format with metadata table; flat `INDEX.md` for retrieval; tag vocabulary that bootstraps free-form and graduates to controlled at a configurable threshold. Cross-references normalized to bare filenames per canonical convention (the bundled version used `workspace/skills/...` paths that wouldn't port).

**`BranchWorkflow_Skill.md` updated to v2.0.2 (from AdmWorkFMM).** Three coherent edits: (1) scope broadened — applies to any co-produced markdown Andrea wants to review, not only markdown driving docx/pptx artifacts; (2) artifact rule tightened — branches hold markdown only, companion artifacts always built from `main` after merge, never on the branch; (3) keep-branch default removed — Claude asks each round, no default disposition.

**`latex_preamble.tex` updated to v1.2 (from SimplifiedRegimen — recovers a lost improvement).** During the v2.0.1 propagation cycle, SimplifiedRegimen's improved preamble was misclassified by the diff prompt and never bundled — the lost-improvement scenario that drove v2.0.3's diff-prompt bug fix. This consolidation finally absorbs those changes: margins reduced from 1.25in to 1in symmetric; `citecolor` changed from PrimaryBlue to black in `hypersetup`; usage-notes header added documenting the `\bigskip` paragraph-spacing convention. **Cross-repo impact:** content repos propagating this kit will see PDF margin and citation-color changes on next regeneration of any document using this preamble. This is intended (the source repo has been living with these changes since April 2026 and they reflect Andrea's actual style preference) but worth noting.

**Files changed:**
- `LastSkillUpdate/BranchWorkflow_Skill.md`: edit (v2.0 → v2.0.2).
- `LastSkillUpdate/github_api_workflow.md`: NEW (v1.1).
- `LastSkillUpdate/latex_preamble.tex`: edit (v1.1 → v1.2).
- `LastSkillUpdate/repo_conversations_skill.md`: NEW (v1.0).
- `LastSkillUpdate/PROJECT_SETUP.md`: inventory updated to add the two new skills; footer marker bumped to v2.1.
- `LastSkillUpdate/CHANGELOG.md`: v2.1 entry prepended.

**Files unchanged:** all other 17 skill, profile, code, and asset files; `CLAUDE_TEMPLATE.md`.

**Bundles archived to `consolidated/20260509_v2.1/`:**
- `skills_AdmWorkFMM.zip` — BranchWorkflow_Skill.md edit; v2.0.2 patch.
- `skills_GrayListPan.zip` — repo_conversations_skill.md (scoped bundle, only this file lifted).
- `skills_SimplifiedRegimen.zip` — github_api_workflow.md (new), github_api_workflow_CHANGES.md (narrative, not promoted), latex_preamble.tex (recovered).

**Outstanding cross-repo migrations.** All content repos that propagate this kit will need a Phase 3 (Part C) pass to pick up the new skills and the latex_preamble change. Specifically: AdmWorkFMM's repo-side update will reset `BranchWorkflow_Skill.md` to v2.0.2 (already its source state, so a no-op there); GrayListPan and SimplifiedRegimen will receive the new skills they originated, plus the cross-pollinated additions; other repos (DEIF, ai-tax, Jensen, PBL, legal-peru, simplified, tdf, rpg) receive everything.

**Note on the `danparshall/claude_researcher` inspection.** Before running Phase 3 propagation, Andrea will inspect a sister repo (a public starter kit she co-authored for general researchers) to see if anything there has evolved that's worth pulling into this kit as a follow-up patch. Any borrowings would land in a v2.1.x patch on top of v2.1, not in this commit.

---

## v2.0.4 — May 2, 2026

**Process patch — Part C housekeeping pass added.**

This patch only touches `PROJECT_SETUP.md` and `CHANGELOG.md`. No skill files change.

**New Part C Step 10 — Housekeeping pass.** Before the atomic commit (now Step 11), Part C runs a housekeeping pass that checks repo infrastructure for consistency with the updated `skills/` folder. Skill propagation can leave stale references, missing index entries, and navigation tables that no longer reflect reality. Catching this before commit means propagation ships a coherent repo, not an updated `skills/` surrounded by stale infrastructure.

**Scope: infrastructure only.** Housekeeping checks root `CLAUDE.md`, `AboutFolder.md`, `README.md`, `PAPERS_INDEX.md`, `MasterIndex.md`, folder-level navigation tables, and repo-specific task skills under non-`skills/` paths. It does **not** modify deliverables (`Drafts/`, `papers/`, `inputs/extracts/`, `inputs/summaries/`, `NotesFromReading/`, etc.). Deliverables are work product; housekeeping only checks that infrastructure references *to* deliverables are accurate.

**Auto-fix vs. surface:**
- **Trivially-fixable** items auto-apply in the same atomic commit: stale name references to renamed files, clearly-deleted skills mentioned in `CLAUDE.md`'s table, missing skill rows for files that exist.
- **Requires-decision** items surface for Andrea before commit: index entries that might be stale or intentionally minimal, deliverables mentioned that don't exist, structural changes larger than renaming.

**Renumbering.** The former Step 10 (commit and clean up) is now Step 11. The commit step also gets two new items in its file list (auto-applied housekeeping fixes; Andrea-approved housekeeping items) and the commit message template gains a "Housekeeping: M auto-fixes, K Andrea-approved adjustments" line.

**Why this is in v2.0.4 not v2.0.3.** This came up after Part C had been exercised on four repos (AdmWorkFMM, AITaxBID, SimplifiedTaxRegimes, plus today's Part B test). Andrea reported that during those propagation runs, she'd been doing housekeeping informally — checking that indexes and references stayed consistent. Codifying the check now means future propagations don't depend on her remembering to run it manually.

**Files changed:**
- `LastSkillUpdate/PROJECT_SETUP.md`: new Step 10 inserted in Part C; former Step 10 renumbered to Step 11; commit step list and message template updated; marker bumped.
- `LastSkillUpdate/CHANGELOG.md`: v2.0.4 entry prepended.

**Files unchanged:**
- All 20 skill, profile, code, and asset files.
- `CLAUDE_TEMPLATE.md`.
- `skills_diff_check_prompt.md`.

---

## v2.0.3 — May 2, 2026

**Process patch — Part D retired, diff prompt bug fixed.**

This patch only touches `PROJECT_SETUP.md`, `skills_diff_check_prompt.md` (in `SkillPropagation/` root, not in the kit itself), and `CHANGELOG.md`. No skill files in the kit change.

**Diff prompt bug fix.** The Skills Diff Check prompt (lives at `SkillPropagation/skills_diff_check_prompt.md`, run by Andrea-pasted in each content repo) had a real bug. Step 3 used Part-C-style classifications ("Outdated — locally modified") that caused content-repo sessions to interpret SHA differences in-session — deciding whether something was "kit-forward" or "locally modified" and sometimes declining to bundle on that basis. The first session that hit this caused a real loss: SimplifiedTaxRegimes' improved `latex_preamble.tex` (margins 1in, citecolor black, `\bigskip` notes) was correctly identified as different from its snapshot but classified as "locally modified" and not bundled. The improvement therefore did not propagate.

The prompt is now patched:
- Step 3 classification language stripped to four mechanical categories: **Unchanged**, **Changed**, **New in current**, **Missing from current**. No interpretation.
- Step 5 bundling gate is now SHA-based: bundle every Changed and every New-in-current file. The previous `current > baseline` (CHANGELOG-version) gate is removed because CHANGELOG markers can drift from file content.
- Step 2 reframed as informational-only (CHANGELOG version comparison reported but does not gate behavior).
- Explicit "no in-session portability judgment" rule added to Step 3.

The bug fix means: **next discovery sweep will surface SimplifiedTaxRegimes' v2.1 latex_preamble.tex** — assuming Andrea has labeled it v2.1 in that repo as planned. See "Pending work" below.

**Part D retired.** All portability judgment ("is this generic or project-specific?") moves to consolidation time. The reasoning: a content-repo session has no view of canonical master and no view of other repos. Asking it to make portability calls is asking for a decision with insufficient information. Consolidation in `SkillPropagation` has the full picture and is the right place for that judgment. Part D worked technically but added a session-end interruption that competed with Andrea's actual work; even lightweight session-end framework questions break flow.

This is the same pattern as v2.0.2's Part E retirement: ask for the right thing at the right time, not at the convenient session-end moment when Andrea is trying to wrap up. v2.0.3 finishes that pattern by extending it to Part D too.

Concretely:
- Section "# Part D: Evaluating Portability of a Repo Improvement" deleted from `PROJECT_SETUP.md`.
- Trigger map row for Part D removed.
- Step 0 triage Part D bullet removed; replaced with note about consolidation-time judgment.
- Part B classification table: "Stronger in repo" action changed from "Evaluate via Part D" to "Flag in integration report; next discovery sweep picks it up."
- Part B Step 6 rewritten the same way.
- No CLAUDE_TEMPLATE.md change needed — Part D wasn't referenced from the template.

**Pending work for the next consolidation cycle:**

The SimplifiedTaxRegimes repo has improvements to `latex_preamble.tex` that did not make it into v2.0 because of the diff prompt bug fixed in this patch. The change has been (or will be) labeled v2.1 in SimplifiedTaxRegimes so the next sweep picks it up. The improvements: page margins from 1.25in to 1in, `citecolor` from `PrimaryBlue` to `black`, and `\bigskip` notes added. Not consolidated in this patch because Andrea is in the middle of other work and a re-sweep right now would be churn for one file. The next time genuine new work in any repo triggers a discovery sweep, this preamble change will come along with it.

**Files changed:**
- `LastSkillUpdate/PROJECT_SETUP.md`: Part D deleted (~63 lines), trigger map, Step 0, Part B classification table, Part B Step 6.
- `skills_diff_check_prompt.md` (in repo root, not in kit): Step 2, Step 3, Step 5 updated.
- `LastSkillUpdate/CHANGELOG.md`: v2.0.3 entry prepended.

**Files unchanged:**
- All 20 skill, profile, code, and asset files.
- `CLAUDE_TEMPLATE.md`.

---

## v2.0.2 — May 2, 2026

**Process patch — Part E retired, Part D rewired, Part C Common Pitfalls added.**

This patch only touches `PROJECT_SETUP.md` and `CLAUDE_TEMPLATE.md`. No skill files change.

**Part E retired.** The "Generating Improvement Artifacts" Part is removed entirely. The Phase 1 model it described — content-repo sessions producing self-contained artifact folders with `CHANGES.md` at session end — never worked reliably in practice (sessions didn't remember to produce them, and the format added work without clear payoff). It was already replaced by the Andrea-initiated discovery sweep in v2.0; v2.0.2 just removes the dead text. Concretely:
- Section "# Part E: Generating Improvement Artifacts" deleted from `PROJECT_SETUP.md`.
- Trigger map row for Part E removed.
- Step 0 triage bullet for Part E removed; replaced with a brief note explaining the new model.
- Default working-conventions bullet about session-end artifacts removed.
- `CLAUDE_TEMPLATE.md` working-conventions bullet about session-end artifacts removed (the rule that propagates to every new repo's `CLAUDE.md` is gone).
- Part C Step 7 flipped: was "add the rule if missing"; now "remove the rule if present" (so v2.0.2 propagation cleans up legacy `CLAUDE.md` files in existing repos).

**Part D rewired.** Part D (Evaluating Portability) is kept as the decision framework but no longer points at Part E for delivery. New plumbing: portable changes simply stay in the repo's `skills/` folder; the next discovery sweep run from `SkillPropagation` (via `skills_diff_check_prompt.md`) picks them up via SHA diff. Project-specific changes get reverted from `skills/` (and possibly moved to a repo-local task skill outside `skills/`). Step 4 rewritten accordingly.

**Common pitfalls section added to Part C.** Two real issues encountered during v2.0 → v2.0.1 propagations to content repos, banked here so future sessions don't re-discover them:
- **Empty-file commits when adding new files.** Helpers that download "files that differ" from active `skills/` skip additions and renames, since those don't appear in the differs list. Fix: load every file in the staging folder before applying any operation in Step 5.
- **Folder deletion is per-file in the GitHub API.** No directory-level delete. Iterate the files; the directory disappears automatically.

**Files changed:**
- `PROJECT_SETUP.md`: top-of-file intro, trigger map, Step 0 triage, default working conventions list, Part C Step 7, new Part C "Common pitfalls" section, Part D Steps 3 + 4 + summary line, Part E section deleted, Appendix meta-file descriptions updated for v2.0.1+ full-kit model.
- `CLAUDE_TEMPLATE.md`: working-conventions bullet about session-end artifacts removed.
- `CHANGELOG.md`: v2.0.2 entry prepended.

**Files unchanged:**
- All 20 skill, profile, code, and asset files. No content changes to the kit itself.

**On propagation order:** content repos already at v2.0 (currently AdmWorkFMM) will get the v2.0.2 cleanup — including removal of the legacy "session-end improvement artifact" rule from their root `CLAUDE.md` — as part of the next Part C run. No special migration needed.

---

## v2.0.1 — May 2, 2026

**Process patch — full kit propagates by default; snapshot refresh added.**

This patch only touches `PROJECT_SETUP.md`. No skill files change. The patch reverses two design choices from v1.x and adds a new step.

**Reversal — full kit propagates by default (Part A and Part C).**

The v1.x default was opt-in: each project activated the skills it needed, and Part C never auto-added new skills to existing repos. Andrea explicitly tested this approach for ~a month (April 2026) and found it inefficient — reaching for a skill mid-task and discovering it wasn't activated for this project broke flow. Conclusion: every project should have every skill available, even unused ones.

**Concrete changes:**
- **Part A Phase 3 (Skills Activation):** the table is now advisory ("when this skill comes up") rather than gating ("which skills do you need"). Q6 reframed to ask which skills are *likely to come up* — informational, drives Q7/Q8 follow-ups, but does not filter `skills/` contents.
- **Part A Setup actions:** new repo seeding copies the *full kit* into `skills/` plus an identical `skills/LastSkillUpdate/` snapshot, regardless of which skills Andrea expects to use.
- **Part C Core principle #4:** reversed. New skills now propagate by default. Andrea can decline a specific file at Step 4 if she has a reason, but the default is "add."
- **Part C Step 3 classification:** the action for "New in staging, not in repo" changes from "do NOT add without explicit request" to "add by default; mention to Andrea."

**The previous opt-in model is preserved in git history** at commit `d320d1e3182e` (the v2.0 commit). If full-kit-everywhere proves wrong over time, revert is straightforward.

**Addition — Step 9: Refresh `skills/LastSkillUpdate/` snapshot.**

Part C now ends with an explicit step that wholesale-refreshes the repo's `skills/LastSkillUpdate/` snapshot from the active `skills/` after all updates land. Reason: the v2.0 consolidation revealed that stale snapshots produce noise in the next discovery cycle's Skills Diff Check (the AITaxBID bundle contained 14 files of "changes" that turned out to be the repo's active files merely looking newer than its outdated snapshot). Refresh-from-active means the snapshot represents what the repo actually has, including any files Andrea declined.

**The snapshot is read-only between propagations.** Andrea and Claude only edit files in active `skills/` during normal work; `LastSkillUpdate/` is touched only by Part C runs. This is what makes the next Skills Diff Check meaningful.

**Files changed:**
- `PROJECT_SETUP.md`: Part A Phase 3, Part A Setup actions, Part C principles, Part C Step 1, Part C Step 3 classification, Part C Step 5 action for new files, Part C Step 7, new Part C Step 9 (snapshot refresh), Part C Step 10 (renumbered from former Step 9, commit list updated to include snapshot refresh).
- `CHANGELOG.md`: v2.0.1 entry prepended.

**Files unchanged:**
- All 20 skill, profile, code, and asset files. No content changes to the kit itself.

---

## v2.0 — May 2, 2026

**Re-baseline.** This release is a deliberate major-version bump used to reset every content repo to a common floor. Earlier minor versions had drifted across repos because of parallel local edits; v2.0 ends that drift. After Phase 3 propagation, every repo's `skills/` and its nested `LastSkillUpdate/` snapshot will sit at v2.0 simultaneously.

The content delta itself absorbs work from the AdmWorkFMM repo (its local v1.2 through v1.5). It is not a breaking change in the strict sense — no APIs are removed and the kit's external interface is stable — but the re-baseline justifies the major bump on its own.

**Word document title-block — byline rules tightened:**
- `fmm_docx_formatting_skill.md`: Author byline is no longer added by default. Many FMM documents are co-produced (with Marta, Monica, Erivaldo, others), so unilaterally putting Andrea's name on a co-produced document is wrong. Before generating a `.docx`, Claude **always asks Andrea**: "Should your name go on this as author?" If yes, asks for the exact attribution she wants. If no, omits the byline entirely.
- Date removed from byline. The page header already carries "FMM — [month] [year]"; a date in the byline is redundant.
- `word_preamble.js`: Top-of-file docstring updated to document the new rules. The function signature still accepts `date` for backward compatibility, but new scripts should not pass it. Marker line normalized from `Updated:` to `Last updated:` (consistency with audit regex).

**Update to FMM institutional style — describing the División's research:**
- `Andrea_FMM_Institutional_Style_Profile.md`: New sub-section under Section 2 (Person and Attribution): "Describing the División's research." Establishes that when the División funds a study, the right framing is *"our research / investigación de la División"*, not *"FMM-funded research / investigación financiada por la FMM"*. The "funded by" framing reads as passive financing and understates the División's active role in conceiving, supervising, and partnering on design and analysis. Applies to slides, briefings, papers, blog posts, and any institutional document.

**New workflow skill — branch-based document review:**
- `BranchWorkflow_Skill.md`: New protocol for the case where Claude and Andrea co-produce a document and Andrea wants to read and comment on it before signoff. Claude creates a working branch from main; Andrea edits the markdown directly on the remote (GitHub web UI or local git); Claude pulls, applies the comments, proofreads direct edits, regenerates dependent docx/pptx, pushes back to the branch; iterate until done; merge to main.
- Two edit modes: (1) bracketed comments — Andrea writes plain-language thoughts inside square brackets in her own words, no required vocabulary or tags. Claude reads each bracket and infers from content whether it's an instruction, question, or ambiguous, asking before acting on substantive choices. (2) Direct edits — Andrea rewrites text in place. Claude detects via `git diff` against the branch-creation commit. Light proofreading (typos, accents, punctuation, citation formatting) is silent; heavy issues (terminology drift, voice consistency) are surfaced for Andrea to decide and never auto-fixed.
- Branch naming convention: `<project-slug>-<purpose>-<date>`. Andrea always edits on the remote — no "paste edits in chat" path.
- `CLAUDE_TEMPLATE.md`: Added a row in the skills table so new repos created from the template list this skill from day one.
- `PROJECT_SETUP.md`: Added `BranchWorkflow_Skill.md` to the Phase 3 Skills Activation menu (Part A) and to the Appendix Full Skills Kit Inventory.

**Marta's voice profile — presentation style added:**
- `Marta_Writing_Voice_Profile.md`: Section 9 added on presentation style — distinct from prose editing covered in Section 8. Sub-section 9.0 on deck-level architecture (storytelling and conceptual framework — stated directly by Marta on April 30 while restructuring the OECD tax-compliance deck) plus sub-sections 9.1–9.12 reconstructing patterns from the April 17 + April 19 Knowledge Agenda reviews and the April 30 OECD restructuring (strip meta-labels, group studies by sub-topic, trim bullets, cut "We continue developing" scaffolding, one framing for the narrative spine, 4–5 representative items, flat sub-topic headers, table format when tabular).
- Status framing: most rules in Section 9 are reconstructed from cuts (negative evidence) and are explicitly provisional. The 9.0 architecture rule is one of two firmer rules — Marta stated it directly. When in doubt, offer Marta choices and let preference emerge.
- Previous "Section 9. Summary" renumbered as Section 10 and clarified as the prose-draft pass.

**Paper processing — dual-protocol structure:**
- `paper_processing.md`: Restructured to support two document categories with shared pipeline. New **Step 0 (triage)** asks three structural questions to route each document into one of two protocols.
- **Protocol A** (academic-style) is the existing workflow, relabeled. Filename uses individual author. BibTeX uses `@article` / `@unpublished`.
- **Protocol B** (institutional-style) is new. Covers G20 / IMF / World Bank / OECD / UN flagship reports, multilateral working-group papers, regional development bank policy reports, tax-authority research syntheses, institutional monographs. Filename uses institution; BibTeX uses `@techreport` / `@book` / `@inbook` with double-braced institutional author.
- Triggering description in YAML frontmatter expanded to mention "process this report" and clarify that the skill routes via Step 0.
- IDB papers continue to be triaged on structure, not publisher: most IDB Discussion Papers, Technical Notes, and Working Papers route to Protocol A; monographs and synthesis pieces to Protocol B.

**Source bundles processed in this consolidation:**
- `skills_AdmWorkFMM.zip` — 6 explicit operations + 1 implicit (CLAUDE_TEMPLATE row)
- `skills_AITaxBID.zip` — received and reviewed; entirely behind master, no operations applied. Archived as-is for the trail. AITaxBID needs Phase 3 propagation post-v2.0 to catch up.

**Repos swept clean (no bundle produced):** None reported in this round (single-cycle observation; repos other than AITaxBID and AdmWorkFMM were not part of this sweep).

---

## v1.3.1 — April 16, 2026

**PROJECT_SETUP.md full review and rewrite:**

Following the first consolidation (v1.3), the cross-repo propagation architecture
moved from "kit lives on Andrea's laptop" to "kit lives in `SkillPropagation/LastSkillUpdate/`."
This patch aligns `PROJECT_SETUP.md` with the new architecture and addresses 24
findings from a full file review:

*Trigger map and triage:*
- Added a trigger map at the top of the file routing between Parts A–E based on
  what Andrea asks for.
- Expanded Step 0 triage to cover all five parts, not just A vs. B.

*Part A — New Project Setup:*
- Added a "Bundled assets" column to the Phase 3 skills menu so activating a
  slide skill also pulls in its backgrounds/logos.
- Explicit session-end improvement-artifact rule added to the default working
  conventions list.
- Setup actions Step 2 now specifies that the kit comes from
  `SkillPropagation/LastSkillUpdate/`, not an unspecified laptop folder.
- Setup actions Step 3 now creates a `skills/CHANGELOG.md` in each new repo so
  future Part C runs can read the repo's kit version.

*Part B — Skill Integration:*
- Audit inventory now explicitly checks for the repo's kit version (from
  `skills/CHANGELOG.md`).
- Assessment section completed for the three v1.1+ skills that were missing
  (`fmm_coordination_slides_skill.md`, `academic_slides_skill.md`,
  `academic_paper_latex_skill.md`) and for the slide asset files.
- Phase 3 integration file list updated to include the v1.1+ skills and all
  PNG assets.
- Step 6 now routes "stronger in repo" cases to Part D for portability
  evaluation (rather than pointing directly at the old in-session edit flow).

*Part C — Propagating Kit Updates (rewritten):*
- Entirely rewritten around the staging-folder workflow: Andrea manually
  creates `skills/pending_v1.X/` in the target repo with files from the
  consolidation zip; Claude diffs against existing `skills/`.
- Conservative default: new files in the staging folder are NOT propagated
  automatically; Andrea must explicitly request them.
- Explicit "Rename target" classification in the file-status table, with a
  dedicated step for scanning the whole repo (not just `skills/`) for
  references to renamed files.
- Step 8 updates `skills/CHANGELOG.md` so the repo records which kit version
  it's now on.
- Step 9 deletes the staging folder as part of the atomic commit.

*Part D — Evaluating Portability (rescoped):*
- Part D was overlapping with Part E in the v1.3 kit. Rescoped to focus on
  portability evaluation only (Steps 1–3 kept); old Steps 4–5 (draft the generic,
  save, bump version) removed because that work now happens in Part E and in
  consolidation sessions, not in content-repo sessions.
- Part D now ends by routing approved-to-absorb items to Part E.

*Part E — Generating Improvement Artifacts (tightened):*
- Artifact structure clarified: always flat, no nested subfolders (the
  `kit_proposal_v1.X/` subfolder used in the first real artifact was an ad-hoc
  convention, not a pattern to repeat).
- `CHANGES.md` template now includes explicit operation markers
  (`Operation: edit | rename | addition | deletion`) and a dedicated
  `Rename: old.md → new.md` line so the consolidation skill can parse them
  reliably rather than inferring from prose.
- New sections added to the template for deletions, additions, and
  binary/asset changes.
- `Portable?` field simplified from three values to two (`yes | yes-but-generalize`)
  — `repo-specific` wasn't a producible state since in that case no artifact
  gets produced.
- New field: target kit version the change was produced against (helps
  consolidation detect rebase conflicts).
- Trigger section now points to Part D as the portability evaluation framework
  when Andrea is unsure.

*Appendix:*
- `CHANGELOG.md` description updated to reflect that it IS copied to repos
  (previously marked "not copied to repos" — but in the new architecture,
  repos need their own copy to record which version they're on).
- Asset entries annotated with activation-conditional language.

*Version marker added:*
- `PROJECT_SETUP.md` now carries a "Last updated" marker at the bottom,
  consistent with skill files.

**CLAUDE_TEMPLATE.md — Last updated marker:**
- Added a "Last updated" marker at the bottom for consistency.

**No content changes** to skill files, profiles, preambles, or assets in this
patch. This is a meta-file refresh only.

---

## v1.3 — April 16, 2026

**Marta reclassified from skill to profile:**
- Renamed `MartaRuizArranz_WritingVoice_Skill.md` → `Marta_Writing_Voice_Profile.md`. The file describes a writing voice (prescriptive content guide), not a workflow — consistent with `Andrea_Writing_Style_Profile.md` and `Andrea_FMM_Institutional_Style_Profile.md`, which are both profiles. File content is unchanged; only the name and classification change.
- `CLAUDE_TEMPLATE.md`: Updated the two references to Marta's file to use the new name.
- `PROJECT_SETUP.md`: Updated all four references (skills menu, integration section, file list, and appendix inventory) to use the new name.
- All existing repos with `skills/MartaRuizArranz_WritingVoice_Skill.md` will need a rename during their next Part C propagation. See `SkillPropagation` repo for migration notes.

**Cross-repo improvement artifact workflow (new):**
- `PROJECT_SETUP.md`: Added **Part E** covering when and how to generate an improvement artifact — a lightweight export produced at session end when a generic skill in `skills/` has been improved in a way that should flow back to the canonical kit. Defines the trigger conditions, folder naming (`YYYYMMDD_<repo>_<topic>/`), required contents (the edited file(s) + a `CHANGES.md`), and delivery pattern (download for Andrea to upload to her `SkillPropagation` repo's `incoming/` folder).
- `CLAUDE_TEMPLATE.md`: Added a corresponding rule under Working Conventions so every new project inherits the behavior.
- The canonical kit itself lives in a new dedicated repo, `SkillPropagation`, in a `LastSkillUpdate/` folder (the current master). Periodic consolidation sessions there merge pending `incoming/` artifacts into the master, producing the next version.

**Audit-driven hygiene fixes (applied during first consolidation):**
- `PROJECT_SETUP.md`: Added missing asset entries to the Appendix inventory — `IDBLogo.png`, `BackgroundTitle.png`, `BackgroundBody.png`, `BackgroundBodyWhite.png`. These files were added to the kit in v1.1 along with the slide skills, but the appendix was not updated at the time.
- `PROJECT_SETUP.md`: Updated `Marta_Writing_Voice_Profile.md` appendix row to show Type = "Style profile" (was "Skill") — matches the reclassification.
- `fmm_coordination_slides_skill.md`: Bumped internal "Last updated" marker from v1.1 to v1.2. The content was already at v1.2 (color additions, makecell, markdown mirror) from the v1.2 kit release, but the marker wasn't bumped at the time.
- `word_preamble.js`: Normalized the version marker in the header comment from "Updated:" to "Last updated:" for consistency with other kit files (enables audit regex to catch drift).
- `academic_paper_latex_skill.md`: Corrected internal "Last updated" marker from v1.0 to v1.1 — the file was created in v1.1 but the marker was left at v1.0.

---

## v1.2 — April 13, 2026

**Color palette expansion (all slide skills):**
- Added three new colors to both `academic_slides_skill.md` and `fmm_coordination_slides_skill.md`: `SoftBlue` {173, 216, 230}, `LightGreen` {180, 200, 150}, `WarmCream` {255, 243, 214}. These support heatmap/conditional-color tables.

**Academic slides skill (v1.2):**
- Fixed section divider template: must use `[plain]` frame option + `\vfill` to suppress the frametitle bar overlay.
- Added `\usepackage{makecell}` to preamble (needed for multi-line table cells in heatmap tables).
- Added heatmap/conditional-color table guidance with `\cellcolor` convention (WarmCream = high, SoftBlue = mid, LightGreen = low) and legend pattern.
- Added markdown mirror convention for slide decks (`_text.md` companion file).

**FMM coordination slides skill (v1.1):**
- Added `SoftBlue`, `LightGreen`, `WarmCream` to preamble and palette documentation.
- Added `\usepackage{makecell}` to preamble.
- Added markdown mirror convention.

**CLAUDE_TEMPLATE.md:**
- Added mention that slide decks (`.tex` Beamer files) get a `_text.md` markdown mirror alongside the `.tex` file, in addition to the existing markdown mirror convention for documents.

---

## v1.1 — April 13, 2026

**New skill — FMM coordination slides:**
- `fmm_coordination_slides_skill.md`: New skill for internal division Beamer slides. Covers preamble, colors, slide types (title, text+bullets, TikZ diagrams, tcolorbox process flows), two body background options (light blue / white), language choice (English default). Added to CLAUDE_TEMPLATE skills table and PROJECT_SETUP inventory and skills menu.

**New skill — Academic paper LaTeX:**
- `academic_paper_latex_skill.md`: New skill for academic economics papers in LaTeX. Covers preamble (article class, 11pt, 1-inch margins, 1.5 spacing), custom title page with author minipages, `natbib` + `.bib` citations (no hardcoded references), `booktabs` tables, `\figurenote`/`\tablenote` commands, cross-referencing conventions, comparison with FMM document preamble. Added to CLAUDE_TEMPLATE and PROJECT_SETUP.

**New skill — Academic slides:**
- `academic_slides_skill.md`: New skill for academic presentations (Beamer/Boadilla theme). Covers title page with authors/affiliations/conference name, presentation arc (motivation → outline → section dividers → content → conclusion → appendix), slide types (two-column, blocks, equations, tables, TikZ, navigation buttons), IDB logo at 0.35in (reduced from 0.5in). Added to CLAUDE_TEMPLATE and PROJECT_SETUP.

**Cross-format branding alignment (LaTeX ↔ Word):**
- `latex_preamble.tex`: Page number color changed to SecondaryBlue (was black), matching Word
- `latex_preamble.tex`: List marker colors changed to PrimaryBlue (were SecondaryBlue), matching Word
- `latex_preamble.tex`: Title size fixed at 14pt (was \LARGE ~17pt), matching Word's 14pt ceiling. Decision documented in comments; future revision may differentiate title/H1 sizes
- `latex_preamble.tex`: Added right-aligned header ("FMM — [date]", 9pt SecondaryBlue italic), matching Word. Removed bold "FMM" text from footer (header now carries it)
- `latex_preamble.tex`: Left margin fixed from 1.1in to 1.25in (symmetric). Comment added explaining why LaTeX uses 1.25in vs Word's 1in
- `fmm_docx_formatting_skill.md`: Updated footer note to reflect LaTeX/Word alignment. Added margin difference note. Added Heading 3 style spec

**Heading 3 added:**
- `fmm_docx_formatting_skill.md`: Added Heading 3 (11pt bold SecondaryBlue, spacing before 200/after 80, outlineLevel 2)
- `word_preamble.js`: Added Heading 3 paragraph style, h3() helper function, and export

**Marta's voice — conflict resolution:**
- `MartaRuizArranz_WritingVoice_Skill.md`: Added rule under two-pass section: when institutional pass and Marta's voice conflict, Marta's voice wins

**CLAUDE_TEMPLATE — reduced duplication:**
- `CLAUDE_TEMPLATE.md`: Writing Protocol section trimmed to key rules + reference to `skills/writing_skill.md` (was full step-by-step copy)

**Document processing — worked example and clarification:**
- `document_processing.md`: Added structural skeleton example for document summaries (format only, no real content). Clarified "Template value" field with concrete example

**Email drafting — do not infer rule:**
- `email_drafting.md`: Added "Do not infer — ask" as step 5 in workflow

**Infrastructure:**
- All changed files now carry version numbers (v1.1) in their "Last updated" lines
- `CHANGELOG.md` created (this file)

---

## v1.0 — April 11, 2026

Initial release of the generic skills kit. All files created and documented.

Files: `writing_skill.md`, `paper_processing.md`, `document_processing.md`, `email_drafting.md`, `MartaRuizArranz_WritingVoice_Skill.md`, `Andrea_Writing_Style_Profile.md`, `Andrea_FMM_Institutional_Style_Profile.md`, `fmm_docx_formatting_skill.md`, `word_preamble.js`, `latex_preamble.tex`, `KnowledgeLogo.png`, `CLAUDE_TEMPLATE.md`, `PROJECT_SETUP.md`.
















