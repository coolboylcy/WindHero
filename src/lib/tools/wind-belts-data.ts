/**
 * 全球风带数据 · 用于 /tools/wind-belts 查询工具
 *
 * 数据基于经典航海气象学常识（三圈环流 + 季风 + 洋流），
 * 每个海域给出主导风、最佳出航月份、季风影响、热带气旋窗口。
 *
 * 不是实时数据——是「常年画面」。出航前还要看具体预报。
 */

export type Cell =
  | "hadley-N"
  | "ferrel-N"
  | "polar-N"
  | "hadley-S"
  | "ferrel-S"
  | "polar-S";

export const cellInfo: Record<
  Cell,
  { name: string; latLabel: string; primaryWind: string; sailing: string }
> = {
  "hadley-N": {
    name: "哈德利环流 · 北",
    latLabel: "北纬 0° – 30°",
    primaryWind: "东北信风 NE Trades · 15–25 节",
    sailing: "经典横渡风带；季节稳定；夏末-秋季有飓风/台风",
  },
  "ferrel-N": {
    name: "费雷尔环流 · 北",
    latLabel: "北纬 30° – 60°",
    primaryWind: "盛行西风 Westerlies · 多变 10–35 节",
    sailing: "锋面频繁、夏多雾、冬天有风暴",
  },
  "polar-N": {
    name: "极地环流 · 北",
    latLabel: "北纬 60° – 90°",
    primaryWind: "极地东风 Polar Easterlies",
    sailing: "高纬度航行，天气剧烈，不建议初学者",
  },
  "hadley-S": {
    name: "哈德利环流 · 南",
    latLabel: "南纬 0° – 30°",
    primaryWind: "东南信风 SE Trades · 15–25 节",
    sailing: "南太平洋、南大西洋、印度洋南部稳定风带",
  },
  "ferrel-S": {
    name: "费雷尔环流 · 南",
    latLabel: "南纬 30° – 60°",
    primaryWind: "盛行西风（Roaring 40s / Furious 50s）",
    sailing: "南半球西风带，越往南风越狂，南极环游必经",
  },
  "polar-S": {
    name: "极地环流 · 南",
    latLabel: "南纬 60° – 90°",
    primaryWind: "极地东风",
    sailing: "南极水域，几乎只有极地探险队进入",
  },
};

export type Region = {
  slug: string;
  name: string;
  region: string; // 大区
  latApprox: number; // 大致纬度
  cell: Cell;
  prevailingWind: string;
  monsoon?: {
    ne: string; // 东北季风月份
    sw: string; // 西南季风月份
  };
  bestMonths: string;
  risks: Array<{ label: string; period: string; note: string }>;
  notes: string;
};

export const regions: Region[] = [
  // —— 东亚 / 东南亚 ——
  {
    slug: "south-china-sea",
    name: "南海 · South China Sea",
    region: "东南亚",
    latApprox: 15,
    cell: "hadley-N",
    prevailingWind: "信风被季风覆盖：冬季 NE，夏季 SW",
    monsoon: { ne: "11 月 – 次年 3 月", sw: "5 月 – 9 月" },
    bestMonths: "11 月 – 3 月（NE 季风稳定，台风窗口外）",
    risks: [
      {
        label: "台风季",
        period: "7 月 – 10 月",
        note: "西北太平洋台风路径通常穿过南海北部",
      },
      {
        label: "季风过渡期",
        period: "4 月 / 10 月",
        note: "风向不稳，对流活跃，不要赌窗口",
      },
    ],
    notes:
      "经典航段：香港→冲绳走 4–5 月；普吉→兰卡威走 11–3 月。",
  },
  {
    slug: "andaman-sea",
    name: "安达曼海 · Andaman Sea",
    region: "东南亚",
    latApprox: 8,
    cell: "hadley-N",
    prevailingWind: "信风被季风覆盖：冬季 NE，夏季 SW（带强雷雨）",
    monsoon: { ne: "11 月 – 4 月", sw: "5 月 – 10 月" },
    bestMonths: "11 月 – 4 月（信风线下，最适合入门远航）",
    risks: [
      {
        label: "雷暴",
        period: "5 月 – 10 月",
        note: "SW 季风期下午对流强、阵风可达 35 节",
      },
    ],
    notes: "普吉、兰卡威、安达曼群岛冬季是黄金窗口。",
  },
  {
    slug: "japan-south-coast",
    name: "日本南岸 · Kuroshio",
    region: "东亚",
    latApprox: 32,
    cell: "ferrel-N",
    prevailingWind: "西风为主，黑潮影响明显",
    bestMonths: "4 月 – 6 月、10 月（夏季多台风、冬季多锋面）",
    risks: [
      {
        label: "台风季",
        period: "7 月 – 10 月",
        note: "台风进入日本南岸窗口期",
      },
      { label: "冬季强风", period: "12 月 – 2 月", note: "北风带 + 海流冲突起浪" },
    ],
    notes: "黑潮东流约 2–4 节，规划航向时务必扣减。",
  },

  // —— 北美 / 加勒比 ——
  {
    slug: "caribbean",
    name: "加勒比海 · Caribbean",
    region: "中美洲",
    latApprox: 15,
    cell: "hadley-N",
    prevailingWind: "东北信风 NE Trades · 15–25 节",
    bestMonths: "12 月 – 5 月（飓风季外，信风最稳）",
    risks: [
      {
        label: "飓风季",
        period: "6 月 – 11 月（高峰 9 月）",
        note: "南大西洋飓风进入加勒比通道",
      },
      {
        label: "信风加强",
        period: "1 月 – 2 月",
        note: "「Christmas Winds」常 30 节以上",
      },
    ],
    notes: "ARC 横渡大西洋每年 11 月底从加纳利发出，沿信风带向西到加勒比。",
  },
  {
    slug: "north-atlantic-east",
    name: "北大西洋东岸 · British Isles / 比斯开湾",
    region: "西欧",
    latApprox: 50,
    cell: "ferrel-N",
    prevailingWind: "盛行西风带，多锋面",
    bestMonths: "5 月 – 9 月（夏季锋面较弱）",
    risks: [
      {
        label: "冬季风暴",
        period: "10 月 – 4 月",
        note: "比斯开湾深低压可达 60 节",
      },
      { label: "夏季海雾", period: "6 月 – 8 月", note: "英吉利海峡能见度问题" },
    ],
    notes: "英吉利海峡潮汐流强，规划必须配 ATT 潮汐表。",
  },

  // —— 地中海 ——
  {
    slug: "western-mediterranean",
    name: "西地中海 · 巴利阿里 / 利古里亚",
    region: "南欧",
    latApprox: 40,
    cell: "ferrel-N",
    prevailingWind: "夏季由副热带高压扩张影响，风弱；密斯特拉风窗口",
    bestMonths: "5 月 – 9 月",
    risks: [
      {
        label: "密斯特拉",
        period: "全年（春秋多发）",
        note: "北风急流穿过罗讷河口，可达 50 节",
      },
      { label: "Sirocco", period: "春秋", note: "南风带撒哈拉热气，能见度差" },
    ],
    notes: "经典航段：帕尔马→科西嘉，5–9 月最佳。",
  },
  {
    slug: "aegean",
    name: "爱琴海 · Aegean",
    region: "南欧",
    latApprox: 38,
    cell: "ferrel-N",
    prevailingWind: "夏季 Meltemi 北风（NW），冬季多变",
    bestMonths: "5 月 – 10 月",
    risks: [
      {
        label: "Meltemi",
        period: "7 月 – 8 月",
        note: "下午常达 25–35 节，傍晚减弱",
      },
    ],
    notes: "Meltemi 是夏季每天的「下午阵」——上午出港、傍晚抛锚。",
  },

  // —— 南太平洋 / 印度洋 ——
  {
    slug: "south-pacific-tropic",
    name: "南太平洋热带 · Society / Fiji",
    region: "南太平洋",
    latApprox: -17,
    cell: "hadley-S",
    prevailingWind: "东南信风 SE Trades · 15–22 节",
    bestMonths: "5 月 – 10 月（南半球冬季）",
    risks: [
      {
        label: "气旋季",
        period: "11 月 – 4 月",
        note: "热带气旋路径覆盖斐济到法属玻利尼西亚",
      },
    ],
    notes: "经典「milk run」横渡：5 月奥克兰→斐济、跟着信风一路向西。",
  },
  {
    slug: "tasman-sea",
    name: "塔斯曼海 · Auckland-Sydney",
    region: "大洋洲",
    latApprox: -38,
    cell: "ferrel-S",
    prevailingWind: "盛行西风，常年锋面",
    bestMonths: "10 月 – 4 月（南半球夏季）",
    risks: [
      {
        label: "Southerly Buster",
        period: "全年",
        note: "冷锋过境时风向跳 90°，3 小时内增至 40 节",
      },
    ],
    notes: "悉尼-霍巴特赛事每年 12 月，是这片海最经典的赛艇航段。",
  },
  {
    slug: "indian-ocean-monsoon",
    name: "印度洋北部 · 阿拉伯海 / 孟加拉湾",
    region: "南亚",
    latApprox: 10,
    cell: "hadley-N",
    prevailingWind: "强季风：冬季 NE，夏季 SW（带飓风强度）",
    monsoon: { ne: "11 月 – 3 月", sw: "5 月 – 9 月" },
    bestMonths: "11 月 – 4 月（NE 季风期，海况较稳）",
    risks: [
      {
        label: "气旋季",
        period: "4–6 月 / 10–11 月（过渡期）",
        note: "孟加拉湾热带气旋频发",
      },
      {
        label: "SW 季风",
        period: "5 月 – 9 月",
        note: "风速常达 30–40 节，海况大",
      },
    ],
    notes: "传统印度洋季风贸易航段，跟着季风往返。",
  },

  // —— 高纬 ——
  {
    slug: "north-sea",
    name: "北海 · North Sea",
    region: "北欧",
    latApprox: 56,
    cell: "ferrel-N",
    prevailingWind: "西到西南风，冬季锋面密集",
    bestMonths: "6 月 – 8 月",
    risks: [
      {
        label: "冬季风暴",
        period: "10 月 – 3 月",
        note: "深低压频繁，可达 50+ 节",
      },
      { label: "海雾", period: "全年", note: "尤其北部，能见度<0.5 海里常见" },
    ],
    notes: "北海航行强调潮汐计算 + 船只密集水道的避碰。",
  },
  {
    slug: "patagonia",
    name: "巴塔哥尼亚海岸 · Cape Horn 附近",
    region: "南美",
    latApprox: -55,
    cell: "ferrel-S",
    prevailingWind: "Furious 50s · 西风带最狂段",
    bestMonths: "12 月 – 2 月（仍非常严酷）",
    risks: [
      {
        label: "急流",
        period: "全年",
        note: "西风急流 + 海流 + 南极绕流叠加",
      },
    ],
    notes: "Cape Horn 是远洋帆船的最后试炼——非顶尖船长不要冒险。",
  },
];

/* —— 工具函数 —— */

export function regionsByCell(cell: Cell): Region[] {
  return regions.filter((r) => r.cell === cell);
}

export function inferCellFromLat(lat: number): Cell {
  const abs = Math.abs(lat);
  const hemi = lat >= 0 ? "N" : "S";
  if (abs < 30) return `hadley-${hemi}` as Cell;
  if (abs < 60) return `ferrel-${hemi}` as Cell;
  return `polar-${hemi}` as Cell;
}

export function searchRegions(query: string): Region[] {
  if (!query) return [];
  const q = query.toLowerCase();
  return regions.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.region.toLowerCase().includes(q) ||
      r.slug.includes(q)
  );
}
