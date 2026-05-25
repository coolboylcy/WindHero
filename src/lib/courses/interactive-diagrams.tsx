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


/* —— 4. 交互三圈环流 · 全球风带 —— 
   一个简化的"地球侧视图"。学员能用滑块选择纬度，看到自己处在哪一圈、主导风向。
*/

export function InteractiveThreeCellCirculation({ className }: Props) {
  const [lat, setLat] = useState(35);

  const cell = useMemo(() => {
    const abs = Math.abs(lat);
    if (abs < 30) {
      return {
        name: "哈德利环流 Hadley Cell",
        wind: "东北信风 NE Trades",
        windDir: lat >= 0 ? "由东北吹向西南" : "由东南吹向西北",
        flow: "赤道上升 → 高空向极地流 → 30° 下沉",
        sailing: "经典横渡风带；季节稳定 15–25 节",
      };
    } else if (abs < 60) {
      return {
        name: "费雷尔环流 Ferrel Cell",
        wind: "盛行西风 Prevailing Westerlies",
        windDir: "由西向东",
        flow: "30° 下沉 → 地表向极地 → 60° 上升 → 高空回流",
        sailing: "北大西洋 / 北太平洋常年西风；锋面频繁",
      };
    } else {
      return {
        name: "极地环流 Polar Cell",
        wind: "极地东风 Polar Easterlies",
        windDir: "由东向西",
        flow: "极地下沉 → 地表向赤道 → 60° 上升",
        sailing: "高纬度航行；天气剧烈，多数船不去",
      };
    }
  }, [lat]);

  // 画一个半圆地球；纬度刻度从顶（90°N）到底（90°S）
  const cx = 200;
  const cy = 250;
  const r = 180;

  function latToY(deg: number) {
    return cy - r * Math.sin((deg * Math.PI) / 180);
  }

  const userY = latToY(lat);

  // 三圈环流的纬度边界 + 颜色
  const bands = [
    { from: 60, to: 90, fill: "fill-sea-soft/40", label: "极地环流" },
    { from: 30, to: 60, fill: "fill-paper-soft/0", label: "费雷尔环流" },
    { from: -30, to: 30, fill: "fill-sea-soft/40", label: "哈德利环流" },
    { from: -60, to: -30, fill: "fill-paper-soft/0", label: "费雷尔环流" },
    { from: -90, to: -60, fill: "fill-sea-soft/40", label: "极地环流" },
  ];

  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 460"
        className="mx-auto block h-auto w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 地球轮廓 */}
        <circle cx={cx} cy={cy} r={r} className="stroke-mist/60 fill-paper" />

        {/* 三圈环流带（淡蓝交替） */}
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

        {/* 纬度网格线 */}
        {[60, 30, 0, -30, -60].map((deg) => {
          const y = latToY(deg);
          // 在球面上算 x 范围
          const xR = r * Math.cos((deg * Math.PI) / 180);
          return (
            <g key={deg}>
              <line
                x1={cx - xR}
                y1={y}
                x2={cx + xR}
                y2={y}
                className="stroke-mist/30"
                strokeDasharray="2 3"
              />
              <text
                x={cx + r + 8}
                y={y + 3}
                className="fill-mist font-mono"
                fontSize="9"
              >
                {deg > 0 ? `${deg}°N` : deg < 0 ? `${-deg}°S` : "0°"}
              </text>
            </g>
          );
        })}

        {/* 赤道粗线 */}
        <line
          x1={cx - r}
          y1={cy}
          x2={cx + r}
          y2={cy}
          className="stroke-ink/40"
        />

        {/* 风带箭头：地表风方向（粗略示意） */}
        {/* 信风：北半球东北、南半球东南 */}
        <Arrow x1={cx - 60} y1={latToY(15)} x2={cx - 100} y2={latToY(8)} cls="stroke-sea-deep fill-sea-deep" />
        <Arrow x1={cx - 60} y1={latToY(-15)} x2={cx - 100} y2={latToY(-8)} cls="stroke-sea-deep fill-sea-deep" />
        {/* 盛行西风：北/南 */}
        <Arrow x1={cx - 80} y1={latToY(45)} x2={cx + 20} y2={latToY(45)} cls="stroke-coral fill-coral" />
        <Arrow x1={cx - 80} y1={latToY(-45)} x2={cx + 20} y2={latToY(-45)} cls="stroke-coral fill-coral" />
        {/* 极地东风 */}
        <Arrow x1={cx + 20} y1={latToY(75)} x2={cx - 30} y2={latToY(75)} cls="stroke-ink fill-ink" />
        <Arrow x1={cx + 20} y1={latToY(-75)} x2={cx - 30} y2={latToY(-75)} cls="stroke-ink fill-ink" />

        {/* 用户当前纬度指示线 */}
        <line
          x1={cx - r - 10}
          y1={userY}
          x2={cx + r + 10}
          y2={userY}
          className="stroke-coral"
          strokeWidth={1.8}
        />
        <circle
          cx={cx + r * Math.cos((lat * Math.PI) / 180)}
          cy={userY}
          r={5}
          className="fill-coral stroke-coral"
        />

        {/* 极地标签 */}
        <text x={cx} y={latToY(90) - 6} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
          北极 90°N
        </text>
        <text x={cx} y={latToY(-90) + 14} textAnchor="middle" className="fill-mist font-mono" fontSize="9">
          南极 90°S
        </text>
      </svg>

      {/* 滑块 */}
      <div className="mx-auto mt-6 max-w-md space-y-4">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]">
            <span className="text-sea-deep">纬度</span>
            <span className="text-ink">
              {lat >= 0 ? `${lat}°N` : `${-lat}°S`}
            </span>
          </div>
          <input
            type="range"
            min={-89}
            max={89}
            step={1}
            value={lat}
            onChange={(e) => setLat(parseInt(e.target.value, 10))}
            className="mt-2 w-full accent-[var(--color-sea-deep)]"
          />
          <div className="mt-1 flex justify-between font-mono text-[0.66rem] text-mist">
            <span>南极</span>
            <span>赤道</span>
            <span>北极</span>
          </div>
        </div>

        <div className="rounded-sm border border-line/70 bg-paper p-5">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
            你所在的环流
          </p>
          <p className="display mt-2 text-xl text-ink">{cell.name}</p>
          <dl className="mt-4 space-y-2 text-[0.9rem] leading-[1.7] text-ink-soft">
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">主导风</dt>
              <dd>{cell.wind} · {cell.windDir}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">环流</dt>
              <dd>{cell.flow}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-mist">航行意义</dt>
              <dd>{cell.sailing}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-[0.82rem] leading-[1.7] text-mist">
        蓝箭头 = 信风带 · 红箭头 = 盛行西风带 · 深色箭头 = 极地东风带
        <br />
        拖动纬度滑块，看你想去的海域属于哪一圈。
      </p>
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
      <polygon
        points={`${x2},${y2} ${ax + px},${ay + py} ${ax - px},${ay - py}`}
      />
    </g>
  );
}


/* —— 5. 交互等压线 · 风向风强关系 —— 
   学员调整等压线密度、半球选择，看风向与风速如何改变。
*/

export function InteractiveIsobarWind({ className }: Props) {
  const [spacing, setSpacing] = useState(50); // 等压线间距 px
  const [hemisphere, setHemisphere] = useState<"N" | "S">("N");

  // 风速反比于间距（粗略示意）
  // 间距 20px → ~ 30 节、100px → ~ 8 节
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

  // 风向：北半球绕 L 逆时针 / 南半球顺时针；这里地图 L 在左、H 在右
  // 等压线接近南北向，风沿等压线、低压在左手（北半球）
  // 北半球：风从下吹向上；南半球：从上吹向下
  const windFromY = hemisphere === "N" ? H - 30 : 30;
  const windToY = hemisphere === "N" ? 30 : H - 30;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H + 60}`}
        className="mx-auto block h-auto w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 边框（简化天气图框） */}
        <rect x={1} y={1} width={W - 2} height={H - 2} className="stroke-line/60" />

        {/* 等压线 */}
        {isobars.map((iso, i) => (
          <g key={i}>
            <line
              x1={iso.x}
              y1={4}
              x2={iso.x}
              y2={H - 4}
              className="stroke-ink/70"
            />
            <text
              x={iso.x}
              y={H - 10}
              textAnchor="middle"
              className="fill-mist font-mono"
              fontSize="8"
            >
              {iso.pressure}
            </text>
          </g>
        ))}

        {/* L 与 H 标签 */}
        <text x={20} y={cy + 6} className="fill-coral font-mono" fontSize="14" letterSpacing="0.1em">
          L
        </text>
        <text x={W - 28} y={cy + 6} className="fill-sea-deep font-mono" fontSize="14" letterSpacing="0.1em">
          H
        </text>

        {/* 风向箭头（沿等压线方向、风强用粗细表示） */}
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
        <text
          x={cx + 12}
          y={(windFromY + windToY) / 2}
          className="fill-sea-deep font-mono"
          fontSize="10"
          letterSpacing="0.06em"
        >
          {windSpeed} 节
        </text>

        {/* 标题 */}
        <text x={cx} y={H + 32} textAnchor="middle" className="fill-ink-soft" fontSize="11">
          {hemisphere === "N" ? "北半球：低压在风的左手" : "南半球：低压在风的右手"}
        </text>
        <text x={cx} y={H + 50} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.1em">
          BUYS-BALLOT 法则
        </text>
      </svg>

      <div className="mx-auto mt-6 max-w-md space-y-4">
        <div>
          <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.14em]">
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
            className="mt-2 w-full accent-[var(--color-sea-deep)]"
          />
          <div className="mt-1 flex justify-between font-mono text-[0.66rem] text-mist">
            <span>密 → 风强</span>
            <span>疏 → 风弱</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line/70 pt-4">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
            半球
          </span>
          <div className="inline-flex overflow-hidden rounded-sm border border-line">
            {(["N", "S"] as const).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHemisphere(h)}
                className={`px-4 py-1.5 font-mono text-[0.78rem] transition-colors ${
                  hemisphere === h
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink hover:bg-paper-soft"
                }`}
              >
                {h === "N" ? "北半球" : "南半球"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-[0.82rem] leading-[1.7] text-mist">
        等压线越密 → 气压梯度越大 → 风越强（粗细变化表示）
        <br />
        北半球低压逆时针环流；南半球反过来。这就是「左手低压」法则。
      </p>
    </div>
  );
}


/* —— 6. 交互 Coriolis 偏向 —— 一个简化的旋转地球 + 移动物体示意 */

export function InteractiveCoriolis({ className }: Props) {
  const [hemisphere, setHemisphere] = useState<"N" | "S">("N");

  const cx = 200;
  const cy = 180;
  const r = 130;

  // 偏向方向：北半球向右、南半球向左
  const dx = hemisphere === "N" ? 60 : -60;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 360"
        className="mx-auto block h-auto w-full max-w-xl"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      >
        {/* 地球（俯视） */}
        <circle cx={cx} cy={cy} r={r} className="stroke-mist/60 fill-paper" />
        {/* 极点 */}
        <circle cx={cx} cy={cy} r={3} className="fill-ink stroke-ink" />
        <text x={cx + 8} y={cy + 4} className="fill-mist font-mono" fontSize="9">
          {hemisphere === "N" ? "N 极俯视" : "S 极俯视"}
        </text>

        {/* 自转方向（北半球从上看是逆时针） */}
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

        {/* 直线"应该走的路径"（虚线） */}
        <line
          x1={cx}
          y1={cy + 60}
          x2={cx}
          y2={cy - 60}
          className="stroke-mist"
          strokeDasharray="3 4"
        />
        <text x={cx + 6} y={cy + 50} className="fill-mist font-mono" fontSize="8">
          理想直线路径
        </text>

        {/* 实际偏向后的弯曲路径 */}
        <path
          d={`M ${cx} ${cy + 60} Q ${cx + dx / 2} ${cy} ${cx + dx} ${cy - 60}`}
          className="stroke-sea-deep"
          strokeWidth={1.8}
        />
        <polygon
          points={`${cx + dx},${cy - 60} ${cx + dx - 5},${cy - 50} ${cx + dx + 5},${cy - 50}`}
          className="fill-sea-deep stroke-sea-deep"
        />
        <text
          x={cx + dx + 8}
          y={cy - 56}
          className="fill-sea-deep font-mono"
          fontSize="10"
        >
          实际路径
        </text>

        {/* 偏向说明 */}
        <text x={cx + 8} y={cy + 64} className="fill-ink-soft" fontSize="10">
          出发点
        </text>

        {/* 底部说明 */}
        <text x={cx} y={cy + r + 28} textAnchor="middle" className="fill-ink" fontSize="11">
          {hemisphere === "N"
            ? "北半球：移动物体向右偏 (Coriolis force)"
            : "南半球：移动物体向左偏"}
        </text>
        <text x={cx} y={cy + r + 44} textAnchor="middle" className="fill-mist" fontSize="9" letterSpacing="0.06em">
          地球自转 + 物体相对极点运动 → 视觉上的转弯
        </text>
      </svg>

      <div className="mx-auto mt-6 flex max-w-md items-center justify-between border-t border-line/70 pt-4">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist">
          切换半球
        </span>
        <div className="inline-flex overflow-hidden rounded-sm border border-line">
          {(["N", "S"] as const).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHemisphere(h)}
              className={`px-4 py-1.5 font-mono text-[0.78rem] transition-colors ${
                hemisphere === h
                  ? "bg-ink text-paper"
                  : "bg-paper text-ink hover:bg-paper-soft"
              }`}
            >
              {h === "N" ? "北半球" : "南半球"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
