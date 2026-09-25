// TODO: 작가 어드민 API 연결 후 제거
export interface ArtistProfileForm {
	// 최초 진입 시 소셜 로그인에서 받은 이름
	nameKo: string;
	nameEn: string;
	bio: string;
	profileImage: string | null;
}

export const MOCK_PROFILE_FORM: ArtistProfileForm = {
	nameKo: "홍길동",
	nameEn: "",
	bio: "",
	profileImage: null,
};
