import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { CaseLearningLoopVisual } from "@/components/content-visuals";
import { cases, categoryInfo } from "@/lib/cases/data";
import { createPageMetadata } from "@/lib/seo/metadata";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "真实案例库 · 从海难学习",
  description:
    "WindHero 真实案例库：基于公开调查报告和当事人著作整理 Fastnet、Sydney-Hobart、El Faro 等航海事件，附时间线和课程映射。",
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
  const pageSchema = webPageLd({
    type: "CollectionPage",
    name: "WindHero 真实案例库",
    description: "基于公开调查报告和当事人著作整理的航海事故与船长决策案例。",
    url: "/cases",
  });
  const caseListSchema = itemListLd({
    name: "WindHero 航海案例列表",
    url: "/cases",
    items: cases.map((item) => ({
      name: item.title,
      description: item.hook,
      url: `/cases/${item.slug}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(caseListSchema) }}
      />
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:gap-16">
          <div>
            <SectionHeading
              level={1}
              eyebrow="真实案例库"
              title={
                <>
                  事故报告不好读，
                  <br />
                  但很值得读。
                </>
              }
              lead="这里先收 6 个有公开资料可查的航海事件。每篇都尽量按时间线写清楚：发生了什么，哪里开始转坏，回到课程里该补哪一课。"
            />
            <p className="mt-6 max-w-2xl text-[0.86rem] leading-[1.7] text-mist">
              说明：这里不补戏剧化细节，也不揣测当事人心理。事实部分尽量回到调查报告、公开资料和当事人著作。
            </p>
          </div>
          <CaseLearningLoopVisual />
        </div>
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
              看完案例，回去补那一课。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              单独讲「风险管理」很空。把它放进 Fastnet、El Faro 或 Costa Concordia 这样的事件里，
              你会更容易看出一个小决定怎么把后面一串事推倒。
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
              13 门课，慢慢补。
            </h3>
            <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">
              从风、帆、海图、潮汐开始，再到天气、通信和远航。读案例时缺哪块，就回去补哪块。
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
