import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { detailedCourses, listLessonsFlat } from "@/lib/courses";
import type { RyaTier } from "@/lib/courses/types";

export const metadata: Metadata = {
  title: "对照 RYA 大纲",
  description:
    "WindHero 每一节课，都明确标注它在 RYA 笔试大纲里的位置。这一页是你的备考导览。",
};

/* —— RYA 等级展示顺序 —— */
const tierOrder: RyaTier[] = [
  "Day Skipper Theory",
  "Coastal Skipper / Yachtmaster Theory",
  "Yachtmaster Ocean Theory",
  "VHF/SRC",
  "Sea Survival",
  "Competent Crew",
  "Start Yachting",
];

const tierMeta: Record<
  RyaTier,
  { color: string; intro: string; offPlatformNote: string }
> = {
  "Start Yachting": {
    color: "border-mist",
    intro: "RYA 体系最入门的 2 天实操课。",
    offPlatformNote: "实操课程，无笔试。WindHero 暂未覆盖。",
  },
  "Competent Crew": {
    color: "border-mist",
    intro: "5 天船上实操，让你成为「值得托付的船员」。",
    offPlatformNote: "实操课程，无笔试。WindHero 暂未覆盖。",
  },
  "Day Skipper Theory": {
    color: "border-sea-deep",
    intro:
      "RYA 体系第一张笔试。涵盖海图作业、潮汐、气象、IRPCS、引航与航程规划——理论上 40 学时，实际备考至少 80 小时。",
    offPlatformNote:
      "笔试由 RYA 认证学校组织；WindHero 完成所有知识点，但发证需要在认证学校做练习海图作业并通过线下笔试。",
  },
  "Coastal Skipper / Yachtmaster Theory": {
    color: "border-sea-deep",
    intro:
      "Day Skipper Theory 的深化与扩展。更细的潮流向量、更复杂的航程规划、更完整的气象系统、更高的判断要求。",
    offPlatformNote:
      "笔试 ~3 小时，难度比 Day Skipper Theory 高一档。WindHero 课程能完整覆盖理论，但报名考试前必须有 30 days/2 nights 实操经验。",
  },
  "Yachtmaster Ocean Theory": {
    color: "border-sea-deep",
    intro:
      "远洋专属：天文导航、世界海洋气象、远洋通信、长航段规划。RYA 笔试中最哲学也最技术化的一份。",
    offPlatformNote:
      "拿证还必须完成 600 NM 远洋实跑 + 口试 + 至少一次六分仪天文求位。WindHero 的 WH-228 + WH-401 是直接的前置训练。",
  },
  "VHF/SRC": {
    color: "border-sea",
    intro:
      "Short Range Certificate（短程证书）—— 8 学时的独立课程 + 笔试 + 实操考核。法律要求：使用 VHF 海事电台必须持证。",
    offPlatformNote:
      "RYA 认证学校 1 天面授 + 实操考核才能拿证。WindHero 的 WH-107 让你考试当天不至于陌生。",
  },
  "Sea Survival": {
    color: "border-coral",
    intro:
      "1 天的求生与急救课。理论部分约 4 小时，泳池湿训 4 小时（穿救生衣下水、入筏、翻覆等）。",
    offPlatformNote:
      "湿训部分必须实地完成——WindHero WH-211 仅覆盖理论与决策框架。所有计划远洋的船员强烈推荐去 RYA 认证学校做湿训。",
  },
};

export default function RyaPage() {
  // 计算每个 tier 对应的 (course, lesson) 列表
  const byTier = new Map<
    RyaTier,
    Array<{
      courseSlug: string;
      courseCode: string;
      courseTitle: string;
      lessonSlug: string;
      lessonIndex: string;
      lessonTitle: string;
      items: string[];
    }>
  >();

  for (const course of detailedCourses) {
    for (const { lesson } of listLessonsFlat(course)) {
      const items = lesson.ryaSyllabusItems ?? [];
      if (items.length === 0) continue;
      // 这节课的 ryaSyllabusItems 里包含哪些 tier？通常一节课对应一个 tier，
      // 但 syllabus 字符串里会写「Day Skipper Theory · ...」之类。
      const tierForLesson = course.ryaEquivalent;
      const arr = byTier.get(tierForLesson) ?? [];
      arr.push({
        courseSlug: course.slug,
        courseCode: course.code,
        courseTitle: course.title,
        lessonSlug: lesson.slug,
        lessonIndex: lesson.index,
        lessonTitle: lesson.title,
        items,
      });
      byTier.set(tierForLesson, arr);
    }
  }

  const totalCovered = Array.from(byTier.values()).reduce(
    (s, arr) => s + arr.reduce((sl, e) => sl + e.items.length, 0),
    0
  );

  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="RYA · 大纲对照"
          title={
            <>
              这一页告诉你 WindHero 教到了哪儿，
              <br />
              以及 RYA 还会问你什么。
            </>
          }
          lead="WindHero 对标 RYA（英国皇家游艇协会）的笔试体系。每一节课都标注了它对应的 RYA 大纲条目。共 7 张 RYA 证书——5 张需要笔试，2 张是纯实操。这里把每一张的覆盖情况说清楚。"
        />

        <div className="mt-12 grid gap-4 border-y border-line/70 py-6 font-mono text-[0.78rem] md:grid-cols-3">
          <Stat label="WindHero 课程数" value={`${detailedCourses.length}`} />
          <Stat
            label="对照的 RYA 大纲条目"
            value={`${totalCovered}+`}
          />
          <Stat label="覆盖的 RYA 等级" value={`${byTier.size} / 7`} />
        </div>
      </Section>

      {/* ===== 学习路径建议 ===== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">如何使用这一页</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-4xl">
          按你正在备考的 RYA 等级，挑对应的卡片往下读。
        </h2>
        <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-3">
          <Card
            n="01"
            title="先定位你的目标"
            body="决定你要考的是 Day Skipper Theory、Coastal/Yachtmaster Theory、Yachtmaster Ocean、SRC，还是 Sea Survival。"
          />
          <Card
            n="02"
            title="按对照表学 WindHero"
            body="每张证书下面列出了对应的 WindHero 课时——点进去，吃透原理，再到 RYA 认证学校做练习题。"
          />
          <Card
            n="03"
            title="必须线下完成的部分"
            body="海图作业的认证练习、SRC 实操考核、Sea Survival 湿训、Yachtmaster 海试——这些 RYA 必须由认证学校发证。WindHero 的目标是让你登船时已经站得稳。"
          />
        </div>
      </Section>

      {/* ===== 各 tier 对照 ===== */}
      {tierOrder.map((tier) => {
        const entries = byTier.get(tier);
        const meta = tierMeta[tier];
        const covered = !!entries && entries.length > 0;
        return (
          <Section key={tier} className="border-b border-line/60">
            <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:items-start">
              {/* 左：tier 介绍 */}
              <div className={`border-l-2 pl-6 ${meta.color}`}>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist">
                  RYA Certificate
                </p>
                <h3 className="display mt-4 text-3xl text-ink md:text-[2rem]">
                  {tier}
                </h3>
                <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
                  {meta.intro}
                </p>
                <div
                  className={`mt-6 rounded-sm border p-4 text-[0.86rem] leading-[1.75] ${
                    covered
                      ? "border-sea-deep/40 bg-sea-soft/30 text-ink"
                      : "border-line/70 bg-paper-soft/40 text-ink-soft"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {covered ? (
                      <CheckCircle2 className="h-4 w-4 text-sea-deep" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-mist" />
                    )}
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                      {covered ? "WindHero 覆盖中" : "WindHero 未覆盖"}
                    </span>
                  </div>
                  <p className="mt-3">{meta.offPlatformNote}</p>
                </div>
              </div>

              {/* 右：对应课时 + syllabus items */}
              <div>
                {covered ? (
                  <ul className="space-y-7">
                    {entries!.map((e, i) => (
                      <li
                        key={i}
                        className="border-l border-line/70 pl-5"
                      >
                        <Link
                          href={`/courses/${e.courseSlug}/${e.lessonSlug}`}
                          className="group inline-flex items-baseline gap-3"
                        >
                          <span className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                            {e.courseCode} · {e.lessonIndex}
                          </span>
                          <span className="display text-lg text-ink transition-colors group-hover:text-sea-deep">
                            {e.lessonTitle}
                          </span>
                          <ArrowRight className="h-3 w-3 text-sea-deep transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <ul className="mt-3 space-y-1.5 text-[0.86rem] leading-[1.7] text-ink-soft">
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
                ) : (
                  <p className="text-[0.94rem] leading-[1.9] text-mist">
                    WindHero 暂未覆盖这一等级的课程。如果你正在备考此证书，
                    请直接联系 RYA 认证学校。
                  </p>
                )}
              </div>
            </div>
          </Section>
        );
      })}

      {/* ===== 学习路径 ===== */}
      <Section>
        <p className="eyebrow">推荐路径</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-4xl">
          从零开始的话，按这个顺序走。
        </h2>
        <ol className="mt-12 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              code: "WH-101",
              t: "读懂风",
              note: "在跨入任何复杂理论之前，先建立你对风、海与帆的物理直觉。",
            },
            {
              n: "02",
              code: "WH-103",
              t: "海图作业与潮汐计算",
              note: "RYA Day Skipper Theory 笔试 30–40% 的分数都在这里。先吃透。",
            },
            {
              n: "03",
              code: "WH-105",
              t: "灯型、号型与声号",
              note: "IRPCS 的细节记忆部分；不熟它，夜班永远是猜的。",
            },
            {
              n: "04",
              code: "WH-107",
              t: "VHF / SRC",
              note: "去考 SRC 之前先用 WindHero 自学一遍。",
            },
            {
              n: "05",
              code: "WH-204 · WH-212 · WH-228",
              t: "进阶三门",
              note: "天气、海员素养、引航与天文——按你最薄弱的一门先来。",
            },
            {
              n: "06",
              code: "WH-211",
              t: "海上求生理论",
              note: "在去 RYA Sea Survival 湿训之前，先把生理学与决策框架学透。",
            },
            {
              n: "07",
              code: "WH-301",
              t: "船长的思维",
              note: "把前面所有 WindHero 课程串起来。情境考验你能不能做船长。",
            },
            {
              n: "08",
              code: "WH-401",
              t: "远洋航段实战课",
              note: "船上 10 天。能拿到一份可用于 Yachtmaster 实操报名的远洋里程。",
            },
          ].map((s) => (
            <li
              key={s.code}
              className="flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60"
            >
              <div className="flex items-baseline justify-between font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                <span>{s.n}</span>
                <span>{s.code}</span>
              </div>
              <h3 className="display mt-4 text-xl text-ink">{s.t}</h3>
              <p className="mt-3 flex-1 text-[0.92rem] leading-[1.85] text-ink-soft">
                {s.note}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-mist">
        {label}
      </dt>
      <dd className="mt-2 display text-2xl text-ink">{value}</dd>
    </div>
  );
}

function Card({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-paper p-7 md:p-8">
      <p className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
        {n}
      </p>
      <h3 className="display mt-3 text-xl text-ink">{title}</h3>
      <p className="mt-3 text-[0.92rem] leading-[1.85] text-ink-soft">{body}</p>
    </div>
  );
}
