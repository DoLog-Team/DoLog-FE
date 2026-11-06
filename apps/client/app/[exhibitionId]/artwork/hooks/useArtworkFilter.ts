import { useMemo } from "react";
import type { ZoneGroup } from "@/lib/api/artwork";
import { matchesQuery } from "@/lib/utils/koreanSearch";

export function useArtworkFilter(zones: ZoneGroup[], searchQuery: string = "") {
	return useMemo(
		() =>
			zones
				.map((zone) => ({
					zoneName: zone.zoneName,
					zoneOrderId: zone.zoneOrderId,
					description: zone.description,
					artworks: zone.categories
						.flatMap((cat) => cat.artworks)
						.filter(
							(a) => matchesQuery(a.title, searchQuery) || matchesQuery(a.artistName, searchQuery),
						),
				}))
				.filter((z) => z.artworks.length > 0)
				.sort((a, b) => a.zoneOrderId - b.zoneOrderId),
		[zones, searchQuery],
	);
}
