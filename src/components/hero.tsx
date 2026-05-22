import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line/60">
      <SunBleachedBackground />

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-end gap-16 px-6 pb-24 pt-32 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-24 lg:px-10">
        <div className="animate-fade-up">
          <p className="eyebrow">现代航海学院 · 自 2026 起</p>

          <h1 className="display mt-7 text-balance text-[clamp(2.6rem,6.4vw,5rem)] text-ink">
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
          <HorizonCard />
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

/** 极简的"远处地平线"——一条贴着画面下沿的雾蓝色带，配上一层晨光的暖色径向。 */
function SunBleachedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-paper" />
      <div className="absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_at_top,rgba(199,126,94,0.10),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#cfd9df] via-[#dfe2da]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-[42%] h-px bg-line/70" />
    </div>
  );
}

/** "地平线卡片"——一帧静止的画面，代替之前的旋转罗盘。 */
function HorizonCard() {
  return (
    <figure className="relative mx-auto max-w-[420px] animate-drift">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
        {/* sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e9e2d2] via-[#dee1d8] to-[#bcccd2]" />
        {/* sun */}
        <div className="absolute left-1/2 top-[36%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#e8c69b]/70 blur-[2px]" />
        <div className="absolute left-1/2 top-[36%] h-24 w-24 -translate-x-1/2 rounded-full border border-[#c98e5e]/40" />
        {/* horizon line */}
        <div className="absolute left-0 right-0 top-[58%] h-px bg-ink/20" />
        {/* sea */}
        <div className="absolute inset-x-0 bottom-0 top-[58%] bg-gradient-to-b from-[#7a98a7] via-[#5b7e92] to-[#3e6376]" />
        {/* sail — a single triangle */}
        <svg
          viewBox="0 0 100 100"
          className="absolute left-[58%] top-[52%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-paper"
        >
          <path
            d="M50 18 L62 78 L38 78 Z"
            fill="currentColor"
            opacity="0.92"
          />
          <line
            x1="50"
            y1="14"
            x2="50"
            y2="82"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.55"
          />
        </svg>
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between text-[0.68rem] tracking-[0.22em] text-mist">
        <span>清晨 · 五点四十六分</span>
        <span className="font-mono">06°W / 8 kn</span>
      </figcaption>
    </figure>
  );
}
