import type { AccountRole } from "@/components/common/HeaderAccountActions/profileMenu";

// TODO: 로그인 상태 API 연결 후 제거
// guest: 비로그인 / 그 외: 로그인한 계정 (AccountRole)
export type DologAuthRole = "guest" | AccountRole;

// 헤더 확인용 — 값을 바꿔가며 로그인 상태별 헤더를 볼 수 있음
export const MOCK_AUTH_ROLE: DologAuthRole = "guest";
