# Translation corrections log

**What this is:** the append-only raw trail of Spanish naturalness corrections — every pair captured at a translation review's close-out (`translation_review_skill.md`), as *unnatural → natural → why*. This is the corpus the distilled-patterns section grows from. Entries are **never edited or pruned** locally; the log only grows.

**Lifecycle:** local appends travel back with the discovery sweep; at consolidation, pairs are merged into the canonical log (portable learning — every repo inherits every repo's corrections) and recurring kinds are folded into the skill's patterns section; at propagation, the file reconciles per `PROJECT_SETUP.md` Part C's per-file local-modification handling — pairs appended since the last sweep are preserved.

**Entry format:**

```
## YYYY-MM-DD — <document or branch-ref>
- **Unnatural:** <Claude's original Spanish>
- **Natural:** <Andrea's correction>
- **Why:** <one line naming the kind of problem>
```

One `##` block per review round; multiple pairs under one block are fine (repeat the three-line group). The why is drafted by Claude and confirmed by Andrea at the close-out.

---

*(No entries yet.)*


---

*Kit file — the append-only corrections log shipped with `translation_review_skill.md` (v4 translation-review build, 2026-06-10). Kit version floor v2.0.0; final stamp set by the v4 re-baseline at cycle close.*
