import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wind, Map } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { ToolDeckVisual } from "@/components/content-visuals";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "工具",
  description:
    "WindHero 的开源航海工具集：全球风带查询、天气图读图沙盒，以及更多。",
  path: "/tools",
  keywords: [
    "航海工具",
    "全球风带查询",
    "天气图读图",
    "帆船工具",
    "WindHero 工具",
  ],
});

const tools = [
  {
    href: "/tools/wind-belts",
    title: "全球风带查询",
    desc: "查询全球任何海域的主导风向、最佳出航月份、季风与台风窗口。基于三圈环流 + 季风模型——出航前的第一份功课。",
    icon: Map,
  },
  {
    href: "/tools/synoptic",
    title: "天气图读图",
    desc: "学会读地面气压图：等压线、低压、高压、风向风强。配可拖动的沙盒，让你拿手感。",
    icon: Wind,
  },
];

export default function ToolsIndexPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow="工具"
            title={
              <>
                把课堂上学的，
                <br />
                直接拿来用。
              </>
            }
            lead="工具不是附录。它们是 WindHero 的练习台：把风带、天气图、航线窗口这些抽象概念，变成可以拖动、比较、复盘的判断。"
          />
          <ToolDeckVisual />
        </div>
      </Section>

      <Section>
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">判断流程</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2.2rem]">
              先看季节底图，
              <br />
              再看具体天气。
            </h2>
          </div>
          <ol className="grid gap-px bg-line/70 md:grid-cols-3">
            {["海域", "月份", "天气窗"].map((step, i) => (
              <li key={step} className="bg-paper p-5">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-xl text-ink">{step}</h3>
                <p className="mt-2 text-[0.84rem] leading-[1.7] text-ink-soft">
                  {i === 0
                    ? "确定你要去的是信风带、季风海，还是西风带。"
                    : i === 1
                      ? "避开热带气旋和冬季风暴，找到基础窗口。"
                      : "用天气图确认出发前 72 小时的真实局势。"}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid gap-px bg-line/70 md:grid-cols-2">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col bg-paper p-10 transition-colors hover:bg-paper-soft/60"
              >
                <Icon className="h-6 w-6 text-sea-deep" />
                <h2 className="display mt-6 text-3xl text-ink md:text-4xl">
                  {t.title}
                </h2>
                <p className="mt-4 text-[0.98rem] leading-[1.9] text-ink-soft">
                  {t.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.86rem] text-sea-deep transition-colors group-hover:text-ink">
                  打开工具
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
