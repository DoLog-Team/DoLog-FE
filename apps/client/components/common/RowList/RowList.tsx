import { cn } from "@/lib/utils/cn";

interface Row {
	label: string;
	value: React.ReactNode;
}

interface RowListProps {
	rows: Row[];
	className?: string;
}

export default function RowList({ rows, className }: RowListProps) {
	return (
		<div className={cn("flex flex-col", className)}>
			{rows.map((row, index) => (
				<div
					key={index}
					className="flex items-start gap-1 min-[721px]:items-center min-[721px]:gap-2.5"
				>
					<span className="w-20 shrink-0 text-body2-bold">{row.label}</span>
					<span className="text-body2 whitespace-pre-wrap">{row.value}</span>
				</div>
			))}
		</div>
	);
}
