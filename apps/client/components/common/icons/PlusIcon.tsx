interface PlusIconProps {
	size?: number;
	className?: string;
}

export function PlusIcon({ size = 20, className }: PlusIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<title>추가</title>
			<path
				d="M15.8332 10.8307H10.8332V15.8307H9.1665V10.8307H4.1665V9.16406H9.1665V4.16406H10.8332V9.16406H15.8332V10.8307Z"
				fill="currentColor"
			/>
		</svg>
	);
}
