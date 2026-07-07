"use client";

import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
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
			<span className="text-head3 text-strong">{author.nameKo}</span>
			<span className="text-body2 text-light pt-1">{author.nameEn}</span>
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
		<div className="flex flex-col min-[721px]:flex-row min-[721px]:gap-8">
			{/* 이미지 + 모바일 이름 (같은 행) */}
			<div className="flex gap-4 shrink-0 min-[721px]:block">
				<div className="relative shrink-0 w-32 aspect-[1/1.414] min-[721px]:w-[180px]">
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
				{/* 이름: 모바일에서만 이미지 옆에 표시 */}
				<div className="flex flex-col justify-end min-[721px]:hidden">{nameSection}</div>
			</div>

			{/* 우측 컬럼 (데스크탑) / 하단 컨텐츠 (모바일) */}
			<div className="flex flex-col flex-1">
				{/* 이름: 데스크탑에서만 우측 컬럼 상단에 표시 */}
				<div className="hidden min-[721px]:flex flex-col">{nameSection}</div>

				{/* 소개글 */}
				{author.bio && <p className="text-body1 pt-4">{author.bio}</p>}

				{snsSection}

				{/* 모바일: 버튼 */}
				<Link href={profileHref} className="min-[721px]:hidden pt-5">
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
				{/* 데스크탑: 텍스트 링크 */}
				<Link
					href={profileHref}
					className="hidden min-[721px]:inline mt-auto text-body1 text-lightest underline underline-offset-2 w-fit"
					onClick={() =>
						track("Profile More Clicked", {
							artist_id: author.profileId,
							artist_name: author.nameKo,
							page: "artwork_detail",
						})
					}
				>
					프로필 더보기 →
				</Link>
			</div>
		</div>
	);
}
