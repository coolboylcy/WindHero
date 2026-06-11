import type { Metadata } from "next";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "宣言",
  description:
    "WindHero 的几条原则：为什么学航海、怎么学理论，以及为什么实操必须回到船上。",
  path: "/manifesto",
});

const articles: { n: string; t: string; body: string }[] = [
  {
    n: "01",
    t: "海上没有自动推荐。",
    body: "风会变，船会偏，人会累。很多决定没人替你做，也没人帮你撤回。学航海的第一课，就是承认这些决定真的会算数。",
  },
  {
    n: "02",
    t: "先学会，再谈身份。",
    body: "证书有用，但证书不是一切。你还是要会看风、会守班、会承认自己不知道。WindHero 先讲这些基本功。",
  },
  {
    n: "03",
    t: "安全不是扫兴。",
    body: "退路港、前向尸检、值班表、缩帆时机，这些听起来不酷，但它们决定一趟航程能不能继续。好船长不是永远往前冲的人。",
  },
  {
    n: "04",
    t: "小船员，长航段。",
    body: "人少，事情才会落到每个人手上。做饭、值班、看天气、收帆，轮到你做过一次，才知道课本上的词是什么意思。",
  },
  {
    n: "05",
    t: "理论最后要回到船上。",
    body: "网页能讲清楚概念，不能替你完成实操。WindHero 做理论准备；船上的手法、证书和海上时间，还是要去学校和船上完成。",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">宣言</p>
          <h1 className="display mt-6 text-balance text-[2.6rem] text-ink md:text-[4.2rem] md:leading-[1.05]">
            几条写给自己看的原则，
            <br />
            也写给刚开始学航海的人。
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-[1rem] leading-[1.92] text-ink-soft md:text-[1.05rem]">
            不算规矩，只是这个站写下去时不想忘的几件事。
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          {articles.map((a) => (
            <article
              key={a.n}
              className="grid grid-cols-[3rem_1fr] gap-8 border-t border-line/70 py-14 first:border-t-0"
            >
              <p className="font-mono text-[0.85rem] tracking-[0.12em] text-sea">
                {a.n}
              </p>
              <div>
                <h2 className="display text-[1.7rem] text-ink md:text-[1.9rem]">
                  {a.t}
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.92] text-ink-soft">
                  {a.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-2xl border-t border-line/70 pt-16 text-center">
          <p className="display text-[2rem] text-ink md:text-[2.6rem]">
            驾驭风的方向。
          </p>
          <p className="mt-4 font-mono text-[0.74rem] tracking-[0.28em] text-mist">
            MASTER&nbsp;&nbsp;THE&nbsp;&nbsp;WIND&nbsp;&nbsp;·&nbsp;&nbsp;WINDHERO
          </p>
        </div>
      </Section>
    </>
  );
}
