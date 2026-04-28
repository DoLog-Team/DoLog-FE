import Link from "next/link";
import type { CardGridProps } from "../Card.types";
import { ListCard } from "./ListCard";

export const ListCardGrid = ({ items, limit, getHref, className }: CardGridProps) => {
	const displayedItems = limit ? items.slice(0, limit) : items;

	return (
		<div className={`flex flex-col gap-y-6 w-full ${className ?? ""}`}>
			{displayedItems.map((item) =>
				getHref ? (
					<Link key={item.id} href={getHref(item)}>
						<ListCard {...item} />
					</Link>
				) : (
					<ListCard key={item.id} {...item} />
				),
			)}
		</div>
	);
};
