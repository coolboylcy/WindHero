import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wind, Map } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
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
        <SectionHeading
          eyebrow="工具"
          title={
            <>
              把课堂上学的，
              <br />
              直接拿来用。
            </>
          }
          lead="WindHero 的几个免费工具——不要登录、不要付费。打开浏览器就能用。"
        />
      </Section>

      <Section>
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
