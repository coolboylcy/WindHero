import type { ReactNode } from "react";
import type { LessonBlock } from "./types";

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

/* —— 1. 点风方位（Points of Sail） —— */

function PointsOfSail({ className }: DiagramProps) {
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

/* —— 2. 真风 vs 视风 —— */

function ApparentWind({ className }: DiagramProps) {
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

/* —— Fallback —— */

function DiagramFallback({ kind, className }: DiagramProps & { kind: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      <rect x={1} y={1} width={398} height={198} className="stroke-line/80" />
      <text
        x={200}
        y={96}
        textAnchor="middle"
        className="fill-mist font-mono"
        fontSize="11"
        letterSpacing="0.1em"
      >
        图解：{kind}
      </text>
      <text
        x={200}
        y={114}
        textAnchor="middle"
        className="fill-mist"
        fontSize="10"
      >
        （待补充）
      </text>
    </svg>
  );
}

/* —— 入口 —— */

const registry: Record<DiagramKind, (p: DiagramProps) => ReactNode> = {
  "points-of-sail": PointsOfSail,
  "apparent-wind": ApparentWind,
  "sea-breeze-cycle": SeaBreezeCycle,
  "pressure-gradient": PressureGradient,
  "frontal-system": FrontalSystem,
  "buoyage-iala-a": BuoyageIalaA,
  "colregs-crossing": ColregsCrossing,
  "lights-vessels": LightsVessels,
  "wind-shift-vmg": (p) => <DiagramFallback kind="wind-shift-vmg" {...p} />,
  "compass-rose": (p) => <DiagramFallback kind="compass-rose" {...p} />,
  "tide-curve": (p) => <DiagramFallback kind="tide-curve" {...p} />,
  "celestial-triangle": (p) => <DiagramFallback kind="celestial-triangle" {...p} />,
};

export function CourseDiagram({
  kind,
  caption,
}: {
  kind: DiagramKind;
  caption?: string;
}) {
  const Cmp = registry[kind];
  return (
    <figure className="my-10">
      <div className="rounded-sm border border-line/70 bg-paper-soft/40 p-6 md:p-10">
        <Cmp className="mx-auto block h-auto w-full max-w-2xl text-ink" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-mono text-[0.72rem] tracking-[0.12em] text-mist">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
