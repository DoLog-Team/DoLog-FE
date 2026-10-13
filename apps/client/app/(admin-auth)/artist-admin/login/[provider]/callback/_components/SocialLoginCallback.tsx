"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { rememberSignupName } from "@/components/common/WelcomeModal/WelcomeModal";
import { loginArtistSocial, type SocialLoginFailure } from "@/lib/api/auth";
import { notifyAuthChange } from "@/lib/auth/useAuthRole";
import {
	consumePendingSocialLogin,
	DEFAULT_LOGIN_REDIRECT,
	type SocialProvider,
} from "../../../_lib/socialLogin";

type SocialLoginCallbackProps = {
	provider: SocialProvider;
};

export const SocialLoginCallback = ({ provider }: SocialLoginCallbackProps) => {
	const router = useRouter();
	// 개발 모드(StrictMode)에서 effect 가 두 번 실행돼도 코드를 한 번만 교환하도록 막는다
	const startedRef = useRef(false);

	useEffect(() => {
		if (startedRef.current) return;
		startedRef.current = true;

		const params = new URLSearchParams(window.location.search);
		const code = params.get("code");
		const state = params.get("state");
		const providerError = params.get("error");
		// 인가 코드가 주소창·방문 기록에 남지 않도록 쿼리를 먼저 지운다
		window.history.replaceState(null, "", window.location.pathname);

		const pending = consumePendingSocialLogin();

		// 로그인 화면으로 돌아가 실패 모달을 띄운다 (사유는 디버깅용으로 주소에 남긴다)
		const fail = (reason: SocialLoginFailure) => {
			const search = new URLSearchParams({ error: reason });
			if (pending?.redirect) search.set("redirect", pending.redirect);
			router.replace(`/artist-admin/login?${search}`);
		};

		if (providerError) return fail("CANCELLED");
		// 이 브라우저에서 시작한 요청이 아니면 코드를 BE 로 보내지 않는다
		if (!code || !pending || pending.state !== state || pending.provider !== provider) {
			return fail("INVALID_REQUEST");
		}

		loginArtistSocial({
			provider: provider === "kakao" ? "KAKAO" : "GOOGLE",
			authorizationCode: code,
			redirectUri: pending.redirectUri,
		}).then((result) => {
			if (!result.ok) return fail(result.reason);
			notifyAuthChange();

			// 첫 로그인(회원가입): 약관 동의 → 두록 홈 + 환영 모달 / 이후: 로그인을 시작한 화면
			if (result.data.needsTermsAgreement) {
				rememberSignupName(result.data.profile.name);
				return router.replace("/artist-admin/terms");
			}
			router.replace(pending.redirect ?? DEFAULT_LOGIN_REDIRECT);
		});
	}, [provider, router]);

	return <Spinner />;
};
