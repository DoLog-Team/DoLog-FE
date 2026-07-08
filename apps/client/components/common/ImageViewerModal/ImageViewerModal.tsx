"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { Header } from "@/app/[exhibitionId]/_components/Header";
import { imageViewerModalStyles as s } from "./ImageViewerModal.styles";

interface ImageViewerModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	src: string;
	alt: string;
	title: string;
}

function ZoomControls() {
	const { zoomIn, zoomOut } = useControls();

	return (
		<div className={s.zoomControls}>
			<button type="button" onClick={() => zoomIn()} className={s.zoomButton} aria-label="확대">
				<Image src="/icons/zoomIn.svg" alt="확대" width={24} height={24} />
			</button>
			<button type="button" onClick={() => zoomOut()} className={s.zoomButton} aria-label="축소">
				<Image src="/icons/zoomOut.svg" alt="축소" width={24} height={24} />
			</button>
		</div>
	);
}

export const ImageViewerModal = ({
	open,
	onOpenChange,
	src,
	alt,
	title,
}: ImageViewerModalProps) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const [closePos, setClosePos] = useState({ top: 20, right: 20 });
	const isDesktop = typeof window !== "undefined" && window.innerWidth >= 721;

	const updateClosePos = useCallback(() => {
		requestAnimationFrame(() => {
			const el = imgRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			if (rect.width === 0 || rect.height === 0) return;
			const vw = window.innerWidth;
			setClosePos({
				top: Math.max(20, rect.top + 20),
				right: Math.max(20, vw - rect.right + 20),
			});
		});
	}, []);

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={s.overlay} />
				<Dialog.Content className={s.content} onOpenAutoFocus={(e) => e.preventDefault()}>
					<Dialog.Title className="sr-only">{alt}</Dialog.Title>

					{/* 모바일: 상단 뒤로가기 헤더 */}
					<div className="min-[721px]:hidden">
						<Header
							variant="back"
							title={title}
							onBackClick={() => onOpenChange(false)}
							showHamburger={false}
						/>
					</div>

					{/* 데스크탑: 이미지 우상단 닫기 버튼 */}
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						style={{ top: closePos.top, right: closePos.right }}
						className={s.desktopCloseButton}
						aria-label="닫기"
					>
						<Image src="/icons/close.svg" alt="닫기" width={20} height={20} />
					</button>

					<div className={s.imageArea}>
						<TransformWrapper
							doubleClick={{ mode: "toggle" }}
							wheel={{ disabled: !isDesktop }}
							minScale={0.5}
							centerZoomedOut
							onTransform={updateClosePos}
						>
							<TransformComponent
								wrapperClass={s.transformWrapper}
								contentClass={s.transformContent}
							>
								{/* biome-ignore lint/performance/noImgElement: react-zoom-pan-pinch가 순수 img 요소에 transform을 적용해야 함 */}
								<img ref={imgRef} src={src} alt={alt} className={s.image} onLoad={updateClosePos} />
							</TransformComponent>
							<ZoomControls />
						</TransformWrapper>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
