import Link from "next/link";
import { BTSCard } from "./BTSCard";

export interface BTSCardGridProps {
	items: { id: number; title: string; author: string; imageUrl: string }[];
	getHref?: (item: { id: number }) => string;
}

export const BTSCardGrid = ({ items, getHref }: BTSCardGridProps) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			{items.map((item) =>
				getHref ? (
					<Link key={item.id} href={getHref(item)}>
						<BTSCard title={item.title} author={item.author} imageUrl={item.imageUrl} />
					</Link>
				) : (
					<BTSCard key={item.id} title={item.title} author={item.author} imageUrl={item.imageUrl} />
				),
			)}
		</div>
	);
};
