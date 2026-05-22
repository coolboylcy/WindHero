import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/section";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "关于",
  description:
    "谁在主理 WindHero，我们在哪里航海，以及怎么找到岸上的办公室。",
};

const crew = [
  {
    name: "林 维",
    role: "创始人 · 主讲船长",
    bio: "南海引航员，远洋航程超过 60,000 海里，前气象官。相信一门课程必须在真实天气里能被验证。",
  },
  {
    name: "Marisol Ortega",
    role: "课程总监",
    bio: "Yachtmaster Ocean。曾为两支 ARC 跨大西洋船队和一支悉尼-霍巴特船队做安全训练。",
  },
  {
    name: "新垣 俊志",
    role: "引航与天文导航",
    bio: "驻冲绳，引航员兼传统航海者。教会你电子海图遗忘的那一半导航功夫。",
  },
  {
    name: "Henrik Sund",
    role: "天气与航路",
    bio: "前北大西洋邮轮的航路气象官。读 GRIB 的方式，像医生读核磁共振。",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="border-b border-white/5 pt-32">
        <SectionHeading
          eyebrow="关于"
          title={
            <>
              我们办这所学校，
              <br />
              是因为我们自己<span className="text-gold">想上的那一所并不存在。</span>
            </>
          }
          lead="WindHero 是一所刻意保持小规模、刻意国际化的学校，由在役船长、气象人和远洋教练共同搭建。我们教那些一个人摸索要花很多年才能学会的部分；也教那些海会顺手让你学会的——关于生活的部分。"
        />
      </Section>

      <Section className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>船员名单</Eyebrow>
            <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
              都是真正跑过这些海的人。
            </h2>
            <p className="mt-4 max-w-md text-sm leading-[1.85] text-mist/70">
              导师会和你一起在真实航段上值班。没有明星代言人，
              后甲板上也没有市场部。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            {crew.map((p) => (
              <article key={p.name} className="bg-ink p-7">
                <p className="display text-2xl text-sail">{p.name}</p>
                <p className="mt-1 text-[0.72rem] tracking-[0.28em] text-gold/80">
                  {p.role}
                </p>
                <p className="mt-4 text-sm leading-[1.85] text-mist/70">
                  {p.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>岸上办公室</Eyebrow>
            <h2 className="display mt-4 text-3xl text-sail md:text-4xl">
              联系我们。
            </h2>
            <p className="mt-4 max-w-md text-sm leading-[1.85] text-mist/70">
              想做内部船员班、合作、或登上某段远洋——请写信给我们。
              每一封都会被读到，工作日内两日回复。
            </p>

            <dl className="mt-10 space-y-6 border-t border-white/10 pt-8">
              <div>
                <dt className="eyebrow !text-mist/50">办公室</dt>
                <dd className="display mt-2 text-xl text-sail">
                  香港仔游艇会，香港
                </dd>
                <dd className="font-mono text-xs tracking-[0.24em] text-mist/55">
                  22°14′N · 114°09′E
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-mist/50">邮箱</dt>
                <dd className="mt-2">
                  <Link
                    href="mailto:hello@windhero.app"
                    className="inline-flex items-center gap-2 text-base text-sail hover:text-gold"
                  >
                    <Mail className="h-4 w-4 text-gold/80" />
                    hello@windhero.app
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-mist/50">开源仓库</dt>
                <dd className="mt-2">
                  <Link
                    href="https://github.com/coolboylcy/WindHero"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-base text-sail hover:text-gold"
                  >
                    github.com/coolboylcy/WindHero
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          <aside className="border border-white/10 bg-gradient-to-b from-deep/40 to-transparent p-8 md:p-10">
            <p className="eyebrow">订阅船长信</p>
            <h3 className="display mt-4 text-3xl text-sail">
              这是最方便走进 WindHero 的路。
            </h3>
            <p className="mt-3 text-sm leading-[1.85] text-mist/70">
              每月一封——新的航段、值得读的一段天气、以及一篇最近航程留下的船长日志。
            </p>
            <div className="mt-6">
              <NewsletterForm source="about" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
