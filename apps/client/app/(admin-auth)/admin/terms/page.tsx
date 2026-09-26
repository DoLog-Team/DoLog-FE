import type { Metadata } from "next";
import { SuperAdminTermsForm } from "./_components/SuperAdminTermsForm";

export const metadata: Metadata = {
	title: "이용 약관 동의 | 두록",
	robots: { index: false, follow: false },
};

export default function ExhibitionAdminTermsPage() {
	return (
		<div className="flex w-full flex-col items-center gap-12.5">
			<header className="flex flex-col items-center gap-4 text-center">
				<h1 className="font-bold text-[24px] text-strong leading-8 tracking-[-0.02em] min-[721px]:text-[32px] min-[721px]:leading-10.5">
					전시 관리자
					<br />
					이용 약관에 동의해주세요
				</h1>
				<p className="text-body1 text-lighter">함께 만들어가는 졸업전시, 두록</p>
			</header>
			<SuperAdminTermsForm />
		</div>
	);
}
