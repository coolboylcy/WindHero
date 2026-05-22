export type Course = {
  slug: string;
  code: string;
  title: string;
  level: "入门" | "进阶" | "船长之路";
  duration: string;
  summary: string;
  modules: string[];
};

export const courses: Course[] = [
  {
    slug: "reading-the-wind",
    code: "WH-101",
    title: "读懂风",
    level: "入门",
    duration: "4 周 · 自学",
    summary:
      "风从何而来，如何在海岸线之间转向，水手又如何把看不见的气压变成向前的速度。",
    modules: [
      "全球环流与局地海陆风",
      "真风与视风、极坐标性能图",
      "风帆平衡、扭转与缝隙效应",
      "实地日志：记录五个真实风日",
    ],
  },
  {
    slug: "weather-and-routing",
    code: "WH-204",
    title: "天气与航路",
    level: "进阶",
    duration: "6 周 · 直播 + 自学",
    summary:
      "像船长一样读懂 GRIB；规划一段能避开锋面、绕过涌浪、踩准潮汐窗口的真实航段。",
    modules: [
      "气压系统与锋面解剖",
      "GRIB、ECMWF、GFS：何时信、信几分",
      "500 海里窗口期的航线规划",
      "退路港与一个清醒的 B 计划",
    ],
  },
  {
    slug: "seamanship-and-safety",
    code: "WH-212",
    title: "海员素养与安全",
    level: "进阶",
    duration: "5 周 · 直播",
    summary:
      "恶劣天气下的应对、人员落水演练、火与漏水的处置，以及一个真正能跑起来的值班体系。",
    modules: [
      "风暴帆配置与停船策略 (heaving-to)",
      "帆下与机动下的 MOB 救援",
      "发动机、电路与索具的临时维修",
      "长航程上可持续的值班排班",
    ],
  },
  {
    slug: "celestial-and-pilotage",
    code: "WH-228",
    title: "近岸引航与天文导航",
    level: "进阶",
    duration: "6 周 · 自学",
    summary:
      "不依赖 GPS 也能定位。破晓时分进入陌生港口——现代航海里那一半安静而古老的技艺。",
    modules: [
      "近岸引航：转向角、跨线方位、危险方位",
      "太阳观测、正午纬度、时间与格林威治",
      "纸海图、电子海图、地图三者合用",
      "六个真实港口的进港方案",
    ],
  },
  {
    slug: "captains-mind",
    code: "WH-301",
    title: "船长的思维",
    level: "船长之路",
    duration: "8 周 · 集体班",
    summary:
      "不确定性下的决策、船员领导、知道何时返航——把一名水手与一名船长区分开来的能力。",
    modules: [
      "海上的风险分级：红、黄、绿",
      "船员简报、值班交接、事后复盘",
      "前向尸检 (pre-mortem) 与放弃的勇气",
      "毕业项目：独立规划一段航段并答辩",
    ],
  },
  {
    slug: "offshore-passage",
    code: "WH-401",
    title: "远洋航段实战课",
    level: "船长之路",
    duration: "10 天 · 船上",
    summary:
      "在真实远洋上、真实值班里、真实天气下，与跑过这段海的导师一起穿过一段海洋。",
    modules: [
      "出航前检查与物资规划",
      "实时天气路由与每日点名",
      "夜班值守与船长常驻指令",
      "在陌生水域的进港引航",
    ],
  },
];

export type Voyage = {
  slug: string;
  name: string;
  region: string;
  distance: string;
  season: string;
  difficulty: "近岸" | "近海" | "远洋";
  brief: string;
};

export const voyages: Voyage[] = [
  {
    slug: "hong-kong-to-okinawa",
    name: "香港 → 冲绳",
    region: "西北太平洋",
    distance: "780 海里",
    season: "4 月 – 5 月",
    difficulty: "远洋",
    brief:
      "春季季风转换、黑潮边缘、登陆琉球群岛弧——一段经典的春日远洋。",
  },
  {
    slug: "phuket-to-langkawi",
    name: "普吉岛 → 兰卡威",
    region: "安达曼海",
    distance: "165 海里",
    season: "11 月 – 次年 3 月",
    difficulty: "近岸",
    brief:
      "东北季风、石灰岩岛群、浅水进港——稳定的信风线下，最适合入门远航。",
  },
  {
    slug: "palma-to-corsica",
    name: "帕尔马 → 科西嘉",
    region: "西地中海",
    distance: "320 海里",
    season: "5 月 – 9 月",
    difficulty: "近海",
    brief:
      "密斯特拉风窗口、博尼法乔海峡时机、经典的地中海夏季航段。",
  },
  {
    slug: "auckland-to-fiji",
    name: "奥克兰 → 斐济",
    region: "南太平洋",
    distance: "1,150 海里",
    season: "5 月 – 6 月",
    difficulty: "远洋",
    brief:
      "南太平洋上的「牛奶航线」——在高压脊之间寻找适合启航的天气窗口。",
  },
];

export type Journal = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
};

export const journal: Journal[] = [
  {
    slug: "what-the-wind-actually-is",
    title: "风，其实是什么？",
    kicker: "现场笔记",
    excerpt:
      "我们说自己借风而行。多数时候，我们借的是两阵风的差——而其中只有一阵是真的。",
    author: "林 维",
    readTime: "7 分钟",
    date: "4 月 12 日",
  },
  {
    slug: "the-fourth-night",
    title: "第四夜",
    kicker: "船长日志",
    excerpt:
      "第一天是肾上腺素。第二天是熟练。到了第四夜，你才会知道——你和你的船员，到底能不能扛下这件事。",
    author: "Marisol Ortega",
    readTime: "11 分钟",
    date: "3 月 28 日",
  },
  {
    slug: "why-we-still-teach-celestial",
    title: "我们为什么还教天文导航",
    kicker: "课程笔记",
    excerpt:
      "六分仪不会没电，但这不是我们教它的原因。六分仪教你的是——这个世界比你的电子海图古老得多。",
    author: "新垣 俊志",
    readTime: "5 分钟",
    date: "3 月 6 日",
  },
];
