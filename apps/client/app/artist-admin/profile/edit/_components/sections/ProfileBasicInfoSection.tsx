"use client";

import { FormField } from "@/components/common/FormField/FormField";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { Input } from "@/components/common/Input/Input";
import { Textarea } from "@/components/common/Textarea/Textarea";
import type { ArtistProfileForm } from "../../_types";
import {
	INVALID_MESSAGE,
	isNameEnInvalid,
	isNameKoInvalid,
	isNameKoTypingInvalid,
} from "../profileValidation";

export interface ProfileBasicInfoSectionProps {
	value: ArtistProfileForm;
	onChange: (patch: Partial<ArtistProfileForm>) => void;
	// 저장을 시도한 뒤에는 입력 중 허용하던 조합 자모도 오류로 보여준다
	showErrors: boolean;
}

export const ProfileBasicInfoSection = ({
	value,
	onChange,
	showErrors,
}: ProfileBasicInfoSectionProps) => {
	const nameKoError = showErrors
		? isNameKoInvalid(value.nameKo)
		: isNameKoTypingInvalid(value.nameKo);
	const nameEnError = isNameEnInvalid(value.nameEn);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 px-0.5 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">기본 정보</h2>
				<span className="text-body2 text-lighter">작가 소개에 표시될 성함을 적어주세요.</span>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-4">
				{/* 국문 성명은 필수값이 아니다 (Figma 10.20 추가 사항) */}
				<FormField label="국문 성명">
					<Input
						placeholder="홍길동"
						maxLength={10}
						value={value.nameKo}
						onChange={(e) => onChange({ nameKo: e.target.value })}
						error={nameKoError}
						errorMessage={nameKoError ? INVALID_MESSAGE : undefined}
					/>
				</FormField>

				<FormField label="영문 성명">
					<Input
						placeholder="Hong Gildong"
						maxLength={50}
						value={value.nameEn}
						onChange={(e) => onChange({ nameEn: e.target.value })}
						error={nameEnError}
						errorMessage={nameEnError ? INVALID_MESSAGE : undefined}
					/>
				</FormField>

				<FormField label="작가 한 줄 소개">
					<Textarea
						placeholder="나를 잘 표현할 수 있는 소개문을 작성해요."
						maxLength={200}
						value={value.bio}
						onChange={(e) => onChange({ bio: e.target.value })}
					/>
				</FormField>

				<FormField label="프로필 이미지">
					{/* TODO: 파일 선택 후 프로필 이미지 크롭 페이지로 이동 (#170 크롭 작업) */}
					<ImageInput
						className="w-full"
						images={value.profileImage ? [value.profileImage] : []}
						maxCount={1}
						description="1:1.4 비율의 이미지를 권장드립니다."
						guideText="JPG, JPEG, PNG / 용량 5MB 이하"
						accept="image/jpeg,image/png"
						onAdd={([file]) => {
							if (file)
								onChange({ profileImage: URL.createObjectURL(file), profileImageFile: file });
						}}
						onRemove={() => onChange({ profileImage: null, profileImageFile: null })}
					/>
				</FormField>
			</div>
		</div>
	);
};
