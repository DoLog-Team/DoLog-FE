import Image from "next/image";

interface EmptyFallBackProps {
	className?: string;
	iconSize?: number;
}

export function EmptyImageFallback({ className, iconSize = 32 }: EmptyFallBackProps) {
	return (
		<div className={`bg-fg-lighter flex items-center justify-center ${className ?? ""}`}>
			<Image src="/icons/empty-image.svg" alt="이미지 없음" width={iconSize} height={iconSize} />
		</div>
	);
}
