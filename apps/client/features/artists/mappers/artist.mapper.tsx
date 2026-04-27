export interface Artist {
	id: string;
	name: string;
	engName?: string;
	bio?: string;
	email?: string;
	imageUrl?: string;
	sns?: {
		label: string;
		value: string;
	}[];
}

/**
 * 이름 기준 (가나다순) 정렬
 */
export function sortArtistsByName(artists: Artist[]): Artist[] {
	return [...artists].sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

/**
 * 현재 아티스트 기준으로 prev / next 구하기
 */
export function getPrevNextArtist(
	artists: Artist[],
	currentArtistId: string,
): {
	prev?: Artist;
	next?: Artist;
} {
	if (!artists.length) return {};

	const sorted = sortArtistsByName(artists);

	const currentIndex = sorted.findIndex((artist) => artist.id === currentArtistId);

	if (currentIndex === -1) return {};

	return {
		prev: currentIndex > 0 ? sorted[currentIndex - 1] : undefined,
		next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined,
	};
}
