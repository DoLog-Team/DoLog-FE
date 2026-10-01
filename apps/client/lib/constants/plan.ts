export type PlanTierKey = "small" | "medium" | "large";

// 요금 정책 — 6·12개월은 3개월 월 요금에서 할인율만큼 할인, 12개월은 강조 표시
export const PLAN_PERIODS = [
	{ months: 3, discountRate: 0, highlighted: false },
	{ months: 6, discountRate: 10, highlighted: false },
	{ months: 12, discountRate: 15, highlighted: true },
] as const;

export type PlanPeriod = (typeof PLAN_PERIODS)[number];
export type PlanMonths = PlanPeriod["months"];

export interface PlanTier {
	key: PlanTierKey;
	tab: string;
	name: string;
	description: string[];
	target: string;
	// 3개월 기준 월 요금
	monthlyPrice: number;
}

// 전시에 적용된 플랜 (홈 · 사용 중인 플랜 페이지 공통)
export interface CurrentPlan {
	tier: PlanTierKey;
	months: PlanMonths;
}
