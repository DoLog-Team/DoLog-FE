"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { createArtwork } from "../../../artworks/_api/createArtwork";
import { changeArtworkStatus, deleteArtwork, toErrorMessage } from "../../_api/actions";
import type { MyArtwork, MyExhibition } from "../../_types";
import { ListToggleButton } from "../ListToggleButton";
import { MyArtworkCard } from "../MyArtworkCard";
import { SectionHeader } from "../SectionHeader";
import { useExpandableList } from "../useExpandableList";

// 정렬 조건 : 임시저장 먼저, 그 안에서는 최신 등록순
const compareArtworks = (a: MyArtwork, b: MyArtwork) => {
	if ((a.status === "draft") !== (b.status === "draft")) return a.status === "draft" ? -1 : 1;
	return b.createdAt.localeCompare(a.createdAt);
};

interface MyArtworkSectionProps {
	artworks: MyArtwork[];
	// 작품 출품 시 전시 선택지
	exhibitions: MyExhibition[];
}

export function MyArtworkSection({
	artworks: initialArtworks,
	exhibitions,
}: MyArtworkSectionProps) {
	const router = useRouter();
	const [artworks, setArtworks] = useState(initialArtworks);
	const { visibleItems, expanded, canToggle, toggle } = useExpandableList(
		artworks,
		compareArtworks,
	);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [titleValue, setTitleValue] = useState("");
	const [isAdding, setIsAdding] = useState(false);
	const [addError, setAddError] = useState("");

	const handleAdd = async () => {
		const title = titleValue.trim();
		if (!title) return;
		setIsAdding(true);
		setAddError("");
		try {
			const artwork = await createArtwork(title);
			setIsAddModalOpen(false);
			router.push(`/artist-admin/artworks/${artwork.id}/edit`);
		} catch {
			setAddError("작품 추가에 실패했어요. 다시 시도해주세요.");
		} finally {
			setIsAdding(false);
		}
	};

	const { notice, showNotice, closeNotice } = useNoticeModal();

	const handleDelete = async (artworkId: string) => {
		try {
			await deleteArtwork(artworkId);
			setArtworks((prev) => prev.filter((artwork) => artwork.artworkId !== artworkId));
		} catch (error) {
			showNotice("삭제에 실패했어요.", toErrorMessage(error));
		}
	};

	const handleStatusChange = async (artworkId: string, status: "DRAFT" | "PUBLISHED") => {
		try {
			await changeArtworkStatus(artworkId, status);
			setArtworks((prev) =>
				prev.map((artwork) =>
					artwork.artworkId === artworkId
						? { ...artwork, status: status === "PUBLISHED" ? "public" : "private" }
						: artwork,
				),
			);
		} catch (error) {
			showNotice("전환에 실패했어요.", toErrorMessage(error));
		}
	};

	return (
		<section className="pb-6 min-[721px]:pb-7">
			<SectionHeader
				title="나의 작품"
				count={artworks.length}
				actionLabel="추가하기"
				onAction={() => {
					setTitleValue("");
					setAddError("");
					setIsAddModalOpen(true);
				}}
			/>

			<div className="mt-5 flex flex-col gap-5 min-[721px]:mt-0 min-[721px]:grid min-[721px]:grid-cols-4">
				{visibleItems.map((artwork) => (
					<MyArtworkCard
						key={artwork.artworkId}
						artwork={artwork}
						exhibitions={exhibitions}
						onDelete={handleDelete}
						onStatusChange={handleStatusChange}
					/>
				))}
			</div>

			{canToggle && (
				<div className="mt-17 min-[721px]:mt-7">
					<ListToggleButton expanded={expanded} onToggle={toggle} />
				</div>
			)}

			<Modal
				open={isAddModalOpen}
				onOpenChange={setIsAddModalOpen}
				title="새 작품 추가하기"
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsAddModalOpen(false) },
					{
						text: "추가하기",
						variant: "primary",
						disabled: !titleValue.trim() || isAdding,
						onClick: handleAdd,
					},
				]}
			>
				<Input
					value={titleValue}
					onChange={(e) => setTitleValue(e.target.value)}
					placeholder="작품 이름을 입력해주세요"
					error={Boolean(addError)}
					errorMessage={addError || undefined}
				/>
			</Modal>
			{/* TODO: 삭제/전환 실패 안내 UI 는 피그마에 없음 — 임시 모달 */}
			<NoticeModal notice={notice} onClose={closeNotice} />
		</section>
	);
}
