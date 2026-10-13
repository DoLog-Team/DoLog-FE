import type { Metadata } from "next";
import { ArtistTermsForm } from "./_components/ArtistTermsForm";

export const metadata: Metadata = {
	title: "이용 약관 동의 | 두록",
	robots: { index: false, follow: false },
};

// 소셜 로그인 후 약관 동의가 필요한 작가(needsTermsAgreement)가 들어오는 페이지
export default function ArtistAdminTermsPage() {
	return (
		<div className="flex w-full flex-col items-center gap-12.5">
			<header className="flex flex-col items-center gap-4 text-center">
				<h1 className="text-title1 text-strong">이용 약관에 동의해주세요</h1>
				<p className="text-body1 text-lighter">함께 만들어가는 졸업전시, 두록</p>
			</header>
			<ArtistTermsForm />
		</div>
	);
}
