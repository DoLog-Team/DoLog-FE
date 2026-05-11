import RowList from "@/components/common/RowList/RowList";
import { Title } from "@/components/common/Title/Title";
import type { ExhibitionDetail } from "@/lib/api/exhibition";

interface ExhibitionDetailProps {
  exhibition: ExhibitionDetail;
}

export function ExhibitionDetailSection({ exhibition }: ExhibitionDetailProps) {
  const rows = [
    {
      label: "전시 일정",
      value: `${exhibition.startDate} ~ ${exhibition.endDate}`,
    },
    ...(exhibition.dateInfo
      ? [
          {
            label: "추가 사항",
            value: exhibition.dateInfo,
          },
        ]
      : []),
  ];

  return (
    <section className="flex flex-col px-4 pb-6">
      <Title title="전시 소개" />
      <div className="flex flex-col gap-2 mb-4 whitespace-pre-line">
        <RowList rows={rows} />
      </div>
      <p className="text-body1 whitespace-pre-line">{exhibition.description}</p>
    </section>
  );
}
