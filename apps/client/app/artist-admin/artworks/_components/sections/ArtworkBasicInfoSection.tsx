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
	const year = String(CURRENT_YEAR - i);
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

// 시작 날짜 입력하기를 체크했으면 년/월/일을 다 채우거나 다 비워야 하고, 일부만 채운 상태는 허용하지 않는다
export const hasStartDatePartialError = (value: ArtworkBasicInfoValue) => {
	if (!value.hasStartDate) return false;
	const filledCount = [value.startYear, value.startMonth, value.startDay].filter(Boolean).length;
	return filledCount > 0 && filledCount < 3;
};

// 시작/종료 날짜가 둘 다 완성됐을 때만 비교 — 시작이 종료보다 늦으면 에러
export const hasStartAfterEndError = (value: ArtworkBasicInfoValue) => {
	if (!value.hasStartDate) return false;
	const { startYear, startMonth, startDay, endYear, endMonth, endDay } = value;
	if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay) return false;
	const start = `${startYear.padStart(4, "0")}${startMonth.padStart(2, "0")}${startDay.padStart(2, "0")}`;
	const end = `${endYear.padStart(4, "0")}${endMonth.padStart(2, "0")}${endDay.padStart(2, "0")}`;
	return start > end;
};

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
	const isStartDatePartial = hasStartDatePartialError(value);
	const isStartAfterEnd = hasStartAfterEndError(value);

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
						<div className="flex flex-col gap-1">
							<div className="flex gap-2">
								<DateSelectField
									label="시작 년도"
									placeholder="2000"
									options={YEAR_OPTIONS}
									value={value.startYear}
									onChange={(startYear) => onChange({ startYear })}
									disabled={!value.hasStartDate}
									error={isStartDatePartial && !value.startYear}
								/>
								<DateSelectField
									label="월"
									placeholder="-"
									options={MONTH_OPTIONS}
									value={value.startMonth}
									onChange={(startMonth) => onChange({ startMonth })}
									disabled={!value.hasStartDate}
									error={isStartDatePartial && !value.startMonth}
								/>
								<DateSelectField
									label="일"
									placeholder="-"
									options={DAY_OPTIONS}
									value={value.startDay}
									onChange={(startDay) => onChange({ startDay })}
									disabled={!value.hasStartDate}
									error={isStartDatePartial && !value.startDay}
								/>
							</div>
							{isStartDatePartial && (
								<span className="pl-0.5 text-body3 text-error">
									시작 날짜는 년, 월, 일을 모두 입력해주세요.
								</span>
							)}
						</div>

						<div className="flex flex-col gap-1">
							<div className="flex gap-2">
								<DateSelectField
									label="종료 년도"
									placeholder="2000"
									options={YEAR_OPTIONS}
									value={value.endYear}
									onChange={(endYear) => onChange({ endYear })}
									error={isStartAfterEnd}
								/>
								<DateSelectField
									label="월"
									placeholder="-"
									options={MONTH_OPTIONS}
									value={value.endMonth}
									onChange={(endMonth) => onChange({ endMonth })}
									error={isStartAfterEnd}
								/>
								<DateSelectField
									label="일"
									placeholder="-"
									options={DAY_OPTIONS}
									value={value.endDay}
									onChange={(endDay) => onChange({ endDay })}
									error={isStartAfterEnd}
								/>
							</div>
							{isStartAfterEnd && (
								<span className="pl-0.5 text-body3 text-error">
									시작 날짜는 종료 날짜보다 늦을 수 없어요.
								</span>
							)}
						</div>
					</div>
				</FormField>
			</div>
		</div>
	);
};
