"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { Input } from "@/components/common/Input/Input";
import { Textarea } from "@/components/common/Textarea/Textarea";
import type { ArtistProfileForm } from "../../_mocks/profile";

// 입력 중 조합 자모(ㄱ, ㅏ 등)도 허용해야 오류가 깜빡이지 않는다
const NAME_KO_PATTERN = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ]*$/;
const NAME_EN_PATTERN = /^[a-zA-Z ]*$/;
const INVALID_MESSAGE = "잘못 입력했어요.";

export interface ProfileBasicInfoSectionProps {
	initialValue: ArtistProfileForm;
	onMissingCountChange?: (count: number) => void;
}

export const ProfileBasicInfoSection = ({
	initialValue,
	onMissingCountChange,
}: ProfileBasicInfoSectionProps) => {
	const [nameKo, setNameKo] = useState(initialValue.nameKo);
	const [nameEn, setNameEn] = useState(initialValue.nameEn);
	const [bio, setBio] = useState(initialValue.bio);
	const [profileImages, setProfileImages] = useState<string[]>(
		initialValue.profileImage ? [initialValue.profileImage] : [],
	);

	const isNameKoInvalid = !NAME_KO_PATTERN.test(nameKo);
	const isNameEnInvalid = !NAME_EN_PATTERN.test(nameEn);

	// 필수값은 국문 성명뿐
	useEffect(() => {
		onMissingCountChange?.(nameKo.trim() ? 0 : 1);
	}, [nameKo, onMissingCountChange]);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">기본 정보</h2>
				<span className="text-body2 text-lighter">작가 소개에 표시될 성함을 적어주세요.</span>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-9">
				<FormField label="국문 성명" required>
					<Input
						placeholder="홍길동"
						maxLength={10}
						value={nameKo}
						onChange={(e) => setNameKo(e.target.value)}
						error={isNameKoInvalid}
						errorMessage={isNameKoInvalid ? INVALID_MESSAGE : undefined}
					/>
				</FormField>

				<FormField label="영문 성명">
					<Input
						placeholder="Hong Gildong"
						maxLength={50}
						value={nameEn}
						onChange={(e) => setNameEn(e.target.value)}
						error={isNameEnInvalid}
						errorMessage={isNameEnInvalid ? INVALID_MESSAGE : undefined}
					/>
				</FormField>

				<FormField label="작가 한 줄 소개">
					<Textarea
						placeholder="나를 잘 표현할 수 있는 소개문을 작성해요."
						maxLength={200}
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
				</FormField>

				<FormField label="프로필 이미지">
					{/* TODO: 파일 선택 후 프로필 이미지 크롭 페이지로 이동 (#170 크롭 작업) */}
					<ImageInput
						className="w-full"
						images={profileImages}
						maxCount={1}
						description="1:1.4 비율의 이미지를 권장드립니다."
						guideText="JPG, JPEG, PNG / 용량 5MB 이하"
						accept="image/jpeg,image/png"
						onAdd={(files) => setProfileImages(files.map((file) => URL.createObjectURL(file)))}
						onRemove={() => setProfileImages([])}
					/>
				</FormField>
			</div>
		</div>
	);
};
