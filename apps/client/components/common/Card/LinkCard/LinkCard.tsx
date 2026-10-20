"use client";

import { resolveSnsHref } from "@/lib/utils/sns";
import { linkCardStyles as s } from "./LinkCard.styles";
import type { LinkCardProps } from "./LinkCard.types";

export const LinkCard = ({ items, className, onItemClick }: LinkCardProps) => {
	const sortedItems = [...items].sort((a, b) => {
		if (a.label === "email") return -1;
		if (b.label === "email") return 1;
		return 0;
	});

	const getHref = (item: LinkCardProps["items"][number]) => {
		if (item.type === "email") return `mailto:${item.value}`;
		if (item.type === "url") return resolveSnsHref(item.label, item.value);
		return null;
	};

	const renderLink = (href: string | null, item: LinkCardProps["items"][number]) => {
		if (!href) return <span className={s.value}>{item.value}</span>;
		if (href.startsWith("http")) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className={`${s.value} underline`}
					onClick={() => onItemClick?.(item)}
				>
					{item.value}
				</a>
			);
		}
		return (
			<a href={href} className={`${s.value} underline`} onClick={() => onItemClick?.(item)}>
				{item.value}
			</a>
		);
	};

	return (
		<section className={`${s.wrapper} ${className ?? ""}`}>
			<div className={s.list}>
				{sortedItems.map((item, index) => {
					const href = getHref(item);

					return (
						// TODO : 테스트 이후에는 중복 등록 막는 등 다시 조치하기
						// biome-ignore lint/suspicious/noArrayIndexKey: 같은 SNS·주소가 두 번 등록될 수 있어 순서도 key 에 넣는다 (목록 순서는 바뀌지 않음)
						<div key={`${item.label}-${item.value}-${index}`} className={s.row}>
							<div className={s.labelBox}>
								<span className={s.label}>{item.label}</span>
							</div>

							<div className={s.valueBox}>{renderLink(href, item)}</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
