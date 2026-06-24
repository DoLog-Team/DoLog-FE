import { getBtsList } from "@/lib/api/bts";
import { resolveExhibitionId } from "../_api/resolveExhibitionId";
import { Header } from "../_components/Header";
import { NotFound } from "../_components/NotFound";
import BehindTheSceneClient from "./_components/BehindTheSceneClient";

interface Props {
	params: Promise<{ exhibitionId: string }>;
}

export default async function BtsPage({ params }: Props) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	if (!uuid) {
		return (
			<main className="flex flex-1 flex-col">
				<Header variant="back" />
				<NotFound message="전시를 찾을 수 없습니다." />
			</main>
		);
	}

	const data = await getBtsList(uuid);
	return <BehindTheSceneClient items={data?.content ?? []} />;
}
