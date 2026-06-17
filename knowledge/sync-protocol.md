# Sync Protocol

Updated: 2026-06-17

## Purpose

Define the first behavior contract for `ember sync` before implementation. The command publishes curated project memory from the repo into an Obsidian vault.

## Command Shape

```text
scripts/ember-sync.mjs --dry-run
scripts/ember-sync.mjs --write
```

Version 1 must default to dry-run unless `--write` is explicitly provided.

## Inputs

- `.ember/config.json`
- `IDENTITY.md`
- `KNOWLEDGE.md`
- `knowledge/*.md`
- recent `notes/*.md`

## Outputs

Under the configured Obsidian folder:

```text
00-Agent-Ember/
  Projects/Agent Ember.md
  Agents/Ember.md
  Daily/YYYY-MM-DD.md
```

Future outputs:

```text
00-Agent-Ember/
  Decisions/<Decision Title>.md
  Patterns/<Pattern Title>.md
```

## Dry-run Report

Dry-run must report:

- config path
- vault path status
- source files read
- files that would be created
- files that would be updated
- files that would be skipped
- conflicts
- missing required config

Example:

```text
ember sync --dry-run

config: .ember/config.json
vault: not configured
sources:
  read IDENTITY.md
  read KNOWLEDGE.md
  read knowledge/obsidian-second-brain.md
  read notes/2026-06-17.md
planned:
  create 00-Agent-Ember/Projects/Agent Ember.md
  create 00-Agent-Ember/Agents/Ember.md
  create 00-Agent-Ember/Daily/2026-06-17.md
blocked:
  vaultPath is null
```

## Write Policy

Writes are allowed only when:

- `--write` is passed.
- `vaultPath` is configured.
- target path resolves inside `vaultPath`.
- marker comments are well-formed for existing generated notes.

Writes are forbidden when:

- a target file exists without generated markers and would require replacing human content.
- a target path escapes the configured vault.
- the command has not produced a dry-run equivalent report.

## Conflict Rules

Report conflict and skip the file when:

- frontmatter cannot be parsed safely.
- generated start marker exists without an end marker.
- generated end marker exists without a start marker.
- duplicate generated block names exist in one file.
- a planned target path is not under `vaultPath`.

## Privacy Rules

- Do not read arbitrary vault files in version 1.
- Do not import vault notes back into repo memory in version 1.
- Do not mirror raw repo notes wholesale by default.
- Do not write secrets, local environment variables, or credentials into Obsidian generated blocks.

## Implementation Notes

The initial runtime is `scripts/ember-sync.mjs`, a dependency-free Node script. It currently implements dry-run planning only and intentionally blocks `--write`.
