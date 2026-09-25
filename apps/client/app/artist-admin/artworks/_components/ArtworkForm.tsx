"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Input } from "@/components/common/Input/Input";
import { Modal } from "@/components/common/Modal/Modal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { ArtworkAdditionalInfoSection } from "./sections/ArtworkAdditionalInfoSection";
import { ArtworkBasicInfoSection } from "./sections/ArtworkBasicInfoSection";
import { ArtworkImageSection } from "./sections/ArtworkImageSection";
import { ArtworkPurchaseInfoSection } from "./sections/ArtworkPurchaseInfoSection";

export interface ArtworkFormProps {
	title: string;
	onBack: () => void;
}

export const ArtworkForm = ({ title, onBack }: ArtworkFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const tabIds = useMemo(() => ARTWORK_FORM_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);
	const [basicMissingCount, setBasicMissingCount] = useState(1);
	const [artworkTitle, setArtworkTitle] = useState(title);
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const [renameValue, setRenameValue] = useState(title);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	const handleTopTabClick = (tabId: string) => {
		if (tabId === "detail") {
			router.push(`${pathname}/detail`);
			return;
		}
		handleTabClick(tabId);
	};

	const tabs = useMemo(
		() =>
			ARTWORK_FORM_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	const formSections = [
		{
			id: "basic",
			className: "pb-7",
			render: () => (
				<ArtworkBasicInfoSection onMissingCountChange={handleBasicMissingCountChange} />
			),
		},
		{ id: "image", className: "pb-7 pt-7", render: () => <ArtworkImageSection /> },
		{ id: "additional", className: "pb-7 pt-7", render: () => <ArtworkAdditionalInfoSection /> },
		{ id: "purchase", className: "pb-7 pt-7", render: () => <ArtworkPurchaseInfoSection /> },
	];

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
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTopTabClick} />
			</div>

			<div className="py-7">
				{formSections.map((section, index) => (
					<Fragment key={section.id}>
						<section
							className={section.className}
							ref={(el) => {
								sectionRefs[section.id].current = el;
							}}
						>
							{section.render()}
						</section>

						{index < formSections.length - 1 && (
							<Divider thickness="thin" fullBleed={true} spacing="md" />
						)}
					</Fragment>
				))}
			</div>

			<div className="sticky bottom-0 z-10 flex justify-end border-t border-stroke-lightest bg-bg-normal py-4">
				<Button type="button" onClick={() => router.push(`${pathname}/detail`)}>
					다음으로
				</Button>
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
