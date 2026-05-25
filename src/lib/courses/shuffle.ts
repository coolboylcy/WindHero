import type { Course, Lesson, Question } from "./types";

/**
 * 修复"作者偏置"：人类（与 LLM）写选择题时会下意识地把正确答案放在中间两项。
 * 这里我们对每道题做一次"确定性洗牌"——以 question.id 为种子，把 4 个选项的顺序固定打乱，
 * 同步更新 correct 索引。每次构建结果都一样，但跨题分布接近均匀。
 */

function hashString(s: string): number {
  let h = 2166136261 >>> 0; // FNV-1a 32-bit
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 — 简单稳定的伪随机数发生器 */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndices(n: number, rand: () => number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestion(q: Question): Question {
  const rand = mulberry32(hashString(q.id));
  const order = shuffledIndices(4, rand);
  const options = order.map((i) => q.options[i]) as [
    string,
    string,
    string,
    string,
  ];
  const newCorrect = order.indexOf(q.correct) as 0 | 1 | 2 | 3;
  return { ...q, options, correct: newCorrect };
}

function shuffleLesson(l: Lesson): Lesson {
  return { ...l, quiz: l.quiz.map(shuffleQuestion) };
}

/**
 * 入口：拿一门课进来，返回一门"选项已确定性洗牌"的等价课。
 * 保留所有题面、解析、解释；只动选项排列与 correct 索引。
 */
export function rebalanceCourse(course: Course): Course {
  return {
    ...course,
    modules: course.modules.map((m) => ({
      ...m,
      lessons: m.lessons.map(shuffleLesson),
    })),
    exam: course.exam
      ? {
          ...course.exam,
          questions: course.exam.questions.map(shuffleQuestion),
        }
      : undefined,
  };
}
