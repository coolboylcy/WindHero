import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  ExternalLink,
  GraduationCap,
  ListChecks,
  Map,
} from "lucide-react";
import { Section } from "@/components/section";
import {
  getCourseBySlug,
  listLessonsFlat,
  listCourseSlugs,
} from "@/lib/courses";
import { getMapping } from "@/lib/certifications/mappings";
import {
  courseStages,
  stageInfo,
  type Stage,
} from "@/lib/certifications/stages";
import { bodyInfo, type CertBody } from "@/lib/certifications/comparison";
import { breadcrumbLd, courseLd, jsonLdScript } from "@/lib/seo/jsonld";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return listCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "未找到课程" };
  return {
    title: `${course.title} · ${course.code}`,
    description: course.summary,
  };
}

const resourceLabel: Record<string, string> = {
  book: "图书",
  tool: "工具",
  app: "应用",
  site: "网站",
  video: "视频",
  chart: "海图",
  "open-source": "开源",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const breadcrumb = breadcrumbLd([
    { name: "首页", url: "/" },
    { name: "课程", url: "/courses" },
    { name: course.title, url: `/courses/${course.slug}` },
  ]);
  const flatLessons = listLessonsFlat(course);
  const totalLessons = flatLessons.length;
  const firstLesson = flatLessons[0]?.lesson;
  const examDrawCount =
    course.exam?.drawCount && course.exam.drawCount < course.exam.questions.length
      ? course.exam.drawCount
      : course.exam?.questions.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(courseLd(course)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      {/* ===== Hero ===== */}
      <Section className="relative overflow-hidden border-b border-line/60 pt-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage: "url('/images/generated/course-chart-desk-v1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="wh-chart-wash -z-10" />
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" />
          全部课程
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.45fr_0.95fr] lg:items-end">
          <div>
            <div className="flex items-baseline gap-4 font-mono text-[0.74rem] tracking-[0.14em] text-sea-deep">
              <span>{course.code}</span>
              <span className="text-mist">·</span>
              <span className="text-mist">{course.level}</span>
            </div>
            <h1 className="display mt-5 text-balance text-5xl text-ink md:text-6xl lg:text-[4rem]">
              {course.title}
            </h1>
            <p className="prose-zh mt-7 max-w-2xl text-[1.05rem] text-ink-soft md:text-[1.1rem]">
              {course.summary}
            </p>
            <div className="wh-status-strip mt-8">
              <span>Pathway · {course.level}</span>
              <span>{course.modules.length} modules</span>
              <span>{totalLessons} lessons</span>
            </div>
          </div>

          <aside className="wh-instrument-panel rounded-sm p-5">
            <div
              aria-hidden
              className="min-h-[210px] rounded-sm border border-line/60 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/generated/course-chart-desk-v1.png')",
              }}
            />
            <dl className="mt-5 grid gap-5 font-mono text-[0.84rem] sm:grid-cols-3 lg:grid-cols-1">
              <Meta label="时长" value={course.duration} icon={Clock} />
              <Meta
                label="RYA 对标"
                value={course.ryaEquivalent}
                icon={GraduationCap}
              />
              <Meta
                label="模块"
                value={`${course.modules.length} 个模块 · ${course.modules.reduce(
                  (s, m) => s + m.lessons.length,
                  0
                )} 课时`}
                icon={BookOpen}
              />
            </dl>
            <div className="mt-6 grid gap-2">
              {firstLesson ? (
                <Link
                  href={`/courses/${course.slug}/${firstLesson.slug}`}
                  className="inline-flex items-center justify-between gap-3 rounded-sm bg-ink px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-paper transition-colors hover:bg-sea-deep"
                >
                  开始第一课
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
              {course.exam ? (
                <Link
                  href={`/courses/${course.slug}/exam`}
                  className="inline-flex items-center justify-between gap-3 rounded-sm border border-line bg-paper/70 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-paper-soft"
                >
                  查看模拟考
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>

      {/* ===== 适合 + 学完能做 ===== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">这门课适合谁</p>
            <ul className="mt-6 space-y-4 text-[0.98rem] leading-[1.85] text-ink">
              {course.suitableFor.map((x, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.6rem_1fr] items-baseline gap-3"
                >
                  <span className="mt-[0.7em] h-px w-3 bg-sea-deep" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">学完你能做什么</p>
            <ul className="mt-6 space-y-4 text-[0.98rem] leading-[1.85] text-ink">
              {course.youWillLearn.map((x, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3"
                >
                  <span className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ===== 学习路径 ===== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">学习路径</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              像排一条航线一样，把这门课跑完。
            </h2>
            <p className="mt-5 max-w-md text-[0.96rem] leading-[1.85] text-ink-soft">
              先按模块顺序完成课时，再用小测校准理解；有期末模拟考的课程，最后进考场模式做一次闭环。
            </p>
            <dl className="mt-7 grid gap-3 font-mono text-[0.78rem] sm:grid-cols-3 lg:grid-cols-1">
              <PathMeta icon={Map} label="阶段" value={course.level} />
              <PathMeta icon={BookOpen} label="课时" value={`${totalLessons} 课时`} />
              <PathMeta
                icon={ListChecks}
                label="评估"
                value={course.exam ? `抽 ${examDrawCount} 题` : "线下完成"}
              />
            </dl>
          </div>

          <div className="grid gap-px bg-line/70 md:grid-cols-2">
            {course.modules.map((module) => {
              const first = module.lessons[0];
              return (
                <article key={module.slug} className="bg-paper p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-4 font-mono text-[0.7rem] tracking-[0.14em] text-sea-deep">
                    <span>模块 {String(module.index).padStart(2, "0")}</span>
                    <span className="text-mist">{module.lessons.length} lessons</span>
                  </div>
                  <h3 className="display mt-3 text-xl text-ink">{module.title}</h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.75] text-ink-soft">
                    {module.summary}
                  </p>
                  {first ? (
                    <Link
                      href={`/courses/${course.slug}/${first.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-[0.82rem] text-sea-deep transition-colors hover:text-ink"
                    >
                      从 {first.index} 开始
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </article>
              );
            })}
            {course.exam ? (
              <Link
                href={`/courses/${course.slug}/exam`}
                className="group flex flex-col justify-between bg-ink p-6 text-paper transition-colors hover:bg-sea-deep md:p-7"
              >
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sun-soft">
                    Final check
                  </p>
                  <h3 className="display mt-3 text-xl">期末模拟考</h3>
                  <p className="mt-3 text-[0.88rem] leading-[1.75] text-paper-soft">
                    {course.exam.durationMinutes} 分钟 · 通过线 {course.exam.passMark}% · 抽题后一次交卷。
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.82rem] text-sun-soft">
                  进入考场
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </Section>

      {/* ===== 模块与课时 ===== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">课程大纲</p>
        <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
          每一课都在练同一件事——读懂风。
        </h2>

        <div className="mt-14 space-y-16">
          {course.modules.map((m) => (
            <article key={m.slug} id={m.slug} className="scroll-mt-32">
              <header className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <p className="font-mono text-[0.74rem] tracking-[0.14em] text-sea-deep">
                    模块 {String(m.index).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-2xl text-ink md:text-[1.7rem]">
                    {m.title}
                  </h3>
                </div>
                <p className="max-w-md text-[0.94rem] leading-[1.85] text-ink-soft">
                  {m.summary}
                </p>
              </header>

              <div className="mt-8 grid gap-px bg-line/70 md:grid-cols-2">
                {m.lessons.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/courses/${course.slug}/${l.slug}`}
                    className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60 md:p-8"
                  >
                    <div className="flex items-baseline justify-between font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                      <span>{l.index}</span>
                      <span className="text-mist">{l.duration}</span>
                    </div>
                    <h4 className="display mt-4 text-xl text-ink md:text-2xl">
                      {l.title}
                    </h4>
                    <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
                      {l.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
                      开始这一课
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ===== 期末考试（仅在课程有 exam 时显示） ===== */}
      {course.exam ? (
        <Section className="border-b border-line/60">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
            <div>
              <p className="eyebrow">期末模拟考</p>
              <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
                真正测一遍你的判断力。
              </h2>
            </div>
            <div className="space-y-6 border-l border-line/70 pl-8">
              <p className="prose-zh text-[1rem] text-ink">{course.exam.brief}</p>
              <dl className="grid grid-cols-3 gap-4 font-mono text-[0.78rem]">
                <ExamMeta label="时长" value={`${course.exam.durationMinutes} 分钟`} />
                <ExamMeta
                  label="题数"
                  value={
                    course.exam.drawCount &&
                    course.exam.drawCount < course.exam.questions.length
                      ? `抽 ${course.exam.drawCount} / 池 ${course.exam.questions.length}`
                      : `${course.exam.questions.length}`
                  }
                />
                <ExamMeta label="通过线" value={`${course.exam.passMark}%`} />
              </dl>
              {course.exam.refersTo ? (
                <p className="text-[0.84rem] leading-[1.7] text-mist">
                  {course.exam.refersTo}
                </p>
              ) : null}
              <Link
                href={`/courses/${course.slug}/exam`}
                className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
              >
                进入模拟考
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Section>
      ) : course.practicalNote ? (
        <Section className="border-b border-line/60">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
            <div>
              <p className="eyebrow">关于评估</p>
              <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
                这门课不在屏幕上结业。
              </h2>
            </div>
            <p className="prose-zh border-l border-line/70 pl-8 text-[1rem] text-ink">
              {course.practicalNote}
            </p>
          </div>
        </Section>
      ) : null}

      {/* ===== 三体系映射 ===== */}
      {(() => {
        const mapping = getMapping(course.slug);
        if (!mapping) return null;
        const bodies: CertBody[] = ["rya", "asa", "iyt"];
        return (
          <Section className="border-b border-line/60 bg-paper-soft/30">
            <p className="eyebrow">对应认证体系</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              这门课能让你过哪些笔试。
            </h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-soft">
              本课覆盖的 RYA / ASA / IYT 大纲条目。看不到对应的体系——说明那个体系把这部分知识融在了别的课里，你只要全跑通 WindHero 13 门，三体系都不缺。
            </p>

            <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-3">
              {bodies.map((b) => {
                const items = mapping[b];
                const info = bodyInfo[b];
                return (
                  <article key={b} className="flex flex-col bg-paper p-6 md:p-7">
                    <div className="flex items-baseline justify-between font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                      <span>{info.name}</span>
                      <span className="text-mist">{info.country}</span>
                    </div>
                    <p className="mt-2 text-[0.78rem] text-mist">{info.fullName}</p>
                    {items.length > 0 ? (
                      <ul className="mt-5 space-y-2 text-[0.86rem] leading-[1.7] text-ink-soft">
                        {items.map((it, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[1.2rem_1fr] items-baseline gap-2"
                          >
                            <BookOpen className="mt-[0.2em] h-3 w-3 text-sea-deep" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-5 text-[0.86rem] leading-[1.7] text-mist">
                        无直接对应——本主题在 {info.name} 体系中融入其他课程。
                      </p>
                    )}
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-[0.86rem]">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-1.5 text-sea-deep underline-offset-4 hover:underline"
              >
                查看三体系完整对照
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-mist">·</span>
              <Link
                href="/schools"
                className="inline-flex items-center gap-1.5 text-sea-deep underline-offset-4 hover:underline"
              >
                找认证学校做实操
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Section>
        );
      })()}

      {/* ===== 必须线下完成的部分 ===== */}
      {(() => {
        const stages = courseStages[course.slug] ?? [];
        const needsPractical = stages.some((s) =>
          (["crew", "day-skipper", "night-coastal", "offshore", "ocean"] as Stage[]).includes(s)
        );
        if (!needsPractical) return null;
        return (
          <Section className="border-b border-line/60">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
              <div>
                <p className="eyebrow">线下必须完成的部分</p>
                <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
                  这门课学完后，
                  <br />
                  下一步去认证学校。
                </h2>
                <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
                  按 {course.ryaEquivalent} 等级，本课对应的实操考核、海上里程、湿训部分必须在 RYA / ASA / IYT 认证学校完成。WindHero 让你登船时已经站得稳，但发证仍由认证学校。
                </p>
                <ul className="mt-6 space-y-2.5 text-[0.9rem] leading-[1.75] text-ink-soft">
                  {stages.slice(0, 3).map((s) => (
                    <li key={s} className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
                      <Anchor className="mt-[0.2em] h-3.5 w-3.5 text-coral" />
                      <span>
                        <strong className="text-ink">{stageInfo[s].label}</strong>
                        {" "}阶段实操：{stageInfo[s].ryaEquiv} / {stageInfo[s].asaEquiv} / {stageInfo[s].iytEquiv}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/schools"
                className="group flex flex-col justify-center rounded-sm border border-coral/40 bg-coral/5 p-8 transition-colors hover:bg-coral/10 md:p-10"
              >
                <Anchor className="h-7 w-7 text-coral" />
                <h3 className="display mt-5 text-2xl text-ink">
                  全球认证学校目录
                </h3>
                <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">
                  24 所精选学校，可按地区、认证体系、阶段、中文支持筛选。
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-coral transition-colors group-hover:text-ink">
                  查看学校目录
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </Section>
        );
      })()}

      {/* ===== 资源 ===== */}
      <Section>
        <p className="eyebrow">推荐资源</p>
        <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
          我们自己也在用的工具与读物。
        </h2>

        <div className="mt-12 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
          {course.resources.map((r) => (
            <a
              key={r.title}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60"
            >
              <div className="flex items-baseline justify-between font-mono text-[0.7rem] tracking-[0.14em] text-mist">
                <span>{resourceLabel[r.type] ?? r.type}</span>
                <span className={r.free ? "text-sea-deep" : "text-mist"}>
                  {r.free ? "FREE" : "PAID"}
                </span>
              </div>
              <h3 className="display mt-3 text-lg text-ink">{r.title}</h3>
              <p className="mt-3 flex-1 text-[0.9rem] leading-[1.8] text-ink-soft">
                {r.description}
              </p>
              {r.guide ? (
                <p className="mt-4 border-t border-line/70 pt-4 text-[0.82rem] leading-[1.75] text-mist">
                  {r.guide}
                </p>
              ) : null}
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] text-sea-deep transition-colors group-hover:text-ink">
                打开
                <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}

function Meta({
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
      <dt className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.16em] text-mist">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className="mt-2 text-[0.96rem] text-ink">{value}</dd>
    </div>
  );
}

function PathMeta({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-sm border border-line/70 bg-paper/70 p-4">
      <dt className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-mist">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-2 text-[0.94rem] text-ink">{value}</dd>
    </div>
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
