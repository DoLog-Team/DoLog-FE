import { buttonVariants } from "components";
import Link from "next/link";
import MainFooter from "@/components/common/Footer/MainFooter";
import { Title } from "@/components/common/Title/Title";
import Banner from "./_components/Banner";
import CategorySection from "./_components/CategorySection";
import ExhibitionCard from "./_components/ExhibitionCard";
import { Header } from "./_components/Header";
import { MOCK_BANNERS } from "./_mocks/banner";
import { MOCK_EXHIBITIONS } from "./_mocks/exhibition";
import { MOCK_SECTIONS } from "./_mocks/section";

export default function MainPage() {
	return (
		<div className="flex flex-col">
			<Header />
			<Banner banners={MOCK_BANNERS} />

			<section className="flex flex-col px-4 pt-6">
				<Title title="진행중인 전시회" />
				<div className="flex flex-col gap-4 mt-4">
					{MOCK_EXHIBITIONS.slice(0, 3).map((exhibition) => (
						<Link
							key={exhibition.id}
							href={`/exhibition/${exhibition.id}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ExhibitionCard {...exhibition} />
						</Link>
					))}
				</div>
				<Link
					href="/exhibitions"
					className={buttonVariants({ variant: "assistive", className: "mt-7 w-full" })}
				>
					더보기
				</Link>
			</section>

			{MOCK_SECTIONS.map((section) => (
				<div key={section.title}>
					{/* TODO: Divider 컴포넌트 머지 후 추가 */}
					<CategorySection
						title={section.title}
						categories={section.categories}
						artworks={section.artworks}
					/>
				</div>
			))}
			<MainFooter />
		</div>
	);
}
