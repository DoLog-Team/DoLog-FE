import { MOCK_ARTWORK_DETAIL } from "@/app/[exhibitionId]/artwork/_mocks/artworkDetail";
import { ArtworkDetailClient } from "./_components/ArtworkDetailClient";

interface ArtworkDetailPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
	const { exhibitionId } = await params;
	const data = MOCK_ARTWORK_DETAIL;

	return <ArtworkDetailClient data={data} exhibitionId={exhibitionId} />;
}
