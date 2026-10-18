"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { renameArtwork } from "../_api/updateArtwork";

export interface RenameArtworkModalProps {
	artworkId: string;
	currentTitle: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onRenamed: (title: string) => void;
}

export const RenameArtworkModal = ({
	artworkId,
	currentTitle,
	open,
	onOpenChange,
	onRenamed,
}: RenameArtworkModalProps) => {
	const [renameValue, setRenameValue] = useState(currentTitle);
	const [isRenaming, setIsRenaming] = useState(false);
	const [renameError, setRenameError] = useState("");

	// 모달 열릴 때마다 입력값·에러를 현재 제목 기준으로 초기화
	useEffect(() => {
		if (open) {
			setRenameValue(currentTitle);
			setRenameError("");
		}
	}, [open, currentTitle]);

	const handleConfirm = async () => {
		const trimmed = renameValue.trim();
		setIsRenaming(true);
		setRenameError("");
		try {
			await renameArtwork(artworkId, trimmed);
			onRenamed(trimmed);
			onOpenChange(false);
		} catch {
			setRenameError("이름 변경에 실패했어요. 다시 시도해주세요.");
		} finally {
			setIsRenaming(false);
		}
	};

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title="작품 이름 변경"
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => onOpenChange(false) },
				{
					text: "변경하기",
					variant: "primary",
					disabled: !renameValue.trim() || renameValue === currentTitle || isRenaming,
					onClick: handleConfirm,
				},
			]}
		>
			<Input
				value={renameValue}
				onChange={(e) => setRenameValue(e.target.value)}
				placeholder={currentTitle}
				error={Boolean(renameError)}
				errorMessage={renameError || undefined}
			/>
		</Modal>
	);
};
