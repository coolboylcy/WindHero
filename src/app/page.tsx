import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Anchor, Compass, Waves, Wind } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { courses, journal, voyages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "中文航海理论课程与工具",
  description:
    "WindHero 逐风人是一所面向从零开始船长的中文航海学院，覆盖 RYA / ASA / IYT 认证理论、帆船课程、航海词典、真实案例与免费互动工具。",
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
  return (
    <>
      <Hero />

      <Section className="border-b border-line/60">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <SectionHeading
            eyebrow="我们为什么存在"
            title={
              <>
                我们不教你玩船，
                <br />
                我们教你读懂海。
              </>
            }
            lead="多数帆船学校给你一张证书和一晚的酒。WindHero 为那种想要真功夫的人而建——能力、判断力、和那份在第四夜凌晨两点依然能稳住的镇定。"
          />

          <div className="grid grid-cols-1 gap-px bg-line/70 sm:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="flex flex-col gap-4 bg-paper p-8 transition-colors hover:bg-paper-soft/70"
              >
                <p.icon
                  className="h-6 w-6 text-sea"
                  strokeWidth={1.2}
                />
                <h3 className="display text-[1.6rem] text-ink">{p.title}</h3>
                <p className="text-[0.95rem] leading-[1.9] text-ink-soft">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-line/60">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="课程"
            title={
              <>
                由真正跑过这些海的人，
                <br />
                亲手编写的课程。
              </>
            }
            lead="从第一次抢风到一千海里的远洋航段——每一门课都由在役船长与气象人主讲，不是网红，不是代课。"
          />
          <Link
            href="/courses"
            className="group inline-flex items-center gap-2 text-[0.86rem] text-ink-soft transition-colors hover:text-ink"
          >
            全部课程
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
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

      <Section className="border-b border-line/60">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <Eyebrow>开放航段</Eyebrow>
            <h2 className="display mt-4 text-balance text-4xl text-ink md:text-5xl">
              真实的航段、真实的船长、真实的海水。
            </h2>
            <p className="mt-5 max-w-md text-[0.98rem] leading-[1.9] text-ink-soft">
              挑一段航段，飞到港口，登船起航。
              每段航程都限定小船员人数，保证学习密度，
              也保证值班体系不至于把人拖垮。
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
            在一个不停替你做决定的时代，海会把决定权还给你的双手。接住它。
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
            title="来自船员的现场笔记。"
            lead="散文、值班日志、小经验——一群正在学习如何更清醒地生活的水手写的。"
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
    body: "气压系统、海陆风、阵风锋。教你走上甲板的那一瞬间，就能预判接下来三十分钟——比你的电子海图更早。",
  },
  {
    icon: Compass,
    title: "规划航线。",
    body: "真实的海图、真实的潮汐窗口、真实的退路港。一段航程是一棵决策树，你要在解缆之前先走一遍。",
  },
  {
    icon: Waves,
    title: "守住值班。",
    body: "恶劣天气、夜班值守、MOB 演练——冷静、可重复的海员素养，是把船员带回家的那种功夫。",
  },
  {
    icon: Anchor,
    title: "掌舵全局。",
    body: "领导力、简报与放弃的勇气。船长的思维会跟你下船，带进你生活的每一个房间。",
  },
];
