"use client";

import { usePathname, useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/common/Button/Button";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Divider } from "@/components/common/Divider/Divider";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { useScrollSpy } from "@/components/common/ScrollTabBar/useScrollSpy";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import type { MyArtworkDetail } from "../_api/getMyArtwork";
import { updateArtworkBasicInfo } from "../_api/updateArtwork";
import { ArtworkFormHeader } from "./ArtworkFormHeader";
import { ArtworkVisibilitySection } from "./ArtworkVisibilitySection";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { getBasicMissingCount } from "./getBasicMissingCount";
import {
	ArtworkAdditionalInfoSection,
	type ArtworkAdditionalInfoValue,
} from "./sections/ArtworkAdditionalInfoSection";
import {
	ArtworkBasicInfoSection,
	type ArtworkBasicInfoValue,
} from "./sections/ArtworkBasicInfoSection";
import { ArtworkImageSection, type ArtworkImageValue } from "./sections/ArtworkImageSection";
import {
	ArtworkPurchaseInfoSection,
	type ArtworkPurchaseInfoValue,
} from "./sections/ArtworkPurchaseInfoSection";
import { useArtworkVisibility } from "./useArtworkVisibility";

export interface ArtworkFormProps {
	artwork: MyArtworkDetail;
	onBack: () => void;
}

const toDateString = (n: number | null) => (n != null ? String(n) : undefined);
const toSizeString = (n: number | null) => (n != null ? String(n) : "");

export const ArtworkForm = ({ artwork, onBack }: ArtworkFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const tabIds = useMemo(() => ARTWORK_FORM_TABS.map((tab) => tab.id), []);
	const { activeTab, handleTabClick, sectionRefs } = useScrollSpy(tabIds, 120);
	const [basicMissingCount, setBasicMissingCount] = useState(() => getBasicMissingCount(artwork));

	const [basic, setBasic] = useState<ArtworkBasicInfoValue>({
		shortIntro: artwork.shortIntro ?? "",
		category: artwork.category ?? undefined,
		hasStartDate: artwork.productionStartYear != null,
		startYear: toDateString(artwork.productionStartYear),
		startMonth: toDateString(artwork.productionStartMonth),
		startDay: toDateString(artwork.productionStartDay),
		endYear: toDateString(artwork.productionEndYear),
		endMonth: toDateString(artwork.productionEndMonth),
		endDay: toDateString(artwork.productionEndDay),
	});
	const [additional, setAdditional] = useState<ArtworkAdditionalInfoValue>({
		materials: artwork.materials,
		width: toSizeString(artwork.width),
		height: toSizeString(artwork.height),
		hasVolume: artwork.depth != null,
		depth: toSizeString(artwork.depth),
	});
	const [image, setImage] = useState<ArtworkImageValue>({
		mainImagePreview: artwork.mainImg,
		youtubeUrl: artwork.youtubeUrl ?? "",
	});
	const [mainImageFile, setMainImageFile] = useState<File | null>(null);
	const [purchase, setPurchase] = useState<ArtworkPurchaseInfoValue>({
		showPurchaseButton: artwork.showPurchaseButton ?? false,
	});
	const { isSaving, error: saveError, lastSavedAt, run } = useAsyncSave();
	const visibility = useArtworkVisibility(artwork.artworkId, artwork);

	const updateBasic = useCallback(
		(patch: Partial<ArtworkBasicInfoValue>) => setBasic((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updateAdditional = useCallback(
		(patch: Partial<ArtworkAdditionalInfoValue>) =>
			setAdditional((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updateImage = useCallback(
		(patch: Partial<ArtworkImageValue>) => setImage((prev) => ({ ...prev, ...patch })),
		[],
	);
	const updatePurchase = useCallback(
		(patch: Partial<ArtworkPurchaseInfoValue>) => setPurchase((prev) => ({ ...prev, ...patch })),
		[],
	);

	const handleBasicMissingCountChange = useCallback((count: number) => {
		setBasicMissingCount(count);
	}, []);

	// 성공하면 true — "다음으로" 이동 전에 저장부터 시키는 데도 재사용
	const handleTempSave = () =>
		run(() =>
			updateArtworkBasicInfo(artwork.artworkId, {
				category: basic.category,
				shortIntro: basic.shortIntro,
				materials: additional.materials,
				width: additional.width,
				height: additional.height,
				depth: additional.hasVolume ? additional.depth : undefined,
				productionStartYear: basic.hasStartDate ? basic.startYear : undefined,
				productionStartMonth: basic.hasStartDate ? basic.startMonth : undefined,
				productionStartDay: basic.hasStartDate ? basic.startDay : undefined,
				productionEndYear: basic.endYear,
				productionEndMonth: basic.endMonth,
				productionEndDay: basic.endDay,
				youtubeUrl: image.youtubeUrl,
				showPurchaseButton: purchase.showPurchaseButton,
				mainImageFile,
			}),
		);

	const handleNext = async () => {
		if (await handleTempSave()) router.push(`${pathname}/detail`);
	};

	const handleTopTabClick = (tabId: string) => {
		if (tabId === "detail") {
			handleNext();
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
			id: "visibility",
			className: "pb-7",
			render: () => (
				<ArtworkVisibilitySection
					value={visibility.visibility}
					onChange={visibility.handleChange}
					disabled={visibility.isSaving}
					hasExhibition={artwork.exhibitionId != null}
				/>
			),
		},
		{
			id: "basic",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkBasicInfoSection
					value={basic}
					onChange={updateBasic}
					onMissingCountChange={handleBasicMissingCountChange}
				/>
			),
		},
		{
			id: "image",
			className: "pb-7 pt-7",
			render: () => (
				<ArtworkImageSection
					value={image}
					onChange={updateImage}
					onMainImageFileChange={setMainImageFile}
				/>
			),
		},
		{
			id: "additional",
			className: "pb-7 pt-7",
			render: () => <ArtworkAdditionalInfoSection value={additional} onChange={updateAdditional} />,
		},
		{
			id: "purchase",
			className: "pb-7 pt-7",
			render: () => <ArtworkPurchaseInfoSection value={purchase} onChange={updatePurchase} />,
		},
	];

	return (
		<DesktopContainer>
			<ArtworkFormHeader
				artworkId={artwork.artworkId}
				initialTitle={artwork.title}
				lastSavedAt={lastSavedAt}
				onTempSave={handleTempSave}
				isSaving={isSaving}
				saveError={saveError}
				basicMissingCount={basicMissingCount}
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={handleTopTabClick}
				onBack={onBack}
			/>

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
				<Button type="button" disabled={isSaving} onClick={handleNext}>
					다음으로
				</Button>
			</div>

			<NoticeModal notice={visibility.notice} onClose={visibility.closeNotice} />
		</DesktopContainer>
	);
};
