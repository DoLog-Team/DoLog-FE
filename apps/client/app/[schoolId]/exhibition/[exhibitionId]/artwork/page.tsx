import Image from "next/image";
import { MOCK_EXHIBITION_DATA } from "@/constants/exhibition";
import { Header } from "../_components/Header";

interface ExhibitionDetailPageProps {
	params: Promise<{ schoolId: string; exhibitionId: string }>;
}

export default async function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
	const { exhibitionId } = await params;
	const exhibition = MOCK_EXHIBITION_DATA.find((e) => e.id === exhibitionId);
	if (!exhibition) {
		return <div>전시회를 찾을 수 없습니다.</div>;
	}

	return (
		<main>
			<Header />
			{/* 대표 이미지 */}
			<div className="relative w-full aspect-3/4">
				SC02 전시물 목록 페이지
			</div>

		</main>
	);
}
