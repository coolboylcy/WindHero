import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who runs WindHero, where we sail, and how to reach the office.",
};

const crew = [
  {
    name: "Wei Lin",
    role: "Founder & Captain Instructor",
    bio: "South China Sea pilot, 60,000+ blue-water miles, ex-meteorologist. Believes a curriculum should be testable in real weather.",
  },
  {
    name: "Marisol Ortega",
    role: "Head of Curriculum",
    bio: "Yachtmaster Ocean. Led safety training for two ARC fleets and a Sydney-Hobart team.",
  },
  {
    name: "Toshi Aragaki",
    role: "Pilotage & Celestial",
    bio: "Okinawa-based pilot and traditional navigator. Teaches the half of navigation the screens forgot.",
  },
  {
    name: "Henrik Sund",
    role: "Weather & Routing",
    bio: "Former North Atlantic ferry routing officer. Reads a GRIB the way a doctor reads an MRI.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              We started this school because the one{" "}
              <span className="text-gold">we wanted didn&apos;t exist.</span>
            </>
          }
          lead="WindHero is a small, deliberately international school built by working captains, meteorologists, and ocean instructors. We teach the parts of sailing that take years to learn alone, and the parts of life that sailing accidentally teaches."
        />
      </Section>

      <Section className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>The crew</Eyebrow>
            <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
              People who&apos;ve done the miles.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist/70">
              Our instructors share watches with you on real legs. There are
              no celebrity ambassadors. There is no marketing department on
              the back deck.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {crew.map((p) => (
              <article key={p.name} className="bg-ink p-7">
                <p className="display text-2xl text-sail">{p.name}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-gold/80">
                  {p.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-mist/70">
                  {p.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Office on land</Eyebrow>
            <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
              Reach the dock.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist/70">
              For private cohorts, partnerships, or to join a voyage, write to
              us. We read every message; we reply within two working days.
            </p>

            <dl className="mt-10 space-y-6 border-t border-white/10 pt-8">
              <div>
                <dt className="eyebrow !text-mist/50">Office</dt>
                <dd className="display mt-2 text-xl text-sail">
                  Aberdeen Marina, Hong Kong
                </dd>
                <dd className="font-mono text-xs uppercase tracking-[0.22em] text-mist/55">
                  22°14′N · 114°09′E
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-mist/50">Email</dt>
                <dd className="mt-2">
                  <Link
                    href="mailto:hello@windhero.app"
                    className="inline-flex items-center gap-2 text-base text-sail hover:text-gold"
                  >
                    <Mail className="h-4 w-4 text-gold/80" />
                    hello@windhero.app
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-mist/50">Open repository</dt>
                <dd className="mt-2">
                  <Link
                    href="https://github.com/coolboylcy/WindHero"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base text-sail hover:text-gold"
                  >
                    github.com/coolboylcy/WindHero
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="border border-white/10 bg-gradient-to-b from-deep/40 to-transparent p-8 md:p-10">
            <p className="eyebrow">Stay aboard</p>
            <h3 className="display mt-4 text-3xl text-sail">
              The dispatch is the easiest way in.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist/70">
              One letter a month. New voyages, a weather pattern worth reading,
              and a captain&apos;s log from a recent passage.
            </p>
            <div className="mt-6">
              <NewsletterForm source="about" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
