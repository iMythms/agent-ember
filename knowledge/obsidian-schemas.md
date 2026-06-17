# Obsidian Schemas

Updated: 2026-06-17

## Purpose

Define the first stable note contracts for publishing Agent Ember project memory into Obsidian without treating the vault as a raw mirror of the repo.

## Common Rules

- Every generated note uses YAML frontmatter.
- Every generated note includes `source: agent-ember` unless a more specific source is required.
- Every generated note includes `last_synced: YYYY-MM-DD`.
- Generated body content must be enclosed in marker comments:

```markdown
<!-- ember:generated:start block-name -->
...
<!-- ember:generated:end block-name -->
```

- Sync may update generated blocks.
- Sync must preserve content outside generated blocks.
- Sync must report a conflict if marker boundaries are malformed.
- Sync must use deterministic filenames.

## Project Note

Path:

```text
00-Agent-Ember/Projects/<Project Title>.md
```

Required properties:

```yaml
type: project
source: agent-ember
project: agent-ember
title: Agent Ember
repo: git@github.com:iMythms/agent-ember.git
local_path: /Users/mytham/Developer/agent-ember
status: active
agent_identity: Ember
last_synced: 2026-06-17
tags:
  - agent-ember
  - project
```

Generated sections:

- Purpose
- Current State
- Important Decisions
- Related Notes

## Agent Note

Path:

```text
00-Agent-Ember/Agents/<Agent Name>.md
```

Required properties:

```yaml
type: agent
agent: Ember
project: agent-ember
source_repo: git@github.com:iMythms/agent-ember.git
last_synced: 2026-06-17
tags:
  - agent-ember
  - agent
```

Generated sections:

- Scope
- Operating Mandate

## Daily Note

Path:

```text
00-Agent-Ember/Daily/YYYY-MM-DD.md
```

Required properties:

```yaml
type: daily
source: agent-ember
date: 2026-06-17
projects:
  - agent-ember
last_synced: 2026-06-17
tags:
  - agent-ember
  - daily
```

Generated sections:

- Projects Touched
- Decisions Made
- New Knowledge
- Follow-ups

## Decision Note

Path:

```text
00-Agent-Ember/Decisions/<Decision Title>.md
```

Required properties:

```yaml
type: decision
source: agent-ember
project: agent-ember
status: accepted
date: 2026-06-17
last_synced: 2026-06-17
tags:
  - agent-ember
  - decision
```

Generated sections:

- Decision
- Rationale
- Consequences
- Source

## Pattern Note

Path:

```text
00-Agent-Ember/Patterns/<Pattern Title>.md
```

Required properties:

```yaml
type: pattern
source: agent-ember
status: candidate
first_seen_project: agent-ember
last_synced: 2026-06-17
tags:
  - agent-ember
  - pattern
```

Generated sections:

- Pattern
- Used In
- Evidence

## V1 Generation Scope

The first implementation should generate:

1. Project note.
2. Agent note.
3. Daily note summaries from recent repo notes.

Decision and pattern notes should remain planned until project and daily publishing are deterministic.
