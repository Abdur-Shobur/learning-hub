import "@/app/seo-body.css";
import { CourseShell, type MapEntry } from "@/components/course-shell";
import { ProgressProvider } from "@/components/progress";
import { SeoInteractions } from "@/components/seo-interactions";
import type { SeoCourse } from "@/content/load-seo";

export function SeoCourseView({ course }: { course: SeoCourse }) {
  const entries: MapEntry[] = course.items.map((item) =>
    item.type === "group"
      ? { type: "label", id: item.title, label: item.title }
      : { type: "link", id: item.id, title: item.title, sub: item.sub },
  );

  return (
    <ProgressProvider total={course.lessonCount}>
      <CourseShell
        theme="paper"
        layout="centered"
        brand={{ mark: "SEO", title: "SEO গাইড", subtitle: "webspacedev" }}
        menuLabel="সূচিপত্র"
        entries={entries}
      >
        <div className="seo-body" data-seo-body dangerouslySetInnerHTML={{ __html: course.html }} />
        <SeoInteractions />
      </CourseShell>
    </ProgressProvider>
  );
}
