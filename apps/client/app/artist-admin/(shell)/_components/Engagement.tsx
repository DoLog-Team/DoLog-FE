import Image from "next/image";

interface EngagementProps {
	viewCount: number;
	likeCount: number;
}

/**
 * 조회수와 좋아요 수를 표시하는 컴포넌트
 */
export function Engagement({ viewCount, likeCount }: EngagementProps) {
	return (
		<div className="flex items-center gap-2.5 text-[13px] leading-4 tracking-[-0.01em] text-lighter">
			<span className="flex items-center gap-1">
				<Image src="/icons/view.svg" alt="조회수" width={16} height={16} />
				{viewCount}
			</span>
			<span className="flex items-center gap-1">
				<Image src="/icons/like.svg" alt="좋아요 수" width={16} height={16} />
				{likeCount}
			</span>
		</div>
	);
}
