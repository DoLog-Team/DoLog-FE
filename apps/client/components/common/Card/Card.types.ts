import type { ReactNode } from "react";

export interface CardItem {
	id: number | string;
	imageUrl?: string;
	title: string;
	category?: string;
	author: string;
	exhibitionTitle?: string;
	univName?: string;
	deptName?: string;
	exhibitionType?: string;
	emptyIcon?: ReactNode;
}

export interface CardProps extends Omit<CardItem, "id"> {}

export interface CardGridProps {
	items: CardItem[];
	limit?: number;
	getHref?: (item: CardItem) => string;
	onItemClick?: (item: CardItem) => void;
	className?: string;
	disableHover?: boolean;
	imageObjectFit?: "cover" | "contain";
}
