export type CourseStatus = "ready" | "soon";

export type CourseSummary = {
  slug: string;
  title: string;
  tag: string;
  icon: string;
  accent: string;
  description: string;
  days: number;
  weeks: number;
  status: CourseStatus;
};

/**
 * Home page list. Set status to "ready" when the course page exists.
 * To add a day to k6, create src/content/k6/lessons/<id>.md and register it in src/content/k6/meta.json.
 * To edit the SEO guide, update src/content/seo/body.html and, if the map changes, src/content/seo/nav.json.
 */
export const courses: CourseSummary[] = [
  {
    slug: "k6-load-testing",
    title: "k6 Load Testing",
    tag: "Performance / DevOps",
    icon: "k6",
    accent: "#FFB454",
    description:
      "৩০ দিনে শূন্য থেকে প্রোডাকশন পর্যন্ত — script লেখা থেকে scenario, threshold, Grafana monitoring ও CI/CD gate পর্যন্ত।",
    days: 30,
    weeks: 4,
    status: "ready",
  },
  {
    slug: "seo",
    title: "SEO শেখার গাইড",
    tag: "SEO / Content",
    icon: "SEO",
    accent: "#6FD9A7",
    description:
      "Google ও AI Search-এ নিজের সাইট দৃশ্যমান করতে Technical, Content, Local ও AI Search SEO — ৪ সপ্তাহের হাতে-কলমে গাইড।",
    days: 30,
    weeks: 4,
    status: "ready",
  },
];
