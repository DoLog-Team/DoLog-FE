import type { Metadata } from "next";
import Link from "next/link";
import { SocialLoginButton } from "./_components/SocialLoginButton";

export const metadata: Metadata = {
	title: "작가 로그인 | 두록",
	robots: { index: false, follow: false },
};

// TODO: 소셜 로그인 API 연결 시 각 버튼에 OAuth 이동 처리 추가
export default function ArtistAdminLoginPage() {
	return (
		<>
			<header className="flex w-full flex-col items-center gap-10 text-center">
				<h1 className="font-bold text-[24px] text-strong leading-8 tracking-[-0.02em] min-[721px]:text-[32px] min-[721px]:leading-10.5">
					쉽게 가입하고
					<br />
					간편하게 로그인해요
				</h1>
				<p className="text-body1 text-lighter">함께 만들어가는 졸업전시, 두록</p>
			</header>

			<div className="flex w-full flex-col gap-4">
				<SocialLoginButton provider="kakao" />
				<SocialLoginButton provider="google" />
			</div>

			<Link href="/admin/login" className="text-body1 text-lightest underline">
				전시 관리자로 계속하기
			</Link>
		</>
	);
}
