import { FloatingCta } from "@/components/common/FloatingCta/FloatingCta";

/**
 * 전시 외 작품 보기 버튼— 누르면 작가의 두록 작가 상세로 이동
 */
export function OtherArtworksCta({ artistId }: { artistId: string }) {
	return (
		<FloatingCta
			href={`/artists/${artistId}`}
			label="전시 외 작품 보기"
			closeLabel="전시 외 작품 보기 닫기"
			className="bg-fg-inverse text-inverse"
		/>
	);
}
