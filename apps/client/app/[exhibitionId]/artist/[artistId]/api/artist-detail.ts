import { apiClient } from "api";

export interface ArtistDetail {
	profileId: string;
	artistId: string;
	nameKo: string;
	nameEn: string;
	profileImage: string;
	bio: string;
	contact: {
		email: string;
		sns: {
			snsId: string;
			platformName: string;
			url: string;
		}[];
	};
	behindTheScenes: {
		btsId: string;
		title: string;
		mainImg: string;
	}[];
	artworks: {
		artworkId: string;
		title: string;
		image: string;
	}[];
	prevArtist?: {
		id: string;
		name: string;
	};
	nextArtist?: {
		id: string;
		name: string;
	};
	public: boolean;
}

export async function getArtistDetail(profileId: string): Promise<ArtistDetail | null> {
	try {
		const res = await apiClient<ArtistDetail>(`/artist-profiles/${profileId}`);

		if (res) return res;

		return null;
	} catch (_e) {
		return null;
	}
}
