"use client";

import { Modal } from "./Modal";

export interface UnsavedChangesModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onDiscard: () => void;
	onSave: () => void;
	isSaving?: boolean;
}

// 저장 안 한 변경 내용이 있는 채로 나가려 할 때 뜨는 공용 확인 모달
export const UnsavedChangesModal = ({
	open,
	onOpenChange,
	onDiscard,
	onSave,
	isSaving,
}: UnsavedChangesModalProps) => (
	<Modal
		open={open}
		onOpenChange={onOpenChange}
		title="변경 내용이 있어요"
		description={
			<>
				아직 저장되지 않은 변경 내용이 있어요.
				<br />
				내용 유실을 막기 위해서는 변경 내용을 저장해주세요.
			</>
		}
		showCloseButton
		actions={[
			{ text: "저장 없이 나가기", variant: "assistive", onClick: onDiscard },
			{ text: "저장하기", variant: "primary", onClick: onSave, disabled: isSaving },
		]}
	/>
);
