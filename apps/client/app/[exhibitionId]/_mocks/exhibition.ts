import type { ExhibitionDetail, ExhibitionHost, HostSns } from "@/lib/api/exhibition";

export const MOCK_EXHIBITION_DETAIL: ExhibitionDetail = {
	exhibitionId: "23fee5cb-6619-4350-b696-5a41b58d36a8",
	univName: "가나다대학교",
	deptName: "시각디자인학과",
	title: "제 28회 졸업전시회: 연결",
	exhibitionImg:
		"https://dolog-s3-873593443627-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com/exhibitions/4bab8d6c-b1a1-48bb-bd2c-3c4e9d8e457e_i015578727847.gif",
	startDate: "2026-11-18",
	endDate: "2026-11-25",
	dateInfo: "매주 월요일 휴관 / 관람시간 10:00 - 18:00",
	description:
		"한국대학교 예술대학 조소과 2026년 졸업전시\n\n〈흙에서 시작되는 이야기〉는 가장 가까운 재료인 '흙'에서 출발합니다.",
	location: {
		address: "서울 중구 필동로1길 30 동국대학교",
		detail_location: "문화관 지하 1층",
		latitude: "37.55788",
		longitude: "127.00315",
	},
	isPublic: true,
};

export const MOCK_EXHIBITION_HOST: ExhibitionHost = {
	hostId: "mock-host-id",
	hostName: "가나다대학교 예술대학",
	hostImageUrl:
		"https://dolog-s3-873593443627-ap-northeast-2-an.s3.ap-northeast-2.amazonaws.com/hosts/1bcc2b5f-dfc6-4f5d-8b94-3c3372998079.webp",
	description:
		"가나다대학교 예술대학은 조형예술, 디자인, 공연예술 등 다양한 분야의 예술 교육을 담당하고 있습니다.",
	email: "art@gnd.ac.kr",
};

export const MOCK_HOST_SNS: HostSns[] = [
	{
		snsId: "mock-sns-1",
		platformName: "Instagram",
		url: "https://instagram.com/mock_art",
	},
	{
		snsId: "mock-sns-2",
		platformName: "YouTube",
		url: "https://youtube.com/@mock_art",
	},
];
