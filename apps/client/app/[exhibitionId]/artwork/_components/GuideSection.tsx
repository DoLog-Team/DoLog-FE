"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { Title } from "@/components/common/Title/Title";
import type { ExhibitionMap } from "@/lib/api/artwork";

interface GuideSectionProps {
	maps: ExhibitionMap[];
	sectionRef?: React.RefObject<HTMLElement | null>;
}

export function GuideSection({ maps, sectionRef }: GuideSectionProps) {
	const [current, setCurrent] = useState(0);
	const displayMaps = maps.slice(0, 6);
	const touchStartX = useRef<number>(0);

	// GuideSection (관람 안내 섹션) - 선택값
	// guideImages가 빈 배열로 내려오면 GuideSection 자체를 띄우지 않습니다.
	if (!displayMaps.length) return null;

	// 이미지 2장 이상일 경우 인디케이터 스와이프 로직
	const handlePrev = () => setCurrent((prev) => (prev === 0 ? displayMaps.length - 1 : prev - 1));
	const handleNext = () => setCurrent((prev) => (prev === displayMaps.length - 1 ? 0 : prev + 1));

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (displayMaps.length <= 1) return;
		const diff = touchStartX.current - e.changedTouches[0].clientX;
		if (Math.abs(diff) < 50) return;
		if (diff > 0) handleNext();
		else handlePrev();
	};

	return (
		<section ref={sectionRef} className="flex flex-col px-4 pb-6">
			<Title title="관람 안내" />
			<div
				className="relative w-full aspect-video"
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<Image
					src={displayMaps[current].imageUrl}
					alt={displayMaps[current].description ?? `관람 안내 이미지 ${current + 1}`}
					fill
					className="object-cover"
					priority
				/>
			</div>
			{/* 이미지가 2장 이상일 경우에만 인디케이터 활성화 */}
			{displayMaps.length > 1 && (
				<div className="flex gap-2 justify-center mt-3">
					{displayMaps.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrent(index)}
							className={`w-1.25 h-1.25 rounded-full transition-colors ${
								index === current ? "bg-fg-inverse" : "bg-fg-light"
							}`}
						/>
					))}
				</div>
			)}
		</section>
	);
}
