// ─── 메인 / 전시 목록 ──────────────────────────────────────────────────────────
export interface BannerItem {
	id: number;
	imageUrl: string;
	orderIndex: number;
	linkUrl: string;
}

export interface ExhibitionItem {
	id: string;
	slug: string;
	title: string;
	univName: string;
	deptName: string;
	exhibitionType?: string | null;
	imageUrl: string | null;
	logoImg: string;
	startDate: string | null;
	endDate: string | null;
	address: string | null;
	dday: number | null;
}

// ─── 전시 상세 ────────────────────────────────────────────────────────────────

// 전시 위치 정보
export interface ExhibitionLocation {
	address: string; // 기본 주소
	latitude: string;
	longitude: string;
	detail_location: string | null; // 상세 주소
	location_description: string | null; // 찾아오는 길 설명
}

// 주최 기관 정보
export interface ExhibitionHost {
	hostId: string;
	hostName: string;
	hostImageUrl: string;
	description: string;
	email: string;
}

// 주최 기관 SNS
export interface HostSns {
	snsId: string;
	platformName: string;
	url: string;
}

// 전시 상세 전체 응답
export interface ExhibitionDetail {
	exhibitionId: string;
	univName: string;
	deptName: string;
	exhibitionType?: string | null;
	title: string;
	exhibitionImg: string;
	startDate: string;
	endDate: string;
	dateInfo: string;
	description: string;
	location: ExhibitionLocation;
	isPublic: boolean;
}
