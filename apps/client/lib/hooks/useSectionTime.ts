"use client";

import { useEffect } from "react";
import { track } from "@/lib/amplitude";

// 섹션에 data-section="name" 속성을 부여하면 자동으로 체류 시간을 측정합니다
export function useSectionTime(pageName: string, sectionNames: string[]) {
	useEffect(() => {
		const timers: Record<string, { start: number; total: number }> = {};
		for (const name of sectionNames) timers[name] = { start: 0, total: 0 };

		const observers: IntersectionObserver[] = [];

		for (const name of sectionNames) {
			const el = document.querySelector(`[data-section="${name}"]`);
			if (!el) continue;

			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						timers[name].start = Date.now();
					} else if (timers[name].start > 0) {
						timers[name].total += Date.now() - timers[name].start;
						timers[name].start = 0;
					}
				},
				{ threshold: 0.3 },
			);

			observer.observe(el);
			observers.push(observer);
		}

		return () => {
			const results: Record<string, number> = {};
			for (const [name, t] of Object.entries(timers)) {
				let total = t.total;
				if (t.start > 0) total += Date.now() - t.start;
				results[name] = Math.round(total / 1000);
			}

			const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
			if (sorted.length && sorted[0][1] > 0) {
				track("Most Visited Section", {
					page: pageName,
					top_section: sorted[0][0],
					section_times_sec: results,
				});
			}

			for (const ob of observers) ob.disconnect();
		};
	}, [pageName, sectionNames]);
}
