import { buttonVariants } from "components";
import Link from "next/link";
import { Divider } from "@/components/common/Divider/Divider";
import MainFooter from "@/components/common/Footer/MainFooter";
import { Title } from "@/components/common/Title/Title";
import { getMainArtworks } from "@/lib/api/artwork";
import { getBanners, getMainExhibitions } from "@/lib/api/exhibition";
import Banner from "./_components/Banner";
import CategorySection from "./_components/CategorySection";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { MOCK_BANNERS } from "./_mocks/banner";
import { MOCK_EXHIBITIONS } from "./_mocks/exhibition";
import { MOCK_SECTIONS } from "./_mocks/section";

export default async function MainPage() {
	const [banners, mainExhibitions, mainArtworks] = await Promise.all([
		getBanners(),
		getMainExhibitions(),
		getMainArtworks(),
	]);
	const displayBanners = banners.length > 0 ? banners : MOCK_BANNERS;
	const displayExhibitions = mainExhibitions.length > 0 ? mainExhibitions : MOCK_EXHIBITIONS;
	const allArtworks = mainArtworks.flatMap((cat) =>
		cat.artworks.map((a) => ({
			id: a.id,
			title: a.title,
			imageUrl: a.imageUrl,
			author: a.artistName,
			category: cat.categoryName,
		})),
	);
	const artworkSlugMap = Object.fromEntries(
		mainArtworks.flatMap((cat) => cat.artworks.map((a) => [a.id, a.slug])),
	);
	console.log("[mainArtworks]", JSON.stringify(mainArtworks, null, 2));

	return (
		<div className="flex flex-col">
			<Header />
			<Banner banners={displayBanners} />

			<section className="flex flex-col px-4 pt-6 pb-6 ">
				<Title title="진행중인 전시회" />
				<div className="flex flex-col gap-4 mt-4">
					{displayExhibitions.slice(0, 3).map((exhibition) => (
						<Link
							key={exhibition.id}
							href={`/${exhibition.slug ?? exhibition.id}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ExhibitionCard {...exhibition} />
						</Link>
					))}
				</div>
				<Link
					href="/exhibitions"
					className={buttonVariants({
						variant: "assistive",
						className: "mt-7 w-full",
					})}
				>
					더보기
				</Link>
			</section>

			<Divider />

			<CategorySection
				title="작품"
				categories={["작품"]}
				artworks={{
					작품: allArtworks.length > 0 ? allArtworks : MOCK_SECTIONS[0].artworks["전체"],
				}}
				slugMap={artworkSlugMap}
			/>
			<MainFooter />
		</div>
	);
}
