// 작가 어드민 API 연결 후 제거
export interface ArtistAdminProfile {
	artistId: string;
	nameKo: string;
	nameEn: string | null;
	bio: string | null;
	profileImage: string | null;
	email: string | null;
	sns: { label: string; url: string }[];
	viewCount: number;
	likeCount: number;
}

export const MOCK_ARTIST_PROFILE: ArtistAdminProfile = {
	artistId: "1",
	nameKo: "작가명",
	nameEn: "작가명 영어로",
	bio: "오랜 시간 제 곁을 지켜준 음악들, 그리고 그 순간순간을 함께해 준 여러분을 떠올리다 보니 문득 처음 무대에 섰던 마음이 다시금 떠오릅니다.\n그 시간들 속에서 우리는 지금과는 또 다른 설렘과 떨림, 그리고 기대감을 품고 매 순간을 차곡차곡 쌓아왔습니다.",
	profileImage: null,
	email: null,
	sns: [
		{ label: "Behance", url: "https://example.com/artists" },
		{ label: "instagram", url: "https://example.com/artists" },
		{ label: "X", url: "https://example.com/artists" },
	],
	viewCount: 108,
	likeCount: 108,
};
