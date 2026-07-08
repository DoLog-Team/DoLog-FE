import { RowCard } from "./RowCard";
import type { RowCardGridProps } from "./RowCard.types";

export const RowCardGrid = ({ items = [], limit }: RowCardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;
	const showImage = items.some((item) => item.imageUrl);

	return (
		<div className="flex flex-col gap-4 w-full min-[721px]:grid min-[721px]:grid-cols-2 min-[721px]:[row-gap:var(--grid-flex,30px)] min-[721px]:[column-gap:var(--grid-col-gap,20px)]">
			{displayedItems.map((item) => (
				<RowCard key={item.id} {...item} showImage={showImage} />
			))}
		</div>
	);
};
