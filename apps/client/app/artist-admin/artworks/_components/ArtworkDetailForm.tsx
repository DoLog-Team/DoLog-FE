"use client";

import { usePathname, useRouter } from "next/navigation";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
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

	const handleTabClick = (tabId: string) => {
		if (tabId === "detail") return;
		router.push(pathname.replace(/\/detail$/, ""));
	};

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
				<TabBar tabs={ARTWORK_FORM_TABS} activeTab="detail" onTabClick={handleTabClick} />
			</div>

			<div className="py-7">
				<ArtworkPlaceholderSection title="작품 상세 정보" />
			</div>
		</DesktopContainer>
	);
};
