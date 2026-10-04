// "2026-08-20" → "2026.08.20"
export const toDotDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

// "YYYY-MM-DD" (사용자 시간대 기준)
export const toLocalDate = (date: Date) => date.toLocaleDateString("sv-SE");
