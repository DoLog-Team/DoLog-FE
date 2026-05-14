export interface CardItem {
	id: number | string;
	imageUrl?: string;
	title: string;
	category?: string;
	author: string;
}

export interface CardProps extends Omit<CardItem, "id"> {}

export interface CardGridProps {
	items: CardItem[];
	limit?: number;
	getHref?: (item: CardItem) => string;
	className?: string;
}
