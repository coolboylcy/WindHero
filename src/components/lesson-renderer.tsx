import { AlertTriangle, BookOpen, Compass, Quote, Sparkles } from "lucide-react";
import type { LessonBlock } from "@/lib/courses/types";
import { CourseDiagram } from "@/lib/courses/diagrams";
import { cn } from "@/lib/utils";

/**
 * 把 Lesson.body（LessonBlock[]）渲染成正文。
 * 风格：克制的衬线 display + 长文中文呼吸（prose-zh）+ 极细分隔。
 */

export function LessonRenderer({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((b, i) => (
        <BlockRenderer key={i} block={b} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="prose-zh text-[1.02rem] text-ink md:text-[1.06rem]">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h3 className="display mt-12 text-2xl text-ink md:text-3xl">
          {block.text}
        </h3>
      );

    case "list":
      return block.ordered ? (
        <ol className="prose-zh ml-0 list-none space-y-3 text-[1.02rem] text-ink">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[2.4rem_1fr] items-baseline gap-3"
            >
              <span className="font-mono text-[0.74rem] tracking-[0.12em] text-sea-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul className="prose-zh space-y-3 text-[1.02rem] text-ink">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.4rem_1fr] items-baseline gap-3"
            >
              <span className="mt-[0.7em] h-px w-3 bg-sea-deep" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "definition":
      return (
        <dl className="border-l-2 border-sea-deep/70 pl-5">
          <dt className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
            定义
          </dt>
          <dd className="display mt-2 text-xl text-ink">{block.term}</dd>
          <dd className="prose-zh mt-2 text-[0.98rem] text-ink-soft">
            {block.meaning}
          </dd>
        </dl>
      );

    case "callout": {
      const palette: Record<
        typeof block.tone,
        { Icon: typeof Compass; box: string; label: string }
      > = {
        note: {
          Icon: BookOpen,
          box: "border-line/80 bg-paper-soft/60",
          label: "笔记",
        },
        tip: {
          Icon: Sparkles,
          box: "border-sea-deep/30 bg-sea-soft/30",
          label: "实战提示",
        },
        warn: {
          Icon: AlertTriangle,
          box: "border-coral/40 bg-coral/5",
          label: "警示",
        },
      };
      const { Icon, box, label } = palette[block.tone];
      return (
        <aside className={cn("rounded-sm border p-6 md:p-7", box)}>
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-sea-deep" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              {label}
            </span>
          </div>
          {block.title ? (
            <p className="display mt-3 text-lg text-ink">{block.title}</p>
          ) : null}
          <p className="prose-zh mt-3 text-[0.98rem] text-ink">{block.body}</p>
        </aside>
      );
    }

    case "diagram":
      return <CourseDiagram kind={block.kind} caption={block.caption} />;

    case "quote":
      return (
        <figure className="my-2 border-l-2 border-ink/30 py-3 pl-6">
          <Quote className="mb-2 h-4 w-4 text-mist" />
          <blockquote className="display text-xl leading-[1.5] text-ink md:text-[1.4rem]">
            {block.text}
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-3 font-mono text-[0.72rem] tracking-[0.12em] text-mist">
              — {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );

    case "practice":
      return (
        <section className="rounded-sm border border-line/80 bg-paper p-6 md:p-7">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
            练习 · Practice
          </p>
          <p className="prose-zh mt-3 text-[1rem] text-ink">{block.prompt}</p>
          {block.hint ? (
            <p className="mt-4 text-[0.86rem] leading-[1.8] text-mist">
              <span className="font-mono uppercase tracking-[0.14em]">提示</span>{" "}
              {block.hint}
            </p>
          ) : null}
        </section>
      );

    case "table":
      return (
        <div className="overflow-hidden rounded-sm border border-line/70">
          <table className="w-full text-left text-[0.94rem] text-ink">
            <thead className="bg-paper-soft/50">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-line/70 px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr
                  key={r}
                  className="border-b border-line/40 last:border-b-0"
                >
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="px-4 py-3 align-top leading-[1.7]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}
