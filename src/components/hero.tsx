import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 全屏 Hero：深海军蓝海面 + 呼吸的太阳 + 漂移的三角帆 + 近景大波浪 +
 * 左下角"舞台暗化"保证文字读起来稳。纯 CSS 动画。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-ink text-paper">
      <Sky />
      <SunWithGlow />
      <SunGlade />
      <DistantSails />
      <Horizon />
      <ForegroundSail />
      <NearWaves />
      <ShimmerLayer />
      <Spotlight />

      {/* —— 文字层 —— */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 pt-28 lg:px-10 lg:pb-32">
        <div className="max-w-2xl animate-fade-up">
          <p
            className="eyebrow"
            style={{ color: "rgba(251,251,248,0.78)" }}
          >
            现代航海学院 · 自 2026 起
          </p>

          <h1
            className="display mt-7 text-balance text-[clamp(2.8rem,7vw,6rem)] leading-[1.04]"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            }}
          >
            驾驭风的方向。
          </h1>

          <p className="mt-5 font-mono text-[0.74rem] tracking-[0.34em] text-paper/70">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p
            className="mt-9 max-w-xl text-balance text-[1.06rem] leading-[1.85] md:text-[1.14rem]"
            style={{
              color: "rgba(251,251,248,0.94)",
              textShadow: "0 1px 12px rgba(0,0,0,0.45)",
            }}
          >
            一所教你读懂海的学院——风、天气、航路、船长的判断力。
            为那些想用自己的方向穿过世界的人而建。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-paper px-7 text-[0.88rem] text-ink shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors hover:bg-sea-soft"
            >
              开始训练
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-12 items-center gap-2 border border-paper/50 bg-paper/0 px-6 text-[0.88rem] text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10"
            >
              阅读宣言
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>
        </div>
      </div>

      {/* —— 底部坐标 strip —— */}
      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 text-[0.7rem] text-paper/65 lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}

/** 天空与海。地平线 56% 处。底色压得比之前更深。 */
function Sky() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div
        className="absolute inset-x-0 top-0 h-[56%]"
        style={{
          background:
            "linear-gradient(180deg, #030d1d 0%, #08213e 30%, #143b62 70%, #c9b89a 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 top-[56%]"
        style={{
          background:
            "linear-gradient(180deg, #1a4c78 0%, #0b2c4a 45%, #03121f 100%)",
        }}
      />
    </div>
  );
}

/** 太阳——偏右上，给左侧文字让位置。 */
function SunWithGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[5]"
      style={{ right: "26%", top: "32%" }}
    >
      <div className="relative">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,237,210,0.7)_0%,rgba(255,237,210,0.22)_45%,transparent_72%)] animate-glow-breathe" />
        <div className="relative h-[96px] w-[96px] rounded-full bg-[#fbeed3] shadow-[0_0_80px_30px_rgba(251,238,211,0.55)] animate-sun-breathe" />
      </div>
    </div>
  );
}

/** 太阳在海面拉出的反光柱——从地平线向下，会摆动。 */
function SunGlade() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[4]"
      style={{ right: "24%", top: "56%", width: "140px", height: "32vh" }}
    >
      <div
        className="h-full w-full animate-sun-glade"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,238,211,0.65) 0%, rgba(251,238,211,0.25) 35%, transparent 92%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

/** 远景三只小帆，不同距离 + 不同动画相位。 */
function DistantSails() {
  const sails = [
    { left: "12%", top: "51%", scale: 0.46, delay: "-1s", opacity: 0.62 },
    { left: "38%", top: "53%", scale: 0.36, delay: "-5s", opacity: 0.5 },
    { left: "82%", top: "52%", scale: 0.3, delay: "-7s", opacity: 0.42 },
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
          <Sail color="rgba(251,251,248,0.95)" />
        </div>
      ))}
    </div>
  );
}

/** 中距海面——细波纹两层 + 主地平线。 */
function Horizon() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-[56%] -z-[3]">
      <div className="h-px w-full bg-[#e8d9b8]/45" />
      <svg
        className="absolute inset-x-0 top-3 h-12 w-[200%] animate-wave-shift opacity-65"
        viewBox="0 0 1600 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0 25 Q 50 14 100 25 T 200 25 T 300 25 T 400 25 T 500 25 T 600 25 T 700 25 T 800 25 T 900 25 T 1000 25 T 1100 25 T 1200 25 T 1300 25 T 1400 25 T 1500 25 T 1600 25"
          fill="none"
          stroke="rgba(232,217,184,0.55)"
          strokeWidth="1.1"
        />
      </svg>
      <svg
        className="absolute inset-x-0 top-10 h-12 w-[200%] animate-wave-shift opacity-45"
        viewBox="0 0 1600 50"
        preserveAspectRatio="none"
        style={{ animationDuration: "14s", animationDirection: "reverse" }}
      >
        <path
          d="M0 25 Q 70 32 140 25 T 280 25 T 420 25 T 560 25 T 700 25 T 840 25 T 980 25 T 1120 25 T 1260 25 T 1400 25 T 1540 25 T 1600 25"
          fill="none"
          stroke="rgba(232,217,184,0.4)"
          strokeWidth="0.85"
        />
      </svg>
    </div>
  );
}

/** 近景大波浪——贴着画面底部，明显的滚动 + 上下浪涌。 */
function NearWaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-[2]"
      style={{ height: "22vh" }}
    >
      {/* 远一点的层 */}
      <svg
        className="absolute inset-x-0 bottom-[10vh] h-24 w-[220%] animate-wave-rise"
        viewBox="0 0 2200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 Q 110 20 220 40 T 440 40 T 660 40 T 880 40 T 1100 40 T 1320 40 T 1540 40 T 1760 40 T 1980 40 T 2200 40 L 2200 80 L 0 80 Z"
          fill="rgba(8,32,58,0.55)"
        />
      </svg>
      {/* 主前景大波浪 */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[14vh] w-[220%] animate-wave-rise"
        viewBox="0 0 2200 120"
        preserveAspectRatio="none"
        style={{ animationDuration: "5.5s", animationDelay: "-1s" }}
      >
        <path
          d="M0 60 Q 110 30 220 60 T 440 60 T 660 60 T 880 60 T 1100 60 T 1320 60 T 1540 60 T 1760 60 T 1980 60 T 2200 60 L 2200 120 L 0 120 Z"
          fill="rgba(3,15,28,0.85)"
        />
      </svg>
    </div>
  );
}

/** 前景大三角帆——视觉主角，振幅明显。 */
function ForegroundSail() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[2] hidden sm:block"
      style={{ right: "10%", top: "44%" }}
    >
      <div className="animate-sail-drift">
        <div className="origin-bottom" style={{ transform: "scale(1.6)" }}>
          <Sail color="#fbfbf8" withMast />
        </div>
      </div>
    </div>
  );
}

/** 海面反光颗粒——更密、更亮、更明显的闪烁。 */
function ShimmerLayer() {
  return (
    <div aria-hidden className="absolute inset-0 -z-[3]">
      {[
        { left: "42%", top: "60%", delay: "-0.1s", size: 4 },
        { left: "52%", top: "63%", delay: "-0.6s", size: 3 },
        { left: "48%", top: "67%", delay: "-1.2s", size: 5 },
        { left: "56%", top: "70%", delay: "-1.8s", size: 3 },
        { left: "46%", top: "73%", delay: "-2.2s", size: 4 },
        { left: "62%", top: "65%", delay: "-1.5s", size: 3 },
        { left: "36%", top: "68%", delay: "-2.5s", size: 4 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#fbeed3] animate-shimmer"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            boxShadow: "0 0 8px rgba(251,238,211,0.7)",
          }}
        />
      ))}
    </div>
  );
}

/** 左下角"舞台聚光灯"暗化——让文字层从画面中干净地浮出来。 */
function Spotlight() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1]"
      style={{
        background: [
          // 左下角强暗化（文字所在）
          "radial-gradient(ellipse 70% 60% at 18% 92%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 35%, transparent 70%)",
          // 整体底部稳定暗化
          "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, transparent 18%, transparent 60%, rgba(0,0,0,0.35) 100%)",
          // 顶部一道极淡暗化（让 header 浮在 hero 上时不刺眼）
          "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 14%)",
        ].join(", "),
      }}
    />
  );
}

/** 抽象三角帆 + 船身一段。 */
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
        style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.32))" }}
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
      <rect
        x="38"
        y="134"
        width="44"
        height="4"
        fill={color}
        opacity="0.92"
      />
    </svg>
  );
}
