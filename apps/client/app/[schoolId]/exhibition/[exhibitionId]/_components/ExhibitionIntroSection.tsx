import { Button } from "components";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";

interface ExhibitionIntroProps {
	exhibition: Exhibition;
}

export function ExhibitionIntro({ exhibition }: ExhibitionIntroProps) {
	const rows = [
		{ label: "주최 대학", value: exhibition.host },
		{ label: "학과", value: exhibition.department },
	];

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title={exhibition.title} />
			<RowList rows={rows} />
			<Button variant="main" className="w-full mt-7">
				전시물 감상하기
			</Button>
		</section>
	);
}
