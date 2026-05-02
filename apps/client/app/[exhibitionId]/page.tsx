import type { Metadata } from "next";
import Image from "next/image";
import { Divider } from "@/components/common/Divider/Divider";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { getExhibitionMeta } from "./_api/getExhibitionMeta";
import { resolveExhibitionId } from "./_api/resolveExhibitionId";
import { ExhibitionDetail } from "./_components/ExhibitionDetailSection";
import { ExhibitionHost } from "./_components/ExhibitionHostSection";
import { ExhibitionIntro } from "./_components/ExhibitionIntroSection";
import { ExhibitionLocation } from "./_components/ExhibitionLocationSection";
import { Header } from "./_components/Header";
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
	const config = (uuid ? MOCK_EXHIBITION_CONFIG[uuid] : undefined) ?? DEFAULT_EXHIBITION_CONFIG;
	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === uuid);

	if (!exhibition) {
		return <div>전시회를 찾을 수 없습니다.</div>;
	}

	return (
		<main>
			<Header logoUrl={config.logoSrc} />
			{/* 대표 이미지 */}
			<div className="relative w-full aspect-3/4">
				<Image
					src={exhibition.thumbnailUrl}
					alt={exhibition.title}
					fill
					className="object-cover"
					priority
				/>
			</div>
			{/* 제목 및 기본 정보 */}
			<ExhibitionIntro exhibition={exhibition} exhibitionId={exhibitionId} />
			{/* 전시 소개 */}
			<ExhibitionDetail exhibition={exhibition} />
			<Divider />
			{/* 장소 */}
			<ExhibitionLocation location={exhibition.location} />
			{/* 주최 기관 */}
			<ExhibitionHost hostInfo={exhibition.hostInfo} />
		</main>
	);
}
