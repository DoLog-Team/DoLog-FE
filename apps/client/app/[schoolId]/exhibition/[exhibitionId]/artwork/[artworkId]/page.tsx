import { MOCK_ARTWORK_DETAIL } from "@/app/[schoolId]/exhibition/[exhibitionId]/artwork/_mocks/artworkDetail";
import { ArtworkDetailClient } from "./_components/ArtworkDetailClient";

interface ArtworkDetailPageProps {
	params: Promise<{ schoolId: string }>;
}

export default async function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
	const { schoolId } = await params;
	const data = MOCK_ARTWORK_DETAIL;

	return <ArtworkDetailClient data={data} schoolId={schoolId} />;
}
