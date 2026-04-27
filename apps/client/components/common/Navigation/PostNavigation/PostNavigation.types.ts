export interface NavItem {
	label: string;
	artistName: string;
	artistId: string;
	direction: "prev" | "next";
}

export interface PostNavigationProps {
	prevPost?: { id: number; title: string };
	nextPost?: { id: number; title: string };
}
