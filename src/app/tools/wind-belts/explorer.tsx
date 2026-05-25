"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, MapPin, Navigation } from "lucide-react";
import { InteractiveThreeCellCirculation } from "@/lib/courses/interactive-diagrams";
import {
  regions,
  cellInfo,
  inferCellFromLat,
  type Region,
  type Cell,
} from "@/lib/tools/wind-belts-data";

type Mode = "region" | "latitude";

export function WindBeltsExplorer() {
  const [mode, setMode] = useState<Mode>("region");
  const [regionSlug, setRegionSlug] = useState<string>(regions[0].slug);
  const [lat, setLat] = useState(15);

  const selectedRegion: Region | undefined = useMemo(
    () => regions.find((r) => r.slug === regionSlug),
    [regionSlug]
  );

  const inferredCell: Cell =
    mode === "region" && selectedRegion
      ? selectedRegion.cell
      : inferCellFromLat(lat);

  const cell = cellInfo[inferredCell];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      {/* ===== 输入区 ===== */}
      <div>
        {/* 模式切换 */}
        <div className="inline-flex overflow-hidden rounded-sm border border-line">
          {(["region", "latitude"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-5 py-2 font-mono text-[0.78rem] transition-colors ${
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
          <div className="mt-7">
            <label
              htmlFor="region-select"
              className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep"
            >
              选择海域
            </label>
            <select
              id="region-select"
              value={regionSlug}
              onChange={(e) => setRegionSlug(e.target.value)}
              className="mt-3 w-full rounded-sm border border-line bg-paper px-4 py-3 text-[1rem] text-ink focus:border-sea-deep focus:outline-none"
            >
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} ({r.region})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mt-7">
            <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]">
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
              className="mt-3 w-full accent-[var(--color-sea-deep)]"
            />
            <div className="mt-1 flex justify-between font-mono text-[0.66rem] text-mist">
              <span>80°S</span>
              <span>赤道</span>
              <span>80°N</span>
            </div>
          </div>
        )}

        {/* 结果卡片 */}
        <article className="mt-10 rounded-sm border border-line/70 bg-paper-soft/30 p-7">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
            所在环流
          </p>
          <h3 className="display mt-3 text-2xl text-ink">{cell.name}</h3>
          <p className="mt-1 font-mono text-[0.78rem] text-mist">
            {cell.latLabel}
          </p>

          <div className="mt-6 space-y-4 border-t border-line/70 pt-6 text-[0.94rem] leading-[1.8] text-ink">
            <div className="grid grid-cols-[6rem_1fr] gap-3">
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">
                主导风
              </span>
              <span>{cell.primaryWind}</span>
            </div>

            {selectedRegion && mode === "region" ? (
              <>
                <div className="grid grid-cols-[6rem_1fr] gap-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">
                    本地修正
                  </span>
                  <span>{selectedRegion.prevailingWind}</span>
                </div>

                {selectedRegion.monsoon ? (
                  <div className="grid grid-cols-[6rem_1fr] gap-3">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">
                      季风
                    </span>
                    <span>
                      NE {selectedRegion.monsoon.ne} · SW{" "}
                      {selectedRegion.monsoon.sw}
                    </span>
                  </div>
                ) : null}

                <div className="grid grid-cols-[6rem_1fr] gap-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">
                    最佳月份
                  </span>
                  <span className="font-medium text-sea-deep">
                    {selectedRegion.bestMonths}
                  </span>
                </div>

                {selectedRegion.risks.length > 0 ? (
                  <div className="border-t border-line/60 pt-4">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-coral">
                      风险窗口
                    </p>
                    <ul className="mt-3 space-y-2">
                      {selectedRegion.risks.map((r, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[1.4rem_1fr] items-baseline gap-2"
                        >
                          <AlertTriangle className="mt-[0.2em] h-3 w-3 text-coral" />
                          <span>
                            <strong className="text-ink">{r.label}</strong>（
                            {r.period}）
                            <span className="block text-[0.84rem] text-ink-soft">
                              {r.note}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="mt-2 border-t border-line/60 pt-4 text-[0.86rem] leading-[1.75] text-mist">
                  <Navigation className="mr-1.5 inline-block h-3 w-3" />
                  {selectedRegion.notes}
                </p>
              </>
            ) : (
              <p className="text-[0.86rem] leading-[1.75] text-mist">
                <MapPin className="mr-1.5 inline-block h-3 w-3" />
                按纬度模式只显示「常年画面」。要看具体海域的季风修正、台风窗口，请切回「按海域」。
              </p>
            )}
          </div>
        </article>
      </div>

      {/* ===== 可视化 ===== */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
          三圈环流地球
        </p>
        <p className="mt-3 text-[0.92rem] leading-[1.8] text-ink-soft">
          下方地球同步显示你选的纬度。蓝色 = 信风带、红色 = 西风带、深色 =
          极地东风带。
        </p>
        <div className="mt-6">
          <InteractiveThreeCellCirculation />
        </div>
      </div>
    </div>
  );
}
