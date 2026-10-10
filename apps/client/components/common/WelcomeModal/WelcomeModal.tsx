"use client";

// 작가 회원가입 1회 환영 모달 (피그마 MODAL 1) — 약관 동의를 마치고 두록 홈으로 돌아왔을 때 한 번만 띄운다
// 흐름: 소셜 로그인 콜백(rememberSignupName) → 약관 동의 완료(queueWelcomeModal) → 두록 홈(WelcomeModal)

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";

const SIGNUP_NAME_KEY = "dolog_signup_name";
const WELCOME_KEY = "dolog_welcome_modal";

const ARTIST_ADMIN_HOME = "/artist-admin";

// 소셜 계정에서 가져온 이름 — 공급자가 주지 않으면 null
export function rememberSignupName(name: string | null) {
	sessionStorage.setItem(SIGNUP_NAME_KEY, name ?? "");
}

// 다음에 두록 홈이 열릴 때 환영 모달을 띄우도록 예약한다
export function queueWelcomeModal() {
	sessionStorage.setItem(WELCOME_KEY, sessionStorage.getItem(SIGNUP_NAME_KEY) ?? "");
	sessionStorage.removeItem(SIGNUP_NAME_KEY);
}

export const WelcomeModal = () => {
	const router = useRouter();
	// null 이면 닫힌 상태, 문자열이면 열린 상태 (빈 문자열은 이름 없음)
	const [name, setName] = useState<string | null>(null);

	// sessionStorage 는 브라우저에만 있어서 마운트 후에 읽는다 — 한 번 읽으면 지워서 새로고침 시 다시 뜨지 않게 한다
	useEffect(() => {
		const queued = sessionStorage.getItem(WELCOME_KEY);
		if (queued === null) return;
		sessionStorage.removeItem(WELCOME_KEY);
		setName(queued);
	}, []);

	const close = () => setName(null);

	return (
		<Modal
			open={name !== null}
			onOpenChange={(open) => !open && close()}
			// TODO: 이름이 없을 때(소셜 계정에서 미제공) 제목은 피그마에 없음 — 디자이너 확인 필요
			title={name ? `안녕하세요 ${name}님!` : "안녕하세요!"}
			description="연동된 계정에서 정보를 가져왔어요."
			showCloseButton
			actions={[
				{ text: "작품 관람하기", variant: "assistive", onClick: close },
				{
					text: "내 프로필 보러가기",
					variant: "primary",
					onClick: () => router.push(ARTIST_ADMIN_HOME),
				},
			]}
		/>
	);
};
