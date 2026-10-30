import { CourseShell, type MapEntry } from "@/components/course-shell";
import { CodeBlock, Inline, Markdown } from "@/components/markdown";
import { CopyButton } from "@/components/copy-button";
import type { K6Course } from "@/content/load-k6";

export function K6CourseView({ course }: { course: K6Course }) {
  const entries: MapEntry[] = course.weeks.flatMap((week) => [
    { type: "label" as const, id: `${week.id}-label`, label: week.navLabel },
    ...week.lessons.map((lesson) => ({
      type: "link" as const,
      id: lesson.id,
      num: lesson.num,
      title: lesson.id === "bonus-0" ? "Browser Testing" : lesson.title,
    })),
  ]);

  return (
    <CourseShell
      theme="dark"
      layout="bleed"
      brand={course.brand}
      menuLabel={course.menuLabel}
      entries={entries}
    >
      <header className="max-w-[840px] border-b border-line px-[22px] pt-11 pb-8 sm:px-12 sm:pt-16 sm:pb-10">
        <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[12.5px] text-amber">
          <span className="size-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(111,217,167,0.15)]" />
          {course.kicker}
        </div>
        <h1 className="mb-5 font-display text-[clamp(30px,4.4vw,44px)] font-semibold leading-[1.18] tracking-tight">
          {course.title}
          <br />
          <em className="text-amber not-italic">{course.highlight}</em>
        </h1>
        {course.ledes.map((lede) => (
          <p key={lede.slice(0, 32)} className="mb-3.5 max-w-[62ch] text-[17px] leading-relaxed text-dim">
            <Inline text={lede} />
          </p>
        ))}
        <div className="mt-[26px] rounded-[3px] border border-[#6b5730] border-l-[3px] border-l-amber bg-amber/6 px-4 py-3.5 text-[14.5px] leading-relaxed text-dim">
          <b className="font-semibold text-amber">{course.noteLabel} </b>
          {course.note}
        </div>
        <div className="mt-[34px] grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {course.stats.map((stat) => (
            <div key={stat.l} className="border-r border-line px-3 pt-4 last:border-r-0 sm:px-[18px]">
              <div className="font-mono text-[22px] font-semibold text-violet sm:text-[26px]">{stat.n}</div>
              <div className="mt-0.5 text-[12.5px] text-faint">{stat.l}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="max-w-[840px] px-[22px] pt-2 pb-8 sm:px-12">
        {course.roadmapHeadings.map((heading) => (
          <h2 key={heading} className="mt-6 mb-3 font-display text-[15px] font-semibold text-dim">
            {heading}
          </h2>
        ))}
        <CodeBlock lang="text" code={course.roadmap} />
      </div>

      <div className="max-w-[840px] px-[22px] sm:px-12">
        {course.weeks.map((week) => (
          <section key={week.id}>
            <div id={week.id} className="mt-[46px] mb-[22px] flex scroll-mt-20 items-center gap-3.5 lg:scroll-mt-6">
              <span className="font-mono text-[12.5px] whitespace-nowrap text-amber">{week.label}</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            {week.lessons.map((lesson) => (
              <article
                key={lesson.id}
                id={lesson.id}
                className="mb-[22px] scroll-mt-20 overflow-hidden rounded border border-line bg-card lg:scroll-mt-6"
              >
                <div
                  className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-4 py-5 sm:px-[22px] ${
                    lesson.bonus ? "" : "bg-gradient-to-b from-violet/5 to-transparent"
                  }`}
                >
                  <div
                    className={`shrink-0 rounded-[3px] border px-[9px] py-1 font-mono text-sm font-semibold ${
                      lesson.bonus ? "border-[#2d5f47] text-green" : "border-[#6b5730] text-amber"
                    }`}
                  >
                    {lesson.badge}
                  </div>
                  <h2 className="min-w-0 flex-1 font-display text-[19px] font-semibold tracking-tight text-ink">
                    {lesson.title}
                  </h2>
                  <CopyButton text={lesson.markdown} />
                </div>
                <div className="px-[22px] pt-5 pb-[26px]">
                  <Markdown source={lesson.markdown} />
                </div>
              </article>
            ))}
          </section>
        ))}
        <footer className="mt-[60px] border-t border-line pt-6 pb-16 font-mono text-[13px] text-faint">
          {course.footer}
        </footer>
      </div>
    </CourseShell>
  );
}
