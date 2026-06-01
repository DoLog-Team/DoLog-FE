import { getBtsDetail } from "@/lib/api/bts";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { MOCK_BTS_DETAILS } from "../_mocks/behind-the-scene";
import { BtsDetailClient } from "./_components/BtsDetailClient";

interface Props {
	params: Promise<{ exhibitionId: string; btsId: string }>;
}

export default async function BtsDetailPage({ params }: Props) {
	const { exhibitionId, btsId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	const btsItem =
		(uuid ? await getBtsDetail(uuid, btsId) : null) ??
		MOCK_BTS_DETAILS.find((m) => m.btsId === btsId) ??
		MOCK_BTS_DETAILS[0];

	return <BtsDetailClient btsItem={btsItem} exhibitionId={exhibitionId} />;
}
