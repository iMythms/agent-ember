# Knowledge Index

Updated: 2026-07-07

This index maps durable state for this Agent Ember instance. It is the first file to read after `IDENTITY.md`.

## State Files

- `knowledge/agent-ember-structure.md` - repository structure, memory rules, and template conventions.
- `knowledge/loop-patterns.md` - bounded agent loop patterns and when to use them.
- `knowledge/operator-workflow.md` - productivity workflow for copied Agent Ember instances.

## Index Rules

- Add a row when a `knowledge/` file is created.
- Rename or remove rows in the same commit as the file move/removal.
- Every indexed file must contain `Updated: YYYY-MM-DD`.
- Keep this file as a map, not a dumping ground. Put facts in focused state files.

## Freshness Check

On ignition, compare each state file's `Updated:` date against newer daily notes. If notes contain durable changes not reflected in state, update the relevant state file before acting on stale assumptions.
