"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { useProgress } from "@/components/progress";

export type MapEntry =
  | { type: "label"; id: string; label: string }
  | { type: "link"; id: string; num?: string; title: string; sub?: boolean };

type Brand = { mark: string; title: string; subtitle: string };

export function CourseShell({
  theme,
  layout,
  brand,
  menuLabel,
  entries,
  children,
}: {
  theme: "dark" | "paper";
  layout: "bleed" | "centered";
  brand: Brand;
  menuLabel: string;
  entries: MapEntry[];
  children: ReactNode;
}) {
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [showTop, setShowTop] = useState(false);
  const linkIds = entries
    .filter((entry): entry is Extract<MapEntry, { type: "link" }> => entry.type === "link")
    .map((entry) => entry.id)
    .join("|");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const nodes = linkIds
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [linkIds]);

  useEffect(() => {
    if (theme !== "dark") return;
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  const percent = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className={cx("min-h-screen", theme === "paper" ? "theme-paper" : "theme-dark")}>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-2.5 border-b border-line bg-raised px-4 py-3 lg:hidden">
        <BrandLink brand={brand} theme={theme} compact />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="learning-map"
          onClick={() => setOpen(true)}
          className={cx(
            "inline-flex items-center gap-1.5 border border-line text-dim",
            theme === "paper"
              ? "rounded-full px-3.5 py-1.5 text-sm font-semibold"
              : "rounded-md px-3 py-2 font-mono text-[12.5px]",
          )}
        >
          <MenuIcon />
          {menuLabel}
        </button>
      </header>

      {open ? (
        <button
          type="button"
          aria-label="ম্যাপ বন্ধ করুন"
          className="fixed inset-0 z-40 bg-[#06080c]/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        className={cx(
          layout === "bleed" && "lg:grid lg:grid-cols-[288px_minmax(0,1fr)]",
          layout === "centered" &&
            "mx-auto max-w-[1180px] px-4 py-6 lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:px-4 lg:py-10",
        )}
      >
        <nav
          id="learning-map"
          aria-label="লার্নিং ম্যাপ"
          className={cx(
            "map-scroll bg-raised px-[18px] pt-7 pb-16",
            open ? "fixed inset-y-0 left-0 z-50 w-[min(82vw,320px)] overflow-y-auto shadow-[12px_0_32px_rgba(0,0,0,0.4)]" : "max-lg:hidden",
            layout === "bleed" && "lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto lg:border-r lg:border-line",
            layout === "centered" &&
              "lg:sticky lg:top-6 lg:block lg:h-auto lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:bg-transparent lg:p-0",
          )}
        >
          <div
            className={cx(
              "mb-[18px] flex items-start gap-2.5 border-b border-line px-2 pb-[22px]",
              theme === "paper" && "lg:mb-1 lg:border-b-0 lg:px-0 lg:pb-2",
            )}
          >
            <div className="min-w-0 flex-1">
              <BrandLink brand={brand} theme={theme} />
              <Link href="/" className="mt-2 inline-block font-mono text-[11px] text-faint hover:text-ink">
                ← সব কোর্স
              </Link>
            </div>
            <button
              type="button"
              aria-label="ম্যাপ বন্ধ করুন"
              onClick={() => setOpen(false)}
              className="grid size-[30px] place-items-center rounded-md border border-line text-dim lg:hidden"
            >
              <CloseIcon />
            </button>
          </div>

          {progress ? (
            <div className="mb-3 px-2">
              <div className="mb-1.5 flex justify-between text-sm text-dim">
                <span>অগ্রগতি</span>
                <span>
                  {progress.done} / {progress.total} লেসন
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded bg-line">
                <div className="h-full bg-green transition-[width]" style={{ width: `${percent}%` }} />
              </div>
            </div>
          ) : null}

          <div className="grid gap-0.5">
            {entries.map((entry, index) => {
              if (entry.type === "label") {
                const firstLabel = entries.findIndex((item) => item.type === "label") === index;
                return (
                  <div
                    key={entry.id}
                    className={cx(
                      "px-2.5 pt-4 pb-1.5 font-mono text-[11px] text-faint",
                      theme === "paper" && "mt-2.5 px-2.5 pt-2 font-bangla text-[0.72rem] font-semibold tracking-[0.06em] uppercase",
                      theme === "dark" && !firstLabel && "mt-1.5 border-t border-[#1a2029]",
                    )}
                  >
                    {entry.label}
                  </div>
                );
              }
              const isActive = active === entry.id;
              return (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  title={entry.title}
                  onClick={() => setOpen(false)}
                  className={cx(
                    "min-w-0 rounded-md text-sm text-dim hover:text-ink",
                    theme === "dark" && "flex items-baseline gap-2.5 px-2.5 py-1.5 hover:bg-[#171d29]",
                    theme === "dark" && isActive && "bg-[#181425] text-ink",
                    theme === "paper" && "block px-2.5 py-[5px] leading-snug hover:bg-[var(--accent-soft)]",
                    theme === "paper" && entry.sub && "pl-6 text-[0.84rem]",
                    theme === "paper" && isActive && "bg-[var(--accent-soft)] font-semibold text-violet",
                  )}
                >
                  {theme === "dark" ? (
                    <>
                      <span className={cx("w-5 shrink-0 font-mono text-xs text-faint", isActive && "text-amber")}>
                        {entry.num}
                      </span>
                      <span className="truncate">{entry.title}</span>
                    </>
                  ) : (
                    entry.title
                  )}
                </a>
              );
            })}
          </div>
        </nav>
        <div className="min-w-0">{children}</div>
      </div>

      {theme === "dark" ? (
        <button
          type="button"
          aria-label="উপরে যান"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cx(
            "fixed right-6 bottom-6 z-40 grid size-[42px] place-items-center rounded-full border border-line bg-card text-dim transition-opacity hover:border-violet hover:text-ink",
            showTop ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function BrandLink({ brand, theme, compact = false }: { brand: Brand; theme: "dark" | "paper"; compact?: boolean }) {
  if (theme === "paper") {
    return (
      <Link href="/" className="font-bangla text-[1.05rem] font-bold text-ink">
        SEO গাইড <span className="text-green">·</span> webspacedev
      </Link>
    );
  }
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className={cx(
          "grid shrink-0 place-items-center rounded-md border border-amber font-mono font-semibold text-amber",
          compact ? "size-[26px] text-[11px]" : "size-[30px] text-[13px]",
        )}
      >
        {brand.mark}
      </span>
      <span>
        <span className={cx("block font-display font-semibold", compact ? "text-[13px]" : "text-[14.5px]")}>{brand.title}</span>
        <span className={cx("mt-0.5 block font-mono text-faint", compact ? "text-[10px]" : "text-[11.5px]")}>{brand.subtitle}</span>
      </span>
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
