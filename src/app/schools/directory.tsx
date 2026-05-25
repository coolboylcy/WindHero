"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Globe, MessageSquare } from "lucide-react";
import {
  schools,
  regionInfo,
  type SchoolRegion,
} from "@/lib/certifications/schools";
import { bodyInfo, type CertBody } from "@/lib/certifications/comparison";
import { stageInfo, type Stage } from "@/lib/certifications/stages";

const ALL = "all" as const;

const certBodies: CertBody[] = ["rya", "asa", "iyt"];
const regions: SchoolRegion[] = [
  "uk-ireland",
  "europe-med",
  "americas-east",
  "americas-west",
  "caribbean",
  "asia-pacific",
  "oceania",
];
const stages: Stage[] = [
  "crew",
  "day-skipper",
  "night-coastal",
  "offshore",
  "ocean",
];

export function SchoolsDirectory() {
  const [region, setRegion] = useState<SchoolRegion | typeof ALL>(ALL);
  const [body, setBody] = useState<CertBody | typeof ALL>(ALL);
  const [stage, setStage] = useState<Stage | typeof ALL>(ALL);
  const [chineseOnly, setChineseOnly] = useState(false);

  const filtered = useMemo(() => {
    return schools.filter((s) => {
      if (region !== ALL && s.region !== region) return false;
      if (body !== ALL && !s.bodies.includes(body)) return false;
      if (stage !== ALL && !s.stages.includes(stage)) return false;
      if (chineseOnly && !s.chineseFriendly) return false;
      return true;
    });
  }, [region, body, stage, chineseOnly]);

  return (
    <div>
      {/* —— 筛选器 —— */}
      <div className="rounded-sm border border-line/70 bg-paper-soft/30 p-4 md:p-6">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
          筛选 · 已找到 {filtered.length} 所学校
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label="地区"
            value={region}
            onChange={(v) => setRegion(v as SchoolRegion | typeof ALL)}
            options={[
              { v: ALL, label: "全部" },
              ...regions.map((r) => ({ v: r, label: regionInfo[r].label })),
            ]}
          />
          <FilterSelect
            label="认证体系"
            value={body}
            onChange={(v) => setBody(v as CertBody | typeof ALL)}
            options={[
              { v: ALL, label: "全部" },
              ...certBodies.map((b) => ({ v: b, label: bodyInfo[b].name })),
            ]}
          />
          <FilterSelect
            label="阶段"
            value={stage}
            onChange={(v) => setStage(v as Stage | typeof ALL)}
            options={[
              { v: ALL, label: "全部" },
              ...stages.map((s) => ({ v: s, label: stageInfo[s].label })),
            ]}
          />
          <div className="flex items-center gap-2 self-end">
            <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-line bg-paper px-3 py-2 text-[0.84rem] text-ink transition-colors hover:bg-paper-soft">
              <input
                type="checkbox"
                checked={chineseOnly}
                onChange={(e) => setChineseOnly(e.target.checked)}
                className="accent-[var(--color-sea-deep)]"
              />
              <MessageSquare className="h-3.5 w-3.5 text-sea-deep" />
              仅显示中文友好
            </label>
          </div>
        </div>
      </div>

      {/* —— 结果列表 —— */}
      <div className="mt-10 grid gap-px bg-line/70 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <article key={s.slug} className="flex flex-col bg-paper p-6 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="display text-lg text-ink">{s.name}</h3>
                <p className="text-[0.78rem] text-mist">{s.nameEn}</p>
              </div>
              {s.chineseFriendly ? (
                <span className="inline-flex items-center gap-1 rounded-sm border border-sea-deep/40 bg-sea-soft/40 px-1.5 py-0.5 font-mono text-[0.62rem] tracking-[0.08em] text-sea-deep">
                  <MessageSquare className="h-2.5 w-2.5" />
                  中文
                </span>
              ) : null}
            </div>

            <p className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-mist">
              {regionInfo[s.region].label} · {s.country} · {s.city}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.bodies.map((b) => (
                <span
                  key={b}
                  className="rounded-sm border border-line/70 bg-paper-soft/40 px-2 py-0.5 font-mono text-[0.68rem] tracking-[0.06em] text-ink"
                >
                  {bodyInfo[b]?.name ?? b.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {s.stages.map((st) => (
                <span
                  key={st}
                  className="font-mono text-[0.66rem] tracking-[0.04em] text-mist"
                >
                  {stageInfo[st].label}
                </span>
              )).reduce<React.ReactNode[]>(
                (acc, el, i, arr) =>
                  i < arr.length - 1
                    ? [...acc, el, <span key={`sep-${i}`} className="text-mist">·</span>]
                    : [...acc, el],
                []
              )}
            </div>

            <p className="mt-4 flex-1 text-[0.86rem] leading-[1.7] text-ink-soft">
              {s.notes}
            </p>

            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep hover:text-ink"
            >
              <Globe className="h-3.5 w-3.5" />
              访问学校官网
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-sm border border-line/70 bg-paper-soft/30 p-8 text-center text-[0.94rem] text-mist">
          当前筛选条件下没有匹配的学校。试着放宽条件——
          <button
            type="button"
            onClick={() => {
              setRegion(ALL);
              setBody(ALL);
              setStage(ALL);
              setChineseOnly(false);
            }}
            className="ml-2 text-sea-deep hover:text-ink underline-offset-4 hover:underline"
          >
            重置筛选器
          </button>
        </p>
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; label: string }[];
}) {
  return (
    <div>
      <label className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mist">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-sm border border-line bg-paper px-3 py-2 text-[0.9rem] text-ink focus:border-sea-deep focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
