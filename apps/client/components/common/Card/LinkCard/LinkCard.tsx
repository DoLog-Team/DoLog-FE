"use client";

import { linkCardStyles as s } from "./LinkCard.styles";
import type { LinkCardProps } from "./LinkCard.types";

export const LinkCard = ({ items, className }: LinkCardProps) => {
	const sortedItems = [...items].sort((a, b) => {
		if (a.label === "email") return -1;
		if (b.label === "email") return 1;
		return 0;
	});

	return (
		<section className={`${s.wrapper} ${className ?? ""}`}>
			<div className={s.list}>
				{sortedItems.map((item, idx) => {
					const rawText =
						typeof item.value === "string" ? item.value : ((item.value as any)?.props?.href ?? "");

					return (
						<div key={idx} className={s.row}>
							<div className={s.labelBox}>
								<span className={s.label}>{item.label}</span>
							</div>

							<div className={s.valueBox}>
								<span className={s.value} title={rawText}>
									{item.value}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
