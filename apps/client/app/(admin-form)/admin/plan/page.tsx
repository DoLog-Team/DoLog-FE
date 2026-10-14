import type { Metadata } from "next";
import MainFooter from "@/components/common/Footer/MainFooter";
import { getMyExhibitionId } from "@/lib/api/account";
import { getExhibitionSubscription, getPlans } from "@/lib/api/plan";
import { cn } from "@/lib/utils/cn";
import { PlanHeader } from "./_components/PlanHeader";
import { PlanHelp } from "./_components/PlanHelp";
import { PlanPricing } from "./_components/PlanPricing";
import { PLAN_CONTAINER_CLASS } from "./_components/planPage.styles";

export const metadata: Metadata = {
	title: "사용 중인 플랜 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminPlanPage() {
	const exhibitionId = await getMyExhibitionId();
	const [plans, subscription] = await Promise.all([
		getPlans(),
		getExhibitionSubscription(exhibitionId),
	]);

	return (
		<>
			<PlanHeader />
			<main className="w-full flex-1">
				<div className={cn(PLAN_CONTAINER_CLASS, "pt-8 pb-6 text-center")}>
					<h1 className="px-0.5 text-display text-strong">두록 요금제</h1>
					<p className="px-0.5 pt-2 text-body1 text-light">우리 학과에 맞는 플랜을 찾아보세요.</p>
				</div>
				<PlanPricing plans={plans} subscription={subscription} />
				<hr className="border-stroke-lightest" />
				<div className={PLAN_CONTAINER_CLASS}>
					<PlanHelp />
				</div>
			</main>
			<MainFooter />
		</>
	);
}
