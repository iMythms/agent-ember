# Operator Workflow

Updated: 2026-07-07

## Current Goal

Make Agent Ember more productive while preserving its durable-memory structure.

## Productivity Rules

- Start from a loop contract for ambiguous or multi-step work.
- Keep durable state in `knowledge/`, not scattered through daily notes.
- Use daily notes as append-only execution logs.
- Use small commits for memory and workflow changes.
- Verify actual repository state before acting on remembered context.

## Refactor Thresholds

Refactor Agent Ember when one of these becomes true:
- the same instruction appears in three or more places;
- a recurring workflow has been manually repeated three times;
- a state file exceeds roughly 150 lines and mixes unrelated facts;
- ignition regularly takes longer than the value it provides;
- notes contain durable facts that are not promoted into `knowledge/`.

## Suggested Cadence

- Per session: ignition, task loop, verification, memory closeout.
- Weekly: memory hygiene loop to promote durable facts and remove stale assumptions.
- Per copied repo: identity initialization and remote verification before meaningful work.
