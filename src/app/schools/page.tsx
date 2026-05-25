import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { SchoolsDirectory } from "./directory";

export const metadata: Metadata = {
  title: "全球帆船认证学校目录 | WindHero",
  description:
    "WindHero 精选的全球 RYA / ASA / IYT 认证学校列表——可按地区、认证体系、阶段筛选。完成线上理论后，去这些学校做实操考核与发证。",
  keywords: [
    "RYA 学校",
    "ASA 学校",
    "IYT 学校",
    "帆船学校",
    "Day Skipper 学校",
    "Yachtmaster 学校",
    "中文帆船学校",
    "香港 帆船",
    "新加坡 帆船",
    "BVI 帆船",
    "Phuket 帆船",
    "WindHero",
  ],
};

export default function SchoolsPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-32 lg:pt-36">
        <SectionHeading
          eyebrow="目录 · 全球认证学校"
          title={
            <>
              WindHero 教你过笔试，
              <br />
              这些学校发证书。
            </>
          }
          lead="WindHero 编辑精选的 24 所 RYA / ASA / IYT 认证学校——覆盖英国、地中海、加勒比、美国、亚太、澳新。可按地区、认证体系、阶段、中文支持筛选。"
        />
        <p className="mt-6 text-[0.84rem] text-mist">
          数据来源：各机构官网公开的认证学校列表。联系学校前请通过其官网二次确认当前课程时间与价格。
        </p>
      </Section>

      <Section className="border-b border-line/60">
        <SchoolsDirectory />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">如何选学校</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-[2rem]">
              三个先决问题。
            </h2>
            <ol className="mt-8 space-y-5 text-[0.96rem] leading-[1.85] text-ink-soft">
              <li className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3">
                <span className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                  01
                </span>
                <span>
                  <strong className="text-ink">你打算在哪个区域用证？</strong>
                  欧洲/Med = RYA 优先；美国/加勒比 = ASA 优先；超级游艇行业 = IYT 优先。
                </span>
              </li>
              <li className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3">
                <span className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                  02
                </span>
                <span>
                  <strong className="text-ink">你能去的季节？</strong>
                  英国 5–9 月、Med 4–10 月、加勒比 11–5 月、东南亚 11–4 月。错季会被海况拖累。
                </span>
              </li>
              <li className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3">
                <span className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                  03
                </span>
                <span>
                  <strong className="text-ink">你的语言舒适区？</strong>
                  全英文笔试有困难——优先挑选中文友好学校（目录里有标注）。
                </span>
              </li>
            </ol>
          </div>

          <Link
            href="/certifications"
            className="group flex flex-col justify-center rounded-sm border border-line/70 bg-paper-soft/30 p-8 transition-colors hover:bg-paper-soft/60 md:p-10"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
              对照
            </p>
            <h3 className="display mt-4 text-2xl text-ink">
              不确定自己要考哪一个？
            </h3>
            <p className="mt-3 text-[0.94rem] leading-[1.85] text-ink-soft">
              先看 RYA / ASA / IYT 三体系的完整对比与学习曲线，再决定方向。
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
              进入三体系对比
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
