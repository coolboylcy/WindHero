import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Anchor,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { detailedCourses, listLessonsFlat } from "@/lib/courses";
import type { Course, RyaTier } from "@/lib/courses/types";

export const metadata: Metadata = {
  title: "对照 RYA",
  description:
    "RYA 是国际航海教育的金标准。这一页讲清楚 RYA 体系是什么、WindHero 覆盖到哪里、以及你应该按什么顺序学。",
};

/* ====================================================================
   RYA 体系的全景定义
   每个证书都在这里登记，包括 WindHero 是否覆盖、为什么、是否实操等
   ==================================================================== */

type CertStatus =
  | "covered" // WindHero 完整覆盖（包含考试模拟）
  | "theory-only" // WindHero 仅覆盖理论部分，实操必须线下
  | "practical-only" // 纯实操课，WindHero 不教
  | "not-covered"; // WindHero 暂未覆盖

type Certificate = {
  name: string;
  tier?: RyaTier; // 仅当与 Course.ryaEquivalent 对应时填
  category: "theory" | "practical" | "specialist";
  hours: string;
  status: CertStatus;
  windHeroNote: string;
};

const allCertificates: Certificate[] = [
  // —— 主线笔试 ——
  {
    name: "Essential Navigation & Seamanship",
    category: "theory",
    hours: "16 小时",
    status: "covered",
    windHeroNote: "WH-101《读懂风》+ WH-103《海图作业》中前两个模块覆盖。",
  },
  {
    name: "Day Skipper Theory",
    tier: "Day Skipper Theory",
    category: "theory",
    hours: "40 小时",
    status: "covered",
    windHeroNote: "WH-101 / WH-103 / WH-105 / WH-107 / WH-109 / WH-111 七门覆盖。",
  },
  {
    name: "Coastal / Yachtmaster Theory",
    tier: "Coastal Skipper / Yachtmaster Theory",
    category: "theory",
    hours: "40 小时",
    status: "covered",
    windHeroNote: "WH-204 / WH-212 / WH-228 / WH-113 四门覆盖。",
  },
  {
    name: "Yachtmaster Ocean Theory",
    tier: "Yachtmaster Ocean Theory",
    category: "theory",
    hours: "40 小时",
    status: "covered",
    windHeroNote: "WH-228 + WH-301 覆盖。",
  },

  // —— 专题课 ——
  {
    name: "VHF / SRC",
    tier: "VHF/SRC",
    category: "specialist",
    hours: "8 小时 + 实操",
    status: "theory-only",
    windHeroNote: "WH-107 覆盖理论；实操考核必须 RYA 认证学校。",
  },
  {
    name: "Diesel Engine",
    category: "specialist",
    hours: "8 小时",
    status: "covered",
    windHeroNote: "WH-109 完整覆盖（含故障诊断 + 维护计划）。",
  },
  {
    name: "First Aid",
    category: "specialist",
    hours: "8–16 小时",
    status: "theory-only",
    windHeroNote: "WH-111 覆盖理论 + 决策；CPR/绷带手法必须实地。",
  },
  {
    name: "Radar",
    category: "specialist",
    hours: "8 小时",
    status: "covered",
    windHeroNote: "WH-113 覆盖（含电子海图、GPS、AIS）。",
  },
  {
    name: "Sea Survival",
    tier: "Sea Survival",
    category: "specialist",
    hours: "8 小时（含湿训）",
    status: "theory-only",
    windHeroNote: "WH-211 覆盖理论；湿训部分必须实地。",
  },

  // —— 纯实操（WindHero 不能替代） ——
  {
    name: "Start Yachting",
    tier: "Start Yachting",
    category: "practical",
    hours: "2 天实操",
    status: "practical-only",
    windHeroNote: "纯实操入门体验课，无笔试。",
  },
  {
    name: "Competent Crew",
    tier: "Competent Crew",
    category: "practical",
    hours: "5 天实操",
    status: "practical-only",
    windHeroNote: "船员基本功的实操课，无笔试。",
  },
  {
    name: "Day Skipper Practical",
    category: "practical",
    hours: "5 天 + 100 NM",
    status: "practical-only",
    windHeroNote:
      "RYA 认证学校 5 天实操 + 海上里程要求。WindHero 是理论前置准备。",
  },
  {
    name: "Coastal Skipper Practical",
    category: "practical",
    hours: "5 天 + 200 NM",
    status: "practical-only",
    windHeroNote: "RYA 认证学校实操 + 跨夜航程。",
  },
  {
    name: "Yachtmaster Coastal / Offshore",
    category: "practical",
    hours: "口试 + 海试",
    status: "practical-only",
    windHeroNote:
      "考前须有 50 days / 2500 NM 实操经验；WindHero 是理论与判断力的训练。",
  },
  {
    name: "Yachtmaster Ocean Practical",
    category: "practical",
    hours: "口试 + 600 NM 远洋",
    status: "practical-only",
    windHeroNote: "必须完成一段 600 NM 自主远洋航段；WH-401 直接前置。",
  },
];

/* ====================================================================
   状态徽章
   ==================================================================== */

function StatusBadge({ status }: { status: CertStatus }) {
  const map = {
    covered: {
      label: "WindHero 完整覆盖",
      icon: CheckCircle2,
      cls: "border-sea-deep/40 bg-sea-soft/40 text-sea-deep",
    },
    "theory-only": {
      label: "仅覆盖理论 · 实操线下",
      icon: Circle,
      cls: "border-sea/40 bg-sea-soft/20 text-sea-deep",
    },
    "practical-only": {
      label: "纯实操 · 线下完成",
      icon: Anchor,
      cls: "border-coral/40 bg-coral/5 text-coral",
    },
    "not-covered": {
      label: "暂未覆盖",
      icon: Circle,
      cls: "border-mist/60 bg-paper-soft/40 text-mist",
    },
  } as const;
  const { label, icon: Icon, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] ${cls}`}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

/* ====================================================================
   每个 tier 对应的 WindHero 课时（用于详细对照折叠区）
   ==================================================================== */

function lessonsForTier(tier: RyaTier) {
  type Entry = {
    course: Course;
    lessonSlug: string;
    lessonIndex: string;
    lessonTitle: string;
    items: string[];
  };
  const out: Entry[] = [];
  for (const course of detailedCourses) {
    if (course.ryaEquivalent !== tier) continue;
    for (const { lesson } of listLessonsFlat(course)) {
      const items = lesson.ryaSyllabusItems ?? [];
      if (items.length === 0) continue;
      out.push({
        course,
        lessonSlug: lesson.slug,
        lessonIndex: lesson.index,
        lessonTitle: lesson.title,
        items,
      });
    }
  }
  return out;
}

/* ====================================================================
   学习路线节点
   ==================================================================== */

const learningPath: Array<{
  code: string;
  slug?: string;
  title: string;
  why: string;
}> = [
  {
    code: "WH-101",
    slug: "reading-the-wind",
    title: "读懂风",
    why: "建立对风、海与帆的物理直觉——任何航海课的地基。",
  },
  {
    code: "WH-103",
    slug: "chartwork-and-tides",
    title: "海图作业与潮汐计算",
    why: "RYA Day Skipper 笔试 30–40% 的分都在这里。先吃透。",
  },
  {
    code: "WH-105",
    slug: "lights-shapes-sounds",
    title: "灯型号型与声号",
    why: "IRPCS 细节记忆——不熟它，夜班永远是猜的。",
  },
  {
    code: "WH-107",
    slug: "vhf-and-comms",
    title: "VHF / SRC",
    why: "去 RYA 认证学校考 SRC 之前先自学。",
  },
  {
    code: "WH-109",
    slug: "diesel-engine",
    title: "柴油机",
    why: "远洋船长必修——机器停了没人来救你。",
  },
  {
    code: "WH-111",
    slug: "marine-first-aid",
    title: "海上急救",
    why: "在离医院 50 海里时，你和你的船员就是医生。",
  },
  {
    code: "WH-113",
    slug: "radar-and-electronics",
    title: "雷达与电子导航",
    why: "Coastal Skipper Theory 的核心，浓雾里的眼睛。",
  },
  {
    code: "WH-204",
    slug: "weather-and-routing",
    title: "天气与航路",
    why: "从入门跨入进阶——读懂 GRIB、规划真实航段。",
  },
  {
    code: "WH-212",
    slug: "seamanship-and-safety",
    title: "海员素养与安全",
    why: "Heavy weather、MOB、COLREGS——保命级技能。",
  },
  {
    code: "WH-228",
    slug: "celestial-and-pilotage",
    title: "近岸引航与天文导航",
    why: "纸海图、六分仪、transit——电子失效的最后一道防线。",
  },
  {
    code: "WH-211",
    slug: "sea-survival-theory",
    title: "海上求生理论",
    why: "在去 RYA Sea Survival 湿训之前学透生理学与决策框架。",
  },
  {
    code: "WH-301",
    slug: "captains-mind",
    title: "船长的思维",
    why: "把前面所有 WindHero 课程串起来。情境考验。",
  },
  {
    code: "WH-401",
    slug: "offshore-passage",
    title: "远洋航段实战课",
    why: "船上 10 天，可用于 Yachtmaster 实操考试报名的里程。",
  },
];

export default function RyaPage() {
  /* —— 计算覆盖率 —— */
  const theoryAndSpec = allCertificates.filter(
    (c) => c.category !== "practical"
  );
  const coveredCount = theoryAndSpec.filter(
    (c) => c.status === "covered" || c.status === "theory-only"
  ).length;
  const coverPct = Math.round((coveredCount / theoryAndSpec.length) * 100);

  const tieredEntries = (["Day Skipper Theory", "Coastal Skipper / Yachtmaster Theory", "Yachtmaster Ocean Theory", "VHF/SRC", "Sea Survival"] as RyaTier[])
    .map((t) => ({ tier: t, lessons: lessonsForTier(t) }))
    .filter((x) => x.lessons.length > 0);

  return (
    <>
      {/* =========================== 1. Hero =========================== */}
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="RYA · 国际航海教育的金标准"
          title={
            <>
              先看清地图，
              <br />
              再决定要去哪里。
            </>
          }
          lead="你不一定要考 RYA 证书，但全世界都用它来定义「能驾船」和「不能」。这一页讲清楚 RYA 体系是什么、WindHero 走到了哪里、以及你应该按什么顺序往前学。"
        />
      </Section>

      {/* =========================== 2. RYA 是什么 =========================== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">RYA 是什么</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2.2rem]">
              一个 1875 年成立、被 70+ 国家承认的航海认证体系。
            </h2>
            <div className="mt-7 space-y-5 text-[1rem] leading-[1.9] text-ink-soft prose-zh">
              <p>
                RYA（Royal Yachting Association，英国皇家游艇协会）的 Cruising
                Scheme 是一套从「第一次上船」到「跨太平洋船长」的渐进式认证。它的特点不是难度，而是<strong className="text-ink">分级清晰、可重复、跨国通用</strong>。
              </p>
              <p>
                在欧洲，租一艘 40 尺巡航艇通常要求 Day Skipper 以上；远洋公司招船长几乎都看 Yachtmaster。即使在亚洲，越来越多的租船公司、保险公司也以 RYA 等级作为基本门槛。
              </p>
              <p>
                与海事局、海军体系不同的是——RYA 是民用导向的，强调判断与谨慎而非命令，因此在游艇圈是事实上的全球标准。
              </p>
            </div>
          </div>
          <aside className="border-l border-line/70 pl-8">
            <p className="eyebrow">三个事实</p>
            <dl className="mt-6 space-y-7">
              <Fact label="成立" value="1875" sub="英国南安普顿" />
              <Fact label="覆盖国家" value="70+" sub="包括认证教练学校" />
              <Fact
                label="每年学员"
                value="250,000+"
                sub="跨 cruising / racing / dinghy"
              />
            </dl>
          </aside>
        </div>
      </Section>

      {/* =========================== 3. 覆盖率仪表 =========================== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="eyebrow">WindHero 的位置</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2rem]">
              所有可在线学的 RYA 课程，
              <br />
              我们都教。
            </h2>
            <p className="mt-5 max-w-md text-[0.96rem] leading-[1.9] text-ink-soft">
              凡是 RYA 体系里以「笔试 + 理论」为主的部分，WindHero 都开了对应课程并配模拟考。线下实操（手把手的操船、湿训、口试、海试）——必须到 RYA 认证学校完成。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-line/70 md:grid-cols-4">
            <Stat label="WindHero 课程" value={`${detailedCourses.length}`} />
            <Stat
              label="对照大纲条目"
              value={`${detailedCourses.reduce(
                (s, c) =>
                  s +
                  listLessonsFlat(c).reduce(
                    (sl, x) => sl + (x.lesson.ryaSyllabusItems?.length ?? 0),
                    0
                  ),
                0
              )}+`}
            />
            <Stat
              label="RYA 笔试/理论课覆盖"
              value={`${coveredCount} / ${theoryAndSpec.length}`}
            />
            <Stat label="覆盖率" value={`${coverPct}%`} />
          </div>
        </div>
      </Section>

      {/* =========================== 4. RYA 完整体系全景 =========================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">RYA 体系全景</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          15 张证书。状态一目了然。
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          下方按「理论笔试 / 专题课 / 纯实操」分三类。颜色编码：海军蓝 = WindHero 完整覆盖；浅蓝 = 仅覆盖理论；珊瑚红 = 纯实操 / 线下必须。
        </p>

        {(["theory", "specialist", "practical"] as const).map((cat) => {
          const items = allCertificates.filter((c) => c.category === cat);
          const heading =
            cat === "theory"
              ? "主线笔试 · Theory & Written Exams"
              : cat === "specialist"
              ? "专题课 · Specialist Modules"
              : "纯实操课 · Practical Only";
          return (
            <div key={cat} className="mt-14">
              <p className="font-mono text-[0.74rem] uppercase tracking-[0.16em] text-sea-deep">
                {heading}
              </p>
              <div className="mt-5 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <article
                    key={c.name}
                    className="flex flex-col gap-3 bg-paper p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="display text-[1.15rem] leading-tight text-ink">
                        {c.name}
                      </h3>
                      <span className="shrink-0 font-mono text-[0.7rem] text-mist">
                        {c.hours}
                      </span>
                    </div>
                    <StatusBadge status={c.status} />
                    <p className="text-[0.86rem] leading-[1.7] text-ink-soft">
                      {c.windHeroNote}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* =========================== 5. 学习路线图 =========================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">学习路线图</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          从零开始，按这个顺序往前走。
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          每一步都是「学完它，下一步才打得开」。如果你已经会一些，可以跳过靠前的；但不要倒过来——先学船长思维，再回去学海图，会很难走得稳。
        </p>

        <ol className="relative mt-12 space-y-5 border-l border-line/70 pl-8">
          {learningPath.map((step, i) => (
            <li key={step.code} className="relative">
              <span
                className="absolute -left-[2.15rem] grid h-6 w-6 place-items-center rounded-full bg-paper font-mono text-[0.66rem] text-sea-deep ring-1 ring-sea-deep/40"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                href={step.slug ? `/courses/${step.slug}` : "/courses"}
                className="group block bg-paper p-5 transition-colors hover:bg-paper-soft/60"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="display text-lg text-ink">
                    {step.code} · {step.title}
                  </h3>
                  <ArrowRight className="h-3.5 w-3.5 text-sea-deep transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-[0.9rem] leading-[1.8] text-ink-soft">
                  {step.why}
                </p>
              </Link>
            </li>
          ))}
          {/* 实操尾端 */}
          <li className="relative">
            <span
              className="absolute -left-[2.15rem] grid h-6 w-6 place-items-center rounded-full bg-coral/10 font-mono text-[0.66rem] text-coral ring-1 ring-coral/40"
              aria-hidden
            >
              ★
            </span>
            <div className="block border border-coral/30 bg-coral/5 p-5">
              <h3 className="display text-lg text-ink">
                现在请去 RYA 认证学校
              </h3>
              <p className="mt-2 text-[0.9rem] leading-[1.8] text-ink-soft">
                Day Skipper Practical、Sea Survival 湿训、SRC 实操考核、First Aid 手法——这些不能在屏幕前完成。WindHero 让你登船时已经站得稳；剩下的舵让海给你。
              </p>
            </div>
          </li>
        </ol>
      </Section>

      {/* =========================== 6. 各 tier 详细对照（折叠） =========================== */}
      <Section>
        <p className="eyebrow">详细对照（可展开）</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          要看每一节课对应哪一项 RYA 大纲——点开它。
        </h2>
        <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          每个 RYA 等级下列出 WindHero 对应课时与具体 syllabus 条目，你可以直接跳到对应课时。
        </p>

        <div className="mt-12 divide-y divide-line/60 border-y border-line/60">
          {tieredEntries.map(({ tier, lessons }) => (
            <details key={tier} className="group">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-6 transition-colors hover:bg-paper-soft/30">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                    RYA
                  </span>
                  <h3 className="display text-xl text-ink md:text-2xl">
                    {tier}
                  </h3>
                </div>
                <span className="font-mono text-[0.72rem] tracking-[0.14em] text-mist transition-transform group-open:rotate-90">
                  ▸
                </span>
              </summary>
              <div className="pb-10 pl-7">
                <ul className="space-y-7 border-l border-line/70 pl-5">
                  {lessons.map((e, i) => (
                    <li key={i}>
                      <Link
                        href={`/courses/${e.course.slug}/${e.lessonSlug}`}
                        className="group inline-flex items-baseline gap-3"
                      >
                        <span className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                          {e.course.code} · {e.lessonIndex}
                        </span>
                        <span className="display text-lg text-ink transition-colors group-hover:text-sea-deep">
                          {e.lessonTitle}
                        </span>
                        <ArrowRight className="h-3 w-3 text-sea-deep transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      <ul className="mt-2 space-y-1.5 text-[0.86rem] leading-[1.7] text-ink-soft">
                        {e.items.map((item, j) => (
                          <li
                            key={j}
                            className="grid grid-cols-[1.2rem_1fr] items-baseline gap-2"
                          >
                            <BookOpen className="mt-[0.2em] h-3 w-3 text-mist" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

function Fact({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist">
        {label}
      </dt>
      <dd className="mt-2 display text-3xl text-ink">{value}</dd>
      <dd className="mt-1 text-[0.84rem] text-ink-soft">{sub}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-5">
      <dt className="text-[0.66rem] uppercase tracking-[0.14em] text-mist">
        {label}
      </dt>
      <dd className="mt-2 display text-2xl text-ink">{value}</dd>
    </div>
  );
}
