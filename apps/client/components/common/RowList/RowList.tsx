interface Row {
	label: string;
	value: React.ReactNode;
}

interface RowListProps {
	rows: Row[];
}

export default function RowList({ rows }: RowListProps) {
	return (
		<div className="flex flex-col">
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
