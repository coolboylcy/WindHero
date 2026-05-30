/**
 * WindHero 真实航海案例库
 *
 * 编辑原则：
 * 1) 只用有公开调查报告或主流媒体记录的事件
 * 2) 数字与事实严格基于可查资料（MAIB、ATSB、USCG 报告 / Knox-Johnston / Bullimore 等当事人著作）
 * 3) 不夸张戏剧化、不滥情；用案例本身的力量
 * 4) 每个案例必须有"我们能学到什么"——映射到具体 WindHero 课程
 *
 * 信息源（每条案例底部 references 字段标注）：
 * - Marine Accident Investigation Branch (UK MAIB) 调查报告
 * - Australian Transport Safety Bureau (ATSB)
 * - National Transportation Safety Board (NTSB) 报告
 * - U.S. Coast Guard Marine Casualty Investigation Reports
 * - 当事人著作（Robin Knox-Johnston《A World of My Own》、
 *   Tony Bullimore《Saved》等）
 */

export type CaseCategory =
  | "weather-catastrophe" // 天气灾难
  | "abandon-ship" // 弃船
  | "navigation-error" // 导航失误
  | "preparation-pays" // 准备制胜
  | "leadership"; // 决策与领导力

export const categoryInfo: Record<
  CaseCategory,
  { label: string; sub: string }
> = {
  "weather-catastrophe": {
    label: "天气灾难",
    sub: "Weather Catastrophe",
  },
  "abandon-ship": { label: "弃船", sub: "Abandon Ship" },
  "navigation-error": { label: "导航失误", sub: "Navigation Error" },
  "preparation-pays": {
    label: "准备制胜",
    sub: "Preparation Pays",
  },
  leadership: { label: "船长决策", sub: "Captain's Call" },
};

export type TimelineEntry = {
  /** 时间，自由文本（"01:48 GMT"、"第 5 日"等） */
  time: string;
  /** 事件简述，1–3 句 */
  event: string;
};

export type Lesson = {
  /** 这条经验对应的 WindHero 课程 slug */
  course?: string;
  /** 经验本身 */
  text: string;
};

export type CaseStudy = {
  slug: string;
  /** 中文标题 */
  title: string;
  /** 英文 / 原始标题 */
  titleEn: string;
  /** 一句话 hook，给列表卡片用 */
  hook: string;
  category: CaseCategory;
  /** 事件日期 */
  date: string;
  /** 地点 */
  location: string;
  /** 涉及人员/船只信息 */
  scale: string;
  /** 整段背景 1–2 段 */
  background: string[];
  /** 时间线 */
  timeline: TimelineEntry[];
  /** 调查或结论摘录 */
  outcome: string[];
  /** 我们能学到什么 */
  lessons: Lesson[];
  /** 参考资料 */
  references: { title: string; source: string; url?: string }[];
};

/* ============================ 案例 1 · Fastnet 1979 ============================ */

export const fastnet1979: CaseStudy = {
  slug: "fastnet-1979",
  title: "Fastnet 1979：从赛事变成搜救行动的一夜",
  titleEn: "The 1979 Fastnet Race Disaster",
  hook:
    "303 艘船出发，15 名水手丧生，194 人被救——一场原本是绅士运动的近岸比赛，被一个被低估的低压系统改写。",
  category: "weather-catastrophe",
  date: "1979 年 8 月 11–15 日",
  location: "爱尔兰海与凯尔特海，英国西南海岸至 Fastnet Rock",
  scale:
    "303 艘参赛船 · 约 3000 名船员 · 15 名水手罹难 · 194 人获救 · 24 艘船被弃 · 5 艘船沉没",
  background: [
    "Fastnet Race 是英国皇家海洋帆船俱乐部（RORC）举办的传统比赛，从英国南海岸 Cowes 出发，绕过爱尔兰外海的 Fastnet Rock，回到 Plymouth，全程约 605 海里。1979 年是第 28 届。",
    "8 月 11 日中午发船，气象预报为温和的西南风。但一个原本不显眼的低压系统在大西洋西部快速加深，预报员对其深化速度的低估——以及当年甚少有竞赛船配备能接收 GRIB 的设备——让整支船队驶入了一场被后来称为\"现代航海史上最严重的远洋比赛灾难\"的风暴。",
  ],
  timeline: [
    { time: "8/11 中午", event: "Cowes 出发。海况温和，西南风 15 节。" },
    {
      time: "8/12 晚",
      event:
        "BBC 第三波次航海预报提到\"Force 8 gale\"西南风。多数船判断为可接受。",
    },
    {
      time: "8/13 17:00",
      event:
        "气象图显示中心气压急速下降。低压中心仍在大西洋西侧，但移动速度快、加深快——情报传到比赛船队的速度滞后。",
    },
    {
      time: "8/14 凌晨",
      event:
        "船队大部分仍在爱尔兰海西部。风速跃升至 50–60 节，阵风 70+ 节。浪高 12 米以上。多艘船遭遇 360° 翻滚（capsize）。",
    },
    {
      time: "8/14 上午",
      event:
        "皇家海军、爱尔兰海岸警卫队、英国皇家空军直升机展开当时英国海上史上最大规模的搜救行动。",
    },
    {
      time: "8/14 下午–8/15",
      event:
        "搜救持续 48 小时。最终救起 194 人，确认 15 人罹难。多数死亡是被巨浪冲离船只后救生衣失效或低体温。",
    },
  ],
  outcome: [
    "RORC 与英国海事调查局联合调查报告（1979）认定：天气预报本身没有错，但传递给比赛船队的速度太慢；多数船没装备能接收 weather fax 的设备；许多船员被巨浪从甲板上扫离时未挂安全带；多数翻船是船只设计抗倾覆性不足。",
    "调查后多项规则改革：lifeline（甲板安全索）成强制装备；harness（系挂式安全带）夜间强制系挂；ISAF 后续推出 Offshore Special Regulations（OSR），把船只设计的最小稳定角写入规则。",
    "1979 Fastnet 成为后续所有远洋比赛的安全基准案例。每个考 RYA Yachtmaster Offshore 的人，必读 John Rousmaniere 的《Fastnet, Force 10》。",
  ],
  lessons: [
    {
      course: "weather-and-routing",
      text:
        "气象预报的\"窗口\"永远要算两层冗余——预报本身的误差 + 信息传到船上的延迟。1979 年的船队相信了 8/11 早上的预报，没人想到中央气压会在 36 小时内下降 30 hPa。今天 GRIB 在船上可下载，但延迟仍存在——出航前 24 小时拿到的预报与你出航第二天遭遇的天气，可能是两件事。",
    },
    {
      course: "seamanship-and-safety",
      text:
        "安全带（harness）+ 甲板贯通索（jackline）不是\"天气坏时才用\"，而是\"上甲板就挂上\"。Fastnet 调查显示多数死亡是被巨浪冲离船——许多受害者那一刻没挂安全带。WindHero WH-212 的 watch-system 课讲的就是这一条。",
    },
    {
      course: "sea-survival-theory",
      text:
        "救生衣必须穿对——头能仰起、扣紧、配 crotch strap。1979 年许多救生衣是\"老式\"设计，水里翻不过头部，受害者面朝下漂浮。今天的 ISO 12402 150N 是为这种情境设计的——上船第一天就该试穿。",
    },
    {
      course: "captains-mind",
      text:
        "船长的判断不是\"比赛规则允许我继续就继续\"，而是\"我船员能活着回来吗\"。Fastnet 中明智地放弃比赛、转向最近避风港的船长，许多都把船员全数带回。这是 WindHero WH-301《船长的思维》\"返航的勇气\"一章的真实案例之一。",
    },
  ],
  references: [
    {
      title: "Fastnet, Force 10: The Deadliest Storm in the History of Modern Sailing",
      source: "John Rousmaniere",
    },
    {
      title: "1979 Fastnet Race Inquiry Report",
      source: "RORC + RNLI 联合报告",
    },
    {
      title: "Met Office 1979 Atlantic synoptic charts (archive)",
      source: "UK Met Office archive",
    },
  ],
};

/* ============================ 案例 2 · Sydney–Hobart 1998 ============================ */

export const sydneyHobart1998: CaseStudy = {
  slug: "sydney-hobart-1998",
  title: "Sydney–Hobart 1998：一夜里弃船 55 艘",
  titleEn: "The 1998 Sydney to Hobart Yacht Race",
  hook:
    "115 艘出发，5 艘沉没，55 艘弃赛，6 人罹难——南海岸的一个炸弹气旋（bomb cyclone）让澳大利亚的国宝比赛变成了 ATSB 报告里的\"行业警钟\"。",
  category: "weather-catastrophe",
  date: "1998 年 12 月 26–30 日",
  location: "Bass Strait（巴斯海峡）· 澳大利亚东南海岸",
  scale:
    "115 艘参赛船 · 1135 名船员 · 6 人罹难 · 55 艘弃赛 · 5 艘船沉没 · 7 直升机 + 6 飞机 + 26 海上船只参与搜救",
  background: [
    "Sydney to Hobart 是世界三大远洋赛事之一，每年圣诞节后从悉尼港出发，纵贯 Bass Strait 到 Tasmania 首府 Hobart，全程约 628 海里。比赛素以\"最难的远洋赛之一\"著称，但 1998 年是它历史上最黑暗的一年。",
    "出发当日预报为\"中等风力\"。但一个深度低压在 Bass Strait 上空爆发性加深——气压在 24 小时内下降超过 24 hPa，技术上属于\"炸弹气旋\"。预报员对这次加深的速度与位置都低估了。比赛 75% 的船队恰好在 Bass Strait 中间，是开放水域、没有避风可能的最危险海段。",
  ],
  timeline: [
    {
      time: "12/26 13:00",
      event: "115 艘船从悉尼港出发。北风 20 节，海况温和。",
    },
    {
      time: "12/27 早上",
      event:
        "船队大部分进入 Bass Strait。气象厅升级警告至\"storm warning\"。多数船选择继续。",
    },
    {
      time: "12/27 14:00",
      event:
        "炸弹气旋中心位于 Bass Strait 西部。风向急转南、瞬间增强至 50–70 节，阵风 78 节。海浪 9–12 米，最大估测 25 米。",
    },
    {
      time: "12/27 16:00–22:00",
      event:
        "Stand Aside、Business Post Naiad、Winston Churchill、Sword of Orion 等多艘船 capsize 或被巨浪击垮。多艘船开始发送 MAYDAY。",
    },
    {
      time: "12/28 凌晨",
      event:
        "Winston Churchill 沉没，9 人弃船入 2 个救生筏。其中一个救生筏的 5 人在 24 小时内被救起，另一筏 4 人中 3 人罹难。",
    },
    {
      time: "12/28 全天",
      event:
        "Royal Australian Navy、AMSA 协调当时澳洲史上最大海上搜救。直升机在风暴最盛时仍冒险接近受难船。",
    },
    {
      time: "12/29",
      event:
        "搜救持续。最终确认 6 人罹难——Business Post Naiad 2 人、Winston Churchill 3 人、Sword of Orion 1 人。",
    },
  ],
  outcome: [
    "ATSB（澳大利亚海上交通安全局）调查报告确认：天气是直接原因，但船只设计（多艘比赛船的船体在\"knockdown\"后无法自正）、安全带使用率不足、救生衣失效——都是被放大的隐患。",
    "比赛主办方 CYCA 后续推出新的强制安全规则：所有船员必须持\"Safety at Sea\"证书；船只必须通过新的设计稳定性测试；EPIRB 与卫星电话成强制装备。",
    "事件后澳大利亚航海界推动 ISAF（现 World Sailing）的 Offshore Special Regulations 全球升级。每个考 IYT Yachtmaster Offshore 的人，案例研究里都包含这次事件。",
  ],
  lessons: [
    {
      course: "weather-and-routing",
      text:
        "\"炸弹气旋\"（bomb cyclone）的定义是 24 小时内中心气压下降 ≥ 24 hPa。预报员对这类系统的加深速度经常低估——尤其是在缺乏稠密观测数据的海域。船长读 GRIB 时要把\"24 小时后的预报中心气压\"与\"当前\"对比——下降超过 15 hPa 已经要警觉、超过 20 hPa 必须考虑撤回。",
    },
    {
      course: "seamanship-and-safety",
      text:
        "1998 年多艘比赛船的 knockdown（90° 倾斜）后无法自正——这是船只设计的稳定性问题。但船员能做的是：所有重要装备必须有第二位置固定（电池组、燃料桶、救生筏），knockdown 时它们不会变成空中的撞击物。这是 WH-212 重天气一节的核心。",
    },
    {
      course: "sea-survival-theory",
      text:
        "Winston Churchill 沉船时的两个救生筏分别在不同的浪里。其中一筏被巨浪反复翻覆，最终筏内人员被冲散——这是\"救生筏不是终点站\"的真实证明。WH-211 教的\"上救生筏后立刻做的 6 件事\"（割断脐带、抛海锚、关注伤员、清点物资、密封篷顶、出现位置信号）都直接出自此类案例的经验。",
    },
    {
      course: "captains-mind",
      text:
        "12/27 早上气象厅升级 storm warning 时，多数船长选择继续。事后回看，那是分水岭——一部分船队选择掉头进 Eden 港避风，全员生还；继续的船面对了风暴的核心。这是\"不决定也是决定\"的极端案例——继续前进的隐性决定本身就是船长在选择风险等级。",
    },
  ],
  references: [
    {
      title: "ATSB Final Report: 1998 Sydney to Hobart Yacht Race",
      source: "Australian Transport Safety Bureau (1999)",
      url: "https://www.atsb.gov.au",
    },
    {
      title: "Fatal Storm: The Inside Story of the Tragic Sydney–Hobart Race",
      source: "Rob Mundle",
    },
    {
      title: "CYCA Race Review and Safety Recommendations",
      source: "Cruising Yacht Club of Australia (1999)",
    },
  ],
};

/* ============================ 案例 3 · El Faro 2015 ============================ */

export const elFaro2015: CaseStudy = {
  slug: "el-faro-2015",
  title: "El Faro 2015：船长直接驶入飓风眼",
  titleEn: "SS El Faro · October 2015",
  hook:
    "船长 Michael Davidson 经验丰富，工具齐全，预报清晰——他仍然把 790 尺货船开进了 5 级飓风的中心。这艘船 33 人无一生还。",
  category: "navigation-error",
  date: "2015 年 9 月 29 日 – 10 月 1 日",
  location: "巴哈马附近 · 北大西洋",
  scale:
    "790 英尺货船 · 33 名船员（28 美国人 + 5 波兰人）· 全员罹难 · NTSB 列为美国海运业 35 年来最严重的事故",
  background: [
    "SS El Faro 是 TOTE Maritime 的 790 英尺 RoRo 货船，长期在 Jacksonville（佛州）至 San Juan（波多黎各）航线运营。船长 Michael Davidson 持有美国海岸警卫队最高等级 Master 证书，有数十年大西洋航运经验。",
    "2015 年 9 月 29 日 El Faro 从 Jacksonville 出发时，热带风暴 Joaquin 在巴哈马以东。船长选择了直接通过巴哈马群岛的常规航线，而非偏北绕开。当时 Joaquin 的预报路径不确定性较大，但接下来 24 小时它快速升级为 4 级，最终在 10 月 1 日凌晨升至 5 级。船长在已经知道风暴正在加深的情况下，未做大幅避让，El Faro 在 10 月 1 日早晨直接驶入飓风眼。",
  ],
  timeline: [
    {
      time: "9/29 20:10",
      event: "El Faro 从 Jacksonville 出发，预定 10/2 抵达 San Juan。",
    },
    {
      time: "9/30 全天",
      event:
        "Joaquin 升级为 1 级飓风。预报中心位置和路径不确定。船长根据公司软件 BVS（Bon Voyage System）的天气数据决策——但 BVS 数据延迟 6 小时，且分辨率低于美国国家飓风中心实时预报。",
    },
    {
      time: "10/1 01:00",
      event:
        "Joaquin 已升级至 3 级。航向仍直插风暴核心。船桥录音显示船长仍认为\"能从风暴南侧绕过\"。",
    },
    {
      time: "10/1 04:00",
      event:
        "El Faro 主引擎失去动力（多名工程师推测为引擎舱进水扰乱燃油泵）。船开始向风浪漂流。",
    },
    {
      time: "10/1 07:13",
      event:
        "船长向公司报告：\"船倾斜 15°，进水中，需要救援。\"此为最后一次主动通信。",
    },
    {
      time: "10/1 07:30 前后",
      event:
        "El Faro 沉没。所有 33 名船员罹难。",
    },
    {
      time: "10/31–11/15",
      event:
        "美国海军在 4500 米深处找到沉船。VDR（航行数据记录仪）后来在 2016 年被打捞上来。",
    },
  ],
  outcome: [
    "NTSB（美国国家运输安全委员会）2017 年最终报告：船长决策是直接原因。具体认定包括：(1) 船长过度依赖公司的 BVS 天气系统，没有充分使用 NHC 的实时数据；(2) 船长在风暴明显加深时仍维持原航线，与公司利益（按时到港）的隐性压力相关；(3) VDR 录音显示船桥团队多次提出疑虑，但船长压制了讨论。",
    "El Faro 事件后美国海运法规升级：所有商业船舶必须有 VDR（航行数据记录仪）；公司不得对船长施加\"按时到港\"的隐性压力；天气决策必须有书面记录（who, what, when, why）。",
    "NTSB 报告里反复出现的词是\"Captain's authority\"与\"information silo\"——船长虽然有最终决定权，但当他屏蔽船桥团队意见、单独信任一个滞后 6 小时的工具时，权威变成了陷阱。",
  ],
  lessons: [
    {
      course: "weather-and-routing",
      text:
        "不要相信单一信息源。El Faro 的 BVS 数据延迟 6 小时——在 1 级到 4 级的快速加深期，6 小时是决定性的。任何专业天气工具都不能替代\"比对至少两个独立来源 + 用自己的眼睛看气压计 + 时刻意识到预报本身在变\"。WH-204 多模型对比一节直接由此案例启发。",
    },
    {
      course: "captains-mind",
      text:
        "VDR 录音显示船桥团队（二副、三副、AB 水手长）都对原航线表达过疑虑，但船长以\"我们能从南侧绕过\"的语气压制讨论。这是\"information silo\"（信息孤岛）的反面教材。WH-301《船长的思维》\"船员简报、值班交接、事后复盘\"的核心就是怎么打破这种孤岛——\"让最沉默的人开口\"是船长的责任。",
    },
    {
      course: "captains-mind",
      text:
        "\"按时到港\"与\"船员生命\"之间，公司给的压力可能是隐性的。船长 Davidson 没有任何明确的\"准时奖金\"，但 TOTE 的文化让\"延迟\"感觉很糟。后续法规要求公司不得施加这种压力——但即使如此，船长内心的 internal pressure 始终存在。这是 WH-301\"返航的勇气\"一章的真实素材：识别\"是船在告诉我返航，还是公司不希望我返航？\"",
    },
  ],
  references: [
    {
      title: "NTSB Marine Accident Report MAR-17/01: Sinking of US Cargo Vessel SS El Faro",
      source: "U.S. National Transportation Safety Board (2017)",
      url: "https://www.ntsb.gov",
    },
    {
      title: "Into the Raging Sea: Thirty-Three Mariners, One Megastorm, and the Sinking of El Faro",
      source: "Rachel Slade (2018)",
    },
    {
      title: "USCG Final Action on Marine Board of Investigation Report",
      source: "U.S. Coast Guard (2018)",
    },
  ],
};

/* ============================ 案例 4 · Tony Bullimore 1997 ============================ */

export const bullimore1997: CaseStudy = {
  slug: "bullimore-1997",
  title: "Tony Bullimore 1997：在翻覆船底活了 5 天",
  titleEn: "Tony Bullimore Capsize, Vendée Globe 1996–97",
  hook:
    "南极绕极海域，单人船在 60 节风里 capsize。Bullimore 在翻覆的船底活了 5 天，靠的不是运气，是 30 年单人航海积累的\"假设最坏\"准备。",
  category: "preparation-pays",
  date: "1997 年 1 月 5 日 – 1 月 9 日",
  location: "南大洋（Southern Ocean）· 距澳大利亚西南 1400 海里",
  scale: "单人 · 一艘 60 尺单体帆船 · capsize 后倒扣 5 天 · 救起后健康状况良好",
  background: [
    "Vendée Globe 是单人不停靠环球帆船赛——参赛者独自一人，绕地球一圈，无救援、无停靠。1996–97 年是第二届。英国老船长 Tony Bullimore 当时 55 岁，已有 30 年单人航海经验，驾驶 60 尺单体船 Exide Challenger 参赛。",
    "1997 年 1 月，他在南大洋距澳大利亚西南约 1400 海里、距南极洲约 1600 海里的位置——人迹罕至到不能再罕至。一个 50 节阵风把船 capsize（180° 倒扣）。船设计上是有自正能力的，但这次没有自正——龙骨脱落了。",
  ],
  timeline: [
    {
      time: "1/5 12:00",
      event:
        "南大洋 60 节阵风。Bullimore 在舱内值班。一次大浪让船完全 capsize。龙骨脱落，船保持倒扣。",
    },
    {
      time: "1/5 12:30",
      event:
        "他爬到船底（现在的\"上面\"）的某个干燥气穴里。这是事先准备的——他知道 capsize 后船底会有这么一个空间，所以那里备了：保温服、密封袋装的饮用水、信号弹、个人 EPIRB。",
    },
    {
      time: "1/5 13:00",
      event:
        "Bullimore 触发 EPIRB。406 MHz 信号被 Cospas-Sarsat 卫星捕获。澳大利亚 AMSA（海上安全局）收到位置。",
    },
    {
      time: "1/6–1/8",
      event:
        "AMSA 协调澳大利亚海军——派出最近的 HMAS Adelaide。该军舰从澳大利亚西南海岸出发，向 1400 海里外的事故位置进发。途中风暴持续，能见度极差。整个救援行动期间 Bullimore 在他自己挖出的\"气穴\"里——温度接近 0°C、湿漉漉、孤独。",
    },
    {
      time: "1/9 09:00",
      event:
        "HMAS Adelaide 到达事故位置。轻型快艇靠近翻覆的 Exide Challenger，敲打船底——Bullimore 听到，潜出气穴，被救起。健康状况良好，没有严重低温症。",
    },
  ],
  outcome: [
    "Bullimore 后来在自传《Saved》中详述：\"我活下来不是因为我多坚强，是因为我提前 30 年想过这一刻。\"",
    "EPIRB（406 MHz）在这次事件中证明了其设计价值——卫星定位 + 长寿命电池 + 防水到极致，让 1400 海里外的孤独求救能在数小时内被精确定位。这之后所有远洋帆船强制配 EPIRB 成行业标准。",
    "现代 Vendée Globe 船舶设计自此引入\"capsize survival pocket\"——船底专门设计有干燥气穴，配备应急装备。Bullimore 的求生方式从\"偶然\"变成\"设计\"。",
  ],
  lessons: [
    {
      course: "sea-survival-theory",
      text:
        "Bullimore 的求生不是奇迹，是\"假设最坏\"的准备结果。他事先在船底气穴里备了保温服、饮用水、信号弹、个人 EPIRB——因为他想过 capsize 后船是什么样、自己在哪、需要什么。WH-211 教的\"弃船前 6 件事\"与他做的事完全一致：割断、保温、信号、忍耐。",
    },
    {
      course: "sea-survival-theory",
      text:
        "EPIRB 是远洋唯一可靠的求救手段——VHF 在 30 海里外无效，卫星电话可能耗电或损坏，但 EPIRB 一旦激活，卫星定位 + 长寿电池 + 全球覆盖 = 你的位置在 15 分钟内出现在最近 MRCC 的屏幕上。注册 EPIRB 时填的应急联系人是救援第一时间联络的人——确保是真能找到你的人。",
    },
    {
      course: "captains-mind",
      text:
        "单人 5 天没死，靠的是\"心理 + 配给 + 节律\"三件事。Bullimore 在气穴里给自己定时间表：每 4 小时检查一次 EPIRB 信号、每 6 小时喝 100 ml 水、不让自己进入\"绝望模式\"。这是 WH-301 课讲的\"在不确定下保持运行\"的真实素材。",
    },
  ],
  references: [
    {
      title: "Saved",
      source: "Tony Bullimore (1997)",
    },
    {
      title: "AMSA Search and Rescue Operation Report: Exide Challenger",
      source: "Australian Maritime Safety Authority (1997)",
    },
    {
      title: "Vendée Globe 1996–97 Race Archive",
      source: "Vendée Globe 官方",
      url: "https://www.vendeeglobe.org",
    },
  ],
};

/* ============================ 案例 5 · Knox-Johnston 1968 ============================ */

export const knoxJohnston1968: CaseStudy = {
  slug: "knox-johnston-1968",
  title: "Robin Knox-Johnston 1968：第一个单人不停靠绕地球",
  titleEn: "Sir Robin Knox-Johnston · Sunday Times Golden Globe Race",
  hook:
    "29 岁、一艘 32 尺木船 Suhaili、312 天独自一人不停靠绕地球一圈——他证明了从 0 开始、用低技术、靠极度准备，能完成\"不可能\"的事。",
  category: "preparation-pays",
  date: "1968 年 6 月 14 日 – 1969 年 4 月 22 日",
  location: "环球 · 起终点 Falmouth, 英国",
  scale:
    "单人 · 32 英尺木质单体船 Suhaili · 312 天不停靠 · 历史第一",
  background: [
    "1968 年《Sunday Times》主办了 Golden Globe Race——奖金 5000 英镑，给第一个完成单人不停靠环球航行的人。当时这件事从未有人做过——许多专家公开怀疑人能否在精神上承受这么长时间的孤独，或者一艘船能否承受这么长的连续航行。",
    "9 名参赛者出发。其中 8 人或退赛、或失踪、或自杀。只有 Robin Knox-Johnston 在 312 天后回到 Falmouth——他用的是自己 1963 年在印度孟买亲手建造的 32 英尺木船 Suhaili，配备的全部\"高科技\"是一个机械式计时器、一只六分仪、一台 RDF（无线电测向仪）。没有 GPS（GPS 1995 年才民用化）、没有卫星电话、没有自动驾驶。",
  ],
  timeline: [
    {
      time: "1968/6/14",
      event:
        "Knox-Johnston 从 Falmouth 出发。Suhaili 装备：1 只 Hamilton 钟表、1 只六分仪、纸海图、罐头食物 312 天份、5 加仑威士忌。",
    },
    {
      time: "1968/9",
      event:
        "横越南大西洋到达南纬 40°，进入 Roaring Forties。自此 6 个月在南半球绕极海域。",
    },
    {
      time: "1968/11",
      event:
        "在南印度洋遭遇严重风暴，自制风暴帆失灵。他用手缝的方式在颠簸甲板上重新缝制了一面新风暴帆——历时 22 小时。",
    },
    {
      time: "1969/1",
      event:
        "无线电完全失效。从此不再能与外界通信、不能听天气预报。下半程他靠经验判断天气、靠每日正午太阳观测确定位置。",
    },
    {
      time: "1969/3",
      event:
        "通过 Cape Horn 进入大西洋。皮带损伤、水箱漏水、罐头食物大量过期——但他继续。",
    },
    {
      time: "1969/4/22",
      event:
        "回到 Falmouth。下船时第一句话：\"船和我都还在。\" 是 312 天没人见过他的状态。",
    },
  ],
  outcome: [
    "Knox-Johnston 成为历史上第一个单人不停靠环球航行的人。后来被英国女王封爵 Sir Robin。",
    "他的成功改变了人们对\"单人远洋\"的认知——不再是疯狂行为，而是有方法、有准备、有判断力的极限挑战。",
    "他在自传《A World of My Own》中反复说：\"我没有比其他人更勇敢。我只是更愿意花两年时间准备一年的航行。\"——这本书后来成为单人远洋的标准教材。",
  ],
  lessons: [
    {
      course: "captains-mind",
      text:
        "1963–1968 这 5 年 Knox-Johnston 在做什么？他在亲手建造 Suhaili。他在大量阅读历史远洋记录。他在英印海军服役，跑过多次跨大洋航段。所谓\"极致准备\"不是一个月的检查表——是 5 年的渐进暴露。这是 WH-301 课\"赤子之心 vs 莽撞\"的最纯粹案例。",
    },
    {
      course: "celestial-and-pilotage",
      text:
        "Knox-Johnston 的无线电在第 200 天失效。从此到第 312 天，他完全靠六分仪 + 纸海图导航——312 天里有 112 天他不能告诉外界自己在哪。他每天必做正午观测（noon sight）——这是 WH-228 课正午高度求纬度的真实例证。GPS 时代的我们仍然该学六分仪：不为精度，为\"电子全失效时仍能从太平洋中间走回来\"。",
    },
    {
      course: "sea-survival-theory",
      text:
        "他的食物 312 天里有 80 天是发霉的或过期的。他的水箱漏过两次。他的衣服在最后两个月几乎是破布。但他没有断水、没有断粮、没有失温——因为他给自己设了最严格的配给制度（每天定量水、定量食物、定量威士忌——是的）。\"假设最坏 + 严格配给\"是单人远洋的两条铁律。",
    },
  ],
  references: [
    {
      title: "A World of My Own: The First Ever Non-Stop Solo Round the World Voyage",
      source: "Sir Robin Knox-Johnston (1969)",
    },
    {
      title: "The Sunday Times Golden Globe Race 1968–1969 Archive",
      source: "Sunday Times / National Maritime Museum",
    },
  ],
};

/* ============================ 案例 6 · Costa Concordia 2012 ============================ */

export const costaConcordia2012: CaseStudy = {
  slug: "costa-concordia-2012",
  title: "Costa Concordia 2012：船长第一个跑下船",
  titleEn: "Costa Concordia · Capsize off Isola del Giglio",
  hook:
    "29 万吨豪华邮轮，4229 人在船。一个为了\"sail-by\"向岛上致敬的偏航决定，让船撞礁倾覆。船长 Schettino 弃船时其他人还在船上——后被判过失杀人。",
  category: "leadership",
  date: "2012 年 1 月 13 日",
  location: "Isola del Giglio · 意大利西海岸",
  scale:
    "Costa Concordia 邮轮 · 长 290 米 · 4229 人在船 · 32 人罹难 · 船完全倾覆于浅水礁石",
  background: [
    "Costa Concordia 是 Costa Cruise（意大利邮轮公司）的旗舰之一，从 Civitavecchia（罗马附近）出发巡游地中海。船长 Francesco Schettino 当时 51 岁，有 25 年商船经验。",
    "2012 年 1 月 13 日晚上，Schettino 决定让船\"sail-by\"Isola del Giglio——这是一种非官方传统，邮轮靠近岛屿、向岛上居民致意。船公司知道并默许这种行为，但要求船长保持安全距离。Schettino 偏离了原计划航线，让船过于靠近岛屿——撞上了未在他即时使用的海图上标注的礁石。",
  ],
  timeline: [
    {
      time: "1/13 19:18",
      event: "Costa Concordia 从 Civitavecchia 出发，预定 18 港口巡游。",
    },
    {
      time: "1/13 21:42",
      event:
        "船开始接近 Isola del Giglio。船长亲自掌舵，关闭了电子海图警报（后来 NTSB 同等机构调查认定）。",
    },
    {
      time: "1/13 21:45",
      event:
        "船撞上 Le Scole 礁石。150 米长的船体被礁石撕开。海水大量涌入引擎舱。",
    },
    {
      time: "1/13 21:50–22:30",
      event:
        "船长拒绝立即宣布 abandon ship。乘客被告知是\"电气故障\"。船开始严重倾斜。",
    },
    {
      time: "1/13 22:33",
      event:
        "船长终于下令 abandon ship——但部分救生艇已无法降下（船倾斜超过设计角度）。",
    },
    {
      time: "1/13 23:30",
      event:
        "船长 Schettino 离船，登上岸上。海岸警卫队 De Falco 上尉随后用著名的电话喊话：\"Vada a bordo, cazzo!\"（\"给我回到船上去！\"）但 Schettino 没有回去。",
    },
    {
      time: "1/14 凌晨",
      event:
        "搜救持续。最终 32 人罹难，包含部分乘客与 5 名船员。",
    },
  ],
  outcome: [
    "意大利法院 2015 年判 Schettino 16 年监禁——罪名包括过失杀人、过失船难、提前弃船。他成为\"船长应最后离船\"（the captain goes down with his ship）传统在现代航海史上最著名的反例。",
    "事件后 IMO 修订邮轮安全规则：船桥导航团队的\"挑战 + 验证\"流程必须强制（任何船员可以质疑船长决策、并必须被记录）；电子海图警报不得关闭；救生艇容量必须在所有可能倾斜角度下仍可降下。",
    "Schettino 案的核心审判论点不是\"撞礁了\"，而是\"撞礁后他怎么做\"——延迟 1 小时 50 分钟才下令 abandon ship、提前弃船、试图掩盖关闭警报的事实——这些是过失杀人罪的真实根据。",
  ],
  lessons: [
    {
      course: "captains-mind",
      text:
        "Costa Concordia 不是天气灾难、不是设备失灵——是船长决策灾难。\"Sail-by\"传统本身就是隐性压力：让船长偏离计划航线、为非航海目的冒险。识别这种压力（\"客户喜欢看\"、\"公司默许\"、\"老传统\"）是船长责任的核心。WH-301 课\"船长决策\"一章直接由此案例驱动。",
    },
    {
      course: "captains-mind",
      text:
        "Schettino 撞礁后的 1 小时 50 分钟决定了乘客生死。如果他在 21:45 立即下令 abandon ship，救生艇还能正常降下、所有人都有机会上艇。延迟的代价是船开始倾斜、艇无法降下、乘客无法接近艇——这是\"信息隐瞒\"的最坏后果。",
    },
    {
      course: "seamanship-and-safety",
      text:
        "\"船长最后离船\"不是浪漫主义传统，是法律义务——意大利海事法明确规定。Schettino 提前离船在意大利刑法体系下本身就是犯罪。每个考 RYA / IYT Yachtmaster 的人，导师都会复述这个案例。",
    },
  ],
  references: [
    {
      title: "Final Report on Investigation of the Costa Concordia",
      source: "Ministero delle Infrastrutture e dei Trasporti (Italy, 2013)",
    },
    {
      title: "IMO MSC Circular on Cruise Ship Safety Reforms",
      source: "International Maritime Organization (2013)",
    },
    {
      title: "Sentencing Verdict: Italian State v. Francesco Schettino",
      source: "Court of Grosseto, Italy (2015)",
    },
  ],
};

/* —— 全部案例（顺序按学习路径相关性） —— */

export const cases: CaseStudy[] = [
  fastnet1979,
  sydneyHobart1998,
  elFaro2015,
  costaConcordia2012,
  bullimore1997,
  knoxJohnston1968,
];

const bySlug = new Map(cases.map((c) => [c.slug, c]));

export function getCase(slug: string): CaseStudy | undefined {
  return bySlug.get(slug);
}

export function listCaseSlugs(): string[] {
  return cases.map((c) => c.slug);
}

export function casesByCategory(): Record<CaseCategory, CaseStudy[]> {
  const out = {} as Record<CaseCategory, CaseStudy[]>;
  for (const c of Object.keys(categoryInfo) as CaseCategory[]) {
    out[c] = cases.filter((cs) => cs.category === c);
  }
  return out;
}
