import type { Metadata } from "next";
import { cookies } from "next/headers";
// import { MOCK_ARTWORK_DETAIL } from "@/app/[exhibitionId]/artwork/_mocks/artworkDetail";
import { getArtworkDetail } from "@/lib/api/artwork";
import { getArtworkInfoLines, shouldHideArtistRole } from "@/lib/utils/artworkInfo";
import { VISITOR_COOKIE } from "@/lib/visitor";
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
	const description = data ? getArtworkInfoLines(data).join(" | ") || undefined : undefined;

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

	// 방문자 ID 를 같이 보내야 내가 누른 좋아요(liked)가 처음부터 맞게 보인다
	const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
	const data = await getArtworkDetail(uuid, artworkId, visitorId);

	if (!data) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="작품을 찾을 수 없습니다." />
			</main>
		);
	}

	return (
		<ArtworkDetailClient
			artworkId={artworkId}
			data={data}
			hideArtistRole={shouldHideArtistRole(uuid)}
		/>
	);
}
