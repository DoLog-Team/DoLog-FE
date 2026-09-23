"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
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

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={title}
					editableTitle
					onTitleEditClick={() => {}}
					onTempSave={() => {}}
					onBack={onBack}
				/>
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTopTabClick} />
			</div>

			<div className="py-7">
				<section
					className="pb-7"
					ref={(el) => {
						sectionRefs.basic.current = el;
					}}
				>
					<ArtworkBasicInfoSection onMissingCountChange={handleBasicMissingCountChange} />
				</section>

				<Divider thickness="thin" fullBleed={true} spacing="md" />

				<section
					className="pb-7 pt-7"
					ref={(el) => {
						sectionRefs.image.current = el;
					}}
				>
					<ArtworkImageSection />
				</section>

				<Divider thickness="thin" fullBleed={true} spacing="md" />

				<section
					className="pb-7 pt-7"
					ref={(el) => {
						sectionRefs.additional.current = el;
					}}
				>
					<ArtworkAdditionalInfoSection />
				</section>

				<Divider thickness="thin" fullBleed={true} spacing="md" />

				<section
					className="pb-7 pt-7"
					ref={(el) => {
						sectionRefs.purchase.current = el;
					}}
				>
					<ArtworkPurchaseInfoSection />
				</section>
			</div>

			<div className="sticky bottom-0 z-10 flex justify-end border-t border-stroke-lightest bg-bg-normal py-4">
				<Button type="button" onClick={() => router.push(`${pathname}/detail`)}>
					다음으로
				</Button>
			</div>
		</DesktopContainer>
	);
};
