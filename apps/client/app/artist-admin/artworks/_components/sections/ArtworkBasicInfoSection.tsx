"use client";

import { useEffect } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { YearMonthDaySelect } from "@/components/common/DatePicker/YearMonthDaySelect";
import { FormField } from "@/components/common/FormField/FormField";
import { Select } from "@/components/common/Select/Select";
import { Textarea } from "@/components/common/Textarea/Textarea";

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

export const hasStartDatePartialError = (value: ArtworkBasicInfoValue) => {
	if (!value.hasStartDate) return false;
	return !value.startYear;
};

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
	categoryOptions?: { label: string; value: string }[];
}

export const ArtworkBasicInfoSection = ({
	value,
	onChange,
	onMissingCountChange,
	categoryOptions = [],
}: ArtworkBasicInfoSectionProps) => {
	const isStartDateComplete = !value.hasStartDate || Boolean(value.startYear);
	const isEndDateComplete = Boolean(value.endYear);
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
						options={[{ label: "-", value: "" }, ...categoryOptions]}
						value={value.category}
						onChange={(category) => onChange({ category })}
						placeholder="작품의 카테고리를 선택해주세요."
						creatable={categoryOptions.length === 0}
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
							<YearMonthDaySelect
								yearLabel="시작 년도"
								value={{ year: value.startYear, month: value.startMonth, day: value.startDay }}
								onChange={(next) =>
									onChange({
										startYear: next.year,
										startMonth: next.month,
										startDay: next.day,
									})
								}
								disabled={!value.hasStartDate}
								error={isStartDatePartial}
							/>
							{isStartDatePartial && (
								<span className="pl-0.5 text-body3 text-error">시작 날짜를 입력해주세요.</span>
							)}
						</div>

						<div className="flex flex-col gap-1">
							<YearMonthDaySelect
								yearLabel="종료 년도"
								value={{ year: value.endYear, month: value.endMonth, day: value.endDay }}
								onChange={(next) =>
									onChange({ endYear: next.year, endMonth: next.month, endDay: next.day })
								}
								error={isStartAfterEnd}
							/>
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
