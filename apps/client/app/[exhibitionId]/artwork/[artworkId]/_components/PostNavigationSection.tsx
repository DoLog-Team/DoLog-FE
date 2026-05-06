import Image from "next/image";
import Link from "next/link";

interface NavItem {
	id: number;
	title: string;
	author: string;
	imageUrl: string;
}

interface PostNavigationProps {
	prevArtwork?: NavItem;
	nextArtwork?: NavItem;
}

/**
 TODO (연동 시)
 1. 목데이터에서 prevArtwork, nextArtwork 제거
 2. page.tsx에서 prev, next 직접 연산
  - artworkId params로 받기
  - 전체 작품 목록 API 호출
  - findIndex로 현재 위치 찾아서 prev/next 계산하기 !
 3. ArtworkDetailClient에 props 전달
  - 계산된 prev/next를 내려줘서 PostNavigationSection까지 전달될 수 있도록
 */

export function PostNavigationSection({ prevArtwork, nextArtwork }: PostNavigationProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<span className="text-body1-bold text-lighter pt-7 pb-2.5">작품 둘러보기</span>
			<hr className="border border-stroke-lighter" />
			{prevArtwork && (
				<Link href={`../artwork/${prevArtwork.id}`}>
					<div className="flex items-center justify-between py-2.5">
						<div className="flex items-center gap-2">
							<Image
								src={prevArtwork.imageUrl}
								alt={prevArtwork.title}
								width={64}
								height={64}
								className="object-cover"
							/>
							<div className="flex flex-col">
								<span className="text-body1-bold">{prevArtwork.title}</span>
								<span className="text-body2 text-lighter">{prevArtwork.author}</span>
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
							<Image
								src={nextArtwork.imageUrl}
								alt={nextArtwork.title}
								width={64}
								height={64}
								className="object-cover"
							/>
							<div className="flex flex-col">
								<span className="text-body1-bold">{nextArtwork.title}</span>
								<span className="text-body2 text-lighter">{nextArtwork.author}</span>
							</div>
						</div>
						<Image src="/icons/arrowDown.svg" alt="다음" width={24} height={24} />
					</div>
				</Link>
			)}
		</section>
	);
}
