import { Card } from "./Card";
import type { CardGridProps } from "./Card.types";

export const CardGrid = ({ items, limit, getHref, onItemClick, className }: CardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className={`grid grid-cols-2 gap-x-4 gap-y-6 w-full ${className ?? ""}`}>
			{displayedItems.map((item) => (
				<Card
					key={item.id}
					{...item}
					href={getHref?.(item)}
					onClick={onItemClick ? () => onItemClick(item) : undefined}
				/>
			))}
		</div>
	);
};
