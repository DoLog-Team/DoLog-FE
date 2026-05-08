import { useState } from "react";
import type { ArtworkListItem } from "@/lib/api/artwork";

export function useArtworkFilter(artworks: ArtworkListItem[], searchQuery: string = "") {
	const [selected, setSelected] = useState("전체");

	const categories = ["전체", ...new Set(artworks.map((a) => a.category))];
	const allZones = [...new Set(artworks.map((a) => a.zone))];

	const grouped = allZones.reduce(
		(acc, zone) => {
			const zoneItems = artworks.filter((a) => a.zone === zone);
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
