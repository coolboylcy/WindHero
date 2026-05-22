import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

const footerNav: { title: string; items: { href: string; label: string }[] }[] =
  [
    {
      title: "学院",
      items: [
        { href: "/courses", label: "课程总览" },
        { href: "/courses#captains-mind", label: "船长之路" },
        { href: "/courses#weather-and-routing", label: "天气与航路" },
      ],
    },
    {
      title: "航海图",
      items: [
        { href: "/voyages", label: "航线" },
        { href: "/voyages#routes", label: "开放航段" },
        { href: "/voyages#marinas", label: "港口" },
      ],
    },
    {
      title: "故事",
      items: [
        { href: "/journal", label: "航海日志" },
        { href: "/manifesto", label: "宣言" },
        { href: "/about", label: "关于" },
      ],
    },
  ];

export function SiteFooter() {
  return (
    <footer className="relative mt-28 border-t border-line/70 bg-paper-soft/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-10">
        <div className="max-w-md">
          <p className="eyebrow">船长信</p>
          <h3 className="display mt-4 text-3xl text-ink">
            每月一封，从海上寄出。
          </h3>
          <p className="mt-3 text-sm leading-[1.85] text-ink-soft">
            一条新的航线、一段值得读的天气、一篇船员日志。
            不打扰、不喧哗，更不卖东西。
          </p>
          <div className="mt-7">
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
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-mist sm:flex-row sm:items-center lg:px-10">
          <p>© {new Date().getFullYear()} WindHero 逐风人</p>
          <p className="font-mono tracking-[0.12em]">
            22°16′N · 114°09′E
          </p>
        </div>
      </div>
    </footer>
  );
}
