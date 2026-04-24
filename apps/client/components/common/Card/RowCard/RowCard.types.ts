export interface RowCardItem {
	id: number;
	name: string; // 태연
	engName: string; // TAE YEON
	email: string;
	imageUrl: string;
}

export interface RowCardProps extends Omit<RowCardItem, "id"> {}

export interface RowCardGridProps {
	items: RowCardItem[];
	limit?: number;
}
