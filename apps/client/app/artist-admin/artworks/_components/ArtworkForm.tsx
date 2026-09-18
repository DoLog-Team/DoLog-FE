"use client";

import { useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { TabBar } from "@/components/common/TabBar/TabBar";

const TABS = [
	{ id: "basic", label: "기본 정보" },
	{ id: "image", label: "이미지" },
	{ id: "additional", label: "부가 정보" },
	{ id: "purchase", label: "구매 정보" },
	{ id: "detail", label: "상세 정보" },
];

export interface ArtworkFormProps {
	title: string;
	onBack: () => void;
}

export const ArtworkForm = ({ title, onBack }: ArtworkFormProps) => {
	const [activeTab, setActiveTab] = useState(TABS[0].id);

	return (
		<DesktopContainer>
			<FormHeader
				title={title}
				editableTitle
				onTitleEditClick={() => {}}
				onTempSave={() => {}}
				onBack={onBack}
			/>
			<TabBar tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />
			<div className="px-10">준비 중인 탭이에요.</div>
		</DesktopContainer>
	);
};
