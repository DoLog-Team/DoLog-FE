import type { BillingCycle, Plan, PlanPrice } from "@/lib/api/plan.types";

// 피그마 `09.29 사용중인 플랜` 기준 기간 · 할인율 (실제 값은 API 가 내려줌)
const MOCK_PERIODS: { billingCycle: BillingCycle; months: number; discountRate: number }[] = [
	{ billingCycle: "MONTHLY", months: 3, discountRate: 0 },
	{ billingCycle: "SEMIANNUAL", months: 6, discountRate: 10 },
	{ billingCycle: "ANNUAL", months: 12, discountRate: 15 },
];

// BE PlanPriceResponse 와 같은 방식으로 계산한 목 가격
const toMockPrices = (baseMonthlyPrice: number): PlanPrice[] =>
	MOCK_PERIODS.map(({ billingCycle, months, discountRate }) => {
		const price = baseMonthlyPrice * months;
		const discountedPrice = Math.round(price * (100 - discountRate)) / 100;
		return {
			billingCycle,
			price,
			discountRate,
			discountedPrice,
			monthlyPrice: Math.round(discountedPrice / months),
			months,
		};
	});

// 요금제 API 연결 전 임시 데이터 — GET /plans 응답 형태
export const MOCK_PLANS: Plan[] = [
	{
		planId: "plan-small",
		name: "소형",
		description:
			"작품 수가 적은 학과를 위한 가장 가벼운 시작.\n부담없는 가격으로 온라인 아카이빙을 경험해보세요.",
		maxArtworkCount: 40,
		minCommitmentMonths: 3,
		isPopular: false,
		displayOrder: 1,
		targetSizes: ["SMALL"],
		prices: toMockPrices(9900),
	},
	{
		planId: "plan-medium",
		name: "중형",
		description:
			"작품 수가 많은 학과를 위한 든든한 온라인 아카이빙.\n최대 70점까지 여유롭게 등록하고, 전시 기록을 한곳에 정리해 보세요.",
		maxArtworkCount: 70,
		minCommitmentMonths: 3,
		isPopular: false,
		displayOrder: 2,
		targetSizes: ["MEDIUM"],
		prices: toMockPrices(11900),
	},
	{
		planId: "plan-large",
		name: "대형",
		description:
			"대규모 전시와 학과 전체 기록을 위한 가장 넉넉한 아카이빙.\n최대 300점까지 한곳에 담아, 많은 작품의 전시 기록을 체계적으로 관리해 보세요.",
		maxArtworkCount: 300,
		minCommitmentMonths: 3,
		isPopular: false,
		displayOrder: 3,
		targetSizes: ["LARGE"],
		prices: toMockPrices(14900),
	},
];
