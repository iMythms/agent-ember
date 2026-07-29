# Agent Ember

**Persistent memory for AI coding agents, backed by Notion.**

Agent Ember gives coding agents durable context across sessions without storing journals, knowledge files, resource IDs, or credentials in the repository. Three Markdown files bootstrap the agent; Notion `Agent Memory` holds its session history and verified project knowledge.

It works with agents that load repository instructions from `AGENTS.md`, including OpenCode, Codex, Copilot, and PI. `CLAUDE.md` provides the same instructions to Claude Code.

## Prerequisites

- A Notion workspace and integration with access to it.
- The `ntn` CLI installed and available on `PATH`.
- Authentication through `ntn login` or the `NOTION_API_TOKEN` environment variable.

Verify the setup before starting an agent:

```bash
ntn --version
ntn api v1/users/me
```

## Quick Start

```bash
git clone https://github.com/iMythms/agent-ember.git my-agent
cd my-agent
ntn login
opencode # or claude, codex, copilot, pi, etc.
```

On first boot, the agent infers the machine and repository, asks only for identity details it cannot infer, and provisions the Notion hierarchy when needed. The repository name is the default memory-root title.

## Copy Into Existing Projects

- Standard agents: copy `AGENTS.md`, `IDENTITY.md`, and `KNOWLEDGE.md`.
- Claude Code: also copy `CLAUDE.md`.

`CLAUDE.md` is a compatibility shim that imports `AGENTS.md`; it is not a separate memory system.

## Memory Structure

The repository retains only bootstrap instructions:

```text
AGENTS.md       Core lifecycle and persistence rules
CLAUDE.md       Claude Code compatibility shim
IDENTITY.md     Agent identity and Notion memory-root configuration
KNOWLEDGE.md    Stable remote-memory index and retrieval rules
```

Notion is the canonical memory store:

```text
Agent Memory
└── <Notion Memory Root>
    ├── notes
    │   └── YYYY-MM-DD
    └── knowledge
        └── <topic>
```

- `notes/YYYY-MM-DD` is the append-only daily session trail.
- `knowledge/<topic>` contains dated updates to durable, verified facts.
- Directory pages describe their purpose; leaf pages contain memory entries.
- Database properties represent hierarchy only. Memory content lives in page blocks.

## How It Works

At the start of each session, the agent reads the three bootstrap files, verifies `ntn` authentication, rediscovers the Notion hierarchy through direct API calls, loads recent notes, and retrieves only knowledge relevant to the current task.

During the session, meaningful outcomes are appended directly to Notion using a consistent timestamp, title, and body format. Resource IDs are rediscovered rather than persisted, and important writes are verified through the API.

## Local Boundary

Do not commit local `notes/` or `knowledge/` directories, Notion IDs, API tokens, memory scripts, wrappers, or generated caches. Notion API success is the persistence boundary; the repository contains bootstrap configuration only.

## License

MIT
