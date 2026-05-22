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
            eyebrow="Why WindHero"
            title={
              <>
                We don&apos;t teach you to{" "}
                <em className="not-italic text-gold">play</em> with boats.
                <br />
                We teach you to read the sea.
              </>
            }
            lead="Most sailing schools hand you a certificate and a hangover. WindHero is built for people who want the skill, the judgement, and the calm — the kind of seamanship that holds together at 02:00 on the fourth night out."
          />

          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="group relative flex flex-col gap-4 bg-ink p-8 transition-colors hover:bg-deep/60"
              >
                <p.icon className="h-7 w-7 text-gold/90" strokeWidth={1.2} />
                <h3 className="display text-2xl text-sail">{p.title}</h3>
                <p className="text-sm leading-relaxed text-mist/70">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-white/5">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Curriculum"
            title={
              <>
                A curriculum charted by{" "}
                <span className="text-gold">
                  people who&apos;ve done the miles.
                </span>
              </>
            }
            lead="From the first reach to a 1,000 nm offshore passage, every course is taught by working captains and meteorologists — not influencers."
          />
          <Link
            href="/courses"
            className="group inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-[0.74rem] uppercase tracking-[0.26em] text-sail transition-colors hover:border-gold/60 hover:text-gold"
          >
            All Courses
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
                <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-mist/55">
                  <span className="font-mono text-gold/80">{c.code}</span>
                  <span>{c.level}</span>
                </div>
                <h3 className="display mt-6 text-3xl text-sail">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/70">
                  {c.summary}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-mist/60">
                <span className="font-mono uppercase tracking-[0.2em]">
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
            <Eyebrow>Open voyages</Eyebrow>
            <h2 className="display mt-5 text-balance text-4xl text-sail md:text-5xl">
              Real passages. Real captains. Real water.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-mist/70">
              Pick a leg, fly to the marina, and step onboard. Voyages are
              limited to small crews so the learning stays high and the watch
              system stays sane.
            </p>
            <Link
              href="/voyages"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-gold hover:text-gold-soft"
            >
              See all routes
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
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist/50">
                        {v.region}
                      </span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm text-mist/65">
                      {v.brief}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-gold">{v.distance}</p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-mist/50">
                      {v.season}
                    </p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-mist/40">
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
          <p className="eyebrow justify-center">From the manifesto</p>
          <p className="display mt-8 text-balance text-4xl leading-[1.08] text-sail md:text-6xl">
            “In a world that keeps trying to choose for you, the sea returns the
            decision to your hands.{" "}
            <span className="text-gold">Take it.</span>”
          </p>
          <footer className="mt-10 text-xs uppercase tracking-[0.32em] text-mist/55">
            — WindHero, Article I
          </footer>
        </blockquote>
      </Section>

      <Section>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Journal"
            title="Field notes from the crew."
            lead="Essays, logs, and small lessons from sailors learning to live deliberately."
          />
          <Link
            href="/journal"
            className="group inline-flex h-11 items-center gap-2 border border-white/15 px-5 text-[0.74rem] uppercase tracking-[0.26em] text-sail transition-colors hover:border-gold/60 hover:text-gold"
          >
            Read the journal
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
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold/80">
                  {j.kicker}
                </p>
                <h3 className="display mt-4 text-2xl text-sail">{j.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist/70">
                  {j.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-mist/50">
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
    title: "Read the wind.",
    body: "Pressure systems, sea breeze, gust fronts. We teach you to walk on deck and call the next 30 minutes before your plotter does.",
  },
  {
    icon: Compass,
    title: "Plot a course.",
    body: "Real charts, real tide gates, real bail-out plans. A passage is a decision tree, and you learn to walk it before you cast off.",
  },
  {
    icon: Waves,
    title: "Hold the watch.",
    body: "Heavy weather, night watches, MOB drills. Calm, repeatable seamanship — the discipline that keeps your crew home.",
  },
  {
    icon: Anchor,
    title: "Captain the room.",
    body: "Leadership, briefings, the courage to abort. The captain's mind transfers to every other part of your life.",
  },
];
