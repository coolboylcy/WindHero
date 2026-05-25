"use client";

import { useMemo, useState } from "react";

/**
 * 交互式课程图解 —— 客户端组件。
 *
 * 这些图解可以被读者用滑块 / 拖拽实时调参，看物理量如何随之改变。
 * 设计原则：克制的线稿、Mediterranean palette、不喧宾夺主。
 */

type Props = { className?: string };

/* —— 1. 交互点风方位（用滑块调船头朝向；风永远从上吹下） —— */

export function InteractivePointsOfSail({ className }: Props) {
  const [boatHeading, setBoatHeading] = useState(45);
  /* 风从 360°（正上方）吹下；TWA = 船头 - 风向 = boatHeading（取正） */
  const twa = ((boatHeading + 360) % 360);
  const abs = Math.min(twa, 360 - twa);

  const zone = useMemo(() => {
    if (abs < 30) return { label: "死区 · No-Go", tone: "warn", desc: "顶风 < 30°，船开不动" };
    if (abs < 60) return { label: "近顶风 · Close-Hauled", tone: "go", desc: "上风航段，最考验调帆" };
    if (abs < 100) return { label: "横风 · Beam Reach", tone: "go", desc: "最快、最稳的点风方位" };
    if (abs < 150) return { label: "尾后风 · Broad Reach", tone: "go", desc: "顺风之字的典型角度" };
    return { label: "正顺风 · Running", tone: "warn", desc: "视风最小、帆效率下降" };
  }, [abs]);

  const cx = 200;
  const cy = 200;
  const r = 140;
  const rad = ((boatHeading - 90) * Math.PI) / 180;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 400"
        className="mx-auto block h-auto w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 死区扇形 */}
        <path
          d={`M ${cx} ${cy} L ${cx + r * Math.sin(-Math.PI / 6)} ${cy - r * Math.cos(-Math.PI / 6)} A ${r} ${r} 0 0 1 ${cx + r * Math.sin(Math.PI / 6)} ${cy - r * Math.cos(Math.PI / 6)} Z`}
          className="fill-sea-soft/40 stroke-mist/0"
        />

        {/* 罗经圈 */}
        <circle cx={cx} cy={cy} r={r} className="stroke-mist/60" />
        <circle cx={cx} cy={cy} r={r * 0.7} className="stroke-mist/30" strokeDasharray="2 4" />

        {/* 风向 */}
        <line x1={cx} y1={36} x2={cx} y2={70} className="stroke-sea-deep" strokeWidth={1.6} />
        <polygon points={`${cx},${74} ${cx - 5},${64} ${cx + 5},${64}`} className="fill-sea-deep stroke-sea-deep" />
        <text x={cx + 10} y={52} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.1em">
          真风 360°
        </text>

        {/* 度数刻度 */}
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

        {/* 船（按 boatHeading 旋转） */}
        <g transform={`translate(${cx} ${cy}) rotate(${boatHeading})`}>
          {/* 船速向量（往船头方向） */}
          <line x1={0} y1={0} x2={0} y2={-r * 0.8} className="stroke-coral" strokeWidth={1.4} strokeDasharray="2 4" />
          <polygon points={`0,${-r * 0.8 - 4} -5,${-r * 0.8 + 6} 5,${-r * 0.8 + 6}`} className="fill-coral stroke-coral" />

          {/* 船体 */}
          <ellipse cx={0} cy={6} rx={16} ry={5} className="fill-paper-soft stroke-ink" />
          <line x1={0} y1={-22} x2={0} y2={2} className="stroke-ink" strokeWidth={1.5} />
          <path d="M 0 -22 L 14 2 L 0 -2 Z" className="fill-paper-soft stroke-ink" />
        </g>

        {/* TWA 弧 */}
        <path
          d={`M ${cx} ${cy - 50} A 50 50 0 ${abs > 180 ? 1 : 0} ${boatHeading > 0 ? 1 : 0} ${cx + 50 * Math.sin(rad + Math.PI / 2)} ${cy - 50 * Math.cos(rad + Math.PI / 2)}`}
          className="stroke-mist"
          strokeWidth={1}
          fill="none"
        />
      </svg>

      {/* 控件 */}
      <div className="mx-auto mt-6 max-w-md space-y-4">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]">
            <span className="text-sea-deep">船头相对风的角度 TWA</span>
            <span className="text-ink">{abs}°</span>
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            value={boatHeading}
            onChange={(e) => setBoatHeading(parseInt(e.target.value, 10))}
            className="mt-2 w-full accent-[var(--color-sea-deep)]"
          />
        </div>
        <div className="flex items-baseline justify-between border-t border-line/70 pt-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
              当前点风方位
            </p>
            <p className="display mt-1 text-xl text-ink">{zone.label}</p>
          </div>
          <p className="text-right text-[0.84rem] text-ink-soft">{zone.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* —— 2. 交互真风/视风（同时调 TWA 与船速） —— */

export function InteractiveApparentWind({ className }: Props) {
  const [tws, setTws] = useState(14);
  const [twa, setTwa] = useState(90);
  const [boatSpeed, setBoatSpeed] = useState(6.5);

  /* 视风向量合成：在船坐标系里，真风从 TWA 方向、风速 TWS 流过来；
     船向前跑 boatSpeed，相当于一阵反方向的「跑出来的风」叠加。 */
  const twaRad = (twa * Math.PI) / 180;
  // 真风分量（在船坐标系）
  const twX = tws * Math.sin(twaRad);
  const twY = -tws * Math.cos(twaRad);
  // 船速对应的「自跑风」是 -boatSpeed 沿船头方向
  const awX = twX;
  const awY = twY - boatSpeed;
  const aws = Math.sqrt(awX * awX + awY * awY);
  const awa = (Math.atan2(awX, -awY) * 180) / Math.PI;

  // 画布参数
  const cx = 200;
  const cy = 220;
  // 视觉缩放（让 20 节 ≈ 100px）
  const SCALE = 6;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 460 340"
        className="mx-auto block h-auto w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 船（永远朝上） */}
        <g transform={`translate(${cx} ${cy})`}>
          <ellipse cx={0} cy={6} rx={22} ry={6} className="fill-paper-soft stroke-ink" />
          <line x1={0} y1={-30} x2={0} y2={2} className="stroke-ink" strokeWidth={1.5} />
          <path d="M 0 -30 L 18 2 L 0 -2 Z" className="fill-paper-soft stroke-ink" />
        </g>

        {/* 船速向量（往船头） */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - boatSpeed * SCALE} className="stroke-ink" strokeWidth={1.4} />
        <polygon
          points={`${cx},${cy - boatSpeed * SCALE - 4} ${cx - 5},${cy - boatSpeed * SCALE + 4} ${cx + 5},${cy - boatSpeed * SCALE + 4}`}
          className="fill-ink stroke-ink"
        />
        <text x={cx + 8} y={cy - (boatSpeed * SCALE) / 2} className="fill-ink font-mono" fontSize="10">
          船速 {boatSpeed.toFixed(1)} kn
        </text>

        {/* 真风向量（从 TWA 方向射向船） */}
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

        {/* 视风向量（合成） */}
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

      <div className="mx-auto mt-6 grid max-w-md gap-4">
        <ControlRow
          label="真风风速 TWS"
          value={`${tws} 节`}
          min={4}
          max={30}
          step={1}
          v={tws}
          onChange={setTws}
        />
        <ControlRow
          label="真风角 TWA"
          value={`${twa}°`}
          min={20}
          max={170}
          step={5}
          v={twa}
          onChange={setTwa}
        />
        <ControlRow
          label="船速"
          value={`${boatSpeed.toFixed(1)} 节`}
          min={1}
          max={12}
          step={0.5}
          v={boatSpeed}
          onChange={setBoatSpeed}
        />
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-[0.82rem] leading-[1.7] text-mist">
        蓝箭头 = 真风（永远相对地面）· 橙箭头 = 视风（你在甲板上感受到的）
        <br />
        船加速时，视风「往船头方向拉」——这就是为什么顶风跑会感觉风越来越强。
      </p>
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
      <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]">
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
        className="mt-2 w-full accent-[var(--color-sea-deep)]"
      />
    </div>
  );
}

/* —— 3. 交互 12 分之 1 法则（潮高随小时变化） —— */

export function InteractiveTwelfthsRule({ className }: Props) {
  const [hourSinceLW, setHourSinceLW] = useState(3); // 0–6
  const [hwHeight, setHwHeight] = useState(4.8);
  const [lwHeight, setLwHeight] = useState(0.6);

  const range = Math.max(0, hwHeight - lwHeight);
  /* 12 分之 1 累积： 1, 1+2=3, 3+3=6, 6+3=9, 9+2=11, 11+1=12 */
  const cumulative = [0, 1, 3, 6, 9, 11, 12];
  const fraction = cumulative[Math.min(hourSinceLW, 6)] / 12;
  const height = lwHeight + fraction * range;

  // 画布：x 轴 0–6 小时，y 轴 LW–HW
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
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mx-auto block h-auto w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 坐标轴 */}
        <line x1={padL} y1={padT + innerH} x2={padL + innerW} y2={padT + innerH} className="stroke-ink" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + innerH} className="stroke-ink" />
        {/* x 轴刻度 */}
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
        {/* y 轴刻度 */}
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

        {/* 潮高曲线（12 分之 1 离散） */}
        <path d={path} className="stroke-sea-deep" strokeWidth={1.8} />

        {/* 当前点 */}
        <line x1={cx} y1={padT} x2={cx} y2={cy} className="stroke-mist" strokeDasharray="2 3" />
        <line x1={padL} y1={cy} x2={cx} y2={cy} className="stroke-mist" strokeDasharray="2 3" />
        <circle cx={cx} cy={cy} r={5} className="fill-coral stroke-coral" />

        {/* 标签 */}
        <text x={padL + innerW - 6} y={padT + 14} textAnchor="end" className="fill-ink font-mono" fontSize="10" letterSpacing="0.06em">
          {height.toFixed(2)} m
        </text>
      </svg>

      <div className="mx-auto mt-6 grid max-w-md gap-4">
        <ControlRow
          label="距离低潮的小时数"
          value={`${hourSinceLW} h`}
          min={0}
          max={6}
          step={1}
          v={hourSinceLW}
          onChange={(n) => setHourSinceLW(Math.round(n))}
        />
        <ControlRow
          label="低潮 LW 高度"
          value={`${lwHeight.toFixed(1)} m`}
          min={0}
          max={3}
          step={0.1}
          v={lwHeight}
          onChange={setLwHeight}
        />
        <ControlRow
          label="高潮 HW 高度"
          value={`${hwHeight.toFixed(1)} m`}
          min={2}
          max={8}
          step={0.1}
          v={hwHeight}
          onChange={setHwHeight}
        />
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-[0.82rem] leading-[1.7] text-mist">
        12 分之 1 累积比例：1/12 → 3/12 → 6/12 → 9/12 → 11/12 → 12/12
        <br />
        中间两小时（HW 前后各一）的潮速最快、潮差变化最快——出港最好的两小时。
      </p>
    </div>
  );
}
