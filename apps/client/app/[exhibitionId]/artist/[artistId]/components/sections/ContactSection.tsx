import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import type { LinkItem } from "@/components/common/Card/LinkCard/LinkCard.types";
import { Title } from "@/components/common/Title/Title";
import type { ArtistDetail } from "@/lib/api/artists/artist-detail.types";

export function ContactSection({ contact }: { contact: ArtistDetail["contact"] }) {
	const items: LinkItem[] = [
		...(contact.email
			? [
					{
						label: "email",
						value: contact.email,
						type: "email" as const,
					},
				]
			: []),

		...(contact.sns ?? []).map(
			(s: ArtistDetail["contact"]["sns"][number]): LinkItem => ({
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
