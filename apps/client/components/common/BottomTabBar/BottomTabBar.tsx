interface Tab {
	label: string;
	ref: React.RefObject<HTMLDivElement | null>;
	onTabClick?: () => void;
}

interface BottomTabBarProps {
	tabs: Tab[];
	activeIndex: number;
	scrollOffset?: number;
}

export function BottomTabBar({ tabs, activeIndex, scrollOffset = 0 }: BottomTabBarProps) {
	return (
		<nav className="flex w-full px-4 pb-8.5 fixed bottom-0 bg-white z-10">
			{tabs.map((tab, index) => (
				<button
					type="button"
					key={tab.label}
					onClick={() => {
						tab.onTabClick?.();
						const el = tab.ref.current;
						if (!el) return;
						const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
						window.scrollTo({ top, behavior: "smooth" });
					}}
					className={`flex flex-col w-fit items-center py-3 px-2.5 gap-2 border-t-2 ${
						index === activeIndex
							? "border-fg-default text-fg-default"
							: "border-stroke-lightest text-fg-light"
					}`}
				>
					{tab.label}
				</button>
			))}
		</nav>
	);
}
