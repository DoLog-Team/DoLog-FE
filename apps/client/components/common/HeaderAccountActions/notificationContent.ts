import type { NotificationResponse, NotificationType } from "./notificationsApi";

export interface NotificationContent {
	title: string;
	description: string;
	href?: string;
}

const ARTWORK_EXHIBITION_HREF = (artworkId: string) =>
	`/artist-admin/artworks/${artworkId}/exhibition`;

const TEMPLATES: Record<
	NotificationType,
	(payload: Record<string, string>) => NotificationContent
> = {
	ARTIST_JOIN_APPROVED: (p) => ({
		title: "전시 참여 승인",
		description: `참여 신청이 승인되어 ${p.exhibitionName} 전시에 소속되었어요.`,
	}),
	ARTIST_JOIN_REJECTED: (p) => ({
		title: "전시 참여 거절",
		description: `참여 신청이 검토되어 ${p.exhibitionName} 전시 참여가 거절되었어요.`,
	}),
	ARTIST_REMOVED: (p) => ({
		title: "전시 참여 제외",
		description: `전시 관리자의 조치로 ${p.exhibitionName} 전시에서 제외되었어요.`,
	}),
	// 피그마에 별도 문구가 없어 다른 그룹 알림과 같은 톤으로 작성함
	ZONE_HIDDEN: (p) => ({
		title: "작품 그룹 숨김",
		description: `전시 관리자의 조치로 ${p.exhibitionName} 전시의 '${p.zoneName}' 그룹이 숨김 처리되었어요.`,
	}),
	ZONE_SHOWN: (p) => ({
		title: "작품 그룹 재공개",
		description: `전시 관리자의 조치로 ${p.exhibitionName} 전시의 '${p.zoneName}' 그룹이 다시 공개되었어요.`,
	}),
	ARTWORK_HIDDEN: (p) => ({
		title: "작품 숨김",
		description: `전시 관리자의 조치로 ${p.artworkTitle} 작품이 ${p.exhibitionName} 전시 내에서 숨김 처리되었어요.`,
	}),
	ARTWORK_SHOWN: (p) => ({
		title: "작품 재공개",
		description: `전시 관리자의 조치로 ${p.exhibitionName} 전시에서 숨김 처리되었던 ${p.artworkTitle} 작품이 다시 공개되었어요.`,
	}),
	ARTWORK_GROUP_ASSIGNED: (p) => ({
		title: "새 작품 그룹 등록",
		description: `${p.exhibitionName} 전시에 새로운 작품 그룹 '${p.zoneName}'이 추가되었어요. 출품 정보 편집으로 이동하여 작품의 그룹 정보를 확인해 주세요.`,
		href: p.artworkId ? ARTWORK_EXHIBITION_HREF(p.artworkId) : undefined,
	}),
	ARTWORK_GROUP_REMOVED: (p) => ({
		title: "기존 작품 그룹 제거",
		description: `전시 관리자의 조치로, ${p.exhibitionName} 전시의 작품의 기존 그룹 '${p.zoneName}'이 삭제되었어요. 출품 정보 편집으로 이동하여 작품의 그룹 정보를 확인해 주세요.`,
		href: p.artworkId ? ARTWORK_EXHIBITION_HREF(p.artworkId) : undefined,
	}),
	ARTWORK_UNPUBLISHED: (p) => ({
		title: "작품 자동 임시저장 처리",
		description: `전시 관리자의 조치로 ${p.requiredFieldNames} 항목이 필수값으로 추가되었어요. 현재 필수값을 모두 입력하지 않아 ${p.artworkTitle} 작품이 자동 임시저장(비공개) 처리되었어요. ${p.artworkTitle} 작품의 출품 정보 관리 페이지로 이동하여 ${p.requiredFieldNames}을 입력해 주세요.`,
		href: p.artworkId ? ARTWORK_EXHIBITION_HREF(p.artworkId) : undefined,
	}),
	// 백엔드가 어떤 항목이 완화됐는지는 안 줘서(null) 항목명 없이 작성함
	ARTWORK_REPUBLISHED: (p) => ({
		title: "작품 자동 공개 처리",
		description: `전시 관리자의 조치로 필수 조건이 완화되어 ${p.artworkTitle} 작품이 자동 공개 처리되었어요.`,
		href: p.artworkId ? ARTWORK_EXHIBITION_HREF(p.artworkId) : undefined,
	}),
	ARTWORK_FIELDS_HIDDEN: (p) => ({
		title: "작품 항목 숨김",
		description: `전시 관리자의 조치로 ${p.exhibitionName} 전시의 작품 항목 '${p.hiddenFieldNames}'이 숨김 처리되었어요. 전시 내에서 해당 항목이 노출되지 않아요.`,
	}),
	// 전시 어드민 알림 — 피그마에 문구가 명확히 없는 것은 같은 톤으로 작성함
	ARTIST_JOIN_REQUESTED: (p) => ({
		title: "작가 참여 신청",
		description: `${p.artistName} 작가가 ${p.exhibitionName} 전시 참여를 신청했어요.`,
	}),
	ARTIST_WITHDRAWN: (p) => ({
		title: "소속 작가 전시 참여 종료",
		description: `${p.artistName} 작가가 전시에서 나갔어요. 더 이상 해당 작가의 프로필, 작품, 비하인드가 전시에서 보이지 않아요.`,
	}),
	ARTWORK_CANCELLED: (p) => ({
		title: "소속 작가 작품 출품 취소",
		description: `${p.artistName} 작가가 ${p.artworkTitle} 작품의 출품을 취소했어요. 더 이상 해당 작품이 전시에서 보이지 않아요.`,
	}),
	ARTIST_ACCOUNT_DELETED: (p) => ({
		title: "소속 작가 계정 탈퇴",
		description: `${p.artistName} 작가가 계정을 탈퇴했어요. 더 이상 해당 작가의 프로필, 작품, 비하인드가 전시에서 보이지 않아요.`,
	}),
	PLAN_EXPIRING_SOON: (p) => ({
		title: "플랜 만료 임박 안내",
		description: `${p.exhibitionName} 전시의 사용 기간이 얼마 남지 않았어요. 기간이 만료되면 전시가 비공개로 전환돼요.`,
	}),
	PLAN_LIMIT_EXCEEDED: (p) => ({
		title: "전시 작품 수 초과",
		description: `${p.exhibitionName} 전시에 연결된 작품 수가 플랜 한도를 초과했어요. 일부 작품이 노출되지 않고 있어요.`,
	}),
};

const FALLBACK: NotificationContent = {
	title: "새 알림",
	description: "새로운 알림이 도착했어요.",
};

export const toNotificationContent = (notification: NotificationResponse): NotificationContent => {
	const build = TEMPLATES[notification.type];
	if (!build) return FALLBACK;
	try {
		return build(notification.payload ?? {});
	} catch {
		return FALLBACK;
	}
};
