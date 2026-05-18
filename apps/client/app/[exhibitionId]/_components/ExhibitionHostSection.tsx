"use client";

import Image from "next/image";
import { Title } from "@/components/common/Title/Title";
import { track } from "@/lib/amplitude";
import type { ExhibitionHost, HostSns } from "@/lib/api/exhibition";

interface ExhibitionHostProps {
	hostInfo: ExhibitionHost;
	sns: HostSns[];
}

export function ExhibitionHostSection({ hostInfo, sns }: ExhibitionHostProps) {
	return (
		<section className="flex flex-col px-4 pb-6" data-section="host">
			<Title title="주최 기관" />

			<div className="relative w-full aspect-video overflow-hidden">
				<Image src={hostInfo.hostImageUrl} alt={hostInfo.hostName} fill className="object-cover" />
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

function SocialLink({ label, href, hostName }: SocialLinkProps) {
	const isUrl = href.startsWith("http://") || href.startsWith("https://");

	return (
		<div className="flex flex-wrap items-center gap-1">
			<span className="min-w-19 text-body2-bold shrink-0">{label}</span>
			{isUrl ? (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-body2"
					onClick={() =>
						track("SNS Link Clicked", { platform: label, host: hostName, page: "exhibition_intro" })
					}
				>
					{href}
				</a>
			) : (
				<span className="text-body2">{href}</span>
			)}
		</div>
	);
}
