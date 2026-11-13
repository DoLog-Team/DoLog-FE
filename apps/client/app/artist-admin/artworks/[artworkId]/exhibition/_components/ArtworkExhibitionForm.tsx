"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toErrorMessage } from "@/app/artist-admin/(shell)/_api/actions";
import type { MyArtworkDetail } from "@/app/artist-admin/artworks/_api/getMyArtwork";
import { updateArtworkAdditionalInfo } from "@/app/artist-admin/artworks/_api/updateArtwork";
import {
	toArtworkVisibility,
	updateArtworkVisibility,
} from "@/app/artist-admin/artworks/_api/updateArtworkVisibility";
import { ArtworkPublishSettingsModal } from "@/app/artist-admin/artworks/_components/ArtworkPublishSettingsModal";
import { ArtworkSaveConfirmModal } from "@/app/artist-admin/artworks/_components/ArtworkSaveConfirmModal";
import { ArtworkVisibilitySection } from "@/app/artist-admin/artworks/_components/ArtworkVisibilitySection";
import {
	calculateCompletionRate,
	isArtworkSatisfied,
} from "@/app/artist-admin/artworks/_components/artworkCompleteness";
import {
	ArtworkAdditionalInfoSection,
	type ArtworkAdditionalInfoValue,
	hasAdditionalInfoError,
} from "@/app/artist-admin/artworks/_components/sections/ArtworkAdditionalInfoSection";
import { useArtworkVisibility } from "@/app/artist-admin/artworks/_components/useArtworkVisibility";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormField } from "@/components/common/FormField/FormField";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { UnsavedChangesModal } from "@/components/common/Modal/UnsavedChangesModal";
import { useLeaveConfirm } from "@/lib/hooks/useLeaveConfirm";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { compressImageFile } from "@/lib/utils/image";
import {
	type ArtworkFieldSettings,
	getArtworkExhibitionStatus,
} from "../_api/getArtworkExhibitionStatus";
import { getExhibitionFieldSettings } from "../_api/getExhibitionFieldSettings";
import { type ExhibitionZone, getExhibitionZones } from "../_api/getExhibitionZones";
import { submitArtwork } from "../_api/submitArtwork";
import { ArtworkExhibitionGroupSection } from "./sections/ArtworkExhibitionGroupSection";
import { ArtworkExhibitionLinkSection } from "./sections/ArtworkExhibitionLinkSection";

export interface ArtworkExhibitionFormProps {
	artwork: MyArtworkDetail;
	pendingExhibitionId: string | null;
	onBack: () => void;
	onSubmitted: () => void;
	onCancelled: () => void;
}

export const ArtworkExhibitionForm = ({
	artwork,
	pendingExhibitionId,
	onBack,
	onSubmitted,
	onCancelled,
}: ArtworkExhibitionFormProps) => {
	const router = useRouter();
	const { notice, showNotice, closeNotice } = useNoticeModal();
	const visibility = useArtworkVisibility(artwork);
	const relevantExhibitionId = artwork.exhibitionId ?? pendingExhibitionId;
	const isSubmitted = !!artwork.exhibitionId;

	const [fieldSettings, setFieldSettings] = useState<ArtworkFieldSettings | null>(null);
	const [planLimitExceeded, setPlanLimitExceeded] = useState(false);
	const [zones, setZones] = useState<ExhibitionZone[]>([]);
	const [zoneId, setZoneId] = useState<string | undefined>(artwork.zoneId ?? undefined);
	const [isSaving, setIsSaving] = useState(false);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isPublishSettingsOpen, setIsPublishSettingsOpen] = useState(false);

	const [mainImageFile, setMainImageFile] = useState<File | null>(null);
	const [mainImagePreview, setMainImagePreview] = useState<string | null>(artwork.mainImg);
	const [additional, setAdditional] = useState<ArtworkAdditionalInfoValue>({
		materials: artwork.materials,
		width: artwork.width != null ? String(artwork.width) : "",
		height: artwork.height != null ? String(artwork.height) : "",
		hasVolume: artwork.depth != null,
		depth: artwork.depth != null ? String(artwork.depth) : "",
	});
	const updateAdditional = (patch: Partial<ArtworkAdditionalInfoValue>) =>
		setAdditional((prev) => ({ ...prev, ...patch }));
	const [locationMapFile, setLocationMapFile] = useState<File | null>(null);
	const [locationMapPreview, setLocationMapPreview] = useState<string | null>(artwork.locationMap);

	const buildSnapshot = () =>
		JSON.stringify({
			zoneId,
			mainImagePreview,
			additional,
			locationMapPreview,
			visibility: visibility.visibility,
		});
	const [savedSnapshot, setSavedSnapshot] = useState(buildSnapshot);
	const isDirty = buildSnapshot() !== savedSnapshot;

	useEffect(() => {
		setZoneId(artwork.zoneId ?? undefined);
	}, [artwork.zoneId]);

	useEffect(() => {
		if (!relevantExhibitionId) return;
		getExhibitionZones(relevantExhibitionId)
			.then(setZones)
			.catch(() => {});
	}, [relevantExhibitionId]);

	useEffect(() => {
		if (!relevantExhibitionId) return;
		getExhibitionFieldSettings(relevantExhibitionId)
			.then(setFieldSettings)
			.catch(() => {});
	}, [relevantExhibitionId]);

	useEffect(() => {
		if (!artwork.exhibitionId) return;
		getArtworkExhibitionStatus(artwork.artworkId)
			.then((status) => setPlanLimitExceeded(status.planLimitExceeded))
			.catch(() => {});
	}, [artwork.artworkId, artwork.exhibitionId]);

	const required = fieldSettings?.required;

	const completenessInput = {
		category: artwork.category ?? undefined,
		productionEndYear: artwork.productionEndYear ? String(artwork.productionEndYear) : undefined,
		exhibitionId: relevantExhibitionId,
		zoneId,
		hasZonesInExhibition: zones.length > 0,
		fieldSettings,
		mainImagePreview,
		width: additional.width,
		height: additional.height,
		materials: additional.materials,
		locationMap: locationMapPreview,
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
		exhibitionId: relevantExhibitionId,
		zoneId: artwork.zoneId,
		hasZonesInExhibition: zones.length > 0,
		fieldSettings,
		mainImagePreview: artwork.mainImg,
		width: artwork.width != null ? String(artwork.width) : "",
		height: artwork.height != null ? String(artwork.height) : "",
		materials: artwork.materials,
		locationMap: artwork.locationMap,
	});

	const save = async (): Promise<boolean> => {
		if (!relevantExhibitionId) return false;
		setIsSaving(true);
		try {
			if (isSubmitted) {
				const targetVisibility =
					!isSatisfied && visibility.visibility === "PUBLIC" ? "PRIVATE" : visibility.visibility;
				const zoneChanged = zoneId != null && zoneId !== artwork.zoneId;
				const visibilityChanged = targetVisibility !== toArtworkVisibility(artwork);
				if (zoneChanged || visibilityChanged) {
					await updateArtworkVisibility(artwork.artworkId, targetVisibility, zoneId);
				}
				if (targetVisibility !== visibility.visibility) visibility.handleChange(targetVisibility);
			}

			await updateArtworkAdditionalInfo(artwork.artworkId, {
				materials: additional.materials,
				width: additional.width,
				height: additional.height,
				depth: additional.hasVolume ? additional.depth : undefined,
				locationMapFile: isSubmitted ? locationMapFile : undefined,
				mainImageFile,
			});

			if (!isSubmitted) {
				await submitArtwork(artwork.artworkId, {
					exhibitionId: relevantExhibitionId,
					zoneId,
					locationMapFile,
				});
				onSubmitted();
			} else {
				router.refresh();
			}
			setSavedSnapshot(buildSnapshot());
			return true;
		} catch (error) {
			showNotice(isSubmitted ? "저장에 실패했어요" : "출품에 실패했어요", toErrorMessage(error));
			return false;
		} finally {
			setIsSaving(false);
		}
	};

	const handleSaveClick = () => {
		if (!isSatisfied) {
			setIsConfirmOpen(true);
			return;
		}
		// 임시저장이었던 작품이 이번에 처음 100%가 됐으면, 바로 저장하는 대신 공개 설정 모달을 띄운다
		if (isSubmitted && !wasSatisfied) {
			if (visibility.visibility !== "PUBLIC") visibility.handleChange("PUBLIC");
			setIsPublishSettingsOpen(true);
			return;
		}
		save();
	};

	const handleConfirmSave = async () => {
		setIsConfirmOpen(false);
		setIsPublishSettingsOpen(false);
		await save();
	};

	const { isLeaveModalOpen, setIsLeaveModalOpen, handleBack, handleLeaveAndSave } = useLeaveConfirm(
		isDirty,
		save,
		onBack,
	);

	if (!relevantExhibitionId) {
		return (
			<div className="p-8 text-body1 text-lighter">
				출품할 전시를 찾을 수 없어요. 작품 카드의 "작품 출품하기"로 다시 시도해주세요.
			</div>
		);
	}

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={artwork.title}
					lastSavedAt=""
					completionRate={completionRate}
					onBack={handleBack}
					onTempSave={handleSaveClick}
					tempSaveDisabled={isSaving}
					saveDisabled={hasAdditionalInfoError(additional) || (isSubmitted && !isDirty)}
					saveLabel={isSubmitted ? "저장" : "출품하기"}
				/>
			</div>

			<div className="flex flex-col gap-7 py-7">
				{isSubmitted && artwork.exhibitionName && (
					<>
						<ArtworkExhibitionLinkSection
							artworkId={artwork.artworkId}
							artworkTitle={artwork.title}
							exhibitionName={artwork.exhibitionName}
							hidden={artwork.hidden}
							planLimitExceeded={planLimitExceeded}
							onCancelled={onCancelled}
						/>
						<Divider thickness="thin" fullBleed={true} spacing="md" />
					</>
				)}

				{zones.length > 0 && (
					<>
						<ArtworkExhibitionGroupSection zones={zones} value={zoneId} onChange={setZoneId} />
						<Divider thickness="thin" fullBleed={true} spacing="md" />
					</>
				)}

				{isSubmitted && (
					<>
						<ArtworkVisibilitySection
							value={visibility.visibility}
							onChange={visibility.handleChange}
							disabled={isSaving}
							hasExhibition
						/>
						<Divider thickness="thin" fullBleed={true} spacing="md" />
					</>
				)}

				{required?.mainImg && (
					<>
						<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
							<div className="min-w-0 min-[721px]:w-100">
								<h2 className="text-head3 text-strong">작품 대표 이미지</h2>
							</div>
							<div className="min-w-0 flex-1">
								<FormField label="대표 이미지" required>
									<ImageInput
										className="w-full"
										accept="image/jpeg,image/png,image/webp"
										images={mainImagePreview ? [mainImagePreview] : []}
										maxCount={1}
										onAdd={(files) => {
											const file = files[0];
											if (!file) return;
											compressImageFile(file)
												.then((compressed) => {
													setMainImageFile(compressed);
													setMainImagePreview(URL.createObjectURL(compressed));
												})
												.catch(() =>
													showNotice(
														"이미지를 불러오지 못했어요",
														"jpg, png, webp 형식의 이미지만 업로드할 수 있어요.\n다른 파일로 다시 시도해주세요.",
													),
												);
										}}
										onRemove={() => {
											setMainImageFile(null);
											setMainImagePreview(null);
										}}
									/>
								</FormField>
							</div>
						</div>
						<Divider thickness="thin" fullBleed={true} spacing="md" />
					</>
				)}

				{(required?.materials || required?.size) && (
					<>
						<ArtworkAdditionalInfoSection
							value={additional}
							onChange={updateAdditional}
							showMaterials={!!required?.materials}
							showSize={!!required?.size}
							materialsRequired={required?.materials}
							sizeRequired={required?.size}
						/>
						<Divider thickness="thin" fullBleed={true} spacing="md" />
					</>
				)}

				<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
					<div className="min-w-0 min-[721px]:w-100">
						<h2 className="text-head3 text-strong">작품 위치 이미지</h2>
						<span className="text-body2 text-lighter">
							전시장 안에서 작품이 배치된 위치를 안내하는 이미지를 등록할 수 있어요.
						</span>
					</div>
					<div className="min-w-0 flex-1">
						<FormField label="위치 이미지" required={required?.locationMap}>
							<ImageInput
								images={locationMapPreview ? [locationMapPreview] : []}
								maxCount={1}
								onAdd={(files) => {
									const file = files[0];
									if (!file) return;
									setLocationMapFile(file);
									setLocationMapPreview(URL.createObjectURL(file));
								}}
								onRemove={() => {
									setLocationMapFile(null);
									setLocationMapPreview(null);
								}}
							/>
						</FormField>
					</div>
				</div>
			</div>

			<NoticeModal notice={notice} onClose={closeNotice} />
			<ArtworkSaveConfirmModal
				open={isConfirmOpen}
				onOpenChange={setIsConfirmOpen}
				isSatisfied={false}
				isSaving={isSaving}
				onConfirm={handleConfirmSave}
			/>
			<ArtworkPublishSettingsModal
				open={isPublishSettingsOpen}
				onOpenChange={setIsPublishSettingsOpen}
				value={visibility.visibility}
				onChange={visibility.handleChange}
				hasExhibition
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
