import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { cn } from "@/lib/utils/cn";
import { tabItemVariants } from "./TabBar.styles";

export interface Tab {
	id: string;
	label: string;
	badge?: number | string;
}

export interface TabBarProps {
	tabs: Tab[];
	activeTab: string;
	onTabClick: (tabId: string) => void;
	className?: string;
}

export const TabBar = ({ tabs, activeTab, onTabClick, className }: TabBarProps) => {
	return (
		<div className={cn("border-b border-stroke-lightest", className)}>
			<DesktopContainer className="flex overflow-x-auto">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id}
						onClick={() => onTabClick(tab.id)}
						className={tabItemVariants({ active: activeTab === tab.id })}
					>
						{tab.label}
						{tab.badge != null && (
							<div
								className={cn(
									"flex items-center overflow-hidden rounded-xs bg-fg-lighter transition-all duration-200",
									tab.badge === 0 ? "w-0 px-0 opacity-0" : "px-1 opacity-100",
								)}
							>
								<span className="text-body2-bold text-lighter">{tab.badge}</span>
							</div>
						)}
					</button>
				))}
			</DesktopContainer>
		</div>
	);
};
