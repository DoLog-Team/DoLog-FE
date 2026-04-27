import Image from "next/image";
import { Title } from "@/components/common/Title/Title";

interface LocationSectionProps {
	locationImageUrl: string;
}

export function LocationSection({ locationImageUrl }: LocationSectionProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="작품 위치" />
			<div className="relative w-full aspect-video">
				<Image
					src={locationImageUrl}
					alt="작품 위치 이미지"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</section>
	);
}
