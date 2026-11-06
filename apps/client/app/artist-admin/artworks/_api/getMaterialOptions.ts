import { apiClient, authApiClient } from "@/lib/api/instance";

interface MaterialOption {
	id: string;
	name: string;
	orderIndex: number;
}

export async function getMaterialOptions(): Promise<string[]> {
	const [defaults, mine] = await Promise.all([
		apiClient<MaterialOption[]>("/artworks/materials").catch(() => []),
		authApiClient<string[]>("/artists/me/materials").catch(() => []),
	]);
	return [...new Set([...defaults.map((option) => option.name), ...mine])];
}
