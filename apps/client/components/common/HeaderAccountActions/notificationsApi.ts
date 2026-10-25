import { authApiClient } from "@/lib/api/instance";

export type NotificationType =
	| "ARTIST_JOIN_APPROVED"
	| "ARTIST_JOIN_REJECTED"
	| "ARTIST_REMOVED"
	| "ZONE_HIDDEN"
	| "ZONE_SHOWN"
	| "ARTWORK_HIDDEN"
	| "ARTWORK_SHOWN"
	| "ARTWORK_GROUP_ASSIGNED"
	| "ARTWORK_GROUP_REMOVED"
	| "ARTWORK_UNPUBLISHED"
	| "ARTWORK_REPUBLISHED"
	| "ARTIST_JOIN_REQUESTED"
	| "ARTIST_WITHDRAWN"
	| "ARTWORK_CANCELLED"
	| "ARTIST_ACCOUNT_DELETED"
	| "PLAN_EXPIRING_SOON"
	| "PLAN_LIMIT_EXCEEDED";

export interface NotificationResponse {
	id: string;
	type: NotificationType;
	payload: Record<string, string>;
	referenceId: string;
	isRead: boolean;
	createdAt: string;
}

interface NotificationListResponse {
	notifications: NotificationResponse[];
	unreadCount: number;
}

export async function getNotifications(size = 20): Promise<NotificationListResponse> {
	return authApiClient<NotificationListResponse>(`/notifications?size=${size}`);
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
	await authApiClient<void>(`/notifications/${notificationId}/read`, { method: "PATCH" });
}

export async function markAllNotificationsAsRead(): Promise<void> {
	await authApiClient<void>("/notifications/read-all", { method: "PATCH" });
}
