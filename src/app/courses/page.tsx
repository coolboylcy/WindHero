import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { detailedCourses, getCourseBySlug } from "@/lib/courses";
import {
  courseStages,
  stageInfo,
  stageOrder,
  type Stage,
} from "@/lib/certifications/stages";

export const metadata: Metadata = {
  title: "课程 · 13 门覆盖三体系笔试",
  description:
    "WindHero 按 6 阶段组织课程：入门 / 船员 / 日间船长 / 夜间近岸 / 远海远航 / 跨洋。13 门课对应 RYA、ASA、IYT 三大体系的所有笔试要求。",
};

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

  return (
    <>
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          eyebrow="课程"
          title={
            <>
              从「我能不能上船」
              <br />
              到「我能不能跨太平洋」。
            </>
          }
          lead="WindHero 13 门课按 6 阶段组织：入门 → 船员 → 日间船长 → 夜间近岸 → 远海远航 → 跨洋。每个阶段对应 RYA / ASA / IYT 三体系的等级——按这条路径学完，三体系的笔试你都能过。"
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
              然后去 RYA / ASA / IYT 学校做实操。
            </h2>
            <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
              WindHero 教你过笔试。所有实操考核、海上里程、湿训部分必须在认证学校完成——这是三体系的硬规定。WindHero 的责任是让你登船时已经站得稳。
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
