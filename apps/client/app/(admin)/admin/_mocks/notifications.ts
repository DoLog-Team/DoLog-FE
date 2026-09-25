import type { NotificationItem } from "@/components/common/NotificationSidebar/NotificationSidebar";

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
	{
		id: 1,
		title: "전시 작품 수 초과",
		description:
			"물에서 지나온 이야기 전시에 연결된 작품 수가 플랜 한도를 초과했어요. 4개의 작품이 노출되지 않고 있어요.",
		createdAt: hoursAgo(2),
		isRead: false,
	},
	{
		id: 2,
		title: "소속 작가 작품 출품 취소",
		description:
			"김두록 작가가 흙의 기억 작품의 출품을 취소했어요. 더 이상 해당 작품이 전시에서 보이지 않아요.",
		createdAt: hoursAgo(5),
		isRead: false,
	},
	{
		id: 3,
		title: "플랜 만료 임박 안내",
		description:
			"물에서 지나온 이야기 전시의 사용 기간이 7일 남았어요. 기간이 만료되면 전시가 비공개로 전환돼요.",
		createdAt: hoursAgo(30),
		isRead: true,
	},
];
