"use client";

import Image from "next/image";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { Title } from "@/components/common/Title/Title";
import type { ExhibitionHost, HostSns } from "@/lib/api/exhibition";

interface ExhibitionHostProps {
	hostInfo: ExhibitionHost;
	sns: HostSns[];
}

export function ExhibitionHostSection({ hostInfo, sns }: ExhibitionHostProps) {
	return (
		<section className="flex flex-col pb-6" data-section="host">
			<Title title="주최 기관" />

			<div className="relative w-full aspect-video overflow-hidden">
				{hostInfo.hostImageUrl ? (
					<Image src={hostInfo.hostImageUrl} alt={hostInfo.hostName} fill className="object-cover" />
				) : (
					<EmptyImageFallback className="absolute inset-0" />
				)}
			</div>
			<span className="text-body1-bold mt-5 mb-4">{hostInfo.hostName}</span>
			<p className="text-body1 leading-relaxed mb-7 whitespace-pre-line">{hostInfo.description}</p>

			{sns.length > 0 && (
				<div className="flex flex-col gap-1">
					{sns.map((link) => (
						<SocialLink
							key={link.snsId}
							label={link.platformName}
							href={link.url}
							hostName={hostInfo.hostName}
						/>
					))}
				</div>
			)}
		</section>
	);
}

interface SocialLinkProps {
	label: string;
	href: string;
	hostName: string;
}

function SocialLink({ label, href }: SocialLinkProps) {
	const isInstagram = label.toLowerCase() === "instagram";
	const isUrl = href.startsWith("http://") || href.startsWith("https://");
	const resolvedHref = isInstagram
		? `https://www.instagram.com/${href.startsWith("@") ? href.slice(1) : href}/`
		: isUrl
			? href
			: null;

	return (
		<div className="flex flex-wrap items-center gap-1">
			<span className="min-w-19 text-body2-bold shrink-0">{label}</span>
			{resolvedHref ? (
				<a
					href={resolvedHref}
					target="_blank"
					rel="noopener noreferrer"
					className="text-body2 underline"
				>
					{href}
				</a>
			) : (
				<span className="text-body2">{href}</span>
			)}
		</div>
	);
}
