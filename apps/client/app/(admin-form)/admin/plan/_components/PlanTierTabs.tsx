"use client";

import type { Plan } from "@/lib/api/plan.types";
import { cn } from "@/lib/utils/cn";

export const planTierTabId = (planId: string) => `plan-tier-tab-${planId}`;

// 탭은 작품 수 한도로 구분 — 가장 큰 요금제는 바로 아래 요금제 한도 "이상" (피그마: 작품 70개 이상)
const getTabLabel = (plans: Plan[], index: number) => {
	const lowerCount = index > 0 ? plans[index - 1].maxArtworkCount : null;
	if (index === plans.length - 1 && lowerCount !== null) return `작품 ${lowerCount}개 이상`;
	const count = plans[index].maxArtworkCount;
	return count === null ? "작품 수 제한 없음" : `작품 ${count}개`;
};

interface PlanTierTabsProps {
	plans: Plan[];
	selectedId: string;
	onSelect: (planId: string) => void;
	// 탭이 제어하는 패널 id (aria-controls)
	panelId: string;
}

// ARIA 탭 패턴 — 선택된 탭만 Tab 키로 진입, 좌우 방향키로 이동
export const PlanTierTabs = ({ plans, selectedId, onSelect, panelId }: PlanTierTabsProps) => {
	const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
		const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
		if (!step) return;
		const next = plans[(index + step + plans.length) % plans.length];
		onSelect(next.planId);
		document.getElementById(planTierTabId(next.planId))?.focus();
	};

	return (
		<div
			role="tablist"
			aria-label="작품 수별 요금제"
			className="mx-auto flex w-full max-w-125 gap-2.5 rounded-xl bg-fg-lighter px-2 py-1.5"
		>
			{plans.map((plan, index) => {
				const isSelected = plan.planId === selectedId;
				return (
					<button
						key={plan.planId}
						id={planTierTabId(plan.planId)}
						type="button"
						role="tab"
						aria-selected={isSelected}
						aria-controls={panelId}
						tabIndex={isSelected ? 0 : -1}
						onClick={() => onSelect(plan.planId)}
						onKeyDown={(event) => handleKeyDown(event, index)}
						className={cn(
							"flex-1 cursor-pointer rounded-lg py-2.5 text-body2",
							isSelected ? "bg-normal font-medium text-strong" : "text-lighter",
						)}
					>
						{getTabLabel(plans, index)}
					</button>
				);
			})}
		</div>
	);
};
