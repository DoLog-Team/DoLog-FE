"use client";

import { useState } from "react";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { type Tab, TabBar } from "@/components/common/TabBar/TabBar";
import { RenameArtworkModal } from "./RenameArtworkModal";

export interface ArtworkFormHeaderProps {
	artworkId: string;
	initialTitle: string;
	lastSavedAt?: string;
	onTempSave: () => void;
	isSaving: boolean;
	hasValidationError?: boolean;
	saveError?: string;
	basicMissingCount: number;
	tabs: Tab[];
	activeTab: string;
	onTabClick: (tabId: string) => void;
	onBack: () => void;
}

export const ArtworkFormHeader = ({
	artworkId,
	initialTitle,
	lastSavedAt,
	onTempSave,
	isSaving,
	hasValidationError,
	saveError,
	basicMissingCount,
	tabs,
	activeTab,
	onTabClick,
	onBack,
}: ArtworkFormHeaderProps) => {
	const [artworkTitle, setArtworkTitle] = useState(initialTitle);
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

	return (
		<>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={artworkTitle}
					editableTitle
					onTitleEditClick={() => setIsRenameModalOpen(true)}
					lastSavedAt={lastSavedAt}
					onTempSave={onTempSave}
					tempSaveDisabled={isSaving}
					saveDisabled={hasValidationError}
					saveLabel={basicMissingCount === 0 ? "저장" : "임시 저장"}
					onBack={onBack}
				/>
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />
				{saveError && <p className="px-4 pt-2 text-body3 text-error">{saveError}</p>}
			</div>

			<RenameArtworkModal
				artworkId={artworkId}
				currentTitle={artworkTitle}
				open={isRenameModalOpen}
				onOpenChange={setIsRenameModalOpen}
				onRenamed={setArtworkTitle}
			/>
		</>
	);
};
