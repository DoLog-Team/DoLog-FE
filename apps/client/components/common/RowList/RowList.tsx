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
				<div key={index} className="flex gap-4">
					<span className="w-20 shrink-0 text-body2-bold">{row.label}</span>
					<span className="text-body2">{row.value}</span>
				</div>
			))}
		</div>
	);
}
