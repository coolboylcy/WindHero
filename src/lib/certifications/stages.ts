/**
 * WindHero 课程的 6 阶段学习路径
 *
 * 这套阶段框架与三大体系（RYA / ASA / IYT）的等级阶梯对应，
 * 但用更直觉的中文描述：从「我能不能上船」到「我能不能跨太平洋」。
 */

export type Stage =
  | "intro"
  | "crew"
  | "day-skipper"
  | "night-coastal"
  | "offshore"
  | "ocean";

export const stageOrder: Stage[] = [
  "intro",
  "crew",
  "day-skipper",
  "night-coastal",
  "offshore",
  "ocean",
];

export const stageInfo: Record<
  Stage,
  {
    label: string; // 阶段中文名
    sub: string; // 英文
    intro: string; // 一句话定义
    ryaEquiv: string;
    asaEquiv: string;
    iytEquiv: string;
    achievement: string; // 学完这阶段你能做的事
  }
> = {
  intro: {
    label: "入门",
    sub: "Foundation",
    intro: "建立对风、海、帆的物理直觉。还没上船，但已经懂为什么船能跑。",
    ryaEquiv: "Pre-Essential Navigation",
    asaEquiv: "Pre-ASA 101",
    iytEquiv: "Pre-Crew",
    achievement: "懂得风从哪里来、帆为什么有方向、自己的航海舞台属于哪一圈",
  },
  crew: {
    label: "船员",
    sub: "Crew",
    intro: "你能作为船员胜任日间近岸航段——值班、调帆、避碰、应急。",
    ryaEquiv: "Competent Crew",
    asaEquiv: "ASA 101 Basic Keelboat",
    iytEquiv: "International Crew",
    achievement: "白天能独立完成船员所有岗位任务、应付一次基本的应急演练",
  },
  "day-skipper": {
    label: "日间船长",
    sub: "Day Skipper",
    intro: "你能带一艘船在日光里完成一段近岸航段——规划、引航、决策、靠泊。",
    ryaEquiv: "Day Skipper Theory + Practical",
    asaEquiv: "ASA 103 + 104 (Bareboat Cruising)",
    iytEquiv: "International Bareboat Skipper",
    achievement:
      "能从 A 港规划到 B 港、读懂海图与潮汐、操控全船、应对常见故障",
  },
  "night-coastal": {
    label: "夜间 / 近岸",
    sub: "Night & Coastal",
    intro:
      "你能在夜里、能见度受限的海面上、距离海岸 ≤ 60 海里的范围里指挥航行。",
    ryaEquiv: "Coastal Skipper Theory + Practical",
    asaEquiv: "ASA 105 (Coastal Nav) + 106 (Advanced Coastal)",
    iytEquiv: "International Yachtmaster Coastal",
    achievement:
      "能读雷达图像、夜间值班、用 IRPCS 避碰、靠 transit 在浓雾里进港",
  },
  offshore: {
    label: "远海远航",
    sub: "Offshore",
    intro:
      "你能指挥一段 60–200 海里的离岸航段——多日值班、天气路由、应急响应。",
    ryaEquiv: "Yachtmaster Offshore Theory + Practical",
    asaEquiv: "ASA 108 (Offshore Passagemaking)",
    iytEquiv: "International Yachtmaster Offshore",
    achievement: "能领导一支船员在连续 72 小时航段里安全运行",
  },
  ocean: {
    label: "跨洋",
    sub: "Ocean",
    intro:
      "你能规划并完成一段 ≥ 600 海里、无陆地参照的远洋航段——天文导航、长期补给、孤立环境的心理学。",
    ryaEquiv: "Yachtmaster Ocean Theory + Practical",
    asaEquiv: "ASA 107 (Celestial Nav)",
    iytEquiv: "International Yachtmaster Ocean",
    achievement: "能独立完成跨太平洋、跨大西洋一类的远洋航段",
  },
};

/* —— 每门 WindHero 课对应的阶段 —— */

/**
 * 每门课对应一个或多个阶段。
 * 第一个阶段是「主」阶段，决定在 /courses 列表里默认显示在哪一组。
 */
export const courseStages: Record<string, Stage[]> = {
  "reading-the-wind": ["intro"],
  "chartwork-and-tides": ["day-skipper"],
  "lights-shapes-sounds": ["day-skipper", "night-coastal"],
  "vhf-and-comms": ["crew", "day-skipper"],
  "diesel-engine": ["day-skipper"],
  "marine-first-aid": ["crew", "night-coastal"],
  "radar-and-electronics": ["night-coastal"],
  "weather-and-routing": ["night-coastal", "offshore"],
  "seamanship-and-safety": ["crew", "day-skipper", "night-coastal"],
  "sea-survival-theory": ["offshore"],
  "celestial-and-pilotage": ["night-coastal", "ocean"],
  "captains-mind": ["offshore", "ocean"],
  "offshore-passage": ["ocean"],
};

export function getPrimaryStage(slug: string): Stage | undefined {
  return courseStages[slug]?.[0];
}

export function getCoursesForStage(stage: Stage): string[] {
  return Object.entries(courseStages)
    .filter(([, stages]) => stages.includes(stage))
    .map(([slug]) => slug);
}
