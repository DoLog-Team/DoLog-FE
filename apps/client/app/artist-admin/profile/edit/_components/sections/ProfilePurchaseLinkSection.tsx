"use client";

import Image from "next/image";
import { useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import type { ArtistProfileForm } from "../../_mocks/profile";

export interface ProfilePurchaseLinkSectionProps {
	initialValue: ArtistProfileForm;
}

export const ProfilePurchaseLinkSection = ({ initialValue }: ProfilePurchaseLinkSectionProps) => {
	const [purchaseUrl, setPurchaseUrl] = useState(initialValue.purchaseUrl);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<div className="px-0.5">
					<h2 className="text-head3 text-strong">구매하기 링크 관리</h2>
					<p className="whitespace-pre-line pt-2 text-body2 text-lighter">
						{"내 작품을 판매할 수 있어요.\n작품 페이지 하단에 버튼이 노출돼요."}
					</p>
				</div>
				<Image
					src="/images/artwork/purchasePreview.png"
					alt="작품 구매하기 버튼 미리보기"
					width={1514}
					height={852}
					className="mt-4 aspect-video w-full object-cover"
				/>
			</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<FormField
					label="소통 주소"
					description="카카오 오픈채팅 같은 소통할 수 있는 url 을 남겨주세요."
				>
					{/* 보연 TODO: URL 형식 검증은 허용 규칙 확정 후 추가 */}
					<Input
						placeholder="example@gmail.com"
						value={purchaseUrl}
						onChange={(e) => setPurchaseUrl(e.target.value)}
					/>
				</FormField>
			</div>
		</div>
	);
};
