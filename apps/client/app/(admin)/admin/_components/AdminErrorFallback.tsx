"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@/components/common/Button/Button";

interface AdminErrorFallbackProps {
	reset: () => void;
}

export const AdminErrorFallback = ({ reset }: AdminErrorFallbackProps) => {
	const router = useRouter();

	// 서버 컴포넌트 에러는 reset 만으로 데이터를 다시 받지 않아서 refresh 를 같이 한다
	const retry = () =>
		startTransition(() => {
			router.refresh();
			reset();
		});

	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-20 text-center">
			<div className="flex flex-col gap-1">
				<p className="text-head3 text-strong">화면을 불러오지 못했어요.</p>
				<p className="text-body1 text-lighter">잠시 뒤 다시 시도해주세요.</p>
			</div>
			<Button size="lg" onClick={retry}>
				다시 시도
			</Button>
		</div>
	);
};
