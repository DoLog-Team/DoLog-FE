import { cn } from "@/lib/utils/cn";
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
				"fixed bottom-0 w-full z-20 flex border-t border-stroke-lightest bg-normal min-[721px]:max-w-full",
				className,
			)}
		>
			<div className="flex overflow-x-auto scrollbar-hide px-4 min-[721px]:overflow-x-visible min-[721px]:w-full min-[721px]:max-w-285 min-[721px]:mx-auto min-[721px]:px-10">
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
