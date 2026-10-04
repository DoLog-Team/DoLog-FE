import type { Metadata } from "next";
import { ExhibitionSiteSection } from "./_components/ExhibitionSiteSection";
import { ExhibitionSummary } from "./_components/ExhibitionSummary";
import { ManagementCards } from "./_components/ManagementCards";
import { MOCK_EXHIBITION, MOCK_EXHIBITION_COUNTS, MOCK_SUBSCRIPTION } from "./_mocks/exhibition";

export const metadata: Metadata = {
	title: "전시 정보 | 두록",
	robots: { index: false, follow: false },
};

// 레이아웃 좌우 여백 밖(화면 끝)까지 배경을 늘림 — 회색 영역은 -mb-20 으로 레이아웃 아래 여백·푸터 위 여백까지 덮음
const FULL_BLEED = "[clip-path:inset(0_-100vmax)]";

// 전시 정보 API 연결 전 — 목 데이터로 표시
export default function AdminHomePage() {
	return (
		<>
			<ExhibitionSummary exhibition={MOCK_EXHIBITION} />
			<hr
				className={`my-4 border-stroke-lighter shadow-[0_0_0_100vmax_var(--color-stroke-lighter)] ${FULL_BLEED}`}
			/>
			<ExhibitionSiteSection exhibition={MOCK_EXHIBITION} subscription={MOCK_SUBSCRIPTION} />
			<hr
				className={`mt-4 border-stroke-lighter shadow-[0_0_0_100vmax_var(--color-stroke-lighter)] ${FULL_BLEED}`}
			/>
			<div
				className={`-mb-20 bg-fg-lighter pt-10 pb-22 shadow-[0_0_0_100vmax_var(--color-fg-lighter)] ${FULL_BLEED}`}
			>
				<ManagementCards counts={MOCK_EXHIBITION_COUNTS} />
			</div>
		</>
	);
}
