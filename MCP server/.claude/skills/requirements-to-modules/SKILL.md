---
name: requirements-to-modules
description: Reads a requirement.md (or similar requirements document), asks the user clarifying questions, splits the requirements into modules sized for the team's number of developers, creates one folder per module, and writes a spec file inside each. Never assumes anything - it asks. Use this skill whenever the user mentions requirement.md, breaking requirements into modules, dividing work among developers, splitting a project across a team, creating module folders or module specs, or turning requirements into specs, even if they don't name the skill explicitly.
---

# Requirements to Modules

Turn a requirements document into a set of module folders, each with its own spec, divided so a team of N developers can work in parallel (or pair up) without blocking each other.

## The one rule that governs everything: don't assume

A wrong guess here is expensive. It gets baked into module boundaries and specs, and the developers then build on it. So whenever something is unclear, missing, or could reasonably be read two ways, ask. Do not fill gaps with "sensible defaults", and do not silently pick an interpretation. If the user answers "you decide", that is an answer: record it as "delegated to Claude by user" so it is traceable.

This applies at both phases below (dividing into modules, and writing specs). Both use the same question pattern.

## The question pattern (used in both phases)

1. **Collect before asking.** Read everything first and gather all questions, so the user answers once rather than being interrupted repeatedly.
2. **Triage each question** into:
   - **Blocking**: the answer changes what the modules are, where boundaries fall, or what a spec must say (e.g. "is auth in scope?", "web only or mobile too?", "which database?"). 
   - **Non-blocking**: affects details that can be settled later without restructuring anything.
3. **Ask blocking questions first, labelled clearly**, e.g.:
   > **These questions must be answered before I can divide this into modules:**
   
   Number them. Give each a one-line reason it matters. Offer concrete options where you can (use AskUserQuestion for choice-style questions; plain numbered text for open-ended ones). Batch up to 4 per AskUserQuestion call; for more, use a numbered list in chat.
4. **Stop and wait.** Do not start dividing or writing until blocking questions are answered. If answers raise new blocking questions, ask those too.
5. **Non-blocking questions**: ask them in a second, clearly separate group ("these can be answered now or deferred"). If the user defers one, carry it forward into the relevant spec's *Open Questions* section, attributed as deferred by the user.
6. **Contradictions count as questions.** If the requirement contradicts itself, quote both passages and ask which holds.

## Workflow

### Phase 0: Read the requirements
- Use the path the user gave. If none, look for `requirement.md` / `requirements.md` in the working directory. If you find none or several candidates, ask which one.
- Read the whole file. Note: stated features, actors/roles, integrations, non-functional requirements (performance, security, compliance), constraints, and any explicit "open questions" / "TBD" / "?" sections.

### Phase 1: Questions before modules
- Surface every open question from the document itself, plus any ambiguity or gap you found that blocks a sensible split.
- Also ask **the number of developers** (and, if relevant to the split, whether they are specialised, e.g. frontend/backend). Ask this in the same turn as the blocking questions, as it doesn't depend on them.
- Wait for answers (see the question pattern).

### Phase 2: Propose the module breakdown
Design modules so that:
- **Each module has a single clear responsibility** and a stated interface (what it exposes, what it consumes). Clean interfaces are what let developers work independently.
- **Work can be done independently or together.** Dependencies between modules are explicit. Where two modules must integrate, define the contract (API shape, events, shared data model) up front so each side can build against it.
- **The split fits the team size N.** 
  - Modules >= N: assign one or more modules per developer, balancing effort and keeping each developer's modules related where possible.
  - Modules < N: split the largest modules into sub-modules, or mark modules as paired/shared with a clear division of the work inside. Say which.
  - Shared foundations (auth, data model, common utilities) go in their own module and are flagged as a dependency to be built early, since others wait on them.
- Every requirement in the document lands in exactly one module. Nothing is dropped, nothing is duplicated.

Present the proposal in chat before creating anything: module names, one-line responsibility, requirements covered, dependencies, and suggested developer assignment. Ask the user to confirm or adjust. Rough effort is fine as relative sizing (S/M/L); don't invent hour estimates.

### Phase 3: Create the folders
Only after the user confirms the breakdown. Default layout (ask if the user wants a different location or naming):

```
modules/
├── MODULES.md                 # overview: modules, owners, dependency order, shared contracts
├── 01-<module-name>/
│   └── spec.md
├── 02-<module-name>/
│   └── spec.md
└── ...
```

Number prefixes reflect a suggested build order (foundations first). Use lowercase-hyphenated names. Create the folders next to the requirement file unless told otherwise.

`MODULES.md` holds: the developer count, the module table (name, responsibility, assigned developer(s), depends on), the build order, and the cross-module contracts.

### Phase 4: Specs, one per module
Before writing any spec, run the **same question pattern** again at spec level: collect the spec-level gaps for each module (exact validation rules, error behaviour, data fields, edge cases, performance targets, UI details, third-party choices...), triage them, ask blocking ones first, and wait. You may group questions per module so the user can answer module by module.

Then write `spec.md` in each module folder:

```markdown
# <Module name>

## Purpose
One paragraph: what this module is for and why it exists.

## Owner
Assigned developer(s), or "unassigned".

## Scope
### In scope
### Out of scope

## Requirements covered
Traceable list pointing back to the source requirement (quote or section reference).

## Functional specification
The behaviour in detail: user flows, rules, validations, error cases.

## Interfaces
### Exposes
### Consumes
(API shapes, events, data contracts. Must match MODULES.md.)

## Data
Entities, fields, constraints owned by this module.

## Non-functional requirements
Performance, security, accessibility, compliance, as stated by the requirement or the user.

## Dependencies
Other modules / external systems, and what is needed from each.

## Acceptance criteria
Testable statements. Each should be checkable by someone who didn't write the spec.

## Decisions
Answers the user gave during Q&A that shaped this spec (include "delegated to Claude" where applicable).

## Open questions
Only items the user explicitly deferred. Empty is good.
```

Write only what the requirement or the user's answers support. If a section has nothing grounded to say, write "None specified" and, if it matters, go back and ask; don't invent content to fill the template.

### Phase 5: Wrap up
Summarise in chat: modules created, who owns what, build order, any deferred open questions. Keep it short; the files hold the detail.

## Things to avoid
- Starting to divide the work while blocking questions are unanswered.
- Inventing requirements, tech-stack choices, or numbers (SLAs, limits) that the document and user didn't give.
- Creating folders before the user confirmed the breakdown.
- Asking questions one at a time across many turns; batch them.
- Modules whose only way to progress is waiting on every other module. Redesign the interfaces instead.
