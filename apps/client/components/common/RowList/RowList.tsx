interface Row {
    label: string;
    value: string;
}

interface RowListProps {
    rows: Row[];
}

function RowList({ rows }: RowListProps) {
    return (
        <div className="flex flex-col">
            {rows.map((row, index) => (
                <div key={index} className="flex gap-4 py-2">
                    <span className="w-20 shrink-0 text-body2-bold">{row.label}</span>
                    <span className="text-body2">{row.value}</span>
                </div>
            ))}
        </div>
    );
}