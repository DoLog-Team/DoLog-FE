import { cn } from "@/lib/utils/cn";

interface DotsLoaderProps {
	className?: string;
}

// 색이 옅은 점부터 진한 점 순서 (피그마 Dot 6x6 — #000, opacity 0.2 / 0.4 / 1)
const DOT_OPACITIES = ["opacity-20", "opacity-40", "opacity-100"];

// 저장 중처럼 버튼 텍스트 자리에 넣는 작은 점 3개짜리 로딩 인디케이터 (피그마 Dot 6x6)
export function DotsLoader({ className }: DotsLoaderProps) {
	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			{DOT_OPACITIES.map((opacityClass, i) => (
				<span
					key={opacityClass}
					className={cn("size-1.5 animate-dot-wave rounded-full bg-black", opacityClass)}
					style={{ animationDelay: `${i * 0.15}s` }}
				/>
			))}
		</span>
	);
}
