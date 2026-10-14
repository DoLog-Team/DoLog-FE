"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import type { EditorProps, Editor as ToastEditor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { NoticeModal } from "@/components/common/Modal/NoticeModal";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import { useNoticeModal } from "@/lib/hooks/useNoticeModal";
import { compressImageFile } from "@/lib/utils/image";
import type { MyArtworkDetail } from "../_api/getMyArtwork";
import { updateArtworkDescription, uploadContentImage } from "../_api/updateArtworkDetail";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { getBasicMissingCount } from "./getBasicMissingCount";
import { imageResizePlugin } from "./imageResizePlugin";
import { RenameArtworkModal } from "./RenameArtworkModal";

const Editor = dynamic<EditorProps>(
	() => import("@toast-ui/react-editor").then((mod) => mod.Editor),
	{ ssr: false },
);

const MAX_IMAGE_COUNT = 5;
// 마크다운 안의 이미지 태그에서 URL만 뽑아낸다: ![alt](url)
const MARKDOWN_IMAGE_URL_REGEX = /!\[[^\]]*\]\(([^)]+)\)/g;

const extractImageUrls = (markdown: string) =>
	[...markdown.matchAll(MARKDOWN_IMAGE_URL_REGEX)].map((match) => match[1]);

// Toast UI 마크다운 Preview의 sanitizer(DOMPurify)가 blob: URL은 막고 data: URL은 허용해서,
// 저장 전 임시 미리보기는 data URL로 만든다. 본문(Write 탭 원문)에 그대로 박히는 문자열이라
// 작게 압축해 길이를 줄이고, 실제 업로드는 별도로 고화질 압축본을 쓴다.
const PREVIEW_MAX_DIMENSION = 480;
const PREVIEW_QUALITY = 0.5;

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
	const pathname = usePathname();
	const editorRef = useRef<ToastEditor>(null);
	// 붙여넣었지만 아직 저장 안 한 이미지: 미리보기용 data URL -> 원본 Blob (임시저장 시점에만 실제 업로드)
	const pendingUploadsRef = useRef<Map<string, Blob>>(new Map());
	const { notice, showNotice, closeNotice } = useNoticeModal();
	const [artworkTitle, setArtworkTitle] = useState(artwork.title);
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const { isSaving, error: saveError, lastSavedAt, run } = useAsyncSave();

	const basicMissingCount = useMemo(() => getBasicMissingCount(artwork), [artwork]);
	const tabs = useMemo(
		() =>
			ARTWORK_FORM_TABS.map((tab) =>
				tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
			),
		[basicMissingCount],
	);

	const handleTabClick = async (tabId: string) => {
		if (tabId === "detail") return;
		if (await handleTempSave()) router.push(pathname.replace(/\/detail$/, ""));
	};

	const handleTempSave = () =>
		run(async () => {
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

	return (
		<DesktopContainer>
			<div className="sticky top-0 z-10 bg-bg-normal">
				<FormHeader
					title={artworkTitle}
					editableTitle
					onTitleEditClick={() => setIsRenameModalOpen(true)}
					lastSavedAt={lastSavedAt}
					onTempSave={handleTempSave}
					tempSaveDisabled={isSaving}
					saveLabel={basicMissingCount === 0 ? "저장" : "임시 저장"}
					onBack={onBack}
				/>
				<TabBar tabs={tabs} activeTab="detail" onTabClick={handleTabClick} />
				{saveError && <p className="px-4 pt-2 text-body3 text-error">{saveError}</p>}
			</div>

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

							compressImageFile(file)
								.then(async (uploadFile) => {
									// 실제 업로드본과 별개로, 본문에 박히는 미리보기는 작게 압축해 길이를 줄인다
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

			<NoticeModal notice={notice} onClose={closeNotice} />

			<RenameArtworkModal
				artworkId={artwork.artworkId}
				currentTitle={artworkTitle}
				open={isRenameModalOpen}
				onOpenChange={setIsRenameModalOpen}
				onRenamed={setArtworkTitle}
			/>
		</DesktopContainer>
	);
};
