"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArtistManageFab } from "@/app/[exhibitionId]/artist/[artistId]/_components/ArtistManageFab";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { LikeButton } from "@/components/common/LikeButton/LikeButton";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { Title } from "@/components/common/Title/Title";
import { setArtistProfileLike } from "@/lib/api/artists/artist-detail";
import { hasArtistProfileInfo } from "@/lib/utils/artistProfile";
import ExhibitionCard from "../../../_components/ExhibitionCard";
import type { DologArtist } from "../_api/getArtist";

interface ArtistDetailClientProps {
	artist: DologArtist;
}

export function ArtistDetailClient({ artist }: ArtistDetailClientProps) {
	// 국문 성명이 없으면 영문 성명만, 둘 다 없으면 이름 자리를 비운다
	const name = artist.nameKo ?? "";
	const { profileId } = artist;
	// 프로필에 등록된 정보가 하나도 없으면 작가 소개(프로필)를 숨긴다 (Figma 10.20 추가 사항)
	const hasProfile = hasArtistProfileInfo({
		nameKo: artist.nameKo,
		nameEn: artist.nameEn,
		bio: artist.bio,
		profileImage: artist.profileImg,
		email: artist.email,
		snsCount: artist.snsList?.length,
	});

	// 탭 순서는 화면 섹션 순서와 같게 (작가 소개 · 작품 · 전시), 내용이 없는 섹션은 탭도 뺀다
	const tabs = useMemo(() => {
		const base = hasProfile ? [{ id: "intro", label: "작가 소개" }] : [];
		if (artist.artworks.length) base.push({ id: "artworks", label: "작품" });
		if (artist.exhibitions.length) base.push({ id: "exhibitions", label: "전시" });
		return base;
	}, [hasProfile, artist.exhibitions.length, artist.artworks.length]);

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
			{hasProfile && (
				<DesktopContainer>
					<section
						ref={(el) => {
							if (sectionRefs.intro) sectionRefs.intro.current = el;
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
			)}

			{artist.artworks.length > 0 && (
				<>
					{hasProfile && <Divider />}
					<DesktopContainer>
						<section
							className="mb-6"
							ref={(el) => {
								if (sectionRefs.artworks) sectionRefs.artworks.current = el;
							}}
						>
							<Title title="작품" size="head2" margin="compact" />
							<CardGrid
								items={artworkItems}
								getHref={(item) => `/artworks/${item.id}`}
								imageObjectFit="contain"
							/>
						</section>
					</DesktopContainer>
				</>
			)}

			{artist.exhibitions.length > 0 && (
				<>
					{(hasProfile || artist.artworks.length > 0) && <Divider />}
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

			{/* 작가 관리 메뉴(연필 버튼) — 전시 작가 상세와 같은 컴포넌트 */}
			<ArtistManageFab
				artistId={artist.artistId}
				viewCount={artist.viewCount}
				likeCount={artist.likeCount}
			/>

			<ScrollTabBar
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={handleTabClick}
				// 좋아요는 작가 공통 프로필(profileId) 기준
				leading={
					profileId ? (
						<LikeButton
							initialLiked={artist.liked}
							onToggle={(next, visitorId) => setArtistProfileLike(profileId, next, visitorId)}
						/>
					) : undefined
				}
			/>
		</div>
	);
}
