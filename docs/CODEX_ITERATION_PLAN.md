# WindHero 质感化迭代计划

> Codex 与 Claude Code 协作计划。Claude 在继续实现时请先读 `AGENTS.md`，再读本文件；本文件记录设计方向、资产来源、分阶段任务与验收标准。

## 目标

把 WindHero 从“内容完整的航海课程站”升级为“有真实质感的航海教学产品”。第一优先级是视觉质感与工具体验：首屏要像一所可信的现代航海学院，课程页要像可长期学习的教材系统，交互工具要像船长训练沙盒，而不是普通表单页面。

## 设计方向

- 保留现有 Mediterranean Editorial / 赤子之心基调：冷调纸面、深海军蓝、Aegean 蓝、少量日出金。
- 真实资产替换抽象装饰：海平线、帆船训练、海图桌面、罗盘、等压线、风矢量、天气图层。
- 所有正文、按钮、读数、表单、导航、题目和工具控件必须由代码原生渲染；Image-2 资产只承担氛围、材质、背景和插画。
- 工具页采用“训练沙盒”结构：控制区、可视化画布、即时解释/航行建议三者同时可见。

## Image-2 资产清单

参考概念板：

`/Users/chrisliang/.codex/generated_images/019e8145-c58d-7931-8e9a-32fb9893eac7/ig_093b4182d73c47b8016a1d1ed1325481919a211319eb62c59c.png`

当前已接入项目的第一批资产：

| 文件 | 用途 | 可替换 | 生成说明 |
| --- | --- | --- | --- |
| `/public/images/generated/hero-ocean-training-v1.png` | 首页 Hero 背景 | 是 | 清晨海平线、右侧训练帆船、左侧留白 |
| `/public/images/generated/course-chart-desk-v1.png` | 课程详情、课时、考试氛围 | 是 | 海图桌面、分规、罗盘、日志本 |
| `/public/images/generated/synoptic-chart-texture-v1.png` | 工具页天气/风带纹理 | 是 | 海图网格、等压线、风羽、罗盘 |

后续第二批资产优先级：

1. `wind-shift-vmg`：VMG / wind shift 训练图。
2. `compass-rose`：海图课程统一罗盘图。
3. `celestial-triangle`：天文导航三角形和六分仪光路。
4. VHF 课程流程图：DSC、MIPDANIO、GMDSS、三段式呼叫。

## 阶段任务

### Phase 1 · 已落地的质感底座

- 协作文档落盘，并在 `CLAUDE.md` 指向本计划。
- 首页 Hero 改为真实海面训练照片，并保留课程入口。
- 新增通用视觉类：instrument panel、status strip、tool shell、image wash、range 样式。
- 工具页首屏加入天气图纹理，控制区/画布/建议区统一为训练沙盒视觉。
- 课程详情、课时、考试页加入海图桌面氛围层和学习状态条。

### Phase 2 · 工具体验增强

- ✅ `/tools/wind-belts`：把区域选择、纬度拖动、三圈环流地球、同风带海域、出航窗口、季风/风险提示组成三栏训练沙盒。
- ✅ `/tools/synoptic`：把等压线密度、半球切换、锋面层、风速读数、Buys-Ballot 解释组成天气简报台。
- ✅ 课程内交互图统一复用图解仪表外壳：标题栏、状态条、交互 / 静态模式标识，并保留各交互工具内部的 control row、读数区和图例。

### Phase 3 · 课程阅读升级

- ✅ 课程详情页增加更明确的学习路径感：阶段、模块数、课时数、第一课入口、考试入口、关键能力。
- ✅ Lesson 页优化阅读节奏：正文导读仪表、学习动作、进度状态、上一课/下一课快速导航。
- ✅ Exam 页保留当前逻辑，视觉上更像真实考场/海图桌面，并强化考前状态。

### Phase 4 · 内容图解补齐

- ✅ 当前代码中没有运行时 `DiagramFallback` 残留；上线前清理了课程 data 里显式“借用”旧图的核心图解。
- ✅ 替换 VHF 课程里的“无专用插画，用罗盘图占位”。
- ✅ 小批量替换 WH-111 急救课 4 处借用避碰图：DR.ABC、船上 CPR、止血阶梯、低温核心复温。
- ✅ 上线前补齐 17 个专用图解 kind：柴油四冲程 / 故障树 / 燃油 bleed / 冷却回路、救生衣 / 信号弹 / 救生筏 / HELP-Huddle / ABC、生理评估 / 气道阻塞、MOB 距离 / 回收路线、窄水道声号、雷达 RML、AIS × Radar，并移除 CTS / 潮流向量的重复借图。
- 每次新增图解都要确认移动端不裁切，课程页构建不增加新 API 或数据破坏性变更。

## 实现约束

- 不新增 UI 框架；继续使用 Next.js 16 App Router、Tailwind v4、Lucide 和手写组件。
- 不改变 `/api/subscribe` 请求/响应结构。
- 不改变课程数据模型；需要新增图解时只追加 `DiagramKind` 和对应渲染组件。
- 新生成资产统一放入 `public/images/generated/`，命名使用用途 + 版本号。
- 修改 Next.js 页面、图片或 client component 前，遵守 `AGENTS.md`：优先查阅 `node_modules/next/dist/docs/` 相关文档。

## 验收标准

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- 浏览器检查桌面与移动端：首页、课程详情、课时页、考试页、`/tools/wind-belts`、`/tools/synoptic`。
- 视觉验收至少检查：首屏构图、字体层级、色彩一致性、图片融合、工具交互密度、移动端折叠、文字不溢出、图解不裁切。
- 功能验收确认：课程路由、考试抽题/计时、newsletter、sitemap/robots 不回归。
