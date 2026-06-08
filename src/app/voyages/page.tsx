import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Wind } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { voyages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "航线",
  description:
    "由在役船长带队的开放航段。挑一段海，飞到港口，登船起航。",
  path: "/voyages",
});

const marinas = [
  { name: "香港仔游艇会", coord: "22°14′N · 114°09′E", city: "香港" },
  { name: "皇家普吉岛码头", coord: "7°56′N · 98°22′E", city: "普吉岛" },
  { name: "帕尔马港", coord: "39°33′N · 02°37′E", city: "马略卡" },
  { name: "Westhaven 码头", coord: "36°50′S · 174°45′E", city: "奥克兰" },
  { name: "Bay of Islands 码头", coord: "35°16′S · 174°06′E", city: "新西兰" },
  { name: "博尼法乔码头", coord: "41°23′N · 09°09′E", city: "科西嘉" },
];

export default function VoyagesPage() {
  return (
    <>
      <Section className="border-b border-line/60 pt-36">
        <SectionHeading
          eyebrow="航线"
          title={
            <>
              世界是一张
              <br />
              由航段拼成的海图。
            </>
          }
          lead="每段航程都由跑过这段海若干次的船长亲自带队，船员人数严格限定，让海员素养始终在线、值班始终清醒。"
        />
      </Section>

      <Section id="routes" className="border-b border-line/60">
        <div className="grid gap-px bg-line/70 md:grid-cols-2">
          {voyages.map((v) => (
            <article
              key={v.slug}
              id={v.slug}
              className="scroll-mt-28 bg-paper p-8 md:p-10"
            >
              <div className="flex items-center justify-between text-[0.72rem] text-mist">
                <span className="font-mono tracking-[0.14em] text-sea">
                  {v.region}
                </span>
                <span>{v.difficulty}</span>
              </div>
              <h3 className="display mt-4 text-3xl text-ink md:text-4xl">
                {v.name}
              </h3>
              <p className="mt-3 text-[0.98rem] leading-[1.9] text-ink-soft">
                {v.brief}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-6 border-y border-line/70 py-6 text-sm">
                <div>
                  <dt className="eyebrow">里程</dt>
                  <dd className="display mt-2 text-xl text-ink">
                    {v.distance}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">季节</dt>
                  <dd className="display mt-2 text-xl text-ink">{v.season}</dd>
                </div>
                <div>
                  <dt className="eyebrow">船员上限</dt>
                  <dd className="display mt-2 text-xl text-ink">6 人</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-ink-soft">
                  <Wind className="h-4 w-4 text-sea" />
                  起航前 7 天发出航路简报
                </span>
                <Link
                  href="/about#contact"
                  className="group inline-flex items-center gap-2 text-[0.86rem] text-sea-deep hover:text-ink"
                >
                  加入船员名单
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="marinas">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <p className="eyebrow">港口</p>
            <h2 className="display mt-4 text-3xl text-ink md:text-4xl">
              我们的母港。
            </h2>
            <p className="mt-4 max-w-md text-[0.98rem] leading-[1.9] text-ink-soft">
              船员在这里集合、船在这里停泊；第一次简报，
              通常是在码头边的咖啡桌上完成的。
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-px bg-line/70 sm:grid-cols-2">
            {marinas.map((m) => (
              <li
                key={`${m.name}-${m.coord}`}
                className="flex items-center justify-between gap-4 bg-paper p-6"
              >
                <div>
                  <p className="display text-xl text-ink">{m.name}</p>
                  <p className="text-xs text-mist">{m.city}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-sea">
                  <MapPin className="h-3.5 w-3.5" />
                  {m.coord}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
