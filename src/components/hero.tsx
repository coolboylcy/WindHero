import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/60">
      <BackgroundWash />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-end gap-16 px-6 pb-24 pt-32 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-24 lg:px-10">
        <div className="animate-fade-up">
          <p className="eyebrow">现代航海学院 · 自 2026 起</p>

          <h1 className="display mt-7 text-balance text-[clamp(2.6rem,6.4vw,5.2rem)] text-ink">
            驾驭风的方向。
          </h1>

          <p className="mt-4 font-mono text-[0.72rem] tracking-[0.32em] text-mist">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p className="mt-10 max-w-xl text-balance text-[1.05rem] leading-[1.85] text-ink-soft md:text-[1.12rem]">
            WindHero 是一所教你读懂海的学院——风、天气、航路、船长的判断力。
            不是俱乐部，也不是网红打卡。
            <br />
            我们为那些想用自己的方向穿过世界的人而建。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-11 items-center gap-2 bg-ink px-6 text-[0.86rem] text-paper transition-colors hover:bg-sea-deep"
            >
              开始训练
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-11 items-center gap-2 text-[0.86rem] text-ink-soft transition-colors hover:text-ink"
            >
              阅读宣言
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>
        </div>

        <aside className="hidden lg:block">
          <SeaCard />
        </aside>
      </div>

      <div className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center justify-between px-6 text-[0.7rem] text-mist lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}

/** 纯净的浅冷底，远处一道极淡的海蓝。无暖调、无径向晕。 */
function BackgroundWash() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-paper" />
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-sea-soft/60 via-sea-soft/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-[36%] h-px bg-line/70" />
    </div>
  );
}

/** 替代之前的"地平线卡片"——一块纯净的深海军蓝面板，
    上面一条细线、一颗白色太阳、一支白色三角帆。
    像 Aman / Loro Piana 那种"高级、安静、有自信"的视觉。 */
function SeaCard() {
  return (
    <figure className="relative mx-auto max-w-[420px] animate-drift">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        {/* 远处的海面渐变：海军蓝 → 海蓝 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f38] via-[#143a5e] to-[#1d5687]" />

        {/* 一颗白色的太阳 */}
        <div className="absolute left-1/2 top-[28%] h-14 w-14 -translate-x-1/2 rounded-full bg-paper/95" />

        {/* 地平线 —— 一根白色细线 */}
        <div className="absolute left-[10%] right-[10%] top-[44%] h-px bg-paper/60" />

        {/* 白色三角帆 */}
        <svg
          viewBox="0 0 100 100"
          className="absolute left-1/2 top-[58%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-paper"
        >
          <path
            d="M50 14 L66 80 L34 80 Z"
            fill="currentColor"
            opacity="0.96"
          />
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="84"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.45"
          />
        </svg>

        {/* 右下角极细的角标 */}
        <p className="absolute bottom-5 left-5 font-mono text-[0.6rem] tracking-[0.24em] text-paper/70">
          WINDHERO
        </p>
        <p className="absolute bottom-5 right-5 font-mono text-[0.6rem] tracking-[0.18em] text-paper/55">
          06°W · 8 kn
        </p>
      </div>
      <figcaption className="mt-4 text-[0.7rem] tracking-[0.18em] text-mist">
        清晨 · 五点四十六分
      </figcaption>
    </figure>
  );
}
