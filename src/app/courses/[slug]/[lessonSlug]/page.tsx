import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Compass, ListChecks } from "lucide-react";
import { Section } from "@/components/section";
import { LessonRenderer } from "@/components/lesson-renderer";
import { Quiz } from "@/components/quiz";
import {
  findLesson,
  getCourseBySlug,
  listCourseSlugs,
  listLessonsFlat,
} from "@/lib/courses";
import { breadcrumbLd, jsonLdScript, lessonLd } from "@/lib/seo/jsonld";
import { createPageMetadata } from "@/lib/seo/metadata";

type Params = Promise<{ slug: string; lessonSlug: string }>;

export async function generateStaticParams() {
  const out: { slug: string; lessonSlug: string }[] = [];
  for (const slug of listCourseSlugs()) {
    const course = getCourseBySlug(slug);
    if (!course) continue;
    for (const { lesson } of listLessonsFlat(course)) {
      out.push({ slug, lessonSlug: lesson.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "未找到" };
  const found = findLesson(course, lessonSlug);
  if (!found) return { title: course.title };
  return createPageMetadata({
    title: `${found.lesson.title} · ${course.title}`,
    description: found.lesson.summary,
    path: `/courses/${course.slug}/${found.lesson.slug}`,
    keywords: [
      found.lesson.title,
      course.title,
      course.code,
      "航海课时",
      "帆船理论",
      "WindHero",
    ],
    image: "/images/generated/course-chart-desk-v1.png",
  });
}

export default async function LessonPage({ params }: { params: Params }) {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const found = findLesson(course, lessonSlug);
  if (!found) notFound();

  const { lesson, moduleTitle, moduleIndex, prev, next } = found;
  const flatLessons = listLessonsFlat(course);
  const lessonPosition = flatLessons.findIndex((x) => x.lesson.slug === lesson.slug) + 1;
  const progressPct = Math.max(4, (lessonPosition / flatLessons.length) * 100);
  const remainingLessons = Math.max(0, flatLessons.length - lessonPosition);
  const breadcrumb = breadcrumbLd([
    { name: "首页", url: "/" },
    { name: "课程", url: "/courses" },
    { name: course.title, url: `/courses/${course.slug}` },
    { name: lesson.title, url: `/courses/${course.slug}/${lesson.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(lessonLd(course, lesson, moduleTitle)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      {/* ===== Lesson Hero ===== */}
      <Section className="relative overflow-hidden border-b border-line/60 pt-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.11]"
          style={{
            backgroundImage: "url('/images/generated/course-chart-desk-v1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="wh-chart-wash -z-10" />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] tracking-[0.14em]">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 uppercase text-mist transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3 w-3" />
            {course.code} · {course.title}
          </Link>
          <span className="text-line">·</span>
          <span className="text-mist">
            模块 {String(moduleIndex).padStart(2, "0")} · {moduleTitle}
          </span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_0.95fr] lg:items-end">
          <div>
            <div className="flex items-baseline gap-4 font-mono text-[0.74rem] tracking-[0.14em] text-sea-deep">
              <span>课时 {lesson.index}</span>
              <span className="text-mist">·</span>
              <span className="text-mist">{lesson.duration}</span>
            </div>
            <h1 className="display mt-5 text-balance text-4xl text-ink md:text-5xl">
              {lesson.title}
            </h1>
            <p className="prose-zh mt-7 max-w-2xl text-[1.04rem] text-ink-soft">
              {lesson.summary}
            </p>
            <div className="wh-status-strip mt-8">
              <span>
                Lesson {lessonPosition} / {flatLessons.length}
              </span>
              <span>Module {String(moduleIndex).padStart(2, "0")}</span>
              <span>{lesson.duration}</span>
            </div>
          </div>

          <div className="wh-instrument-panel rounded-sm p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist">
              学完你能做什么
            </p>
            <ul className="mt-4 space-y-3 text-[0.94rem] leading-[1.8] text-ink">
              {lesson.outcomes.map((o, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2.5"
                >
                  <span className="mt-[0.7em] h-px w-3 bg-sea-deep" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 h-1 overflow-hidden rounded-full bg-line/70">
              <div
                className="h-full bg-sea-deep"
                style={{
                  width: `${progressPct}%`,
                }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Body ===== */}
      <Section className="border-b border-line/60 bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <article className="min-w-0 max-w-3xl">
            <LessonRenderer blocks={lesson.body} />
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="wh-instrument-panel rounded-sm p-5">
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sea-deep">
                <Compass className="h-3.5 w-3.5" />
                Lesson chart
              </p>
              <dl className="mt-5 space-y-4 text-[0.88rem] leading-[1.65]">
                <LessonStat label="当前位置" value={`${lessonPosition} / ${flatLessons.length}`} />
                <LessonStat label="本模块" value={`模块 ${String(moduleIndex).padStart(2, "0")}`} />
                <LessonStat label="剩余课时" value={`${remainingLessons} 课`} />
              </dl>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-line/70">
                <div className="h-full bg-sea-deep" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="rounded-sm border border-line/70 bg-paper-soft/45 p-5">
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist">
                <ListChecks className="h-3.5 w-3.5" />
                学习动作
              </p>
              <ol className="mt-4 space-y-3 text-[0.84rem] leading-[1.65] text-ink-soft">
                <li className="grid grid-cols-[1.6rem_1fr] gap-2">
                  <span className="font-mono text-sea-deep">01</span>
                  <span>先读正文，遇到图解停下来操作一次。</span>
                </li>
                <li className="grid grid-cols-[1.6rem_1fr] gap-2">
                  <span className="font-mono text-sea-deep">02</span>
                  <span>把练习块当成船长口头复盘，不跳过。</span>
                </li>
                <li className="grid grid-cols-[1.6rem_1fr] gap-2">
                  <span className="font-mono text-sea-deep">03</span>
                  <span>最后做小测，错题回到对应段落重读。</span>
                </li>
              </ol>
            </div>

            <div className="rounded-sm border border-line/70 bg-paper p-5">
              <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mist">
                <BookOpen className="h-3.5 w-3.5" />
                快速导航
              </p>
              <div className="mt-4 grid gap-2">
                {prev ? (
                  <Link
                    href={`/courses/${course.slug}/${prev.lesson.slug}`}
                    className="inline-flex items-center justify-between gap-3 rounded-sm border border-line bg-paper-soft/40 px-3 py-2 text-[0.82rem] text-ink transition-colors hover:bg-paper-soft"
                  >
                    上一课
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/courses/${course.slug}/${next.lesson.slug}`}
                    className="inline-flex items-center justify-between gap-3 rounded-sm bg-ink px-3 py-2 text-[0.82rem] text-paper transition-colors hover:bg-sea-deep"
                  >
                    下一课
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : course.exam ? (
                  <Link
                    href={`/courses/${course.slug}/exam`}
                    className="inline-flex items-center justify-between gap-3 rounded-sm bg-ink px-3 py-2 text-[0.82rem] text-paper transition-colors hover:bg-sea-deep"
                  >
                    去模拟考
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* ===== Quiz ===== */}
      {lesson.quiz.length > 0 ? (
        <Quiz
          questions={lesson.quiz}
          mode="lesson"
          title={`${lesson.title} · 课后小测`}
        />
      ) : null}

      {/* ===== Prev / Next ===== */}
      <Section>
        <nav className="grid gap-px bg-line/70 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/courses/${course.slug}/${prev.lesson.slug}`}
              className="group flex flex-col bg-paper p-8 transition-colors hover:bg-paper-soft/60"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                <ArrowLeft className="h-3 w-3" />
                上一课
              </span>
              <span className="display mt-4 text-xl text-ink">
                {prev.lesson.index} · {prev.lesson.title}
              </span>
              <span className="mt-2 text-[0.86rem] text-ink-soft">
                {prev.moduleTitle}
              </span>
            </Link>
          ) : (
            <div className="bg-paper p-8">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                这是第一课
              </span>
            </div>
          )}

          {next ? (
            <Link
              href={`/courses/${course.slug}/${next.lesson.slug}`}
              className="group flex flex-col bg-paper p-8 text-right transition-colors hover:bg-paper-soft/60"
            >
              <span className="inline-flex items-center justify-end gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                下一课
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="display mt-4 text-xl text-ink">
                {next.lesson.index} · {next.lesson.title}
              </span>
              <span className="mt-2 text-[0.86rem] text-ink-soft">
                {next.moduleTitle}
              </span>
            </Link>
          ) : course.exam ? (
            <Link
              href={`/courses/${course.slug}/exam`}
              className="group flex flex-col bg-ink p-8 text-right text-paper transition-colors hover:bg-sea-deep"
            >
              <span className="inline-flex items-center justify-end gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                所有课时学完——
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="display mt-4 text-xl">挑战期末模拟考</span>
              <span className="mt-2 text-[0.86rem] text-paper-soft/80">
                {course.exam.questions.length} 题 · 通过线 {course.exam.passMark}%
              </span>
            </Link>
          ) : (
            <Link
              href={`/courses/${course.slug}`}
              className="group flex flex-col bg-ink p-8 text-right text-paper transition-colors hover:bg-sea-deep"
            >
              <span className="inline-flex items-center justify-end gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                这门课结束——
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="display mt-4 text-xl">回到课程总览</span>
              <span className="mt-2 text-[0.86rem] text-paper-soft/80">
                继续学习其他模块
              </span>
            </Link>
          )}
        </nav>
      </Section>
    </>
  );
}

function LessonStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[4.2rem_1fr] gap-3">
      <dt className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-mist">
        {label}
      </dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
