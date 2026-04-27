"use client";

import { postNavStyles as s } from "./PostNavigation.styles";
import { Divider } from "@/components/common/Divider/Divider";

interface PostNavigationProps {
	prevPost?: { id: number; title: string };
	nextPost?: { id: number; title: string };
}

export const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => {
	return (
		<div className="flex flex-col  ">
			{/* 첫 번째 라인 (ECEDEE) */}
			<div className="px-4 py-6">
				<Divider />
			</div>

			{/* 이전 포스트 */}
			<div className={s.navRow}>
				<div className={s.contentBox}>
					<span className={s.postTitle}>{prevPost?.title || "이전 작가가 없습니다"}</span>
				</div>
				<div className={s.labelBox}>
					<span className={s.labelTag}>이전 작가</span>
					<div className={s.iconBox}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="rotate-180 text-icon-light"
						>
							<path
								d="M7 10L12 15L17 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* 중간 라인 (F7F7F8) */}
			<div className="px-4 py-6">
				<Divider />
			</div>

			{/* 다음 포스트 */}
			<div className={s.navRow}>
				<div className={s.contentBox}>
					<span className={s.postTitle}>{nextPost?.title || "다음 작가가 없습니다"}</span>
				</div>
				<div className={s.labelBox}>
					<span className={s.labelTag}>다음 작가</span>
					<div className={s.iconBox}>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="rotate-180 text-icon-light"
						>
							<path
								d="M7 10L12 15L17 10"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};
