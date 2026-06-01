# WindHero 课程内容审计报告

> 由 Agent A 生成。该清单驱动后续 B 群组（内容补充）与 C（工具开发）的工作分配。
> 审计范围：13 门课程、约 80 节课（含线上理论 12 门 + 线下实战 1 门）。
> 现有交互工具 6 个：points-of-sail、apparent-wind、tide-curve、three-cell-circulation、coriolis-deflection、isobar-wind。

---

## 一、新交互工具建议（给 Agent C）

按"动手才能懂"的强度排序。建议优先实现工具 1 & 2（覆盖最多课程，且替代了几处目前用静态/借用 diagram 凑合的环节）。

### 工具 1: ctsplotter（CTS 向量三角形交互器）
- 教学目标：让学员理解"为什么 CTS 向量要从 A 点画潮流、再画船速弧、交目标线得出 CTS"——这是 WH-103 的核心硬骨头，但现在只有文字描述 + 借用的 apparent-wind 图凑合。学员看完文字仍可能画不出。
- 关键操作：① 拖动潮流向量的方向 (set) 与长度 (drift)；② 拖动船速值；③ 拖动目标方位线；④ 实时显示 CTS 真方位、SMG、ETA；⑤ 一键加入 leeway 偏移；⑥ 切换"潮流顺向 / 横向 / 逆向"三种预设，让学员看 SMG 如何变化。
- 预期收益：相比静态图，学员能"亲手转一下方向"理解"为什么 CTS 偏向潮流来源一侧"；同时直观看到 SMG 与 SOG 的差异——这两点是 RYA Day Skipper 实操评分的硬考点。
- 对应课程 / 课时：chartwork-and-tides/cts-and-leeway（2.2）、tidal-stream-vectors（4.2）、celestial-and-pilotage/entry-planning-process（3.1）
- 实现复杂度估计：中

### 工具 2: lights-identifier（灯型夜识训练器）
- 教学目标：让学员在"4 秒内"识别夜里看到的灯型组合是什么船——这是 WH-105 整门课的最终能力目标。目前课程靠表格 + 几张借用的 colregs-crossing 图凑合，学员看完很难真正在脑子里建立"3 盏垂直白桅 = 拖航 > 200m"这种条件反射。
- 关键操作：① 一艘虚拟船在屏幕中央，学员可以围着它走 360°（拖动视角）；② 切换船型预设（动力船 < 12m / ≥ 50m / 帆船 / 拖航 ≤200m / 拖航 >200m / 失控 / 受限 / 锚泊 / 渔船拖网 / 渔船其他 / 领航船）；③ "竞赛模式"——随机出一组灯，学员 4 秒内选答案，立即反馈；④ 切换昼/夜，看号型如何对应灯型。
- 预期收益：把"看灯识船"这件本质上是模式识别的能力，从抽象记忆变成 50 次正反馈训练。等于把 RYA 笔试的灯型题作为副产品全部刷掉。
- 对应课程 / 课时：lights-shapes-sounds 全部 4 节、seamanship-and-safety/colregs-and-rules（3.1）、offshore-passage/night-watch-overview（3.1）
- 实现复杂度估计：中

### 工具 3: radar-cpa-simulator（雷达 CPA / RML 模拟器）
- 教学目标：让学员理解"相对运动线（RML）指向自船 = 即将撞上"，并能手动 plot 算出对方真航向。这是 WH-113 的核心，目前只有文字和借用的 colregs-crossing 图，学员根本看不出"两次扫描位置怎么连成线、怎么求向量减法"。
- 关键操作：① 屏幕模拟雷达圆盘（RM 模式 vs TM 模式可切）；② 学员设置自船航向 / 船速；③ 添加 1–3 个目标船，可设它们的真航向、船速；④ 每 3 分钟自动"扫描"一次，画出回波点 + RML；⑤ 实时显示 CPA / TCPA / 对方真航向；⑥ 学员可在 plotting 区拖动向量做手动 plotting。
- 预期收益：把"为什么 RML 通过自船 = 危险"从抽象向量减法变成几何直觉。也支持 Rule 19 决策练习——学员尝试"向右 30° 转向"看 RML 如何重置。
- 对应课程 / 课时：radar-and-electronics/radar-collision-avoidance（2.1）、radar-pilotage-in-fog（2.2）
- 实现复杂度估计：高

### 工具 4: heave-to-balance（Heave-to 三力平衡可视化）
- 教学目标：让学员理解 heave-to 状态下"主帆推 + 艏帆反吹 + 舵反扭"三股力如何在不同风速下保持平衡，以及为什么不同船型的稳定 TWA 在 50°–75° 之间漂。这是 WH-212 的核心 seamanship，但现在只能借 points-of-sail 凑合，学员根本看不到"三股力"。
- 关键操作：① 一艘船俯视图，三个力向量（主帆、反艏帆、舵）可视化；② 拖动真风风速 / 船型（轻量赛艇 / 巡航 / 重远洋）；③ 实时显示稳定 TWA 与下风漂移速度；④ "试着失败"模式——让学员把舵设错方向，看船如何被吹散。
- 预期收益：让学员真正理解 heave-to 不是"船自己稳"，而是三股力的精确制衡。也帮助理解 sea anchor / drogue 的区别。
- 对应课程 / 课时：seamanship-and-safety/heaving-to（1.1）
- 实现复杂度估计：中

---

## 二、内容补充清单（给 Agent B 群组）

按课程分组。严重度：高 = 影响核心判断力，必须补；中 = 提升学习曲线但可后置；低 = 锦上添花。

### WH-101 reading-the-wind
- ✓ 总体充分。已经是体系内最成熟的课程，6 个交互工具中有 3 个用在这里。
- [ ] **Lesson 2.2 polar-and-vmg**（中）
  - 问题：VMG 表格用了具体数字（38°/45°/90° 等），但学员看完不知道"自己怎么算 VMG"——cos(TWA−目标角) 公式只一笔带过。
  - 补充建议：在 worked example 之后加一个 callout "用计算器或 Python 一行算 VMG"，给两三个 (TWA, 船速) 输入示例，让学员手算一次。
  - 严重度：中

### WH-103 chartwork-and-tides
- [ ] **Lesson 1.1 chart-fundamentals**（中）
  - 问题：墨卡托投影的"为什么"讲了"等角"但没讲"为什么航海需要等角"——学员看完仍不理解大圆 vs 等角的代价权衡。
  - 补充建议：加一个 callout 对比"墨卡托上的直线 vs 大圆"——同样从纽约到伦敦，距离差多少？为什么 Day Skipper 选等角？
  - 严重度：中
- [ ] **Lesson 1.2 variation-deviation**（高）
  - 问题：CADET 转换规则的"为什么 W 时加 / E 时减"解释了一段（348 行附近），但用文字描述方位关系很抽象。学员考试时仍然会搞反方向。
  - 补充建议：加一张完整的 worked-example 速查表——"3 道题：T→C / C→T / 含年变率"，每道题分 4 行展开（不要塞进段落），目前 3 个示例埋在大段落里很难复习。
  - 严重度：高
- [ ] **Lesson 2.2 cts-and-leeway**（高）
  - 问题：CTS 向量三角形目前借用 apparent-wind 图凑合（742 行的 caption 已经承认"真实 CTS 三角形要在海图上手画"）。学员看完文字描述根本画不出来。
  - 补充建议：必须配交互工具（见工具 1）；如果暂时没有工具，至少加一组 3 步分图（"画潮流向量 → 画船速弧 → 读 CTS"），每步独立 SVG 而不是借图。
  - 严重度：高
- [ ] **Lesson 3.2 secondary-ports-and-rule-of-twelfths**（中）
  - 问题：12 分之 1 法则的核心 worked example（1273 行附近"最早能进港"题）公式推导过密、跨度大；初学者会跟丢。
  - 补充建议：把"最早能进港"那一段拆成 5 步带表格的小步骤（要求潮高 / 需涨多少 / 累计 12 分之 / 线性插值 / 最终时刻），不要塞进一个大段落。
  - 严重度：中
- [ ] **Lesson 4.2 tidal-stream-vectors**（中）
  - 问题：3 小时跨两个 diamond 的示范题（1693 行附近）用了大量纯文字数学（"东向累计 17.9 - 1.88 = 16.0 nm"），但没有任何向量画图，学员只能算不能"看"。
  - 补充建议：增加一个分步表格——每小时一行，列出 (船速向量 east, north) 与 (潮流向量 east, north)，最后累加；或直接借助工具 1 的 CTS plotter 多时段版本。
  - 严重度：中

### WH-105 lights-shapes-sounds
- [ ] **Lesson 1.1 lights-of-power-vessels**（高）
  - 问题：灯型与可见弧的几何关系是该课程的核心，但目前只有一个静态 lights-vessels diagram + 大量表格。学员靠死记表格通过笔试，但 6 个月后忘掉。
  - 补充建议：交互工具（见工具 2）。如果暂时无工具，至少补一个"5 道夜识题"练习——给文字描述（"你看到正前方两盏垂直白灯 + 一红一绿"），让学员选船型。
  - 严重度：高
- [ ] **Lesson 1.2 lights-of-sailing-and-rowing**（中）
  - 问题：tri-color 桅灯的禁用条件（"开机器后必须切回动力灯型"）讲了文字，但学员不会有 sticky memory。
  - 补充建议：在"开机器后切换"那一段加一个"两图对比 GIF/SVG"——左：纯帆下的 tri-color；右：刚开机后正确灯型——一秒钟传达切换义务。
  - 严重度：中
- [ ] **Lesson 2.1 restricted-and-not-under-command**（中）
  - 问题：NUC/RAM/受限/锚泊四类灯型的"两红/红白红"等口诀用文字给了，但所有这些都是模式识别问题，文字记不住。
  - 补充建议：交互工具（工具 2 一并解决）；或至少加一张并排 4 图 SVG，让学员一眼看到 4 种"特殊灯型"的差别。
  - 严重度：中
- [ ] **Lesson 3.1 maneuvering-and-warning-signals**（低）
  - 问题：声号"右一、左二、后三"的口诀很好，但学员需要听才记得住。
  - 补充建议：可选加 audio sample（5 短声 / 1 长声 / 2 长声）按钮；不实现也不影响通关。
  - 严重度：低

### WH-107 vhf-and-comms
- [ ] **Lesson 2.2 dsc-distress-procedures**（高）
  - 问题：DSC 遇险呼叫的实操流程是该课程最关键能力，但目前是纯文字 + 表格。学员不可能在真实事故中"凭记忆按对按钮顺序"。
  - 补充建议：加一份"DSC 操作 6 步速查卡"（独立 callout、要能打印）——掀盖、按红、选类型、确认、按发送、监听 channel 16。目前内容里这 6 步散在各段落。
  - 严重度：高
- [ ] **Lesson 3.1 mayday-pan-securite**（高）
  - 问题：MIPDANIO 7 项的英文助记给得很好，但完整 MAYDAY 通话脚本只有零碎片段。学员练不下来。
  - 补充建议：加一段"完整 MAYDAY 脚本范例"（带括号注释——船名 / 位置 / 性质 / 协助 / 等等），覆盖 MIPDANIO 全部 7 项，约 80 字一段；附一段"PAN-PAN 范例"对照。
  - 严重度：高
- [ ] **Lesson 3.2 procedural-vocabulary**（中）
  - 问题：NATO 字母表只列表，没给学员"自己练"的反馈。
  - 补充建议：加一个 practice block——"用 NATO 字母表拼出你的船名和你的紧急联络人电话尾号"，让学员手写一次。
  - 严重度：中

### WH-109 diesel-engine
- ✓ 总体充分。课程深度很到位，"先怀疑燃料"的统计学理由特别有力。
- [ ] **Lesson 1.1 four-stroke-cycle**（低）
  - 问题：4 冲程的"进-压-做-排"用文字描述了，但没有动画/示意图。
  - 补充建议：建议加一个简单的 4 帧 SVG 序列（活塞上下 + 阀门开关 + 喷油时机），不必交互；也可借助 YouTube 链接资源页。
  - 严重度：低
- [ ] **Lesson 2.1 fuel-system-and-bleeding**（高）
  - 问题：bleed 燃料系统是远海最常被需要的硬技能，但目前是纯文字流程。学员上船第一次做仍会卡。
  - 补充建议：加一张"燃料系统示意图"（油箱 → 主滤芯 Racor → 二级滤 → 喷油泵 → 喷油嘴 → 回油），并在每个排气螺丝点标★；配合一个"6 步带顺序"的 worked checklist。
  - 严重度：高
- [ ] **Lesson 3.1 wont-start-or-wont-run**（中）
  - 问题：故障决策树用文字给了，但没有可视化的"是/否分支图"。
  - 补充建议：加一个简单的决策流程图（SVG 或 ASCII art callout）——"起动机响？→ 是 → Racor 透明杯水？→ 是 → 排放 → ..."；学员压力下会去翻这张图。
  - 严重度：中

### WH-111 marine-first-aid
- [ ] **Lesson 1.1 dr-abc-primary-survey**（中）
  - 问题：DR.ABC 的"D-Danger / R-Response / A-Airway / B-Breathing / C-Circulation"流程，但每一步具体动作要做什么需要学员翻几屏才看清。
  - 补充建议：加一张"60 秒 DR.ABC 速查图"——5 个步骤、每步 1-2 个具体动作、放在课首作为"印在脑子里的卡片"。
  - 严重度：中
- [ ] **Lesson 2.1 adult-cpr**（中）
  - 问题：CPR 节奏"100–120 次/分钟"+ Stayin' Alive 提示已经很好，但没给学员"自测"工具。
  - 补充建议：可选加一个 metronome 按钮（110 bpm）让学员练习按压节奏；或在 practice block 注明"用手机里的 metronome app 设 110"。
  - 严重度：中（可选）
- [ ] **Lesson 3.1 bleeding-burns-fractures**（中）
  - 问题：止血带 vs 加压包扎的决策时机讲了文字，但没有"何时该升级到止血带"的判断流程。
  - 补充建议：加一个"出血评估 → 处置阶梯"图（直接加压 → 高位加压 → 止血带），并明示"动脉出血 + 5 分钟加压无效 → 上止血带"。
  - 严重度：中

### WH-113 radar-and-electronics
- [ ] **Lesson 1.2 interpreting-radar-images**（中）
  - 问题：雷达图像里"哪个亮斑是什么"的内容用了大量文字描述，但没有真实雷达截图。学员脱离上下文记不住。
  - 补充建议：在资源页加一个 MarineTraffic 雷达回放链接 + 4-5 张标注好的雷达截图（船 / 陆地 / 海杂波 / 雨杂波）。
  - 严重度：中
- [ ] **Lesson 2.1 radar-collision-avoidance**（高）
  - 问题：手动 plotting 的向量减法（489 行附近）是 RYA Yachtmaster 必考但目前是纯文字描述（"O₁ 到 O₃ 连线 + 自船向量 = ..."）。学员理解不了。
  - 补充建议：交互工具（见工具 3）；如果暂时没有，至少配一张 3 步 SVG 示意图——记录 3 个 O 点 → 画 RML → 做向量减法。
  - 严重度：高
- [ ] **Lesson 3.1 gps-and-position**（低）
  - 问题：GPS spoofing / 黑海事件的故事很好，但没给学员"自己识别 spoof"的具体动作清单。
  - 补充建议：加一个 callout "3 个动作判断 GPS 是否被骗"——纸图位置对比、雷达地标距离、AIS 邻船是否合理。
  - 严重度：低

### WH-204 weather-and-routing
- [ ] **Lesson 1.1 low-pressure-anatomy**（中）
  - 问题：低压"四段人生"用文字 + 一张静态 pressure-gradient 图讲，但学员看不到"波动→成熟→锢囚→消亡"的演化。
  - 补充建议：加一组 4 张并排的小 SVG（波动期 / 成熟期 / 锢囚期 / 消亡期），每张展示等压线和锋面位置——这是非常经典的气象图组合，做出来一次可复用。
  - 严重度：中
- [ ] **Lesson 2.2 multi-model-confidence**（中）
  - 问题：spaghetti plot 用 frontal-system diagram 凑合（497 行）。学员从没见过真的 spaghetti plot。
  - 补充建议：加一张真实 spaghetti plot 截图（ECMWF ensemble 公开可获取），并标注"收敛区"与"发散区"；或在资源页直接链 ECMWF ensemble 页面。
  - 严重度：中
- [ ] **Lesson 3.2 routing-and-bolt-holes**（低）
  - 问题：5 个 bolt hole 的概念给得很好，但没有具体的"地图标注"案例。
  - 补充建议：加一张虚构航段的示意图（出发港 + 计划航线 + 5 个 bolt hole 标点），让"5 个港"变具体。
  - 严重度：低

### WH-211 sea-survival-theory
- [ ] **Lesson 1.1 lifejackets-and-harnesses**（中）
  - 问题：救生衣分级（150N / 275N 等）用文字给了，但没有可视化对比。
  - 补充建议：加一张 SVG"4 种救生衣浮力对比"图，展示 50N / 100N / 150N / 275N 对应的脸部高度差异。
  - 严重度：中
- [ ] **Lesson 3.1 hypothermia-and-cold-shock**（中）
  - 问题：HELP / Huddle 姿势借用 colregs-crossing diagram 凑合（940 行）。这是该课程的标志性"救命姿势"，学员看不到具体动作。
  - 补充建议：必须配独立的 HELP / Huddle 姿势 SVG（人形 + 关键肌群标注）；如做不了 SVG，可至少在资源页链 RNLI 官方 1-10-1 视频。
  - 严重度：中
- [ ] **Lesson 2.1 liferaft-anatomy**（高）
  - 问题：救生筏的结构（buoyancy chamber / canopy / boarding ramp / drogue / sea-anchor / strobe / floor / CO2 cylinder）用文字描述，但没有结构图。学员上真筏第一次会找不到关键部件。
  - 补充建议：必须加一张救生筏剖视/结构图（标注 8-10 个关键部件）；这是 Sea Survival 课的"骨架图"。
  - 严重度：高

### WH-212 seamanship-and-safety
- [ ] **Lesson 1.1 heaving-to**（中）
  - 问题：三力平衡用文字描述 + 借用 points-of-sail（63 行）。学员看不出"三股力如何抵消"。
  - 补充建议：交互工具（见工具 4）；或至少加一张力向量 SVG。
  - 严重度：中
- [ ] **Lesson 1.2 reefing-and-storm-sails**（低）
  - 问题：缩帆等级表很好，但 trysail vs storm jib 没有视觉对比。
  - 补充建议：加一张并排 SVG——"全帆 / Reef 1 / Reef 3 / Trysail+Storm jib"四档帆面对比，配 38 尺船尺度。
  - 严重度：低
- [ ] **Lesson 2.1 mob-golden-90s**（高）
  - 问题：MOB 黄金 90 秒流程用文字给了，但没有"决策树"可视化。MOB 是船长压力下要执行的，需要图形化辅助。
  - 补充建议：加一张"MOB 决策卡"SVG/打印图——指人 → 按按钮 → 启动回收路线 → 评估水温 → 接管。每步配 5–8 字。
  - 严重度：高
- [ ] **Lesson 2.2 mob-recovery-maneuvers**（中）
  - 问题：Quick Stop / Figure-8 / Williamson Turn 三种回转路线用文字描述，但学员脑中画不出 3 种轨迹。
  - 补充建议：必须加一张 3 路并排 SVG（俯视图，箭头标航向序列）。这是 RYA 实操高频考点。
  - 严重度：高
- [ ] **Lesson 3.1 colregs-and-rules**（中）
  - 问题：CBDR（constant bearing decreasing range）的概念是核心避碰判断，但只有文字。
  - 补充建议：加一组 2 帧对比图——"CBDR 危险（方位不变）vs 安全（方位明显变化）"，每帧 2 艘船位置变化。

### WH-228 celestial-and-pilotage
- [ ] **Lesson 1.1 transits-and-bearings**（中）
  - 问题：Transit（两地标重合）的几何很好，但"双线 transit 交叉定位"的实操图缺失。
  - 补充建议：加一张 SVG——4 个地标，2 组 transit 线交叉给出 fix。
  - 严重度：中
- [ ] **Lesson 1.2 danger-bearings-and-contours**（中）
  - 问题：danger bearing 是非常 powerful 的概念但完全靠文字。
  - 补充建议：加一张俯视图：船 / 暗礁 / 一座可视地标 / 一条 danger bearing 线——明示"只要这个方位 < X°，就还没撞上"。
  - 严重度：中
- [ ] **Lesson 2.1 noon-sight-and-sextant**（中）
  - 问题：六分仪双反射几何是核心，但 celestial-triangle 图被借用了，没有六分仪本身的几何示意。
  - 补充建议：加一张专门的"六分仪双反射"SVG——指标镜 / 水平镜 / 入射光 / 反射光 / 角度标注。
  - 严重度：中
- [ ] **Lesson 2.2 time-longitude-and-declination**（中）
  - 问题：正午高度 → 纬度的 worked example 一次性塞进段落（473 行附近），跨度大、修正项多，学员很难跟。
  - 补充建议：把该 worked example 拆成 6 行表格（弧上读数 / IE / Ha / dip / 总修正 / Ho / 纬度公式），每行展示。
  - 严重度：中

### WH-301 captains-mind
- ✓ 总体充分。这是"软技能"课，文字密度合理。
- [ ] **Lesson 1.1 red-yellow-green-risk**（低）
  - 问题：三级风险表的示例表格已经很好，但没有"空白模板供学员下载"的功能。
  - 补充建议：在 practice block 或资源页提供一个 markdown / PDF 空白风险表模板下载链接。
  - 严重度：低
- [ ] **Lesson 3.1 pre-mortem-method**（低）
  - 问题：pre-mortem 是一个反直觉的思维工具，文字解释到位，但缺一个"5 分钟模板"。
  - 补充建议：加一个"pre-mortem 5 分钟模板"（5 个问句填空），让学员真的能用一次。
  - 严重度：低

### WH-401 offshore-passage
- ✓ 实操课，没有线上测验。3 节课总共内容偏短（344 行 / 13 课程最短）但这是设计如此（船上 10 天为主）。
- [ ] **Lesson 1.1 pre-departure-checklist**（中）
  - 问题：6 大类 checklist 已经很好，但缺一份"可打印的离线 checklist"。
  - 补充建议：在资源页提供 1 页 PDF 模板下载（或 markdown），学员能真带上船。
  - 严重度：中
- [ ] **Lesson 2.1 daily-routine-onboard**（低）
  - 问题：0800 点名 5 环节 + Captain's dashboard 8 数字——内容好，但篇幅过短（70 行），没有 case study。
  - 补充建议：加一段虚构的"第 4 天 0800 点名实录"——展示 5 环节怎么自然进行，每个环节 30–50 字。
  - 严重度：低

---

## 三、整体观察与建议

1. **大量课程在该用交互工具的地方"借用"了 6 个已有 diagram**。最明显的是 `colregs-crossing` 在 marine-first-aid CPR、sea-survival HELP 姿势、radar plotting 等完全无关的场景被反复借用（caption 已经诚实承认"借用"）；`apparent-wind` 也被 chartwork CTS 与 tidal-vector 借用。这是课程团队为了不留视觉空白做的合理妥协，但学员体验明显割裂。**优先级建议：先做工具 1（CTS plotter）与工具 2（灯型识别器），这两个工具消除了 6 处借图凑合**。

2. **WH-103 / WH-113 / WH-204 是"硬计算"密度最高的三门课**，目前 worked example 全部用大段落塞文字数学。这种格式对识读非常不友好——建议这 3 门所有 worked example 改成"每步独立表格行 / 列表项"，不要塞段落。审计中可直接看到 chartwork 1273 行的"最早能进港"题、celestial 473 行的"正午高度纬度"题、weather 1693 行的"3 小时跨 diamond"题——这三处是改造的最优先目标。

3. **WH-105 / WH-211 / WH-212 是"模式识别"硬技能课**（灯型 / 救生姿势 / MOB 决策）。这三门课的特点是"识别速度 = 性命"，纯文字永远教不会。建议工具 2（灯型识别器）开发完后，可同样架构做 MOB 决策卡 + 救生筏结构图的轻量交互。**这三门课的死记硬背风险最高**——学员可以靠记忆通过笔试，6 个月后忘干净。

4. **WH-101 / WH-301 / WH-401 是"概念 / 思维"课**，内容质量已经很高，主要补充建议都是 PDF 模板下载、案例对比这类锦上添花。不要再重构这三门课。

5. **资源页（resources）质量很均匀，但没有任何课程做了"动手作业"模板**。建议建立一个 `/templates` 目录，存放：① 三级风险表空白；② 1 页航前 brief；③ 风日志；④ pre-mortem 5 问；⑤ MOB 决策卡；⑥ DSC 6 步速查卡。这些模板可以跨课程引用，是 WindHero "实战派 / 不学院化" 品牌定位的最低成本兑现。

---

**审计总结**：13 门课程整体质量在中文航海教学市场处于领先水平——尤其是"为什么"的深度讲解（柴油机统计学、低压成因、CPR 物理学）。但有 **2 类系统性短板**：① "硬计算 + 向量"类内容缺交互工具（CTS、CPA、潮高），② "模式识别"类内容缺训练界面（灯型、MOB 决策、救生筏结构）。补齐这两类，课程会从"读着懂"跃迁到"考完会用"。
