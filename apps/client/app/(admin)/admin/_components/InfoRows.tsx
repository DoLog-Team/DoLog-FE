import { cn } from "@/lib/utils/cn";

interface InfoRowsProps {
	rows: { label: string; value: React.ReactNode }[];
	className?: string;
}

// 피그마 Row List — 이름 80px(Body1 bold) · 값(Body1). 공통 RowList 는 Body2 라 따로 둠
export const InfoRows = ({ rows, className }: InfoRowsProps) => (
	<dl className={cn("flex flex-col gap-1.5", className)}>
		{rows.map(({ label, value }) => (
			<div key={label} className="flex gap-1">
				<dt className="w-20 shrink-0 px-0.5 text-body1-bold text-strong">{label}</dt>
				<dd className="min-w-0 flex-1 px-0.5 text-body1 text-light">{value}</dd>
			</div>
		))}
	</dl>
);
