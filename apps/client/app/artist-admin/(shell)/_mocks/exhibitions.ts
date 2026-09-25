// TODO: 작가 어드민 API 연결 후 제거
export interface MyExhibition {
	exhibitionId: string;
	name: string;
	image: string | null;
	startDate: string;
	endDate: string;
	// 수락 대기중이면 null
	acceptedAt: string | null;
}

export const MOCK_MY_EXHIBITIONS: MyExhibition[] = [
	{
		exhibitionId: "1",
		name: "전시회 이름",
		image: "/images/pottery.png",
		startDate: "2025.11.28",
		endDate: "2025.11.29",
		acceptedAt: null,
	},
	{
		exhibitionId: "2",
		name: "전시회 이름",
		image: "/images/banner.png",
		startDate: "2025.11.28",
		endDate: "2025.11.29",
		acceptedAt: "2025-11-20",
	},
	{
		exhibitionId: "3",
		name: "전시회 이름",
		image: "/images/host.png",
		startDate: "2025.11.28",
		endDate: "2025.11.29",
		acceptedAt: "2025-11-18",
	},
	{
		exhibitionId: "4",
		name: "전시회 이름",
		image: null,
		startDate: "2025.11.28",
		endDate: "2025.11.29",
		acceptedAt: "2025-11-15",
	},
	{
		exhibitionId: "5",
		name: "지난 전시회",
		image: "/images/cups.png",
		startDate: "2025.05.01",
		endDate: "2025.05.03",
		acceptedAt: "2025-04-20",
	},
];
