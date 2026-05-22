import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { courses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "From reading the wind to commanding an offshore passage — the WindHero curriculum.",
};

const levels = ["Foundations", "Intermediate", "Captain Track"] as const;

export default function CoursesPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="The Curriculum"
          title={
            <>
              A school for sailors who want{" "}
              <span className="text-gold">the real thing.</span>
            </>
          }
          lead="Six courses, three levels. Self-paced theory, live cohort work, and onboard miles. Captain Track culminates in an ocean passage you actually plan, defend, and sail."
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
                <p className="mt-3 max-w-xl text-sm text-mist/70">
                  {levelCopy[level].lead}
                </p>
              </div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.26em] text-mist/50">
                {items.length} course{items.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-10 grid gap-px bg-white/5 md:grid-cols-2">
              {items.map((c) => (
                <article
                  key={c.slug}
                  id={c.slug}
                  className="scroll-mt-28 bg-ink p-8 transition-colors hover:bg-deep/40 md:p-10"
                >
                  <div className="flex items-baseline justify-between text-[0.7rem] uppercase tracking-[0.24em] text-mist/55">
                    <span className="font-mono text-gold/80">{c.code}</span>
                    <span>{c.duration}</span>
                  </div>
                  <h3 className="display mt-5 text-3xl text-sail md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mist/70">
                    {c.summary}
                  </p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-mist/80">
                    {c.modules.map((m, i) => (
                      <li
                        key={m}
                        className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3"
                      >
                        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-gold/70">
                          M·{String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[0.7rem] uppercase tracking-[0.24em] text-mist/55">
                      Cohort opens Apr 14
                    </span>
                    <Link
                      href="/about#contact"
                      className="group inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.26em] text-gold transition-colors hover:text-gold-soft"
                    >
                      Request invite
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
  Foundations: {
    title: "Foundations.",
    lead: "The vocabulary of the sea. Wind, sail trim, points of sail, and the habits that make you safe on deck.",
  },
  Intermediate: {
    title: "Intermediate seamanship.",
    lead: "Weather, routing, pilotage and safety. The skills that turn a sailor into someone you'd actually want on watch.",
  },
  "Captain Track": {
    title: "Captain Track.",
    lead: "The captain's mind. Leadership, judgement, and a real offshore passage at the end of it.",
  },
};
