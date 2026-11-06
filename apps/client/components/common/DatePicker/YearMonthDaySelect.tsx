"use client";

import Image from "next/image";
import { type ReactNode, useRef, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { useDismiss } from "@/lib/hooks/useDismiss";
import { cn } from "@/lib/utils/cn";

const MIN_YEAR = 2000;
const MAX_YEAR = new Date().getFullYear();
const YEAR_PAGE_SIZE = 10;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export interface YearMonthDayValue {
	year?: string;
	month?: string;
	day?: string;
}

export interface YearMonthDaySelectProps {
	value: YearMonthDayValue;
	onChange: (value: YearMonthDayValue) => void;
	yearLabel: string;
	disabled?: boolean;
	error?: boolean;
}

const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const FieldPopover = ({
	label,
	displayText,
	placeholder,
	disabled,
	error,
	popoverClassName,
	children,
}: {
	label: string;
	displayText: string;
	placeholder: string;
	disabled?: boolean;
	error?: boolean;
	popoverClassName?: string;
	children: (close: () => void) => ReactNode;
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const close = () => setIsOpen(false);

	useDismiss(containerRef, isOpen, close);

	return (
		<div ref={containerRef} className="relative flex min-w-0 flex-1 flex-col gap-1">
			<span className="text-body3 text-light">{label}</span>
			<button
				type="button"
				disabled={disabled}
				onClick={() => setIsOpen((prev) => !prev)}
				className={cn(
					"flex h-11 w-full items-center justify-between rounded-lg border bg-bg-normal px-3 text-body1 transition-colors",
					displayText ? "text-light" : "text-disable",
					error ? "border-error" : isOpen ? "border-stroke-inverse" : "border-stroke-lighter",
					disabled ? "cursor-not-allowed bg-fg-lighter text-disable" : "cursor-pointer",
				)}
			>
				{displayText || placeholder}
				<Image
					src="/icons/arrowDownFill.svg"
					alt=""
					width={6}
					height={3}
					aria-hidden
					className={cn("shrink-0 transition-transform", isOpen && "rotate-180")}
				/>
			</button>

			{isOpen && (
				<div
					className={cn(
						"absolute top-full z-10 mt-1 rounded-lg border border-stroke-lighter bg-bg-normal p-3 shadow-lg",
						popoverClassName,
					)}
				>
					{children(close)}
				</div>
			)}
		</div>
	);
};

const GridButton = ({
	selected,
	weekend,
	onClick,
	children,
}: {
	selected: boolean;
	weekend?: "sun" | "sat";
	onClick: () => void;
	children: ReactNode;
}) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"flex h-9 cursor-pointer items-center justify-center rounded-md text-body2",
			selected
				? "bg-fg-inverse text-bg-normal"
				: cn(
						weekend === "sun" ? "text-error" : weekend === "sat" ? "text-blue-500" : "text-light",
						"hover:bg-fg-lighter",
					),
		)}
	>
		{children}
	</button>
);

export const YearMonthDaySelect = ({
	value,
	onChange,
	yearLabel,
	disabled,
	error,
}: YearMonthDaySelectProps) => {
	const year = value.year ? Number(value.year) : undefined;
	const month = value.month ? Number(value.month) : undefined;
	const day = value.day ? Number(value.day) : undefined;

	const [yearPageStart, setYearPageStart] = useState(() => {
		const base = year ?? MAX_YEAR;
		return base - (base % YEAR_PAGE_SIZE);
	});

	const selectYear = (y: number) => {
		if (month != null && day != null) {
			const maxDay = daysInMonth(y, month);
			onChange({ year: String(y), month: String(month), day: String(Math.min(day, maxDay)) });
		} else {
			onChange({ ...value, year: String(y) });
		}
	};

	const selectMonth = (m: number) => {
		if (day != null && year != null) {
			const maxDay = daysInMonth(year, m);
			onChange({ ...value, month: String(m), day: String(Math.min(day, maxDay)) });
		} else {
			onChange({ ...value, month: String(m) });
		}
	};

	const selectDay = (d: number) => onChange({ ...value, day: String(d) });

	const clearAll = () => onChange({ year: undefined, month: undefined, day: undefined });
	// 월을 지우면 그 월에 종속된 일도 같이 지움
	const clearMonth = () => onChange({ ...value, month: undefined, day: undefined });
	const clearDay = () => onChange({ ...value, day: undefined });

	const yearPageYears = Array.from({ length: YEAR_PAGE_SIZE }, (_, i) => yearPageStart + i);
	const canGoPrevPage = yearPageStart > MIN_YEAR;
	const canGoNextPage = yearPageStart + YEAR_PAGE_SIZE <= MAX_YEAR;

	return (
		<div className="flex gap-2">
			<FieldPopover
				label={yearLabel}
				displayText={year ? String(year) : ""}
				placeholder="2000"
				disabled={disabled}
				error={error}
				popoverClassName="w-56"
			>
				{(close) => (
					<div className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<button
								type="button"
								onClick={() => canGoPrevPage && setYearPageStart((s) => s - YEAR_PAGE_SIZE)}
								disabled={!canGoPrevPage}
								aria-label="이전 10년"
								className="flex size-7 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
							>
								<Image
									src="/icons/arrowRight.svg"
									alt=""
									width={14}
									height={14}
									className="rotate-180"
								/>
							</button>
							<span className="text-body3 text-lightest">
								{yearPageStart}년 – {yearPageStart + YEAR_PAGE_SIZE - 1}년
							</span>
							<button
								type="button"
								onClick={() => canGoNextPage && setYearPageStart((s) => s + YEAR_PAGE_SIZE)}
								disabled={!canGoNextPage}
								aria-label="다음 10년"
								className="flex size-7 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
							>
								<Image src="/icons/arrowRight.svg" alt="" width={14} height={14} />
							</button>
						</div>

						<div className="grid grid-cols-3 gap-1">
							{yearPageYears.map((y) => (
								<GridButton
									key={y}
									selected={y === year}
									onClick={() => {
										selectYear(y);
										close();
									}}
								>
									{y}년
								</GridButton>
							))}
						</div>

						<Button
							type="button"
							variant="assistive"
							onClick={() => {
								clearAll();
								close();
							}}
						>
							삭제
						</Button>
					</div>
				)}
			</FieldPopover>

			<FieldPopover
				label="월"
				displayText={month ? String(month) : ""}
				placeholder="-"
				disabled={disabled || year == null}
				error={error}
				popoverClassName="w-44"
			>
				{(close) => (
					<div className="flex flex-col gap-2">
						<span className="text-center text-body3 text-lightest">{year}년</span>
						<div className="grid grid-cols-3 gap-1">
							{Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
								<GridButton
									key={m}
									selected={m === month}
									onClick={() => {
										selectMonth(m);
										close();
									}}
								>
									{m}월
								</GridButton>
							))}
						</div>

						<Button
							type="button"
							variant="assistive"
							onClick={() => {
								clearMonth();
								close();
							}}
						>
							삭제
						</Button>
					</div>
				)}
			</FieldPopover>

			<FieldPopover
				label="일"
				displayText={day ? String(day) : ""}
				placeholder="-"
				disabled={disabled || month == null}
				error={error}
				popoverClassName="w-72"
			>
				{(close) => (
					<div className="flex flex-col gap-2">
						<span className="text-center text-body3 text-lightest">
							{year}년 {month}월
						</span>
						<div className="grid grid-cols-7 gap-1 text-center">
							{WEEKDAYS.map((weekday, index) => (
								<span
									key={weekday}
									className={cn(
										"text-body4",
										index === 0 ? "text-error" : index === 6 ? "text-blue-500" : "text-lightest",
									)}
								>
									{weekday}
								</span>
							))}
							{year != null &&
								month != null &&
								[
									...Array.from({ length: new Date(year, month - 1, 1).getDay() }, () => null),
									...Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1),
								].map((d, index) =>
									d == null ? (
										// biome-ignore lint/suspicious/noArrayIndexKey: 월 시작 전 빈 칸은 위치 고정이라 인덱스로 충분
										<span key={`blank-${index}`} />
									) : (
										<GridButton
											key={d}
											selected={d === day}
											weekend={index % 7 === 0 ? "sun" : index % 7 === 6 ? "sat" : undefined}
											onClick={() => {
												selectDay(d);
												close();
											}}
										>
											{d}
										</GridButton>
									),
								)}
						</div>

						<Button
							type="button"
							variant="assistive"
							onClick={() => {
								clearDay();
								close();
							}}
						>
							삭제
						</Button>
					</div>
				)}
			</FieldPopover>
		</div>
	);
};
