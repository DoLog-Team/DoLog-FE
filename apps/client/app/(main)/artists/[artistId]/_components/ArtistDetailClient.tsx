"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { Title } from "@/components/common/Title/Title";
import ExhibitionCard from "../../../_components/ExhibitionCard";
import type { DologArtist } from "../_api/getArtist";
import { ArtistEditButton } from "./ArtistEditButton";

interface ArtistDetailClientProps {
	artist: DologArtist;
}

export function ArtistDetailClient({ artist }: ArtistDetailClientProps) {
	// TODO: 이름 미등록 작가(소셜 가입 직후) 표시 — BE 에 이름 필수 문의 중
	const name = artist.nameKo ?? "";

	// 탭 순서는 화면 섹션 순서와 같게 (작가 소개 · 작품 · 전시), 내용이 없는 섹션은 탭도 뺀다
	const tabs = useMemo(() => {
		const base = [{ id: "intro", label: "작가 소개" }];
		if (artist.artworks.length) base.push({ id: "artworks", label: "작품" });
		if (artist.exhibitions.length) base.push({ id: "exhibitions", label: "전시" });
		return base;
	}, [artist.exhibitions.length, artist.artworks.length]);

	// 헤더 높이 모바일 44px, 데스크탑 68px
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(
		tabs.map((tab) => tab.id),
		44,
		68,
	);

	const contactItems = [
		...(artist.email ? [{ label: "email", value: artist.email, type: "email" as const }] : []),
		...(artist.snsList ?? []).map((sns) => ({
			label: sns.platformName,
			value: sns.url,
			type: "url" as const,
		})),
	];

	const artworkItems = artist.artworks.map((artwork) => ({
		id: artwork.artworkId,
		title: artwork.title,
		imageUrl: artwork.mainImg ?? undefined,
		author: name,
	}));

	return (
		<div className="flex flex-col">
			<DesktopContainer>
				<section
					ref={(el) => {
						sectionRefs.intro.current = el;
					}}
				>
					<ProfileCard
						// 빈 값이면 기본 작가 아이콘
						imageUrl={artist.profileImg ?? ""}
						name={name}
						engName={artist.nameEn ?? undefined}
						bio={artist.bio ?? undefined}
						bottomSlot={contactItems.length > 0 ? <LinkCard items={contactItems} /> : undefined}
					/>
				</section>
			</DesktopContainer>

			{artist.artworks.length > 0 && (
				<>
					<Divider />
					<DesktopContainer>
						<section
							className="mb-6"
							ref={(el) => {
								if (sectionRefs.artworks) sectionRefs.artworks.current = el;
							}}
						>
							<Title title="작품" size="head2" margin="compact" />
							{/* TODO: 작품 카드 이동 — 두록 작품 상세 페이지 미구현 */}
							<CardGrid items={artworkItems} imageObjectFit="contain" />
						</section>
					</DesktopContainer>
				</>
			)}

			{artist.exhibitions.length > 0 && (
				<>
					<Divider />
					<DesktopContainer>
						<section
							className="mb-6"
							ref={(el) => {
								if (sectionRefs.exhibitions) sectionRefs.exhibitions.current = el;
							}}
						>
							<Title title="전시" size="head2" margin="compact" />
							<div className="flex flex-col gap-4 min-[721px]:grid min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:gap-y-[60px]">
								{artist.exhibitions.map((exhibition) => (
									<Link
										key={exhibition.exhibitionId}
										href={`/${exhibition.slug ?? exhibition.exhibitionId}`}
									>
										<ExhibitionCard
											title={exhibition.title}
											univName={exhibition.univName ?? ""}
											deptName={exhibition.deptName ?? ""}
											address={exhibition.location}
											imageUrl={exhibition.exhibitionImg}
											startDate={exhibition.startDate}
											endDate={exhibition.endDate}
										/>
									</Link>
								))}
							</div>
						</section>
					</DesktopContainer>
				</>
			)}

			<ArtistEditButton artistId={artist.artistId} />

			{/* TODO: 탭바 왼쪽 좋아요 버튼 — 좋아요 API 가 전시별 프로필 기준이라 BE 확인 후 추가 */}
			<ScrollTabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
		</div>
	);
}
