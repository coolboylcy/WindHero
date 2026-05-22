import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 明亮地中海 Hero：清晨阳光下的爱琴海。
 * 船体锚定在水面（只轻微 bob），只有帆顶在风里画弧——物理上正确。
 */
export function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[680px] overflow-hidden text-paper">
      <Sky />
      <SunWithGlow />
      <SunGlade />
      <DistantSails />
      <Horizon />
      <Boat />
      <NearWaves />
      <ShimmerLayer />
      <TextBackdrop />

      {/* —— 文字层 —— */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-28 pt-28 lg:px-10 lg:pb-32">
        <div className="max-w-2xl animate-fade-up">
          <p
            className="eyebrow"
            style={{ color: "rgba(251,251,248,0.82)" }}
          >
            现代航海学院 · 自 2026 起
          </p>

          <h1
            className="display mt-7 text-balance text-[clamp(2.8rem,7vw,6rem)] leading-[1.04]"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 28px rgba(0,30,55,0.55)",
            }}
          >
            驾驭风的方向。
          </h1>

          <p className="mt-5 font-mono text-[0.74rem] tracking-[0.34em] text-paper/75">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND
          </p>

          <p
            className="mt-9 max-w-xl text-balance text-[1.06rem] leading-[1.85] md:text-[1.14rem]"
            style={{
              color: "rgba(251,251,248,0.95)",
              textShadow: "0 1px 14px rgba(0,30,55,0.5)",
            }}
          >
            一所教你读懂海的学院——风、天气、航路、船长的判断力。
            为那些想用自己的方向穿过世界的人而建。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="group inline-flex h-12 items-center gap-2 bg-paper px-7 text-[0.88rem] text-ink shadow-[0_12px_36px_rgba(0,30,55,0.35)] transition-colors hover:bg-sea-soft"
            >
              开始训练
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/manifesto"
              className="group inline-flex h-12 items-center gap-2 border border-paper/55 px-6 text-[0.88rem] text-paper backdrop-blur-sm transition-colors hover:border-paper hover:bg-paper/10"
            >
              阅读宣言
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-center justify-between px-6 text-[0.7rem] text-paper/75 lg:px-10">
        <span className="font-mono tracking-[0.2em]">22°16′N</span>
        <span className="font-mono tracking-[0.32em]">
          航向 037° · 真北
        </span>
        <span className="font-mono tracking-[0.2em]">114°09′E</span>
      </div>
    </section>
  );
}

/** 明亮地中海 —— 清亮天蓝、暖白晨光带、清亮海蓝。地平线 58%。 */
function Sky() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* 天空：从清亮天蓝渐变到地平线暖白 */}
      <div
        className="absolute inset-x-0 top-0 h-[58%]"
        style={{
          background:
            "linear-gradient(180deg, #5fa3c5 0%, #88bfd9 35%, #c5dae6 70%, #f0deb6 100%)",
        }}
      />
      {/* 海：清亮海蓝渐变到稍深的海底 */}
      <div
        className="absolute inset-x-0 bottom-0 top-[58%]"
        style={{
          background:
            "linear-gradient(180deg, #3e92b8 0%, #1d5d7e 55%, #0e3a55 100%)",
        }}
      />
    </div>
  );
}

/** 太阳 + 光晕 */
function SunWithGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[5]"
      style={{ right: "24%", top: "30%" }}
    >
      <div className="relative">
        <div
          className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow-breathe"
          style={{
            background:
              "radial-gradient(circle, rgba(255,243,217,0.78) 0%, rgba(255,237,205,0.28) 45%, transparent 75%)",
          }}
        />
        <div
          className="relative h-[104px] w-[104px] rounded-full animate-sun-breathe"
          style={{
            background: "#fff6e0",
            boxShadow: "0 0 100px 40px rgba(255,243,217,0.6)",
          }}
        />
      </div>
    </div>
  );
}

/** 太阳在海面拉出的反光柱 */
function SunGlade() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[4]"
      style={{ right: "22%", top: "58%", width: "150px", height: "30vh" }}
    >
      <div
        className="h-full w-full animate-sun-glade"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,243,217,0.78) 0%, rgba(255,243,217,0.3) 35%, transparent 90%)",
          filter: "blur(3px)",
        }}
      />
    </div>
  );
}

/** 远景三只小帆 */
function DistantSails() {
  const sails = [
    { left: "12%", top: "52%", scale: 0.46, delay: "-1s", opacity: 0.7 },
    { left: "38%", top: "54%", scale: 0.36, delay: "-5s", opacity: 0.56 },
    { left: "84%", top: "53%", scale: 0.3, delay: "-7s", opacity: 0.5 },
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
          <DistantSailMark color="rgba(251,251,248,0.95)" />
        </div>
      ))}
    </div>
  );
}

/** 中距海面——细波纹两层 + 主地平线 */
function Horizon() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-[58%] -z-[3]">
      <div className="h-px w-full bg-[#f0deb6]/55" />
      <svg
        className="absolute inset-x-0 top-3 h-12 w-[200%] animate-wave-shift opacity-65"
        viewBox="0 0 1600 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0 25 Q 50 14 100 25 T 200 25 T 300 25 T 400 25 T 500 25 T 600 25 T 700 25 T 800 25 T 900 25 T 1000 25 T 1100 25 T 1200 25 T 1300 25 T 1400 25 T 1500 25 T 1600 25"
          fill="none"
          stroke="rgba(255,243,217,0.55)"
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
          stroke="rgba(255,243,217,0.4)"
          strokeWidth="0.85"
        />
      </svg>
    </div>
  );
}

/** 近景大波浪——贴底两层 */
function NearWaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-[2]"
      style={{ height: "26vh" }}
    >
      <svg
        className="absolute inset-x-0 bottom-[12vh] h-24 w-[220%] animate-wave-rise"
        viewBox="0 0 2200 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 Q 110 20 220 40 T 440 40 T 660 40 T 880 40 T 1100 40 T 1320 40 T 1540 40 T 1760 40 T 1980 40 T 2200 40 L 2200 80 L 0 80 Z"
          fill="rgba(20,77,108,0.55)"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-0 h-[16vh] w-[220%] animate-wave-rise"
        viewBox="0 0 2200 120"
        preserveAspectRatio="none"
        style={{ animationDuration: "5.5s", animationDelay: "-1s" }}
      >
        <path
          d="M0 60 Q 110 30 220 60 T 440 60 T 660 60 T 880 60 T 1100 60 T 1320 60 T 1540 60 T 1760 60 T 1980 60 T 2200 60 L 2200 120 L 0 120 Z"
          fill="rgba(10,46,72,0.88)"
        />
      </svg>
    </div>
  );
}

/** —— 帆船：船体锚定在水面（只 bob），帆只是从桅杆基座上下摆 —— */
function Boat() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -z-[2] hidden sm:block"
      style={{
        right: "11%",
        // section 100vh，地平线 58%——也就是 bottom 42%。船体上沿对齐水面。
        bottom: "calc(42% - 6px)",
      }}
    >
      <div className="relative animate-hull-bob">
        {/* 帆——从桅杆基座往上长 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom animate-sail-drift"
        >
          <SailOnly color="#fbfbf8" scale={1.55} />
        </div>
        {/* 船体——明确的小船剪影，锚定在水面 */}
        <Hull />
      </div>
      {/* 船下的水花/船迹——与船同步轻浮 */}
      <div
        className="absolute left-1/2 -translate-x-1/2 animate-hull-bob"
        style={{ bottom: "-22px", animationDelay: "-0.6s" }}
      >
        <Wake />
      </div>
    </div>
  );
}

/** 一片帆（不含船体），origin 在底部桅杆基座。 */
function SailOnly({ color, scale = 1 }: { color: string; scale?: number }) {
  return (
    <svg
      width={120 * scale}
      height={150 * scale}
      viewBox="0 0 120 150"
      fill="none"
    >
      <path
        d="M60 6 L94 142 L26 142 Z"
        fill={color}
        style={{ filter: "drop-shadow(0 8px 22px rgba(0,30,55,0.35))" }}
      />
      <line
        x1="60"
        y1="0"
        x2="60"
        y2="146"
        stroke={color}
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

/** 一只小船的剪影 —— 弯底木船，明显的"船"形状。 */
function Hull() {
  return (
    <svg width="160" height="32" viewBox="0 0 160 32" fill="none">
      <path
        d="M6 4 Q 80 38 154 4 L 142 22 Q 80 30 18 22 Z"
        fill="#fbfbf8"
        style={{ filter: "drop-shadow(0 6px 18px rgba(0,30,55,0.45))" }}
      />
      {/* 船舷上一道阴影线 */}
      <path
        d="M14 7 Q 80 32 146 7"
        fill="none"
        stroke="rgba(14,37,64,0.25)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/** 船底散开的水花弧线 + 船头反光 */
function Wake() {
  return (
    <svg width="220" height="42" viewBox="0 0 220 42" fill="none">
      <path
        d="M14 18 Q 110 38 206 18"
        fill="none"
        stroke="rgba(251,251,248,0.7)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M34 26 Q 110 40 186 26"
        fill="none"
        stroke="rgba(251,251,248,0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M54 33 Q 110 41 166 33"
        fill="none"
        stroke="rgba(251,251,248,0.28)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <ellipse cx="110" cy="12" rx="18" ry="3" fill="rgba(255,243,217,0.65)" />
    </svg>
  );
}

/** 远景小帆——三角形 + 一小段船体 */
function DistantSailMark({ color }: { color: string }) {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
      <path d="M60 14 L92 134 L28 134 Z" fill={color} opacity="0.95" />
      <path d="M30 134 Q 60 144 90 134 L 84 138 Q 60 144 36 138 Z" fill={color} opacity="0.85" />
    </svg>
  );
}

/** 海面反光颗粒 */
function ShimmerLayer() {
  return (
    <div aria-hidden className="absolute inset-0 -z-[3]">
      {[
        { left: "42%", top: "61%", delay: "-0.1s", size: 4 },
        { left: "52%", top: "64%", delay: "-0.6s", size: 3 },
        { left: "48%", top: "68%", delay: "-1.2s", size: 5 },
        { left: "56%", top: "71%", delay: "-1.8s", size: 3 },
        { left: "46%", top: "74%", delay: "-2.2s", size: 4 },
        { left: "62%", top: "66%", delay: "-1.5s", size: 3 },
        { left: "36%", top: "69%", delay: "-2.5s", size: 4 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-shimmer"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "#fff6e0",
            boxShadow: "0 0 10px rgba(255,246,224,0.8)",
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/** 文字层的底色——左→右大幅渐变压暗，匹配明亮底色 */
function TextBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1]"
      style={{
        background: [
          // 主：左→右深海军蓝渐变（与海色协调，不用纯黑）
          "linear-gradient(95deg, rgba(8,32,58,0.78) 0%, rgba(8,32,58,0.62) 30%, rgba(8,32,58,0.32) 55%, rgba(8,32,58,0.08) 75%, transparent 90%)",
          // 文字所在左下角椭圆再加深
          "radial-gradient(ellipse 60% 55% at 14% 78%, rgba(0,20,40,0.45) 0%, rgba(0,20,40,0.2) 45%, transparent 75%)",
          // 顶部一道极淡暗化让 header 浮起时不刺眼
          "linear-gradient(180deg, rgba(0,20,40,0.18) 0%, transparent 14%)",
        ].join(", "),
      }}
    />
  );
}
