# Agent Ember

**A minimal spark to make any AI coding agent stateful.**

Agent Ember gives a project-local coding agent persistent memory using plain Markdown and git. No database, no service, no framework.

Works seamlessly with any AI coding agent: PI, OpenCode, Copilot, Codex, and more.

## Copy Into an Existing Project

For the core memory system, copy exactly these files into the root of your project:

```text
AGENTS.md
IDENTITY.md
KNOWLEDGE.md
```

For Claude Code support, also copy:

```text
CLAUDE.md
```

That is the minimal install. On first run, the agent reads `AGENTS.md`, sees that `IDENTITY.md` is blank, asks who it should become, then starts maintaining project memory.

## Add Obsidian Sync

Obsidian sync is optional. If you want the project to publish curated memory into an Obsidian vault, copy the contents of:

```text
extras/obsidian-sync/
```

into your project root.

That adds:

```text
.ember/
  config.json
  templates/
knowledge/
  obsidian-schemas.md
  sync-protocol.md
scripts/
  ember-sync.mjs
```

Then edit `.ember/config.json`:

```json
{
  "project": "your-project",
  "agent": "Agent Ember",
  "repoPath": "/absolute/path/to/your-project",
  "repoRemote": "git@github.com:you/your-project.git",
  "vaultPath": "/absolute/path/to/your/Obsidian/Vault",
  "obsidianFolder": "00-Agent-Ember"
}
```

Verify the plan:

```bash
node scripts/ember-sync.mjs --dry-run
```

Current sync status: dry-run only. It reports the Obsidian files that would be created or updated; write mode is intentionally blocked until rendering is implemented.

## What the Agent Creates Later

Do not copy these from this repo. The agent creates them inside each project as it works:

```text
knowledge/
notes/
```

`knowledge/` stores mutable project facts. `notes/` stores append-only daily session logs.

If you use the Obsidian add-on, it contributes two starter knowledge files to document the sync schema and protocol. Those are part of the optional add-on, not the core install.

## Why This Works

Modern AI agents already look for project instructions like `AGENTS.md`. Agent Ember uses that existing mechanism to teach the agent how to remember.

Your agent doesn't need an external brain. It just needs:
- A root file that says "you are stateful, here is how you track things."
- A git repository to act as its storage drive.
- Standard, human-readable markdown files.

## Repository Layout

This template repository intentionally keeps the root clean:

```text
AGENTS.md
CLAUDE.md
IDENTITY.md
KNOWLEDGE.md
README.md
extras/
  obsidian-sync/
```

The root files are the core memory template. `extras/` contains optional add-ons.

## License

MIT
