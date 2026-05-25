# WindHero 逐风人

> **驾驭风的方向。** Master the Wind.
> 一所现代航海学院与探索社区的官方站——基于 Next.js + Supabase，部署在 Vercel。

WindHero 不是传统的帆船俱乐部。它是为那些想要真正学会读风、规划真实航段、并建立"船长的判断力"的人而建的学校。本仓库是它对外的内容站——课程、航线、航海日志、宣言——以及订阅邮件背后那套轻量的 Supabase 后端（更多功能后续逐步上线）。

线上：**https://windhero.vercel.app**

---

## 技术栈

| 层 | 选型 |
| --- | --- |
| 框架 | **Next.js 16**（App Router、RSC、Turbopack） |
| 语言 | TypeScript（strict） |
| 样式 | Tailwind CSS v4（WindHero 设计 token 写在 `globals.css`） |
| 组件 | 全部手写，图标用 Lucide |
| 后端 | **Supabase**（`@supabase/ssr` + `@supabase/supabase-js`）——目前仅用于邮件订阅 |
| 部署 | **Vercel**（Fluid Compute、Node.js 24） |
| 字体 | 拉丁字体走 Inter / Cormorant Garamond / JetBrains Mono；中文走系统字体栈（苹方 / 思源 / 微软雅黑），不额外下载，加载快 |

本期**不做账号体系**——按规划暂不上注册登录。唯一的后端入口是 `POST /api/subscribe`，把邮箱 upsert 进 Supabase 的 `subscribers` 表。

---

## 课程系统

WindHero 的核心是一套完整的航海理论 + 实操课程，对标 RYA Day Skipper / Coastal Skipper / Yachtmaster 体系，但所有正文、题目、案例均为 WindHero 原创撰写。

### 课程结构

| 课号 | 名称 | 等级 | RYA 对标 | 状态 |
| --- | --- | --- | --- | --- |
| WH-101 | 读懂风 | 入门 | Day Skipper Theory | ✓ 4 模块 8 课时 + 12 题模拟考 |
| WH-204 | 天气与航路 | 进阶 | Coastal/Yachtmaster Theory | ✓ 3 模块 6 课时 + 10 题模拟考 |
| WH-212 | 海员素养与安全 | 进阶 | Coastal/Yachtmaster Theory | ✓ 3 模块 6 课时 + 11 题模拟考 |
| WH-228 | 近岸引航与天文导航 | 进阶 | Yachtmaster Ocean Theory | ✓ 3 模块 6 课时 + 11 题模拟考 |
| WH-301 | 船长的思维 | 船长之路 | Yachtmaster Ocean Theory | ✓ 3 模块 6 课时 + 10 题情境考 |
| WH-401 | 远洋航段实战课 | 船长之路 | Yachtmaster Offshore（实操） | ✓ 3 模块 · 船上 10 天 · 无笔试 |

### 内容数据模型

所有课程内容定义在 `src/lib/courses/data/*.ts`，每门课导出一个 `Course` 对象。类型契约在 `src/lib/courses/types.ts`：

- **Course** → 模块 / 课时 / 模拟考 / 资源
- **Module** → 多个 **Lesson**
- **Lesson** → `body: LessonBlock[]`（段落、heading、list、definition、callout、diagram、quote、practice、table）+ `quiz: Question[]`
- **Exam**（可选）→ 题库、时长、及格分
- **Resource** → 开源 / 付费工具、图书、海图、应用、网站、视频

### 模拟考试体验

考试页（`/courses/[slug]/exam`）模拟真实考场：

1. 进入页面后看到考前确认页，列出题数、时长、规则。
2. 点「开始考试」后，倒计时启动且不可暂停。
3. 答题过程中不显示对错，与真实笔试一致。
4. 时间到自动交卷；可提前交卷。
5. 交卷后一次性展示成绩、每题对错、详细解析。
6. 中途刷新或关闭页面会触发浏览器确认对话框。

### 图解

`src/lib/courses/diagrams.tsx` 提供原创线稿 SVG 图解，全部走 ink / sea / mist 三档配色，呼应站点的高级地中海视觉。已实现：

`points-of-sail` · `apparent-wind` · `sea-breeze-cycle` · `pressure-gradient` · `frontal-system` · `buoyage-iala-a` · `colregs-crossing` · `lights-vessels`

待补完整 SVG 的（目前占位卡片）：

`wind-shift-vmg` · `compass-rose` · `tide-curve` · `celestial-triangle`

---

## 本地开发

```bash
pnpm install
cp .env.example .env.local        # 可选——配 Supabase keys 后才有真后端
pnpm dev                          # http://localhost:3000
```

常用脚本：

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器（Turbopack） |
| `pnpm build` | 生产构建 |
| `pnpm start` | 本地跑生产构建 |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript 严格类型检查 |

Supabase 在本地**完全是可选的**。如果没填 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`，`/api/subscribe` 会返回 `{ ok: true, pending: true }` 并把邮箱打到服务端日志，前端 UI 依然能正常体验。

---

## 项目结构

```
src/
  app/
    layout.tsx               根布局（字体、Header、Footer、metadata）
    page.tsx                 首页
    courses/page.tsx         课程
    voyages/page.tsx         航线 + 港口
    journal/page.tsx         航海日志（长文）
    manifesto/page.tsx       宣言
    about/page.tsx           关于 + 联系
    api/subscribe/route.ts   订阅 API
    icon.svg                 站点图标
    globals.css              Tailwind v4 主题 + 动画
  components/
    site-header.tsx
    site-footer.tsx
    hero.tsx
    section.tsx
    newsletter-form.tsx
  lib/
    content.ts               课程 / 航线 / 日志数据
    utils.ts                 cn() 辅助
    supabase/
      client.ts              浏览器客户端
      server.ts              服务端 + service-role 客户端
supabase/
  schema.sql                 subscribers 表 + RLS 策略
  migrations/                CLI push 用的迁移
.env.example                 环境变量模板
```

---

## Supabase 设置（要让订阅真正落库时）

1. 去 https://supabase.com 新建项目。
2. 打开 **SQL Editor**，执行 [`supabase/schema.sql`](supabase/schema.sql)。这会创建 `public.subscribers` 表，并配好 RLS——让匿名浏览器只能写不能读。
3. 在 **Project Settings → API** 把这三个值填进 `.env.local`：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` *（仅服务端 —— `/api/subscribe` 用它绕过 RLS 做 upsert）*
4. 重启 `pnpm dev`，再去 Footer 订阅一次，应该能看到表里有一行新数据。

未来要做账号体系时，[`lib/supabase/client.ts`](src/lib/supabase/client.ts) 和 [`lib/supabase/server.ts`](src/lib/supabase/server.ts) 已经按 `@supabase/ssr` 标准接好——加几行中间件和路由就行，无需重写底层。

---

## 部署到 Vercel

仓库已经处在可一键部署状态。

### 首次

1. 推到 GitHub：仓库地址 https://github.com/coolboylcy/WindHero。
2. 打开 https://vercel.com/new，**Import** `coolboylcy/WindHero`。Vercel 会自动识别 Next.js——保持默认即可。
3. 在 **Project Settings → Environment Variables** 配齐：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`（例如 `https://windhero.vercel.app` 或你的自定义域名）
4. **Deploy**，立刻拿到 `*.vercel.app` 域名。要绑自定义域名（比如 `windhero.app`），去 **Domains** 添加。

### 用 CLI

```bash
pnpm i -g vercel@latest         # 推荐升级到 54.3+
vercel link                     # 把当前目录绑到 Vercel 项目
vercel env pull .env.local      # 把生产环境变量拉到本地
vercel deploy                   # 预览部署
vercel deploy --prod            # 生产部署
```

---

## 品牌色板（写在代码里）

下列 token 都写在 [`src/app/globals.css`](src/app/globals.css) 的 `@theme { … }` 里，所有页面自动继承：

| Token | 色值 | 含义 |
| --- | --- | --- |
| `--color-ink` | `#05131f` | 深夜海面——页面底色 |
| `--color-deep` | `#0a1f33` | 中层海水——区块底色 |
| `--color-ocean` | `#102a43` | 较浅海水 |
| `--color-mist` | `#cfd9e2` | 冷灰——次级文字 |
| `--color-sail` | `#f5f2ea` | 白帆色——深色背景上的主文字 |
| `--color-gold` | `#c8a96a` | 黄铜金——点缀色 |
| `--color-rust` | `#9c5a3c` | 锈红——错误/警告 |

字体上：**Cormorant Garamond** 做拉丁衬线显示字体（页面上叫 `.display`），**Inter** 做 UI 无衬线，**JetBrains Mono** 处理坐标、编号、技术数据。中文部分走系统字体栈（苹方 / 思源 / 微软雅黑），不额外下载——既快又有专业感。

---

## 后续路线（刻意保持短）

- [x] ~~每门课程的详情页（大纲、导师、可下载 PDF）~~ → 6 门课全部上线
- [ ] 每条航段的逐日航路简报详情页
- [ ] 把剩余 4 个 diagram kind 补成完整 SVG（`wind-shift-vmg`、`compass-rose`、`tide-curve`、`celestial-triangle`）
- [ ] 把 `journal/page.tsx` 里的 `longform` map 改为 MDX 文件
- [ ] 船长账号 + 班级 Dashboard（Supabase Auth）
- [ ] 学员答题/考试结果上传 Supabase，做错题本与进度跟踪
- [ ] 每个路由生成专属 OG Image（`opengraph-image.tsx`）

---

## 许可

内容版权 © WindHero。源代码 MIT。
