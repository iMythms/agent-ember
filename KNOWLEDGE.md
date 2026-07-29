# Knowledge Bootstrap

Notion `Agent Memory` is the canonical source for project knowledge. This file is a stable bootstrap index, not a local state store.

## Remote Index

- Root: the `Notion Memory Root` configured in `IDENTITY.md`.
- `notes/YYYY-MM-DD`: append-only daily session trail.
- `knowledge/<topic>`: dated, mutable factual state for one topic.

## Retrieval Rules

- During ignition, discover the hierarchy with direct `ntn api` calls; do not rely on persisted resource IDs.
- Read the 2 to 3 most recent daily note pages.
- Read only knowledge topics relevant to the current task.
- Verify remembered facts against the actual repository or system before acting.

## Update Rules

- Create a knowledge topic only when the fact is durable and likely to matter in a later session.
- Append a dated entry when reality changes.
- Mark prior facts as superseded through a new entry; do not erase historical decisions.
- Store content inside leaf pages, never in database properties or directory pages.
- Use the timestamp, title, and body block format defined in `AGENTS.md`.

## Local Boundary

Do not create local `notes/`, `knowledge/`, memory wrappers, Notion ID files, or generated memory caches. If a local memory artifact is found, migrate its meaningful content to the appropriate Notion leaf page, verify the write, and remove the artifact.
