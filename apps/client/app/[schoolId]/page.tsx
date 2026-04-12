"use client";

import { Button } from "components";
import { useState } from "react";
import { CardGrid } from "@/components/common/Card/CardGrid";
import { ListCardGrid } from "@/components/common/Card/ListCard/ListCardGrid";
import { Modal } from "@/components/common/Modal/Modal";
import { SearchBar } from "@/components/common/SearchBar/SearchBar";
import { Title } from "@/components/common/Title/Title";
import { Chip } from "@/components/common/Chip/Chip";
import { MOCK_WORK_DATA } from "@/constants/work";
import { testPageStyles as s } from "./TestPage.styles";

export default function TestPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("전체");
  	const categories = ["전체", "카테고리 1", "카테고리 2"];

	return (
		<div className={s.wrapper}>
			<h1 className="text-head1 text-strong mb-6">두록(DoLog) 테마 테스트</h1>
			<Title title="두록(DoLog) Title 테스트" />
			<SearchBar placeholder="예시 : 전시회 제목을 검색해요." value={search} onChange={setSearch} />
			<div className="flex flex-wrap gap-4">
				<Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>

				<Button variant="secondary" size="md">
					보조 버튼
				</Button>

				<Button variant="outline" size="md">
					기본 버튼 (Outline)
				</Button>

				<Button size="sm">작은 버튼</Button>
				<Button size="lg">큰 버튼</Button>
			</div>

			{/* Chip 사용 예시 */}
			<div className="flex gap-2 mt-4">
				{categories.map((cat) => (
				<Chip
					key={cat}
					label={cat}
					type="primary" // type을 각 디자인에 맞게 사용하면 됩니다. (primary, assistive, custom)
					selected={selected === cat}
					onClick={() => setSelected(cat)}
				/>
				))}
			</div>

			<CardGrid items={MOCK_WORK_DATA} limit={4} />
			<ListCardGrid items={MOCK_WORK_DATA} limit={3} />

			{/* 모달 사용 예시 */}
			<Modal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				title="모달입니다."
				description={`모발 상세 설명을 작성해주세요.\n 두줄까지 작성하면 보기 좋습니다.`}
				actions={[
					{
						text: "Button",
						onClick: () => setIsModalOpen(false),
						variant: "secondary",
					},
					{
						text: "Button",
						onClick: () => {
							alert("확인되었습니다!");
							setIsModalOpen(false);
						},
						variant: "primary",
					},
				]}
			/>
		</div>
	);
}
