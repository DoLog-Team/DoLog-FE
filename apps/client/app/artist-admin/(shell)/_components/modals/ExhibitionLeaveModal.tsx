"use client";

import { Modal } from "@/components/common/Modal/Modal";
import type { MyExhibition } from "../../_mocks/exhibitions";

interface ExhibitionLeaveModalProps {
	exhibition: MyExhibition | null;
	onOpenChange: (open: boolean) => void;
}

/**
 * 전시 나가기 확인
 */
export function ExhibitionLeaveModal({ exhibition, onOpenChange }: ExhibitionLeaveModalProps) {
	const handleLeave = () => {
		// TODO: 전시 나가기 API 연결 (전시 참여 종료, 연결된 작품 URL·작가 프로필 제거)
		onOpenChange(false);
	};

	return (
		<Modal
			open={exhibition !== null}
			onOpenChange={onOpenChange}
			title="전시 나가기"
			titleTone="danger"
			description={
				exhibition
					? `${exhibition.name}에서 나가시겠어요?\n내 작가 프로필과 작품이 더 이상 표시되지 않아요.`
					: undefined
			}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => onOpenChange(false) },
				{ text: "전시 나가기", variant: "danger", onClick: handleLeave },
			]}
		/>
	);
}
