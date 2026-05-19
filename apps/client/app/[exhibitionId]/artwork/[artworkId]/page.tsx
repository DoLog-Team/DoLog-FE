import type { Metadata } from "next";
// import { MOCK_ARTWORK_DETAIL } from "@/app/[exhibitionId]/artwork/_mocks/artworkDetail";
import { getArtworkDetail } from "@/lib/api/artwork";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { Header } from "../../_components/Header";
import { NotFound } from "../../_components/NotFound";
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

	if (!uuid) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	const data = await getArtworkDetail(uuid, artworkId);

	if (!data) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="작품을 찾을 수 없습니다." />
			</main>
		);
	}

	return <ArtworkDetailClient data={data} />;
}
