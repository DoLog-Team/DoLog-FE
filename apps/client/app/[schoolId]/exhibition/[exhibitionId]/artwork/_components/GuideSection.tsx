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
				<Image
					src={guideImages[0]}
					alt="관람 안내 이미지"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</section>
	);
}
