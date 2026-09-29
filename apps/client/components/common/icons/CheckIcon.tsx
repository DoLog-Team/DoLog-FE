interface CheckIconProps {
	size?: number;
	className?: string;
}

export function CheckIcon({ size = 24, className }: CheckIconProps) {
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
			<title>선택</title>
			<path
				d="M20.15 7.40L9.55 18L3.85 12.30L5.28 10.87L9.55 15.15L18.73 5.97L20.15 7.40Z"
				fill="currentColor"
			/>
		</svg>
	);
}
