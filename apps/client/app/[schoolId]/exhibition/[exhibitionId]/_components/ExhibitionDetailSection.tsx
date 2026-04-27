import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";
import RowList from "@/components/common/RowList/RowList";

interface ExhibitionDetailProps {
	exhibition: Exhibition;
}

export function ExhibitionDetail({ exhibition }: ExhibitionDetailProps) {
	// mockdata상 description에 \n이 있으면 단락을 분리하기 위함
	// TODO : 백에서 오는 실제 데이터 개행 방식에 따라 수정 예정
	const paragraphs = exhibition.description.split("\n\n").filter(Boolean);

	const rows = [
        {
            label: "전시 일정",
            value: `${exhibition.period.start} ~ ${exhibition.period.end}`,
        },
        ...(exhibition.hours ? [{
            label: "추가 사항",
            value: (
                <>
                    {exhibition.hours.open} ~ {exhibition.hours.close}
                    <br />
                    {exhibition.hours.note}
                </>
            ),
        }] : []),
    ];


	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="전시 소개" />
			<div className="flex flex-col gap-2 mb-4">
				<RowList rows={rows} />
			</div>
			<div className="flex flex-col gap-4">
				{paragraphs.map((paragraph, index) => (
					<p key={index} className="text-body1">
						{paragraph}
					</p>
				))}
			</div>
		</section>
	);
}
