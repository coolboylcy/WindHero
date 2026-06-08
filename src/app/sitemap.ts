import type { MetadataRoute } from "next";
import { detailedCourses, listLessonsFlat } from "@/lib/courses";
import { listTermSlugs } from "@/lib/glossary/data";
import { listCaseSlugs } from "@/lib/cases/data";

const BASE_URL = "https://windhero.vercel.app";
const UPDATED = {
  home: new Date("2026-06-08T02:37:00.000Z"),
  courses: new Date("2026-06-04T05:50:00.000Z"),
  cases: new Date("2026-06-02T00:00:00.000Z"),
  glossary: new Date("2026-06-01T00:00:00.000Z"),
  tools: new Date("2026-06-08T02:37:00.000Z"),
  static: new Date("2026-06-01T00:00:00.000Z"),
};

/**
 * 生成 sitemap.xml —— Next.js 16 用法。
 * 包含：所有静态页 + 课程详情 + 课时 + 期末 + 工具页 + 三体系 + 学校。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: "weekly", lastModified: UPDATED.home },
    { url: `${BASE_URL}/courses`, priority: 0.95, changeFrequency: "weekly", lastModified: UPDATED.courses },
    { url: `${BASE_URL}/cases`, priority: 0.9, changeFrequency: "monthly", lastModified: UPDATED.cases },
    { url: `${BASE_URL}/glossary`, priority: 0.9, changeFrequency: "monthly", lastModified: UPDATED.glossary },
    { url: `${BASE_URL}/certifications`, priority: 0.9, changeFrequency: "monthly", lastModified: UPDATED.static },
    { url: `${BASE_URL}/schools`, priority: 0.85, changeFrequency: "monthly", lastModified: UPDATED.static },
    { url: `${BASE_URL}/tools`, priority: 0.8, changeFrequency: "monthly", lastModified: UPDATED.tools },
    { url: `${BASE_URL}/tools/wind-belts`, priority: 0.8, changeFrequency: "monthly", lastModified: UPDATED.tools },
    { url: `${BASE_URL}/tools/synoptic`, priority: 0.8, changeFrequency: "monthly", lastModified: UPDATED.tools },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly", lastModified: UPDATED.static },
    { url: `${BASE_URL}/manifesto`, priority: 0.6, changeFrequency: "yearly", lastModified: UPDATED.static },
    { url: `${BASE_URL}/journal`, priority: 0.6, changeFrequency: "monthly", lastModified: UPDATED.static },
    { url: `${BASE_URL}/voyages`, priority: 0.6, changeFrequency: "monthly", lastModified: UPDATED.static },
  ];

  const caseRoutes: MetadataRoute.Sitemap = listCaseSlugs().map((slug) => ({
    url: `${BASE_URL}/cases/${slug}`,
    priority: 0.85,
    changeFrequency: "yearly" as const,
    lastModified: UPDATED.cases,
  }));

  const glossaryRoutes: MetadataRoute.Sitemap = listTermSlugs().map((slug) => ({
    url: `${BASE_URL}/glossary/${slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
    lastModified: UPDATED.glossary,
  }));

  const courseRoutes: MetadataRoute.Sitemap = detailedCourses.flatMap((c) => {
    const base: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/courses/${c.slug}`,
        priority: 0.9,
        changeFrequency: "monthly",
        lastModified: UPDATED.courses,
      },
    ];
    if (c.exam) {
      base.push({
        url: `${BASE_URL}/courses/${c.slug}/exam`,
        priority: 0.7,
        changeFrequency: "monthly",
        lastModified: UPDATED.courses,
      });
    }
    for (const { lesson } of listLessonsFlat(c)) {
      base.push({
        url: `${BASE_URL}/courses/${c.slug}/${lesson.slug}`,
        priority: 0.8,
        changeFrequency: "monthly",
        lastModified: UPDATED.courses,
      });
    }
    return base;
  });

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...caseRoutes,
    ...glossaryRoutes,
  ];
}
