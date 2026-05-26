import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { HorizonSunMark } from "@/components/logo";

const footerNav: { title: string; items: { href: string; label: string }[] }[] =
  [
    {
      title: "学院",
      items: [
        { href: "/courses", label: "全部课程" },
        { href: "/courses#intro", label: "入门阶段" },
        { href: "/courses#day-skipper", label: "日间船长" },
        { href: "/courses#ocean", label: "跨洋阶段" },
      ],
    },
    {
      title: "认证",
      items: [
        { href: "/certifications", label: "RYA · ASA · IYT 对比" },
        { href: "/schools", label: "全球认证学校" },
        { href: "/certifications#path", label: "学习路线图" },
      ],
    },
    {
      title: "工具",
      items: [
        { href: "/tools/wind-belts", label: "全球风带查询" },
        { href: "/tools/synoptic", label: "天气图读图" },
        { href: "/about", label: "关于站长" },
      ],
    },
  ];

export function SiteFooter() {
  return (
    <footer className="relative mt-28 border-t border-line/70 bg-paper-soft/40">
      {/* —— 顶部地平线装饰：暖色细线带朝阳 —— */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 pt-12 lg:px-10">
        <HorizonSunMark size={20} className="text-sun" />
        <div className="flex-1 h-px bg-line-warm/60" />
        <span className="font-mono text-[0.7rem] tracking-[0.22em] text-sun-deep">
          逐风人 · WindHero
        </span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-10">
        <div className="max-w-md">
          <p className="eyebrow">站长信 · 月刊</p>
          <h3 className="display mt-4 text-[1.85rem] leading-[1.15] text-ink">
            每月一封，
            <br />
            从海上寄出。
          </h3>
          <p className="mt-4 text-[0.92rem] leading-[1.85] text-ink-soft">
            新写完的一门课 · 上一次出海学到的事 · 推荐你读的一本书。
            不卖东西，不打扰你。
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
                    className="text-[0.88rem] text-ink-soft transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* —— 站长签名 + 一句格言 —— */}
      <div className="border-t border-line/60 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col items-baseline gap-3 sm:flex-row sm:items-end sm:justify-between">
            <blockquote className="display-italic max-w-2xl text-balance text-[1.15rem] leading-[1.55] text-ink md:text-[1.3rem]">
              「我们借的不是风的力，是风的方向。」
            </blockquote>
            <p className="font-mono text-[0.72rem] tracking-[0.16em] text-mist">
              —— 站长良辰，从零开始的船长
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-[0.74rem] text-mist sm:flex-row sm:items-center lg:px-10">
          <p>
            © {new Date().getFullYear()} WindHero 逐风人 · 内容版权由作者保留；
            源代码 MIT
          </p>
          <p className="font-mono tracking-[0.12em]">
            22°16′N · 114°09′E · 香港
          </p>
        </div>
      </div>
    </footer>
  );
}
