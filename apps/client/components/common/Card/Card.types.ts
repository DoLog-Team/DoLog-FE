import type { ReactNode } from "react";

export interface CardItem {
	id: number | string;
	imageUrl?: string;
	title: string;
	category?: string;
	// 작가 프로필처럼 한 작가의 작품만 모인 곳에서는 빈 값으로 넘겨 줄을 뺀다
	author?: string;
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
