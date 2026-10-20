import type { Metadata } from "next";
import { cookies } from "next/headers";
import MainFooter from "@/components/common/Footer/MainFooter";
import { getDologArtworkDetail } from "@/lib/api/artwork";
import { VISITOR_COOKIE } from "@/lib/visitor";
import { Header } from "../../_components/Header";
import { ArtworkDetailClient } from "./_components/ArtworkDetailClient";

// 두록 작품 상세 (전시에 종속되지 않음)
// 전시 안의 작품 상세(app/[exhibitionId]/artwork/[artworkId])와는 별개 — 섹션만 재사용

interface Props {
	params: Promise<{ artworkId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { artworkId } = await params;
	const data = await getDologArtworkDetail(artworkId);

	const artistName = data?.participants.map((p) => p.nameKo).join(", ");
	const title = [artistName, data?.title].filter(Boolean).join(" | ") || "두록(Dolog)";
	const description = data?.shortIntro ?? undefined;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: data?.mainImage ? [{ url: data.mainImage }] : [],
		},
	};
}

export default async function DologArtworkPage({ params }: Props) {
	const { artworkId } = await params;
	// 방문자 ID 를 같이 보내야 내가 누른 좋아요(liked)가 처음부터 맞게 보인다
	const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
	const data = await getDologArtworkDetail(artworkId, visitorId);

	return (
		// 하단 고정 탭바에 푸터가 가리지 않게
		<div className="flex flex-col pb-12">
			<Header variant="detail" title="작품 상세" />
			{data ? (
				<ArtworkDetailClient artworkId={artworkId} data={data} />
			) : (
				<p className="py-20 text-center text-body1 text-lighter">작품을 찾을 수 없습니다.</p>
			)}
			<MainFooter />
		</div>
	);
}
