"use client";

import { InteractiveIsobarWind } from "@/lib/courses/interactive-diagrams";

export function SynopticExplorer() {
  return (
    <div className="wh-tool-shell rounded-sm p-4 sm:p-5 md:p-6">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: "url('/images/generated/synoptic-chart-texture-v1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_0.38fr]">
        <div className="wh-instrument-panel rounded-sm p-5 md:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
                交互沙盒
              </p>
              <h3 className="display mt-3 text-xl text-ink">
                拖动等压线密度、切换半球
              </h3>
              <p className="mt-2 max-w-xl text-[0.86rem] leading-[1.75] text-ink-soft">
                看风速、风向如何随气压梯度和地球半球同步改变。
              </p>
            </div>
            <div className="wh-status-strip">
              <span>Surface pressure</span>
              <span>Buys-Ballot</span>
            </div>
          </div>
          <div className="mt-6">
            <InteractiveIsobarWind />
          </div>
        </div>

        <aside className="wh-dark-panel rounded-sm p-5 text-paper">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-sun-soft">
            Reading order
          </p>
          <ol className="mt-5 space-y-4 text-[0.9rem] leading-[1.75] text-paper-soft">
            <li>
              <span className="font-mono text-sun-soft">01</span>{" "}
              先看等压线密度，判断风强。
            </li>
            <li>
              <span className="font-mono text-sun-soft">02</span>{" "}
              再看半球，判断低压在风的哪一侧。
            </li>
            <li>
              <span className="font-mono text-sun-soft">03</span>{" "}
              最后把锋面、海岸线和出航时间叠加。
            </li>
          </ol>
          <p className="mt-8 border-t border-paper/15 pt-4 text-[0.78rem] leading-[1.7] text-mist">
            真图读法：先判断大尺度，再看局地。App 只告诉你一个点，天气图告诉你整片海。
          </p>
        </aside>
      </div>
    </div>
  );
}
