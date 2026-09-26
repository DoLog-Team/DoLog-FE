"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { Checkbox } from "@/components/common/Checkbox/Checkbox";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { CheckIcon } from "@/components/common/icons/CheckIcon";
import { ChevronIcon } from "@/components/common/icons/ChevronIcon";
import { Pagination } from "@/components/common/Pagination/Pagination";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { cn } from "@/lib/utils/cn";
import type { RowSelection } from "./useRowSelection";

const PAGE_SIZE = 10;

export interface SelectableListColumn<T> {
	header: string;
	cell: (item: T) => React.ReactNode;
	// 표 열 너비 (예: "40%")
	width: string;
	cellClassName?: (item: T) => string | undefined;
}

export interface SelectableListAction {
	label: string;
	variant: "primary" | "assistive";
	onClick: () => void;
}

interface AdminSelectableListProps<T extends { id: number }> {
	title: string;
	searchPlaceholder: string;
	searchValue: string;
	onSearchChange: (value: string) => void;
	notice?: React.ReactNode;
	// 필터를 바꿀 때도 selection.clear() 를 같이 호출할 것
	filters?: React.ReactNode;
	unit: "명" | "개";
	// 검색·필터가 적용된 전체 목록
	items: T[];
	isCountError?: boolean;
	selection: RowSelection<number>;
	columns: SelectableListColumn<T>[];
	renderCard: (item: T) => React.ReactNode;
	cardClassName?: (item: T) => string | undefined;
	actions: SelectableListAction[];
	isProcessing?: boolean;
	getRowHref?: (item: T) => string;
}

export const AdminSelectableList = <T extends { id: number }>({
	title,
	searchPlaceholder,
	searchValue,
	onSearchChange,
	notice,
	filters,
	unit,
	items,
	isCountError,
	selection,
	columns,
	renderCard,
	cardClassName,
	actions,
	isProcessing,
	getRowHref,
}: AdminSelectableListProps<T>) => {
	const [page, setPage] = useState(1);

	// 목록 전체를 받아 클라이언트에서 10개씩 자름 — API 가 페이지 단위로 주면 page 를 밖으로 뺄 것
	const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pageItems = items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	const allIds = items.map((item) => item.id);
	const pageIds = pageItems.map((item) => item.id);
	const countLabel = isCountError ? "-" : `${items.length}${unit}`;
	const isActionDisabled = selection.count === 0 || isProcessing;

	// 페이지를 넘기면 선택을 모두 해제
	const changePage = (next: number) => {
		setPage(next);
		selection.clear();
	};

	// 검색어가 바뀌면 가려진 항목이 선택된 채 남지 않도록 선택 해제 후 첫 페이지로
	const changeSearch = (value: string) => {
		onSearchChange(value);
		selection.clear();
		setPage(1);
	};

	return (
		<section className="flex w-full flex-col">
			<h1 className="pb-6 font-bold text-[24px] text-strong leading-8 tracking-[-0.02em] min-[721px]:text-[32px] min-[721px]:leading-10.5">
				{title}
			</h1>

			{notice && <div className="mb-6">{notice}</div>}
			<SearchBar placeholder={searchPlaceholder} value={searchValue} onChange={changeSearch} />
			{filters && <div className="mt-3 flex gap-2">{filters}</div>}

			<div className="mt-5 flex items-center gap-2.5 min-[721px]:mt-6">
				<div className="min-[721px]:hidden">
					<Checkbox
						checked={selection.isAllSelected(allIds)}
						onChange={() => selection.toggleAll(allIds)}
						disabled={items.length === 0}
						label={<span className="sr-only">전체 선택</span>}
					/>
				</div>
				<p className="flex flex-1 gap-2.5 text-body1-bold text-strong">
					<span>전체</span>
					<span>{countLabel}</span>
				</p>
				<div className="hidden gap-2 min-[721px]:flex">
					{actions.map((action) => (
						<Button
							key={action.label}
							variant={action.variant}
							size="xs"
							disabled={isActionDisabled}
							onClick={action.onClick}
						>
							{action.label}
						</Button>
					))}
				</div>
			</div>

			{items.length === 0 ? (
				<EmptyState message="검색 결과가 없습니다." />
			) : (
				<>
					<table className="mt-4 hidden w-full table-fixed border-fg-light border-y-2 min-[721px]:table">
						<colgroup>
							<col className="w-15" />
							{columns.map((column) => (
								<col key={column.header} style={{ width: column.width }} />
							))}
							{getRowHref && <col className="w-15" />}
						</colgroup>
						<thead>
							<tr className="bg-fg-lighter">
								<th className={CELL_CLASS}>
									<Checkbox
										checked={selection.isAllSelected(pageIds)}
										onChange={() => selection.toggleAll(pageIds)}
										label={<span className="sr-only">현재 페이지 전체 선택</span>}
										className="justify-center"
									/>
								</th>
								{columns.map((column) => (
									<th key={column.header} className={cn(CELL_CLASS, "font-normal")}>
										{column.header}
									</th>
								))}
								{getRowHref && <th aria-label="이동" className={CELL_CLASS} />}
							</tr>
						</thead>
						<tbody>
							{pageItems.map((item) => (
								<tr key={item.id}>
									<td className={CELL_CLASS}>
										<Checkbox
											checked={selection.isSelected(item.id)}
											onChange={() => selection.toggle(item.id)}
											label={<span className="sr-only">선택</span>}
											className="justify-center"
										/>
									</td>
									{columns.map((column) => (
										<td
											key={column.header}
											className={cn(CELL_CLASS, "truncate", column.cellClassName?.(item))}
										>
											{column.cell(item)}
										</td>
									))}
									{getRowHref && (
										<td className={CELL_CLASS}>
											<Link href={getRowHref(item)} aria-label="상세 보기" className="inline-flex">
												<ChevronIcon direction="right" className="text-icon-light" />
											</Link>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>

					<Pagination
						page={currentPage}
						totalPages={totalPages}
						onChange={changePage}
						className="mt-6 hidden min-[721px]:flex"
					/>

					<ul className="mt-4 flex flex-col gap-3 min-[721px]:hidden">
						{items.map((item) => {
							const isSelected = selection.isSelected(item.id);
							return (
								<li key={item.id}>
									<button
										type="button"
										onClick={() => selection.toggle(item.id)}
										aria-pressed={isSelected}
										className={cn(
											"flex w-full cursor-pointer overflow-hidden rounded-[10px] bg-fg-lighter text-left",
											cardClassName?.(item),
										)}
									>
										<div className="flex min-w-0 flex-1">{renderCard(item)}</div>
										<div
											className={cn(
												"flex items-center border-stroke-lighter border-l px-4",
												isSelected ? "bg-fg-inverse text-icon-inverse" : "text-icon-lighter",
											)}
										>
											<CheckIcon />
										</div>
									</button>
								</li>
							);
						})}
					</ul>
				</>
			)}

			<div className="sticky bottom-0 mt-4 flex flex-col bg-normal pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] min-[721px]:hidden">
				{selection.count > 0 && (
					<p className="pb-2.5 text-center text-body2 text-lighter">
						{selection.count}
						{unit} 선택
					</p>
				)}
				<div className="flex gap-2">
					{actions.map((action) => (
						<Button
							key={action.label}
							variant={action.variant}
							size="lg"
							disabled={isActionDisabled}
							onClick={action.onClick}
							className="flex-1"
						>
							{action.label}
						</Button>
					))}
				</div>
			</div>
		</section>
	);
};

const CELL_CLASS =
	"h-12 border-stroke-lightest border-r border-b px-3 text-center align-middle text-body2 text-light last:border-r-0";

export const matchesKeyword = (keyword: string, ...values: string[]) => {
	const query = keyword.trim().toLowerCase();
	return values.some((value) => value.toLowerCase().includes(query));
};

// 모달 설명용 — "홍길동 외 2명의 작가" / "홍길동 작가"
export const summarizeArtists = (names: string[]) =>
	names.length > 1 ? `${names[0]} 외 ${names.length - 1}명의 작가` : `${names[0] ?? ""} 작가`;
