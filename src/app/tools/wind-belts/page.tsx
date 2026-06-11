import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wind } from "lucide-react";
import { ImageBackdrop } from "@/components/image-backdrop";
import { Section } from "@/components/section";
import { regions, cellInfo } from "@/lib/tools/wind-belts-data";
import { WindBeltsExplorer } from "./explorer";
import { createPageMetadata } from "@/lib/seo/metadata";
import { jsonLdScript, softwareApplicationLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "全球风带查询 · Wind Belts by Region",
  description:
    "按海域查询常年主导风、合适月份、季风与热带气旋风险窗口。",
  keywords: [
    "全球风带",
    "信风",
    "盛行西风",
    "季风",
    "trade winds",
    "prevailing westerlies",
    "monsoon",
    "三圈环流",
    "Hadley cell",
    "出航季节",
    "台风季",
    "飓风季",
    "WindHero",
  ],
  path: "/tools/wind-belts",
  image: "/images/generated/synoptic-chart-texture-v1.png",
});

export default function WindBeltsPage() {
  const toolSchema = softwareApplicationLd({
    name: "全球风带查询",
    description:
      "查询全球主要海域的主导风向、最佳出航月份、季风与热带气旋风险窗口。",
    url: "/tools/wind-belts",
    keywords: ["全球风带", "信风", "季风", "出航季节", "航海工具"],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(toolSchema) }}
      />
      {/* ==================== Hero + Tool（首屏） ==================== */}
      <Section className="relative overflow-hidden border-b border-line/60 px-6 pb-10 pt-24 lg:px-10 lg:pb-14 lg:pt-28">
        <ImageBackdrop
          src="/images/generated/synoptic-chart-texture-v1.png"
          className="-z-10 opacity-[0.16]"
          loading="eager"
          fetchPriority="high"
        />
        <div aria-hidden className="wh-chart-wash -z-10" />
        <header className="mx-auto mb-7 max-w-3xl lg:mb-9">
          <p className="eyebrow">工具 · 全球风带查询</p>
          <h1 className="display mt-3 text-balance text-3xl text-ink md:text-4xl lg:text-[2.6rem]">
            这片海，一年里大概吹什么风？
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.75] text-ink-soft">
            选海域，或者拖动纬度。先看常年风向、合适月份和热带气旋窗口，再去查具体预报。
          </p>
          <div className="wh-status-strip mt-5">
            <span>Wind belts</span>
            <span>Season window</span>
            <span>Skipper brief</span>
          </div>
        </header>
        <WindBeltsExplorer />
      </Section>

      {/* ==================== 三圈环流原理 ==================== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">原理 · 为什么有风带</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          大气环流可以先粗略分三层。
        </h2>
        <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-3">
          {(["hadley-N", "ferrel-N", "polar-N"] as const).map((c) => {
            const info = cellInfo[c];
            return (
              <article key={c} className="bg-paper p-7 md:p-8">
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                  {info.latLabel}
                </p>
                <h3 className="display mt-3 text-xl text-ink">{info.name}</h3>
                <p className="mt-3 text-[0.94rem] leading-[1.8] text-ink-soft">
                  主导风：{info.primaryWind}
                </p>
                <p className="mt-2 text-[0.86rem] leading-[1.75] text-mist">
                  {info.sailing}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-8 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          想看完整三圈环流的物理原理与 Coriolis 偏向的几何来源——读{" "}
          <Link
            href="/courses/reading-the-wind/why-the-wind-blows"
            className="text-sea-deep underline-offset-4 hover:underline"
          >
            《WH-101 · 风为什么会吹》
          </Link>
          。
        </p>
      </Section>

      {/* ==================== 全部 region 列表（SEO） ==================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">收录海域</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          先收 12 个常见航海区域。
        </h2>

        <div className="mt-12 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <article key={r.slug} className="bg-paper p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="display text-lg text-ink">{r.name}</h3>
                <span className="font-mono text-[0.7rem] text-mist">
                  {r.latApprox >= 0
                    ? `${r.latApprox}°N`
                    : `${-r.latApprox}°S`}
                </span>
              </div>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
                {r.region}
              </p>
              <p className="mt-3 text-[0.88rem] leading-[1.75] text-ink-soft">
                <strong className="text-ink">主导风</strong>：{r.prevailingWind}
              </p>
              <p className="mt-2 text-[0.88rem] leading-[1.75] text-ink-soft">
                <strong className="text-ink">最佳月份</strong>：{r.bestMonths}
              </p>
              {r.risks.length > 0 ? (
                <p className="mt-2 text-[0.84rem] leading-[1.7] text-coral">
                  ⚠ {r.risks[0].label}（{r.risks[0].period}）
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      {/* ==================== CTA ==================== */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Wind className="mx-auto h-7 w-7 text-sea-deep" />
          <h2 className="display mt-6 text-3xl text-ink md:text-4xl">
            风带只能帮你排除坏月份。
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.9] text-ink-soft">
            它告诉你的是常年画面，不是出发当天的天气。出门前还要看官方预报、天气图和 GRIB。
            想继续学怎么看预报、读 GRIB、判断锋面，可以进
            <Link
              href="/courses/weather-and-routing"
              className="text-sea-deep underline-offset-4 hover:underline"
            >
              进入 WH-204 天气与航路课
            </Link>
            。
          </p>
          <Link
            href="/courses/reading-the-wind"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
          >
            从「读懂风」开始
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>
    </>
  );
}
