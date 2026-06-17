# Obsidian Second Brain Architecture

Updated: 2026-06-17

## Objective

Extend Agent Ember from project-local continuity into a cross-project personal knowledge graph by publishing curated project memory into an Obsidian vault.

## Core Principle

Repos write facts. Obsidian writes meaning.

The repository remains the canonical operational memory for a project. Obsidian becomes the human-facing synthesis layer for project cards, reusable patterns, decisions, dashboards, and cross-project relationships.

## Source Boundary

- `AGENTS.md` is the boot protocol.
- `IDENTITY.md` is the project agent identity.
- `KNOWLEDGE.md` and `knowledge/` are project-local state.
- `notes/` is the detailed project-local trail.
- Obsidian receives curated summaries and derived links, not raw unrestricted dumps.

## Proposed Repository Structure

```text
agent-ember/
  AGENTS.md
  IDENTITY.md
  KNOWLEDGE.md
  knowledge/
    obsidian-second-brain.md
    sync-protocol.md
    schemas.md
  notes/
    YYYY-MM-DD.md
  .ember/
    config.json
    templates/
      obsidian-project.md
      obsidian-daily.md
      obsidian-decision.md
      obsidian-pattern.md
  scripts/
    ember-sync
  src/
    cli/
    sync/
    parsers/
    renderers/
```

## Proposed Obsidian Vault Structure

```text
00-Agent-Ember/
  Projects/
  Agents/
  Decisions/
  Patterns/
  Architecture/
  Daily/
  Inbox/
  Bases/
```

## Sync Model

Version 1 is one-way:

```text
project repo memory -> Obsidian vault
```

No automatic two-way sync in the first implementation. Vault content may contain private synthesis that should not flow back into a repo, especially public or client repositories.

## Sync Tiers

### Identity

Summarize `IDENTITY.md` into:

- `00-Agent-Ember/Projects/<project>.md`
- `00-Agent-Ember/Agents/<agent>.md`

### Knowledge

Transform project facts into linked notes:

- project card current state
- decision notes
- architecture notes
- reusable pattern notes

### Notes

Summarize recent daily notes into clean Obsidian daily entries with:

- projects touched
- decisions made
- new knowledge
- follow-ups

Raw repo notes should not be mirrored wholesale by default.

## Configuration Shape

```json
{
  "project": "agent-ember",
  "vaultPath": "/Users/mytham/Obsidian/Mytham",
  "obsidianFolder": "00-Agent-Ember",
  "sync": {
    "identity": true,
    "knowledge": true,
    "notes": "summarized"
  }
}
```

## Determinism Requirements

- Generated blocks should be stable across runs.
- Human-authored sections in Obsidian must be protected.
- Sync should update frontmatter and clearly marked generated sections only.
- File names and note IDs should be deterministic.
- Dry-run output should show created, updated, skipped, and conflicted files.

## Initial Implementation Plan

1. Add `.ember/config.json` with vault and sync settings.
2. Define Markdown/frontmatter schemas for project, agent, decision, pattern, and daily notes.
3. Build a local `ember sync --dry-run` command.
4. Generate only the project note first.
5. Add identity and recent-note summaries.
6. Add decision and pattern extraction after deterministic project publishing is stable.

## Open Decisions

- Exact Obsidian vault path.
- Whether the sync command should be Node, shell, or another runtime.
- Whether this repo becomes a reusable package/CLI or remains a protocol template first.
- How to protect private vault-only notes from accidental repo ingestion.
