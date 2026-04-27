import type { LinkItem } from "@/components/common/Card/LinkCard/LinkCard.types";

type SnsItem = {
	label: string;
	value: string;
};

export function transformLinks(email?: string, sns?: SnsItem[]): LinkItem[] {
	const result: LinkItem[] = [];

	// email
	if (email) {
		result.push({
			label: "email",
			value: <a href={`mailto:${email}`}>{email}</a>,
		});
	}

	// sns
	if (sns && sns.length > 0) {
		result.push(
			...sns.map((item) => ({
				label: item.label,
				value: (
					<a href={item.value} target="_blank" rel="noopener noreferrer">
						{item.value}
					</a>
				),
			})),
		);
	}

	return result;
}
