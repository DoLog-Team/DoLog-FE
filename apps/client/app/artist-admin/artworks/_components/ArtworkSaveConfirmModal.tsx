"use client";

import { Modal } from "@/components/common/Modal/Modal";

export interface ArtworkSaveConfirmModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	isSatisfied: boolean;
	isSaving: boolean;
	onConfirm: () => void;
}

// "저장" 버튼을 누르면 뜨는 공용 확인 모달 — 필수값 충족 여부에 따라 설명/버튼 문구가 바뀐다
export const ArtworkSaveConfirmModal = ({
	open,
	onOpenChange,
	isSatisfied,
	isSaving,
	onConfirm,
}: ArtworkSaveConfirmModalProps) => (
	<Modal
		open={open}
		onOpenChange={onOpenChange}
		title="저장하시겠어요?"
		description={
			isSatisfied
				? "작성한 내용이 작품에 반영되며, 공개 상태에 따라 다른 사용자에게도 표시돼요."
				: "아직 필수 정보가 모두 입력되지 않았어요. 작성한 내용은 임시 저장되며, 공개되지 않아요"
		}
		showCloseButton
		actions={[
			{
				text: "취소",
				variant: "assistive",
				onClick: () => onOpenChange(false),
				disabled: isSaving,
			},
			{
				text: isSatisfied ? "저장하기" : "임시 저장하기",
				variant: "primary",
				onClick: onConfirm,
				disabled: isSaving,
			},
		]}
	/>
);
