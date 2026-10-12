import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getAdminArtists } from "../../_api/getAdminArtists";
import { PendingArtistList } from "../_components/PendingArtistList";

export const metadata: Metadata = {
	title: "참여 대기 작가 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminPendingArtistsPage() {
	const exhibitionId = await getMyExhibitionId();
	const artists = await getAdminArtists(exhibitionId, "PENDING");

	return <PendingArtistList exhibitionId={exhibitionId} artists={artists} />;
}
