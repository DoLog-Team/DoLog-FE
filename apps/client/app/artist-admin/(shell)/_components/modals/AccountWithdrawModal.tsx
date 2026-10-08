"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/common/Modal/Modal";

interface AccountWithdrawModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

/**
 * 계정 탈퇴 확인
 */
export function AccountWithdrawModal({ open, onOpenChange }: AccountWithdrawModalProps) {
	const router = useRouter();

	const handleWithdraw = () => {
		// TODO: 계정 탈퇴 API 연결 후 로그아웃 처리 (탈퇴 계정 정보는 3개월 보관 후 서버에서 삭제)
		onOpenChange(false);
		router.replace("/");
	};

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title="계정 탈퇴하기"
			titleTone="danger"
			description="계정을 탈퇴하면 등록한 작품과 비하인드가 모두 삭제되며, 삭제된 정보는 복구할 수 없어요."
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => onOpenChange(false) },
				{ text: "탈퇴하기", variant: "danger", onClick: handleWithdraw },
			]}
		/>
	);
}
