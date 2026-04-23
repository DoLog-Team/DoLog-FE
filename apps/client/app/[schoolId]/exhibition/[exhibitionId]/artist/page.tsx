"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { RowCardGrid } from "@/components/common/Card/RowCard/RowCardGrid";
import { Title } from "@/components/common/Title/Title";
import { MOCK_ARTIST_DATA } from "@/constants/artist";

export default function ArtistDetailPage() {
	const { setTheme } = useTheme();
	const params = useParams();
	const schoolId = params?.schoolId;
	const id = params?.id;

	// schoolId가 string | string[] | undefined일 수 있으므로 string으로 변환
	const schoolIdStr = Array.isArray(schoolId) ? schoolId[0] : schoolId || "";
	const idStr = Array.isArray(id) ? id[0] : id || "";

	// exhibition 페이지처럼 초기 테마 설정 (팀 규칙이라면)
	useEffect(() => {
		setTheme("light");
	}, [setTheme]);

	return (
		<div className="px-4 py-6 flex flex-col">
			{/* 페이지 타이틀 */}
			<Title title="참여한 사람들" />

			{/* 작가 리스트 */}
			<section className="flex flex-col gap-4">
				<Title title="작가" size="head2" />
				<CardGrid
					items={MOCK_ARTIST_DATA.map((artist) => ({
						id: artist.id,
						title: artist.name,
						author: artist.engName,
						imageUrl: artist.imageUrl,
						category: "",
					}))}
				/>
			</section>

			{/* 구분선 */}
			<div
				style={{
					width: "calc(100% + 2rem)",
					marginLeft: "-1rem",
					marginRight: "-1rem",
					padding: "20px 0",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<div style={{ width: "100%", height: "4px", backgroundColor: "#F7F7F8" }} />
			</div>

			{/* 도움을 주신 분들 */}
			<Title title="도움을 주신 분들" />
			<section className="flex flex-col">
				<Title title="지도 교수님" size="head2" />
				<RowCardGrid items={MOCK_ARTIST_DATA} limit={3} />
			</section>

			{/* 전시 준비 위원회 */}
			<section className="flex flex-col">
				<Title title="전시 준비 위원회" size="head2" />
				<RowCardGrid items={MOCK_ARTIST_DATA.slice(1, 5)} />
			</section>

			{/* 여백 */}
			<div className="h-8" />
			<div className="h-8" />
		</div>
	);
}
