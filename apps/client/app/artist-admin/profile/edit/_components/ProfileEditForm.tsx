"use client";

import { useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Modal } from "@/components/common/Modal/Modal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { updateMyArtistName } from "../_api/actions";
import type { ArtistProfileForm } from "../_types";
import { PROFILE_EDIT_TABS } from "./profileEditTabs";
import { type BasicInfoName, ProfileBasicInfoSection } from "./sections/ProfileBasicInfoSection";
import { ProfilePurchaseLinkSection } from "./sections/ProfilePurchaseLinkSection";
import { ProfileSnsInfoSection } from "./sections/ProfileSnsInfoSection";

export interface ProfileEditFormProps {
	initialValue: ArtistProfileForm;
	// 없으면 이전 화면으로
	onBack?: () => void;
}

export const ProfileEditForm = ({ initialValue, onBack }: ProfileEditFormProps) => {
	const router = useRouter();
	const [basicMissingCount, setBasicMissingCount] = useState(0);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	// 현재 입력 중인 이름과 마지막으로 저장된 이름 — 비교해서 변경 여부를 판단한다
	const initialName: BasicInfoName = {
		nameKo: initialValue.nameKo,
		nameEn: initialValue.nameEn,
		isValid: true,
	};
	const [name, setName] = useState(initialName);
	const [savedName, setSavedName] = useState(initialName);
	const handleNameChange = useCallback((next: BasicInfoName) => setName(next), []);

	// 네비게이션 : 변경 내용이 있을 때만 활성, 필수값(국문 성명)이 비면 라벨이 "임시 저장"
	// TODO: 지금은 이름만 저장할 수 있어 이름 변경만 변경 내용으로 본다 (소개·사진 등은 저장 대상 BE 확인 중)
	const isDirty = name.nameKo !== savedName.nameKo || name.nameEn !== savedName.nameEn;
	const isRequiredFilled = Boolean(name.nameKo.trim());

	const [lastSavedAt, setLastSavedAt] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [isSaveFailed, setIsSaveFailed] = useState(false);
	// MODAL 24 임시저장 안내 / MODAL 25 변경 내용 확인
	const [isTempSavedModalOpen, setIsTempSavedModalOpen] = useState(false);
	const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

	const goBack = onBack ?? (() => router.back());

	// 저장에 성공하면 true — 변경 내용 확인 모달의 "저장하기"가 저장 후 이동할 때 쓴다
	// TODO: 저장 후 두록 작가 상세로 이동 (작가 상세 페이지 미구현)
	const save = async () => {
		if (isSaving || !isDirty) return false;
		const { nameKo, nameEn, isValid } = name;
		// 형식 오류는 입력칸의 오류 표시로 이미 안내된다
		if (!isValid) return false;

		setIsSaving(true);
		try {
			// 필수값(국문 성명)이 비면 임시 저장 — 국문 성명은 빼고 나머지만 저장한다 (서버는 기존 값 유지)
			// 영문 성명도 비우면 null 과 같아 기존 값이 유지되므로 값이 있을 때만 보낸다
			// TODO: 임시 저장 시 비공개 전환은 BE 에 작가 공개 여부가 없어 아직 불가
			await updateMyArtistName({
				nameKo: nameKo.trim() || undefined,
				nameEn: nameEn.trim() || undefined,
			});
			setSavedName(name);
			setLastSavedAt(formatSavedAt(new Date()));
			// 마이페이지 프로필 카드에 새 이름이 보이도록 서버 데이터를 다시 불러온다
			router.refresh();
			return true;
		} catch {
			setIsSaveFailed(true);
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	const handleSave = async () => {
		const isTempSave = !isRequiredFilled;
		const saved = await save();
		if (saved && isTempSave) setIsTempSavedModalOpen(true);
	};

	// 변경 내용이 있으면 바로 나가지 않고 확인 모달을 띄운다 (Figma NAV-07 · MODAL 25)
	const handleBack = () => {
		if (isDirty) {
			setIsLeaveModalOpen(true);
			return;
		}
		goBack();
	};

	const handleSaveAndLeave = async () => {
		const saved = await save();
		if (!saved) return;
		setIsLeaveModalOpen(false);
		goBack();
	};

	const formSections = [
		{
			id: "basic",
			className: "pb-7",
			render: () => (
				<ProfileBasicInfoSection
					initialValue={initialValue}
					onMissingCountChange={handleBasicMissingCountChange}
					onNameChange={handleNameChange}
				/>
			),
		},
		{
			id: "sns",
			className: "pb-7 pt-7",
			render: () => <ProfileSnsInfoSection initialValue={initialValue} />,
		},
		{
			id: "purchase",
			className: "pb-7 pt-7",
			render: () => <ProfilePurchaseLinkSection initialValue={initialValue} />,
		},
	];

	const tabIds = useMemo(() => PROFILE_EDIT_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

	const tabs = useMemo(
		() =>
			PROFILE_EDIT_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title="프로필 정보 수정"
					lastSavedAt={lastSavedAt}
					saveLabel={isRequiredFilled ? "저장" : "임시 저장"}
					saveDisabled={!isDirty || isSaving}
					onTempSave={handleSave}
					onBack={handleBack}
				/>
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
			</div>

			<div className="py-7">
				{formSections.map((section, index) => (
					<Fragment key={section.id}>
						<section
							className={section.className}
							ref={(el) => {
								sectionRefs[section.id].current = el;
							}}
						>
							{section.render()}
						</section>

						{index < formSections.length - 1 && (
							<Divider thickness="thin" fullBleed={true} spacing="md" />
						)}
					</Fragment>
				))}
			</div>
			<Modal
				open={isSaveFailed}
				onOpenChange={setIsSaveFailed}
				title="저장에 실패했어요."
				description="잠시 뒤 다시 시도해주세요."
				showCloseButton
				actions={[{ text: "확인", variant: "assistive", onClick: () => setIsSaveFailed(false) }]}
			/>
			{/* 임시저장 안내 모달 — TODO: [확인] 시 연결된 상세 페이지(두록 작가 상세)로 이동 — 페이지 미구현 */}
			<Modal
				open={isTempSavedModalOpen}
				onOpenChange={setIsTempSavedModalOpen}
				title="임시로 저장되었어요"
				description={
					<>
						아직 작성되지 않은 필수값이 있어요.
						<br />
						필수값을 모두 작성해야 플랫폼에 노출돼요.
					</>
				}
				showCloseButton
				actions={[
					{ text: "확인", variant: "assistive", onClick: () => setIsTempSavedModalOpen(false) },
				]}
			/>

			{/* 변경내용 안내 모달 */}
			<Modal
				open={isLeaveModalOpen}
				onOpenChange={setIsLeaveModalOpen}
				title="변경 내용이 있어요"
				description={
					<>
						아직 저장되지 않은 변경 내용이 있어요.
						<br />
						내용 유실을 막기 위해서는 변경 내용을 저장해주세요.
					</>
				}
				showCloseButton
				actions={[
					{ text: "저장 없이 나가기", variant: "assistive", onClick: goBack },
					{ text: "저장하기", variant: "primary", onClick: handleSaveAndLeave, disabled: isSaving },
				]}
			/>
		</DesktopContainer>
	);
};

// 마지막 저장 시각
const formatSavedAt = (date: Date) => {
	const pad = (value: number) => String(value).padStart(2, "0");
	return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
