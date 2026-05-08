import Image from "next/image";
import { Title } from "@/components/common/Title/Title";
import type { ExhibitionHost, HostSns } from "@/lib/api/exhibition";

interface ExhibitionHostProps {
	hostInfo: ExhibitionHost;
	sns: HostSns[];
}

export function ExhibitionHostSection({ hostInfo, sns }: ExhibitionHostProps) {
	const paragraphs = hostInfo.description.split("\n\n").filter(Boolean);

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="주최 기관" />

			{/* 이미지 */}
			<div className="relative w-full aspect-video overflow-hidden">
				<Image src={hostInfo.hostImageUrl} alt={hostInfo.hostName} fill className="object-cover" />
			</div>
			{/* 기관명 */}
			<span className="text-body1-bold mt-5 mb-4">{hostInfo.hostName}</span>

			{/* 기관 소개 */}
			{paragraphs.map((paragraph, index) => (
				<p key={index} className="text-body1 leading-relaxed mb-7">
					{paragraph}
				</p>
			))}

			{/* 소셜 링크 */}
			{sns.length > 0 && (
				<div className="flex flex-col gap-1">
					{sns.map((link) => (
						<SocialLink key={link.snsId} label={link.platformName} href={link.url} />
					))}
				</div>
			)}
		</section>
	);
}

interface SocialLinkProps {
	label: string;
	href: string;
}

function SocialLink({ label, href }: SocialLinkProps) {
	return (
		<div className="flex flex-wrap items-center gap-1">
			<span className="min-w-19 text-body2-bold shrink-0">{label}</span>
			<span className="text-body2">{href}</span>
		</div>
	);
}
