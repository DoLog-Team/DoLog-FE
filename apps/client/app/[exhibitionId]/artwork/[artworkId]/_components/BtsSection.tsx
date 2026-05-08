import { BTSCardGrid, type BTSCardGridProps } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { Title } from "@/components/common/Title/Title";
import type { ArtworkBts } from "@/lib/api/artwork";

interface BtsSectionProps {
	bts: ArtworkBts[];
	exhibitionId: string;
}

export const BtsSection = ({ bts, exhibitionId }: BtsSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="Behind The Scene" />
			{/* TODO : author 내려오는지 확인 */}
			<BTSCardGrid 
				items={bts.map((b) => ({
					id: Number(b.id),
					title: b.title,
					author: "",             // TODO: API에 author 없음 — 백엔드 확인 필요
					imageUrl: b.mainImg,
				}))}
				getHref={(item) => `/${exhibitionId}/bts/${item.id}`} />
		</section>
	);
};
