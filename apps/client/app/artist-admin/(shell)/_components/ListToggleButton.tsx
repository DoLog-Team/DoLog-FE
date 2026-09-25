import Image from "next/image";
import { Button } from "@/components/common/Button/Button";
import { cn } from "@/lib/utils/cn";

interface ListToggleButtonProps {
	expanded: boolean;
	onToggle: () => void;
}

/**
 * 목록 더보기·접기 버튼
 */
export function ListToggleButton({ expanded, onToggle }: ListToggleButtonProps) {
	return (
		<Button
			variant="assistive"
			size="lg"
			aria-expanded={expanded}
			onClick={onToggle}
			className="w-full gap-0 text-body1-bold"
		>
			<span className="px-2">{expanded ? "접기" : "더보기"}</span>
			<Image
				src="/icons/dropdown.svg"
				alt=""
				width={28}
				height={28}
				className={cn(expanded && "rotate-180")}
			/>
		</Button>
	);
}
