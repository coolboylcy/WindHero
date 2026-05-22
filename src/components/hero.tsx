import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Full-bleed hero —— 深海军蓝海面 + 呼吸的白太阳 + 漂移的三角帆 + 远景小帆视差。
 * 整层用纯 CSS keyframes，无 client JS；支持 prefers-reduced-motion。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <Sky />
      <SunWithGlow />
      <DistantSails />
      <Horizon />
      <ForegroundSail />
      <ShimmerLayer />
      <Vignette />

      {/* —— 文字层 —— 左下，电影海报式 */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 pt-28 lg:px-10 lg:pb-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="eyebrow !text-paper/65">
            现代航海学院 · 自 2026 起
          </p>

          <h1 className="display mt-7 text-balance text-[clamp(2.8rem,7vw,6rem)] leading-[1.04] text-paper">
            驾驭风的方向。
          </h1>

          <p className="mt-5 font-mono text-[0.74rem] tracking-[0.34em] text-paper/55">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p className="mt-9 max-w-xl text-balance text-[1.05rem] leading-[1.85] text-paper/80 md:text-[1.12rem]">
            一所教你读懂海的学院——风、天气、航路、船长的判断力。
            为那些想用自己的方向穿过世界的人而建。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-paper px-7 text-[0.88rem] text-ink transition-colors hover:bg-sea-soft"
            >
              开始训练
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-12 items-center gap-2 border border-paper/40 px-6 text-[0.88rem] text-paper transition-colors hover:border-paper hover:bg-paper/5"
            >
              阅读宣言
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>
        </div>
      </div>

      {/* —— 底部坐标 strip —— */}
      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 text-[0.7rem] text-paper/55 lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}

/** 天空与海的渐变。地平线在 58% 处。 */
function Sky() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* 天：墨夜蓝 → 海军 → 暖白晨光 */}
      <div
        className="absolute inset-x-0 top-0 h-[58%]"
        style={{
          background:
            "linear-gradient(180deg, #061629 0%, #0a2241 35%, #163d63 75%, #d8c8b0 100%)",
        }}
      />
      {/* 海：从地平线起逐渐变深 */}
      <div
        className="absolute inset-x-0 bottom-0 top-[58%]"
        style={{
          background:
            "linear-gradient(180deg, #1a4e7a 0%, #0e3252 50%, #061d33 100%)",
        }}
      />
    </div>
  );
}

/** 太阳（白盘 + 光晕 + 海面倒影）。 */
function SunWithGlow() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-[40%] -z-[5] flex justify-center"
      style={{ transform: "translateY(-50%)" }}
    >
      <div className="relative">
        {/* 外层光晕 */}
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,237,210,0.55)_0%,rgba(255,237,210,0.18)_45%,transparent_70%)] animate-glow-breathe" />
        {/* 太阳盘 */}
        <div className="relative h-[88px] w-[88px] rounded-full bg-[#f8efdc] shadow-[0_0_60px_20px_rgba(248,239,220,0.45)] animate-sun-breathe" />
      </div>
    </div>
  );
}

/** 远景小帆，三只，不同距离 + 不同动画相位。 */
function DistantSails() {
  const sails = [
    { left: "16%", top: "53%", scale: 0.42, delay: "-2s", opacity: 0.55 },
    { left: "72%", top: "55%", scale: 0.34, delay: "-7s", opacity: 0.45 },
    { left: "86%", top: "51%", scale: 0.28, delay: "-11s", opacity: 0.35 },
  ];
  return (
    <div aria-hidden className="absolute inset-0 -z-[4]">
      {sails.map((s, i) => (
        <div
          key={i}
          className="absolute animate-sail-distant"
          style={{
            left: s.left,
            top: s.top,
            transform: `scale(${s.scale})`,
            opacity: s.opacity,
            animationDelay: s.delay,
          }}
        >
          <Sail color="rgba(251,251,248,0.92)" />
        </div>
      ))}
    </div>
  );
}

/** 水面：横向漂移的波纹 + 一条主地平线。 */
function Horizon() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-[58%] -z-[3]">
      {/* 主地平线 —— 一根极细的暖白线 */}
      <div className="h-px w-full bg-[#e8d9b8]/40" />
      {/* 阳光在海面拉出的一道亮带（柱形高光） */}
      <div className="pointer-events-none mx-auto h-32 w-[180px] -translate-y-1 bg-[linear-gradient(180deg,rgba(248,239,220,0.55)_0%,transparent_85%)] blur-[2px] animate-shimmer" />
      {/* 远处水面的波纹（两层不同速度） */}
      <svg
        className="absolute inset-x-0 top-3 h-10 w-[200%] animate-wave-shift opacity-50"
        viewBox="0 0 1600 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 Q 80 14 160 20 T 320 20 T 480 20 T 640 20 T 800 20 T 960 20 T 1120 20 T 1280 20 T 1440 20 T 1600 20"
          fill="none"
          stroke="rgba(232,217,184,0.35)"
          strokeWidth="0.9"
        />
      </svg>
      <svg
        className="absolute inset-x-0 top-10 h-10 w-[200%] animate-wave-shift opacity-35"
        viewBox="0 0 1600 40"
        preserveAspectRatio="none"
        style={{ animationDuration: "26s", animationDirection: "reverse" }}
      >
        <path
          d="M0 20 Q 100 26 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20 T 1400 20 T 1600 20"
          fill="none"
          stroke="rgba(232,217,184,0.28)"
          strokeWidth="0.7"
        />
      </svg>
    </div>
  );
}

/** 前景三角帆 —— 视觉主角，慢慢漂移。 */
function ForegroundSail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[58%] top-[56%] -z-[2] hidden sm:block"
    >
      <div className="animate-sail-drift">
        <div className="origin-bottom" style={{ transform: "scale(1.4)" }}>
          <Sail color="#fbfbf8" withMast />
        </div>
      </div>
    </div>
  );
}

/** 顶部 / 底部 的极浅暗角，让文字层在大底图上读起来更稳。 */
function Vignette() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1]"
      style={{
        background:
          "radial-gradient(ellipse at 30% 80%, rgba(0,0,0,0.45) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 22%, transparent 70%, rgba(0,0,0,0.25) 100%)",
      }}
    />
  );
}

/** 海面反光颗粒——极简两三个小光斑。 */
function ShimmerLayer() {
  return (
    <div aria-hidden className="absolute inset-0 -z-[3]">
      {[
        { left: "44%", top: "62%", delay: "-0.5s" },
        { left: "52%", top: "67%", delay: "-1.8s" },
        { left: "48%", top: "73%", delay: "-3s" },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#f8efdc] animate-shimmer"
          style={{ left: p.left, top: p.top, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}

/** 抽象三角帆——一片帆 + 一根桅杆。 */
function Sail({
  color,
  withMast = false,
}: {
  color: string;
  withMast?: boolean;
}) {
  return (
    <svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 12 L92 134 L28 134 Z"
        fill={color}
        style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))" }}
      />
      {withMast ? (
        <line
          x1="60"
          y1="8"
          x2="60"
          y2="148"
          stroke={color}
          strokeWidth="1"
          opacity="0.55"
        />
      ) : null}
      {/* 船体一小段，作为帆下的暗示 */}
      <rect
        x="40"
        y="134"
        width="40"
        height="3.5"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}
