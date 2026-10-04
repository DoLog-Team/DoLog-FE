"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/common/Button/Button";
import type { MySubscription, Plan } from "@/lib/api/plan.types";
import { cn } from "@/lib/utils/cn";
import { PlanCard } from "./PlanCard";
import { PlanTierTabs, planTierTabId } from "./PlanTierTabs";
import { PLAN_CONTAINER_CLASS } from "./planPage.styles";

// 플랜 이용 문의 — 두록 링크트리 (외부 페이지라 새 창)
const PLAN_INQUIRY_HREF = "https://linktr.ee/dologarchive";
const PANEL_ID = "plan-tier-panel";

interface PlanPricingProps {
	plans: Plan[];
	subscription: MySubscription | null;
}

export const PlanPricing = ({ plans, subscription }: PlanPricingProps) => {
	// 이용 중인 요금제 탭을 먼저 보여줌
	const [selectedId, setSelectedId] = useState(subscription?.planId ?? plans[0]?.planId);
	const plan = plans.find(({ planId }) => planId === selectedId) ?? plans[0];
	// 결제 대기 · 만료 · 해지는 "이용 중" 으로 표시하지 않음
	const activeSubscription = subscription?.status === "ACTIVE" ? subscription : null;

	if (!plan) return null;

	return (
		<>
			<div className={PLAN_CONTAINER_CLASS}>
				<PlanTierTabs
					plans={plans}
					selectedId={plan.planId}
					onSelect={setSelectedId}
					panelId={PANEL_ID}
				/>
			</div>

			<hr className="mt-4 border-stroke-lightest" />

			<section
				id={PANEL_ID}
				role="tabpanel"
				aria-labelledby={planTierTabId(plan.planId)}
				className={cn(PLAN_CONTAINER_CLASS, "flex flex-col items-center pt-4 pb-7")}
			>
				<h2 className="px-0.5 pb-2 text-head1 text-strong">{plan.name}</h2>
				<p className="whitespace-pre-line px-0.5 text-center text-body1 text-light">
					{plan.description && <span className="block">{plan.description}</span>}
					<span className="block text-lightest">(VAT 포함)</span>
				</p>

				<div className="mt-9 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-7.5">
					{plan.prices.map((price) => (
						<PlanCard
							key={price.billingCycle}
							plan={plan}
							price={price}
							isCurrent={
								activeSubscription?.planId === plan.planId &&
								activeSubscription.billingCycle === price.billingCycle
							}
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
