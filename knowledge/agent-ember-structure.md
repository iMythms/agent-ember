# Agent Ember Structure

Updated: 2026-07-07

## Core Files

- `AGENTS.md` defines the operating contract for agents.
- `IDENTITY.md` defines the current instance identity, scope, timezone, and operator preferences.
- `KNOWLEDGE.md` indexes durable state files.
- `knowledge/` stores mutable state.
- `notes/` stores append-only daily history.
- `templates/` stores reusable capture formats.

## Repository Invariant

The structure is intentionally small. Add files only when they prevent repeated rediscovery or make loops easier to verify.

## Memory Boundary

- State files describe what is true now.
- Notes describe what happened then.
- Templates describe how to capture work cleanly.

Do not mix those roles. When a note reveals a durable fact, update the relevant `knowledge/` file and leave the note as history.

## Template Copy Procedure

When this repository is copied:
1. Verify `git remote -v`.
2. Replace template remotes before pushing instance-specific history.
3. Update `IDENTITY.md` with machine, repository, timezone, and operator preferences.
4. Keep `AGENTS.md` stable unless the operator wants a workflow change.
5. Start new notes for the copied instance.
