import { cn } from "components";
import { scrollTabItemVariants } from "./ScrollTabBar.styles";

export interface ScrollTab {
	id: string;
	label: string;
}

interface ScrollTabBarProps {
	tabs: readonly ScrollTab[];
	activeTab: string;
	onTabClick: (tabId: string) => void;
	className?: string;
}

export const ScrollTabBar = ({ tabs, activeTab, onTabClick, className }: ScrollTabBarProps) => {
	return (
		<div
			className={cn(
				"fixed bottom-0 w-full max-w-135 z-20 bg-normal",
				className,
			)}
		>
			<div className="flex overflow-x-auto scrollbar-hide px-4">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab.id}
						onClick={() => onTabClick(tab.id)}
						className={scrollTabItemVariants({ active: activeTab === tab.id })}
					>
						{tab.label}
					</button>
				))}
			</div>
		</div>
	);
};
