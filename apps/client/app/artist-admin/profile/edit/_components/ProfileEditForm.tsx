"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Modal } from "@/components/common/Modal/Modal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import {
	createArtistSns,
	deleteArtistSns,
	type MyArtistProfileRequest,
	updateArtistSns,
	updateMyArtistName,
	updateMyArtistProfile,
} from "../_api/actions";
import type { ArtistProfileForm, ArtistSnsLink } from "../_types";
import { PROFILE_EDIT_TABS } from "./profileEditTabs";
import { isProfileFormValid, isSnsRowEmpty, normalizeUrl } from "./profileValidation";
import { ProfileBasicInfoSection } from "./sections/ProfileBasicInfoSection";
import { ProfilePurchaseLinkSection } from "./sections/ProfilePurchaseLinkSection";
import { ProfileSnsInfoSection } from "./sections/ProfileSnsInfoSection";

const MY_PAGE_PATH = "/artist-admin";

export interface ProfileEditFormProps {
	// SNS 추가에 사용
	profileId: string;
	initialValue: ArtistProfileForm;
	// 없으면 이전 화면으로
	onBack?: () => void;
}

export const ProfileEditForm = ({ profileId, initialValue, onBack }: ProfileEditFormProps) => {
	const router = useRouter();

	// 현재 입력값과 마지막으로 저장된 값 — 비교해서 변경 여부를 판단한다
	const [form, setForm] = useState(initialValue);
	const [savedForm, setSavedForm] = useState(initialValue);
	const handleChange = useCallback((patch: Partial<ArtistProfileForm>) => {
		setForm((prev) => ({ ...prev, ...patch }));
	}, []);

	// 네비게이션 : 변경 내용이 있을 때만 활성
	// 버튼 문구는 Figma 대로 데스크탑 "임시 저장"(마지막 저장 시각과 함께), 모바일 "저장"
	const isDirty = toComparable(form) !== toComparable(savedForm);
	// 형식 오류는 저장을 시도한 뒤부터 보여준다 (입력 도중에는 형식이 맞지 않으므로)
	const [showErrors, setShowErrors] = useState(false);

	const [lastSavedAt, setLastSavedAt] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [isSaveFailed, setIsSaveFailed] = useState(false);
	// MODAL 25 변경 내용 확인
	const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

	const goBack = onBack ?? (() => router.back());

	// 저장에 성공하면 true — 변경 내용 확인 모달의 "저장하기"가 저장 후 이동할 때 쓴다
	const save = async () => {
		if (isSaving || !isDirty) return false;
		if (!isProfileFormValid(form)) {
			setShowErrors(true);
			return false;
		}

		setIsSaving(true);
		try {
			const request = toProfileRequest(form);
			await updateMyArtistProfile(request, form.profileImageFile);
			if (form.nameKo !== savedForm.nameKo || form.nameEn !== savedForm.nameEn) {
				await updateMyArtistName({ nameKo: request.nameKo, nameEn: request.nameEn });
			}
			const sns = await saveSnsChanges(profileId, savedForm.sns, form.sns);

			const nextForm = { ...form, profileImageFile: null, sns };
			setForm(nextForm);
			setSavedForm(nextForm);
			setShowErrors(false);
			setLastSavedAt(formatSavedAt(new Date()));
			// 마이페이지 프로필 카드에 새 정보가 보이도록 서버 데이터를 다시 불러온다
			router.refresh();
			return true;
		} catch {
			setIsSaveFailed(true);
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	// 저장 후 마이페이지(프로필)로 돌아간다 — 뒤로가기로 수정 화면에 다시 오지 않도록 replace
	const handleSave = async () => {
		const saved = await save();
		if (saved) router.replace(MY_PAGE_PATH);
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
		// 형식 오류로 저장하지 못했으면 모달을 닫아 오류 표시를 보여준다
		setIsLeaveModalOpen(false);
		if (saved) goBack();
	};

	const formSections = [
		{
			id: "basic",
			className: "pb-7",
			render: () => (
				<ProfileBasicInfoSection value={form} onChange={handleChange} showErrors={showErrors} />
			),
		},
		{
			id: "sns",
			className: "pb-7 pt-7",
			render: () => (
				<ProfileSnsInfoSection value={form} onChange={handleChange} showErrors={showErrors} />
			),
		},
		{
			id: "purchase",
			className: "pb-7 pt-7",
			render: () => (
				<ProfilePurchaseLinkSection value={form} onChange={handleChange} showErrors={showErrors} />
			),
		},
	];

	const tabIds = useMemo(() => PROFILE_EDIT_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

	// 다른 화면(작품 등록 폼)에서 ?tab=purchase 로 넘어오면 해당 섹션으로 바로 스크롤한다
	const searchParams = useSearchParams();
	// biome-ignore lint/correctness/useExhaustiveDependencies: 처음 진입했을 때 한 번만 스크롤해야 함 — handleTabClick을 의존성에 넣으면 리렌더마다 다시 스크롤됨
	useEffect(() => {
		const tab = searchParams.get("tab");
		if (tab && tabIds.includes(tab)) handleTabClick(tab);
	}, [searchParams, tabIds]);

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title="프로필 정보 수정"
					lastSavedAt={lastSavedAt}
					saveLabel={
						<>
							<span className="min-[721px]:hidden">저장</span>
							<span className="hidden min-[721px]:inline">임시 저장</span>
						</>
					}
					saveDisabled={!isDirty || isSaving}
					tempSaveDisabled={isSaving}
					onTempSave={handleSave}
					onBack={handleBack}
				/>
				<TabBar tabs={PROFILE_EDIT_TABS} activeTab={activeTab} onTabClick={handleTabClick} />
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

// 변경 여부 비교용 — 화면용 행 key 와 파일 객체는 빼고 비교한다 (새 파일은 미리보기 주소가 바뀌어 잡힌다)
const toComparable = ({ profileImageFile: _file, sns, ...rest }: ArtistProfileForm) =>
	JSON.stringify({ ...rest, sns: sns.map(({ snsId, label, url }) => ({ snsId, label, url })) });

// 보내지 않은 필드는 서버가 기존 값을 유지한다
// TODO: 국문 성명·이메일·프로필 이미지는 비워서 저장할 수 없음 (빈 값을 받지 않고 삭제 API 도 없음) — BE 문의 필요
const toProfileRequest = (form: ArtistProfileForm): MyArtistProfileRequest => {
	const nameKo = form.nameKo.trim();
	const email = form.emailLocal && form.emailDomain ? `${form.emailLocal}@${form.emailDomain}` : "";
	return {
		nameKo: nameKo || undefined,
		nameEn: form.nameEn.trim(),
		bio: form.bio,
		email: email || undefined,
		purchaseContactUrl: normalizeUrl(form.purchaseUrl),
	};
};

// SNS 는 행 단위 API 라 저장된 목록과 비교해 삭제·수정·추가를 보낸다 — 빈 행은 버리고, 새 행에는 받은 snsId 를 붙여 돌려준다
const saveSnsChanges = async (
	profileId: string,
	savedRows: ArtistSnsLink[],
	rows: ArtistSnsLink[],
): Promise<ArtistSnsLink[]> => {
	const nextRows = rows
		.filter((row) => !isSnsRowEmpty(row))
		.map((row) => ({ ...row, label: row.label.trim(), url: normalizeUrl(row.url) }));
	const keptSnsIds = new Set(nextRows.map((row) => row.snsId));

	const deletions = savedRows
		.filter((row) => row.snsId && !keptSnsIds.has(row.snsId))
		.map((row) => deleteArtistSns(row.snsId as string));

	const upserts = nextRows.map(async (row) => {
		const body = { platformName: row.label, url: row.url };
		if (!row.snsId) return { ...row, snsId: await createArtistSns(profileId, body) };

		const saved = savedRows.find((savedRow) => savedRow.snsId === row.snsId);
		if (saved?.label !== row.label || saved?.url !== row.url)
			await updateArtistSns(row.snsId, body);
		return row;
	});

	const [, savedNextRows] = await Promise.all([Promise.all(deletions), Promise.all(upserts)]);
	return savedNextRows;
};
