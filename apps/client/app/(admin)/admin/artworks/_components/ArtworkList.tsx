"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EmptyImageFallback } from "@/components/common/EmptyImageFallback/EmptyImageFallback";
import { FilterChip } from "@/components/common/FilterChip/FilterChip";
import { ChevronIcon } from "@/components/common/icons/ChevronIcon";
import { Modal } from "@/components/common/Modal/Modal";
import { Select } from "@/components/common/Select/Select";
import { cn } from "@/lib/utils/cn";
import {
	AdminSelectableList,
	matchesKeyword,
	type SelectableListColumn,
} from "../../_components/AdminSelectableList";
import { useRowSelection } from "../../_components/useRowSelection";
import { type AdminArtwork, MOCK_ARTWORKS, MOCK_GROUPS } from "../../_mocks/artworks";

const VISIBILITY_OPTIONS = ["공개", "비공개", "임시저장"];
const UNGROUPED = "그룹 미지정";

const MODE = {
	all: {
		title: "전체 작품 관리",
		toggleLabel: "작품 숨기기",
		modalTitle: "전시에서 숨기기",
		modalDescription: (count: number) =>
			`${count}개의 작품을 전시에서 숨겨요.\n언제든 다시 표시할 수 있어요.`,
		modalAction: "숨기기",
	},
	hidden: {
		title: "숨긴 작품 관리",
		toggleLabel: "작품 보이기",
		modalTitle: "전시에서 보이기",
		modalDescription: (count: number) => `${count}개의 작품을 전시에 표시해요.`,
		modalAction: "보이기",
	},
} as const;

type Mode = keyof typeof MODE;

export const ArtworkList = ({ mode }: { mode: Mode }) => {
	// 작품 API 연결 전 임시 데이터
	const [artworks, setArtworks] = useState(MOCK_ARTWORKS);
	const [keyword, setKeyword] = useState("");
	const [visibility, setVisibility] = useState<string | null>(null);
	const [group, setGroup] = useState<string | null>(null);
	const [openedModal, setOpenedModal] = useState<"toggle" | "group" | null>(null);
	const [targetGroup, setTargetGroup] = useState("");
	const selection = useRowSelection<number>();

	// 필터로 가려진 작품이 선택된 채 남지 않도록 선택 해제
	const changeFilter = (setFilter: (value: string | null) => void, value: string | null) => {
		setFilter(value);
		selection.clear();
	};
	const config = MODE[mode];

	const scoped = artworks.filter((artwork) => artwork.isHidden === (mode === "hidden"));
	const items = scoped.filter(
		(artwork) =>
			matchesKeyword(keyword, artwork.title, artwork.artistName) &&
			(!visibility || artwork.visibility === visibility) &&
			(!group || (group === UNGROUPED ? artwork.group === null : artwork.group === group)),
	);
	const exceededCount = mode === "all" ? scoped.filter((artwork) => !artwork.isExposed).length : 0;

	const updateSelected = (change: Partial<AdminArtwork>) => {
		setArtworks((prev) =>
			prev.map((artwork) =>
				selection.isSelected(artwork.id) ? { ...artwork, ...change } : artwork,
			),
		);
		selection.clear();
		setOpenedModal(null);
	};

	const columns: SelectableListColumn<AdminArtwork>[] = [
		{ header: "작품 제목", width: "28%", cell: (artwork) => artwork.title },
		{ header: "작가명", width: "14%", cell: (artwork) => artwork.artistName },
		{ header: "그룹", width: "14%", cell: (artwork) => artwork.group ?? "X" },
		{ header: "공개 여부", width: "14%", cell: (artwork) => artwork.visibility },
		...(mode === "all"
			? [
					{
						header: "노출 여부",
						width: "14%",
						cell: (artwork: AdminArtwork) => (artwork.isExposed ? "O" : "X"),
						cellClassName: (artwork: AdminArtwork) =>
							artwork.isExposed ? undefined : "bg-admin2 text-admin1",
					},
				]
			: []),
		{ header: "진행도", width: "14%", cell: (artwork) => `${artwork.progress}%` },
	];

	return (
		<>
			<AdminSelectableList
				title={config.title}
				notice={exceededCount > 0 && <ExceededNotice count={exceededCount} />}
				searchPlaceholder="검색할 내용을 입력해주세요"
				searchValue={keyword}
				onSearchChange={setKeyword}
				filters={
					<>
						<FilterChip
							label="공개 여부"
							options={VISIBILITY_OPTIONS}
							selected={visibility}
							onSelect={(value) => changeFilter(setVisibility, value)}
						/>
						<FilterChip
							label="그룹"
							options={mode === "all" ? [...MOCK_GROUPS, UNGROUPED] : MOCK_GROUPS}
							selected={group}
							onSelect={(value) => changeFilter(setGroup, value)}
							className={cn(
								(mode === "all" ? MOCK_GROUPS.length <= 1 : MOCK_GROUPS.length === 0) &&
									"pointer-events-none opacity-50",
							)}
						/>
					</>
				}
				unit="개"
				items={items}
				selection={selection}
				columns={columns}
				renderCard={(artwork) => <ArtworkCard artwork={artwork} />}
				cardClassName={(artwork) => (artwork.isExposed ? undefined : "bg-admin2")}
				actions={[
					{
						label: config.toggleLabel,
						variant: "assistive",
						onClick: () => setOpenedModal("toggle"),
					},
					{
						label: "그룹 지정하기",
						variant: "primary",
						onClick: () => {
							setTargetGroup("");
							setOpenedModal("group");
						},
					},
				]}
				// 전시 내 작품 상세 경로는 전시 사이트 연결 후 확정
				getRowHref={() => "#"}
			/>

			<Modal
				open={openedModal === "toggle"}
				onOpenChange={(open) => !open && setOpenedModal(null)}
				title={config.modalTitle}
				description={config.modalDescription(selection.count)}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setOpenedModal(null) },
					{
						text: config.modalAction,
						variant: "primary",
						onClick: () => updateSelected({ isHidden: mode === "all" }),
					},
				]}
			/>

			<Modal
				open={openedModal === "group"}
				onOpenChange={(open) => !open && setOpenedModal(null)}
				title="그룹 지정하기"
				description={`선택한 ${selection.count}개의 작품의 그룹을 선택해주세요.`}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setOpenedModal(null) },
					{
						text: "저장하기",
						variant: "primary",
						disabled: !targetGroup,
						onClick: () => updateSelected({ group: targetGroup }),
					},
				]}
			>
				<Select
					options={MOCK_GROUPS.map((name) => ({ label: name, value: name }))}
					value={targetGroup}
					onChange={setTargetGroup}
					placeholder="그룹을 선택해주세요"
				/>
			</Modal>
		</>
	);
};

const ExceededNotice = ({ count }: { count: number }) => (
	<div className="flex flex-col gap-2.5 rounded-lg bg-admin2 p-6">
		<p className="font-semibold text-[19px] text-error leading-7">
			작품 {count}개가 노출되지 않고 있어요!
		</p>
		<p className="text-body2 text-light">
			현재 플랜에서 노출할 수 있는 작품 수를 초과했어요.
			<br />
			초과된 작품을 전시에 노출하려면 플랜을 업그레이드하거나, 기존 작품을 숨겨 작품 수를
			조정해주세요.
		</p>
		{/* 플랜 확인 페이지는 기획 중이라 경로 미정 */}
		<Link href="#" className="flex w-fit items-center text-body2 text-lighter">
			사용중인 플랜 확인하기
			<ChevronIcon direction="right" size={20} />
		</Link>
	</div>
);

const ArtworkCard = ({ artwork }: { artwork: AdminArtwork }) => (
	<>
		{artwork.imageUrl ? (
			<Image
				src={artwork.imageUrl}
				alt=""
				width={100}
				height={133}
				className="h-[133px] w-25 shrink-0 object-cover"
			/>
		) : (
			<EmptyImageFallback className="h-[133px] w-25 shrink-0" />
		)}
		<div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
			<div className="flex flex-col gap-0.5">
				{!artwork.isExposed && (
					<p className="text-[12px] text-admin1 leading-3.5">작품이 표시되지 않아요.</p>
				)}
				<p className="text-body1-bold text-strong">{artwork.title}</p>
			</div>
			<div className="flex flex-col gap-1 text-light">
				<p className="flex gap-1 text-body2-bold">
					<span className="truncate">{artwork.artistName}</span>
					<span className="font-normal">·</span>
					<span className="shrink-0">{artwork.progress}% 작성</span>
				</p>
				<p className="flex items-center gap-1.5 text-[12px] leading-3.5">
					{artwork.visibility}
					{artwork.group && (
						<>
							<span className="h-2 w-px bg-stroke-lighter" />
							{artwork.group}
						</>
					)}
				</p>
			</div>
		</div>
	</>
);
