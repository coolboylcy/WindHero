import Link from "next/link";
import { ArrowRight, Anchor, Compass, Waves, Wind } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { courses, journal, voyages } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="我们为什么存在"
            title={
              <>
                我们不教你<em className="not-italic text-gold">玩</em>船。
                <br />
                我们教你读懂海。
              </>
            }
            lead="多数帆船学校给你一张证书和一晚的酒。WindHero 为那种想要真功夫的人而建——能力、判断力、和那份在第四夜凌晨两点依然能稳住的镇定。"
          />

          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="group relative flex flex-col gap-4 bg-ink p-8 transition-colors hover:bg-deep/60"
              >
                <p.icon className="h-7 w-7 text-gold/90" strokeWidth={1.2} />
                <h3 className="display text-2xl text-sail">{p.title}</h3>
                <p className="text-sm leading-[1.85] text-mist/70">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-white/5">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="课程体系"
            title={
              <>
                由真正<span className="text-gold">跑过这些海的人</span>编写的课程。
              </>
            }
            lead="从第一次抢风到一千海里的远洋航段——每一门课都由在役船长与气象人主讲，不是网红、不是代课。"
          />
          <Link
            href="/courses"
            className="group inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-[0.78rem] tracking-[0.32em] text-sail transition-colors hover:border-gold/60 hover:text-gold"
          >
            全部课程
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/courses#${c.slug}`}
              className="group relative flex flex-col justify-between gap-10 border border-white/10 bg-gradient-to-b from-deep/40 to-transparent p-8 transition-colors hover:border-gold/40 hover:bg-deep/50"
            >
              <div>
                <div className="flex items-center justify-between text-[0.72rem] tracking-[0.26em] text-mist/55">
                  <span className="font-mono text-gold/80">{c.code}</span>
                  <span>{c.level}</span>
                </div>
                <h3 className="display mt-6 text-3xl text-sail">{c.title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-mist/70">
                  {c.summary}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-mist/60">
                <span className="font-mono tracking-[0.18em]">
                  {c.duration}
                </span>
                <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/5">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <Eyebrow>开放航段</Eyebrow>
            <h2 className="display mt-5 text-balance text-4xl text-sail md:text-5xl">
              真实的航段、真实的船长、真实的海水。
            </h2>
            <p className="mt-5 max-w-md text-base leading-[1.85] text-mist/70">
              挑一段航段，飞到港口，登船起航。每段航程都限定小船员人数，保证学习密度，
              也保证值班体系不至于把人拖垮。
            </p>
            <Link
              href="/voyages"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.28em] text-gold hover:text-gold-soft"
            >
              查看全部航线
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {voyages.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/voyages#${v.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 transition-colors hover:bg-deep/40"
                >
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="display text-2xl text-sail">{v.name}</h3>
                      <span className="text-xs tracking-[0.24em] text-mist/50">
                        {v.region}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-[1.85] text-mist/65">
                      {v.brief}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-gold">{v.distance}</p>
                    <p className="mt-1 text-[0.72rem] tracking-[0.26em] text-mist/50">
                      {v.season}
                    </p>
                    <p className="mt-1 text-[0.72rem] tracking-[0.26em] text-mist/40">
                      {v.difficulty}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="relative border-b border-white/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(200,169,106,0.08),transparent_60%)]" />
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">— 来自宣言</p>
          <p className="display mt-8 text-balance text-4xl leading-[1.15] text-sail md:text-6xl">
            「在一个不停替你做决定的时代，海会把决定权还给你的双手。
            <span className="text-gold">接住它。</span>」
          </p>
          <footer className="mt-10 text-xs tracking-[0.34em] text-mist/55">
            — WindHero 宣言 · 第一条
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
            className="group inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-[0.78rem] tracking-[0.32em] text-sail transition-colors hover:border-gold/60 hover:text-gold"
          >
            阅读全部
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {journal.map((j) => (
            <Link
              key={j.slug}
              href={`/journal#${j.slug}`}
              className="group flex h-full flex-col justify-between gap-10 border border-white/10 bg-ink p-7 transition-colors hover:border-gold/40 hover:bg-deep/40"
            >
              <div>
                <p className="font-mono text-[0.72rem] tracking-[0.28em] text-gold/80">
                  {j.kicker}
                </p>
                <h3 className="display mt-4 text-2xl text-sail">{j.title}</h3>
                <p className="mt-3 text-sm leading-[1.85] text-mist/70">
                  {j.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-[0.72rem] tracking-[0.26em] text-mist/50">
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
