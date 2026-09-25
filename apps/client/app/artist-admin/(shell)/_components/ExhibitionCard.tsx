import Image from "next/image";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import type { MyExhibition } from "../_mocks/exhibitions";
import { OverflowMenu } from "./OverflowMenu";

interface ExhibitionCardProps {
	exhibition: MyExhibition;
}

export function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
	const isPending = exhibition.acceptedAt === null;

	return (
		<article className="flex gap-4 min-[721px]:flex-col min-[721px]:gap-3">
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
					<h3 className="truncate text-head3 text-strong">{exhibition.name}</h3>
					<p className="text-body1 text-lighter">
						{exhibition.startDate} ~ {exhibition.endDate}
					</p>
					{isPending && <p className="text-body1-bold text-admin1">수락 대기중</p>}
				</div>
				{/* 수락 대기 전시는 관리 메뉴(overflow menu)를 표시하지 않는다 */}
				{/* TODO: 전시 나가기 확인 모달 연결 */}
				{!isPending && (
					<OverflowMenu
						label={`${exhibition.name} 더보기`}
						items={[{ label: "나가기", icon: "/icons/exit.svg", danger: true }]}
					/>
				)}
			</div>
		</article>
	);
}
