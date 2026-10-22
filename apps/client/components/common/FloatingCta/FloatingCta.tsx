"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FloatingCtaProps {
	href: string;
	label: string;
	// 닫기 버튼의 접근성 이름
	closeLabel: string;
	// 배경·글자색 (예: 관련 전시 보기는 CTA 색, 전시 외 작품 보기는 반전 색)
	className?: string;
	style?: React.CSSProperties;
}

/**
 * 하단 탭바 위 가운데에 떠 있는 이동 버튼
 * 관련 전시 보기(두록 작품 상세), 전시 외 작품 보기(전시 작가 상세)에서 쓴다
 */
export function FloatingCta({ href, label, closeLabel, className, style }: FloatingCtaProps) {
	const [closed, setClosed] = useState(false);

	if (closed) return null;

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-[62px] z-20 flex justify-center px-4 min-[721px]:bottom-[78px] min-[721px]:px-8">
			<div
				className={cn(
					"pointer-events-auto flex h-9 items-center rounded-lg px-1 shadow-[0_0_20px_rgba(0,0,0,0.2)]",
					className,
				)}
				style={style}
			>
				<Link
					href={href}
					className="flex h-full items-center px-2 text-body2-bold whitespace-nowrap"
				>
					{label}
				</Link>
				<button
					type="button"
					aria-label={closeLabel}
					onClick={() => setClosed(true)}
					className="flex size-5 cursor-pointer items-center justify-center"
				>
					<span className="size-5 bg-current mask-[url(/icons/close.svg)] mask-size-[100%] mask-no-repeat" />
				</button>
			</div>
		</div>
	);
}
