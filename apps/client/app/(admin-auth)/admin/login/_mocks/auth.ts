import type { ExhibitionAdminLoginResult } from "@/lib/api/auth";

export const MOCK_LOGIN_RESULTS: Record<string, ExhibitionAdminLoginResult> = {
	DOLOG2026: {
		ok: true,
		data: { exhibitionId: "mock-exhibition", needsTermsAgreement: false, role: "EXHIBITION_ADMIN" },
	},
	FIRST2026: {
		ok: true,
		data: { exhibitionId: "mock-exhibition", needsTermsAgreement: true, role: "EXHIBITION_ADMIN" },
	},
	EXPIRED2026: { ok: false, reason: "EXPIRED" },
	ERROR2026: { ok: false, reason: "ERROR" },
};
