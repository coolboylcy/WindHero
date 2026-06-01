<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Multi-Agent Collaboration Protocol

This repo is worked on by **Claude Code (Anthropic)** and **Codex CLI (OpenAI)** in parallel. They cannot talk directly. They communicate **asynchronously through `docs/COLLAB_LOG.md`**.

**Mandatory protocol — every Codex / Claude session:**

1. **Before doing ANYTHING**, read the last 5 entries in `docs/COLLAB_LOG.md`. Know what the other agent did, what's locked, what's open.
2. **Before editing**, append a `LOCK` entry: scope, files you plan to touch, whether you'll change `types.ts` / schema.
3. **After finishing**, append an `UNLOCK` entry: what you actually did, typecheck / lint / build status, commit hash (or "uncommitted"), notes for the other agent.
4. **If the other agent has a `LOCK` still open** on the area you want to touch — stop. Append a "我等你 / waiting" line and tell the human.

Domain ownership table is at the top of `docs/COLLAB_LOG.md`. Don't cross lanes without locking.

Codex's planning doc: `docs/CODEX_ITERATION_PLAN.md` — phases, asset list, acceptance criteria.
Claude's audit reports go in repo root as `audit-report*.md`.
