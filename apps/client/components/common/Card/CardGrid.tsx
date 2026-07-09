import { Card } from "./Card";
import type { CardGridProps } from "./Card.types";

export const CardGrid = ({
	items,
	limit,
	getHref,
	onItemClick,
	className,
	disableHover,
	imageObjectFit,
}: CardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div
			className={`grid grid-cols-2 gap-x-4 gap-y-6 w-full min-[721px]:grid-cols-4 min-[721px]:gap-x-5 min-[721px]:gap-y-[60px] ${className ?? ""}`}
		>
			{displayedItems.map((item) => (
				<Card
					key={item.id}
					{...item}
					href={getHref?.(item)}
					onClick={onItemClick ? () => onItemClick(item) : undefined}
					disableHover={disableHover}
					imageObjectFit={imageObjectFit}
				/>
			))}
		</div>
	);
};
