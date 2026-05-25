"use client";

import { InteractiveIsobarWind } from "@/lib/courses/interactive-diagrams";

export function SynopticExplorer() {
  return (
    <div className="rounded-sm border border-line/70 bg-paper p-6 md:p-7">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-sea-deep">
        交互沙盒
      </p>
      <h3 className="display mt-3 text-xl text-ink">
        拖动等压线密度、切换半球
      </h3>
      <p className="mt-2 text-[0.86rem] leading-[1.75] text-ink-soft">
        看风速、风向如何随气压梯度和地球半球同步改变。
      </p>
      <div className="mt-6">
        <InteractiveIsobarWind />
      </div>
    </div>
  );
}
