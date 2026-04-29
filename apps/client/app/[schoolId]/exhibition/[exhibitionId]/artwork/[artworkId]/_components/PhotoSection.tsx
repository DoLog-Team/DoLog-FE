"use client";
import { Button } from "components";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";

interface PhotoSectionProps {
	images: string[];
	purchaseUrl?: string;
}

export const PhotoSection = ({ images, purchaseUrl }: PhotoSectionProps) => {
	const [isOpen, setIsOpen] = useState(false);

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
			{/* 구매링크 - 선택값 */}
			{purchaseUrl && (
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
								onClick: () => window.open(purchaseUrl, "_blank"),
								variant: "primary",
							},
						]}
					/>
				</>
			)}
		</section>
	);
};
