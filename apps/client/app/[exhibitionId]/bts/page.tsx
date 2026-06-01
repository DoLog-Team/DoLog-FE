import { getBtsList } from "@/lib/api/bts";
import BehindTheSceneClient from "./_components/BehindTheSceneClient";
import { MOCK_BTS_LIST } from "./_mocks/behind-the-scene";

interface Props {
	params: Promise<{ exhibitionId: string }>;
}

export default async function BtsPage({ params }: Props) {
	const { exhibitionId } = await params;
	const data = await getBtsList(exhibitionId);
	// TODO: 배포 전 _mocks/behind-the-scene.ts의 MOCK_BTS_LIST 주석 처리
	return <BehindTheSceneClient items={data?.content ?? (MOCK_BTS_LIST.length > 0 ? MOCK_BTS_LIST : [])} />;
}
