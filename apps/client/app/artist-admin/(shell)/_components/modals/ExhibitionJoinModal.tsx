"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { findExhibitionByCode, type JoinableExhibition } from "../../_mocks/exhibitionJoin";

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
	const [isNotFound, setIsNotFound] = useState(false);

	const handleOpenChange = (next: boolean) => {
		if (!next) {
			setCode("");
			setIsNotFound(false);
		}
		onOpenChange(next);
	};

	const handleSubmit = () => {
		// TODO: 입장 코드 조회 API 연결
		const exhibition = findExhibitionByCode(code.trim());
		if (!exhibition) {
			setIsNotFound(true);
			return;
		}
		handleOpenChange(false);
		onCodeConfirmed(exhibition);
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
					disabled: !code.trim() || isNotFound,
				},
			]}
		>
			<Input
				placeholder="코드를 입력해주세요."
				value={code}
				onChange={(e) => {
					setCode(e.target.value);
					setIsNotFound(false);
				}}
				error={isNotFound}
				errorMessage={isNotFound ? "없는 코드입니다." : undefined}
			/>
		</Modal>
	);
}
