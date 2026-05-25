import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Wind } from "lucide-react";
import { Section } from "@/components/section";
import { SynopticExplorer } from "./explorer";

export const metadata: Metadata = {
  title: "天气图读图工具 · Synoptic Chart Reader",
  description:
    "学会读地面气压图：等压线、低压、高压、锋面、风向风强——船长每天该看的第一张图。",
  keywords: [
    "天气图",
    "synoptic chart",
    "等压线",
    "isobar",
    "气压梯度",
    "Buys-Ballot",
    "锋面",
    "Coriolis",
    "天气图怎么看",
    "WindHero",
  ],
  openGraph: {
    title: "天气图读图工具 · WindHero",
    description: "学会读地面气压图——船长每天该看的第一张图。",
    type: "website",
  },
};

export default function SynopticPage() {
  return (
    <>
      {/* ==================== Hero + Tool（首屏） ==================== */}
      <Section className="border-b border-line/60 px-6 pb-10 pt-24 lg:px-10 lg:pb-14 lg:pt-28">
        <header className="mx-auto mb-7 max-w-3xl lg:mb-9">
          <p className="eyebrow">工具 · 天气图读图</p>
          <h1 className="display mt-3 text-balance text-3xl text-ink md:text-4xl lg:text-[2.6rem]">
            一张地面气压图，比天气 App 多说一万字。
          </h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-[1.75] text-ink-soft">
            拖动滑块改变等压线密度、切换半球——看风向风强如何同步改变。下方有完整原理。
          </p>
        </header>
        <SynopticExplorer />
      </Section>

      {/* ==================== Step 1：怎么看 ==================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">第一步 · 等压线</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          先认识那一堆封闭曲线。
        </h2>
        <div className="mt-8 max-w-3xl space-y-5 prose-zh text-[1rem] leading-[1.9] text-ink-soft">
          <p>
            <strong className="text-ink">等压线（isobar）</strong>
            是地面气压相同的点连成的线，通常每 4 hPa 画一根。标准大气压是 1013 hPa——比 1013 高的是「高压」H，比 1013 低的是「低压」L。
          </p>
          <p>
            船长看天气图，第一眼不看 L/H 在哪，而是看
            <strong className="text-ink">等压线密集度</strong>
            ——两根线靠得越近，气压在那点变化越剧烈，风越强。这一条比记十个术语都重要。
          </p>
          <p>
            等压线本身代表「这条线上的气压都是 1004」之类。线的形状是地球各处空气压力分布的等值线，可类比地形图上的等高线——只是这次是「气压地图」。
          </p>
          <ul className="space-y-2">
            <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
              <span className="font-mono text-sea-deep">·</span>
              <span>线密 → 气压梯度大 → 风强</span>
            </li>
            <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
              <span className="font-mono text-sea-deep">·</span>
              <span>线疏 → 气压梯度小 → 风弱</span>
            </li>
            <li className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2">
              <span className="font-mono text-sea-deep">·</span>
              <span>闭合的圆圈是低压 L 或高压 H 的中心</span>
            </li>
          </ul>
        </div>
      </Section>

      {/* ==================== Step 2：为什么逆时针 ==================== */}
      <Section className="border-b border-line/60 bg-paper-soft/30">
        <p className="eyebrow">第二步 · 风向 · Buys-Ballot 法则</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          为什么北半球的低压风逆时针流？
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 prose-zh text-[1rem] leading-[1.9] text-ink-soft">
            <p>
              直觉的答案：风应该「从高压直接流向低压」——气体被压力推过去。
            </p>
            <p>
              但地球在自转。任何运动中的物体在北半球都被 Coriolis 力向右偏（南半球向左）。所以从高压出发的风一被推动，立刻就开始向右拐——它不会直直插向低压中心，而是被掰成一个绕着中心的「轨道」。
            </p>
            <p>
              当风的气压梯度推力刚好被 Coriolis 拉力平衡（这种状态叫
              <strong className="text-ink">地转风 geostrophic wind</strong>
              ），它就沿等压线流动了，方向是「低压在风的左手」——这就是
              <strong className="text-ink">Buys-Ballot 法则</strong>。
              所以北半球低压看起来是逆时针，高压顺时针；南半球反过来。
            </p>
            <p>
              船长记一条就够：
              <strong className="text-ink">
                「站着背对风，左手指方向是低压（北半球）」
              </strong>
              。这是 1857 年荷兰气象学家 Buys-Ballot 总结的，至今没人否定。
            </p>
          </div>

          <article className="rounded-sm border border-line/70 bg-paper p-7">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
              口诀
            </p>
            <p className="display mt-3 text-2xl text-ink">
              「左手低压」 · 北半球
            </p>
            <p className="mt-2 text-[0.94rem] text-ink-soft">
              站着背对风 · 你左手指的方向就是低压中心。
            </p>
            <div className="my-6 h-px bg-line" />
            <p className="display text-2xl text-ink">
              「右手低压」 · 南半球
            </p>
            <p className="mt-2 text-[0.94rem] text-ink-soft">
              澳大利亚、新西兰、智利、阿根廷——反过来。
            </p>
            <div className="my-6 h-px bg-line" />
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
              示意（注意半球切换）
            </p>
            <p className="mt-3 text-[0.86rem] leading-[1.7] text-mist">
              上面的天气图沙盒可以切换半球——拖动等压线密度滑块，看风向风强如何同步改变。
            </p>
          </article>
        </div>
      </Section>

      {/* ==================== Step 3：去哪里查 ==================== */}
      <Section className="border-b border-line/60">
        <p className="eyebrow">第三步 · 看真实天气图</p>
        <h2 className="display mt-4 max-w-3xl text-3xl text-ink md:text-[2.2rem]">
          实战时去哪里看？
        </h2>
        <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "ECMWF Open Charts",
              url: "https://charts.ecmwf.int",
              note: "欧洲中期天气预报中心的开放图表。Surface pressure + 10m wind 是远洋船长的常看图。",
            },
            {
              name: "Windy.com",
              url: "https://www.windy.com",
              note: "把 ECMWF / GFS / ICON 数据可视化。左下角图层切到「Pressure isobars」练习读等压线。",
            },
            {
              name: "NOAA Ocean Prediction Center",
              url: "https://ocean.weather.gov",
              note: "美国海洋预报中心 · 北大西洋 / 北太平洋表面天气图官方版本。",
            },
            {
              name: "UK Met Office Charts",
              url: "https://www.metoffice.gov.uk/weather/maps-and-charts/surface-pressure",
              note: "英国气象局的北大西洋表面气压预报图，更新很勤。",
            },
            {
              name: "Australian BOM",
              url: "https://www.bom.gov.au/australia/charts/",
              note: "澳大利亚气象局南半球图——南太平洋 / 印度洋必看。",
            },
            {
              name: "JMA · 日本气象厅",
              url: "https://www.jma.go.jp",
              note: "西北太平洋 / 东海 / 南海最权威的表面图与台风路径预报。",
            },
          ].map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-paper p-7 transition-colors hover:bg-paper-soft/60"
            >
              <h3 className="display text-lg text-ink">{s.name}</h3>
              <p className="mt-3 flex-1 text-[0.88rem] leading-[1.75] text-ink-soft">
                {s.note}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] text-sea-deep transition-colors group-hover:text-ink">
                打开 <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* ==================== CTA ==================== */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Wind className="mx-auto h-7 w-7 text-sea-deep" />
          <h2 className="display mt-6 text-3xl text-ink md:text-4xl">
            读图是技能，不是天赋。
          </h2>
          <p className="mt-5 text-[1rem] leading-[1.9] text-ink-soft">
            真正掌握天气图，要把这页的概念吃透 + 反复看真图练手感。
            <Link
              href="/courses/weather-and-routing"
              className="text-sea-deep underline-offset-4 hover:underline"
            >
              WH-204 天气与航路
            </Link>{" "}
            有完整的低压系统生命周期、锋面识别、GRIB 模型对比——天气图读图的进阶部分都在那里。
          </p>
        </div>
      </Section>
    </>
  );
}
