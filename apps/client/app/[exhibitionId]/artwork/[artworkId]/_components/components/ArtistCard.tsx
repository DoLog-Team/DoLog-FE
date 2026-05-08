import { Button } from "components";
import Image from "next/image";
import Link from "next/link";
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
			<div className="flex pb-4">
				<div className="relative shrink-0">
					<Image
						src={author.profileImg ?? ""}
						alt={author.nameKo}
						width={0}
						height={0}
						sizes="100vw"
						className="w-32 aspect-[1/1.414] h-auto shrink-0 object-cover"
					/>
				</div>
				<div className="flex flex-col justify-end px-4">
					<span className="text-head3 text-strong">{author.nameKo}</span>
					<span className="text-body2 text-light pt-1">{author.nameEn}</span>
					{author.role && <span className="text-body2 text-lighter pt-2">{author.role}</span>}
				</div>
			</div>

			{/* 소개글 */}
			<p className="text-body1 pb-6">{author.bio}</p>

			{/* SNS 링크 - 선택값 */}
			{(author.sns ?? []).length > 0 && (
				<div className="flex flex-col pb-5">
					<RowList
						rows={(author.sns ?? []).map((sns) => ({
							label: sns.platformName,
							value: sns.url,
						}))}
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
