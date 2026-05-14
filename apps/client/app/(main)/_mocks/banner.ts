import type { BannerItem } from "@/lib/api/exhibition";

export const MOCK_BANNERS: BannerItem[] = Array.from({ length: 3 }, (_, i) => ({
	id: i + 1,
	imageUrl: "/images/banner.png",
	orderIndex: i + 1,
	linkUrl: `/${i + 1}`,
}));
