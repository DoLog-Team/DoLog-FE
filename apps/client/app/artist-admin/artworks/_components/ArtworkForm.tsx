"use client";

import { useCallback, useMemo, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { ArtworkBasicInfoSection } from "./sections/ArtworkBasicInfoSection";
import { ArtworkImageSection } from "./sections/ArtworkImageSection";
import { ArtworkPlaceholderSection } from "./sections/ArtworkPlaceholderSection";

const TAB_LABELS = [
	{ id: "basic", label: "기본 정보" },
	{ id: "image", label: "이미지" },
	{ id: "additional", label: "부가 정보" },
	{ id: "purchase", label: "구매 정보" },
	{ id: "detail", label: "상세 정보" },
];

const PLACEHOLDER_SECTIONS = [
	{ id: "additional", title: "작품 부가 정보" },
	{ id: "purchase", title: "작품 구매 정보" },
	{ id: "detail", title: "작품 상세 정보" },
] as const;

export interface ArtworkFormProps {
	title: string;
	onBack: () => void;
}

export const ArtworkForm = ({ title, onBack }: ArtworkFormProps) => {
	const tabIds = useMemo(() => TAB_LABELS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);
	const [basicMissingCount, setBasicMissingCount] = useState(1);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	const tabs = useMemo(
		() =>
			TAB_LABELS.map((tab) => (tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab)),
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
				<TabBar tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
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
					ref={(el) => {
						sectionRefs.image.current = el;
					}}
				>
					<ArtworkImageSection />
				</section>

				{PLACEHOLDER_SECTIONS.map(({ id, title }) => (
					<section
						key={id}
						ref={(el) => {
							sectionRefs[id].current = el;
						}}
						className="py-10"
					>
						<ArtworkPlaceholderSection title={title} />
					</section>
				))}
			</div>
		</DesktopContainer>
	);
};
