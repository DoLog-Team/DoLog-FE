import { RowCard } from "./RowCard";
import type { RowCardGridProps } from "./RowCard.types";

export const RowCardGrid = ({ items = [], limit }: RowCardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className="flex flex-col gap-4 w-full">
			{displayedItems.map((item) => (
				<RowCard key={item.id} {...item} />
			))}
		</div>
	);
};
