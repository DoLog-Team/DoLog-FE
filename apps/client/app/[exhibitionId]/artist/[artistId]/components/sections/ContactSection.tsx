"use client";

import { track } from "@/lib/amplitude";
import type { ArtistContact } from "@/lib/api/artists/artist-detail.types";

interface ContactItem {
	label: string;
	value: string;
	type: "email" | "url";
}

export function ContactSection({ contact }: { contact: ArtistContact }) {
	const items: ContactItem[] = [
		...(contact.email ? [{ label: "email", value: contact.email, type: "email" as const }] : []),
		...(contact.snsList ?? []).map((s) => ({
			label: s.platformName,
			value: s.url,
			type: "url" as const,
		})),
	];

	const getHref = (item: ContactItem) => {
		if (item.type === "email") return `mailto:${item.value}`;
		if (item.label.toLowerCase() === "instagram") {
			const username = item.value.startsWith("@") ? item.value.slice(1) : item.value;
			return `https://www.instagram.com/${username}/`;
		}
		return item.value;
	};

	if (items.length === 0) return null;

	return (
		<div className="flex flex-col gap-1 py-4" data-section="contact">
			{items.map((item) => (
				<div key={item.label} className="flex flex-wrap items-center gap-1">
					<span className="min-w-19 text-body2-bold shrink-0">{item.label}</span>
					{item.type === "url" ? (
						<a
							href={getHref(item)}
							target="_blank"
							rel="noopener noreferrer"
							className="text-body2 underline"
							onClick={() =>
								track("Artist SNS Clicked", {
									platform: item.label,
									page: "artist_detail",
								})
							}
						>
							{item.value}
						</a>
					) : (
						<a href={`mailto:${item.value}`} className="text-body2 underline">
							{item.value}
						</a>
					)}
				</div>
			))}
		</div>
	);
}
