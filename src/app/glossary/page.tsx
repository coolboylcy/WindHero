import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import {
  categoryInfo,
  termsByCategory,
  terms,
  type GlossaryCategory,
} from "@/lib/glossary/data";
import { GlossarySearch } from "./search";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "航海词典 · 120+ 术语中英对照",
  description:
    "WindHero 航海词典：120+ 帆船术语中英文对照，按风与天气、船体索具、操船动作、导航、安全、通信、动力 7 大类组织。每个术语解释\"为什么这个概念存在\"。",
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

  return (
    <>
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          eyebrow="航海词典"
          title={
            <>
              新手最大的卡点不是技术，
              <br />
              是术语。
            </>
          }
          lead={`这里是 ${terms.length} 个航海术语的中英对照——按 7 大类组织，每个不仅给定义，还解释"为什么这个概念存在"。课程正文里嵌入了链接，碰到不熟的词点进来。`}
        />

        <div className="mt-10">
          <GlossarySearch />
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
              立刻就该查。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              新手最常见的错误是「假装懂」——船长喊「ease the sheet」，你点头说「好」，其实根本不知道哪根绳叫 sheet。海上没人会嘲笑你问「那是什么」，但海会嘲笑装懂。
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
              从一门课开始系统学。
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
