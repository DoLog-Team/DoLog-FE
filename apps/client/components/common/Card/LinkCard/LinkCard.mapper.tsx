import type { LinkItem } from "./LinkCard.types";

type ApiLinkItem = {
	label: string;
	value: string;
};

export function transformLinks(items: ApiLinkItem[]): LinkItem[] {
	return items.map((item) => {
		const { label, value } = item;

		if (label.toLowerCase() === "email") {
			return {
				label,
				value: <a href={`mailto:${value}`}>{value}</a>,
			};
		}

		return {
			label,
			value: (
				<a href={value} target="_blank" rel="noopener noreferrer">
					{value}
				</a>
			),
		};
	});
}
