"use client";

import { useRouter } from "next/navigation";
import { TermsAgreementForm } from "@/components/common/TermsAgreementForm/TermsAgreementForm";
import { queueWelcomeModal } from "@/components/common/WelcomeModal/WelcomeModal";
import { fillPendingSocialName } from "../../login/_lib/fillSocialName";

export const ArtistTermsForm = () => {
	const router = useRouter();

	// 회원가입 완료 — 두록 홈으로 이동해 환영 모달을 띄운다
	const handleSaved = async () => {
		// 소셜 로그인 때 저장하지 못한 이름이 있으면 국문 성명에 넣는다 (비어 있을 때만)
		await fillPendingSocialName();
		queueWelcomeModal();
		router.replace("/");
	};

	return (
		<TermsAgreementForm
			promotion={{
				title: "(선택) 콘텐츠의 서비스 홍보 활용 동의",
				description: "작품이 두록 공식 SNS에 소개될 수 있습니다.",
				document: "contentPromotion",
			}}
			onSaved={handleSaved}
		/>
	);
};
