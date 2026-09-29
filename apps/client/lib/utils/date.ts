// "2026-08-20" → "2026.08.20"
export const toDotDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

// "YYYY-MM-DD" (사용자 시간대 기준)
export const toLocalDate = (date: Date) => date.toLocaleDateString("sv-SE");

// "YYYY-MM-DD" + n개월 — 목표 달에 같은 날짜가 없으면 그 달 마지막 날 (1/31 + 1개월 → 2/28)
export const addMonths = (date: string, months: number) => {
	const [year, month, day] = date.split("-").map(Number);
	const lastDay = new Date(year, month - 1 + months + 1, 0).getDate();
	return toLocalDate(new Date(year, month - 1 + months, Math.min(day, lastDay)));
};
