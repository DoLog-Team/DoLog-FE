export interface Artist {
	id: string;
	name: string;

	engName?: string;
	imageUrl?: string;
	bio?: string;

	email?: string; // 👈 따로 존재
	sns?: {
		label: string;
		value: string;
	}[];
}
