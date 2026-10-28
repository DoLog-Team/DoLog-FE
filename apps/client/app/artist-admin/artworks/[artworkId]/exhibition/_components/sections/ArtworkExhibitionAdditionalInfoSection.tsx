"use client";

import { useState } from "react";
import { updateArtworkAdditionalInfo } from "@/app/artist-admin/artworks/_api/updateArtwork";
import {
	ArtworkAdditionalInfoSection,
	type ArtworkAdditionalInfoValue,
	hasAdditionalInfoError,
} from "@/app/artist-admin/artworks/_components/sections/ArtworkAdditionalInfoSection";
import { Button } from "@/components/common/Button/Button";
import { FormField } from "@/components/common/FormField/FormField";
import { ImageInput } from "@/components/common/ImageInput/ImageInput";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import type { ArtworkFieldSettings } from "../../_api/getArtworkExhibitionStatus";

const toSizeString = (n: number | null) => (n != null ? String(n) : "");

export interface ArtworkExhibitionAdditionalInfoSectionProps {
	artworkId: string;
	required: ArtworkFieldSettings["required"];
	initial: {
		materials: string[];
		width: number | null;
		height: number | null;
		depth: number | null;
		locationMap: string | null;
	};
}

export const ArtworkExhibitionAdditionalInfoSection = ({
	artworkId,
	required,
	initial,
}: ArtworkExhibitionAdditionalInfoSectionProps) => {
	const [value, setValue] = useState<ArtworkAdditionalInfoValue>({
		materials: initial.materials,
		width: toSizeString(initial.width),
		height: toSizeString(initial.height),
		hasVolume: initial.depth != null,
		depth: toSizeString(initial.depth),
	});
	const [locationMapPreview, setLocationMapPreview] = useState(initial.locationMap);
	const [locationMapFile, setLocationMapFile] = useState<File | null>(null);
	const { isSaving, error, run } = useAsyncSave();

	if (!required.materials && !required.size && !required.locationMap) return null;

	const updateValue = (patch: Partial<ArtworkAdditionalInfoValue>) =>
		setValue((prev) => ({ ...prev, ...patch }));

	const hasValidationError = hasAdditionalInfoError(value);

	const handleSave = () => {
		if (hasValidationError) return Promise.resolve(false);
		return run(() =>
			updateArtworkAdditionalInfo(artworkId, {
				materials: value.materials,
				width: value.width,
				height: value.height,
				depth: value.hasVolume ? value.depth : undefined,
				locationMapFile,
			}),
		);
	};

	return (
		<div className="flex flex-col gap-4">
			<ArtworkAdditionalInfoSection
				value={value}
				onChange={updateValue}
				showMaterials={required.materials}
				showSize={required.size}
			/>

			{required.locationMap && (
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
			)}

			<div className="flex items-center justify-end gap-3">
				{error && <p className="text-body3 text-error">{error}</p>}
				<Button type="button" disabled={isSaving || hasValidationError} onClick={handleSave}>
					저장
				</Button>
			</div>
		</div>
	);
};
