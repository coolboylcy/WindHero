import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { detailedCourses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "课程",
  description:
    "10 门课，对标 RYA 笔试体系——从读风入门到指挥一段远洋。",
};

const levels = ["入门", "进阶", "船长之路"] as const;

export default function CoursesPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="课程"
          title={
            <>
              一所为从零开始的船长
              <br />
              而建的学校。
            </>
          }
          lead="十门课，三个等级，对标 RYA Day Skipper → Yachtmaster Ocean 的完整笔试体系。每一门都由站长良辰原创撰写，配真实考场体验——随机抽题、倒计时、错题汇总。"
        />
        <p className="mt-8 inline-flex items-center gap-2 text-[0.86rem] text-sea-deep">
          想看每节课对应哪一项 RYA 大纲——
          <Link href="/rya" className="underline-offset-4 hover:underline">
            进入 RYA 对照页
          </Link>
          <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </Section>

      {levels.map((level) => {
        const items = detailedCourses.filter((c) => c.level === level);
        return (
          <Section key={level} className="border-b border-line/60">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">{level}</p>
                <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
                  {levelCopy[level].title}
                </h2>
                <p className="mt-3 max-w-xl text-[0.98rem] leading-[1.9] text-ink-soft">
                  {levelCopy[level].lead}
                </p>
              </div>
              <p className="font-mono text-[0.78rem] tracking-[0.16em] text-mist">
                共 {items.length} 门
              </p>
            </div>

            <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-2">
              {items.map((c) => {
                const lessonCount = c.modules.reduce(
                  (s, m) => s + m.lessons.length,
                  0
                );
                return (
                  <article
                    key={c.slug}
                    id={c.slug}
                    className="scroll-mt-28 bg-paper p-8 transition-colors hover:bg-paper-soft/60 md:p-10"
                  >
                    <div className="flex items-baseline justify-between text-[0.72rem] text-mist">
                      <span className="font-mono tracking-[0.14em] text-sea">
                        {c.code}
                      </span>
                      <span>{c.duration}</span>
                    </div>
                    <h3 className="display mt-4 text-3xl text-ink md:text-4xl">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-[1.9] text-ink-soft">
                      {c.summary}
                    </p>

                    <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line/70 py-4 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
                      <div>
                        <dt className="text-mist">模块</dt>
                        <dd className="mt-1 text-ink">{c.modules.length}</dd>
                      </div>
                      <div>
                        <dt className="text-mist">课时</dt>
                        <dd className="mt-1 text-ink">{lessonCount}</dd>
                      </div>
                      <div>
                        <dt className="text-mist">期末</dt>
                        <dd className="mt-1 text-ink">
                          {c.exam
                            ? c.exam.drawCount
                              ? `抽 ${c.exam.drawCount}`
                              : `${c.exam.questions.length} 题`
                            : "无笔试"}
                        </dd>
                      </div>
                    </dl>

                    <ul className="mt-6 space-y-3 text-[0.95rem] leading-[1.85] text-ink">
                      {c.modules.map((m) => (
                        <li
                          key={m.slug}
                          className="grid grid-cols-[2.6rem_1fr] items-baseline gap-3"
                        >
                          <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea">
                            {String(m.index).padStart(2, "0")}
                          </span>
                          <span>{m.title}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                        RYA · {c.ryaEquivalent}
                      </span>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="group inline-flex items-center gap-2 text-[0.86rem] text-sea-deep transition-colors hover:text-ink"
                      >
                        进入课程
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>
        );
      })}
    </>
  );
}

const levelCopy: Record<
  (typeof levels)[number],
  { title: string; lead: string }
> = {
  入门: {
    title: "入门。",
    lead: "海的词汇表 + RYA Day Skipper Theory 笔试全部知识点：风的物理、海图作业、潮汐计算、IRPCS 灯型号型、VHF/SRC。",
  },
  进阶: {
    title: "进阶海员素养。",
    lead: "天气、航路、海上求生、海员素养、引航与天文导航——对应 RYA Coastal/Yachtmaster Theory 与 Sea Survival。",
  },
  船长之路: {
    title: "船长之路。",
    lead: "船长的思维 + 远洋航段——对标 RYA Yachtmaster Ocean Theory，并直接前置准备 Yachtmaster 实操。",
  },
};
