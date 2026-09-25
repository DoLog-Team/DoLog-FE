"use client";

import { Fragment, useMemo } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { EXHIBITION_FORM_TABS } from "./exhibitionFormTabs";
import { ArtworkExhibitionAdditionalInfoSection } from "./sections/ArtworkExhibitionAdditionalInfoSection";
import { ArtworkExhibitionGroupSection } from "./sections/ArtworkExhibitionGroupSection";
import { ArtworkExhibitionLinkSection } from "./sections/ArtworkExhibitionLinkSection";

export interface ArtworkExhibitionFormProps {
	artworkId: string;
	title: string;
	onBack: () => void;
}

export const ArtworkExhibitionForm = ({ artworkId, title, onBack }: ArtworkExhibitionFormProps) => {
	const tabIds = useMemo(() => EXHIBITION_FORM_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

	const formSections = [
		{
			id: "link",
			className: "pb-7",
			render: () => <ArtworkExhibitionLinkSection artworkId={artworkId} />,
		},
		{
			id: "group",
			className: "pb-7 pt-7",
			render: () => <ArtworkExhibitionGroupSection artworkId={artworkId} />,
		},
		{
			id: "additional",
			className: "pb-7 pt-7",
			render: () => <ArtworkExhibitionAdditionalInfoSection />,
		},
	];

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader title={title} onTempSave={() => {}} onBack={onBack} />
				<TabBar tabs={EXHIBITION_FORM_TABS} activeTab={activeTab} onTabClick={handleTabClick} />
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
		</DesktopContainer>
	);
};
