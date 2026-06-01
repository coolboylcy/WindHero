import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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

          <div className="wh-instrument-panel mt-12 max-w-2xl px-5 py-4">
            <div className="wh-status-strip">
              <span>13 门原创课程</span>
              <span>RYA / ASA / IYT 对照</span>
              <span>工具 · 图解 · 模拟考</span>
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
