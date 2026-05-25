import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { LessonRenderer } from "@/components/lesson-renderer";
import { Quiz } from "@/components/quiz";
import {
  findLesson,
  getCourseBySlug,
  listCourseSlugs,
  listLessonsFlat,
} from "@/lib/courses";

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
  return {
    title: `${found.lesson.title} · ${course.title}`,
    description: found.lesson.summary,
  };
}

export default async function LessonPage({ params }: { params: Params }) {
  const { slug, lessonSlug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();
  const found = findLesson(course, lessonSlug);
  if (!found) notFound();

  const { lesson, moduleTitle, moduleIndex, prev, next } = found;

  return (
    <>
      {/* ===== Lesson Hero ===== */}
      <Section className="border-b border-line/60 pt-36">
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

        <div className="mt-10 grid gap-12 md:grid-cols-[1.6fr_1fr] md:items-end">
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
          </div>

          <div className="border-l border-line/70 pl-7">
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
          </div>
        </div>
      </Section>

      {/* ===== Body ===== */}
      <Section className="border-b border-line/60">
        <article className="mx-auto max-w-3xl">
          <LessonRenderer blocks={lesson.body} />
        </article>
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
