import type { ReactNode } from "react";
import type { LessonBlock } from "./types";
import {
  InteractiveApparentWind,
  InteractiveCoriolis,
  InteractiveCtsPlotter,
  InteractiveHeaveToBalance,
  InteractiveIsobarWind,
  InteractiveLightsIdentifier,
  InteractivePointsOfSail,
  InteractiveThreeCellCirculation,
  InteractiveTwelfthsRule,
} from "./interactive-diagrams";

/**
 * WindHero 课程内置 SVG 图解。
 *
 * 风格规则：
 * - 单色线稿；只用 ink / sea / mist 三档灰蓝。
 * - 1.2px 描边；不要阴影、渐变、装饰。
 * - 内部留白足够大；标签字体小、克制。
 * - 所有图自适应容器宽度。
 */

type DiagramKind = Extract<LessonBlock, { type: "diagram" }>["kind"];

type DiagramProps = {
  className?: string;
};

/* —— 1. 点风方位（Points of Sail） —— 已替换为 InteractivePointsOfSail，下面的静态版本作为 SSR / no-JS 备用 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _StaticPointsOfSail({ className }: DiagramProps) {
  const cx = 200;
  const cy = 200;
  const r = 150;

  const segments: Array<{ angle: number; label: string; sub?: string }> = [
    { angle: 0, label: "顶风", sub: "No-Go Zone" },
    { angle: 45, label: "近顶风", sub: "Close-Hauled" },
    { angle: 90, label: "横风", sub: "Beam Reach" },
    { angle: 135, label: "尾后风", sub: "Broad Reach" },
    { angle: 180, label: "顺风", sub: "Running" },
    { angle: -135, label: "尾后风", sub: "Broad Reach" },
    { angle: -90, label: "横风", sub: "Beam Reach" },
    { angle: -45, label: "近顶风", sub: "Close-Hauled" },
  ];

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 顶风死区 */}
      <path
        d={`M ${cx} ${cy} L ${cx + r * Math.sin(-Math.PI / 4)} ${cy - r * Math.cos(-Math.PI / 4)} A ${r} ${r} 0 0 1 ${cx + r * Math.sin(Math.PI / 4)} ${cy - r * Math.cos(Math.PI / 4)} Z`}
        className="fill-sea-soft/40 stroke-mist/0"
      />
      <text
        x={cx}
        y={cy - r * 0.65}
        textAnchor="middle"
        className="fill-ink-soft font-mono"
        fontSize="9"
        letterSpacing="0.12em"
      >
        死区 NO-GO
      </text>

      {/* 罗盘大圆 */}
      <circle cx={cx} cy={cy} r={r} className="stroke-mist/70" />

      {/* 风向箭头（从上方吹下来） */}
      <line
        x1={cx}
        y1={36}
        x2={cx}
        y2={68}
        className="stroke-sea-deep"
        strokeWidth={1.5}
      />
      <polygon
        points={`${cx},${72} ${cx - 5},${62} ${cx + 5},${62}`}
        className="fill-sea-deep stroke-sea-deep"
      />
      <text
        x={cx + 10}
        y={50}
        className="fill-sea-deep font-mono"
        fontSize="10"
        letterSpacing="0.1em"
      >
        风
      </text>

      {/* 帆船轮廓 */}
      <g transform={`translate(${cx} ${cy})`}>
        <line
          x1={0}
          y1={-18}
          x2={0}
          y2={26}
          className="stroke-ink"
          strokeWidth={1.4}
        />
        <path
          d="M 0 -18 L 12 20 L 0 16 Z"
          className="fill-paper-soft stroke-ink"
        />
        <ellipse
          cx={0}
          cy={28}
          rx={16}
          ry={5}
          className="fill-paper-soft stroke-ink"
        />
      </g>

      {/* 点位刻度 */}
      {segments.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = cx + (r + 18) * Math.sin(rad);
        const y = cy - (r + 18) * Math.cos(rad);
        const tx = cx + (r + 38) * Math.sin(rad);
        const ty = cy - (r + 38) * Math.cos(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={2.2} className="fill-ink stroke-ink" />
            <text
              x={tx}
              y={ty - 3}
              textAnchor="middle"
              className="fill-ink"
              fontSize="11"
            >
              {s.label}
            </text>
            {s.sub ? (
              <text
                x={tx}
                y={ty + 9}
                textAnchor="middle"
                className="fill-mist font-mono"
                fontSize="8"
                letterSpacing="0.08em"
              >
                {s.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/* —— 2. 真风 vs 视风 —— 已替换为 InteractiveApparentWind */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _StaticApparentWind({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 船 */}
      <g transform="translate(120 170)">
        <ellipse
          cx={0}
          cy={0}
          rx={36}
          ry={9}
          className="fill-paper-soft stroke-ink"
        />
        <line
          x1={0}
          y1={-50}
          x2={0}
          y2={-4}
          className="stroke-ink"
          strokeWidth={1.4}
        />
        <path
          d="M 0 -48 L 22 -2 L 0 -6 Z"
          className="fill-paper-soft stroke-ink"
        />
      </g>

      {/* 船速向量 */}
      <line
        x1={156}
        y1={170}
        x2={240}
        y2={170}
        className="stroke-ink"
        strokeWidth={1.6}
      />
      <polygon
        points="244,170 234,165 234,175"
        className="fill-ink stroke-ink"
      />
      <text x={196} y={186} textAnchor="middle" className="fill-ink-soft" fontSize="10">
        船速 ν (向前)
      </text>

      {/* 真风（从右上方吹来） */}
      <line
        x1={310}
        y1={50}
        x2={246}
        y2={132}
        className="stroke-sea-deep"
        strokeWidth={1.6}
      />
      <polygon
        points="244,134 256,131 252,142"
        className="fill-sea-deep stroke-sea-deep"
      />
      <text x={316} y={42} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.08em">
        TW 真风
      </text>

      {/* 视风（合成箭头） */}
      <line
        x1={310}
        y1={50}
        x2={156}
        y2={170}
        className="stroke-coral"
        strokeWidth={1.6}
        strokeDasharray="0"
      />
      <polygon
        points="156,170 168,165 172,176"
        className="fill-coral stroke-coral"
      />
      <text x={240} y={104} className="fill-coral font-mono" fontSize="10" letterSpacing="0.08em">
        AW 视风
      </text>

      {/* 角度弧 */}
      <path
        d="M 200 170 A 30 30 0 0 0 220 152"
        className="stroke-mist"
      />
      <text x={224} y={166} className="fill-mist" fontSize="9">
        β
      </text>
    </svg>
  );
}

/* —— 3. 海陆风循环 —— */

function SeaBreezeCycle({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 440 260"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 海面 */}
      <line
        x1={20}
        y1={210}
        x2={220}
        y2={210}
        className="stroke-sea-deep"
      />
      <text x={120} y={232} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        海
      </text>
      {/* 陆地剖面 */}
      <path
        d="M 220 210 L 250 195 L 290 188 L 340 192 L 400 205 L 420 210"
        className="stroke-ink"
      />
      <text x={330} y={232} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        陆
      </text>
      <text x={420} y={232} textAnchor="end" className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        白天
      </text>

      {/* 太阳 */}
      <circle cx={360} cy={50} r={14} className="stroke-ink" />
      <g className="stroke-ink">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={360 + Math.cos(a) * 18}
              y1={50 + Math.sin(a) * 18}
              x2={360 + Math.cos(a) * 24}
              y2={50 + Math.sin(a) * 24}
            />
          );
        })}
      </g>

      {/* 陆地热气上升 */}
      <path
        d="M 320 188 C 312 150, 320 110, 312 80"
        className="stroke-coral"
        strokeDasharray="3 3"
      />
      <polygon points="312,76 308,86 316,86" className="fill-coral stroke-coral" />

      {/* 海上冷空气下沉 */}
      <path
        d="M 100 80 C 92 130, 96 170, 96 200"
        className="stroke-sea-deep"
        strokeDasharray="3 3"
      />
      <polygon points="96,204 92,194 100,194" className="fill-sea-deep stroke-sea-deep" />

      {/* 海风（贴近水面，从海吹向陆） */}
      <line x1={50} y1={196} x2={300} y2={196} className="stroke-sea-deep" strokeWidth={1.6} />
      <polygon points="304,196 294,191 294,201" className="fill-sea-deep stroke-sea-deep" />
      <text x={170} y={188} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.08em">
        海风 SEA BREEZE
      </text>

      {/* 高空回流 */}
      <line x1={310} y1={70} x2={110} y2={70} className="stroke-mist" strokeWidth={1.2} />
      <polygon points="106,70 116,65 116,75" className="fill-mist stroke-mist" />
      <text x={210} y={60} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.08em">
        高空回流
      </text>
    </svg>
  );
}

/* —— 4. 气压梯度 —— */

function PressureGradient({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 等压线 — 围绕低压中心的同心轨迹 */}
      <g className="stroke-ink">
        <ellipse cx={140} cy={140} rx={26} ry={20} />
        <ellipse cx={140} cy={140} rx={56} ry={42} />
        <ellipse cx={140} cy={140} rx={92} ry={68} />
        <ellipse cx={140} cy={140} rx={132} ry={96} />
      </g>
      <text x={140} y={144} textAnchor="middle" className="fill-coral font-mono" fontSize="14" letterSpacing="0.1em">
        L
      </text>
      <text x={140} y={158} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.1em">
        低压
      </text>

      {/* 高压侧 */}
      <g className="stroke-ink">
        <ellipse cx={350} cy={140} rx={20} ry={16} />
        <ellipse cx={350} cy={140} rx={42} ry={32} />
      </g>
      <text x={350} y={144} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="14" letterSpacing="0.1em">
        H
      </text>
      <text x={350} y={158} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.1em">
        高压
      </text>

      {/* 等压线标注 */}
      <text x={232} y={140} className="fill-mist font-mono" fontSize="8" letterSpacing="0.06em">
        1004
      </text>
      <text x={196} y={140} className="fill-mist font-mono" fontSize="8" letterSpacing="0.06em">
        1000
      </text>

      {/* 北半球：风沿等压线，低压在左手 */}
      <g>
        <line x1={236} y1={88} x2={236} y2={196} className="stroke-sea-deep" strokeWidth={1.6} />
        <polygon points="236,196 232,186 240,186" className="fill-sea-deep stroke-sea-deep" />
        <text x={244} y={146} className="fill-sea-deep font-mono" fontSize="9" letterSpacing="0.08em">
          地转风
        </text>
      </g>

      {/* 标题 */}
      <text x={210} y={36} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.08em">
        北半球：风绕低压逆时针；间距越窄风越强
      </text>
    </svg>
  );
}

/* —— 5. 锋面系统（冷锋 + 暖锋） —— */

function FrontalSystem({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 460 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 地面线 */}
      <line x1={20} y1={220} x2={440} y2={220} className="stroke-mist/70" />

      {/* 暖空气区（中段） */}
      <path
        d="M 160 220 L 220 90 L 340 90 L 380 220 Z"
        className="fill-paper-soft/40 stroke-mist/0"
      />
      <text x={280} y={140} textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        暖空气 / WARM
      </text>

      {/* 冷锋（左侧，陡） */}
      <line x1={160} y1={220} x2={220} y2={90} className="stroke-sea-deep" strokeWidth={2} />
      {/* 冷锋三角符号 */}
      <g className="fill-sea-deep stroke-sea-deep">
        <polygon points="173,200 168,210 178,210" />
        <polygon points="186,180 181,190 191,190" />
        <polygon points="199,160 194,170 204,170" />
      </g>
      <text x={170} y={80} className="fill-sea-deep font-mono" fontSize="10" letterSpacing="0.08em">
        冷锋 COLD
      </text>

      {/* 暖锋（右侧，缓） */}
      <line x1={380} y1={220} x2={340} y2={90} className="stroke-coral" strokeWidth={2} />
      {/* 暖锋半圆符号 */}
      <g className="fill-coral stroke-coral">
        <circle cx={372} cy={200} r={4} />
        <circle cx={362} cy={175} r={4} />
        <circle cx={352} cy={150} r={4} />
      </g>
      <text x={400} y={80} className="fill-coral font-mono" fontSize="10" letterSpacing="0.08em">
        暖锋 WARM
      </text>

      {/* 冷空气区 */}
      <text x={80} y={200} className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        冷空气
      </text>
      <text x={400} y={200} className="fill-mist font-mono" fontSize="9" letterSpacing="0.12em">
        冷空气
      </text>

      {/* 降水带 */}
      <g className="stroke-ink-soft" strokeWidth={0.6} strokeDasharray="2 3">
        <line x1={168} y1={220} x2={155} y2={250} />
        <line x1={178} y1={220} x2={165} y2={250} />
        <line x1={188} y1={220} x2={175} y2={250} />
      </g>
      <g className="stroke-ink-soft" strokeWidth={0.6} strokeDasharray="2 3">
        <line x1={372} y1={220} x2={385} y2={250} />
        <line x1={362} y1={220} x2={375} y2={250} />
        <line x1={352} y1={220} x2={365} y2={250} />
        <line x1={342} y1={220} x2={355} y2={250} />
      </g>

      <text x={150} y={264} className="fill-mist font-mono" fontSize="8" letterSpacing="0.06em">
        阵性降水
      </text>
      <text x={342} y={264} className="fill-mist font-mono" fontSize="8" letterSpacing="0.06em">
        连续性降水
      </text>

      {/* 移动方向 */}
      <line x1={70} y1={50} x2={130} y2={50} className="stroke-ink" />
      <polygon points="134,50 124,46 124,54" className="fill-ink stroke-ink" />
      <text x={70} y={40} className="fill-ink font-mono" fontSize="9" letterSpacing="0.1em">
        系统移动方向 →
      </text>
    </svg>
  );
}

/* —— 6. IALA-A 浮标系统 —— */

function BuoyageIalaA({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 440 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 航道（中线 + 两侧虚线） */}
      <line x1={20} y1={120} x2={420} y2={120} className="stroke-mist/50" strokeDasharray="4 4" />

      {/* 港口入港方向箭头 */}
      <line x1={420} y1={120} x2={395} y2={120} className="stroke-ink" strokeWidth={1.5} />
      <polygon points="395,120 405,115 405,125" className="fill-ink stroke-ink" />
      <text x={415} y={108} textAnchor="end" className="fill-ink font-mono" fontSize="9" letterSpacing="0.1em">
        入港方向 →
      </text>

      {/* 左侧（红色，进港时左舷 = port hand）—— IALA-A 红色 */}
      <g transform="translate(110 80)">
        <rect x={-7} y={0} width={14} height={20} className="fill-coral stroke-coral" />
        <line x1={0} y1={20} x2={0} y2={40} className="stroke-ink" strokeWidth={1.5} />
        <text x={0} y={56} textAnchor="middle" className="fill-coral font-mono" fontSize="9" letterSpacing="0.08em">
          PORT
        </text>
        <text x={0} y={68} textAnchor="middle" className="fill-mist font-mono" fontSize="8">
          左舷（红）
        </text>
      </g>
      <g transform="translate(260 80)">
        <rect x={-7} y={0} width={14} height={20} className="fill-coral stroke-coral" />
        <line x1={0} y1={20} x2={0} y2={40} className="stroke-ink" strokeWidth={1.5} />
      </g>

      {/* 右侧（绿色 = starboard hand）—— IALA-A 绿色 */}
      <g transform="translate(180 160)">
        <polygon points="-8,0 8,0 0,16" className="fill-sea-deep stroke-sea-deep" />
        <line x1={0} y1={16} x2={0} y2={36} className="stroke-ink" strokeWidth={1.5} />
        <text x={0} y={52} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="9" letterSpacing="0.08em">
          STBD
        </text>
        <text x={0} y={64} textAnchor="middle" className="fill-mist font-mono" fontSize="8">
          右舷（绿）
        </text>
      </g>
      <g transform="translate(330 160)">
        <polygon points="-8,0 8,0 0,16" className="fill-sea-deep stroke-sea-deep" />
        <line x1={0} y1={16} x2={0} y2={36} className="stroke-ink" strokeWidth={1.5} />
      </g>

      {/* IALA-A 口诀 */}
      <text x={220} y={216} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.06em">
        IALA-A：进港时红色在左 (Port)、绿色在右 (Starboard)
      </text>
      <text x={220} y={230} textAnchor="middle" className="fill-mist font-mono" fontSize="8" letterSpacing="0.08em">
        欧洲 · 亚洲 · 大洋洲 · 非洲
      </text>
    </svg>
  );
}

/* —— 7. COLREGS 交叉相遇 —— */

function ColregsCrossing({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 视线圆与水域 */}
      <circle cx={210} cy={140} r={120} className="stroke-mist/40" strokeDasharray="3 4" />

      {/* 让路船 (give-way) — 从右上方向左下行驶 */}
      <g transform="translate(310 60) rotate(135)">
        <ellipse cx={0} cy={0} rx={22} ry={6} className="fill-paper-soft stroke-ink" />
        <line x1={0} y1={-22} x2={0} y2={-4} className="stroke-ink" strokeWidth={1.4} />
        <path d="M 0 -22 L 14 -4 L 0 -6 Z" className="fill-paper-soft stroke-ink" />
      </g>
      <line x1={310} y1={60} x2={250} y2={120} className="stroke-coral" strokeWidth={1.4} strokeDasharray="2 4" />
      <polygon points="250,120 260,116 256,127" className="fill-coral stroke-coral" />
      <text x={340} y={50} className="fill-coral font-mono" fontSize="9" letterSpacing="0.1em">
        GIVE-WAY 让路船
      </text>
      <text x={340} y={62} className="fill-coral font-mono" fontSize="8" letterSpacing="0.06em">
        见对方红舷灯
      </text>

      {/* 直航船 (stand-on) — 从左下向上行驶 */}
      <g transform="translate(120 230) rotate(-30)">
        <ellipse cx={0} cy={0} rx={22} ry={6} className="fill-paper-soft stroke-ink" />
        <line x1={0} y1={-22} x2={0} y2={-4} className="stroke-ink" strokeWidth={1.4} />
        <path d="M 0 -22 L 14 -4 L 0 -6 Z" className="fill-paper-soft stroke-ink" />
      </g>
      <line x1={120} y1={230} x2={180} y2={160} className="stroke-sea-deep" strokeWidth={1.4} strokeDasharray="2 4" />
      <polygon points="180,160 170,166 174,156" className="fill-sea-deep stroke-sea-deep" />
      <text x={80} y={250} className="fill-sea-deep font-mono" fontSize="9" letterSpacing="0.1em">
        STAND-ON 直航船
      </text>
      <text x={80} y={262} className="fill-sea-deep font-mono" fontSize="8" letterSpacing="0.06em">
        见对方绿舷灯
      </text>

      {/* 相遇点 */}
      <circle cx={210} cy={140} r={5} className="fill-ink stroke-ink" />
      <text x={224} y={144} className="fill-ink font-mono" fontSize="9" letterSpacing="0.08em">
        CPA
      </text>

      {/* 注释 */}
      <text x={210} y={20} textAnchor="middle" className="fill-ink" fontSize="11" letterSpacing="0.06em">
        交叉相遇 · Rule 15：让路船应避让，直航船保持航向航速
      </text>
    </svg>
  );
}

/* —— 8. 夜航号灯 —— */

function LightsVessels({ className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 460 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      {/* 三艘船示意：动力船、帆船、超过 50m 动力船 */}

      {/* 1. 动力船（< 50m） */}
      <g transform="translate(80 90)">
        <text x={0} y={-50} textAnchor="middle" className="fill-mist font-mono" fontSize="8" letterSpacing="0.1em">
          动力船
        </text>
        {/* 桅顶白灯 */}
        <circle cx={0} cy={-28} r={3.5} className="fill-paper stroke-ink" />
        {/* 左红 / 右绿 舷灯 */}
        <circle cx={-14} cy={0} r={3.5} className="fill-coral stroke-coral" />
        <circle cx={14} cy={0} r={3.5} className="fill-sea-deep stroke-sea-deep" />
        {/* 尾白 */}
        <circle cx={0} cy={22} r={3.5} className="fill-paper stroke-ink" />
        {/* 船体轮廓 */}
        <ellipse cx={0} cy={10} rx={26} ry={7} className="fill-none stroke-mist/60" />
        <line x1={0} y1={-25} x2={0} y2={5} className="stroke-mist/60" />
        <text x={0} y={56} textAnchor="middle" className="fill-mist font-mono" fontSize="7" letterSpacing="0.06em">
          桅白 + 红绿 + 尾白
        </text>
      </g>

      {/* 2. 帆船 */}
      <g transform="translate(230 90)">
        <text x={0} y={-50} textAnchor="middle" className="fill-mist font-mono" fontSize="8" letterSpacing="0.1em">
          帆船
        </text>
        {/* 没有桅顶白；只有两舷 + 尾灯 */}
        <circle cx={-14} cy={0} r={3.5} className="fill-coral stroke-coral" />
        <circle cx={14} cy={0} r={3.5} className="fill-sea-deep stroke-sea-deep" />
        <circle cx={0} cy={22} r={3.5} className="fill-paper stroke-ink" />
        {/* 船体 + 桅杆 + 帆 */}
        <ellipse cx={0} cy={10} rx={26} ry={7} className="fill-none stroke-mist/60" />
        <line x1={0} y1={-32} x2={0} y2={5} className="stroke-mist/60" />
        <path d="M 0 -32 L 14 3 L 0 1 Z" className="fill-none stroke-mist/60" />
        <text x={0} y={56} textAnchor="middle" className="fill-mist font-mono" fontSize="7" letterSpacing="0.06em">
          仅红绿 + 尾白
        </text>
      </g>

      {/* 3. 长 ≥ 50m 动力船 */}
      <g transform="translate(380 90)">
        <text x={0} y={-50} textAnchor="middle" className="fill-mist font-mono" fontSize="8" letterSpacing="0.1em">
          大动力船（≥50m）
        </text>
        {/* 双桅白：前低后高 */}
        <circle cx={-10} cy={-32} r={3.5} className="fill-paper stroke-ink" />
        <circle cx={10} cy={-22} r={3.5} className="fill-paper stroke-ink" />
        <circle cx={-14} cy={0} r={3.5} className="fill-coral stroke-coral" />
        <circle cx={14} cy={0} r={3.5} className="fill-sea-deep stroke-sea-deep" />
        <circle cx={0} cy={22} r={3.5} className="fill-paper stroke-ink" />
        <ellipse cx={0} cy={10} rx={26} ry={7} className="fill-none stroke-mist/60" />
        <text x={0} y={56} textAnchor="middle" className="fill-mist font-mono" fontSize="7" letterSpacing="0.06em">
          双桅白（前低后高）
        </text>
      </g>

      {/* 图例 */}
      <g transform="translate(20 200)">
        <circle cx={6} cy={6} r={4} className="fill-coral stroke-coral" />
        <text x={18} y={10} className="fill-ink font-mono" fontSize="9" letterSpacing="0.06em">
          红 · 左舷
        </text>
        <circle cx={108} cy={6} r={4} className="fill-sea-deep stroke-sea-deep" />
        <text x={120} y={10} className="fill-ink font-mono" fontSize="9" letterSpacing="0.06em">
          绿 · 右舷
        </text>
        <circle cx={208} cy={6} r={4} className="fill-paper stroke-ink" />
        <text x={220} y={10} className="fill-ink font-mono" fontSize="9" letterSpacing="0.06em">
          白 · 桅顶 / 尾
        </text>
      </g>
    </svg>
  );
}

function WindShiftVmg({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 520 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <line x1={260} y1={28} x2={260} y2={268} className="stroke-mist/50" strokeDasharray="4 5" />
      <text x={260} y={22} textAnchor="middle" className="fill-mist font-mono" fontSize="10" letterSpacing="0.1em">目标方向</text>
      <path d="M260 250 L186 94" className="stroke-sea-deep" strokeWidth={2} />
      <path d="M260 250 L334 94" className="stroke-coral" strokeWidth={2} />
      <path d="M260 250 L210 250 L210 145" className="stroke-mist" strokeDasharray="3 4" />
      <path d="M260 250 L310 250 L310 145" className="stroke-mist" strokeDasharray="3 4" />
      <text x={170} y={88} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">左舷抢风</text>
      <text x={350} y={88} textAnchor="middle" className="fill-coral font-mono" fontSize="10">右舷抢风</text>
      <text x={112} y={168} className="fill-ink" fontSize="12">VMG = 船速投影到目标方向</text>
      <text x={112} y={188} className="fill-mist" fontSize="10">风摆后，比较哪一舷投影更长</text>
      <g transform="translate(260 250)">
        <ellipse cx={0} cy={8} rx={18} ry={5} className="fill-paper-soft stroke-ink" />
        <line x1={0} y1={-26} x2={0} y2={4} className="stroke-ink" strokeWidth={1.5} />
        <path d="M0 -26 L16 3 L0 -2 Z" className="fill-paper-soft stroke-ink" />
      </g>
      <g className="stroke-sun-deep fill-sun-deep">
        <line x1={88} y1={54} x2={132} y2={84} strokeWidth={1.5} />
        <polygon points="132,84 120,83 126,74" />
        <text x={68} y={54} className="fill-sun-deep font-mono" fontSize="10">新风向</text>
      </g>
    </svg>
  );
}

function CompassRose({ className }: DiagramProps) {
  const cx = 260;
  const cy = 160;
  const r = 104;
  return (
    <svg viewBox="0 0 520 320" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <circle cx={cx} cy={cy} r={r} className="stroke-mist/70 fill-paper" />
      <circle cx={cx} cy={cy} r={r * 0.72} className="stroke-mist/35" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const a = ((deg - 90) * Math.PI) / 180;
        const x1 = cx + Math.cos(a) * (deg % 90 === 0 ? r - 18 : r - 10);
        const y1 = cy + Math.sin(a) * (deg % 90 === 0 ? r - 18 : r - 10);
        const x2 = cx + Math.cos(a) * r;
        const y2 = cy + Math.sin(a) * r;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink/70" />;
      })}
      <path d={`M${cx} ${cy - r + 8} L${cx + 12} ${cy} L${cx} ${cy + r - 8} L${cx - 12} ${cy} Z`} className="fill-sea-soft/35 stroke-sea-deep" />
      <path d={`M${cx - r + 8} ${cy} L${cx} ${cy - 12} L${cx + r - 8} ${cy} L${cx} ${cy + 12} Z`} className="fill-paper-soft stroke-ink" />
      {[
        ["N", cx, cy - r - 16],
        ["E", cx + r + 16, cy + 4],
        ["S", cx, cy + r + 26],
        ["W", cx - r - 16, cy + 4],
      ].map(([label, x, y]) => (
        <text key={label} x={x} y={y} textAnchor="middle" className="fill-ink font-mono" fontSize="12" letterSpacing="0.12em">{label}</text>
      ))}
      <path d="M260 160 L344 108" className="stroke-coral" strokeWidth={2} />
      <polygon points="344,108 331,111 337,121" className="fill-coral stroke-coral" />
      <text x={352} y={106} className="fill-coral font-mono" fontSize="10">真方位 058°T</text>
      <text x={76} y={260} className="fill-mist" fontSize="11">用于方位、航向、风向与潮流方向的共同参照。</text>
    </svg>
  );
}

function CelestialTriangle({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 520 320" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <circle cx={260} cy={160} r={118} className="stroke-mist/60 fill-paper" />
      <path d="M260 42 C318 92 352 144 376 242" className="stroke-sea-deep" />
      <path d="M260 42 C214 102 184 164 156 242" className="stroke-sea-deep" />
      <path d="M156 242 C222 276 310 276 376 242" className="stroke-sea-deep" />
      <circle cx={260} cy={42} r={5} className="fill-coral stroke-coral" />
      <circle cx={156} cy={242} r={5} className="fill-ink stroke-ink" />
      <circle cx={376} cy={242} r={5} className="fill-sun stroke-sun" />
      <text x={260} y={28} textAnchor="middle" className="fill-coral font-mono" fontSize="10">天体 GP</text>
      <text x={132} y={260} className="fill-ink font-mono" fontSize="10">观测点</text>
      <text x={382} y={260} className="fill-sun-deep font-mono" fontSize="10">天极 P</text>
      <text x={252} y={178} textAnchor="middle" className="fill-ink" fontSize="12">PZX 球面三角形</text>
      <text x={252} y={198} textAnchor="middle" className="fill-mist" fontSize="10">高度 · 赤纬 · 时角互相约束</text>
      <line x1={74} y1={92} x2={166} y2={92} className="stroke-mist" />
      <text x={74} y={78} className="fill-mist font-mono" fontSize="10">六分仪测高度 Ho</text>
      <path d="M86 94 C122 120 142 154 154 218" className="stroke-mist" strokeDasharray="3 4" />
    </svg>
  );
}

function VhfRadioHorizon({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 520 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <path d="M42 238 Q260 286 478 238" className="stroke-sea-deep fill-sea-soft/30" />
      <g transform="translate(120 190)">
        <path d="M-34 28 H34 L22 42 H-22 Z" className="fill-paper-soft stroke-ink" />
        <line x1={0} y1={-74} x2={0} y2={28} className="stroke-ink" strokeWidth={1.6} />
        <path d="M0 -74 L24 22 L0 14 Z" className="fill-paper stroke-ink" />
        <line x1={0} y1={-74} x2={0} y2={-96} className="stroke-coral" strokeWidth={1.5} />
      </g>
      <g transform="translate(400 172)">
        <path d="M-44 48 H44 L30 62 H-30 Z" className="fill-paper-soft stroke-ink" />
        <rect x="-12" y="-48" width="24" height="96" className="fill-paper stroke-ink" />
        <line x1={0} y1={-48} x2={0} y2={-116} className="stroke-coral" strokeWidth={1.5} />
      </g>
      <path d="M120 94 Q260 30 400 56" className="stroke-sea-deep" strokeWidth={1.8} />
      <path d="M120 94 Q260 182 400 56" className="stroke-mist" strokeDasharray="4 5" />
      <text x={260} y={46} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">可见天线 = 可通信</text>
      <text x={260} y={128} textAnchor="middle" className="fill-mist" fontSize="10">地球曲面挡住低天线；高度比功率更关键</text>
      <text x={260} y={266} textAnchor="middle" className="fill-ink font-mono" fontSize="10">D ≈ 1.23 × (√h1 + √h2) NM</text>
    </svg>
  );
}

function VhfStationIdentity({ className }: DiagramProps) {
  const items = [
    ["船名", "SEA PEARL", "人耳识别"],
    ["MMSI", "232123456", "DSC / AIS 机器身份"],
    ["Call Sign", "MGYS3", "正式电台呼号"],
  ];
  return (
    <svg viewBox="0 0 520 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <g transform="translate(260 84)">
        <path d="M-60 32 H60 L42 48 H-42 Z" className="fill-paper-soft stroke-ink" />
        <line x1={0} y1={-58} x2={0} y2={32} className="stroke-ink" strokeWidth={1.5} />
        <path d="M0 -58 L34 28 L0 18 Z" className="fill-paper stroke-ink" />
      </g>
      {items.map((it, i) => {
        const x = 94 + i * 166;
        return (
          <g key={it[0]} transform={`translate(${x} 196)`}>
            <rect x="-62" y="-42" width="124" height="84" rx="2" className="fill-paper stroke-line" />
            <text x={0} y="-18" textAnchor="middle" className="fill-mist font-mono" fontSize="9" letterSpacing="0.1em">{it[0]}</text>
            <text x={0} y="4" textAnchor="middle" className="fill-ink font-mono" fontSize="12">{it[1]}</text>
            <text x={0} y="26" textAnchor="middle" className="fill-sea-deep" fontSize="10">{it[2]}</text>
            <line x1={0} y1="-42" x2={260 - x} y2="-92" className="stroke-mist" strokeDasharray="3 4" />
          </g>
        );
      })}
    </svg>
  );
}

function GmdssAlertLoop({ className }: DiagramProps) {
  const nodes = [
    [100, 154, "报警", "船 → 岸"],
    [260, 74, "协调", "MRCC"],
    [420, 154, "现场通信", "救援 → 船"],
    [260, 234, "定位", "EPIRB / SART"],
  ] as const;
  return (
    <svg viewBox="0 0 520 310" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <path d="M142 140 C172 92 206 76 230 74" className="stroke-sea-deep" markerEnd="url(#gmdssArrow)" />
      <path d="M292 74 C342 80 384 110 404 136" className="stroke-sea-deep" markerEnd="url(#gmdssArrow)" />
      <path d="M420 188 C390 224 334 238 294 234" className="stroke-sea-deep" markerEnd="url(#gmdssArrow)" />
      <path d="M226 234 C176 228 124 198 108 178" className="stroke-sea-deep" markerEnd="url(#gmdssArrow)" />
      <defs>
        <marker id="gmdssArrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 Z" className="fill-sea-deep" />
        </marker>
      </defs>
      {nodes.map(([x, y, title, sub]) => (
        <g key={title}>
          <circle cx={x} cy={y} r={44} className="fill-paper stroke-line" />
          <text x={x} y={y - 4} textAnchor="middle" className="fill-ink" fontSize="13">{title}</text>
          <text x={x} y={y + 15} textAnchor="middle" className="fill-mist font-mono" fontSize="9">{sub}</text>
        </g>
      ))}
    </svg>
  );
}

function DscDistressTimeline({ className }: DiagramProps) {
  const steps = [
    ["T+0", "红按钮 5 秒"],
    ["CH70", "DSC 数据包"],
    ["CH16", "语音 MAYDAY"],
    ["~4 min", "无应答自动重发"],
    ["ACK", "岸台/船只应答"],
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <line x1={58} y1={124} x2={500} y2={124} className="stroke-line" />
      {steps.map((s, i) => {
        const x = 66 + i * 108;
        return (
          <g key={s[0]}>
            <circle cx={x} cy={124} r={18} className={i === 0 ? "fill-coral stroke-coral" : "fill-paper stroke-sea-deep"} />
            <text x={x} y={129} textAnchor="middle" className={i === 0 ? "fill-paper font-mono" : "fill-sea-deep font-mono"} fontSize="9">{String(i + 1).padStart(2, "0")}</text>
            <text x={x} y={78} textAnchor="middle" className="fill-ink font-mono" fontSize="10">{s[0]}</text>
            <text x={x} y={168} textAnchor="middle" className="fill-ink" fontSize="11">{s[1]}</text>
          </g>
        );
      })}
      <text x={280} y={214} textAnchor="middle" className="fill-mist" fontSize="10">DSC 负责唤醒机器；CH16 负责让人听懂事故细节。</text>
    </svg>
  );
}

function MaydayMessageStructure({ className }: DiagramProps) {
  const fields = ["M", "I", "P", "D", "A", "N", "I/O"];
  const labels = ["MAYDAY", "Identity", "Position", "Distress", "Assistance", "Number", "Info / Over"];
  return (
    <svg viewBox="0 0 560 260" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <rect x={30} y={54} width={500} height={128} rx="2" className="fill-paper stroke-line" />
      {fields.map((f, i) => {
        const x = 58 + i * 72;
        return (
          <g key={f}>
            <rect x={x} y={84} width={54} height={54} className={i === 0 ? "fill-coral/10 stroke-coral" : "fill-paper-soft stroke-line"} />
            <text x={x + 27} y={108} textAnchor="middle" className={i === 0 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="14">{f}</text>
            <text x={x + 27} y={128} textAnchor="middle" className="fill-ink" fontSize="8.5">{labels[i]}</text>
          </g>
        );
      })}
      <text x={280} y={44} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">MIPDANIO 标准遇险报文顺序</text>
      <text x={280} y={214} textAnchor="middle" className="fill-mist" fontSize="10">顺序固定，目的不是好看，是让岸台在压力下不漏字段。</text>
    </svg>
  );
}

function VhfCallFormat({ className }: DiagramProps) {
  const blocks = [
    ["01", "呼对方", "Solent Coastguard ×3"],
    ["02", "报自己", "This is Sea Pearl ×3"],
    ["03", "讲事情", "Request radio check"],
    ["04", "交接", "OVER / OUT"],
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      {blocks.map((b, i) => {
        const x = 36 + i * 132;
        return (
          <g key={b[0]}>
            <rect x={x} y={72} width={112} height={88} rx="2" className="fill-paper stroke-line" />
            <text x={x + 16} y={98} className="fill-sea-deep font-mono" fontSize="10">{b[0]}</text>
            <text x={x + 56} y={120} textAnchor="middle" className="fill-ink" fontSize="13">{b[1]}</text>
            <text x={x + 56} y={142} textAnchor="middle" className="fill-mist" fontSize="9">{b[2]}</text>
            {i < blocks.length - 1 ? (
              <path d={`M${x + 116} 116 H${x + 130}`} className="stroke-sea-deep" />
            ) : null}
          </g>
        );
      })}
      <text x={280} y={46} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">VHF 三段式呼叫</text>
      <text x={280} y={204} textAnchor="middle" className="fill-mist" fontSize="10">先叫对方，让对方开始听；再说明你是谁；最后才说请求。</text>
    </svg>
  );
}

function DrAbcFlow({ className }: DiagramProps) {
  const steps = [
    ["D", "Danger", "先稳现场"],
    ["R", "Response", "AVPU 反应"],
    ["A", "Airway", "开放气道"],
    ["B", "Breathing", "10 秒判断"],
    ["C", "Circulation", "立即 CPR"],
  ];
  return (
    <svg viewBox="0 0 560 270" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={36} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        DR.ABC 60 秒初级评估
      </text>
      {steps.map((step, i) => {
        const x = 34 + i * 106;
        return (
          <g key={step[0]}>
            <rect x={x} y={80} width={82} height={94} rx="2" className={i === 0 ? "fill-coral/10 stroke-coral" : "fill-paper stroke-line"} />
            <text x={x + 41} y={112} textAnchor="middle" className={i === 0 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="22">
              {step[0]}
            </text>
            <text x={x + 41} y={137} textAnchor="middle" className="fill-ink" fontSize="11">
              {step[1]}
            </text>
            <text x={x + 41} y={158} textAnchor="middle" className="fill-mist" fontSize="9">
              {step[2]}
            </text>
            {i < steps.length - 1 ? (
              <>
                <path d={`M${x + 86} 127 H${x + 102}`} className="stroke-sea-deep" />
                <polygon points={`${x + 103},127 ${x + 96},123 ${x + 96},131`} className="fill-sea-deep stroke-sea-deep" />
              </>
            ) : null}
          </g>
        );
      })}
      <path d="M70 202 H490" className="stroke-line" strokeDasharray="3 5" />
      <text x={280} y={224} textAnchor="middle" className="fill-mist" fontSize="10">
        任一步不通过，就停在该节点处理，不跳到下一步。
      </text>
    </svg>
  );
}

function CprOnBoard({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 560 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={36} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        颠簸船上 CPR 姿态
      </text>
      <rect x={86} y={78} width={388} height={152} rx="3" className="fill-paper-soft stroke-line" />
      <path d="M92 230 C160 250 400 250 468 230" className="stroke-sea-deep/60" />
      <text x={280} y={252} textAnchor="middle" className="fill-mist" fontSize="10">
        最低、最稳的位置：驾驶舱地板或主舱地板
      </text>
      <g>
        <ellipse cx={278} cy={150} rx={78} ry={18} className="fill-paper stroke-ink" />
        <circle cx={190} cy={150} r={15} className="fill-paper stroke-ink" />
        <line x1={236} y1={150} x2={324} y2={150} className="stroke-ink" strokeWidth={2} />
        <text x={280} y={192} textAnchor="middle" className="fill-mist" fontSize="9">
          患者平躺，硬平面承托
        </text>
      </g>
      <g className="stroke-coral fill-coral">
        <circle cx={282} cy={95} r={11} />
        <path d="M282 106 V132" />
        <path d="M262 126 L282 132 L302 126" />
        <path d="M258 162 C270 144 292 144 306 162" />
        <path d="M238 176 C260 166 300 166 324 176" />
      </g>
      <path d="M282 112 V144" className="stroke-coral" strokeWidth={3} />
      <polygon points="282,150 274,136 290,136" className="fill-coral stroke-coral" />
      <text x={406} y={116} className="fill-coral font-mono" fontSize="10">
        肘锁直
      </text>
      <path d="M366 120 H332" className="stroke-coral" />
      <text x={98} y={104} className="fill-sea-deep font-mono" fontSize="10">
        船头转入风浪
      </text>
    </svg>
  );
}

function BleedingControlLadder({ className }: DiagramProps) {
  const steps = [
    ["01", "直接压迫", "第一选择"],
    ["02", "抬高肢体", "配合压迫"],
    ["03", "加压敷料", "持续控制"],
    ["04", "止血带", "最后手段"],
  ];
  return (
    <svg viewBox="0 0 560 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={36} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        出血处置阶梯
      </text>
      {steps.map((step, i) => {
        const x = 64 + i * 118;
        const h = 54 + i * 18;
        const y = 196 - h;
        return (
          <g key={step[0]}>
            <rect x={x} y={y} width={92} height={h} rx="2" className={i === 3 ? "fill-coral/10 stroke-coral" : "fill-paper stroke-line"} />
            <text x={x + 14} y={y + 24} className={i === 3 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="10">
              {step[0]}
            </text>
            <text x={x + 46} y={y + h - 28} textAnchor="middle" className="fill-ink" fontSize="12">
              {step[1]}
            </text>
            <text x={x + 46} y={y + h - 10} textAnchor="middle" className="fill-mist" fontSize="9">
              {step[2]}
            </text>
          </g>
        );
      })}
      <path d="M72 218 H492" className="stroke-line" />
      <text x={280} y={246} textAnchor="middle" className="fill-mist" fontSize="10">
        能用低风险方法解决，就不要升级到高风险方法。
      </text>
    </svg>
  );
}

function HypothermiaCoreRewarm({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 560 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={36} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        低温症复温：核心优先
      </text>
      <g transform="translate(280 150)">
        <circle cx={0} cy={-62} r={22} className="fill-paper stroke-ink" />
        <path d="M0 -40 V54" className="stroke-ink" strokeWidth={2} />
        <path d="M-66 -14 H66" className="stroke-ink" />
        <path d="M0 54 L-44 104" className="stroke-ink" />
        <path d="M0 54 L44 104" className="stroke-ink" />
        {[
          [0, -36, "颈部"],
          [-38, -10, "腋下"],
          [38, -10, "腋下"],
          [-20, 50, "腹股沟"],
          [20, 50, "腹股沟"],
        ].map(([x, y, label]) => (
          <g key={`${x}-${y}`}>
            <circle cx={Number(x)} cy={Number(y)} r={10} className="fill-sun-soft stroke-sun-deep" />
            <text x={Number(x)} y={Number(y) + 24} textAnchor="middle" className="fill-sun-deep" fontSize="8">
              {label}
            </text>
          </g>
        ))}
      </g>
      <g className="stroke-coral fill-coral">
        <path d="M86 88 L156 158" />
        <path d="M156 88 L86 158" />
      </g>
      <text x={121} y={181} textAnchor="middle" className="fill-coral" fontSize="10">
        不先热四肢
      </text>
      <g className="stroke-coral fill-coral">
        <path d="M404 88 L474 158" />
        <path d="M474 88 L404 158" />
      </g>
      <text x={439} y={181} textAnchor="middle" className="fill-coral" fontSize="10">
        避免 after-drop
      </text>
      <text x={280} y={274} textAnchor="middle" className="fill-mist" fontSize="10">
        温敷核心区，干衣保温，温和复温，持续监测意识与呼吸。
      </text>
    </svg>
  );
}

function DieselFourStroke({ className }: DiagramProps) {
  const frames = [
    ["进气", "阀开", "活塞下行", "空气进入"],
    ["压缩", "阀关", "活塞上行", "温度升高"],
    ["做功", "喷油", "活塞下行", "唯一输出"],
    ["排气", "排阀开", "活塞上行", "废气排出"],
  ];
  return (
    <svg viewBox="0 0 620 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        四冲程柴油机循环
      </text>
      {frames.map((frame, i) => {
        const x = 46 + i * 142;
        const pistonY = i % 2 === 0 ? 154 : 104;
        const hot = i === 2;
        return (
          <g key={frame[0]}>
            <rect x={x} y={70} width={108} height={142} rx="2" className="fill-paper stroke-line" />
            <rect x={x + 34} y={90} width={40} height={84} className="fill-paper-soft stroke-ink" />
            <rect x={x + 39} y={pistonY} width={30} height={18} className={hot ? "fill-coral/20 stroke-coral" : "fill-paper stroke-ink"} />
            <line x1={x + 54} y1={pistonY + 18} x2={x + 54} y2={194} className="stroke-ink" />
            <circle cx={x + 54} cy={194} r={10} className="stroke-mist" />
            <line x1={x + 42} y1={84} x2={x + 48} y2={96} className={i === 0 ? "stroke-sea-deep" : "stroke-mist"} strokeWidth={i === 0 ? 2 : 1.2} />
            <line x1={x + 66} y1={84} x2={x + 60} y2={96} className={i === 3 ? "stroke-coral" : "stroke-mist"} strokeWidth={i === 3 ? 2 : 1.2} />
            {i === 2 ? (
              <g className="stroke-coral fill-coral">
                <path d={`M${x + 54} 82 V104`} />
                <polygon points={`${x + 54},108 ${x + 48},96 ${x + 60},96`} />
              </g>
            ) : null}
            <text x={x + 54} y={232} textAnchor="middle" className="fill-ink" fontSize="12">
              {frame[0]}
            </text>
            <text x={x + 54} y={250} textAnchor="middle" className="fill-mist" fontSize="9">
              {frame[1]} · {frame[2]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DieselFaultTree({ className }: DiagramProps) {
  const nodes = [
    [310, 58, "启动失败", "先听起动机"],
    [128, 138, "燃料", "油位 / Racor / 进气"],
    [268, 138, "空气", "滤芯 / 进气 / 排气"],
    [408, 138, "电气", "电瓶 / 起动机"],
    [310, 222, "压缩与时机", "喷油 / 气阀 / 内部机械"],
  ] as const;
  return (
    <svg viewBox="0 0 620 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={30} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        柴油机故障排查顺序
      </text>
      <path d="M280 72 L160 116" className="stroke-line" />
      <path d="M304 84 L276 112" className="stroke-line" />
      <path d="M336 84 L400 112" className="stroke-line" />
      <path d="M310 162 V196" className="stroke-line" />
      {nodes.map(([x, y, title, sub], i) => (
        <g key={title}>
          <rect x={x - 68} y={y - 28} width={136} height={56} rx="2" className={i === 0 ? "fill-coral/10 stroke-coral" : "fill-paper stroke-line"} />
          <text x={x} y={y - 4} textAnchor="middle" className={i === 0 ? "fill-coral" : "fill-ink"} fontSize="12">
            {title}
          </text>
          <text x={x} y={y + 15} textAnchor="middle" className="fill-mist" fontSize="9">
            {sub}
          </text>
        </g>
      ))}
      <text x={310} y={278} textAnchor="middle" className="fill-mist" fontSize="10">
        先查概率最高、可在海上处理的项目；再进入内部机械判断。
      </text>
    </svg>
  );
}

function FuelBleedPath({ className }: DiagramProps) {
  const items = [
    ["油箱", "低压源"],
    ["主滤★", "放水/换芯"],
    ["输油泵", "手摇泵"],
    ["细滤★", "排气螺丝"],
    ["喷油泵★", "高压前"],
    ["喷油嘴", "雾化"],
  ];
  return (
    <svg viewBox="0 0 680 260" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={340} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        燃料系统与 bleed 路径
      </text>
      {items.map((it, i) => {
        const x = 42 + i * 106;
        const bleed = it[0].includes("★");
        return (
          <g key={it[0]}>
            <rect x={x} y={92} width={82} height={72} rx="2" className={bleed ? "fill-sun-soft/50 stroke-sun-deep" : "fill-paper stroke-line"} />
            <text x={x + 41} y={122} textAnchor="middle" className={bleed ? "fill-sun-deep" : "fill-ink"} fontSize="12">
              {it[0]}
            </text>
            <text x={x + 41} y={144} textAnchor="middle" className="fill-mist" fontSize="9">
              {it[1]}
            </text>
            {i < items.length - 1 ? (
              <g className="stroke-sea-deep fill-sea-deep">
                <path d={`M${x + 86} 128 H${x + 102}`} />
                <polygon points={`${x + 103},128 ${x + 96},124 ${x + 96},132`} />
              </g>
            ) : null}
          </g>
        );
      })}
      <path d="M76 196 H604" className="stroke-line" strokeDasharray="3 5" />
      <text x={340} y={222} textAnchor="middle" className="fill-mist" fontSize="10">
        bleed 时按油流方向逐点排气：低压端先稳定，高压端最后确认。
      </text>
    </svg>
  );
}

function EngineCoolingLoops({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 620 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        间接冷却：海水开环 + 淡水闭环
      </text>
      <rect x={242} y={110} width={136} height={74} rx="3" className="fill-paper stroke-ink" />
      <text x={310} y={142} textAnchor="middle" className="fill-ink" fontSize="13">热交换器</text>
      <text x={310} y={162} textAnchor="middle" className="fill-mist" fontSize="9">两路相遇但不混合</text>
      <path d="M54 184 C126 226 210 210 242 166" className="stroke-sea-deep" strokeWidth={1.8} />
      <path d="M378 166 C438 210 514 226 570 184" className="stroke-sea-deep" strokeWidth={1.8} />
      <polygon points="242,166 230,167 235,178" className="fill-sea-deep stroke-sea-deep" />
      <text x={84} y={214} className="fill-sea-deep font-mono" fontSize="10">海水进水口</text>
      <text x={482} y={214} className="fill-sea-deep font-mono" fontSize="10">随排气排出</text>
      <path d="M310 110 C226 54 126 76 126 142 C126 226 236 238 310 184" className="stroke-coral" strokeWidth={1.8} />
      <path d="M310 184 C388 238 498 226 498 142 C498 76 394 54 310 110" className="stroke-coral" strokeWidth={1.8} />
      <polygon points="310,110 298,105 300,118" className="fill-coral stroke-coral" />
      <rect x={102} y={122} width={74} height={40} rx="2" className="fill-paper stroke-line" />
      <text x={139} y={146} textAnchor="middle" className="fill-coral" fontSize="10">发动机水套</text>
      <rect x={448} y={122} width={88} height={40} rx="2" className="fill-paper stroke-line" />
      <text x={492} y={146} textAnchor="middle" className="fill-coral" fontSize="10">节温器</text>
      <text x={310} y={266} textAnchor="middle" className="fill-mist" fontSize="10">
        海水带走热量；淡水带走发动机本体热量，循环使用。
      </text>
    </svg>
  );
}

function LifejacketFitCheck({ className }: DiagramProps) {
  const checks = [
    ["领口", "托住锁骨"],
    ["裆带", "必须扣紧"],
    ["挂点", "中线 tether"],
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        救生衣穿戴三点检查
      </text>
      <g transform="translate(280 152)">
        <circle cx={0} cy={-74} r={22} className="fill-paper stroke-ink" />
        <path d="M-44 -48 C-66 -10 -56 56 -26 98" className="fill-sun-soft/50 stroke-sun-deep" />
        <path d="M44 -48 C66 -10 56 56 26 98" className="fill-sun-soft/50 stroke-sun-deep" />
        <path d="M-26 -52 C-14 -34 14 -34 26 -52" className="stroke-coral" strokeWidth={2} />
        <path d="M0 -28 V82" className="stroke-ink" />
        <path d="M-24 68 L0 92 L24 68" className="stroke-coral" strokeWidth={2} />
        <path d="M-68 4 H68" className="stroke-ink" />
        <circle cx={0} cy={4} r={6} className="fill-sea-deep stroke-sea-deep" />
      </g>
      {checks.map((c, i) => {
        const x = 82 + i * 198;
        return (
          <g key={c[0]}>
            <rect x={x - 56} y={228} width={112} height={44} rx="2" className="fill-paper stroke-line" />
            <text x={x} y={246} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">{c[0]}</text>
            <text x={x} y={264} textAnchor="middle" className="fill-ink" fontSize="10">{c[1]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LifejacketBuoyancyClasses({ className }: DiagramProps) {
  const classes = [
    ["50N", "助浮", "近岸 / 会游泳", 24, "fill-mist/20 stroke-mist"],
    ["100N", "基础救生", "平静水域", 38, "fill-sea-soft/45 stroke-sea-deep"],
    ["150N", "巡航标准", "多数离岸巡航", 54, "fill-sun-soft/60 stroke-sun-deep"],
    ["275N", "重装离岸", "oilskin / 工具 / 恶劣海况", 72, "fill-coral/12 stroke-coral"],
  ];
  return (
    <svg viewBox="0 0 680 320" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={340} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        ISO 12402 浮力等级对比
      </text>
      <path d="M54 236 C160 258 520 258 626 236" className="stroke-sea-deep/60" />
      {classes.map((item, i) => {
        const x = 74 + i * 156;
        const collar = Number(item[3]);
        return (
          <g key={item[0]}>
            <rect x={x - 14} y={80} width={116} height={168} rx="2" className="fill-paper stroke-line" />
            <path
              d={`M${x + 44} ${178 - collar * 0.48} C${x + 18} ${196 - collar * 0.2} ${x + 16} 224 ${x + 42} 238 C${x + 70} 224 ${x + 72} 196 ${x + 44} ${178 - collar * 0.48} Z`}
              className={String(item[4])}
            />
            <circle cx={x + 44} cy={160 - collar * 0.52} r={13} className="fill-paper stroke-ink" />
            <path d={`M${x + 30} ${174 - collar * 0.45} H${x + 58}`} className="stroke-ink" />
            <text x={x + 44} y={110} textAnchor="middle" className={i === 3 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="16">
              {item[0]}
            </text>
            <text x={x + 44} y={132} textAnchor="middle" className="fill-ink" fontSize="11">
              {item[1]}
            </text>
            <text x={x + 44} y={268} textAnchor="middle" className="fill-mist" fontSize="8.5">
              {item[2]}
            </text>
          </g>
        );
      })}
      <text x={340} y={298} textAnchor="middle" className="fill-mist" fontSize="10">
        浮力越高，越能在重装和昏迷状态下把脸转离水面；代价是体积与舒适度。
      </text>
    </svg>
  );
}

function FlareSignalRange({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 620 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        信号弹按距离分层使用
      </text>
      <circle cx={150} cy={170} r={40} className="stroke-sea-deep fill-sea-soft/30" />
      <circle cx={150} cy={170} r={92} className="stroke-mist" strokeDasharray="4 5" />
      <circle cx={150} cy={170} r={132} className="stroke-mist/60" strokeDasharray="4 5" />
      <path d="M150 170 L260 86" className="stroke-coral" strokeWidth={1.8} />
      <polygon points="260,86 248,89 255,98" className="fill-coral stroke-coral" />
      <text x={272} y={84} className="fill-coral font-mono" fontSize="10">降落伞火箭</text>
      <path d="M150 170 L228 170" className="stroke-sun-deep" strokeWidth={1.8} />
      <polygon points="228,170 216,165 216,175" className="fill-sun-deep stroke-sun-deep" />
      <text x={238} y={174} className="fill-sun-deep font-mono" fontSize="10">橙烟 / 手持</text>
      <g transform="translate(430 158)">
        <path d="M-46 20 H46 L32 36 H-32 Z" className="fill-paper-soft stroke-ink" />
        <line x1={0} y1="-52" x2={0} y2={20} className="stroke-ink" />
        <path d="M0 -52 L24 16 L0 8 Z" className="fill-paper stroke-ink" />
      </g>
      <text x={310} y={246} textAnchor="middle" className="fill-mist" fontSize="10">
        远距离先吸引注意；近距离再精确指示位置，避免过早浪费手持信号。
      </text>
    </svg>
  );
}

function LiferaftAnatomy({ className }: DiagramProps) {
  const labels = [
    [154, 84, "篷顶"],
    [238, 104, "支撑拱"],
    [250, 120, "上浮力管"],
    [314, 196, "下浮力管"],
    [388, 118, "登筏坡道"],
    [186, 194, "绝热底板"],
    [428, 214, "海锚"],
    [92, 210, "painter / HRU"],
    [458, 84, "频闪灯"],
    [342, 238, "CO2 钢瓶"],
  ] as const;
  return (
    <svg viewBox="0 0 620 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        救生筏关键部件
      </text>
      <ellipse cx={310} cy={176} rx={168} ry={54} className="fill-sea-soft/30 stroke-sea-deep" />
      <ellipse cx={310} cy={176} rx={112} ry={30} className="fill-paper stroke-line" />
      <path d="M172 170 C218 82 404 82 448 170" className="fill-paper-soft/70 stroke-ink" />
      <path d="M218 166 C242 102 378 102 402 166" className="stroke-mist" strokeDasharray="3 4" />
      <path d="M450 184 L518 206 L466 224" className="fill-paper-soft stroke-ink" />
      <path d="M478 208 C528 206 550 218 570 238" className="stroke-sea-deep" strokeDasharray="4 4" />
      <path d="M142 186 C94 198 74 216 58 246" className="stroke-coral" />
      <circle cx={458} cy={84} r={6} className="fill-sun-soft stroke-sun-deep" />
      <rect x={324} y={224} width={36} height={22} rx="2" className="fill-paper stroke-ink" />
      {labels.map(([x, y, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r={3.5} className="fill-coral stroke-coral" />
          <text x={x + 8} y={y + 4} className="fill-ink" fontSize="10">{label}</text>
        </g>
      ))}
    </svg>
  );
}

function LiferaftFirstActions({ className }: DiagramProps) {
  const steps = ["割 painter", "下海锚", "伤员靠中", "清点人数", "封篷顶", "准备信号"];
  return (
    <svg viewBox="0 0 680 260" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={340} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        入筏后 6 件事
      </text>
      {steps.map((step, i) => {
        const x = 46 + i * 104;
        return (
          <g key={step}>
            <circle cx={x + 34} cy={116} r={30} className={i < 2 ? "fill-coral/10 stroke-coral" : "fill-paper stroke-line"} />
            <text x={x + 34} y={121} textAnchor="middle" className={i < 2 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="11">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={x + 34} y={174} textAnchor="middle" className="fill-ink" fontSize="11">{step}</text>
            {i < steps.length - 1 ? <path d={`M${x + 68} 116 H${x + 94}`} className="stroke-line" /> : null}
          </g>
        );
      })}
      <text x={340} y={222} textAnchor="middle" className="fill-mist" fontSize="10">
        先防漂离，再保温、清点、发信号；顺序比速度更重要。
      </text>
    </svg>
  );
}

function HelpHuddlePosture({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 620 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        HELP 与 Huddle 保温姿势
      </text>
      <rect x={46} y={72} width={226} height={170} rx="2" className="fill-sea-soft/25 stroke-line" />
      <text x={159} y={98} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">HELP 单人</text>
      <circle cx={159} cy={128} r={14} className="fill-paper stroke-ink" />
      <path d="M159 142 C132 162 132 198 159 214 C186 198 186 162 159 142 Z" className="fill-sun-soft/60 stroke-sun-deep" />
      <path d="M132 170 L159 188 L186 170" className="stroke-ink" />
      <path d="M142 214 L159 188 L176 214" className="stroke-ink" />
      <rect x={348} y={72} width={226} height={170} rx="2" className="fill-sea-soft/25 stroke-line" />
      <text x={461} y={98} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">Huddle 多人</text>
      {[0, 72, 144, 216].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        const x = 461 + Math.cos(a) * 38;
        const y = 168 + Math.sin(a) * 28;
        return (
          <g key={i}>
            <circle cx={x} cy={y - 20} r={10} className="fill-paper stroke-ink" />
            <path d={`M${x - 16} ${y - 8} C${x - 22} ${y + 18} ${x + 22} ${y + 18} ${x + 16} ${y - 8}`} className="fill-sun-soft/60 stroke-sun-deep" />
          </g>
        );
      })}
      <text x={310} y={270} textAnchor="middle" className="fill-mist" fontSize="10">
        抱紧胸、腋、腹股沟这些高散热区，减少水流带走核心热量。
      </text>
    </svg>
  );
}

function SeaSurvivalAbc({ className }: DiagramProps) {
  const branches = [
    ["A", "Airway", "气道不通先开放"],
    ["B", "Breathing", "无呼吸立即通报"],
    ["C", "Circulation", "出血 / CPR / 保温"],
  ];
  return (
    <svg viewBox="0 0 620 260" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        生存场景 ABC 优先级
      </text>
      {branches.map((b, i) => {
        const x = 86 + i * 180;
        return (
          <g key={b[0]}>
            <rect x={x} y={82} width={128} height={92} rx="2" className={i === 0 ? "fill-coral/10 stroke-coral" : "fill-paper stroke-line"} />
            <text x={x + 64} y={112} textAnchor="middle" className={i === 0 ? "fill-coral font-mono" : "fill-sea-deep font-mono"} fontSize="22">{b[0]}</text>
            <text x={x + 64} y={136} textAnchor="middle" className="fill-ink" fontSize="12">{b[1]}</text>
            <text x={x + 64} y={156} textAnchor="middle" className="fill-mist" fontSize="9">{b[2]}</text>
            {i < branches.length - 1 ? <path d={`M${x + 132} 128 H${x + 172}`} className="stroke-line" /> : null}
          </g>
        );
      })}
      <text x={310} y={218} textAnchor="middle" className="fill-mist" fontSize="10">
        任何环境下都先保气道与呼吸，再处理循环、低温和撤离。
      </text>
    </svg>
  );
}

function PatientAssessmentStation({ className }: DiagramProps) {
  const checks = ["气道", "呼吸", "脉搏", "出血", "体温"];
  return (
    <svg viewBox="0 0 620 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        船上患者评估站位
      </text>
      <rect x={126} y={86} width={368} height={126} rx="3" className="fill-paper-soft stroke-line" />
      <text x={310} y={232} textAnchor="middle" className="fill-mist" fontSize="10">驾驶舱地板或主舱地板，低、平、硬、可固定</text>
      <ellipse cx={310} cy={150} rx={86} ry={18} className="fill-paper stroke-ink" />
      <circle cx={212} cy={150} r={16} className="fill-paper stroke-ink" />
      <g className="stroke-coral fill-coral">
        <circle cx={190} cy={106} r={10} />
        <path d="M190 116 V146" />
        <path d="M170 140 L190 148 L210 140" />
      </g>
      <text x={120} y={112} className="fill-coral font-mono" fontSize="10">救援者：开放气道</text>
      <g className="stroke-sea-deep fill-sea-deep">
        <circle cx={430} cy={106} r={10} />
        <path d="M430 116 V148" />
        <path d="M410 142 L430 148 L450 142" />
      </g>
      <text x={446} y={112} className="fill-sea-deep font-mono" fontSize="10">同伴：记录生命体征</text>
      {checks.map((c, i) => (
        <text key={c} x={206 + i * 52} y={270} textAnchor="middle" className="fill-ink" fontSize="10">{c}</text>
      ))}
    </svg>
  );
}

function ChokingActionMap({ className }: DiagramProps) {
  const cases = [
    ["成人", "腹冲"],
    ["婴儿", "背拍 + 胸冲"],
    ["孕妇", "胸冲"],
  ];
  return (
    <svg viewBox="0 0 620 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        气道阻塞按对象选手法
      </text>
      {cases.map((c, i) => {
        const x = 96 + i * 176;
        return (
          <g key={c[0]}>
            <rect x={x} y={78} width={132} height={128} rx="2" className="fill-paper stroke-line" />
            <circle cx={x + 66} cy={108} r={14} className="fill-paper stroke-ink" />
            <path d="M66 122 V176" transform={`translate(${x} 0)`} className="stroke-ink" />
            <path d="M44 144 H88" transform={`translate(${x} 0)`} className="stroke-ink" />
            <circle cx={x + 66} cy={150} r={i === 1 ? 7 : 10} className={i === 0 ? "fill-coral/20 stroke-coral" : "fill-sun-soft stroke-sun-deep"} />
            <text x={x + 66} y={224} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">{c[0]}</text>
            <text x={x + 66} y={244} textAnchor="middle" className="fill-ink" fontSize="11">{c[1]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MobDistanceTimeline({ className }: DiagramProps) {
  const marks = [
    ["0s", 0, "落水"],
    ["10s", 36, "36m"],
    ["30s", 108, "108m"],
    ["90s", 320, "320m+"],
  ];
  return (
    <svg viewBox="0 0 680 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={340} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        MOB 黄金 90 秒距离拉开
      </text>
      <path d="M70 178 H610" className="stroke-line" />
      {marks.map((m, i) => {
        const x = 80 + (Number(m[1]) / 320) * 520;
        return (
          <g key={m[0]}>
            <line x1={x} y1={86} x2={x} y2={208} className={i === 0 ? "stroke-coral" : "stroke-mist"} strokeDasharray="3 4" />
            <circle cx={x} cy={178} r={i === 0 ? 7 : 4} className={i === 0 ? "fill-coral stroke-coral" : "fill-sea-deep stroke-sea-deep"} />
            <text x={x} y={72} textAnchor="middle" className="fill-ink font-mono" fontSize="10">{m[0]}</text>
            <text x={x} y={230} textAnchor="middle" className="fill-mist" fontSize="10">{m[2]}</text>
          </g>
        );
      })}
      <g transform="translate(80 178) rotate(90)">
        <ellipse cx={0} cy={6} rx={18} ry={5} className="fill-paper stroke-ink" />
        <line x1={0} y1="-28" x2={0} y2={2} className="stroke-ink" />
        <path d="M0 -28 L16 2 L0 -2 Z" className="fill-paper stroke-ink" />
      </g>
      <text x={340} y={258} textAnchor="middle" className="fill-mist" fontSize="10">
        7 节船速下，90 秒已经超过多数人的稳定目视范围。
      </text>
    </svg>
  );
}

function MobRecoveryPatterns({ className }: DiagramProps) {
  const panels = [
    ["Quick Stop", "小圈停船"],
    ["Figure-8", "远离后回接"],
    ["Williamson", "动力船掉头"],
  ];
  return (
    <svg viewBox="0 0 680 300" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={340} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        MOB 回收路线对比
      </text>
      {panels.map((p, i) => {
        const x = 46 + i * 214;
        return (
          <g key={p[0]}>
            <rect x={x} y={64} width={170} height={174} rx="2" className="fill-paper stroke-line" />
            <circle cx={x + 86} cy={148} r={7} className="fill-coral stroke-coral" />
            <text x={x + 86} y={256} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="10">{p[0]}</text>
            <text x={x + 86} y={272} textAnchor="middle" className="fill-mist" fontSize="9">{p[1]}</text>
            {i === 0 ? (
              <path d={`M${x + 72} 198 C${x + 28} 132 ${x + 104} 82 ${x + 122} 142 C${x + 134} 188 ${x + 100} 204 ${x + 86} 148`} className="stroke-sea-deep" strokeWidth={1.8} />
            ) : i === 1 ? (
              <path d={`M${x + 36} 204 C${x + 150} 214 ${x + 152} 78 ${x + 58} 102 C${x + 20} 114 ${x + 40} 170 ${x + 86} 148`} className="stroke-sea-deep" strokeWidth={1.8} />
            ) : (
              <path d={`M${x + 44} 204 C${x + 120} 160 ${x + 136} 118 ${x + 94} 82 C${x + 166} 132 ${x + 150} 190 ${x + 86} 148`} className="stroke-sea-deep" strokeWidth={1.8} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function SoundSignalNegotiation({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 620 260" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        窄水道超越声号协商
      </text>
      <path d="M60 128 C190 86 430 86 560 128" className="stroke-sea-deep/70" />
      <path d="M60 170 C190 212 430 212 560 170" className="stroke-sea-deep/70" />
      <g transform="translate(210 158) rotate(82)">
        <ellipse cx={0} cy={6} rx={24} ry={7} className="fill-paper stroke-ink" />
        <line x1={0} y1="-34" x2={0} y2={2} className="stroke-ink" />
        <path d="M0 -34 L18 2 L0 -2 Z" className="fill-paper stroke-ink" />
      </g>
      <g transform="translate(390 134) rotate(78)">
        <ellipse cx={0} cy={6} rx={28} ry={8} className="fill-paper-soft stroke-ink" />
        <line x1={0} y1="-40" x2={0} y2={2} className="stroke-ink" />
      </g>
      <path d="M230 130 C270 92 326 84 366 106" className="stroke-coral" strokeWidth={1.8} />
      <polygon points="366,106 354,105 360,116" className="fill-coral stroke-coral" />
      <text x={278} y={80} className="fill-coral font-mono" fontSize="10">— · — · 请求右舷超越</text>
      <text x={310} y={226} textAnchor="middle" className="fill-mist" fontSize="10">
        前船同意重复同声号；不同意或有疑问，立即 5 短声。
      </text>
    </svg>
  );
}

function RadarRmlPlot({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 560 320" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={280} y={30} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        雷达相对运动线 RML
      </text>
      <circle cx={210} cy={166} r={118} className="fill-paper stroke-line" />
      <circle cx={210} cy={166} r={72} className="stroke-mist/40" strokeDasharray="3 4" />
      <circle cx={210} cy={166} r={26} className="stroke-mist/30" strokeDasharray="3 4" />
      <circle cx={210} cy={166} r={5} className="fill-coral stroke-coral" />
      <text x={222} y={170} className="fill-coral font-mono" fontSize="9">自船</text>
      {[
        [128, 84, "O1"],
        [154, 112, "O2"],
        [182, 142, "O3"],
      ].map(([x, y, label]) => (
        <g key={label}>
          <circle cx={Number(x)} cy={Number(y)} r={4} className="fill-sea-deep stroke-sea-deep" />
          <text x={Number(x) - 18} y={Number(y)} className="fill-sea-deep font-mono" fontSize="9">{label}</text>
        </g>
      ))}
      <path d="M118 74 L222 180" className="stroke-sea-deep" strokeWidth={1.8} />
      <text x={76} y={222} className="fill-sea-deep font-mono" fontSize="10">RML 指向自船 = CPA 很小</text>
      <g transform="translate(420 156)">
        <path d="M-42 58 H42 L30 72 H-30 Z" className="fill-paper-soft stroke-ink" />
        <line x1={0} y1="-56" x2={0} y2={58} className="stroke-ink" />
        <path d="M0 -56 L28 50 L0 38 Z" className="fill-paper stroke-ink" />
      </g>
      <path d="M368 112 L452 78" className="stroke-coral" strokeWidth={1.5} />
      <text x={390} y={70} className="fill-coral font-mono" fontSize="10">对方真航向需 vector plot</text>
    </svg>
  );
}

function AisRadarOverlap({ className }: DiagramProps) {
  return (
    <svg viewBox="0 0 620 280" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <text x={310} y={34} textAnchor="middle" className="fill-ink font-mono" fontSize="10" letterSpacing="0.1em">
        AIS 与雷达互补区域
      </text>
      <circle cx={266} cy={146} r={86} className="fill-sea-soft/35 stroke-sea-deep" />
      <circle cx={354} cy={146} r={86} className="fill-sun-soft/45 stroke-sun-deep" />
      <text x={232} y={126} textAnchor="middle" className="fill-sea-deep font-mono" fontSize="11">雷达</text>
      <text x={388} y={126} textAnchor="middle" className="fill-sun-deep font-mono" fontSize="11">AIS</text>
      <text x={310} y={150} textAnchor="middle" className="fill-ink" fontSize="12">交叉确认</text>
      <text x={188} y={196} textAnchor="middle" className="fill-mist" fontSize="9">近距离物理回波</text>
      <text x={432} y={196} textAnchor="middle" className="fill-mist" fontSize="9">身份 / CPA / 远距</text>
      <text x={310} y={246} textAnchor="middle" className="fill-mist" fontSize="10">
        玻璃钢小艇、关 AIS 渔船、雨杂波目标都需要多源核对。
      </text>
    </svg>
  );
}

/* —— 入口 —— */

const registry: Record<DiagramKind, (p: DiagramProps) => ReactNode> = {
  // 交互式
  "points-of-sail": () => <InteractivePointsOfSail />,
  "apparent-wind": () => <InteractiveApparentWind />,
  "tide-curve": () => <InteractiveTwelfthsRule />,
  "three-cell-circulation": () => <InteractiveThreeCellCirculation />,
  "coriolis-deflection": () => <InteractiveCoriolis />,
  "isobar-wind": () => <InteractiveIsobarWind />,
  "cts-plotter": () => <InteractiveCtsPlotter />,
  "lights-identifier": () => <InteractiveLightsIdentifier />,
  "heave-to-balance": () => <InteractiveHeaveToBalance />,
  // 静态线稿
  "sea-breeze-cycle": SeaBreezeCycle,
  "pressure-gradient": PressureGradient,
  "frontal-system": FrontalSystem,
  "buoyage-iala-a": BuoyageIalaA,
  "colregs-crossing": ColregsCrossing,
  "lights-vessels": LightsVessels,
  "wind-shift-vmg": WindShiftVmg,
  "compass-rose": CompassRose,
  "celestial-triangle": CelestialTriangle,
  "vhf-radio-horizon": VhfRadioHorizon,
  "vhf-station-identity": VhfStationIdentity,
  "gmdss-alert-loop": GmdssAlertLoop,
  "dsc-distress-timeline": DscDistressTimeline,
  "mayday-message-structure": MaydayMessageStructure,
  "vhf-call-format": VhfCallFormat,
  "dr-abc-flow": DrAbcFlow,
  "cpr-on-board": CprOnBoard,
  "bleeding-control-ladder": BleedingControlLadder,
  "hypothermia-core-rewarm": HypothermiaCoreRewarm,
  "diesel-four-stroke": DieselFourStroke,
  "diesel-fault-tree": DieselFaultTree,
  "fuel-bleed-path": FuelBleedPath,
  "engine-cooling-loops": EngineCoolingLoops,
  "lifejacket-fit-check": LifejacketFitCheck,
  "lifejacket-buoyancy-classes": LifejacketBuoyancyClasses,
  "flare-signal-range": FlareSignalRange,
  "liferaft-anatomy": LiferaftAnatomy,
  "liferaft-first-actions": LiferaftFirstActions,
  "help-huddle-posture": HelpHuddlePosture,
  "sea-survival-abc": SeaSurvivalAbc,
  "patient-assessment-station": PatientAssessmentStation,
  "choking-action-map": ChokingActionMap,
  "mob-distance-timeline": MobDistanceTimeline,
  "mob-recovery-patterns": MobRecoveryPatterns,
  "sound-signal-negotiation": SoundSignalNegotiation,
  "radar-rml-plot": RadarRmlPlot,
  "ais-radar-overlap": AisRadarOverlap,
};

/** 这些 kind 是交互式的——使用更宽容器、紧凑内边距，让滑块与 SVG 能并排展示。 */
const INTERACTIVE_KINDS: ReadonlySet<DiagramKind> = new Set<DiagramKind>([
  "points-of-sail",
  "apparent-wind",
  "tide-curve",
  "three-cell-circulation",
  "coriolis-deflection",
  "isobar-wind",
  "cts-plotter",
  "lights-identifier",
  "heave-to-balance",
]);

export function CourseDiagram({
  kind,
  caption,
}: {
  kind: DiagramKind;
  caption?: string;
}) {
  const Cmp = registry[kind];
  const interactive = INTERACTIVE_KINDS.has(kind);
  const title =
    caption?.split("·").at(1)?.trim().split("：").at(0) ??
    kind.replaceAll("-", " ");

  if (interactive) {
    return (
      <figure className="my-8">
        <div className="wh-instrument-panel rounded-sm p-4 sm:p-5 md:p-6">
          <div className="mb-4 flex flex-col gap-2 border-b border-line/70 pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-sea-deep">
                Interactive Diagram
              </p>
              <p className="mt-1 text-[0.95rem] font-medium text-ink">{title}</p>
            </div>
            <div className="wh-status-strip">
              <span>可拖动参数</span>
              <span>即时读数</span>
              <span>训练模式</span>
            </div>
          </div>
          <Cmp className="text-ink" />
        </div>
        {caption ? (
          <figcaption className="mt-3 text-center font-mono text-[0.7rem] tracking-[0.12em] text-mist">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="wh-instrument-panel rounded-sm p-4 sm:p-6 md:p-8">
        <div className="mb-4 flex flex-col gap-2 border-b border-line/70 pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-sea-deep">
              Field Diagram
            </p>
            <p className="mt-1 text-[0.95rem] font-medium text-ink">{title}</p>
          </div>
          <div className="wh-status-strip">
            <span>核心结构</span>
            <span>可打印</span>
            <span>移动端适配</span>
          </div>
        </div>
        <Cmp className="mx-auto block h-auto w-full max-w-2xl max-h-[55vh] text-ink" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-[0.7rem] tracking-[0.12em] text-mist">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
