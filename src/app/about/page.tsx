import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { NewsletterForm } from "@/components/newsletter-form";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "关于",
  description:
    "WindHero 由站长良辰主理——一个从零开始的船长。这里写下他为什么办这所学校。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="关于"
          title={
            <>
              我办这所学校，
              <br />
              是因为我自己想上的那一所并不存在。
            </>
          }
          lead="WindHero 是一个由一名「从零开始的船长」搭建的学校——也是一份公开的学习笔记。它的每一节课都是站长良辰自己在学的那一节；写出来既是为了让下一个想学航海的人不必再独自摸索，也是为了让自己学得更扎实。"
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
              WindHero 是这段学习的副产品。每读懂一个概念、跑通一次操作，我就把它整理成一节课——
              用一个「初学者」的视角写给「初学者」。如果你也站在岸边、看着远方的桅杆想着「我能学会吗」——这门课就是给你的。
            </p>
          </div>

          <article className="border-l border-line/70 pl-8 md:pl-12">
            <Eyebrow>站长手记</Eyebrow>
            <div className="mt-6 space-y-7 text-[1rem] leading-[1.95] text-ink prose-zh md:text-[1.05rem]">
              <p>
                这个站是我一个人写的。每一门课、每一道题、每一张图，都是我自己先读懂、再写出来。
              </p>
              <p>
                所以这不是一所有「全明星师资」的学校。它更像一个开放的学习笔记——
                我在前面踩着别人踩过的浪，把自己摔倒的地方画成图，
                让走在我后面的人不必再摔同样一次。
              </p>
              <p>
                我对标的是 RYA（英国皇家游艇协会）的笔试体系：
                Day Skipper Theory、Coastal &amp; Yachtmaster Theory、Sea Survival、VHF/SRC、
                Yachtmaster Ocean Theory。WindHero 的目标是覆盖这五张笔试所有知识点，
                并用一个「为什么」的视角讲透每一个公式与每一条规则。
              </p>
              <p>
                但 RYA 证书 WindHero 不发——按规定，那必须由 RYA 认证学校在认证海图与认证海上时间里完成。
                WindHero 能做的是：让你在登上认证学校的甲板之前，已经站得稳。
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
              不抄教材，只解释原理。
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              所有正文、题目、案例都由我亲笔写。对标 RYA 笔试大纲，
              但用我作为初学者最不能接受「死记硬背」的那种态度，把每一个为什么讲到底。
            </p>
          </div>
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              02 · 严格考试
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              真的考你。
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              每门课配真实考场体验——倒计时不可暂停、随机抽题、错题汇总。
              重做必抽新题。能稳过的人是真懂的人。
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
              这是最方便走进 WindHero 的路。
            </h3>
            <p className="mt-3 text-[0.95rem] leading-[1.9] text-ink-soft">
              每月一封——新写完的课、读过的一篇好天气分析、
              以及我作为初学者最近又被打脸的地方。
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
