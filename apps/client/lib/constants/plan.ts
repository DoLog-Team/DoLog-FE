import type { TargetSize } from "@/lib/api/plan.types";

// 카드 "대상 고객" 표시 문구
export const TARGET_SIZE_LABEL: Record<TargetSize, string> = {
	SMALL: "소형학과",
	MEDIUM: "중형학과",
	LARGE: "대형학과",
};
