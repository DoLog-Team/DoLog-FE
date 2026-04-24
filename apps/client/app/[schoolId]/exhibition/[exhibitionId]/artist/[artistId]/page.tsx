"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { ListCard } from "@/components/common/Card/ListCard/ListCard"; // 경로 확인 필요!
import { Title } from "@/components/common/Title/Title";

export default function ArtistDetailPage() {
	const { setTheme } = useTheme();
	const params = useParams();
	const schoolId = params?.schoolId;
	const id = params?.artistId;

	// schoolId가 string | string[] | undefined일 수 있으므로 string으로 변환
	const schoolIdStr = Array.isArray(schoolId) ? schoolId[0] : schoolId || "";
	const idStr = Array.isArray(id) ? id[0] : id || "";

	// exhibition 페이지처럼 초기 테마 설정 (팀 규칙이라면)
	useEffect(() => {
		setTheme("light");
	}, [setTheme]);

	return (
		<div className="flex flex-col bg-normal min-h-screen p-8">
			<header className="mb-10">
				<Title title={`${schoolIdStr?.toUpperCase()} Artist`} />
				<p className="text-body1 text-light">작가 번호: {idStr}의 포트폴리오</p>
			</header>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* 친구가 말한 공통 컴포넌트 사용 */}
				<ListCard
					imageUrl="/images/artist1.svg"
					title="나의 첫 전시 작품"
					category="Fine Art"
					author="홍길동"
				/>
				{/* 필요한 만큼 더 배치하거나 map으로 돌리기 */}
			</section>
		</div>
	);
}
