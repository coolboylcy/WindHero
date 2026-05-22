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
    <footer className="relative mt-24 border-t border-white/5 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div className="max-w-md">
          <p className="eyebrow">— Master the Wind 驾驭风的方向</p>
          <h3 className="display mt-4 text-3xl text-sail">
            读一封船长信。
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist/70">
            每月一封：一条新的航线、一段值得读的天气、一篇 WindHero
            船员的航海日志。不打扰，不喧哗，不卖东西。
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
          <p>© {new Date().getFullYear()} WindHero 逐风人 · 自外海起航</p>
          <p className="font-mono tracking-[0.18em]">
            22°16′N · 114°09′E · 外海
          </p>
        </div>
      </div>
    </footer>
  );
}
