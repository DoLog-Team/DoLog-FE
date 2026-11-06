"use client";

import { useState } from "react";

// "변경 내용이 있어요" 확인 모달을 쓰는 수정 화면들이 공유하는 뒤로가기 로직
export function useLeaveConfirm(
	isDirty: boolean,
	save: () => Promise<boolean>,
	onLeave: () => void,
) {
	const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

	const handleBack = () => {
		if (isDirty) {
			setIsLeaveModalOpen(true);
			return;
		}
		onLeave();
	};

	const handleLeaveAndSave = async () => {
		const saved = await save();
		setIsLeaveModalOpen(false);
		if (saved) onLeave();
	};

	return { isLeaveModalOpen, setIsLeaveModalOpen, handleBack, handleLeaveAndSave };
}
