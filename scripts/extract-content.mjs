import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripTags(value) {
  return decode(
    value
      .replace(/<strong>/g, "**")
      .replace(/<\/strong>/g, "**")
      .replace(/<b>/g, "**")
      .replace(/<\/b>/g, "**")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<[^>]+>/g, ""),
  ).trim();
}

const k6Html = fs.readFileSync(
  path.join(root, "k6-load-testing-30-day-bangla-course.html"),
  "utf8",
);
const store = JSON.parse(
  k6Html.match(/<script id="raw-store" type="application\/json">([\s\S]*?)<\/script>/)[1],
);

const navNums = new Map();
for (const match of k6Html.matchAll(
  /<a href="#([^"]+)" class="nav-day"[^>]*>\s*<span class="nav-num">([^<]*)<\/span>/g,
)) {
  navNums.set(match[1], decode(match[2].trim()));
}

const sectionWrap = k6Html.match(
  /<div class="section-wrap">([\s\S]*?)<footer class="page-footer">/,
)[1];
const weekRe =
  /<div class="week-marker" id="([^"]+)">\s*<span>([^<]*)<\/span>\s*<\/div>([\s\S]*?)(?=<div class="week-marker"|$)/g;

const weeks = [];
for (const week of sectionWrap.matchAll(weekRe)) {
  const lessons = [];
  const lessonRe =
    /<section class="day-card([^"]*)" id="([^"]+)">[\s\S]*?<div class="day-num">([^<]*)<\/div>\s*<h2>([^<]*)<\/h2>/g;
  for (const lesson of week[3].matchAll(lessonRe)) {
    const id = lesson[2];
    if (!store[id]) throw new Error(`Missing markdown for ${id}`);
    lessons.push({
      id,
      num: navNums.get(id) ?? "",
      badge: decode(lesson[3].trim()),
      title: decode(lesson[4].trim()),
      file: `${id}.md`,
      bonus: lesson[1].includes("bonus"),
    });
  }
  weeks.push({
    id: week[1],
    label: decode(week[2].trim()),
    navLabel: week[1] === "week-extra" ? "অতিরিক্ত" : decode(week[2].trim()),
    lessons,
  });
}

const hero = k6Html.match(/<header class="hero">([\s\S]*?)<\/header>/)[1];
const titleHtml = hero.match(/<h1 class="hero-title">([\s\S]*?)<\/h1>/)[1];
const [title, highlight = ""] = stripTags(titleHtml).split("\n");
const ledes = [...hero.matchAll(/<p class="hero-lede">([\s\S]*?)<\/p>/g)].map((m) =>
  stripTags(m[1]),
);
const note = stripTags(hero.match(/<div class="hero-note">([\s\S]*?)<\/div>/)[1]).replace(
  /^\*\*গুরুত্বপূর্ণ —\*\*\s*/,
  "",
);
const stats = [...hero.matchAll(/<div class="n">([^<]*)<\/div><div class="l">([^<]*)<\/div>/g)].map(
  (m) => ({ n: decode(m[1].trim()), l: decode(m[2].trim()) }),
);
const roadmapWrap = k6Html.match(
  /<div class="roadmap-wrap">([\s\S]*?)<\/div>\s*<div class="section-wrap">/,
)[1];
const roadmapHeadings = [...roadmapWrap.matchAll(/<h3>([^<]*)<\/h3>/g)].map((m) =>
  decode(m[1].trim()),
);
const roadmap = decode(roadmapWrap.match(/<code>([\s\S]*?)<\/code>/)[1]).replace(/^\n/, "").replace(/\n$/, "");
const footer = stripTags(k6Html.match(/<footer class="page-footer">([\s\S]*?)<\/footer>/)[1]);

const k6Meta = {
  brand: { mark: "k6", title: "Load Testing", subtitle: "30-DAY · বাংলা" },
  menuLabel: "দিন তালিকা",
  kicker: "COMPLETE COURSE · DAY 1–30",
  title: title.trim(),
  highlight: highlight.trim(),
  ledes,
  noteLabel: "গুরুত্বপূর্ণ —",
  note,
  stats,
  roadmapHeadings,
  roadmap,
  footer,
  weeks,
};

const lessonDir = path.join(root, "src/content/k6/lessons");
fs.mkdirSync(lessonDir, { recursive: true });
for (const week of weeks) {
  for (const lesson of week.lessons) {
    fs.writeFileSync(path.join(lessonDir, lesson.file), store[lesson.id].replace(/\r\n/g, "\n"), "utf8");
  }
}
fs.writeFileSync(
  path.join(root, "src/content/k6/meta.json"),
  `${JSON.stringify(k6Meta, null, 2)}\n`,
  "utf8",
);

const seoHtml = fs.readFileSync(path.join(root, "SEO শেখার গাইড.html"), "utf8");
const main = seoHtml.match(/<main>([\s\S]*?)<\/main>/)[1].trim();
const navHtml = seoHtml.match(/<ul class="nav" id="nav">([\s\S]*?)<\/ul>/)[1];
const items = [];
for (const li of navHtml.matchAll(/<li([^>]*)>([\s\S]*?)<\/li>/g)) {
  const attrs = li[1];
  const inner = li[2].trim();
  if (attrs.includes("grp")) {
    items.push({ type: "group", title: decode(inner) });
    continue;
  }
  const link = inner.match(/href="#([^"]+)"[^>]*>([^<]+)/);
  if (!link) throw new Error(`Unparsed nav item: ${inner}`);
  items.push({
    type: "link",
    id: link[1],
    title: decode(link[2].trim()),
    sub: attrs.includes("sub"),
  });
}
const lessonCount = (main.match(/data-lesson="/g) || []).length;

fs.mkdirSync(path.join(root, "src/content/seo"), { recursive: true });
fs.writeFileSync(path.join(root, "src/content/seo/body.html"), `${main}\n`, "utf8");
fs.writeFileSync(
  path.join(root, "src/content/seo/nav.json"),
  `${JSON.stringify({ lessonCount, items }, null, 2)}\n`,
  "utf8",
);

const lessonTotal = weeks.reduce((sum, week) => sum + week.lessons.length, 0);
console.log(`k6 weeks=${weeks.length} lessons=${lessonTotal}`);
console.log(`seo nav=${items.length} lessons=${lessonCount} html=${main.length}`);
