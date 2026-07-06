# Loop Patterns

Updated: 2026-07-07

Source reviewed: https://x.com/claudedevs/status/2074208949205881033?s=46

The linked X article preview frames loops as goal-driven agent workflows with stop conditions. Agent Ember applies that idea by making every substantial task explicit, bounded, and verifiable.

## Loop Contract

Use this contract before a loop starts:
- goal;
- inputs;
- current state;
- allowed actions;
- checks;
- stop condition;
- residual risk.

## Scout Loop

Use when context is missing.

Steps:
1. Inventory files, links, commands, and constraints.
2. Identify source-of-truth files.
3. Separate facts from assumptions.
4. Stop when the next concrete action is clear.

## Build Loop

Use when creating or changing artifacts.

Steps:
1. Define the artifact and acceptance checks.
2. Make the smallest coherent change.
3. Run checks.
4. Inspect the diff.
5. Stop when checks pass or a blocker is documented.

## Repair Loop

Use when something fails.

Steps:
1. Reproduce the failure.
2. Isolate the smallest cause.
3. Change one cause at a time.
4. Re-run the failing check.
5. Record root cause and verification.

## Memory Loop

Use at session close or when facts change.

Steps:
1. Append today's note.
2. Update state files for durable facts.
3. Update `KNOWLEDGE.md` for state-file changes.
4. Commit and push when allowed.
5. Stop when the next session can resume without rediscovery.

## Stop Conditions

Stop a loop when:
- the goal is achieved and checks passed;
- the goal is impossible with current permissions or inputs;
- three consecutive attempts hit the same blocker;
- additional work would be speculative;
- the operator changes the goal.
