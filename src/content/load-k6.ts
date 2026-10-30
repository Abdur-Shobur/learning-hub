import fs from "node:fs";
import path from "node:path";
import meta from "./k6/meta.json";

export type K6Lesson = (typeof meta.weeks)[number]["lessons"][number] & {
  markdown: string;
};

export type K6Week = Omit<(typeof meta.weeks)[number], "lessons"> & {
  lessons: K6Lesson[];
};

export type K6Course = Omit<typeof meta, "weeks" | "roadmap"> & {
  roadmap: string;
  weeks: K6Week[];
};

export function loadK6(): K6Course {
  const lessonsDir = path.join(process.cwd(), "src/content/k6/lessons");
  return {
    ...meta,
    roadmap: meta.roadmap.replace(/\r\n/g, "\n"),
    weeks: meta.weeks.map((week) => ({
      ...week,
      lessons: week.lessons.map((lesson) => ({
        ...lesson,
        markdown: fs
          .readFileSync(path.join(lessonsDir, lesson.file), "utf8")
          .replace(/\r\n/g, "\n"),
      })),
    })),
  };
}
