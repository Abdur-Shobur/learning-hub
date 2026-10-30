'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CourseSummary } from '@/content/catalog';
import { cx } from '@/lib/cx';

export function HomeHub({ courses }: { courses: CourseSummary[] }) {
	const categories = useMemo(
		() => ['সব', ...new Set(courses.map((course) => course.tag))],
		[courses],
	);
	const [active, setActive] = useState('সব');
	const visible =
		active === 'সব'
			? courses
			: courses.filter((course) => course.tag === active);
	const ready = courses.filter((course) => course.status === 'ready').length;
	const totalDays = courses.reduce((sum, course) => sum + course.days, 0);

	return (
		<div className="mx-auto max-w-[1080px] px-[18px] sm:px-8">
			<header className="border-b border-line pt-[68px] pb-11">
				<div className="mb-5 flex items-center gap-2.5 font-mono text-[12.5px] text-amber">
					<span className="size-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(111,217,167,0.15)]" />
					ROADMAP HUB
				</div>
				<h1 className="mb-[18px] font-display text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.16] tracking-tight">
					সব শেখার <em className="text-amber not-italic">রোডম্যাপ</em> এক
					জায়গায়।
				</h1>
				<p className="max-w-[64ch] text-[17px] leading-relaxed text-dim">
					নিচে সব বাংলা কোর্স রোডম্যাপের তালিকা — প্রতিটাতে ক্লিক করলে
					দিন-ভিত্তিক লার্নিং ম্যাপ খুলবে, যেখান থেকে প্রতিটা দিনের কনটেন্ট পড়া
					ও কপি করা যায়।
				</p>
				<div className="mt-9 flex flex-wrap border-t border-line">
					<Stat value={String(courses.length)} label="রোডম্যাপ" />
					<Stat value={String(totalDays)} label="মোট দিন" />
					<Stat value={String(ready)} label="এখন উপলব্ধ" />
				</div>
			</header>

			<div className="flex flex-wrap gap-2 pt-7 pb-1.5">
				{categories.map((category) => (
					<button
						key={category}
						type="button"
						onClick={() => setActive(category)}
						className={cx(
							'rounded-full border px-[13px] py-1.5 font-mono text-[12.5px] transition-colors',
							category === active
								? 'border-amber bg-amber/10 text-amber'
								: 'border-line text-dim hover:border-violet hover:text-ink',
						)}
					>
						{category}
					</button>
				))}
			</div>

			<div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px] pt-[22px] pb-[70px]">
				{visible.map((course) => (
					<CourseCard key={course.slug} course={course} />
				))}
				{/* <div className="flex flex-col items-start rounded-[5px] border border-dashed border-line p-[22px] text-[13.5px] leading-relaxed text-faint">
					<b className="mb-2 block font-display text-[15px] font-semibold text-dim">
						নতুন দিন বা কোর্স যোগ করবেন?
					</b>
					<p>
						কোর্সের তালিকা{' '}
						<code className="rounded-[3px] bg-[#1a2130] px-1.5 font-mono text-xs text-amber">
							src/content/catalog.ts
						</code>
						। k6-এর নতুন দিন{' '}
						<code className="rounded-[3px] bg-[#1a2130] px-1.5 font-mono text-xs text-amber">
							src/content/k6/lessons
						</code>{' '}
						আর SEO গাইড{' '}
						<code className="rounded-[3px] bg-[#1a2130] px-1.5 font-mono text-xs text-amber">
							src/content/seo/body.html
						</code>
						।
					</p>
				</div> */}
			</div>

			<footer className="border-t border-line pt-[26px] pb-[50px] font-mono text-[13px] text-faint">
				Roadmap Hub
			</footer>
		</div>
	);
}

function Stat({ value, label }: { value: string; label: string }) {
	return (
		<div className="mr-[26px] border-r border-line pt-4 pr-[26px] last:mr-0 last:border-r-0">
			<div className="font-mono text-[26px] font-semibold text-violet">
				{value}
			</div>
			<div className="mt-0.5 text-[12.5px] text-faint">{label}</div>
		</div>
	);
}

function CourseCard({ course }: { course: CourseSummary }) {
	const ready = course.status === 'ready';
	const body = (
		<>
			<span
				className="absolute inset-x-0 top-0 h-0.5"
				style={{ background: course.accent }}
			/>
			<div className="mb-3.5 flex items-start justify-between gap-2.5">
				<div
					className="grid size-[38px] shrink-0 place-items-center rounded-md border font-mono font-semibold"
					style={{
						borderColor: course.accent,
						color: course.accent,
						fontSize: course.icon.length > 2 ? 11 : 13,
					}}
				>
					{course.icon}
				</div>
				<div
					className={cx(
						'rounded-full border px-[9px] py-[3px] font-mono text-[10.5px] whitespace-nowrap',
						ready ? 'border-[#2d5f47] text-green' : 'border-line text-faint',
					)}
				>
					{ready ? 'উপলব্ধ' : 'শীঘ্রই আসছে'}
				</div>
			</div>
			<h2 className="mb-2 font-display text-lg font-semibold tracking-tight">
				{course.title}
			</h2>
			<p className="mb-[18px] flex-1 text-sm leading-relaxed text-dim">
				{course.description}
			</p>
			<div className="flex items-center gap-3.5 border-t border-line pt-3.5 font-mono text-[11.5px] text-faint">
				<span className="inline-flex items-center gap-[5px]">
					<CalIcon /> {course.days} দিন
				</span>
				<span className="inline-flex items-center gap-[5px]">
					<LayersIcon /> {course.weeks} সপ্তাহ
				</span>
			</div>
			{ready ? (
				<div
					className="mt-4 inline-flex items-center gap-2 font-mono text-[13px]"
					style={{ color: course.accent }}
				>
					<BoltIcon /> কোর্স শুরু করুন
				</div>
			) : null}
		</>
	);

	const className = cx(
		'relative flex flex-col overflow-hidden rounded-[5px] border border-line bg-card px-[22px] pt-[22px] pb-5 text-inherit no-underline transition duration-150',
		ready ? 'hover:-translate-y-0.5' : 'cursor-default opacity-50',
	);

	if (!ready) return <div className={className}>{body}</div>;

	return (
		<Link
			href={`/learn/${course.slug}`}
			className={className}
			style={{ ['--accent' as string]: course.accent }}
			onMouseEnter={(event) => {
				event.currentTarget.style.borderColor = course.accent;
			}}
			onMouseLeave={(event) => {
				event.currentTarget.style.borderColor = '';
			}}
		>
			{body}
		</Link>
	);
}

function CalIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="size-[13px] opacity-80"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<rect x="3" y="4" width="18" height="18" rx="2" />
			<path d="M16 2v4M8 2v4M3 10h18" />
		</svg>
	);
}

function LayersIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="size-[13px] opacity-80"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="m12 2 9 5-9 5-9-5 9-5Z" />
			<path d="m3 12 9 5 9-5" />
			<path d="m3 17 9 5 9-5" />
		</svg>
	);
}

function BoltIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			className="size-[13px]"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M13 2 3 14h7l-1 8 11-14h-7z" />
		</svg>
	);
}
