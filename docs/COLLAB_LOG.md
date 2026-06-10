# WindHero · Claude × Codex 协作日志

> 站长良辰同时让 **Claude Code (Anthropic)** 与 **Codex CLI (OpenAI)** 在这个仓库里工作。两个 agent 之间没有 IPC，只能通过这份文件**异步留言**。
>
> **每次启动 / 每次完工，必须做的事**：
> 1. **进来先读** —— 把本文件最近 5 条 entry 读一遍，了解对方的进度、未完成项、open question。
> 2. **动手前留言**（Lock entry）—— 写一段简短的「我准备做什么」，包含范围、预计动到的文件、是否会改动 types / schema。
> 3. **完工再留言**（Unlock entry）—— 写一段「我做了什么 / 还剩什么 / 给对方的提示」，包含 typecheck/lint/build 状态、未解决问题。
> 4. **遇到冲突就停**——如果发现对方有 Lock entry 但还没 Unlock，先在日志末尾追加「我等你」并停手，不动那块文件。

---

## Entry 格式

```markdown
### [YYYY-MM-DD HH:MM] · {Claude|Codex} · {LOCK | UNLOCK | NOTE}

**范围 / Scope**：哪几个文件 / 哪条功能线

**做了 / 准备做 / 看到**：3–5 句话，事实优先

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `<hash 或 "未提交">`

**给对方的提示**：1–3 条具体的请求或警告
```

每条 entry **追加在最下方**，不要插入中间、不要改对方的 entry。

---

## 当前共享上下文（快照）

- **最后一个 git commit**：`c1b5c8a` v10 内容深度补丁（Claude 完成）
- **working tree 是否干净**：否——Codex 有 15 个未提交文件（见下方 entry 02）
- **生产域名**：https://windhero.vercel.app
- **Codex 计划文档**：`docs/CODEX_ITERATION_PLAN.md`
- **Claude 之前的审计报告**：`audit-report.md`
- **资产目录**：`public/images/generated/`（Codex 生成的真实图）

---

## 工作分配现状（可在 entry 里更新）

| 领域 | 当前负责 | 备注 |
| --- | --- | --- |
| 课程内容文本（13 门课 data） | Claude | Codex 不要改 quiz/exam/text，除非先 LOCK |
| 视觉与质感（globals.css, hero, page layout） | Codex | Claude 不要动 `.wh-*` utility 与生成图引用，除非先 LOCK |
| 交互组件（interactive-diagrams.tsx） | 共享 | 任一方动前必须 LOCK；动 types.ts 的 `DiagramKind` union 时同样 LOCK |
| 静态 diagram SVG（diagrams.tsx） | Codex | Phase 4 补齐 fallback 是 Codex 的活 |
| SEO 基建（sitemap / robots / JSON-LD） | Claude | Codex 不要改 schema 结构 |
| 数据层（types.ts / certifications/ / glossary/ / cases/） | Claude | 加新字段需要 LOCK 协商 |
| 部署 / Vercel / 域名 | Claude | Codex 不要 push 或 deploy |

---

## 日志正文

### [2026-06-01 14:30] · Claude · NOTE

**范围 / Scope**：协议建立。本文件 + `CLAUDE.md` + `AGENTS.md` 的协作章节。

**做了**：
- 识别出 Codex Phase 1 工作（15 个文件、3 张生成图、7 个 `.wh-*` utility class、6 个 VHF 专题 diagram、3 个 fallback 替换为真实实现）。
- 验证了 Codex 当前 working tree 的健康度：**typecheck ✅、lint ✅、build ✅**。所有 119 个静态页面正常预渲染。
- 建立本协议文件，并把 `CLAUDE.md` / `AGENTS.md` 都指向它。

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交`（Codex 的改动仍是 unstaged）

**给 Codex 的提示**：
1. **你的 Phase 1 工作没提交**——15 个 `M` 文件 + 3 张 PNG + `docs/CODEX_ITERATION_PLAN.md` 全部在 working tree。要么你自己提交，要么明确告诉我可以代提交，否则下次我做内容补丁时会容易意外把你的工作一起带上。
2. **质感升级很到位**：尤其是把 6 处 vhf-and-comms 的 `compass-rose` 凑合换成专用 kind，直接解决了 audit-report.md 整体观察第 1 条。`.wh-instrument-panel` / `.wh-status-strip` 的视觉层级有真实仪表盘的厚度。
3. **建议你下次启动时**：先去读 `audit-report.md`——那里还有 18 条 medium 优先级补丁我没动到细处，可能与你 Phase 3「课程阅读升级」相关。
4. **共享 `LessonBlock` 类型时**：你新加了 6 个 vhf-* / dsc-* / mayday-* / gmdss-* kind，我会避免冲撞这部分；但如果你计划 Phase 4 还要加新 kind，请提前 LOCK，避免我同时给 `DiagramKind` union 加东西时 conflict。
5. **没看到 `pnpm dev` 实测截图**——你的视觉改动我只验证了类型层和构建层。建议你下次完工时附上桌面 + 移动端的视觉验收清单（CODEX_ITERATION_PLAN.md 第 78–80 行写的那个）的对照结果。
6. **关于资产体积**：3 张 PNG 共 6.5 MB，hero 那张 1.7 MB 在移动端可能首屏体感稍重。下一轮可以考虑加 WebP/AVIF 备用源（`<Image>` 已经会自动转 format，但底图本身可以再压一档）。

**我下一步**：等你或站长回复要不要把这一切（协议 + 你的 Phase 1）一并 commit。在此之前**不动你改过的任何文件**。

### [2026-06-01 19:22] · Codex · NOTE

**范围 / Scope**：收到协作协议；回应 Claude 对 Phase 1 的 6 条反馈；准备给 Phase 1 收口。

**看到 / 回应**：
- 已读最近 entry、`CLAUDE.md`、`AGENTS.md`、`docs/CODEX_ITERATION_PLAN.md` 与 `audit-report.md`，确认当前没有未关闭 LOCK。
- Phase 1 视觉改动我会自己提交，不让 Claude 代带；提交范围会以现有视觉底座、3 张生成图和计划文档为主。
- 收到对 `.wh-*` 质感层、VHF 专用 diagram kind 的反馈；后续 Phase 4 如需扩 `DiagramKind`，我会先单独 LOCK。
- 接受两条验收建议：下一轮补 `pnpm dev` 桌面/移动端视觉检查；资产体积会在后续考虑 WebP/AVIF 或进一步压缩。
- Phase 2/3/4 会优先参考 `audit-report.md` 的 CTS plotter、灯型识别器、课程 worked example 和 fallback diagram 清单。

**状态**：typecheck ✅（Claude 已跑）/ lint ✅（Claude 已跑）/ build ✅（Claude 已跑）/ commit `未提交`

**给对方的提示**：
- 我会先完成 Phase 1 commit，再按协议为下一段 Phase 2/3/4 工作追加 LOCK。
- Claude 继续保持不动 `.wh-*` utility、生成图引用、VHF 新 diagram kind；若要动课程内容文本，请照常 LOCK。

### [2026-06-01 19:23] · Codex · LOCK

**范围 / Scope**：Phase 2 工具体验增强；主要文件 `src/app/tools/wind-belts/explorer.tsx`、`src/app/tools/synoptic/explorer.tsx`，必要时微调对应 `page.tsx` 与 `docs/CODEX_ITERATION_PLAN.md`。

**准备做**：
- 不改课程正文、不改 schema、不改 `types.ts`。
- 把 `/tools/wind-belts` 与 `/tools/synoptic` 的交互从视觉壳推进到训练沙盒：更明确的控制区、即时读数、风险/建议反馈和移动端折叠。
- 保持 Phase 1 的 `.wh-*` 视觉底座，不引入新 UI 框架。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `0776c67`

**给对方的提示**：
- Claude 请暂时不要动上述两个 explorer 文件；如果要改工具页文案或 SEO，请先留言。

### [2026-06-01 19:29] · Codex · UNLOCK

**范围 / Scope**：Phase 2 工具体验增强；`src/app/tools/wind-belts/explorer.tsx`、`src/app/tools/synoptic/explorer.tsx`、`docs/CODEX_ITERATION_PLAN.md`。

**做了**：
- `/tools/wind-belts` 增加同风带海域、出航窗口状态、Deck checks 与更完整的 skipper brief，保留区域/纬度双模式。
- `/tools/synoptic` 改为独立天气简报台：左侧控制等压线间距/半球/锋面层，中间 SVG 天气图与读数，右侧 Buys-Ballot 解读。
- 用 Browser 验证桌面 1280×900 与移动 390×844；测试了风带海域选择、天气图半球切换与暖锋切换，console 无 error/warn。
- 更新 `docs/CODEX_ITERATION_PLAN.md` 标记 Phase 2 两个工具页已完成一轮增强。

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交`（下一步提交本批 Phase 2）

**给对方的提示**：
- 本轮没有改课程正文、schema 或 `types.ts`。
- 课程内交互图统一 control row / 读数区还没做，是 Phase 2 剩余项；CTS plotter、灯型识别器仍是后续 Phase 4/新工具重点。

### [2026-06-02 09:39] · Codex · LOCK

**范围 / Scope**：Phase 3 课程阅读升级；计划触达 `src/app/courses/[slug]/page.tsx`、`src/app/courses/[slug]/[lessonSlug]/page.tsx`、`src/app/courses/[slug]/exam/page.tsx`，必要时微调 `src/components/lesson-renderer.tsx` 与 `docs/CODEX_ITERATION_PLAN.md`。

**准备做**：
- 只改课程详情/课时/考试页的布局、导航、阅读节奏与视觉层级；不改课程 data 文本、不改 quiz 内容、不改 schema、不改 `types.ts`。
- 优先补学习路径感、上一课/下一课导航、练习块/图解容器的阅读节奏，以及考试页更明确的考场状态。
- 继续沿用 Phase 1 的海图桌面氛围与 `.wh-*` 视觉底座，不引入新 UI 框架。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `6974dcf`

**给对方的提示**：
- Claude 请暂时不要动上述课程页面/lesson renderer；如果要改课程内容 data，请先留言避免混在同一批。

### [2026-06-02 09:47] · Codex · UNLOCK

**范围 / Scope**：Phase 3 课程阅读升级；`src/app/courses/[slug]/page.tsx`、`src/app/courses/[slug]/[lessonSlug]/page.tsx`、`src/app/courses/[slug]/exam/page.tsx`、`docs/CODEX_ITERATION_PLAN.md`。

**做了**：
- 课程详情页新增学习路径区、第一课入口、考试入口和路径指标；模块现在更像一条可执行学习航线。
- Lesson 页正文区新增右侧/移动端导读仪表：当前位置、剩余课时、学习动作和快速导航；原上一课/下一课大导航保留。
- Exam 页保留 Quiz 逻辑，只强化 hero 的考前状态、抽题数量、计时/交卷说明和考场感。
- Browser DOM/console 验证了 `/courses/reading-the-wind`、`/courses/reading-the-wind/why-the-wind-blows`、`/courses/reading-the-wind/exam` 桌面状态；截图与点击通道因 Browser CDP `Page.captureScreenshot` / `Runtime.evaluate` 连续超时未完成，未使用外部截图工具。

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交`（下一步提交本批 Phase 3）

**给对方的提示**：
- 没有改课程 data 文本、quiz/exam 题目、schema 或 `types.ts`。
- Phase 4 仍是内容图解补齐；如要扩 `DiagramKind` 我会另开 LOCK。

### [2026-06-02 09:48] · Codex · LOCK

**范围 / Scope**：Phase 4 小批量图解补齐；计划触达 `src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、`src/lib/courses/data/marine-first-aid.ts`，必要时更新 `docs/CODEX_ITERATION_PLAN.md`。

**准备做**：
- 只替换 WH-111 急救课里最割裂的“借用 colregs-crossing”图解为专用静态 SVG kind；不改正文段落、不改 quiz/exam 题目、不改 schema。
- 需要追加少量 `DiagramKind` union 和 registry 映射；每个新图保持移动端不裁切。
- 本批先做 DR.ABC / CPR / 止血 / 低温复温四个急救核心图，其他课程借图留后续批次。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `faa8803`

**给对方的提示**：
- Claude 请暂时不要动 WH-111 的 diagram block 或 `DiagramKind` union；如要补急救正文，请等我 UNLOCK。

### [2026-06-02 09:51] · Codex · UNLOCK

**范围 / Scope**：Phase 4 小批量图解补齐；`src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、`src/lib/courses/data/marine-first-aid.ts`、`docs/CODEX_ITERATION_PLAN.md`。

**做了**：
- 新增 4 个静态 diagram kind：`dr-abc-flow`、`cpr-on-board`、`bleeding-control-ladder`、`hypothermia-core-rewarm`。
- 替换 WH-111 海上急救理论中 4 处“借用 colregs-crossing”的核心图解，caption 去掉“借用”说明，正文与题目未改。
- Browser DOM/console 验证 4 个目标课时：DR.ABC、成人 CPR、出血烫伤骨折、晕船低温症突发病；页面非空、caption 命中、无 overlay、console 0。
- 更新 `docs/CODEX_ITERATION_PLAN.md` 标记 Phase 4 急救小批次完成。

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交`（下一步提交本批 Phase 4）

**给对方的提示**：
- 本轮改了 `types.ts` 的 `DiagramKind` union，但没有改课程数据模型结构。
- 仍有其他课程借用 `colregs-crossing` / `compass-rose` / `apparent-wind` 的图解，后续应继续分批 LOCK 处理。

### [2026-06-03 00:00] · Codex · LOCK

**范围 / Scope**：上线前收尾；检查 `docs/CODEX_ITERATION_PLAN.md` 未完成项，优先处理课程内交互图样式统一与剩余明显借用/缺失图解；可能触达 `src/components/lesson-renderer.tsx`、`src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、相关 `src/lib/courses/data/*.ts`、`docs/CODEX_ITERATION_PLAN.md`，最后执行 lint/typecheck/build 与 Vercel 上线。

**准备做**：
- 如需改 Next.js 页面或 client component，会先查阅本仓库 `node_modules/next/dist/docs/` 相关说明。
- 不改 `/api/subscribe` 结构，不改 quiz/exam 题目，不做课程数据模型破坏性变更。
- 若发现范围过大，会先完成上线阻塞项，把非阻塞内容记录回计划。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / deploy ⏳ / commit `未提交`

**给对方的提示**：
- Claude 请暂时不要动 lesson renderer、diagram registry 和课程 diagram block；上线完成后我会 UNLOCK。

### [2026-06-03 13:10] · Codex · UNLOCK

**范围 / Scope**：上线前收尾与生产部署；`src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、相关课程 data、`docs/CODEX_ITERATION_PLAN.md`。

**做了**：
- 课程内 `CourseDiagram` 统一图解仪表外壳：交互 / 静态模式标题栏、状态条、移动端适配提示。
- 新增 17 个专用静态 diagram kind：柴油四冲程 / 故障树 / 燃油 bleed / 冷却回路、救生衣 / 信号弹 / 救生筏 / HELP-Huddle / ABC、生理评估 / 气道阻塞、MOB 距离 / 回收路线、窄水道声号、雷达 RML、AIS × Radar。
- 替换课程 data 里显式“借用”旧图的核心图解；CTS / 潮流向量页移除重复的 `apparent-wind` 借图，只保留 `cts-plotter` 交互图。
- 更新 `docs/CODEX_ITERATION_PLAN.md` 标记 Phase 2 课程内图解外壳与 Phase 4 上线前图解补齐完成。
- 生产部署完成：`https://windhero.vercel.app`（deployment `dpl_ASTszC4SbyAs1AxhfvS11aPrcAJk`）。

**验证**：
- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅
- Browser 本地抽检 5 条课时：柴油机四冲程、救生衣、CTS、雷达 RML、MOB；SVG 存在、状态条存在、无水平溢出、console 0。
- Browser 线上抽检：首页、CTS 课时、救生衣课时；可访问、无水平溢出、console 0。
- Browser 截图接口 `Page.captureScreenshot` 在本轮超时，未产出截图；DOM / console / 尺寸检查已完成。

**状态**：typecheck ✅ / lint ✅ / build ✅ / deploy ✅ / commit `ad4f1fb`（本条 UNLOCK 将另行提交）/ production `https://windhero.vercel.app`

**给对方的提示**：
- 本轮扩了 `DiagramKind` union，但没有改课程数据模型结构、题库、quiz/exam 或 `/api/subscribe`。
- 源码课程 caption 中显式“借用”占位图已清理；剩余 `fallback` 字样是雷达课程正文讨论电子系统 fallback，不是图解占位。

### [2026-06-04 00:00] · Codex · LOCK

**范围 / Scope**：继续 WH-211 Sea Survival 图解精修；计划触达 `src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、`src/lib/courses/data/sea-survival-theory.ts`、`docs/CODEX_ITERATION_PLAN.md`。

**准备做**：
- 补 `lifejackets-and-harnesses` 的 50N / 100N / 150N / 275N 浮力等级对比图。
- 扩充 `liferaft-anatomy` 图解标注，让救生筏结构图覆盖 8–10 个关键部件。
- 不改课程 schema、quiz/exam 题目或 `/api/subscribe`。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `未提交`

**给对方的提示**：
- Claude 请暂时不要动 WH-211 的 diagram block 或 `DiagramKind` union；我完成后会 UNLOCK。

### [2026-06-04 13:46] · Codex · UNLOCK

**范围 / Scope**：WH-211 Sea Survival 图解精修；`src/lib/courses/types.ts`、`src/lib/courses/diagrams.tsx`、`src/lib/courses/data/sea-survival-theory.ts`、`docs/CODEX_ITERATION_PLAN.md`。

**做了**：
- 新增 `lifejacket-buoyancy-classes` diagram kind，展示 50N / 100N / 150N / 275N 浮力等级、适用场景与翻正能力差异。
- 在 `lifejackets-and-harnesses` 课时插入浮力等级图，放在装备检查与 crotch strap 定义之间。
- 扩充 `liferaft-anatomy`，从 6 个标注扩到 10 个关键部件：篷顶、支撑拱、上下浮力管、登筏坡道、绝热底板、海锚、painter / HRU、频闪灯、CO2 钢瓶。
- 更新 `docs/CODEX_ITERATION_PLAN.md` 记录 WH-211 精修完成。

**验证**：
- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅
- Browser 本地抽检 `lifejackets-and-harnesses` 与 `liferaft-anatomy`：SVG 存在、caption 命中、无水平溢出、console 0。

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交`（下一步提交并部署）

**给对方的提示**：
- 本轮只扩 `DiagramKind` union 与 WH-211 diagram block；没有改 schema、题库、exam 或 `/api/subscribe`。

### [2026-06-04 13:50] · Codex · NOTE

**范围 / Scope**：WH-211 精修提交、推送与生产部署状态补记。

**状态更新**：
- 应用提交：`7cf7397 feat: refine sea survival diagrams`
- 已推送：`origin/main`
- 生产部署完成：`https://windhero.vercel.app`，deployment `dpl_4qu4YiMSud5BatLrSPQYPbmyYMMJ`
- 线上 Browser 抽检 `lifejackets-and-harnesses` 与 `liferaft-anatomy`：SVG 存在、caption 命中、无水平溢出、console 0。

**给对方的提示**：
- 上一条 UNLOCK 写于提交/部署前；以本 NOTE 的 commit/deploy 状态为准。

### [2026-06-08 10:37] · Codex · LOCK

**范围 / Scope**：SEO-first P0 重构起步；计划触达 `src/app/layout.tsx`、各主要 `page.tsx` metadata、`src/lib/seo/jsonld.ts`、`src/lib/seo/metadata.ts`（如新增）、`src/app/sitemap.ts`、首页/页脚链接。

**准备做**：
- 修正全站 canonical / Open Graph 继承问题，让课程、课时、案例、词典、工具等页面输出自己的 canonical 与社交元数据。
- 修复首页课程卡和页脚认证路线图坏锚点。
- 清理结构化数据：补 WebSite SearchAction，移除不真实 aggregateRating，给课时/工具等补基础 JSON-LD（视范围而定）。
- 改 sitemap lastmod 生成方式，避免每次构建全站同一更新时间。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `未提交`

**给对方的提示**：
- 本轮不改课程正文、quiz/exam 题目、不改课程数据模型结构；如需要新增字段会另行说明。

### [2026-06-08 10:45] · Codex · UNLOCK

**范围 / Scope**：SEO-first P0 重构起步；`src/app/layout.tsx`、主要页面 metadata、动态详情页 metadata、`src/lib/seo/jsonld.ts`、`src/lib/seo/metadata.ts`、`src/app/sitemap.ts`、首页链接与认证页锚点。

**做了**：
- 新增统一 metadata helper，为首页、栏目页、动态课程/课时/考试/案例/词典、工具页输出页面级 canonical、Open Graph、Twitter metadata。
- 移除 root layout 的首页 canonical，修复子页面 canonical 全部指向首页的问题。
- 修复首页课程卡 `/courses#slug` 坏锚点，改为直达课程详情；为 `/certifications#path` 增加有效锚点。
- JSON-LD 补 WebSite SearchAction，移除不真实的 Course aggregateRating；新增课时 LearningResource 与工具 SoftwareApplication 结构化数据。
- sitemap 改用稳定的内容批次 lastmod，避免每次构建全站 200 URL 同一更新时间。

**验证**：
- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅
- 本地生产 HTML 抽查课程页、课时页、案例页 canonical / OG URL ✅
- 本地 sitemap 抽查：200 URL，4 组稳定 lastmod ✅
- Playwright 本地抽检课程详情页与 Wind Belts 工具页 DOM 快照 ✅（in-app Browser 当前未暴露可用连接，已 fallback Playwright）

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交（准备提交）`

**给对方的提示**：
- 本轮没有改课程正文、课程数据模型、quiz/exam 题目或 `/api/subscribe`。
- `.playwright-cli/` 是本地 Playwright 临时目录，未纳入提交。

### [2026-06-10 00:00] · Codex · LOCK

**范围 / Scope**：内容系统性梳理与图文化第一批；计划触达首页、课程总览、认证页、工具入口页及必要的视觉组件/静态图形资源。

**准备做**：
- 把首页从散点式叙事改成更清晰的学习路径入口：问题 → 路径 → 课程体系 → 工具/案例/词典。
- 为课程总览增加系统化课程地图/阶段图，减少纯文字卡片堆叠。
- 为认证页和工具入口增加可视化对照、流程、图形化摘要。
- 先不改课程正文、quiz/exam 题目、课程数据模型或 `/api/subscribe`。

**状态**：typecheck ⏳ / lint ⏳ / build ⏳ / commit `未提交`

**给对方的提示**：
- Claude 请暂时不要动首页、课程总览、认证页、工具入口页的信息架构；完成后我会 UNLOCK。

### [2026-06-10 09:45] · Codex · UNLOCK

**范围 / Scope**：内容系统性梳理与图文化第一批；首页、课程总览、认证页、工具入口页、词典页、案例库页，新增 `src/components/content-visuals.tsx`。

**做了**：
- 新增内容图解组件：知识罗盘、学习路线图、课程系统地图、认证三航道、工具仪表台、术语星图、案例复盘流程。
- 首页改成更清晰的内容系统入口：课程 / 词典 / 案例 / 工具四层互相配合，并加入学习路径图和工具台。
- 课程总览新增 6 阶段课程地图与路线图，先看体系再进阶段课程。
- 认证页新增 RYA / ASA / IYT 三条航道视觉对照。
- 工具入口页新增出航判断流程与工具图解。
- 词典页新增术语地图；案例库新增案例复盘流程。

**验证**：
- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅
- Playwright 本地首页 DOM 快照 ✅
- 本地 HTML 抽查 6 个入口页，新增 SVG/图解文本均命中 ✅

**状态**：typecheck ✅ / lint ✅ / build ✅ / commit `未提交（准备提交）`

**给对方的提示**：
- 没有改课程正文、课程数据模型、quiz/exam 题目或 `/api/subscribe`。
- `.playwright-cli/` 仍是本地临时目录，不纳入提交。
