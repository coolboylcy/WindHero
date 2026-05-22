import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Wind } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { voyages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Voyages",
  description:
    "Open passages and ocean legs led by working captains. Pick a leg, fly to the marina, and step onboard.",
};

const marinas = [
  { name: "Aberdeen Marina", coord: "22°14′N · 114°09′E", city: "Hong Kong" },
  { name: "Royal Phuket Marina", coord: "7°56′N · 98°22′E", city: "Phuket" },
  { name: "Port of Palma", coord: "39°33′N · 02°37′E", city: "Mallorca" },
  { name: "Westhaven", coord: "36°50′S · 174°45′E", city: "Auckland" },
  { name: "Auckland Bay Marina", coord: "36°50′S · 174°47′E", city: "Auckland" },
  { name: "Marina di Bonifacio", coord: "41°23′N · 09°09′E", city: "Corsica" },
];

export default function VoyagesPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="Atlas"
          title={
            <>
              The world is{" "}
              <span className="text-gold">a chart of open legs.</span>
            </>
          }
          lead="Every voyage is run by a captain who has sailed the leg before — many times — and limited to a small crew so the seamanship stays sharp and the watches stay sane."
        />
      </Section>

      <Section id="routes" className="border-b border-white/5">
        <div className="grid gap-px bg-white/5 md:grid-cols-2">
          {voyages.map((v) => (
            <article
              key={v.slug}
              id={v.slug}
              className="scroll-mt-28 bg-ink p-8 md:p-10"
            >
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.24em] text-mist/55">
                <span className="font-mono text-gold/80">{v.region}</span>
                <span>{v.difficulty}</span>
              </div>
              <h3 className="display mt-5 text-3xl text-sail md:text-4xl">
                {v.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist/70">
                {v.brief}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-6 border-y border-white/10 py-6 text-sm">
                <div>
                  <dt className="eyebrow !text-mist/50">Distance</dt>
                  <dd className="display mt-2 text-xl text-sail">
                    {v.distance}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow !text-mist/50">Season</dt>
                  <dd className="display mt-2 text-xl text-sail">{v.season}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-mist/50">Crew</dt>
                  <dd className="display mt-2 text-xl text-sail">6 max</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-mist/60">
                  <Wind className="h-4 w-4 text-gold/80" />
                  Routing brief 7d before
                </span>
                <Link
                  href="/about#contact"
                  className="group inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.26em] text-gold hover:text-gold-soft"
                >
                  Join the manifest
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="marinas">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow">— Marinas</p>
            <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
              Our home ports.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mist/70">
              Where the cohorts gather, the boats are kept, and the first
              briefing happens over coffee on the dockside.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {marinas.map((m) => (
              <li
                key={`${m.name}-${m.coord}`}
                className="flex items-center justify-between gap-4 bg-ink p-6"
              >
                <div>
                  <p className="display text-xl text-sail">{m.name}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-mist/55">
                    {m.city}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-gold/80">
                  <MapPin className="h-3.5 w-3.5" />
                  {m.coord}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
