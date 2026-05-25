import type { Course } from "../types";

/**
 * WH-103 · 海图作业与潮汐计算
 *
 * 入门理论课。对标 RYA Day Skipper Theory 的「Chartwork」「Tides」两章，
 * 是 RYA 笔试占比 30–40% 的硬骨头部分。所有教学正文、示例、习题
 * 均为 WindHero 原创撰写。
 *
 * 课程内每一个 Lesson 在标准 Lesson 字段之外额外携带 `ryaSyllabusItems`，
 * 列出该节对应的 RYA Day Skipper Theory 大纲条目；TS 类型对这个多余
 * 字段是宽容的——主线程会通过类型扩展逐步把它声明进去。
 */

export const chartworkAndTides: Course = {
  slug: "chartwork-and-tides",
  code: "WH-103",
  title: "海图作业与潮汐计算",
  level: "入门",
  duration: "5 周 · 自学 + 习题（约 18 小时）",
  ryaEquivalent: "Day Skipper Theory",
  summary:
    "海图、罗经、潮高、潮流——这四样东西串在一起，回答你出海最重要的两个问题：我现在在哪、我下一步能去哪。",
  prerequisites: ["reading-the-wind"],
  suitableFor: [
    "已经完成 WH-101《读懂风》、正在准备 RYA Day Skipper 笔试的学员",
    "船上能照着 plotter 跟着别人开，但「这条 fix 怎么画」「为什么时差是 +25 分钟」一问就懵的人",
    "想脱离对手机 app 的依赖，自己用纸图、量角器、分规一支铅笔做出航线规划的船长候选人",
    "计划带着家人做 30–50 海里近岸跨港，必须自己读懂潮汐表的人",
  ],
  youWillLearn: [
    "在墨卡托海图上量准距离与方位，并解释为什么纬度刻度才是「尺」",
    "做罗航向、磁航向、真航向之间的互换——闭着眼睛也能写出 CADET 那张方程",
    "看 Admiralty Tide Tables（ATT）的标准港页、推副港时差、用 12 分之 1 法则求任意时刻潮高",
    "画出完整的 CTS（Course To Steer）三角形：考虑潮流、考虑风压角，给出舵手该转到的罗航向",
    "在三小时跨潮流方块的航段里画出 EP（Estimated Position），判断是否能赶上某个潮汐窗口",
  ],
  modules: [
    {
      slug: "charts-and-compass",
      index: 1,
      title: "海图与罗经修正",
      summary:
        "海图是平面化的地球。罗经是被船上铁器骗了一道的指北针。在它们之间，你要学会两次修正——这是所有海图作业的入场券。",
      lessons: [
        {
          slug: "chart-fundamentals",
          index: "1.1",
          title: "海图基础：投影、基准、图例",
          summary:
            "墨卡托投影为什么纬度越高越拉伸？为什么量距离不能用经度刻度？海图右下角那串看不懂的字母（WGS84、CD、MHWS）到底在说什么？",
          duration: "约 60 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G3.1 — Chart symbols and abbreviations",
            "Day Skipper Theory G3.2 — Latitude and longitude, distance and direction",
            "Day Skipper Theory G3.3 — Chart datum, depths and heights",
          ],
          outcomes: [
            "能解释墨卡托投影的拉伸特性，并说出为什么量距离永远要用纬度刻度",
            "看到海图角落的标注能识别比例尺、Datum、深度基准、出版年份",
            "认识常见的海图图例：水深、底质、灯标、危险符号、推荐航线",
          ],
          body: [
            {
              type: "paragraph",
              text: "海图（chart）不是地图（map）的「海上版本」。地图给行人看，关注路名和地标；海图给船长看，关注的是看不见的东西——水深、底质、暗礁、灯光特征、推荐航线、潮汐数据。打开一张英国海军部（Admiralty）海图，你会发现它密密麻麻的不是城市与公路，而是数字、符号、小气泡，每一个都直接对应「船能不能安全经过这里」。",
            },
            {
              type: "paragraph",
              text: "理解海图的第一件事，是理解它的投影方式。地球是球面，海图是平面——把一个橘子皮摊平，必然要被切开或拉伸。航海用的几乎全是墨卡托投影（Mercator projection）：把地球套进一个圆柱，从地心向外投影，再把圆柱展开。这种投影的好处是「等角」——任何方向上的角度都不变形，所以你在海图上画一条直线，船按这条线上某个固定罗经航向（rhumb line / 等角航线）走，就能到达终点。这正是船长需要的。",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 1.1 · 海图上的罗经盘：外圈真北 (T)、内圈磁北 (M)，标注当年变化角及年变率",
            },
            {
              type: "heading",
              text: "墨卡托的代价：纬度越高越拉伸",
            },
            {
              type: "paragraph",
              text: "墨卡托保住了角度，代价是面积。赤道附近 1° 纬度 = 1° 经度（在地表上都是约 60 海里）；但到了北纬 60°，1° 经度在地表上只剩 30 海里，海图上却被「拉」到与 1° 纬度等长。结果就是：高纬度地区的陆地看起来比实际大得多——格陵兰岛在墨卡托海图上看起来跟非洲差不多，实际只有非洲的 1/14。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "量距离的铁律：只用纬度刻度",
              body:
                "海图两侧（南北方向）的纬度刻度上，1 分（1′）永远等于 1 海里——无论在哪一片海图上。海图上下（东西方向）的经度刻度，1 分在低纬可能 = 1 海里，在高纬可能只剩半海里。所以——量距离永远把分规放到当前位置的纬度刻度上去读，不要去碰经度刻度。这是初学者第一周最容易踩的坑。",
            },
            {
              type: "definition",
              term: "海里（Nautical Mile, nm）",
              meaning:
                "1 海里 = 1 分纬度，约 1852 米。这不是巧合，而是定义：航海距离单位直接挂在地球纬度上。也因此「节（knot）」= 海里 / 小时，是航海里所有速度的标准单位。",
            },
            {
              type: "definition",
              term: "等角航线（Rhumb Line）",
              meaning:
                "在地球表面与所有经线夹角相同的航线。在墨卡托海图上是一条直线，船按一个固定罗经航向走就能跟上。代价是它不是地球上的「最短路径」（最短的是大圆航线/Great Circle），但对 Day Skipper 等近岸航行来说，rhumb line 足够用。",
            },
            {
              type: "heading",
              text: "Datum 与深度基准：海图右下角那串字",
            },
            {
              type: "paragraph",
              text: "翻开任何一张海图，右下角通常密密麻麻写着：投影、比例尺、Datum、Soundings reduced to Chart Datum、Heights above MHWS、版本号与修正日期。这些不是装饰，是船长读这张图的「使用说明书」。",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Datum（坐标基准）—— 现代海图大多用 WGS84，与 GPS 一致。但 30 年前的旧图可能用本地基准（OSGB36、ED50 等），GPS 直接读出的经纬度可能与海图上的实际位置错位 50–200 米。看到「Positions referred to WGS84 Datum」字样就放心；看到「local datum」就要小心——尤其在窄水道。",
                "Chart Datum（深度基准，CD）—— 海图上每一个水深数字都是「在 CD 以下多少米」。CD 通常取「最低天文潮位」(LAT, Lowest Astronomical Tide)，意思是「正常情况下海面不会低于这条线」。所以海图标 3.2m 的水深，实际上几乎永远比 3.2m 多。",
                "MHWS（Mean High Water Springs，平均大潮高潮位）—— 灯塔、礁石、岸线高度的基准。海图上的「高度」从 MHWS 算起。",
                "比例尺（Scale）—— 比如 1:75 000。意思是 1 厘米 = 750 米 ≈ 0.4 海里。比例尺越小（数字越大，如 1:300 000），覆盖范围越大、细节越少；越大（如 1:25 000），细节越足。规划海图与进港海图用的不是同一张。",
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "「实际水深」的两步计算",
              body:
                "海图标的水深 = LAT 之上 + 海图标值。你当下的实际水深 = 海图标值 + 当下潮高（潮高是从 CD 量起的）。所以：标 3.2m + 当时潮高 1.8m = 实际 5.0m。这是后面所有「我能不能进这个港」决策的底层公式。",
            },
            {
              type: "heading",
              text: "图例：你必须能在 3 秒内认出的符号",
            },
            {
              type: "paragraph",
              text: "海图图例（chart symbols）由国际航标协会标准化，主要参考《Admiralty Chart 5011》。你不需要背完整本（厚达 100 多页），但下面这一小撮属于「3 秒内必须认出来」的级别。",
            },
            {
              type: "table",
              headers: ["类别", "符号/记号", "意义"],
              rows: [
                ["水深", "小数字（如 5₈ 或 5.8）", "该点 CD 以下水深 5.8 米"],
                ["底质", "S / M / R / Cy", "Sand / Mud / Rock / Clay——决定锚抓不抓得住"],
                ["岩石/暗礁", "+ 或带括号水深 (3.2)", "+ 是水下岩，括号水深是危险物上水深"],
                ["灯标", "Fl.W.5s10M", "Flashing 白光、5 秒周期、10 海里能见距离"],
                ["浮标", "黑/红/绿色小图标", "IALA A 系统：红左绿右（自海向陆）"],
                ["推荐航线", "紫色虚线箭头", "VTS / 推荐进出港线"],
                ["危险区", "红色或紫色阴影", "禁航区、演习区、海底电缆"],
              ],
            },
            {
              type: "definition",
              term: "Chart Datum（CD，海图基准面）",
              meaning:
                "海图上所有水深数字相对的「零位」。通常取该地区的最低天文潮位 (LAT)。把它当作一条「保守的底线」——绝大多数时候真实海面在它之上。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "海图也要定期更新",
              body:
                "海图角落的「New Edition」与「Notices to Mariners」修订记录，是它的「最新身份证」。灯标会改色、浮标会移位、新建防波堤会出现。每年至少要更新一次海图——纸图打补丁、电子图 over-the-air 更新。带着一张 2018 年版的海图进 2026 年的港，遇到事情你就知道为什么了。",
            },
            {
              type: "paragraph",
              text: "纸海图与电子海图（ENC, Electronic Navigational Chart）的关系，是这十年航海设备最大的变化之一。RYA Day Skipper 现在依然要求学员先在纸海图上掌握所有基本作业——量距、画航迹、做 fix、画 CTS——再上电子设备。原因不是怀旧，而是教学逻辑：纸图逼你每一步都用手算、每一个符号都用眼看；电子图把这些都自动化了，方便但不教你「为什么」。打个比方：先用算盘学会四则运算，再用计算器；不是反过来。所以哪怕你这辈子都不会再用纸图工作，先在纸上把 chartwork 走一遍——RYA 笔试和考官都会用纸海图考你。",
            },
            {
              type: "paragraph",
              text: "最后说一句关于「不同比例尺海图配合使用」的做法。一次完整的近岸航段通常要带 3 类海图：① 小比例尺规划图（1:300,000 左右）—— 看整段航线大局，标 bolt hole、tidal gate；② 中比例尺航行图（1:75,000 左右）—— 实际航段中每小时画 DR/EP 用；③ 大比例尺进港图（1:25,000 或更大）—— 进港最后那 2 海里，看清浮标、礁石、推荐航道。同一段海域，可能要同时打开三张图，桌上叠成一摞——这是船长台桌正常的工作样貌。",
            },
            {
              type: "practice",
              prompt:
                "打开你手边任意一张海图（纸质或电子图均可），完成 5 件事：① 找出比例尺与 Datum；② 找出一个 Fl.G.3s 浮标——它在哪一侧？③ 用分规量出图上任意两个点之间的距离（用纬度刻度）；④ 找出图上水深最浅的位置；⑤ 找出最近一次修正日期。写下来。",
              hint:
                "如果你手边没有纸海图，去 UKHO 的 EasyTide 或 OpenCPN 加载任意一张 ENC——它们的图例都遵循 Admiralty 5011。",
            },
          ],
          quiz: [
            {
              id: "q-1-1-1",
              q: "在墨卡托海图上量取距离，正确的做法是？",
              options: [
                "用图底部的经度刻度，因为东西距离最直观",
                "用图两侧的纬度刻度，1 分纬度 = 1 海里",
                "用图角落的比例尺三角形",
                "用 GPS 直接读出两点距离",
              ],
              correct: 1,
              explanation:
                "1 分纬度永远等于 1 海里——不随纬度变化。经度 1 分在低纬约等于 1 海里，但在高纬被严重压缩。比例尺也只在图的中段精确。",
              topic: "海图量距",
            },
            {
              id: "q-1-1-2",
              q: "海图上某点标注水深 3.5。下午潮高为 1.8m。当时该点的实际水深约为？",
              options: [
                "1.7 米",
                "3.5 米",
                "5.3 米",
                "2.0 米",
              ],
              correct: 2,
              explanation:
                "海图水深从 Chart Datum 起算。实际水深 = 海图水深 + 当时潮高 = 3.5 + 1.8 = 5.3 米。CD 取最低天文潮位作底线。",
              topic: "水深与潮高",
            },
            {
              id: "q-1-1-3",
              q: "看到一张海图角落写着「Soundings in metres reduced to Chart Datum which is approximately Lowest Astronomical Tide」。它在告诉你什么？",
              options: [
                "海图水深永远等于真实水深",
                "海图水深以最低天文潮位为零点，真实水深通常比图上数字更多",
                "海图水深需要乘以潮汐系数",
                "海图水深是平均海面（MSL）以下的距离",
              ],
              correct: 1,
              explanation:
                "CD 取 LAT 作零点意味着：图上的水深是「最保守情况」。实际水深 = 图上水深 + 当时潮高。这是 Day Skipper 笔试常考的概念。",
              topic: "Chart Datum",
            },
            {
              id: "q-1-1-4",
              q: "海图上看到符号「Fl.R.4s8M」，下列解读哪一项正确？",
              options: [
                "红色闪光，每 4 秒一闪，能见距离 8 海里",
                "红色固定光，4 米高，距离 8 海里",
                "白色闪光，4 秒一组，红色背景",
                "Flashing 是闪频，R 是分钟，8 是高度",
              ],
              correct: 0,
              explanation:
                "标准灯标描述格式 Fl.<颜色>.<周期>s<能见距离>M。Fl.R.4s8M = Flashing Red、4 秒周期、8 海里 nominal range。Day Skipper 必须能在 3 秒内读出灯标描述。",
              topic: "灯标读图",
            },
          ],
        },
        {
          slug: "variation-deviation",
          index: "1.2",
          title: "罗经修正：变化角与自差",
          summary:
            "罗经指的不是真北。它先被地球本身的磁场骗了一道（变化角），又被船上的铁器骗了第二道（自差）。「CADET」三个等号，把这三种北方串起来。",
          duration: "约 70 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G3.4 — True, magnetic and compass bearings",
            "Day Skipper Theory G3.5 — Variation and deviation",
            "Day Skipper Theory G3.6 — Conversion between true, magnetic and compass",
          ],
          outcomes: [
            "能解释真北、磁北、罗经北三者的差别与成因",
            "理解变化角（Variation）随地点和时间变化的原因，能读罗经盘上的年变率",
            "理解自差（Deviation）来自船自身的磁场，能用 deviation card 做修正",
            "能熟练运用 CADET 公式做真航向↔磁航向↔罗航向之间的双向转换",
          ],
          body: [
            {
              type: "paragraph",
              text: "罗经（magnetic compass）依然是每艘船必备的设备——不是因为 GPS 不够好，而是因为电子设备会失灵，磁针不会。但磁针指的不是真北，这是一切麻烦的开端。",
            },
            {
              type: "heading",
              text: "三种「北」：真北、磁北、罗经北",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "真北（True North, T）—— 地球自转轴指向的「北」，地图上经线指向的方向。海图上的经线、罗经盘外圈刻度都是真北系。",
                "磁北（Magnetic North, M）—— 地球磁场北极所在的方向。它在加拿大北部某地，并且每年漂移几十公里。磁北与真北之间的夹角，就是「变化角（Variation）」。",
                "罗经北（Compass North, C）—— 你船上的磁罗经实际指向的北。船上的铁器、电缆、引擎、扬声器都有磁性，会把罗针「拉偏」。罗经北与磁北之间的夹角，就是「自差（Deviation）」。",
              ],
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 1.2 · 罗经盘三层北：T (真) → M (磁，差 Variation) → C (罗，差 Deviation)",
            },
            {
              type: "heading",
              text: "Variation：地磁的偏差",
            },
            {
              type: "paragraph",
              text: "变化角（Variation，旧称 Magnetic Declination）来自地球本身——磁北与真北本来就不在同一个地方。这个角度随地点变化（在英国南海岸约 1°W、在加拿大东部可达 20°W、在西伯利亚可能 10°E），也随时间变化（每年漂移 0.1°–0.2°）。",
            },
            {
              type: "paragraph",
              text: "你在哪查变化角？两个来源：① 海图上印的罗经玫瑰（compass rose）—— 一个双圈刻度盘，外圈真北、内圈磁北、中间小字标出当年变化角与年变率，例如「3°15′W 2024 (8′E)」意思是「2024 年此处磁差 3°15′W、每年东漂 8 分」。② 现代电子海图与 GPS 自动给出当地实时磁差。",
            },
            {
              type: "definition",
              term: "变化角（Variation）",
              meaning:
                "真北与磁北之间的夹角，由地磁分布决定。随地点不同，随时间缓慢漂移。东偏（E）或西偏（W）取决于磁北在真北的哪一侧。海图罗经盘上给出当地的变化角与年变率。",
            },
            {
              type: "heading",
              text: "Deviation：船自带的「噪音」",
            },
            {
              type: "paragraph",
              text: "自差（Deviation）是罗经被船自身磁场拉偏的角度。来源包括：钢制船体、引擎、电池电缆、电子设备、放在驾驶台旁边的手机或望远镜。麻烦的是，自差不是一个常数——它随船头朝向不同而变化。船头朝北时可能 +2°E，朝东时可能 −3°W，朝南时又可能 +1°E。",
            },
            {
              type: "paragraph",
              text: "所以每艘船都有一张「自差表（deviation card）」，列出在每个船头方向上的自差值。这张表要由专业人员用「swing the compass」程序校准，通常每隔 2–3 年或大修后重新做一次。",
            },
            {
              type: "table",
              headers: ["船头朝向（罗经）", "自差 (Deviation)"],
              rows: [
                ["000° (N)", "+2°E"],
                ["045° (NE)", "0°"],
                ["090° (E)", "−3°W"],
                ["135° (SE)", "−4°W"],
                ["180° (S)", "−2°W"],
                ["225° (SW)", "+1°E"],
                ["270° (W)", "+3°E"],
                ["315° (NW)", "+2°E"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "Deviation 不是「装上修正螺丝就没了」",
              body:
                "现代罗经一般都有内置修正磁体，可以把自差压到很小，但很少能完全消除。更危险的是临时变化：船员把手机放在罗经罩上、把对讲机贴近罗盘——这些都能立刻产生几度的额外偏差。出航前要养成习惯：罗经罩 1 米内不放任何含铁器或电子设备。",
            },
            {
              type: "heading",
              text: "把三者串起来：CADET 公式",
            },
            {
              type: "paragraph",
              text: "罗航向 (C, Compass)、磁航向 (M, Magnetic)、真航向 (T, True) 之间，用两步修正联系起来。RYA 使用的是一条 6 字母口诀 —— CADET —— 配上一条加号规则：",
            },
            {
              type: "definition",
              term: "CADET 口诀",
              meaning:
                "Compass + Deviation = Magnetic + Variation = True，并且「West is best (W 时减), East is least (E 时加)」。意思是：从 C 转到 T，沿口诀方向走，遇到 W 偏差要减、遇到 E 偏差要加。反向（从 T 转到 C）则规则反转。",
            },
            {
              type: "paragraph",
              text: "为什么这条规则成立？想象罗经盘上，真北指 000°。如果当地变化角 5°W（磁北在真北的西边），那么磁北 000° 实际朝真北 355° 方向。也就是说，同一段方向，「磁航向」的读数会比「真航向」大 5°——因为磁北比真北「转得更靠西」，要走到同一个东向方向，磁航向数字反而要更大。所以从「磁 → 真」，W 偏差要减。同理从「真 → 磁」，W 偏差要加。E 反之。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "记不住方向？用「字母从左往右」",
              body:
                "把口诀 C–D–M–V–T 横着写在纸上。从左往右走（C→T，「化罗为真」），遇 W 减、遇 E 加。从右往左走（T→C，「化真为罗」，舵手实际要执行的航向），遇 W 加、遇 E 减。每次做题前把这行字写在草稿纸上，闭着眼也不会错。",
            },
            {
              type: "heading",
              text: "示范题 1：从真航向求罗航向（最常考）",
            },
            {
              type: "paragraph",
              text: "题目：海图上你画出一条从 A 到 B 的真航向 045° T。当地变化角 3°W (2024)。你打算朝这个方向开，船头预计在 045° 附近，查自差表得知此朝向自差 +2°E。问舵手该按罗经走多少度？",
            },
            {
              type: "paragraph",
              text: "解：从 T → C，沿 CADET 反向。先处理 Variation：T = 045°，V = 3°W，反向规则「W 加」，所以 M = 045° + 3° = 048°。再处理 Deviation：M = 048°，D = +2°E（E 在反向规则中「减」），所以 C = 048° − 2° = 046°。舵手按罗经走 046°。",
            },
            {
              type: "heading",
              text: "示范题 2：从罗航向求真航向（常用于位置线作业）",
            },
            {
              type: "paragraph",
              text: "题目：你用手持罗经对岸边一座灯塔取方位，读数 C = 218°。当地 V = 5°W，此朝向自差 D = −3°W。问该灯塔的真方位是多少？",
            },
            {
              type: "paragraph",
              text: "解：从 C → T，正向 CADET：C = 218°，D = −3°W（W 减），M = 218° − 3° = 215°。M = 215°，V = 5°W（W 减），T = 215° − 5° = 210°。这就是该灯塔在你海图上的真方位线，画一条 210° 的位置线过去——它就是你 fix 的一条腿。",
            },
            {
              type: "heading",
              text: "示范题 3：变化角带年变率",
            },
            {
              type: "paragraph",
              text: "题目：罗经玫瑰上标「4°20′W 2020 (8′E annual change)」。今年是 2026 年，你的真航向 T = 270°。船头朝西，自差表 D = +3°E。问该走的罗航向？",
            },
            {
              type: "paragraph",
              text: "解：先把变化角更新到 2026 年。2026 − 2020 = 6 年，每年东漂 8′，共东漂 48′。原本 4°20′W，向东漂 48′ 等于「W 数值减少」，得到 V = 4°20′ − 0°48′ = 3°32′W ≈ 3.5°W。然后 T → C 反向：T = 270° + 3.5°（W 加）= 273.5° = M；M − 3°（E 减，反向规则）= 270.5°。舵手按罗经走 270°（实操圆整到整数）。",
            },
            {
              type: "callout",
              tone: "note",
              title: "笔试时怎么不出错",
              body:
                "RYA 笔试里 CADET 题最常见的错误不是公式，而是方向。建议每道题草稿纸上写两件事：① 「C–D–M–V–T」一行；② 题目要从哪一端走到哪一端，箭头画出来。然后逐步加减——慢一点，分数稳得多。",
            },
            {
              type: "paragraph",
              text: "有一类题特别容易出错——「Reciprocal bearing（反向方位）」。当题目给你某地标朝船的方位（如「该灯塔上的瞭望员观察到你的船在方位 230° T」），你要在海图上画一条从该灯塔出发、方向 230° + 180° = 050° T 的位置线（即「从灯塔朝你」的反方向）。这一步与 CADET 无关，但常常和 CADET 题混在一起出，让人手忙脚乱。建议遇到「someone observes you on bearing X」的句式，第一时间把 X 加 180° 得到「你画在海图上的方位」，再做 CADET 转换。",
            },
            {
              type: "paragraph",
              text: "最后强调一次自差表的实操：自差表是「你这艘船当下、这一年」的数据。换了船一定要查新船的自差表；同一艘船，做了大修（换电池、装新电子设备、改造）后要重新「swing the compass」——专业人员把船开出去转一圈，每隔 30° 朝向校准一次。普通巡航船每 2 年做一次即可。比赛级帆船每年做一次。手持罗经的自差几乎为零（手不持铁器即可），但船上固定罗经的自差永远要查表。",
            },
            {
              type: "practice",
              prompt:
                "自己出一道题：罗经玫瑰标 6°30′W 2022 (5′E)，你计划 2026 年航行真航向 T = 135°，自差表此朝向 D = −2°W。求舵手该走的罗航向。算完后把过程写下来，下次复习时一眼能看懂。",
              hint:
                "先更新 V 到 2026 年（4 年东漂 20′ = 0°20′E），得到 V ≈ 6°10′W。再 T→C 反向，W 加、W 加（D=−2°W 也是 W，反向规则也是加）。",
            },
          ],
          quiz: [
            {
              id: "q-1-2-1",
              q: "下列对「变化角（Variation）」与「自差（Deviation）」的描述哪一项正确？",
              options: [
                "Variation 来自船上铁器，Deviation 来自地球磁场",
                "Variation 来自地球磁场，Deviation 来自船自身磁场",
                "两者本质相同，只是不同教材的叫法",
                "Variation 是航海仪表误差，Deviation 是 GPS 漂移",
              ],
              correct: 1,
              explanation:
                "Variation 由地磁分布决定（真北 vs 磁北），随地点和时间变化；Deviation 由船自身的铁器与电子设备造成（磁北 vs 罗经北），随船头朝向变化。",
              topic: "罗经基础",
            },
            {
              id: "q-1-2-2",
              q: "真航向 T = 090°，当地变化角 V = 4°W，朝向自差 D = +2°E。舵手应按罗经走多少度？",
              options: [
                "088°",
                "092°",
                "096°",
                "084°",
              ],
              correct: 1,
              explanation:
                "T → C 反向：T 090° + V 4°W (反向 W 加) = M 094°。M 094° − D 2°E (反向 E 减) = C 092°。",
              topic: "CADET 计算",
            },
            {
              id: "q-1-2-3",
              q: "你用手持罗经对一个灯塔读 C = 045°，V = 3°W，D = −1°W。该灯塔的真方位是？",
              options: [
                "049°",
                "043°",
                "041°",
                "047°",
              ],
              correct: 2,
              explanation:
                "C → T 正向：C 045° − D 1°W (W 减) = M 044°。M 044° − V 3°W (W 减) = T 041°。这是要画在海图上的真方位线。",
              topic: "CADET 计算",
            },
            {
              id: "q-1-2-4",
              q: "罗经玫瑰标「2°30′W 2020 (6′E annual change)」。2025 年此处变化角约为多少？",
              options: [
                "2°00′W",
                "3°00′W",
                "2°30′E",
                "2°00′E",
              ],
              correct: 0,
              explanation:
                "5 年 × 6′E = 30′E 东漂。原 2°30′W 向东漂 30′，W 值减小 30′，得 2°00′W。年变率「E annual change」意为每年向东漂。",
              topic: "变化角更新",
            },
          ],
        },
      ],
    },
    {
      slug: "dead-reckoning",
      index: 2,
      title: "推算航法：DR、EP 与 CTS",
      summary:
        "GPS 故障的那一刻，你怎么知道自己在哪？答案是推算（dead reckoning）——三个字母 DR、EP、Fix，是船长在没有卫星的世界里活下去的方式。",
      lessons: [
        {
          slug: "dr-ep-fix",
          index: "2.1",
          title: "DR、EP 与 Fix：三种位置的差别",
          summary:
            "DR 是「假设无风无流」的位置，EP 加入潮流和风压，Fix 才是两条位置线交出来的真实位置。学会区分这三个，就学会了用纸图导航。",
          duration: "约 60 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G3.7 — Dead reckoning and estimated position",
            "Day Skipper Theory G3.8 — Position lines and the running fix",
            "Day Skipper Theory G3.9 — Sources of position information",
          ],
          outcomes: [
            "能定义并区分 DR、EP、Fix 三种位置概念",
            "理解三类位置线（LOP）：方位线、距离弧、transit",
            "能在海图上用 ≥ 2 条 LOP 交叉出 Fix，并评估其精度",
            "明白「GPS 关了我还能在哪」是船长基本功",
          ],
          body: [
            {
              type: "paragraph",
              text: "导航的本质是回答两个问题：我在哪？我下一步去哪？听上去简单，但在 GPS 出现之前，「我在哪」就是一个需要每隔半小时手工算一次的难题。即使在今天，RYA Day Skipper 笔试和实操都要求你脱离 GPS 也能给出位置——因为电子设备会失灵，而判断力不会。",
            },
            {
              type: "heading",
              text: "三种位置：DR、EP、Fix",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "DR (Dead Reckoning，推算位置) —— 仅依靠「上一个已知位置 + 航向 + 船速 + 时间」算出来的预估位置。完全不考虑潮流、风压。最简化、最不准，但任何时候都能算。",
                "EP (Estimated Position，估计位置) —— 在 DR 的基础上叠加潮流向量与风压（leeway）的修正。已经接近真实，但仍然是估计——不是测量。",
                "Fix (定位) —— 由 ≥ 2 个独立位置线（LOP, Line of Position）交叉得到的真实位置。这才是「已经验证过的我在这里」。",
              ],
            },
            {
              type: "definition",
              term: "DR (Dead Reckoning)",
              meaning:
                "从一个已知位置出发，按「航向 + 船速 + 时间」推算出来的下一个位置，不考虑外力。「dead」据说来自 deduced 的缩写「ded.」——意为「推断的位置」。是所有位置计算的基础起点。",
            },
            {
              type: "definition",
              term: "EP (Estimated Position)",
              meaning:
                "在 DR 基础上加入潮流向量与漂移（leeway）的修正后得到的估计位置。在没有 fix 的时段，EP 是你 海图上的「best guess」——通常每小时画一个。",
            },
            {
              type: "definition",
              term: "Fix (Position Fix)",
              meaning:
                "由 ≥ 2 个独立位置线交叉得到的位置。理想是 3 条 LOP 交出一个小三角形（「cocked hat」），中心就是你的位置。是 DR/EP 的「校准点」。",
            },
            {
              type: "heading",
              text: "三类位置线（LOP）",
            },
            {
              type: "paragraph",
              text: "Fix 来自位置线交叉。位置线是「你的船一定在这条线上」的几何约束。一条 LOP 还不够（船在那条线上的任何位置都可能），两条交叉才出点。三类常用 LOP：",
            },
            {
              type: "table",
              headers: ["类型", "来源", "在海图上长什么样"],
              rows: [
                ["方位线 (Bearing)", "对一个明显地标（灯塔、山顶、塔楼）用手持罗经取方位", "从地标出发，沿真方位方向画的一条线"],
                ["距离弧 (Range)", "用雷达、六分仪垂直角或视觉测距测出与一个地标的距离", "以地标为圆心、距离为半径画的一段弧"],
                ["Transit", "当两个已知地标在视线上重合（一前一后排成一线）", "连两个地标的延长线——零仪器、零误差的「天赐 LOP」"],
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "Transit 是船长最爱的 LOP",
              body:
                "Transit 不需要任何仪表——只用眼睛。当两个已知地标在你视线上排成一线（前帆塔正好挡住后面那座小山顶），你就在这两个地标的延长线上。这条 LOP 没有罗经误差、没有自差问题，是精度最高的位置线。每个港口入口附近通常都设有官方 transit（leading marks），用来引导船沿安全航道进出。",
            },
            {
              type: "heading",
              text: "Fix 的实操：三条 LOP 与「cocked hat」",
            },
            {
              type: "paragraph",
              text: "在好天气里，理想的 fix 用三条 LOP。三条线交出一个小三角形，称为「cocked hat」（三角帽）——小三角形的中心点就是你的位置，三角形的大小反映了取数精度。如果三角形大到边长 0.5 海里，说明至少有一条方位读错了，要重做。",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 2.1 · 三条 LOP 交出 cocked hat：A 灯塔方位 045° T、B 塔方位 110° T、C 山顶方位 200° T",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "三条 LOP 之间的夹角应尽量接近 60° / 60° / 60°——交角太小（地标都在同一方向）时三角形大、精度差",
                "fix 之间相隔的时间越短越好——理想 < 1 分钟内取完三个方位",
                "fix 旁标注时间（例如 1030）与位置标记「⊙」，写在海图边上以备复盘",
                "fix 之后立刻沿新航向继续 DR/EP，不要把 fix 当成「现在就停在这里」",
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "GPS 不是 Fix 的替代",
              body:
                "RYA 笔试与实操都要求你能在 GPS 关闭的状态下用方位/距离/transit 算出位置。原因不是「GPS 不能用」，而是「当 GPS 给出错误读数时，你能不能识破」。养成习惯：每 30–60 分钟独立做一个传统 fix，与 GPS 对比。两者出现 > 0.2 海里偏差就值得警觉。",
            },
            {
              type: "heading",
              text: "DR / EP / Fix 之间怎么衔接",
            },
            {
              type: "paragraph",
              text: "实际航行中三者每小时都在切换。例如一段 6 小时近岸航段，典型工作流是：起航点已知 fix → 沿计划航向每 30 分钟标一个 DR → 每小时叠加潮流向量得到一个 EP → 每 1–2 小时用 LOP 取一个 fix 把 EP 校准回真实位置。两次 fix 之间，DR 与 EP 是你唯一的位置感知——所以画错了或漏画了，就直接进入「不知道自己在哪」的状态。",
            },
            {
              type: "table",
              headers: ["位置类型", "海图上的记号", "精度"],
              rows: [
                ["DR", "△ 或带横线的圆点 ⊕ + 时间", "差，不含外力修正"],
                ["EP", "△ 加方向箭头 + 时间", "中等，有潮流修正但仍是估计"],
                ["Fix（视觉）", "⊙ 三角帽中心 + 时间", "好，3 条 LOP 时三角形 < 0.2 nm"],
                ["Fix（GPS）", "GPS 标记或 ⊙ + 时间 + GPS 标注", "极好（但要警惕被欺骗）"],
              ],
            },
            {
              type: "heading",
              text: "Running Fix：只看到一个地标也能 fix",
            },
            {
              type: "paragraph",
              text: "理想的 fix 要两三个地标。但在长海岸线、能见度差、或地标稀少的海域，你可能只看到一座灯塔。这时还能做 fix 吗？能——用「running fix（行进 fix）」。原理：在 T1 时刻对同一地标取方位 B1，记录船速与航向；持续航行 30–60 分钟到 T2 时刻，再对同一地标取方位 B2。两条方位线本身不会同时通过你的位置（中间你走了一段），但把 B1 的位置线沿你的航向「平移」B1→T2 时段你走过的距离，再与 B2 相交——交点就是 T2 时刻的位置。",
            },
            {
              type: "paragraph",
              text: "Running fix 的精度比 3-LOP fix 差（因为引入了「船速估计」与「航向估计」两个误差源），但在只能看到一个地标的情况下，它是唯一的传统选项。Day Skipper 笔试通常考它的概念与几何步骤（不要求精确画图），Coastal Skipper 实操才要求能实际操作。",
            },
            {
              type: "callout",
              tone: "note",
              title: "Running fix 的精度限制",
              body:
                "两次方位之间夹角越大、地标距离适中、中间航段越短——精度越高。如果两次方位差只有 10°（地标在很远的地方、船没走多远），交点几何很差，fix 可能偏差 1 海里以上。建议两次方位之间夹角至少 30°、最好 45°–60°。",
            },
            {
              type: "paragraph",
              text: "Day Skipper 实操评估里，考官常常临时让你「现在 GPS 关了，用纸图给我一个位置」——他要看的不是结果有多精确，而是你的工作流是否完整：标 DR、查潮流、画 EP、取 LOP、画 fix。一个能把整套流程在 10 分钟内做完、且不慌乱的学员，比一个 GPS 读得飞快但说不清「为什么相信这个数」的学员，更接近船长。",
            },
            {
              type: "practice",
              prompt:
                "找一张你熟悉海域的海图，在上面标一个出发点。假设你以 5 节朝 060° T 走了 2 小时。① 画出 DR 位置。② 假设期间潮流 030° / 1.5 节，画出 EP 位置。③ 想象你看到岸上有两个灯塔，方位分别 320° T 与 270° T，画出 LOP 交出 fix。比较 DR / EP / Fix 之间的差距，说明哪一段你不会再相信 DR 单独的位置。",
              hint:
                "DR ≠ EP ≠ Fix。三者差距越大，越说明这段海域潮流强、或者你的航向估计有偏。回到老问题：「你为什么没早 1 小时画 EP？」",
            },
          ],
          quiz: [
            {
              id: "q-2-1-1",
              q: "下列对 DR、EP、Fix 三者关系的描述哪一项正确？",
              options: [
                "DR 包含潮流修正，EP 只看航向与船速",
                "Fix 来自 GPS，DR 与 EP 是手工算的",
                "DR 只考虑航向 + 船速 + 时间；EP 在 DR 基础上加潮流和风压；Fix 由 LOP 交叉验证",
                "三者本质相同，只是不同教材的名字",
              ],
              correct: 2,
              explanation:
                "DR 最简化（不含外力），EP 在 DR 上叠加潮流和风压，Fix 是用独立 LOP 交叉验证的真实位置。Fix 不一定来自 GPS——视觉方位、雷达距离都可以是 Fix 的来源。",
              topic: "位置类型",
            },
            {
              id: "q-2-1-2",
              q: "你想取一个高精度的 3-LOP fix。下列哪一项是 LOP 之间最佳的夹角分布？",
              options: [
                "三个地标都在船头前方 30° 范围内",
                "三条 LOP 互相接近 60° / 60° / 60°",
                "三条 LOP 平行",
                "夹角越小 fix 越准",
              ],
              correct: 1,
              explanation:
                "理想的 3-LOP fix 三条线之间夹角接近 60°，cocked hat 最小、几何最稳。三条线都在同一方向时即使有微小读数误差也会让交点跑很远。",
              topic: "LOP 几何",
            },
            {
              id: "q-2-1-3",
              q: "Transit（两地标连成一线）作为位置线，最大的优点是？",
              options: [
                "不需要任何仪表，几何上零误差",
                "比 GPS 还准",
                "可以无视潮流",
                "可以代替罗经",
              ],
              correct: 0,
              explanation:
                "Transit 完全靠眼睛——前后两个已知地标重合在视线上时，你就在两者延长线上。没有罗经读数误差、没有自差问题，是精度最高的视觉 LOP。",
              topic: "Transit",
            },
            {
              id: "q-2-1-4",
              q: "下列哪一种工作流最接近 RYA Day Skipper 推荐的「无 GPS 也能保持位置感知」做法？",
              options: [
                "只在出港和入港时记录位置，中间靠记忆",
                "每 30 分钟画一个 DR，每小时叠加潮流画 EP，每 1–2 小时用 LOP 取 fix 校准",
                "整段航程只靠 GPS，每小时记一次坐标",
                "全程不画任何位置，到目的地附近再开始定位",
              ],
              correct: 1,
              explanation:
                "DR/EP/Fix 的协同工作流是 Day Skipper 实操核心：DR 与 EP 是中间段位置感知，fix 是校准点。GPS 是补充验证，不是替代。",
              topic: "导航工作流",
            },
          ],
        },
        {
          slug: "cts-and-leeway",
          index: "2.2",
          title: "CTS 计算：把潮流和风压「扣回去」",
          summary:
            "从 A 到 B，你不能朝 B 的方向开——因为潮流会把你横着推走、风会把你侧着压走。CTS（Course To Steer）告诉舵手该「转到哪一度」才能真的到 B。",
          duration: "约 75 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G3.10 — Course to steer with tidal stream",
            "Day Skipper Theory G3.11 — Leeway and its effect on course",
            "Day Skipper Theory G3.12 — Vector triangle solutions",
          ],
          outcomes: [
            "能用向量三角形画法求出 CTS（朝向潮流来源方向画船速向量、目标方向画潮流向量）",
            "理解 leeway（风压角）的成因，能根据风向估出方向偏移",
            "能完整执行 CTS 求解：T → M → C，给出舵手实际要按的罗经度数",
          ],
          body: [
            {
              type: "paragraph",
              text: "你站在海图前，铅笔从 A 点画一条直线到 B 点——直线方向 080° T。问题：舵手该按 080° 开船吗？不能。如果当地潮流是 045° T / 2.0 节，把船「往东北方向推」，那么你在直直朝 080° 跑的过程中，船真实的轨迹会被推到 080° 偏南——你会从 B 点下风一侧错过去。",
            },
            {
              type: "paragraph",
              text: "解决方法是 CTS——Course To Steer。CTS 是「为了真正沿着 A→B 方向移动，舵手要让船头朝向的方位」。它不等于 A→B 方向，而是 A→B 方向减去潮流的横推影响。CTS 永远比目标方位略偏「迎着潮流」一侧——你要主动给潮流一个反向修正，潮流才会把你「修正回」目标方向。",
            },
            {
              type: "heading",
              text: "标准向量画法（必须会画）",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "在海图上从 A 点画一条向量代表「潮流」—— 方向取潮流流向，长度按比例代表 1 小时的潮流距离（如 2.0 节 = 2.0 nm 长）。终点标记为 T。",
                "从 T 点取一段长度 = 船速 1 小时所走距离（如 5.5 节 = 5.5 nm 长）的弧线，弧的圆心在 T，交目标线 A→B 于点 X。",
                "T → X 这一段向量的方向，就是 CTS（你要让船头朝向的真方位）。",
                "A → X 是你 1 小时后的实际位置（即一个 EP）。",
                "把 CTS 用 CADET 转回 C（罗航向），加上风压修正（下一节讲），就是舵手该按的罗经数值。",
              ],
            },
            {
              type: "diagram",
              kind: "wind-shift-vmg",
              caption: "图 2.2 · CTS 向量三角形：起点 A 出潮流向量到 T、T 出船速向量交目标线于 X、T→X 即 CTS",
            },
            {
              type: "callout",
              tone: "note",
              title: "为什么是「从 A 画潮流」而不是「从 B 画」",
              body:
                "这一步反直觉，但逻辑很简单：你想找出「在 1 小时之内，船自己要走的方向」。把 1 小时分成两个动作——先「让潮流带你走」(A→T)，再「船自己走船速向量」(T→X)。两段加起来落到目标线上。所以潮流向量从起点画，船速向量从潮流终点画——这就是 RYA 教材里画 CTS 三角形的标准顺序。",
            },
            {
              type: "heading",
              text: "风压角（Leeway）",
            },
            {
              type: "paragraph",
              text: "潮流是水把船横推；风压是风把船侧着压。两者效果相似但来源不同。风压角（leeway）是船的实际航迹相对船头方向「往下风方向偏离」的角度。typical 估值：现代巡航船在中风 (15 节左右) 上风航段约 5°–10°，强风顶风可达 15°；机动船或顺风时风压角小到可以忽略。",
            },
            {
              type: "definition",
              term: "Leeway（风压角）",
              meaning:
                "船受风推动而偏离船头指向的角度，方向永远在下风一侧。Day Skipper 级别取 5°–15° 经验值，根据风向、风速、船型估算。在 CTS 计算中，舵手实际要按的罗航向要「向上风方向多转 leeway 那么多」，才能让实际航迹落在 CTS 上。",
            },
            {
              type: "paragraph",
              text: "Leeway 的方向规则：风从船的右舷吹来（starboard tack），船被推向左（port）；舵手要让船头多转向右一点（即往「上风」方向多 5°–10°）才能让实际航迹保持在 CTS 上。所以最终的「该走的罗航向」= CTS（用 CADET 转成 C）+ Leeway（朝上风方向调整）。",
            },
            {
              type: "heading",
              text: "完整示范题",
            },
            {
              type: "paragraph",
              text: "题目：你在 A 点 (50°45′N 001°10′W)，目标 B 点 (50°55′N 000°50′W)。海图上量得 A→B 真方位 080° T、距离 12 海里。当地潮流方向 045° T、流速 2.0 节。船速 5.5 节。风从南南西吹 (200° T)、15 节，估算 leeway 8°。当地变化角 V = 3°W，朝向 080° 的自差 D = +2°E。问舵手该按罗经走多少度？预计到达时间？",
            },
            {
              type: "paragraph",
              text: "第一步：CTS 向量三角形。从 A 画 045° 方向、长度 2.0 nm 的潮流向量到 T。从 T 画 5.5 nm 长的弧线，交 A→B 目标线于 X。量得 T→X 方向约 088° T——这就是 CTS（真方位）。注：因为潮流把船向东北推、目标在东方略偏北，所以 CTS 比目标方位略偏南（往潮流来源的「反方向」一侧），数值上从 080° 增加到 088° 不奇怪——你要主动「顶」潮流。",
            },
            {
              type: "paragraph",
              text: "第二步：CTS T = 088° → C 罗航向。CADET 反向：T 088° + V 3°W (反向 W 加) = M 091°。M 091° − D 2°E (反向 E 减) = C 089°。",
            },
            {
              type: "paragraph",
              text: "第三步：加 Leeway 修正。风从 200° T 吹来，目标航向约 088° T（即东方略偏北），所以风从船的右后方略偏向右舷吹来——风把船推向左舷（北方向）。要让实际航迹保持在 088°，舵手要让船头多转向南一点，即罗航向 C 再 + leeway 朝南方向 = 089° + 8° = 097°。最终罗航向 C ≈ 097°。",
            },
            {
              type: "paragraph",
              text: "第四步：航行时间。注意 1 小时内船速向量长度 5.5 nm，A→X 落在目标线上的距离不一定是 5.5 nm——量出 A→X 实际长度约 6.3 nm（潮流帮你「顺向」推了一点）。整段 12 nm 需要 12 / 6.3 ≈ 1.9 小时 ≈ 1 小时 54 分。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "「Speed Made Good」与「Speed Over Ground」",
              body:
                "上面的 6.3 节就是 SMG（Speed Made Good，沿目标方向的有效速度）—— 比船速 5.5 节快，因为潮流帮了忙。SOG（Speed Over Ground，对地速度）是 A→X 实际距离，本例中等于 SMG（因为 X 落在目标线上）。当潮流朝目标的反方向时，SMG 会低于船速；CTS 的目的就是让 SMG 朝目标方向最大化。",
            },
            {
              type: "table",
              headers: ["参数", "数值", "含义"],
              rows: [
                ["目标真方位", "080° T", "A→B 海图量值"],
                ["潮流", "045° T / 2.0 kn", "把船推向东北"],
                ["CTS（真方位）", "088° T", "向量三角形求得"],
                ["CTS 转罗航向", "089° C", "CADET 反向：T → M → C"],
                ["Leeway 修正", "+8°（朝南）", "风从 200° T 推船向北"],
                ["舵手罗航向", "097° C", "最终值"],
                ["SMG (Speed Made Good)", "6.3 节", "沿目标方向有效速度"],
                ["ETA", "1h 54min", "12 / 6.3"],
              ],
            },
            {
              type: "practice",
              prompt:
                "重做一遍上面这道题，但把潮流改成 225° T / 2.5 节（顶头潮流）、风改成 060° T 12 节（顶风）。看：① CTS 会变成多少？② SMG 会变快还是变慢？③ 总航行时间是多少？这次潮流和风都在「拖你后腿」，你会切身感受窗口期的重要性。",
              hint:
                "潮流顶头会让 SMG 大幅下降到约 3.5 节，原本 1h 54min 的航段会拖到 3h 30min 以上。这就是「在错的潮汐时刻出门」的代价。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "CTS 不是一次算完就够",
              body:
                "潮流每小时都在变（方向和速度）。一段超过 1 小时的航程必须每小时重新算一次 CTS——每一段用当小时的潮流向量。后面 4.2 节会专门讲「一小时一格」的多时段 EP 画法。",
            },
            {
              type: "paragraph",
              text: "对 leeway 的估算要诚实——而且要看「上风航段」与「下风航段」的差别。顶风（close-hauled / beating）时，船以小角度切风，帆面承受巨大侧向力，leeway 通常 5°–10°，强风时可到 15°。横风（beam reach）时 leeway 减小到 3°–5°。下风（broad reach / running）时 leeway 几乎为零——这也是为什么顺风航段往往不需要 CTS 修正。判断方法很直接：从船尾往后看，自己留下的尾迹（wake）方向相对船头的偏角，就是 leeway 的大小。这一招在没有仪表也没有计算的情况下，让你给 CTS 一个直观修正。",
            },
            {
              type: "paragraph",
              text: "另一类常被忽略的修正是「水流（current）」与「潮流（tidal stream）」的区别。潮流是月球引起、有 12.5 小时周期、可预报；水流（如墨西哥湾流、加利福尼亚流）是海洋大尺度环流、几乎常态、不随潮汐变化。Day Skipper 级别航行多在近岸，主要考虑潮流；Coastal Skipper 和 Yachtmaster 跨海段则要把两者叠加。如果你要从加勒比横渡到欧洲，墨西哥湾流可以白送你 1.5–3 节顺向推力——但前提是你识别得出它在哪。",
            },
          ],
          quiz: [
            {
              id: "q-2-2-1",
              q: "CTS（Course To Steer）的本质是？",
              options: [
                "船头实际指向的方向，等于 A→B 直线方向",
                "为了让实际航迹沿 A→B 走，船头需要朝向的方位——包含对潮流和风压的预先修正",
                "GPS 自动算出来的航向",
                "舵手凭经验估算的方向",
              ],
              correct: 1,
              explanation:
                "CTS 是「考虑了潮流和风压之后，舵手该让船头朝向的方位」。它通常与 A→B 直线方向不同，相差量等于潮流与风压的横向影响。",
              topic: "CTS 概念",
            },
            {
              id: "q-2-2-2",
              q: "在标准的 CTS 向量三角形画法中，潮流向量应该从哪个点开始画？",
              options: [
                "从目标点 B 开始",
                "从船速向量的中点开始",
                "从起点 A 开始，长度按 1 小时潮流距离",
                "从海图正北方向开始",
              ],
              correct: 2,
              explanation:
                "标准做法是从 A 出发画潮流向量到点 T，再从 T 出发用船速向量长度的弧交目标线 A→B 于 X。T→X 就是 CTS。",
              topic: "向量三角形",
            },
            {
              id: "q-2-2-3",
              q: "风从船的右舷（starboard）吹来，估算 leeway 6°。为了让实际航迹保持在 CTS 上，舵手应该把罗航向往哪个方向调？",
              options: [
                "罗航向不变",
                "向左 6°（即减少 6°）",
                "向右 6°（即增加 6°）",
                "向左 12°",
              ],
              correct: 2,
              explanation:
                "风从右舷推船向左（下风方向）。要保持实际航迹在 CTS 上，舵手要让船头多偏向右——即罗航向 + leeway。结果是船被风「推回」CTS。",
              topic: "Leeway 修正",
            },
            {
              id: "q-2-2-4",
              q: "船速 6 节，潮流 030° / 1.5 节，目标方位 060° T。下面哪一种情况下你的 SMG（沿目标方向有效速度）最高？",
              options: [
                "潮流与目标方向接近平行（如本题）",
                "潮流与目标方向垂直",
                "潮流与目标方向相反",
                "潮流方向无关紧要",
              ],
              correct: 0,
              explanation:
                "潮流方向与目标方向越接近平行（且方向一致），对你的有效速度贡献越大，SMG 越高。垂直时只产生横推、不增加 SMG；相反时减少 SMG。这是窗口期思维的几何基础。",
              topic: "SMG / SOG",
            },
          ],
        },
      ],
    },
    {
      slug: "tidal-heights",
      index: 3,
      title: "潮高计算：从标准港到副港",
      summary:
        "潮汐表不只是「几点高潮」。它告诉你下午 1300 这个港口的水深够不够你的龙骨过——这是「我能不能进这个港」最直接的回答。",
      lessons: [
        {
          slug: "standard-port-tides",
          index: "3.1",
          title: "标准港潮汐与潮汐表读法",
          summary:
            "高潮、低潮、潮差、大潮小潮——这些是潮汐表的「字母表」。先读懂 ATT 的标准港页，再谈一切高级计算。",
          duration: "约 65 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G4.1 — Basic tidal terminology",
            "Day Skipper Theory G4.2 — Spring and neap tides",
            "Day Skipper Theory G4.3 — Reading the Admiralty Tide Tables (standard ports)",
            "Day Skipper Theory G4.4 — Heights of tide and depth of water",
          ],
          outcomes: [
            "能解释 HW、LW、Range、Springs、Neaps 的含义",
            "理解大潮与小潮的成因（月相）与 14 天周期",
            "能在 Admiralty Tide Tables 标准港页上读出指定日期的 HW/LW 时刻与高度",
            "能区分 Chart Datum、Mean Sea Level、潮高 (tidal height) 与水深 (depth)",
          ],
          body: [
            {
              type: "paragraph",
              text: "潮汐是月球（主要）和太阳（次要）的引力让地球海面「鼓起来又落下去」的现象。你站在岸边看一天潮起潮落——但真正影响你出海决策的，不是「现在水位多高」，而是「我打算出港 / 进港 / 抛锚的那一刻，水位会在哪」。",
            },
            {
              type: "heading",
              text: "基础词汇：HW / LW / Range",
            },
            {
              type: "definition",
              term: "HW (High Water，高潮)",
              meaning:
                "潮汐周期中水位的最高点。一天通常有 2 次 HW（半日潮地区），相距约 12 小时 25 分钟。",
            },
            {
              type: "definition",
              term: "LW (Low Water，低潮)",
              meaning:
                "潮汐周期中水位的最低点。HW 与 LW 之间约 6 小时 12.5 分钟。",
            },
            {
              type: "definition",
              term: "Range（潮差）",
              meaning:
                "HW 与紧邻 LW 之间的高度差。Range 大表示「潮起潮落幅度大」、潮流也通常更强；Range 小则反之。Range = HW - LW。",
            },
            {
              type: "paragraph",
              text: "在多数海域，一天有 2 次 HW 与 2 次 LW（半日潮，semi-diurnal）。也有少数海域是全日潮（diurnal，一天 1 次 HW、1 次 LW，如墨西哥湾部分地区）或混合潮（mixed，两次潮高度差很大，如太平洋多个港口）。Day Skipper 笔试默认半日潮模型——这也是英国、欧洲大陆、香港的主导模式。",
            },
            {
              type: "heading",
              text: "Springs vs Neaps：14 天的呼吸",
            },
            {
              type: "diagram",
              kind: "tide-curve",
              caption: "图 3.1 · 14 天潮汐周期：满月/新月时 Springs（最高最低）、上下弦时 Neaps（最弱）",
            },
            {
              type: "paragraph",
              text: "潮汐的强弱按 14 天周期变化。这个周期来自月相：当太阳、地球、月球排成一线（新月或满月时），太阳和月球的引力叠加，潮差最大——这就是大潮（Springs，与「春天」无关，源自古英语「spring up」涌起）。当太阳与月球成直角（上弦或下弦时），两者引力部分抵消，潮差最小——这就是小潮（Neaps）。",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "Spring tides（大潮）—— 每月新月、满月后 1–2 天达到最大。潮差最大、潮流最强、HW 时刻最高、LW 时刻最低",
                "Neap tides（小潮）—— 每月上弦、下弦后 1–2 天潮差最小。Range 通常只有 Springs 的 30%–50%",
                "Mean Range Springs / Neaps —— 标准港数据里给出的两个均值，用于副港插值",
                "实操含义：大潮时入港要算准 HW 否则有搁浅风险；小潮时潮流弱，跨潮流海域容易；窗口期判断永远要先看「今天是 Spring 还是 Neap」",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "「Spring」不是季节",
              body:
                "新手最常误会的：Spring tides 不是春季独有，而是每月新月、满月后都会出现。一年大约 24 次 Springs、24 次 Neaps。「Spring」在这里是动词意义——潮水「涌起」(spring up)，与季节无关。",
            },
            {
              type: "heading",
              text: "Admiralty Tide Tables（ATT）：标准港页",
            },
            {
              type: "paragraph",
              text: "ATT 是英国海军部出版的年度潮汐表（Admiralty Tide Tables，简称 ATT 或 Tide Tables）。每年一本，分四卷覆盖全球。它的「主菜」是标准港页（standard port pages）——全球约 250 个标准港，每个港每天列出 HW 与 LW 的时刻与高度。",
            },
            {
              type: "paragraph",
              text: "标准港页长这样：左侧一列是日期，每天 4 行（2 个 HW + 2 个 LW），每行写明时刻（24 小时制 UTC 或本地时间，要看页头标注）、高度（米、Chart Datum 以上）。页头还印有该港 LAT、Mean Sea Level、Mean Springs / Neaps 等参考数据。",
            },
            {
              type: "table",
              headers: ["日期", "时刻 (UT)", "高度 (m)", "标注"],
              rows: [
                ["May 25 Mon", "0312", "4.2", "HW"],
                ["", "0925", "1.0", "LW"],
                ["", "1538", "4.4", "HW"],
                ["", "2150", "0.8", "LW"],
                ["May 26 Tue", "0405", "4.1", "HW"],
                ["", "1018", "1.1", "LW"],
                ["", "1630", "4.3", "HW"],
                ["", "2244", "0.9", "LW"],
              ],
            },
            {
              type: "paragraph",
              text: "读 ATT 第一件事：核对时区。英国 ATT 默认列 UT（GMT，世界协调时），夏令时（BST，British Summer Time）要自己 + 1 小时。如果你的航行在夏季 7 月，HW 显示 0312 UT 实际是当地时间 0412 BST——这个细节错了会让你「出门时刻偏 1 小时」，后果可能是搁浅。",
            },
            {
              type: "heading",
              text: "Chart Datum vs Mean Sea Level：两条参考线",
            },
            {
              type: "paragraph",
              text: "潮汐表里的高度数字总是带一个隐含的「从哪条线起算」。两条最常见的参考线：① Chart Datum (CD)——海图水深起算线、潮高起算线，通常取该地区的 LAT（最低天文潮位）。② Mean Sea Level (MSL)——长期平均海面，地理学和工程上的零点。",
            },
            {
              type: "paragraph",
              text: "潮汐表所有「高度」都是 CD 以上多少米。所以 HW 高度 4.2m 意味着此刻海面比 CD 高 4.2m。当下任意时刻的「水深」=「海图水深」+「当时潮高」。这是航海最常用、也最容易记错的公式。",
            },
            {
              type: "table",
              headers: ["参考线", "来源", "用途"],
              rows: [
                ["Chart Datum (CD)", "≈ LAT (最低天文潮位)", "海图水深与潮高的零点"],
                ["Mean Sea Level (MSL)", "长期平均海面", "工程、海图陆地高度参考"],
                ["MHWS (Mean High Water Springs)", "大潮平均高潮位", "灯塔、礁石、岸线高度起算"],
                ["MLWS (Mean Low Water Springs)", "大潮平均低潮位", "干露线与浅滩判断"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "「水深 ≥ 龙骨吃水」并不够",
              body:
                "你查到某时刻港内水深 3.5m，龙骨吃水 2.0m——理论上可以进。但实际还要留「龙骨净空（Under-keel Clearance, UKC）」安全余量：一般近岸至少 0.5m、沙泥底质至少 1.0m、岩石底质或大浪天至少 1.5m。出航前要把「水深 - 吃水 - UKC」写进 brief，而不是只算「够不够」。",
            },
            {
              type: "definition",
              term: "Under-keel Clearance (UKC，龙骨净空)",
              meaning:
                "船龙骨最低点到海底的垂直距离。航行中要保持的最小 UKC 取决于底质、海况、船型——惯例为软底 0.5m、硬底 1.0m、大浪日 1.5m 以上。任何时候水深 - 吃水 < UKC 都意味着搁浅风险。",
            },
            {
              type: "heading",
              text: "潮汐成因的速记版",
            },
            {
              type: "paragraph",
              text: "你不需要懂全部天体力学才能用潮汐表，但理解机理能让你不被表上的怪事吓到。潮汐主要由月球引力造成（约占 2/3），太阳贡献剩下 1/3。月球绕地球一周约 24h 50min，所以每天的 HW 时刻比前一天晚约 50 分钟——这就是为什么一周后同一时间点的潮况完全不同。当太阳与月球引力叠加（满月/新月），就是 Springs；当两者互相抵消一部分（上下弦），就是 Neaps。",
            },
            {
              type: "paragraph",
              text: "但天文模型只解释「无障碍海面」的潮汐。真实世界里，潮汐还会被海底地形、海湾形状、海峡共振放大或减弱。英吉利海峡 Bristol Channel 大潮潮差可达 14 米（全球第二大），地中海的潮差只有几十厘米——同一颗月亮、同一颗太阳，但地形让两者天差地别。所以「我家门口的潮汐」和「同纬度别处的潮汐」可能完全不同——必须查当地标准港数据，不能凭直觉推。",
            },
            {
              type: "callout",
              tone: "note",
              title: "为什么是 12h 25min 一个周期",
              body:
                "月球绕地球公转，地球同时自转。地球自转一圈是 23h 56min（恒星日），但月球同方向公转了约 13°——所以地球任何一点要再次正对月球（一个「太阴日」），需要 24h 50min。一个太阴日有两次潮——一次月球正对头顶、一次月球在地球另一侧（潮汐力对称）。所以潮汐周期 = 12h 25min。这也解释了为什么 HW 时刻每天后移约 50 分钟。",
            },
            {
              type: "paragraph",
              text: "「我家附近的港口什么时候 HW？」这种问题没有通用答案——同一颗月亮在头顶时，伦敦、利物浦、爱丁堡的 HW 时刻可能差好几个小时，因为潮汐波传到不同海岸需要的时间不同。所以每一个港口都有自己的「establishment of the port」（建潮时刻）——「月球过当地经线后第几小时是 HW」的固定常数。今天的 HW 时刻 ≈ 上次月球过当地经线时刻 + establishment。但实操中你不需要算这个——ATT 已经把所有数据预先算好印出来了。你要做的只是查表 + 副港换算 + 12 分之 1 插值。",
            },
            {
              type: "practice",
              prompt:
                "去 UKHO EasyTide (https://easytide.admiralty.co.uk)，找出你家附近最近的标准港。查出今天的 4 个潮汐时刻与高度，并：① 标出哪一组是 Springs/Neaps（看 Range 比较）；② 算出最深与最浅时刻分别的水深（假设港内海图水深 2.5m）；③ 如果你的船吃水 1.5m、UKC 取 0.5m，今天哪几个小时不能进港？",
              hint:
                "EasyTide 给出图形化曲线，更直观。看不见 Range 时直接 HW − LW 即可。",
            },
          ],
          quiz: [
            {
              id: "q-3-1-1",
              q: "「Spring tides」最准确的描述是？",
              options: [
                "只在春季出现的高潮",
                "每月新月、满月后 1–2 天出现的最大潮差时段",
                "每月上弦、下弦后出现的潮差最小时段",
                "夏至和冬至时出现的特殊潮",
              ],
              correct: 1,
              explanation:
                "Spring tides 与季节无关——「Spring」是动词「涌起」。日地月连成一线时引力叠加，每月约出现 2 次 Springs。Neap tides 则在月相成 90° 时出现。",
              topic: "大潮小潮",
            },
            {
              id: "q-3-1-2",
              q: "海图标某点水深 3.2m。潮汐表给当下潮高 1.5m（CD 以上）。船吃水 2.0m，要求 UKC ≥ 0.6m。该点可以通过吗？",
              options: [
                "可以，水深 1.2m > 0",
                "可以，剩余净空 2.1m > 0.6m",
                "不可以，水深 1.2m < 吃水 2.0m",
                "不可以，UKC 不够",
              ],
              correct: 1,
              explanation:
                "实际水深 = 3.2 + 1.5 = 4.7m。剩余净空 = 4.7 − 2.0 = 2.7m > 0.6m UKC 要求。可以通过。注意：海图水深要加上潮高才是当下真实水深。",
              topic: "水深与 UKC",
            },
            {
              id: "q-3-1-3",
              q: "下列哪一项不是 Admiralty Tide Tables 标准港页直接给出的信息？",
              options: [
                "每天 HW 与 LW 的时刻",
                "每天 HW 与 LW 的高度（CD 以上）",
                "每天的潮流方向与流速",
                "页头列出的 Mean Springs Range 与 Mean Neaps Range",
              ],
              correct: 2,
              explanation:
                "ATT 标准港页给出潮高（HW/LW 时刻与高度）。潮流信息（方向与流速）在另一类资料里：Tidal Stream Atlas 或海图上的 tidal diamond。两者不能混。",
              topic: "ATT 读法",
            },
            {
              id: "q-3-1-4",
              q: "你在英国南海岸 7 月航行，ATT 列某日 HW 时刻为 0930（UT）。当地实际（夏令时 BST）的 HW 时刻是？",
              options: [
                "0830 BST",
                "0930 BST",
                "1030 BST",
                "1130 BST",
              ],
              correct: 2,
              explanation:
                "英国 ATT 默认列 UT（GMT）。夏令时 BST = UT + 1 小时。所以 UT 0930 = BST 1030。这一个 +1 小时的细节错了会让窗口期错位，是 Day Skipper 笔试与实操最常出错的地方之一。",
              topic: "时区修正",
            },
          ],
        },
        {
          slug: "secondary-ports-and-rule-of-twelfths",
          index: "3.2",
          title: "副港换算与 12 分之 1 法则",
          summary:
            "标准港只有 250 个，副港有几千个——你大概率不在标准港里。副港换算 + 12 分之 1 法则，让你能在任何时刻、任何港口估出潮高。",
          duration: "约 80 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G4.5 — Secondary ports and time / height differences",
            "Day Skipper Theory G4.6 — Rule of Twelfths",
            "Day Skipper Theory G4.7 — Interpolation between HW and LW",
            "Day Skipper Theory G4.8 — Under-keel clearance and safety margins",
          ],
          outcomes: [
            "能在 ATT 副港表里读出时间差与高度差，并应用到标准港数据上",
            "理解 12 分之 1 法则的来源（潮高近似正弦曲线的离散化）",
            "能在任意时刻（不是 HW 或 LW）估算副港的潮高",
            "能完成一道完整的副港潮高题：给标准港 HW/LW + 副港修正，求指定时刻水深",
          ],
          body: [
            {
              type: "paragraph",
              text: "上一节我们学会了读 ATT 标准港页。但实际航行中你会发现一个尴尬事实：英国有 250 个标准港，但有数千个港湾和锚地——绝大多数你计划停留的小港不是标准港。副港换算就是为了这个问题。",
            },
            {
              type: "heading",
              text: "副港表：两组修正数",
            },
            {
              type: "paragraph",
              text: "ATT 在标准港页之后，紧跟着列出该标准港的「卫星港」（副港 / secondary ports）。每个副港给出 4 个修正数：① HW 时间差（time difference at HW）；② LW 时间差（time difference at LW）；③ HW 高度差（height difference at HW）；④ LW 高度差（height difference at LW）。",
            },
            {
              type: "paragraph",
              text: "用法：先从标准港页查出当天的 HW 与 LW 时刻与高度，再分别加上对应的副港修正。注意：HW 时间差与 LW 时间差不一定相同（潮汐传播过来的快慢可能不同）；高度差也分别给出。",
            },
            {
              type: "table",
              headers: ["参数", "标准港 (Plymouth)", "副港 (Salcombe) 修正", "副港结果"],
              rows: [
                ["HW 时刻", "0930", "+0:25", "0955"],
                ["HW 高度", "4.8m", "−0.4m", "4.4m"],
                ["LW 时刻", "1530", "+0:25", "1555"],
                ["LW 高度", "0.6m", "+0.1m", "0.7m"],
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "副港修正：加号减号不要看反",
              body:
                "副港表里的「+0:25」意思是「副港比标准港晚 25 分钟到达 HW」。「−0.4m」意思是「副港 HW 高度比标准港低 0.4m」。这两个符号在 ATT 表里一目了然，但抄到草稿纸时最容易抄反——养成习惯：副港修正抄完后，用一句中文写在旁边「Salcombe 比 Plymouth 晚 25 分钟、低 0.4 米」，避免错。",
            },
            {
              type: "heading",
              text: "12 分之 1 法则（Rule of Twelfths）",
            },
            {
              type: "paragraph",
              text: "副港换算给你的是 HW 和 LW 的时刻与高度。但你出海的时刻往往不是 HW 或 LW——可能是「HW 后 3 小时 20 分钟」这种尴尬时刻。怎么估算这个时刻的水位？精确做法是用潮汐曲线（tidal curve），近似做法就是 12 分之 1 法则。",
            },
            {
              type: "paragraph",
              text: "12 分之 1 法则的核心：把 HW 到 LW（或反过来）这 6 小时分成 6 段，每段 1 小时。这 6 段里水位变化的比例是：1/12、2/12、3/12、3/12、2/12、1/12。所以第 1 小时只下降全 Range 的 1/12，第 3、4 小时各下降 3/12（合计 6/12 = 半 Range）——也就是说，半 Range 集中在中间两小时。",
            },
            {
              type: "diagram",
              kind: "tide-curve",
              caption: "图 3.2 · 12 分之 1 法则：6 小时分段比例 1-2-3-3-2-1，中间 2 小时占了一半 Range",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "第 1 小时（HW → HW+1）: 下降 1/12 × Range",
                "第 2 小时（HW+1 → HW+2）: 下降 2/12 × Range",
                "第 3 小时（HW+2 → HW+3）: 下降 3/12 × Range",
                "第 4 小时（HW+3 → HW+4）: 下降 3/12 × Range",
                "第 5 小时（HW+4 → HW+5）: 下降 2/12 × Range",
                "第 6 小时（HW+5 → LW）: 下降 1/12 × Range",
              ],
            },
            {
              type: "paragraph",
              text: "为什么是 1-2-3-3-2-1 这个分布？因为潮高随时间的变化非常接近正弦曲线（sinusoidal）：在 HW 和 LW 附近变化慢（曲线接近水平），在中间变化快（曲线接近垂直）。把正弦曲线 6 段离散化，得到的就是 1/12-2/12-3/12-3/12-2/12-1/12 这个近似。法则简单到不用计算器，精度对 Day Skipper 级别足够（误差通常 < 0.2m）。",
            },
            {
              type: "definition",
              term: "12 分之 1 法则（Rule of Twelfths）",
              meaning:
                "潮高在 HW 与 LW 之间 6 小时内按 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 的比例变化。这是潮汐正弦曲线在 1 小时分段下的近似。简单可口算，是 Day Skipper 计算潮高的核心工具。",
            },
            {
              type: "heading",
              text: "完整示范题：副港下午 1300 的水深",
            },
            {
              type: "paragraph",
              text: "题目：你计划下午 1300 进入副港 Salcombe（吃水 1.8m，要求 UKC ≥ 0.5m），打算抛锚处海图水深为 1.2m。已知标准港 Plymouth 当天 HW 时刻 0930（高 4.8m）、LW 时刻 1530（高 0.6m）。副港 Salcombe 时差 +0:25、HW 高差 −0.4m / LW 高差 +0.1m。请算出 1300 时该处实际水深，并判断能否抛锚。",
            },
            {
              type: "paragraph",
              text: "第一步：把标准港数据换算成副港数据。Salcombe HW = 0930 + 0:25 = 0955，高度 = 4.8 − 0.4 = 4.4m。Salcombe LW = 1530 + 0:25 = 1555，高度 = 0.6 + 0.1 = 0.7m。Range = 4.4 − 0.7 = 3.7m。",
            },
            {
              type: "paragraph",
              text: "第二步：判断 1300 处在 HW → LW 的第几小时。Salcombe HW 0955 到 LW 1555 共 6 小时。1300 是 HW 之后 3h 05min ≈ 3 小时——位于第 4 小时的开端。",
            },
            {
              type: "paragraph",
              text: "第三步：累计下降量。前 3 小时累计下降 = (1+2+3)/12 × Range = 6/12 × 3.7 = 1.85m。1300 时潮高 ≈ HW − 1.85 = 4.4 − 1.85 = 2.55m。",
            },
            {
              type: "paragraph",
              text: "第四步：算 1300 时实际水深。实际水深 = 海图水深 + 潮高 = 1.2 + 2.55 = 3.75m。剩余净空 = 3.75 − 1.8（吃水）= 1.95m。UKC 要求 0.5m，1.95 > 0.5，安全。可以抛锚。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "出门前也要算「最低潮时」",
              body:
                "你打算下午 1300 进港抛锚，但如果是过夜——你还要算夜里 LW 时刻（Salcombe LW 1555 之后下一个 LW 大约在 0410 次日）的水深，确保最低潮时船不会搁浅。本题次日 LW 0.7m 时该处实际水深 = 1.2 + 0.7 = 1.9m，剩余净空 = 1.9 − 1.8 = 0.1m！UKC 不够。结论：可以白天抛锚，但要么夜里换深一点的位置、要么离港前算准走的时刻。",
            },
            {
              type: "heading",
              text: "另一种情景：求「最早能进港」的时刻",
            },
            {
              type: "paragraph",
              text: "题目：某副港入口海图水深 0.5m，你的船吃水 2.2m、要 UKC 0.6m。LW 时刻 0800（0.4m），HW 时刻 1410（4.8m）。问最早几点能进？",
            },
            {
              type: "paragraph",
              text: "解：要求实际水深 ≥ 2.8m（= 吃水 2.2 + UKC 0.6）。海图水深 0.5m，所以需要的潮高 ≥ 2.8 − 0.5 = 2.3m。LW 后开始涨潮，6 小时涨到 HW。Range = 4.8 − 0.4 = 4.4m。需要涨 2.3 − 0.4 = 1.9m（从 LW 高度起算）。1.9 / 4.4 ≈ 0.432 ≈ 5.2/12——按 12 分之 1 法则（涨潮顺序 1-2-3-3-2-1），累计到第 4 小时为 1+2+3+3 = 9/12，第 3 小时为 6/12 = 0.5——5.2/12 落在第 3 小时之后一点。线性插值：第 3 小时末 6/12 × 4.4 = 2.2m（即 LW + 2.2 = 2.6m，还差 0.2m）；第 4 小时末 9/12 × 4.4 = 3.3m 已超出。第 4 小时内每 1/12 = 0.367m，要补 0.2m 需要约 0.2 / 0.367 = 0.55 小时 = 33 分钟。所以最早可进时刻 ≈ LW + 3h 33min = 0800 + 3:33 = 1133。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "「Rising tide」是搁浅的盟友、「Falling tide」是搁浅的敌人",
              body:
                "如果你不小心搁浅，做的第一件事是看潮汐表：当前是涨潮还是落潮？涨潮时再过 30 分钟可能就自动浮起；落潮时则相反——每分钟都更糟。所以进窄水道的时刻要选「rising tide」——万一蹭底，潮还在涨，能脱困。这是 Day Skipper 实操考的核心 seamanship。",
            },
            {
              type: "heading",
              text: "12 分之 1 法则什么时候不够用",
            },
            {
              type: "paragraph",
              text: "12 分之 1 法则有一个隐藏前提：潮高变化接近正弦曲线。这在「半日潮 + 中等潮差」的地区（英国、欧洲大陆、亚洲大部）成立得很好。但在以下三类海域，潮汐曲线偏离正弦，12 分之 1 会有较大误差：① 双重高潮（double high water，如英国 Southampton，HW 后 2 小时还有一个「次峰」）；② 浅水变形（shallow water distortion，潮汐进入河口被压扁、上涨快下降慢）；③ 混合潮（mixed tide，太平洋多数港，两次 HW 高度差很大）。这些地方 ATT 会提供精确的「tidal curve」图表，要用图查、不用 12 分之 1。",
            },
            {
              type: "paragraph",
              text: "Day Skipper 笔试默认半日潮 + 正弦近似，所以 12 分之 1 法则就够。Coastal Skipper 与 Yachtmaster 会引入 tidal curve 的精确读图——本质上就是「不用 12 分之 1 的离散化、直接读连续曲线」。两者背后的物理是同一个。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "Tidal Curve：当 ATT 给你一张曲线图",
              body:
                "ATT 在每个标准港后面通常会附一张「Tidal Curve」图，横轴是 HW ± 6 小时，纵轴是高度比例（0 到 1）。给定任何中间时刻，沿横轴找点、垂直上去交曲线、横向读纵轴比例——就是当时的「(高度 − LW) / Range」。这种方法比 12 分之 1 精度高一倍，但要带尺子画线，没有口算快。",
            },
            {
              type: "paragraph",
              text: "对刚开始学的人，最容易出错的不是公式而是「单位与符号」。再列一次容易踩的坑：① 时差「+0:25」意味着副港比标准港晚 25 分钟，不是高度高 25 厘米；② 高差「−0.4m」意味着副港 HW 比标准港低 0.4 米，不是时间早 0.4 小时；③ 当前潮高是「CD 以上多少米」，不是「MSL 上下」；④ 实际水深 = 海图水深 + 潮高，海图水深本身已经从 CD 起算，不要再扣一次；⑤ 龙骨净空（UKC）是「水深减吃水后的剩余」，不是吃水本身。把这五条用一张小卡片写下来贴在工作台上，前几次做题不会出错。",
            },
            {
              type: "practice",
              prompt:
                "找一个你家附近的副港，去 EasyTide 或 ATT 查出：① 它对应的标准港；② 今天的 4 个潮汐时刻（副港换算后）；③ 用 12 分之 1 法则估算上午 0700 时该港潮高；④ 如果你的船吃水 1.5m、UKC 0.5m，该港某点海图水深 1.0m，0700 时能否到达。",
              hint:
                "0700 通常落在 HW 或 LW 的某个分钟之后——先确定它在哪一小时段，再用累计分之 12 算潮高。",
            },
          ],
          quiz: [
            {
              id: "q-3-2-1",
              q: "12 分之 1 法则中，从 HW 起算 6 小时内每小时下降的比例分别是？",
              options: [
                "1/12, 1/12, 1/12, 1/12, 1/12, 1/12 (均匀下降)",
                "1/12, 2/12, 3/12, 3/12, 2/12, 1/12",
                "3/12, 2/12, 1/12, 1/12, 2/12, 3/12",
                "1/6, 1/6, 1/6, 1/6, 1/6, 1/6",
              ],
              correct: 1,
              explanation:
                "1-2-3-3-2-1 的分布是潮高正弦曲线的 1 小时离散化近似——中间 2 小时下降最快（共 6/12 = 半 Range），HW 和 LW 附近变化慢。这是 Day Skipper 必背的核心数。",
              topic: "12 分之 1 法则",
            },
            {
              id: "q-3-2-2",
              q: "标准港 HW 0820 高度 5.2m，副港时差 +0:15 / HW 高差 −0.3m。副港 HW 是？",
              options: [
                "0805，5.5m",
                "0835，4.9m",
                "0835，5.5m",
                "0805，4.9m",
              ],
              correct: 1,
              explanation:
                "副港 HW 时刻 = 0820 + 0:15 = 0835。副港 HW 高度 = 5.2 − 0.3 = 4.9m。+0:15 意为副港晚 15 分钟到 HW；−0.3m 意为副港 HW 低 0.3 米。",
              topic: "副港换算",
            },
            {
              id: "q-3-2-3",
              q: "某副港当天 HW 1030 高度 4.6m，LW 1640 高度 0.6m。1330 时潮高约为？",
              options: [
                "3.6m",
                "2.6m",
                "2.0m",
                "1.6m",
              ],
              correct: 1,
              explanation:
                "Range = 4.6 − 0.6 = 4.0m。1330 = HW + 3h，前 3 小时累计下降 (1+2+3)/12 × 4.0 = 6/12 × 4.0 = 2.0m。潮高 = 4.6 − 2.0 = 2.6m。",
              topic: "潮高插值",
            },
            {
              id: "q-3-2-4",
              q: "你打算进一段窄水道，理想做法是？",
              options: [
                "选 LW 时刻进，水位最稳定",
                "选 falling tide（落潮中）进，节省时间",
                "选 rising tide（涨潮中）进，万一蹭底潮还在涨能自动浮起",
                "随便什么时刻都行，只要水深够",
              ],
              correct: 2,
              explanation:
                "Rising tide 进窄水道是船长基本原则——万一搁浅，潮还在涨可自动脱困；如果选 falling tide，每分钟水位都在下降，搁浅会越来越严重。",
              topic: "潮汐 seamanship",
            },
          ],
        },
      ],
    },
    {
      slug: "tidal-streams",
      index: 4,
      title: "潮流计算：方向、流速与窗口期",
      summary:
        "潮高决定「水够不够深」，潮流决定「能不能开过去」。一片强潮流海域错过 30 分钟，可能要在外面多漂 6 小时。",
      lessons: [
        {
          slug: "tidal-stream-atlas",
          index: "4.1",
          title: "潮流地图集与潮流方块",
          summary:
            "潮流的两种数据来源：Tidal Stream Atlas（小册子）和海图上的 tidal diamond（菱形符号）。前者画面直观，后者数据精确——都以「HW Dover ± 6 小时」为参考。",
          duration: "约 65 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G4.9 — Tidal streams and currents",
            "Day Skipper Theory G4.10 — Use of tidal stream atlases",
            "Day Skipper Theory G4.11 — Tidal diamonds on charts",
            "Day Skipper Theory G4.12 — Spring / Neap rate interpolation",
          ],
          outcomes: [
            "理解 Tidal Stream Atlas 与海图 tidal diamond 的两种数据格式",
            "能查出某时刻某海域的潮流方向与流速（Springs 与 Neaps 两组数据）",
            "能用线性插值在 Springs 与 Neaps 之间估算当天的潮流速率",
            "理解为什么所有潮流数据都以 HW Dover（或当地标准港）± 6 小时为时间参考",
          ],
          body: [
            {
              type: "paragraph",
              text: "潮汐让海面上下变化，潮流让海水水平流动。两者来自同一个引力机制，但表现完全不同：潮高决定港里的水深够不够；潮流决定你能不能开过去——尤其是穿过狭窄水道、海角附近、海峡两端时。",
            },
            {
              type: "heading",
              text: "两种数据来源",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Tidal Stream Atlas（潮流地图集）—— 一本小册子，覆盖某海域（如英吉利海峡、爱尔兰海）。每页代表「HW 某标准港的 ± n 小时」时刻的潮流。整片海域用箭头表示方向、用数字表示流速（双数：Springs / Neaps，单位 1/10 节）。可视化最强。",
                "Tidal Diamond（海图潮流菱形）—— 海图上某些位置画一个紫色菱形 + 字母（A、B、C…），旁边有一张表，列出该点在 HW 某标准港 ± 6 小时各时刻的潮流方向 (True) 与速度（Springs / Neaps 两列）。数据更精确，定位到具体经纬度。",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "什么时候用 Atlas、什么时候用 Diamond",
              body:
                "Atlas 用于「初看一片海域今天的流况」——12 页一翻就能在脑子里建立全景。Diamond 用于「我在 A 点要算精确潮流向量」——精度高于 Atlas，画 CTS 时用 Diamond。两者结合：先用 Atlas 看大局，再用 Diamond 算细节。",
            },
            {
              type: "heading",
              text: "时间参考：HW Dover ± 6 小时",
            },
            {
              type: "paragraph",
              text: "潮流的时间表达不是「下午 1500」，而是「HW Dover + 2 小时」。为什么这样？因为潮流随潮汐而动，但不同港口潮汐时刻不同。把整个英国海域的潮流都挂在一个参考点（HW Dover，英国南海岸 Dover 港的高潮时刻）上，整片海的潮流地图集才能用 12 页（HW − 6 到 HW + 6）覆盖一个完整潮汐周期。",
            },
            {
              type: "paragraph",
              text: "其他海域用不同的参考港——法国比斯开湾用 HW Brest，地中海部分海域用当地标准港。重要的是：先查 ATT 当天该参考港的 HW 时刻，然后再算「现在是参考港 HW ± 几小时」。",
            },
            {
              type: "table",
              headers: ["时刻（实际本地时间）", "参考港 HW 状态", "在 Atlas 上看哪一页"],
              rows: [
                ["0810", "HW Dover − 5", "Atlas 第 -5 小时页"],
                ["1300", "HW Dover", "Atlas HW 页"],
                ["1640", "HW Dover + 3", "Atlas 第 +3 小时页"],
                ["1840", "HW Dover + 5", "Atlas 第 +5 小时页"],
              ],
            },
            {
              type: "paragraph",
              text: "举例：假设今天 HW Dover = 1300。如果你下午 1640 经过某段海域，那就是「HW + 3:40」≈ HW + 3.5 小时，翻到 Atlas 的「+3」或「+4」页（或在两页之间插值），找到你所在的位置，读箭头方向和数字。",
            },
            {
              type: "heading",
              text: "Springs / Neaps 数据与线性插值",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 4.1 · 潮流菱形示例：每一行给出 HW ± 一小时时的潮流方向与 Springs/Neaps 两组流速",
            },
            {
              type: "paragraph",
              text: "潮流数据通常给两组速率：Springs（大潮速率）与 Neaps（小潮速率）。比如某 tidal diamond 在 HW + 2 时记录：方向 075° T、Springs 2.4 节 / Neaps 1.1 节。今天既不是 Springs 也不是 Neaps，怎么估？用「当天 Range / Mean Springs Range」做线性插值。",
            },
            {
              type: "paragraph",
              text: "公式：当天速率 = Neaps + (当天 Range − Mean Neaps Range) / (Mean Springs Range − Mean Neaps Range) × (Springs − Neaps)。听上去复杂，但实操有简化版：当天 Range 接近 Mean Springs Range → 用 Springs 值；接近 Mean Neaps Range → 用 Neaps 值；介于中间 → 取算术平均或按比例插。",
            },
            {
              type: "table",
              headers: ["当天 Range", "插值结果（Springs=2.4, Neaps=1.1）"],
              rows: [
                ["接近 Mean Springs Range (例 4.2m)", "约 2.4 节（用 Springs 值）"],
                ["介于两者中间 (例 3.0m)", "约 1.75 节（中位插值）"],
                ["接近 Mean Neaps Range (例 2.0m)", "约 1.1 节（用 Neaps 值）"],
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "ATT 与 Atlas 的 Mean Range",
              body:
                "Mean Springs Range 与 Mean Neaps Range 印在 ATT 标准港页的页头。一般 Mean Springs ≈ 2 × Mean Neaps。比较「当天 Range」与这两个均值，就能立刻判断今天是「偏 Springs」还是「偏 Neaps」。",
            },
            {
              type: "heading",
              text: "潮流的几何：方向是「流向」不是「来源」",
            },
            {
              type: "paragraph",
              text: "潮流方向遵循「流向」(set) 约定——「潮流朝哪边流」，不是「潮流从哪边来」。这与风的方向相反（风用「来源」，045° 风意为风从东北吹来；潮流 045° 意为潮流朝东北流）。新手第一周经常搞反，每错一次都会把 CTS 算到反方向。",
            },
            {
              type: "definition",
              term: "Set & Drift（流向与流距）",
              meaning:
                "Set = 潮流的方向（True，遵循「朝向」约定，与风相反）。Drift = 潮流在一段时间内推动船的累积距离（如「1 小时内 2.0 海里」）。CTS 与 EP 计算里出现的潮流向量，方向取 Set，长度取 Drift。",
            },
            {
              type: "heading",
              text: "强流海域：海角、海峡、入口",
            },
            {
              type: "paragraph",
              text: "潮流在开阔海面通常 0.5–1.5 节，但在三类地方会大幅加速：① 海角（cape / headland）——海水绕过陆地凸出处，流速翻 2–3 倍；② 海峡（narrow channel / strait）——海水被挤压通过窄处；③ 港口入口（harbour entrance）——涨退潮时大量海水进出。在这些地方潮流可以达到 4–6 节甚至更高（如英国 Portland Bill 大潮时 7 节）。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "「Wind against tide」是浪的放大器",
              body:
                "当风向与潮流方向相反时，海面会被「立起来」——浪短而陡，破裂频繁，远比同等风速下顺流时危险。强流海角附近，「逆风潮」时段（HW 前后）经常出现 3–4 米陡浪，新手船不应在此时通过。规划航段时永远要查「我穿过这片强流时，是顺流还是逆流？风向如何？」",
            },
            {
              type: "heading",
              text: "Slack water：潮汐转向的「窗口」",
            },
            {
              type: "paragraph",
              text: "潮流不只是「在 HW 时最大」——实际上潮流的转向时刻（slack water）与潮高的 HW/LW 时刻并不重合。在多数海域，潮流的 set 在 HW 前 2–3 小时与 HW 后 2–3 小时之间反向。所以「HW 时刻」实际上常常是潮流最弱、甚至接近停滞的时段——这就是 slack water（憩流期）。它对船长来说是「最容易通过的窗口」——潮流弱、横推少、舵效好。",
            },
            {
              type: "paragraph",
              text: "Slack water 通常持续 20–40 分钟，之后潮流反向、速度逐渐增大到下一个峰值。Tidal Stream Atlas 上你会看到 HW + 0 或 HW + 6 那一页几乎全是「0.0 / 0.0」或非常小的数字——那就是 slack water 的写照。窄水道、海峡、强流入口的「最佳通过时刻」一般取 slack water 前后 30 分钟内，避开峰值流速。",
            },
            {
              type: "definition",
              term: "Slack Water（憩流期）",
              meaning:
                "潮流方向反转、流速接近零的时段，通常持续 20–40 分钟。多数海域在 HW 与 LW 前后出现。是船长通过强流水道的首选窗口——潮流弱、操船容易、风险低。",
            },
            {
              type: "paragraph",
              text: "实操：规划穿过强流海角的航段时，把「到达海角的时刻」对准 slack water 前 30 分钟左右——这样你正好在最弱潮流时通过，且不久后开始的顺流还能推你一把。这与 4.2 节将讲的 tidal gate 思维直接相关——掌握这一点，跨海航段的窗口选择就有了几何依据。",
            },
            {
              type: "paragraph",
              text: "潮流也有「线性 ramp up / ramp down」的特性：slack 之后流速不是突然达到峰值，而是大约按正弦曲线的一半涨上去——slack 后 1 小时约峰值的一半、2 小时约峰值的 80%、3 小时左右达到峰值。所以即使你赶不上 slack 当时，slack 后 30 分钟到 1 小时通过依然温和。这给了船长比想象中更宽的「软窗口」——不必盯死分钟级，1 小时余量都是安全的。",
            },
            {
              type: "practice",
              prompt:
                "去 OpenCPN 加载任意一张含 tidal diamond 的 ENC 海图（英国海域很多）。选一个 diamond，对照下载的免费 Tidal Stream Atlas（部分公共领域版本可获取），验证两者数据是否一致。然后假设今天 Range 在 Springs 与 Neaps 中间，估算该 diamond 在 HW + 2 时刻的当天速率。",
              hint:
                "Atlas 数据精度低一些（按方块给），Diamond 精度高（精确到坐标点）。两者应该大致吻合。",
            },
          ],
          quiz: [
            {
              id: "q-4-1-1",
              q: "Tidal Stream Atlas 的时间参考通常是？",
              options: [
                "本地时间 12:00",
                "GMT 06:00",
                "某参考标准港的 HW 时刻 ± 6 小时",
                "潮汐表给出的第一个 HW",
              ],
              correct: 2,
              explanation:
                "Atlas 用「HW Dover」(或当地参考港) ± 6 小时为时间索引——一本 12 页覆盖完整潮汐周期。先查参考港当天 HW 时刻，再算「现在距 HW 几小时」，翻到对应页。",
              topic: "Atlas 时间参考",
            },
            {
              id: "q-4-1-2",
              q: "海图上某 tidal diamond 给出 HW + 3 时方向 110° T、Springs 3.0 节 / Neaps 1.4 节。今天 Range 接近 Mean Springs。该时刻潮流估为？",
              options: [
                "方向 110°、约 1.4 节",
                "方向 110°、约 3.0 节",
                "方向 290°（反向）、约 3.0 节",
                "方向 110°、约 4.4 节",
              ],
              correct: 1,
              explanation:
                "当天 Range 接近 Mean Springs，直接用 Springs 值 3.0 节。方向不变（潮流方向只随时间变，不随大小潮变）。",
              topic: "Springs/Neaps 插值",
            },
            {
              id: "q-4-1-3",
              q: "潮流方向 075° T 意为？",
              options: [
                "潮流从东北方向（075°）吹来",
                "潮流朝东北方向（075°）流去",
                "潮流方向不确定，075° 是流速",
                "潮流朝 075° 的反方向（255°）流",
              ],
              correct: 1,
              explanation:
                "潮流方向遵循「朝向」(set) 约定——「往哪流」。与风的「来源」约定相反。新手最容易搞反，导致 CTS 算到反方向。",
              topic: "潮流方向",
            },
            {
              id: "q-4-1-4",
              q: "下列哪一类海域最不容易出现强潮流？",
              options: [
                "海角（headland）",
                "狭窄海峡",
                "港口入口",
                "开阔无障碍的海面中部",
              ],
              correct: 3,
              explanation:
                "强潮流通常出现在地形受限处——海角、海峡、港口入口都会让水流加速。开阔海面潮流通常 0.5–1.5 节，温和。",
              topic: "强流海域",
            },
          ],
        },
        {
          slug: "tidal-stream-vectors",
          index: "4.2",
          title: "潮流向量在推算里的用法",
          summary:
            "1 小时一格、3 小时一段——多时段 EP 是真实跨海航段每天都做的活。学会画这种「时间分段叠加」，你就脱离了入门阶段。",
          duration: "约 70 分钟",
          ryaSyllabusItems: [
            "Day Skipper Theory G4.13 — Plotting tidal vectors hour by hour",
            "Day Skipper Theory G4.14 — Multi-hour estimated position",
            "Day Skipper Theory G4.15 — Set and drift cumulative effects",
            "Day Skipper Theory G4.16 — Tidal gates and weather windows",
          ],
          outcomes: [
            "能画出「一小时一格」的多时段潮流向量叠加，得到精确 EP",
            "理解 Set & Drift 的累积效应——3 小时内潮流方向可能旋转 90° 以上",
            "能完成一道完整 EP 计算题：3 小时航程跨过两个 tidal diamond",
            "形成「按潮流时刻表出门」的窗口期思维——什么叫 tidal gate",
          ],
          body: [
            {
              type: "paragraph",
              text: "上一节学会了查潮流数据。这一节把数据落到海图上——画成向量，叠加在你的航迹上，得到真实的 EP。Day Skipper 实操里没有比这更核心的能力：能不能在 3 小时内画一段跨潮流方块的 EP，决定了你在没有 GPS 时能否独立航行。",
            },
            {
              type: "heading",
              text: "一小时一格：基本工作流",
            },
            {
              type: "paragraph",
              text: "潮流每小时都在变（方向和速度），所以多小时航段不能用「一个潮流向量打天下」。标准做法是：把航段按 1 小时分段，每小时画一个 DR 段 + 一个潮流向量段，最后把所有潮流向量串起来从 DR 终点偏移到 EP 终点。",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "从起点 A 沿计划航向（CTS 或航向）画第 1 小时的船速向量（如 5 节船速 = 5 nm 长），终点标 DR₁",
                "在 DR₁ 处叠加第 1 小时的潮流向量（方向 = 当小时 set，长度 = 当小时 drift），终点标 EP₁",
                "从 EP₁ 出发画第 2 小时的船速向量，长度同上、方向仍是 CTS——终点标 DR₂",
                "在 DR₂ 处叠加第 2 小时的潮流向量（注意：这是「下一小时」的潮流，方向可能已变），终点标 EP₂",
                "重复，直到航段末。EPₙ 就是 n 小时后船的估计位置。",
              ],
            },
            {
              type: "diagram",
              kind: "wind-shift-vmg",
              caption: "图 4.2 · 3 小时多段 EP 累积：每小时船速向量与潮流向量叠加，潮流方向可能逐小时变化",
            },
            {
              type: "callout",
              tone: "note",
              title: "「DR 与 EP 同时画」的好处",
              body:
                "把 DR 与 EP 都标在海图上的好处：如果中途取一个 fix，能立刻看出「fix 落在 DR 上还是 EP 上还是两者之外」。落在 EP 附近 = 你的潮流估算准；落在 DR 附近 = 实际潮流弱于预报；都不在 = 你的船速估错了或航向偏了。这种诊断信息是导航复盘的金矿。",
            },
            {
              type: "heading",
              text: "Set & Drift 的累积效应",
            },
            {
              type: "paragraph",
              text: "一个常被低估的事实：3 小时航段中，潮流方向可能整体旋转 90° 以上。例如 HW 之前 1 小时是 250° / 1.8 节，HW 时刻是 320° / 1.5 节，HW 之后 1 小时是 030° / 1.2 节——3 小时里方向从西南转到东北。如果你简单用「平均潮流」算 CTS，最后会发现自己被推到一个完全意外的位置。",
            },
            {
              type: "paragraph",
              text: "正确做法：每小时单独画向量，串成「Z 字形」累积量。把这条 Z 字形的总位移（从起点画到末段终点的直线）当作整段的「等效潮流向量」——这才是真实的累积推力。",
            },
            {
              type: "heading",
              text: "完整示范题：3 小时跨两个 diamond",
            },
            {
              type: "paragraph",
              text: "题目：你从 A 点起航，目标 B 点。航段总计 18 海里、计划真航向 095° T、船速 6 节、预计 3 小时航程。HW Dover 时刻 1230，你 1100 起航（即 HW − 1:30 → HW + 1:30 时段）。航段经过两个 tidal diamond，资料如下：",
            },
            {
              type: "table",
              headers: ["小时", "时刻", "Diamond P (前半航段)", "Diamond Q (后半航段)"],
              rows: [
                ["第 1 小时", "1100–1200 (HW − 1)", "180° / 1.5 节", "210° / 1.4 节"],
                ["第 2 小时", "1200–1300 (HW)", "200° / 1.8 节", "250° / 1.6 节"],
                ["第 3 小时", "1300–1400 (HW + 1)", "230° / 1.5 节", "280° / 1.3 节"],
              ],
            },
            {
              type: "paragraph",
              text: "假设当天 Range 接近 Mean Springs（数据用 Springs 值）。第 1、2 小时船经过 Diamond P 海域，第 3 小时进入 Diamond Q 海域。求 3 小时后的 EP。",
            },
            {
              type: "paragraph",
              text: "第一步：每小时船速向量。沿 095° T、长 6 nm，共 3 段。3 小时后 DR 位置 = A + 18 nm × (sin 095°, cos 095°) ≈ A 东 17.9 nm、北 −1.6 nm（向南 1.6 nm）。",
            },
            {
              type: "paragraph",
              text: "第二步：每小时潮流向量。第 1 小时 P: 180° / 1.5 nm（正南 1.5 nm）。第 2 小时 P: 200° / 1.8 nm（南偏西 ~ 0.6 nm 西、1.7 nm 南）。第 3 小时 Q: 280° / 1.3 nm（西偏北 ~ 1.28 nm 西、0.23 nm 北）。",
            },
            {
              type: "paragraph",
              text: "第三步：累积潮流位移（向量求和）。东向累计：0 + (−0.6) + (−1.28) = −1.88 nm（向西 1.88 nm）。北向累计：(−1.5) + (−1.7) + 0.23 = −2.97 nm（向南 2.97 nm）。",
            },
            {
              type: "paragraph",
              text: "第四步：EP = DR + 累积潮流。东向：17.9 − 1.88 = 16.0 nm 东。北向：−1.6 − 2.97 = −4.57 nm（即向南 4.57 nm）。EP 在 A 的东偏南方向：距 A 约 √(16² + 4.57²) ≈ 16.6 nm，方位 ≈ 106° T。",
            },
            {
              type: "paragraph",
              text: "第五步：解读。如果 B 在 095° T 上、距 A 18 nm，那 EP（106° T、16.6 nm）会落在 B 的下风一侧约 2.5 nm。你需要重新算 CTS——目标方位 095° T 但要预扣潮流位移，CTS 比 095° 偏北约 10°，即 CTS ≈ 085° T。再用 CADET 转 C、加 leeway。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "实操简化：「累积潮流向量法」",
              body:
                "上面的算法是教学版。实操中船长通常用一个简化：先把 3 小时累积潮流位移当作单一向量从 A 出发画一条「等效流向量」，从这条向量末端画船速弧交目标线——一次性求出 CTS。结果与逐小时画 EP 一致，但画图量减半。Day Skipper 笔试两种都会考。",
            },
            {
              type: "heading",
              text: "Tidal Gate：按潮流时刻表出门",
            },
            {
              type: "paragraph",
              text: "潮流的窗口性最极端体现在 tidal gate——「潮汐闸门」。某些海峡、海角、入口处，潮流速度足够快（4 节以上），与你的船速（5–6 节）量级相同。逆流时实际 SOG 只剩 1–2 节，航段时间翻倍甚至更糟；顺流时 SOG 可达 9–10 节，效率翻倍。所以这些地方必须按潮流时刻表出门——错过窗口 30 分钟，要等下一个潮汐周期 6 小时。",
            },
            {
              type: "definition",
              term: "Tidal Gate（潮汐闸门）",
              meaning:
                "某段海域因潮流强烈，只有在「顺流时段」才适合通过。错过窗口要等下一个 12.5 小时周期。著名例子包括英国 Portland Bill、苏格兰 Pentland Firth、法国 Raz de Sein。窗口长度通常 2–4 小时（顺流期）+ 1 小时余量。",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "出发前 24 小时：查参考港 HW 时刻、计算 tidal gate 顺流时段",
                "出发前 6 小时：决定起航时间，使船到达 tidal gate 时正好处在顺流期开始 + 30 分钟",
                "进入 tidal gate 之前 1 小时：取 fix，确认 SOG 与 CTS 还在计划内；若已落后，立刻评估「是否还能赶上窗口」",
                "通过 tidal gate 之后：进入「松」节奏，可降速、休整，准备下一段",
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "「错过窗口怎么办」预案",
              body:
                "如果在窗口期前发现自己赶不上：① 早期发现（窗口前 > 3 小时）—— 调整航向走更短路径、或选择绕开 tidal gate 的备用路线；② 晚期发现（窗口前 < 1 小时）—— 选最近 bolt hole 抛锚等待下一个潮周期。最差的选择：硬冲，逆 4 节流开 6 小时——耗油、耗体力、增加事故概率。",
            },
            {
              type: "paragraph",
              text: "最后一个实操经验：在多小时航段中，「fix 取得勤」比「向量画得精」更重要。哪怕你逐小时画了完美的潮流向量，3 小时累积下来误差仍可能 1 海里以上——因为潮流数据本身有 20% 的误差、船速可能与你估的不同、leeway 也是估算。每 1.5–2 小时取一个 fix（视觉、雷达、或 GPS）把 EP 校准回真实位置，下一段重新画。EP 是「未取 fix 时的最佳估计」，不是「永久的真理」。这种节奏感，是 Day Skipper 与 Coastal Skipper 实操评估的核心打分项。",
            },
            {
              type: "practice",
              prompt:
                "用 EasyTide 或 OpenCPN 找一个你熟悉海域的 tidal gate（如海角、入口）。① 查未来一周 7 天的 HW 时刻；② 算出每天该 gate 的「最佳通过窗口」（顺流开始后 30 min 到结束前 30 min）；③ 选一天，规划一段从 30 海里外出发、要刚好赶上窗口的航程，给出起航时刻。",
              hint:
                "起航时刻 = 窗口起点时刻 − (30 海里 / 你的预期 SOG)。如果 SOG 估为 5 节，那就是窗口起点 − 6 小时。",
            },
            {
              type: "paragraph",
              text: "海图、罗经、潮高、潮流——这门课讲完了，但你的真正训练才开始。下次出海，把「DR、EP、Fix」「CTS、CADET」「Springs、Neaps、12 分之 1」这些缩写一个一个落到纸上。每出一次海写一次自己的潮汐预案。一年之后，你看到一张海图与潮汐表的反应速度，会和初学时完全不同。",
            },
          ],
          quiz: [
            {
              id: "q-4-2-1",
              q: "在多小时航段中画 EP，正确的做法是？",
              options: [
                "用整段平均潮流向量一次画完",
                "每小时单独画 1 段船速向量 + 1 段潮流向量，依次叠加",
                "只画起点和终点，中间不算",
                "只用 GPS 标位置，不画 DR/EP",
              ],
              correct: 1,
              explanation:
                "潮流方向和速度逐小时变化——3 小时航段里方向可能旋转 90°。必须每小时单独画向量、依次叠加才能得到准确 EP。用平均值会让累积误差暴增。",
              topic: "多段 EP",
            },
            {
              id: "q-4-2-2",
              q: "你计划穿过一个 tidal gate（潮流可达 5 节），最理想的通过时段是？",
              options: [
                "顺流时段的中段，剩余窗口 1.5 小时以上",
                "逆流时段的中段，挑战自我",
                "潮汐转向（slack water）的瞬间",
                "随便什么时候，反正都能开过去",
              ],
              correct: 0,
              explanation:
                "顺流中段时段最稳——潮流推你过去、SOG 高、剩余窗口充裕。Slack water 瞬间虽然流速最小但窗口短；逆流时段会耗时数倍且耗油。",
              topic: "Tidal Gate",
            },
            {
              id: "q-4-2-3",
              q: "「Set & Drift」中 set 是？",
              options: [
                "潮流的速度",
                "潮流的方向（朝向哪流，真方位）",
                "潮流的强度系数",
                "潮汐表的设定时间",
              ],
              correct: 1,
              explanation:
                "Set = 潮流的方向（True，「朝向」约定，与风的来源约定相反）。Drift = 潮流推动船的累积距离（如 1 小时 2 nm）。CTS 与 EP 计算里 set 决定向量方向、drift 决定向量长度。",
              topic: "Set & Drift",
            },
            {
              id: "q-4-2-4",
              q: "假设你在某 3 小时航段中三段潮流分别为 180°/1.5 节、200°/1.8 节、280°/1.3 节。下列哪一项描述最准确？",
              options: [
                "三段方向接近，可用平均值估算",
                "潮流方向在 3 小时内整体旋转约 100°，必须分段画向量",
                "潮流方向无关紧要，只看总距离",
                "潮流应取最大那一段作为整段代表",
              ],
              correct: 1,
              explanation:
                "180° → 280° 旋转 100°，意味着潮流前期向南推、后期向西推。如果用单一平均值，方向和大小都会算错。必须每小时画一段向量、累积求和。",
              topic: "潮流累积",
            },
          ],
        },
      ],
    },
  ],
  exam: {
    durationMinutes: 90,
    passMark: 70,
    refersTo: "RYA Day Skipper Theory · Chartwork & Tides",
    brief:
      "这套期末考共 30 题题库，按 4 个模块比例分布：海图与罗经修正 7 题、推算航法 8 题、潮高 8 题、潮流 7 题。每次开卷随机抽 12 题、限时 90 分钟、及格线 70%。题目可以重做，每次会抽新题——刷到把所有计算题闭着眼也能算对，再去参加 RYA 笔试就稳了。计算题占至少一半，建议手边备好铅笔、纸、计算器。",
    questions: [
      {
        id: "exam-1",
        q: "你在墨卡托海图上量取 A 到 B 的距离。两点都在北纬 50° 附近。正确做法是？",
        options: [
          "在图底部经度刻度上量",
          "在图侧面纬度刻度上量，与 A、B 同纬度",
          "在图角落罗经盘上量",
          "GPS 直接读",
        ],
        correct: 1,
        explanation:
          "1 分纬度 = 1 海里，永远成立。要在与待量两点同纬度的位置（图两侧）量，避免高纬拉伸误差。经度刻度在高纬被严重压缩，绝不可用。",
        topic: "海图基础",
      },
      {
        id: "exam-2",
        q: "海图右下角写「Soundings in metres reduced to Chart Datum which is approximately LAT」。这句话的实际意义是？",
        options: [
          "海图水深永远等于真实水深",
          "海图水深以最低天文潮位为零点，实际水深通常 ≥ 图上数字",
          "海图水深以 MSL 为零点",
          "海图水深包含潮汐修正",
        ],
        correct: 1,
        explanation:
          "Chart Datum ≈ LAT，是「保守底线」。任何时刻实际水深 = 海图水深 + 当时潮高。CD 不取 MSL（MSL 上下都有可能）。",
        topic: "海图基础",
      },
      {
        id: "exam-3",
        q: "海图上灯标符号写「Fl(3)WR.10s12M」。下列解读哪一项最正确？",
        options: [
          "Flashing 红白光、3 组一闪、周期 10 秒、12 海里能见距离",
          "白光 3 米高",
          "Fixed 红光 10 秒",
          "扇区灯 12 个",
        ],
        correct: 0,
        explanation:
          "Fl(3) = 3 闪一组、WR = 白红双色（不同扇区不同色）、10s = 周期 10 秒、12M = nominal range 12 海里。",
        topic: "海图符号",
      },
      {
        id: "exam-4",
        q: "真航向 T = 215°，当地 V = 4°W，朝向自差 D = +3°E。舵手罗航向是？",
        options: [
          "216°",
          "214°",
          "212°",
          "218°",
        ],
        correct: 0,
        explanation:
          "T → C 反向：T 215° + V 4°W (反向 W 加) = M 219°。M 219° − D 3°E (反向 E 减) = C 216°。",
        topic: "CADET 计算",
      },
      {
        id: "exam-5",
        q: "罗经玫瑰标「5°10′W 2018 (7′E annual change)」。2026 年此处变化角约为？",
        options: [
          "5°10′W",
          "4°14′W",
          "6°06′W",
          "0°10′W",
        ],
        correct: 1,
        explanation:
          "8 年 × 7′E = 56′E 东漂。原 5°10′W 向东漂 56′，W 值减少 56′ = 0°56′，得 5°10′ − 0°56′ = 4°14′W。",
        topic: "变化角更新",
      },
      {
        id: "exam-6",
        q: "下列哪一种 LOP（位置线）几何精度最高？",
        options: [
          "1 条手持罗经方位线",
          "1 条 transit（两个地标连成一线）",
          "1 条远距离（> 6 海里）方位",
          "1 条粗略目测距离弧",
        ],
        correct: 1,
        explanation:
          "Transit 不依赖任何仪表——两个已知地标视线对齐时船就在延长线上，没有罗经读数误差。是精度最高的 LOP，也是港口入口设 leading marks 的原因。",
        topic: "LOP",
      },
      {
        id: "exam-7",
        q: "你在港口外用罗经对岸上灯塔取方位 C = 080°。V = 3°W、D = +1°E。该灯塔的真方位是？",
        options: [
          "076°",
          "078°",
          "082°",
          "084°",
        ],
        correct: 1,
        explanation:
          "C → T 正向：C 080° + D 1°E (E 加) = M 081°。M 081° − V 3°W (W 减) = T 078°。这是要画在海图上的真方位线。",
        topic: "CADET 计算",
      },
      {
        id: "exam-8",
        q: "DR、EP、Fix 三者中，最不依赖任何外部测量的是？",
        options: [
          "DR",
          "EP",
          "Fix",
          "三者依赖度相同",
        ],
        correct: 0,
        explanation:
          "DR 只用「上一个已知点 + 航向 + 船速 + 时间」，不需要外部测量；EP 在 DR 上加潮流和风压（要查 atlas/diamond）；Fix 要至少 2 个 LOP（要看岸标或测距）。DR 是最简化的「我假设无外力」位置。",
        topic: "位置类型",
      },
      {
        id: "exam-9",
        q: "下列对 Fix 的描述哪一项最准确？",
        options: [
          "GPS 给出的坐标",
          "任意一条位置线",
          "≥ 2 条独立位置线交叉得到的位置",
          "船长经验估算的位置",
        ],
        correct: 2,
        explanation:
          "Fix = position fix = 独立位置线交叉验证的位置。GPS 可以是 Fix 来源之一，但传统视觉/雷达 Fix 同样有效。一条 LOP 不构成 Fix——船在那条线的任意位置都可能。",
        topic: "Fix 定义",
      },
      {
        id: "exam-10",
        q: "你打算从 A 到 B（A→B 真方位 060° T、距离 10 nm），船速 5 节，潮流 030° T / 1.5 节。下列对 CTS 的合理估计是？",
        options: [
          "CTS ≈ 060° T（与目标方位相同）",
          "CTS ≈ 045° T（偏向潮流来源一侧）",
          "CTS ≈ 075° T（偏离潮流来源一侧，即向南偏）",
          "CTS ≈ 090° T",
        ],
        correct: 2,
        explanation:
          "潮流 030° T 把船向东北推，目标在东偏北 (060°)。CTS 需要「顶」潮流——朝目标方位的「下流一侧」偏（即向南偏，075° T 左右）。这是 CTS 三角形求解的几何结果。",
        topic: "CTS 计算",
      },
      {
        id: "exam-11",
        q: "标准 CTS 向量三角形画法的正确顺序是？",
        options: [
          "从 B 画船速、从 A 画潮流",
          "从 A 画潮流向量到 T，从 T 用船速 1 小时长度画弧交目标线于 X，T→X 为 CTS",
          "从 A 画船速、从 B 画潮流",
          "从 A→B 直线中点画潮流向量",
        ],
        correct: 1,
        explanation:
          "标准画法：起点 A 出潮流向量 → 终点 T；T 出船速向量长度的弧交目标线于 X；T→X 即 CTS。背后逻辑：1 小时内「先被潮流推一段」再「船自己开一段」，合起来落到目标线上。",
        topic: "向量三角形",
      },
      {
        id: "exam-12",
        q: "风从船的左舷（port）吹来，估算 leeway 7°。要让实际航迹保持在 CTS，舵手罗航向相对 CTS 应？",
        options: [
          "不变",
          "向右 7°（即增加 7°）",
          "向左 7°（即减少 7°）",
          "向右 14°",
        ],
        correct: 2,
        explanation:
          "风从左舷推船向右（下风方向）。要让实际航迹保持在 CTS 上，舵手让船头多偏向左——即罗航向减 leeway 7°。结果船被风「推回」CTS 方向。",
        topic: "Leeway",
      },
      {
        id: "exam-13",
        q: "「Spring tides」最准确的描述是？",
        options: [
          "只在春季出现",
          "每月新月或满月后 1–2 天出现的最大潮差时段",
          "每月上下弦时出现的潮差最小时段",
          "夏至时出现的特殊潮",
        ],
        correct: 1,
        explanation:
          "Spring 在这里是动词「涌起」，与季节无关。日地月一线时（新月/满月）引力叠加，潮差最大。每月约出现 2 次。",
        topic: "Springs/Neaps",
      },
      {
        id: "exam-14",
        q: "海图标某点水深 2.8m。当时潮高 1.6m。船吃水 1.5m、UKC 要求 0.7m。该点能通过吗？",
        options: [
          "能，剩余净空 2.9m > 0.7m",
          "能，水深 2.8m 已经够",
          "不能，水深 2.8m < 吃水 + UKC",
          "不能，潮高 1.6m 不够",
        ],
        correct: 0,
        explanation:
          "实际水深 = 2.8 + 1.6 = 4.4m。剩余净空 = 4.4 − 1.5 = 2.9m，远大于 UKC 0.7m。可以通过。这道题考「先加潮高、再算净空」的两步流程。",
        topic: "水深 + UKC",
      },
      {
        id: "exam-15",
        q: "12 分之 1 法则中，HW 起 6 小时每小时下降比例是？",
        options: [
          "1/12, 2/12, 3/12, 3/12, 2/12, 1/12",
          "1/6, 1/6, 1/6, 1/6, 1/6, 1/6",
          "3/12, 3/12, 2/12, 2/12, 1/12, 1/12",
          "1/12, 1/12, 1/12, 3/12, 3/12, 3/12",
        ],
        correct: 0,
        explanation:
          "1-2-3-3-2-1 是潮高正弦曲线的 6 段离散化。中间两小时合计下降 6/12 = 半 Range，HW/LW 附近变化慢。这是必背核心数。",
        topic: "12 分之 1",
      },
      {
        id: "exam-16",
        q: "副港 HW 时刻 1042、高度 4.2m；LW 时刻 1652、高度 0.6m。1342 时潮高约为？",
        options: [
          "3.3m",
          "2.4m",
          "1.5m",
          "0.9m",
        ],
        correct: 1,
        explanation:
          "Range = 4.2 − 0.6 = 3.6m。1342 = HW + 3h，累计下降 (1+2+3)/12 × 3.6 = 6/12 × 3.6 = 1.8m。潮高 = 4.2 − 1.8 = 2.4m。",
        topic: "12 分之 1 应用",
      },
      {
        id: "exam-17",
        q: "标准港 HW 0830 高 5.4m，副港时差 +0:35 / 高差 −0.6m。副港 HW 时刻与高度是？",
        options: [
          "0855，5.4m",
          "0905，4.8m",
          "0755，6.0m",
          "0905，5.4m",
        ],
        correct: 1,
        explanation:
          "副港 HW 时刻 = 0830 + 0:35 = 0905。副港 HW 高度 = 5.4 − 0.6 = 4.8m。+0:35 = 副港晚 35 分钟、−0.6m = 副港低 0.6 米。",
        topic: "副港换算",
      },
      {
        id: "exam-18",
        q: "「Falling tide」时进窄水道有什么风险？",
        options: [
          "潮流方向与水深无关",
          "万一蹭底，水位还在下降，搁浅会越来越严重",
          "潮流方向与船速无关",
          "无风险",
        ],
        correct: 1,
        explanation:
          "Falling tide（落潮）期间水位每分钟都在降。一旦蹭底，潮还在落，会越陷越深。窄水道要选 rising tide（涨潮）进——蹭底也能自动浮起。",
        topic: "潮汐 seamanship",
      },
      {
        id: "exam-19",
        q: "ATT 标准港页给出的「Mean Springs Range」与「Mean Neaps Range」典型比例约为？",
        options: [
          "Mean Springs ≈ Mean Neaps",
          "Mean Springs ≈ 2 × Mean Neaps",
          "Mean Springs ≈ 0.5 × Mean Neaps",
          "两者完全无关",
        ],
        correct: 1,
        explanation:
          "大潮潮差通常约为小潮的 2 倍——日地月叠加 vs 抵消的引力比。具体数值随地点不同，但 ≈ 2 倍是常见近似。",
        topic: "Range 比例",
      },
      {
        id: "exam-20",
        q: "你今天发现 Range 接近 Mean Neaps Range。这意味着什么？",
        options: [
          "今天是大潮，潮差大、潮流强",
          "今天是小潮，潮差小、潮流弱",
          "潮汐异常",
          "GPS 故障",
        ],
        correct: 1,
        explanation:
          "Range 接近 Mean Neaps = 小潮。潮差小（适合需要小水位差的入港）、潮流弱（跨潮流海域容易）。这是规划航段时第一眼要看的信号。",
        topic: "Springs/Neaps 判断",
      },
      {
        id: "exam-21",
        q: "你打算让船下午 1300 时在某副港抛锚。该副港 HW = 1010（4.4m）、LW = 1620（0.8m），锚点海图水深 1.0m。1300 时实际水深约为？",
        options: [
          "1.7m",
          "2.5m",
          "3.7m",
          "4.4m",
        ],
        correct: 2,
        explanation:
          "Range = 4.4 − 0.8 = 3.6m。1300 = HW + 2h 50min ≈ HW + 3h。累计下降 6/12 × 3.6 = 1.8m。潮高 = 4.4 − 1.8 = 2.6m。注：题中要的是实际水深 = 海图水深 + 潮高 = 1.0 + 2.6 = 3.6m。最接近答案是 3.7m（圆整）。",
        topic: "综合潮高题",
      },
      {
        id: "exam-22",
        q: "潮流方向 075° T 意为？",
        options: [
          "潮流从东北方向 075° 来",
          "潮流朝东北方向 075° 流去",
          "潮流方向 075° 是流速代号",
          "潮流朝 255° 反方向流",
        ],
        correct: 1,
        explanation:
          "潮流方向遵循「set」(朝向) 约定——朝哪边流。这与风的方向约定（来源）相反。新手最常搞反，会把 CTS 算到反方向。",
        topic: "潮流方向",
      },
      {
        id: "exam-23",
        q: "Tidal Stream Atlas 的时间索引通常是？",
        options: [
          "本地时间 12:00",
          "某参考港 HW ± 6 小时",
          "潮汐表第一个 HW",
          "GMT 00:00",
        ],
        correct: 1,
        explanation:
          "Atlas 用「HW Dover」或类似参考港 ± 6 小时索引页码。先查参考港当天 HW 时刻，然后算「现在距 HW 几小时」，翻到对应页。",
        topic: "Atlas 索引",
      },
      {
        id: "exam-24",
        q: "海图 tidal diamond 给 HW − 2 时方向 290° T、Springs 2.6 节 / Neaps 1.2 节。今天 Range 在两者中间。该时刻潮流估为？",
        options: [
          "方向 290°、约 1.2 节",
          "方向 290°、约 1.9 节（中位插值）",
          "方向 290°、约 2.6 节",
          "方向 110°、约 1.9 节",
        ],
        correct: 1,
        explanation:
          "Range 在 Springs 与 Neaps 之间时，按比例插值。中位时取算术平均：(2.6 + 1.2) / 2 = 1.9 节。方向不变（潮流方向只随时间变，不随大小潮变）。",
        topic: "Springs/Neaps 插值",
      },
      {
        id: "exam-25",
        q: "下列哪一类地形最不容易出现强潮流？",
        options: [
          "海角",
          "狭窄海峡",
          "港口入口",
          "开阔无障碍海面中部",
        ],
        correct: 3,
        explanation:
          "强潮流通常出现在地形受限的地方——海角、海峡、港口入口都会让水流加速。开阔海面潮流通常温和（0.5–1.5 节）。",
        topic: "强流海域",
      },
      {
        id: "exam-26",
        q: "你 3 小时航段中三段潮流分别为 200°/1.5 节、240°/1.7 节、290°/1.4 节。下列做法哪一项最准确？",
        options: [
          "取平均方向和平均流速一次算完",
          "每小时单独画潮流向量、依次叠加",
          "只用第一小时数据估算",
          "潮流可以忽略",
        ],
        correct: 1,
        explanation:
          "3 小时内方向从 200° 转到 290°（90° 偏转），用平均值会让两个方向的横分量相互抵消，估出错误的累积位移。必须每小时单独画向量、累加。",
        topic: "多段 EP",
      },
      {
        id: "exam-27",
        q: "「Tidal Gate」最准确的描述是？",
        options: [
          "港口入口的浮标",
          "某段海域因潮流强烈，只在顺流时段适合通过，错过窗口要等下一个潮汐周期",
          "潮汐表的封面",
          "VHF 通信频道",
        ],
        correct: 1,
        explanation:
          "Tidal Gate = 潮汐闸门。在 Portland Bill、Pentland Firth 等强流处，逆流时船速被抵消甚至变负。必须按潮流时刻表出门，错过窗口要等下一个 12.5 小时周期。",
        topic: "Tidal Gate",
      },
      {
        id: "exam-28",
        q: "你计划 1100 起航，要让船 1430 进入某 tidal gate 的顺流窗口（窗口开始 1430）。船速 5 节、CTS 距离 17.5 nm。下列哪一项判断最合理？",
        options: [
          "起航时间正合适，3h 30min 跑 17.5 nm",
          "起航时间太早，会提前到达",
          "起航时间太晚，赶不上窗口",
          "无法判断",
        ],
        correct: 0,
        explanation:
          "1100 起航、1430 到达 = 3h 30min。距离 17.5 nm / 5 节 = 3.5h = 3h 30min。正好吻合。但实操中要预留 30 min 余量——5h 节潮流加成可能让 SOG 高于船速，需要现场调整。",
        topic: "窗口期计算",
      },
      {
        id: "exam-29",
        q: "你穿过 tidal gate 时，潮流 5 节顺流、船速 6 节、目标方位与潮流方向一致。SOG 约为？",
        options: [
          "1 节",
          "5 节",
          "6 节",
          "11 节",
        ],
        correct: 3,
        explanation:
          "潮流顺向时 SOG = 船速 + 潮流速 = 6 + 5 = 11 节。逆向时则 SOG = 6 − 5 = 1 节。这是 tidal gate 的「11 节 vs 1 节」差距——窗口选对窗口选错的代价。",
        topic: "SOG 计算",
      },
      {
        id: "exam-30",
        q: "下列哪一种工作流最接近 RYA Day Skipper 推荐的「无 GPS 也能保持位置感知」做法？",
        options: [
          "全程靠 GPS，每小时记一次坐标",
          "每 30 min 画 DR、每 1h 叠加潮流画 EP、每 1–2h 用 LOP 取 fix 校准",
          "出港和入港时定位，中间靠记忆",
          "完全不画位置，到目的地附近再开始定位",
        ],
        correct: 1,
        explanation:
          "DR/EP/Fix 协同工作流是 Day Skipper 实操核心：DR 每 30 min 推算、EP 每小时叠潮流、Fix 每 1–2h 校准。GPS 是补充验证，不是替代。任何时段「不知道自己在哪」都是失职。",
        topic: "导航工作流",
      },
    ],
  },
  resources: [
    {
      title: "UKHO Admiralty Tide Tables (ATT)",
      description:
        "英国海军部官方出版的年度潮汐表，全球潮汐数据权威来源。覆盖 250 个标准港、数千个副港，是 RYA Day Skipper / Coastal Skipper 笔试与实操指定参考。",
      url: "https://www.admiralty.co.uk/publications/tide-tables",
      type: "book",
      free: false,
      guide:
        "ATT 分四卷：Vol 1 (UK & Ireland)、Vol 2 (Europe, Mediterranean, North Africa)、Vol 3 (Indian Ocean & South China Sea)、Vol 4 (Pacific Ocean)。买你航行海域对应的那一卷。书每年更新（新年版通常 9 月出），千万别用旧年的——HW 时刻会差几分钟到几十分钟。读法：先翻到标准港页查 HW/LW 时刻与高度，再翻到该港的副港列表（紧跟在标准港页之后）查时差与高差。每个港页头印有 Mean Springs / Mean Neaps Range，用来做大小潮插值。",
    },
    {
      title: "RYA Training Almanac",
      description:
        "RYA 官方训练用年鉴，专为 Day Skipper / Coastal Skipper 笔试与实操设计。包含简化版潮汐表、海图、习题、CADET 计算范例。",
      url: "https://www.rya.org.uk/shop",
      type: "book",
      free: false,
      guide:
        "Training Almanac 是 RYA 课堂指定教材之一，比 ATT 简单——只覆盖 UK 几个核心标准港 + 一打副港，但例题数量充足。学员推荐：把里面的「Tidal Heights Worked Examples」一道道做完，再做「Course to Steer Worked Examples」。两者各做 20 道，笔试基本无悬念。Almanac 也每年更新——但相比 ATT，旧版的例题方法不变，只是数据稍旧，预算紧时可以买二手。",
    },
    {
      title: "NOAA Tide Predictions",
      description:
        "美国国家海洋大气局的免费潮汐预报站。覆盖美国及部分国际港口，提供 HW/LW 时刻、潮汐曲线、潮流数据。是免费方案里数据质量最高的。",
      url: "https://tidesandcurrents.noaa.gov",
      type: "site",
      free: true,
      guide:
        "用法：① 进站点后输入港口名或选地图。② 找到对应站点，点击「Tide Predictions」。③ 选择「Daily」「Weekly」「Monthly」视图，可看图形化潮汐曲线（直观展示 12 分之 1 法则的形状）。④ 同站点的「Currents」标签提供潮流预报（限部分海域）。⑤ 数据可导出 CSV 或 PDF。优势：完全免费、支持 1 年内的预报。劣势：英国及欧洲海域覆盖不如 EasyTide 全。建议：北美航行用 NOAA、英国航行用 EasyTide、其他海域用 ATT。",
    },
    {
      title: "UKHO EasyTide",
      description:
        "英国海军部的免费潮汐查询网站。覆盖全球主要港口，未来 7 天免费查询，是 Day Skipper 学员日常练习的首选。",
      url: "https://easytide.admiralty.co.uk",
      type: "site",
      free: true,
      guide:
        "用法：① 注册免费账号（建议）以保存常用港口。② 在主页地图或搜索框选港口。③ 默认显示未来 7 天的 HW/LW 时刻、高度、潮汐曲线图。④ 点击具体某天可以看小时级潮高（自动应用 12 分之 1 类似插值）。⑤ 时区可在设置中切换 UTC / 本地时间——夏令时已自动处理。学习诀窍：选一个标准港 + 一个对应副港，分别查它们的潮汐表，对比看时差和高差是否与 ATT 一致——验证你自己的副港换算流程。",
    },
    {
      title: "OpenCPN with Tide & Current Plugin",
      description:
        "开源的电子海图与航海软件，支持 ENC/CM93 海图、潮汐潮流插件、AIS、GRIB 气象。许多入门学员用它代替商业 plotter。",
      url: "https://opencpn.org",
      type: "open-source",
      free: true,
      guide:
        "用法：① 从官网下载 OpenCPN（Mac/Win/Linux 均有），同时下载「Tide & Current」插件。② 加载免费 ENC 海图（美国 NOAA、英国 UKHO 部分免费、加拿大 CHS 免费）。③ 海图上会自动显示 tidal diamond 与潮流符号。点击 diamond 弹出小时级流速表格。④ 「Tide」工具栏可查指定港潮汐曲线。⑤ 用它做练习：把 ATT 的副港换算结果与 OpenCPN 给出的曲线对比，验证你算得对不对。优点：与商业 plotter 几乎相同体验，零成本练习。注意：作正式航行决策前，仍建议交叉验证官方 ATT 数据。",
    },
    {
      title: "RYA Day Skipper Theory Handbook",
      description:
        "RYA 官方 Day Skipper 笔试教材。完整覆盖海图作业、潮汐、气象、IRPCS、安全等所有笔试章节。是最贴合考试的中文/英文学习参考。",
      url: "https://www.rya.org.uk/shop/books/g15-day-skipper-shorebased-notes",
      type: "book",
      free: false,
      guide:
        "RYA 课程的学员每人一本。结构按笔试大纲编排，每章末有练习题（含答案）。学习建议：① 海图作业章节配合纸海图（RYA 教学海图 5052/5055）一起做，光看书无法掌握。② 潮汐章节的每道例题都自己重算一遍，不要看完答案就过。③ 与 WindHero WH-103 配合使用：先看 WH-103 的概念解释和示例，再做 Handbook 末尾的例题——你会发现解题速度比直接读 Handbook 快 3 倍。",
    },
    {
      title: "RYA Day Skipper Practice Charts",
      description:
        "RYA 官方教学海图（编号 5052、5055 等），专为 Day Skipper 笔试设计。包含模拟港口、副港、tidal diamond，可在上面反复练习而不弄脏真实海图。",
      url: "https://www.rya.org.uk/shop/books/g70-rya-training-chart",
      type: "chart",
      free: false,
      guide:
        "教学海图与真实海图同尺寸、同符号、同精度，但坐标和地名是虚构的——避免学员把练习与真实海域混淆。配合 Training Almanac 和 Day Skipper Theory Handbook，做模拟笔试题最贴合实战。买一对（标准港 5052 + 沿岸 5055），加上一把平行尺、一对分规、一支 2H 铅笔——这套是英国笔试模拟卷必备。",
    },
  ],
};
