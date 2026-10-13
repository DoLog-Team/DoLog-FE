"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import type { EditorProps, Editor as ToastEditor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Modal } from "@/components/common/Modal/Modal";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { useAsyncSave } from "@/lib/hooks/useAsyncSave";
import type { MyArtworkDetail } from "../_api/getMyArtwork";
import { updateArtworkDescription, uploadContentImage } from "../_api/updateArtworkDetail";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";
import { getBasicMissingCount } from "./getBasicMissingCount";
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

const MAX_PREVIEW_DIMENSION = 1280;
const PREVIEW_IMAGE_QUALITY = 0.7;

// Toast UI 마크다운 Preview의 sanitizer(DOMPurify)가 blob: URL은 막고 data: URL은 허용해서,
// 저장 전 임시 미리보기는 data URL로 만든다. (최종 업로드는 원본 blob 그대로)
const compressToDataUrl = (blob: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const objectUrl = URL.createObjectURL(blob);
		const img = new Image();

		img.onload = () => {
			const scale = Math.min(1, MAX_PREVIEW_DIMENSION / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;

			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("캔버스 컨텍스트를 가져올 수 없어요."));
				return;
			}
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL("image/jpeg", PREVIEW_IMAGE_QUALITY));
			URL.revokeObjectURL(objectUrl);
		};
		img.onerror = reject;
		img.src = objectUrl;
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
	const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);
	const [artworkTitle, setArtworkTitle] = useState(artwork.title);
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const { isSaving, error: saveError, lastSavedAt, run } = useAsyncSave();

	const tabs = useMemo(() => {
		const basicMissingCount = getBasicMissingCount(artwork);
		return ARTWORK_FORM_TABS.map((tab) =>
			tab.id === "basic" ? { ...tab, badge: basicMissingCount } : tab,
		);
	}, [artwork]);

	const handleTabClick = (tabId: string) => {
		if (tabId === "detail") return;
		router.push(pathname.replace(/\/detail$/, ""));
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
					onBack={onBack}
				/>
				<TabBar tabs={tabs} activeTab="detail" onTabClick={handleTabClick} />
				{saveError && <p className="px-4 pt-2 text-body3 text-error">{saveError}</p>}
			</div>

			<div className="flex flex-col gap-4 py-7">
				<h2 className="text-head3 text-strong">상세 정보</h2>
				<Editor
					ref={editorRef}
					previewStyle="tab"
					height="600px"
					initialEditType="markdown"
					initialValue={artwork.description ?? ""}
					useCommandShortcut
					placeholder="작품에 대한 상세한 설명을 작성해주세요."
					hooks={{
						// 저장 전까지는 네트워크를 안 타고 data URL로만 미리보기 — 실제 업로드는 "임시저장" 시점에
						addImageBlobHook: (
							blob: Blob | File,
							callback: (url: string, text?: string) => void,
						) => {
							const currentMarkdown = editorRef.current?.getInstance().getMarkdown() ?? "";
							const imageCount = extractImageUrls(currentMarkdown).length;

							if (imageCount >= MAX_IMAGE_COUNT) {
								setNotice({
									title: "이미지 개수 제한",
									description: `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`,
								});
								return;
							}

							compressToDataUrl(blob)
								.then((dataUrl) => {
									pendingUploadsRef.current.set(dataUrl, blob);
									callback(dataUrl, "이미지");
								})
								.catch(() => {
									setNotice({
										title: "이미지 업로드 실패",
										description: "이미지 파일을 불러오지 못했어요. 다른 파일로 다시 시도해주세요.",
									});
								});
						},
					}}
				/>
			</div>

			<Modal
				open={notice !== null}
				onOpenChange={(open) => {
					if (!open) setNotice(null);
				}}
				title={notice?.title ?? ""}
				description={notice?.description}
				actions={[{ text: "확인", variant: "assistive", onClick: () => setNotice(null) }]}
			/>

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
