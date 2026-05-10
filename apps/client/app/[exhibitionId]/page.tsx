import type { Metadata } from "next";
import Image from "next/image";
import { Divider } from "@/components/common/Divider/Divider";
import { getExhibitionDetail, getExhibitionHost, getHostSns } from "@/lib/api/exhibition";
import { getExhibitionMeta } from "./_api/getExhibitionMeta";
import { resolveExhibitionId } from "./_api/resolveExhibitionId";
import { ExhibitionDetailSection } from "./_components/ExhibitionDetailSection";
import { ExhibitionHostSection } from "./_components/ExhibitionHostSection";
import { ExhibitionIntroSection } from "./_components/ExhibitionIntroSection";
import { ExhibitionLocationSection } from "./_components/ExhibitionLocationSection";
import { Header } from "./_components/Header";
import { MOCK_EXHIBITION_DETAIL, MOCK_EXHIBITION_HOST, MOCK_HOST_SNS } from "./_mocks/exhibition";
import { DEFAULT_EXHIBITION_CONFIG, MOCK_EXHIBITION_CONFIG } from "./exhibition-config";

interface ExhibitionDetailPageProps {
	params: Promise<{ exhibitionId: string }>;
}

export async function generateMetadata({ params }: ExhibitionDetailPageProps): Promise<Metadata> {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);
	const meta = uuid ? await getExhibitionMeta(uuid) : null;

	return {
		title: meta?.title,
		description: meta?.description,
		openGraph: {
			title: meta?.title,
			description: meta?.description ?? undefined,
			images: meta?.image ? [{ url: meta.image }] : [],
		},
	};
}

export default async function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
	const { exhibitionId } = await params;
	const uuid = await resolveExhibitionId(exhibitionId);

	if (!uuid) {
		return <div>전시회를 찾을 수 없습니다.</div>;
	}

	const [exhibition, host, sns] = await Promise.all([
		getExhibitionDetail(uuid),
		getExhibitionHost(uuid),
		getHostSns(uuid),
	]);

	/* 임의 폴백 변수 (TODO : 추후 제거) */
	const exhibitionData = exhibition ?? MOCK_EXHIBITION_DETAIL;
	const hostData = host ?? MOCK_EXHIBITION_HOST; // TODO : 고치긴
	const snsData = sns.length > 0 ? sns : MOCK_HOST_SNS;
	const config = MOCK_EXHIBITION_CONFIG[uuid ?? ""] ?? DEFAULT_EXHIBITION_CONFIG;

	return (
		<main>
			<Header />
			{/* 대표 이미지 */}
			<div className="relative w-full aspect-[1/1.414]">
				<Image
					src={exhibitionData.exhibitionImg}
					alt={exhibitionData.title}
					fill
					className="object-cover"
					priority
				/>
			</div>
			{/* 제목 및 기본 정보 */}
			<ExhibitionIntroSection exhibition={exhibitionData} exhibitionId={exhibitionId} />
			{/* 전시 소개 */}
			<ExhibitionDetailSection exhibition={exhibitionData} />
			<Divider />
			{/* 장소 */}
			<ExhibitionLocationSection location={exhibitionData.location} />
			{/* 주최 기관 */}
			<ExhibitionHostSection hostInfo={hostData} sns={snsData} />
		</main>
	);
}
