import { authApiClient, isApiError } from "@/lib/api/instance";
import type { ArtworkGroup, ExhibitionSettings } from "../_types";
import { toFieldSettings, toGroups, type ZoneListResponse } from "./settingsMapper";

// 화면에서 막 추가한 그룹의 임시 id
export const NEW_GROUP_ID_PREFIX = "new-";

export type SaveResult =
	| { ok: true; groups: ArtworkGroup[] }
	| { ok: false; reason: "UNAUTHORIZED" | "FAILED"; message: string | null };

/************************
 * 전시 관리 저장
 * PUT exhibitions/{exhibitionId}/field-settings
 * PUT exhibitions/{exhibitionId}/zones — id 가 없으면 생성, 목록에 없는 기존 그룹은 삭제
 ************************/

export async function saveExhibitionSettings(
	exhibitionId: string,
	{ groups, required, hidden }: ExhibitionSettings,
): Promise<SaveResult> {
	try {
		// 검증이 있는 항목 설정을 먼저 — 그룹부터 저장하고 여기서 실패하면 다시 저장할 때 새 그룹이 또 생긴다
		await authApiClient(`/exhibitions/${exhibitionId}/field-settings`, {
			method: "PUT",
			body: JSON.stringify(toFieldSettings({ required, hidden })),
		});

		const { zones } = await authApiClient<ZoneListResponse>(`/exhibitions/${exhibitionId}/zones`, {
			method: "PUT",
			body: JSON.stringify({
				zones: groups.map((group, index) => ({
					id: group.id.startsWith(NEW_GROUP_ID_PREFIX) ? null : group.id,
					name: group.name,
					description: group.description || null,
					orderId: index + 1,
				})),
			}),
		});

		return { ok: true, groups: toGroups(zones) };
	} catch (error) {
		if (isApiError(error, 401)) return { ok: false, reason: "UNAUTHORIZED", message: null };
		return {
			ok: false,
			reason: "FAILED",
			message: isApiError(error, 400) ? (error.serverMessage ?? null) : null,
		};
	}
}
