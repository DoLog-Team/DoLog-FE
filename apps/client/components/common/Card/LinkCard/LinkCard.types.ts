export interface LinkItem {
	label: string;
	value: React.ReactNode;
}

export interface LinkCardProps {
	items: LinkItem[];
	className?: string;
}
