"use client";

import { linkCardStyles as s } from "./LinkCard.styles";
import type { LinkCardProps } from "./LinkCard.types";

{
	/* 스타일 오류로 인라인으로 작성해놓긴했는데... 왜 안 되는지 진짜 모르겠어요.. */
}
export const LinkCard = ({ items, className }: LinkCardProps) => {
	return (
		<section className={`${s.wrapper} ${className ?? ""}`}>
			<div className={s.list} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
				{items.map((item, idx) => (
					/* flex와 flex-row를 인라인으로 강제 부여 */
					<div
						key={idx}
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-start",
							width: "100%",
							gap: "4px",
						}}
					>
						{/* 라벨: 80px 고정 */}
						<div style={{ width: "80px", flexShrink: 0 }}>
							<span className={s.label} style={{ display: "block" }}>
								{item.label}
							</span>
						</div>

						{/* 벨류: 남은 공간 모두 차지 */}
						<div style={{ flex: 1, minWidth: 0 }}>
							<span className={s.value} style={{ display: "block", wordBreak: "break-all" }}>
								{item.value}
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
