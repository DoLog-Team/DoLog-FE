"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { validateJoinCode } from "../../_api/actions";
import type { JoinableExhibition } from "../../_types";

interface ExhibitionJoinModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	// 코드가 확인되면 가입 인사 모달로 넘어간다
	onCodeConfirmed: (exhibition: JoinableExhibition) => void;
}

/**
 * 전시 참여하기 - 입장 코드 입력
 */
export function ExhibitionJoinModal({
	open,
	onOpenChange,
	onCodeConfirmed,
}: ExhibitionJoinModalProps) {
	const [code, setCode] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOpenChange = (next: boolean) => {
		if (!next) {
			setCode("");
			setErrorMessage("");
		}
		onOpenChange(next);
	};

	const isSubmitDisabled = !code.trim() || Boolean(errorMessage) || isSubmitting;

	const handleSubmit = async () => {
		if (isSubmitDisabled) return;
		setIsSubmitting(true);
		const result = await validateJoinCode(code.trim());
		setIsSubmitting(false);

		if (!result.ok) {
			// 없는 코드는 피그마 문구, 만료·이미 신청 등은 백엔드 안내 문구를 보여준다
			setErrorMessage(result.reason === "INVALID_CODE" ? "없는 코드입니다." : result.message);
			return;
		}
		handleOpenChange(false);
		onCodeConfirmed(result.exhibition);
	};

	return (
		<Modal
			open={open}
			onOpenChange={handleOpenChange}
			title="전시 참여하기"
			description="참여하려는 전시의 입장 코드를 입력해주세요."
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
				{
					text: "입장하기",
					variant: "primary",
					onClick: handleSubmit,
					disabled: isSubmitDisabled,
				},
			]}
		>
			{/* form으로 감싸서 엔터키로도 제출할 수 있도록 함 */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<Input
					placeholder="코드를 입력해주세요."
					value={code}
					onChange={(e) => {
						setCode(e.target.value);
						setErrorMessage("");
					}}
					error={Boolean(errorMessage)}
					errorMessage={errorMessage || undefined}
				/>
			</form>
		</Modal>
	);
}
