"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
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

	// 데스크톱: 2장씩 페이지 단위로 묶어서 표시
	const desktopPages: (typeof displayMaps)[] = [];
	for (let i = 0; i < displayMaps.length; i += 2) {
		desktopPages.push(displayMaps.slice(i, i + 2));
	}
	const desktopMax = Math.max(0, desktopPages.length - 1);
	const desktopCurrent = Math.min(current, desktopMax);

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
		<section ref={sectionRef} className="flex flex-col pb-6">
			<DesktopContainer>
				<Title title="관람 안내" />
			</DesktopContainer>

			{/* 모바일: 단일 이미지 터치 스와이프 */}
			<div className="min-[721px]:hidden px-4">
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
						{displayMaps.map((map, index) => (
							<button
								key={map.imageUrl}
								type="button"
								onClick={() => setCurrent(index)}
								className={`w-1.25 h-1.25 rounded-full transition-colors ${
									index === current ? "bg-fg-inverse" : "bg-fg-light"
								}`}
							/>
						))}
					</div>
				)}
			</div>

			{/* 데스크톱: 1장이면 45% 좌정렬, 2장 이상이면 캐러셀 */}
			<div className="hidden min-[721px]:block">
				<DesktopContainer>
					{displayMaps.length === 1 ? (
						/* 이미지 1장일 때: 불필요한 인디케이터 코드를 깔끔하게 제거 */
						<div className="relative w-[45%] aspect-video">
							<Image
								src={displayMaps[0].imageUrl}
								alt={displayMaps[0].description ?? "관람 안내 이미지 1"}
								fill
								className="object-cover"
								priority
							/>
						</div>
					) : (
						/* 이미지 2장 이상일 때만 캐러셀 + 인디케이터 노출 */
						<>
							<div className="relative">
								{desktopMax > 0 && (
									<button
										type="button"
										onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
										className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-fg-inverse/40 flex items-center justify-center text-bg-normal cursor-pointer"
										aria-label="이전"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="17"
											viewBox="0 0 20 17"
											fill="none"
											aria-hidden="true"
										>
											<path
												d="M8.74828 17L10.2889 15.5566L4.12655 9.56918H20V7.45755H4.12655L10.2889 1.47013L8.74828 0L0 8.5L8.74828 17Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								)}
								<div className="overflow-hidden">
									<div
										className="flex transition-transform duration-300"
										style={{ transform: `translateX(-${desktopCurrent * 100}%)` }}
									>
										{desktopPages.map((pageItems, pageIndex) => (
											<div
												key={pageItems[0]?.imageUrl ?? pageIndex}
												className="w-full shrink-0 flex gap-5"
											>
												{pageItems.map((map, i) => (
													<div
														key={map.imageUrl}
														className="shrink-0 aspect-video relative"
														style={{ width: "calc(50% - 10px)" }}
													>
														<Image
															src={map.imageUrl}
															alt={map.description ?? `관람 안내 이미지 ${pageIndex * 2 + i + 1}`}
															fill
															className="object-cover"
															priority={pageIndex === 0}
														/>
													</div>
												))}
											</div>
										))}
									</div>
								</div>
								{desktopMax > 0 && (
									<button
										type="button"
										onClick={() => setCurrent((prev) => Math.min(desktopMax, prev + 1))}
										className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-fg-inverse/40 flex items-center justify-center text-bg-normal cursor-pointer"
										aria-label="다음"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="17"
											viewBox="0 0 20 17"
											fill="none"
											aria-hidden="true"
											className="scale-x-[-1]"
										>
											<path
												d="M8.74828 17L10.2889 15.5566L4.12655 9.56918H20V7.45755H4.12655L10.2889 1.47013L8.74828 0L0 8.5L8.74828 17Z"
												fill="currentColor"
											/>
										</svg>
									</button>
								)}
							</div>

							<div className="flex gap-2 justify-start mt-3">
								{desktopPages.map((pageItems, index) => (
									<button
										type="button"
										key={pageItems[0]?.imageUrl ?? index}
										onClick={() => setCurrent(index)}
										className={`w-1.25 h-1.25 rounded-full transition-colors ${
											index === desktopCurrent ? "bg-fg-inverse" : "bg-fg-light"
										}`}
									/>
								))}
							</div>
						</>
					)}
				</DesktopContainer>
			</div>
		</section>
	);
}
