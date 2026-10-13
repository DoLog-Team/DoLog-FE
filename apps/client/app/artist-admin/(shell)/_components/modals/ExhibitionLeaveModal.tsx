"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { leaveExhibition, toErrorMessage } from "../../_api/actions";
import type { MyExhibition } from "../../_types";

interface ExhibitionLeaveModalProps {
	exhibition: MyExhibition | null;
	onOpenChange: (open: boolean) => void;
}

/**
 * 전시 나가기 확인 — 전시 참여 종료, 연결된 작품 URL·작가 프로필 제거는 서버가 처리
 */
export function ExhibitionLeaveModal({ exhibition, onOpenChange }: ExhibitionLeaveModalProps) {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOpenChange = (next: boolean) => {
		if (!next) setErrorMessage("");
		onOpenChange(next);
	};

	const handleLeave = async () => {
		if (!exhibition || isSubmitting) return;
		setIsSubmitting(true);
		try {
			await leaveExhibition(exhibition.exhibitionId);
			handleOpenChange(false);
			router.refresh();
		} catch (error) {
			setErrorMessage(toErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Modal
			open={exhibition !== null}
			onOpenChange={handleOpenChange}
			title="전시 나가기"
			titleTone="danger"
			description={
				exhibition
					? `${exhibition.name}에서 나가시겠어요?\n내 작가 프로필과 작품이 더 이상 표시되지 않아요.`
					: undefined
			}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
				{ text: "전시 나가기", variant: "danger", onClick: handleLeave, disabled: isSubmitting },
			]}
		>
			{/* TODO: 실패 안내 UI 는 피그마에 없음 — 임시로 백엔드 문구 표시 */}
			{errorMessage && <p className="text-body3 text-error">{errorMessage}</p>}
		</Modal>
	);
}
