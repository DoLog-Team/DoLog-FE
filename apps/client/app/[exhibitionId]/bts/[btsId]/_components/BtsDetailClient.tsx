"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { type RefObject, useState } from "react";
import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { ProfileCard } from "@/components/common/Card/ProfileCard/ProfileCard";
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

	const relatedArtworkItems = (btsItem.relatedArtworks ?? []).map((a) => ({
		id: a.artworkId,
		title: a.title,
		imageUrl: a.image ?? undefined,
		author: "",
	}));

	const recommendedBtsItems = (btsItem.recommendedBts ?? []).map((b) => ({
		id: b.btsId,
		title: b.title,
		imageUrl: b.mainImg ?? "",
	}));

	return (
		<div className="flex flex-col">
			<Header variant="back" title="Behind The Scene 상세" />

			{/* 대표 이미지 */}
			<div className="relative aspect-video w-full">
				{btsItem.mainImg ? (
					<Image src={btsItem.mainImg} alt={btsItem.title} fill className="object-cover" priority />
				) : (
					<EmptyImageFallback className="w-full aspect-video" />
				)}
			</div>

			<div className="flex flex-col px-4">
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
				<section
					ref={(el) => {
						(sectionRefs.artist as RefObject<HTMLElement | null>).current = el;
					}}
				>
					<Title title="작가 소개" size="head2" />
					{btsItem.artists?.map((artist) => (
						<div key={artist.profileId} className="mb-6">
							<ProfileCard
								imageUrl={artist.profileImg ?? ""}
								name={artist.nameKo}
								engName={artist.nameEn ?? undefined}
								bio={artist.bio ?? undefined}
							/>
							{(artist.snsList?.length ?? 0) > 0 && (
								<div className="mt-4">
									<LinkCard
										items={(artist.snsList ?? []).map((s) => ({
											label: s.platformName,
											value: s.url,
											type: "url" as const,
										}))}
									/>
								</div>
							)}
							<Link href={`/${exhibitionId}/artist/${artist.profileId}`}>
								<Button variant="outline" size="sm" className="w-full mt-5 mb-4">
									프로필 더보기
								</Button>
							</Link>
						</div>
					))}
				</section>

				<Divider />

				{/* 연관 작품 */}
				<section
					ref={(el) => {
						(sectionRefs.related as RefObject<HTMLElement | null>).current = el;
					}}
					className="pb-6"
				>
					<Title title="연관 작품" size="head2" className="mt-4 mb-4" />
					{relatedArtworkItems.length > 0 && <ListCardGrid items={relatedArtworkItems} limit={3} />}
				</section>

				<Divider />

				{/* 추천 BTS */}
				{recommendedBtsItems.length > 0 && (
					<section className="mb-6">
						<Title title="추천 Behind The Scene" size="head2" className="mt-4 mb-4" />
						<BTSCardGrid
							items={recommendedBtsItems}
							getHref={(item) => `/${exhibitionId}/bts/${item.id}`}
						/>
					</section>
				)}
			</div>

			<ScrollTabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
		</div>
	);
}
