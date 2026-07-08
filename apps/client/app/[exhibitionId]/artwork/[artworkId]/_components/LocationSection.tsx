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
	if (!locationImageUrl) return null;
	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				<Title title="작품 위치" margin="compact" />
				<div className="relative w-full aspect-video">
					<Image
						src={locationImageUrl}
						alt="작품 위치 이미지"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</DesktopContainer>
		</section>
	);
}
