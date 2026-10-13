// "2026-08-20" → "2026.08.20"
export const toDotDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

// "YYYY-MM-DD" (사용자 시간대 기준)
export const toLocalDate = (date: Date) => date.toLocaleDateString("sv-SE");

// "2026.09.29 14:05"
export const formatSavedAt = (date: Date) => {
	const pad = (value: number) => String(value).padStart(2, "0");
	return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
