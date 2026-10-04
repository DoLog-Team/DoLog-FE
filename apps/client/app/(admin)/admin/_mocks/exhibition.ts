import type { MySubscription } from "@/lib/api/plan.types";
import { MOCK_ARTISTS, MOCK_PENDING_ARTISTS } from "./artists";
import { MOCK_ARTWORKS } from "./artworks";

// 필드 기준: 노션 `전시 활성화를 위한 기본 데이터 리스트`
export interface AdminExhibition {
	// 전시회_기본정보
	title: string | null;
	type: string | null;
	university: string | null;
	department: string | null;
	startDate: string | null;
	endDate: string | null;
	// 노션 `전시 기간 추가 정보` (자유 입력)
	operatingHours: string | null;
	note: string | null;
	description: string | null;
	// 전시회_장소 · 전시회_주최기관
	address: string | null;
	hostName: string | null;
	hostDescription: string | null;
	// OG 태그 (선택값)
	siteName: string | null;
	siteDescription: string | null;
	imageUrl: string | null;
	siteUrl: string | null;
	entryCode: string | null;
	// "YYYY-MM-DD" · 게시 전이면 null
	publishedAt: string | null;
	expiresAt: string | null;
}

export const MOCK_EXHIBITION: AdminExhibition = {
	title: "물에서 지나온 이야기",
	type: "졸업전시",
	university: "한국대학교 예술대학",
	department: "도예과",
	startDate: "2026-08-20",
	endDate: "2026-08-26",
	operatingHours: "10:00 - 18:00",
	note: "입장 마감 17:30",
	description: "물에서 빚어 불로 완성한 네 해의 기록",
	address: "서울특별시 종로구 대학로 1 한국대학교 예술관",
	hostName: "한국대학교 도예과",
	hostDescription: "흙과 불로 생각을 빚는 사람들",
	siteName: "물에서 지나온 이야기",
	siteDescription: "한국대학교 도예과 졸업전시",
	imageUrl: "/images/pottery.png",
	siteUrl: "https://dolog.site/o/gdk95gzi",
	entryCode: "DOLOGFOREVER",
	publishedAt: null,
	expiresAt: null,
};

// 구독 API 연결 전 임시 데이터 — GET /subscriptions/me 중 이 전시의 구독 (없으면 null)
export const MOCK_SUBSCRIPTION: MySubscription | null = {
	subscriptionId: "subscription-1",
	exhibitionId: "exhibition-1",
	exhibitionName: "물에서 지나온 이야기",
	planId: "plan-small",
	planName: "소형",
	billingCycle: "MONTHLY",
	status: "ACTIVE",
	startedAt: "2026-08-15T15:00:00",
	endedAt: "2026-11-15T14:59:59",
};

const visibleArtworks = MOCK_ARTWORKS.filter((artwork) => !artwork.isHidden);

export interface AdminExhibitionCounts {
	artists: number;
	pendingArtists: number;
	// 전시 중인 작품 = 숨긴 작품만 빼고 셈 (플랜 한도 초과 미노출은 포함)
	exhibitedArtworks: number;
	exceededArtworks: number;
	hiddenArtworks: number;
}

export const MOCK_EXHIBITION_COUNTS: AdminExhibitionCounts = {
	artists: MOCK_ARTISTS.length,
	pendingArtists: MOCK_PENDING_ARTISTS.length,
	exhibitedArtworks: visibleArtworks.length,
	exceededArtworks: visibleArtworks.filter((artwork) => !artwork.isExposed).length,
	hiddenArtworks: MOCK_ARTWORKS.length - visibleArtworks.length,
};
