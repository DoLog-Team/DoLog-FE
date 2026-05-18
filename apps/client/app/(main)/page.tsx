import { buttonVariants } from "components";
import { Divider } from "@/components/common/Divider/Divider";
import MainFooter from "@/components/common/Footer/MainFooter";
import { PageTracker } from "@/components/common/PageTracker";
import { Title } from "@/components/common/Title/Title";
import { TrackedLink } from "@/components/common/TrackedLink";
import { getMainArtworks } from "@/lib/api/artwork";
import { getBanners, getMainExhibitions } from "@/lib/api/exhibition";
import Banner from "./_components/Banner";
import CategorySection from "./_components/CategorySection";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { TrackedExhibitionLink } from "./_components/TrackedExhibitionLink";
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
	const allArtworks = mainArtworks.map((a) => ({
		id: a.id,
		title: a.title,
		imageUrl: a.imageUrl,
		author: a.artistName,
		category: a.deptName,
	}));
	const artworkSlugMap = Object.fromEntries(mainArtworks.map((a) => [a.id, a.slug]));

	return (
		<div className="flex flex-col">
			<PageTracker pageName="main" />
			<Header />
			<Banner banners={displayBanners} />

			<section className="flex flex-col px-4 pt-6 pb-6 ">
				<Title title="진행 중인 전시" />
				<div className="flex flex-col gap-4 mt-4">
					{displayExhibitions.slice(0, 3).map((exhibition) => (
						<TrackedExhibitionLink
							key={exhibition.id}
							href={`/${exhibition.slug ?? exhibition.id}`}
							exhibitionId={exhibition.id}
							exhibitionTitle={exhibition.title}
						>
							<ExhibitionCard {...exhibition} />
						</TrackedExhibitionLink>
					))}
				</div>
				<TrackedLink
					href="/exhibitions"
					eventName="More Button Clicked"
					eventProps={{ target: "exhibitions", page: "main" }}
					className={buttonVariants({ variant: "assistive", className: "mt-7 w-full" })}
				>
					더보기
				</TrackedLink>
			</section>

			<Divider fullBleed={false} />

			<CategorySection
				title="전체 작품"
				categories={["작품"]}
				artworks={{
					작품: allArtworks.length > 0 ? allArtworks : MOCK_SECTIONS[0].artworks.전체,
				}}
				slugMap={artworkSlugMap}
			/>
			<MainFooter />
		</div>
	);
}
