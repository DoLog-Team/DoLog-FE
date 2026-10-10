import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSocialProvider } from "../../_lib/socialLogin";
import { SocialLoginCallback } from "./_components/SocialLoginCallback";

export const metadata: Metadata = {
	title: "작가 로그인 | 두록",
	robots: { index: false, follow: false },
};

type SocialLoginCallbackPageProps = {
	params: Promise<{ provider: string }>;
};

// 공급자(카카오/구글) 로그인 후 돌아오는 콜백 페이지
export default async function SocialLoginCallbackPage({ params }: SocialLoginCallbackPageProps) {
	const { provider } = await params;
	if (!isSocialProvider(provider)) notFound();

	return <SocialLoginCallback provider={provider} />;
}
