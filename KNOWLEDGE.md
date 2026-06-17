# Knowledge Index

Updated: 2026-06-17

## State Files

- `knowledge/obsidian-second-brain.md` - planned architecture for publishing project-local Agent Ember memory into an Obsidian-based cross-project knowledge graph.
- `knowledge/obsidian-schemas.md` - frontmatter and generated-block schemas for Obsidian project, agent, daily, decision, and pattern notes.
- `knowledge/sync-protocol.md` - behavioral contract for `ember sync --dry-run` and future write mode.

## Rules

- `knowledge/` stores mutable project facts and architecture decisions.
- `notes/` stores append-only daily session trail.
- Obsidian integration must keep the repo as operational source of truth and treat the vault as synthesis/index layer unless a later decision explicitly changes that boundary.
