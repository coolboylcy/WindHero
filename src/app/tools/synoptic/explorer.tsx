"use client";

import { useState, type ReactNode } from "react";
import { Compass, Gauge, RotateCcw, Waves } from "lucide-react";
import { ImageBackdrop } from "@/components/image-backdrop";

type Hemisphere = "N" | "S";
type FrontMode = "cold" | "warm" | "occluded";

const frontModes: Array<{ id: FrontMode; label: string; brief: string }> = [
  { id: "cold", label: "冷锋", brief: "锋后风向跳变、阵风和雨线最明显。" },
  { id: "warm", label: "暖锋", brief: "云层先来，雨区宽，风通常更持久。" },
  { id: "occluded", label: "锢囚", brief: "成熟低压后期，天气区围绕中心缠绕。" },
];

function classifyWind(speed: number) {
  if (speed >= 28) {
    return { label: "强风警戒", note: "缩帆计划提前做，避开迎风潮流。" };
  }
  if (speed >= 18) {
    return { label: "可航但忙", note: "看锋面过境时间，给夜航留余量。" };
  }
  return { label: "轻风窗口", note: "关注海雾、机帆航行和电量预算。" };
}

export function SynopticExplorer() {
  const [spacing, setSpacing] = useState(44);
  const [hemisphere, setHemisphere] = useState<Hemisphere>("N");
  const [front, setFront] = useState<FrontMode>("cold");

  const windSpeed = Math.max(8, Math.round(38 - spacing * 0.34));
  const windClass = classifyWind(windSpeed);
  const activeFront = frontModes.find((item) => item.id === front) ?? frontModes[0];
  const lowHand = hemisphere === "N" ? "左手" : "右手";
  const spin = hemisphere === "N" ? "逆时针" : "顺时针";

  const readingSteps = [
    `等压线间距 ${spacing}px，估算地转风约 ${windSpeed} 节。`,
    `${hemisphere === "N" ? "北半球" : "南半球"}低压在风的${lowHand}，低压环流${spin}。`,
    `${activeFront.label}：${activeFront.brief}`,
  ];

  return (
    <div className="wh-tool-shell rounded-sm p-4 sm:p-5 md:p-6">
      <ImageBackdrop
        src="/images/generated/synoptic-chart-texture-v1.png"
        className="opacity-[0.20]"
        loading="eager"
        fetchPriority="high"
      />
      <div className="relative grid gap-5 lg:grid-cols-[0.72fr_1.2fr_0.68fr]">
        <div className="wh-instrument-panel rounded-sm p-4 sm:p-5">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
            控制台
          </p>
          <h3 className="display mt-3 text-xl text-ink">调一张地面气压图</h3>

          <div className="mt-5 space-y-5">
            <div>
              <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                <span className="text-mist">等压线间距</span>
                <span className="text-ink">{spacing}px</span>
              </div>
              <input
                type="range"
                min={24}
                max={84}
                step={4}
                value={spacing}
                onChange={(event) => setSpacing(parseInt(event.target.value, 10))}
                className="wh-range mt-2 w-full"
              />
              <div className="mt-1 flex justify-between font-mono text-[0.62rem] text-mist">
                <span>密 · 风强</span>
                <span>疏 · 风弱</span>
              </div>
            </div>

            <div className="border-t border-line/70 pt-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
                半球
              </span>
              <div className="mt-2 grid grid-cols-2 overflow-hidden rounded-sm border border-line bg-paper">
                {(["N", "S"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setHemisphere(item)}
                    className={`px-3 py-2 font-mono text-[0.72rem] transition-colors ${
                      hemisphere === item
                        ? "bg-ink text-paper"
                        : "text-ink hover:bg-paper-soft"
                    }`}
                  >
                    {item === "N" ? "北半球" : "南半球"}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-line/70 pt-4">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
                锋面层
              </span>
              <div className="mt-2 space-y-1.5">
                {frontModes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`选择${item.label}`}
                    onClick={() => setFront(item.id)}
                    className={`flex w-full items-center justify-between rounded-sm border px-3 py-2 text-left transition-colors ${
                      front === item.id
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper text-ink hover:bg-paper-soft"
                    }`}
                  >
                    <span className="font-mono text-[0.72rem]">{item.label}</span>
                    <span aria-hidden className="font-mono text-[0.74rem] opacity-70">
                      {item.id === "cold" ? "▲" : item.id === "warm" ? "●" : "◐"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSpacing(44);
                setHemisphere("N");
                setFront("cold");
              }}
              className="inline-flex items-center gap-2 border-t border-line/70 pt-4 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep transition-colors hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              复位训练图
            </button>
          </div>
        </div>

        <div className="wh-instrument-panel rounded-sm p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                Surface pressure
              </p>
              <h3 className="display mt-3 text-xl text-ink">天气简报台</h3>
            </div>
            <div className="wh-status-strip">
              <span>{windSpeed} kt</span>
              <span>{hemisphere === "N" ? "NH" : "SH"}</span>
              <span>{activeFront.label}</span>
            </div>
          </div>
          <SynopticChart
            spacing={spacing}
            hemisphere={hemisphere}
            front={front}
            windSpeed={windSpeed}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Metric icon={<Gauge className="h-4 w-4" />} label="风速读数" value={`${windSpeed} 节`} />
            <Metric icon={<Compass className="h-4 w-4" />} label="低压位置" value={`风的${lowHand}`} />
            <Metric icon={<Waves className="h-4 w-4" />} label="海况提示" value={windClass.label} />
          </div>
        </div>

        <aside className="wh-dark-panel flex flex-col justify-between rounded-sm p-5 text-paper">
          <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sun-soft">
            Skipper brief
          </p>
          <h3 className="display mt-3 text-2xl text-paper">{windClass.label}</h3>
          <p className="mt-4 text-[0.9rem] leading-[1.8] text-paper-soft">
            {windClass.note}
          </p>
          <ol className="mt-6 space-y-4 text-[0.86rem] leading-[1.7] text-paper-soft">
            {readingSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="font-mono text-sun-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          </div>
          <p className="mt-8 border-t border-paper/15 pt-4 text-[0.78rem] leading-[1.7] text-mist">
            真图读法：先判断大尺度，再看局地。这个沙盒练规则，出海前仍要叠加真实锋面、海岸线、潮汐和航线角度。
          </p>
        </aside>
      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-sm border border-line/70 bg-paper/70 p-3">
      <div className="flex items-center gap-2 text-sea-deep">{icon}</div>
      <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-mist">
        {label}
      </p>
      <p className="mt-1 text-[0.88rem] font-medium text-ink">{value}</p>
    </div>
  );
}

function SynopticChart({
  spacing,
  hemisphere,
  front,
  windSpeed,
}: {
  spacing: number;
  hemisphere: Hemisphere;
  front: FrontMode;
  windSpeed: number;
}) {
  const W = 560;
  const H = 360;
  const low = { x: 205, y: 176 };
  const high = { x: 426, y: 132 };
  const isobars = Array.from({ length: 5 }, (_, index) => ({
    rx: 58 + index * spacing * 0.55,
    ry: 34 + index * spacing * 0.36,
    pressure: 988 + index * 4,
  }));
  const windFromY = hemisphere === "N" ? 292 : 58;
  const windToY = hemisphere === "N" ? 88 : 292;
  const arrowTip = hemisphere === "N" ? -1 : 1;
  const frontPoints =
    front === "warm"
      ? [
          [150, 245],
          [220, 224],
          [294, 226],
          [366, 202],
          [442, 194],
        ]
      : [
          [130, 94],
          [198, 126],
          [262, 162],
          [330, 188],
          [410, 216],
        ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-5 block h-auto w-full rounded-sm border border-line/70 bg-paper/80"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <defs>
        <linearGradient id="synopticSea" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f5f7fa" />
          <stop offset="100%" stopColor="#e9eef3" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#synopticSea)" />
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={`v-${index}`}
          x1={60 + index * 56}
          y1={24}
          x2={60 + index * 56}
          y2={H - 24}
          className="stroke-line/40"
          strokeDasharray="3 6"
        />
      ))}
      {Array.from({ length: 5 }, (_, index) => (
        <line
          key={`h-${index}`}
          x1={28}
          y1={56 + index * 58}
          x2={W - 28}
          y2={56 + index * 58}
          className="stroke-line/40"
          strokeDasharray="3 6"
        />
      ))}

      {isobars.map((iso) => (
        <g key={iso.pressure}>
          <ellipse
            cx={low.x}
            cy={low.y}
            rx={iso.rx}
            ry={iso.ry}
            className="stroke-ink/70"
          />
          <text
            x={low.x + iso.rx - 12}
            y={low.y - iso.ry + 10}
            className="fill-mist font-mono"
            fontSize="8"
          >
            {iso.pressure}
          </text>
        </g>
      ))}
      <ellipse cx={high.x} cy={high.y} rx={70} ry={42} className="stroke-sea-deep/60" />
      <ellipse cx={high.x} cy={high.y} rx={112} ry={68} className="stroke-sea-deep/35" />
      <text x={low.x - 7} y={low.y + 7} className="fill-coral font-mono" fontSize="24">
        L
      </text>
      <text x={high.x - 9} y={high.y + 7} className="fill-sea-deep font-mono" fontSize="22">
        H
      </text>

      <polyline
        points={frontPoints.map(([x, y]) => `${x},${y}`).join(" ")}
        className={front === "warm" ? "stroke-coral" : "stroke-sea-deep"}
        strokeWidth={2}
      />
      {frontPoints.slice(1, 4).map(([x, y], index) =>
        front === "warm" ? (
          <circle key={`${x}-${y}`} cx={x} cy={y - 8} r={5} className="fill-coral stroke-coral" />
        ) : front === "cold" ? (
          <polygon
            key={`${x}-${y}`}
            points={`${x},${y - 12} ${x - 7},${y + 2} ${x + 7},${y + 2}`}
            className="fill-sea-deep stroke-sea-deep"
          />
        ) : (
          <g key={`${x}-${y}`}>
            {index % 2 === 0 ? (
              <polygon
                points={`${x},${y - 12} ${x - 7},${y + 2} ${x + 7},${y + 2}`}
                className="fill-sea-deep stroke-sea-deep"
              />
            ) : (
              <circle cx={x} cy={y - 8} r={5} className="fill-coral stroke-coral" />
            )}
          </g>
        )
      )}

      <line
        x1={316}
        y1={windFromY}
        x2={316}
        y2={windToY}
        className="stroke-sun-deep"
        strokeWidth={Math.max(2, windSpeed / 8)}
      />
      <polygon
        points={`316,${windToY} 307,${windToY + 14 * arrowTip} 325,${windToY + 14 * arrowTip}`}
        className="fill-sun-deep stroke-sun-deep"
      />
      <text x={330} y={(windFromY + windToY) / 2} className="fill-sun-deep font-mono" fontSize="11">
        {windSpeed} kt
      </text>
      <text x={26} y={330} className="fill-mist font-mono" fontSize="10">
        {hemisphere === "N" ? "NH: low on left hand" : "SH: low on right hand"}
      </text>
    </svg>
  );
}
