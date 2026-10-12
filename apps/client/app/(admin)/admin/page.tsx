import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getExhibitionSubscription } from "@/lib/api/plan";
import { getAdminHome } from "./_api/getAdminHome";
import { ExhibitionSiteSection } from "./_components/ExhibitionSiteSection";
import { ExhibitionSummary } from "./_components/ExhibitionSummary";
import { ManagementCards } from "./_components/ManagementCards";

export const metadata: Metadata = {
	title: "전시 정보 | 두록",
	robots: { index: false, follow: false },
};

// 레이아웃 좌우 여백 밖(화면 끝)까지 배경을 늘림 — 회색 영역은 -mb-20 으로 레이아웃 아래 여백·푸터 위 여백까지 덮음
const FULL_BLEED = "[clip-path:inset(0_-100vmax)]";

export default async function AdminHomePage() {
	const exhibitionId = await getMyExhibitionId();
	const [{ exhibition, counts }, subscription] = await Promise.all([
		getAdminHome(exhibitionId),
		getExhibitionSubscription(exhibitionId),
	]);

	return (
		<>
			<ExhibitionSummary exhibition={exhibition} />
			<hr
				className={`my-4 border-stroke-lighter shadow-[0_0_0_100vmax_var(--color-stroke-lighter)] ${FULL_BLEED}`}
			/>
			<ExhibitionSiteSection
				exhibitionId={exhibitionId}
				exhibition={exhibition}
				subscription={subscription}
			/>
			<hr
				className={`mt-4 border-stroke-lighter shadow-[0_0_0_100vmax_var(--color-stroke-lighter)] ${FULL_BLEED}`}
			/>
			<div
				className={`-mb-20 bg-fg-lighter pt-10 pb-22 shadow-[0_0_0_100vmax_var(--color-fg-lighter)] ${FULL_BLEED}`}
			>
				<ManagementCards counts={counts} />
			</div>
		</>
	);
}
