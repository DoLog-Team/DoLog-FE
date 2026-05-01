import { useState } from "react";
import { type Artwork, MOCK_ARTWORKS } from "../_mocks/artworkList";

export function useArtworkFilter(searchQuery: string = "") {
	const [selected, setSelected] = useState("전체");

	const categories = ["전체", ...new Set(MOCK_ARTWORKS.map((a) => a.category))];

	const allZones = [...new Set(MOCK_ARTWORKS.map((a) => a.zone))];

	const grouped = allZones.reduce(
		(acc, zone) => {
			const zoneItems = MOCK_ARTWORKS.filter((a) => a.zone === zone);
			acc[zone] = zoneItems.filter((a) => {
				const matchCategory = selected === "전체" || a.category === selected;
				const matchSearch =
					!searchQuery ||
					a.title.includes(searchQuery) ||
					a.artists.some((artist) => artist.name.includes(searchQuery));
				return matchCategory && matchSearch;
			});
			return acc;
		},
		{} as Record<string, Artwork[]>,
	);

	return { selected, setSelected, categories, grouped };
}
