"use client";

import { FormField } from "@/components/common/FormField/FormField";
import { Select } from "@/components/common/Select/Select";
import type { ExhibitionZone } from "../../_api/getExhibitionZones";

export interface ArtworkExhibitionGroupSectionProps {
	zones: ExhibitionZone[];
	value: string | undefined;
	onChange: (zoneId: string) => void;
}

export const ArtworkExhibitionGroupSection = ({
	zones,
	value,
	onChange,
}: ArtworkExhibitionGroupSectionProps) => {
	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">전시회 내 작품 그룹</h2>
			</div>
			<div className="min-w-0 flex-1">
				<FormField label="그룹" required>
					<Select
						options={zones.map((zone) => ({ label: zone.name, value: zone.id }))}
						value={value}
						onChange={onChange}
						placeholder="그룹을 선택해주세요"
					/>
				</FormField>
			</div>
		</div>
	);
};
