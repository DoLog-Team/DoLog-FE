import Link from "next/link";
import { Card } from "./Card";
import type { CardGridProps } from "./Card.types";

export const CardGrid = ({ items, limit, getHref }: CardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full">
			{displayedItems.map((item) =>
				getHref ? (
					<Link key={item.id} href={getHref(item)}>
						<Card {...item} />
					</Link>
				) : (
					<Card key={item.id} {...item} />
				),
			)}
		</div>
	);
};
