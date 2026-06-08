import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { cases, categoryInfo } from "@/lib/cases/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "真实案例库 · 从海难学习",
  description:
    "WindHero 真实案例库：Fastnet 1979、Sydney-Hobart 1998、El Faro 2015、Tony Bullimore 求生、Knox-Johnston 环球、Costa Concordia——基于 MAIB / ATSB / NTSB 调查报告与当事人著作的 6 个航海事件。每个案例配时间线 + 经验 + 课程映射。",
  keywords: [
    "Fastnet 1979",
    "Sydney Hobart 1998",
    "El Faro 2015",
    "Tony Bullimore",
    "Robin Knox-Johnston",
    "Costa Concordia",
    "航海事故案例",
    "海难案例研究",
    "Yachtmaster 案例",
    "RYA 案例",
    "船长决策案例",
    "WindHero 案例库",
  ],
  path: "/cases",
});

const categoryColor: Record<string, string> = {
  "weather-catastrophe": "border-coral/40 bg-coral/5",
  "abandon-ship": "border-coral/40 bg-coral/5",
  "navigation-error": "border-mist/60 bg-paper-soft/40",
  "preparation-pays": "border-sun/40 bg-sun-soft/30",
  leadership: "border-sea-deep/40 bg-sea-soft/40",
};

export default function CasesIndexPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          eyebrow="真实案例库"
          title={
            <>
              别人犯过的错，
              <br />
              你不必再犯一次。
            </>
          }
          lead="6 个有据可查的著名航海事件——基于 MAIB、ATSB、NTSB 等官方调查报告与当事人著作整理。每个案例都给到时间线、调查结论、以及「我们能学到什么」——并映射到对应的 WindHero 课程。"
        />
        <p className="mt-6 max-w-2xl text-[0.86rem] leading-[1.7] text-mist">
          说明：本库不渲染戏剧化情节、不揣测当事人心理。所有事实陈述基于公开调查报告与传记。每个案例底部列出参考资料。
        </p>
      </Section>

      <Section>
        <div className="grid gap-px bg-line/70 md:grid-cols-2">
          {cases.map((c) => {
            const cat = categoryInfo[c.category];
            return (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60 md:p-9"
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink ${categoryColor[c.category] ?? "border-line"}`}
                  >
                    {cat.label}
                  </span>
                  <span className="font-mono text-[0.7rem] text-mist">
                    {c.date}
                  </span>
                </div>

                <h2 className="display mt-5 text-balance text-2xl text-ink md:text-[1.75rem]">
                  {c.title}
                </h2>
                <p className="mt-2 font-mono text-[0.78rem] tracking-[0.04em] text-sea-deep">
                  {c.titleEn}
                </p>

                <p className="mt-5 flex-1 text-[0.94rem] leading-[1.85] text-ink-soft">
                  {c.hook}
                </p>

                <dl className="mt-6 space-y-1.5 border-t border-line/70 pt-5 font-mono text-[0.74rem]">
                  <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                    <dt className="text-mist">地点</dt>
                    <dd className="text-ink-soft">{c.location}</dd>
                  </div>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-3">
                    <dt className="text-mist">规模</dt>
                    <dd className="text-ink-soft">{c.scale}</dd>
                  </div>
                </dl>

                <span className="mt-6 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
                  阅读案例
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-line/60 bg-paper-soft/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Anchor className="h-6 w-6 text-sun" />
            <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
              案例 + 课程 = 真正学到。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              抽象的判断很难学会——但「Schettino 偏航致 32 人罹难」和「Bullimore 在翻船下活了 5 天」是具体的、有名字的、被调查过的事件。
              WindHero 把每个课程的关键判断点都与真实案例对应——课堂的理论与海上的现实之间，至少有一座桥。
            </p>
          </div>
          <Link
            href="/courses"
            className="group flex flex-col justify-center rounded-sm border border-line/70 bg-paper p-8 transition-colors hover:bg-paper-soft/60 md:p-10"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
              系统学习
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              13 门课，按阶段。
            </h3>
            <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">
              入门 → 船员 → 日间船长 → 夜间近岸 → 远海远航 → 跨洋。每门课对应 RYA / ASA / IYT 笔试，每节课的判断点链回案例库。
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
              进入课程
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
