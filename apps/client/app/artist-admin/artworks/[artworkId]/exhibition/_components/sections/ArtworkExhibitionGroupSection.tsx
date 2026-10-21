"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/common/FormField/FormField";
import { Select } from "@/components/common/Select/Select";
import { type ExhibitionZone, getExhibitionZones } from "../../_api/getExhibitionZones";

export interface ArtworkExhibitionGroupSectionProps {
	exhibitionId: string;
	value: string | undefined;
	onChange: (zoneId: string) => void;
}

export const ArtworkExhibitionGroupSection = ({
	exhibitionId,
	value,
	onChange,
}: ArtworkExhibitionGroupSectionProps) => {
	const [zones, setZones] = useState<ExhibitionZone[]>([]);

	useEffect(() => {
		getExhibitionZones(exhibitionId)
			.then(setZones)
			.catch(() => {});
	}, [exhibitionId]);

	// 전시에 설정된 구역이 없으면 섹션 자체를 표시하지 않는다
	if (zones.length === 0) return null;

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
