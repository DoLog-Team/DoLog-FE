"use client";

import { linkCardStyles as s } from "./LinkCard.styles";
import type { LinkCardProps } from "./LinkCard.types";

export const LinkCard = ({ items, className }: LinkCardProps) => {
	return (
		<section className={`${s.wrapper} ${className ?? ""}`}>
			<div className={s.list}>
				{items.map((item, idx) => (
					<div key={idx} className={s.row}>
						<div className={s.labelBox}>
							<span className={s.label}>{item.label}</span>
						</div>

						<div className={s.valueBox}>
							<span className={s.value}>{item.value}</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
