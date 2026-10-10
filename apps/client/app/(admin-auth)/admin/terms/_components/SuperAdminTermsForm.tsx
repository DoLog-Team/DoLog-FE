"use client";

import { useRouter } from "next/navigation";
import { TermsAgreementForm } from "@/components/common/TermsAgreementForm/TermsAgreementForm";

export const SuperAdminTermsForm = () => {
	const router = useRouter();

	return (
		<TermsAgreementForm
			promotion={{
				title: "(선택) 전시 정보의 서비스 홍보 활용 동의",
				description: "작품이 두록 공식 SNS에 소개될 수 있습니다.",
				document: "exhibitionPromotion",
			}}
			onSaved={() => router.replace("/admin")}
		/>
	);
};
