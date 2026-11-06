"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import type { EditorProps, Editor as ToastEditor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { UnsavedChangesModal } from "@/components/common/Modal/UnsavedChangesModal";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import { useLeaveConfirm } from "@/lib/hooks/useLeaveConfirm";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { compressImageFile } from "@/lib/utils/image";
import type { MyArtworkDetail } from "../_api/getMyArtwork";
import { updateArtworkDescription, uploadContentImage } from "../_api/updateArtworkDetail";
import {
	type ArtworkFieldSettings,
	getArtworkExhibitionStatus,
} from "../[artworkId]/exhibition/_api/getArtworkExhibitionStatus";
import { getExhibitionZones } from "../[artworkId]/exhibition/_api/getExhibitionZones";
import { ArtworkFormHeader } from "./ArtworkFormHeader";
import { ArtworkSaveConfirmModal } from "./ArtworkSaveConfirmModal";
import { isArtworkSatisfied } from "./artworkCompleteness";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { getBasicMissingCount } from "./getBasicMissingCount";
import { imageResizePlugin } from "./imageResizePlugin";

const Editor = dynamic<EditorProps>(
	() => import("@toast-ui/react-editor").then((mod) => mod.Editor),
	{ ssr: false },
);

const MAX_IMAGE_COUNT = 5;
// 마크다운 안의 이미지 태그에서 URL만 뽑아낸다: ![alt](url)
const MARKDOWN_IMAGE_URL_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

const extractImageUrls = (markdown: string) =>
	[...markdown.matchAll(MARKDOWN_IMAGE_URL_REGEX)].map((match) => match[1]);

const PREVIEW_MAX_DIMENSION = 480;
const PREVIEW_QUALITY = 0.5;

// Netlify Functions(BFF 프록시)가 동기 요청 바디를 6MB로 제한해서, 기본 압축값(1600px/0.9)보다
// 더 세게 줄여야 복잡한 사진도 여유 있게 걸린다
const CONTENT_IMAGE_MAX_DIMENSION = 1280;
const CONTENT_IMAGE_QUALITY = 0.8;

const fileToDataUrl = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});

export interface ArtworkDetailFormProps {
	artwork: MyArtworkDetail;
	onBack: () => void;
}

export const ArtworkDetailForm = ({ artwork, onBack }: ArtworkDetailFormProps) => {
	const router = useRouter();
	const editorRef = useRef<ToastEditor>(null);
	// 붙여넣었지만 아직 저장 안 한 이미지: 미리보기용 data URL -> 원본 Blob (임시저장 시점에만 실제 업로드)
	const pendingUploadsRef = useRef<Map<string, Blob>>(new Map());
	const { notice, showNotice, closeNotice } = useNoticeModal();
	const { isSaving, error: saveError, run } = useAsyncSave();
	const [fieldSettings, setFieldSettings] = useState<ArtworkFieldSettings | null>(null);
	const [hasZonesInExhibition, setHasZonesInExhibition] = useState(false);
	const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
	const [isDirty, setIsDirty] = useState(false);

	const basicMissingCount = useMemo(() => getBasicMissingCount(artwork), [artwork]);
	const tabs = useMemo(
		() =>
			ARTWORK_FORM_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	useEffect(() => {
		if (!artwork.exhibitionId) return;
		getArtworkExhibitionStatus(artwork.artworkId)
			.then((status) => setFieldSettings(status.fieldSettings))
			.catch(() => {});
		getExhibitionZones(artwork.exhibitionId)
			.then((zones) => setHasZonesInExhibition(zones.length > 0))
			.catch(() => {});
	}, [artwork.artworkId, artwork.exhibitionId]);

	const isSatisfied = isArtworkSatisfied({
		category: artwork.category ?? undefined,
		productionEndYear: artwork.productionEndYear ? String(artwork.productionEndYear) : undefined,
		exhibitionId: artwork.exhibitionId,
		zoneId: artwork.zoneId,
		hasZonesInExhibition,
		fieldSettings,
		mainImagePreview: artwork.mainImg,
		width: artwork.width ? String(artwork.width) : "",
		height: artwork.height ? String(artwork.height) : "",
		materials: artwork.materials,
		locationMap: artwork.locationMap,
	});

	const handleTabClick = async (tabId: string) => {
		if (tabId === "detail") return;
		if (await handleTempSave()) onBack();
	};

	const handleSaveClick = () => setIsSaveConfirmOpen(true);

	const handleConfirmSave = async () => {
		if (await handleTempSave()) {
			setIsSaveConfirmOpen(false);
			router.push(isSatisfied ? `/artworks/${artwork.artworkId}` : "/artist-admin");
		}
	};

	const handleTempSave = async () => {
		const saved = await run(async () => {
			let markdown = editorRef.current?.getInstance().getMarkdown() ?? "";

			// 저장 전까지 붙여넣기만 해뒀던(미리보기 data URL) 이미지를 지금 실제로 업로드하고, 본문의 임시 URL을 진짜 URL로 치환
			const pendingUrls = extractImageUrls(markdown).filter((url) =>
				pendingUploadsRef.current.has(url),
			);
			if (pendingUrls.length > 0) {
				const uploaded = await Promise.all(
					pendingUrls.map((dataUrl) =>
						uploadContentImage(artwork.artworkId, pendingUploadsRef.current.get(dataUrl) as Blob),
					),
				);
				pendingUrls.forEach((dataUrl, index) => {
					markdown = markdown.split(dataUrl).join(uploaded[index].imageUrl);
					pendingUploadsRef.current.delete(dataUrl);
				});
				editorRef.current?.getInstance().setMarkdown(markdown);
			}

			await updateArtworkDescription(artwork.artworkId, markdown);
		});
		if (saved) setIsDirty(false);
		return saved;
	};

	const { isLeaveModalOpen, setIsLeaveModalOpen, handleBack, handleLeaveAndSave } = useLeaveConfirm(
		isDirty,
		handleTempSave,
		onBack,
	);

	return (
		<DesktopContainer>
			<ArtworkFormHeader
				artworkId={artwork.artworkId}
				initialTitle={artwork.title}
				onTempSave={handleSaveClick}
				isSaving={isSaving}
				saveDisabled={!isDirty}
				saveError={saveError}
				tabs={tabs}
				activeTab="detail"
				onTabClick={handleTabClick}
				onBack={handleBack}
			/>

			<div className="artwork-detail-editor flex flex-col gap-4 py-7">
				<h2 className="text-head3 text-strong">상세 정보</h2>
				<Editor
					ref={editorRef}
					previewStyle="tab"
					height="600px"
					initialEditType="wysiwyg"
					initialValue={artwork.description ?? ""}
					useCommandShortcut
					placeholder="작품에 대한 상세한 설명을 작성해주세요."
					plugins={[imageResizePlugin]}
					onChange={() => setIsDirty(true)}
					hooks={{
						// 저장 전까지는 네트워크를 안 타고 data URL로만 미리보기 — 실제 업로드는 "임시저장" 시점에
						addImageBlobHook: (
							blob: Blob | File,
							callback: (url: string, text?: string) => void,
						) => {
							const currentMarkdown = editorRef.current?.getInstance().getMarkdown() ?? "";
							const imageCount = extractImageUrls(currentMarkdown).length;

							if (imageCount >= MAX_IMAGE_COUNT) {
								showNotice(
									"이미지 개수 제한",
									`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`,
								);
								return;
							}

							const file =
								blob instanceof File ? blob : new File([blob], "image", { type: blob.type });

							compressImageFile(file, {
								maxDimension: CONTENT_IMAGE_MAX_DIMENSION,
								quality: CONTENT_IMAGE_QUALITY,
							})
								.then(async (uploadFile) => {
									const previewFile = await compressImageFile(file, {
										maxDimension: PREVIEW_MAX_DIMENSION,
										quality: PREVIEW_QUALITY,
										outputType: "image/jpeg",
									});
									const dataUrl = await fileToDataUrl(previewFile);
									pendingUploadsRef.current.set(dataUrl, uploadFile);
									callback(dataUrl, "이미지");
								})
								.catch(() => {
									showNotice(
										"이미지 업로드 실패",
										"jpg, png, webp 형식의 이미지만 업로드할 수 있어요.\n다른 파일로 다시 시도해주세요.",
									);
								});
						},
					}}
				/>
			</div>

			<ArtworkSaveConfirmModal
				open={isSaveConfirmOpen}
				onOpenChange={setIsSaveConfirmOpen}
				isSatisfied={isSatisfied}
				isSaving={isSaving}
				onConfirm={handleConfirmSave}
			/>
			<NoticeModal notice={notice} onClose={closeNotice} />
			<UnsavedChangesModal
				open={isLeaveModalOpen}
				onOpenChange={setIsLeaveModalOpen}
				onDiscard={onBack}
				onSave={handleLeaveAndSave}
				isSaving={isSaving}
			/>
		</DesktopContainer>
	);
};
