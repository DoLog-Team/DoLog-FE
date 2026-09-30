import type { PlanTier } from "@/lib/constants/plan";

// 플랜 · 요금 API 연결 전 임시 데이터 — 피그마 `09.29 사용중인 플랜` 기준
export const MOCK_PLAN_TIERS: PlanTier[] = [
	{
		key: "small",
		tab: "작품 40개",
		name: "소형",
		description: [
			"작품 수가 적은 학과를 위한 가장 가벼운 시작.",
			"부담없는 가격으로 온라인 아카이빙을 경험해보세요.",
		],
		target: "소형학과",
		monthlyPrice: 9900,
	},
	{
		key: "medium",
		tab: "작품 70개",
		name: "중형",
		description: [
			"작품 수가 많은 학과를 위한 든든한 온라인 아카이빙.",
			"최대 70점까지 여유롭게 등록하고, 전시 기록을 한곳에 정리해 보세요.",
		],
		target: "중형학과",
		monthlyPrice: 11900,
	},
	{
		key: "large",
		tab: "작품 70개 이상",
		name: "대형",
		description: [
			"대규모 전시와 학과 전체 기록을 위한 가장 넉넉한 아카이빙.",
			"최대 300점까지 한곳에 담아, 많은 작품의 전시 기록을 체계적으로 관리해 보세요.",
		],
		target: "대형학과",
		monthlyPrice: 14900,
	},
];
