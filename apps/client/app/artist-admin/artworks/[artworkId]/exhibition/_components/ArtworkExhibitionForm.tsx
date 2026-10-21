"use client";

import { useEffect, useState } from "react";
import { toErrorMessage } from "@/app/artist-admin/(shell)/_api/actions";
import type { MyArtworkDetail } from "@/app/artist-admin/artworks/_api/getMyArtwork";
import { ArtworkVisibilitySection } from "@/app/artist-admin/artworks/_components/ArtworkVisibilitySection";
import { useArtworkVisibility } from "@/app/artist-admin/artworks/_components/useArtworkVisibility";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormField } from "@/components/common/FormField/FormField";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import {
	type ArtworkFieldSettings,
	getArtworkExhibitionStatus,
} from "../_api/getArtworkExhibitionStatus";
import { submitArtwork } from "../_api/submitArtwork";
import { ArtworkExhibitionAdditionalInfoSection } from "./sections/ArtworkExhibitionAdditionalInfoSection";
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
	const { notice, showNotice, closeNotice } = useNoticeModal();
	const visibility = useArtworkVisibility(artwork.artworkId, artwork);
	const [fieldSettings, setFieldSettings] = useState<ArtworkFieldSettings | null>(null);

	useEffect(() => {
		if (!artwork.exhibitionId) return;
		getArtworkExhibitionStatus(artwork.artworkId)
			.then((status) => setFieldSettings(status.fieldSettings))
			.catch(() => {});
	}, [artwork.artworkId, artwork.exhibitionId]);

	if (artwork.exhibitionId && artwork.exhibitionName) {
		return (
			<DesktopContainer>
				<div className="sticky top-0 z-10 bg-bg-normal">
					<FormHeader title={artwork.title} lastSavedAt="" onBack={onBack} />
				</div>
				<div className="flex flex-col gap-7 py-7">
					<ArtworkExhibitionLinkSection
						artworkId={artwork.artworkId}
						artworkTitle={artwork.title}
						exhibitionName={artwork.exhibitionName}
						hidden={artwork.hidden}
						onCancelled={onCancelled}
					/>

					<Divider thickness="thin" fullBleed={true} spacing="md" />

					<ArtworkVisibilitySection
						value={visibility.visibility}
						onChange={visibility.handleChange}
						disabled={visibility.isSaving}
						hasExhibition
					/>

					{fieldSettings && (
						<>
							<Divider thickness="thin" fullBleed={true} spacing="md" />
							<ArtworkExhibitionAdditionalInfoSection
								artworkId={artwork.artworkId}
								required={fieldSettings.required}
								initial={{
									materials: artwork.materials,
									width: artwork.width,
									height: artwork.height,
									depth: artwork.depth,
									locationMap: artwork.locationMap,
								}}
							/>
						</>
					)}
				</div>

				<NoticeModal notice={visibility.notice} onClose={visibility.closeNotice} />
			</DesktopContainer>
		);
	}

	return (
		<SubmitForm
			artwork={artwork}
			exhibitionId={pendingExhibitionId}
			onBack={onBack}
			onSubmitted={onSubmitted}
			showNotice={showNotice}
			notice={notice}
			closeNotice={closeNotice}
		/>
	);
};

const SubmitForm = ({
	artwork,
	exhibitionId,
	onBack,
	onSubmitted,
	notice,
	showNotice,
	closeNotice,
}: {
	artwork: MyArtworkDetail;
	exhibitionId: string | null;
	onBack: () => void;
	onSubmitted: () => void;
} & ReturnType<typeof useNoticeModal>) => {
	const [zoneId, setZoneId] = useState<string | undefined>(undefined);
	const [locationMapPreview, setLocationMapPreview] = useState<string | null>(null);
	const [locationMapFile, setLocationMapFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!exhibitionId) {
		return (
			<div className="p-8 text-body1 text-lighter">
				출품할 전시를 찾을 수 없어요. 작품 카드의 "작품 출품하기"로 다시 시도해주세요.
			</div>
		);
	}

	const handleSubmit = async () => {
		if (!zoneId) return;
		setIsSubmitting(true);
		try {
			await submitArtwork(artwork.artworkId, { exhibitionId, zoneId, locationMapFile });
			onSubmitted();
		} catch (error) {
			showNotice("출품에 실패했어요", toErrorMessage(error));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={artwork.title}
					lastSavedAt=""
					onBack={onBack}
					saveLabel="출품하기"
					onTempSave={handleSubmit}
					tempSaveDisabled={isSubmitting}
					saveDisabled={!zoneId}
				/>
			</div>

			<div className="flex flex-col gap-7 py-7">
				<ArtworkExhibitionGroupSection
					exhibitionId={exhibitionId}
					value={zoneId}
					onChange={setZoneId}
				/>

				<Divider thickness="thin" fullBleed={true} spacing="md" />

				<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
					<div className="min-w-0 min-[721px]:w-100">
						<h2 className="text-head3 text-strong">작품 위치 이미지</h2>
						<span className="text-body2 text-lighter">
							전시장 안에서 작품이 배치된 위치를 안내하는 이미지를 등록할 수 있어요.
						</span>
					</div>
					<div className="min-w-0 flex-1">
						<FormField label="위치 이미지">
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
		</DesktopContainer>
	);
};
