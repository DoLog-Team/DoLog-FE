import { Button } from "components";
import Link from "next/link";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { ExhibitionDetail } from "@/lib/api/exhibition";
import { EXHIBITION_TYPE_LABEL } from "@/lib/constants/exhibition";

interface ExhibitionIntroProps {
	exhibition: ExhibitionDetail;
	exhibitionId: string;
}

export function ExhibitionIntroSection({ exhibition, exhibitionId }: ExhibitionIntroProps) {
	const rows = [
		{ label: "주최 대학", value: exhibition.univName },
		{ label: "학과", value: exhibition.deptName },
		{ label: "유형", value: EXHIBITION_TYPE_LABEL[exhibition.exhibitionType]},
	];

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title={exhibition.title} />
			<RowList rows={rows} />
			<Link href={`/${exhibitionId}/artwork`}>
				<Button variant="main" className="w-full mt-7">
					전시물 감상하기
				</Button>
			</Link>
		</section>
	);
}
