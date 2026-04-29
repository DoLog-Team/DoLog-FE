import Image from "next/image";
import { Title } from "@/components/common/Title/Title";
import type { Exhibition } from "@/constants/exhibition";

interface ExhibitionHostProps {
	hostInfo: Exhibition["hostInfo"];
	socialLinks?: Exhibition["socialLinks"];
}

export function ExhibitionHost({ hostInfo, socialLinks }: ExhibitionHostProps) {
	const paragraphs = hostInfo.description.split("\n\n").filter(Boolean);

	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="주최 기관" />

			{/* 이미지 */}
			<div className="relative w-full aspect-video overflow-hidden">
				<Image src={hostInfo.imageUrl} alt={hostInfo.name} fill className="object-cover" />
			</div>
			{/* 기관명 */}
			<span className="text-body1-bold mt-5 mb-4">{hostInfo.name}</span>

			{/* 기관 소개 */}
			{paragraphs.map((paragraph, index) => (
				<p key={index} className="text-body1 leading-relaxed mb-7">
					{paragraph}
				</p>
			))}

			{/* 소셜 링크 */}
			{socialLinks && (
				<div className="flex flex-col gap-1">
					{socialLinks.email && <SocialLink label="email" href={socialLinks.email} />}
					{socialLinks.instagram && <SocialLink label="instagram" href={socialLinks.instagram} />}
					{socialLinks.X && <SocialLink label="X" href={socialLinks.X} />}
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
