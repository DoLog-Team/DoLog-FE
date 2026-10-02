"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { Textarea } from "@/components/common/Textarea/Textarea";
import type { JoinableExhibition } from "../../_mocks/exhibitionJoin";

interface ExhibitionIntroModalProps {
	exhibition: JoinableExhibition | null;
	onOpenChange: (open: boolean) => void;
}

/**
 * 전시 참여하기 - 입장 코드 확인 후 가입 인사(자기소개) 입력
 */
export function ExhibitionIntroModal({ exhibition, onOpenChange }: ExhibitionIntroModalProps) {
	const [intro, setIntro] = useState("");

	const handleOpenChange = (next: boolean) => {
		if (!next) setIntro("");
		onOpenChange(next);
	};

	const handleSubmit = () => {
		// TODO: 자기소개 제출(전시 참여 신청) API 연결
		handleOpenChange(false);
	};

	return (
		<Modal
			open={exhibition !== null}
			onOpenChange={handleOpenChange}
			title="전시 참여하기"
			description={
				exhibition
					? `${exhibition.name}에 참여하기 위해 자기소개를 입력해주세요.\n양식 : ${exhibition.introFormat}`
					: undefined
			}
			showCloseButton
			actions={[
				{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
				{ text: "제출하기", variant: "primary", onClick: handleSubmit, disabled: !intro.trim() },
			]}
		>
			<Textarea placeholder="학번/이름" value={intro} onChange={(e) => setIntro(e.target.value)} />
		</Modal>
	);
}
