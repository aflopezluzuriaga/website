---
name: email-drafting
description: "Draft emails in Andrea's voice. Read this skill before drafting any email — do not rely on memory of its contents from prior conversations. Captures Andrea's voice patterns extracted from real work emails: concise (2–5 sentences typically), warm, proactive; default Spanish, switching to English by thread or recipient; signature is always 'Saludos / Andrea' or 'Best regards / Andrea' (no title block, no phone). Tone calibrated by recipient: respectful-familiar with Marta (always frame as proposal seeking approval), professional-direct with Alejandro and Phil, warm-collaborative with team and counterparts. Triggers: 'draft an email to X,' 'reply to this email,' 'write a message to X,' 'help me respond,' or any request to compose email correspondence."
---

# Email Drafting Skill — Andrea

## Purpose

Draft emails in Andrea's voice. This skill captures her actual email patterns, extracted from a sample of ~20 real work emails (March 2026).

**Rule:** Read this skill before drafting any email. Do not rely on memory of its contents from prior conversations.

## Core Voice

Andrea's emails are **concise, warm, and proactive**. Most are 2–5 sentences. She gives context only when needed, makes her ask clear, and closes. She never overwrites.

**Default language:** Spanish. Switch to English when the thread is in English, when the recipient communicates primarily in English, or when Andrea specifies.

**Signature:** Always just:
```
Saludos
Andrea
```
Or in English:
```
Best regards,
Andrea
```
No title, no signature block, no phone number. (Outlook adds the institutional signature automatically.)

More formal variant for group or institutional emails:
```
Saludos cordiales,
Andrea
```

## Tone by Recipient

### Marta (boss)

- **Register:** Respectful-familiar. Tú conjugation but with polite, deferential framing.
- **Key pattern — always seek approval:** Marta approves plans. Never present a decision as made. Always frame as a proposal: "Si estás de acuerdo, puedo..." / "¿Quisieras que...?" / "Preparé esto por si quisieras..."
- **Structure:** Context first (brief) → Proposal/options → Request for approval.
- **Offer options** when relevant: "Tal vez Zoila y Edna... o con Axel..."
- **Be proactive:** Anticipate what Marta needs. Draft things for her, prepare options, flag connections she might not have seen.
- **Example patterns:**
  - "Estimada Marta, Un poco de contexto: [1-2 sentences]. [Proposal]. Si estás de acuerdo, puedo [next step]. Saludos, Andrea"
  - "Estimada Marta, Preparé este borrador [de X] por si quisieras [action]. Saludos, Andrea"
  - "Estimada Marta, [Context]. ¿Quisieras que coordinara con [options]? Saludos, Andrea"

### Alejandro & Phil (accountability peers)

- **Register:** Professional, warm, direct. English preferred with Phil.
- **Structure:** Brief context → Clear ask or deliverable → Close.
- **Hedge strong opinions politely:** "Nothing is something we feel super strongly about, so I leave it to your judgment."
- **When sharing deliverables:** State what changed and what's attached. Credit the team member who did the work: "Edna expanded the conclusion to account for your comments."
- **Clarify misunderstandings calmly and factually**, no defensiveness.
- **Example patterns:**
  - "Dear Phil, We would like to submit [X]. [Brief description]. We look forward to your comments. Best regards, Andrea"
  - "Dear Phil, We have a couple of comments; see the attachment. [Brief qualifier]. Andrea"
  - "Hola Phil, Me refería a [clarification]. Saludos, Andrea"

### Collaborators (Leandro, David, Monica, Martin, Edna, Axel, Carlos, Juan José, Cris/Ana Cristina)

- **Register:** Informal tú, warm, collegial.
- **Structure:** Direct ask or context → "Cuéntame qué te parece" / "Mira qué te parece."
- **Delegate with just enough context:** "David me envió este blog, quisiera que lo revisaras a ver si estás de acuerdo."
- **Casual about small mistakes:** "perdón que los puse a escribir ahí."
- **Credit others' contributions** when forwarding or sharing.
- **Example patterns:**
  - "Hola [Name], [Brief context]. Cuéntame qué te parece. Saludos, Andrea"
  - "Hola [Name], Te envío [X]. Mira qué te parece [specific aspect]. Saludos, Andrea"
  - "[Name], [Very short instruction/update]. Saludos, Andrea"

### Group / Division emails

- **Register:** Formal ustedes, institutional but warm.
- **Structure:** Context/framing → Clear request with deadline → Thanks.
- **Spell out deadlines explicitly:** "a más tardar el jueves 5 de febrero."
- **Thank in advance:** "Muchas gracias de antemano por su tiempo y cooperación."
- **Opening:** "Estimados colegas," or "Estimados,"
- **Closing:** "Saludos cordiales," (slightly more formal than personal emails).
- **Example pattern:**
  - "Estimados colegas, [Context — 1-2 sentences framing the request]. Quisiera solicitar [specific action] a más tardar [deadline]. [Additional detail if needed]. Muchas gracias de antemano. Saludos cordiales, Andrea"

### External contacts (government, partners)

- **Register:** Formal ustedes, collaborative, flexible.
- **Offer flexibility:** "Si en [institution] prefieren [alternative], no tenemos inconveniente."
- **Be clear about logistics** without being rigid.
- **Example pattern:**
  - "Estimados, Les envío [X]. Por favor, pueden [action]. [Flexibility clause if relevant]. Saludos, Andrea"

## Structural Rules

1. **Brevity is the default.** 2–5 sentences for routine emails. Only go longer when the content genuinely requires it (e.g., sharing deliverables with multiple caveats).
2. **Context → Ask → Close.** When context is needed, lead with it. When it's obvious from the thread, skip straight to the ask.
3. **Reference attachments specifically:** "Adjunto las nuevas versiones del brochure (pdfs con FMM en el nombre)" — not just "adjunto el archivo."
4. **Apologies are brief and specific:** "disculpa, se me pasó" — never drawn out.
5. **Parenthetical clarifications** are natural: "(nueva política del blog)" / "(pdfs con FMM en el nombre)."
6. **Institutional knowledge is shared matter-of-factly**, not pedantically.
7. **Code-switching:** Naturally switch between English and Spanish depending on the thread and audience. Within a Spanish email, English terms of art are fine if that's how they're used at the IDB.

## Workflow

1. **Andrea describes the email** — can be messy/dictated. She provides: who it's to, what it's about, what she wants.
2. **Claude identifies the recipient type** (Marta / A&P / Collaborator / Group / External) and applies the corresponding tone.
3. **Claude drafts** in the appropriate language and register.
4. **For sensitive emails** (pushing back, delivering bad news, delicate requests), Claude offers 2–3 strategic approaches with different tradeoffs before drafting.
5. **Do not infer — ask.** If the context, recipient, or intent is unclear, ask Andrea before drafting. A confident email based on wrong assumptions is worse than a quick clarifying question.
6. **Andrea reviews and adjusts.** Claude revises if needed.

## What NOT to do

- Do not add formality Andrea wouldn't use. No "Espero que este mensaje le encuentre bien." No "Quedo atenta a sus comentarios." Andrea does not write like that.
- Do not add a title or institutional signature — Outlook handles that.
- Do not inflate short emails. If the message is "here's the file, let me know what you think," that's the email.
- Do not use "Estimada" for collaborators who get "Hola."
- Do not hedge excessively. Andrea is direct. She hedges strategically (with Phil on opinions, with Marta to seek approval) — not by default.

*Last updated: June 12, 2026 — v2.0.0 (v4 re-baseline: per-skill marker floored to v2.0.0 from v1.3 — the only skill untouched through the entire v3.2/v4 cycle; no content change, floored to the common per-skill baseline. Prior: May 13, 2026 — v1.3 (added YAML frontmatter for trigger-matching per the v2.1.11 frontmatter audit; v1.2 rename preserved))*


