// 작가 어드민 홈(마이페이지) 화면에서 쓰는 데이터 모양 — API 응답은 _api/getMyPage.ts 에서 이 모양으로 변환한다

export interface ArtistAdminProfile {
	artistId: string;
	// 국문 성명은 필수값이 아니라 없을 수 있음 — 마이페이지는 입력 안내 문구를 보여준다
	nameKo: string | null;
	nameEn: string | null;
	bio: string | null;
	profileImage: string | null;
	email: string | null;
	sns: { label: string; url: string }[];
	viewCount: number;
	likeCount: number;
}

// draft: 작성 중 / private: 비공개 / public: 공개
export type ArtworkStatus = "draft" | "public" | "private";

export interface MyArtwork {
	artworkId: string;
	title: string;
	image: string | null;
	// null 이면 개인 작품
	exhibition: {
		exhibitionId: string;
		name: string;
		hidden: boolean;
		// 플랜 한도 초과로 전시에 노출되지 않으면 true (숨김과는 별개 상태)
		planLimitExceeded: boolean;
	} | null;
	viewCount: number;
	likeCount: number;
	status: ArtworkStatus;
	// 미출품 작품은 기준이 없어 null
	completionRate: number | null;
	createdAt: string;
}

export interface MyExhibition {
	exhibitionId: string;
	name: string;
	image: string | null;
	startDate: string | null;
	endDate: string | null;
	// 수락 대기중이면 null
	acceptedAt: string | null;
}

// 참여 코드 검증(POST exhibitions/join/validate)을 통과한 전시 — 참여 신청 때 코드를 다시 보낸다
export interface JoinableExhibition {
	exhibitionId: string;
	name: string;
	// 전시 관리자가 지정한 자기소개 양식 (없을 수 있음)
	greetingFormat: string | null;
	joinCode: string;
}

// GET /accounts/me/terms 의 최신 동의 내역 — 마케팅 동의를 바꿀 때 필수 항목은 그대로 다시 보낸다
export interface MyTermsAgreement {
	termsVersion: string;
	age14OrOverConfirmed: boolean;
	serviceTermsAgreed: boolean;
	privacyAgreed: boolean;
	// 작품·전시 콘텐츠의 서비스 홍보 활용 동의
	promotionAgreed: boolean;
	// 광고성 정보 수신 동의는 이 값을 따라간다
	marketingAgreed: boolean;
}
