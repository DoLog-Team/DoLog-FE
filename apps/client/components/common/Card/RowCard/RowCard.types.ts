export interface RowCardItem {
	id: string;
	name: string;
	engName?: string;
	email?: string;
	imageUrl?: string;
}

export interface RowCardProps extends Omit<RowCardItem, "id"> {}

export interface RowCardGridProps {
	items: RowCardItem[];
	limit?: number;
}
