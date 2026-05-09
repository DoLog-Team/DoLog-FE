import { useState } from "react";
import type { ArtworkListItem } from "@/lib/api/artwork";
import { MOCK_ARTWORK_LIST } from "../_mocks/artworkList";

export function useArtworkFilter(artworks: ArtworkListItem[], searchQuery: string = "") {
	const [selected, setSelected] = useState("전체");

	const currentArtworks = artworks && artworks.length > 0 ? artworks : MOCK_ARTWORK_LIST.artworks; // TODO : 현재 백 데이터가 비어있어서 임시 처리
	console.log(
		"지금 데이터는?",
		currentArtworks === MOCK_ARTWORK_LIST.artworks ? "가짜(목)" : "진짜(백엔드)",
	);
	const categories = ["전체", ...new Set(currentArtworks.map((a) => a.category))];
	const allZones = [...new Set(currentArtworks.map((a) => a.zone))];

	const grouped = allZones.reduce(
		(acc, zone) => {
			const zoneItems = currentArtworks.filter((a) => a.zone === zone);
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
		{} as Record<string, ArtworkListItem[]>,
	);

	return { selected, setSelected, categories, grouped };
}
