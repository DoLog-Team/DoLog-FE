"use client";
import { Button } from "components";
import Image from "next/image";
import { useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Modal } from "@/components/common/Modal/Modal";
import type { ArtworkDetail } from "@/lib/api/artwork";

/**
 * 작품소개 상세사진(images) : 선택값
 * 구매링크(purchaseUrl) : 선택값
 */

interface PhotoSectionProps {
	data: Pick<ArtworkDetail, "detailImages" | "purchaseUrl">;
}

export const PhotoSection = ({ data }: PhotoSectionProps) => {
	const [isOpen, setIsOpen] = useState(false);
	if (!data.detailImages || data.detailImages.length === 0) return null;

	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				{/* 작품소개 상세사진 - 선택값 */}
				{data.detailImages.map((img, index) => (
					<div key={index} className="relative w-full">
						<Image
							src={img.imageUrl}
							alt={img.description ?? `작품 상세 이미지 ${index + 1}`}
							width={0}
							height={0}
							sizes="100vw"
							className="w-full h-auto"
						/>
					</div>
				))}
				{/* 구매링크 - 선택값 */}
				{data.purchaseUrl && (
					<>
						<Button variant="main" className="mt-6" onClick={() => setIsOpen(true)}>
							작품 구매하기
						</Button>
						<Modal
							open={isOpen}
							onOpenChange={setIsOpen}
							title="개인 채팅으로 이동해요."
							description="작가와의 연락을 통해 작품을 구매하기 위해 개인 채팅으로 이동합니다."
							actions={[
								{ text: "돌아가기", onClick: () => setIsOpen(false), variant: "secondary" },
								{
									text: "이동하기",
									onClick: () => window.open(data.purchaseUrl!, "_blank"),
									variant: "primary",
								},
							]}
						/>
					</>
				)}
			</DesktopContainer>
		</section>
	);
};
