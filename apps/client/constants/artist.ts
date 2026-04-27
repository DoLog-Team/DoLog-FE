import type { Artist } from "@/features/artists/mappers/artist.mapper";

export const MOCK_ARTIST_DATA: Artist[] = [
	{
		id: "1",
		name: "강슬기",
		engName: "KANG SEULGI",
		imageUrl: "/images/artists/artist4.png",
		bio: "안녕하세요 강슬기입니다. 저는 흙을 매개로 인간의 감정과 경험을 탐구하는 작업을 하고 있습니다. 흙은 제게 단순한 재료가 아니라, 이야기를 담는 그릇이자, 소통의 매개체입니다. 제 작품에서는 흙의 물성과 질감을 살리면서도, 현대 사회에서의 인간 관계와 정체성에 대한 질문을 던지려고 노력합니다. 앞으로도 흙을 통해 더 많은 이야기를 전하고 싶습니다.",
		email: "seulgi@dolog.site",
		sns: [
			{ label: "instagram", value: "https://instagram.com/seulgi" },
			{ label: "Behance", value: "https://behance.net/seulgi" },
			{ label: "X", value: "https://x.com/seulgi" },
		],
	},
	{
		id: "2",
		name: "하연희",
		engName: "HA YEON HEE",
		imageUrl: "/images/artists/artist2.png",
		bio: "안녕하세요 하연희입니다. 저는 디자인과 기술의 경계를 탐구하며, 사용자 경험을 중심으로 작업하고 있습니다.",
		email: "yeonhee@dolog.site",
		sns: [
			{ label: "Behance", value: "https://behance.net/yeonhee" },
			{ label: "X", value: "https://x.com/yeonhee" },
		],
	},
	{
		id: "3",
		name: "오찬주",
		engName: "OH CHANJOO",
		imageUrl: "/images/artists/artist5.png",
		bio: "안녕하세요 오찬주입니다. 저는 코딩이 제 작업의 중요한 도구이자 표현 수단이라고 생각합니다. 제 작품에서는 인터랙티브한 요소와 디지털 미디어를 활용하여 관객과 소통하려고 노력합니다.",
		email: "chanjoo@dolog.site",
		sns: [
			{ label: "instagram", value: "https://instagram.com/chanjoo" },
			{ label: "Behance", value: "https://behance.net/chanjoo" },
			{ label: "X", value: "https://x.com/chanjoo" },
		],
	},
	{
		id: "4",
		name: "이보연",
		engName: "LEE BOYEON",
		imageUrl: "/images/artists/artist3.png",
		bio: "안녕하세요 이보연입니다. 저는 전통적인 공예 기법과 현대적인 디자인을 결합하여 새로운 형태의 작품을 만들고 있습니다. 제 작업에서는 재료의 본질과 그 안에 담긴 이야기를 탐구하려고 노력합니다.",
		email: "boyeon@dolog.site",
		sns: [
			{ label: "instagram", value: "https://instagram.com/boyeon" },
			{ label: "Behance", value: "https://behance.net/boyeon" },
			{ label: "X", value: "https://x.com/boyeon" },
		],
	},
	{
		id: "5",
		name: "김프론트",
		engName: "KIM FRONT",
		imageUrl: "/images/artists/artist2.png",
		bio: "소성 후에 생기는 균열이나 깨짐을 보며 오히려 더 솔직한 형태라고 느꼈어요. 실패를 숨기지 않고 작업의 의미로 남겨보려 했습니다. 앞으로는 불완전함을 새 가능성으로 바꾸는 작가가 되고 싶습니다.",
		email: "front@dolog.site",
		sns: [
			{ label: "instagram", value: "https://instagram.com/front" },
			{ label: "Behance", value: "https://behance.net/front" },
			{ label: "X", value: "https://x.com/front" },
		],
	},
];
