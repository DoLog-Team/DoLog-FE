"use client";

import { useEffect, useState } from "react";
import { DateSelectField } from "@/components/common/DateSelectField/DateSelectField";
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

export interface ArtworkBasicInfoSectionProps {
	onMissingCountChange?: (count: number) => void;
}

export const ArtworkBasicInfoSection = ({ onMissingCountChange }: ArtworkBasicInfoSectionProps) => {
	const [intro, setIntro] = useState("");
	const [category, setCategory] = useState<string | undefined>(undefined);

	const [hasStartDate, setHasStartDate] = useState(false);
	const [startYear, setStartYear] = useState<string | undefined>(undefined);
	const [startMonth, setStartMonth] = useState<string | undefined>(undefined);
	const [startDay, setStartDay] = useState<string | undefined>(undefined);
	const [endYear, setEndYear] = useState<string | undefined>(undefined);
	const [endMonth, setEndMonth] = useState<string | undefined>(undefined);
	const [endDay, setEndDay] = useState<string | undefined>(undefined);

	const isPeriodComplete = Boolean(endYear && endMonth && endDay);

	useEffect(() => {
		const missing = (category ? 0 : 1) + (isPeriodComplete ? 0 : 1);
		onMissingCountChange?.(missing);
	}, [category, isPeriodComplete, onMissingCountChange]);

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="shrink-0 min-[721px]:w-72">
				<h2 className="text-head3 text-strong">작품 기본 정보</h2>
			</div>
			<div className="flex flex-1 flex-col gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-body2-bold text-strong">작품 한줄 소개</span>
					<Textarea
						placeholder="작품을 간단하게 소개해주세요."
						maxLength={200}
						value={intro}
						onChange={(e) => setIntro(e.target.value)}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-body2-bold text-strong">
						카테고리 <span className="text-error">*</span>
					</span>
					<Select
						options={CATEGORY_OPTIONS}
						value={category}
						onChange={setCategory}
						placeholder="작품의 카테고리를 선택해주세요."
					/>
				</div>
				<div className="mt-5 flex flex-col gap-2">
					<span className="text-body2-bold text-strong">
						제작 기간 <span className="text-error">*</span>
					</span>
					<label className="flex items-center gap-2 text-body2 text-light">
						<span className="relative flex h-5 w-5 items-center justify-center">
							<input
								type="checkbox"
								checked={hasStartDate}
								onChange={(e) => setHasStartDate(e.target.checked)}
								className="peer h-5 w-5 appearance-none rounded border-[1.5px] border-stroke-lighter checked:border-strong checked:bg-strong"
							/>
							<svg
								className="pointer-events-none absolute hidden h-3 w-3 text-inverse peer-checked:block"
								viewBox="0 0 12 12"
								fill="none"
								aria-hidden="true"
							>
								<path
									d="M2 6L5 9L10 3"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
						시작 날짜 입력하기
					</label>
					<div className="flex flex-col gap-6">
						<div className="flex gap-2">
							<DateSelectField
								label="시작 년도"
								placeholder="2000"
								options={YEAR_OPTIONS}
								value={startYear}
								onChange={setStartYear}
								disabled={!hasStartDate}
							/>
							<DateSelectField
								label="월"
								placeholder="-"
								options={MONTH_OPTIONS}
								value={startMonth}
								onChange={setStartMonth}
								disabled={!hasStartDate}
							/>
							<DateSelectField
								label="일"
								placeholder="-"
								options={DAY_OPTIONS}
								value={startDay}
								onChange={setStartDay}
								disabled={!hasStartDate}
							/>
						</div>

						<div className="flex gap-2">
							<DateSelectField
								label="종료 년도"
								placeholder="2000"
								options={YEAR_OPTIONS}
								value={endYear}
								onChange={setEndYear}
							/>
							<DateSelectField
								label="월"
								placeholder="-"
								options={MONTH_OPTIONS}
								value={endMonth}
								onChange={setEndMonth}
							/>
							<DateSelectField
								label="일"
								placeholder="-"
								options={DAY_OPTIONS}
								value={endDay}
								onChange={setEndDay}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
