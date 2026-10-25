export interface ArtistSns {
	snsId: string;
	platformName: string;
	url: string;
}

export interface ArtistContact {
	email: string;
	snsList: ArtistSns[];
}

export interface ArtistBts {
	btsId: string;
	title: string;
	mainImg: string;
}

export interface ArtistArtwork {
	artworkId: string;
	title: string;
	image: string;
}

export interface ArtistNavItem {
	id: string;
	name: string;
}

export interface ArtistDetail {
	profileId: string;
	artistId: string;
	// 이름·소개가 없으면 빈 문자열 (응답의 null 을 변환)
	nameKo: string;
	nameEn: string;
	profileImage: string;
	bio: string;
	contact: ArtistContact;
	behindTheScenes: ArtistBts[];
	artworks: ArtistArtwork[];
	prevArtist?: ArtistNavItem;
	nextArtist?: ArtistNavItem;
	// 조회한 방문자 기준 (X-Visitor-Id)
	likeCount: number;
	liked: boolean;
}
