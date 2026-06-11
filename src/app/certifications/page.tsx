import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Anchor,
  BookOpen,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { CertificationChannelsVisual } from "@/components/content-visuals";
import {
  bodyInfo,
  ladder,
  specialists,
  type CertBody,
} from "@/lib/certifications/comparison";
import {
  stageInfo,
  stageOrder,
  courseStages,
} from "@/lib/certifications/stages";
import { getCourseBySlug } from "@/lib/courses";
import { createPageMetadata } from "@/lib/seo/metadata";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "RYA vs ASA vs IYT 认证体系对比",
  description:
    "RYA、ASA、IYT 三大民用帆船认证体系对比：适用地区、学习路径、考试方式，以及 WindHero 课程如何对应笔试内容。",
  keywords: [
    "RYA vs ASA",
    "RYA vs IYT",
    "ASA vs IYT",
    "帆船认证",
    "RYA 认证",
    "ASA 认证",
    "IYT 认证",
    "Yachtmaster",
    "Day Skipper",
    "Bareboat Skipper",
    "认证体系对比",
    "WindHero",
  ],
  path: "/certifications",
});

const certBodies: CertBody[] = ["rya", "asa", "iyt"];

export default function CertificationsPage() {
  const pageSchema = webPageLd({
    type: "WebPage",
    name: "RYA vs ASA vs IYT 认证体系对比",
    description: "三大民用帆船认证体系的学习曲线、覆盖范围、考试方式与 WindHero 课程映射。",
    url: "/certifications",
  });
  const certListSchema = itemListLd({
    name: "三大民用帆船认证体系",
    url: "/certifications",
    items: certBodies.map((body) => ({
      name: bodyInfo[body].name,
      description: bodyInfo[body].bestFor,
      url: "/certifications",
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(certListSchema) }}
      />
      {/* ====================== 1. Hero ====================== */}
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          level={1}
          eyebrow="对比 · RYA · ASA · IYT"
          title={
            <>
              先别问哪张证最好，
              <br />
              先问你要去哪用。
            </>
          }
          lead="RYA、ASA、IYT 都能带你上船，但它们的语境不同。这里把地区、用途、考试方式和课程对应关系放在一起，帮你少走一点弯路。"
        />
      </Section>

      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <SectionHeading
            eyebrow="三条航道"
            title={
              <>
                三条路线，
                <br />
                适合不同用法。
              </>
            }
            lead="RYA 在英联邦和欧洲认知度高，ASA 对美国和加勒比租船很友好，IYT 更常出现在国际商业和超级游艇语境里。"
          />
          <CertificationChannelsVisual />
        </div>
      </Section>

      {/* ====================== 2. 三体系一句话简介 ====================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">三体系 · 一句话</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          先选你主要在哪里用证。
        </h2>
        <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-3">
          {certBodies.map((b) => {
            const info = bodyInfo[b];
            return (
              <article key={b} className="flex flex-col gap-3 bg-paper p-6 md:p-8">
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-mist">
                  EST · {info.founded} · {info.country}
                </p>
                <h3 className="display text-3xl text-ink">{info.name}</h3>
                <p className="text-[0.86rem] leading-[1.7] text-mist">
                  {info.fullName}
                </p>
                <p className="mt-2 text-[0.94rem] leading-[1.8] text-ink-soft">
                  {info.style}
                </p>
                <p className="mt-3 border-t border-line/70 pt-4 text-[0.88rem] leading-[1.75] text-ink">
                  <strong className="text-ink">最适合</strong>：{info.bestFor}
                </p>
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] text-sea-deep hover:text-ink"
                >
                  官网
                  <ArrowRight className="h-3 w-3" />
                </a>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ====================== 3. 详细对照表 ====================== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">详细对照 · 三体系优劣</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          每个体系都有方便的地方，也有麻烦的地方。
        </h2>

        <div className="mt-10 space-y-6">
          {certBodies.map((b) => {
            const info = bodyInfo[b];
            return (
              <article
                key={b}
                className="border border-line/70 bg-paper p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl text-ink">
                    {info.name}
                    <span className="ml-3 font-mono text-[0.78rem] text-mist">
                      {info.fullName}
                    </span>
                  </h3>
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mist">
                    {info.recognition}
                  </span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                      优势
                    </p>
                    <ul className="mt-3 space-y-2 text-[0.92rem] leading-[1.75] text-ink-soft">
                      {info.pros.map((p, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[1.2rem_1fr] items-baseline gap-2"
                        >
                          <CheckCircle2 className="mt-[0.2em] h-3.5 w-3.5 text-sea-deep" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-coral">
                      代价
                    </p>
                    <ul className="mt-3 space-y-2 text-[0.92rem] leading-[1.75] text-ink-soft">
                      {info.cons.map((p, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[1.2rem_1fr] items-baseline gap-2"
                        >
                          <Circle className="mt-[0.2em] h-3 w-3 text-coral" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ====================== 4. 阶梯对照表 ====================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">阶梯对照 · 主路径</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          从入门到跨洋——6 阶段，三体系，一一对应。
        </h2>
        <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          下面这张表按 WindHero 的 6 阶段学习路径，把三体系的对应等级排列在一起。颜色：
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 bg-sea-deep" />
            理论
          </span>
          、
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 bg-coral" />
            实操
          </span>
          、
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 bg-ink" />
            理论 + 实操合一
          </span>
          。
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[840px] border border-line/70 text-left text-[0.88rem]">
            <thead className="bg-paper-soft/50 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
              <tr>
                <th className="border-b border-line/70 px-4 py-3">WindHero 阶段</th>
                <th className="border-b border-line/70 px-4 py-3">RYA</th>
                <th className="border-b border-line/70 px-4 py-3">ASA</th>
                <th className="border-b border-line/70 px-4 py-3">IYT</th>
                <th className="border-b border-line/70 px-4 py-3">WindHero 课程</th>
              </tr>
            </thead>
            <tbody>
              {ladder.map((row, i) => (
                <tr key={i} className="border-b border-line/40 last:border-b-0">
                  <td className="px-4 py-4 align-top">
                    <p className="display text-base text-ink">{row.stage}</p>
                    <p className="font-mono text-[0.7rem] text-mist">{row.stageSub}</p>
                  </td>
                  <td className="px-4 py-4 align-top text-ink">
                    <CertCell label={row.rya} type={row.ryaType} />
                  </td>
                  <td className="px-4 py-4 align-top text-ink">
                    <CertCell label={row.asa} type={row.asaType} />
                  </td>
                  <td className="px-4 py-4 align-top text-ink">
                    <CertCell label={row.iyt} type={row.iytType} />
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className="font-mono text-[0.82rem] text-sea-deep">
                      {row.windhero}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ====================== 5. 专题课对照 ====================== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">专题课对照</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          专题课在三体系里的位置。
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[800px] border border-line/70 text-left text-[0.88rem]">
            <thead className="bg-paper font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
              <tr>
                <th className="border-b border-line/70 px-4 py-3">主题</th>
                <th className="border-b border-line/70 px-4 py-3">RYA</th>
                <th className="border-b border-line/70 px-4 py-3">ASA</th>
                <th className="border-b border-line/70 px-4 py-3">IYT</th>
                <th className="border-b border-line/70 px-4 py-3">WH</th>
              </tr>
            </thead>
            <tbody className="bg-paper">
              {specialists.map((s, i) => (
                <tr key={i} className="border-b border-line/40 last:border-b-0">
                  <td className="px-4 py-4 align-top font-medium text-ink">{s.topic}</td>
                  <td className="px-4 py-4 align-top text-ink-soft">{s.rya}</td>
                  <td className="px-4 py-4 align-top text-ink-soft">{s.asa}</td>
                  <td className="px-4 py-4 align-top text-ink-soft">{s.iyt}</td>
                  <td className="px-4 py-4 align-top font-mono text-sea-deep">{s.windhero}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[0.82rem] text-mist">
            注：标注「无独立课程」的，是该体系把这部分知识融入了主线笔试；
            学员仍需掌握。
          </p>
        </div>
      </Section>

      {/* ====================== 6. WindHero 路径承诺 ====================== */}
      <Section id="path" className="border-b border-line/60 scroll-mt-28">
        <p className="eyebrow">WindHero 路径承诺</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          按 WindHero 的 6 阶段学下来——
          <br />
          三体系的笔试，你都能过。
        </h2>
        <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
          每阶段下方列出对应的 WindHero 课程与三体系等级。点击进入课程，看完整的大纲映射。
        </p>

        <div className="mt-12 space-y-10">
          {stageOrder.map((stage) => {
            const info = stageInfo[stage];
            const stageSlugs = Object.entries(courseStages)
              .filter(([, stages]) => stages[0] === stage)
              .map(([slug]) => slug);
            const stageCourses = stageSlugs
              .map((slug) => getCourseBySlug(slug))
              .filter((c): c is NonNullable<typeof c> => Boolean(c));

            return (
              <article
                key={stage}
                className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-10"
              >
                <div className="border-l-2 border-sea-deep/60 pl-5">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                    阶段 · {info.sub}
                  </p>
                  <h3 className="display mt-3 text-2xl text-ink">
                    {info.label}
                  </h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
                    {info.intro}
                  </p>
                  <dl className="mt-5 space-y-2 font-mono text-[0.74rem]">
                    <div className="grid grid-cols-[3rem_1fr] gap-2">
                      <dt className="text-mist">RYA</dt>
                      <dd className="text-ink">{info.ryaEquiv}</dd>
                    </div>
                    <div className="grid grid-cols-[3rem_1fr] gap-2">
                      <dt className="text-mist">ASA</dt>
                      <dd className="text-ink">{info.asaEquiv}</dd>
                    </div>
                    <div className="grid grid-cols-[3rem_1fr] gap-2">
                      <dt className="text-mist">IYT</dt>
                      <dd className="text-ink">{info.iytEquiv}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <p className="text-[0.86rem] text-mist">
                    学完这阶段你能做的事：{info.achievement}
                  </p>
                  <div className="mt-5 grid gap-px bg-line/70 sm:grid-cols-2">
                    {stageCourses.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/courses/${c.slug}`}
                        className="group bg-paper p-5 transition-colors hover:bg-paper-soft/60"
                      >
                        <div className="flex items-baseline justify-between font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                          <span>{c.code}</span>
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                        <h4 className="display mt-2 text-base text-ink">
                          {c.title}
                        </h4>
                        <p className="mt-2 text-[0.82rem] leading-[1.65] text-mist">
                          {c.summary}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ====================== 7. 线下完成的部分 ====================== */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">必须线下完成的部分</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2rem]">
              WindHero 不能替代认证学校。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              三体系都要求实操考核、海上里程和部分手法训练在线下完成。WindHero 只能帮你补理论，发证仍由认证学校处理。
            </p>
            <ul className="mt-6 space-y-3 text-[0.92rem] leading-[1.8] text-ink-soft">
              <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
                <Anchor className="mt-[0.2em] h-3.5 w-3.5 text-coral" />
                所有实操考核与海上里程（Day Skipper Practical 等）
              </li>
              <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
                <Anchor className="mt-[0.2em] h-3.5 w-3.5 text-coral" />
                VHF / SRC 与 First Aid 的手法实操考核
              </li>
              <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
                <Anchor className="mt-[0.2em] h-3.5 w-3.5 text-coral" />
                Sea Survival 湿训（救生筏入筏、HELP 姿势）
              </li>
              <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
                <Anchor className="mt-[0.2em] h-3.5 w-3.5 text-coral" />
                Yachtmaster 口试与海试
              </li>
            </ul>
          </div>

          <Link
            href="/schools"
            className="group flex flex-col justify-center rounded-sm border border-coral/40 bg-coral/5 p-8 transition-colors hover:bg-coral/10 md:p-10"
          >
            <BookOpen className="h-7 w-7 text-coral" />
            <h3 className="display mt-6 text-3xl text-ink">
              全球认证学校目录
            </h3>
            <p className="mt-4 text-[0.95rem] leading-[1.85] text-ink-soft">
              WindHero 精选的 RYA / ASA / IYT 认证学校列表，可按地区、认证体系、阶段筛选。中文友好的学校单独标注。
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-coral group-hover:text-ink">
              查看学校目录
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}

function CertCell({
  label,
  type,
}: {
  label: string;
  type: "theory" | "practical" | "both";
}) {
  if (label === "—") return <span className="text-mist">—</span>;
  const dotColor =
    type === "theory"
      ? "bg-sea-deep"
      : type === "practical"
      ? "bg-coral"
      : "bg-ink";
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={`mt-1 inline-block h-2 w-2 ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
}
