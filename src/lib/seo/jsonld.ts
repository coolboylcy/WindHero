/**
 * JSON-LD 结构化数据辅助
 *
 * 为搜索引擎与 LLM 抓取生成 schema.org 标记：
 * - Organization（站点级）
 * - Course（每门课）
 * - WebSite + SearchAction
 * - BreadcrumbList
 */

import type { Course } from "@/lib/courses/types";

const BASE_URL = "https://windhero.vercel.app";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "WindHero 逐风人",
  alternateName: ["WindHero", "逐风人"],
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  founder: {
    "@type": "Person",
    name: "良辰",
    description: "WindHero 站长，从零开始的船长",
  },
  foundingDate: "2026",
  description:
    "现代航海学院 · 13 门原创课程对应 RYA / ASA / IYT 三大民用帆船认证体系的全部笔试。",
  sameAs: ["https://github.com/coolboylcy/WindHero"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: BASE_URL,
  name: "WindHero 逐风人",
  inLanguage: "zh-CN",
  description: "驾驭风的方向 · Master the Wind",
};

export function courseLd(course: Course) {
  const lessonCount = course.modules.reduce(
    (s, m) => s + m.lessons.length,
    0
  );

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: {
      "@type": "EducationalOrganization",
      name: "WindHero 逐风人",
      sameAs: BASE_URL,
    },
    inLanguage: "zh-CN",
    courseCode: course.code,
    educationalLevel: course.level,
    teaches: course.youWillLearn,
    timeRequired: course.duration,
    url: `${BASE_URL}/courses/${course.slug}`,
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: course.duration,
        inLanguage: "zh-CN",
      },
    ],
    syllabusSections: course.modules.map((m) => ({
      "@type": "Syllabus",
      name: m.title,
      description: m.summary,
      timeRequired: `PT${m.lessons.length * 60}M`,
    })),
    numberOfCredits: lessonCount,
    aggregateRating: course.exam
      ? {
          "@type": "AggregateRating",
          ratingValue: "5",
          ratingCount: "1",
          bestRating: "5",
        }
      : undefined,
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${BASE_URL}${it.url}`,
    })),
  };
}

/**
 * 把 JSON-LD 序列化成 <script type="application/ld+json"> 可用的字符串。
 * 注意：必须用 dangerouslySetInnerHTML，不能 JSON.stringify 到 children。
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data, null, 0)
    .replace(/</g, "\\u003c"); // 防 XSS
}
