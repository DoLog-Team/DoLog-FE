import { BTSCardGrid, type BTSCardGridProps } from "@/components/common/Card/BTSCard/BTSCardGrid";
import { Title } from "@/components/common/Title/Title";

interface BtsSectionProps {
	bts: BTSCardGridProps["items"];
}

export const BtsSection = ({ bts }: BtsSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="Behind The Scene" />
			<BTSCardGrid items={bts} />
		</section>
	);
};
