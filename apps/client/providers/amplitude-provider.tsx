"use client";

import { Identify } from "@amplitude/analytics-browser";
import { useEffect } from "react";
import { amplitude, initAmplitude, track } from "@/lib/amplitude";

const VISIT_KEY = "dolog_v";

interface VisitStore {
	count: number;
	first: string;
}

function classifyTrafficSource(referrer: string, search: string): string {
	const params = new URLSearchParams(search);
	const utmSource = params.get("utm_source")?.toLowerCase() ?? "";
	const utmMedium = params.get("utm_medium")?.toLowerCase() ?? "";

	if (utmSource.includes("kakao") || utmMedium.includes("kakao")) return "Kakao";

	const socialDomains = ["instagram", "facebook", "twitter", "tiktok", "youtube", "linkedin"];
	if (socialDomains.some((d) => utmSource.includes(d) || referrer.includes(d))) return "Social";

	if (utmMedium === "cpc" || utmMedium === "paid") return "Paid Search";

	const searchEngines = ["google", "naver", "daum", "bing", "yahoo"];
	if (searchEngines.some((e) => referrer.includes(e))) return "Organic Search";

	if (referrer && !referrer.includes(window.location.hostname)) return "Referral";

	if (!referrer) return "Direct";

	return "Unknown";
}

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		initAmplitude();

		/**
		 * 유저 데이터 | 재방문율 계산을 위함
		 * : device_id 기반 재방문 유저 트래킹 구현
		 */
		const now = new Date().toISOString();
		const raw = localStorage.getItem(VISIT_KEY);
		const store: VisitStore = raw ? JSON.parse(raw) : { count: 0, first: now };
		store.count += 1;
		localStorage.setItem(VISIT_KEY, JSON.stringify(store));

		const isNew = store.count === 1;
		const identify = new Identify();
		identify.setOnce("first_visit_date", store.first);
		identify.set("is_new_user", isNew);
		identify.set("user_type", isNew ? "new" : "returning");
		identify.set("visit_count", store.count);
		identify.set("last_visit_date", now);
		amplitude.identify(identify);

		/**
		 * 유입 경로 트래킹
		 */
		const referrer = document.referrer;
		const search = window.location.search;
		const params = new URLSearchParams(search);
		const trafficSource = classifyTrafficSource(referrer, search);

		track("Platform Entry", {
			traffic_source: trafficSource,
			utm_source: params.get("utm_source") ?? "", // 유입 소스
			utm_medium: params.get("utm_medium") ?? "", // 유입 매체
			utm_campaign: params.get("utm_campaign") ?? "", // 캠페인명
			utm_term: params.get("utm_term") ?? "", // 검색 키워드
			referrer_url: referrer || "direct",
			landing_page: window.location.href, // 랜딩 페이지 URL
			entry_time: now, // 유입 시각
			is_new_user: isNew,
		});
	}, []);

	return <>{children}</>;
}
