"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import {
	AdminSelectableList,
	matchesKeyword,
	summarizeArtists,
} from "../../_components/AdminSelectableList";
import { useRowSelection } from "../../_components/useRowSelection";
import { MOCK_ARTISTS } from "../../_mocks/artists";
import { ArtistCard } from "./ArtistCard";

export const ArtistList = () => {
	// 참여 작가 API 연결 전 임시 데이터
	const [artists, setArtists] = useState(MOCK_ARTISTS);
	const [keyword, setKeyword] = useState("");
	const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
	const selection = useRowSelection<number>();

	const items = artists.filter((artist) => matchesKeyword(keyword, artist.name, artist.email));
	const selectedNames = artists
		.filter((artist) => selection.isSelected(artist.id))
		.map((artist) => artist.name);

	const exclude = () => {
		setArtists((prev) => prev.filter((artist) => !selection.isSelected(artist.id)));
		selection.clear();
		setIsExcludeModalOpen(false);
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
					{ header: "이메일", width: "35%", cell: (artist) => artist.email },
					{ header: "가입인사", width: "35%", cell: (artist) => artist.greeting },
					{ header: "작품", width: "80px", cell: (artist) => `${artist.artworkCount}개` },
				]}
				renderCard={(artist) => <ArtistCard artist={artist} showArtworkCount />}
				actions={[
					{ label: "제외하기", variant: "assistive", onClick: () => setIsExcludeModalOpen(true) },
				]}
				// 전시 내 작가 프로필 경로는 전시 사이트 연결 후 확정
				getRowHref={() => "#"}
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
