# Agent Ember 🔥

**A minimal spark to make any AI coding agent stateful. Clone, point your agent, ignite.**

Keep your agent's context warm across sessions. Agent Ember gives your AI persistent memory, allows it to take daily notes, and helps it build on past work. No heavy frameworks, no vector databases, no complex setups—just three markdown files and a git repository.

Works seamlessly with any AI coding agent: PI, OpenCode, Copilot, Codex, and more.

## Quick Start

```bash
git clone https://github.com/almahdi/agent-ember.git my-agent
cd my-agent
pi     # or opencode, copilot, codex, etc.
```

That's it. Your agent reads the initial files, realizes it has been just ignited, and asks who you want it to be. You define its purpose. The spark catches, and it remembers forever.

## Memory Structure

```text
AGENTS.md          ← The Spark (core instructions, do not edit)
IDENTITY.md        ← Who this agent is (maintained by the agent)
KNOWLEDGE.md       ← Index of all learned information (maintained by the agent)
knowledge/         ← The solid fuel: facts about the world (mutable)
notes/             ← The glowing embers: daily session logs (append-only)
```

Ember utilizes two kinds of memory to keep the context alive:

- **`knowledge/` (The State):** Facts about how things are right now. The agent actively updates these files as reality and project requirements change.
- **`notes/` (The Narrative):** What happened during each session—decisions made, actions taken, and open items left for next time. These are append-only and never modified once the day ends, leaving a perfect trail of embers to follow later.

## Why This Works

Modern AI agents are already designed to look for project instructions like `AGENTS.md` (or `.instructions.md`, etc.). Agent Ember hijacks this existing mechanism to teach the AI *how to remember*.

Your agent doesn't need an external brain. It just needs:
- A root file that says "you are stateful, here is how you track things."
- A git repository to act as its storage drive.
- Standard, human-readable markdown files.

## Multiple Agents

Each agent lives in its own repository. Need a specialized agent for a different task? Just start a new fire:

```bash
git clone https://github.com/almahdi/agent-ember.git devops-agent
cd devops-agent
pi
```

You can run a homelab agent, a finance agent, and a codebase refactoring agent side-by-side. Same underlying spark, completely different identities and memories.

## License

MIT
