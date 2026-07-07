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
				{sortedItems.map((item) => {
					const href = getHref(item);

					return (
						<div key={`${item.label}-${item.value}`} className={s.row}>
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
