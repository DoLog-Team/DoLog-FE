export interface BehindTheSceneItem {
	id: number;
	imageUrl: string;
	title: string;
	artistId: string;
	author: string;
	authorEngName: string;
	authorImageUrl: string;
	bio: string;
	sns?: { platform: string; url: string };
	authorSns?: { platform: string; url: string }[];
}

export const MOCK_BEHIND_THE_SCENE: BehindTheSceneItem[] = [
	{
		id: 1,
		imageUrl: "/images/bts/bts1.png",
		title: "내 졸업 전시 이야기",
		artistId: "1",
		author: "강슬기",
		authorEngName: "KANG SEULGI",
		authorImageUrl: "/images/artists/artist4.png",
		bio: "일상에서 자주 쓰는 그릇을 만들며 ‘손에 닿는 감정’을 담고 싶었어요. 완벽함보다 사용하며 생기는 흔적을 좋아합니다. 앞으로는 일상의 시간을 조용히 기록하는 작가가 되고 싶습니다.",
		sns: { platform: "Instagram", url: "https://instagram.com" },
		authorSns: [
			{ platform: "Instagram", url: "https://instagram.com" },
			{ platform: "Behance", url: "https://behance.net" },
			{ platform: "X", url: "https://x.com" },
		],
	},
	{
		id: 2,
		imageUrl: "/images/bts/bts1.png",
		title: "푸른 색의 미학",
		artistId: "2",
		author: "배주현",
		authorEngName: "BAE JU HYUN",
		authorImageUrl: "/images/artists/artist2.png",
		bio: "일상에서 자주 쓰는 그릇을 만들며 '손에 닿는 감정'을 담고 싶었어요. 완벽하기보다 사용하며 생기는 흔적을 좋아합니다.",
		sns: { platform: "Instagram", url: "https://instagram.com" },
		authorSns: [
			{ platform: "Instagram", url: "https://instagram.com" },
			{ platform: "Behance", url: "https://behance.net" },
			{ platform: "X", url: "https://x.com" },
		],
	},
	{
		id: 3,
		imageUrl: "/images/bts/bts1.png",
		title: "내가 흙을 사랑하는 이유",
		artistId: "1",
		author: "강슬기",
		authorEngName: "KANG SEULGI",
		authorImageUrl: "/images/artists/artist4.png",
		bio: "안녕하세요 강슬기입니다. 저는 흙을 매개로 인간의 감정과 경험을 탐구하는 작업을 하고 있습니다.",
		sns: { platform: "Instagram", url: "https://instagram.com" },
		authorSns: [
			{ platform: "Instagram", url: "https://instagram.com" },
			{ platform: "Behance", url: "https://behance.net" },
			{ platform: "X", url: "https://x.com" },
		],
	},
	{
		id: 4,
		imageUrl: "/images/bts/bts1.png",
		title: "작업실에서의 하루",
		artistId: "3",
		author: "김민준",
		authorEngName: "KIM MIN JUN",
		authorImageUrl: "/images/artists/artist5.png",
		bio: "작업실에서의 일상을 기록하며 작업의 의미를 찾아가고 있습니다. 불완전함을 새 가능성으로 바꾸는 작가가 되고 싶습니다.",
		sns: { platform: "Instagram", url: "https://instagram.com" },
		authorSns: [
			{ platform: "Instagram", url: "https://instagram.com" },
			{ platform: "Behance", url: "https://behance.net" },
			{ platform: "X", url: "https://x.com" },
		],
	},
];
