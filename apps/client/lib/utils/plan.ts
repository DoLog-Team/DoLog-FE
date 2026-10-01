import type { PlanPeriod } from "@/lib/constants/plan";

export const formatWon = (value: number) => `${value.toLocaleString("ko-KR")}원`;

// 기간 요금 — (3개월 월 요금 × 개월 수) 에서 할인율만큼 할인, 원 단위 반올림
export const getPlanPrice = (
	monthlyPrice: number,
	{ months, discountRate }: Pick<PlanPeriod, "months" | "discountRate">,
) => {
	const originalTotal = monthlyPrice * months;
	const total = Math.round(originalTotal * (1 - discountRate / 100));
	return { originalTotal, total, monthly: Math.round(total / months) };
};
