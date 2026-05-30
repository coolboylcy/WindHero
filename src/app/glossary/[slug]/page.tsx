import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Section } from "@/components/section";
import {
  categoryInfo,
  getTerm,
  listTermSlugs,
} from "@/lib/glossary/data";
import { getCourseBySlug } from "@/lib/courses";
import { breadcrumbLd, jsonLdScript } from "@/lib/seo/jsonld";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return listTermSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return { title: "未找到术语" };

  return {
    title: `${term.zh}（${term.en}）· 航海词典`,
    description: term.short + " · " + term.long.slice(0, 80),
    keywords: [term.zh, term.en, ...(term.aliases ?? []), "航海术语", "帆船词典"],
  };
}

export default async function TermPage({ params }: { params: Params }) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const cat = categoryInfo[term.category];
  const courses = (term.seeAlso ?? [])
    .map((s) => getCourseBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumb = breadcrumbLd([
    { name: "首页", url: "/" },
    { name: "词典", url: "/glossary" },
    { name: term.zh, url: `/glossary/${term.slug}` },
  ]);

  // 单术语 schema.org/DefinedTerm
  const termSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.zh,
    alternateName: [term.en, ...(term.aliases ?? [])],
    description: term.long,
    inDefinedTermSet: "https://windhero.vercel.app/glossary",
    inLanguage: "zh-CN",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(termSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />

      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mist transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3 w-3" />
          回到词典
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sun-deep">
            {cat.sub} · {cat.label}
          </p>
          <h1 className="display mt-4 text-balance text-5xl text-ink md:text-6xl">
            {term.zh}
          </h1>
          <p className="mt-3 font-mono text-[1rem] tracking-[0.06em] text-sea-deep">
            {term.en}
            {term.aliases && term.aliases.length > 0 ? (
              <span className="text-mist">
                {" · "}
                {term.aliases.join(" · ")}
              </span>
            ) : null}
          </p>
          <p className="prose-zh mt-7 text-[1.08rem] leading-[1.85] text-ink-soft">
            {term.short}
          </p>
        </div>
      </Section>

      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <article className="prose-zh max-w-2xl text-[1.02rem] leading-[1.9] text-ink">
            <p>{term.long}</p>
          </article>

          <aside className="space-y-7 lg:border-l lg:border-line/70 lg:pl-8">
            {courses.length > 0 ? (
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                  相关课程
                </p>
                <ul className="mt-4 space-y-3">
                  {courses.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/courses/${c.slug}`}
                        className="group flex items-baseline gap-2 text-[0.94rem] text-ink hover:text-sea-deep"
                      >
                        <BookOpen className="mt-[0.2em] h-3.5 w-3.5 text-sea-deep" />
                        <span>
                          <span className="font-mono text-[0.72rem] text-sea-deep">
                            {c.code}
                          </span>{" "}
                          {c.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {term.related && term.related.length > 0 ? (
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
                  相关术语
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {term.related.map((rslug) => {
                    const r = getTerm(rslug);
                    if (!r) return null;
                    return (
                      <li key={r.slug}>
                        <Link
                          href={`/glossary/${r.slug}`}
                          className="inline-flex items-baseline gap-1.5 rounded-sm border border-line bg-paper-soft/30 px-2 py-1 text-[0.84rem] text-ink-soft hover:border-sea-deep hover:text-ink"
                        >
                          {r.zh}
                          <span className="font-mono text-[0.66rem] text-mist">
                            {r.en}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sun-deep">
            还有 119 个术语等你
          </p>
          <h2 className="display mt-5 text-3xl text-ink md:text-4xl">
            把它当一本工具书。
          </h2>
          <p className="mt-5 text-[0.96rem] leading-[1.9] text-ink-soft">
            不必从头读到尾——遇到不会的查一下，下次见到就熟了。
          </p>
          <Link
            href="/glossary"
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-6 py-3 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
          >
            回到词典
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>
    </>
  );
}
