interface SpinnerProps {
	color?: string;
}

export function Spinner({ color = "#FFEB01" }: SpinnerProps) {
	return (
		<div
			className="inline-block rounded-full box-border animate-spin"
			style={{
				width: 48,
				height: 48,
				border: "5px solid var(--color-fg-lighter)",
				borderBottomColor: color,
			}}
		/>
	);
}
