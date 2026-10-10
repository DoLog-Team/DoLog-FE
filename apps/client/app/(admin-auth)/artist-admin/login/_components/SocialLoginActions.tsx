"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { startSocialLogin } from "../_lib/socialLogin";
import { SocialLoginButton } from "./SocialLoginButton";

type SocialLoginActionsProps = {
	redirect?: string;
	// 콜백에서 실패하면 ?error=<사유> 로 돌아온다 — 피그마상 사유와 관계없이 같은 실패 모달을 띄운다
	hasError?: boolean;
};

export const SocialLoginActions = ({ redirect, hasError = false }: SocialLoginActionsProps) => {
	const router = useRouter();
	const [isFailed, setIsFailed] = useState(hasError);

	const closeFailureModal = () => {
		setIsFailed(false);
		// 새로고침해도 모달이 다시 뜨지 않도록 주소에서 error 를 지운다
		const search = redirect ? `?${new URLSearchParams({ redirect })}` : "";
		router.replace(`/artist-admin/login${search}`);
	};

	return (
		<>
			<div className="flex w-full flex-col gap-4">
				<SocialLoginButton provider="kakao" onClick={() => startSocialLogin("kakao", redirect)} />
				<SocialLoginButton provider="google" onClick={() => startSocialLogin("google", redirect)} />
			</div>

			<Modal
				open={isFailed}
				onOpenChange={(open) => !open && closeFailureModal()}
				title="로그인에 실패했어요."
				description={
					<>
						로그인에 실패했어요.
						<br />
						잠시 뒤 다시 시도해주세요.
					</>
				}
				showCloseButton
				actions={[{ text: "확인", variant: "assistive", onClick: closeFailureModal }]}
			/>
		</>
	);
};
