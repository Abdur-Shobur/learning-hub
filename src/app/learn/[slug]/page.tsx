import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { K6CourseView } from "@/components/k6-course";
import { SeoCourseView } from "@/components/seo-course";
import { courses } from "@/content/catalog";
import { loadK6 } from "@/content/load-k6";
import { loadSeo } from "@/content/load-seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.filter((course) => course.status === "ready").map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) return {};
  return { title: course.title, description: course.description };
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "k6-load-testing") return <K6CourseView course={loadK6()} />;
  if (slug === "seo") return <SeoCourseView course={loadSeo()} />;
  notFound();
}
