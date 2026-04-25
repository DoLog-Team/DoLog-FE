import type { ExhibitionItem } from "../_components/ExhibitionCard";

export const MOCK_EXHIBITIONS: ExhibitionItem[] = [
	{
		id: "uuid-1",
		title: "흙에서 시작되는 모든 이야기",
		univName: "한국대학교",
		deptName: "도예과",
		location: "한국대학교 문화관 지하1층 아트홀",
		imageUrl: "/images/cups.png",
		startDate: "2025-11-28",
		endDate: "2025-11-29",
	},
	{
		id: "uuid-2",
		title: "되돌아가는 삶",
		univName: "한국대학교",
		deptName: "불교미술전공",
		location: "한국대학교 예술관 지하1층 101호",
		imageUrl: "/images/plate.png",
		startDate: "2025-11-28",
		endDate: "2025-11-29",
	},
	{
		id: "uuid-3",
		title: "마음을 여닫는 힘",
		univName: "한국대학교",
		deptName: "시각디자인학과",
		location: "한국대학교 문화관 3층 대강당",
		imageUrl: "/images/pottery.png",
		startDate: "2025-11-28",
		endDate: "2025-11-29",
	},
];
