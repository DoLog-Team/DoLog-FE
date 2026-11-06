"use client";

// 작가 회원가입 1회 환영 모달 (Figma "국문 성명을 필수값에서 제외 10.20 추가 사항") — 약관 동의를 마치고 두록 홈으로 돌아왔을 때 한 번만 띄운다
// 흐름: 약관 동의 완료(queueWelcomeModal) → 두록 홈(WelcomeModal)

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";

const WELCOME_KEY = "dolog_welcome_modal";

const ARTIST_ADMIN_HOME = "/artist-admin";

// 다음에 두록 홈이 열릴 때 환영 모달을 띄우도록 예약한다
export function queueWelcomeModal() {
	sessionStorage.setItem(WELCOME_KEY, "true");
}

export const WelcomeModal = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	// sessionStorage 는 브라우저에만 있어서 마운트 후에 읽는다 — 한 번 읽으면 지워서 새로고침 시 다시 뜨지 않게 한다
	useEffect(() => {
		if (sessionStorage.getItem(WELCOME_KEY) === null) return;
		sessionStorage.removeItem(WELCOME_KEY);
		setOpen(true);
	}, []);

	const close = () => setOpen(false);

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			title="두록에 오신 것을 환영해요!"
			description="마이페이지로 이동해 나만의 프로필을 만들고 작품을 등록해 보세요."
			showCloseButton
			actions={[
				{ text: "작품 관람하기", variant: "assistive", onClick: close },
				{
					text: "마이 페이지로 이동",
					variant: "primary",
					onClick: () => router.push(ARTIST_ADMIN_HOME),
				},
			]}
		/>
	);
};
