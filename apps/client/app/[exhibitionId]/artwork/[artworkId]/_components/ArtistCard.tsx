"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button/Button";
import { EmptyArtistIcon } from "@/components/common/icons/EmptyArtistIcon";
import RowList from "@/components/common/RowList/RowList";
import { track } from "@/lib/amplitude";
import type { ArtworkParticipant } from "@/lib/api/artwork";
import { resolveSnsHref } from "@/lib/utils/sns";

export interface ArtistCardProps {
	author: ArtworkParticipant;
	profileHref: string;
}

export function ArtistCard({ author, profileHref }: ArtistCardProps) {
	const nameSection = (
		<>
			{/* 국문 성명이 없으면 영문 성명만, 둘 다 없으면 이름 자리를 비운다 */}
			{author.nameKo && <span className="text-head3 text-strong">{author.nameKo}</span>}
			{author.nameEn && <span className="text-body2 text-light pt-1">{author.nameEn}</span>}
			{author.role && <span className="text-body2 text-lighter pt-2">{author.role}</span>}
		</>
	);

	const snsSection = (!!author.email || (author.sns ?? []).length > 0) && (
		<div className="flex flex-col pt-3">
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
						const href = resolveSnsHref(sns.platformName, sns.url);
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
	);

	return (
		<div className="flex flex-col">
			{/* 이미지 + 이름 (같은 행) */}
			<div className="flex gap-4 shrink-0">
				<div className="relative shrink-0 w-32 aspect-[1/1.414]">
					{author.profileImg ? (
						<Image
							src={author.profileImg}
							alt={author.nameKo || author.nameEn || ""}
							fill
							className="object-cover"
						/>
					) : (
						<div
							className="w-full h-full flex items-center justify-center"
							style={{ backgroundColor: "color-mix(in srgb, var(--btn-text) 10%, transparent)" }}
						>
							<EmptyArtistIcon />
						</div>
					)}
				</div>
				<div className="flex flex-col justify-end">{nameSection}</div>
			</div>

			{/* 하단 컨텐츠 */}
			<div className="flex flex-col flex-1">
				{/* 소개글 */}
				{author.bio && <p className="text-body1 pt-4">{author.bio}</p>}

				{snsSection}

				<Link href={profileHref} className="pt-5">
					<Button
						variant="outline"
						size="sm"
						className="w-full"
						onClick={() =>
							track("Profile More Clicked", {
								artist_id: author.profileId,
								artist_name: author.nameKo,
								page: "artwork_detail",
							})
						}
					>
						프로필 더보기
					</Button>
				</Link>
			</div>
		</div>
	);
}
