import type { Metadata } from "next";
import { SuperAdminLoginForm } from "./_components/SuperAdminLoginForm";

export const metadata: Metadata = {
	title: "전시 관리자 로그인 | 두록",
	robots: { index: false, follow: false },
};

export default function ExhibitionAdminLoginPage() {
	return (
		<>
			<header className="flex flex-col items-center gap-6 text-center">
				<h1 className="font-bold text-[24px] text-strong leading-8 tracking-[-0.02em] min-[721px]:text-[32px] min-[721px]:leading-10.5">
					전시 관리자 로그인
				</h1>
				<p className="text-body1 text-lighter">함께 만들어가는 졸업전시, 두록</p>
			</header>

			<SuperAdminLoginForm />
		</>
	);
}
