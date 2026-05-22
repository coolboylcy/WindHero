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
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="课程体系"
          title={
            <>
              一所为想要<span className="text-gold">真功夫</span>的水手而建的学校。
            </>
          }
          lead="六门课，三个等级。自学的理论课、集体班的实操、以及船上的真实里程。船长之路以一段你自己规划、亲口答辩并出海完成的远洋航段收尾。"
        />
      </Section>

      {levels.map((level) => {
        const items = courses.filter((c) => c.level === level);
        return (
          <Section key={level} className="border-b border-white/5">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">— {level}</p>
                <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
                  {levelCopy[level].title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-[1.85] text-mist/70">
                  {levelCopy[level].lead}
                </p>
              </div>
              <p className="font-mono text-[0.78rem] tracking-[0.28em] text-mist/50">
                共 {items.length} 门
              </p>
            </div>

            <div className="mt-10 grid gap-px bg-white/5 md:grid-cols-2">
              {items.map((c) => (
                <article
                  key={c.slug}
                  id={c.slug}
                  className="scroll-mt-28 bg-ink p-8 transition-colors hover:bg-deep/40 md:p-10"
                >
                  <div className="flex items-baseline justify-between text-[0.72rem] tracking-[0.26em] text-mist/55">
                    <span className="font-mono text-gold/80">{c.code}</span>
                    <span>{c.duration}</span>
                  </div>
                  <h3 className="display mt-5 text-3xl text-sail md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-mist/70">
                    {c.summary}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm leading-[1.85] text-mist/80">
                    {c.modules.map((m, i) => (
                      <li
                        key={m}
                        className="grid grid-cols-[2.6rem_1fr] items-baseline gap-3"
                      >
                        <span className="font-mono text-[0.72rem] tracking-[0.22em] text-gold/70">
                          M·{String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[0.72rem] tracking-[0.26em] text-mist/55">
                      下一期 4 月 14 日开班
                    </span>
                    <Link
                      href="/about#contact"
                      className="group inline-flex items-center gap-2 text-[0.78rem] tracking-[0.32em] text-gold transition-colors hover:text-gold-soft"
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
