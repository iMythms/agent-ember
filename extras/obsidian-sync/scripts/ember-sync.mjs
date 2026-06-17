#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const args = new Set(process.argv.slice(2));
const wantsWrite = args.has("--write");
const wantsDryRun = args.has("--dry-run") || !wantsWrite;

if (args.has("--help") || args.has("-h")) {
  printHelp();
  process.exit(0);
}

if (wantsWrite) {
  console.error("ember sync: --write is not implemented yet. Run --dry-run first.");
  process.exit(2);
}

if (!wantsDryRun) {
  console.error("ember sync: expected --dry-run.");
  process.exit(2);
}

const configPath = path.join(repoRoot, ".ember", "config.json");
const report = {
  config: path.relative(repoRoot, configPath),
  vault: "not configured",
  sources: [],
  planned: [],
  skipped: [],
  conflicts: [],
  blocked: [],
};

const config = readJson(configPath);
if (!config.ok) {
  report.blocked.push(config.error);
  printReport(report);
  process.exit(1);
}

const settings = config.value;
const vaultPath = typeof settings.vaultPath === "string" && settings.vaultPath.trim()
  ? path.resolve(settings.vaultPath)
  : null;

if (vaultPath) {
  report.vault = fs.existsSync(vaultPath) ? vaultPath : `${vaultPath} (missing)`;
} else {
  report.blocked.push("vaultPath is null");
}

const project = settings.project || "unknown-project";
const projectTitle = titleCase(project);
const agent = settings.agent || "Unknown Agent";
const obsidianFolder = settings.obsidianFolder || "00-Agent-Ember";

recordSource(report, "IDENTITY.md");
recordSource(report, "KNOWLEDGE.md");
for (const file of listMarkdownFiles(path.join(repoRoot, "knowledge"))) {
  recordSource(report, path.relative(repoRoot, file));
}
for (const file of listRecentNotes(path.join(repoRoot, "notes"), 3)) {
  recordSource(report, path.relative(repoRoot, file));
}

const targets = [
  path.join(obsidianFolder, "Projects", `${projectTitle}.md`),
  path.join(obsidianFolder, "Agents", `${agent}.md`),
];

for (const notePath of listRecentNotes(path.join(repoRoot, "notes"), 3)) {
  targets.push(path.join(obsidianFolder, "Daily", path.basename(notePath)));
}

for (const target of targets) {
  const targetPath = vaultPath ? path.resolve(vaultPath, target) : null;
  if (targetPath && !isInside(vaultPath, targetPath)) {
    report.conflicts.push(`target escapes vault: ${target}`);
    continue;
  }

  if (!targetPath || !fs.existsSync(targetPath)) {
    report.planned.push(`create ${target}`);
    continue;
  }

  const markerStatus = validateGeneratedMarkers(targetPath);
  if (!markerStatus.ok) {
    report.conflicts.push(`${target}: ${markerStatus.error}`);
    continue;
  }

  report.planned.push(`update ${target}`);
}

printReport(report);
process.exit(report.conflicts.length > 0 ? 1 : 0);

function printHelp() {
  console.log(`ember sync

Usage:
  scripts/ember-sync.mjs --dry-run

Version 1 only reports planned Obsidian writes. --write is intentionally blocked.
`);
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return { ok: true, value: JSON.parse(raw) };
  } catch (error) {
    return { ok: false, error: `${path.relative(repoRoot, filePath)}: ${error.message}` };
  }
}

function recordSource(report, relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (fs.existsSync(absolutePath)) {
    report.sources.push(`read ${relativePath}`);
  } else {
    report.skipped.push(`missing ${relativePath}`);
  }
}

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name))
    .sort();
}

function listRecentNotes(directory, count) {
  return listMarkdownFiles(directory).slice(-count);
}

function titleCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isInside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function validateGeneratedMarkers(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const starts = [...text.matchAll(/<!-- ember:generated:start ([a-z0-9-]+) -->/g)].map((match) => match[1]);
  const ends = [...text.matchAll(/<!-- ember:generated:end ([a-z0-9-]+) -->/g)].map((match) => match[1]);

  if (starts.length !== ends.length) {
    return { ok: false, error: "generated marker count mismatch" };
  }

  const seen = new Set();
  for (const block of starts) {
    if (seen.has(block)) {
      return { ok: false, error: `duplicate generated block: ${block}` };
    }
    seen.add(block);
    if (!ends.includes(block)) {
      return { ok: false, error: `missing end marker for block: ${block}` };
    }
  }

  for (const block of ends) {
    if (!starts.includes(block)) {
      return { ok: false, error: `missing start marker for block: ${block}` };
    }
  }

  return { ok: true };
}

function printReport(report) {
  console.log("ember sync --dry-run");
  console.log("");
  console.log(`config: ${report.config}`);
  console.log(`vault: ${report.vault}`);
  printList("sources", report.sources);
  printList("planned", report.planned);
  printList("skipped", report.skipped);
  printList("conflicts", report.conflicts);
  printList("blocked", report.blocked);
}

function printList(label, values) {
  if (values.length === 0) return;
  console.log(`${label}:`);
  for (const value of values) {
    console.log(`  ${value}`);
  }
}
