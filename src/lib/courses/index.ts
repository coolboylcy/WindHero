import type { Course, Lesson } from "./types";
import { readingTheWind } from "./data/reading-the-wind";
import { weatherAndRouting } from "./data/weather-and-routing";
import { seamanshipAndSafety } from "./data/seamanship-and-safety";
import { celestialAndPilotage } from "./data/celestial-and-pilotage";
import { captainsMind } from "./data/captains-mind";
import { offshorePassage } from "./data/offshore-passage";
import { rebalanceCourse } from "./shuffle";

/**
 * 已经写好详细内容的课程注册表。
 *
 * 课程卡片在 /courses 列表页里，只有出现在这里的 slug 才会被渲染成
 * 「可进入详情页」的链接；其他课程目前只展示模块标题。
 *
 * 每门课都经过一次确定性洗牌（rebalanceCourse），把 quiz/exam 选项顺序按 question.id
 * 哈希打散——避免作者把正确答案集中在 B/C 的偏置问题。
 */

export const detailedCourses: Course[] = [
  readingTheWind,
  weatherAndRouting,
  seamanshipAndSafety,
  celestialAndPilotage,
  captainsMind,
  offshorePassage,
].map(rebalanceCourse);

const bySlug = new Map<string, Course>(detailedCourses.map((c) => [c.slug, c]));

export function getCourseBySlug(slug: string): Course | undefined {
  return bySlug.get(slug);
}

export function listCourseSlugs(): string[] {
  return detailedCourses.map((c) => c.slug);
}

export function hasDetail(slug: string): boolean {
  return bySlug.has(slug);
}

/**
 * 把课程展平成一个有序的 Lesson 列表，附带模块上下文。
 * 用于上一课 / 下一课导航。
 */
export type LessonWithContext = {
  lesson: Lesson;
  moduleTitle: string;
  moduleIndex: number;
};

export function listLessonsFlat(course: Course): LessonWithContext[] {
  const out: LessonWithContext[] = [];
  for (const m of course.modules) {
    for (const l of m.lessons) {
      out.push({
        lesson: l,
        moduleTitle: m.title,
        moduleIndex: m.index,
      });
    }
  }
  return out;
}

export function findLesson(
  course: Course,
  lessonSlug: string
):
  | {
      lesson: Lesson;
      moduleTitle: string;
      moduleIndex: number;
      prev?: LessonWithContext;
      next?: LessonWithContext;
    }
  | undefined {
  const flat = listLessonsFlat(course);
  const idx = flat.findIndex((x) => x.lesson.slug === lessonSlug);
  if (idx === -1) return undefined;
  const cur = flat[idx];
  return {
    lesson: cur.lesson,
    moduleTitle: cur.moduleTitle,
    moduleIndex: cur.moduleIndex,
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}
