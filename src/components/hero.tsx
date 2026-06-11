import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const quickStarts = [
  {
    href: "/courses/reading-the-wind",
    label: "第一门课",
    title: "WH-101 读懂风",
  },
  {
    href: "/courses",
    label: "完整路径",
    title: "6 阶段课程地图",
  },
  {
    href: "/tools/wind-belts",
    label: "出发前",
    title: "全球风带查询",
  },
  {
    href: "/glossary",
    label: "查术语",
    title: "航海词典",
  },
];

/**
 * Hero —— Mediterranean Editorial · 赤子之心
 *
 * 核心意象：海平线之上，刚刚升起的太阳。
 * 留白为主；左下角是站长一句话签名，让首屏不像冷的产品介绍，而像一封信。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[660px] overflow-hidden bg-paper text-ink">
      <Image
        src="/images/generated/hero-ocean-training-v1.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[64%_50%]"
      />
      <div aria-hidden className="wh-image-wash -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-paper via-paper/70 to-transparent"
      />

      {/* ===== 主内容 ===== */}
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pb-12 pt-28 lg:px-10">
        <div className="max-w-3xl animate-fade-up">
          <p className="horizon-mark">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sun-deep">
              中文航海理论笔记 · 自 2026 起
            </span>
          </p>

          <h1 className="display mt-7 text-balance text-[clamp(3rem,8.5vw,7rem)] leading-[1.02] text-ink">
            驾驭风的<span className="display-italic text-sea-deep">方向</span>。
          </h1>

          <p className="mt-6 font-mono text-[0.78rem] tracking-[0.36em] text-mist">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p className="mt-11 max-w-xl text-balance text-[1.06rem] leading-[1.92] text-ink-soft md:text-[1.14rem]">
            我把自己从零学船长时最卡的地方整理出来：风怎么看，海图怎么算，
            证书怎么选。先学明白，再去学校上船实操。
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href="/courses/reading-the-wind"
              className="group inline-flex h-12 items-center gap-2 bg-ink px-7 text-[0.88rem] text-paper transition-colors hover:bg-sea-deep"
            >
              从 WH-101 开始
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/certifications"
              className="group inline-flex h-12 items-center gap-2 text-[0.88rem] text-ink-soft transition-colors hover:text-ink"
            >
              三体系对照
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>

          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-px bg-line/70 sm:grid-cols-4">
            {quickStarts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-paper/82 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-paper"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist">
                  {item.label}
                </span>
                <span className="mt-1 flex items-center justify-between gap-2 text-[0.86rem] text-ink">
                  {item.title}
                  <ArrowRight className="h-3 w-3 shrink-0 text-sea-deep transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="wh-instrument-panel mt-7 max-w-2xl px-5 py-4">
            <div className="wh-status-strip">
              <span>13 门理论课</span>
              <span>RYA / ASA / IYT 对照</span>
              <span>词典 · 案例 · 工具</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 底部坐标 strip ===== */}
      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 text-[0.7rem] text-mist lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}
