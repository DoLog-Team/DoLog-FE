import type { Metadata } from "next";
import { MOCK_ARTWORK_DETAIL } from "@/app/[exhibitionId]/artwork/_mocks/artworkDetail";
import { ArtworkDetailClient } from "./_components/ArtworkDetailClient";

interface ArtworkDetailPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
	const data = MOCK_ARTWORK_DETAIL;
	return {
		title: data.title,
		openGraph: {
			title: data.title,
			images: [{ url: data.image }],
		},
	};
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
	const { exhibitionId } = await params;
	const data = MOCK_ARTWORK_DETAIL;

	return <ArtworkDetailClient data={data} exhibitionId={exhibitionId} />;
}
