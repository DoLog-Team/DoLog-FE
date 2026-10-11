"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { logout } from "@/lib/api/auth";
import { notifyAuthChange } from "@/lib/auth/useAuthRole";
import { toErrorMessage, withdrawAccount } from "../../_api/actions";

interface AccountWithdrawModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

/**
 * 계정 탈퇴 확인 — 탈퇴 계정 정보는 3개월 보관 후 서버에서 삭제
 */
export function AccountWithdrawModal({ open, onOpenChange }: AccountWithdrawModalProps) {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOpenChange = (next: boolean) => {
		if (!next) setErrorMessage("");
		onOpenChange(next);
	};

	const handleWithdraw = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		try {
			await withdrawAccount();
		} catch (error) {
			setErrorMessage(toErrorMessage(error));
			setIsSubmitting(false);
			return;
		}
		// 탈퇴한 계정의 토큰은 더 이상 쓸 수 없으니 쿠키까지 정리하고 두록 홈으로
		await logout();
		notifyAuthChange();
		handleOpenChange(false);
		router.replace("/");
	};

	return (
		<Modal
			open={open}
			onOpenChange={handleOpenChange}
			title="계정 탈퇴하기"
			titleTone="danger"
			description="계정을 탈퇴하면 등록한 작품과 비하인드가 모두 삭제되며, 삭제된 정보는 복구할 수 없어요."
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
				{ text: "탈퇴하기", variant: "danger", onClick: handleWithdraw, disabled: isSubmitting },
			]}
		>
			{/* TODO: 실패 안내 UI 는 피그마에 없음 — 임시로 백엔드 문구 표시 */}
			{errorMessage && <p className="text-body3 text-error">{errorMessage}</p>}
		</Modal>
	);
}
