---
name: translation-review
description: "Review pass for Spanish translations of deliverables — naturalness, not proofreading. The translations are accurate; the failure mode is Spanish that sounds translated. Andrea's ear is the reviewer of record; this skill externalizes her corrections so Claude's first-pass Spanish improves over time. Triggers: translating any deliverable to Spanish ('translate this to Spanish,' 'now the Spanish version'), 'review the translation,' or the voice skills' translation hand-off (each style profile's §14). Activation rides the Voice and style cluster — wherever the voice skills are active, this skill is too. Does NOT cover Portuguese (Andrea's Portuguese ear cannot adjudicate naturalness — a Portuguese review would be a different design with a different reviewer, not this skill stretched); does NOT relax the voice skills' structure and conciseness discipline (see the boundary section); does NOT modify the writing-branch flow (it rides it unchanged)."
---

# Translation review — natural Spanish

**Status:** active.
**Owner:** Andrea Lopez-Luzuriaga.
**Applies to:** any deliverable translated into Spanish — papers, policy notes, slides content, briefs. Both moments: the **first pass** (apply the distilled patterns below while translating) and the **review round** (capture Andrea's corrections so the patterns grow).
**Companion file:** `translation_corrections_log.md` — the append-only raw trail of correction pairs. The two files travel together as a pair (the format-cluster pattern: skill + companion).

---

## The failure mode and the purpose

Claude's Spanish translations are **correct but unnatural**: accurate in meaning, faithful to the English structure, and yet they read as translated — a native reader hears the English underneath. This is not a proofreading problem; there is usually nothing to *fix* in the grammar. It is a naturalness problem, and the instrument that detects it is **Andrea's ear**. Claude may self-flag candidates while translating ("this sentence reads translated to me"), but the authoritative correction is always hers.

The purpose of this skill is to externalize that tacit instrument, pair by pair: every correction Andrea makes is captured as *unnatural → natural → why*, the recurring kinds get distilled into the patterns section below, and Claude applies the patterns on the next first pass. The payoff runs in one direction — **she corrects less over time**, because the first-pass Spanish absorbs what her ear has already taught.

## The boundary against the voice skills' §14

The voice profiles (`andrea_writing_style_skill.md` §14, `andrea_fmm_institutional_style_skill.md` §14) impose an anti-circularity discipline on translation: the English version's structure, conciseness, and forward-moving paragraph logic are preserved; the translation must not drift toward long setups, qualifiers, and circular paragraphs. **That discipline holds. This skill works below it.** Naturalness lives at the sentence's joints — punctuation habits, connectors, calques, register, word choice — not at the level of structure or argument. A sentence can be recast to sound like Spanish while the paragraph it sits in stays English-disciplined: claims early, paragraphs that land, no throat-clearing. Nothing in this skill, the patterns section, or the corrections log is ever a license to reintroduce the circular conventions §14 pushes against. If a proposed pattern would loosen structure rather than naturalize a joint, it is out of scope by definition.

## Scope: Spanish only

This skill covers **Spanish**. Portuguese is excluded *with a reason*, not deferred: the design's premise is that the reviewer's ear is the instrument, and Andrea's Portuguese is not strong enough to adjudicate naturalness (her call; Portuguese volume is also rare). A Portuguese review loop would need a different reviewer of record — a native-speaker colleague — and is therefore a different design, not this skill with the language swapped.

## The review protocol — rides the writing-branch flow

The mechanism is the existing `writing_branch_skill.md` flow, **reused, not modified**:

1. Claude translates the deliverable **on a branch** (Protocol per `writing_branch_skill.md` Step 1; the normal `<slug>-<purpose>-<date>` naming, purpose `review` or `edits`). While translating, Claude applies every pattern in the distilled-patterns section and may flag sentences it suspects still read translated.
2. Andrea reads the Spanish **in the branch and corrects in place** (writing-branch Mode 2 direct edits). Optional bracketed whys when time allows — `[suena a inglés — en español va con coma]` — but no annotation is required; the correction alone is enough.
3. **The diff is the pair-capture.** When she signals the round is done, the branch diff against the translation commit yields every unnatural → natural pair for free — her review effort stays exactly what it would have been without this skill.
4. Merge per the writing-branch flow, then run the close-out below.

**One seam with writing-branch Step 4, stated explicitly:** in a translation-review round, Andrea's direct corrections are **authoritative on naturalness** — Claude applies them and never "proofreads" them back toward its own phrasing. The heavy-proofread flag (terminology drift, internal inconsistency) applies only to genuine within-document conflicts — e.g. the same term corrected two different ways in one round — never to second-guessing her naturalness call.

## The close-out four-step

After the merge (or at session close if the merge waits):

1. **Walk the diff.** Collect every correction as an unnatural → natural pair.
2. **Draft the whys.** For each pair, Claude drafts a one-line why naming the *kind* of problem (em-dash habit, calqued connector, register, word choice…). Andrea confirms the batch, fixing only the wrong ones — the annotation cost lands on Claude, not her.
3. **Append to the log.** Write the confirmed pairs to `translation_corrections_log.md` in the entry format defined there. Append-only; existing entries are never edited.
4. **Maturity check.** If a correction *kind* is recurring across the log, **propose** a patterns-section edit — prompt-don't-perform, approved like any skill change. On approval, edit this file's patterns section; the change travels back through the normal sweep and is folded into the canonical skill at consolidation, so every repo inherits it.

There is **no pre-built taxonomy.** The why names the kind in plain words; categories emerge from the log as kinds recur. (Punctuation, connectors, calques, and register are expected to emerge — they are not pre-written as sections.)

## Distilled patterns

*This section grows from the corrections log via the maturity check. It is the layer Claude applies on every first pass. Seeded with the two patterns Andrea has already named; everything else earns its way in through recurrence.*

- **Em-dashes (seed).** Em-dash interruptions are an English habit; Spanish prose recasts them — usually with commas, parentheses, or a colon, sometimes by splitting the sentence. Do not carry the English em-dash structure into the Spanish sentence by default.
- **Carried-over connectors (seed).** English connectors translated one-for-one ("however" → "sin embargo" in every slot, "in turn," "moreover" chains) read translated. Choose the connector Spanish would use at that joint — or none; Spanish often links with syntax where English inserts a connector word.

## The companion log and its lifecycle

`translation_corrections_log.md` is the raw trail: every confirmed pair, append-only, never edited or pruned locally. Its lifecycle through the kit cycle: local appends are picked up by the **discovery sweep** like any changed kit file; at **consolidation**, pairs are **merged into the canonical log** — a correction pair is portable learning, not repo-local evidence, so every repo inherits every repo's corrections at the next propagation — and matured patterns are folded into this file's patterns section; at **propagation**, the file reconciles per `PROJECT_SETUP.md` Part C's per-file local-modification handling, so pairs appended since the last sweep are preserved, never silently dropped.

---

*Last updated: June 10, 2026 — v2.0.0 (v4 translation-review build: new skill, shipped as a companion-file pair with `translation_corrections_log.md` in the Voice and style cluster. Carries the v2.0.0 floor; final stamp at the v4 re-baseline.)*
