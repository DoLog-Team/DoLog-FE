import { redirect } from "next/navigation";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import { isApiError } from "./instance";
import type { MySubscription, Plan, PlanListResponse } from "./plan.types";
import { serverApiClient } from "./server";

export type * from "./plan.types";

/************************
 * 요금제 목록
 * GET plans — 백엔드 보안 설정상 로그인이 필요하다
 ************************/

export async function getPlans(): Promise<Plan[]> {
	const { plans } = await serverApiClient<PlanListResponse>("/plans", { cache: "no-store" });
	return plans;
}

/************************
 * 이 전시의 구독
 * GET subscriptions/me — 이 전시 것 중 진행 중(ACTIVE)을 우선, 없으면 null
 ************************/

export async function getExhibitionSubscription(
	exhibitionId: string,
): Promise<MySubscription | null> {
	try {
		const subscriptions = await serverApiClient<MySubscription[]>("/subscriptions/me", {
			cache: "no-store",
		});
		const mine = subscriptions.filter((subscription) => subscription.exhibitionId === exhibitionId);
		return mine.find((subscription) => subscription.status === "ACTIVE") ?? mine[0] ?? null;
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}
}
