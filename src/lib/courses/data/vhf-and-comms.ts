import type { Course } from "../types";

/**
 * WH-107 · VHF / SRC 与海事通信
 *
 * 入门理论课。对标 RYA VHF/SRC（Short Range Certificate）笔试知识点，
 * 覆盖 VHF 电波物理、MMSI、GMDSS / DSC 操作流程、规范用语（MAYDAY / PAN-PAN /
 * SECURITE）、NATO 字母表与海事数字读法。
 *
 * 重要：RYA SRC 是一个独立的短期实操课，必须通过 RYA 认证学校面授 + 笔试 +
 * 实操考核才能拿证。WindHero 这门课**只覆盖理论知识点**，让学员去 RYA 考 SRC
 * 时不至于陌生——本课程不替代 RYA SRC 证书。
 *
 * 教学正文、题目、案例均为 WindHero 原创撰写。
 */

export const vhfAndComms: Course = {
  slug: "vhf-and-comms",
  code: "WH-107",
  title: "VHF / SRC 与海事通信",
  level: "入门",
  duration: "3 周 · 自学（约 10 小时）+ 实地考证",
  ryaEquivalent: "VHF/SRC",
  prerequisites: ["reading-the-wind"],
  summary:
    "无线电是船与外界之间唯一可靠的脐带——从一次 MAYDAY 报文的 7 个字段，到 CH16 与 CH70 各自的法律地位，这门课把规定背后的逻辑讲清楚。",
  suitableFor: [
    "准备去 RYA 认证学校考 Short Range Certificate（SRC）的学员",
    "已经买了船，但还没注册 MMSI、也没在认真用过 VHF 的船主",
    "想理解「为什么这条规则这么写」而不是死记硬背的入门船员",
  ],
  youWillLearn: [
    "用一句话解释 VHF 的「视距通信」物理边界、有效距离怎么估算",
    "在脑中默写出 7 项必报字段的标准 MAYDAY 报文",
    "区分 CH16、CH70、CH13、CH06 各自的法定用途和使用规则",
    "完整复述 DSC 红色按钮按下之后系统在 4 分钟内做的事",
    "用 NATO 字母表流利拼读自己的船名、MMSI、位置",
  ],
  modules: [
    {
      slug: "vhf-equipment",
      index: 1,
      title: "VHF 设备基础",
      summary:
        "在按下任何一个按钮之前，先弄清楚 VHF 是一种什么样的电波、它的物理边界在哪里、你这台机器在国际上叫什么名字。",
      lessons: [
        {
          slug: "vhf-radio-fundamentals",
          index: "1.1",
          title: "甚高频电波的物理特性",
          summary:
            "VHF 不是「无限远的电台」，它是直直地走、被地球曲面挡住的电波。理解了这一点，你就理解了为什么桅杆要装高、为什么 1 W 与 25 W 必须区分。",
          duration: "约 50 分钟",
          outcomes: [
            "能用一张草图解释 VHF 的「视距通信」（line of sight）边界",
            "能根据桅杆高度大致估算有效通信距离",
            "理解 1 W vs 25 W 的法定使用规则",
            "能背出 CH16、CH13、CH06、CH70 四个最重要频道的用途",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 1 — Basic operating procedures",
            "VHF/SRC · Module 2 — Radio equipment and propagation",
          ],
          body: [
            {
              type: "paragraph",
              text: "海事 VHF 工作在 156 MHz – 174 MHz 之间，属于「甚高频」（Very High Frequency，30–300 MHz）。比起短波（MF/HF），它的最大特点是「走直线」——电波几乎不被电离层反射，也几乎不绕着地球曲面走。说得通俗一点：你能直直看到对方天线的那个范围，VHF 就能通；看不到的地方，1000 瓦也通不了。这种特性叫 line of sight，视距通信。",
            },
            {
              type: "paragraph",
              text: "于是「有效距离」基本由天线高度决定，而不是发射功率。一个粗略估算公式：D(海里) ≈ 1.23 × (√h1 + √h2)，其中 h1、h2 是两端天线的高度（英尺）。一艘 12 米桅杆（约 40 ft）的帆船跟一艘相同帆船通信，距离上限大约 1.23 × (√40 + √40) ≈ 15.6 海里。如果对方是一艘 50 米高的大商船桅楼，距离能拉到 25–30 海里。岸台天线常年装在山顶上，所以你跟海岸警卫队的可通距离往往比跟另一艘小船大得多。",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 1.1 · 视距通信示意（无专用插画，用罗盘图占位）：电波被地球曲面挡住，决定有效距离的不是功率，是天线高度。公式 D ≈ 1.23 × (√h1 + √h2) 海里",
            },
            {
              type: "heading",
              text: "1 W 与 25 W：什么时候用哪个",
            },
            {
              type: "paragraph",
              text: "船台 VHF 标配两档功率：High（25 W）与 Low（1 W）。规则不复杂，但被滥用是常见违规。法定原则是：「使用能完成通信所需的最低功率」。近距离港口内、码头同伴、相邻船只之间——必须切到 1 W，否则你的电波会污染半个港湾、压住别人的合法通信。只有在长距离呼叫、向岸台、或者紧急情况，才用 25 W。误用 25 W 在港里呼叫旁边的船，在英国 Ofcom 框架下是可处罚的违规。",
            },
            {
              type: "definition",
              term: "视距通信（Line of Sight）",
              meaning:
                "VHF 电波几乎沿直线传播、不被电离层反射、不绕地球曲面的物理特性。决定 VHF 有效通信距离的不是功率，是两端天线的高度——以及之间是否有山、岛屿等遮挡。",
            },
            {
              type: "heading",
              text: "频道的法定分工",
            },
            {
              type: "paragraph",
              text: "海事 VHF 一共有 57 个国际频道（部分号段还有美国、加拿大本地频道），但船长真正每天会用到的就是几个。每一个频道的用途都是 ITU《无线电规则》和各国主管机关明文规定的，不能随便占用。下表是必须熟记的核心几个：",
            },
            {
              type: "table",
              headers: ["频道", "用途", "类型", "备注"],
              rows: [
                ["CH16", "国际遇险、安全、呼叫频道", "单工 (simplex)", "所有装机船必须在航行中守听；不允许在 CH16 上做长对话"],
                ["CH70", "DSC（数字选呼）专用", "单工，数据信道", "禁止任何语音通信，专为 DSC 数字信号保留"],
                ["CH13", "桥到桥（bridge-to-bridge）", "单工", "用于船与船之间避碰、操纵协调，常用于大商船区域"],
                ["CH06", "船间安全协调", "单工", "船与船的协调通信，例如约会、并靠、搜救协调"],
                ["CH67", "小船 / 港务（英国常用）", "单工", "在 UK 用于海岸警卫队小船协调，区域规则有差异"],
                ["CH72 / CH77", "船间任意通信", "单工", "私人船间日常通信首选——可避免占用工作频道"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "CH16 是单工，不要把它当电话",
              body:
                "CH16 是单工（simplex）频道：你说的时候不能听，对方说的时候你不能说。你按下 PTT（push-to-talk），整个海域所有人都得让位给你。所以 CH16 上只能做三件事：① 求救（MAYDAY / PAN-PAN / SECURITE 头）；② 安全播报头；③ 初次呼叫并约定切换到另一个工作频道（如「CH72, over」）。在 CH16 上闲聊是违规——你正在占用一条所有船与岸台都在监听的生命线。",
            },
            {
              type: "heading",
              text: "为什么 CH70 必须是数据专用",
            },
            {
              type: "paragraph",
              text: "DSC（Digital Selective Calling，数字选呼）会在这门课的第二模块详讲。但物理上的设计原则你现在就要懂：CH70 被国际公约保留为「纯数据」频道，任何船台都不允许在它上面做语音通信。原因很现实——DSC 是一种短时数字爆发信号（一次几百毫秒），如果允许语音混在同一频道，DSC 的报警随时可能被一段「喂喂喂在不在」覆盖掉，整套 GMDSS 自动报警机制就会失效。这就是为什么国际公约把语音和数据严格分到两条频道：CH16 给人耳听，CH70 给机器听。",
            },
            {
              type: "definition",
              term: "单工 vs 双工（Simplex vs Duplex）",
              meaning:
                "单工 (simplex) 频道收发同频，同一时刻只能一方说话，按下 PTT 才发射；双工 (duplex) 频道收发分频，可以像电话一样同时说话。船间通信几乎全用单工；岸台电话接续、卫星电话才用到双工。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "在港里养成「先听后说」的习惯",
              body:
                "切到一个工作频道（比如 CH72）准备呼叫之前，先静静守听 10–15 秒。如果有人正在通信，等他们 OUT 之后再呼叫——你的电波会盖住正在进行的对话。这是 VHF 最基本的礼貌，也是教考官在岸边一眼能看出新手的地方。",
            },
            {
              type: "paragraph",
              text: "VHF 是一台你与海上所有人共享的麦克风。理解它的物理边界（视距、低功率原则）、理解它的法定分工（每个频道有专门用途）、理解它的设计原则（语音与数据分离）——这三件事，决定了你按下 PTT 之前的每一个动作。",
            },
          ],
          quiz: [
            {
              id: "q-1-1-1",
              q: "下列哪一条最准确地描述了 VHF 的「视距通信」特性？",
              options: [
                "电波沿地球曲面绕行，距离不受天线高度影响",
                "电波几乎沿直线传播，有效距离主要由两端天线高度决定",
                "电波会被电离层反射，能传几千公里",
                "电波通过海水传播，发射功率越大距离越远",
              ],
              correct: 1,
              explanation:
                "VHF（甚高频）几乎不被电离层反射、不绕地球曲面，属于 line of sight 传播。决定距离的是天线高度——参考公式 D ≈ 1.23×(√h1+√h2)。",
              topic: "VHF 物理",
            },
            {
              id: "q-1-1-2",
              q: "你在港里要呼叫旁边 200 米的一艘船，应该使用什么功率？",
              options: [
                "25 W High，确保对方听到",
                "1 W Low，遵循「能完成通信的最低功率」原则",
                "随便选一个都行",
                "必须用 25 W，因为这是默认值",
              ],
              correct: 1,
              explanation:
                "ITU 与各国规则要求：使用能完成通信所需的最低功率。近距离必须切到 1 W，否则会污染整个港湾、压住别人的合法通信，是可处罚的违规。",
              topic: "1W vs 25W",
            },
            {
              id: "q-1-1-3",
              q: "为什么 CH70 被国际公约严格保留为「禁止语音」的频道？",
              options: [
                "因为它频率太高，语音失真",
                "因为它是 DSC 数据信道，语音混入会覆盖掉机器之间的自动报警信号",
                "因为这个频道收信号差",
                "没有特殊原因，纯粹是历史规定",
              ],
              correct: 1,
              explanation:
                "DSC 是短时数字爆发信号，如果允许语音同时占用 CH70，任何一段「喂喂喂」都可能把一次遇险报警覆盖掉。所以语音→CH16，数据→CH70，严格分离。",
              topic: "CH70 / DSC",
            },
            {
              id: "q-1-1-4",
              q: "两艘船各装一根 9 米（约 30 ft）高的桅杆天线，VHF 有效通信距离最接近？",
              options: [
                "约 5 海里",
                "约 13.5 海里",
                "约 50 海里",
                "无上限",
              ],
              correct: 1,
              explanation:
                "套用 D ≈ 1.23×(√30+√30) ≈ 1.23×10.95 ≈ 13.5 海里。距离基本由天线高度决定，与是 1 W 还是 25 W 关系不大。",
              topic: "视距估算",
            },
          ],
        },
        {
          slug: "mmsi-and-station-identity",
          index: "1.2",
          title: "MMSI 与电台身份",
          summary:
            "你的船在国际通信网络里叫什么——一串 9 位数字。这串数字怎么编码、谁发证、注册到哪里，决定了 DSC 报警能否被识别。",
          duration: "约 45 分钟",
          outcomes: [
            "能解释 MMSI 的 9 位数字编码与前 3 位 MID 国家码的含义",
            "区分 MMSI、Call Sign（呼号）、ATIS 三种电台身份的用途",
            "知道在英国向 Ofcom 申请 Ship Radio Licence 的流程",
            "理解为什么 MMSI 必须正确编程进 DSC 设备",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 2 — Radio equipment and propagation",
            "VHF/SRC · Module 6 — Licensing and registration",
          ],
          body: [
            {
              type: "paragraph",
              text: "在国际海事通信的网络里，每艘装机船需要一个全球唯一的身份。这个身份就是 MMSI（Maritime Mobile Service Identity，海事移动业务标识），由 9 位数字组成，由各国主管机关统一分配。当你按下 DSC 红色按钮，发出去的数据包里第一个字段就是你的 MMSI——海岸警卫队和附近船只接收到这串数字，立刻就能在 ITU 数据库里查到：船名、船型、注册国、紧急联络人、母港。换句话说，MMSI 不只是一个号码，它是一个数据库主键。",
            },
            {
              type: "heading",
              text: "9 位数字的结构：MID + 个体编号",
            },
            {
              type: "paragraph",
              text: "MMSI 前 3 位叫 MID（Maritime Identification Digits），是国家码——告诉接收方这艘船在哪国登记。后 6 位是该国发放给具体电台的个体编号。举例：232xxxxxx 是英国登记的船，412xxxxxx 是中国，477xxxxxx 是香港，525xxxxxx 是新加坡。岸台、AIS 浮标、SART、应急示位标（EPIRB）等设备各自有不同的 MID 起始规则（例如岸台 MMSI 以「00」开头，AIS-SART 以「970」开头），但船台一律是 MID 三位 + 个体六位。",
            },
            {
              type: "table",
              headers: ["设备类型", "MMSI 格式", "示例"],
              rows: [
                ["船台 (ship station)", "MID + 6 位", "232123456 — 英国船"],
                ["岸台 (coast station)", "00 + MID + 4 位", "002320001 — 英国海岸警卫"],
                ["编队（group call）", "0 + MID + 5 位", "023212345 — 一支英国船队"],
                ["AIS-SART", "970 + 6 位", "970012345"],
                ["EPIRB / 应急示位标", "974 + 6 位", "974098765"],
              ],
            },
            {
              type: "definition",
              term: "MID（Maritime Identification Digits）",
              meaning:
                "MMSI 前 3 位的国家代码。ITU 统一分配，例如 232/233/234/235 = 英国，412 = 中国大陆，477 = 香港，525 = 新加坡，503 = 澳大利亚。一个 MID 不够用时，一个国家可以拥有多个。",
            },
            {
              type: "heading",
              text: "MMSI、Call Sign、ATIS：三种身份的区别",
            },
            {
              type: "paragraph",
              text: "新水手最容易混的是这三个名字。它们都是「电台身份」，但发证机关、用途、应用场景完全不同：",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "MMSI（9 位数字）—— 用于 DSC、AIS、Inmarsat 等数字通信。机器之间识别身份用，全球数据库统一管理。",
                "Call Sign 呼号（如「MGYS3」「VRBC4」）—— 由 ITU 通过各国主管机关分配的字母数字组合，用于语音通信中的电台身份。在 MAYDAY 报文里你通常念船名，但正式呼叫岸台或在大型商船间，要念呼号。",
                "ATIS（Automatic Transmitter Identification System）—— 仅在欧洲内河航行（莱茵河、多瑙河等内陆水路）中要求的额外标识，从呼号派生。海上航行用不到，但通过欧洲内河时必须激活。",
              ],
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 1.2 · 电台身份示意（无专用插画，用罗盘图占位）：每艘装机船在国际通信网中的三种身份——MMSI（9 位数字） + Call Sign（字母呼号） + 船名",
            },
            {
              type: "heading",
              text: "谁可以发证、哪些船必须装、装好怎么注册",
            },
            {
              type: "paragraph",
              text: "在英国，VHF 船台的牌照由 Ofcom（Office of Communications）发放，叫 Ship Radio Licence。流程在 Ofcom 官网上完全在线，免费（注意：操作员证 RYA SRC 是另一回事，要去 RYA 认证学校考）。申请时填船名、船型、装机情况、MMSI 申请——Ofcom 在线给你分配一个 232 开头的 9 位 MMSI 和一个 Call Sign，几小时之内收到牌照文件。在中国大陆和香港分别由 MIIT（工业和信息化部）/ OFCA（通讯事务管理局办公室）发证，流程类似但需要邮寄部分材料。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "MMSI 编程错误是真实存在的事故源",
              body:
                "MMSI 拿到之后，必须由船主或合格技师正确编程进 DSC 设备。一次编程，终身有效，且大多数民用机型只允许编程一次（再改要送修）。常见错误：把 MMSI 输错一位、把测试号 123456789 留在机器里、买二手船没改前任船主的 MMSI。任何一种错误都会导致：你按下红按钮发出 MAYDAY，对方收到的是另一艘船的身份，救援队跑错地方。出航前自检：DSC 设置菜单里看你自己的 MMSI 是否与牌照一致。",
            },
            {
              type: "definition",
              term: "Ship Radio Licence（英国）",
              meaning:
                "由 Ofcom 发放、覆盖船上所有无线电设备（VHF、雷达、AIS、EPIRB）的电台牌照。在线申请、免费、终身有效（但变更装备需要更新）。这是「船的牌照」，独立于操作员个人的 SRC 证。",
            },
            {
              type: "heading",
              text: "ITU MARS 数据库：MMSI 反查",
            },
            {
              type: "paragraph",
              text: "ITU 维护一个公开数据库叫 MARS（Maritime mobile Access and Retrieval System），任何人都能用 MMSI 反查船的注册资料。在 mmsapp.itu.int 上输入 9 位 MMSI，立刻能看到船名、注册国、电台装备清单、应急联系人。这就是为什么 MMSI 必须保持最新——你卖船、换船、改装备，都要去 Ofcom（或所在国主管机关）更新；否则一旦遇险，救援队从数据库里看到的是过时信息。",
            },
            {
              type: "callout",
              tone: "tip",
              title: "出航前 30 秒自检 MMSI",
              body:
                "打开 DSC 菜单 → Settings → My MMSI，对着你的 Ship Radio Licence 核对一遍。这个动作 30 秒，但能避免一次完全无效的遇险报警。租船、借船更要做——你不知道前一个用船的人有没有改过设置。",
            },
            {
              type: "practice",
              prompt:
                "拿出你（或你常用船）的 VHF / DSC 设备，找到「My MMSI」字段，把它写下来。然后去 mmsapp.itu.int 反查这个 MMSI——核对：船名是否与你认识的一致？注册国对吗？联络人信息是否还有效？任何一项不对，就该立刻去主管机关更新。",
              hint:
                "如果反查不到任何信息，说明 MMSI 还没在 ITU 数据库里注册（常见于新发牌照后未同步），找 Ofcom / 主管机关补登。",
            },
          ],
          quiz: [
            {
              id: "q-1-2-1",
              q: "MMSI 的 9 位数字结构中，前 3 位代表什么？",
              options: [
                "船的吨位等级",
                "MID（国家码），表示电台登记国",
                "船型分类（帆船/商船/渔船）",
                "发证年份",
              ],
              correct: 1,
              explanation:
                "前 3 位是 MID（Maritime Identification Digits），由 ITU 统一分配给各国，例如 232=英国、412=中国、477=香港。",
              topic: "MMSI 结构",
            },
            {
              id: "q-1-2-2",
              q: "下列对 MMSI 与 Call Sign（呼号）的描述哪一项正确？",
              options: [
                "MMSI 和 Call Sign 是同一个东西的不同叫法",
                "MMSI 是 9 位数字、用于 DSC/AIS 等数字通信；Call Sign 是字母数字组合、用于语音通信",
                "Call Sign 只有商船需要，私人帆船不用",
                "MMSI 只在中国使用，国际上一律用 Call Sign",
              ],
              correct: 1,
              explanation:
                "MMSI 是数字身份（机器识别），Call Sign 是字母数字身份（语音报呼用）。两者由同一张电台牌照同时分配，但用途完全不同。",
              topic: "电台身份",
            },
            {
              id: "q-1-2-3",
              q: "你刚买了一艘二手船，发现前任船主的 MMSI 还编程在 DSC 设备里。最合理的处理是？",
              options: [
                "无所谓，反正能发 MAYDAY 就行",
                "保留不动，省得麻烦",
                "立刻向主管机关（如 Ofcom）申请新 MMSI，并把设备里旧 MMSI 改成自己的——否则一次报警会指向前任船主身份",
                "把 MMSI 改成 123456789 当测试号用",
              ],
              correct: 2,
              explanation:
                "DSC 报警包含 MMSI 字段，救援队据此查数据库定位船与联络人。沿用前任船主 MMSI = 救援队找错人。必须更新登记 + 重新编程。",
              topic: "MMSI 注册",
            },
            {
              id: "q-1-2-4",
              q: "在英国，船舶 VHF 电台的牌照（Ship Radio Licence）由哪个机构发放？",
              options: [
                "RYA（Royal Yachting Association）",
                "Ofcom（Office of Communications）",
                "MCA（Maritime and Coastguard Agency）",
                "ITU（International Telecommunication Union）",
              ],
              correct: 1,
              explanation:
                "英国船台牌照由 Ofcom 在线发放、免费。RYA 是培训与考证机构（发放操作员 SRC 证书）；MCA 是海事监管机构；ITU 是国际协调机构，不直接发牌照。",
              topic: "牌照",
            },
          ],
        },
      ],
    },
    {
      slug: "dsc-and-gmdss",
      index: 2,
      title: "DSC 与 GMDSS",
      summary:
        "DSC 是一台「按一下按钮就替你说话的机器」。理解 GMDSS 这套系统是怎么把全球分成 A1/A2/A3/A4 四块、为什么 DSC 取代了过去的连续守听——你按按钮时心里才知道发生了什么。",
      lessons: [
        {
          slug: "gmdss-overview",
          index: "2.1",
          title: "GMDSS 全球海上遇险系统",
          summary:
            "在 1999 年以前，所有海船船员要 24 小时坐在 CH16 前听人喊救命。GMDSS 用机器替代了人。但这套系统并不只是 DSC——它还包括 EPIRB、SART、NAVTEX 等一整套设备的分工。",
          duration: "约 50 分钟",
          outcomes: [
            "能在世界地图上标出 GMDSS 的 A1 / A2 / A3 / A4 四个海上区域",
            "解释 GMDSS 的三个核心功能：报警 / 协调 / 现场通信",
            "理解为什么 GMDSS 取代了 morse code 与连续 watch CH16 的旧机制",
            "能说出 EPIRB、SART、AIS-SART、NAVTEX 在系统中各自的位置",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 4 — Global Maritime Distress and Safety System overview",
            "VHF/SRC · Module 5 — Other GMDSS equipment",
          ],
          body: [
            {
              type: "paragraph",
              text: "GMDSS（Global Maritime Distress and Safety System，全球海上遇险与安全系统）由 IMO 于 1988 年通过 SOLAS 公约修正案确立，1999 年 2 月 1 日全面实施。它的目标听起来很简单：一艘船在地球任何海域遇险，都能在尽量短的时间内、用自动化方式让岸台和附近船只知道这件事，并启动救援。但要做到这一点，需要的是一整套覆盖全球的设备组合，而不是一个孤立的电台。",
            },
            {
              type: "heading",
              text: "为什么需要 GMDSS：旧系统的两大问题",
            },
            {
              type: "paragraph",
              text: "1999 年以前，海上遇险靠两件事：① 电台员 24 小时在 500 kHz（MF morse）和 2182 kHz（MF 语音）以及 CH16（VHF）守听；② 船与岸双方依靠 morse code 或开声语音建立呼叫。问题是显而易见的：一艘小帆船根本养不起 24 小时电台员；远洋商船的电台员一旦在某次值班期间睡着或没在岗，遇险报警可能根本没人接到；morse 操作员越来越少；海上语音呼叫在杂讯里很容易被错过。",
            },
            {
              type: "paragraph",
              text: "GMDSS 用三件事解决了这些问题：① 用 DSC（数字选呼）替代连续值班守听——机器自动监听 CH70 的数字爆发信号，听到合法报警就触发警报，人不用 24 小时坐在前面；② 用 EPIRB（应急示位标）通过卫星把报警从任何海域送回岸；③ 用 NAVTEX 把岸到船的安全播报变成自动接收，不用人去对频道。整套系统设计的核心思路是「自动化」——让机器替人完成例行守听和路由。",
            },
            {
              type: "heading",
              text: "A1 / A2 / A3 / A4：四个海上区域",
            },
            {
              type: "paragraph",
              text: "GMDSS 把全球海洋按通信可达性分成 4 个区域。一艘船带什么设备、能在哪些区域合法航行，由这个分区决定。",
            },
            {
              type: "table",
              headers: ["区域", "范围", "主要通信手段", "典型设备组合"],
              rows: [
                ["A1", "VHF 岸台覆盖范围（一般离岸 20–30 海里）", "VHF + DSC", "VHF/DSC、EPIRB、NAVTEX"],
                ["A2", "MF 岸台覆盖范围（一般离岸 100–150 海里）", "MF + DSC", "上加 MF/DSC"],
                ["A3", "Inmarsat 卫星覆盖范围（约南北纬 76° 之间）", "Inmarsat 卫星", "上加 Inmarsat-C 或 HF"],
                ["A4", "极区（纬度 > 76° 北/南）", "HF（短波）", "上加完整 HF/DSC"],
              ],
            },
            {
              type: "callout",
              tone: "note",
              title: "你这艘小帆船大概率永远只航行在 A1",
              body:
                "私人帆船 95% 的航行都在 A1 区——离岸 20–30 海里内，VHF/DSC 是主通信。这也是 RYA SRC（Short Range Certificate）覆盖的范围。一旦你想做远洋（横渡大西洋、太平洋），你需要 LRC（Long Range Certificate）和 MF/HF 或 Inmarsat 设备。SRC 是入门，LRC 是远洋。",
            },
            {
              type: "heading",
              text: "三个核心功能：报警 / 协调 / 现场通信",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "报警 (Alerting) — 第一时间让岸台和附近船只知道有事故。手段：DSC 红按钮、EPIRB 自动激活、手动呼叫 MAYDAY。这一步的目标是「让消息出去」。",
                "协调 (Coordination) — 救援单位（MRCC，海上救援协调中心）通过 DSC、Inmarsat、HF 与遇险船和现场救援资源建立通信，分配任务、传达位置。这一步的目标是「让正确的人去做正确的事」。",
                "现场通信 (On-scene) — 救援船到达后，与遇险船在 CH06、CH16 等近距离频道直接对话；如果使用救生筏，触发 SART 让搜救飞机/船的雷达定位你。这一步的目标是「找到具体那艘船 / 那只筏 / 那个人」。",
              ],
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 2.1 · GMDSS 三层闭环示意（无专用流程图，用罗盘图占位）：报警（你 → 岸） → 协调（岸 → 救援资源） → 现场通信（救援 → 你）",
            },
            {
              type: "heading",
              text: "EPIRB / SART / AIS-SART / NAVTEX：各自的位置",
            },
            {
              type: "paragraph",
              text: "GMDSS 不只是 VHF/DSC。理解整套系统里其他几个名字，你才能在不同情境下选对工具：",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "EPIRB（Emergency Position-Indicating Radio Beacon, 406 MHz）—— 卫星应急示位标，自动或手动激活后通过 Cospas-Sarsat 卫星把含 MMSI 的求救信号送到 MRCC。覆盖全球（包括 A4 极区）。任何深远海航行强制装备。",
                "SART（Search and Rescue Transponder, 9 GHz）—— 雷达搜救应答机，激活后在搜救船/飞机的雷达屏上显示一串明显的「12 点亮斑」。用于救生筏被海浪冲走、救援资源已在附近时引导精确定位。",
                "AIS-SART —— 用 AIS 信号替代雷达信号的 SART 版本，把救生筏位置直接以 MMSI 970xxx 的虚拟船目标推送到附近所有 AIS 屏。现代救援船更依赖它。",
                "NAVTEX（518 kHz）—— 接收方向，岸到船的中频文本播报。沿岸 200–400 海里内自动接收气象警告、航行警告、搜救播报。船上是一台「自动打印」的设备，不需要值班。",
              ],
            },
            {
              type: "definition",
              term: "Cospas-Sarsat",
              meaning:
                "由美、俄、加、法四国发起、现已全球化的卫星搜救系统。运行在 406 MHz 频段，覆盖全球。EPIRB 一旦激活，5 分钟内全球任意位置的报警都能被处理。船上不需要订阅、不需要付费，但设备需要按主管机关要求注册编程 MMSI。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "EPIRB 与 DSC 是互补，不是替代",
              body:
                "新手常以为「我有 DSC 就够了」或者「我有 EPIRB 就够了」。这两个东西是互补的：DSC 走 VHF/MF/HF，速度快、但范围受限；EPIRB 走卫星，全球覆盖、但激活到救援响应通常需要 1–2 小时。出航流程是：先按 DSC 红按钮（A1 区最快），再激活 EPIRB（兜底）。两件事都要做。",
            },
            {
              type: "paragraph",
              text: "把 GMDSS 看作一张交错的网络：DSC 是近岸的快速通道，EPIRB 是覆盖全球的卫星备份，SART/AIS-SART 是现场最后 1 海里的引导。三层叠起来才是完整的安全网——而你的工作不是记住每一个名字，是知道任何一种情境下「先按哪个按钮」。",
            },
          ],
          quiz: [
            {
              id: "q-2-1-1",
              q: "GMDSS 的 A1 海上区域指的是？",
              options: [
                "Inmarsat 卫星覆盖的全球区域",
                "VHF 岸台覆盖区，一般离岸 20–30 海里以内",
                "极区（纬度 > 76°）",
                "中频（MF）岸台覆盖的 100–150 海里内",
              ],
              correct: 1,
              explanation:
                "A1 = VHF 岸台 DSC 守听范围，约 20–30 海里。A2 是 MF 范围，A3 是 Inmarsat 卫星范围，A4 是极区 HF。SRC 证书主要覆盖 A1。",
              topic: "GMDSS 区域",
            },
            {
              id: "q-2-1-2",
              q: "GMDSS 取代了 1999 年以前哪两项旧机制？",
              options: [
                "Inmarsat 和 NAVTEX",
                "Morse code 与连续人工守听 CH16 / 2182 kHz",
                "VHF 与 GPS",
                "AIS 与雷达",
              ],
              correct: 1,
              explanation:
                "GMDSS 的核心目的就是用机器自动化替代过去依赖电台员 24 小时守听和 morse 操作的人工系统。DSC 让机器替你监听，EPIRB 让卫星替你呼救。",
              topic: "GMDSS 历史",
            },
            {
              id: "q-2-1-3",
              q: "下列哪一项最准确地描述 SART 的用途？",
              options: [
                "通过卫星把遇险位置发送到全球",
                "在搜救资源已在附近时，让其雷达屏精确显示你的位置",
                "自动接收岸到船的气象警报",
                "替代 DSC 报警",
              ],
              correct: 1,
              explanation:
                "SART（9 GHz 雷达应答机）的工作场景是「救援已经在附近、需要最后 1 海里精确引导」。卫星报警是 EPIRB 的工作，气象播报是 NAVTEX。",
              topic: "SART",
            },
            {
              id: "q-2-1-4",
              q: "为什么说 DSC 和 EPIRB 是互补关系而不是替代关系？",
              options: [
                "因为它们工作在同一频段，可以同时使用",
                "DSC 速度快但通过 VHF/MF/HF 范围受限；EPIRB 全球卫星覆盖但激活到响应较慢——遇险时应先按 DSC 再激活 EPIRB",
                "DSC 用于商船，EPIRB 用于私人船",
                "EPIRB 已经被 DSC 完全取代",
              ],
              correct: 1,
              explanation:
                "DSC 报警在近岸 A1 区几秒到几分钟即可被岸台接收；EPIRB 卫星报警全球覆盖但典型响应 1–2 小时。两件事都按，最大化救援概率。",
              topic: "DSC vs EPIRB",
            },
          ],
        },
        {
          slug: "dsc-distress-procedures",
          index: "2.2",
          title: "DSC 遇险呼叫流程",
          summary:
            "5 秒长按红色按钮——你刚刚发出了什么？这一节把这一个动作背后系统做的所有事拆开讲清楚，包括 4 分钟自动重发、以及误发警报必须执行的取消程序。",
          duration: "约 55 分钟",
          outcomes: [
            "能完整复述按下 DSC 红按钮后系统在 4 分钟内做的事",
            "知道 DSC 报警的 5 个数据字段：MMSI、遇险性质、位置、时间、性质代码",
            "能在 CH16 上用语音补充 MAYDAY 的标准流程",
            "理解误发警报为何必须立刻取消，并能背出取消报文格式",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 3 — Distress alerting",
            "VHF/SRC · Module 4 — Global Maritime Distress and Safety System overview",
            "VHF/SRC · Module 7 — False alerts and cancellation",
          ],
          body: [
            {
              type: "paragraph",
              text: "在所有 VHF/DSC 设备的面板上，都有一个红色塑料盖子保护的按钮。盖子下面是 DSC Distress 按钮。按住它 5 秒钟，机器会发出一段约 600 毫秒的数字爆发，覆盖到附近所有 DSC 设备的 CH70 接收窗口。这一段数字包里携带的信息不多，但每一项都关键：你的 MMSI、遇险性质代码（可选）、GPS 位置（如果连接了 GPS）、UTC 时间。",
            },
            {
              type: "heading",
              text: "5 秒长按之后的 4 分钟",
            },
            {
              type: "paragraph",
              text: "按下按钮的瞬间，机器不只是发了一次。GMDSS 的协议要求 DSC 设备在 3.5–4.5 分钟之内、如果没收到任何 acknowledgement（应答），就自动重发同样的报警。这个机制叫 DSC repeat。目的是保险——岸台可能正好在另一通信中、附近船可能没在守听、信号可能被一次性干扰盖掉。4 分钟后再来一次，几乎可以确保有人收到。",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "T+0 秒 —— 你按下红按钮 5 秒。机器发出第一次 DSC 报警数据包，频率 CH70。",
                "T+0–10 秒 —— 附近所有 DSC 设备（船 + 岸）触发声光报警。MMSI、位置、时间显示在屏上。",
                "T+10 秒起 —— 你应当切到 CH16，用语音 MAYDAY 报文补充详细信息（DSC 只发了 MMSI 和位置，不够）。",
                "T+~4 分钟 —— 如果没收到任何 DSC acknowledgement，机器自动重发。如此循环直到收到应答或你手动取消。",
                "T+收到 ack —— 岸台或附近船 acknowledgement，重发循环停止。岸台开始在 CH16 与你建立语音通信，协调救援。",
              ],
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 2.2 · DSC 4 分钟流程示意（无专用流程图，用罗盘图占位）：红按钮 → CH70 数据包 → 附近 DSC 触发 → 4 分钟自动重发 → CH16 语音补充 MAYDAY",
            },
            {
              type: "heading",
              text: "DSC 报警的数据字段",
            },
            {
              type: "paragraph",
              text: "DSC 设备发出的那一段数字爆发是有标准结构的——任何一台符合 ITU-R M.493 标准的 DSC 都能解码。一份合格的遇险报警包含以下字段：",
            },
            {
              type: "table",
              headers: ["字段", "内容", "来源"],
              rows: [
                ["MMSI", "你的 9 位身份码", "DSC 出厂编程"],
                ["遇险性质代码", "Fire / Flooding / Collision / Sinking / Listing / Disabled / Abandoning / MOB / Other / Unspecified", "可选，用菜单选择；若不选默认 Unspecified"],
                ["位置（lat/lon）", "由 GPS 自动填入；未连 GPS 时可手动输入或为空", "GPS 自动 / 手动"],
                ["时间（UTC）", "报警发出时刻", "自动"],
                ["后续通信频道", "默认 CH16，可改为其他", "自动 / 手动"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "未连 GPS 的 DSC 是半残废",
              body:
                "如果你的 DSC 没连接 GPS（多见于 2010 年以前的老机型），按下红按钮发出去的报警没有位置字段——岸台只知道有人在喊，但不知道在哪。出航前自检：DSC 菜单看一眼 Position，是不是显示当前 lat/lon 而不是「---」。任何新装机型都强制要求 GPS 接入，不接入是违规。",
            },
            {
              type: "heading",
              text: "CH16 上的 MAYDAY 语音补充",
            },
            {
              type: "paragraph",
              text: "DSC 数据包送出之后，你的工作没结束——立刻把 VHF 切到 CH16，用语音补充完整的 MAYDAY 报文。原因是 DSC 字段只包含位置和性质代码，不包含船名、船型、援助类型、船员人数、是否弃船。这些细节救援队必须从你嘴里知道。完整 MAYDAY 报文的 7 项字段会在下一模块详讲；这里你只需要记住：DSC 红按钮 不是 终点，CH16 语音 才是。",
            },
            {
              type: "heading",
              text: "误发警报：必须执行的取消程序",
            },
            {
              type: "paragraph",
              text: "DSC 红按钮被误触发是真实存在的事。原因五花八门：测试时手滑、孩子在船上玩按钮、漏水进设备短路、二手船遗留测试模式。任何一次误触发都意味着附近 DSC 触发警报、岸台 MRCC 启动响应、可能调动救援资源。这是一件严重的事——不能装作没发生。法律和职业道德都要求你必须立刻执行误发警报取消程序。",
            },
            {
              type: "definition",
              term: "误发警报取消程序（False Alert Cancellation）",
              meaning:
                "按 ITU-R M.493 与各国主管机关规定，DSC 误触发后必须：① 立刻在 DSC 设备上按 Cancel；② 切到 CH16，用语音播报标准取消报文：「All stations, all stations, all stations, this is [船名] [呼号] MMSI [9 位], position [lat lon], time [UTC] — cancel my distress alert of [time] UTC. Out.」；③ 持续守听 CH16 等候岸台应答；④ 在航海日志记录此次误发与取消，并向主管机关报告。",
            },
            {
              type: "callout",
              tone: "warn",
              title: "误发警报不取消 = 浪费救援资源 + 可能被罚款",
              body:
                "在英国，明知误发而不取消可能违反 Wireless Telegraphy Act，处分包括罚款、警告甚至吊销船台牌照。更重要的，是你浪费的救援资源原本应该去帮另一个真正在求救的人。任何误发——哪怕你「只是测了一下」——都必须按程序取消。",
            },
            {
              type: "heading",
              text: "为什么这套设计这么复杂",
            },
            {
              type: "paragraph",
              text: "你可能会问：为什么不直接让 DSC 一次发完所有信息（船名、人数、援助类型）？为什么还要回到 CH16 语音？答案是带宽。CH70 上的数字爆发只有几百毫秒，能塞下的字段有限——更长的报文会占用频道更久，影响并发的其他报警。所以系统的设计是「数字字段（短而准）+ 语音字段（长而详）」分两步走。DSC 解决「在哪、是谁、什么大类」；CH16 语音解决剩下的所有细节。两步缺一不可。",
            },
            {
              type: "practice",
              prompt:
                "找到你这艘船的 VHF/DSC 设备，进入 Distress 菜单（不要按红按钮）——浏览一遍 Nature of Distress 的所有可选项（Fire、Flooding、Collision...）。把每一项的中英文对应都写下来，下次真要按红按钮前，你会知道翻到哪一格。",
              hint:
                "大多数民用 DSC 有 10 种 Nature of Distress 选项，UI 上通常用快捷字符或图标。Other 与 Unspecified 看起来很像但定义不同：Other = 有具体情况但不在 9 类标准之内；Unspecified = 来不及选。",
            },
          ],
          quiz: [
            {
              id: "q-2-2-1",
              q: "按下 DSC Distress 红按钮 5 秒之后，机器在没有收到应答的情况下会做什么？",
              options: [
                "只发一次，靠你自己重复按",
                "在 3.5–4.5 分钟之后自动重发同样的报警，循环直到收到应答或手动取消",
                "立刻持续发射 1 小时",
                "等你按第二次才发",
              ],
              correct: 1,
              explanation:
                "GMDSS 协议要求 DSC 在未收到 acknowledgement 时每隔约 4 分钟自动重发，最大化报警被收到的概率。",
              topic: "DSC 自动重发",
            },
            {
              id: "q-2-2-2",
              q: "DSC 报警的数据包中默认 不会 包含下列哪一项？",
              options: [
                "你的 MMSI",
                "你的位置 (lat/lon)",
                "你船上的船员人数与援助类型",
                "UTC 时间戳",
              ],
              correct: 2,
              explanation:
                "DSC 数字字段空间有限：包含 MMSI、位置、时间、性质代码、后续通信频道。船员人数、援助类型等细节必须在 CH16 上用语音 MAYDAY 报文补充。",
              topic: "DSC 字段",
            },
            {
              id: "q-2-2-3",
              q: "DSC 红按钮被误触发后，正确的处理是？",
              options: [
                "什么都不做，反正没人收到的话就过去了",
                "立刻执行误发警报取消程序：DSC Cancel + CH16 语音播报 cancel 报文 + 守听等候岸台应答 + 日志记录",
                "再按一次正常按钮覆盖前一次报警",
                "关机重启 VHF",
              ],
              correct: 1,
              explanation:
                "误发报警可能调动救援资源、违反 Wireless Telegraphy Act。必须按程序取消：DSC Cancel + CH16 语音 + 守听 + 日志。",
              topic: "误发取消",
            },
            {
              id: "q-2-2-4",
              q: "DSC 红按钮按下之后，下列哪一步是「必须立刻紧接着做」的？",
              options: [
                "重启 VHF",
                "切到 CH16，用语音补充完整 MAYDAY 报文（船名、援助类型、人数、性质细节）",
                "把船开回港",
                "等 4 分钟看会不会有应答",
              ],
              correct: 1,
              explanation:
                "DSC 只解决「数字字段」——MMSI、位置、性质大类、时间。完整 MAYDAY 报文必须在 CH16 上用语音补完。新手最大的失误就是只按红按钮、不回 CH16 补充。",
              topic: "DSC + 语音流程",
            },
          ],
        },
      ],
    },
    {
      slug: "standard-phrases",
      index: 3,
      title: "规范用语",
      summary:
        "VHF 是一台共享的电台——所有人用同一套词、同一种语序，才能在杂讯中互相听懂。MAYDAY 报文 7 个必报字段、NATO 字母表、海事数字读法——这些不是仪式，是杂讯里的求生工具。",
      lessons: [
        {
          slug: "mayday-pan-securite",
          index: "3.1",
          title: "三级警讯：MAYDAY / PAN-PAN / SECURITE",
          summary:
            "Distress、Urgency、Safety——三个级别的差别决定了岸台分配什么响应、附近船只是否需要让位。学完这一节，你听到任何一个开头都能立刻判断「我该不该停下手里的事」。",
          duration: "约 50 分钟",
          outcomes: [
            "能区分 MAYDAY / PAN-PAN / SECURITE 三级警讯的法律定义",
            "用中英文流利复述标准 MAYDAY 报文的 7 项必报字段",
            "能写出 MAYDAY RELAY（中继）的标准格式",
            "理解为什么三个词都要重复 3 次",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 3 — Distress alerting",
            "VHF/SRC · Module 8 — Urgency and safety communications",
          ],
          body: [
            {
              type: "paragraph",
              text: "国际海事电信法规把船上的紧急通信分成三个级别，每个级别有自己的「魔法词」。这三个词不是英文俚语，是法国语言学起源的国际标准——选择法语是因为法语发音清晰、不容易和其他英文词混淆。下表是三个级别的法律定义与典型场景：",
            },
            {
              type: "table",
              headers: ["级别", "魔法词（重复 3 次）", "法律定义", "典型场景"],
              rows: [
                ["Distress 遇险", "MAYDAY · MAYDAY · MAYDAY", "grave and imminent danger（严重且迫在眉睫的危险）危及生命或船体", "起火、进水、碰撞、弃船、人命危急的医疗紧急"],
                ["Urgency 紧急", "PAN-PAN · PAN-PAN · PAN-PAN", "urgency（紧迫情况，但暂时不危及生命）", "失去动力漂向 lee shore、船员重伤（非危及生命）、严重失能"],
                ["Safety 安全", "SECURITE · SECURITE · SECURITE", "safety information（航行安全信息）", "气象警告、漂流物报告、岸台的航行警告"],
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "为什么每个词都要重复 3 次",
              body:
                "MAYDAY、PAN-PAN、SECURITE 重复 3 次不是仪式感——是杂讯设计。一次可能被另一段通信、电流杂讯、海浪打到天线的瞬间盖掉。3 次让接收方有 2 次冗余的机会。统计上，3 次重复能让漏听率从单次的约 15% 降到 0.3% 以下。所以哪怕你紧张到嗓子哑，也要喊完 3 遍。",
            },
            {
              type: "heading",
              text: "标准 MAYDAY 报文：7 项必报字段",
            },
            {
              type: "paragraph",
              text: "MAYDAY 不是「随便喊救命」，它有严格的报文格式。RYA SRC 笔试中至少 1/4 题考这个，因为它是 VHF 教学的核心。一份合格的 MAYDAY 必须包含 7 项字段，缺一不可：",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "呼叫开头 —— 「MAYDAY · MAYDAY · MAYDAY」（3 次）",
                "「This is」 + 船名（重复 3 次） + Call Sign（呼号） + MMSI（9 位）",
                "「MAYDAY」 + 船名（再 1 次）",
                "位置 —— lat/lon 或相对已知地标的方位距离",
                "遇险性质 —— Fire / Flooding / Sinking / Aground / Collision / Medevac 等",
                "援助类型 —— Need immediate evacuation / Need pump / Need medical assistance...",
                "船员人数 + 弃船意图 —— 「X persons on board, abandoning to liferaft」or 「X persons on board, remaining with vessel」",
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "MIPDANIO：7 项的英文助记",
              body:
                "RYA 教考圈流传的助记法是 MIPDANIO：MAYDAY × 3 + Identity（船名×3+呼号+MMSI）+ Position + Distress nature + Assistance needed + Number on board + Information（其他关键信息，如弃船意图）+ Over。背下这几个首字母，考试时不会漏。",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 3.1 · MIPDANIO 7 项报文结构示意（无专用流程图，用罗盘图占位）：每一项都对应 MAYDAY 报文中的一个固定位置，缺一不可",
            },
            {
              type: "heading",
              text: "一份完整 MAYDAY 报文示范",
            },
            {
              type: "paragraph",
              text: "下面是一份符合规范的 MAYDAY 示例，假设你的船叫 Sea Pearl、呼号 MGYS3、MMSI 232123456，位置 50°15'N 002°30'W，正在进水：",
            },
            {
              type: "quote",
              text:
                "MAYDAY · MAYDAY · MAYDAY · This is sailing vessel Sea Pearl, Sea Pearl, Sea Pearl · Call Sign Mike Golf Yankee Sierra Three · MMSI two-three-two-one-two-three-four-five-six · MAYDAY Sea Pearl · Position five-zero degrees one-fife minutes north, zero-zero-two degrees three-zero minutes west · Flooding, taking on water rapidly · Require immediate assistance · Four persons on board, preparing liferaft · Over.",
              attribution: "WindHero VHF 范本报文",
            },
            {
              type: "heading",
              text: "MAYDAY RELAY：当你为别人转发求救",
            },
            {
              type: "paragraph",
              text: "如果你听到附近船只的 MAYDAY 但岸台没有应答（可能岸台被山挡住、对方信号太弱、岸台正忙）——你有义务转发。这叫 MAYDAY RELAY，格式略有不同：以「MAYDAY RELAY · MAYDAY RELAY · MAYDAY RELAY」开头，然后报告自己的身份、再复述听到的 MAYDAY 内容。重要的是：你不是替他求救，你是把消息传递出去。报文中必须说清楚「我听到的 MAYDAY 来自 Vessel X」。",
            },
            {
              type: "quote",
              text:
                "MAYDAY RELAY · MAYDAY RELAY · MAYDAY RELAY · This is sailing vessel Sea Pearl, Sea Pearl, Sea Pearl · Call Sign Mike Golf Yankee Sierra Three · I have received the following MAYDAY from vessel Blue Heron at position five-zero one-five north, zero-zero-two three-zero west, flooding, four persons on board. Vessel Blue Heron last heard at time one-four-three-zero UTC. Over.",
              attribution: "WindHero MAYDAY RELAY 范本",
            },
            {
              type: "definition",
              term: "MAYDAY RELAY",
              meaning:
                "当你接收到他船的 MAYDAY，但判断岸台或近岸救援单位未收到时，主动转发的中继程序。SOLAS 公约下，听到 MAYDAY 而能转发却不转发，属于违法行为。",
            },
            {
              type: "heading",
              text: "PAN-PAN 与 SECURITE：什么时候用",
            },
            {
              type: "paragraph",
              text: "PAN-PAN 是新手最容易用错（或不敢用）的。判断标准：是「紧急但暂时不危及生命」。船失去动力、漂向无人海域、船员摔伤但伤情稳定——这都是 PAN-PAN 的场景。不要因为「不太严重」就不发——PAN-PAN 让岸台知情、附近船注意，但不会启动 MAYDAY 那种级别的响应。这种「中间档」存在的意义就是给现实生活中绝大多数「有点麻烦但还没到生命危险」的情况一个正式通道。",
            },
            {
              type: "paragraph",
              text: "SECURITE 99% 的场景是岸台发的——气象警告、漂流物、新设浮标、临时禁航。船上发 SECURITE 的常见情况是你目击了重要的航行风险，比如发现一只大型漂流集装箱，需要让附近船知道。SECURITE 开头之后，岸台或船会让你切到工作频道（通常 CH13 或 CH67）做详细播报。",
            },
            {
              type: "callout",
              tone: "note",
              title: "PAN-PAN MEDICO：医疗紧急的特殊变体",
              body:
                "「PAN-PAN MEDICO」（或 PAN MEDICAL）是 PAN-PAN 的医疗紧急子类，专用于船员需要医疗咨询或建议的情况——比如有人胸痛但你不确定是否心梗。岸台会接你到岸基医生做远程问诊。这是一个非常实用但被低估的频道——医疗紧急在远岸船上发生频率不低。",
            },
            {
              type: "practice",
              prompt:
                "把你自己船的真实信息（船名、Call Sign、MMSI、母港）填入下面这个模板，写一份完整的 MAYDAY：你正在 X 海域、Y 性质遇险、Z 援助类型、N 人在船。写完后大声念一遍——感受这份报文的节奏。下一次真按红按钮前，你的嘴会知道该说什么。",
              hint:
                "把它录音下来听一遍。多数新手第一次念完发现自己漏了 1–2 个字段——通常是船员人数和弃船意图。",
            },
          ],
          quiz: [
            {
              id: "q-3-1-1",
              q: "下列情境中，最应当使用 PAN-PAN 而 不是 MAYDAY 的是？",
              options: [
                "船起火、火势失控、需要立刻弃船",
                "船失去动力、漂向无人海域，但船体完好、人员安全",
                "船员心梗、危及生命",
                "船进水、5 分钟可能沉没",
              ],
              correct: 1,
              explanation:
                "MAYDAY = grave and imminent danger（危及生命）；PAN-PAN = urgency（紧迫但暂时不危及生命）。失去动力但船体完好、人员安全是典型 PAN-PAN 场景。",
              topic: "三级警讯",
            },
            {
              id: "q-3-1-2",
              q: "标准 MAYDAY 报文的 7 项必报字段中，下列哪一项 不属于 必报？",
              options: [
                "船员人数",
                "援助类型",
                "船龄与建造年份",
                "遇险性质",
              ],
              correct: 2,
              explanation:
                "MIPDANIO 7 项是：MAYDAY×3、Identity（船名×3+呼号+MMSI）、Position、Distress nature、Assistance、Number on board、Information。船龄与建造年份与救援无关，不是必报字段。",
              topic: "MAYDAY 必报字段",
            },
            {
              id: "q-3-1-3",
              q: "为什么 MAYDAY、PAN-PAN、SECURITE 三个魔法词都要重复 3 次？",
              options: [
                "纯粹是仪式感",
                "因为法语规定如此",
                "为冗余设计——单次可能被杂讯或并发通信盖掉，3 次让漏听率从 ~15% 降到 0.3% 以下",
                "为了让说话的人冷静下来",
              ],
              correct: 2,
              explanation:
                "VHF 通信容易被杂讯、并发信号、海况干扰盖掉。3 次重复让接收方有冗余机会准确识别消息级别。",
              topic: "重复 3 次的原因",
            },
            {
              id: "q-3-1-4",
              q: "你听到附近船只的 MAYDAY，但 30 秒过去岸台没有应答。你应当？",
              options: [
                "继续守听，等岸台",
                "立刻发出 MAYDAY RELAY · MAYDAY RELAY · MAYDAY RELAY，把听到的内容转发出去",
                "切到 CH06 自己呼叫对方",
                "什么都不做，怕添乱",
              ],
              correct: 1,
              explanation:
                "SOLAS 公约下，听到 MAYDAY 且判断岸台未收到时，有法律义务发出 MAYDAY RELAY 转发。不转发可能违法。",
              topic: "MAYDAY RELAY",
            },
          ],
        },
        {
          slug: "procedural-vocabulary",
          index: "3.2",
          title: "专业用语：NATO 字母表、数字读法、呼叫格式",
          summary:
            "Alfa Bravo Charlie——你的姓名、船名、位置都要用这套字母表拼读，否则在杂讯里 B 听起来和 D 一样、F 和 S 一样。这一节把所有 SRC 笔试会考的「术语规范」一次过完。",
          duration: "约 50 分钟",
          outcomes: [
            "背出完整的 NATO 国际字母表 A–Z",
            "用海事数字读法（NINER, FIFE, ZE-RO）流利念出任意 9 位 MMSI",
            "记住 OVER / OUT / ROGER / WILCO / AFFIRMATIVE / NEGATIVE / SAY AGAIN / I SPELL 等核心操作词",
            "能用标准呼叫格式发起一次「船到岸」的工作频道协议",
          ],
          ryaSyllabusItems: [
            "VHF/SRC · Module 1 — Basic operating procedures",
            "VHF/SRC · Module 9 — Phonetic alphabet and procedural words",
          ],
          body: [
            {
              type: "paragraph",
              text: "VHF 是一种被设计来在「不好的条件下」工作的通信——电流嗡嗡、海浪打在船身、对方发动机噪声、强风把麦克风刮得呼呼响。在这种条件下，B 和 D、F 和 S、M 和 N 几乎无法区分。所以国际海事社区借用了 NATO 字母表——每个字母对应一个发音清晰、不易混淆的单词。「B」用 Bravo，「D」用 Delta，杂讯中也能区分。",
            },
            {
              type: "heading",
              text: "NATO 字母表（必背）",
            },
            {
              type: "table",
              headers: ["字母", "单词", "发音", "字母", "单词", "发音"],
              rows: [
                ["A", "Alfa", "AL-FAH", "N", "November", "NO-VEM-BER"],
                ["B", "Bravo", "BRAH-VOH", "O", "Oscar", "OSS-CAH"],
                ["C", "Charlie", "CHAR-LEE", "P", "Papa", "PAH-PAH"],
                ["D", "Delta", "DELL-TAH", "Q", "Quebec", "KEH-BECK"],
                ["E", "Echo", "ECK-OH", "R", "Romeo", "ROW-ME-OH"],
                ["F", "Foxtrot", "FOKS-TROT", "S", "Sierra", "SEE-AIR-RAH"],
                ["G", "Golf", "GOLF", "T", "Tango", "TANG-GO"],
                ["H", "Hotel", "HOH-TELL", "U", "Uniform", "YOU-NEE-FORM"],
                ["I", "India", "IN-DEE-AH", "V", "Victor", "VIK-TAH"],
                ["J", "Juliet", "JEW-LEE-ETT", "W", "Whiskey", "WISS-KEY"],
                ["K", "Kilo", "KEY-LOH", "X", "X-ray", "ECKS-RAY"],
                ["L", "Lima", "LEE-MAH", "Y", "Yankee", "YANG-KEY"],
                ["M", "Mike", "MIKE", "Z", "Zulu", "ZOO-LOO"],
              ],
            },
            {
              type: "callout",
              tone: "tip",
              title: "「Alfa」与「Juliet」的拼写陷阱",
              body:
                "注意 Alfa 写作 A-L-F-A 而不是 Alpha，Juliet 写作 J-U-L-I-E-T 而不是 Juliett。这是 ITU 与 ICAO 共同规范的拼写，原因是为了让非英语母语者更容易准确发音（ph 在很多语言里读法不同）。SRC 笔试可能直接考拼写。",
            },
            {
              type: "heading",
              text: "海事数字读法",
            },
            {
              type: "paragraph",
              text: "数字也要用规范读法，避免在杂讯中把 5 听成 9 或者把 0 听成 8。海事数字读法的关键有三点：① 一次只读一位数字（MMSI 232 不读 two-thirty-two，而是 two-three-two）；② 5 读「FIFE」（避免与 fire 混）、9 读「NINER」（避免与 no 混）、0 读「ZE-RO」；③ 千位用「THOUSAND」连接，小数点用「DECIMAL」或「POINT」。",
            },
            {
              type: "table",
              headers: ["数字", "海事读法", "原因"],
              rows: [
                ["0", "ZE-RO", "区分于 oh / 字母 O"],
                ["1", "WUN", "标准读音"],
                ["2", "TOO", "标准读音"],
                ["3", "TREE", "区分于 thirteen 缩读"],
                ["4", "FOW-ER", "标准读音"],
                ["5", "FIFE", "区分于 fire"],
                ["6", "SIX", "标准读音"],
                ["7", "SEV-EN", "标准读音"],
                ["8", "AIT", "区分于 hate"],
                ["9", "NIN-ER", "区分于 no / nine"],
              ],
            },
            {
              type: "definition",
              term: "I SPELL（我拼读）",
              meaning:
                "当你要拼读一个非标准词、人名、船名或地名时，在用字母表读出之前说「I SPELL」预告。例：「Sea Pearl, I SPELL · Sierra · Echo · Alfa · space · Papa · Echo · Alfa · Romeo · Lima」。这给接收方一个明确信号，提醒他切换到「逐字母接收」的注意状态。",
            },
            {
              type: "heading",
              text: "操作词（Procedural Words）",
            },
            {
              type: "paragraph",
              text: "这些短词在 VHF 通信里有严格定义，不能随意替换为日常英语：",
            },
            {
              type: "list",
              ordered: false,
              items: [
                "OVER —— 「我说完了，请你回答」。不是「结束」。",
                "OUT —— 「整段通信结束，无需再回应」。不与 OVER 同用——「OVER AND OUT」是好莱坞虚构，实际通信中不存在。",
                "ROGER —— 「我收到你刚说的全部内容」。不代表「我同意」也不代表「我会照办」。",
                "WILCO —— Will Comply，「我收到并将照办」。隐含 ROGER 含义，所以不用说「ROGER WILCO」。",
                "AFFIRMATIVE / NEGATIVE —— 「是 / 否」。不用 YES / NO，因为在杂讯里太短。",
                "SAY AGAIN —— 「请重复刚才那段」。不用 REPEAT（在军事里 REPEAT 表示「重新开火」，海事禁用以避免混淆）。",
                "STAND BY —— 「请稍候，我马上回来」。",
                "I SPELL —— 「下面我要逐字母拼读」。",
                "ALL STATIONS —— 「致所有正在守听的电台」（用于 SECURITE 等广播）。",
              ],
            },
            {
              type: "callout",
              tone: "warn",
              title: "为什么 REPEAT 在海事中禁用",
              body:
                "「REPEAT」在军事电报里是「重新开火」的命令。1940 年代以来，海事社区为了避免与军方频道混淆，统一用「SAY AGAIN」表示请求重复。今天哪怕只在民用 VHF 上，「REPEAT」仍然是禁用词——你说「REPEAT」别人虽然能猜到，但会立刻知道你不是受过训练的人。",
            },
            {
              type: "heading",
              text: "标准呼叫格式：从呼叫到结束",
            },
            {
              type: "paragraph",
              text: "VHF 呼叫遵循固定语序：「[STATION YOU CALL] · this is · [STATION CALLING] · [短消息或请求转频道] · OVER」。三段式：先叫对方、再说自己是谁、再讲事情。这个顺序看起来繁琐，但有道理——「先叫对方」让对方在听到自己船名的瞬间注意起来，再听到「this is」之后就知道说话的是谁。新手最常犯的错是反过来「Hi this is X, calling Y」，结果对方在还没意识到「是叫我」之前就漏掉了关键信息。",
            },
            {
              type: "quote",
              text:
                "Solent Coastguard, Solent Coastguard, Solent Coastguard, this is sailing vessel Sea Pearl, Sea Pearl, Sea Pearl, requesting radio check on Channel one-six, over. — Sea Pearl, this is Solent Coastguard, your signal is loud and clear, over. — Solent Coastguard, this is Sea Pearl, thank you, switching to Channel six-seven, out.",
              attribution: "WindHero 标准呼叫范本",
            },
            {
              type: "diagram",
              kind: "compass-rose",
              caption: "图 3.2 · 三段式呼叫格式示意（无专用流程图，用罗盘图占位）：先呼对方 → 再报自己 → 再讲事情；结束用 OVER（等回答）或 OUT（结束）",
            },
            {
              type: "callout",
              tone: "tip",
              title: "Radio Check：每次出航前的 30 秒",
              body:
                "出航前在港里向岸台或附近船只做一次 radio check 是好习惯——能确认 VHF 工作正常、自己功率合适。规范做法：先在 CH16 上初次呼叫，约定切到 CH72 / CH77 等工作频道做正式 radio check（避免占用 CH16）。等收到「Loud and clear」就知道你这台机器今天可以信赖。",
            },
            {
              type: "practice",
              prompt:
                "把你自己的 MMSI（9 位数字）用海事数字读法念一遍，再用 NATO 字母表把你的船名拼读出来。两件事都录下来回放。如果听不出某个数字或字母是哪一个，说明你的发音还不够标准。重复练习直到你听自己的录音能 100% 正确还原。",
              hint:
                "9 位 MMSI 的标准读法每位之间停顿很短，但每位之内的元音要拉满——「TOO」念得比平时长一点点会让对方听得更清楚。",
            },
            {
              type: "paragraph",
              text: "三级警讯告诉你「这段话有多紧急」，规范用语告诉你「怎么把话说清楚」。两者加在一起，就是 RYA SRC 笔试的全部核心。下一步——去找一所 RYA 认证学校，把书本上的字母表变成嘴里的肌肉记忆。",
            },
          ],
          quiz: [
            {
              id: "q-3-2-1",
              q: "NATO 字母表中，字母 F 对应哪一个单词？",
              options: [
                "Falcon",
                "Foxtrot",
                "France",
                "Frank",
              ],
              correct: 1,
              explanation:
                "F = Foxtrot。NATO 字母表共 26 个标准单词，每个都是精心挑选的、发音清晰、跨语言不易误听的词。",
              topic: "NATO 字母表",
            },
            {
              id: "q-3-2-2",
              q: "海事数字读法中，「5」与「9」分别读作？",
              options: [
                "Five 与 Nine（同标准英语）",
                "FIFE 与 NINER",
                "FIVE 与 NIN",
                "PUNTO 与 NUEVE",
              ],
              correct: 1,
              explanation:
                "为避免与 fire / no 等词混淆，海事数字 5 = FIFE，9 = NINER。这是 ITU 与 ICAO 共用的标准读法。",
              topic: "海事数字",
            },
            {
              id: "q-3-2-3",
              q: "下列对 OVER 与 OUT 的描述哪一项正确？",
              options: [
                "OVER 表示通信永远结束，OUT 表示请对方继续",
                "OVER 表示「我说完了，请你回答」；OUT 表示「整段通信结束，无需回应」；两者不同时使用",
                "OVER AND OUT 是标准结尾用语",
                "两者完全可以互换",
              ],
              correct: 1,
              explanation:
                "OVER = 我说完，请你说。OUT = 通信结束。两者不能同时用（「OVER AND OUT」是好莱坞虚构，非真实操作）。",
              topic: "OVER / OUT",
            },
            {
              id: "q-3-2-4",
              q: "标准 VHF 呼叫格式的正确语序是？",
              options: [
                "「This is [自己] · calling [对方] · OVER」",
                "「[对方] · This is [自己] · [事情] · OVER」",
                "「[自己] · [事情] · [对方] · OVER」",
                "「Hello [对方] · my name is [自己] · OUT」",
              ],
              correct: 1,
              explanation:
                "正确语序：先叫对方（让对方知道「是叫我」），再「this is」自己，再讲事情，最后 OVER。这个顺序让对方在第一秒就能集中注意力。",
              topic: "呼叫格式",
            },
          ],
        },
      ],
    },
  ],
  exam: {
    durationMinutes: 60,
    passMark: 80,
    refersTo: "对标 RYA VHF/SRC（Short Range Certificate）笔试题型",
    brief:
      "这是一份 15 题闭卷模拟考（从 30 题题库中随机抽取），及格分 80 分——与 RYA SRC 真实考试的及格线一致。重要提示：这门课的考试 不能 替代 RYA SRC 证书；本考试用于自检你是否准备好去 RYA 认证学校考 SRC。完成本课 + 通过本考试，建议你在 4 周内报名 RYA 认证学校的一日 SRC 课程并参加官方笔试 + 实操考核。",
    questions: [
      {
        id: "exam-1",
        q: "标准 MAYDAY 报文的开头是？",
        options: [
          "MAYDAY 一次 + 船名一次",
          "MAYDAY · MAYDAY · MAYDAY（重复 3 次）",
          "PAN-PAN · PAN-PAN · PAN-PAN",
          "ALL STATIONS · MAYDAY",
        ],
        correct: 1,
        explanation:
          "ITU-R M.1371 规定 MAYDAY 必须连续重复 3 次。重复 3 次是冗余设计——避免单次被杂讯盖掉。",
        topic: "MAYDAY 开头",
      },
      {
        id: "exam-2",
        q: "下列哪一项 不属于 标准 MAYDAY 报文的 7 项必报字段？",
        options: [
          "船员人数",
          "援助类型",
          "船的建造年份与吨位",
          "遇险性质",
        ],
        correct: 2,
        explanation:
          "MIPDANIO 7 项：MAYDAY×3、Identity、Position、Distress nature、Assistance、Number on board、Information（弃船意图）。建造年份与吨位与救援无关。",
        topic: "MAYDAY 必报字段",
      },
      {
        id: "exam-3",
        q: "MAYDAY 报文中，船名应该重复几次？",
        options: [
          "1 次",
          "2 次",
          "3 次（在 This is 之后）",
          "5 次",
        ],
        correct: 2,
        explanation:
          "标准格式：「This is [船名] [船名] [船名]」——船名重复 3 次。然后给呼号、MMSI。",
        topic: "MAYDAY 船名",
      },
      {
        id: "exam-4",
        q: "「MAYDAY RELAY」用于什么情境？",
        options: [
          "替自己求救的另一种说法",
          "听到附近船只 MAYDAY 但岸台未应答时，由你转发该求救",
          "求救之后的取消",
          "测试 VHF",
        ],
        correct: 1,
        explanation:
          "MAYDAY RELAY 是中继程序——你听到他船 MAYDAY 而岸台没有响应时，必须转发。SOLAS 公约下，能转发而不转发是违法行为。",
        topic: "MAYDAY RELAY",
      },
      {
        id: "exam-5",
        q: "标准 MAYDAY 报文最后一项「弃船意图」用什么短语描述？",
        options: [
          "Going down（要沉了）",
          "Abandoning to liferaft / Remaining with vessel（弃船登筏 / 留在船上）",
          "Help me",
          "Crew jumping overboard",
        ],
        correct: 1,
        explanation:
          "标准用语是 abandoning to liferaft（准备登救生筏）或 remaining with vessel（留在船上）。这一项让救援知道：来了之后是搜筏还是搜船。",
        topic: "MAYDAY 弃船意图",
      },
      {
        id: "exam-6",
        q: "CH16 的法定用途是？",
        options: [
          "船间私人通信",
          "国际遇险、安全、初次呼叫频道",
          "DSC 数据信道",
          "天气预报",
        ],
        correct: 1,
        explanation:
          "CH16 = 国际遇险/安全/呼叫频道，所有装机船航行中必须守听。不允许在 CH16 上做长对话。",
        topic: "CH16",
      },
      {
        id: "exam-7",
        q: "CH70 的法定用途是？",
        options: [
          "船间任意通信",
          "DSC 专用数据信道，禁止语音",
          "桥到桥避碰协调",
          "应急医疗咨询",
        ],
        correct: 1,
        explanation:
          "CH70 是国际公约保留的 DSC 纯数据信道，任何语音通信都禁止。理由：避免语音覆盖 DSC 自动报警。",
        topic: "CH70",
      },
      {
        id: "exam-8",
        q: "CH13 的法定用途是？",
        options: [
          "DSC 数据",
          "桥到桥（bridge-to-bridge），船与船的避碰与操纵协调",
          "气象播报",
          "私人船间聊天",
        ],
        correct: 1,
        explanation:
          "CH13 是 bridge-to-bridge 频道，大商船间避碰协调的标准频道。在大商船密集水域监听 CH13 与 CH16 是常识。",
        topic: "CH13",
      },
      {
        id: "exam-9",
        q: "CH06 的法定用途是？",
        options: [
          "船间安全协调（如搜救现场协调、约会、并靠）",
          "国际呼叫",
          "DSC",
          "卫星电话接续",
        ],
        correct: 0,
        explanation:
          "CH06 是船与船之间的安全协调频道，常用于搜救现场、船间约会、并靠等。新手最容易记错，CH06 与 CH16 经常被混淆。",
        topic: "CH06",
      },
      {
        id: "exam-10",
        q: "你在港里要呼叫旁边 100 米的船，应该使用哪一档功率？",
        options: [
          "25 W High",
          "1 W Low（遵循最低功率原则）",
          "由 VHF 自动选",
          "看心情",
        ],
        correct: 1,
        explanation:
          "ITU 规则：使用能完成通信所需的最低功率。近距离必须 1 W，否则违规、污染港湾内其他通信。",
        topic: "功率选择",
      },
      {
        id: "exam-11",
        q: "NATO 字母表中，字母 J 对应哪一个单词？",
        options: [
          "Jack",
          "Juliet",
          "Japan",
          "Jaguar",
        ],
        correct: 1,
        explanation:
          "J = Juliet（ITU 规范拼写为 J-U-L-I-E-T，5 字母）。这是 NATO 字母表的标准之一。",
        topic: "字母表 J",
      },
      {
        id: "exam-12",
        q: "NATO 字母表中，字母 Q 对应哪一个单词？",
        options: [
          "Queen",
          "Quebec",
          "Question",
          "Quick",
        ],
        correct: 1,
        explanation:
          "Q = Quebec（发音 KEH-BECK）。是 NATO 字母表中少数几个保留法语原读音的词之一。",
        topic: "字母表 Q",
      },
      {
        id: "exam-13",
        q: "NATO 字母表中，字母 X 对应哪一个单词？",
        options: [
          "X-ray",
          "Xenon",
          "Xerox",
          "Xanadu",
        ],
        correct: 0,
        explanation:
          "X = X-ray（ECKS-RAY）。是少数包含连字符的标准词。",
        topic: "字母表 X",
      },
      {
        id: "exam-14",
        q: "NATO 字母表中，字母 W 对应哪一个单词？",
        options: [
          "Wolf",
          "Whiskey",
          "Wave",
          "William",
        ],
        correct: 1,
        explanation:
          "W = Whiskey（WISS-KEY）。注意拼写——是 Whiskey 而非 Whisky（虽然两种拼法都指同种饮品，但 NATO 标准是带 e 的 Whiskey）。",
        topic: "字母表 W",
      },
      {
        id: "exam-15",
        q: "MMSI 的 9 位数字中，前 3 位代表？",
        options: [
          "船型分类",
          "MID（国家码）",
          "建造年份",
          "船舶大小",
        ],
        correct: 1,
        explanation:
          "前 3 位 MID（Maritime Identification Digits）= 国家码。例：232=英国，412=中国，477=香港，525=新加坡。",
        topic: "MMSI 结构",
      },
      {
        id: "exam-16",
        q: "DSC 红按钮按下 5 秒后，机器在未收到应答时会？",
        options: [
          "只发一次",
          "每 3.5–4.5 分钟自动重发，循环至收到应答或手动取消",
          "发射 1 小时不停",
          "等你再按一次",
        ],
        correct: 1,
        explanation:
          "GMDSS 协议要求 DSC 自动重发，最大化报警被收到的概率。直到收到 acknowledgement 或被手动取消才停止。",
        topic: "DSC 重发",
      },
      {
        id: "exam-17",
        q: "DSC 报警的数据包默认 不会 包含哪一项？",
        options: [
          "MMSI",
          "位置 lat/lon",
          "船员人数与援助类型",
          "UTC 时间",
        ],
        correct: 2,
        explanation:
          "DSC 数字字段只有 MMSI、位置、性质代码、时间。船员人数、援助类型必须 CH16 语音补充。",
        topic: "DSC 字段",
      },
      {
        id: "exam-18",
        q: "DSC 红按钮误触发后，正确处理是？",
        options: [
          "不处理，反正没人收到就算了",
          "立刻执行误发警报取消程序：DSC Cancel + CH16 语音 cancel 报文 + 守听 + 日志",
          "关掉 VHF",
          "再按一次正常按钮",
        ],
        correct: 1,
        explanation:
          "误发不取消可能触发救援资源调度，违反 Wireless Telegraphy Act。必须按程序取消。",
        topic: "误发取消",
      },
      {
        id: "exam-19",
        q: "GMDSS 的 A1 海上区域指的是？",
        options: [
          "极区",
          "VHF 岸台 DSC 守听范围（约离岸 20–30 海里）",
          "Inmarsat 卫星覆盖区",
          "中频 MF 岸台覆盖区",
        ],
        correct: 1,
        explanation:
          "A1 = VHF 岸台范围，是 SRC 证书覆盖的范围。A2=MF，A3=Inmarsat，A4=极区 HF。",
        topic: "GMDSS A1",
      },
      {
        id: "exam-20",
        q: "PAN-PAN 与 MAYDAY 的根本区别是？",
        options: [
          "PAN-PAN 用于无线电测试",
          "PAN-PAN 是紧急但不危及生命；MAYDAY 是危及生命或船体的严重危险",
          "PAN-PAN 是法语，MAYDAY 是英语",
          "两者完全相同",
        ],
        correct: 1,
        explanation:
          "MAYDAY = grave and imminent danger（危及生命）；PAN-PAN = urgency（紧迫但暂时不危及生命）。这是法律定义的区别。",
        topic: "三级警讯",
      },
      {
        id: "exam-21",
        q: "SECURITE 通常用于？",
        options: [
          "私人船间问候",
          "航行安全信息（气象警告、漂流物、航行警告等）",
          "求救",
          "DSC 测试",
        ],
        correct: 1,
        explanation:
          "SECURITE 是 safety 级广播，绝大多数由岸台发布——气象、漂流物、新设浮标。船上偶尔在目击重大航行风险时也用。",
        topic: "SECURITE",
      },
      {
        id: "exam-22",
        q: "OVER 与 OUT 的正确用法？",
        options: [
          "OVER AND OUT 是标准结尾",
          "OVER = 我说完了请你说；OUT = 通信结束。两者不同时使用",
          "OVER 表示通信结束",
          "OUT 表示请对方继续",
        ],
        correct: 1,
        explanation:
          "OVER = 等对方回答；OUT = 通信终结。不能合用——「OVER AND OUT」是电影虚构，实际操作不存在。",
        topic: "OVER / OUT",
      },
      {
        id: "exam-23",
        q: "海事数字读法中，0 念作？",
        options: [
          "ZE-RO（避免与字母 O 混）",
          "Oh",
          "Null",
          "Naught",
        ],
        correct: 0,
        explanation:
          "海事 0 = ZE-RO。Oh 容易与字母 O 混淆，禁用。",
        topic: "数字 0",
      },
      {
        id: "exam-24",
        q: "「请重复刚才那段」在 VHF 中用哪个词？",
        options: [
          "REPEAT",
          "SAY AGAIN",
          "AGAIN",
          "PLEASE",
        ],
        correct: 1,
        explanation:
          "SAY AGAIN 是标准。REPEAT 在军事电报中表示「重新开火」，海事禁用以避免混淆。",
        topic: "SAY AGAIN",
      },
      {
        id: "exam-25",
        q: "「我收到并将照办」用哪个 procedural word？",
        options: [
          "ROGER",
          "WILCO",
          "AFFIRMATIVE",
          "AGREED",
        ],
        correct: 1,
        explanation:
          "WILCO = Will Comply，「收到并将照办」。隐含 ROGER 含义，不需要说「ROGER WILCO」。",
        topic: "WILCO",
      },
      {
        id: "exam-26",
        q: "在英国，船舶 VHF 电台牌照由哪个机构发放？",
        options: [
          "RYA",
          "Ofcom",
          "MCA",
          "ITU",
        ],
        correct: 1,
        explanation:
          "Ofcom 发放 Ship Radio Licence（在线、免费）。RYA 发操作员 SRC 证；MCA 是监管；ITU 是国际协调。",
        topic: "牌照",
      },
      {
        id: "exam-27",
        q: "标准 VHF 呼叫语序是？",
        options: [
          "「This is [自己] · calling [对方] · OVER」",
          "「[对方]（重复 3 次） · This is [自己]（重复 3 次） · [事情] · OVER」",
          "「[事情] · [对方] · [自己]」",
          "「Hi · [对方] · OUT」",
        ],
        correct: 1,
        explanation:
          "先呼对方（让对方意识到是叫自己）→ 再「this is」自己 → 再讲事情 → OVER 或 OUT。这个顺序最大化对方注意力捕获概率。",
        topic: "呼叫格式",
      },
      {
        id: "exam-28",
        q: "VHF 视距通信的有效距离主要由什么决定？",
        options: [
          "发射功率",
          "两端天线高度",
          "船体材质",
          "海水盐度",
        ],
        correct: 1,
        explanation:
          "VHF 走直线、不被电离层反射。距离由天线高度决定：D ≈ 1.23×(√h1+√h2)，h 为英尺。功率主要影响信号强度而非地理距离上限。",
        topic: "VHF 物理",
      },
      {
        id: "exam-29",
        q: "EPIRB 与 DSC 的关系最准确的描述是？",
        options: [
          "EPIRB 已被 DSC 替代",
          "EPIRB 与 DSC 互补——DSC 走 VHF/MF/HF 速度快但范围受限；EPIRB 走卫星全球覆盖但响应慢。两件事都要做",
          "两者完全相同",
          "EPIRB 只用于商船",
        ],
        correct: 1,
        explanation:
          "DSC 在 A1/A2 区秒级响应但范围受限；EPIRB 卫星报警全球覆盖但典型响应 1–2 小时。两者互补，遇险时都要触发。",
        topic: "DSC vs EPIRB",
      },
      {
        id: "exam-30",
        q: "「PAN-PAN MEDICO」用于什么情境？",
        options: [
          "船起火",
          "船员需要远程医疗咨询或建议（如不确定是否心梗）",
          "船失去动力",
          "船间约会",
        ],
        correct: 1,
        explanation:
          "PAN-PAN MEDICO 是 PAN-PAN 的医疗紧急子类，岸台会接通岸基医生做远程问诊。是远岸船上非常实用但被低估的通道。",
        topic: "PAN-PAN MEDICO",
      },
    ],
  },
  resources: [
    {
      title: "RYA SRC Course Finder",
      description:
        "RYA 官方 VHF/SRC 课程查询——找到你附近的认证学校，预约一日 SRC 课程 + 笔试 + 实操考核。",
      url: "https://www.rya.org.uk/courses-training/courses/vhf-radio",
      type: "site",
      free: true,
      guide:
        "完成 WindHero WH-107 之后是去 RYA 认证学校的最佳时机——你已经掌握了所有理论，再花一天面授 + 考试就能拿证。建议在完成本课 4 周内报名，避免理论遗忘。",
    },
    {
      title: "Ofcom Ship Radio Licence",
      description:
        "英国船台牌照（Ship Radio Licence）在线申请。免费、覆盖船上所有无线电设备、终身有效。",
      url: "https://www.ofcom.org.uk/licences",
      type: "site",
      free: true,
      guide:
        "在 Ofcom 网站搜索「Ship Radio Licence」，注册账户、填写船名、船型与装机情况，提交后几小时内拿到 232 开头的 9 位 MMSI 和 Call Sign。注意：这是「船的牌照」，独立于个人 SRC 操作员证。",
    },
    {
      title: "ITU MARS — Maritime Mobile Access and Retrieval System",
      description:
        "ITU 公开数据库，可用任意 9 位 MMSI 反查船舶注册资料——船名、注册国、装备、应急联络人。",
      url: "https://www.itu.int/mmsapp",
      type: "site",
      free: true,
      guide:
        "出航前自检 MMSI 是否在数据库中、信息是否最新。也可用于在 AIS 上看到某艘船的 MMSI 时反查其身份。注意：部分国家的小型私人船可能未同步到 MARS。",
    },
    {
      title: "USCG NAVCEN — GMDSS Information",
      description:
        "美国海岸警卫队航行中心维护的 GMDSS 综合信息门户——区域划分、设备规格、运行规则。",
      url: "https://www.navcen.uscg.gov/gmdss",
      type: "site",
      free: true,
    },
    {
      title: "IMO Standard Marine Communication Phrases（SMCP）",
      description:
        "IMO 发布的国际海事标准通信短语集——所有规范报告、避碰协调、引航通信、应急通信用语的官方标准。",
      url: "https://www.imo.org",
      type: "site",
      free: true,
      guide:
        "在 IMO 网站搜索「SMCP」下载 PDF。重点看 Part A（外部通信）和 Part B（船上通信）。这本册子是 RYA SRC 笔试与实操考核背后的真正参考标准。",
    },
    {
      title: "RYA VHF Handbook（Tim Bartlett 著）",
      description:
        "RYA 官方 VHF/SRC 课程教材。覆盖所有 SRC 笔试知识点、典型场景案例、设备操作图解。",
      url: "https://www.rya.org.uk/shop",
      type: "book",
      free: false,
    },
    {
      title: "The Pocket Book of Ship Stations（ITU 官方出版）",
      description:
        "ITU 官方船台名录袖珍版——记录全球船台、岸台、MMSI 与 Call Sign 分配规则的权威参考。",
      url: "https://www.itu.int/pub/R-LIST",
      type: "book",
      free: false,
    },
  ],
};
