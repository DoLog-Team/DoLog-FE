import Image from "next/image";
import Link from "next/link";
import type { RelatedArtwork } from "@/lib/api/artwork";

interface PostNavigationProps {
	prevArtwork?: RelatedArtwork;
	nextArtwork?: RelatedArtwork;
}

export function PostNavigationSection({ prevArtwork, nextArtwork }: PostNavigationProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<span className="text-body1-bold text-lighter pt-7 pb-2.5">작품 둘러보기</span>
			<hr className="border border-stroke-lighter" />
			{prevArtwork && (
				<Link href={`../artwork/${prevArtwork.id}`}>
					<div className="flex items-center justify-between py-2.5">
						<div className="flex items-center gap-2">
							{prevArtwork.mainImage ? (
								<Image
									src={prevArtwork.mainImage}
									alt={prevArtwork.title}
									width={64}
									height={64}
									className="object-cover"
								/>
							) : (
								<div className="w-20 h-[45px] shrink-0 bg-fg-lighter flex items-center justify-center">
									<Image src="/icons/empty-image.svg" alt="이미지 없음" width={24} height={24} />
								</div>
							)}
							<div className="flex flex-col">
								<span className="text-body1-bold">{prevArtwork.title}</span>
								<span className="text-body2 text-lighter">{prevArtwork.artistName}</span>
							</div>
						</div>
						<Image src="/icons/arrowUp.svg" alt="이전" width={24} height={24} />
					</div>
				</Link>
			)}
			<hr className="border border-stroke-lightest" />
			{nextArtwork && (
				<Link href={`../artwork/${nextArtwork.id}`}>
					<div className="flex items-center justify-between py-2.5">
						<div className="flex items-center gap-2">
							{nextArtwork.mainImage ? (
								<Image
									src={nextArtwork.mainImage}
									alt={nextArtwork.title}
									width={64}
									height={64}
									className="object-cover"
								/>
							) : (
								<div className="w-20 h-11.5 shrink-0 bg-fg-lighter flex items-center justify-center">
									<Image src="/icons/empty-image.svg" alt="이미지 없음" width={24} height={24} />
								</div>
							)}
							<div className="flex flex-col">
								<span className="text-body1-bold">{nextArtwork.title}</span>
								<span className="text-body2 text-lighter">{nextArtwork.artistName}</span>
							</div>
						</div>
						<Image src="/icons/arrowDown.svg" alt="다음" width={24} height={24} />
					</div>
				</Link>
			)}
		</section>
	);
}
