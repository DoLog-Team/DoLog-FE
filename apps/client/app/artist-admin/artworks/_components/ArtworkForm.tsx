"use client";

import { useMemo, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { Textarea } from "@/components/common/Textarea/Textarea";

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
	const tabIds = useMemo(() => TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);
	const [intro, setIntro] = useState("");

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal ">
				<FormHeader
					title={title}
					editableTitle
					onTitleEditClick={() => {}}
					onTempSave={() => {}}
					onBack={onBack}
				/>
				<TabBar tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />
			</div>
			<div className="px-10 py-7">
				<section
					ref={(el) => {
						sectionRefs.basic.current = el;
					}}
					className="flex flex-col gap-4 min-[721px]:flex-row min-[721px]:gap-10"
				>
					<div className="shrink-0 min-[721px]:w-72">
						<h2 className="text-head3 text-strong">작품 기본 정보</h2>
					</div>
					<div className="flex flex-1 flex-col gap-8">
						<div className="flex flex-col gap-2">
							<span className="text-body2-bold text-strong">작품 한줄 소개</span>
							<Textarea
								placeholder="작품을 간단하게 소개해주세요."
								maxLength={200}
								value={intro}
								onChange={(e) => setIntro(e.target.value)}
							/>
						</div>
					</div>
				</section>

				<section
					ref={(el) => {
						sectionRefs.image.current = el;
					}}
					className="flex flex-col gap-4 py-10 min-[721px]:flex-row min-[721px]:gap-10"
				>
					<div className="shrink-0 min-[721px]:w-72">
						<h2 className="text-head3 text-strong">작품 이미지</h2>
					</div>
					<div className="flex-1 text-lightest">준비 중인 탭이에요.</div>
				</section>

				<section
					ref={(el) => {
						sectionRefs.additional.current = el;
					}}
					className="flex flex-col gap-4 py-10 min-[721px]:flex-row min-[721px]:gap-10"
				>
					<div className="shrink-0 min-[721px]:w-72">
						<h2 className="text-head3 text-strong">작품 부가 정보</h2>
					</div>
					<div className="flex-1 text-lightest">준비 중인 탭이에요.</div>
				</section>

				<section
					ref={(el) => {
						sectionRefs.purchase.current = el;
					}}
					className="flex flex-col gap-4 py-10 min-[721px]:flex-row min-[721px]:gap-10"
				>
					<div className="shrink-0 min-[721px]:w-72">
						<h2 className="text-head3 text-strong">작품 구매 정보</h2>
					</div>
					<div className="flex-1 text-lightest">준비 중인 탭이에요.</div>
				</section>

				<section
					ref={(el) => {
						sectionRefs.detail.current = el;
					}}
					className="flex flex-col gap-4 py-10 min-[721px]:flex-row min-[721px]:gap-10"
				>
					<div className="shrink-0 min-[721px]:w-72">
						<h2 className="text-head3 text-strong">작품 상세 정보</h2>
					</div>
					<div className="flex-1 text-lightest">준비 중인 탭이에요.</div>
				</section>
			</div>
		</DesktopContainer>
	);
};
