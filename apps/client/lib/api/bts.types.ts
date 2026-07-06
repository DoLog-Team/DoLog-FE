// ─── BTS 목록
export interface BtsListItem {
	btsId: string;
	thumbnail: string | null;
	title: string;
	artistNames: string[] | null;
	artworkTitles: string[] | null;
}

export interface BtsListResponse {
	content: BtsListItem[];
	totalElements: number;
}

// ─── BTS 상세
export interface BtsArtistSns {
	snsId: string;
	platformName: string;
	url: string;
}

export interface BtsArtistContact {
	email: string | null;
	sns: BtsArtistSns[] | null;
}

export interface BtsArtist {
	participantId: string;
	nameKo: string;
	nameEn: string | null;
	profileImage: string | null;
	bio: string | null;
	contact: BtsArtistContact | null;
}

export interface BtsRelatedArtwork {
	artworkId: string;
	title: string;
	image: string | null;
}

export interface BtsRecommendedItem {
	btsId: string;
	title: string;
	mainImg: string | null;
}

export interface BtsDetail {
	btsId: string;
	title: string;
	mainImg: string | null;
	linkLabel: string | null;
	linkUrl: string | null;
	content: string | null;
	artists: BtsArtist[] | null;
	relatedArtworks: BtsRelatedArtwork[] | null;
	recommendedBts: BtsRecommendedItem[] | null;
}
