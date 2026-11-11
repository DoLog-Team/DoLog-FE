const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일이면 mailto:, 아니면 일반 URL로 취급해 스킴을 보정한다 — 소통 주소(구매 오픈채팅)와
// 인스타그램이 아닌 SNS 주소가 공유해서 쓴다
export function resolveContactHref(value: string): string | null {
	const trimmed = value.trim();
	if (!trimmed) return null;

	if (EMAIL_PATTERN.test(trimmed)) return `mailto:${trimmed}`;

	// 저장값에 스킴이 없을 수 있다(BE가 형식을 강제하지 않음) — 그래도 링크는 항상 동작해야 하니 여기서 보정한다
	const withScheme =
		trimmed.startsWith("http://") || trimmed.startsWith("https://")
			? trimmed
			: `https://${trimmed}`;

	// "@"가 host 앞(authority의 계정 정보 자리)에 있으면 실제 목적지를 속일 수 있어(https://a@b.com) 막는다.
	// 경로·쿼리에 "@"가 있는 건(카카오톡 오픈채팅 등) 안전하니 URL로 직접 파싱해 좁혀서 체크한다
	try {
		const url = new URL(withScheme);
		if (url.username || url.password) return null;
	} catch {
		return null;
	}

	return withScheme;
}

export function resolveSnsHref(platformName: string, url: string): string | null {
	const trimmed = url.trim();
	if (!trimmed) return null;

	const isInstagram = platformName.toLowerCase() === "instagram" || platformName === "인스타그램";
	if (isInstagram) {
		const segments = trimmed.split("/").filter(Boolean);
		const handle = (segments.at(-1) ?? trimmed).replace(/^@/, "");
		return `https://instagram.com/${handle}/`;
	}

	return resolveContactHref(trimmed);
}
