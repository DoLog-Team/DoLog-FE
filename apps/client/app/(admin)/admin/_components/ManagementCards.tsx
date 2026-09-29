import Link from "next/link";
import { HourglassIcon } from "@/components/common/icons/HourglassIcon";
import { ImageHideIcon } from "@/components/common/icons/ImageHideIcon";
import { ImageIcon } from "@/components/common/icons/ImageIcon";
import { PeopleIcon } from "@/components/common/icons/PeopleIcon";
import { SettingsIcon } from "@/components/common/icons/SettingsIcon";
import type { AdminExhibitionCounts } from "../_mocks/exhibition";
import { SECTION_TITLE_CLASS } from "./homeSection.styles";

interface ManagementCardsProps {
	// 조회 실패 시 null → 개수 자리에 "-"
	counts: AdminExhibitionCounts | null;
}

export const ManagementCards = ({ counts }: ManagementCardsProps) => {
	const count = (key: keyof AdminExhibitionCounts, unit: string) =>
		counts ? `${counts[key]}${unit}` : "-";

	const cards = [
		{
			title: "전시 참여 작가",
			description: `참여중 ${count("artists", "명")}`,
			href: "/admin/artists",
			Icon: PeopleIcon,
		},
		{
			title: "대기 중인 작가",
			description: `현재 대기 ${count("pendingArtists", "명")}`,
			href: "/admin/artists/pending",
			Icon: HourglassIcon,
		},
		{
			title: "전시된 작품 관리",
			description: `전시 중인 작품 ${count("exhibitedArtworks", "개")}`,
			href: "/admin/artworks",
			Icon: ImageIcon,
			isExceeded: Boolean(counts?.exceededArtworks),
		},
		{
			title: "숨긴 작품 관리",
			description: `숨긴 작품 ${count("hiddenArtworks", "개")}`,
			href: "/admin/artworks/hidden",
			Icon: ImageHideIcon,
		},
		{ title: "전시 관리", href: "/admin/exhibitions", Icon: SettingsIcon },
	];

	return (
		<section className="flex flex-col">
			<h2 className={SECTION_TITLE_CLASS}>내 전시 관리</h2>
			{/* 카드가 220px 보다 좁아지지 않게 — 넓으면 4칸, 좁아지면 3·2칸 */}
			<ul className="grid gap-3 min-[721px]:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] min-[721px]:gap-5">
				{cards.map(({ title, description, href, Icon, isExceeded }) => (
					<li key={href}>
						<Link
							href={href}
							className="relative flex min-h-23 items-center gap-4 rounded-lg bg-normal px-4 py-6 min-[721px]:h-full min-[721px]:flex-col min-[721px]:items-start min-[721px]:gap-8 min-[721px]:p-6"
						>
							<span className="flex size-10 shrink-0 items-center text-admin1">
								<Icon size={32} />
							</span>
							<span className="flex flex-col gap-1">
								<span className="px-0.5 text-head3 text-strong">{title}</span>
								{description && (
									<span className="px-0.5 text-body1 text-lighter">{description}</span>
								)}
							</span>
							{isExceeded && (
								<span className="ml-auto shrink-0 self-start text-body1-bold text-error min-[721px]:absolute min-[721px]:top-6 min-[721px]:right-6">
									플랜 한도 초과
								</span>
							)}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
