import { disassemble } from "es-hangul";

export function matchesQuery(text: string, query: string): boolean {
	if (!query) return true;
	return disassemble(text).toLowerCase().includes(disassemble(query).toLowerCase());
}
