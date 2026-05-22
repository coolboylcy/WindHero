import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 极简 Hero —— 全幅留白、一道远处的海作为唯一意象、文字为主角。
 * 不做任何动画（除了进入时的 fade-up）。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-paper text-ink">
      {/* 远处的海 —— 一道极淡的渐变 + 一根细线，全部就这点。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
        style={{
          height: "30%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(125,179,210,0.18) 35%, rgba(45,125,182,0.32) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-10"
        style={{
          bottom: "30%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(45,125,182,0.35) 30%, rgba(45,125,182,0.35) 70%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow">现代航海学院 · 自 2026 起</p>

          <h1 className="display mt-8 text-balance text-[clamp(3rem,8vw,6.5rem)] leading-[1.02] text-ink">
            驾驭风的方向。
          </h1>

          <p className="mt-6 font-mono text-[0.78rem] tracking-[0.36em] text-mist">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p className="mt-12 max-w-xl text-balance text-[1.06rem] leading-[1.92] text-ink-soft md:text-[1.14rem]">
            一所教你读懂海的学院——风、天气、航路、船长的判断力。
            为那些想用自己的方向穿过世界的人而建。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-ink px-7 text-[0.88rem] text-paper transition-colors hover:bg-sea-deep"
            >
              开始训练
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-12 items-center gap-2 text-[0.88rem] text-ink-soft transition-colors hover:text-ink"
            >
              阅读宣言
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>
        </div>
      </div>

      {/* 底部坐标 strip */}
      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 text-[0.7rem] text-mist lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}
