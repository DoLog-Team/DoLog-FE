import type { Metadata } from "next";
import { MOCK_EXHIBITION } from "@/app/(admin)/admin/_mocks/exhibition";
import MainFooter from "@/components/common/Footer/MainFooter";
import { cn } from "@/lib/utils/cn";
import { PlanHeader } from "./_components/PlanHeader";
import { PlanHelp } from "./_components/PlanHelp";
import { PlanPricing } from "./_components/PlanPricing";
import { PLAN_CONTAINER_CLASS } from "./_components/planPage.styles";
import { MOCK_PLAN_TIERS } from "./_mocks/plans";

export const metadata: Metadata = {
	title: "사용 중인 플랜 | 두록",
	robots: { index: false, follow: false },
};

// 플랜 API 연결 전 — 목 데이터로 표시 (현재 플랜은 홈과 같은 전시 목데이터를 참조)
export default function AdminPlanPage() {
	return (
		<>
			<PlanHeader />
			<main className="w-full flex-1">
				<div className={cn(PLAN_CONTAINER_CLASS, "pt-8 pb-6 text-center")}>
					<h1 className="px-0.5 text-display text-strong">두록 요금제</h1>
					<p className="px-0.5 pt-2 text-body1 text-light">우리 학과에 맞는 플랜을 찾아보세요.</p>
				</div>
				<PlanPricing tiers={MOCK_PLAN_TIERS} currentPlan={MOCK_EXHIBITION.plan} />
				<hr className="border-stroke-lightest" />
				<div className={PLAN_CONTAINER_CLASS}>
					<PlanHelp />
				</div>
			</main>
			<MainFooter />
		</>
	);
}
