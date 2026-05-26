import { cn } from "@/lib/utils";

/**
 * WindHero 标识系统
 *
 * 由两个部分构成：
 *  1) HorizonSunMark —— 几何标记：朝阳浮于海平线之上
 *     · 表达地中海（海平面）+ 赤子之心（破晓的太阳）
 *     · 单色可缩放，favicon 至大幅 hero 都好用
 *  2) WordMark —— Fraunces 衬线字标"Windhero"，
 *     与下方小字"逐风人"组合。
 *
 * 标准用法：<Logo /> 用在 Header；
 *           <Logo size="lg" /> 用在 Hero 或 Footer；
 *           <HorizonSunMark /> 单独用在 favicon / icon 场景。
 */

type Size = "sm" | "md" | "lg";

export function HorizonSunMark({
  className,
  size = 18,
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
      {/* 太阳 */}
      <circle cx="12" cy="10" r="2.6" fill="currentColor" />
      {/* 海平线 */}
      <line
        x1="3"
        y1="15.5"
        x2="21"
        y2="15.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* 海面波纹 */}
      <line
        x1="6.5"
        y1="19"
        x2="17.5"
        y2="19"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function Logo({
  size = "md",
  className,
  showTagline = false,
}: {
  size?: Size;
  className?: string;
  /** 是否显示「逐风人」小字 */
  showTagline?: boolean;
}) {
  const dims = {
    sm: { mark: 16, word: "text-[1.1rem]", tag: "text-[0.6rem]" },
    md: { mark: 20, word: "text-[1.35rem]", tag: "text-[0.66rem]" },
    lg: { mark: 28, word: "text-[1.9rem]", tag: "text-[0.78rem]" },
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2.5 text-ink",
        className
      )}
      aria-label="WindHero 逐风人"
    >
      <HorizonSunMark size={dims.mark} className="text-sun translate-y-[0.18em]" />
      <span className="inline-flex items-baseline gap-2">
        <span className={cn("display leading-none", dims.word)}>
          Wind<span className="text-sea-deep">hero</span>
        </span>
        {showTagline ? (
          <span
            className={cn(
              "hidden font-mono tracking-[0.22em] text-mist sm:inline",
              dims.tag
            )}
          >
            逐风人
          </span>
        ) : null}
      </span>
    </span>
  );
}
