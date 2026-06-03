"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { Modal } from "@/components/common/Modal/Modal";
import { ScrollTabBar } from "@/components/common/ScrollTabBar/ScrollTabBar";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { Title } from "@/components/common/Title/Title";
import type { BtsDetail } from "@/lib/api/bts";
import { Header } from "../../../_components/Header";

const TABS = [
	{ id: "artist", label: "작가 소개" },
	{ id: "related", label: "연관 작품" },
] as const;

interface BtsDetailClientProps {
	btsItem: BtsDetail;
	exhibitionId: string;
}

export function BtsDetailClient({ btsItem, exhibitionId }: BtsDetailClientProps) {
	const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(["artist", "related"]);
	const firstSns = btsItem.artists?.[0]?.snsList?.[0];

	const setArtistRef = (el: HTMLElement | null) => {
		(sectionRefs.artist as { current: HTMLElement | null }).current = el;
	};
	const setRelatedRef = (el: HTMLElement | null) => {
		(sectionRefs.related as { current: HTMLElement | null }).current = el;
	};

	const relatedArtworkItems = (btsItem.relatedArtworks ?? []).map((a) => ({
		id: a.artworkId,
		title: a.title,
		imageUrl: a.image ?? undefined,
		author: "",
	}));

	return (
		<div className="flex flex-col">
			<Header variant="back" title="Behind The Scene 상세" />

			{/* 대표 이미지 */}
			<div className="relative aspect-video w-full min-[721px]:max-h-[400px]">
				{btsItem.mainImg ? (
					<Image src={btsItem.mainImg} alt={btsItem.title} fill className="object-cover" priority />
				) : (
					<EmptyImageFallback className="w-full aspect-video" />
				)}
			</div>

			<DesktopContainer className="flex flex-col">
				<Title title={btsItem.title} size="head1" />

				{/* 외부 링크 */}
				{firstSns && (
					<>
						<Button
							type="button"
							variant="assistive"
							size="md"
							className="w-full gap-2 text-element2 mt-2.5 mb-6"
							onClick={() => setIsLinkModalOpen(true)}
						>
							<Image
								src="/images/bts/instagram.png"
								alt={firstSns.platformName}
								width={24}
								height={24}
							/>
							{firstSns.platformName}에서 확인하기
						</Button>
						<Modal
							open={isLinkModalOpen}
							onOpenChange={setIsLinkModalOpen}
							title="외부 링크로 이동해요."
							description={`Behind The Scene 열람을 위해\n${firstSns.platformName}으로 이동해요.`}
							actions={[
								{
									text: "되돌리기",
									variant: "secondary",
									onClick: () => setIsLinkModalOpen(false),
								},
								{
									text: "이동하기",
									variant: "primary",
									onClick: () => {
										window.open(firstSns.url, "_blank", "noopener,noreferrer");
										setIsLinkModalOpen(false);
									},
								},
							]}
						/>
					</>
				)}

				{/* 작가 소개 */}
				<section ref={setArtistRef}>
					<Title title="작가 소개" size="head2" />
					{btsItem.artists?.map((artist) => (
						<div key={artist.profileId} className="mb-6">
							<ProfileCard
								imageUrl={artist.profileImg ?? ""}
								name={artist.nameKo}
								engName={artist.nameEn ?? undefined}
								bio={artist.bio ?? undefined}
								bottomSlot={
									<div className="flex flex-col min-[721px]:flex-1">
										{(artist.snsList?.length ?? 0) > 0 && (
											<LinkCard
												items={(artist.snsList ?? []).map((s) => ({
													label: s.platformName,
													value: s.url,
													type: "url" as const,
												}))}
											/>
										)}
										{/* 모바일: 버튼 */}
										<Link
											href={`/${exhibitionId}/artist/${artist.profileId}`}
											className="min-[721px]:hidden"
										>
											<Button variant="outline" size="sm" className="w-full mt-5 mb-4">
												프로필 더보기
											</Button>
										</Link>
										{/* 데스크탑: 텍스트 링크 */}
										<Link
											href={`/${exhibitionId}/artist/${artist.profileId}`}
											className="hidden min-[721px]:inline mt-auto text-body1 text-lightest underline underline-offset-2 w-fit"
										>
											프로필 더보기 →
										</Link>
									</div>
								}
							/>
						</div>
					))}
				</section>
			</DesktopContainer>

			{/* 연관 작품 — 데이터 있을 때만 렌더링 */}
			{relatedArtworkItems.length > 0 && (
				<>
					<Divider />
					<DesktopContainer>
						<section ref={setRelatedRef} className="pb-6">
							<Title title="연관 작품" size="head2" className="mt-4 mb-4" />
							<CardGrid items={relatedArtworkItems} limit={3} className="min-[721px]:grid-cols-2" />
						</section>
					</DesktopContainer>
				</>
			)}

			<Divider />

			{/* 추천 BTS */}
			{(btsItem.recommendedBts ?? []).length > 0 && (
				<DesktopContainer>
					<section className="mb-6">
						<Title title="추천 Behind The Scene" size="head2" className="mt-4 mb-4" />
						<div className="grid grid-cols-1 gap-y-4 min-[721px]:grid-cols-2 min-[721px]:gap-x-5">
							{(btsItem.recommendedBts ?? []).map((b) => (
								<Link key={b.btsId} href={`/${exhibitionId}/bts/${b.btsId}`}>
									<article className="w-full flex flex-col gap-3">
										<div className="relative w-full aspect-video overflow-hidden">
											{b.mainImg ? (
												<Image src={b.mainImg} alt={b.title} fill className="object-cover" />
											) : (
												<div className="w-full h-full bg-fg-lighter" />
											)}
										</div>
										<h3 className="text-head3 text-strong">{b.title}</h3>
									</article>
								</Link>
							))}
						</div>
					</section>
				</DesktopContainer>
			)}

			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</div>
	);
}
