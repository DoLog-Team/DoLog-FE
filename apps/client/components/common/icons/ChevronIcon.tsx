interface ChevronIconProps {
	direction: "left" | "right";
	size?: number;
	className?: string;
}

export function ChevronIcon({ direction, size = 24, className }: ChevronIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<title>{direction === "left" ? "이전" : "다음"}</title>
			<path
				d={
					direction === "left"
						? "M14.707 7.70703L10.4141 12L14.707 16.293L13.293 17.707L8.29297 12.707C7.90244 12.3165 7.90244 11.6835 8.29297 11.293L13.293 6.29297L14.707 7.70703Z"
						: "M9.29297 7.70703L13.5859 12L9.29297 16.293L10.707 17.707L15.707 12.707C16.0976 12.3165 16.0976 11.6835 15.707 11.293L10.707 6.29297L9.29297 7.70703Z"
				}
				fill="currentColor"
			/>
		</svg>
	);
}
