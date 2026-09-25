import type { ExhibitionAdminLoginResult } from "@/lib/api/auth";

export const MOCK_LOGIN_RESULTS: Record<string, ExhibitionAdminLoginResult> = {
	DOLOG2026: { ok: true, data: { is_first_login: false } },
	FIRST2026: { ok: true, data: { is_first_login: true } },
	EXPIRED2026: { ok: false, reason: "EXPIRED" },
	ERROR2026: { ok: false, reason: "ERROR" },
};
