// TODO : 작가 어드민 API 연결 후 제거
export type ArtworkStatus = "draft" | "public" | "private";

export interface MyArtwork {
	artworkId: string;
	title: string;
	image: string | null;
	// null 이면 개인 작품
	exhibition: { exhibitionId: string; name: string; hidden: boolean } | null;
	viewCount: number;
	likeCount: number;
	status: ArtworkStatus;
	completionRate: number;
	createdAt: string;
}

export const MOCK_MY_ARTWORKS: MyArtwork[] = [
	{
		artworkId: "1",
		title: "오후 6시의 고요함",
		image: "/images/plate.png",
		exhibition: { exhibitionId: "1", name: "개미집", hidden: false },
		viewCount: 108,
		likeCount: 108,
		status: "draft",
		completionRate: 20,
		createdAt: "2025-11-20",
	},
	{
		artworkId: "2",
		title: "오후 6시의 고요함",
		image: "/images/cups.png",
		exhibition: { exhibitionId: "1", name: "개미집", hidden: true },
		viewCount: 108,
		likeCount: 108,
		status: "draft",
		completionRate: 20,
		createdAt: "2025-11-19",
	},
	{
		artworkId: "3",
		title: "오후 6시의 고요함",
		image: "/images/pottery.png",
		exhibition: null,
		viewCount: 108,
		likeCount: 108,
		status: "private",
		completionRate: 100,
		createdAt: "2025-11-18",
	},
	{
		artworkId: "4",
		title: "오후 6시의 고요함",
		image: null,
		exhibition: { exhibitionId: "1", name: "개미집", hidden: false },
		viewCount: 108,
		likeCount: 108,
		status: "public",
		completionRate: 100,
		createdAt: "2025-11-17",
	},
	{
		artworkId: "5",
		title: "새벽의 온기",
		image: "/images/plate.png",
		exhibition: null,
		viewCount: 12,
		likeCount: 3,
		status: "public",
		completionRate: 100,
		createdAt: "2025-11-16",
	},
];
