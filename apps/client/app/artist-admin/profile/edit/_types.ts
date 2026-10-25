// 프로필 수정 화면의 입력값 모양 — 조회 결과는 _api/getMyArtistProfile.ts 에서 이 모양으로 변환한다

export interface ArtistSnsLink {
	// 화면에서 행을 구분하는 key — 저장된 행은 snsId 와 같다
	id: string;
	// 아직 저장되지 않은 행은 null
	snsId: string | null;
	label: string;
	url: string;
}

export interface ArtistProfileForm {
	nameKo: string;
	nameEn: string;
	bio: string;
	// 미리보기 주소 — 저장된 이미지 URL 또는 새로 고른 파일의 blob URL
	profileImage: string | null;
	// 새로 고른 파일 — 저장할 때만 보낸다
	profileImageFile: File | null;
	emailLocal: string;
	emailDomain: string;
	sns: ArtistSnsLink[];
	purchaseUrl: string;
}
