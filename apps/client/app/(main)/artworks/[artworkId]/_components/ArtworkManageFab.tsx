"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	changeArtworkStatus,
	deleteArtwork,
	getMyExhibitionOptions,
	toErrorMessage,
} from "@/app/artist-admin/(shell)/_api/actions";
import { ArtworkDeleteModal } from "@/app/artist-admin/(shell)/_components/modals/ArtworkDeleteModal";
import { ArtworkSubmitModal } from "@/app/artist-admin/(shell)/_components/modals/ArtworkSubmitModal";
import { ArtworkVisibilityModal } from "@/app/artist-admin/(shell)/_components/modals/ArtworkVisibilityModal";
import type { MyExhibition } from "@/app/artist-admin/(shell)/_types";
import { EditFab } from "@/components/common/EditFab/EditFab";
import { Engagement } from "@/components/common/Engagement/Engagement";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import {
	type OverflowMenuItem,
	OverflowMenuList,
} from "@/components/common/OverflowMenu/OverflowMenuList";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { ArtworkQrModal } from "./ArtworkQrModal";
import type { MyArtworkState } from "./useMyArtwork";

interface ArtworkManageFabProps {
	artworkId: string;
	title: string;
	viewCount: number;
	likeCount: number;
	// 본인 작품의 공개 상태·출품 전시 — 불러오기 전이면 null
	myArtwork: MyArtworkState | null;
	onStatusChange: (status: MyArtworkState["status"]) => void;
}

/**
 * 작품 관리 메뉴 버튼 (피그마 000301-9801) — 작품을 작성한 작가 본인일 때만 그린다
 */
export function ArtworkManageFab({
	artworkId,
	title,
	viewCount,
	likeCount,
	myArtwork,
	onStatusChange,
}: ArtworkManageFabProps) {
	const router = useRouter();
	const [isQrModalOpen, setIsQrModalOpen] = useState(false);
	const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
	const [exhibitions, setExhibitions] = useState<
		Pick<MyExhibition, "exhibitionId" | "name" | "acceptedAt">[]
	>([]);
	const [nextStatus, setNextStatus] = useState<MyArtworkState["status"] | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { notice, showNotice, closeNotice } = useNoticeModal();

	// 출품 모달의 전시 선택지 — 미출품 작품일 때만 필요
	const needsExhibitionOptions = !!myArtwork && !myArtwork.exhibitionId;
	useEffect(() => {
		if (!needsExhibitionOptions) return;
		let ignore = false;
		getMyExhibitionOptions()
			.then((data) => {
				if (!ignore) setExhibitions(data);
			})
			.catch(() => {});
		return () => {
			ignore = true;
		};
	}, [needsExhibitionOptions]);

	const handleStatusChange = async (status: MyArtworkState["status"]) => {
		try {
			await changeArtworkStatus(artworkId, status);
			onStatusChange(status);
		} catch (error) {
			showNotice("전환에 실패했어요.", toErrorMessage(error));
		}
	};

	const handleDelete = async () => {
		try {
			await deleteArtwork(artworkId);
			router.replace("/artist-admin");
		} catch (error) {
			showNotice("삭제에 실패했어요.", toErrorMessage(error));
		}
	};

	// 출품·공개 상태 항목은 내 작품 조회가 끝난 뒤에 보여준다
	const menuItems: OverflowMenuItem[] = [
		{ label: "QR 확인하기", icon: "/icons/qr.svg", onClick: () => setIsQrModalOpen(true) },
		{
			label: "편집하기",
			icon: "/icons/edit.svg",
			href: `/artist-admin/artworks/${artworkId}/edit`,
			dividerBefore: true,
		},
		...(myArtwork
			? [
					// 출품된 작품은 출품(전시 연결) 정보 수정 페이지로, 미출품 작품은 출품 모달
					myArtwork.exhibitionId
						? {
								label: "출품 정보 편집",
								icon: "/icons/edit.svg",
								href: `/artist-admin/artworks/${artworkId}/exhibition`,
							}
						: {
								label: "출품하기",
								icon: "/icons/link.svg",
								onClick: () => setIsSubmitModalOpen(true),
							},
					myArtwork.status === "PUBLISHED"
						? {
								label: "비공개하기",
								icon: "/icons/view.svg",
								onClick: () => setNextStatus("DRAFT"),
							}
						: {
								label: "작품 공개하기",
								icon: "/icons/view.svg",
								onClick: () => setNextStatus("PUBLISHED"),
							},
				]
			: []),
		{
			label: "삭제하기",
			icon: "/icons/trash.svg",
			danger: true,
			onClick: () => setIsDeleteModalOpen(true),
		},
	];

	return (
		<>
			<EditFab
				label="작품 관리 메뉴"
				menu={(close) => (
					<OverflowMenuList
						items={menuItems}
						onSelect={close}
						header={
							<div className="flex justify-center py-2.5">
								<Engagement viewCount={viewCount} likeCount={likeCount} />
							</div>
						}
					/>
				)}
			/>

			<ArtworkQrModal
				open={isQrModalOpen}
				onOpenChange={setIsQrModalOpen}
				artworkId={artworkId}
				title={title}
			/>
			<ArtworkSubmitModal
				open={isSubmitModalOpen}
				onOpenChange={setIsSubmitModalOpen}
				artworkId={artworkId}
				artworkTitle={title}
				exhibitions={exhibitions}
			/>
			<ArtworkVisibilityModal
				nextStatus={nextStatus}
				onOpenChange={(open) => !open && setNextStatus(null)}
				onConfirm={handleStatusChange}
			/>
			<ArtworkDeleteModal
				open={isDeleteModalOpen}
				onOpenChange={setIsDeleteModalOpen}
				artworkTitle={title}
				onConfirm={handleDelete}
			/>
			<NoticeModal notice={notice} onClose={closeNotice} />
		</>
	);
}
