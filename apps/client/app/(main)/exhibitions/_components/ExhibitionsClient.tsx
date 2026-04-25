"use client";

import Link from "next/link";
import { useState } from "react";
import { CollapsingHeader } from "@/components/common/CollapsingHeader/CollapsingHeader";
import { EmptyState } from "@/components/common/EmptyState/EmptyState";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import MainFooter from "@/components/common/Footer/MainFooter";
import ExhibitionCard, { type ExhibitionItem } from "../../_components/ExhibitionCard";

interface ExhibitionsClientProps {
	exhibitions: ExhibitionItem[];
}

export default function ExhibitionsClient({ exhibitions }: ExhibitionsClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
	const [selectedDept, setSelectedDept] = useState<string | null>(null);

	const univs = [...new Set(exhibitions.map((e) => e.univName))];
	const depts = [...new Set(exhibitions.map((e) => e.deptName))];

	const filtered = exhibitions.filter((e) => {
		const matchSearch = e.title.includes(searchQuery);
		const matchUniv = !selectedUniv || e.univName === selectedUniv;
		const matchDept = !selectedDept || e.deptName === selectedDept;
		return matchSearch && matchUniv && matchDept;
	});

	return (
		<div className="flex flex-col min-h-screen">
			<CollapsingHeader
				title="전체 전시회"
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				searchPlaceholder="전시회 제목을 검색해요."
			>
				<FilterChip
					label="대학"
					options={univs}
					selected={selectedUniv}
					onSelect={setSelectedUniv}
				/>
				<FilterChip
					label="학과"
					options={depts}
					selected={selectedDept}
					onSelect={setSelectedDept}
				/>
			</CollapsingHeader>

			{/* 전시회 목록 */}
			<section className="flex flex-col flex-1 px-4 gap-4">
				{filtered.length > 0 ? (
					filtered.map((exhibition) => (
						<Link key={exhibition.id} href={`/exhibition/${exhibition.id}`}>
							<ExhibitionCard {...exhibition} />
						</Link>
					))
				) : (
					<EmptyState searchQuery={searchQuery} />
				)}
			</section>

			<MainFooter />
		</div>
	);
}
