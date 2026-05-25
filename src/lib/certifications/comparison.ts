/**
 * RYA / ASA / IYT 三大民用帆船认证体系对比数据。
 *
 * 数据来源：各机构官网公开大纲。
 * 用于 /certifications 页面的对比表与各体系简介。
 */

export type CertBody = "rya" | "asa" | "iyt";

export const bodyInfo: Record<
  CertBody,
  {
    name: string;
    fullName: string;
    country: string;
    founded: number;
    recognition: string;
    style: string;
    pros: string[];
    cons: string[];
    bestFor: string;
    url: string;
  }
> = {
  rya: {
    name: "RYA",
    fullName: "Royal Yachting Association",
    country: "英国",
    founded: 1875,
    recognition: "70+ 国家承认；欧洲、地中海、加勒比租船的事实标准",
    style: "理论严谨、阶段清晰、理论与实操分别考核",
    pros: [
      "笔试 + 实操分开，可以分阶段攻克",
      "海图作业训练扎实，纸图基本功最好",
      "欧洲与英联邦国家最受认",
      "Yachtmaster Offshore/Ocean 在职业航海圈含金量最高",
    ],
    cons: [
      "对英语笔试有一定要求",
      "海图作业用 UKHO 标准训练图，与美式略有差异",
      "实操考核较严格，时间投入大",
    ],
    bestFor: "在欧洲/地中海/加勒比租船或工作的人；想做职业船长的人",
    url: "https://www.rya.org.uk",
  },
  asa: {
    name: "ASA",
    fullName: "American Sailing Association",
    country: "美国",
    founded: 1983,
    recognition: "美国本土主流标准；加勒比 BVI 区域广泛接受",
    style: "数字编号 ASA 101–118 模块化，每门独立可学",
    pros: [
      "模块化，按需选课，对应不同水平段",
      "美国本土学校密集，学习便利",
      "每门课时间相对短，节奏快",
      "考核侧重实操，理论与实操融合在同一门课里",
    ],
    cons: [
      "在欧洲/亚洲认可度不及 RYA",
      "高级证书（106/108）国际地位略弱于 Yachtmaster",
      "天文导航（107）是选修而非主路径必修",
    ],
    bestFor: "在美国/加勒比租船、不打算做职业船长的人；想最快上手的爱好者",
    url: "https://asa.com",
  },
  iyt: {
    name: "IYT",
    fullName: "International Yacht Training Worldwide",
    country: "加拿大（业务全球）",
    founded: 1998,
    recognition:
      "25+ 国家政府/海事局承认；超级游艇行业（Med 区）的主流通行证",
    style: "面向国际职业市场设计；理论 + 实操合一",
    pros: [
      "全球认可度高，尤其是 Med 区超级游艇圈",
      "Yachtmaster 系列直接对应 STCW 商业海员要求",
      "学校网络遍布地中海、加勒比、东南亚",
      "课程语言以英语为主，国际化程度高",
    ],
    cons: [
      "比 RYA 更新（1998 成立），传统认可度略弱",
      "在英国本土仍以 RYA 为先",
      "学校质量参差，需要挑选合规中心",
    ],
    bestFor: "想在 Med 区或国际超级游艇行业工作的人；想要全球通用证书的人",
    url: "https://www.iytworld.com",
  },
};

/* —— 阶梯对照表 ——
   按 6 个 WindHero 阶段对齐，每个阶段列出三体系对应等级。
*/

export type LadderRow = {
  stage: string;
  stageSub: string;
  rya: string;
  ryaType: "theory" | "practical" | "both";
  asa: string;
  asaType: "theory" | "practical" | "both";
  iyt: string;
  iytType: "theory" | "practical" | "both";
  windhero: string;
};

export const ladder: LadderRow[] = [
  {
    stage: "入门",
    stageSub: "Foundation",
    rya: "—",
    ryaType: "theory",
    asa: "—",
    asaType: "theory",
    iyt: "—",
    iytType: "theory",
    windhero: "WH-101 读懂风",
  },
  {
    stage: "船员",
    stageSub: "Crew",
    rya: "Competent Crew",
    ryaType: "practical",
    asa: "ASA 101 Basic Keelboat",
    asaType: "both",
    iyt: "International Crew",
    iytType: "both",
    windhero: "WH-107 / 111 / 212（部分）",
  },
  {
    stage: "日间船长",
    stageSub: "Day Skipper",
    rya: "Day Skipper Theory + Practical",
    ryaType: "both",
    asa: "ASA 103 + 104",
    asaType: "both",
    iyt: "International Bareboat Skipper",
    iytType: "both",
    windhero: "WH-103 / 105 / 109 / 212",
  },
  {
    stage: "夜间 / 近岸",
    stageSub: "Coastal",
    rya: "Coastal Skipper / Yachtmaster Theory + Coastal Skipper Practical",
    ryaType: "both",
    asa: "ASA 105 + 106",
    asaType: "both",
    iyt: "International Yachtmaster Coastal",
    iytType: "both",
    windhero: "WH-113 / 204 / 228（部分）",
  },
  {
    stage: "远海远航",
    stageSub: "Offshore",
    rya: "Yachtmaster Offshore Practical",
    ryaType: "practical",
    asa: "ASA 108 Offshore Passagemaking",
    asaType: "both",
    iyt: "International Yachtmaster Offshore",
    iytType: "both",
    windhero: "WH-211 / 301 / 204 / 212",
  },
  {
    stage: "跨洋",
    stageSub: "Ocean",
    rya: "Yachtmaster Ocean Theory + Practical",
    ryaType: "both",
    asa: "ASA 107 Celestial",
    asaType: "theory",
    iyt: "International Yachtmaster Ocean",
    iytType: "both",
    windhero: "WH-228 / 301 / 401",
  },
];

/* —— 专题课 ——（不在主阶梯里，但都是常见证书） */

export type SpecialistRow = {
  topic: string;
  rya: string;
  asa: string;
  iyt: string;
  windhero: string;
  note: string;
};

export const specialists: SpecialistRow[] = [
  {
    topic: "VHF / 海事通信",
    rya: "SRC (Short Range Certificate)",
    asa: "无独立课程（融入 ASA 103）",
    iyt: "VHF SRC",
    windhero: "WH-107",
    note: "理论 WindHero 全覆盖；实操与发证必须 RYA/IYT 认证学校",
  },
  {
    topic: "柴油机",
    rya: "Diesel Engine",
    asa: "无独立课程（融入 ASA 104）",
    iyt: "无独立课程",
    windhero: "WH-109",
    note: "WindHero 完整覆盖（理论 + 维护计划）",
  },
  {
    topic: "海上急救",
    rya: "First Aid",
    asa: "无独立课程（推荐红十字会）",
    iyt: "Medical Person In Charge（高级证书）",
    windhero: "WH-111",
    note: "理论 WindHero 覆盖；CPR/绷带手法必须线下练",
  },
  {
    topic: "海上求生",
    rya: "Sea Survival",
    asa: "无独立课程",
    iyt: "STCW Basic Safety（含求生）",
    windhero: "WH-211",
    note: "理论 WindHero 覆盖；湿训部分必须线下完成",
  },
  {
    topic: "雷达",
    rya: "Radar",
    asa: "无独立课程",
    iyt: "无独立课程（融入 Yachtmaster）",
    windhero: "WH-113",
    note: "WindHero 完整覆盖",
  },
];
