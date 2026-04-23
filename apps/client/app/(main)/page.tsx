import Banner, { type BannerItem } from "./_components/Banner";
import { Header } from "./_components/Header";

const MOCK_BANNERS: BannerItem[] = Array.from({ length: 20 }, (_, i) => ({
	id: i + 1,
	imageUrl: "/images/banner.png",
	orderIndex: i + 1,
	linkUrl: `/exhibitions/${i + 1}`,
}));

export default function MainPage() {
	return (
		<div className="flex flex-col">
			<Header />
			<Banner banners={MOCK_BANNERS} />
		</div>
	);
}
