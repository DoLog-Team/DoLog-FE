import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import type { ActionFailure } from "../_api/actions";

const FAILURE_MESSAGE = "처리에 실패했어요. 잠시 뒤 다시 시도해주세요.";
const PARTIAL_MESSAGE = "일부만 처리됐어요. 목록을 확인하고 다시 선택해주세요.";

// 명세: 처리 실패 시 선택 유지
export const useAdminAction = () => {
	const router = useRouter();
	const [isRunning, setIsRunning] = useState(false);
	// 처리 후 목록을 새로 불러오는 동안에도 로딩을 유지한다
	const [isRefreshing, startRefresh] = useTransition();
	const refresh = () => startRefresh(() => router.refresh());
	const isProcessing = isRunning || isRefreshing;

	const run = async (action: () => Promise<ActionFailure | null>, clearSelection: () => void) => {
		setIsRunning(true);
		const failure = await action();
		setIsRunning(false);

		if (!failure) {
			clearSelection();
			refresh();
			return;
		}
		if (failure === "UNAUTHORIZED") {
			router.replace(ADMIN_LOGIN_HREF);
			return;
		}
		if (failure === "PARTIAL") {
			// 처리된 항목이 섞인 선택으로 재시도하면 막힐 수 있어서(이미 수락된 작가 재수락 등) 비우고 다시 고르게 한다
			clearSelection();
			refresh();
			alert(PARTIAL_MESSAGE);
			return;
		}
		alert(FAILURE_MESSAGE);
	};

	return { isProcessing, run };
};
