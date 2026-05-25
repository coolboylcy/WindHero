"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, MapPin, Navigation } from "lucide-react";
import {
  regions,
  cellInfo,
  inferCellFromLat,
  type Region,
  type Cell,
} from "@/lib/tools/wind-belts-data";

type Mode = "region" | "latitude";

/**
 * 全球风带查询工具。
 *
 * 布局：lg+ 左右两栏（左：输入 + 结果卡，右：地球可视化）；
 *      sm/md：上下堆叠。
 * 整个工具控制在 ~60vh，让首屏含 hero 也能放得下。
 */

export function WindBeltsExplorer() {
  const [mode, setMode] = useState<Mode>("region");
  const [regionSlug, setRegionSlug] = useState<string>(regions[0].slug);
  const [lat, setLat] = useState(15);

  const selectedRegion: Region | undefined = useMemo(
    () => regions.find((r) => r.slug === regionSlug),
    [regionSlug]
  );

  const effectiveLat =
    mode === "region" && selectedRegion ? selectedRegion.latApprox : lat;

  const inferredCell: Cell =
    mode === "region" && selectedRegion
      ? selectedRegion.cell
      : inferCellFromLat(lat);

  const cell = cellInfo[inferredCell];

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:gap-7 lg:items-stretch">
      {/* ===== 左：输入 + 结果 ===== */}
      <div className="space-y-4">
        {/* 模式切换 */}
        <div className="inline-flex overflow-hidden rounded-sm border border-line">
          {(["region", "latitude"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 font-mono text-[0.74rem] transition-colors ${
                mode === m
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-soft"
              }`}
            >
              {m === "region" ? "按海域" : "按纬度"}
            </button>
          ))}
        </div>

        {mode === "region" ? (
          <div>
            <label
              htmlFor="region-select"
              className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep"
            >
              选择海域
            </label>
            <select
              id="region-select"
              value={regionSlug}
              onChange={(e) => setRegionSlug(e.target.value)}
              className="mt-2 w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-[0.95rem] text-ink focus:border-sea-deep focus:outline-none"
            >
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} ({r.region})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
              <span className="text-sea-deep">纬度</span>
              <span className="text-ink">
                {lat >= 0 ? `${lat}°N` : `${-lat}°S`}
              </span>
            </div>
            <input
              type="range"
              min={-80}
              max={80}
              step={1}
              value={lat}
              onChange={(e) => setLat(parseInt(e.target.value, 10))}
              className="mt-2 w-full accent-[var(--color-sea-deep)]"
            />
            <div className="mt-1 flex justify-between font-mono text-[0.62rem] text-mist">
              <span>80°S</span>
              <span>赤道</span>
              <span>80°N</span>
            </div>
          </div>
        )}

        {/* 结果卡片 */}
        <article className="rounded-sm border border-line/70 bg-paper-soft/30 p-4 sm:p-5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
            所在环流 · {cell.latLabel}
          </p>
          <h3 className="display mt-1.5 text-xl text-ink">{cell.name}</h3>

          <dl className="mt-4 space-y-2.5 border-t border-line/70 pt-3 text-[0.9rem] leading-[1.7] text-ink">
            <div className="grid grid-cols-[4.5rem_1fr] gap-2.5">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">
                主导风
              </dt>
              <dd>{cell.primaryWind}</dd>
            </div>

            {selectedRegion && mode === "region" ? (
              <>
                {selectedRegion.monsoon ? (
                  <div className="grid grid-cols-[4.5rem_1fr] gap-2.5">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">
                      季风
                    </dt>
                    <dd>
                      NE {selectedRegion.monsoon.ne}
                      <br />
                      SW {selectedRegion.monsoon.sw}
                    </dd>
                  </div>
                ) : null}
                <div className="grid grid-cols-[4.5rem_1fr] gap-2.5">
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">
                    最佳
                  </dt>
                  <dd className="font-medium text-sea-deep">
                    {selectedRegion.bestMonths}
                  </dd>
                </div>
                {selectedRegion.risks[0] ? (
                  <div className="grid grid-cols-[4.5rem_1fr] gap-2.5">
                    <dt className="flex items-baseline gap-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-coral">
                      <AlertTriangle className="h-3 w-3" />
                      风险
                    </dt>
                    <dd className="text-ink-soft">
                      <strong className="text-ink">
                        {selectedRegion.risks[0].label}
                      </strong>
                      （{selectedRegion.risks[0].period}）
                    </dd>
                  </div>
                ) : null}
                <p className="border-t border-line/60 pt-3 text-[0.82rem] leading-[1.7] text-mist">
                  <Navigation className="mr-1 inline-block h-3 w-3" />
                  {selectedRegion.notes}
                </p>
              </>
            ) : (
              <p className="border-t border-line/60 pt-3 text-[0.82rem] leading-[1.7] text-mist">
                <MapPin className="mr-1 inline-block h-3 w-3" />
                按纬度模式只显示「常年画面」。要看季风修正、台风窗口请切回「按海域」。
              </p>
            )}
          </dl>
        </article>
      </div>

      {/* ===== 右：地球可视化（紧凑版，仅 SVG，无内部 grid） ===== */}
      <div className="relative flex flex-col">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
          三圈环流地球
        </p>
        <div className="mt-2 flex-1 rounded-sm border border-line/70 bg-paper-soft/30 p-3 sm:p-4">
          <BareThreeCellEarth lat={effectiveLat} />
        </div>
        <p className="mt-2 text-[0.74rem] leading-[1.5] text-mist">
          蓝 = 信风 · 红 = 西风 · 深色 = 极地东风
        </p>
      </div>
    </div>
  );
}

/* —— 紧凑无控件版本（只有 SVG，由父组件控制 lat） —— */

function BareThreeCellEarth({ lat }: { lat: number }) {
  const cx = 200;
  const cy = 250;
  const r = 180;

  function latToY(deg: number) {
    return cy - r * Math.sin((deg * Math.PI) / 180);
  }
  function arrow(x1: number, y1: number, x2: number, y2: number, cls: string) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const ax = x2 - 6 * Math.cos(angle);
    const ay = y2 - 6 * Math.sin(angle);
    const perp = angle + Math.PI / 2;
    const px = 4 * Math.cos(perp);
    const py = 4 * Math.sin(perp);
    return (
      <g className={cls}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.5} />
        <polygon points={`${x2},${y2} ${ax + px},${ay + py} ${ax - px},${ay - py}`} />
      </g>
    );
  }

  const userY = latToY(lat);

  const bands = [
    { from: 60, to: 90, fill: "fill-sea-soft/40" },
    { from: 30, to: 60, fill: "fill-paper-soft/0" },
    { from: -30, to: 30, fill: "fill-sea-soft/40" },
    { from: -60, to: -30, fill: "fill-paper-soft/0" },
    { from: -90, to: -60, fill: "fill-sea-soft/40" },
  ];

  return (
    <svg
      viewBox="0 0 400 460"
      className="block h-auto w-full max-h-[40vh] sm:max-h-[50vh] lg:max-h-[60vh]"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <circle cx={cx} cy={cy} r={r} className="stroke-mist/60 fill-paper" />
      {bands.map((b, i) => {
        const y1 = latToY(b.from);
        const y2 = latToY(b.to);
        return (
          <rect
            key={i}
            x={cx - r}
            y={Math.min(y1, y2)}
            width={r * 2}
            height={Math.abs(y2 - y1)}
            className={b.fill}
            clipPath="circle(180px at 200px 250px)"
          />
        );
      })}
      {[60, 30, 0, -30, -60].map((deg) => {
        const y = latToY(deg);
        const xR = r * Math.cos((deg * Math.PI) / 180);
        return (
          <g key={deg}>
            <line x1={cx - xR} y1={y} x2={cx + xR} y2={y} className="stroke-mist/30" strokeDasharray="2 3" />
            <text x={cx + r + 8} y={y + 3} className="fill-mist font-mono" fontSize="9">
              {deg > 0 ? `${deg}°N` : deg < 0 ? `${-deg}°S` : "0°"}
            </text>
          </g>
        );
      })}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} className="stroke-ink/40" />
      {arrow(cx - 60, latToY(15), cx - 100, latToY(8), "stroke-sea-deep fill-sea-deep")}
      {arrow(cx - 60, latToY(-15), cx - 100, latToY(-8), "stroke-sea-deep fill-sea-deep")}
      {arrow(cx - 80, latToY(45), cx + 20, latToY(45), "stroke-coral fill-coral")}
      {arrow(cx - 80, latToY(-45), cx + 20, latToY(-45), "stroke-coral fill-coral")}
      {arrow(cx + 20, latToY(75), cx - 30, latToY(75), "stroke-ink fill-ink")}
      {arrow(cx + 20, latToY(-75), cx - 30, latToY(-75), "stroke-ink fill-ink")}
      <line x1={cx - r - 10} y1={userY} x2={cx + r + 10} y2={userY} className="stroke-coral" strokeWidth={1.8} />
      <circle cx={cx + r * Math.cos((lat * Math.PI) / 180)} cy={userY} r={5} className="fill-coral stroke-coral" />
      <text x={cx} y={latToY(90) - 6} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
        北极 90°N
      </text>
      <text x={cx} y={latToY(-90) + 14} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
        南极 90°S
      </text>
    </svg>
  );
}
