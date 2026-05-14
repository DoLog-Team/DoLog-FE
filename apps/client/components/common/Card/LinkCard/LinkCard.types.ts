export interface LinkItem {
	label: string;
	value: string;
	type?: "email" | "url" | "text";
}

export interface LinkCardProps {
	items: LinkItem[];
	className?: string;
}
