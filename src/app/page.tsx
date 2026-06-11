import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor, Compass, Waves, Wind } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import {
  ContentCompassVisual,
  LearningRouteChart,
  ToolDeckVisual,
} from "@/components/content-visuals";
import { courses, journal, voyages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "中文航海理论课程与工具",
  description:
    "WindHero 逐风人整理中文航海理论课、RYA / ASA / IYT 认证对照、航海词典、案例复盘与出航前工具。",
  path: "/",
  keywords: [
    "WindHero",
    "逐风人",
    "中文航海课程",
    "帆船课程",
    "RYA 认证",
    "ASA 认证",
    "IYT 认证",
    "航海理论",
  ],
});

export default function HomePage() {
  const pageSchema = webPageLd({
    name: "WindHero 逐风人中文航海学院",
    description:
      "中文航海理论课、RYA / ASA / IYT 认证对照、案例复盘、航海词典与出航前工具。",
    url: "/",
    primaryImage: "/images/generated/hero-ocean-training-v1.png",
  });
  const courseListSchema = itemListLd({
    name: "WindHero 核心航海课程",
    description: "从读懂风到船长思维的中文航海理论课程路径。",
    url: "/courses",
    items: courses.map((course) => ({
      name: `${course.code} · ${course.title}`,
      description: course.summary,
      url: `/courses/${course.slug}`,
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(courseListSchema) }}
      />
      <Hero />

      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="先从哪里看"
              title={
                <>
                  如果你刚开始学航海，
                  <br />
                  先别急着背术语。
                </>
              }
              lead="我把内容分成四块：课程按顺序讲，词典随手查，案例帮你记住代价，工具用来在出发前做一点粗判断。"
            />
            <div className="mt-8 grid gap-3">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="grid grid-cols-[2.2rem_1fr] gap-4 border-t border-line/70 pt-4 first:border-t-0 first:pt-0"
                >
                  <p.icon className="mt-1 h-5 w-5 text-sea-deep" strokeWidth={1.4} />
                  <div>
                    <h3 className="display text-xl text-ink">{p.title}</h3>
                    <p className="mt-1 text-[0.9rem] leading-[1.75] text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContentCompassVisual />
        </div>
      </Section>

      <Section className="border-b border-line/60">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="课程"
            title={
              <>
                课程按学习顺序排好，
                <br />
                不用一开始就选证书。
              </>
            }
            lead="先读风和帆，再学海图、潮汐、避碰和天气。等这些底层概念顺了，再回头看 RYA、ASA、IYT 的要求，会轻很多。"
          />
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 text-[0.86rem] text-ink-soft transition-colors hover:text-ink"
          >
            全部课程
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12">
          <LearningRouteChart stages={homeStages} />
        </div>

        <div className="mt-14 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="group relative flex flex-col justify-between gap-10 bg-paper p-8 transition-colors hover:bg-paper-soft/70"
            >
              <div>
                <div className="flex items-center justify-between text-[0.72rem] text-mist">
                  <span className="font-mono tracking-[0.14em] text-sea">
                    {c.code}
                  </span>
                  <span>{c.level}</span>
                </div>
                <h3 className="display mt-6 text-[1.8rem] text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-[1.9] text-ink-soft">
                  {c.summary}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-mist">
                <span className="font-mono tracking-[0.12em]">
                  {c.duration}
                </span>
                <ArrowRight className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow="互动工具"
            title={
              <>
                有些东西，
                <br />
                拖一拖就明白了。
              </>
            }
            lead="风带和天气图很适合做成小工具。它们不能替代预报，但能帮你先问对问题：这片海一年里什么时候比较好走，低压现在会把风带到哪里。"
          />
          <ToolDeckVisual />
        </div>
      </Section>

      <Section className="border-b border-line/60">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <Eyebrow>开放航段</Eyebrow>
            <h2 className="display mt-4 text-balance text-4xl text-ink md:text-5xl">
              学完理论，还是要回到甲板上。
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-[1.9] text-ink-soft">
              这里记录一些计划中的航段。人数会控制得很小，
              因为值班、做饭、看天气这些事，人一多反而学不到。
            </p>
            <Link
              href="/voyages"
              className="mt-8 inline-flex items-center gap-2 text-sm text-sea-deep hover:text-ink"
            >
              查看全部航线
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="divide-y divide-line/70 border-y border-line/70">
            {voyages.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/voyages#${v.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-paper-soft/40"
                >
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="display text-[1.5rem] text-ink">
                        {v.name}
                      </h3>
                      <span className="text-xs text-mist">
                        {v.region}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-[0.93rem] leading-[1.85] text-ink-soft">
                      {v.brief}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-sea">{v.distance}</p>
                    <p className="mt-1 text-[0.72rem] text-mist">
                      {v.season}
                    </p>
                    <p className="mt-1 text-[0.72rem] text-mist">
                      {v.difficulty}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="relative border-b border-line/60 bg-paper-soft/30">
        <blockquote className="mx-auto max-w-3xl text-center">
          <Eyebrow className="!text-mist">— 来自宣言</Eyebrow>
          <p className="display mt-8 text-balance text-[2.2rem] leading-[1.35] text-ink md:text-[3rem] md:leading-[1.25]">
            海上很多事没有按钮，也没有推荐算法。你得自己看天、看船、看人，然后做决定。
          </p>
          <footer className="mt-10 text-xs text-mist">
            WindHero 宣言 · 第一条
          </footer>
        </blockquote>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="航海日志"
            title="一些没有放进课程里的笔记。"
            lead="值班时想到的事、读书摘下来的句子、还有几次把自己弄得很狼狈的小经验。"
          />
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-[0.86rem] text-ink-soft transition-colors hover:text-ink"
          >
            阅读全部
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid gap-px bg-line/70 md:grid-cols-3">
          {journal.map((j) => (
            <Link
              key={j.slug}
              href={`/journal#${j.slug}`}
              className="group flex h-full flex-col justify-between gap-10 bg-paper p-8 transition-colors hover:bg-paper-soft/70"
            >
              <div>
                <p className="text-[0.72rem] text-sea-deep">
                  {j.kicker}
                </p>
                <h3 className="display mt-3 text-[1.55rem] text-ink">
                  {j.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-[1.85] text-ink-soft">
                  {j.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-[0.72rem] text-mist">
                <span>{j.author}</span>
                <span>
                  {j.date} · {j.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

const pillars = [
  {
    icon: Wind,
    title: "读懂风。",
    body: "先把气压、海陆风、阵风这些东西讲清楚。你不需要一开始就会预报天气，但至少要知道风为什么突然变了。",
  },
  {
    icon: Compass,
    title: "规划航线。",
    body: "海图、潮汐、退路港，一项一项拆开。很多错误不是开船后才发生的，而是在出发前就埋好了。",
  },
  {
    icon: Waves,
    title: "守住值班。",
    body: "夜班、落水、失火、漏水，这些内容不浪漫，但真的有用。船上最要紧的是事情来了不要乱。",
  },
  {
    icon: Anchor,
    title: "掌舵全局。",
    body: "到最后学的是取舍：什么时候继续，什么时候等，什么时候承认这趟不该走。这个比会背公式难。",
  },
];

const homeStages = [
  { id: "intro", label: "入门", sub: "风、帆、船的基本语言", count: 2 },
  { id: "crew", label: "船员", sub: "值班、安全、通信", count: 3 },
  { id: "day-skipper", label: "日间船长", sub: "海图、潮汐、避碰", count: 3 },
  { id: "night-coastal", label: "夜间近岸", sub: "雷达、夜航、近岸风险", count: 2 },
  { id: "offshore", label: "远海", sub: "天气、航路、船长判断", count: 2 },
  { id: "ocean", label: "跨洋", sub: "天文导航与远洋思维", count: 1 },
];
