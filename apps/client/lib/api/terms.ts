import { apiClient } from "@/lib/api/instance";
import type { TermsAgreementRequest } from "./terms.types";

export type * from "./terms.types";

export async function saveTermsAgreement(body: TermsAgreementRequest): Promise<boolean> {
	try {
		await apiClient("/accounts/me/terms", {
			method: "POST",
			body: JSON.stringify(body),
		});
		return true;
	} catch {
		return false;
	}
}
