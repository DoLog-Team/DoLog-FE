"use client";

import Image from "next/image";
import Link from "next/link";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { track } from "@/lib/amplitude";
import type { RelatedArtwork } from "@/lib/api/artwork";

interface PostNavigationProps {
	prevArtwork?: RelatedArtwork;
	nextArtwork?: RelatedArtwork;
	// 두록 작품 상세: "작가의 다른 작품 둘러보기", /artworks/{id}
	title?: string;
	getHref?: (artwork: RelatedArtwork) => string;
}

interface ArtworkNavItemProps {
	artwork: RelatedArtwork;
	direction: "prev" | "next";
	href: string;
}

function ArtworkNavItem({ artwork, direction, href }: ArtworkNavItemProps) {
	const iconSrc = direction === "prev" ? "/icons/arrowUp.svg" : "/icons/arrowDown.svg";
	const iconAlt = direction === "prev" ? "이전" : "다음";

	return (
		<Link
			href={href}
			onClick={() =>
				track("Artwork Navigation Clicked", {
					direction,
					artwork_id: artwork.id,
					artwork_title: artwork.title,
				})
			}
		>
			<div className="flex items-center justify-between py-2.5 gap-4">
				<div className="flex items-center gap-2 flex-1 min-w-0">
					{artwork.mainImage ? (
						<div className="w-20 h-11.25 shrink-0 relative overflow-hidden">
							<Image
								src={artwork.mainImage}
								alt={artwork.title}
								fill
								sizes="80px"
								className="object-cover"
							/>
						</div>
					) : (
						<div className="w-20 h-11.25 shrink-0 bg-fg-lighter flex items-center justify-center">
							<Image src="/icons/empty-image.svg" alt="이미지 없음" width={24} height={24} />
						</div>
					)}
					<div className="flex flex-col min-w-0 flex-1">
						<span className="text-body1-bold truncate">{artwork.title}</span>
						<span className="text-body2 text-lighter truncate">{artwork.artistName}</span>
					</div>
				</div>
				<Image src={iconSrc} alt={iconAlt} width={24} height={24} className="shrink-0" />
			</div>
		</Link>
	);
}

export function PostNavigationSection({
	prevArtwork,
	nextArtwork,
	title = "작품 둘러보기",
	getHref = (artwork) => `../artwork/${artwork.id}`,
}: PostNavigationProps) {
	return (
		<section className="flex flex-col pb-6 w-full">
			<DesktopContainer>
				<span className="text-body1-bold text-lighter pt-7 pb-2.5">{title}</span>
				<hr className="border border-stroke-lighter" />
				{prevArtwork && (
					<ArtworkNavItem artwork={prevArtwork} direction="prev" href={getHref(prevArtwork)} />
				)}
				<hr className="border border-stroke-lightest" />
				{nextArtwork && (
					<ArtworkNavItem artwork={nextArtwork} direction="next" href={getHref(nextArtwork)} />
				)}
			</DesktopContainer>
		</section>
	);
}
