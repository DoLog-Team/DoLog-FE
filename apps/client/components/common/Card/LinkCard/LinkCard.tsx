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
		if (item.label.toLowerCase() === "instagram") {
			const username = item.value.startsWith("@") ? item.value.slice(1) : item.value;
			return `https://www.instagram.com/${username}/`;
		}
		if (item.type === "url") return item.value;
		return null;
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

							<div className={s.valueBox}>
								{href ? (
									href.startsWith("http") ? (
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className={`${s.value} underline`}
											onClick={() => onItemClick?.(item)}
										>
											{item.value}
										</a>
									) : (
										<a
											href={href}
											className={`${s.value} underline`}
											onClick={() => onItemClick?.(item)}
										>
											{item.value}
										</a>
									)
								) : (
									<span className={s.value}>{item.value}</span>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};
