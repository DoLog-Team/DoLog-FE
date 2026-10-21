import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatSavedAt } from "@/lib/utils/date";

// "임시저장" 버튼류가 공통으로 쓰는 로딩/에러/마지막 저장 시각 상태
export const useAsyncSave = (errorMessage = "임시저장에 실패했어요. 다시 시도해주세요.") => {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);
	const [error, setError] = useState("");
	const [lastSavedAt, setLastSavedAt] = useState("");

	const run = async (save: () => Promise<void>) => {
		setIsSaving(true);
		setError("");
		try {
			await save();
			setLastSavedAt(formatSavedAt(new Date()));
			router.refresh();
			return true;
		} catch {
			setError(errorMessage);
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	return { isSaving, error, lastSavedAt, run };
};
