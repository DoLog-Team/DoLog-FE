import type { CardGridProps } from "../Card.types";
import { ListCard } from "./ListCard";

export const ListCardGrid = ({ items, limit }: CardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className="flex flex-col gap-y-6 w-full">
			{displayedItems.map((item) => (
				<ListCard key={item.id} {...item} />
			))}
		</div>
	);
};
