"use client";

import { useState } from "react";
import { CollapsingHeader } from "@/components/common/CollapsingHeader/CollapsingHeader";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import MainFooter from "@/components/common/Footer/MainFooter";
import { PageTracker } from "@/components/common/PageTracker";
import { TrackedLink } from "@/components/common/TrackedLink";
import { track } from "@/lib/amplitude";
import type { ExhibitionItem } from "@/lib/api/exhibition";
import { EXHIBITION_TYPE_LABEL } from "@/lib/constants/exhibition";
import ExhibitionCard from "../../_components/ExhibitionCard";

interface ExhibitionsClientProps {
	exhibitions: ExhibitionItem[];
}

export default function ExhibitionsClient({ exhibitions }: ExhibitionsClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
	const [selectedDept, setSelectedDept] = useState<string | null>(null);
	const [selectedType, setSelectedType] = useState<string | null>(null);

	const univs = [...new Set(exhibitions.map((e) => e.univName))];
	const depts = [...new Set(exhibitions.map((e) => e.deptName))];
	const types = [
		...new Set(
			exhibitions
				.map((e) => e.exhibitionType)
				.filter((t): t is string => t !== null)
				.map((t) => EXHIBITION_TYPE_LABEL[t] ?? t),
		),
	];

	const filtered = exhibitions.filter((e) => {
		const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
		const matchUniv = !selectedUniv || e.univName === selectedUniv;
		const matchDept = !selectedDept || e.deptName === selectedDept;
		const typeLabel = EXHIBITION_TYPE_LABEL[e.exhibitionType ?? ""] ?? e.exhibitionType;
		const matchType = !selectedType || typeLabel === selectedType;
		return matchSearch && matchUniv && matchDept && matchType;
	});

	return (
		<div className="flex flex-col min-h-screen">
			<PageTracker pageName="exhibitions_list" />
			<CollapsingHeader
				title="전체 전시"
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="전시 제목을 검색해요."
			>
				<FilterChip
					label="대학"
					options={univs}
					selected={selectedUniv}
					onSelect={(val) => {
						setSelectedUniv(val);
						if (val)
							track("Filter Selected", {
								filter_type: "univ",
								value: val,
								page: "exhibitions_list",
							});
					}}
				/>
				<FilterChip
					label="학과"
					options={depts}
					selected={selectedDept}
					onSelect={(val) => {
						setSelectedDept(val);
						if (val)
							track("Filter Selected", {
								filter_type: "dept",
								value: val,
								page: "exhibitions_list",
							});
					}}
				/>
				<FilterChip
					label="유형"
					options={types}
					selected={selectedType}
					onSelect={(val) => {
						setSelectedType(val);
						if (val)
							track("Filter Selected", {
								filter_type: "type",
								value: val,
								page: "exhibitions_list",
							});
					}}
				/>
			</CollapsingHeader>

			<DesktopContainer className="flex-1 py-4">
				<section
					className={
						filtered.length > 0
							? "flex flex-col gap-4 min-[721px]:inline-grid min-[721px]:grid-cols-4 min-[721px]:grid-rows-[repeat(2,fit-content(100%))] min-[721px]:gap-x-5 min-[721px]:gap-y-[60px] min-[721px]:self-stretch"
							: "flex flex-col"
					}
				>
					{filtered.length > 0 ? (
						filtered.map((exhibition) => (
							<TrackedLink
								key={exhibition.id}
								href={`/${exhibition.slug || exhibition.id}`}
								eventName="Exhibition Card Clicked"
								eventProps={{
									exhibition_id: exhibition.id,
									exhibition_title: exhibition.title,
									page: "exhibitions_list",
								}}
							>
								<ExhibitionCard {...exhibition} />
							</TrackedLink>
						))
					) : (
						<EmptyState searchQuery={searchQuery} />
					)}
				</section>
			</DesktopContainer>

			<MainFooter />
		</div>
	);
}
