# Obsidian Sync Add-on

Copy the contents of this directory into a project that already has Agent Ember installed.

## Files to Copy

From this directory, copy:

```text
.ember/
knowledge/obsidian-schemas.md
knowledge/sync-protocol.md
scripts/ember-sync.mjs
```

Do not overwrite an existing project `AGENTS.md`, `IDENTITY.md`, or `KNOWLEDGE.md` when installing this add-on.

## Configure

Edit `.ember/config.json` after copying:

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

## Verify

Run:

```bash
node scripts/ember-sync.mjs --dry-run
```

The command currently reports planned Obsidian writes only. `--write` is intentionally blocked.

## Boundary

The project repository remains the operational source of truth. Obsidian is the synthesis/index layer.
