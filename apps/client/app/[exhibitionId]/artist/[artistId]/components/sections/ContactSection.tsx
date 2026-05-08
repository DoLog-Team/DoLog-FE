import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import type { LinkItem } from "@/components/common/Card/LinkCard/LinkCard.types";
import { Title } from "@/components/common/Title/Title";

type Sns = {
	snsId: string;
	platformName: string;
	url: string;
};

export function ContactSection({
	contact,
}: {
	contact: {
		email?: string;
		snsList?: Sns[];
	};
}) {
	const items: LinkItem[] = [
		...(contact?.email ? [{ label: "email", value: contact.email, type: "email" as const }] : []),

		...(contact?.snsList ?? []).map(
			(s: Sns): LinkItem => ({
				label: s.platformName,
				value: s.url,
				type: "url" as const,
			}),
		),
	];

	return (
		<>
			<Title title="연락처" size="head2" />
			<LinkCard items={items} />
		</>
	);
}
