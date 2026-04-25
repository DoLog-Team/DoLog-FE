import { Exhibition } from "@/constants/exhibition";
import { Button } from "components";
import { Title } from "@/components/common/Title/Title";

interface ExhibitionIntroProps {
  exhibition: Exhibition;
}

interface InfoRowProps {
  label: string;
  value: string;
  subValue?: string;
}

function InfoRow({ label, value, subValue }: InfoRowProps) {
  return (
    <div className="flex gap-4">
      <span className="w-20 flex-shrink-0 text-gray-400">{label}</span>
      <div className="flex flex-col">
        <span className="text-gray-800">{value}</span>
        {subValue && (
          <span className="text-xs text-gray-400 mt-0.5">{subValue}</span>
        )}
      </div>
    </div>
  );
}

export function ExhibitionIntro({ exhibition }: ExhibitionIntroProps) {
  return (
    <section className="flex flex-col px-4 pb-6">
        <Title title={exhibition.title}/>

        {/* TODO */}
        <div className="flex flex-col gap-2 text-sm">
          <InfoRow label="주최 대학" value={exhibition.host} />
          <InfoRow label="학과" value={exhibition.department} />
          <InfoRow
            label="전시 일정"
            value={`${exhibition.period.start} ~ ${exhibition.period.end}`}
          />
          <InfoRow
            label="관람 시간"
            value={`${exhibition.hours.open} ~ ${exhibition.hours.close}`}
            subValue={exhibition.hours.note}
          />
        </div>
      <Button variant="main" className="w-full mt-7">
              전시물 감상하기
      </Button>
    </section>
  );
}


