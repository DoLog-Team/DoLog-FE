import type { NoticeContent } from "@/lib/hooks/useNoticeModal";
import { Modal } from "./Modal";

interface NoticeModalProps {
	notice: NoticeContent | null;
	onClose: () => void;
}

// 제목 + 설명 + 확인 버튼 하나뿐인 단순 안내 모달 (useNoticeModal과 함께 쓴다)
export function NoticeModal({ notice, onClose }: NoticeModalProps) {
	return (
		<Modal
			open={notice !== null}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
			title={notice?.title ?? ""}
			description={notice?.description}
			actions={[{ text: "확인", variant: "assistive", onClick: onClose }]}
		/>
	);
}
