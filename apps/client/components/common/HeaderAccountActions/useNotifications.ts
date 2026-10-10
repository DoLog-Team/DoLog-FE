import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "./mockNotifications";
import type { AccountRole } from "./profileMenu";

// 계정별 알림 데이터 — 알림 UI는 하나로 쓰고, 불러오는 곳만 계정마다 다름
// TODO: 알림 API 연결 시 account로 슈퍼 어드민(109999)·일반 어드민(119999) 알림 목록을 나눠 불러옴
export function useNotifications(_account: AccountRole) {
	const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

	const hasUnread = notifications.some((notification) => !notification.isRead);

	const markAllAsRead = () =>
		setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));

	return { notifications, hasUnread, markAllAsRead };
}
