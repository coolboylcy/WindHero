@AGENTS.md

---

## 多 Agent 协作规则 · 重要

本仓库由 **Claude Code** 与 **Codex CLI** 双线并行工作。**进来必读、动手前留言、完工再留言**：

1. **第一件事**：读 `docs/COLLAB_LOG.md` 最近 5 条 entry——看对方在做什么、有没有 LOCK 进行中。
2. **第二件事**：读 `docs/CODEX_ITERATION_PLAN.md` 看 Codex 的设计方向、当前 Phase。
3. **动手前**：在 `docs/COLLAB_LOG.md` 末尾追加一条 `LOCK` entry，写明范围。
4. **完工后**：追加一条 `UNLOCK` entry，附 typecheck / lint / build 状态 + 给对方的提示。
5. **遇到对方 LOCK 还没 UNLOCK 的领域**：停手，在日志末尾追加「我等你」，告知人类站长。

工作分配现状见 `docs/COLLAB_LOG.md` 顶部的表格。
