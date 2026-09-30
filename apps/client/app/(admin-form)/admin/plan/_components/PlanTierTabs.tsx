"use client";

import type { PlanTier, PlanTierKey } from "@/lib/constants/plan";
import { cn } from "@/lib/utils/cn";

export const planTierTabId = (key: PlanTierKey) => `plan-tier-tab-${key}`;

interface PlanTierTabsProps {
	tiers: PlanTier[];
	selectedKey: PlanTierKey;
	onSelect: (key: PlanTierKey) => void;
	// 탭이 제어하는 패널 id (aria-controls)
	panelId: string;
}

// ARIA 탭 패턴 — 선택된 탭만 Tab 키로 진입, 좌우 방향키로 이동
export const PlanTierTabs = ({ tiers, selectedKey, onSelect, panelId }: PlanTierTabsProps) => {
	const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
		const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
		if (!step) return;
		const next = tiers[(index + step + tiers.length) % tiers.length];
		onSelect(next.key);
		document.getElementById(planTierTabId(next.key))?.focus();
	};

	return (
		<div
			role="tablist"
			aria-label="작품 수별 요금제"
			className="mx-auto flex w-full max-w-125 gap-2.5 rounded-xl bg-fg-lighter px-2 py-1.5"
		>
			{tiers.map(({ key, tab }, index) => {
				const isSelected = key === selectedKey;
				return (
					<button
						key={key}
						id={planTierTabId(key)}
						type="button"
						role="tab"
						aria-selected={isSelected}
						aria-controls={panelId}
						tabIndex={isSelected ? 0 : -1}
						onClick={() => onSelect(key)}
						onKeyDown={(event) => handleKeyDown(event, index)}
						className={cn(
							"flex-1 cursor-pointer rounded-lg py-2.5 text-body2",
							isSelected ? "bg-normal font-medium text-strong" : "text-lighter",
						)}
					>
						{tab}
					</button>
				);
			})}
		</div>
	);
};
