"use client";

import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import {
	AdminSelectableList,
	matchesKeyword,
	summarizeArtists,
} from "../../_components/AdminSelectableList";
import { useRowSelection } from "../../_components/useRowSelection";
import { MOCK_PENDING_ARTISTS } from "../../_mocks/artists";
import { ArtistCard } from "./ArtistCard";

type Decision = "accept" | "reject";

const MODAL = {
	accept: { title: "전시 참여 수락", verb: "수락해요", action: "수락하기" },
	reject: { title: "전시 참여 거절", verb: "거절해요", action: "거절하기" },
} as const;

export const PendingArtistList = () => {
	// 참여 대기 작가 API 연결 전 임시 데이터
	const [artists, setArtists] = useState(MOCK_PENDING_ARTISTS);
	const [keyword, setKeyword] = useState("");
	const [decision, setDecision] = useState<Decision | null>(null);
	const selection = useRowSelection<number>();

	const items = artists.filter((artist) => matchesKeyword(keyword, artist.name, artist.email));
	const selectedNames = artists
		.filter((artist) => selection.isSelected(artist.id))
		.map((artist) => artist.name);

	const confirm = () => {
		setArtists((prev) => prev.filter((artist) => !selection.isSelected(artist.id)));
		selection.clear();
		setDecision(null);
	};

	return (
		<>
			<AdminSelectableList
				title="참여 대기 작가"
				searchPlaceholder="이름 혹은 메일을 검색할 수 있습니다."
				searchValue={keyword}
				onSearchChange={setKeyword}
				unit="명"
				items={items}
				selection={selection}
				columns={[
					{ header: "작가명", width: "20%", cell: (artist) => artist.name },
					{ header: "이메일", width: "40%", cell: (artist) => artist.email },
					{ header: "가입 인사", width: "40%", cell: (artist) => artist.greeting },
				]}
				renderCard={(artist) => <ArtistCard artist={artist} />}
				actions={[
					{ label: "거절하기", variant: "assistive", onClick: () => setDecision("reject") },
					{ label: "수락하기", variant: "primary", onClick: () => setDecision("accept") },
				]}
			/>

			<Modal
				open={decision !== null}
				onOpenChange={(open) => !open && setDecision(null)}
				title={decision ? MODAL[decision].title : ""}
				description={
					decision ? `${summarizeArtists(selectedNames)}를 ${MODAL[decision].verb}.` : undefined
				}
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setDecision(null) },
					{ text: decision ? MODAL[decision].action : "", variant: "primary", onClick: confirm },
				]}
			/>
		</>
	);
};
