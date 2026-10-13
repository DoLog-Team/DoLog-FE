import type { Metadata } from "next";
import Link from "next/link";
import { SocialLoginActions } from "./_components/SocialLoginActions";
import { toSafeRedirect } from "./_lib/socialLogin";

export const metadata: Metadata = {
	title: "작가 로그인 | 두록",
	robots: { index: false, follow: false },
};

type ArtistAdminLoginPageProps = {
	searchParams: Promise<{ redirect?: string; error?: string }>;
};

// ?redirect=<경로> 로 들어오면 로그인 후 그 화면으로 돌아간다 (없으면 두록 홈)
// ?error=<사유> 는 콜백에서 로그인에 실패해 돌아온 경우
export default async function ArtistAdminLoginPage({ searchParams }: ArtistAdminLoginPageProps) {
	const { redirect, error } = await searchParams;

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

			<SocialLoginActions redirect={toSafeRedirect(redirect)} hasError={Boolean(error)} />

			<Link href="/admin/login" className="text-body1 text-lightest underline">
				전시 관리자로 계속하기
			</Link>
		</>
	);
}
