"use client";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { ImageViewerModal } from "@/components/common/ImageViewerModal/ImageViewerModal";
import { Modal } from "@/components/common/Modal/Modal";
import type { ArtworkDetail } from "@/lib/api/artwork";
import { cn } from "@/lib/utils/cn";
import { resolveContactHref } from "@/lib/utils/sns";

/**
 * 작품소개 상세사진(images) : 선택값
 * 구매링크(purchaseUrl) : 선택값
 */

interface PhotoSectionProps {
	data: Pick<ArtworkDetail, "detailImages" | "purchaseUrl" | "title">;
	// 이미지 확대 모달의 모바일 헤더 — 전시·두록 화면 양쪽에서 쓰여서 부르는 쪽이 자기 헤더를 넘김
	renderViewerHeader: (close: () => void) => ReactNode;
}

export const PhotoSection = ({ data, renderViewerHeader }: PhotoSectionProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [viewerImage, setViewerImage] = useState<{ src: string; alt: string } | null>(null);

	const handleImageClick = (src: string, alt: string) => {
		setViewerImage({ src, alt });
	};
	const purchaseUrl = data.purchaseUrl ? resolveContactHref(data.purchaseUrl) : null;

	const detailImages = data.detailImages ?? [];
	const hasDetailImages = detailImages.length > 0;

	// 상세사진 없이 구매 링크만 있어도 구매 버튼은 보여야 한다
	if (!hasDetailImages && !purchaseUrl) return null;

	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				{/* 작품소개 상세사진 - 선택값 */}
				{hasDetailImages && (
					<div className="flex flex-col gap-7">
						{detailImages.map((img, index) => {
							const alt = img.description ?? `작품 상세 이미지 ${index + 1}`;
							return (
								<button
									key={img.imageUrl}
									type="button"
									onClick={() => handleImageClick(img.imageUrl, alt)}
									className="relative w-full cursor-pointer"
									aria-label={`${alt} 전체보기`}
								>
									<Image
										src={img.imageUrl}
										alt={alt}
										width={0}
										height={0}
										sizes="100vw"
										className="w-full h-auto"
									/>
								</button>
							);
						})}
					</div>
				)}
				{viewerImage && (
					<ImageViewerModal
						open={!!viewerImage}
						onOpenChange={(open) => !open && setViewerImage(null)}
						src={viewerImage.src}
						alt={viewerImage.alt}
						header={renderViewerHeader(() => setViewerImage(null))}
					/>
				)}
				{/* 구매링크 - 선택값 */}
				{purchaseUrl && (
					<>
						<Button
							variant="main"
							className={cn("w-full", hasDetailImages && "mt-7")}
							onClick={() => setIsOpen(true)}
						>
							작품 구매하기
						</Button>
						<Modal
							open={isOpen}
							onOpenChange={setIsOpen}
							title="개인 채팅으로 이동해요."
							description="작가와의 연락을 통해 작품을 구매하기 위해 개인 채팅으로 이동합니다."
							actions={[
								{ text: "돌아가기", onClick: () => setIsOpen(false), variant: "assistive" },
								{
									text: "이동하기",
									onClick: () => window.open(purchaseUrl, "_blank"),
									variant: "cta",
								},
							]}
						/>
					</>
				)}
			</DesktopContainer>
		</section>
	);
};
