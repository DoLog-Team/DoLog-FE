import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";
import type { LinkItem } from "@/components/common/Card/LinkCard/LinkCard.types";
import type { ArtistContact } from "@/lib/api/artists/artist-detail.types";

export function ContactSection({ contact }: { contact: ArtistContact }) {
	const items: LinkItem[] = [
		...(contact.email ? [{ label: "email", value: contact.email, type: "email" as const }] : []),

		...(contact.snsList ?? []).map((s) => ({
			label: s.platformName,
			value: s.url,
			type: "url" as const,
		})),
	];

	if (items.length === 0) return null;

	return <LinkCard items={items} />;
}
