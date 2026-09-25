"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import type { EditorProps, Editor as ToastEditor } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { FormHeader } from "@/components/common/FormHeader/FormHeader";
import { Modal } from "@/components/common/Modal/Modal";
import { TabBar } from "@/components/common/TabBar/TabBar";
import { ARTWORK_FORM_TABS } from "./artworkFormTabs";

const Editor = dynamic<EditorProps>(
	() => import("@toast-ui/react-editor").then((mod) => mod.Editor),
	{ ssr: false },
);

const MAX_IMAGE_DIMENSION = 1280;
const IMAGE_QUALITY = 0.7;
const MAX_IMAGE_COUNT = 5;
const MARKDOWN_IMAGE_REGEX = /!\[[^\]]*\]\([^)]*\)/g;

const compressImage = (blob: Blob): Promise<string> =>
	new Promise((resolve, reject) => {
		const objectUrl = URL.createObjectURL(blob);
		const img = new Image();

		img.onload = () => {
			const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = img.width * scale;
			canvas.height = img.height * scale;

			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(new Error("캔버스 컨텍스트를 가져올 수 없어요."));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			resolve(canvas.toDataURL("image/jpeg", IMAGE_QUALITY));
			URL.revokeObjectURL(objectUrl);
		};
		img.onerror = reject;
		img.src = objectUrl;
	});

export interface ArtworkDetailFormProps {
	title: string;
	onBack: () => void;
}

export const ArtworkDetailForm = ({ title, onBack }: ArtworkDetailFormProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const editorRef = useRef<ToastEditor>(null);
	const [isImageLimitModalOpen, setIsImageLimitModalOpen] = useState(false);

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

			<div className="flex flex-col gap-4 py-7">
				<h2 className="text-head3 text-strong">상세 정보</h2>
				<Editor
					ref={editorRef}
					previewStyle="tab"
					height="600px"
					initialEditType="markdown"
					useCommandShortcut
					placeholder="작품에 대한 상세한 설명을 작성해주세요."
					hooks={{
						addImageBlobHook: (
							blob: Blob | File,
							callback: (url: string, text?: string) => void,
						) => {
							const currentMarkdown = editorRef.current?.getInstance().getMarkdown() ?? "";
							const imageCount = (currentMarkdown.match(MARKDOWN_IMAGE_REGEX) ?? []).length;

							if (imageCount >= MAX_IMAGE_COUNT) {
								setIsImageLimitModalOpen(true);
								return;
							}

							compressImage(blob).then((dataUrl) => callback(dataUrl, "이미지"));
						},
					}}
				/>
			</div>

			<Modal
				open={isImageLimitModalOpen}
				onOpenChange={setIsImageLimitModalOpen}
				title="이미지 개수 제한"
				description={`이미지는 최대 ${MAX_IMAGE_COUNT}장까지 첨부할 수 있어요.`}
				actions={[
					{ text: "확인", variant: "assistive", onClick: () => setIsImageLimitModalOpen(false) },
				]}
			/>
		</DesktopContainer>
	);
};
