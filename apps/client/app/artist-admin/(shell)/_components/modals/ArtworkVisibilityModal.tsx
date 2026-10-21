"use client";

import { Modal } from "@/components/common/Modal/Modal";

// 공개 작품이면 비공개하기, 비공개 작품이면 공개하기 모달 (피그마 MODAL 4 · 5)
const CONTENT = {
	PUBLISHED: {
		title: "작품 공개하기",
		lines: ["이제 다른 사람이 작품을 관람할 수 있어요.", "언제든 비공개로 전환할 수 있어요."],
		confirmText: "공개하기",
	},
	DRAFT: {
		title: "작품 비공개하기",
		lines: ["이제 다른 사람이 작품을 관람할 수 없어요", "언제든 공개로 전환할 수 있어요."],
		confirmText: "비공개하기",
	},
} as const;

interface ArtworkVisibilityModalProps {
	// 바꿀 상태 — 모달이 닫혀 있으면 null
	nextStatus: "DRAFT" | "PUBLISHED" | null;
	onOpenChange: (open: boolean) => void;
	onConfirm: (status: "DRAFT" | "PUBLISHED") => void;
}

/**
 * 작품 공개하기 / 비공개하기 확인 모달
 */
export function ArtworkVisibilityModal({
	nextStatus,
	onOpenChange,
	onConfirm,
}: ArtworkVisibilityModalProps) {
	// 닫히는 동안에도 문구가 사라지지 않게 마지막 상태 기준으로 그린다
	const content = CONTENT[nextStatus ?? "PUBLISHED"];

	return (
		<Modal
			open={nextStatus !== null}
			onOpenChange={onOpenChange}
			title={content.title}
			description={content.lines.join("\n")}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => onOpenChange(false) },
				{
					text: content.confirmText,
					variant: "primary",
					onClick: () => {
						if (!nextStatus) return;
						onOpenChange(false);
						onConfirm(nextStatus);
					},
				},
			]}
		/>
	);
}
