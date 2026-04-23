"use client";

import { BTSCard } from "./BTSCard";

interface BTSCardGridProps {
	items: { id: number; title: string; author: string; imageUrl: string }[];
}

export const BTSCardGrid = ({ items }: BTSCardGridProps) => {
	return (
		<div className="flex flex-col gap-4 w-full">
			{items.map((item) => (
				<BTSCard key={item.id} title={item.title} author={item.author} imageUrl={item.imageUrl} />
			))}
		</div>
	);
};
