import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getAdminArtists } from "../_api/getAdminArtists";
import { ArtistList } from "./_components/ArtistList";

export const metadata: Metadata = {
	title: "참여 작가 관리 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminArtistsPage() {
	const exhibitionId = await getMyExhibitionId();
	const artists = await getAdminArtists(exhibitionId, "JOINED");

	return <ArtistList exhibitionId={exhibitionId} artists={artists} />;
}
