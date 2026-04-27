import { Button } from "components";
import Image from "next/image";
import RowList from "@/components/common/RowList/RowList";

export interface ArtistCardProps {
	author: {
		name: string;
		nameEn: string;
		role: string;
		profileUrl: string;
		description: string;
		sns: {
			behance?: string;
			instagram?: string;
			x?: string;
		};
	};
}

export function ArtistCard({ author }: ArtistCardProps) {
	// artist → author
	return (
		<div className="flex flex-col">
			{/* 프로필 이미지 + 이름 */}
			<div className="flex pb-4">
				<div className="relative shrink-0">
					<Image
						src={author.profileUrl}
						alt={author.name}
						width={0}
						height={0}
						sizes="100vw"
						className="w-32 h-auto shrink-0 object-cover"
					/>
				</div>
				<div className="flex flex-col justify-end px-4">
					<span className="text-head3 text-strong">{author.name}</span>
					<span className="text-body2 text-light pt-1">{author.nameEn}</span>
					<span className="text-body2 text-lighter pt-2">{author.role}</span>
				</div>
			</div>

			{/* 소개글 */}
			<p className="text-body1 pb-6">{author.description}</p>

			{/* SNS 링크 */}
			<div className="flex flex-col pb-5">
				{author.sns.behance && <RowList rows={[{ label: "Behance", value: author.sns.behance }]} />}
				{author.sns.instagram && (
					<RowList rows={[{ label: "instagram", value: author.sns.instagram }]} />
				)}
				{author.sns.x && <RowList rows={[{ label: "X", value: author.sns.x }]} />}
			</div>

			{/* 프로필 더보기 버튼 */}
			<Button variant="outline" size="sm" className="w-full">
				프로필 더보기
			</Button>
		</div>
	);
}
