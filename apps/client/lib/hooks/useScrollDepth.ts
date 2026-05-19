"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/amplitude";

const THRESHOLDS = [25, 50, 75, 100] as const;

export function useScrollDepth(pageName: string) {
	const reached = useRef(new Set<number>());

	useEffect(() => {
		reached.current.clear();

		const onScroll = () => {
			const el = document.documentElement;
			const scrolled = el.scrollTop + el.clientHeight;
			const total = el.scrollHeight;
			if (total <= el.clientHeight) return;

			const pct = (scrolled / total) * 100;

			for (const threshold of THRESHOLDS) {
				if (pct >= threshold && !reached.current.has(threshold)) {
					reached.current.add(threshold);
					track("Scroll Depth Reached", { page: pageName, depth_percent: threshold });
				}
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [pageName]);
}
