import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ListChecks, ShieldCheck } from "lucide-react";
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
  const drawSize =
    course.exam.drawCount && course.exam.drawCount < course.exam.questions.length
      ? course.exam.drawCount
      : course.exam.questions.length;

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

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.74rem] tracking-[0.14em] text-sea-deep">
              {course.code} · 期末模拟考
            </p>
            <h1 className="display mt-5 text-balance text-4xl text-ink md:text-5xl">
              把你学到的判断力，跑一遍。
            </h1>
            <p className="prose-zh mt-7 text-[1.04rem] text-ink-soft">
              {course.exam.brief}
            </p>

            <dl className="wh-instrument-panel mt-10 grid gap-5 rounded-sm px-6 py-5 font-mono text-[0.84rem] sm:grid-cols-3">
              <ExamMeta label="时长" value={`${course.exam.durationMinutes} 分钟`} icon={Clock} />
              <ExamMeta label="本次题数" value={`${drawSize}`} icon={ListChecks} />
              <ExamMeta label="通过线" value={`${course.exam.passMark}%`} icon={ShieldCheck} />
            </dl>
            <div className="wh-status-strip mt-5">
              <span>Chart table mode</span>
              <span>No pause</span>
              <span>Submit once</span>
            </div>
          </div>

          <aside className="wh-dark-panel rounded-sm p-6 text-paper">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sun-soft">
              Exam station
            </p>
            <h2 className="display mt-3 text-2xl text-paper">考前状态</h2>
            <ol className="mt-6 space-y-4 text-[0.88rem] leading-[1.7] text-paper-soft">
              <li className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sun-soft">01</span>
                <span>从 {course.exam.questions.length} 题题库中抽 {drawSize} 题。</span>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sun-soft">02</span>
                <span>开始后倒计时立即运行，中途不暂停。</span>
              </li>
              <li className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sun-soft">03</span>
                <span>交卷后一次性看成绩、错题和解析。</span>
              </li>
            </ol>
            {course.exam.refersTo ? (
              <p className="mt-6 border-t border-paper/15 pt-4 text-[0.78rem] leading-[1.65] text-mist">
                {course.exam.refersTo}
              </p>
            ) : null}
          </aside>
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

function ExamMeta({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-mist">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}
