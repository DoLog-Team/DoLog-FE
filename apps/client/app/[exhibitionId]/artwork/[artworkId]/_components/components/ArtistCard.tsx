import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
import { EmptyArtistIcon } from "@/components/common/icons/EmptyArtistIcon";
import RowList from "@/components/common/RowList/RowList";
import type { ArtworkParticipant } from "@/lib/api/artwork";

export interface ArtistCardProps {
	author: ArtworkParticipant;
	profileHref: string;
}

export function ArtistCard({ author, profileHref }: ArtistCardProps) {
	// artist → author
	return (
		<div className="flex flex-col">
			{/* 프로필 이미지 + 이름 */}
			<div className="flex">
				<div className="relative shrink-0 w-32 aspect-[1/1.414]">
					{author.profileImg ? (
						<Image src={author.profileImg} alt={author.nameKo} fill className="object-cover" />
					) : (
						<div
							className="w-full h-full flex items-center justify-center"
							style={{ backgroundColor: "color-mix(in srgb, var(--btn-text) 10%, transparent)" }}
						>
							<EmptyArtistIcon />
						</div>
					)}
				</div>
				<div className="flex flex-col justify-end px-4">
					<span className="text-head3 text-strong">{author.nameKo}</span>
					<span className="text-body2 text-light pt-1">{author.nameEn}</span>
					{author.role && <span className="text-body2 text-lighter pt-2">{author.role}</span>}
				</div>
			</div>

			{/* 소개글 */}
			{author.bio && <p className="text-body1 pt-4">{author.bio}</p>}

			{/* 연락처 - 선택값 */}
			{(!!author.email || (author.sns ?? []).length > 0) && (
				<div className="flex flex-col pb-5 pt-6">
					<RowList
						rows={[
							...(author.email
								? [
										{
											label: "email",
											value: (
												<a href={`mailto:${author.email}`} className="underline">
													{author.email}
												</a>
											),
										},
									]
								: []),
							...(author.sns ?? []).map((sns) => {
								const isInstagram = sns.platformName.toLowerCase() === "instagram";
								const isUrl = sns.url.startsWith("http://") || sns.url.startsWith("https://");
								const href = isInstagram
									? `https://www.instagram.com/${sns.url.startsWith("@") ? sns.url.slice(1) : sns.url}/`
									: isUrl
										? sns.url
										: null;
								return {
									label: sns.platformName,
									value: href ? (
										<a href={href} target="_blank" rel="noopener noreferrer" className="underline">
											{sns.url}
										</a>
									) : (
										sns.url
									),
								};
							}),
						]}
					/>
				</div>
			)}
			{/* 프로필 더보기 버튼 */}
			<Link href={profileHref}>
				<Button variant="outline" size="sm" className="w-full">
					프로필 더보기
				</Button>
			</Link>
		</div>
	);
}
