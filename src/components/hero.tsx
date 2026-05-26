import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero —— Mediterranean Editorial · 赤子之心
 *
 * 核心意象：海平线之上，刚刚升起的太阳。
 * 留白为主；左下角是站长一句话签名，让首屏不像冷的产品介绍，而像一封信。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-paper text-ink">
      {/* ===== 远海渐变（蓝） + 远处地平线 + 一颗暖色的"朝阳" ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
        style={{
          height: "32%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(125,179,210,0.16) 35%, rgba(45,125,182,0.30) 100%)",
        }}
      />
      {/* 地平线 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -z-10"
        style={{
          bottom: "32%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(45,125,182,0.35) 25%, rgba(45,125,182,0.35) 75%, transparent 100%)",
        }}
      />
      {/* 朝阳：贴近地平线右上方 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 animate-fade-up"
        style={{
          right: "12%",
          bottom: "34%",
          width: "120px",
          height: "120px",
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(240,222,180,0.85) 0%, rgba(200,146,58,0.45) 45%, rgba(200,146,58,0) 75%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* ===== 主内容 ===== */}
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
        <div className="max-w-3xl animate-fade-up">
          <p className="horizon-mark">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-sun-deep">
              现代航海学院 · 自 2026 起
            </span>
          </p>

          <h1 className="display mt-7 text-balance text-[clamp(3rem,8.5vw,7rem)] leading-[1.02] text-ink">
            驾驭风的<span className="display-italic text-sea-deep">方向</span>。
          </h1>

          <p className="mt-6 font-mono text-[0.78rem] tracking-[0.36em] text-mist">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p className="mt-11 max-w-xl text-balance text-[1.06rem] leading-[1.92] text-ink-soft md:text-[1.14rem]">
            一所由「<span className="sun-note">从零开始的船长</span>」搭建的航海学院——
            学风、学海图、学船长的判断力。13 门课覆盖 RYA、ASA、IYT 三体系全部笔试。
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-ink px-7 text-[0.88rem] text-paper transition-colors hover:bg-sea-deep"
            >
              开始第一门课
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
        </div>
      </div>

      {/* ===== 底部坐标 strip ===== */}
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
