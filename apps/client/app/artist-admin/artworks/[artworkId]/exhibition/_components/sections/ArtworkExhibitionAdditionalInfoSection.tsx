"use client";

import { useState } from "react";
import { updateArtworkAdditionalInfo } from "@/app/artist-admin/artworks/_api/updateArtwork";
import {
	ArtworkAdditionalInfoSection,
	type ArtworkAdditionalInfoValue,
} from "@/app/artist-admin/artworks/_components/sections/ArtworkAdditionalInfoSection";
import { Button } from "@/components/common/Button/Button";
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
	const { isSaving, error, run } = useAsyncSave();

	if (!required.materials && !required.size) return null;

	const updateValue = (patch: Partial<ArtworkAdditionalInfoValue>) =>
		setValue((prev) => ({ ...prev, ...patch }));

	const handleSave = () =>
		run(() =>
			updateArtworkAdditionalInfo(artworkId, {
				materials: value.materials,
				width: value.width,
				height: value.height,
				depth: value.hasVolume ? value.depth : undefined,
			}),
		);

	return (
		<div className="flex flex-col gap-4">
			<ArtworkAdditionalInfoSection
				value={value}
				onChange={updateValue}
				showMaterials={required.materials}
				showSize={required.size}
			/>
			<div className="flex items-center justify-end gap-3">
				{error && <p className="text-body3 text-error">{error}</p>}
				<Button type="button" disabled={isSaving} onClick={handleSave}>
					저장
				</Button>
			</div>
		</div>
	);
};
