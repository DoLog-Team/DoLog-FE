import { useExhibition } from "@/app/[exhibitionId]/_context/ExhibitionContext";
import { BTSCardGrid } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkBts } from "@/lib/api/artwork";

interface BtsSectionProps {
	bts: ArtworkBts[];
}

export const BtsSection = ({ bts }: BtsSectionProps) => {
	const { slug } = useExhibition();

	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				<Title title="Behind The Scene" />
				<BTSCardGrid
					items={bts.map((b) => ({
						id: b.id,
						title: b.title,
						author: b.author,
						imageUrl: b.mainImg,
					}))}
					getHref={(item) => `/${slug}/bts/${item.id}`}
				/>
			</DesktopContainer>
		</section>
	);
};
