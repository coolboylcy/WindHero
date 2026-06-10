import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Map, Radio, Waves, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

type RouteStage = {
  id: string;
  label: string;
  sub: string;
  count?: number;
};

type VisualCard = {
  title: string;
  label: string;
  body: string;
  href?: string;
  tone?: "sea" | "sun" | "coral" | "ink";
};

const toneClass: Record<NonNullable<VisualCard["tone"]>, string> = {
  sea: "border-sea/35 bg-sea-soft/35 text-sea-deep",
  sun: "border-sun/40 bg-sun-soft/35 text-sun-deep",
  coral: "border-coral/35 bg-coral/5 text-coral",
  ink: "border-ink/20 bg-paper-soft/55 text-ink",
};

export function ContentCompassVisual() {
  const items = [
    { label: "课程", angle: "-rotate-6", icon: BookOpen, href: "/courses" },
    { label: "词典", angle: "rotate-3", icon: Compass, href: "/glossary" },
    { label: "案例", angle: "-rotate-2", icon: Waves, href: "/cases" },
    { label: "工具", angle: "rotate-6", icon: Map, href: "/tools" },
  ];

  return (
    <div className="relative overflow-hidden border border-line/70 bg-paper p-5 shadow-[0_28px_70px_rgba(13,39,66,0.08)] md:p-7">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "url('/images/generated/course-chart-desk-v1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-paper via-paper/88 to-sea-soft/55" />

      <div className="relative grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="wh-dark-panel rounded-sm p-6 text-paper">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sun-soft">
            WindHero content system
          </p>
          <h3 className="display mt-4 text-3xl text-paper md:text-4xl">
            不是文章库，
            <br />
            是一张训练海图。
          </h3>
          <p className="mt-5 text-[0.92rem] leading-[1.85] text-paper-soft">
            每一个概念都有位置：课程给主线，词典解释术语，案例负责记忆，工具把判断变成手感。
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mist">
            <span>Course route</span>
            <span>Term atlas</span>
            <span>Case log</span>
            <span>Tool bench</span>
          </div>
        </div>

        <div className="relative min-h-[22rem]">
          <svg
            aria-hidden
            viewBox="0 0 420 320"
            className="absolute inset-0 h-full w-full text-line"
          >
            <defs>
              <linearGradient id="compassLine" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#2d83be" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#c8923a" stopOpacity="0.42" />
              </linearGradient>
            </defs>
            <circle cx="210" cy="160" r="126" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="210" cy="160" r="82" fill="none" stroke="currentColor" strokeDasharray="5 8" />
            <path d="M210 32v256M82 160h256M120 70l180 180M300 70L120 250" stroke="url(#compassLine)" strokeWidth="1.4" />
            <path d="M210 72l26 88-26 88-26-88z" fill="rgba(14,85,134,0.10)" stroke="#0e5586" />
            <circle cx="210" cy="160" r="28" fill="#f5f7fa" stroke="#c8923a" />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-sun/50 bg-paper/90 text-center shadow-[0_20px_50px_rgba(13,39,66,0.12)]">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist">
              skipper
            </span>
            <strong className="display -mt-5 text-2xl text-ink">判断力</strong>
          </div>

          {items.map((item, i) => {
            const Icon = item.icon;
            const positions = [
              "left-2 top-8",
              "right-1 top-12",
              "left-8 bottom-10",
              "right-6 bottom-8",
            ];
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "absolute z-10 flex w-32 items-center gap-3 border border-line/75 bg-paper/90 p-3 text-ink shadow-[0_14px_40px_rgba(13,39,66,0.08)] transition-colors hover:bg-paper-soft",
                  positions[i],
                  item.angle
                )}
              >
                <Icon className="h-4 w-4 text-sea-deep" />
                <span className="display text-lg">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function LearningRouteChart({ stages }: { stages: RouteStage[] }) {
  return (
    <div className="relative overflow-hidden border border-line/70 bg-paper">
      <div className="absolute inset-x-0 top-1/2 hidden h-px bg-line/80 lg:block" />
      <div className="grid gap-px bg-line/70 lg:grid-cols-6">
        {stages.map((stage, index) => (
          <Link
            key={stage.id}
            href={`/courses#${stage.id}`}
            className="group relative min-h-44 bg-paper p-5 transition-colors hover:bg-paper-soft/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-sea/40 bg-sea-soft/50 font-mono text-[0.72rem] text-sea-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-mist">
                {stage.count ? `${stage.count} courses` : stage.sub}
              </span>
            </div>
            <h3 className="display mt-8 text-xl text-ink">{stage.label}</h3>
            <p className="mt-2 text-[0.82rem] leading-[1.65] text-ink-soft">
              {stage.sub}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[0.76rem] text-sea-deep opacity-0 transition-opacity group-hover:opacity-100">
              跳到阶段
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CourseSystemMap({ stages }: { stages: RouteStage[] }) {
  const total = stages.reduce((sum, s) => sum + (s.count ?? 0), 0);

  return (
    <div className="wh-tool-shell rounded-sm p-5 md:p-7">
      <div className="grid gap-7 lg:grid-cols-[0.9fr_1.35fr] lg:items-center">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sea-deep">
            system map
          </p>
          <h3 className="display mt-4 text-3xl text-ink md:text-4xl">
            6 个阶段，
            <br />
            {total} 门理论课。
          </h3>
          <p className="mt-5 text-[0.94rem] leading-[1.85] text-ink-soft">
            先建立海感，再建立航法，最后建立船长的取舍。课程不是平铺列表，而是一条逐步加压的训练航线。
          </p>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden bg-paper/70 p-4">
          <svg viewBox="0 0 620 300" className="h-full min-h-[20rem] w-full">
            <defs>
              <linearGradient id="routeWater" x1="0" x2="1">
                <stop offset="0%" stopColor="#c2d6e7" />
                <stop offset="100%" stopColor="#f0deb4" />
              </linearGradient>
            </defs>
            <path
              d="M40 220 C110 90 170 250 250 138 S390 56 455 150 540 234 590 74"
              fill="none"
              stroke="url(#routeWater)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M40 220 C110 90 170 250 250 138 S390 56 455 150 540 234 590 74"
              fill="none"
              stroke="#0e5586"
              strokeDasharray="2 18"
              strokeLinecap="round"
              strokeWidth="2"
            />
            {stages.map((stage, index) => {
              const points = [
                [42, 220],
                [150, 164],
                [250, 138],
                [350, 96],
                [455, 150],
                [590, 74],
              ];
              const [x, y] = points[index];
              return (
                <g key={stage.id}>
                  <circle cx={x} cy={y} r="18" fill="#f5f7fa" stroke="#0e5586" />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#0d2742"
                    fontFamily="monospace"
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y={y > 150 ? y - 34 : y + 48}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#0d2742"
                  >
                    {stage.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export function CertificationChannelsVisual() {
  const rows = [
    ["RYA", "英国体系", "理论细、海试重", "Day Skipper → Yachtmaster"],
    ["ASA", "美国体系", "租船友好", "101 → 104 → 106"],
    ["IYT", "国际体系", "商业/超级游艇", "Bareboat → Yachtmaster"],
  ];

  return (
    <div className="grid gap-px bg-line/70 lg:grid-cols-3">
      {rows.map(([name, region, style, route], index) => (
        <div key={name} className="relative overflow-hidden bg-paper p-6 md:p-8">
          <svg aria-hidden viewBox="0 0 260 120" className="mb-6 h-28 w-full">
            <path
              d="M18 88 C60 20 96 110 138 62 S210 18 242 76"
              fill="none"
              stroke={index === 0 ? "#0e5586" : index === 1 ? "#c8923a" : "#c2493a"}
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.28"
            />
            <path
              d="M18 88 C60 20 96 110 138 62 S210 18 242 76"
              fill="none"
              stroke={index === 0 ? "#0e5586" : index === 1 ? "#9a6e25" : "#c2493a"}
              strokeWidth="1.8"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
            <circle cx="18" cy="88" r="8" fill="#f5f7fa" stroke="#0d2742" />
            <circle cx="138" cy="62" r="8" fill="#f5f7fa" stroke="#0d2742" />
            <circle cx="242" cy="76" r="8" fill="#f5f7fa" stroke="#0d2742" />
          </svg>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
            {region}
          </p>
          <h3 className="display mt-2 text-4xl text-ink">{name}</h3>
          <p className="mt-3 text-[0.92rem] leading-[1.75] text-ink-soft">
            {style}
          </p>
          <p className="mt-5 border-t border-line/70 pt-4 font-mono text-[0.76rem] leading-[1.6] text-sea-deep">
            {route}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ToolDeckVisual() {
  return (
    <div className="grid gap-px bg-line/70 lg:grid-cols-2">
      <ToolPanel
        title="全球风带"
        label="Season window"
        body="先判断一片海一年里的底色：信风、季风、西风带、热带气旋窗口。"
        href="/tools/wind-belts"
        tone="sea"
      />
      <ToolPanel
        title="天气图读图"
        label="Synoptic reader"
        body="再看具体那一周：等压线密度、低压位置、锋面与半球风向。"
        href="/tools/synoptic"
        tone="sun"
      />
    </div>
  );
}

export function GlossaryAtlasVisual() {
  const nodes = [
    ["风与天气", 72, 70, "sea"],
    ["导航", 206, 42, "sun"],
    ["船体索具", 332, 82, "ink"],
    ["操船动作", 118, 178, "sea"],
    ["安全", 252, 166, "coral"],
    ["通信", 358, 188, "ink"],
    ["动力", 214, 252, "sun"],
  ] as const;

  return (
    <div className="relative overflow-hidden border border-line/70 bg-paper p-5 md:p-7">
      <svg viewBox="0 0 430 300" className="h-72 w-full">
        <path d="M72 70L206 42L332 82L252 166L118 178L72 70Z" fill="none" stroke="#cfd6df" />
        <path d="M206 42L214 252M118 178L358 188M72 70L252 166M332 82L214 252" fill="none" stroke="#cfd6df" strokeDasharray="5 8" />
        {nodes.map(([label, x, y, tone]) => (
          <g key={label}>
            <circle
              cx={x}
              cy={y}
              r="28"
              fill={tone === "sea" ? "#c2d6e7" : tone === "sun" ? "#f0deb4" : tone === "coral" ? "#f8e2df" : "#e9eef3"}
              stroke={tone === "coral" ? "#c2493a" : tone === "sun" ? "#9a6e25" : "#0e5586"}
              opacity="0.86"
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="#0d2742">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 border-t border-line/70 pt-5">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
          term atlas
        </p>
        <h3 className="display mt-2 text-2xl text-ink">术语不是背单词，是找到概念之间的连线。</h3>
      </div>
    </div>
  );
}

export function CaseLearningLoopVisual() {
  const steps = [
    ["事实", "发生了什么"],
    ["时间线", "何时转坏"],
    ["决策点", "哪里能停手"],
    ["课程", "回到训练"],
  ];

  return (
    <div className="wh-dark-panel rounded-sm p-6 text-paper md:p-8">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sun-soft">
        case learning loop
      </p>
      <div className="mt-7 grid gap-4">
        {steps.map(([title, body], index) => (
          <div key={title} className="grid grid-cols-[3rem_1fr] gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 bg-paper/5 font-mono text-[0.72rem] text-sun-soft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="border-b border-paper/12 pb-4 last:border-b-0">
              <h3 className="display text-2xl text-paper">{title}</h3>
              <p className="mt-1 text-[0.86rem] leading-[1.7] text-paper-soft">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <svg aria-hidden viewBox="0 0 360 90" className="mt-6 h-20 w-full">
        <path d="M28 48 C86 10 116 78 180 46 S286 16 330 54" fill="none" stroke="#f0deb4" strokeWidth="7" strokeLinecap="round" opacity="0.24" />
        <path d="M28 48 C86 10 116 78 180 46 S286 16 330 54" fill="none" stroke="#f0deb4" strokeWidth="1.6" strokeDasharray="6 8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ToolPanel({ title, label, body, href, tone = "sea" }: VisualCard) {
  return (
    <Link href={href ?? "#"} className="group bg-paper p-6 transition-colors hover:bg-paper-soft/60 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
          {label}
        </p>
        <span className={cn("grid h-10 w-10 place-items-center rounded-full border", toneClass[tone])}>
          {tone === "sea" ? <Wind className="h-4 w-4" /> : <Radio className="h-4 w-4" />}
        </span>
      </div>
      <svg aria-hidden viewBox="0 0 420 170" className="mt-6 h-40 w-full">
        {tone === "sea" ? (
          <>
            <path d="M24 84h372" stroke="#cfd6df" />
            <path d="M24 40h372M24 128h372" stroke="#cfd6df" strokeDasharray="5 8" />
            <path d="M60 120 C120 28 190 140 250 72 S342 34 380 96" fill="none" stroke="#0e5586" strokeWidth="3" />
            <path d="M78 58l24 8-22 11M170 100l24 8-22 11M292 57l24 8-22 11" fill="none" stroke="#c8923a" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M58 30 C126 12 140 72 86 96 S46 158 142 138" fill="none" stroke="#0e5586" strokeWidth="2" />
            <path d="M180 22 C250 18 246 82 198 104 S184 158 284 138" fill="none" stroke="#0e5586" strokeWidth="2" />
            <path d="M104 30 C172 60 118 112 210 132 S336 110 356 36" fill="none" stroke="#9a6e25" strokeWidth="3" />
            <circle cx="104" cy="84" r="24" fill="none" stroke="#c2493a" strokeWidth="2" />
            <text x="96" y="90" fontSize="18" fill="#c2493a" fontFamily="monospace">L</text>
            <circle cx="312" cy="78" r="24" fill="none" stroke="#0e5586" strokeWidth="2" />
            <text x="303" y="84" fontSize="18" fill="#0e5586" fontFamily="monospace">H</text>
          </>
        )}
      </svg>
      <h3 className="display mt-2 text-3xl text-ink">{title}</h3>
      <p className="mt-3 text-[0.94rem] leading-[1.8] text-ink-soft">{body}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[0.84rem] text-sea-deep transition-colors group-hover:text-ink">
        打开工具
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
