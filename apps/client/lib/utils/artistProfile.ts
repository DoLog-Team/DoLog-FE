// 국문 성명이 필수값에서 빠져 작가 이름·프로필이 비어 있을 수 있다 (Figma "국문 성명을 필수값에서 제외 10.20 추가 사항")

interface ArtistProfileFields {
	nameKo?: string | null;
	nameEn?: string | null;
	bio?: string | null;
	profileImage?: string | null;
	email?: string | null;
	snsCount?: number;
}

// 작가 프로필에 등록된 정보가 하나라도 있는지 — 하나도 없으면 두록 작가 상세의 프로필과 작품 상세의 작가 섹션을 숨긴다
export const hasArtistProfileInfo = ({
	nameKo,
	nameEn,
	bio,
	profileImage,
	email,
	snsCount = 0,
}: ArtistProfileFields) =>
	Boolean(nameKo?.trim() || nameEn?.trim() || bio?.trim() || profileImage || email?.trim()) ||
	snsCount > 0;
