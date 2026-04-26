import { Button } from "components";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";

interface ExhibitionIntroProps {
	exhibition: Exhibition;
}

interface InfoRowProps {
	label: string;
	value?: string;
	subValue?: React.ReactNode;
}

function InfoRow({ label, value, subValue }: InfoRowProps) {
	return (
		<div className="flex gap-4">
			<span className="w-20 flex-shrink-0 text-body2-bold">{label}</span>
			<div className="flex flex-col">
				<span className="text-body2">{value}</span>
				{subValue && <span className="text-body2 mt-0.5">{subValue}</span>}
			</div>
		</div>
	);
}

export function ExhibitionIntro({ exhibition }: ExhibitionIntroProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title={exhibition.title} />

			{/* TODO */}
			<div className="flex flex-col gap-2">
				<InfoRow label="주최 대학" value={exhibition.host} />
				<InfoRow label="학과" value={exhibition.department} />
			</div>
			<Button variant="main" className="w-full mt-7">
				전시물 감상하기
			</Button>
		</section>
	);
}
