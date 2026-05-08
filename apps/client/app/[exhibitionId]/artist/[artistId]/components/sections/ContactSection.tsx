import { Title } from "@/components/common/Title/Title";
import { LinkCard } from "@/components/common/Card/LinkCard/LinkCard";

export function ContactSection({
	contact,
}: {
	contact: {
		email?: string;
		snsList?: { platformName: string; url: string }[];
	};
}) {
	const items = [
		...(contact?.email ? [{ label: "email", value: contact.email }] : []),
		...(contact?.snsList ?? []).map((s) => ({
			label: s.platformName,
			value: s.url,
		})),
	];

	return (
		<>
			<Title title="연락처" size="head2" />
			<LinkCard items={items} />
		</>
	);
}
