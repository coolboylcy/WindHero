import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "The WindHero manifesto — why we sail, what we teach, and the kind of person we are trying to help you become.",
};

const articles: { n: string; t: string; body: string }[] = [
  {
    n: "I",
    t: "The sea returns the decision.",
    body: "In a world that keeps trying to choose for you — the next video, the next route, the next dopamine hit — the sea returns the decision to your hands. Wind, weather, route, watch. Every choice is yours, and every choice is real. Take it.",
  },
  {
    n: "II",
    t: "Skill before identity.",
    body: "You do not get to call yourself a sailor because you bought the jacket. You earn it by learning the wind, by holding the watch, by being the person your crew trusts at 02:00 on the fourth night. WindHero is built around the skill, not the costume.",
  },
  {
    n: "III",
    t: "Safety is not the opposite of adventure.",
    body: "It is the precondition for it. A captain who cannot abort cannot truly commit. We teach pre-mortems, bail-out plans, and the unromantic discipline of safety — so that when the sea opens, you can go.",
  },
  {
    n: "IV",
    t: "Small crews. Long passages.",
    body: "We keep cohorts small because seamanship is taught one decision at a time, in real weather, on a real deck. There is no shortcut, and there is no need for one.",
  },
  {
    n: "V",
    t: "The captain's mind goes ashore with you.",
    body: "The point of WindHero is not the sailing. The point is the person who walks off the boat in Suva, or Bonifacio, or Aberdeen — calmer under pressure, clearer under uncertainty, and used to making decisions that matter. The captain's mind is portable.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">— The Manifesto</p>
          <h1 className="display mt-6 text-balance text-5xl text-sail md:text-7xl">
            We are a school for sailors,{" "}
            <span className="text-gold">and for the captain&apos;s mind.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-mist/75 md:text-lg">
            Five articles. They are not rules. They are the reason WindHero
            exists, in the smallest number of words we could write.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          {articles.map((a) => (
            <article
              key={a.n}
              className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-white/10 py-16 first:border-t-0"
            >
              <p className="display text-3xl text-gold">{a.n}.</p>
              <div>
                <h2 className="display text-2xl text-sail md:text-3xl">
                  {a.t}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-mist/80">
                  {a.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-24 max-w-3xl border-t border-white/10 pt-16 text-center">
          <p className="display text-3xl text-sail md:text-4xl">
            Master the Wind.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.32em] text-mist/55">
            — WindHero
          </p>
        </div>
      </Section>
    </>
  );
}
