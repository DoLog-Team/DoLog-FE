"use client";

import Image from "next/image";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import type { ArtistProfileForm } from "../../_types";
import { INVALID_MESSAGE, isPurchaseUrlInvalid } from "../profileValidation";

export interface ProfilePurchaseLinkSectionProps {
	value: ArtistProfileForm;
	onChange: (patch: Partial<ArtistProfileForm>) => void;
	// URL 은 입력 도중 형식이 맞지 않으므로 저장을 시도한 뒤에 오류를 보여준다
	showErrors: boolean;
}

export const ProfilePurchaseLinkSection = ({
	value,
	onChange,
	showErrors,
}: ProfilePurchaseLinkSectionProps) => {
	const isUrlError = showErrors && isPurchaseUrlInvalid(value.purchaseUrl);

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
					<Input
						placeholder="example@gmail.com"
						maxLength={255}
						value={value.purchaseUrl}
						onChange={(e) => onChange({ purchaseUrl: e.target.value })}
						error={isUrlError}
						errorMessage={isUrlError ? INVALID_MESSAGE : undefined}
					/>
				</FormField>
			</div>
		</div>
	);
};
