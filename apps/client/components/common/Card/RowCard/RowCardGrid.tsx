import { RowCard } from "./RowCard";
import type { RowCardGridProps } from "./RowCard.types";

export const RowCardGrid = ({ items = [] }: RowCardGridProps) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			{items.map((item) => (
				<RowCard key={item.id} {...item} />
			))}
		</div>
	);
};
