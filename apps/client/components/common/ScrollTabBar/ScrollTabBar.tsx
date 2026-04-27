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
				"fixed bottom-0 px-4 w-full max-w-135 z-20 flex border-t border-stroke-lightest bg-normal",
				className,
			)}
		>
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
	);
};
