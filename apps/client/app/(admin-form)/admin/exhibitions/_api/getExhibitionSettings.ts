import { redirect } from "next/navigation";
import { isApiError } from "@/lib/api/instance";
import { serverApiClient } from "@/lib/api/server";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { ExhibitionSettings } from "../_types";
import {
	type FieldSettingsResponse,
	fromFieldSettings,
	toGroups,
	type ZoneListResponse,
} from "./settingsMapper";

/************************
 * 전시 관리 (작품 그룹, 작품 항목 설정)
 * GET exhibitions/{exhibitionId}/zones
 * GET exhibitions/{exhibitionId}/field-settings
 ************************/

export async function getExhibitionSettings(exhibitionId: string): Promise<ExhibitionSettings> {
	try {
		const [{ zones }, fieldSettings] = await Promise.all([
			serverApiClient<ZoneListResponse>(`/exhibitions/${exhibitionId}/zones`, {
				cache: "no-store",
			}),
			serverApiClient<FieldSettingsResponse>(`/exhibitions/${exhibitionId}/field-settings`, {
				cache: "no-store",
			}),
		]);
		return { groups: toGroups(zones), ...fromFieldSettings(fieldSettings) };
	} catch (error) {
		if (isApiError(error, 401)) redirect(ADMIN_LOGIN_HREF);
		throw error;
	}
}
