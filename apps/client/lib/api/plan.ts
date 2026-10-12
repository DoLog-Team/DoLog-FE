import { redirect } from "next/navigation";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import { isApiError } from "./instance";
import type { MySubscription, Plan, PlanListResponse } from "./plan.types";
import { serverApiClient } from "./server";

export type * from "./plan.types";

// 서버 컴포넌트 전용 (serverApiClient 사용)

/************************
 * 요금제 목록
 * GET plans — 백엔드 보안 설정상 로그인이 필요해서 serverApiClient 로 부른다
 ************************/

export async function getPlans(): Promise<Plan[]> {
	const { plans } = await serverApiClient<PlanListResponse>("/plans", { cache: "no-store" });
	return plans;
}

/************************
 * 이 전시의 구독
 * GET subscriptions/me — 계정의 구독 목록 중 이 전시 것만, 진행 중(ACTIVE)을 우선
 * 없으면 null. 401 은 로그인 화면으로, 그 외 실패는 던져서 에러 화면을 보여준다
 * (구독이 있는데 null 로 삼키면 게시 버튼이 이유 없이 꺼지고 플랜 페이지가 구독 없음으로 보인다)
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
