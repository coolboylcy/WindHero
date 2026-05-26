import { cn } from "@/lib/utils";

/**
 * WindHero 品牌标识系统 · v8
 *
 * 由两个独立又互补的部分组成：
 *
 * 1) HorizonSunMark
 *    破晓时刻——朝阳浮于海平线之上，下方一抹波纹。
 *    几何极简、单色可缩放、从 16px favicon 到 hero 大尺寸都好用。
 *    用色：默认 sun-gold（赤子之心）；可被 className/text-* 覆盖。
 *
 * 2) WordMark
 *    "WindHero" —— W 与 H 两个对称的视觉锚点。
 *    字体 Fraunces 500 / OPSZ 96 / SOFT 30，tracking 收紧到 -0.018em，
 *    让两个大写字母在视觉上"靠拢"成一个词。
 *    "Wind" 用 ink（深海军 · 理性 / 技术）。
 *    "Hero" 用 sea-deep（爱琴海蓝 · 理想 / 赤子之心）。
 *
 * 提供两种排布：
 *  - horizontal（默认）：mark 在左，wordmark 在右
 *  - stacked：mark 居上、wordmark 居下，给 OG image / 名片 / 海报用
 */

type Size = "sm" | "md" | "lg" | "xl";
type Variant = "horizontal" | "stacked";

const SIZE_MAP = {
  sm: {
    mark: 16,
    word: "text-[1.05rem]",
    tag: "text-[0.58rem]",
    gap: "gap-2",
  },
  md: {
    mark: 22,
    word: "text-[1.4rem]",
    tag: "text-[0.66rem]",
    gap: "gap-2.5",
  },
  lg: {
    mark: 32,
    word: "text-[1.95rem]",
    tag: "text-[0.78rem]",
    gap: "gap-3",
  },
  xl: {
    mark: 56,
    word: "text-[3.2rem]",
    tag: "text-[0.92rem]",
    gap: "gap-4",
  },
} as const;

/**
 * HorizonSunMark —— 几何标记。
 *
 * 设计要点：
 *  - 太阳：r=2.5，y=9.5（贴近地平线，强化"破晓"而非"正午"）
 *  - 地平线：粗 1.4px，全宽圆头收尾
 *  - 水波：细 0.85px、短 5 单位、略向右偏（避免完全对称的死板）
 */
export function HorizonSunMark({
  className,
  size = 22,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
      aria-hidden
      className={className}
    >
      {/* 朝阳 */}
      <circle cx="12" cy="9.5" r="2.5" fill="currentColor" />
      {/* 海平线 */}
      <line
        x1="3"
        y1="14.6"
        x2="21"
        y2="14.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* 水波（略右偏） */}
      <line
        x1="9"
        y1="18"
        x2="19"
        y2="18"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.42"
      />
    </svg>
  );
}

/**
 * WordMark —— 仅字标，无图形标记。
 *
 * Fraunces 变量字体的微调：
 *  - weight 500：比 400 实，但不到 600 那么沉
 *  - OPSZ 96：开启光学尺寸的大字模式，衬线更舒展
 *  - SOFT 30：圆角端点带一丝暖意（呼应赤子之心）
 *  - tracking -0.018em：略收紧，让 W 与 H 视觉成对
 */
function WordMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: Size;
}) {
  const dims = SIZE_MAP[size];
  return (
    <span
      className={cn(
        "display inline-block leading-none",
        dims.word,
        className
      )}
      style={{
        fontVariationSettings: '"opsz" 96, "SOFT" 30, "WONK" 0',
        fontWeight: 500,
        letterSpacing: "-0.018em",
      }}
    >
      <span className="text-ink">Wind</span>
      <span className="text-sea-deep">Hero</span>
    </span>
  );
}

/**
 * Tagline —— "逐风人" mono 小字
 * 与 wordmark 共行时贴底基线对齐；stacked 模式下贴在 wordmark 下方。
 */
function Tagline({
  size = "md",
  className,
}: {
  size?: Size;
  className?: string;
}) {
  const dims = SIZE_MAP[size];
  return (
    <span
      className={cn(
        "font-mono tracking-[0.24em] text-mist",
        dims.tag,
        className
      )}
    >
      逐风人
    </span>
  );
}

/**
 * 完整 Logo —— mark + wordmark + 可选 tagline
 */
export function Logo({
  size = "md",
  variant = "horizontal",
  className,
  showTagline = false,
}: {
  size?: Size;
  variant?: Variant;
  className?: string;
  showTagline?: boolean;
}) {
  const dims = SIZE_MAP[size];

  if (variant === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-center text-ink",
          className
        )}
        aria-label="WindHero 逐风人"
      >
        <HorizonSunMark size={dims.mark} className="text-sun" />
        <span className="mt-3 inline-flex items-baseline gap-2">
          <WordMark size={size} />
          {showTagline ? (
            <Tagline size={size} className="hidden sm:inline" />
          ) : null}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-baseline text-ink", dims.gap, className)}
      aria-label="WindHero 逐风人"
    >
      {/* 标记略向下偏，让圆心对齐 wordmark 的 x 高度而非顶部 */}
      <HorizonSunMark
        size={dims.mark}
        className="text-sun translate-y-[0.22em] shrink-0"
      />
      <WordMark size={size} />
      {showTagline ? (
        <Tagline size={size} className="hidden sm:inline" />
      ) : null}
    </span>
  );
}
