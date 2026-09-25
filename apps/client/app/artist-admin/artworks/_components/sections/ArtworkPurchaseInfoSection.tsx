"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";

export const ArtworkPurchaseInfoSection = () => {
	const [showPurchaseButton, setShowPurchaseButton] = useState(false);
	const [openChatUrl] = useState("");
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">작품 구매 정보</h2>
				<p className="whitespace-pre-line text-body2 text-lighter">
					{
						"작품 페이지에서 작품을 판매할 수 있습니다.\n판매에 필요한 오픈채팅 링크로 이동하는 버튼을 표시할 수 있습니다."
					}
				</p>
				<Image
					src="/images/artwork/purchasePreview.png"
					alt="작품 구매하기 버튼 미리보기"
					width={1514}
					height={852}
					className="mt-4 aspect-video w-full object-cover"
				/>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-9">
				<FormField label="작품 구매 버튼">
					<Checkbox
						checked={showPurchaseButton}
						onChange={setShowPurchaseButton}
						label="작품 구매 버튼 표시하기"
					/>
				</FormField>

				<FormField
					label="작품 구매 오픈채팅 주소"
					description="내 프로필에서 입력했던 링크가 표시됩니다."
				>
					<div className="flex items-start gap-2">
						<Input
							wrapperClassName="flex-1"
							value={openChatUrl}
							placeholder="입력된 오픈채팅 주소가 없어요."
							disabled
						/>
						<Button
							type="button"
							variant="assistive"
							className="w-24"
							onClick={() => setIsEditModalOpen(true)}
						>
							수정하기
						</Button>
					</div>
				</FormField>
			</div>

			<Modal
				open={isEditModalOpen}
				onOpenChange={setIsEditModalOpen}
				title="구매 오픈채팅 수정"
				description="구매 오픈채팅 주소를 수정하기 위해 내 프로필 수정 페이지로 이동해요. 변경 내용을 저장할까요?"
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsEditModalOpen(false) },
					{
						text: "저장하고 이동",
						variant: "primary",
						onClick: () => {
							// TODO: 추후 프로필 페이지 이동 경로 추가 필요
						},
					},
				]}
			/>
		</div>
	);
};
