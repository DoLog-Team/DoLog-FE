import { MOCK_SCHOOL_DATA } from "@/app/[schoolId]/school-config";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { Header } from "../_components/Header";
import { ArtworksClient } from "./_components/ArtworksClient";

interface ArtworkListPageProps {
	params: Promise<{ schoolId: string }>;
}

export default async function ArtworkListPage({ params }: ArtworkListPageProps) {
	const { schoolId } = await params;
	const schoolConfig = MOCK_SCHOOL_DATA[schoolId];
	const exhibition = MOCK_EXHIBITION_DATA[1];

	return (
		<main>
			<Header logoUrl={schoolConfig.logoSrc} />
			<ArtworksClient guideImages={exhibition.guideImages} />
		</main>
	);
}