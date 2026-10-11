"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { Textarea } from "@/components/common/Textarea/Textarea";
import { joinExhibition, toErrorMessage } from "../../_api/actions";
import type { JoinableExhibition } from "../../_types";

interface ExhibitionIntroModalProps {
	exhibition: JoinableExhibition | null;
	onOpenChange: (open: boolean) => void;
}

/**
 * 전시 참여하기 - 입장 코드 확인 후 가입 인사(자기소개) 입력
 */
export function ExhibitionIntroModal({ exhibition, onOpenChange }: ExhibitionIntroModalProps) {
	const router = useRouter();
	const [intro, setIntro] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOpenChange = (next: boolean) => {
		if (!next) {
			setIntro("");
			setErrorMessage("");
		}
		onOpenChange(next);
	};

	const handleSubmit = async () => {
		if (!exhibition || !intro.trim() || isSubmitting) return;
		setIsSubmitting(true);
		try {
			await joinExhibition(exhibition.joinCode, intro.trim());
			handleOpenChange(false);
			// 나의 전시에 "수락 대기중"으로 보이도록 목록을 다시 불러온다
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
			title="전시 참여하기"
			description={
				exhibition
					? `${exhibition.name}에 참여하기 위해 자기소개를 입력해주세요.${
							exhibition.greetingFormat ? `\n양식 : ${exhibition.greetingFormat}` : ""
						}`
					: undefined
			}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
				{
					text: "제출하기",
					variant: "primary",
					onClick: handleSubmit,
					disabled: !intro.trim() || isSubmitting,
				},
			]}
		>
			<Textarea
				placeholder="학번/이름"
				value={intro}
				onChange={(e) => {
					setIntro(e.target.value);
					setErrorMessage("");
				}}
				error={Boolean(errorMessage)}
				errorMessage={errorMessage || undefined}
			/>
		</Modal>
	);
}
