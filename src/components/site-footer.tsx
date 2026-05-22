import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

const footerNav: { title: string; items: { href: string; label: string }[] }[] =
  [
    {
      title: "Academy",
      items: [
        { href: "/courses", label: "Courses" },
        { href: "/courses#captain", label: "Captain Track" },
        { href: "/courses#weather", label: "Weather & Wind" },
      ],
    },
    {
      title: "Atlas",
      items: [
        { href: "/voyages", label: "Voyages" },
        { href: "/voyages#routes", label: "Open Routes" },
        { href: "/voyages#marinas", label: "Marinas" },
      ],
    },
    {
      title: "Story",
      items: [
        { href: "/journal", label: "Journal" },
        { href: "/manifesto", label: "Manifesto" },
        { href: "/about", label: "About" },
      ],
    },
  ];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div className="max-w-md">
          <p className="eyebrow">— Master the Wind</p>
          <h3 className="display mt-4 text-3xl text-sail">
            Sail the dispatch.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist/70">
            One letter a month: a new voyage, a weather pattern worth reading,
            and a captain&apos;s log from the WindHero crew. No spam, no port noise.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="eyebrow">{group.title}</p>
            <ul className="mt-5 space-y-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist/80 transition-colors hover:text-sail"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-mist/60 sm:flex-row sm:items-center lg:px-10">
          <p>© {new Date().getFullYear()} WindHero. Charted from the open sea.</p>
          <p className="font-mono tracking-[0.18em]">
            22°16′N · 114°09′E · OFFSHORE
          </p>
        </div>
      </div>
    </footer>
  );
}
