"use client";

import { josa } from "es-hangul";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { Select } from "@/components/common/Select/Select";
import type { JoinableExhibition, MyExhibition } from "../../_types";
import { ExhibitionIntroModal } from "./ExhibitionIntroModal";
import { ExhibitionJoinModal } from "./ExhibitionJoinModal";

interface ArtworkSubmitModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	artworkId: string;
	artworkTitle: string;
	// 출품할 전시 선택지 — 나의 전시 목록
	exhibitions: Pick<MyExhibition, "exhibitionId" | "name" | "acceptedAt">[];
}

/**
 * 작품 → 전시 출품 모달 (작가 어드민 작품 카드, 두록 작품 상세 공통)
 * 수락 완료된 전시가 없으면 "참여중인 전시가 없어요" 모달을 띄우고, 참여하기로 전시 참여 흐름을 연다
 */
export function ArtworkSubmitModal({
	open,
	onOpenChange,
	artworkId,
	artworkTitle,
	exhibitions,
}: ArtworkSubmitModalProps) {
	const router = useRouter();
	const [selectedExhibitionId, setSelectedExhibitionId] = useState<string | undefined>(undefined);
	const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
	// 입장 코드가 확인된 전시 (가입 인사 모달 대상)
	const [joiningExhibition, setJoiningExhibition] = useState<JoinableExhibition | null>(null);

	// 수락 완료된 전시만 출품 대상으로 선택 가능
	const acceptedExhibitions = exhibitions.filter((exhibition) => exhibition.acceptedAt);

	const handleOpenChange = (next: boolean) => {
		if (!next) setSelectedExhibitionId(undefined);
		onOpenChange(next);
	};

	const openJoinModal = () => {
		handleOpenChange(false);
		setIsJoinModalOpen(true);
	};

	const handleSubmit = () => {
		if (!selectedExhibitionId) return;
		handleOpenChange(false);
		router.push(`/artist-admin/artworks/${artworkId}/exhibition`);
	};

	return (
		<>
			{acceptedExhibitions.length > 0 ? (
				<Modal
					open={open}
					onOpenChange={handleOpenChange}
					title="전시 선택"
					description={`${josa(artworkTitle, "을/를")} 출품할 전시를 선택해주세요.`}
					showCloseButton
					actions={[
						{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
						{
							text: "제출하기",
							variant: "primary",
							disabled: !selectedExhibitionId,
							onClick: handleSubmit,
						},
					]}
				>
					<Select
						options={acceptedExhibitions.map((exhibition) => ({
							label: exhibition.name,
							value: exhibition.exhibitionId,
						}))}
						value={selectedExhibitionId}
						onChange={setSelectedExhibitionId}
						placeholder="placeholder"
						actionLabel={
							<span className="flex items-center gap-1">
								<span className="text-body2-bold text-light">새로운 전시</span>
								<span>입장하기</span>
							</span>
						}
						onActionClick={openJoinModal}
					/>
				</Modal>
			) : (
				<Modal
					open={open}
					onOpenChange={handleOpenChange}
					title="참여중인 전시가 없어요."
					description="작품을 출품하려면 먼저 전시에 참여해주세요."
					showCloseButton
					actions={[
						{ text: "취소", variant: "assistive", onClick: () => handleOpenChange(false) },
						{ text: "참여하기", variant: "primary", onClick: openJoinModal },
					]}
				/>
			)}

			<ExhibitionJoinModal
				open={isJoinModalOpen}
				onOpenChange={setIsJoinModalOpen}
				onCodeConfirmed={setJoiningExhibition}
			/>
			<ExhibitionIntroModal
				exhibition={joiningExhibition}
				onOpenChange={(next) => !next && setJoiningExhibition(null)}
			/>
		</>
	);
}
