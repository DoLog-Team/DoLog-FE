"use client";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import type { ViewerProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";
import { artworkImageHTMLRenderer } from "@/lib/utils/markdownImageSize";

// 작가가 작품 상세 정보에서 작성한 마크다운(굵게/제목/본문 이미지 등)을 그대로 HTML로 렌더링한다.
const Viewer = dynamic<ViewerProps>(
	() => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
	{ ssr: false },
);

export const DescriptionSection = ({
	content,
	shortIntro,
	title = "작품 소개",
}: {
	content: string | null | undefined;
	// 작품 한줄 소개 — 상세 설명 위에 표시한다
	shortIntro?: string | null;
	title?: string;
}) => {
	if (!content && !shortIntro) return null;

	return (
		<section className="flex flex-col pb-6">
			<DesktopContainer>
				<Title title={title} margin="compact" />
				{shortIntro && <p className="mb-4 text-body1 whitespace-pre-line">{shortIntro}</p>}
				<div className="text-body1 leading-relaxed">
					<Viewer initialValue={content ?? ""} customHTMLRenderer={artworkImageHTMLRenderer} />
				</div>
			</DesktopContainer>
		</section>
	);
};
