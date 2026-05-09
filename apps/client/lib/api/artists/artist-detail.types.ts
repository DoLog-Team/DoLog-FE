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
	nameKo: string;
	nameEn: string;
	profileImage: string;
	bio: string;
	contact: ArtistContact;
	behindTheScenes: ArtistBts[];
	artworks: ArtistArtwork[];
	prevArtist?: ArtistNavItem;
	nextArtist?: ArtistNavItem;
	public: boolean;
}
