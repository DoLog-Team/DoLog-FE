import { useRouter } from "next/navigation";
import { useState } from "react";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { ActionFailure } from "../_api/actions";

const FAILURE_MESSAGE = "처리에 실패했어요. 잠시 뒤 다시 시도해주세요.";
const PARTIAL_MESSAGE = "일부만 처리됐어요. 남은 항목을 다시 시도해주세요.";

// 명세: 처리 실패 시 선택 유지 — onSuccess(선택 해제)는 성공했을 때만 부른다
export const useAdminAction = () => {
	const router = useRouter();
	const [isProcessing, setIsProcessing] = useState(false);

	const run = async (action: () => Promise<ActionFailure | null>, onSuccess: () => void) => {
		setIsProcessing(true);
		const failure = await action();
		setIsProcessing(false);

		if (!failure) {
			onSuccess();
			router.refresh();
			return;
		}
		if (failure === "UNAUTHORIZED") {
			router.replace(ADMIN_LOGIN_HREF);
			return;
		}
		if (failure === "PARTIAL") {
			// 반영된 앞 묶음이 화면에 보이도록 다시 받는다
			router.refresh();
			alert(PARTIAL_MESSAGE);
			return;
		}
		alert(FAILURE_MESSAGE);
	};

	return { isProcessing, run };
};
