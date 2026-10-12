import { authApiClient, isApiError } from "@/lib/api/instance";

export type ActionFailure = "UNAUTHORIZED" | "FAILED";

export function toActionFailure(error: unknown): ActionFailure {
	return isApiError(error, 401) ? "UNAUTHORIZED" : "FAILED";
}

/************************
 * 전시 게시
 * POST exhibitions/{exhibitionId}/publish
 ************************/

interface PublishResponse {
	publishedAt: string;
	expiresAt: string | null;
}

export type PublishResult =
	| { ok: true; publishedAt: string; expiresAt: string | null }
	| { ok: false; reason: ActionFailure };

export async function publishExhibition(exhibitionId: string): Promise<PublishResult> {
	try {
		const data = await authApiClient<PublishResponse>(`/exhibitions/${exhibitionId}/publish`, {
			method: "POST",
		});
		return {
			ok: true,
			publishedAt: data.publishedAt.slice(0, 10),
			expiresAt: data.expiresAt?.slice(0, 10) ?? null,
		};
	} catch (error) {
		return { ok: false, reason: toActionFailure(error) };
	}
}

/************************
 * 참여 작가 상태 일괄 변경
 * PATCH exhibitions/{exhibitionId}/artists/status
 ************************/

export type ArtistDecision = "JOINED" | "DENIED" | "REMOVED";

export async function updateArtistStatus(
	exhibitionId: string,
	artistIds: string[],
	status: ArtistDecision,
): Promise<ActionFailure | null> {
	try {
		await authApiClient(`/exhibitions/${exhibitionId}/artists/status`, {
			method: "PATCH",
			body: JSON.stringify({ artistIds, status }),
		});
		return null;
	} catch (error) {
		return toActionFailure(error);
	}
}
