import fs from "node:fs";
import path from "node:path";
import nav from "./seo/nav.json";

export type SeoNavItem =
  | { type: "group"; title: string }
  | { type: "link"; id: string; title: string; sub: boolean };

export type SeoCourse = {
  lessonCount: number;
  items: SeoNavItem[];
  html: string;
};

export function loadSeo(): SeoCourse {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/content/seo/body.html"),
    "utf8",
  );
  return {
    lessonCount: nav.lessonCount,
    items: nav.items as SeoNavItem[],
    html,
  };
}
