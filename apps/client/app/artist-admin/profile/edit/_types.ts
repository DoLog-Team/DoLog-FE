// 프로필 수정 화면의 입력값 모양 — 조회 결과는 page.tsx 에서 이 모양으로 변환한다

export interface ArtistSnsLink {
	label: string;
	url: string;
}

export interface ArtistProfileForm {
	nameKo: string;
	nameEn: string;
	bio: string;
	profileImage: string | null;
	email: string;
	sns: ArtistSnsLink[];
	purchaseUrl: string;
}
