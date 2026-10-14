"use client";

import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import type { ViewerProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { DesktopContainer } from "@/components/common/DesktopContainer/DesktopContainer";
import { Title } from "@/components/common/Title/Title";

// 작가가 작품 상세 정보에서 작성한 마크다운(굵게/제목/본문 이미지 등)을 그대로 HTML로 렌더링한다.
const Viewer = dynamic<ViewerProps>(
	() => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
	{ ssr: false },
);

export const DescriptionSection = ({ content }: { content: string | null | undefined }) => (
	<section className="flex flex-col pb-6">
		<DesktopContainer>
			<Title title="작품 소개" margin="compact" />
			<div className="text-body1 leading-relaxed">
				<Viewer initialValue={content ?? ""} />
			</div>
		</DesktopContainer>
	</section>
);
