export interface RowCardItem {
	id: string | number;
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
