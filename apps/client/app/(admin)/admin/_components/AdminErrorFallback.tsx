"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { Button } from "@/components/common/Button/Button";

interface AdminErrorFallbackProps {
	reset: () => void;
}

// 전시 어드민 화면 데이터를 불러오지 못했을 때 — (admin), (admin-form) 의 error.tsx 가 같이 쓴다
// 실패 문구는 명세에 없어서 다른 실패 안내와 같은 톤으로 둠
// 에러 내용은 서버 로그에 남아서 화면에서는 따로 기록하지 않는다
export const AdminErrorFallback = ({ reset }: AdminErrorFallbackProps) => {
	const router = useRouter();

	// 서버 컴포넌트에서 난 에러라 reset 만으로는 데이터를 다시 받지 않는다 — refresh 로 서버에서 다시 그린다
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
