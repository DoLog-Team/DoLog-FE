"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/amplitude";

const INACTIVITY_MS = 60_000;
const MAX_DWELL_MS = 15 * 60_000;

export function useDwellTime(pageName: string) {
	const state = useRef({
		activeMs: 0,
		lastActive: 0,
		inactive: false,
		flushed: false,
		inactivityTimer: null as ReturnType<typeof setTimeout> | null,
		maxTimer: null as ReturnType<typeof setTimeout> | null,
	});

	useEffect(() => {
		const s = state.current;
		s.activeMs = 0;
		s.lastActive = Date.now();
		s.inactive = false;
		s.flushed = false;

		const flush = () => {
			if (s.flushed) return;
			s.flushed = true;
			if (!s.inactive) s.activeMs += Date.now() - s.lastActive;
			const duration = Math.min(s.activeMs, MAX_DWELL_MS);
			track("Page Dwell Time", {
				page: pageName,
				duration_ms: duration,
				duration_sec: Math.round(duration / 1000),
			});
		};

		const onActivity = () => {
			const now = Date.now();
			if (s.inactive) {
				s.inactive = false;
				s.lastActive = now;
			}
			if (s.inactivityTimer) clearTimeout(s.inactivityTimer);
			s.inactivityTimer = setTimeout(() => {
				s.activeMs += Date.now() - s.lastActive;
				s.inactive = true;
			}, INACTIVITY_MS);
		};

		const events = ["scroll", "click", "touchstart", "keydown"] as const;
		for (const ev of events) window.addEventListener(ev, onActivity, { passive: true });

		s.maxTimer = setTimeout(flush, MAX_DWELL_MS);

		return () => {
			for (const ev of events) window.removeEventListener(ev, onActivity);
			if (s.inactivityTimer) clearTimeout(s.inactivityTimer);
			if (s.maxTimer) clearTimeout(s.maxTimer);
			flush();
		};
	}, [pageName]);
}
