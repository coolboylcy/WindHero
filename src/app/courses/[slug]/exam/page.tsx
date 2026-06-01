import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section";
import { Quiz } from "@/components/quiz";
import { getCourseBySlug, listCourseSlugs } from "@/lib/courses";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return listCourseSlugs()
    .filter((slug) => !!getCourseBySlug(slug)?.exam)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course || !course.exam) return { title: "未找到考试" };
  return {
    title: `期末模拟考 · ${course.title}`,
    description: course.exam.brief,
  };
}

export default async function ExamPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course || !course.exam) notFound();

  return (
    <>
      <Section className="relative overflow-hidden border-b border-line/60 pt-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.13]"
          style={{
            backgroundImage: "url('/images/generated/course-chart-desk-v1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="wh-chart-wash -z-10" />
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" />
          回到 {course.code} · {course.title}
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="font-mono text-[0.74rem] tracking-[0.14em] text-sea-deep">
            {course.code} · 期末模拟考
          </p>
          <h1 className="display mt-5 text-balance text-4xl text-ink md:text-5xl">
            把你学到的判断力，跑一遍。
          </h1>
          <p className="prose-zh mt-7 text-[1.04rem] text-ink-soft">
            {course.exam.brief}
          </p>

          <dl className="wh-instrument-panel mt-10 grid grid-cols-3 gap-6 rounded-sm px-6 py-5 font-mono text-[0.84rem]">
            <ExamMeta label="时长" value={`${course.exam.durationMinutes} 分钟`} />
            <ExamMeta label="题数" value={`${course.exam.questions.length}`} />
            <ExamMeta label="通过线" value={`${course.exam.passMark}%`} />
          </dl>
          <div className="wh-status-strip mt-5">
            <span>Chart table mode</span>
            <span>No pause</span>
            <span>Submit once</span>
          </div>
        </div>
      </Section>

      <Quiz
        questions={course.exam.questions}
        mode="exam"
        passMark={course.exam.passMark}
        durationMinutes={course.exam.durationMinutes}
        drawCount={course.exam.drawCount}
        title={`${course.title} · 期末考试`}
      />
    </>
  );
}

function ExamMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-mist">
        {label}
      </dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}
