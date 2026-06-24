import { notFound } from "next/navigation";
import { getBtsDetail } from "@/lib/api/bts";
import { resolveExhibitionId } from "../../_api/resolveExhibitionId";
import { BtsDetailClient } from "./_components/BtsDetailClient";

interface Props {
	params: Promise<{ exhibitionId: string; btsId: string }>;
}

export default async function BtsDetailPage({ params }: Props) {
	const { exhibitionId, btsId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const btsItem = uuid ? await getBtsDetail(uuid, btsId) : null;

	if (!btsItem) notFound();

	return <BtsDetailClient btsItem={btsItem} exhibitionId={exhibitionId} />;
}
