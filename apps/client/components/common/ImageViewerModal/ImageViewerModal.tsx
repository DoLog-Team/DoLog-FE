"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { Header } from "@/app/[exhibitionId]/_components/Header";
import { imageViewerModalStyles } from "./ImageViewerModal.styles";

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
		<div className={imageViewerModalStyles.zoomControls}>
			<button
				type="button"
				onClick={() => zoomIn()}
				className={imageViewerModalStyles.zoomButton}
				aria-label="확대"
			>
				<Image src="/icons/zoomIn.svg" alt="확대" width={24} height={24} />
			</button>
			<button
				type="button"
				onClick={() => zoomOut()}
				className={imageViewerModalStyles.zoomButton}
				aria-label="축소"
			>
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
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className={imageViewerModalStyles.overlay} />
				<Dialog.Content className={imageViewerModalStyles.content}>
					<Dialog.Title className="sr-only">{alt}</Dialog.Title>
					<Header
						variant="back"
						title={title}
						onBackClick={() => onOpenChange(false)}
						showHamburger={false}
					/>
					<div className={imageViewerModalStyles.imageArea}>
						<TransformWrapper doubleClick={{ mode: "toggle" }} wheel={{ disabled: true }}>
							<TransformComponent
								wrapperClass={imageViewerModalStyles.transformWrapper}
								contentClass={imageViewerModalStyles.transformContent}
							>
								{/* biome-ignore lint/performance/noImgElement: react-zoom-pan-pinch가 순수 img 요소에 transform을 적용해야 함 */}
								<img src={src} alt={alt} className={imageViewerModalStyles.image} />
							</TransformComponent>
							<ZoomControls />
						</TransformWrapper>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
