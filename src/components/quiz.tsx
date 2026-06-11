"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clock,
  Play,
  RotateCcw,
  X,
} from "lucide-react";
import { ImageBackdrop } from "@/components/image-backdrop";
import type { Question } from "@/lib/courses/types";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
  /** lesson 模式：答完即翻牌；exam 模式：限时、统一交卷 */
  mode?: "lesson" | "exam";
  passMark?: number;
  /** 仅 exam 模式：限时（分钟）。给 0 视为不限时。 */
  durationMinutes?: number;
  /** 仅 exam 模式：从 questions 池中随机抽取的题数。不设或 ≥ 总数视为全部。 */
  drawCount?: number;
  title?: string;
};

/* —— 工具：基于时间种子的 Fisher-Yates 洗牌（每次考试重新打散） —— */
function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sampleQuestions(pool: Question[], n?: number): Question[] {
  const all = [...pool];
  shuffleInPlace(all);
  if (!n || n >= all.length) return all;
  return all.slice(0, n);
}

export function Quiz({
  questions,
  mode = "lesson",
  passMark = 70,
  durationMinutes,
  drawCount,
  title,
}: Props) {
  /* —— 考试题集（每次进入 / 重做都随机抽样 + 打散题序） —— */
  const [activeSet, setActiveSet] = useState<Question[]>(() =>
    mode === "exam" ? sampleQuestions(questions, drawCount) : questions
  );

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  /* —— 考试计时器 —— */
  const [started, setStarted] = useState(mode !== "exam");
  const [remaining, setRemaining] = useState<number>(
    mode === "exam" && durationMinutes ? durationMinutes * 60 : 0
  );

  /* —— 切到其他标签页的次数（用于"严格"模式提示） —— */
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

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

  /* —— 标签页切换检测 —— */
  useEffect(() => {
    if (mode !== "exam" || !started || submitted) return;
    const handler = () => {
      if (document.visibilityState === "hidden") {
        setTabSwitchCount((c) => c + 1);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [mode, started, submitted]);

  const score = useMemo(() => {
    const total = activeSet.length;
    const correct = activeSet.reduce(
      (sum, q) => (answers[q.id] === q.correct ? sum + 1 : sum),
      0
    );
    return {
      correct,
      total,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  }, [answers, activeSet]);

  const wrongList = useMemo(() => {
    if (!submitted) return [];
    return activeSet
      .map((q, i) => ({ q, i, chosen: answers[q.id] }))
      .filter((x) => x.chosen !== x.q.correct);
  }, [submitted, activeSet, answers]);

  const allAnswered =
    Object.keys(answers).length === activeSet.length && activeSet.length > 0;

  const choose = useCallback(
    (qid: string, idx: number) => {
      if (mode === "lesson" && revealed[qid]) return;
      if (mode === "exam" && submitted) return;
      setAnswers((a) => ({ ...a, [qid]: idx }));
      if (mode === "lesson") {
        setRevealed((r) => ({ ...r, [qid]: true }));
      }
    },
    [mode, revealed, submitted]
  );

  const reset = useCallback(() => {
    setAnswers({});
    setRevealed({});
    setSubmitted(false);
    setTabSwitchCount(0);
    if (mode === "exam") {
      setStarted(false);
      setRemaining(durationMinutes ? durationMinutes * 60 : 0);
      setActiveSet(sampleQuestions(questions, drawCount));
    }
  }, [mode, durationMinutes, questions, drawCount]);

  function startExam() {
    setActiveSet(sampleQuestions(questions, drawCount));
    setStarted(true);
  }

  /* —— 考试启动闸 —— */
  if (mode === "exam" && !started) {
    const drawSize =
      drawCount && drawCount < questions.length ? drawCount : questions.length;
    return (
      <section className="relative overflow-hidden border-y border-line/70 bg-paper-soft/40 py-16">
        <ImageBackdrop
          src="/images/generated/course-chart-desk-v1.png"
          className="opacity-[0.10]"
        />
        <div className="wh-instrument-panel relative mx-auto max-w-2xl rounded-sm px-6 py-8 text-center md:px-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
            考前确认
          </p>
          <h3 className="display mt-5 text-3xl text-ink md:text-4xl">
            准备好了再开始。
          </h3>
          <p className="prose-zh mt-6 text-[1rem] text-ink-soft">
            点「开始考试」后，倒计时立刻启动、不可暂停。中途刷新或离开页面会触发浏览器确认对话框；切换到其他标签页会被记录。建议把网页设为请勿打扰、关掉其他标签页，像在考场里一样独立完成。
          </p>
          <ul className="mt-8 grid gap-3 border-y border-line/70 py-6 text-left text-[0.92rem] text-ink">
            <li className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                01
              </span>
              <span>
                本次抽 <strong>{drawSize}</strong> 题
                {drawCount && drawCount < questions.length
                  ? ` （从 ${questions.length} 题题库中随机取样）`
                  : ""}
                ；及格线 {passMark}%
              </span>
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
              <span>答题过程不显示对错；交卷后一次性展示成绩、错题与解析</span>
            </li>
            <li className="grid grid-cols-[2rem_1fr] items-baseline gap-3">
              <span className="font-mono text-[0.72rem] tracking-[0.12em] text-sea-deep">
                04
              </span>
              <span>每次重做将随机抽新一组题——你看到的考题不会两次相同</span>
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
    <section className="relative overflow-hidden border-y border-line/70 bg-paper-soft/40 py-12">
      <ImageBackdrop
        src="/images/generated/course-chart-desk-v1.png"
        className="opacity-[0.08]"
      />
      <div className="wh-instrument-panel relative mx-auto max-w-3xl rounded-sm px-5 py-6 md:px-7">
        <header className="flex items-baseline justify-between gap-4">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
              {mode === "exam" ? "期末模拟考试 · 进行中" : "课后小测"}
            </p>
            <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
              {title ?? (mode === "exam" ? "做一组模拟题" : "小测一下")}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            {mode === "exam" && started && !submitted && durationMinutes ? (
              <Timer remaining={remaining} />
            ) : null}
            {submitted ||
            (mode === "lesson" && Object.keys(revealed).length > 0) ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-mist transition-colors hover:text-ink"
              >
                <RotateCcw className="h-3 w-3" />
                {mode === "exam" ? "重做（新抽题）" : "重做"}
              </button>
            ) : null}
          </div>
        </header>

        {/* —— 答题进度条（仅 exam 模式） —— */}
        {mode === "exam" && started && !submitted ? (
          <div className="mt-5">
            <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mist">
              <span>进度</span>
              <span>
                {Object.keys(answers).length} / {activeSet.length}
              </span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-sm bg-line/60">
              <div
                className="h-full bg-sea-deep transition-[width] duration-300"
                style={{
                  width: `${(Object.keys(answers).length / activeSet.length) *
                    100}%`,
                }}
              />
            </div>
            {tabSwitchCount > 0 ? (
              <p className="mt-3 inline-flex items-center gap-2 text-[0.78rem] text-coral">
                <AlertTriangle className="h-3.5 w-3.5" />
                考试期间已检测到 {tabSwitchCount} 次切换到其他标签页
              </p>
            ) : null}
          </div>
        ) : null}

        <ol className="mt-10 space-y-10">
          {activeSet.map((q, qi) => {
            const showAnswer = mode === "lesson" ? revealed[q.id] : submitted;
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
                  已答 {Object.keys(answers).length} / {activeSet.length}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="rounded-sm bg-ink px-6 py-3 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-sea-deep"
                >
                  {allAnswered
                    ? "提前交卷"
                    : `还差 ${activeSet.length - Object.keys(answers).length} 题——直接交卷`}
                </button>
              </div>
            ) : (
              <ExamResult
                pct={score.pct}
                correct={score.correct}
                total={score.total}
                passMark={passMark}
                timedOut={!!durationMinutes && remaining === 0}
                tabSwitchCount={tabSwitchCount}
                wrongList={wrongList}
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

type WrongEntry = { q: Question; i: number; chosen: number | undefined };

function ExamResult({
  pct,
  correct,
  total,
  passMark,
  timedOut,
  tabSwitchCount,
  wrongList,
}: {
  pct: number;
  correct: number;
  total: number;
  passMark: number;
  timedOut: boolean;
  tabSwitchCount: number;
  wrongList: WrongEntry[];
}) {
  const passed = pct >= passMark;
  return (
    <div className="space-y-6">
      <div className="rounded-sm border border-line/70 bg-paper p-6 md:p-8">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-deep">
          成绩{timedOut ? " · 时间到自动交卷" : ""}
        </p>
        <div className="mt-4 flex items-baseline gap-3">
          <span className="display text-5xl text-ink">{pct}</span>
          <span className="font-mono text-[0.86rem] text-mist">
            分 · {correct} / {total}
          </span>
          <span
            className={cn(
              "ml-3 font-mono text-[0.78rem] tracking-[0.14em]",
              passed ? "text-sea-deep" : "text-coral"
            )}
          >
            {passed ? "通过" : "未通过"}
          </span>
        </div>
        <p className="mt-4 text-[0.96rem] leading-[1.85] text-ink-soft">
          {passed
            ? `通过线是 ${passMark} 分，你过了。别急着关页面，先把错题看完；下次重做会重新抽题。`
            : `通过线是 ${passMark} 分，这次还没过。先看错题对应的章节，隔一段时间再做一轮。每次重做都会重新抽题。`}
        </p>
        {tabSwitchCount > 0 ? (
          <p className="mt-4 inline-flex items-center gap-2 text-[0.84rem] text-coral">
            <AlertTriangle className="h-3.5 w-3.5" />
            本次考试期间切换到其他标签页 {tabSwitchCount} 次——在真实考场里，这不被允许。
          </p>
        ) : null}
      </div>

      {wrongList.length > 0 ? (
        <div className="rounded-sm border border-line/70 bg-paper p-6 md:p-8">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-coral">
            错题汇总 · {wrongList.length} 题
          </p>
          <ol className="mt-5 space-y-5">
            {wrongList.map(({ q, i, chosen }) => (
              <li key={q.id} className="border-l-2 border-coral/40 pl-4">
                <p className="text-[0.94rem] leading-[1.8] text-ink">
                  <span className="mr-2 font-mono text-[0.72rem] tracking-[0.14em] text-mist">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {q.q}
                </p>
                <p className="mt-2 text-[0.86rem] text-ink-soft">
                  <span className="font-mono text-coral">你的答案：</span>
                  {chosen != null ? q.options[chosen] : "（未作答）"}
                </p>
                <p className="mt-1 text-[0.86rem] text-ink-soft">
                  <span className="font-mono text-sea-deep">正确：</span>
                  {q.options[q.correct]}
                </p>
                <p className="mt-2 text-[0.82rem] leading-[1.75] text-mist">
                  {q.explanation}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
