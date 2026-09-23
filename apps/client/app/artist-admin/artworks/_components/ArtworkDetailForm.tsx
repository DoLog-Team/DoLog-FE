"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { ArtworkPlaceholderSection } from "./sections/ArtworkPlaceholderSection";

export interface ArtworkDetailFormProps {
	title: string;
	onBack: () => void;
}

export const ArtworkDetailForm = ({ title, onBack }: ArtworkDetailFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [artworkTitle, setArtworkTitle] = useState(title);
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const [renameValue, setRenameValue] = useState(title);

	const handleTabClick = (tabId: string) => {
		if (tabId === "detail") return;
		router.push(pathname.replace(/\/detail$/, ""));
	};

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={artworkTitle}
					editableTitle
					onTitleEditClick={() => {
						setRenameValue(artworkTitle);
						setIsRenameModalOpen(true);
					}}
					onTempSave={() => {}}
					onBack={onBack}
				/>
				<TabBar tabs={ARTWORK_FORM_TABS} activeTab="detail" onTabClick={handleTabClick} />
			</div>

			<div className="py-7">
				<ArtworkPlaceholderSection title="작품 상세 정보" />
			</div>

			<Modal
				open={isRenameModalOpen}
				onOpenChange={setIsRenameModalOpen}
				title="작품 이름 변경"
				showCloseButton
				actions={[
					{ text: "취소", variant: "assistive", onClick: () => setIsRenameModalOpen(false) },
					{
						text: "변경하기",
						variant: "primary",
						disabled: !renameValue.trim() || renameValue === artworkTitle,
						onClick: () => {
							setArtworkTitle(renameValue.trim());
							setIsRenameModalOpen(false);
						},
					},
				]}
			>
				<Input
					value={renameValue}
					onChange={(e) => setRenameValue(e.target.value)}
					placeholder={artworkTitle}
				/>
			</Modal>
		</DesktopContainer>
	);
};
