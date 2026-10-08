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
				<h1 className="text-title1 text-strong">전시 관리자 로그인</h1>
				<p className="text-body1 text-lighter">함께 만들어가는 졸업전시, 두록</p>
			</header>

			<SuperAdminLoginForm />
		</>
	);
}
