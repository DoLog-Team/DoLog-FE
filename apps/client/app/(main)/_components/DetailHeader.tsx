"use client";

import { useRouter } from "next/navigation";
import { Header } from "./Header";

interface DetailHeaderProps {
	title: string;
}

export function DetailHeader({ title }: DetailHeaderProps) {
	const router = useRouter();
	const handleBack = () => {
		// 외부 링크로 바로 들어와 돌아갈 히스토리가 없으면 뒤로가기 대신 홈으로 보낸다
		if (window.history.length <= 1) {
			router.push("/");
			return;
		}
		router.back();
	};
	return <Header variant="detail" title={title} onBackClick={handleBack} />;
}
