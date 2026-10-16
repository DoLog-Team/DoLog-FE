import type { ReactNode } from "react";
import { useState } from "react";

export interface NoticeContent {
	title: string;
	description?: ReactNode;
}

// "제목 + 설명 + 확인 버튼 하나"뿐인 단순 안내 모달들이 공통으로 쓰는 상태.
// 렌더링은 components/common/Modal/NoticeModal.tsx 가 담당한다.
export function useNoticeModal() {
	const [notice, setNotice] = useState<NoticeContent | null>(null);

	return {
		notice,
		showNotice: (title: string, description?: ReactNode) => setNotice({ title, description }),
		closeNotice: () => setNotice(null),
	};
}
