"use client";

import { useMemo, useState } from "react";

/**
 * 交互式课程图解 —— 客户端组件。
 *
 * 响应式布局规则（让图解在所有设备一屏内可见）：
 * - 手机 (< sm)：上下堆叠；SVG 最高 38vh
 * - 平板 (sm – lg)：上下堆叠；SVG 最高 46vh
 * - 笔记本+ (lg+)：左右并排（grid 1.4fr / 1fr）；SVG 最高 60vh
 *
 * SVG 用 preserveAspectRatio + 容器 max-h 限高，避免在矮屏上溢出。
 */

type Props = { className?: string };

const SVG_BOX =
  "block h-auto w-full max-h-[38vh] sm:max-h-[46vh] lg:max-h-[60vh]";
const LAYOUT_GRID =
  "grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-7 lg:items-center";

/* —— 1. 交互点风方位 —— */

export function InteractivePointsOfSail({ className }: Props) {
  const [boatHeading, setBoatHeading] = useState(45);
  const twa = ((boatHeading + 360) % 360);
  const abs = Math.min(twa, 360 - twa);

  const zone = useMemo(() => {
    if (abs < 30) return { label: "死区 · No-Go", desc: "顶风 < 30°，船开不动" };
    if (abs < 60) return { label: "近顶风 · Close-Hauled", desc: "上风航段，最考验调帆" };
    if (abs < 100) return { label: "横风 · Beam Reach", desc: "最快、最稳的点风方位" };
    if (abs < 150) return { label: "尾后风 · Broad Reach", desc: "顺风之字的典型角度" };
    return { label: "正顺风 · Running", desc: "视风最小、帆效率下降" };
  }, [abs]);

  const cx = 200;
  const cy = 200;
  const r = 140;
  const rad = ((boatHeading - 90) * Math.PI) / 180;

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 400 400"
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <path
            d={`M ${cx} ${cy} L ${cx + r * Math.sin(-Math.PI / 6)} ${cy - r * Math.cos(-Math.PI / 6)} A ${r} ${r} 0 0 1 ${cx + r * Math.sin(Math.PI / 6)} ${cy - r * Math.cos(Math.PI / 6)} Z`}
            className="fill-sea-soft/40 stroke-mist/0"
          />
          <circle cx={cx} cy={cy} r={r} className="stroke-mist/60" />
          <circle cx={cx} cy={cy} r={r * 0.7} className="stroke-mist/30" strokeDasharray="2 4" />
          <line x1={cx} y1={36} x2={cx} y2={70} className="stroke-sea-deep" strokeWidth={1.6} />
          <polygon points={`${cx},${74} ${cx - 5},${64} ${cx + 5},${64}`} className="fill-sea-deep stroke-sea-deep" />
          <text x={cx + 10} y={52} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.1em">
            真风 360°
          </text>
          {[30, 60, 90, 120, 150, 180, -150, -120, -90, -60, -30].map((deg) => {
            const a = ((deg - 90) * Math.PI) / 180;
            const x1 = cx + r * Math.cos(a);
            const y1 = cy + r * Math.sin(a);
            const x2 = cx + (r + 5) * Math.cos(a);
            const y2 = cy + (r + 5) * Math.sin(a);
            const tx = cx + (r + 22) * Math.cos(a);
            const ty = cy + (r + 22) * Math.sin(a);
            return (
              <g key={deg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-mist" />
                <text x={tx} y={ty + 3} textAnchor="middle" className="fill-mist font-mono" fontSize="8">
                  {Math.abs(deg)}°
                </text>
              </g>
            );
          })}
          <g transform={`translate(${cx} ${cy}) rotate(${boatHeading})`}>
            <line x1={0} y1={0} x2={0} y2={-r * 0.8} className="stroke-coral" strokeWidth={1.4} strokeDasharray="2 4" />
            <polygon points={`0,${-r * 0.8 - 4} -5,${-r * 0.8 + 6} 5,${-r * 0.8 + 6}`} className="fill-coral stroke-coral" />
            <ellipse cx={0} cy={6} rx={16} ry={5} className="fill-paper-soft stroke-ink" />
            <line x1={0} y1={-22} x2={0} y2={2} className="stroke-ink" strokeWidth={1.5} />
            <path d="M 0 -22 L 14 2 L 0 -2 Z" className="fill-paper-soft stroke-ink" />
          </g>
          <path
            d={`M ${cx} ${cy - 50} A 50 50 0 ${abs > 180 ? 1 : 0} ${boatHeading > 0 ? 1 : 0} ${cx + 50 * Math.sin(rad + Math.PI / 2)} ${cy - 50 * Math.cos(rad + Math.PI / 2)}`}
            className="stroke-mist"
            strokeWidth={1}
            fill="none"
          />
        </svg>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
            <span className="text-sea-deep">船头相对风的角度 TWA</span>
            <span className="text-ink">{abs}°</span>
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            value={boatHeading}
            onChange={(e) => setBoatHeading(parseInt(e.target.value, 10))}
            className="wh-range mt-2 w-full"
          />
        </div>
        <div className="border-t border-line/70 pt-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">
            当前点风方位
          </p>
          <p className="display mt-1 text-lg text-ink">{zone.label}</p>
          <p className="mt-1 text-[0.82rem] leading-[1.7] text-ink-soft">{zone.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* —— 2. 交互真风 / 视风 —— */

export function InteractiveApparentWind({ className }: Props) {
  const [tws, setTws] = useState(14);
  const [twa, setTwa] = useState(90);
  const [boatSpeed, setBoatSpeed] = useState(6.5);

  const twaRad = (twa * Math.PI) / 180;
  const twX = tws * Math.sin(twaRad);
  const twY = -tws * Math.cos(twaRad);
  const awX = twX;
  const awY = twY - boatSpeed;
  const aws = Math.sqrt(awX * awX + awY * awY);
  const awa = (Math.atan2(awX, -awY) * 180) / Math.PI;

  const cx = 200;
  const cy = 220;
  const SCALE = 6;

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 460 340"
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <g transform={`translate(${cx} ${cy})`}>
            <ellipse cx={0} cy={6} rx={22} ry={6} className="fill-paper-soft stroke-ink" />
            <line x1={0} y1={-30} x2={0} y2={2} className="stroke-ink" strokeWidth={1.5} />
            <path d="M 0 -30 L 18 2 L 0 -2 Z" className="fill-paper-soft stroke-ink" />
          </g>
          <line x1={cx} y1={cy} x2={cx} y2={cy - boatSpeed * SCALE} className="stroke-ink" strokeWidth={1.4} />
          <polygon
            points={`${cx},${cy - boatSpeed * SCALE - 4} ${cx - 5},${cy - boatSpeed * SCALE + 4} ${cx + 5},${cy - boatSpeed * SCALE + 4}`}
            className="fill-ink stroke-ink"
          />
          <text x={cx + 8} y={cy - (boatSpeed * SCALE) / 2} className="fill-ink font-mono" fontSize="10">
            船速 {boatSpeed.toFixed(1)} kn
          </text>
          <line
            x1={cx + twX * SCALE * 1.4}
            y1={cy + twY * SCALE * 1.4}
            x2={cx + twX * SCALE * 0.2}
            y2={cy + twY * SCALE * 0.2}
            className="stroke-sea-deep"
            strokeWidth={1.6}
          />
          <polygon
            points={`${cx + twX * SCALE * 0.2},${cy + twY * SCALE * 0.2} ${cx + twX * SCALE * 0.45 - 5},${cy + twY * SCALE * 0.45 + 3} ${cx + twX * SCALE * 0.45 + 5},${cy + twY * SCALE * 0.45 - 3}`}
            className="fill-sea-deep stroke-sea-deep"
          />
          <text x={cx + twX * SCALE * 1.5} y={cy + twY * SCALE * 1.5 - 6} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.08em">
            TW {tws} kn @ {twa}°
          </text>
          <line
            x1={cx + awX * SCALE * 1.4}
            y1={cy + awY * SCALE * 1.4}
            x2={cx + awX * SCALE * 0.1}
            y2={cy + awY * SCALE * 0.1}
            className="stroke-coral"
            strokeWidth={1.6}
          />
          <polygon
            points={`${cx + awX * SCALE * 0.1},${cy + awY * SCALE * 0.1} ${cx + awX * SCALE * 0.35 - 5},${cy + awY * SCALE * 0.35 + 3} ${cx + awX * SCALE * 0.35 + 5},${cy + awY * SCALE * 0.35 - 3}`}
            className="fill-coral stroke-coral"
          />
          <text x={cx + awX * SCALE * 1.5 + 6} y={cy + awY * SCALE * 1.5 + 12} className="fill-coral font-mono" fontSize="10" letterSpacing="0.08em">
            AW {aws.toFixed(1)} kn @ {Math.abs(Math.round(awa))}°
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <ControlRow label="真风风速 TWS" value={`${tws} kn`} min={4} max={30} step={1} v={tws} onChange={setTws} />
        <ControlRow label="真风角 TWA" value={`${twa}°`} min={20} max={170} step={5} v={twa} onChange={setTwa} />
        <ControlRow label="船速" value={`${boatSpeed.toFixed(1)} kn`} min={1} max={12} step={0.5} v={boatSpeed} onChange={setBoatSpeed} />
        <p className="border-t border-line/70 pt-3 text-[0.78rem] leading-[1.65] text-mist">
          蓝 = 真风（相对地面）· 橙 = 视风（甲板感受）。船加速时视风向船头方向拉。
        </p>
      </div>
    </div>
  );
}

function ControlRow({
  label,
  value,
  min,
  max,
  step,
  v,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  v: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
        <span className="text-sea-deep">{label}</span>
        <span className="text-ink">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="wh-range mt-1.5 w-full"
      />
    </div>
  );
}

/* —— 3. 交互 12 分之 1 法则 —— */

export function InteractiveTwelfthsRule({ className }: Props) {
  const [hourSinceLW, setHourSinceLW] = useState(3);
  const [hwHeight, setHwHeight] = useState(4.8);
  const [lwHeight, setLwHeight] = useState(0.6);

  const range = Math.max(0, hwHeight - lwHeight);
  const cumulative = [0, 1, 3, 6, 9, 11, 12];
  const fraction = cumulative[Math.min(hourSinceLW, 6)] / 12;
  const height = lwHeight + fraction * range;

  const W = 460;
  const H = 240;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const path = cumulative
    .map((c, i) => {
      const x = padL + (i / 6) * innerW;
      const y = padT + innerH - (c / 12) * innerH;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const cx = padL + (hourSinceLW / 6) * innerW;
  const cy = padT + innerH - (cumulative[hourSinceLW] / 12) * innerH;

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} className="stroke-ink" />
          <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} className="stroke-ink" />
          {[0, 1, 2, 3, 4, 5, 6].map((h) => {
            const x = padL + (h / 6) * innerW;
            return (
              <g key={h}>
                <line x1={x} y1={padT + innerH} x2={x} y2={padT + innerH + 4} className="stroke-mist" />
                <text x={x} y={padT + innerH + 16} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
                  {h}h
                </text>
              </g>
            );
          })}
          {[0, 0.25, 0.5, 0.75, 1].map((p) => {
            const y = padT + innerH - p * innerH;
            const v = (lwHeight + p * range).toFixed(1);
            return (
              <g key={p}>
                <line x1={padL - 4} y1={y} x2={padL} y2={y} className="stroke-mist" />
                <text x={padL - 8} y={y + 3} textAnchor="end" className="fill-mist font-mono" fontSize="9">
                  {v}m
                </text>
              </g>
            );
          })}
          <path d={path} className="stroke-sea-deep" strokeWidth={1.8} />
          <line x1={cx} y1={padT} x2={cx} y2={cy} className="stroke-mist" strokeDasharray="2 3" />
          <line x1={padL} y1={cy} x2={cx} y2={cy} className="stroke-mist" strokeDasharray="2 3" />
          <circle cx={cx} cy={cy} r={5} className="fill-coral stroke-coral" />
          <text x={padL + innerW - 6} y={padT + 14} textAnchor="end" className="fill-ink font-mono" fontSize="10" letterSpacing="0.06em">
            {height.toFixed(2)} m
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <ControlRow
          label="距离低潮的小时数"
          value={`${hourSinceLW} h`}
          min={0}
          max={6}
          step={1}
          v={hourSinceLW}
          onChange={(n) => setHourSinceLW(Math.round(n))}
        />
        <ControlRow label="低潮 LW 高度" value={`${lwHeight.toFixed(1)} m`} min={0} max={3} step={0.1} v={lwHeight} onChange={setLwHeight} />
        <ControlRow label="高潮 HW 高度" value={`${hwHeight.toFixed(1)} m`} min={2} max={8} step={0.1} v={hwHeight} onChange={setHwHeight} />
        <p className="border-t border-line/70 pt-3 text-[0.78rem] leading-[1.65] text-mist">
          12 分之 1 累积：1/12 → 3/12 → 6/12 → 9/12 → 11/12 → 12/12。中间两小时潮速最快。
        </p>
      </div>
    </div>
  );
}

/* —— 4. 交互三圈环流地球 —— */

export function InteractiveThreeCellCirculation({ className }: Props) {
  const [lat, setLat] = useState(35);

  const cell = useMemo(() => {
    const abs = Math.abs(lat);
    if (abs < 30) {
      return {
        name: "哈德利环流",
        wind: lat >= 0 ? "东北信风 NE Trades" : "东南信风 SE Trades",
        flow: "赤道上升 → 30° 下沉",
        sailing: "经典横渡风带；15–25 节稳定",
      };
    } else if (abs < 60) {
      return {
        name: "费雷尔环流",
        wind: "盛行西风",
        flow: "30° 下沉 → 60° 上升",
        sailing: "北/南太平洋常年西风；锋面频繁",
      };
    } else {
      return {
        name: "极地环流",
        wind: "极地东风",
        flow: "极地下沉 → 60° 上升",
        sailing: "高纬度，天气剧烈",
      };
    }
  }, [lat]);

  const cx = 200;
  const cy = 250;
  const r = 180;

  function latToY(deg: number) {
    return cy - r * Math.sin((deg * Math.PI) / 180);
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
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 400 460"
          className={SVG_BOX}
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
          <Arrow x1={cx - 60} y1={latToY(15)} x2={cx - 100} y2={latToY(8)} cls="stroke-sea-deep fill-sea-deep" />
          <Arrow x1={cx - 60} y1={latToY(-15)} x2={cx - 100} y2={latToY(-8)} cls="stroke-sea-deep fill-sea-deep" />
          <Arrow x1={cx - 80} y1={latToY(45)} x2={cx + 20} y2={latToY(45)} cls="stroke-coral fill-coral" />
          <Arrow x1={cx - 80} y1={latToY(-45)} x2={cx + 20} y2={latToY(-45)} cls="stroke-coral fill-coral" />
          <Arrow x1={cx + 20} y1={latToY(75)} x2={cx - 30} y2={latToY(75)} cls="stroke-ink fill-ink" />
          <Arrow x1={cx + 20} y1={latToY(-75)} x2={cx - 30} y2={latToY(-75)} cls="stroke-ink fill-ink" />
          <line x1={cx - r - 10} y1={userY} x2={cx + r + 10} y2={userY} className="stroke-coral" strokeWidth={1.8} />
          <circle cx={cx + r * Math.cos((lat * Math.PI) / 180)} cy={userY} r={5} className="fill-coral stroke-coral" />
          <text x={cx} y={latToY(90) - 6} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
            北极 90°N
          </text>
          <text x={cx} y={latToY(-90) + 14} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
            南极 90°S
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
            <span className="text-sea-deep">纬度</span>
            <span className="text-ink">{lat >= 0 ? `${lat}°N` : `${-lat}°S`}</span>
          </div>
          <input
            type="range"
            min={-89}
            max={89}
            step={1}
            value={lat}
            onChange={(e) => setLat(parseInt(e.target.value, 10))}
            className="wh-range mt-1.5 w-full"
          />
          <div className="mt-1 flex justify-between font-mono text-[0.62rem] text-mist">
            <span>南极</span>
            <span>赤道</span>
            <span>北极</span>
          </div>
        </div>

        <div className="rounded-sm border border-line/70 bg-paper p-3.5">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-sea-deep">
            所在环流
          </p>
          <p className="display mt-1.5 text-lg text-ink">{cell.name}</p>
          <dl className="mt-2.5 space-y-1.5 text-[0.85rem] leading-[1.65] text-ink-soft">
            <div className="grid grid-cols-[4rem_1fr] gap-2">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">主导风</dt>
              <dd>{cell.wind}</dd>
            </div>
            <div className="grid grid-cols-[4rem_1fr] gap-2">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">环流</dt>
              <dd>{cell.flow}</dd>
            </div>
            <div className="grid grid-cols-[4rem_1fr] gap-2">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">航行</dt>
              <dd>{cell.sailing}</dd>
            </div>
          </dl>
        </div>

        <p className="text-[0.76rem] leading-[1.6] text-mist">
          蓝 = 信风 · 红 = 西风 · 深色 = 极地东风
        </p>
      </div>
    </div>
  );
}

function Arrow({ x1, y1, x2, y2, cls }: { x1: number; y1: number; x2: number; y2: number; cls: string }) {
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

/* —— 5. 交互等压线 · 风向风强 —— */

export function InteractiveIsobarWind({ className }: Props) {
  const [spacing, setSpacing] = useState(50);
  const [hemisphere, setHemisphere] = useState<"N" | "S">("N");

  const windSpeed = Math.round(30 - (spacing - 20) * 0.275);

  const W = 420;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const lineCount = Math.floor((W * 0.85) / spacing);
  const isobars = Array.from({ length: lineCount }, (_, i) => {
    const x = cx - ((lineCount - 1) / 2) * spacing + i * spacing;
    return { x, pressure: 996 + i * 4 };
  });

  const windFromY = hemisphere === "N" ? H - 30 : 30;
  const windToY = hemisphere === "N" ? 30 : H - 30;

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox={`0 0 ${W} ${H + 60}`}
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <rect x={1} y={1} width={W - 2} height={H - 2} className="stroke-line/60" />
          {isobars.map((iso, i) => (
            <g key={i}>
              <line x1={iso.x} y1={4} x2={iso.x} y2={H - 4} className="stroke-ink/70" />
              <text x={iso.x} y={H - 10} textAnchor="middle" className="fill-mist font-mono" fontSize="8">
                {iso.pressure}
              </text>
            </g>
          ))}
          <text x={20} y={cy + 6} className="fill-coral font-mono" fontSize="14" letterSpacing="0.1em">
            L
          </text>
          <text x={W - 28} y={cy + 6} className="fill-sea-deep font-mono" fontSize="14" letterSpacing="0.1em">
            H
          </text>
          <line
            x1={cx}
            y1={windFromY}
            x2={cx}
            y2={windToY}
            className="stroke-sea-deep"
            strokeWidth={Math.max(1.2, 30 / (spacing / 20))}
          />
          <polygon
            points={`${cx},${windToY} ${cx - 6},${windToY + (hemisphere === "N" ? 10 : -10)} ${cx + 6},${windToY + (hemisphere === "N" ? 10 : -10)}`}
            className="fill-sea-deep stroke-sea-deep"
          />
          <text x={cx + 12} y={(windFromY + windToY) / 2} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.06em">
            {windSpeed} 节
          </text>
          <text x={cx} y={H + 32} textAnchor="middle" className="fill-ink-soft" fontSize="11">
            {hemisphere === "N" ? "北半球：低压在风的左手" : "南半球：低压在风的右手"}
          </text>
          <text x={cx} y={H + 50} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.1em">
            BUYS-BALLOT 法则
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em]">
            <span className="text-sea-deep">等压线间距</span>
            <span className="text-ink">{spacing}px · 风 {windSpeed} 节</span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            value={spacing}
            onChange={(e) => setSpacing(parseInt(e.target.value, 10))}
            className="wh-range mt-1.5 w-full"
          />
          <div className="mt-1 flex justify-between font-mono text-[0.62rem] text-mist">
            <span>密 → 风强</span>
            <span>疏 → 风弱</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line/70 pt-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">
            半球
          </span>
          <div className="inline-flex overflow-hidden rounded-sm border border-line">
            {(["N", "S"] as const).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHemisphere(h)}
                className={`px-3 py-1 font-mono text-[0.72rem] transition-colors ${
                  hemisphere === h ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {h === "N" ? "北" : "南"}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[0.76rem] leading-[1.6] text-mist">
          线密 → 气压梯度大 → 风强。北半球低压逆时针；南半球反过来。
        </p>
      </div>
    </div>
  );
}

/* —— 6. 交互 Coriolis 偏向 —— */

export function InteractiveCoriolis({ className }: Props) {
  const [hemisphere, setHemisphere] = useState<"N" | "S">("N");

  const cx = 200;
  const cy = 180;
  const r = 130;
  const dx = hemisphere === "N" ? 60 : -60;

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 400 360"
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          <circle cx={cx} cy={cy} r={r} className="stroke-mist/60 fill-paper" />
          <circle cx={cx} cy={cy} r={3} className="fill-ink stroke-ink" />
          <text x={cx + 8} y={cy + 4} className="fill-mist font-mono" fontSize="9">
            {hemisphere === "N" ? "N 极俯视" : "S 极俯视"}
          </text>
          <path
            d={`M ${cx - r - 10} ${cy} A ${r + 10} ${r + 10} 0 0 ${hemisphere === "N" ? 0 : 1} ${cx + r + 10} ${cy}`}
            className="stroke-mist"
            strokeDasharray="3 3"
          />
          <text
            x={hemisphere === "N" ? cx - r - 18 : cx + r + 18}
            y={cy - r - 4}
            textAnchor={hemisphere === "N" ? "end" : "start"}
            className="fill-mist font-mono"
            fontSize="9"
          >
            地球自转
          </text>
          <line x1={cx} y1={cy + 60} x2={cx} y2={cy - 60} className="stroke-mist" strokeDasharray="3 4" />
          <text x={cx + 6} y={cy + 50} className="fill-mist font-mono" fontSize="8">
            理想直线
          </text>
          <path
            d={`M ${cx} ${cy + 60} Q ${cx + dx / 2} ${cy} ${cx + dx} ${cy - 60}`}
            className="stroke-sea-deep"
            strokeWidth={1.8}
          />
          <polygon
            points={`${cx + dx},${cy - 60} ${cx + dx - 5},${cy - 50} ${cx + dx + 5},${cy - 50}`}
            className="fill-sea-deep stroke-sea-deep"
          />
          <text x={cx + dx + 8} y={cy - 56} className="fill-sea-deep font-mono" fontSize="10">
            实际路径
          </text>
          <text x={cx + 8} y={cy + 64} className="fill-ink-soft" fontSize="10">
            出发点
          </text>
          <text x={cx} y={cy + r + 28} textAnchor="middle" className="fill-ink" fontSize="11">
            {hemisphere === "N"
              ? "北半球：移动物体向右偏"
              : "南半球：移动物体向左偏"}
          </text>
          <text x={cx} y={cy + r + 44} textAnchor="middle" className="fill-mist" fontSize="9" letterSpacing="0.06em">
            地球自转 + 相对极点运动 → 转弯
          </text>
        </svg>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-line/70 pb-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">
            切换半球
          </span>
          <div className="inline-flex overflow-hidden rounded-sm border border-line">
            {(["N", "S"] as const).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHemisphere(h)}
                className={`px-3 py-1 font-mono text-[0.72rem] transition-colors ${
                  hemisphere === h ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {h === "N" ? "北" : "南"}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[0.84rem] leading-[1.75] text-ink-soft">
          {hemisphere === "N"
            ? "在北半球，任何运动中的物体都被偏向右——所以北半球低压逆时针、信风偏东北。"
            : "在南半球，任何运动中的物体都被偏向左——所以南半球低压顺时针、信风偏东南。"}
        </p>

        <p className="text-[0.76rem] leading-[1.6] text-mist">
          这就是 Coriolis 力——地球自转的几何后果，不是力学的力。
        </p>
      </div>
    </div>
  );
}

/* —— 7. 交互 CTS 向量三角形 —— */

export function InteractiveCtsPlotter({ className }: Props) {
  const [setDeg, setSetDeg] = useState(90);
  const [drift, setDrift] = useState(1.6);
  const [boatSpeed, setBoatSpeed] = useState(5);
  const [targetBearing, setTargetBearing] = useState(20);
  const [useLeeway, setUseLeeway] = useState(false);

  const leewayDeg = useLeeway ? 10 : 0;
  const distanceNm = 50;

  // 向量分解（单位：海里 / 小时，以 1 小时为周期画三角形）
  // 潮流向量：从 A 出发，方向 = setDeg（潮流流向的去向）
  const setRad = (setDeg * Math.PI) / 180;
  const targetRad = (targetBearing * Math.PI) / 180;

  // 潮流终点 B 相对 A 的位移（1 小时）
  const bx = drift * Math.sin(setRad);
  const by = -drift * Math.cos(setRad);

  // 从 B 画船速弧，交目标线于 C；目标线方向 = targetBearing
  // 目标线参数化：点 = (t * sin(targetRad), -t * cos(targetRad))
  // 求 |C - B| = boatSpeed
  // (t*sin - bx)^2 + (-t*cos - by)^2 = boatSpeed^2
  const sinT = Math.sin(targetRad);
  const cosT = Math.cos(targetRad);
  const a = 1;
  const b = -2 * (bx * sinT - by * cosT);
  const c = bx * bx + by * by - boatSpeed * boatSpeed;
  const disc = b * b - 4 * a * c;

  const result = useMemo(() => {
    if (disc < 0) {
      return { ok: false as const };
    }
    const sqrtD = Math.sqrt(disc);
    // 取较大根（向目标方向走）
    const t = (-b + sqrtD) / (2 * a);
    if (t <= 0) return { ok: false as const };
    // C 点位置
    const cxRel = t * sinT;
    const cyRel = -t * cosT;
    // CTS = B → C 向量的方位
    const ctsX = cxRel - bx;
    const ctsY = cyRel - by;
    let ctsDeg = (Math.atan2(ctsX, -ctsY) * 180) / Math.PI;
    if (ctsDeg < 0) ctsDeg += 360;
    // 加 leeway：船受下风漂移，需要把船头多顶上风 leeway°
    // 简化为 CTS 顺时针偏 leeway°（实际取决于风向，这里给出近似教学值）
    const ctsWithLeeway = (ctsDeg + leewayDeg) % 360;
    const smg = t; // 1 小时走 t 海里 = SMG
    const eta = smg > 0 ? distanceNm / smg : 0;
    return {
      ok: true as const,
      cx: cxRel,
      cy: cyRel,
      cts: ctsWithLeeway,
      smg,
      eta,
    };
  }, [bx, by, disc, b, sinT, cosT, leewayDeg]);

  const W = 460;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2 + 30;
  const SCALE = 22; // 像素/海里

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          {/* 罗盘网格 */}
          <circle cx={cx} cy={cy} r={140} className="stroke-mist/30" strokeDasharray="2 4" />
          <circle cx={cx} cy={cy} r={80} className="stroke-mist/20" strokeDasharray="2 4" />
          {[0, 90, 180, 270].map((deg) => {
            const ra = (deg * Math.PI) / 180;
            const x2 = cx + 150 * Math.sin(ra);
            const y2 = cy - 150 * Math.cos(ra);
            return (
              <g key={deg}>
                <line x1={cx} y1={cy} x2={x2} y2={y2} className="stroke-mist/20" />
                <text
                  x={cx + 158 * Math.sin(ra)}
                  y={cy - 158 * Math.cos(ra) + 3}
                  textAnchor="middle"
                  className="fill-mist font-mono"
                  fontSize="8"
                >
                  {deg === 0 ? "N" : deg === 90 ? "E" : deg === 180 ? "S" : "W"}
                </text>
              </g>
            );
          })}

          {/* A 点 */}
          <circle cx={cx} cy={cy} r={4} className="fill-ink stroke-ink" />
          <text x={cx - 10} y={cy + 4} textAnchor="end" className="fill-ink font-mono" fontSize="10">
            A
          </text>

          {/* 潮流向量 A→B（蓝） */}
          <line
            x1={cx}
            y1={cy}
            x2={cx + bx * SCALE}
            y2={cy + by * SCALE}
            className="stroke-sea-deep"
            strokeWidth={1.8}
          />
          <polygon
            points={`${cx + bx * SCALE},${cy + by * SCALE} ${cx + bx * SCALE - 5 * Math.sin(setRad) - 4 * Math.cos(setRad)},${cy + by * SCALE + 5 * Math.cos(setRad) - 4 * Math.sin(setRad)} ${cx + bx * SCALE - 5 * Math.sin(setRad) + 4 * Math.cos(setRad)},${cy + by * SCALE + 5 * Math.cos(setRad) + 4 * Math.sin(setRad)}`}
            className="fill-sea-deep stroke-sea-deep"
          />
          <text
            x={cx + bx * SCALE * 0.5 + 10}
            y={cy + by * SCALE * 0.5}
            className="fill-sea-deep font-mono"
            fontSize="9"
            letterSpacing="0.06em"
          >
            潮流 {setDeg}°/{drift.toFixed(1)}kn
          </text>
          <circle cx={cx + bx * SCALE} cy={cy + by * SCALE} r={3.5} className="fill-sea-deep stroke-sea-deep" />
          <text x={cx + bx * SCALE + 8} y={cy + by * SCALE + 4} className="fill-sea-deep font-mono" fontSize="10">
            B
          </text>

          {/* 目标方位线 A 出发的虚线 */}
          <line
            x1={cx - 150 * Math.sin(targetRad)}
            y1={cy + 150 * Math.cos(targetRad)}
            x2={cx + 150 * Math.sin(targetRad)}
            y2={cy - 150 * Math.cos(targetRad)}
            className="stroke-mist"
            strokeDasharray="3 3"
          />
          <text
            x={cx + 140 * Math.sin(targetRad)}
            y={cy - 140 * Math.cos(targetRad) - 6}
            className="fill-mist font-mono"
            fontSize="9"
            letterSpacing="0.06em"
          >
            目标 {targetBearing}°
          </text>

          {/* 船速弧 B→C（橙） */}
          {result.ok && (
            <>
              <line
                x1={cx + bx * SCALE}
                y1={cy + by * SCALE}
                x2={cx + result.cx * SCALE}
                y2={cy + result.cy * SCALE}
                className="stroke-coral"
                strokeWidth={1.8}
              />
              <circle
                cx={cx + bx * SCALE}
                cy={cy + by * SCALE}
                r={boatSpeed * SCALE}
                className="stroke-coral/30"
                strokeDasharray="2 4"
              />
              <circle
                cx={cx + result.cx * SCALE}
                cy={cy + result.cy * SCALE}
                r={4}
                className="fill-coral stroke-coral"
              />
              <text
                x={cx + result.cx * SCALE + 8}
                y={cy + result.cy * SCALE + 4}
                className="fill-coral font-mono"
                fontSize="10"
              >
                C
              </text>
              <text
                x={(cx + bx * SCALE + cx + result.cx * SCALE) / 2 + 8}
                y={(cy + by * SCALE + cy + result.cy * SCALE) / 2}
                className="fill-coral font-mono"
                fontSize="9"
                letterSpacing="0.06em"
              >
                CTS {Math.round(result.cts)}°
              </text>
            </>
          )}

          {/* 标题 */}
          <text x={cx} y={24} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.06em">
            CTS 向量三角形 · A→B 潮流 · B→C 船速弧 · A→C 目标
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <ControlRow label="潮流方向 SET" value={`${setDeg}°`} min={0} max={359} step={5} v={setDeg} onChange={(n) => setSetDeg(Math.round(n))} />
        <ControlRow label="潮流流速 DRIFT" value={`${drift.toFixed(1)} kn`} min={0.2} max={4} step={0.1} v={drift} onChange={setDrift} />
        <ControlRow label="船速 STW" value={`${boatSpeed.toFixed(1)} kn`} min={1} max={10} step={0.5} v={boatSpeed} onChange={setBoatSpeed} />
        <ControlRow label="目标方位" value={`${targetBearing}°`} min={0} max={359} step={5} v={targetBearing} onChange={(n) => setTargetBearing(Math.round(n))} />

        <label className="flex cursor-pointer items-center gap-2 border-t border-line/70 pt-3">
          <input
            type="checkbox"
            checked={useLeeway}
            onChange={(e) => setUseLeeway(e.target.checked)}
            className="wh-range"
          />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-soft">
            加入 leeway 偏移 10°
          </span>
        </label>

        <div className="rounded-sm border border-line/70 bg-paper p-3">
          {result.ok ? (
            <dl className="space-y-1.5 text-[0.82rem] leading-[1.6] text-ink-soft">
              <div className="grid grid-cols-[5rem_1fr] gap-2">
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">CTS 真方位</dt>
                <dd className="font-mono text-ink">{Math.round(result.cts)}°</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-2">
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">SMG</dt>
                <dd className="font-mono text-ink">{result.smg.toFixed(2)} kn</dd>
              </div>
              <div className="grid grid-cols-[5rem_1fr] gap-2">
                <dt className="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-mist">ETA → 50nm</dt>
                <dd className="font-mono text-ink">{result.eta.toFixed(2)} h</dd>
              </div>
            </dl>
          ) : (
            <p className="text-[0.78rem] leading-[1.6] text-coral">
              船速不足以抵消潮流 —— 调高船速或换目标线。
            </p>
          )}
        </div>

        <p className="text-[0.76rem] leading-[1.6] text-mist">
          蓝 = 潮流向量 · 橙 = 船速向量 · 灰虚线 = 目标航迹。CTS 偏向潮流来源一侧。
        </p>
      </div>
    </div>
  );
}

/* —— 8. 交互灯型夜识训练器 —— */

type LightDot = { x: number; y: number; color: "white" | "red" | "green" | "yellow"; label?: string };
type ShapeMark = { x: number; y: number; kind: "ball" | "diamond" | "cone-up" | "cone-down" | "cylinder"; count?: number };

type LightsPreset = {
  id: string;
  name: string;
  short: string;
  lights: LightDot[];
  shapes: ShapeMark[];
  notes: string;
};

const LIGHTS_PRESETS: LightsPreset[] = [
  {
    id: "power-small",
    name: "动力船 < 12m",
    short: "桅白 + 红绿（合一）+ 尾白",
    lights: [
      { x: 0, y: -28, color: "white", label: "桅白" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
    ],
    shapes: [],
    notes: "短船可将舷灯合为一盏混合灯，桅顶白替代上桅。",
  },
  {
    id: "power-large",
    name: "动力船 ≥ 50m",
    short: "前后双桅白（前低后高）+ 红绿 + 尾白",
    lights: [
      { x: -10, y: -36, color: "white", label: "前桅" },
      { x: 10, y: -22, color: "white", label: "后桅" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
    ],
    shapes: [],
    notes: "≥ 50m 必须显示前低后高双桅灯——大船标志。",
  },
  {
    id: "sail-basic",
    name: "帆船（基本三灯）",
    short: "仅红绿 + 尾白；无桅顶白",
    lights: [
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
    ],
    shapes: [],
    notes: "纯帆下不点桅顶白——这是动力船与帆船的根本区别。",
  },
  {
    id: "sail-tricolor",
    name: "帆船 Tri-color",
    short: "桅顶 tri-color（红/绿/白合一）",
    lights: [
      { x: 0, y: -36, color: "red", label: "tri-L" },
      { x: 6, y: -36, color: "green", label: "tri-R" },
      { x: -6, y: -36, color: "white", label: "tri-后" },
    ],
    shapes: [],
    notes: "< 20m 帆船可用 tri-color 替代三盏分立灯；开机后必须切回动力灯型。",
  },
  {
    id: "tow-short",
    name: "拖航 ≤ 200m",
    short: "两盏垂直桅白 + 红绿 + 尾白 + 黄拖灯",
    lights: [
      { x: 0, y: -40, color: "white" },
      { x: 0, y: -28, color: "white" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
      { x: 0, y: 32, color: "yellow", label: "拖灯" },
    ],
    shapes: [],
    notes: "两盏垂直桅白 = 拖航；拖出长度 ≤ 200m。",
  },
  {
    id: "tow-long",
    name: "拖航 > 200m",
    short: "三盏垂直桅白 + 红绿 + 尾白 + 黄拖灯",
    lights: [
      { x: 0, y: -46, color: "white" },
      { x: 0, y: -34, color: "white" },
      { x: 0, y: -22, color: "white" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
      { x: 0, y: 32, color: "yellow", label: "拖灯" },
    ],
    shapes: [{ x: 0, y: -60, kind: "diamond" }],
    notes: "三盏垂直桅白 = 拖出 > 200m；昼间挂菱形号型。",
  },
  {
    id: "nuc",
    name: "失控船 NUC",
    short: "两盏垂直红 + 不动时无航行灯",
    lights: [
      { x: 0, y: -32, color: "red" },
      { x: 0, y: -20, color: "red" },
    ],
    shapes: [
      { x: 0, y: -50, kind: "ball" },
      { x: 0, y: -38, kind: "ball" },
    ],
    notes: "两盏垂直红 = NUC（Not Under Command）。昼间挂两球。",
  },
  {
    id: "ram",
    name: "操纵能力受限 RAM",
    short: "红 / 白 / 红 垂直",
    lights: [
      { x: 0, y: -40, color: "red" },
      { x: 0, y: -28, color: "white" },
      { x: 0, y: -16, color: "red" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
    ],
    shapes: [
      { x: 0, y: -58, kind: "ball" },
      { x: 0, y: -46, kind: "diamond" },
      { x: 0, y: -34, kind: "ball" },
    ],
    notes: "红白红 = RAM（Restricted in Ability to Maneuver）。昼挂球-菱-球。",
  },
  {
    id: "anchor",
    name: "锚泊",
    short: "前白单灯（< 50m）；锚地无航行灯",
    lights: [{ x: 0, y: -30, color: "white", label: "锚白" }],
    shapes: [{ x: 0, y: -48, kind: "ball" }],
    notes: "前白单灯 = 锚泊。昼挂一只黑球。",
  },
  {
    id: "fishing-trawl",
    name: "渔船 · 拖网",
    short: "绿 / 白 垂直 + 在航时舷灯",
    lights: [
      { x: 0, y: -32, color: "green" },
      { x: 0, y: -20, color: "white" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
    ],
    shapes: [
      { x: 0, y: -50, kind: "cone-up" },
      { x: 0, y: -38, kind: "cone-down" },
    ],
    notes: "绿/白垂直 = 拖网。昼挂两锥尖相对（沙漏形）。",
  },
  {
    id: "fishing-other",
    name: "渔船 · 非拖网",
    short: "红 / 白 垂直",
    lights: [
      { x: 0, y: -32, color: "red" },
      { x: 0, y: -20, color: "white" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
    ],
    shapes: [
      { x: 0, y: -50, kind: "cone-up" },
      { x: 0, y: -38, kind: "cone-down" },
    ],
    notes: "红/白垂直 = 非拖网（刺网/曳绳钓）。",
  },
  {
    id: "pilot",
    name: "领航船",
    short: "白 / 红 垂直 + 在航时舷灯",
    lights: [
      { x: 0, y: -32, color: "white" },
      { x: 0, y: -20, color: "red" },
      { x: -16, y: 0, color: "red" },
      { x: 16, y: 0, color: "green" },
      { x: 0, y: 22, color: "white", label: "尾白" },
    ],
    shapes: [],
    notes: "白/红垂直 = 领航船在岗。",
  },
];

export function InteractiveLightsIdentifier({ className }: Props) {
  const [currentId, setCurrentId] = useState(LIGHTS_PRESETS[0].id);
  const [mode, setMode] = useState<"learn" | "train">("learn");
  const [dayNight, setDayNight] = useState<"night" | "day">("night");
  const [quizState, setQuizState] = useState<{
    correctId: string;
    options: string[];
    answered: string | null;
  } | null>(null);

  const preset = LIGHTS_PRESETS.find((p) => p.id === currentId) ?? LIGHTS_PRESETS[0];

  function startQuiz() {
    const correct = LIGHTS_PRESETS[Math.floor(Math.random() * LIGHTS_PRESETS.length)];
    const pool = LIGHTS_PRESETS.filter((p) => p.id !== correct.id);
    // 随机抽 3 个干扰项
    const distractors: LightsPreset[] = [];
    while (distractors.length < 3 && pool.length > 0) {
      const i = Math.floor(Math.random() * pool.length);
      distractors.push(pool.splice(i, 1)[0]);
    }
    const opts = [correct, ...distractors]
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    setCurrentId(correct.id);
    setQuizState({ correctId: correct.id, options: opts, answered: null });
  }

  function answerQuiz(optionId: string) {
    if (!quizState || quizState.answered) return;
    setQuizState({ ...quizState, answered: optionId });
  }

  function exitQuiz() {
    setQuizState(null);
  }

  const showLabels = mode === "learn" && !quizState;
  const cx = 200;
  const cy = 170;

  function renderShape(s: ShapeMark, i: number) {
    const sx = cx + s.x;
    const sy = cy + s.y;
    if (s.kind === "ball") {
      return <circle key={i} cx={sx} cy={sy} r={5} className="fill-ink stroke-ink" />;
    }
    if (s.kind === "diamond") {
      return (
        <polygon
          key={i}
          points={`${sx},${sy - 6} ${sx + 5},${sy} ${sx},${sy + 6} ${sx - 5},${sy}`}
          className="fill-ink stroke-ink"
        />
      );
    }
    if (s.kind === "cone-up") {
      return (
        <polygon
          key={i}
          points={`${sx},${sy - 6} ${sx - 5},${sy + 4} ${sx + 5},${sy + 4}`}
          className="fill-ink stroke-ink"
        />
      );
    }
    if (s.kind === "cone-down") {
      return (
        <polygon
          key={i}
          points={`${sx},${sy + 6} ${sx - 5},${sy - 4} ${sx + 5},${sy - 4}`}
          className="fill-ink stroke-ink"
        />
      );
    }
    return null;
  }

  function colorClass(c: LightDot["color"]) {
    if (c === "red") return "fill-coral stroke-coral";
    if (c === "green") return "fill-sea-deep stroke-sea-deep";
    if (c === "yellow") return "fill-sun stroke-sun";
    return "fill-paper stroke-ink";
  }

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 400 360"
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          {/* 夜空背景 */}
          <rect
            x={1}
            y={1}
            width={398}
            height={300}
            className={dayNight === "night" ? "fill-ink/90 stroke-line/0" : "fill-paper-soft/30 stroke-line/40"}
          />

          {/* 船体轮廓（夜间淡白；昼间清楚） */}
          <g transform={`translate(${cx} ${cy})`}>
            <ellipse
              cx={0}
              cy={20}
              rx={32}
              ry={8}
              className={dayNight === "night" ? "stroke-mist/40 fill-ink/0" : "fill-paper-soft stroke-ink"}
            />
            <line
              x1={0}
              y1={-50}
              x2={0}
              y2={18}
              className={dayNight === "night" ? "stroke-mist/40" : "stroke-ink"}
              strokeWidth={1.4}
            />
          </g>

          {/* 夜间显示灯，昼间显示号型 */}
          {dayNight === "night"
            ? preset.lights.map((l, i) => (
                <g key={i}>
                  <circle cx={cx + l.x} cy={cy + l.y} r={5} className={colorClass(l.color)} />
                  <circle cx={cx + l.x} cy={cy + l.y} r={9} className={`${colorClass(l.color)} opacity-30`} />
                  {showLabels && l.label ? (
                    <text
                      x={cx + l.x + (l.x >= 0 ? 14 : -14)}
                      y={cy + l.y + 3}
                      textAnchor={l.x >= 0 ? "start" : "end"}
                      className="fill-mist font-mono"
                      fontSize="8"
                    >
                      {l.label}
                    </text>
                  ) : null}
                </g>
              ))
            : preset.shapes.length > 0
              ? preset.shapes.map((s, i) => renderShape(s, i))
              : (
                <text x={cx} y={cy - 20} textAnchor="middle" className="fill-mist font-mono" fontSize="10">
                  无白昼号型
                </text>
              )}

          {/* 标题区 */}
          <text x={cx} y={326} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.06em">
            {showLabels || (quizState && quizState.answered)
              ? preset.name
              : quizState
                ? "这是什么船？"
                : "训练模式 · 隐藏标签"}
          </text>
          {showLabels ? (
            <text x={cx} y={344} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.06em">
              {preset.short}
            </text>
          ) : null}
        </svg>
      </div>

      <div className="space-y-3.5">
        {/* 模式切换 */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">模式</span>
          <div className="inline-flex overflow-hidden rounded-sm border border-line">
            {(["learn", "train"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setQuizState(null);
                }}
                className={`px-3 py-1 font-mono text-[0.72rem] transition-colors ${
                  mode === m ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {m === "learn" ? "学习" : "训练"}
              </button>
            ))}
          </div>
        </div>

        {/* 昼/夜 切换 */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">显示</span>
          <div className="inline-flex overflow-hidden rounded-sm border border-line">
            {(["night", "day"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDayNight(d)}
                className={`px-3 py-1 font-mono text-[0.72rem] transition-colors ${
                  dayNight === d ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {d === "night" ? "夜灯型" : "昼号型"}
              </button>
            ))}
          </div>
        </div>

        {/* 竞赛模式 */}
        {!quizState ? (
          <>
            <div className="border-t border-line/70 pt-3">
              <label className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist mb-1.5">
                选船型
              </label>
              <select
                value={currentId}
                onChange={(e) => setCurrentId(e.target.value)}
                className="w-full rounded-sm border border-line bg-paper px-2 py-1.5 font-mono text-[0.78rem] text-ink"
              >
                {LIGHTS_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={startQuiz}
              className="w-full rounded-sm border border-line bg-ink px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-sea-deep"
            >
              竞赛模式
            </button>
            <p className="text-[0.76rem] leading-[1.6] text-mist">{preset.notes}</p>
          </>
        ) : (
          <div className="space-y-2.5 border-t border-line/70 pt-3">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-sea-deep">
              4 选 1 · 这是什么船？
            </p>
            <div className="grid gap-2">
              {quizState.options.map((id) => {
                const opt = LIGHTS_PRESETS.find((p) => p.id === id)!;
                const isCorrect = id === quizState.correctId;
                const isPicked = quizState.answered === id;
                const answered = quizState.answered !== null;
                let cls = "border-line bg-paper text-ink hover:bg-paper-soft";
                if (answered) {
                  if (isCorrect) cls = "border-sea-deep bg-sea-soft/40 text-ink";
                  else if (isPicked) cls = "border-coral bg-coral/10 text-ink";
                  else cls = "border-line bg-paper text-mist";
                }
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={answered}
                    onClick={() => answerQuiz(id)}
                    className={`rounded-sm border px-3 py-2 text-left text-[0.78rem] transition-colors ${cls}`}
                  >
                    {opt.name}
                  </button>
                );
              })}
            </div>
            {quizState.answered ? (
              <div className="space-y-2">
                <p
                  className={`font-mono text-[0.72rem] uppercase tracking-[0.08em] ${
                    quizState.answered === quizState.correctId ? "text-sea-deep" : "text-coral"
                  }`}
                >
                  {quizState.answered === quizState.correctId ? "正确" : "错了"}
                  ——正确答案：{preset.name}
                </p>
                <p className="text-[0.76rem] leading-[1.6] text-ink-soft">{preset.notes}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="flex-1 rounded-sm border border-line bg-ink px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-paper hover:bg-sea-deep"
                  >
                    下一题
                  </button>
                  <button
                    type="button"
                    onClick={exitQuiz}
                    className="flex-1 rounded-sm border border-line bg-paper px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink hover:bg-paper-soft"
                  >
                    退出
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

/* —— 9. 交互 Heave-to 三力平衡 —— */

type BoatType = {
  id: string;
  name: string;
  // 力尺度：主帆 / 反艏帆 / 舵反扭
  mainScale: number;
  jibScale: number;
  rudderScale: number;
  // 稳定 TWA 范围中点
  twaCenter: number;
};

const HEAVE_BOATS: BoatType[] = [
  { id: "light", name: "轻量赛艇", mainScale: 0.9, jibScale: 0.85, rudderScale: 0.8, twaCenter: 55 },
  { id: "cruise", name: "巡航 (38ft)", mainScale: 1.0, jibScale: 1.0, rudderScale: 1.0, twaCenter: 60 },
  { id: "heavy", name: "重远洋", mainScale: 1.15, jibScale: 1.1, rudderScale: 1.2, twaCenter: 68 },
];

export function InteractiveHeaveToBalance({ className }: Props) {
  const [tws, setTws] = useState(20);
  const [boatId, setBoatId] = useState("cruise");
  const [failed, setFailed] = useState(false);

  const boat = HEAVE_BOATS.find((b) => b.id === boatId) ?? HEAVE_BOATS[1];

  // 风速越大力越大；力强度归一到像素长度
  const wScale = Math.min(1, tws / 35);
  const mainForce = 50 * boat.mainScale * (0.5 + wScale);
  const jibForce = 42 * boat.jibScale * (0.5 + wScale);
  const rudderForce = 36 * boat.rudderScale * (0.5 + wScale);

  const stableTwa = boat.twaCenter + Math.round((tws - 20) * 0.4);

  // 船俯视图（带主桅、主帆、艏帆、舵）
  const cx = 200;
  const cy = 200;

  // 失败状态下旋转船 + 散开力向量
  const tilt = failed ? 28 : 0;
  // 风从船的左前方吹来（45°）
  // 主帆力：从主帆中部向斜后方推（推动船向 leeward）
  // 反艏帆力：艏帆反兜，向斜前 leeward 推
  // 舵力：船舵打到 weather 一侧，反扭

  return (
    <div className={`${LAYOUT_GRID} ${className ?? ""}`}>
      <div className="min-w-0">
        <svg
          viewBox="0 0 400 400"
          className={SVG_BOX}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        >
          {/* 风指示 */}
          <g>
            <line x1={40} y1={50} x2={90} y2={100} className="stroke-sea-deep" strokeWidth={1.6} />
            <polygon points="90,100 80,96 84,90" className="fill-sea-deep stroke-sea-deep" />
            <text x={32} y={42} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.06em">
              真风 {tws} kn
            </text>
          </g>

          <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
            {/* 船体（俯视） */}
            <path
              d="M 0 -80 Q 22 -40 22 20 Q 18 60 0 70 Q -18 60 -22 20 Q -22 -40 0 -80 Z"
              className="fill-paper-soft stroke-ink"
              strokeWidth={1.4}
            />
            {/* 主桅 */}
            <circle cx={0} cy={-10} r={3} className="fill-ink stroke-ink" />
            {/* 主帆（反兜 = 向 weather；heave-to 时主帆松开） */}
            <line
              x1={0}
              y1={-10}
              x2={failed ? 18 : -28}
              y2={failed ? -2 : 24}
              className="stroke-ink"
              strokeWidth={2.2}
            />
            <text
              x={failed ? 20 : -32}
              y={failed ? 2 : 28}
              className="fill-ink font-mono"
              fontSize="8"
            >
              主帆
            </text>
            {/* 艏帆（反兜：被吹到 weather 一侧 = 上风侧） */}
            <line
              x1={0}
              y1={-60}
              x2={failed ? -22 : 22}
              y2={failed ? -50 : -38}
              className="stroke-ink"
              strokeWidth={1.8}
            />
            <text
              x={failed ? -34 : 24}
              y={failed ? -52 : -34}
              className="fill-ink font-mono"
              fontSize="8"
            >
              艏帆(反)
            </text>
            {/* 舵（打到上风） */}
            <line
              x1={0}
              y1={60}
              x2={failed ? 14 : -10}
              y2={failed ? 78 : 78}
              className="stroke-ink"
              strokeWidth={2.4}
            />
            <text
              x={failed ? 18 : -28}
              y={failed ? 80 : 82}
              className="fill-ink font-mono"
              fontSize="8"
            >
              舵(反)
            </text>

            {/* 力向量 1：主帆推力（橙）—— 把船推向 leeward + 略向前 */}
            <line
              x1={-10}
              y1={0}
              x2={failed ? 40 : -60}
              y2={failed ? -10 : 20}
              className="stroke-coral"
              strokeWidth={2}
            />
            <polygon
              points={
                failed
                  ? "40,-10 32,-14 36,-4"
                  : "-60,20 -52,16 -52,26"
              }
              className="fill-coral stroke-coral"
            />
            <text
              x={failed ? 44 : -64}
              y={failed ? -12 : 18}
              textAnchor={failed ? "start" : "end"}
              className="fill-coral font-mono"
              fontSize="9"
              letterSpacing="0.06em"
            >
              主帆推 {Math.round(mainForce)}
            </text>

            {/* 力向量 2：反艏帆推力（蓝）—— 把船头按下风 */}
            <line
              x1={0}
              y1={-50}
              x2={failed ? 50 : 50}
              y2={failed ? -50 : -38}
              className="stroke-sea-deep"
              strokeWidth={2}
            />
            <polygon
              points={
                failed
                  ? "50,-50 42,-54 42,-46"
                  : `50,-38 42,-42 42,-34`
              }
              className="fill-sea-deep stroke-sea-deep"
            />
            <text
              x={54}
              y={failed ? -52 : -40}
              className="fill-sea-deep font-mono"
              fontSize="9"
              letterSpacing="0.06em"
            >
              艏帆反 {Math.round(jibForce)}
            </text>

            {/* 力向量 3：舵反扭（紫/sun）—— 把船头按上风 */}
            <line
              x1={0}
              y1={55}
              x2={failed ? 60 : -50}
              y2={failed ? 70 : 50}
              className="stroke-sun"
              strokeWidth={2}
            />
            <polygon
              points={
                failed
                  ? "60,70 52,72 56,62"
                  : "-50,50 -42,46 -42,54"
              }
              className="fill-sun stroke-sun"
            />
            <text
              x={failed ? 64 : -54}
              y={failed ? 74 : 46}
              textAnchor={failed ? "start" : "end"}
              className="fill-sun font-mono"
              fontSize="9"
              letterSpacing="0.06em"
            >
              舵反扭 {Math.round(rudderForce)}
            </text>
          </g>

          {/* 状态条 */}
          <rect x={1} y={350} width={398} height={50} className="stroke-line/60 fill-paper-soft/40" />
          <text x={cx} y={370} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.06em">
            {failed
              ? "舵设错方向 · 三力失衡 · 船被吹散"
              : `稳定 TWA ≈ ${stableTwa}° · 下风漂移 ≈ ${(0.8 + wScale * 1.2).toFixed(1)} kn`}
          </text>
          <text x={cx} y={388} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.06em">
            {failed ? "FAILURE MODE" : "STABLE BALANCE"}
          </text>
        </svg>
      </div>

      <div className="space-y-3.5">
        <ControlRow label="真风风速 TWS" value={`${tws} kn`} min={10} max={35} step={1} v={tws} onChange={(n) => setTws(Math.round(n))} />

        <div>
          <p className="mb-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist">船型</p>
          <div className="inline-flex w-full overflow-hidden rounded-sm border border-line">
            {HEAVE_BOATS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBoatId(b.id)}
                className={`flex-1 px-2 py-1.5 font-mono text-[0.7rem] transition-colors ${
                  boatId === b.id ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setFailed((f) => !f)}
          className={`w-full rounded-sm border px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] transition-colors ${
            failed
              ? "border-coral bg-coral/10 text-coral"
              : "border-line bg-paper text-ink hover:bg-paper-soft"
          }`}
        >
          {failed ? "复位三力平衡" : "试着失败（舵设错方向）"}
        </button>

        <div className="rounded-sm border border-line/70 bg-paper p-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-mist mb-2">三力图例</p>
          <ul className="space-y-1.5 text-[0.78rem] leading-[1.55] text-ink-soft">
            <li>
              <span className="inline-block w-3 h-3 mr-2 align-middle bg-coral rounded-sm" />
              主帆推力 → 把船推下风
            </li>
            <li>
              <span className="inline-block w-3 h-3 mr-2 align-middle bg-sea-deep rounded-sm" />
              反艏帆推力 → 把船头按下风
            </li>
            <li>
              <span className="inline-block w-3 h-3 mr-2 align-middle bg-sun rounded-sm" />
              舵反扭 → 把船头按上风
            </li>
          </ul>
        </div>

        <p className="text-[0.76rem] leading-[1.6] text-mist">
          三力精确制衡 → 船在 50°–75° TWA 稳住 · 缓慢下风漂移。舵设错 → 平衡破坏。
        </p>
      </div>
    </div>
  );
}
