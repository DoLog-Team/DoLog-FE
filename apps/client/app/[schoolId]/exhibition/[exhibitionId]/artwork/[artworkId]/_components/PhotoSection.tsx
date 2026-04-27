import { Button } from "components";
import Image from "next/image";

interface PhotoSectionProps {
	images: string[];
}

export const PhotoSection = ({ images }: PhotoSectionProps) => {
	return (
		<section className="flex flex-col px-4 pb-6">
			{/* TODO : 이미지 간 gap? */}
			{images.map((src, index) => (
				<div key={index} className="relative w-full">
					<Image
						src={src}
						alt={`작품 상세 이미지 ${index + 1}`}
						width={0}
						height={0}
						sizes="100vw"
						className="w-full h-auto"
					/>
				</div>
			))}
			{/* TODO : 작품 구매하기 url이 들어올 때만 버튼 띄움 
			(전체적으로 선택값에 해당하는 ui 제외 상태 확인 필요) */}
			<Button variant="main" className="mt-6">
				작품 구매하기
			</Button>
		</section>
	);
};
