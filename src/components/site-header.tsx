"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navItems: { href: string; label: string }[] = [
  { href: "/courses", label: "课程" },
  { href: "/cases", label: "案例" },
  { href: "/glossary", label: "词典" },
  { href: "/certifications", label: "认证" },
  { href: "/schools", label: "学校" },
  { href: "/tools", label: "工具" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          aria-label="WindHero 首页"
          onClick={() => setOpen(false)}
          className="transition-opacity hover:opacity-80"
        >
          <Logo size="md" showTagline />
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-9 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.86rem] text-ink-soft transition-colors hover:text-ink",
                  active && "text-ink"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 right-0 mx-auto h-px w-4 origin-center scale-x-0 bg-sun transition-transform duration-500 ease-out",
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
            className="inline-flex h-9 items-center gap-2 border border-ink/80 px-4 text-[0.82rem] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            开始学习
          </Link>
        </div>

        <button
          type="button"
          aria-label="切换导航菜单"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center border border-line text-ink md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-navigation" className="border-t border-line bg-paper md:hidden">
          <nav aria-label="移动导航" className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-ink-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-10 items-center justify-center border border-ink text-[0.82rem] text-ink"
            >
              开始学习
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
