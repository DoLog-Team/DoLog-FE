"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { UnsavedChangesModal } from "@/components/common/Modal/UnsavedChangesModal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { DotsLoader } from "@/components/common/Spinner/DotsLoader";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import { useLeaveConfirm } from "@/lib/hooks/useLeaveConfirm";
import { type ArtworkCategoryOption, getArtworkCategories } from "../_api/getArtworkCategories";
import type { MyArtworkDetail } from "../_api/getMyArtwork";
import { updateArtworkBasicInfo } from "../_api/updateArtwork";
import { toArtworkVisibility, updateArtworkVisibility } from "../_api/updateArtworkVisibility";
import {
	type ArtworkFieldSettings,
	getArtworkExhibitionStatus,
} from "../[artworkId]/exhibition/_api/getArtworkExhibitionStatus";
import { getExhibitionZones } from "../[artworkId]/exhibition/_api/getExhibitionZones";
import { ArtworkFormHeader } from "./ArtworkFormHeader";
import { ArtworkPublishSettingsModal } from "./ArtworkPublishSettingsModal";
import { ArtworkSaveConfirmModal } from "./ArtworkSaveConfirmModal";
import { ArtworkVisibilitySection } from "./ArtworkVisibilitySection";
import { calculateCompletionRate, isArtworkSatisfied } from "./artworkCompleteness";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { getBasicMissingCount } from "./getBasicMissingCount";
import {
	ArtworkAdditionalInfoSection,
	type ArtworkAdditionalInfoValue,
	hasAdditionalInfoError,
} from "./sections/ArtworkAdditionalInfoSection";
import {
	ArtworkBasicInfoSection,
	type ArtworkBasicInfoValue,
	hasStartAfterEndError,
	hasStartDatePartialError,
} from "./sections/ArtworkBasicInfoSection";
import {
	ArtworkImageSection,
	type ArtworkImageValue,
	hasYoutubeUrlError,
} from "./sections/ArtworkImageSection";
import {
	ArtworkPurchaseInfoSection,
	type ArtworkPurchaseInfoValue,
} from "./sections/ArtworkPurchaseInfoSection";
import { useArtworkVisibility } from "./useArtworkVisibility";

export interface ArtworkFormProps {
	artwork: MyArtworkDetail;
	onBack: () => void;
}

const toDateString = (n: number | null) => (n != null ? String(n) : undefined);
const toSizeString = (n: number | null) => (n != null ? String(n) : "");

export const ArtworkForm = ({ artwork, onBack }: ArtworkFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const tabIds = useMemo(() => ARTWORK_FORM_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);
	const [basicMissingCount, setBasicMissingCount] = useState(() => getBasicMissingCount(artwork));
	const [categoryOptions, setCategoryOptions] = useState<ArtworkCategoryOption[]>([]);
	const [fieldSettings, setFieldSettings] = useState<ArtworkFieldSettings | null>(null);
	const [hasZonesInExhibition, setHasZonesInExhibition] = useState(false);
	const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
	const [isPublishSettingsOpen, setIsPublishSettingsOpen] = useState(false);

	useEffect(() => {
		getArtworkCategories()
			.then(setCategoryOptions)
			.catch(() => {});
	}, []);

	// 출품된 작품이면, 저장 시 필수값 판정에 그 전시의 그룹·필수 항목 설정이 필요하다
	useEffect(() => {
		if (!artwork.exhibitionId) return;
		getArtworkExhibitionStatus(artwork.artworkId)
			.then((status) => setFieldSettings(status.fieldSettings))
			.catch(() => {});
		getExhibitionZones(artwork.exhibitionId)
			.then((zones) => setHasZonesInExhibition(zones.length > 0))
			.catch(() => {});
	}, [artwork.artworkId, artwork.exhibitionId]);

	const [basic, setBasic] = useState<ArtworkBasicInfoValue>({
		shortIntro: artwork.shortIntro ?? "",
		category: artwork.category ?? undefined,
		hasStartDate: artwork.productionStartYear != null,
		startYear: toDateString(artwork.productionStartYear),
		startMonth: toDateString(artwork.productionStartMonth),
		startDay: toDateString(artwork.productionStartDay),
		endYear: toDateString(artwork.productionEndYear),
		endMonth: toDateString(artwork.productionEndMonth),
		endDay: toDateString(artwork.productionEndDay),
	});
	const [additional, setAdditional] = useState<ArtworkAdditionalInfoValue>({
		materials: artwork.materials,
		width: toSizeString(artwork.width),
		height: toSizeString(artwork.height),
		hasVolume: artwork.depth != null,
		depth: toSizeString(artwork.depth),
	});
	const [image, setImage] = useState<ArtworkImageValue>({
		mainImagePreview: artwork.mainImg,
		youtubeUrl: artwork.youtubeUrl ?? "",
	});
	const [mainImageFile, setMainImageFile] = useState<File | null>(null);
	const [purchase, setPurchase] = useState<ArtworkPurchaseInfoValue>({
		showPurchaseButton: artwork.showPurchaseButton ?? false,
	});
	const { isSaving, error: saveError, run } = useAsyncSave();
	const visibility = useArtworkVisibility(artwork);

	const buildSnapshot = () =>
		JSON.stringify({ basic, additional, image, purchase, visibility: visibility.visibility });
	const [savedSnapshot, setSavedSnapshot] = useState(buildSnapshot);
	const isDirty = buildSnapshot() !== savedSnapshot;

	const updateBasic = useCallback(
		(patch: Partial<ArtworkBasicInfoValue>) => setBasic((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updateAdditional = useCallback(
		(patch: Partial<ArtworkAdditionalInfoValue>) =>
			setAdditional((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updateImage = useCallback(
		(patch: Partial<ArtworkImageValue>) => setImage((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updatePurchase = useCallback(
		(patch: Partial<ArtworkPurchaseInfoValue>) => setPurchase((prev) => ({ ...prev, ...patch })),
		[],
	);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	const hasValidationError =
		hasAdditionalInfoError(additional) ||
		hasStartDatePartialError(basic) ||
		hasStartAfterEndError(basic);

	const handleTempSave = async () => {
		if (hasValidationError) return false;
		const saved = await run(async () => {
			const currentVisibility = toArtworkVisibility(artwork);
			const targetVisibility =
				!isSatisfied && visibility.visibility !== "PRIVATE" ? "PRIVATE" : visibility.visibility;
			const visibilityChanged = targetVisibility !== currentVisibility;
			const isDowngrading = targetVisibility === "PRIVATE" && currentVisibility !== "PRIVATE";

			if (isDowngrading && visibilityChanged) {
				await updateArtworkVisibility(artwork.artworkId, targetVisibility);
			}

			await updateArtworkBasicInfo(artwork.artworkId, {
				category: basic.category,
				shortIntro: basic.shortIntro,
				materials: additional.materials,
				width: additional.width,
				height: additional.height,
				depth: additional.hasVolume ? additional.depth : undefined,
				productionStartYear: basic.hasStartDate ? basic.startYear : undefined,
				productionStartMonth: basic.hasStartDate ? basic.startMonth : undefined,
				productionStartDay: basic.hasStartDate ? basic.startDay : undefined,
				clearProductionStartDate: !basic.hasStartDate,
				productionEndYear: basic.endYear,
				productionEndMonth: basic.endMonth,
				productionEndDay: basic.endDay,
				clearProductionEndDate: !basic.endYear,
				// 유효하지 않은 유튜브 링크는 저장을 막는 대신, 보내지 않고(= 지우고) 저장한다
				youtubeUrl: hasYoutubeUrlError(image.youtubeUrl) ? "" : image.youtubeUrl,
				showPurchaseButton: purchase.showPurchaseButton,
				mainImageFile,
				clearMainImage: !mainImageFile && !image.mainImagePreview,
			});

			if (!isDowngrading && visibilityChanged) {
				await updateArtworkVisibility(artwork.artworkId, targetVisibility);
			}
			if (targetVisibility !== visibility.visibility) visibility.handleChange(targetVisibility);
		});
		if (saved) {
			setMainImageFile(null);
			setSavedSnapshot(buildSnapshot());
		}
		return saved;
	};

	const { isLeaveModalOpen, setIsLeaveModalOpen, handleBack, handleLeaveAndSave } = useLeaveConfirm(
		isDirty,
		handleTempSave,
		onBack,
	);

	// "저장 후 상세 정보 작성" — 모달 없이 조용히 임시저장만 하고 다음 탭으로 넘어간다
	const handleNext = async () => {
		if (await handleTempSave()) router.push(`${pathname}/detail`);
	};

	const handleTopTabClick = (tabId: string) => {
		if (tabId === "detail") {
			handleNext();
			return;
		}
		handleTabClick(tabId);
	};

	const completenessInput = {
		category: basic.category,
		productionEndYear: basic.endYear,
		exhibitionId: artwork.exhibitionId,
		zoneId: artwork.zoneId,
		hasZonesInExhibition,
		fieldSettings,
		mainImagePreview: image.mainImagePreview,
		width: additional.width,
		height: additional.height,
		materials: additional.materials,
		locationMap: artwork.locationMap,
	};
	const isSatisfied = isArtworkSatisfied(completenessInput);
	const completionRate = calculateCompletionRate({
		...completenessInput,
		sizeType: artwork.sizeType,
	});

	// 마지막 저장 시점(= 진입 시점) 기준 충족 여부 — "이번에 처음 100% 됐는지" 판단용
	const wasSatisfied = isArtworkSatisfied({
		category: artwork.category ?? undefined,
		productionEndYear: artwork.productionEndYear ? String(artwork.productionEndYear) : undefined,
		exhibitionId: artwork.exhibitionId,
		zoneId: artwork.zoneId,
		hasZonesInExhibition,
		fieldSettings,
		mainImagePreview: artwork.mainImg,
		width: artwork.width ? String(artwork.width) : "",
		height: artwork.height ? String(artwork.height) : "",
		materials: artwork.materials,
		locationMap: artwork.locationMap,
	});

	// 헤더의 "저장" 버튼 — 바로 저장하지 않고 확인 모달부터 띄운다
	// 임시저장이었던 작품이 이번에 처음 100%가 됐으면, 저장 확인 대신 공개 설정 모달을 띄운다
	const handleSaveClick = () => {
		if (hasValidationError) return;
		if (!wasSatisfied && isSatisfied) {
			if (visibility.visibility !== "PUBLIC") visibility.handleChange("PUBLIC");
			setIsPublishSettingsOpen(true);
			return;
		}
		setIsSaveConfirmOpen(true);
	};

	const handleConfirmSave = async () => {
		if (await handleTempSave()) {
			setIsSaveConfirmOpen(false);
			setIsPublishSettingsOpen(false);
			router.push(isSatisfied ? `/artworks/${artwork.artworkId}` : "/artist-admin");
		}
	};

	const tabs = useMemo(
		() =>
			ARTWORK_FORM_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	const formSections = [
		{
			id: "visibility",
			className: "pb-7",
			render: () => (
				<ArtworkVisibilitySection
					value={visibility.visibility}
					onChange={visibility.handleChange}
					disabled={isSaving}
					hasExhibition={artwork.exhibitionId != null}
				/>
			),
		},
		{
			id: "basic",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkBasicInfoSection
					value={basic}
					onChange={updateBasic}
					onMissingCountChange={handleBasicMissingCountChange}
					categoryOptions={categoryOptions}
				/>
			),
		},
		{
			id: "image",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkImageSection
					value={image}
					onChange={updateImage}
					onMainImageFileChange={setMainImageFile}
					mainImageRequired={!!(artwork.exhibitionId && fieldSettings?.required.mainImg)}
				/>
			),
		},
		{
			id: "additional",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkAdditionalInfoSection
					value={additional}
					onChange={updateAdditional}
					materialsRequired={!!(artwork.exhibitionId && fieldSettings?.required.materials)}
					sizeRequired={!!(artwork.exhibitionId && fieldSettings?.required.size)}
				/>
			),
		},
		{
			id: "purchase",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkPurchaseInfoSection
					value={purchase}
					onChange={updatePurchase}
					onSaveBeforeLeave={handleTempSave}
				/>
			),
		},
	];

	return (
		<DesktopContainer>
			<ArtworkFormHeader
				artworkId={artwork.artworkId}
				initialTitle={artwork.title}
				completionRate={completionRate}
				onTempSave={handleSaveClick}
				isSaving={isSaving}
				saveDisabled={hasValidationError || !isDirty}
				saveError={saveError}
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={handleTopTabClick}
				onBack={handleBack}
			/>

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

			<div className="sticky bottom-0 z-10 flex justify-end border-t border-stroke-lightest bg-bg-normal py-4">
				<Button type="button" disabled={isSaving || hasValidationError} onClick={handleNext}>
					{isSaving ? <DotsLoader /> : "저장 후 상세 정보 작성"}
				</Button>
			</div>

			<ArtworkSaveConfirmModal
				open={isSaveConfirmOpen}
				onOpenChange={setIsSaveConfirmOpen}
				isSatisfied={isSatisfied}
				isSaving={isSaving}
				onConfirm={handleConfirmSave}
			/>
			<ArtworkPublishSettingsModal
				open={isPublishSettingsOpen}
				onOpenChange={setIsPublishSettingsOpen}
				value={visibility.visibility}
				onChange={visibility.handleChange}
				hasExhibition={artwork.exhibitionId != null}
				isSaving={isSaving}
				onConfirm={handleConfirmSave}
			/>
			<UnsavedChangesModal
				open={isLeaveModalOpen}
				onOpenChange={setIsLeaveModalOpen}
				onDiscard={onBack}
				onSave={handleLeaveAndSave}
				isSaving={isSaving}
			/>
		</DesktopContainer>
	);
};
