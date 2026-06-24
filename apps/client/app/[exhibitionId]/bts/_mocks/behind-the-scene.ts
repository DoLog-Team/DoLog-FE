import type { BtsDetail, BtsListItem } from "@/lib/api/bts";

export const MOCK_BTS_LIST: BtsListItem[] = [
	{
		btsId: "1",
		thumbnail: "/images/bts/bts1.png",
		title: "내 졸업 전시 이야기",
		artistNames: ["강슬기"],
		artworkTitles: null,
	},
	{
		btsId: "2",
		thumbnail: "/images/bts/bts1.png",
		title: "푸른 색의 미학",
		artistNames: ["배주현"],
		artworkTitles: null,
	},
	{
		btsId: "3",
		thumbnail: "/images/bts/bts1.png",
		title: "내가 흙을 사랑하는 이유",
		artistNames: ["강슬기"],
		artworkTitles: null,
	},
	{
		btsId: "4",
		thumbnail: "/images/bts/bts1.png",
		title: "작업실에서의 하루",
		artistNames: ["김민준"],
		artworkTitles: null,
	},
];

export const MOCK_BTS_DETAILS: BtsDetail[] = [
	{
		btsId: "1",
		title: "내 졸업 전시 이야기",
		mainImg: "/images/bts/bts1.png",
		linkLabel: "인스타그램",
		linkUrl: "https://instagram.com",
		content: null,
		artists: [
			{
				participantId: "1",
				nameKo: "강슬기",
				nameEn: "KANG SEULGI",
				profileImage: "/images/artists/artist4.png",
				bio: "일상에서 자주 쓰는 그릇을 만들며 '손에 닿는 감정'을 담고 싶었어요.",
				contact: {
					email: null,
					sns: [
						{ snsId: "1", platformName: "Instagram", url: "https://instagram.com" },
						{ snsId: "2", platformName: "Behance", url: "https://behance.net" },
					],
				},
			},
		],
		relatedArtworks: null,
		recommendedBts: [
			{ btsId: "3", title: "내가 흙을 사랑하는 이유", mainImg: "/images/bts/bts1.png" },
		],
	},
];
