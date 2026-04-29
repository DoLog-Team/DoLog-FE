export interface Exhibition {
	id: string;
	title: string;
	host: string;
	department: string;
	thumbnailUrl: string;
	guideImages: string[];
	period: {
		start: string;
		end: string;
	};
	hours?: {
		open: string;
		close: string;
		note?: string;
	};
	description: string;
	location: {
		address: string;
		detail: string;
	};
	hostInfo: {
		name: string;
		imageUrl: string;
		description: string;
	};
	socialLinks?: {
		email?: string;
		instagram?: string;
		X?: string;
	};
}

export const MOCK_EXHIBITION_DATA: Exhibition[] = [
	{
		id: "1",
		title: "흙에서 시작되는 모든 이야기",
		host: "한국대학교 예술대학",
		department: "도예과",
		thumbnailUrl: "/images/pottery.png",
		guideImages: ["/images/guide.png"],
		period: {
			start: "2025.11.28",
			end: "2025.12.02",
		},
		hours: {
			open: "10:00",
			close: "18:00",
			note: "(12:00 ~ 13:00 점심시간으로 상주인원이 없음)",
		},
		description:
			"한국대학교 예술대학 조소과 2026년 졸업전시 〈흙에서 시작되는 이야기〉는 가장 가까운 재료인 '흙'에서 출발합니다. 손끝의 저항, 마르는 시간, 균열과 수축 같은 변화 속에서 조각은 형태를 얻고 이야기를 갖게 됩니다.\n\n참여 작가들은 흙을 빚고 깎고 쌓는 과정 자체를 하나의 서사로 확장하며, 개인의 기억과 일상, 도시와 자연의 경계, 사라지는 것들의 흔적을 조각으로 번역합니다.",
		location: {
			address: "서울 중구 필동로1길 30 동국대학교",
			detail: "문화관 한국갤러리 지하 1층",
		},
		hostInfo: {
			name: "동국대학교 예술대학",
			imageUrl: "/images/host.png",
			description:
				"예술은 인간의 가장 깊은 내면을 드러내는 언어이자, 시대를 넘어 공감과 가치를 만들어내는 힘입니다. 한국대학교 예술대학은 지난 수십 년간 창작과 실천을 기반으로 한 교육을 통해 수많은 예술가와 창작 인재를 길러내며 한국 문화예술의 성장에 기여해 왔습니다.\n\n우리의 졸업생들은 무대와 스크린, 전시장과 공연장, 디자인 스튜디오와 콘텐츠 산업 현장, 그리고 연구와 교육의 자리에서 각자의 방식으로 예술의 영향력을 확장하고 있습니다.",
		},
		socialLinks: {
			email: "doyeah@gmail.com",
			instagram: "https://tickets.interpark.com",
			X: "https://tickets.interpark.com",
		},
	},
	{
		id: "2",
		title: "되돌아가는 삶",
		host: "한국대학교",
		department: "불교미술전공",
		thumbnailUrl: "/images/plate.png",
		guideImages: ["/images/guide.png", "/images/artwork/artwork.png"],
		period: {
			start: "2025.11.28",
			end: "2025.11.29",
		},
		hours: {
			open: "10:00",
			close: "18:00",
		},
		description: "불교미술전공 졸업전시입니다.",
		location: {
			address: "서울 중구 필동로1길 30 동국대학교 ",
			detail: "예술관 지하1층 101호",
		},
		hostInfo: {
			name: "한국대학교 예술대학",
			imageUrl: "/images/host.png",
			description: "한국대학교 예술대학 소개입니다.",
		},
		socialLinks: {
			email: "https://tickets.interpark.com",
			instagram: "https://tickets.interpark.com",
			X: "https://tickets.interpark.com",
		},
	},
];
