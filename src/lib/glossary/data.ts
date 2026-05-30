/**
 * WindHero 航海词典 · 120+ 核心术语
 *
 * 编排原则：
 * 1) 每个术语必须有中英文对照
 * 2) 每个术语必须有"为什么这个概念存在"而非只是定义
 * 3) 关键概念关联到 WindHero 课程
 * 4) 不写废话——能用 30 字说清的不用 60 字
 *
 * 数据来源：RYA Day Skipper / Coastal / Yachtmaster Theory 大纲、
 *           IMO COLREGS、Bowditch APN、WindHero 课程正文。
 */

export type GlossaryCategory =
  | "wind-weather"
  | "boat-parts"
  | "sailing-maneuvers"
  | "navigation"
  | "safety"
  | "communications"
  | "engine-systems";

export const categoryInfo: Record<
  GlossaryCategory,
  { label: string; sub: string; intro: string }
> = {
  "wind-weather": {
    label: "风与天气",
    sub: "Wind & Weather",
    intro: "风的来源、天气系统、海况判断——船长每天最先读的语言",
  },
  "boat-parts": {
    label: "船体与索具",
    sub: "Boat & Rig",
    intro: "船的零件叫什么、为什么这样设计——上船第一周就要会的词",
  },
  "sailing-maneuvers": {
    label: "操船动作",
    sub: "Maneuvers",
    intro: "调帆、转向、停船、应急——船员之间唯一通用的术语",
  },
  navigation: {
    label: "导航",
    sub: "Navigation",
    intro: "海图、潮汐、定位、引航——把\"我在哪、要去哪\"变成可算的数",
  },
  safety: {
    label: "安全",
    sub: "Safety",
    intro: "救生、避碰、应急——这些词的存在本身就是为了救命",
  },
  communications: {
    label: "通信",
    sub: "Comms",
    intro: "VHF、DSC、规范用语——海上唯一可靠的\"求救门\"",
  },
  "engine-systems": {
    label: "动力与机械",
    sub: "Engine & Systems",
    intro: "柴油机、电气、燃料——船长该懂的\"机舱基本面\"",
  },
};

export type Term = {
  slug: string;
  /** 中文术语（主） */
  zh: string;
  /** 英文术语 */
  en: string;
  /** 别名（英文缩写、同义词等，搜索用） */
  aliases?: string[];
  category: GlossaryCategory;
  /** 一句话定义，30 字以内 */
  short: string;
  /** 完整解释，含"为什么这个概念存在" */
  long: string;
  /** 相关 WindHero 课程 slug */
  seeAlso?: string[];
  /** 相关其他术语 slug */
  related?: string[];
};

export const terms: Term[] = [
  /* ========== 风与天气 ========== */
  {
    slug: "true-wind",
    zh: "真风",
    en: "True Wind (TW)",
    aliases: ["TW", "TWS", "TWA"],
    category: "wind-weather",
    short: "相对地面的风——不随你船的运动而变。",
    long: "真风是相对地面（不动的参考系）的风。它由全球环流和当地气压系统决定，不会因为你的船跑得快或慢而改变方向或强度。船长的天气判断永远基于真风。TWS = 真风风速、TWA = 真风相对船头的角度。",
    seeAlso: ["reading-the-wind"],
    related: ["apparent-wind", "twa"],
  },
  {
    slug: "apparent-wind",
    zh: "视风",
    en: "Apparent Wind (AW)",
    aliases: ["AW", "AWS", "AWA"],
    category: "wind-weather",
    short: "你在甲板上感受到的风——真风与船速的合成。",
    long: "视风 = 真风 + 船速反向。船开得越快，\"自己跑出来的风\"越大，视风越往船头方向偏。所有调帆动作依据的都是视风。最容易踩的坑：顺风跑感觉没风，其实真风可能很强——视风被船速抵消了。",
    seeAlso: ["reading-the-wind"],
    related: ["true-wind", "twa"],
  },
  {
    slug: "twa",
    zh: "真风角",
    en: "True Wind Angle (TWA)",
    category: "wind-weather",
    short: "真风方向与船头方向之间的夹角。",
    long: "TWA 决定你处在哪种\"点风方位\"上——顶风（0–30°）、近顶风（30–60°）、横风（90° 附近）、尾后风（120–150°）、顺风（150–180°）。船长策略层面所有判断（我能去哪、要不要换抢）基于 TWA，不是视风角。",
    related: ["true-wind", "apparent-wind", "points-of-sail"],
  },
  {
    slug: "points-of-sail",
    zh: "点风方位",
    en: "Points of Sail",
    category: "wind-weather",
    short: "船相对真风的角度分类——决定能不能去那里、跑得多快。",
    long: "传统帆船分类：顶风死区 / 近顶风 / 横风 / 尾后风 / 顺风。每个点风方位对应不同的帆面调整方式和船速预期。横风通常最快、最稳；顶风死区无法直接前进，需要\"抢风\"（之字形）。",
    seeAlso: ["reading-the-wind"],
  },
  {
    slug: "beaufort-scale",
    zh: "蒲福风级",
    en: "Beaufort Scale",
    category: "wind-weather",
    short: "把风速分成 0–12 级，每级有对应的海况描述。",
    long: "1805 年英国海军上将 Francis Beaufort 制定，至今没换。从 0 级（无风、海面如镜）到 12 级（飓风、海面全白）。船长不用每次查表——0–3 级懒散、4–5 级才像样、6 级警戒、7 级以上认真考虑回港。",
    related: ["true-wind"],
  },
  {
    slug: "hadley-cell",
    zh: "哈德利环流",
    en: "Hadley Cell",
    category: "wind-weather",
    short: "赤道到 30° 之间的三圈环流第一圈——信风的来源。",
    long: "赤道空气受热上升，在高空向极地流动，到约 30° 下沉。下沉气流回流赤道时被 Coriolis 力偏向，形成北半球东北信风、南半球东南信风。这就是为什么 ARC 横渡大西洋走南圈航线。",
    seeAlso: ["reading-the-wind", "weather-and-routing"],
    related: ["trade-winds", "coriolis", "ferrel-cell"],
  },
  {
    slug: "ferrel-cell",
    zh: "费雷尔环流",
    en: "Ferrel Cell",
    category: "wind-weather",
    short: "30°–60° 中间一圈——盛行西风的来源。",
    long: "夹在哈德利与极地环流中间的\"被拽着转\"的一圈。地表风从 30° 流向 60° 时被 Coriolis 力偏成自西向东——北大西洋、北太平洋常年的西风来源。锋面密集，天气剧烈。",
    seeAlso: ["reading-the-wind"],
    related: ["hadley-cell", "polar-cell", "westerlies"],
  },
  {
    slug: "polar-cell",
    zh: "极地环流",
    en: "Polar Cell",
    category: "wind-weather",
    short: "60° 到极点之间的环流——极地东风的来源。",
    long: "极地寒冷空气下沉，地表向 60° 流动时被 Coriolis 力偏向，形成\"极地东风\"。常年冰冷、天气极端，民用帆船很少进入。",
    related: ["hadley-cell", "ferrel-cell"],
  },
  {
    slug: "coriolis",
    zh: "科里奥利力",
    en: "Coriolis Force",
    aliases: ["Coriolis"],
    category: "wind-weather",
    short: "地球自转造成的视觉偏向力——北半球右偏、南半球左偏。",
    long: "严格说不是\"力\"，是地球自转参考系下的视觉效应。它解释了为什么风不直接从高压吹向低压，而是绕着低压旋转：北半球逆时针、南半球顺时针。所有大尺度天气系统的\"旋转感\"都来自它。",
    seeAlso: ["reading-the-wind"],
    related: ["geostrophic-wind", "isobars"],
  },
  {
    slug: "trade-winds",
    zh: "信风",
    en: "Trade Winds",
    category: "wind-weather",
    short: "南北纬 5°–30° 之间常年稳定的风——北半球东北、南半球东南。",
    long: "哈德利环流地表回流支被 Coriolis 力偏向形成。15–25 节，季节内方向几乎不变。大帆船时代横渡大西洋的\"高速公路\"。Trade 源自中世纪英语\"track / path（航道）\"，不是\"贸易\"。",
    seeAlso: ["reading-the-wind"],
    related: ["hadley-cell", "doldrums"],
  },
  {
    slug: "westerlies",
    zh: "盛行西风",
    en: "Prevailing Westerlies",
    category: "wind-weather",
    short: "南北纬 30°–60° 的常年西到西南风。",
    long: "费雷尔环流地表段被 Coriolis 力偏向\"自西向东\"形成。北大西洋、北太平洋长期的\"自西向东天气\"就是这股风。但它不像信风稳——锋面频繁穿过，风向风速大幅波动。Roaring 40s、Furious 50s 是南半球同纬度的别称。",
    seeAlso: ["reading-the-wind"],
    related: ["ferrel-cell"],
  },
  {
    slug: "monsoon",
    zh: "季风",
    en: "Monsoon",
    category: "wind-weather",
    short: "随季节每年翻转一次的大尺度风系——亚洲沿海最显著。",
    long: "陆地与海洋热容差造成的\"大号海陆风\"，在大陆尺度上演。夏天大陆热、形成低压、把海上湿气吸入（西南季风）；冬天大陆冷、形成高压、把干冷气吹向海上（东北季风）。南海、阿拉伯海、孟加拉湾每年翻转。",
    seeAlso: ["reading-the-wind", "weather-and-routing"],
  },
  {
    slug: "doldrums",
    zh: "赤道无风带",
    en: "Doldrums / ITCZ",
    aliases: ["ITCZ", "Inter-Tropical Convergence Zone"],
    category: "wind-weather",
    short: "赤道附近一条对流上升、地表风极弱的窄带。",
    long: "南北哈德利环流交汇上升处。低压、对流活跃、地表风经常掉到 1–2 节。横渡赤道帆船常在这里被困或被雷暴突袭。位置随季节南北摆动，不在赤道正上方。",
    related: ["hadley-cell", "trade-winds"],
  },
  {
    slug: "isobars",
    zh: "等压线",
    en: "Isobars",
    category: "wind-weather",
    short: "地面气压相同的点连成的线——天气图的骨架。",
    long: "通常每 4 hPa 画一根。两根之间越近，气压梯度越大、风越强——这是看天气图最先该看的事。L = 低压、H = 高压。北半球风沿等压线、低压在风的左手（Buys-Ballot 法则）。",
    seeAlso: ["weather-and-routing"],
    related: ["geostrophic-wind", "low-pressure", "high-pressure"],
  },
  {
    slug: "geostrophic-wind",
    zh: "地转风",
    en: "Geostrophic Wind",
    category: "wind-weather",
    short: "气压梯度推力与 Coriolis 拉力平衡时，沿等压线流动的风。",
    long: "理想化的高空模型——实际地表因摩擦还会偏向低压一侧约 15°–30°。船长不需要记公式，但要理解\"风为什么不直接从高压吹向低压\"。",
    related: ["isobars", "coriolis"],
  },
  {
    slug: "low-pressure",
    zh: "低压系统",
    en: "Low-pressure System",
    aliases: ["低压", "气旋"],
    category: "wind-weather",
    short: "中心气压低于周围、风绕中心旋转的天气系统——温带气旋。",
    long: "中纬度的主角。从冷暖气团交界的极锋上诞生，经波动 → 成熟 → 锢囚 → 消亡四阶段。北半球逆时针、南半球顺时针。船长航前 24 小时该首先识别低压位置与移动方向。",
    seeAlso: ["weather-and-routing"],
    related: ["high-pressure", "fronts", "isobars"],
  },
  {
    slug: "high-pressure",
    zh: "高压系统",
    en: "High-pressure System",
    aliases: ["高压"],
    category: "wind-weather",
    short: "下沉气流主导、风从中心向外辐散的天气系统。",
    long: "天气晴朗、风弱、能见度好。北大西洋亚速尔高压、北太平洋夏威夷高压都是常年的高压区。中心常被困——夏季欧洲游艇被困在\"亚速尔高压脚下\"是常事。",
    related: ["low-pressure", "isobars"],
  },
  {
    slug: "fronts",
    zh: "锋面",
    en: "Fronts",
    category: "wind-weather",
    short: "冷暖气团交界的\"边界\"——船长该认得三种。",
    long: "冷锋（陡坡、阵性强降水、锋后转冷转北风）、暖锋（缓坡、连续性降水、能见度差）、锢囚锋（冷锋追上暖锋后形成、低压衰老的信号）。识别锋面通过靠：气压变化、风向偏转、温度突变。",
    seeAlso: ["weather-and-routing"],
    related: ["low-pressure"],
  },
  {
    slug: "grib",
    zh: "GRIB 文件",
    en: "GRIB",
    aliases: ["GRIdded Binary"],
    category: "wind-weather",
    short: "数值天气预报的标准数据格式——船长的天气主食。",
    long: "WMO 标准格式，把全球大气数据切成网格存储。船长用 PredictWind / Windy / OpenCPN 等下载 GRIB 后离线查看。常用模型：ECMWF（欧洲，整体最准）、GFS（美国，免费、覆盖全球）、ICON（德国，欧洲海域好）。",
    seeAlso: ["weather-and-routing"],
  },

  /* ========== 船体与索具 ========== */
  {
    slug: "mast",
    zh: "桅杆",
    en: "Mast",
    category: "boat-parts",
    short: "船上最高的垂直杆——挂帆的主结构。",
    long: "现代游艇桅杆多为铝合金或碳纤维。桅杆顶端常装风向风速仪、VHF 天线、桅顶白灯。桅杆基座的方式决定能不能\"放倒\"——deck-stepped 可放倒过桥、keel-stepped 不可。",
    related: ["boom", "rigging"],
  },
  {
    slug: "boom",
    zh: "帆杆",
    en: "Boom",
    category: "boat-parts",
    short: "主帆下缘的水平杆——控制主帆开合的支点。",
    long: "boom 的高度直接威胁船员头部——意外 gybe 时 boom 横扫，是甲板上最常见的撞伤源。船员上船第一件事是问\"boom 的高度\"和\"准备好低头的反应\"。",
    related: ["mast", "mainsail"],
  },
  {
    slug: "mainsail",
    zh: "主帆",
    en: "Mainsail",
    category: "boat-parts",
    short: "桅杆后方、帆杆上方的最大一张帆。",
    long: "提供大部分动力。主帆有缩帆系统——从全张到第一道、第二道、第三道缩帆。风变强缩帆，是 seamanship 的基本动作。",
    related: ["jib", "boom"],
  },
  {
    slug: "jib",
    zh: "前帆",
    en: "Jib / Genoa",
    category: "boat-parts",
    short: "桅杆前方、与主帆同时使用的较小一张帆。",
    long: "比主帆面积小的叫 jib，覆盖到主帆下半部分的叫 genoa（更大）。前帆与主帆之间形成\"缝隙效应\"（slot effect）——气流加速，提升整体推力。前帆通常由 furler（卷帆器）控制。",
    related: ["mainsail"],
  },
  {
    slug: "keel",
    zh: "龙骨",
    en: "Keel",
    category: "boat-parts",
    short: "船底向下延伸的重物——抵抗侧倾、给船以稳定。",
    long: "现代帆船多为 fin keel（鳍形）+ bulb（铅球）。龙骨吃水深度决定能进多浅的港。龙骨螺栓松脱是船体最严重的隐患之一——出航前要目视。",
    related: ["rudder", "draft"],
  },
  {
    slug: "rudder",
    zh: "舵",
    en: "Rudder",
    category: "boat-parts",
    short: "船尾下方的转向板——船长的方向盘最终连到它。",
    long: "舵效在低速时差、高速时好——靠岸时减速太快会\"失去舵效\"是新手最容易犯的错。舵销间隙过大是常见隐患，出航前要检查舵柄左右晃动的旷量。",
    related: ["keel"],
  },
  {
    slug: "halyard",
    zh: "升帆索",
    en: "Halyard",
    category: "boat-parts",
    short: "把帆拉到桅顶的绳——主升帆索、前升帆索分别用。",
    long: "halyard 必须能在紧急时迅速放开（让帆瞬间落下）。出航前每根 halyard 都要测试一次\"能升上去 + 能放下来\"。",
    related: ["sheet", "winch"],
  },
  {
    slug: "sheet",
    zh: "调帆索",
    en: "Sheet",
    category: "boat-parts",
    short: "控制帆出多远的绳——主帆索 / 前帆索。",
    long: "船员喊\"trim the sheet\"是收紧、\"ease the sheet\"是放松。所有调帆动作的支点都是 sheet。它经常缠在 winch 上，松脱时手指容易被夹——这是甲板上最常见的小伤来源。",
    related: ["halyard", "winch"],
  },
  {
    slug: "winch",
    zh: "绞盘",
    en: "Winch",
    category: "boat-parts",
    short: "用机械力辅助收绳的圆筒——sheet 必经设备。",
    long: "现代游艇 winch 分手摇与自张紧（self-tailing）。围绕 winch 的绳\"一定要从下方绕进\"，方向错了 winch 会反转伤手。",
    related: ["sheet"],
  },
  {
    slug: "rigging",
    zh: "索具",
    en: "Rigging",
    category: "boat-parts",
    short: "支撑桅杆与控制帆的整套钢索和绳的总称。",
    long: "Standing rigging（静索）= 支撑桅杆的钢丝，不动；running rigging（动索）= 控制帆的绳，每天动。静索断了桅杆倒——所以\"出航前目视索具\"是 RYA 标准动作。",
    related: ["mast"],
  },
  {
    slug: "draft",
    zh: "吃水",
    en: "Draft",
    category: "boat-parts",
    short: "船最低点到水面的垂直距离——决定能进多浅的港。",
    long: "巡航游艇典型吃水 1.5–2.2m。靠泊时计算\"实际水深 = 海图水深 + 当前潮高 - 吃水 - UKC（净空余量）\"。吃水超过水深就搁浅。",
    seeAlso: ["chartwork-and-tides"],
    related: ["ukc"],
  },
  {
    slug: "ukc",
    zh: "龙骨净空",
    en: "Under Keel Clearance (UKC)",
    aliases: ["UKC"],
    category: "boat-parts",
    short: "龙骨最低点到海床的安全余量——通常 0.5–1m。",
    long: "进窄水道、过浅滩、抛锚过夜，都要算 UKC。涨潮蹭底叫\"擦底\"，落潮蹭底叫\"灾难\"——选时刻必须是涨潮窗口。",
    seeAlso: ["chartwork-and-tides"],
    related: ["draft"],
  },

  /* ========== 操船动作 ========== */
  {
    slug: "tacking",
    zh: "抢风转向",
    en: "Tacking",
    aliases: ["上风转向"],
    category: "sailing-maneuvers",
    short: "船头穿过风向的转向——从一舷上风换到另一舷上风。",
    long: "完成 tacking 需要全员到位：舵手喊\"ready about\"，船员准备前帆，舵手喊\"tacking\"，船头穿过风，前帆从一侧换到另一侧。失败的 tacking 叫\"in irons\"——船被困在死区。",
    related: ["gybing", "points-of-sail"],
  },
  {
    slug: "gybing",
    zh: "顺风转向",
    en: "Gybing",
    aliases: ["jibing"],
    category: "sailing-maneuvers",
    short: "船尾穿过风向的转向——比 tacking 风险大得多。",
    long: "顺风转向时 boom 会以巨大力量横扫——意外 gybe 是甲板上最常见的重伤源。所以\"控制 gybe\"是必修课：放下主升、用 vang 控制 boom、慢慢让风把帆吹过去。",
    related: ["tacking", "boom"],
  },
  {
    slug: "reefing",
    zh: "缩帆",
    en: "Reefing",
    category: "sailing-maneuvers",
    short: "风变强时缩小帆面——船长第一道防线。",
    long: "原则：\"想到该缩帆的时候，已经晚了\"。第一道缩帆 ≈ 真风 15 节、第二道 ≈ 25 节、第三道 ≈ 35 节（船型而异）。现代游艇主帆有 2–3 道缩帆点（reef points），前帆靠 furler 卷小。",
    seeAlso: ["seamanship-and-safety"],
  },
  {
    slug: "heaving-to",
    zh: "停船",
    en: "Heaving-to",
    category: "sailing-maneuvers",
    short: "用主帆推、舵反推让船在风浪中停下——休整、修整、躲恶劣天气。",
    long: "把前帆反向（aback）、主帆松开、舵锁向上风——三者达到力平衡，船以 60° 偏角缓慢漂移、速度 1–2 节、相对舒适。Heaving-to 与 sea anchor、drogue 是恶劣天气三件套。",
    seeAlso: ["seamanship-and-safety"],
  },
  {
    slug: "mob",
    zh: "落水",
    en: "Man Overboard (MOB)",
    aliases: ["MOB", "落水者"],
    category: "sailing-maneuvers",
    short: "船员落水——船长该跑过的最完整应急演练。",
    long: "黄金 90 秒：喊话 + 抛漂浮物 + 按 MOB 按钮 + 派人指住落水者。然后选回转策略——Quick Stop（最常推荐）或 Figure-8。MOB 演练是每个船员上船的第一课，不练不许出海。",
    seeAlso: ["seamanship-and-safety"],
  },
  {
    slug: "quick-stop",
    zh: "急停回转",
    en: "Quick Stop",
    category: "sailing-maneuvers",
    short: "MOB 救援最常推荐的方法——立刻迎风停船。",
    long: "见 MOB → 立刻转向至风眼上 → heave-to → 船在落水者附近 1–2 个船身漂移 → 用引擎或抛绳回收。优点是不偏离落水者太远；缺点是要练，不熟练时会乱。",
    related: ["mob", "heaving-to"],
  },
  {
    slug: "in-irons",
    zh: "顶死",
    en: "In Irons",
    category: "sailing-maneuvers",
    short: "船被困在顶风死区、无法前进——tacking 失败的状态。",
    long: "在风眼正上时船速归零、舵也失效。解法：把舵打到一侧，让风把船头慢慢推到一边（\"倒挡帆\"backed sail），船恢复前进后再正向 tacking。",
    related: ["tacking"],
  },

  /* ========== 导航 ========== */
  {
    slug: "dr",
    zh: "推算位置",
    en: "Dead Reckoning (DR)",
    aliases: ["DR", "航位推算"],
    category: "navigation",
    short: "仅靠航向 + 船速 + 时间推算的位置——GPS 失效时的底线。",
    long: "从已知位置出发，每小时用航向 + 船速画一段，连成 DR 轨迹。不含潮流和漂移影响——精度随时间衰减。但 GPS 黑掉时它就是你的导航。",
    seeAlso: ["chartwork-and-tides"],
    related: ["ep", "fix"],
  },
  {
    slug: "ep",
    zh: "估算位置",
    en: "Estimated Position (EP)",
    aliases: ["EP"],
    category: "navigation",
    short: "DR + 潮流和漂移修正后的位置——比 DR 准、比 fix 不准。",
    long: "在 DR 基础上加入潮流向量（从 tidal stream atlas 查）和风压 leeway（5°–15° 经验值）。船长跨水道时实时维护 EP，是 RYA 笔试的核心计算题。",
    seeAlso: ["chartwork-and-tides"],
    related: ["dr", "fix"],
  },
  {
    slug: "fix",
    zh: "定位",
    en: "Fix",
    category: "navigation",
    short: "用两条以上位置线 (LOP) 交叉得到的精确位置。",
    long: "经典 fix 用三条 LOP——两条交点是位置，第三条用来验证。LOP 来源：方位线、距离弧、transit（前后景物对齐）。三条线如果不在一点而是组成一个小三角形，叫\"cocked hat\"——位置在三角形内。",
    seeAlso: ["chartwork-and-tides", "celestial-and-pilotage"],
    related: ["dr", "ep", "transit"],
  },
  {
    slug: "transit",
    zh: "跨线",
    en: "Transit",
    category: "navigation",
    short: "两个地标在你视野里成一直线——给你一条精确方位线。",
    long: "transit 的精度比 GPS 还好——只要两个地标真的在一线，你就在那条线上。引航员靠 transit 在浓雾里进港。RYA Day Skipper 实操题中\"现在 GPS 关了，给我一个 fix\"几乎一定要用 transit。",
    seeAlso: ["celestial-and-pilotage"],
    related: ["fix"],
  },
  {
    slug: "cts",
    zh: "应转航向",
    en: "Course to Steer (CTS)",
    aliases: ["CTS"],
    category: "navigation",
    short: "从 A 到 B 时，扣除潮流和风压后实际应该转的罗航向。",
    long: "经典 CTS 计算：A 点画船速向量，B 点画潮流向量，连成三角形，从三角形得出该转的航向。再加 5°–15° leeway 修正。是 RYA Day Skipper 笔试最常出的计算题。",
    seeAlso: ["chartwork-and-tides"],
    related: ["ep", "leeway"],
  },
  {
    slug: "leeway",
    zh: "风压偏角",
    en: "Leeway",
    category: "navigation",
    short: "风把船推到下风方向、偏离航迹的角度——5°–15°。",
    long: "leeway 不能直接测，靠经验估计。大风、横风时 leeway 大；机动航行（没张帆）时 leeway 几乎为零。CTS 计算必须扣除 leeway，否则你以为去 B 实际去了下风的 C。",
    seeAlso: ["chartwork-and-tides"],
    related: ["cts"],
  },
  {
    slug: "variation",
    zh: "磁偏角",
    en: "Variation",
    category: "navigation",
    short: "磁北与真北之间的夹角——随地点和年份变化。",
    long: "地球的磁北极不在地理北极。香港当地约 3°W、英伦三岛 0°–4°W。海图角落的罗经盘标着年份和年变率。罗航向 + 变化角 = 磁航向；磁航向 + 自差 = 罗航向。CADET 口诀帮你记换算方向。",
    seeAlso: ["chartwork-and-tides"],
    related: ["deviation", "compass"],
  },
  {
    slug: "deviation",
    zh: "自差",
    en: "Deviation",
    category: "navigation",
    short: "船上铁器对罗经的干扰——每个船头方向都不同。",
    long: "deviation 表（自差表）由专业人员校准，贴在罗经柜旁。校准方法：\"转动船头到不同方位，对照已知目标方位\"。新装电子设备会改变 deviation——必须重新校准。",
    related: ["variation", "compass"],
  },
  {
    slug: "compass",
    zh: "罗经",
    en: "Compass",
    category: "navigation",
    short: "指北的仪器——磁罗经永远是电子失效时的最后一道防线。",
    long: "船上至少一只磁罗经（机械、无源）+ 一只电子罗经（带方位、可联仪表）。磁罗经永远要校准、永远要保留——GPS spoofing、断电、雷击都会让电子罗经失效。",
    related: ["variation", "deviation"],
  },
  {
    slug: "high-water",
    zh: "高潮",
    en: "High Water (HW)",
    aliases: ["HW"],
    category: "navigation",
    short: "潮汐周期中水位最高的时刻。",
    long: "每个港口的 HW 时刻每天后移约 50 分钟（太阴日）。标准港 HW 时刻和高度在 ATT（Admiralty Tide Tables）查；副港靠时差修正。HW 前后各一小时叫\"slack water\"——潮流最弱，进出港最好的窗口。",
    seeAlso: ["chartwork-and-tides"],
    related: ["low-water", "rule-of-twelfths"],
  },
  {
    slug: "low-water",
    zh: "低潮",
    en: "Low Water (LW)",
    aliases: ["LW"],
    category: "navigation",
    short: "潮汐周期中水位最低的时刻。",
    long: "LW 之间间隔约 12h 25min（太阴日的一半）。LW 时水深最浅，浅滩进出最危险——除非船吃水很浅，否则尽量避开 LW 时刻通过浅水道。",
    seeAlso: ["chartwork-and-tides"],
    related: ["high-water"],
  },
  {
    slug: "rule-of-twelfths",
    zh: "12 分之 1 法则",
    en: "Rule of Twelfths",
    category: "navigation",
    short: "估算潮高中间时刻的简化法则：1/12, 2/12, 3/12, 3/12, 2/12, 1/12。",
    long: "LW 到 HW 共 6 小时，每小时上涨的比例是上面这个序列。中间两小时（HW 前后各一）上涨最快、潮速最强；首尾两小时几乎不动。简化版正弦曲线，精度对游艇够用。",
    seeAlso: ["chartwork-and-tides"],
    related: ["high-water", "low-water"],
  },
  {
    slug: "tidal-stream",
    zh: "潮流",
    en: "Tidal Stream",
    category: "navigation",
    short: "水平移动的水流——和潮高变化（垂直）是两件事。",
    long: "Tidal Stream Atlas 与海图上的 tidal diamond 提供潮流数据。每个小时一格，前后 6 小时围绕参考港 HW。计算 EP 时必须按小时加进潮流向量。Springs 时流速最大、Neaps 时最小。",
    seeAlso: ["chartwork-and-tides"],
  },
  {
    slug: "springs-neaps",
    zh: "大潮小潮",
    en: "Springs / Neaps",
    category: "navigation",
    short: "约 14 天循环的潮差变化——大潮在满月/新月、小潮在上下弦。",
    long: "大潮（Springs）= 太阳月亮引力对齐 = 潮差最大、潮速最强；小潮（Neaps）= 太阳月亮垂直 = 潮差最小、潮速最弱。Spring tide 与\"春天\"无关，源自\"涌起 spring up\"。",
    seeAlso: ["chartwork-and-tides"],
  },
  {
    slug: "chart-datum",
    zh: "海图基准",
    en: "Chart Datum",
    aliases: ["CD"],
    category: "navigation",
    short: "海图水深的零参考线——通常是 LAT（最低天文低潮）。",
    long: "海图标的水深都从 CD 起算。实际水深 = 海图水深 + 当前潮高（潮高永远 ≥ 0）。所以即使海图标\"0.5m\"，HW 时实际可能 4–5m。这是新手最容易混淆的概念。",
    seeAlso: ["chartwork-and-tides"],
  },
  {
    slug: "celestial-navigation",
    zh: "天文导航",
    en: "Celestial Navigation",
    category: "navigation",
    short: "用六分仪观测太阳/月亮/恒星定位——GPS 时代的最后保险。",
    long: "古典航海技艺。正午太阳高度 + 当日赤纬 → 纬度；连续观测 + 准确时间 → 经度。Yachtmaster Ocean 必修。现代意义不在精度（GPS 更准），而在\"电子全失效时仍能从太平洋中间走回来\"。",
    seeAlso: ["celestial-and-pilotage"],
    related: ["sextant"],
  },
  {
    slug: "sextant",
    zh: "六分仪",
    en: "Sextant",
    category: "navigation",
    short: "测量天体与地平线之间夹角的光学仪器。",
    long: "双反射原理——把太阳像\"拉\"到地平线，读弧上刻度。精度 ±1 弧分 ≈ ±1 海里。颠簸甲板上保持地平线靠\"眼睛-膝盖-节奏\"。索引误差（IE）必须每次校准。",
    seeAlso: ["celestial-and-pilotage"],
    related: ["celestial-navigation"],
  },

  /* ========== 安全 ========== */
  {
    slug: "lifejacket",
    zh: "救生衣",
    en: "Lifejacket / PFD",
    aliases: ["PFD"],
    category: "safety",
    short: "提供浮力让人头部仰起的可穿戴装置——海上不穿等于赌命。",
    long: "ISO 12402 分 50N / 100N / 150N / 275N 四级。150N 是远洋帆船标配。配 lifejacket light、whistle、spray hood、crotch strap。自动充气 vs 手动——多数游艇用自动。",
    seeAlso: ["sea-survival-theory", "seamanship-and-safety"],
  },
  {
    slug: "harness",
    zh: "安全带",
    en: "Safety Harness",
    category: "safety",
    short: "系挂式安全带——配合 jackline 防止落水。",
    long: "现代 harness 通常集成在 150N 救生衣里，配 tether（系绳）。规则：上甲板就挂——尤其是夜里、单人值班、风超 25 节、能见度差。",
    seeAlso: ["sea-survival-theory"],
    related: ["jackline"],
  },
  {
    slug: "jackline",
    zh: "贯通索",
    en: "Jackline",
    category: "safety",
    short: "甲板上从船头到船尾的安全索——船员的 tether 挂在上面。",
    long: "纤维带或钢丝绳，安装时要避开 cleat 等容易卡的位置。理想长度让船员能到任何甲板位置而不需要松开 tether。新船下水第一周必须装好。",
    related: ["harness"],
  },
  {
    slug: "liferaft",
    zh: "救生筏",
    en: "Liferaft",
    category: "safety",
    short: "弃船时使用的可充气筏——船上至少 1 个，远洋更多。",
    long: "ISO 9650（小船）或 SOLAS（大船）标准。自动充气靠 hydrostatic release（水压释放）或 painter line（手动拉绳）。检验周期通常 12 个月。原则：\"上救生筏 = step up\"——船必须低于救生筏才弃船。",
    seeAlso: ["sea-survival-theory"],
  },
  {
    slug: "epirb",
    zh: "应急位置无线电信标",
    en: "EPIRB",
    aliases: ["Emergency Position-Indicating Radio Beacon"],
    category: "safety",
    short: "弃船时激活、向卫星发送求救与位置的设备。",
    long: "406 MHz 通过 Cospas-Sarsat 卫星系统接力到最近的海上救援协调中心（MRCC），通常 5–15 分钟内被定位。注册 EPIRB 时填的应急联系人是救援第一时间联络的对象。",
    seeAlso: ["vhf-and-comms", "sea-survival-theory"],
    related: ["mayday", "sart"],
  },
  {
    slug: "sart",
    zh: "搜救应答器",
    en: "SART",
    category: "safety",
    short: "在搜救船的雷达屏上显示出 12 个连续点的应答器。",
    long: "X-band 雷达频率响应器。当搜救船的雷达扫到 SART，它在屏上画出一串特征点，救援船跟着这串点走就能找到你。AIS-SART 是新一代——通过 AIS 直接广播位置。",
    seeAlso: ["radar-and-electronics"],
    related: ["epirb"],
  },
  {
    slug: "colregs",
    zh: "国际海上避碰规则",
    en: "COLREGS / IRPCS",
    aliases: ["IRPCS", "国际海上避碰规则"],
    category: "safety",
    short: "1972 年 IMO 通过的全球航海避碰规则——38 条规则。",
    long: "适用于所有海域、所有船舶。最重要的是 Rule 5（瞭望）、Rule 7（避碰风险判定）、Rule 8（行动）、Rule 15（交叉相遇）、Rule 19（能见度受限）。RYA / ASA / IYT 都把它作为笔试核心。",
    seeAlso: ["lights-shapes-sounds", "seamanship-and-safety"],
  },
  {
    slug: "cpa",
    zh: "最接近距离",
    en: "Closest Point of Approach (CPA)",
    aliases: ["CPA"],
    category: "safety",
    short: "两船按当前航向航速继续，会最近达到的距离。",
    long: "雷达和 AIS 都能计算 CPA。CPA = 0 意味着碰撞，CPA < 0.5 海里在繁忙水域是危险信号。配 TCPA（到 CPA 的时间），船长判断\"还有多少时间避让\"。",
    seeAlso: ["radar-and-electronics"],
    related: ["tcpa", "colregs"],
  },
  {
    slug: "tcpa",
    zh: "到最近距离的时间",
    en: "Time to CPA (TCPA)",
    aliases: ["TCPA"],
    category: "safety",
    short: "按当前航向航速、还需多少分钟达到 CPA。",
    long: "TCPA < 12 分钟通常意味着需要立刻决策。TCPA 是负数表示 CPA 已过——两船在拉开距离。",
    related: ["cpa"],
  },

  /* ========== 通信 ========== */
  {
    slug: "vhf",
    zh: "甚高频电台",
    en: "VHF Radio",
    aliases: ["VHF"],
    category: "communications",
    short: "船上最主要的近距离通信设备——视距通信，约 25–30 海里。",
    long: "156–174 MHz 频段。CH16 是国际求救与呼叫频道，CH70 是 DSC 专用，CH13 是桥到桥。1 W 用于近距、25 W 用于远距。VHF 不是手机——它是\"求救门\"，每个船员都该会用。",
    seeAlso: ["vhf-and-comms"],
    related: ["dsc", "mayday"],
  },
  {
    slug: "dsc",
    zh: "数字选择性呼叫",
    en: "Digital Selective Calling (DSC)",
    aliases: ["DSC"],
    category: "communications",
    short: "VHF 的\"红色按钮\"——长按 5 秒发送遇险数字报文。",
    long: "在 CH70 上发送数据包，含 MMSI、位置、遇险性质。海上救援机构和附近所有 DSC 船都会自动接收并响铃。发送后立刻切到 CH16 用语音补充 MAYDAY。误发必须立即取消。",
    seeAlso: ["vhf-and-comms"],
    related: ["mayday", "vhf", "mmsi"],
  },
  {
    slug: "mayday",
    zh: "求救",
    en: "MAYDAY",
    category: "communications",
    short: "国际海上最高级别求救——只在生命受到立即危险时使用。",
    long: '标准报文 7 项：呼叫 + 船名重复 3 次 + MMSI + 位置 + 性质 + 援助类型 + 船员数 + 弃船意图。重复 3 次"MAYDAY"以区别于其他通信。误发要立即取消、不能忽略。源自法语"m\'aider"（救我）。',
    seeAlso: ["vhf-and-comms"],
    related: ["pan-pan", "securite"],
  },
  {
    slug: "pan-pan",
    zh: "紧急",
    en: "PAN-PAN",
    category: "communications",
    short: "紧急但不立即危及生命——医疗咨询、机械故障、轻伤。",
    long: "等级低于 MAYDAY、高于 SECURITE。\"PAN-PAN PAN-PAN PAN-PAN\"重复 3 次后跟报文。VHF 16 频道呼出。源自法语\"panne\"（故障）。",
    seeAlso: ["vhf-and-comms"],
    related: ["mayday", "securite"],
  },
  {
    slug: "securite",
    zh: "安全",
    en: "SECURITE",
    category: "communications",
    short: "安全信息——气象、航行警告、漂浮物。",
    long: "三级警讯里最低一级。重复 3 次后给出安全信息——通常由海岸电台或救援中心发布。船员听到 SECURITE 应保持收听 30 秒，决定是否对自己有影响。",
    seeAlso: ["vhf-and-comms"],
    related: ["mayday", "pan-pan"],
  },
  {
    slug: "mmsi",
    zh: "海上身份码",
    en: "MMSI",
    aliases: ["Maritime Mobile Service Identity"],
    category: "communications",
    short: "9 位数字的船舶电台身份——前 3 位 MID 表示国家。",
    long: "向 ITU 或本国主管部门注册。DSC 求救、AIS 广播都用 MMSI 识别船。买二手船一定要重新注册 MMSI——旧主人的 MMSI 在你船上发求救会让救援队搞错。",
    seeAlso: ["vhf-and-comms"],
    related: ["dsc"],
  },
  {
    slug: "gmdss",
    zh: "全球海上遇险与安全系统",
    en: "GMDSS",
    aliases: ["Global Maritime Distress and Safety System"],
    category: "communications",
    short: "1999 年正式启用的全球海上求救系统——取代了 morse 与 CH16 守听。",
    long: "把海上分成 4 个区域 A1（VHF 覆盖区）/ A2（MF）/ A3（Inmarsat）/ A4（HF 高纬度）。三大功能：报警 / 协调 / 现场通信。EPIRB、SART、AIS-SART、NAVTEX 都属 GMDSS。",
    seeAlso: ["vhf-and-comms"],
    related: ["epirb", "sart"],
  },
  {
    slug: "ais",
    zh: "船舶自动识别系统",
    en: "AIS",
    aliases: ["Automatic Identification System"],
    category: "communications",
    short: "船自动广播 MMSI、位置、航向、航速、目的港的系统。",
    long: "Class A 是商船强制；Class B 是游艇自愿。AIS 让你看到周围船的实时数据——比雷达更准（雷达靠回波，AIS 靠数据广播）。但渔船经常关 AIS，所以不能完全替代雷达。",
    seeAlso: ["radar-and-electronics"],
    related: ["mmsi"],
  },

  /* ========== 引擎 ========== */
  {
    slug: "diesel-engine",
    zh: "柴油机",
    en: "Diesel Engine",
    category: "engine-systems",
    short: "海船的主要动力——靠压缩自燃，不用火花塞。",
    long: '压缩比 17:1 让空气热到自燃。海船柴油机和陆地不同——配 raw water cooling（海水冷却）、marine-grade alternator、wet exhaust。Yanmar / Volvo Penta 是常见品牌。船长该懂"四要素"：燃料 / 空气 / 压缩 / timing。',
    seeAlso: ["diesel-engine"],
    related: ["impeller", "racor"],
  },
  {
    slug: "impeller",
    zh: "叶轮",
    en: "Impeller",
    category: "engine-systems",
    short: "海水冷却泵的橡胶叶片——船长该会换的第一个零件。",
    long: '坏掉 = 引擎过热 = 严重事故。备件每艘船都要带至少一个。换 impeller 是 RYA Diesel Engine 必考动作——拆泵盖、抽出旧的、装新的、确保叶片方向对。',
    seeAlso: ["diesel-engine"],
  },
  {
    slug: "racor",
    zh: "Racor 主滤器",
    en: "Racor",
    category: "engine-systems",
    short: "燃料系统的主滤——透明杯能看到水和杂质。",
    long: '海上柴油的两大敌人——水和 diesel bug（生物菌膜）。Racor 杯底有水必须放掉。换 Racor 滤芯后必须 bleed（排气）才能启动引擎。船上备件最少 2 个滤芯。',
    seeAlso: ["diesel-engine"],
  },
  {
    slug: "bleeding",
    zh: "排气",
    en: "Bleeding",
    category: "engine-systems",
    short: "燃料系统进气后用手摇泵把气排出来——否则引擎不工作。",
    long: '换滤芯、油箱跑空、喷油泵动过，都必须 bleed。流程：松开喷油器排气螺丝 → 手摇泵直到只出柴油不出气泡 → 拧紧。Yanmar 与 Volvo 螺丝位置不同——找好"自己这艘船在哪"。',
    seeAlso: ["diesel-engine"],
  },
  {
    slug: "zinc-anode",
    zh: "锌阳极",
    en: "Zinc Anode / Sacrificial Anode",
    aliases: ["sacrificial anode"],
    category: "engine-systems",
    short: "船底/螺旋桨/舵附近的锌块——替更贵的金属\"先被腐蚀\"。",
    long: '电化学保护——锌比铜/不锈钢电位低，海水里锌先溶解。每年下水检查，剩 < 50% 必须换。锌阳极换完，铜/铝/不锈钢部件才不会被电解。',
    seeAlso: ["diesel-engine"],
  },
];

/* —— 工具函数 —— */

const bySlug = new Map<string, Term>(terms.map((t) => [t.slug, t]));

export function getTerm(slug: string): Term | undefined {
  return bySlug.get(slug);
}

export function listTermSlugs(): string[] {
  return terms.map((t) => t.slug);
}

export function termsByCategory(): Record<GlossaryCategory, Term[]> {
  const out = {} as Record<GlossaryCategory, Term[]>;
  for (const cat of Object.keys(categoryInfo) as GlossaryCategory[]) {
    out[cat] = terms.filter((t) => t.category === cat);
  }
  return out;
}

export function searchTerms(query: string): Term[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return terms.filter(
    (t) =>
      t.zh.toLowerCase().includes(q) ||
      t.en.toLowerCase().includes(q) ||
      t.aliases?.some((a) => a.toLowerCase().includes(q)) ||
      t.slug.includes(q)
  );
}
