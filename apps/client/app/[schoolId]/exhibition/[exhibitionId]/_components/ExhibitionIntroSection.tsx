import { Button } from "components";
import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";
import Link from "next/link";


interface ExhibitionIntroProps {
	exhibition: Exhibition;
	schoolId: string;
	exhibitionId:string;
}

export function ExhibitionIntro({ schoolId, exhibition, exhibitionId }: ExhibitionIntroProps) {
	const rows = [
		{ label: "주최 대학", value: exhibition.host },
		{ label: "학과", value: exhibition.department },
	];

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title={exhibition.title} />
			<RowList rows={rows} />
			<Link href={`/${schoolId}/exhibition/${exhibitionId}/artwork`}>
				<Button variant="main" className="w-full mt-7">
					전시물 감상하기
				</Button>
			</Link>
		</section>
	);
}
