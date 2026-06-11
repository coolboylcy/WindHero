import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wind, Map } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { ToolDeckVisual } from "@/components/content-visuals";
import { createPageMetadata } from "@/lib/seo/metadata";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "工具",
  description:
    "WindHero 的航海小工具：查全球风带、练习天气图读图，用来做出发前的粗判断。",
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
    desc: "选一片海，先看常年的风向、合适月份和热带气旋季。它不能替代预报，但能帮你避开明显不合适的季节。",
    icon: Map,
  },
  {
    href: "/tools/synoptic",
    title: "天气图读图",
    desc: "用一张简化的地面气压图练习：等压线越密，风为什么越强；半球一变，低压环流为什么会反过来。",
    icon: Wind,
  },
];

export default function ToolsIndexPage() {
  const pageSchema = webPageLd({
    type: "CollectionPage",
    name: "WindHero 航海工具",
    description: "全球风带查询、天气图读图等免费互动航海训练工具。",
    url: "/tools",
    primaryImage: "/images/generated/synoptic-chart-texture-v1.png",
  });
  const toolListSchema = itemListLd({
    name: "WindHero 航海工具列表",
    url: "/tools",
    items: tools.map((tool) => ({
      name: tool.title,
      description: tool.desc,
      url: tool.href,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(toolListSchema) }}
      />
      <Section className="border-b border-line/60 pt-36">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <SectionHeading
            level={1}
            eyebrow="工具"
            title={
              <>
                两个小工具，
                <br />
                先解决两个常见问题。
              </>
            }
            lead="一个用来看季节，一个用来看天气图。都只是简化模型，但很适合在查预报之前，先把脑子里的图摆正。"
          />
          <ToolDeckVisual />
        </div>
      </Section>

      <Section>
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">判断流程</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2.2rem]">
              先问季节，
              <br />
              再问这三天。
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
                      ? "避开热带气旋季、强季风和明显的冬季风暴期。"
                      : "临出发前还要回到真实预报和官方天气图。"}
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
