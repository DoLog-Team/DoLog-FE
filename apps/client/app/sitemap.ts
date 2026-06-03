import type { MetadataRoute } from "next";
import { getExhibitions } from "@/lib/api/exhibition";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const exhibitions = await getExhibitions(true);

	const exhibitionUrls = exhibitions.map((e) => ({
		url: `https://dolog.kr/${e.slug ?? e.id}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	return [
		{
			url: "https://dolog.kr",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		...exhibitionUrls,
	];
}
