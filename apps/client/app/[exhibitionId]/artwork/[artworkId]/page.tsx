import type { Metadata } from "next";
import { MOCK_ARTWORK_DETAIL } from "@/app/[exhibitionId]/artwork/_mocks/artworkDetail";
import { getArtworkDetail } from "@/lib/api/artwork";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { ArtworkDetailClient } from "./_components/ArtworkDetailClient";

interface ArtworkDetailPageProps {
	params: Promise<{ exhibitionId: string; artworkId: string }>;
}

export async function generateMetadata({ params }: ArtworkDetailPageProps): Promise<Metadata> {
	const { exhibitionId, artworkId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const data = uuid ? await getArtworkDetail(uuid, artworkId) : null;

	const artistName = data?.participants.map((p) => p.nameKo).join(", ");
	const title = [artistName, data?.title].filter(Boolean).join(" | ") || undefined;
	const description = [data?.material, data?.size].filter(Boolean).join(" | ") || undefined;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: data?.mainImage ? [{ url: data.mainImage }] : [],
		},
	};
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
	const { exhibitionId, artworkId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	const data = uuid
		? ((await getArtworkDetail(uuid, artworkId)) ?? MOCK_ARTWORK_DETAIL)
		: MOCK_ARTWORK_DETAIL;

	return <ArtworkDetailClient data={data} />;
}
