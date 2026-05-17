import Image from "next/image";
import Link from "next/link";
import type { RelatedArtwork } from "@/lib/api/artwork";

interface PostNavigationProps {
	prevArtwork?: RelatedArtwork;
	nextArtwork?: RelatedArtwork;
}

export function PostNavigationSection({ prevArtwork, nextArtwork }: PostNavigationProps) {
	return (
		<section className="flex flex-col px-4 pb-6 w-full">
			<span className="text-body1-bold text-lighter pt-7 pb-2.5">작품 둘러보기</span>
			<hr className="border border-stroke-lighter" />

			{prevArtwork && (
				<Link href={`../artwork/${prevArtwork.id}`}>
					<div className="flex items-center justify-between py-2.5 gap-4">
						<div className="flex items-center gap-2 flex-1 min-w-0">
							{prevArtwork.mainImage ? (
								<div className="w-20 h-[45px] shrink-0 relative overflow-hidden">
									<Image
										src={prevArtwork.mainImage}
										alt={prevArtwork.title}
										fill
										sizes="80px"
										className="object-cover"
									/>
								</div>
							) : (
								<div className="w-20 h-[45px] shrink-0 bg-fg-lighter flex items-center justify-center">
									<Image src="/icons/empty-image.svg" alt="이미지 없음" width={24} height={24} />
								</div>
							)}
							<div className="flex flex-col min-w-0 flex-1">
								<span className="text-body1-bold truncate">{prevArtwork.title}</span>
								<span className="text-body2 text-lighter truncate">{prevArtwork.artistName}</span>
							</div>
						</div>
						<Image
							src="/icons/arrowUp.svg"
							alt="이전"
							width={24}
							height={24}
							className="shrink-0"
						/>
					</div>
				</Link>
			)}

			<hr className="border border-stroke-lightest" />

			{nextArtwork && (
				<Link href={`../artwork/${nextArtwork.id}`}>
					<div className="flex items-center justify-between py-2.5 gap-4">
						<div className="flex items-center gap-2 flex-1 min-w-0">
							{nextArtwork.mainImage ? (
								<div className="w-20 h-[45px] shrink-0 relative overflow-hidden">
									<Image
										src={nextArtwork.mainImage}
										alt={nextArtwork.title}
										fill
										sizes="80px"
										className="object-cover"
									/>
								</div>
							) : (
								<div className="w-20 h-[45px] shrink-0 bg-fg-lighter flex items-center justify-center">
									<Image src="/icons/empty-image.svg" alt="이미지 없음" width={24} height={24} />
								</div>
							)}
							<div className="flex flex-col min-w-0 flex-1">
								<span className="text-body1-bold truncate">{nextArtwork.title}</span>
								<span className="text-body2 text-lighter truncate">{nextArtwork.artistName}</span>
							</div>
						</div>
						<Image
							src="/icons/arrowDown.svg"
							alt="다음"
							width={24}
							height={24}
							className="shrink-0"
						/>
					</div>
				</Link>
			)}
		</section>
	);
}
