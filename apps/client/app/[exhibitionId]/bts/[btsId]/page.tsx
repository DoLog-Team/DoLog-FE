import { notFound } from "next/navigation";
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

	// TODO: 배포 전 _mocks/behind-the-scene.ts의 MOCK_BTS_DETAILS 주석 처리
	const btsItem =
		(uuid ? await getBtsDetail(uuid, btsId) : null) ??
		(MOCK_BTS_DETAILS.length > 0
			? (MOCK_BTS_DETAILS.find((m) => m.btsId === btsId) ?? MOCK_BTS_DETAILS[0])
			: null);

	if (!btsItem) notFound();

	return <BtsDetailClient btsItem={btsItem} exhibitionId={exhibitionId} />;
}
