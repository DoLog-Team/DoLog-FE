import { authApiClient } from "@/lib/api/instance";
import type { ArtworkFieldSettings } from "./getArtworkExhibitionStatus";

// 출품 전(아직 작품-전시 연결이 안 된) 단계에서도 필수 입력값을 확인할 수 있도록,
// 작품이 아니라 전시 자체를 기준으로 조회한다
export async function getExhibitionFieldSettings(
	exhibitionId: string,
): Promise<ArtworkFieldSettings> {
	return authApiClient<ArtworkFieldSettings>(`/exhibitions/${exhibitionId}/field-settings`);
}
