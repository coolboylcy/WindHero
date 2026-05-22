import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Field notes, captain's logs, and curriculum essays from the WindHero crew.",
};

const longform: Record<string, string[]> = {
  "what-the-wind-actually-is": [
    "We say we sail with the wind. Most of the time, what we sail with is the difference between two winds — the true wind moving across the sea, and the wind we make ourselves by moving through it.",
    "Apparent wind is the only wind your sails ever feel. It is faster than the true wind when you reach. It is bent forward when you sail close-hauled. It is gentler downwind than the number on your phone suggests, and that has surprised more sailors than anything else.",
    "A good crew learns to feel both winds at once. The true wind tells you what the weather is doing. The apparent wind tells you what the boat is doing. The captain holds both pictures in their head and never confuses the two.",
  ],
  "the-fourth-night": [
    "Day one is adrenaline. You drink coffee at the wheel and grin at every wave. Day two is competence — the watches settle, the cook finds the galley, the boat starts to feel like a small country with rules of its own.",
    "Day three is boredom. The novelty has burned off, the body knows how tired it actually is, and a small voice begins to ask whether this was really such a good idea.",
    "And then the fourth night arrives. The wind builds at 02:00, the autopilot disengages with an apologetic beep, and you find out whether the watch system you wrote on paper survives contact with a wet, dark, moving deck. The fourth night is the real exam. Everything before it was rehearsal.",
  ],
  "why-we-still-teach-celestial": [
    "It is not about the sextant being a backup for the GPS. The GPS rarely fails on a modern boat, and when it does, the iPad in the second drawer will usually take over.",
    "We teach celestial because it teaches you the world is older than your plotter. It teaches that latitude is a real, measurable thing — not a coordinate downloaded from the cloud, but an angle you can lift from the sun at noon with a piece of brass and a flat horizon.",
    "Knowing this changes how you sail. You stop trusting your screen as a substitute for the sea, and you start using your screen as a tool — one of several — to confirm what the sea is already telling you.",
  ],
};

export default function JournalPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="Journal"
          title={
            <>
              Field notes from a school <br />
              <span className="text-gold">that meets at sea.</span>
            </>
          }
          lead="Long-form essays, captain's logs, and small lessons from sailors learning to live deliberately. Published when there is something true to say, and never to fill a calendar."
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          {journal.map((entry, i) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="scroll-mt-28 border-t border-white/10 py-16 first:border-t-0 first:pt-4"
            >
              <header>
                <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-mist/55">
                  <span className="font-mono text-gold/80">{entry.kicker}</span>
                  <span>
                    {entry.date} · {entry.readTime}
                  </span>
                </div>
                <h2 className="display mt-5 text-4xl text-sail md:text-5xl">
                  {entry.title}
                </h2>
                <p className="mt-4 text-sm uppercase tracking-[0.22em] text-mist/55">
                  By {entry.author}
                </p>
                <div className="hairline mt-8" />
              </header>

              <div className="prose-paragraphs mt-8 space-y-5 text-[1.02rem] leading-[1.7] text-mist/85">
                <p className="text-mist/90">{entry.excerpt}</p>
                {(longform[entry.slug] ?? []).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              {i < journal.length - 1 ? (
                <p className="mt-12 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-mist/40">
                  — End of entry {String(i + 1).padStart(2, "0")} —
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
