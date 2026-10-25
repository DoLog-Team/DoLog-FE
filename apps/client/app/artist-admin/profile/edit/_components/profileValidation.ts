import type { ArtistProfileForm, ArtistSnsLink } from "../_types";

// 입력 형식 규칙 — BE ArtistProfileUpdateRequest · ArtistSnsRequest 와 맞춘다

export const INVALID_MESSAGE = "잘못 입력했어요.";

// 입력 중 조합 자모(ㄱ, ㅏ 등)도 허용해야 오류가 깜빡이지 않는다 — 저장할 때는 완성형만 받는다
const NAME_KO_TYPING_PATTERN = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ]*$/;
const NAME_KO_PATTERN = /^[가-힣a-zA-Z0-9 ]*$/;
const NAME_EN_PATTERN = /^[a-zA-Z ]*$/;
const EMAIL_LOCAL_PATTERN = /^[^\s@]+$/;
const EMAIL_DOMAIN_PATTERN = /^[^\s@]+\.[^\s@]+$/;
const SCHEME_PATTERN = /^https?:\/\//i;

// BE 는 http(s):// 로 시작하는 주소만 받는다 — "instagram.com/dolog" 처럼 스킴 없이 적어도 https:// 를 붙여 저장한다
export const normalizeUrl = (url: string) => {
	const trimmed = url.trim();
	if (!trimmed || SCHEME_PATTERN.test(trimmed)) return trimmed;
	return `https://${trimmed}`;
};

// 공백 없이 도메인(점 포함)이 있는 주소인지 — "@dolog" 같은 계정명만 적은 경우는 오류
// TODO: SNS 주소 형식 제한 해제 BE 요청함 — 반영되면 SNS 주소는 검사·https:// 보정 없이 그대로 저장 (구매 링크는 유지)
const isUrlInvalid = (url: string) => {
	const normalized = normalizeUrl(url);
	if (/\s/.test(normalized)) return true;
	try {
		return !new URL(normalized).hostname.includes(".");
	} catch {
		return true;
	}
};

export const isNameKoTypingInvalid = (nameKo: string) => !NAME_KO_TYPING_PATTERN.test(nameKo);
export const isNameKoInvalid = (nameKo: string) => !NAME_KO_PATTERN.test(nameKo);
export const isNameEnInvalid = (nameEn: string) => !NAME_EN_PATTERN.test(nameEn);

// 비어 있으면 저장하지 않으므로 형식 오류가 아니다
export const isEmailInvalid = (local: string, domain: string) => {
	if (!local && !domain) return false;
	return !EMAIL_LOCAL_PATTERN.test(local) || !EMAIL_DOMAIN_PATTERN.test(domain);
};

export const isPurchaseUrlInvalid = (url: string) => Boolean(url.trim()) && isUrlInvalid(url);

// 이름·주소가 모두 빈 행은 저장하지 않는다 — 하나만 채운 행은 오류
export const isSnsRowEmpty = (row: ArtistSnsLink) => !row.label.trim() && !row.url.trim();
export const isSnsLabelInvalid = (row: ArtistSnsLink) => !isSnsRowEmpty(row) && !row.label.trim();
export const isSnsUrlInvalid = (row: ArtistSnsLink) => !isSnsRowEmpty(row) && isUrlInvalid(row.url);

export const isProfileFormValid = (form: ArtistProfileForm) =>
	!isNameKoInvalid(form.nameKo) &&
	!isNameEnInvalid(form.nameEn) &&
	!isEmailInvalid(form.emailLocal, form.emailDomain) &&
	!isPurchaseUrlInvalid(form.purchaseUrl) &&
	form.sns.every((row) => !isSnsLabelInvalid(row) && !isSnsUrlInvalid(row));
