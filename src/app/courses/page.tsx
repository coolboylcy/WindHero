import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "课程",
  description:
    "从读风入门到指挥一段远洋——WindHero 的完整课程体系。",
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
              一所为想要真功夫的水手
              <br />
              而建的学校。
            </>
          }
          lead="六门课，三个等级。自学的理论课、集体班的实操、以及船上的真实里程。船长之路以一段你自己规划、亲口答辩并出海完成的远洋航段收尾。"
        />
      </Section>

      {levels.map((level) => {
        const items = courses.filter((c) => c.level === level);
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
              {items.map((c) => (
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
                  <ul className="mt-7 space-y-3 border-t border-line/70 pt-6 text-[0.95rem] leading-[1.85] text-ink">
                    {c.modules.map((m, i) => (
                      <li
                        key={m}
                        className="grid grid-cols-[2.6rem_1fr] items-baseline gap-3"
                      >
                        <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[0.78rem] text-mist">
                      下一期 4 月 14 日开班
                    </span>
                    <Link
                      href="/about#contact"
                      className="group inline-flex items-center gap-2 text-[0.86rem] text-sea-deep transition-colors hover:text-ink"
                    >
                      申请入学
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
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
    lead: "海的词汇表——风、帆面、点风方位，以及那些让你在甲板上不至于受伤的好习惯。",
  },
  进阶: {
    title: "进阶海员素养。",
    lead: "天气、航路、引航与安全。把一名水手变成你愿意托付夜班的人。",
  },
  船长之路: {
    title: "船长之路。",
    lead: "船长的思维：领导力、判断力，以及一段真正的远洋航段作为收尾。",
  },
};
