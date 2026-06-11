import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { GlossaryAtlasVisual } from "@/components/content-visuals";
import {
  categoryInfo,
  termsByCategory,
  terms,
  type GlossaryCategory,
} from "@/lib/glossary/data";
import { GlossarySearch } from "./search";
import { createPageMetadata } from "@/lib/seo/metadata";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "航海词典 · 120+ 术语中英对照",
  description:
    "WindHero 航海词典：120+ 帆船术语中英文对照，按天气、导航、索具、操船、安全、通信和动力系统分类。",
  keywords: [
    "航海术语",
    "帆船词典",
    "sailing glossary",
    "RYA 术语",
    "信风",
    "等压线",
    "MAYDAY",
    "MOB",
    "EPIRB",
    "CPA TCPA",
    "Buys-Ballot",
    "海图基准",
    "WindHero 词典",
  ],
  path: "/glossary",
});

const categoryOrder: GlossaryCategory[] = [
  "wind-weather",
  "navigation",
  "boat-parts",
  "sailing-maneuvers",
  "safety",
  "communications",
  "engine-systems",
];

export default function GlossaryPage() {
  const byCat = termsByCategory();
  const pageSchema = webPageLd({
    type: "CollectionPage",
    name: "WindHero 航海词典",
    description: `${terms.length} 个帆船与航海术语的中英对照词典。`,
    url: "/glossary",
  });
  const glossaryListSchema = itemListLd({
    name: "WindHero 航海术语列表",
    url: "/glossary",
    items: terms.map((term) => ({
      name: `${term.zh} · ${term.en}`,
      description: term.short,
      url: `/glossary/${term.slug}`,
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(glossaryListSchema) }}
      />
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          level={1}
          eyebrow="航海词典"
          title={
            <>
              很多时候卡住，
              <br />
              是因为词没对上。
            </>
          }
          lead={`这里收了 ${terms.length} 个常见航海词，按 7 类放好。遇到 sheet、isobar、MOB 这类词，不用先装懂，点进来查一下就行。`}
        />

        <div className="mt-10">
          <GlossarySearch />
        </div>
      </Section>

      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="术语地图"
            title={
              <>
                按分类看，
                <br />
                比硬背轻松一点。
              </>
            }
            lead="风、帆、海图、安全和通信经常缠在一起。把词按场景放，比按字母表背更接近船上的实际用法。"
          />
          <GlossaryAtlasVisual />
        </div>
      </Section>

      <Section>
        <div className="space-y-16">
          {categoryOrder.map((cat) => {
            const info = categoryInfo[cat];
            const catTerms = byCat[cat];
            if (!catTerms || catTerms.length === 0) return null;

            return (
              <article key={cat} id={cat} className="scroll-mt-32">
                <header className="border-l-2 border-sun pl-5">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sun-deep">
                    {info.sub} · {catTerms.length} 词
                  </p>
                  <h2 className="display mt-3 text-3xl text-ink md:text-[2.2rem]">
                    {info.label}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
                    {info.intro}
                  </p>
                </header>

                <div className="mt-8 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
                  {catTerms.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/glossary/${t.slug}`}
                      className="group flex flex-col bg-paper p-5 transition-colors hover:bg-paper-soft/60"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="display text-lg text-ink">{t.zh}</h3>
                        <span className="font-mono text-[0.7rem] text-sea-deep">
                          {t.en}
                        </span>
                      </div>
                      <p className="mt-2 flex-1 text-[0.86rem] leading-[1.7] text-ink-soft">
                        {t.short}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[0.74rem] text-sea-deep transition-colors group-hover:text-ink">
                        展开
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-line/60 bg-paper-soft/30">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <BookOpen className="h-6 w-6 text-sun" />
            <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
              不会的词，
              <br />
              当场查。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              船长说「ease the sheet」，你如果不知道 sheet 是哪根绳，就该问。海上问一句不丢人，听错了才麻烦。
            </p>
          </div>
          <Link
            href="/courses"
            className="group flex flex-col justify-center rounded-sm border border-line/70 bg-paper p-8 transition-colors hover:bg-paper-soft/60 md:p-10"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
              下一步
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              从一门课开始补。
            </h3>
            <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">
              13 门课对应 RYA / ASA / IYT 三体系全部笔试。WH-101《读懂风》是最适合从零开始的起点。
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
              查看课程
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
