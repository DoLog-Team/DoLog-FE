"use client";

import { Fragment, useCallback, useMemo, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import type { ArtistProfileForm } from "../_mocks/profile";
import { PROFILE_EDIT_TABS } from "./profileEditTabs";
import { ProfileBasicInfoSection } from "./sections/ProfileBasicInfoSection";
import { ProfilePurchaseLinkSection } from "./sections/ProfilePurchaseLinkSection";
import { ProfileSnsInfoSection } from "./sections/ProfileSnsInfoSection";

export interface ProfileEditFormProps {
	initialValue: ArtistProfileForm;
	onBack: () => void;
}

export const ProfileEditForm = ({ initialValue, onBack }: ProfileEditFormProps) => {
	const [basicMissingCount, setBasicMissingCount] = useState(0);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	const formSections = [
		{
			id: "basic",
			className: "pb-7",
			render: () => (
				<ProfileBasicInfoSection
					initialValue={initialValue}
					onMissingCountChange={handleBasicMissingCountChange}
				/>
			),
		},
		{
			id: "sns",
			className: "pb-7 pt-7",
			render: () => <ProfileSnsInfoSection initialValue={initialValue} />,
		},
		{
			id: "purchase",
			className: "pb-7 pt-7",
			render: () => <ProfilePurchaseLinkSection initialValue={initialValue} />,
		},
	];

	const tabIds = useMemo(() => PROFILE_EDIT_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);

	const tabs = useMemo(
		() =>
			PROFILE_EDIT_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				{/* TODO: 임시 저장 API 연결 */}
				<FormHeader title="프로필 정보 수정" onTempSave={() => {}} onBack={onBack} />
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
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
