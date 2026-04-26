import Image from "next/image";
import { Title } from "@/components/common/Title/Title";

interface GuideSectionProps {
	guideImages: string[];
}

export function GuideSection({ guideImages }: GuideSectionProps) {
	return (
		<section className="flex flex-col px-4 pb-6">
			<Title title="관람 안내" />
			<div className="relative w-full aspect-video">
				<Image src={guideImages[0]} alt="관람 안내 이미지" fill className="object-cover" priority />
			</div>
			{/* TODO : 이미지 2개 이상일 경우 indicator */}
			{/* <div className="flex gap-2 justify-center mt-3">
				{guideImages.map((_, index) => (
					<div
						key={index}
						className="w-2 h-2 rounded-full bg-gray-300"
					/>
				))}
			</div> */}

		</section>
	);
}
