"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormField } from "@/components/common/FormField/FormField";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Modal } from "@/components/common/Modal/Modal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { ADMIN_LOGIN_HREF } from "@/lib/constants/admin";
import { NEW_GROUP_ID_PREFIX, saveExhibitionSettings } from "../_api/actions";
import { type ExhibitionSettings, HIDDEN_OPTIONS, REQUIRED_OPTIONS } from "../_types";
import { GroupSettings, getGroupNameErrors } from "./GroupSettings";

const TABS = [
	{ id: "group", label: "그룹" },
	{ id: "required", label: "필수 정보" },
	{ id: "hidden", label: "정보 숨기기" },
];

// 피그마 입력 제목 아래 12px · 체크박스 줄 높이 44px · 체크박스 문구 Body2 bold
const FIELD_CLASS = "gap-3";
const CHECKBOX_CLASS = "min-h-11";
const CHECKBOX_LABEL_CLASS = "text-body2-bold";

// "2026.09.29 14:05"
const formatSavedAt = (date: Date) => {
	const pad = (value: number) => String(value).padStart(2, "0");
	return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const SAVE_FAILED_MESSAGE = "저장에 실패했어요. 잠시 뒤 다시 시도해주세요.";

interface ExhibitionSettingsFormProps {
	exhibitionId: string;
	initialSettings: ExhibitionSettings;
}

export const ExhibitionSettingsForm = ({
	exhibitionId,
	initialSettings,
}: ExhibitionSettingsFormProps) => {
	const router = useRouter();
	const tabIds = useMemo(() => TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

	const [saved, setSaved] = useState(initialSettings);
	const [settings, setSettings] = useState(initialSettings);
	// API 가 저장 시각을 주지 않아 이 화면에서 저장했을 때만 표시 (빈 문자열이면 FormHeader 가 숨김)
	const [lastSavedAt, setLastSavedAt] = useState("");
	const [isSaving, setIsSaving] = useState(false);
	const [showErrors, setShowErrors] = useState(false);
	const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
	const nextGroupId = useRef(0);

	const isDirty = JSON.stringify(settings) !== JSON.stringify(saved);
	const groupErrors = getGroupNameErrors(settings.groups);

	// 저장하지 않은 변경이 있으면 새로고침·탭 닫기 때 브라우저 기본 확인창
	useEffect(() => {
		if (!isDirty) return;
		const handleBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty]);

	const update = (patch: Partial<ExhibitionSettings>) =>
		setSettings((prev) => ({ ...prev, ...patch }));

	// 저장하지 못했으면 false
	const handleSave = async () => {
		if (isSaving) return false;
		if (groupErrors.some(Boolean)) {
			setShowErrors(true);
			handleTabClick("group");
			return false;
		}
		const trimmed = {
			...settings,
			groups: settings.groups.map((group) => ({ ...group, name: group.name.trim() })),
		};

		setIsSaving(true);
		const result = await saveExhibitionSettings(exhibitionId, trimmed);
		setIsSaving(false);

		if (!result.ok) {
			if (result.reason === "UNAUTHORIZED") router.replace(ADMIN_LOGIN_HREF);
			else alert(result.message ?? SAVE_FAILED_MESSAGE);
			return false;
		}

		// 새 그룹은 서버가 준 id 로 바꿔야 다시 저장할 때 또 생성되지 않는다
		const next = { ...trimmed, groups: result.groups };
		setSettings(next);
		setSaved(next);
		setShowErrors(false);
		setLastSavedAt(formatSavedAt(new Date()));
		return true;
	};

	const handleBack = () => {
		if (isDirty) setIsLeaveModalOpen(true);
		else router.back();
	};

	const sections = [
		{
			id: "group",
			title: "전시 내 작품 그룹",
			description:
				"전시 공간의 물리적 위치나 담당 교수 등 다양한 기준으로 출품작을 그룹화 할 수 있습니다.\n그룹화된 작품은 화면에서도 기준에 따라 구분되어 표시됩니다.",
			content: (
				<FormField
					label="그룹 목록"
					description="그룹이 1개이면 화면에 표시되지 않아요."
					className={FIELD_CLASS}
				>
					<GroupSettings
						groups={settings.groups}
						errors={showErrors ? groupErrors : undefined}
						onChange={(groups) => update({ groups })}
						onAdd={() => {
							nextGroupId.current += 1;
							update({
								groups: [
									...settings.groups,
									{ id: `${NEW_GROUP_ID_PREFIX}${nextGroupId.current}`, name: "", description: "" },
								],
							});
						}}
					/>
				</FormField>
			),
		},
		{
			id: "required",
			title: "전시 내 작품 필수 값",
			description: "전시에 들어갈 작품의 필수 값을 설정할 수 있어요.",
			content: REQUIRED_OPTIONS.map(({ key, title, label }) => (
				<FormField key={key} label={title} className={FIELD_CLASS}>
					<Checkbox
						checked={settings.required[key]}
						onChange={(checked) => update({ required: { ...settings.required, [key]: checked } })}
						label={<span className={CHECKBOX_LABEL_CLASS}>{label}</span>}
						className={CHECKBOX_CLASS}
					/>
				</FormField>
			)),
		},
		{
			id: "hidden",
			title: "작품 정보 숨기기",
			description: "작품 항목 중, 전시 웹사이트 내에서 보여주지 않을 항목을 설정할 수 있어요.",
			content: HIDDEN_OPTIONS.map((option) => (
				<FormField
					key={option.key}
					label={option.title}
					description={"description" in option ? option.description : undefined}
					className={FIELD_CLASS}
				>
					<Checkbox
						checked={settings.hidden[option.key]}
						onChange={(checked) =>
							update({ hidden: { ...settings.hidden, [option.key]: checked } })
						}
						label={<span className={CHECKBOX_LABEL_CLASS}>{option.label}</span>}
						className={CHECKBOX_CLASS}
					/>
				</FormField>
			)),
		},
	];

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-header bg-normal">
				<FormHeader
					title="전시 관리"
					lastSavedAt={lastSavedAt}
					saveLabel="저장"
					onTempSave={handleSave}
					onBack={handleBack}
				/>
				<TabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
			</div>

			<div className="pb-7">
				{sections.map((section, index) => (
					<Fragment key={section.id}>
						<section
							ref={(el) => {
								sectionRefs[section.id].current = el;
							}}
							className="flex flex-col gap-5 py-6 min-[721px]:flex-row min-[721px]:gap-10 min-[721px]:py-7"
						>
							<div className="flex min-w-0 flex-col gap-2 min-[721px]:w-100">
								<h2 className="px-0.5 text-head3 text-strong">{section.title}</h2>
								<p className="whitespace-pre-line px-0.5 text-body2 text-lighter">
									{section.description}
								</p>
							</div>
							<div className="flex min-w-0 flex-1 flex-col gap-9">{section.content}</div>
						</section>
						{index < sections.length - 1 && (
							<Divider thickness="thin" fullBleed={true} spacing="md" />
						)}
					</Fragment>
				))}
			</div>

			{/* 모달 명세서 25 변경 내용 확인 모달 */}
			<Modal
				open={isLeaveModalOpen}
				onOpenChange={setIsLeaveModalOpen}
				title="변경 내용이 있어요."
				description="아직 저장되지 않은 변경 내용이 있어요. 내용 유실을 막기 위해서는 변경 내용을 저장해주세요."
				showCloseButton
				actions={[
					{ text: "저장 없이 나가기", variant: "assistive", onClick: () => router.back() },
					{
						text: "저장하기",
						variant: "primary",
						onClick: async () => {
							setIsLeaveModalOpen(false);
							if (await handleSave()) router.back();
						},
					},
				]}
			/>
		</DesktopContainer>
	);
};
