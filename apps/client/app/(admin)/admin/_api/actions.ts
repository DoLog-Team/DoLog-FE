import { authApiClient, isApiError } from "@/lib/api/instance";

// PARTIAL: 나눠 보내다 중간에 실패해서 앞 묶음만 반영됨
export type ActionFailure = "UNAUTHORIZED" | "FAILED" | "PARTIAL";

export function toActionFailure(error: unknown): ActionFailure {
	return isApiError(error, 401) ? "UNAUTHORIZED" : "FAILED";
}

// 일괄 API 는 한 번에 최대 100개 — 모바일 전체 선택은 검색 결과 전부라 넘을 수 있다
const BULK_LIMIT = 100;

async function sendInChunks(
	ids: string[],
	send: (chunk: string[]) => Promise<unknown>,
): Promise<ActionFailure | null> {
	for (let start = 0; start < ids.length; start += BULK_LIMIT) {
		try {
			await send(ids.slice(start, start + BULK_LIMIT));
		} catch (error) {
			const failure = toActionFailure(error);
			return start > 0 && failure === "FAILED" ? "PARTIAL" : failure;
		}
	}
	return null;
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
	// message: 필수값 누락(400) 등 백엔드 안내 문구
	| { ok: false; reason: ActionFailure; message: string | null };

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
		return {
			ok: false,
			reason: toActionFailure(error),
			message: isApiError(error, 400) ? (error.serverMessage ?? null) : null,
		};
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
	return sendInChunks(artistIds, (chunk) =>
		authApiClient(`/exhibitions/${exhibitionId}/artists/status`, {
			method: "PATCH",
			body: JSON.stringify({ artistIds: chunk, status }),
		}),
	);
}

/************************
 * 작품 숨김 / 보이기 일괄
 * PATCH exhibitions/{exhibitionId}/artworks/hidden
 ************************/

export async function updateArtworksHidden(
	exhibitionId: string,
	artworkIds: string[],
	hidden: boolean,
): Promise<ActionFailure | null> {
	return sendInChunks(artworkIds, (chunk) =>
		authApiClient(`/exhibitions/${exhibitionId}/artworks/hidden`, {
			method: "PATCH",
			body: JSON.stringify({ artworkIds: chunk, hidden }),
		}),
	);
}

/************************
 * 작품 그룹 일괄 지정
 * PATCH exhibitions/{exhibitionId}/artworks/zone
 ************************/

export async function assignArtworksZone(
	exhibitionId: string,
	artworkIds: string[],
	zoneId: string,
): Promise<ActionFailure | null> {
	return sendInChunks(artworkIds, (chunk) =>
		authApiClient(`/exhibitions/${exhibitionId}/artworks/zone`, {
			method: "PATCH",
			body: JSON.stringify({ artworkIds: chunk, zoneId }),
		}),
	);
}
