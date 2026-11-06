import Image from "next/image";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";

/**
 * 작품 위치 사진 (locationImageUrl) : 선택값
 */

interface LocationSectionProps {
	locationImageUrl: string;
}

export function LocationSection({ locationImageUrl }: LocationSectionProps) {
	// 이미지 주소가 아닌 값이 오면 next/image 가 렌더링 중 오류를 내므로 숨긴다 (dev 데이터에 "A 그룹" 같은 값이 있음)
	if (!/^https?:\/\//.test(locationImageUrl ?? "")) return null;
	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				<Title title="작품 위치" margin="compact" />
				{/* 원본 비율 유지 — 너비는 Figma 대로 모바일 전체, 데스크탑 234px */}
				<Image
					src={locationImageUrl}
					alt="작품 위치 이미지"
					width={0}
					height={0}
					sizes="(min-width: 721px) 234px, 100vw"
					className="h-auto w-full min-[721px]:w-58.5"
				/>
			</DesktopContainer>
		</section>
	);
}
