import { useState } from "react";
import { MOCK_ARTWORKS, type Artwork } from "../_mocks/artworkList";

export function useArtworkFilter() {
    const [selected, setSelected] = useState("전체");

    const categories = ["전체", ...new Set(MOCK_ARTWORKS.map((a) => a.category))];

    const filtered = selected === "전체"
        ? MOCK_ARTWORKS
        : MOCK_ARTWORKS.filter((a) => a.category === selected);

    // zone별 그룹화
    const allZones = [...new Set(MOCK_ARTWORKS.map((a) => a.zone))];

    const grouped = allZones.reduce((acc, zone) => {
        const zoneItems = MOCK_ARTWORKS.filter((a) => a.zone === zone);
        acc[zone] = selected === "전체"
            ? zoneItems
            : zoneItems.filter((a) => a.category === selected);
        return acc;
    }, {} as Record<string, Artwork[]>);

    return { selected, setSelected, categories, grouped };
}