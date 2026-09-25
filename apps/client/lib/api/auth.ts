import { apiClient } from "@/lib/api/instance";
import type {
	ExhibitionAdminLoginRequest,
	ExhibitionAdminLoginResult,
	ExhibitionAdminLoginSuccess,
} from "./auth.types";

export type * from "./auth.types";

export async function loginExhibitionAdmin(entryCode: string): Promise<ExhibitionAdminLoginResult> {
	const body: ExhibitionAdminLoginRequest = { entry_code: entryCode };

	try {
		const data = await apiClient<ExhibitionAdminLoginSuccess>("/auth/exhibition/login", {
			method: "POST",
			body: JSON.stringify(body),
		});
		return { ok: true, data };
	} catch (error) {
		return { ok: false, reason: toFailureReason(error) };
	}
}

// instance.ts 가 에러를 message 문자열로만 던져서 상태 코드로 구분한다
function toFailureReason(error: unknown) {
	const message = error instanceof Error ? error.message : "";

	if (message.includes("HTTP 401") || message.includes("HTTP 400")) return "INVALID_CODE" as const;
	if (message.includes("HTTP 429")) return "TOO_MANY_ATTEMPTS" as const;
	if (message.includes("HTTP 410") || message.includes("HTTP 403")) return "EXPIRED" as const;
	return "ERROR" as const;
}
