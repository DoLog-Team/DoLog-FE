"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { readVisitorId, saveVisitorId } from "@/lib/visitor";

// 하단 탭바 왼쪽 하트 버튼
// 좋아요 전: 빈 하트, 좋아요 후: 선택된 하트
// 작품 · 작가 좋아요 공통 — 실제 요청은 onToggle 로 받는다

// SVG 를 마스크로만 쓰고 색은 테마 토큰으로 채움. 테마를 반영해서 색상 변동 있음. (검/흰)
const ICON = { empty: "/icons/like.svg", filled: "/icons/likeFilled.svg" };

export interface LikeToggleResult {
	liked: boolean;
	visitorId: string;
}

interface LikeButtonProps {
	initialLiked: boolean;
	// next: 바꾸려는 상태 (true 좋아요 / false 취소), visitorId: 저장된 방문자 ID (없으면 BE 가 새로 발급)
	onToggle: (next: boolean, visitorId: string | null) => Promise<LikeToggleResult>;
}

export function LikeButton({ initialLiked, onToggle }: LikeButtonProps) {
	const [liked, setLiked] = useState(initialLiked);
	const [pending, setPending] = useState(false);

	const handleClick = async () => {
		if (pending) return;
		const next = !liked;
		// 먼저 바꿔 보여주고, 실패하면 되돌린다
		setLiked(next);
		setPending(true);
		try {
			const res = await onToggle(next, readVisitorId());
			saveVisitorId(res.visitorId);
			setLiked(res.liked);
		} catch {
			setLiked(!next);
		} finally {
			setPending(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-pressed={liked}
			aria-label={liked ? "좋아요 취소" : "좋아요"}
			className="shrink-0 cursor-pointer p-2.5"
		>
			<span
				aria-hidden
				className={cn("block size-6", liked ? "bg-icon-strong" : "bg-icon-light")}
				style={{
					maskImage: `url(${liked ? ICON.filled : ICON.empty})`,
					maskSize: "100% 100%",
					maskRepeat: "no-repeat",
				}}
			/>
		</button>
	);
}
