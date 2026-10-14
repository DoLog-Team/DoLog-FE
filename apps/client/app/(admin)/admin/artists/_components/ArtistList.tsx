"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import { updateArtistStatus } from "../../_api/actions";
import {
	AdminSelectableList,
	matchesKeyword,
	summarizeArtists,
} from "../../_components/AdminSelectableList";
import { useAdminAction } from "../../_components/useAdminAction";
import { useRowSelection } from "../../_components/useRowSelection";
import type { AdminArtist } from "../../_types";
import { ArtistCard } from "./ArtistCard";

interface ArtistListProps {
	exhibitionId: string;
	artists: AdminArtist[];
}

export const ArtistList = ({ exhibitionId, artists }: ArtistListProps) => {
	const [keyword, setKeyword] = useState("");
	const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
	const selection = useRowSelection<string>();
	const { isProcessing, run } = useAdminAction();

	const items = artists.filter((artist) =>
		matchesKeyword(keyword, artist.name, artist.email ?? ""),
	);
	const selectedNames = artists
		.filter((artist) => selection.isSelected(artist.id))
		.map((artist) => artist.name);

	const exclude = () => {
		setIsExcludeModalOpen(false);
		run(() => updateArtistStatus(exhibitionId, selection.selectedIds, "REMOVED"), selection.clear);
	};

	return (
		<>
			<AdminSelectableList
				title="참여 작가 관리"
				searchPlaceholder="이름 혹은 메일을 검색할 수 있습니다."
				searchValue={keyword}
				onSearchChange={setKeyword}
				unit="명"
				items={items}
				selection={selection}
				columns={[
					{ header: "작가명", width: "20%", cell: (artist) => artist.name },
					{ header: "이메일", width: "35%", cell: (artist) => artist.email ?? "-" },
					{ header: "가입인사", width: "35%", cell: (artist) => artist.greeting ?? "-" },
					{ header: "작품", width: "80px", cell: (artist) => `${artist.artworkCount}개` },
				]}
				renderCard={(artist) => <ArtistCard artist={artist} showArtworkCount />}
				actions={[
					{ label: "제외하기", variant: "assistive", onClick: () => setIsExcludeModalOpen(true) },
				]}
				// 전시 내 작가 프로필 경로는 전시 사이트 연결 후 확정
				getRowHref={() => "#"}
				isProcessing={isProcessing}
			/>

			<Modal
				open={isExcludeModalOpen}
				onOpenChange={setIsExcludeModalOpen}
				title="전시에서 내보내기"
				description={`${summarizeArtists(selectedNames)}를 전시에서 내보내요.\n작가가 올린 작품도 함께 사라져요.`}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsExcludeModalOpen(false) },
					{ text: "내보내기", variant: "primary", onClick: exclude },
				]}
			/>
		</>
	);
};
