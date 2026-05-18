"use client";

import { usePathname } from "next/navigation";
import { useDwellTime } from "@/lib/hooks/useDwellTime";
import { useScrollDepth } from "@/lib/hooks/useScrollDepth";

function resolvePageName(pathname: string): string {
	// /:exhibitionId/artwork/:artworkId
	if (/\/artwork\/[^/]+$/.test(pathname)) return "artwork_detail";
	// /:exhibitionId/artwork
	if (/\/artwork$/.test(pathname)) return "artwork_list";
	// /:exhibitionId/artist/:artistId
	if (/\/artist\/[^/]+$/.test(pathname)) return "artist_detail";
	// /:exhibitionId/artist
	if (/\/artist$/.test(pathname)) return "artist_list";
	// /:exhibitionId/bts/:btsId
	if (/\/bts\/[^/]+$/.test(pathname)) return "bts_detail";
	// /:exhibitionId/bts
	if (/\/bts$/.test(pathname)) return "bts_list";
	// /:exhibitionId (exhibition intro)
	return "exhibition_intro";
}

export function ExhibitionPageTracker() {
	const pathname = usePathname();
	const pageName = resolvePageName(pathname);

	useDwellTime(pageName);
	useScrollDepth(pageName);

	return null;
}
