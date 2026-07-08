interface DesktopContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function DesktopContainer({ children, className = "" }: DesktopContainerProps) {
	return (
		<div
			className={`w-full px-4 min-[721px]:max-w-285 min-[721px]:mx-auto min-[721px]:px-10 ${className}`}
		>
			{children}
		</div>
	);
}
