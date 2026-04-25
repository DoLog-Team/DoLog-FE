import type { BannerItem } from "../_components/Banner";

export const MOCK_BANNERS: BannerItem[] = Array.from({ length: 3 }, (_, i) => ({
	id: i + 1,
	imageUrl: "/images/banner.png",
	orderIndex: i + 1,
	linkUrl: `/exhibitions/${i + 1}`,
}));
