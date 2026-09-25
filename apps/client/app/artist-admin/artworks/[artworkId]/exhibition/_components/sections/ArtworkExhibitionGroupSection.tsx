"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { Select } from "@/components/common/Select/Select";
import {
	type ArtworkExhibitionGroup,
	getArtworkExhibitionGroups,
} from "../../_api/getArtworkExhibitionGroups";

export interface ArtworkExhibitionGroupSectionProps {
	artworkId: string;
}

export const ArtworkExhibitionGroupSection = ({
	artworkId,
}: ArtworkExhibitionGroupSectionProps) => {
	const [groupOptions, setGroupOptions] = useState<ArtworkExhibitionGroup[]>([]);
	const [group, setGroup] = useState<string | undefined>(undefined);

	useEffect(() => {
		getArtworkExhibitionGroups(artworkId).then(setGroupOptions);
	}, [artworkId]);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">전시회 내 작품 그룹</h2>
			</div>
			<div className="min-w-0 flex-1">
				<FormField label="그룹" required>
					<Select
						options={groupOptions}
						value={group}
						onChange={setGroup}
						placeholder="placeholder"
					/>
				</FormField>
			</div>
		</div>
	);
};
