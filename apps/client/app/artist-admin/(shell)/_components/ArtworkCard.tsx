import Image from "next/image";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import type { ArtworkStatus, MyArtwork } from "../_mocks/artworks";
import { Engagement } from "./Engagement";
import { OverflowMenu, type OverflowMenuItem } from "./OverflowMenu";
import { StatusBadge } from "./StatusBadge";

const STATUS_BADGE: Record<ArtworkStatus, { label: string; color: "coral" | "light" }> = {
	draft: { label: "임시저장", color: "coral" },
	public: { label: "공개", color: "light" },
	private: { label: "비공개", color: "light" },
};

interface ArtworkCardProps {
	artwork: MyArtwork;
}

/**
 * 작품 카드 컴포넌트
 */
export function ArtworkCard({ artwork }: ArtworkCardProps) {
	const badge = STATUS_BADGE[artwork.status];

	// 보연 TODO: 이후 작품 출품 모달 · 작품 삭제 모달 연결
	const menuItems: OverflowMenuItem[] = [
		{
			label: "편집하기",
			icon: "/icons/edit.svg",
			href: `/artist-admin/artworks/${artwork.artworkId}/edit`,
		},
		artwork.exhibition
			? {
					label: "출품 정보 편집",
					icon: "/icons/edit.svg",
					href: `/artist-admin/artworks/${artwork.artworkId}/exhibition`,
				}
			: { label: "작품 출품하기", icon: "/icons/link.svg" },
		{ label: "삭제하기", icon: "/icons/trash.svg", danger: true },
	];

	return (
		<article className="flex gap-4 min-[721px]:flex-col min-[721px]:gap-3">
			<div className="relative h-32.5 w-23 shrink-0 bg-normal min-[721px]:aspect-[254/359] min-[721px]:h-auto min-[721px]:w-full">
				{artwork.image ? (
					<Image
						src={artwork.image}
						alt={artwork.title}
						fill
						sizes="(min-width: 721px) 254px, 92px"
						className="object-contain"
					/>
				) : (
					<EmptyImageFallback className="size-full" />
				)}
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-start gap-2">
					<div className="flex min-w-0 flex-1 flex-col gap-0.5 min-[721px]:gap-2.5">
						<h3 className="order-2 truncate px-0.5 text-body1-bold text-strong min-[721px]:order-1 min-[721px]:text-head3">
							{artwork.title}
						</h3>
						<p className="order-1 flex gap-2.5 px-0.5 text-body2-bold min-[721px]:order-2">
							<span className="text-light">{artwork.exhibition?.name ?? "개인 작품"}</span>
							{artwork.exhibition?.hidden && <span className="text-error">전시 내 숨김 처리</span>}
						</p>
					</div>
					<OverflowMenu label={`${artwork.title} 더보기`} items={menuItems} />
				</div>

				<div className="mt-2.5">
					<Engagement viewCount={artwork.viewCount} likeCount={artwork.likeCount} />
				</div>

				<div className="mt-3 flex gap-1.5">
					<StatusBadge label={badge.label} color={badge.color} />
					{artwork.status === "draft" && <StatusBadge label={`${artwork.completionRate}% 작성`} />}
				</div>
			</div>
		</article>
	);
}
