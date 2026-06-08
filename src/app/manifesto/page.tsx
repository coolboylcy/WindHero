import type { Metadata } from "next";
import { Section } from "@/components/section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "宣言",
  description:
    "WindHero 的宣言——我们为什么航海、我们教什么，以及我们希望帮你成为什么样的人。",
  path: "/manifesto",
});

const articles: { n: string; t: string; body: string }[] = [
  {
    n: "01",
    t: "海把决定权还给你。",
    body: "在一个不停替你做决定的时代——下一个视频、下一条路线、下一次多巴胺——海会把决定权还回到你手里。风、天气、航路、值班，每一个选择都是你的，每一个选择都是真的。请接住。",
  },
  {
    n: "02",
    t: "先有功夫，再有身份。",
    body: "你不能因为买了一件外套就自称水手。这个称呼要靠学风、靠守值班、靠成为那个在第四夜凌晨两点你的船员还能托付的人来挣。WindHero 围绕功夫而建，不围绕戏服。",
  },
  {
    n: "03",
    t: "安全不是冒险的反面。",
    body: "它是冒险的前提。一个不能放弃的船长，根本谈不上真正的承诺。我们教前向尸检 (pre-mortem)、退路港、和那种不浪漫的安全纪律——正是这些，让海真正向你敞开时，你能够走出去。",
  },
  {
    n: "04",
    t: "小船员，长航段。",
    body: "我们坚持小班，因为海员素养是在真实的天气里、真实的甲板上、一个决定一个决定地教出来的。没有捷径，也不需要。",
  },
  {
    n: "05",
    t: "船长的思维会跟你上岸。",
    body: "WindHero 真正想做的，不是把你教会开船。它想做的是——让你在苏瓦、博尼法乔、或者香港仔走下船的时候，比上船前更稳、更清醒、也更习惯做真正算数的决定。船长的思维是可以随身带走的。",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">宣言</p>
          <h1 className="display mt-6 text-balance text-[2.6rem] text-ink md:text-[4.2rem] md:leading-[1.05]">
            一所为水手、
            <br />
            也为船长的思维
            <br />
            而设的学校。
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-[1rem] leading-[1.92] text-ink-soft md:text-[1.05rem]">
            五条。它们不是规矩，是 WindHero 之所以存在的理由——用我们能写出的最短的一组词。
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
