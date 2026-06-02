import { buttonVariants } from "components";
import type { Metadata } from "next";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import MainFooter from "@/components/common/Footer/MainFooter";
import { PageTracker } from "@/components/common/PageTracker";
import { Title } from "@/components/common/Title/Title";
import { TrackedLink } from "@/components/common/TrackedLink";
import { getMainArtworks } from "@/lib/api/artwork";
import { getBanners, getExhibitions, getMainExhibitions } from "@/lib/api/exhibition";
import Banner from "./_components/Banner";
import CategorySection from "./_components/CategorySection";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { TrackedExhibitionLink } from "./_components/TrackedExhibitionLink";
// import { MOCK_BANNERS } from "./_mocks/banner";
// import { MOCK_EXHIBITIONS } from "./_mocks/exhibition";
// import { MOCK_SECTIONS } from "./_mocks/section";

export const metadata: Metadata = {
	title: "두록(Dolog) | 대학 전시 웹사이트 제작 및 작품 아카이빙 플랫폼",
	description:
		"두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.",
	alternates: {
		canonical: "https://dolog.kr",
	},
	openGraph: {
		type: "website",
		url: "https://dolog.kr",
		siteName: "두록(Dolog)",
		locale: "ko_KR",
		title: "두록 DOLOG",
		description: "대학 전시 및 작품 아카이빙 플랫폼",
		images: [{ url: "/images/og-default.png" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "두록 DOLOG",
		description: "대학 전시 및 작품 아카이빙 플랫폼",
		images: ["/images/og-default.png"],
	},
};

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "두록",
	alternateName: "Dolog",
	url: "https://dolog.kr/",
	logo: "https://dolog.kr/logo.svg",
	description:
		"두록은 대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼입니다. 졸업 전시, 과제전 및 기타 예술 창작 계열 대학 전시를 온라인으로 기록할 수 있습니다.",
	sameAs: ["https://www.instagram.com/dolog.archive"],
};

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "두록",
	alternateName: "Dolog",
	url: "https://dolog.kr/",
	description: "대학 전시를 위한 전시 웹사이트 제작 및 작품 아카이빙 플랫폼",
};

export default async function MainPage() {
	const [banners, mainExhibitions, allExhibitions, mainArtworks] = await Promise.all([
		getBanners(),
		getMainExhibitions(),
		getExhibitions(),
		getMainArtworks(),
	]);
	const displayBanners = banners;
	const displayExhibitions =
		mainExhibitions.length > 0 ? mainExhibitions : allExhibitions.slice(0, 3);
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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
			/>
			<PageTracker pageName="main" />
			<Header />
			<Banner banners={displayBanners} />

			<DesktopContainer>
				<section className="flex flex-col pt-6 pb-6">
					<Title title="진행 중인 전시" />
					<div className="flex flex-col gap-4 mt-4 min-[721px]:grid min-[721px]:grid-cols-3">
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
			</DesktopContainer>

			<Divider />

			<DesktopContainer>
				<CategorySection
					title="전체 작품"
					categories={["작품"]}
					artworks={{
						작품: allArtworks,
					}}
					slugMap={artworkSlugMap}
				/>
			</DesktopContainer>
			<MainFooter />
		</div>
	);
}
