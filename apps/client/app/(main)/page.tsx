import { buttonVariants } from "components";
import Link from "next/link";
import MainFooter from "@/components/common/Footer/MainFooter";
import { Title } from "@/components/common/Title/Title";
import { getBanners, getMainExhibitions } from "@/lib/api/exhibition";
import Banner from "./_components/Banner";
// import CategorySection from "./_components/CategorySection";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { MOCK_BANNERS } from "./_mocks/banner";
import { MOCK_EXHIBITIONS } from "./_mocks/exhibition";
// import { MOCK_SECTIONS } from "./_mocks/section";

export default async function MainPage() {
  const [banners, mainExhibitions] = await Promise.all([
    getBanners(),
    getMainExhibitions(),
  ]);
  const displayBanners = banners.length > 0 ? banners : MOCK_BANNERS;
  const displayExhibitions =
    mainExhibitions.length > 0 ? mainExhibitions : MOCK_EXHIBITIONS;

  return (
    <div className="flex flex-col">
      <Header />
      <Banner banners={displayBanners} />

      <section className="flex flex-col px-4 pt-6">
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

      {/* {MOCK_SECTIONS.map((section) => (
				<div key={section.title}>
					<CategorySection
						title={section.title}
						categories={section.categories}
						artworks={section.artworks}
					/>
				</div>
			))} */}
      <MainFooter />
    </div>
  );
}
