import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { DEFAULT_EXHIBITION_CONFIG, MOCK_EXHIBITION_CONFIG } from "../exhibition-config";
import { Header } from "../_components/Header";
import { ArtworksClient } from "./_components/ArtworksClient";

interface ArtworkListPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export default async function ArtworkListPage({ params }: ArtworkListPageProps) {
	const { exhibitionId } = await params;
	const config = MOCK_EXHIBITION_CONFIG[exhibitionId] ?? DEFAULT_EXHIBITION_CONFIG;
	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId) ?? MOCK_EXHIBITION_DATA[0];

	return (
		<main>
			<Header logoUrl={config.logoSrc} />
			<ArtworksClient guideImages={exhibition.guideImages} />
		</main>
	);
}
