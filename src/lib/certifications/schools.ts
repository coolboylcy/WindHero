/**
 * 全球认证学校精选目录
 *
 * 数据来源：各机构官网公开的认证学校列表 + 国际帆船社区口碑。
 * 这不是穷尽列表——只挑了在各地区有代表性、对中文学员友好或有
 * 远程支援的学校。
 *
 * 注：联系学校前请通过其官网二次确认课程时间与价格。
 */

import type { CertBody } from "./comparison";
import type { Stage } from "./stages";

export type SchoolRegion =
  | "uk-ireland"
  | "europe-med"
  | "americas-east"
  | "americas-west"
  | "caribbean"
  | "asia-pacific"
  | "oceania";

export const regionInfo: Record<
  SchoolRegion,
  { label: string; description: string }
> = {
  "uk-ireland": {
    label: "英国 & 爱尔兰",
    description: "RYA 大本营，地理上靠近欧陆，季节性最适合 5–9 月",
  },
  "europe-med": {
    label: "地中海 & 欧洲大陆",
    description: "IYT 与 RYA 并行的市场，超级游艇行业聚集地，4–10 月旺季",
  },
  "americas-east": {
    label: "美国东岸 & 加拿大",
    description: "ASA 主战场，新英格兰、五大湖、佛州海岸",
  },
  "americas-west": {
    label: "美国西岸",
    description: "ASA 加州/华盛顿州学校密集，旧金山湾区是冷风技术训练经典舞台",
  },
  caribbean: {
    label: "加勒比",
    description: "11 月–5 月旺季，BVI 是 ASA Bareboat 与 RYA Day Skipper 实操经典海域",
  },
  "asia-pacific": {
    label: "亚太",
    description: "香港、新加坡、泰国、菲律宾的认证学校；中文支持较好的选项集中在这里",
  },
  oceania: {
    label: "澳新",
    description: "南半球认证体系完整，悉尼湾、奥克兰、新喀里多尼亚是经典海域",
  },
};

export type School = {
  slug: string;
  name: string;
  nameEn: string;
  region: SchoolRegion;
  country: string;
  city: string;
  bodies: CertBody[]; // 认证体系
  stages: Stage[]; // 可发证阶段
  url: string;
  notes: string;
  /** 是否对中文学员有专门支持（中文教练、中文资料、华人社群等） */
  chineseFriendly?: boolean;
};

/**
 * 精选 24 所学校，覆盖主要地理区域 + 三大认证体系。
 *
 * 选择标准：
 * 1) 在官方机构注册有效；
 * 2) 中文社群有口碑或网站有英文/中文支持；
 * 3) 价格透明、可在线查询课程时间。
 */
export const schools: School[] = [
  /* —— UK & Ireland —— */
  {
    slug: "uksa",
    name: "UKSA",
    nameEn: "UK Sailing Academy",
    region: "uk-ireland",
    country: "英国",
    city: "Cowes, Isle of Wight",
    bodies: ["rya"],
    stages: ["crew", "day-skipper", "night-coastal", "offshore", "ocean"],
    url: "https://www.uksa.org",
    notes: "RYA 体系最权威的训练中心之一；Yachtmaster Offshore 含金量高。",
  },
  {
    slug: "hamble",
    name: "Hamble School of Yachting",
    nameEn: "Hamble School of Yachting",
    region: "uk-ireland",
    country: "英国",
    city: "Hamble-le-Rice",
    bodies: ["rya"],
    stages: ["day-skipper", "night-coastal", "offshore"],
    url: "https://www.hamble.co.uk",
    notes: "南安普顿水域，RYA 全系列课程，海况丰富。",
  },
  {
    slug: "ondeck",
    name: "OnDeck Sailing",
    nameEn: "OnDeck Sailing",
    region: "uk-ireland",
    country: "英国",
    city: "Southampton",
    bodies: ["rya"],
    stages: ["day-skipper", "night-coastal", "offshore", "ocean"],
    url: "https://ondecksailing.com",
    notes: "RYA + 跨大西洋 mile-building 航段闻名；夏天往返地中海。",
  },

  /* —— Europe & Med —— */
  {
    slug: "sailing-europe",
    name: "Sailing Europe",
    nameEn: "Sailing Europe",
    region: "europe-med",
    country: "克罗地亚",
    city: "Split",
    bodies: ["rya", "iyt"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.sailing-europe.com",
    notes: "亚得里亚海训练基地，IYT 与 RYA 双轨制，6 国语言支持。",
  },
  {
    slug: "iyt-malta",
    name: "International Yacht Training Malta",
    nameEn: "IYT Malta",
    region: "europe-med",
    country: "马耳他",
    city: "Valletta",
    bodies: ["iyt"],
    stages: ["day-skipper", "night-coastal", "offshore", "ocean"],
    url: "https://www.iytworld.com",
    notes: "IYT 总部认证；冬季亦可训练，海况温和。",
  },
  {
    slug: "rorc-training",
    name: "Sailing Logic",
    nameEn: "Sailing Logic (Palma)",
    region: "europe-med",
    country: "西班牙",
    city: "Palma de Mallorca",
    bodies: ["rya"],
    stages: ["night-coastal", "offshore", "ocean"],
    url: "https://www.sailinglogic.co.uk",
    notes: "Med 区 mile-building 与 Yachtmaster Prep 闻名，常有大西洋往返航段。",
  },
  {
    slug: "atlantic-sailing-academy",
    name: "Atlantic Sailing Academy",
    nameEn: "Atlantic Sailing Academy",
    region: "europe-med",
    country: "葡萄牙",
    city: "Lagos",
    bodies: ["rya", "iyt"],
    stages: ["day-skipper", "night-coastal", "offshore"],
    url: "https://www.atlanticsailingacademy.com",
    notes: "南欧大西洋边缘，浪况比 Med 显著大；适合 Yachtmaster 准备。",
  },

  /* —— Americas East —— */
  {
    slug: "j-world",
    name: "J/World Annapolis",
    nameEn: "J/World Performance Sailing School",
    region: "americas-east",
    country: "美国",
    city: "Annapolis, MD",
    bodies: ["asa"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.jworldannapolis.com",
    notes: "切萨皮克湾基地；ASA 101–106 完整 + 高性能赛艇课程。",
  },
  {
    slug: "offshore-sailing",
    name: "Offshore Sailing School",
    nameEn: "Offshore Sailing School",
    region: "americas-east",
    country: "美国",
    city: "Fort Myers, FL & Captiva Island",
    bodies: ["asa"],
    stages: ["crew", "day-skipper", "night-coastal", "offshore"],
    url: "https://www.offshoresailing.com",
    notes: "美国最大的认证学校之一，1964 年成立；新手到 Offshore 全覆盖。",
  },
  {
    slug: "blue-water-sailing-school",
    name: "Blue Water Sailing School",
    nameEn: "Blue Water Sailing School",
    region: "americas-east",
    country: "美国",
    city: "Fort Lauderdale, FL",
    bodies: ["asa"],
    stages: ["day-skipper", "night-coastal", "offshore"],
    url: "https://www.bwss.com",
    notes: "佛州训练基地 + 加勒比 BVI 实操周，含 ASA 108 Offshore Passagemaking。",
  },

  /* —— Americas West —— */
  {
    slug: "modern-sailing",
    name: "Modern Sailing School",
    nameEn: "Modern Sailing School & Club",
    region: "americas-west",
    country: "美国",
    city: "Sausalito, CA",
    bodies: ["asa"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.modernsailing.com",
    notes: "旧金山湾区，ASA 101–106 + 加勒比远航团；湾区冷风技术训练经典。",
  },
  {
    slug: "tradewinds",
    name: "Tradewinds Sailing School",
    nameEn: "Tradewinds Sailing School",
    region: "americas-west",
    country: "美国",
    city: "Richmond, CA",
    bodies: ["asa"],
    stages: ["crew", "day-skipper", "night-coastal", "offshore"],
    url: "https://www.tradewindssailing.com",
    notes: "旧金山湾区另一个 ASA 主基地，俱乐部模式。",
  },
  {
    slug: "san-juan-sailing",
    name: "San Juan Sailing",
    nameEn: "San Juan Sailing",
    region: "americas-west",
    country: "美国",
    city: "Bellingham, WA",
    bodies: ["asa"],
    stages: ["day-skipper", "night-coastal"],
    url: "https://www.sanjuansailing.com",
    notes: "Pacific Northwest 海域，多潮多雾，对 Coastal 技术训练好。",
  },

  /* —— Caribbean —— */
  {
    slug: "sail-caribbean",
    name: "Sail Caribbean Charters",
    nameEn: "Sail Caribbean (BVI)",
    region: "caribbean",
    country: "英属维京群岛",
    city: "Tortola",
    bodies: ["asa", "rya"],
    stages: ["day-skipper", "night-coastal"],
    url: "https://www.sailcaribbean.com",
    notes: "BVI 信风带稳定 12–25 节，新手 Bareboat 上手最快的地方。",
  },
  {
    slug: "tmm-bvi",
    name: "TMM Yacht Charters",
    nameEn: "TMM BVI Charter & Sailing School",
    region: "caribbean",
    country: "英属维京群岛",
    city: "Road Town",
    bodies: ["asa"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://sailtmm.com",
    notes: "ASA 101–106 一站式认证 + 现场租船过渡。",
  },

  /* —— Asia Pacific —— */
  {
    slug: "aquarius-hk",
    name: "Aquarius Sail Training",
    nameEn: "Aquarius Sail Training (HK)",
    region: "asia-pacific",
    country: "中国香港",
    city: "Hong Kong",
    bodies: ["rya"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.aquariussailtraining.com",
    notes: "香港 RYA 认证学校，对中文学员友好；南海训练海域。",
    chineseFriendly: true,
  },
  {
    slug: "simpson-marine-asia",
    name: "Simpson Marine RYA School",
    nameEn: "Simpson Marine RYA Training",
    region: "asia-pacific",
    country: "中国香港",
    city: "Hong Kong, Sanya, Phuket",
    bodies: ["rya"],
    stages: ["crew", "day-skipper", "night-coastal", "offshore"],
    url: "https://www.simpsonmarine.com",
    notes: "亚洲覆盖最广的 RYA 训练网络；中文支持完整。",
    chineseFriendly: true,
  },
  {
    slug: "sunsail-phuket",
    name: "Sunsail Phuket Sailing School",
    nameEn: "Sunsail Phuket",
    region: "asia-pacific",
    country: "泰国",
    city: "Phuket",
    bodies: ["rya", "iyt"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.sunsail.com/sailing-schools",
    notes: "全球连锁；安达曼海 11–4 月最佳，新手友好。",
  },
  {
    slug: "ona-singapore",
    name: "Ona Sailing School Singapore",
    nameEn: "Ona Sailing (Singapore)",
    region: "asia-pacific",
    country: "新加坡",
    city: "Singapore",
    bodies: ["rya"],
    stages: ["crew", "day-skipper", "night-coastal"],
    url: "https://www.onasailing.com",
    notes: "新加坡海峡训练；与马来语 / 普通话学员协作良好。",
    chineseFriendly: true,
  },

  /* —— Oceania —— */
  {
    slug: "flying-fish",
    name: "Flying Fish Sailing Academy",
    nameEn: "Flying Fish",
    region: "oceania",
    country: "澳大利亚",
    city: "Sydney",
    bodies: ["rya"],
    stages: ["crew", "day-skipper", "night-coastal", "offshore", "ocean"],
    url: "https://www.flyingfishonline.com",
    notes: "全球网络中的悉尼基地，Yachtmaster 准备口碑好。",
  },
  {
    slug: "ny-sailing-academy",
    name: "New Zealand Sailing Academy",
    nameEn: "NZ Sailing Academy",
    region: "oceania",
    country: "新西兰",
    city: "Auckland",
    bodies: ["rya"],
    stages: ["day-skipper", "night-coastal", "offshore"],
    url: "https://nzsailingacademy.co.nz",
    notes: "豪拉基湾训练海域，常年风稳定；性价比好。",
  },
  {
    slug: "nordic-sail-fiji",
    name: "Nordic Sail Fiji",
    nameEn: "Nordic Sail Fiji",
    region: "oceania",
    country: "斐济",
    city: "Vuda Marina",
    bodies: ["iyt"],
    stages: ["night-coastal", "offshore", "ocean"],
    url: "https://www.nordicsail.com",
    notes: "南太平洋 IYT 训练基地；常年信风、远洋 mile-building 经典。",
  },
];

export function filterSchools(opts: {
  region?: SchoolRegion;
  body?: CertBody;
  stage?: Stage;
  chineseFriendly?: boolean;
}): School[] {
  return schools.filter((s) => {
    if (opts.region && s.region !== opts.region) return false;
    if (opts.body && !s.bodies.includes(opts.body)) return false;
    if (opts.stage && !s.stages.includes(opts.stage)) return false;
    if (opts.chineseFriendly && !s.chineseFriendly) return false;
    return true;
  });
}
