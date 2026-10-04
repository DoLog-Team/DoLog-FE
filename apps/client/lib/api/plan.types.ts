// 노션 API 명세서 ver.2 — GET /plans · GET /subscriptions/me (2026-10-01 기준)

// 이름과 달리 개월 수는 months 로 따로 내려옴 (MONTHLY 가 3개월일 수 있음)
export type BillingCycle = "MONTHLY" | "SEMIANNUAL" | "ANNUAL";
export type TargetSize = "SMALL" | "MEDIUM" | "LARGE";
export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELED" | "PENDING_PAYMENT";

export interface PlanPrice {
	billingCycle: BillingCycle;
	// 할인 전 결제 금액
	price: number;
	discountRate: number | null;
	// 할인 적용된 결제 금액
	discountedPrice: number;
	// 월 환산 금액 (discountedPrice ÷ months)
	monthlyPrice: number;
	months: number;
}

export interface Plan {
	planId: string;
	name: string;
	description: string | null;
	// null = 작품 수 제한 없음
	maxArtworkCount: number | null;
	minCommitmentMonths: number;
	isPopular: boolean;
	displayOrder: number;
	targetSizes: TargetSize[];
	// 개월 수 오름차순
	prices: PlanPrice[];
}

export interface PlanListResponse {
	plans: Plan[];
}

export interface MySubscription {
	subscriptionId: string;
	exhibitionId: string;
	exhibitionName: string;
	planId: string;
	planName: string;
	billingCycle: BillingCycle;
	status: SubscriptionStatus;
	startedAt: string | null;
	endedAt: string | null;
}
