import Image from "next/image";
import Link from "next/link";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { OverflowMenu } from "@/components/common/OverflowMenu/OverflowMenu";
import { cn } from "@/lib/utils/cn";
import type { MyExhibition } from "../_types";
import { STATUS_TONE } from "./StatusBadge";

interface MyExhibitionCardProps {
	exhibition: MyExhibition;
	onLeave: () => void;
}

export function MyExhibitionCard({ exhibition, onLeave }: MyExhibitionCardProps) {
	const isPending = exhibition.acceptedAt === null;

	return (
		<article className="relative flex gap-4 min-[721px]:flex-col min-[721px]:gap-3">
			<div className="relative h-32.5 w-23 shrink-0 min-[721px]:aspect-[254/359] min-[721px]:h-auto min-[721px]:w-full">
				{exhibition.image ? (
					<Image
						src={exhibition.image}
						alt={exhibition.name}
						fill
						sizes="(min-width: 721px) 254px, 92px"
						className="object-cover"
					/>
				) : (
					<EmptyImageFallback className="size-full" />
				)}
			</div>

			<div className="flex min-w-0 flex-1 items-start gap-2.5">
				<div className="flex min-w-0 flex-1 flex-col px-0.5">
					<h3 className="truncate text-head3 text-strong">
						{/* 카드 전체를 두록 전시 상세 링크로 덮는다 — 더보기 메뉴는 DOM 순서상 위에 그려져 따로 눌린다 */}
						<Link
							href={`/${exhibition.exhibitionId}`}
							className="after:absolute after:inset-0 after:content-['']"
						>
							{exhibition.name}
						</Link>
					</h3>
					{exhibition.startDate && exhibition.endDate && (
						<p className="text-body1 text-lighter">
							{exhibition.startDate} ~ {exhibition.endDate}
						</p>
					)}
					{isPending && (
						<p className={cn("text-body1-bold", STATUS_TONE.coral.text)}>수락 대기중</p>
					)}
				</div>
				{/* 수락 대기 전시는 관리 메뉴(overflow menu)를 표시하지 않는다 */}
				{!isPending && (
					<OverflowMenu
						label={`${exhibition.name} 더보기`}
						items={[{ label: "나가기", icon: "/icons/exit.svg", danger: true, onClick: onLeave }]}
					/>
				)}
			</div>
		</article>
	);
}
