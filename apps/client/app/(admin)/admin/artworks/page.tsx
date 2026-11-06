import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getAdminArtworks } from "../_api/getAdminArtworks";
import { ArtworkList } from "./_components/ArtworkList";

export const metadata: Metadata = {
	title: "전체 작품 관리 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminArtworksPage() {
	const exhibitionId = await getMyExhibitionId();
	const data = await getAdminArtworks(exhibitionId, false);

	return (
		<ArtworkList
			mode="all"
			exhibitionId={exhibitionId}
			artworks={data?.artworks ?? []}
			groups={data?.groups ?? []}
			exceededCount={data?.exceededCount ?? 0}
			isLoadError={data === null}
		/>
	);
}
