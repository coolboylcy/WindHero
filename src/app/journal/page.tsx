import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/section";
import { journal } from "@/lib/content";

export const metadata: Metadata = {
  title: "航海日志",
  description:
    "WindHero 船员写的现场笔记、船长日志，以及关于课程的散文。",
};

const longform: Record<string, string[]> = {
  "what-the-wind-actually-is": [
    "我们总说自己借风而行。多数时候，我们借的其实是两阵风之间的差——一阵是真风，吹过海面；一阵是我们自己跑出来的风。而我们的帆从头到尾只感受得到一种：视风。",
    "视风在你抢风时比真风更猛，在你顺风时却比手机上的数字更温柔。它向前弯曲、向后扁平。它是船真正在面对的那种风，也是被绝大多数初学者搞混的那一种。",
    "一个好的船员能同时握住两幅图：真风告诉你天气在做什么，视风告诉你船在做什么。船长则要在脑子里把这两张图叠在一起，并且任何时刻都不会把它们搞反。",
  ],
  "the-fourth-night": [
    "第一天是肾上腺素。你举着咖啡站在舵后，对每一道浪都露出傻笑。第二天是熟练——值班排开了，厨房找到了，整艘船开始像一个有自己法律的小国。",
    "第三天是无聊。新鲜感烧完，身体察觉到它真正的疲惫；脑子里开始浮起一个小声音，问你这是不是个好主意。",
    "然后第四夜到了。02:00 的时候风起来了，自动舵客气地哔了一声脱开，你才会知道你写在纸上的那套值班体系，能不能在一块湿的、黑的、在动的甲板上真的活下来。第四夜才是真正的考试，之前的一切都是彩排。",
  ],
  "why-we-still-teach-celestial": [
    "不是因为六分仪是 GPS 的备份。现代船上 GPS 几乎不会坏，就算坏了，第二个抽屉里还有 iPad。",
    "我们教天文导航，是因为它会让你重新意识到——这个世界比你的电子海图古老得多。纬度不是某朵云端发来的坐标，它是你用一片黄铜和一根平的海平线，在正午抬起太阳时量出的一个角度。",
    "知道这一点会改变你出海的方式。你不再把屏幕当成海的替身，你开始把它当成工具之一——和你眼睛、和你脚下的浪、和你头顶的云一起，去印证那张海早已交给你的答案。",
  ],
};

export default function JournalPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="航海日志"
          title={
            <>
              一所在海上上课的学校
              <br />
              留下的现场笔记。
            </>
          }
          lead="长文、值班日志，以及关于如何更清醒地生活的小经验。我们在有真话可说的时候发表，从不为填日历而写。"
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl">
          {journal.map((entry, i) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className="scroll-mt-28 border-t border-line/70 py-16 first:border-t-0 first:pt-4"
            >
              <header>
                <div className="flex items-center justify-between text-[0.72rem] text-mist">
                  <span className="text-sea-deep">{entry.kicker}</span>
                  <span>
                    {entry.date} · {entry.readTime}
                  </span>
                </div>
                <h2 className="display mt-5 text-[2.2rem] text-ink md:text-[2.7rem]">
                  {entry.title}
                </h2>
                <p className="mt-4 text-sm text-mist">
                  作者 · {entry.author}
                </p>
                <div className="hairline mt-8" />
              </header>

              <div className="prose-zh mt-8 space-y-5 text-[1.05rem] text-ink-soft">
                <p className="text-ink">{entry.excerpt}</p>
                {(longform[entry.slug] ?? []).map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              {i < journal.length - 1 ? (
                <p className="mt-12 text-center font-mono text-[0.72rem] tracking-[0.2em] text-mist">
                  —— 全文完 ——
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
