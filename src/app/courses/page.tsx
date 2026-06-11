import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { CourseSystemMap, LearningRouteChart } from "@/components/content-visuals";
import { detailedCourses, getCourseBySlug } from "@/lib/courses";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  courseStages,
  stageInfo,
  stageOrder,
  type Stage,
} from "@/lib/certifications/stages";
import { itemListLd, jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "课程 · 13 门覆盖三体系笔试",
  description:
    "WindHero 把航海理论整理成 6 个阶段、13 门课，用来对照 RYA、ASA、IYT 的笔试要求。",
  path: "/courses",
  keywords: [
    "中文航海课程",
    "帆船理论课程",
    "RYA Day Skipper Theory",
    "ASA Bareboat",
    "IYT Yachtmaster",
    "WindHero 课程",
  ],
});

export default function CoursesPage() {
  /* 按主阶段分组：每门课只显示在其第一个（主）阶段下 */
  const byStage = new Map<Stage, typeof detailedCourses>();
  for (const stage of stageOrder) byStage.set(stage, []);
  for (const course of detailedCourses) {
    const stages = courseStages[course.slug] ?? [];
    const primary = stages[0];
    if (primary && byStage.has(primary)) {
      byStage.get(primary)!.push(course);
    }
  }
  const routeStages = stageOrder.map((stage) => ({
    id: stage,
    label: stageInfo[stage].label,
    sub: stageInfo[stage].sub,
    count: byStage.get(stage)?.length ?? 0,
  }));
  const pageSchema = webPageLd({
    type: "CollectionPage",
    name: "WindHero 课程",
    description: "13 门中文航海理论课程，按 6 阶段覆盖 RYA / ASA / IYT 笔试路径。",
    url: "/courses",
    primaryImage: "/images/generated/course-chart-desk-v1.png",
  });
  const courseListSchema = itemListLd({
    name: "WindHero 13 门课程",
    description: "入门、船员、日间船长、夜间近岸、远海远航与跨洋阶段课程。",
    url: "/courses",
    items: detailedCourses.map((course) => ({
      name: `${course.code} · ${course.title}`,
      description: course.summary,
      url: `/courses/${course.slug}`,
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(courseListSchema) }}
      />
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          level={1}
          eyebrow="课程"
          title={
            <>
              先把该补的理论，
              <br />
              按顺序补上。
            </>
          }
          lead="这 13 门课按学习顺序排：先读风和帆，再到海图、潮汐、避碰、天气、通信和远航。旁边保留 RYA / ASA / IYT 对照，方便你知道自己是在补哪一块。"
        />
        <div className="mt-8 flex flex-wrap gap-3 text-[0.86rem]">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-1.5 text-sea-deep underline-offset-4 hover:underline"
          >
            三体系对比表
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-mist">·</span>
          <Link
            href="/schools"
            className="inline-flex items-center gap-1.5 text-sea-deep underline-offset-4 hover:underline"
          >
            全球认证学校目录
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="课程地图"
            title={
              <>
                先看目录，
                <br />
                再进某一门课。
              </>
            }
            lead="如果你只是想补潮汐、VHF 或天气，可以直接跳过去。如果你从零开始，按阶段往下读会省很多返工。"
          />
          <CourseSystemMap stages={routeStages} />
        </div>
        <div className="mt-10">
          <LearningRouteChart stages={routeStages} />
        </div>
      </Section>

      {stageOrder.map((stage) => {
        const courses = byStage.get(stage) ?? [];
        if (courses.length === 0) return null;
        const info = stageInfo[stage];

        return (
          <Section key={stage} id={stage} className="border-b border-line/60">
            {/* —— 阶段标题 —— */}
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
              <header className="border-l-2 border-sea-deep/60 pl-6">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                  阶段 · {info.sub}
                </p>
                <h2 className="display mt-3 text-3xl text-ink md:text-4xl">
                  {info.label}
                </h2>
                <p className="mt-4 text-[0.96rem] leading-[1.9] text-ink-soft">
                  {info.intro}
                </p>

                <dl className="mt-6 space-y-1.5 font-mono text-[0.74rem]">
                  <div className="grid grid-cols-[2.8rem_1fr] gap-2">
                    <dt className="text-mist">RYA</dt>
                    <dd className="text-ink-soft">{info.ryaEquiv}</dd>
                  </div>
                  <div className="grid grid-cols-[2.8rem_1fr] gap-2">
                    <dt className="text-mist">ASA</dt>
                    <dd className="text-ink-soft">{info.asaEquiv}</dd>
                  </div>
                  <div className="grid grid-cols-[2.8rem_1fr] gap-2">
                    <dt className="text-mist">IYT</dt>
                    <dd className="text-ink-soft">{info.iytEquiv}</dd>
                  </div>
                </dl>

                <p className="mt-6 text-[0.86rem] leading-[1.7] text-mist">
                  学完能做：{info.achievement}
                </p>
              </header>

              {/* —— 课程卡片 —— */}
              <div className="grid gap-px bg-line/70 sm:grid-cols-2">
                {courses.map((c) => {
                  const lessonCount = c.modules.reduce(
                    (s, m) => s + m.lessons.length,
                    0
                  );
                  const otherStages = (courseStages[c.slug] ?? []).slice(1);
                  return (
                    <Link
                      key={c.slug}
                      href={`/courses/${c.slug}`}
                      className="group flex flex-col bg-paper p-6 transition-colors hover:bg-paper-soft/60"
                    >
                      <div className="flex items-baseline justify-between text-[0.72rem] text-mist">
                        <span className="font-mono tracking-[0.14em] text-sea">
                          {c.code}
                        </span>
                        <span>{c.duration}</span>
                      </div>
                      <h3 className="display mt-3 text-xl text-ink md:text-2xl">
                        {c.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.92rem] leading-[1.8] text-ink-soft">
                        {c.summary}
                      </p>

                      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line/70 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-mist">
                        <div>
                          <dt>模块</dt>
                          <dd className="mt-1 text-ink">
                            {c.modules.length}
                          </dd>
                        </div>
                        <div>
                          <dt>课时</dt>
                          <dd className="mt-1 text-ink">{lessonCount}</dd>
                        </div>
                        <div>
                          <dt>期末</dt>
                          <dd className="mt-1 text-ink">
                            {c.exam
                              ? c.exam.drawCount
                                ? `抽 ${c.exam.drawCount}`
                                : `${c.exam.questions.length} 题`
                              : "无笔试"}
                          </dd>
                        </div>
                      </dl>

                      {otherStages.length > 0 ? (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-mist">
                            也覆盖
                          </span>
                          {otherStages.map((s) => (
                            <span
                              key={s}
                              className="rounded-sm border border-line/70 bg-paper-soft/40 px-1.5 py-0.5 font-mono text-[0.66rem] tracking-[0.04em] text-ink-soft"
                            >
                              {stageInfo[s].label}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
                        进入课程
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Section>
        );
      })}

      {/* —— 实操线下导流 —— */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <p className="eyebrow">学完之后</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              线上学理论，实操还要去学校。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              WindHero 不发证，也不替代海上训练。实操考核、海上里程和发证流程，仍然要在认证学校完成。这里做的是登船前的那部分准备。
            </p>
          </div>
          <Link
            href="/schools"
            className="group flex flex-col justify-center rounded-sm border border-coral/40 bg-coral/5 p-8 transition-colors hover:bg-coral/10 md:p-10"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-coral">
              下一步
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              全球认证学校目录
            </h3>
            <p className="mt-3 text-[0.92rem] leading-[1.85] text-ink-soft">
              24 所精选学校 · 可按地区、认证体系、阶段筛选 · 中文友好学校标注
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-coral transition-colors group-hover:text-ink">
              查看学校目录
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}

/* getCourseBySlug 在本页未直接使用，但通过 detailedCourses 间接遍历 */
void getCourseBySlug;
