import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  ExternalLink,
  MapPin,
  Users,
} from "lucide-react";
import { Section } from "@/components/section";
import {
  categoryInfo,
  getCase,
  listCaseSlugs,
  cases,
} from "@/lib/cases/data";
import { getCourseBySlug } from "@/lib/courses";
import { breadcrumbLd, jsonLdScript } from "@/lib/seo/jsonld";
import { absoluteUrl, createPageMetadata } from "@/lib/seo/metadata";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return listCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "未找到案例" };
  return createPageMetadata({
    title: c.title,
    description: c.hook,
    keywords: [c.title, c.titleEn, c.location, "航海事故", "海难案例", "WindHero"],
    path: `/cases/${c.slug}`,
    type: "article",
  });
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const cat = categoryInfo[c.category];

  // 抓相关课程供 lesson mapping 区块用
  const courseSlugs = Array.from(
    new Set(c.lessons.map((l) => l.course).filter((s): s is string => Boolean(s)))
  );
  const relatedCourses = courseSlugs
    .map((s) => getCourseBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumb = breadcrumbLd([
    { name: "首页", url: "/" },
    { name: "案例库", url: "/cases" },
    { name: c.title, url: `/cases/${c.slug}` },
  ]);

  // schema.org Article（NewsArticle 不合适，因为是史料）
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    alternativeHeadline: c.titleEn,
    description: c.hook,
    mainEntityOfPage: absoluteUrl(`/cases/${c.slug}`),
    url: absoluteUrl(`/cases/${c.slug}`),
    datePublished: c.date,
    locationCreated: c.location,
    inLanguage: "zh-CN",
    publisher: {
      "@type": "Organization",
      name: "WindHero 逐风人",
      url: "https://windhero.vercel.app",
    },
    citation: c.references.map((r) => r.title + " — " + r.source),
  };

  // 上下案例导航
  const idx = cases.findIndex((x) => x.slug === c.slug);
  const prev = idx > 0 ? cases[idx - 1] : undefined;
  const next = idx < cases.length - 1 ? cases[idx + 1] : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />

      {/* ===== Hero ===== */}
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" />
          回到案例库
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sun-deep">
            {cat.sub} · {cat.label}
          </p>
          <h1 className="display mt-5 text-balance text-4xl text-ink md:text-5xl lg:text-[3.4rem]">
            {c.title}
          </h1>
          <p className="mt-3 font-mono text-[0.86rem] tracking-[0.05em] text-sea-deep">
            {c.titleEn}
          </p>
          <p className="prose-zh mt-7 text-[1.06rem] leading-[1.85] text-ink-soft">
            {c.hook}
          </p>

          <dl className="mt-10 grid gap-6 border-y border-line/70 py-7 font-mono text-[0.84rem] sm:grid-cols-3">
            <Fact icon={Clock} label="时间" value={c.date} />
            <Fact icon={MapPin} label="地点" value={c.location} />
            <Fact icon={Users} label="规模" value={c.scale} />
          </dl>
        </div>
      </Section>

      {/* ===== 背景 ===== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">背景</p>
            <h2 className="display mt-4 text-2xl text-ink md:text-[1.8rem]">
              事件发生在什么环境下。
            </h2>
          </div>
          <article className="prose-zh space-y-5 text-[1.02rem] leading-[1.9] text-ink">
            {c.background.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </div>
      </Section>

      {/* ===== 时间线 ===== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">时间线</p>
        <h2 className="display mt-4 text-3xl text-ink md:text-[2rem]">
          按小时复盘。
        </h2>

        <ol className="mt-10 max-w-3xl space-y-6 border-l border-line/70 pl-6">
          {c.timeline.map((t, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.9rem] mt-2 h-2 w-2 rounded-full bg-sun ring-1 ring-sun/40"
              />
              <p className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                {t.time}
              </p>
              <p className="mt-2 text-[0.98rem] leading-[1.85] text-ink">
                {t.event}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== 调查结论 ===== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">调查结论</p>
            <h2 className="display mt-4 text-2xl text-ink md:text-[1.8rem]">
              调查方说了什么。
            </h2>
          </div>
          <article className="prose-zh space-y-5 text-[1.02rem] leading-[1.9] text-ink">
            {c.outcome.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </div>
      </Section>

      {/* ===== 经验教训 ===== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">我们能学到什么</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2rem]">
          每条经验都对应到 WindHero 一节课。
        </h2>

        <div className="mt-10 space-y-6">
          {c.lessons.map((l, i) => {
            const course = l.course ? getCourseBySlug(l.course) : undefined;
            return (
              <article
                key={i}
                className="border border-line/70 bg-paper p-6 md:p-7"
              >
                {course ? (
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-baseline gap-2 font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep hover:text-ink"
                  >
                    <BookOpen className="h-3 w-3" />
                    {course.code} · {course.title}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : null}
                <p className="prose-zh mt-3 text-[1rem] leading-[1.85] text-ink">
                  {l.text}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ===== 参考资料 ===== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">参考资料</p>
        <h2 className="display mt-4 text-2xl text-ink md:text-[1.8rem]">
          可查证的信息来源。
        </h2>
        <ul className="mt-8 max-w-3xl space-y-4">
          {c.references.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.4rem_1fr] items-baseline gap-3 border-b border-line/40 pb-4 last:border-b-0"
            >
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[0.96rem] leading-[1.6] text-ink">
                  {r.title}
                </p>
                <p className="mt-1 text-[0.82rem] text-mist">{r.source}</p>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[0.78rem] text-sea-deep hover:text-ink"
                  >
                    {r.url} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 相关课程 + 上下案例 ===== */}
      <Section>
        {relatedCourses.length > 0 ? (
          <>
            <p className="eyebrow">相关课程</p>
            <h2 className="display mt-4 text-2xl text-ink md:text-[1.8rem]">
              系统学下去。
            </h2>
            <div className="mt-8 grid gap-px bg-line/70 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/courses/${rc.slug}`}
                  className="group flex flex-col bg-paper p-5 transition-colors hover:bg-paper-soft/60"
                >
                  <span className="font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                    {rc.code}
                  </span>
                  <h3 className="display mt-2 text-lg text-ink">{rc.title}</h3>
                  <p className="mt-2 flex-1 text-[0.86rem] leading-[1.7] text-ink-soft">
                    {rc.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[0.78rem] text-sea-deep transition-colors group-hover:text-ink">
                    进入课程
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </>
        ) : null}

        <nav className="mt-16 grid gap-px bg-line/70 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/cases/${prev.slug}`}
              className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                <ArrowLeft className="h-3 w-3" />
                上一案例
              </span>
              <span className="display mt-3 text-lg text-ink">{prev.title}</span>
            </Link>
          ) : (
            <span className="bg-paper p-7 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
              已是第一篇
            </span>
          )}
          {next ? (
            <Link
              href={`/cases/${next.slug}`}
              className="group flex flex-col bg-paper p-7 text-right transition-colors hover:bg-paper-soft/60"
            >
              <span className="inline-flex items-center justify-end gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                下一案例
                <ArrowRight className="h-3 w-3" />
              </span>
              <span className="display mt-3 text-lg text-ink">{next.title}</span>
            </Link>
          ) : (
            <span className="bg-paper p-7 text-right font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
              已是最后一篇
            </span>
          )}
        </nav>
      </Section>
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] text-mist">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className="mt-2 text-[0.92rem] leading-[1.6] text-ink">{value}</dd>
    </div>
  );
}
