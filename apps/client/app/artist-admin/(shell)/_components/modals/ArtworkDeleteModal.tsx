"use client";

import { josa } from "es-hangul";
import { Modal } from "@/components/common/Modal/Modal";

interface ArtworkDeleteModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	artworkTitle: string;
	onConfirm: () => void;
}

/**
 * 작품 삭제 모달 (작가 어드민 작품 카드, 두록 작품 상세 공통)
 */
export function ArtworkDeleteModal({
	open,
	onOpenChange,
	artworkTitle,
	onConfirm,
}: ArtworkDeleteModalProps) {
	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title="작품 삭제"
			titleTone="danger"
			description={
				<span className="text-light">
					<span className="text-body1-bold">{artworkTitle}</span>
					{josa.pick(artworkTitle, "이/가")} 작가 프로필과 참여 중인 전시에서 모두 삭제돼요. 삭제한
					작품은 복구할 수 없어요.
				</span>
			}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => onOpenChange(false) },
				{
					text: "삭제하기",
					variant: "danger",
					onClick: () => {
						onOpenChange(false);
						onConfirm();
					},
				},
			]}
		/>
	);
}
