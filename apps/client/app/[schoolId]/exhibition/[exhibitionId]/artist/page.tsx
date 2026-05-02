"use client";

import { useMemo } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { RowCardGrid } from "@/components/common/Card/RowCard/RowCardGrid";
import { Divider } from "@/components/common/Divider/Divider";
import { Title } from "@/components/common/Title/Title";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { MOCK_ARTIST_DATA } from "@/constants/artist";
import { Header } from "../_components/Header";
import { MOCK_PARTNERS } from "./_mocks/partners";

interface ArtistPageProps {
	params: { schoolId: string; exhibitionId: string };
}

export default function ArtistPage({ params }: ArtistPageProps) {
	const { schoolId, exhibitionId } = params;

	// 1. 탭
	const TABS = useMemo(
		() => [
			{ id: "artists", label: "작가" },
			{ id: "partners", label: "도움을 주신 분들" },
		],
		[],
	);

	const tabIds = useMemo(() => TABS.map((t) => t.id), [TABS]);

	// 2. 훅
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 100);

	return (
		<>
			<Header variant="logo" />
			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />

			<div className="flex flex-col w-full px-4">
				{/* --- 1. 참여한 사람들 섹션 --- */}
				<section
					ref={(el) => {
						if (sectionRefs.artists) sectionRefs.artists.current = el;
					}}
					className="flex flex-col pt-4 pb-6"
				>
					<Title title="참여한 사람들" />
					<Title title="작가" size="head2" />
					<CardGrid
						items={MOCK_ARTIST_DATA.map((artist) => ({
							id: artist.id,
							title: artist.name ?? "이름",
							author: artist.engName ?? "Name",
							imageUrl: artist.imageUrl,
							category: "",
						}))}
						getHref={(item) => `/${schoolId}/exhibition/${exhibitionId}/artist/${item.id}`}
					/>
				</section>

				<Divider />

				{/* --- 2. 도움을 주신 분들 --- */}
				<section
					ref={(el) => {
						if (sectionRefs.partners) sectionRefs.partners.current = el;
					}}
					className="flex flex-col pt-4"
				>
					<Title title="도움을 주신 분들" />
					{MOCK_PARTNERS.sort((a, b) => a.order - b.order).map((part) => (
						<div key={part.part_id} className="flex flex-col mb-6">
							<Title title={part.part_name} size="head2" margin="compact" />
							<RowCardGrid
								items={part.members.map((m) => ({
									id: m.member_id,
									name: m.member_name,
									engName: m.member_name_en ?? undefined,
									email: m.member_email ?? undefined,
									imageUrl: m.member_image_url ?? undefined,
								}))}
							/>
						</div>
					))}
				</section>
			</div>
		</>
	);
}
