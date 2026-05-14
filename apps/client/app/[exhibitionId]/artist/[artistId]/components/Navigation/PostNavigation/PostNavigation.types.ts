export interface NavItem {
	label: string;
	artistName: string;
	artistId: string;
	direction: "prev" | "next";
}

export interface PostNavigationProps {
	prevPost?: { id: string; title: string };
	nextPost?: { id: string; title: string };
}
