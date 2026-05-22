import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/5">
      <BackgroundOcean />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-28 pt-24 lg:grid-cols-[1.25fr_0.75fr] lg:px-10">
        <div className="animate-fade-up">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold/70" />
            A modern sailing academy
          </p>

          <h1 className="display mt-6 text-balance text-[clamp(2.75rem,7vw,5.6rem)] text-sail">
            Master the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold via-gold-soft to-gold bg-clip-text text-transparent">
                Wind.
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-mist/75 md:text-xl">
            WindHero is where sailors learn to read the sea — wind, weather,
            routing, and the captain&apos;s mind. Not a hobby club. A school for
            people who want to move through the world on their own course.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-sail px-6 text-[0.78rem] uppercase tracking-[0.26em] text-ink transition-colors hover:bg-gold"
            >
              Begin Training
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-12 items-center gap-2 border border-white/15 px-6 text-[0.78rem] uppercase tracking-[0.26em] text-sail transition-colors hover:border-gold/60 hover:text-gold"
            >
              Read the Manifesto
            </Link>
          </div>

          <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { k: "Cohorts", v: "12 / yr" },
              { k: "Voyages", v: "4 oceans" },
              { k: "Crew", v: "1,400+" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="eyebrow !text-mist/50">{item.k}</dt>
                <dd className="display mt-2 text-2xl text-sail">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <CompassDial />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-mist/40 lg:px-10">
        <span className="font-mono tracking-[0.2em]">N 22° 16.42&apos;</span>
        <span className="font-mono tracking-[0.2em]">
          Heading 037° · True
        </span>
        <span className="font-mono tracking-[0.2em]">E 114° 09.87&apos;</span>
      </div>
    </section>
  );
}

function BackgroundOcean() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-deep to-ink" />
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(200,169,106,0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[radial-gradient(ellipse_at_bottom,rgba(16,42,67,0.9),transparent_70%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

function CompassDial() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] animate-drift">
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-12 rounded-full border border-gold/30" />

      <div className="compass-ring absolute inset-2 rounded-full opacity-40 animate-rotate-slow" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid h-[64%] w-[64%] place-items-center rounded-full border border-gold/40 bg-ink/50 backdrop-blur">
          <Compass
            className="h-20 w-20 text-gold animate-rotate-slow"
            strokeWidth={0.6}
          />
          <p className="absolute bottom-6 text-center text-[0.65rem] uppercase tracking-[0.34em] text-mist/70">
            WindHero · Est. ⌖
          </p>
        </div>
      </div>

      {(["N", "E", "S", "W"] as const).map((dir, i) => (
        <span
          key={dir}
          className="absolute font-mono text-[0.7rem] tracking-[0.2em] text-mist/60"
          style={{
            top: i === 0 ? "-4px" : i === 2 ? "auto" : "50%",
            bottom: i === 2 ? "-4px" : "auto",
            left: i === 3 ? "-6px" : i === 1 ? "auto" : "50%",
            right: i === 1 ? "-6px" : "auto",
            transform:
              i === 0 || i === 2
                ? "translateX(-50%)"
                : "translateY(-50%)",
          }}
        >
          {dir}
        </span>
      ))}
    </div>
  );
}
