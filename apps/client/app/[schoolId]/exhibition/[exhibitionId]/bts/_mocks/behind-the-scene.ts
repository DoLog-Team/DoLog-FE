export interface BehindTheSceneItem {
	id: number;
	imageUrl: string;
	title: string;
	author: string;
}

export const MOCK_BEHIND_THE_SCENE: BehindTheSceneItem[] = [
	{
		id: 1,
		imageUrl: "/images/bts/bts1.png",
		title: "내 졸업 전시 이야기",
		author: "배주현",
	},
	{
		id: 2,
		imageUrl: "/images/bts/bts1.png",
		title: "푸른 색의 미학",
		author: "배주현",
	},
	{
		id: 3,
		imageUrl: "/images/bts/bts1.png",
		title: "내가 흙을 사랑하는 이유",
		author: "강슬기",
	},
	{
		id: 4,
		imageUrl: "/images/bts/bts1.png",
		title: "작업실에서의 하루",
		author: "김민준",
	},
];
