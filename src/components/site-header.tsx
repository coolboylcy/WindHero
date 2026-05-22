"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems: { href: string; label: string }[] = [
  { href: "/courses", label: "Courses" },
  { href: "/voyages", label: "Voyages" },
  { href: "/journal", label: "Journal" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="WindHero home"
          onClick={() => setOpen(false)}
        >
          <CompassMark className="h-7 w-7 text-gold transition-transform duration-700 ease-out group-hover:rotate-45" />
          <span className="display text-[1.35rem] leading-none">
            Wind<span className="text-gold">Hero</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.82rem] uppercase tracking-[0.22em] text-mist/70 transition-colors hover:text-sail",
                  active && "text-sail"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/courses"
            className="inline-flex h-10 items-center gap-2 border border-gold/60 px-5 text-[0.74rem] uppercase tracking-[0.26em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Enroll
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center border border-white/10 text-sail md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/5 bg-ink/95 md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.22em] text-mist/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center border border-gold/60 text-[0.74rem] uppercase tracking-[0.26em] text-gold"
            >
              Enroll
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function CompassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <circle cx="16" cy="16" r="13" opacity={0.55} />
      <circle cx="16" cy="16" r="9" opacity={0.4} />
      <path d="M16 3v6M16 23v6M3 16h6M23 16h6" opacity={0.7} />
      <path
        d="M16 7l2.6 8.2L16 25l-2.6-9.8z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
