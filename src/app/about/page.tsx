import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { NewsletterForm } from "@/components/newsletter-form";
import { createPageMetadata } from "@/lib/seo/metadata";
import { jsonLdScript, webPageLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = createPageMetadata({
  title: "关于",
  description:
    "WindHero 由良辰主理。这里写下这个中文航海理论站为什么开始。",
  path: "/about",
});

export default function AboutPage() {
  const pageSchema = webPageLd({
    type: "AboutPage",
    name: "关于 WindHero 逐风人",
    description: "WindHero 站长良辰为什么搭建这所中文航海学院。",
    url: "/about",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(pageSchema) }}
      />
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          level={1}
          eyebrow="关于"
          title={
            <>
              我只是把自己学航海时，
              <br />
              最想有人讲清楚的东西写下来。
            </>
          }
          lead="我从零开始学船长。读教材、查规则、做题、上船之后，发现很多知识并不是难，而是没人用初学者听得懂的顺序讲。所以我把它们整理成这个站。"
        />
      </Section>

      {/* ===== 站长信 ===== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>站长</Eyebrow>
            <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
              良辰。
            </h2>
            <p className="mt-3 font-mono text-[0.78rem] tracking-[0.16em] text-sea-deep">
              FOUNDER · 从零开始的船长
            </p>
            <p className="mt-8 max-w-md text-[0.96rem] leading-[1.9] text-ink-soft">
              我没有海军背景，没有家族船队，也不是从小被父亲带在船上长大的那种人。
              三十岁这一年，我决定从零开始学航海。
            </p>
            <p className="mt-5 max-w-md text-[0.96rem] leading-[1.9] text-ink-soft">
              WindHero 是这段学习的副产品。每读懂一个概念、跑通一次操作，我就把它整理成一节课。
              如果你也刚开始学，里面应该会有几处正好替你省下时间。
            </p>
          </div>

          <article className="border-l border-line/70 pl-8 md:pl-12">
            <Eyebrow>站长手记</Eyebrow>
            <div className="mt-6 space-y-7 text-[1rem] leading-[1.95] text-ink prose-zh md:text-[1.05rem]">
              <p>
                这个站是我一个人写的。每一门课、每一道题、每一张图，都是我自己先读懂、再写出来。
              </p>
              <p>
                所以这不是一所有「全明星师资」的学校。它更像一份公开笔记：
                我把自己查资料、算海图、做错题时卡住的地方记下来，
                也把后来想明白的那一步补上。
              </p>
              <p>
                我对标的是 RYA（英国皇家游艇协会）的笔试体系：
                Day Skipper Theory、Coastal &amp; Yachtmaster Theory、Sea Survival、VHF/SRC、
                Yachtmaster Ocean Theory。WindHero 的目标是覆盖这五张笔试所有知识点，
                并用一个「为什么」的视角讲透每一个公式与每一条规则。
              </p>
              <p>
                但 RYA 证书 WindHero 不发——按规定，那必须由 RYA 认证学校在认证海图与认证海上时间里完成。
                WindHero 能做的是：让你登上认证学校的甲板之前，少一点慌。
              </p>
              <p>
                如果你也是从零开始的航海者，欢迎写信给我。我读每一封。
              </p>
              <p className="text-mist">
                —— 良辰
              </p>
            </div>
          </article>
        </div>
      </Section>

      {/* ===== 教学理念 ===== */}
      <Section className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              01 · 一手原创
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              尽量讲清楚来龙去脉。
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              正文、题目、案例都自己写。会对照 RYA 笔试大纲，
              但不照搬教材话术，尽量把公式和规则背后的原因讲出来。
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              02 · 严格考试
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              题目不会太客气。
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              每门课配倒计时、随机抽题和错题汇总。重做会重新抽题，
              目的不是为难人，是避免只记住上一轮答案。
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              03 · 开放与开源
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              一切都写在仓库里。
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              代码、内容、试题、图解——全部在 GitHub 开源。
              你可以提 issue、提 PR、把它 fork 走，按自己的航海舞台改写。
            </p>
          </div>
        </div>
      </Section>

      {/* ===== 联系 ===== */}
      <Section id="contact" className="border-b border-line/60">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>写信给我</Eyebrow>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              联系。
            </h2>
            <p className="mt-4 max-w-md text-[0.98rem] leading-[1.9] text-ink-soft">
              想推荐一本被遗漏的书、指出一道题的错误、聊聊一段你自己跑过的航段——
              都写信给我。每一封都会读到。
            </p>

            <dl className="mt-10 space-y-6 border-t border-line/70 pt-8">
              <div>
                <dt className="eyebrow">站长</dt>
                <dd className="display mt-2 text-xl text-ink">
                  良辰
                </dd>
                <dd className="font-mono text-xs text-mist">
                  从零开始的船长
                </dd>
              </div>
              <div>
                <dt className="eyebrow">邮箱</dt>
                <dd className="mt-2">
                  <Link
                    href="mailto:hello@windhero.app"
                    className="inline-flex items-center gap-2 text-base text-ink hover:text-sea-deep"
                  >
                    <Mail className="h-4 w-4 text-sea" />
                    hello@windhero.app
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">开源仓库</dt>
                <dd className="mt-2">
                  <Link
                    href="https://github.com/coolboylcy/WindHero"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base text-ink hover:text-sea-deep"
                  >
                    github.com/coolboylcy/WindHero
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="border border-line/70 bg-paper-soft/30 p-8 md:p-10">
            <Eyebrow>船长信</Eyebrow>
            <h3 className="display mt-4 text-[1.8rem] text-ink">
              想跟着更新，可以订这封信。
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.9] text-ink-soft">
              每月一封：新写完的课、最近读到的好资料，
              还有我自己学航海时又踩到的小坑。
            </p>
            <div className="mt-7">
              <NewsletterForm source="about" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
