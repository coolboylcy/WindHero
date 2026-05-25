import type { Course } from "../types";

/**
 * WH-401 · 远洋航段实战课
 *
 * 这是一门"船上"课程——10 天，跟随导师真实穿越一段海洋。
 * 没有线上理论课时，也没有笔试。每个模块在网页上只呈现「在船上将做什么」，
 * 并提供详尽的航前资源清单与 checklist——让学员在登船前就完成所有该完成的准备。
 *
 * RYA 对标：Yachtmaster Offshore / Ocean（实操部分）。
 */

export const offshorePassage: Course = {
  slug: "offshore-passage",
  code: "WH-401",
  title: "远洋航段实战课",
  level: "船长之路",
  duration: "10 天 · 船上",
  ryaEquivalent: "Yachtmaster Ocean Theory",
  prerequisites: ["captains-mind"],
  summary:
    "在真实远洋上、真实值班里、真实天气下，与跑过这段海的导师一起穿过一段海洋。",
  suitableFor: [
    "完成「船长的思维」并已经独立带过近岸航段的学员",
    "想要把课堂里的判断力，放到 72 小时连续值班的现场去验证",
    "正在为 RYA Yachtmaster Offshore 实操考试做准备的船长候选人",
  ],
  youWillLearn: [
    "在 24 小时连续运行下，把所有 WindHero 课堂里学到的东西串成一个完整流程",
    "在导师身边完成至少一次完整的值班交接、一次天气路由调整、一次进港引航",
    "形成自己的「船长仪表盘」——出航前 12 小时、出航中、进港前你各自看哪 8 个数字",
    "拿到一份记录在案的远洋里程（mileage log），可用于后续 Yachtmaster 实操考试报名",
  ],

  /* —— 这门课没有线上 quiz，每个 module 只列「在船上要做的事」 —— */
  modules: [
    {
      slug: "before-we-cast-off",
      index: 1,
      title: "出航前 72 小时：检查与物资",
      summary:
        "船比想象中更复杂；准备远比想象中更慢。出航前 3 天的「不快也不慢」是这门课最被低估的一段。",
      lessons: [
        {
          slug: "pre-departure-checklist",
          index: "1.1",
          title: "登船前要带与要查的一切",
          summary:
            "登船前的最后一份 checklist。建议你在家里就把它跑一遍——「我能不能解释这一项的为什么」，是检验你是否还需要复习的标尺。",
          duration: "约 30 分钟（自查）",
          outcomes: [
            "能背诵并解释远洋航段标准 checklist 的 6 个主类别",
            "知道哪些物资是「不带就上不了船」、哪些只是「最好带」",
            "登船时不需要带纸 checklist——它已经在你脑子里",
          ],
          body: [
            {
              type: "paragraph",
              text: "这门课在屏幕上的部分到此为止。剩下的 10 天会在船上完成。但有一份清单值得你在登船前在家跑一遍——如果你能逐条解释「为什么这条要带 / 要查」，说明你已经准备好；如果某一条你只能说「因为清单上写了」，那是你还没读懂的地方，回到对应的前置课程再补一次。",
            },
            {
              type: "heading",
              text: "六个类别的航前清单",
            },
            {
              type: "table",
              headers: ["类别", "你应当在登船前已经完成的事"],
              rows: [
                [
                  "01 · 船体与机械",
                  "引擎机油 + 冷却液 + 滤芯检查；皮带松紧；龙骨螺栓目视；舵销间隙；舱底泵手动 + 自动各试一次；通海阀全部测试；柴油注满并加防菌剂",
                ],
                [
                  "02 · 索具与帆",
                  "桅杆站索张力（用张力计）；钢索目视无毛刺；主帆 + 前帆完整裂线检查；缩帆系统所有线运行顺畅；风暴帆是否在易取的位置",
                ],
                [
                  "03 · 电与导航",
                  "主电池电压满载 ≥ 12.6 V；GPS + 海图仪 + 风仪表 + 测深仪 + AIS 全部上电；夜航号灯全部点亮一次；备份手持 GPS 电量足；卫星电话或 Iridium GO 已经测试发送一条消息",
                ],
                [
                  "04 · 安全",
                  "救生筏检验日期未过期且固定可释放；EPIRB 注册有效 + 自检通过；所有人 lifejackets 合身且各自试穿；harness 与 jacklines 安装；急救包按航段长度配置",
                ],
                [
                  "05 · 食水",
                  "饮用水 ≥ 计划航程 × 4 L/人/天；柴油至少够计划航程发动机时数 × 1.5 倍冗余；干粮 + 罐头 ≥ 7 天可即食；至少两道菜可以「单手 + 海况颠簸下完成」",
                ],
                [
                  "06 · 文件与计划",
                  "护照 + 签证 + 船舶证书 + 保险全部复印一份留岸；出航计划已交可信任的岸上人；天气窗口结论已落到一页纸上",
                ],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "不要把「应该没问题」当作完成",
              body:
                "远洋航段上最常见的事故，不是天气突变，而是一件「我以为没事」的小事——破损的紧线扣、过期 1 个月的救生筏、没充满的 EPIRB 电池——在第三个夜晚把一切串成大事。在 6 个类别里，每一项都必须由你亲眼/亲手验证一次。",
            },
            {
              type: "paragraph",
              text: "导师会在登船第一天用 90 分钟与你逐项过一遍这张清单。任何「我以为」的回答，都会在那 90 分钟里被发现。",
            },
            {
              type: "definition",
              term: "Pre-departure brief",
              meaning:
                "出航前所有船员到齐时由船长做的简报，结构固定：航段概况 → 天气 → 值班 → 应急 → 安全装备 → 特别约定 → 提问。它不是仪式，是一份口头合同——所有人此刻同意的，就是此后 10 天的运行规则。",
            },
            {
              type: "practice",
              prompt:
                "登船前一周，找一位你的航海朋友（不是导师，也不是同船学员），打电话给他，把 6 个类别每一项都用自己的话讲给他听。卡住的地方记下来，重读对应章节，第二天再讲一次。",
              hint:
                "讲不出来 ≠ 不熟；讲得磕巴 = 还没融进判断力。两者都要回去补。",
            },
            {
              type: "quote",
              text: "「出航前你能做的事情越多，海上就越少需要做大事的时候。」",
              attribution: "WindHero 导师手册",
            },
          ],
          quiz: [],
        },
      ],
    },
    {
      slug: "weather-routing-and-daily-call",
      index: 2,
      title: "海上每日：天气路由与点名",
      summary:
        "每天早上 0800 一次全员到位的『点名』——天气、状态、当日重点。这是远洋上船长最重要的一个 15 分钟。",
      lessons: [
        {
          slug: "daily-routine-onboard",
          index: "2.1",
          title: "0800 点名：船长的每日 15 分钟",
          summary:
            "海上没有日历，但有节律。0800 点名是这艘船每天的「钟」——它的功能不是仪式，是把所有人重新对齐到「我们现在在哪里、要去哪里」。",
          duration: "约 20 分钟（自查）",
          outcomes: [
            "理解 0800 点名为什么不能跳过——哪怕一切看起来风平浪静",
            "能背出点名的 5 个固定环节",
            "理解为什么「点名」结束于一个问题而不是一个声明",
          ],
          body: [
            {
              type: "paragraph",
              text: "海上的日子很容易模糊。第三天你可能已经分不清今天是周二还是周四。0800 点名的存在就是为了对抗这种模糊——它每天在同一时间发生，每天讨论同样 5 件事，每天以同样的方式结束。",
            },
            {
              type: "heading",
              text: "点名的 5 个环节",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "位置与里程：过去 24 小时我们走了多少、平均 SOG 多少、与计划偏离多少海里",
                "天气：导师宣读最新拿到的 GRIB；任何与昨天判断不一致的地方明确标出",
                "船的状态：油水电、引擎运行时数、任何小问题（即使「无伤大雅」）",
                "船员状态：每个人发言一句——睡眠、胃口、情绪。不准说「没事」",
                "今日重点：未来 24 小时唯一最重要的判断点是什么",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "为什么点名以「问题」结束",
              body:
                "导师会在点名最后问一句：『今天我应该担心什么？』——任何人可以回答。这一句的作用是让团队从「报告模式」切回「思考模式」。如果今天没有人能说出一件值得担心的事，那要么是真的没有（罕见），要么是大家累到看不见——后者本身就是值得担心的事。",
            },
            {
              type: "definition",
              term: "Captain's dashboard",
              meaning:
                "船长每天在 0800 之前需要确认的 8 个数字——位置（经纬度）、过去 24h DMG（朝目标距离）、当前 SOG、电量、油量、水量、下一次预计天气拐点、最近退路港 ETA。在你下到甲板之前，这 8 个数字应该已经在你脑子里。",
            },
            {
              type: "paragraph",
              text: "导师会在你的 10 天里至少 3 次让你来主持 0800 点名。第一次你会卡壳；第三次你会发现这件事其实有一种节律。",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 2.1 · 海上每日方位感的恢复——靠重复，不靠记忆",
            },
            {
              type: "practice",
              prompt:
                "登船前 7 天，找一个你信任的人，每天早上 0800 准时给他打 5 分钟电话。报：你昨天做了什么、今天天气怎么样（找当地最新预报）、你今天最该担心一件什么事。坚持 7 天。",
              hint:
                "意义不在内容；意义在节律。你会发现第 4 天开始它变得不像负担。",
            },
          ],
          quiz: [],
        },
      ],
    },
    {
      slug: "night-watch-and-incident-response",
      index: 3,
      title: "夜班、应急、靠泊：把所有课程串起来",
      summary:
        "夜班是判断力的耗散战。这一个模块在船上是 5 天，落到屏幕上只是一句话——但它是这门课最难也最值得的部分。",
      lessons: [
        {
          slug: "night-watch-overview",
          index: "3.1",
          title: "夜班、应急演练、陌生港进港",
          summary:
            "这部分内容只能在船上完成。这里列出导师在 10 天中会带你跑过的所有项目；你的工作是在登船前把每一项都先理解，再到现场去做。",
          duration: "船上 5 天",
          outcomes: [
            "至少独立完成 2 次完整夜班（22:00 – 02:00 与 02:00 – 06:00 各一次）",
            "参与至少 1 次计划内 MOB 演练（导师抛靠垫，你执行 quick-stop）",
            "在导师监督下独立完成至少 1 次陌生港的全程进港引航",
          ],
          body: [
            {
              type: "paragraph",
              text: "线上的部分到此结束。剩下 5 天会在船上完成——这是 WindHero 整个课程体系唯一无法用网页代替的部分。这并不是因为我们不愿意；而是因为海上的事，至今仍然只能在海上学会。",
            },
            {
              type: "heading",
              text: "导师将在船上带你完成的项目",
            },
            {
              type: "list",
              items: [
                "至少 2 次独立夜班（含交接），由导师跟班观察、不主动介入",
                "至少 1 次 MOB 演练（导师选时机抛靠垫，你执行完整 quick-stop 回收）",
                "至少 1 次主动 heave-to 操作并维持 30 分钟",
                "至少 1 次完整 24 小时航段天气复盘——为什么风没按预报来",
                "至少 1 次陌生港进港的全程引航（从 12 海里外开始计划，到完成靠泊）",
                "10 天结束时的「最后一晚长谈」——你和导师两个人，回看这 10 天",
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "评估方式：不是考试，是「我会不会让你独自带我出海」",
              body:
                "这门课没有笔试。结业的标准是导师在 10 天结束时回答一个问题：『如果明天有一段同样的航段，我会不会让这位学员单独把我带过去？』——这个问题没有 60 分的答案，只有「会」与「还不会」。「还不会」不是失败，是给到你下一阶段练习方向的开始。",
            },
            {
              type: "diagram",
              kind: "colregs-crossing",
              caption: "图 3.1 · 你在夜班 03:00 看到一组接近的红 + 白灯——它在告诉你什么？",
            },
            {
              type: "quote",
              text: "「教练能告诉你怎么读海图。海，会告诉你你到底读懂了多少。」",
              attribution: "WindHero 导师手册",
            },
          ],
          quiz: [],
        },
      ],
    },
  ],

  practicalNote:
    "这门课没有线上模拟考。结业的标准是 10 天结束时导师能否说一句『我愿意让这位学员单独带我跑同样一段海』。你拿到的不是分数，是写在 logbook 上的真实里程，和一封导师签字的航段证明——可以直接用于 RYA Yachtmaster Offshore 实操考试报名。",

  resources: [
    {
      title: "RYA Yachtmaster Scheme（实操考试官方说明）",
      description:
        "RYA Yachtmaster Offshore / Ocean 实操考试的官方页面，包含报名要求、最低里程、考试形式。",
      url: "https://www.rya.org.uk/courses-training/qualifications/yachtmaster",
      type: "site",
      free: true,
      guide:
        "重点看「Pre-exam requirements」一节：你需要 50 days at sea / 2,500 NM / 5 night hours，且至少一半作为 skipper。在登船前确认你的现有里程是否够。",
    },
    {
      title: "RYA Logbook（航海日志官方版）",
      description:
        "RYA 官方航海里程记录册，是 Yachtmaster 实操考试报名的必备凭证。",
      url: "https://www.rya.org.uk/shop",
      type: "tool",
      free: false,
    },
    {
      title: "OpenCPN + ENC 海图",
      description:
        "完全开源的电子海图导航软件。配合官方 ENC 矢量海图（多数国家政府免费提供），可用于航前规划与备份导航。",
      url: "https://opencpn.org",
      type: "open-source",
      free: true,
      guide:
        "登船前两周，把整段航程的航点序列在 OpenCPN 上独立规划一次。然后与导师比对，看你漏掉了哪些考虑——这件事比读 10 本书更有效。",
    },
    {
      title: "PredictWind Offshore App",
      description:
        "为远洋航段设计的天气路由 + Iridium GO 卫星通信集成方案。Offshore 订阅是 WindHero 推荐配置。",
      url: "https://www.predictwind.com",
      type: "tool",
      free: false,
      guide:
        "免费版本可以试用一次完整路由计算。如果计划长航段（≥ 500 NM），订阅 Offshore 套餐；与 Iridium GO 配合可以在海上获取离线 GRIB。",
    },
    {
      title: "「Adlard Coles' Heavy Weather Sailing」",
      description:
        "现代航海的「恶劣天气圣经」。读完不一定会面对，但会对天气分级有更清晰的尊重感。",
      url: "https://www.adlardcoles.com",
      type: "book",
      free: false,
    },
    {
      title: "Sailing Yacht Inspection Checklist（开源）",
      description:
        "GitHub 上由远洋帆船社区共同维护的开源 checklist 模板，可直接 fork 后按自己船型改写。",
      url: "https://github.com/topics/sailing",
      type: "open-source",
      free: true,
      guide:
        "在 GitHub 上搜「sailing checklist」或「yacht inspection」可以找到多份开源模板。挑一份星标最多的 fork 下来，按你这艘船的型号改写——这是登船前你应该完成的「自己版本的清单」。",
    },
    {
      title: "Iridium GO!（卫星通信硬件）",
      description:
        "全球覆盖的卫星热点，是远洋帆船现代标配。用于离线获取 GRIB、紧急通信、向岸上传送位置。",
      url: "https://www.iridium.com/products/iridium-go",
      type: "tool",
      free: false,
    },
    {
      title: "USCG Marine Safety Center 事故报告",
      description:
        "美国海岸警卫队公开的真实事故案例库。船长之路最有用的阅读材料——别人犯过的错，你不必再犯。",
      url: "https://www.dco.uscg.mil/Our-Organization/Assistant-Commandant-for-Prevention-Policy-CG-5P/Inspections-Compliance-CG-5PC-/Office-of-Investigations-Casualty-Analysis",
      type: "site",
      free: true,
      guide:
        "登船前的最后一周，每晚读一份事故报告。找出「在这艘船上、那个晚上，船长本来可以做什么不同的事」——这就是你的下一份 pre-mortem 输入。",
    },
  ],
};
