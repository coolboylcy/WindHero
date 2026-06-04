/**
 * WindHero 课程数据模型
 *
 * 对标 RYA Day Skipper / Coastal / Yachtmaster 理论体系的章节结构，
 * 但所有教学正文、题目、示例均为 WindHero 原创撰写。
 */

export type CourseLevel = "入门" | "进阶" | "船长之路";

export type RyaTier =
  | "Start Yachting"
  | "Competent Crew"
  | "Day Skipper Theory"
  | "Coastal Skipper / Yachtmaster Theory"
  | "Yachtmaster Ocean Theory"
  | "VHF/SRC"
  | "Sea Survival";

/** —— 课程文本块（用于 Lesson body） —— */

export type LessonBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "callout";
      tone: "note" | "warn" | "tip";
      title?: string;
      body: string;
    }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "definition"; term: string; meaning: string }
  | {
      /** 调用预设的 SVG 插画（在 LessonRenderer 里映射）。 */
      type: "diagram";
      kind:
        | "points-of-sail"
        | "apparent-wind"
        | "wind-shift-vmg"
        | "sea-breeze-cycle"
        | "frontal-system"
        | "pressure-gradient"
        | "buoyage-iala-a"
        | "compass-rose"
        | "tide-curve"
        | "lights-vessels"
        | "colregs-crossing"
        | "celestial-triangle"
        | "three-cell-circulation"
        | "coriolis-deflection"
        | "isobar-wind"
        | "cts-plotter"
        | "lights-identifier"
        | "heave-to-balance"
        | "dr-abc-flow"
        | "cpr-on-board"
        | "bleeding-control-ladder"
        | "hypothermia-core-rewarm"
        | "vhf-radio-horizon"
        | "vhf-station-identity"
        | "gmdss-alert-loop"
        | "dsc-distress-timeline"
        | "mayday-message-structure"
        | "vhf-call-format"
        | "diesel-four-stroke"
        | "diesel-fault-tree"
        | "fuel-bleed-path"
        | "engine-cooling-loops"
        | "lifejacket-fit-check"
        | "lifejacket-buoyancy-classes"
        | "flare-signal-range"
        | "liferaft-anatomy"
        | "liferaft-first-actions"
        | "help-huddle-posture"
        | "sea-survival-abc"
        | "patient-assessment-station"
        | "choking-action-map"
        | "mob-distance-timeline"
        | "mob-recovery-patterns"
        | "sound-signal-negotiation"
        | "radar-rml-plot"
        | "ais-radar-overlap";
      caption?: string;
    }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "practice"; prompt: string; hint?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

/** —— 题目 —— */

export type Question = {
  id: string;
  q: string;
  /** 4 个选项，索引 0–3 */
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  /** 答完后给学员看的解释，1–2 句 */
  explanation: string;
  /** 题目所属知识点标签，用于复盘 */
  topic?: string;
};

/** —— 课时 —— */

export type Lesson = {
  slug: string;
  /** 课时编号，如 1.1、2.3 */
  index: string;
  title: string;
  /** 一句话概要，用于课时列表 */
  summary: string;
  /** 预计学习时长 */
  duration: string;
  /** 学完后能做什么 */
  outcomes: string[];
  /** 教学正文 */
  body: LessonBlock[];
  /** 课后小测 */
  quiz: Question[];
  /** 对应的 RYA 大纲条目，便于学员对照官方 syllabus */
  ryaSyllabusItems?: string[];
};

/** —— 模块（多课时合集） —— */

export type Module = {
  slug: string;
  index: number;
  title: string;
  summary: string;
  lessons: Lesson[];
};

/** —— 资源 —— */

export type Resource = {
  title: string;
  /** 简短说明 */
  description: string;
  url: string;
  /** 类型，决定图标与排序 */
  type:
    | "book"
    | "tool"
    | "app"
    | "site"
    | "video"
    | "chart"
    | "open-source";
  /** 是否完全免费/开源 */
  free: boolean;
  /** 使用指南，1–3 段 */
  guide?: string;
};

/** —— 模拟考试 —— */

export type Exam = {
  /** 考试时长（分钟） */
  durationMinutes: number;
  /** 及格分（百分比 0–100） */
  passMark: number;
  /** 完整题库 —— 真实考试时会从这个池子里随机抽题（如设置了 drawCount） */
  questions: Question[];
  /**
   * 每次考试随机抽取的题数。
   * 不设或 ≥ questions.length 时使用全部题目。
   * 设置后每次考试随机从题库抽 drawCount 道、每次重做都换一组。
   */
  drawCount?: number;
  /** 说明 */
  brief: string;
  /** 真实考试参考（如对标 RYA Day Skipper Theory exam） */
  refersTo?: string;
};

/** —— 完整课程 —— */

export type Course = {
  slug: string;
  /** 课程编号 WH-101 等 */
  code: string;
  title: string;
  level: CourseLevel;
  duration: string;
  summary: string;
  /** 对标的 RYA 等级 */
  ryaEquivalent: RyaTier;
  /** 前置课程 slug 列表 */
  prerequisites?: string[];
  /** 适合的学员画像 */
  suitableFor: string[];
  /** 学完能做什么 */
  youWillLearn: string[];
  /** 章节模块 */
  modules: Module[];
  /** 模拟考试。船上实战课等没有笔试的课程可以省略。 */
  exam?: Exam;
  /** 资源页 */
  resources: Resource[];
  /** 仅"船上实战"等非线上理论课填写：在详情页用一段简介解释为什么没有在线测验。 */
  practicalNote?: string;
};
