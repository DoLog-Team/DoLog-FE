"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { DateSelectField } from "@/components/common/DateSelectField/DateSelectField";
import { FormField } from "@/components/common/FormField/FormField";
import { Select } from "@/components/common/Select/Select";
import { Textarea } from "@/components/common/Textarea/Textarea";

const CATEGORY_OPTIONS = [
	{ label: "회화", value: "painting" },
	{ label: "조각", value: "sculpture" },
	{ label: "사진", value: "photography" },
	{ label: "설치", value: "installation" },
	{ label: "미디어", value: "media" },
	{ label: "공예", value: "craft" },
	{ label: "디자인", value: "design" },
	{ label: "기타", value: "etc" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 2000 + 1 }, (_, i) => {
	const year = String(2000 + i);
	return { label: year, value: year };
});
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
	const month = String(i + 1);
	return { label: month, value: month };
});
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => {
	const day = String(i + 1);
	return { label: day, value: day };
});

export interface ArtworkBasicInfoValue {
	shortIntro: string;
	category: string | undefined;
	hasStartDate: boolean;
	startYear: string | undefined;
	startMonth: string | undefined;
	startDay: string | undefined;
	endYear: string | undefined;
	endMonth: string | undefined;
	endDay: string | undefined;
}

export interface ArtworkBasicInfoSectionProps {
	value: ArtworkBasicInfoValue;
	onChange: (patch: Partial<ArtworkBasicInfoValue>) => void;
	onMissingCountChange?: (count: number) => void;
}

export const ArtworkBasicInfoSection = ({
	value,
	onChange,
	onMissingCountChange,
}: ArtworkBasicInfoSectionProps) => {
	const isStartDateComplete =
		!value.hasStartDate || Boolean(value.startYear && value.startMonth && value.startDay);
	const isEndDateComplete = Boolean(value.endYear && value.endMonth && value.endDay);
	const isPeriodComplete = isStartDateComplete && isEndDateComplete;

	useEffect(() => {
		const missing = (value.category ? 0 : 1) + (isPeriodComplete ? 0 : 1);
		onMissingCountChange?.(missing);
	}, [value.category, isPeriodComplete, onMissingCountChange]);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">작품 기본 정보</h2>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-4">
				<FormField label="작품 한줄 소개">
					<Textarea
						placeholder="작품을 간단하게 소개해주세요."
						maxLength={200}
						value={value.shortIntro}
						onChange={(e) => onChange({ shortIntro: e.target.value })}
					/>
				</FormField>

				<FormField label="카테고리" required>
					<Select
						options={CATEGORY_OPTIONS}
						value={value.category}
						onChange={(category) => onChange({ category })}
						placeholder="작품의 카테고리를 선택해주세요."
					/>
				</FormField>

				<FormField label="제작 기간" required className="mt-5">
					<Checkbox
						checked={value.hasStartDate}
						onChange={(hasStartDate) => onChange({ hasStartDate })}
						label="시작 날짜 입력하기"
					/>

					<div className="flex flex-col gap-6">
						<div className="flex gap-2">
							<DateSelectField
								label="시작 년도"
								placeholder="2000"
								options={YEAR_OPTIONS}
								value={value.startYear}
								onChange={(startYear) => onChange({ startYear })}
								disabled={!value.hasStartDate}
							/>
							<DateSelectField
								label="월"
								placeholder="-"
								options={MONTH_OPTIONS}
								value={value.startMonth}
								onChange={(startMonth) => onChange({ startMonth })}
								disabled={!value.hasStartDate}
							/>
							<DateSelectField
								label="일"
								placeholder="-"
								options={DAY_OPTIONS}
								value={value.startDay}
								onChange={(startDay) => onChange({ startDay })}
								disabled={!value.hasStartDate}
							/>
						</div>

						<div className="flex gap-2">
							<DateSelectField
								label="종료 년도"
								placeholder="2000"
								options={YEAR_OPTIONS}
								value={value.endYear}
								onChange={(endYear) => onChange({ endYear })}
							/>
							<DateSelectField
								label="월"
								placeholder="-"
								options={MONTH_OPTIONS}
								value={value.endMonth}
								onChange={(endMonth) => onChange({ endMonth })}
							/>
							<DateSelectField
								label="일"
								placeholder="-"
								options={DAY_OPTIONS}
								value={value.endDay}
								onChange={(endDay) => onChange({ endDay })}
							/>
						</div>
					</div>
				</FormField>
			</div>
		</div>
	);
};
