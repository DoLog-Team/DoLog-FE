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

type Decision = "accept" | "reject";

const MODAL = {
	accept: { title: "전시 참여 수락", verb: "수락해요", action: "수락하기", status: "JOINED" },
	reject: { title: "전시 참여 거절", verb: "거절해요", action: "거절하기", status: "DENIED" },
} as const;

interface PendingArtistListProps {
	exhibitionId: string;
	artists: AdminArtist[];
}

export const PendingArtistList = ({ exhibitionId, artists }: PendingArtistListProps) => {
	const [keyword, setKeyword] = useState("");
	const [decision, setDecision] = useState<Decision | null>(null);
	const selection = useRowSelection<string>();
	const { isProcessing, run } = useAdminAction();

	const items = artists.filter((artist) =>
		matchesKeyword(keyword, artist.name, artist.email ?? ""),
	);
	const selectedNames = artists
		.filter((artist) => selection.isSelected(artist.id))
		.map((artist) => artist.name);

	const confirm = () => {
		if (!decision) return;
		const { status } = MODAL[decision];
		setDecision(null);
		run(() => updateArtistStatus(exhibitionId, selection.selectedIds, status), selection.clear);
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
					{ header: "이메일", width: "40%", cell: (artist) => artist.email ?? "-" },
					{ header: "가입 인사", width: "40%", cell: (artist) => artist.greeting ?? "-" },
				]}
				renderCard={(artist) => <ArtistCard artist={artist} />}
				actions={[
					{ label: "거절하기", variant: "assistive", onClick: () => setDecision("reject") },
					{ label: "수락하기", variant: "primary", onClick: () => setDecision("accept") },
				]}
				isProcessing={isProcessing}
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
