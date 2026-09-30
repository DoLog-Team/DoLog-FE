"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/common/Button/Button";
import { type CurrentPlan, PLAN_PERIODS, type PlanTier } from "@/lib/constants/plan";
import { cn } from "@/lib/utils/cn";
import { PlanCard } from "./PlanCard";
import { PlanTierTabs, planTierTabId } from "./PlanTierTabs";
import { PLAN_CONTAINER_CLASS } from "./planPage.styles";

// 플랜 이용 문의 — 두록 링크트리 (외부 페이지라 새 창)
const PLAN_INQUIRY_HREF = "https://linktr.ee/dologarchive";
const PANEL_ID = "plan-tier-panel";

interface PlanPricingProps {
	tiers: PlanTier[];
	currentPlan: CurrentPlan | null;
}

export const PlanPricing = ({ tiers, currentPlan }: PlanPricingProps) => {
	// 현재 플랜 규모 탭을 먼저 보여줌
	const [selectedKey, setSelectedKey] = useState(currentPlan?.tier ?? tiers[0].key);
	const tier = tiers.find(({ key }) => key === selectedKey) ?? tiers[0];

	return (
		<>
			<div className={PLAN_CONTAINER_CLASS}>
				<PlanTierTabs
					tiers={tiers}
					selectedKey={selectedKey}
					onSelect={setSelectedKey}
					panelId={PANEL_ID}
				/>
			</div>

			<hr className="mt-4 border-stroke-lightest" />

			<section
				id={PANEL_ID}
				role="tabpanel"
				aria-labelledby={planTierTabId(tier.key)}
				className={cn(PLAN_CONTAINER_CLASS, "flex flex-col items-center pt-4 pb-7")}
			>
				<h2 className="px-0.5 pb-2 text-head1 text-strong">{tier.name}</h2>
				<p className="px-0.5 text-center text-body1 text-light">
					{tier.description.map((line) => (
						<span key={line} className="block">
							{line}
						</span>
					))}
					<span className="block text-lightest">(VAT 포함)</span>
				</p>

				<div className="mt-9 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-7.5">
					{PLAN_PERIODS.map((period) => (
						<PlanCard
							key={period.months}
							tier={tier}
							period={period}
							isCurrent={currentPlan?.tier === tier.key && currentPlan.months === period.months}
						/>
					))}
				</div>

				<Link
					href={PLAN_INQUIRY_HREF}
					target="_blank"
					rel="noreferrer"
					className={buttonVariants({ size: "lg", className: "mt-15 w-full max-w-60" })}
				>
					플랜 이용 문의
				</Link>
			</section>
		</>
	);
};
