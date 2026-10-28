"use client";

import { useState } from "react";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { FormField } from "@/components/common/FormField/FormField";
import { Input } from "@/components/common/Input/Input";
import { cn } from "@/lib/utils/cn";

const MAX_MATERIAL_COUNT = 20;
const MAX_MATERIAL_LENGTH = 20;
const MAX_SIZE_VALUE = 99999;
const isSizeOverMax = (value: string) => {
	const parsed = Number(value);
	return value.trim() !== "" && !Number.isNaN(parsed) && parsed > MAX_SIZE_VALUE;
};

const sanitizeSizeInput = (raw: string) => {
	const digitsAndDot = raw.replace(/[^0-9.]/g, "");
	const firstDotIndex = digitsAndDot.indexOf(".");
	if (firstDotIndex === -1) return digitsAndDot;
	return (
		digitsAndDot.slice(0, firstDotIndex + 1) +
		digitsAndDot.slice(firstDotIndex + 1).replace(/\./g, "")
	);
};

const MATERIAL_OPTIONS = [
	"캔버스에 아크릴릭",
	"캔버스에 유화",
	"모델링 페이스트",
	"쉬폰",
	"비즈",
	"스테인리스 스틸",
	"혼합재료",
	"콜라주",
	"목재",
	"석고",
	"종이에 수채",
	"디지털 프린트",
	"실크스크린",
	"레진",
];

const SizeInput = ({
	value,
	onChange,
	placeholder,
	disabled,
	error,
}: {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	disabled?: boolean;
	error?: boolean;
}) => (
	<div className="flex flex-col gap-1">
		<div className="relative">
			<input
				type="text"
				inputMode="decimal"
				value={value}
				onChange={(e) => onChange(sanitizeSizeInput(e.target.value))}
				placeholder={placeholder}
				disabled={disabled}
				className={cn(
					"h-11 w-full rounded-lg border bg-bg-normal py-3 pr-10 pl-4",
					"text-body1 outline-none transition-colors placeholder:text-disable",
					"disabled:bg-fg-lighter disabled:text-disable",
					error
						? "border-error focus:border-error"
						: "border-stroke-lighter focus:border-stroke-inverse",
				)}
			/>
			<span className="-translate-y-1/2 absolute top-1/2 right-4 text-body2 text-lighter">cm</span>
		</div>
		{error && <span className="pl-0.5 text-body3 text-error">99,999 이하로 입력해주세요.</span>}
	</div>
);

export interface ArtworkAdditionalInfoValue {
	materials: string[];
	width: string;
	height: string;
	hasVolume: boolean;
	depth: string;
}

export interface ArtworkAdditionalInfoSectionProps {
	value: ArtworkAdditionalInfoValue;
	onChange: (patch: Partial<ArtworkAdditionalInfoValue>) => void;
	showMaterials?: boolean;
	showSize?: boolean;
}

export const ArtworkAdditionalInfoSection = ({
	value,
	onChange,
	showMaterials = true,
	showSize = true,
}: ArtworkAdditionalInfoSectionProps) => {
	const [materialQuery, setMaterialQuery] = useState("");
	const [isMaterialFocused, setIsMaterialFocused] = useState(false);

	const isMaterialLimitReached = value.materials.length >= MAX_MATERIAL_COUNT;

	const filteredMaterialOptions = MATERIAL_OPTIONS.filter(
		(option) =>
			!value.materials.includes(option) &&
			option.toLowerCase().includes(materialQuery.trim().toLowerCase()),
	);

	const addMaterial = (newValue: string) => {
		if (isMaterialLimitReached) return;
		const trimmed = newValue.trim();
		if (!trimmed || value.materials.includes(trimmed)) return;
		onChange({ materials: [...value.materials, trimmed] });
		setMaterialQuery("");
	};

	const removeMaterial = (material: string) => {
		onChange({ materials: value.materials.filter((item) => item !== material) });
	};

	return (
		<div className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10">
			<div className="min-w-0 min-[721px]:w-100">
				<h2 className="text-head3 text-strong">작품 부가 정보</h2>
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-9">
				{showMaterials && (
					<FormField label="재료 및 기법">
						<div className="flex flex-wrap gap-2 empty:hidden">
							{value.materials.map((material) => (
								<span
									key={material}
									className="flex items-center gap-1.5 rounded-[999px] bg-fg-lighter px-2 py-1 text-body4-bold text-light"
								>
									{material}
									<button
										type="button"
										onClick={() => removeMaterial(material)}
										aria-label={`${material} 삭제`}
										className="text-lightest hover:text-light"
									>
										✕
									</button>
								</span>
							))}
						</div>

						<div className="relative">
							<Input
								placeholder="재료 및 기법을 검색해주세요."
								value={materialQuery}
								maxLength={MAX_MATERIAL_LENGTH}
								error={isMaterialLimitReached && isMaterialFocused}
								errorMessage={
									isMaterialLimitReached && isMaterialFocused
										? "태그 개수가 초과되었어요. 기존 태그를 삭제하고 새로운 태그를 등록해 주세요."
										: undefined
								}
								onChange={(e) => setMaterialQuery(e.target.value)}
								onFocus={() => setIsMaterialFocused(true)}
								onBlur={() => setTimeout(() => setIsMaterialFocused(false), 100)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.nativeEvent.isComposing) {
										e.preventDefault();
										addMaterial(materialQuery);
									}
								}}
							/>

							{!isMaterialLimitReached && isMaterialFocused && materialQuery.trim() && (
								<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-stroke-lighter bg-bg-normal shadow-lg divide-y divide-stroke-lighter">
									{filteredMaterialOptions.map((option) => (
										<li key={option}>
											<button
												type="button"
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => addMaterial(option)}
												className="w-full px-3 py-2 text-left text-body2 text-strong"
											>
												{option}
											</button>
										</li>
									))}
									<li>
										<button
											type="button"
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => addMaterial(materialQuery)}
											className="flex w-full items-center justify-between px-3 py-2 text-left text-body2 text-lighter"
										>
											"{materialQuery.trim()}" 직접 추가하기
											<span aria-hidden>+</span>
										</button>
									</li>
								</ul>
							)}
						</div>
					</FormField>
				)}

				{showSize && (
					<FormField label="작품 사이즈">
						<div className="flex gap-2">
							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<span className="text-body3 text-light">가로</span>
								<SizeInput
									value={value.width}
									onChange={(width) => onChange({ width })}
									placeholder="11"
									error={isSizeOverMax(value.width)}
								/>
							</div>
							<div className="flex min-w-0 flex-1 flex-col gap-1">
								<span className="text-body3 text-light">세로</span>
								<SizeInput
									value={value.height}
									onChange={(height) => onChange({ height })}
									placeholder="12.5"
									error={isSizeOverMax(value.height)}
								/>
							</div>
						</div>

						<Checkbox
							className="pt-6"
							checked={value.hasVolume}
							onChange={(hasVolume) => onChange({ hasVolume })}
							label="높이 입력하기 (부피가 있는 경우)"
						/>

						<SizeInput
							value={value.depth}
							onChange={(depth) => onChange({ depth })}
							placeholder="200"
							disabled={!value.hasVolume}
							error={value.hasVolume && isSizeOverMax(value.depth)}
						/>
					</FormField>
				)}
			</div>
		</div>
	);
};
