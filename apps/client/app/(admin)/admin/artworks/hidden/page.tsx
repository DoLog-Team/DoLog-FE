import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getAdminArtworks } from "../../_api/getAdminArtworks";
import { ArtworkList } from "../_components/ArtworkList";

export const metadata: Metadata = {
	title: "숨긴 작품 관리 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminHiddenArtworksPage() {
	const exhibitionId = await getMyExhibitionId();
	const { artworks, groups, exceededCount } = await getAdminArtworks(exhibitionId, true);

	return (
		<ArtworkList
			mode="hidden"
			exhibitionId={exhibitionId}
			artworks={artworks}
			groups={groups}
			exceededCount={exceededCount}
		/>
	);
}
