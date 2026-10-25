import { useEffect, useState } from "react";
import {
	getNotifications,
	markAllNotificationsAsRead,
	markNotificationAsRead,
	type NotificationResponse,
} from "./notificationsApi";

export function useNotifications() {
	const [notifications, setNotifications] = useState<NotificationResponse[]>([]);

	useEffect(() => {
		getNotifications()
			.then((data) => setNotifications(data.notifications))
			.catch(() => {});
	}, []);

	const hasUnread = notifications.some((notification) => !notification.isRead);

	const markAllAsRead = () => {
		if (!hasUnread) return;
		setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
		markAllNotificationsAsRead().catch(() => {});
	};

	const markAsRead = (notificationId: string) => {
		setNotifications((prev) =>
			prev.map((item) => (item.id === notificationId ? { ...item, isRead: true } : item)),
		);
		markNotificationAsRead(notificationId).catch(() => {});
	};

	return { notifications, hasUnread, markAllAsRead, markAsRead };
}
