import { authApiClient } from "@/lib/api/instance";

interface MyArtistProfileContactResponse {
	purchaseContactUrl: string | null;
}

// 구매 정보 탭에서 보여줄 내 프로필의 오픈채팅 주소 — 수정은 프로필 수정 페이지에서만 한다
export async function getMyPurchaseContactUrl(): Promise<string> {
	const { purchaseContactUrl } =
		await authApiClient<MyArtistProfileContactResponse>("/artist-profiles/me");
	return purchaseContactUrl ?? "";
}
