"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Clock, Play, RotateCcw, X } from "lucide-react";
import type { Question } from "@/lib/courses/types";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
  /** lesson 模式：答完即翻牌；exam 模式：限时、统一交卷 */
  mode?: "lesson" | "exam";
  passMark?: number;
  /** 仅 exam 模式：限时（分钟）。给 0 视为不限时。 */
  durationMinutes?: number;
  title?: string;
};

export function Quiz({
  questions,
  mode = "lesson",
  passMark = 70,
  durationMinutes,
  title,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  /* —— 考试计时器 —— */
  const [started, setStarted] = useState(mode !== "exam");
  const [remaining, setRemaining] = useState<number>(
    mode === "exam" && durationMinutes ? durationMinutes * 60 : 0
  );

  useEffect(() => {
    if (mode !== "exam" || !started || submitted) return;
    if (!durationMinutes) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setSubmitted(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [mode, started, submitted, durationMinutes]);

  /* —— 防止意外离开 —— */
  useEffect(() => {
    if (mode !== "exam" || !started || submitted) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [mode, started, submitted]);

  const score = useMemo(() => {
    const total = questions.length;
    const correct = questions.reduce(
      (sum, q) => (answers[q.id] === q.correct ? sum + 1 : sum),
      0
    );
    return {
      correct,
      total,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }, [answers, questions]);

  const allAnswered =
    Object.keys(answers).length === questions.length && questions.length > 0;

  function choose(qid: string, idx: number) {
    if (mode === "lesson" && revealed[qid]) return;
    if (mode === "exam" && submitted) return;
    setAnswers((a) => ({ ...a, [qid]: idx }));
    if (mode === "lesson") {
      setRevealed((r) => ({ ...r, [qid]: true }));
    }
  }

  function reset() {
    setAnswers({});
    setRevealed({});
    setSubmitted(false);
    if (mode === "exam") {
      setStarted(false);
      setRemaining(durationMinutes ? durationMinutes * 60 : 0);
    }
  }

  function startExam() {
    setStarted(true);
  }

  /* —— 考试启动闸 —— */
  if (mode === "exam" && !started) {
    return (
      <section className="border-y border-line/70 bg-paper-soft/40 py-16">
        <div className="mx-auto max-w-2xl px-2 text-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
            考前确认
          </p>
          <h3 className="display mt-5 text-3xl text-ink md:text-4xl">
            准备好了再开始。
          </h3>
          <p className="prose-zh mt-6 text-[1rem] text-ink-soft">
            点「开始考试」后，倒计时立刻启动、不可暂停。中途刷新或离开页面会触发浏览器确认对话框。建议把网页设为「请勿打扰」、关掉其他标签页，像在考场里一样独立完成。
          </p>
          <ul className="mt-8 grid gap-3 border-y border-line/70 py-6 text-left text-[0.92rem] text-ink">
            <li className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                01
              </span>
              <span>共 {questions.length} 题；及格线 {passMark}%</span>
            </li>
            <li className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                02
              </span>
              <span>
                时长 {durationMinutes ?? "不限"} 分钟；时间到自动交卷
              </span>
            </li>
            <li className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                03
              </span>
              <span>答题过程中不显示对错；交卷后一次性展示解析</span>
            </li>
          </ul>
          <button
            type="button"
            onClick={startExam}
            className="mt-8 inline-flex items-center gap-2 rounded-sm bg-ink px-7 py-3.5 font-mono text-[0.8rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
          >
            <Play className="h-3.5 w-3.5" />
            开始考试
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-line/70 bg-paper-soft/40 py-12">
      <div className="mx-auto max-w-3xl px-2">
        <header className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              {mode === "exam" ? "期末模拟考试 · 进行中" : "课后小测"}
            </p>
            <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
              {title ?? (mode === "exam" ? "测验你的判断力" : "小测一下")}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {mode === "exam" && started && !submitted && durationMinutes ? (
              <Timer remaining={remaining} />
            ) : null}
            {submitted || (mode === "lesson" && Object.keys(revealed).length > 0) ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist transition-colors hover:text-ink"
              >
                <RotateCcw className="h-3 w-3" />
                重做
              </button>
            ) : null}
          </div>
        </header>

        <ol className="mt-10 space-y-10">
          {questions.map((q, qi) => {
            const showAnswer =
              mode === "lesson" ? revealed[q.id] : submitted;
            const chosen = answers[q.id];

            return (
              <li key={q.id} className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-[0.72rem] tracking-[0.14em] text-sea-deep">
                    {String(qi + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[1rem] leading-[1.85] text-ink md:text-[1.04rem]">
                    {q.q}
                  </p>
                </div>

                <div className="ml-10 space-y-2">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === q.correct;
                    const isChosen = chosen === oi;
                    const stateClass = (() => {
                      if (!showAnswer) {
                        return isChosen
                          ? "border-sea-deep bg-sea-soft/30 text-ink"
                          : "border-line/70 bg-paper text-ink hover:border-ink-soft";
                      }
                      if (isCorrect)
                        return "border-sea-deep bg-sea-soft/40 text-ink";
                      if (isChosen && !isCorrect)
                        return "border-coral/60 bg-coral/5 text-ink";
                      return "border-line/60 bg-paper text-mist";
                    })();
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => choose(q.id, oi)}
                        disabled={
                          (mode === "lesson" && !!revealed[q.id]) ||
                          (mode === "exam" && submitted)
                        }
                        className={cn(
                          "flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left text-[0.96rem] transition-colors",
                          stateClass,
                          "disabled:cursor-default"
                        )}
                      >
                        <span className="mt-[0.15rem] font-mono text-[0.72rem] tracking-[0.14em] text-ink-soft">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showAnswer && isCorrect ? (
                          <Check className="mt-1 h-4 w-4 text-sea-deep" />
                        ) : null}
                        {showAnswer && isChosen && !isCorrect ? (
                          <X className="mt-1 h-4 w-4 text-coral" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {showAnswer ? (
                  <p className="ml-10 rounded-sm border-l-2 border-sea-deep/60 bg-paper px-4 py-3 text-[0.92rem] leading-[1.8] text-ink-soft">
                    <span className="mr-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sea-deep">
                      解析
                    </span>
                    {q.explanation}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        {mode === "exam" ? (
          <footer className="mt-12 border-t border-line/70 pt-8">
            {!submitted ? (
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-[0.86rem] text-mist">
                  已答 {Object.keys(answers).length} / {questions.length}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="rounded-sm bg-ink px-6 py-3 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
                >
                  {allAnswered
                    ? "提前交卷"
                    : `还差 ${questions.length - Object.keys(answers).length} 题——直接交卷`}
                </button>
              </div>
            ) : (
              <ExamResult
                pct={score.pct}
                correct={score.correct}
                total={score.total}
                passMark={passMark}
                timedOut={!!durationMinutes && remaining === 0}
              />
            )}
          </footer>
        ) : null}
      </div>
    </section>
  );
}

function Timer({ remaining }: { remaining: number }) {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  const low = remaining <= 300;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-3 py-1.5 font-mono text-[0.86rem]",
        low
          ? "border-coral/60 bg-coral/10 text-coral"
          : "border-line/70 bg-paper text-ink"
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>
        {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
      </span>
    </div>
  );
}

function ExamResult({
  pct,
  correct,
  total,
  passMark,
  timedOut,
}: {
  pct: number;
  correct: number;
  total: number;
  passMark: number;
  timedOut: boolean;
}) {
  const passed = pct >= passMark;
  return (
    <div className="rounded-sm border border-line/70 bg-paper p-6 md:p-8">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
        成绩{timedOut ? " · 时间到自动交卷" : ""}
      </p>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="display text-5xl text-ink">{pct}</span>
        <span className="font-mono text-[0.86rem] text-mist">
          分 · {correct} / {total}
        </span>
      </div>
      <p className="mt-4 text-[0.96rem] leading-[1.85] text-ink-soft">
        {passed
          ? `通过线是 ${passMark} 分——你过了。但成绩不是终点；回看那几道错题，理解为什么错。下一阶段的课程会持续考你这些判断。`
          : `通过线是 ${passMark} 分——这一次没过，不是失败。回到错题对应的章节再读一遍，过 24 小时再考一次。船长的判断力是在重复中长出来的。`}
      </p>
    </div>
  );
}
