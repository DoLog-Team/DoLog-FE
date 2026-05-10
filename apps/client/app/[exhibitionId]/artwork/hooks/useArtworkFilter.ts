import { useState } from "react";
import type { ZoneGroup } from "@/lib/api/artwork";

export function useArtworkFilter(zones: ZoneGroup[], searchQuery: string = "") {
	const [selected, setSelected] = useState("전체");

	// const currentArtworks = artworks && artworks.length > 0 ? artworks : MOCK_ARTWORK_LIST.artworks; // TODO : 현재 백 데이터가 비어있어서 임시 처리
	const categories = [
    "전체",
    ...new Set(zones.flatMap((z) => z.categories.map((c) => c.categoryName))),
  ];
	const filteredZones = zones
    .map((zone) => ({
      zoneName: zone.zoneName,
      zoneOrderId: zone.zoneOrderId,
      artworks: zone.categories
        .filter((cat) => selected === "전체" || cat.categoryName === selected)
        .flatMap((cat) => cat.artworks)
        .filter(
          (a) =>
            !searchQuery ||
            a.title.includes(searchQuery) ||
            a.artistName.includes(searchQuery),
        ),
    }))
    .filter((z) => z.artworks.length > 0)
    .sort((a, b) => a.zoneOrderId - b.zoneOrderId);

  return { selected, setSelected, categories, filteredZones };
}
