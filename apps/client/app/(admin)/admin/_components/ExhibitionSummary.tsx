import { cn } from "@/lib/utils/cn";
import type { AdminExhibition } from "../_mocks/exhibition";
import { InfoRows, toDotDate } from "./InfoRows";

const EMPTY = "-";

const toPeriod = (start: string | null, end: string | null) =>
	start && end ? `${toDotDate(start)} - ${toDotDate(end)}` : EMPTY;

export const ExhibitionSummary = ({ exhibition }: { exhibition: AdminExhibition }) => {
	const { title, type, university, department, startDate, endDate, operatingHours, note } =
		exhibition;

	return (
		<section className="flex flex-col gap-6 pb-6 min-[721px]:pb-7">
			<h1
				className={cn(
					"font-bold text-[24px] leading-8 tracking-[-0.02em] min-[721px]:text-[32px] min-[721px]:leading-10.5",
					title ? "text-strong" : "text-lightest",
				)}
			>
				{title ?? "전시 이름을 설정해주세요"}
			</h1>
			<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-5">
				<InfoRows
					className="flex-1"
					rows={[
						{ label: "전시 유형", value: type ?? EMPTY },
						{ label: "주최 대학", value: university ?? EMPTY },
						{ label: "학과", value: department ?? EMPTY },
					]}
				/>
				<InfoRows
					className="flex-1"
					rows={[
						{ label: "전시 기간", value: toPeriod(startDate, endDate) },
						{ label: "운영 시간", value: operatingHours ?? EMPTY },
						{ label: "비고", value: note ?? EMPTY },
					]}
				/>
			</div>
		</section>
	);
};
