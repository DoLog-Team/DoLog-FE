import { BTSCardGrid, type BTSCardGridProps } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { Title } from "@/components/common/Title/Title";

interface BtsSectionProps {
	bts: BTSCardGridProps["items"];
	exhibitionId: string;
}

export const BtsSection = ({ bts, exhibitionId }: BtsSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="Behind The Scene" />
			<BTSCardGrid items={bts} getHref={(item) => `/${exhibitionId}/bts/${item.id}`} />
		</section>
	);
};
